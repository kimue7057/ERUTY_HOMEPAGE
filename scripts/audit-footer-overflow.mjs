/* global CSS, HTMLElement, console, document, getComputedStyle, location, window */

import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { URL } from "node:url";
import { chromium } from "playwright";

const BASE_URL = process.env.FOOTER_AUDIT_BASE_URL ?? "http://127.0.0.1:4173";
const LABEL = process.env.FOOTER_AUDIT_LABEL ?? "after";
const EXPECT_NO_ROOT_OVERFLOW = process.env.FOOTER_AUDIT_EXPECT_NO_ROOT_OVERFLOW === "1";
const OUTPUT_DIR = path.resolve("reports", "footer-overflow", LABEL);
const SCREENSHOT_DIR = path.resolve("screenshots", "footer-overflow", LABEL);

const ROUTES = [
  "/",
  "/company/about",
  "/company/global-network",
  "/company/team",
  "/company/growth",
  "/company/careers",
  "/services/hitpick",
  "/services/erumter",
  "/technology",
  "/resources",
  "/start-a-project",
];

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  { name: "desktop", width: 1440, height: 1000, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
];

const SCREENSHOT_ROUTES = new Set(["/", "/company/careers", "/services/hitpick", "/technology"]);

function slugFor(route) {
  return route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
}

function buildUrl(route) {
  return new URL(route, BASE_URL).toString();
}

function toErrorMessage(error) {
  return error instanceof Error ? error.stack ?? error.message : String(error);
}

async function prepareOutput() {
  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await rm(SCREENSHOT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });
  await mkdir(SCREENSHOT_DIR, { recursive: true });
}

async function stabilize(page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    document.documentElement.style.scrollBehavior = "auto";
    document.body.style.scrollBehavior = "auto";
    window.scrollTo(0, document.documentElement.scrollHeight);
  });
  await page.waitForTimeout(250);
}

async function collect(page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    const footer = document.querySelector("#root > div > footer") ?? [...document.querySelectorAll("footer")].at(-1);
    const header = document.querySelector("#root > div > header") ?? document.querySelector("header");
    const viewportWidth = root.clientWidth;

    function selectorFor(element) {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const parts = [];
      let current = element;
      while (current instanceof HTMLElement && current !== document.body && parts.length < 6) {
        let part = current.tagName.toLowerCase();
        const classes = [...current.classList]
          .filter((name) => !name.includes("[") && !name.includes(":"))
          .slice(0, 3);
        if (classes.length) part += `.${classes.map((name) => CSS.escape(name)).join(".")}`;
        parts.unshift(part);
        current = current.parentElement;
      }
      return parts.join(" > ");
    }

    function dimensions(element) {
      if (!(element instanceof HTMLElement)) return null;
      const rect = element.getBoundingClientRect();
      return {
        left: rect.left,
        right: rect.right,
        width: rect.width,
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
      };
    }

    const footerOffenders = footer instanceof HTMLElement
      ? [footer, ...footer.querySelectorAll("*")]
        .filter((element) => element instanceof HTMLElement)
        .map((element) => ({ element, rect: element.getBoundingClientRect(), style: getComputedStyle(element) }))
        .filter(({ rect, style }) => style.display !== "none" && (rect.left < -0.5 || rect.right > viewportWidth + 0.5))
        .map(({ element, rect, style }) => ({
          selector: selectorFor(element),
          text: (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 120),
          left: rect.left,
          right: rect.right,
          width: rect.width,
          minWidth: style.minWidth,
          overflowX: style.overflowX,
          display: style.display,
          gridTemplateColumns: style.gridTemplateColumns,
          columnGap: style.columnGap,
          rowGap: style.rowGap,
        }))
      : [];

    const intentionalScrollRegions = [...document.querySelectorAll("body *")]
      .filter((element) => element instanceof HTMLElement)
      .map((element) => ({ element, style: getComputedStyle(element) }))
      .filter(({ element, style }) => ["auto", "scroll"].includes(style.overflowX) && element.scrollWidth > element.clientWidth + 1)
      .map(({ element, style }) => ({
        selector: selectorFor(element),
        className: element.className,
        scrollWidth: element.scrollWidth,
        clientWidth: element.clientWidth,
        overflowX: style.overflowX,
      }));

    const footerTopGrid = footer?.querySelector(".grid") ?? null;
    const footerTopGridStyle = footerTopGrid ? getComputedStyle(footerTopGrid) : null;

    return {
      url: location.href,
      root: {
        scrollWidth: root.scrollWidth,
        clientWidth: root.clientWidth,
        delta: root.scrollWidth - root.clientWidth,
      },
      body: {
        scrollWidth: document.body.scrollWidth,
        clientWidth: document.body.clientWidth,
        delta: document.body.scrollWidth - document.body.clientWidth,
      },
      header: dimensions(header),
      footer: dimensions(footer),
      footerTopGrid: footerTopGrid instanceof HTMLElement ? {
        selector: selectorFor(footerTopGrid),
        width: footerTopGrid.getBoundingClientRect().width,
        scrollWidth: footerTopGrid.scrollWidth,
        clientWidth: footerTopGrid.clientWidth,
        display: footerTopGridStyle.display,
        gridTemplateColumns: footerTopGridStyle.gridTemplateColumns,
        columnGap: footerTopGridStyle.columnGap,
        rowGap: footerTopGridStyle.rowGap,
      } : null,
      footerOffenders,
      intentionalScrollRegions,
      footerLinkCount: footer?.querySelectorAll("a").length ?? 0,
      footerVisibleLinkCount: footer
        ? [...footer.querySelectorAll("a")].filter((link) => {
          const rect = link.getBoundingClientRect();
          const style = getComputedStyle(link);
          return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
        }).length
        : 0,
    };
  });
}

async function captureFooter(page, viewport, route) {
  const shouldCapture = (viewport.name === "mobile" && SCREENSHOT_ROUTES.has(route))
    || (viewport.name === "desktop" && route === "/");
  if (!shouldCapture) return null;

  const footer = page.locator("#root > div > footer").last();
  await footer.scrollIntoViewIfNeeded();
  await page.waitForTimeout(150);
  const filename = `${slugFor(route)}-${viewport.name}-footer.png`;
  const outputPath = path.join(SCREENSHOT_DIR, filename);
  await page.evaluate(() => {
    const header = document.querySelector("#root > div > header") ?? document.querySelector("header");
    if (header instanceof HTMLElement) header.dataset.footerAuditVisibility = header.style.visibility;
    if (header instanceof HTMLElement) header.style.visibility = "hidden";
  });
  try {
    await footer.screenshot({ path: outputPath });
  } finally {
    await page.evaluate(() => {
      const header = document.querySelector("#root > div > header") ?? document.querySelector("header");
      if (!(header instanceof HTMLElement)) return;
      header.style.visibility = header.dataset.footerAuditVisibility ?? "";
      delete header.dataset.footerAuditVisibility;
    });
  }
  return path.relative(process.cwd(), outputPath).split(path.sep).join("/");
}

async function collectEnglishFooterCheck(page, viewport) {
  if (viewport.name !== "mobile") return null;
  await page.evaluate(() => {
    const button = [...document.querySelectorAll("footer button")]
      .find((element) => element.textContent?.trim() === "English");
    if (button instanceof HTMLElement) button.click();
  });
  await page.waitForTimeout(100);
  const measurements = await collect(page);
  await page.evaluate(() => {
    const button = [...document.querySelectorAll("footer button")]
      .find((element) => element.textContent?.trim() === "한국어");
    if (button instanceof HTMLElement) button.click();
  });
  return {
    root: measurements.root,
    body: measurements.body,
    header: measurements.header,
    footer: measurements.footer,
    footerOffenders: measurements.footerOffenders,
    footerLinkCount: measurements.footerLinkCount,
    footerVisibleLinkCount: measurements.footerVisibleLinkCount,
  };
}

async function main() {
  await prepareOutput();
  const browser = await chromium.launch({ headless: true });
  const results = [];

  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: viewport.deviceScaleFactor,
        isMobile: viewport.isMobile,
        hasTouch: viewport.hasTouch,
        reducedMotion: "reduce",
        locale: "ko-KR",
      });

      for (const route of ROUTES) {
        const page = await context.newPage();
        const consoleErrors = [];
        const pageErrors = [];
        page.on("console", (message) => {
          if (message.type() === "error") consoleErrors.push(message.text());
        });
        page.on("pageerror", (error) => pageErrors.push(toErrorMessage(error)));

        try {
          const response = await page.goto(buildUrl(route), { waitUntil: "networkidle", timeout: 60_000 });
          await stabilize(page);
          const measurements = await collect(page);
          const screenshot = await captureFooter(page, viewport, route);
          const englishFooterCheck = await collectEnglishFooterCheck(page, viewport);
          results.push({
            route,
            viewport: viewport.name,
            width: viewport.width,
            height: viewport.height,
            httpStatus: response?.status() ?? null,
            finalUrl: page.url(),
            ...measurements,
            consoleErrors,
            pageErrors,
            screenshot,
            englishFooterCheck,
          });
          console.log(`${viewport.name.padEnd(7)} ${route.padEnd(26)} ${measurements.root.scrollWidth}/${measurements.root.clientWidth}`);
        } catch (error) {
          results.push({ route, viewport: viewport.name, error: toErrorMessage(error), consoleErrors, pageErrors });
          console.error(`FAIL ${viewport.name} ${route}`);
        } finally {
          await page.close();
        }
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }

  const report = {
    generatedAt: new Date().toISOString(),
    label: LABEL,
    baseUrl: BASE_URL,
    routes: ROUTES,
    viewports: VIEWPORTS.map(({ name, width, height }) => ({ name, width, height })),
    summary: {
      resultCount: results.length,
      errorCount: results.filter((result) => result.error).length,
      consoleErrorCount: results.reduce((sum, result) => sum + (result.consoleErrors?.length ?? 0), 0),
      pageErrorCount: results.reduce((sum, result) => sum + (result.pageErrors?.length ?? 0), 0),
      mobileRootOverflowCount: results.filter((result) => result.viewport === "mobile" && result.root?.delta > 1).length,
      mobileEnglishRootOverflowCount: results.filter((result) => result.viewport === "mobile" && result.englishFooterCheck?.root.delta > 1).length,
      footerOffenderCount: results.reduce((sum, result) => sum + (result.footerOffenders?.length ?? 0), 0),
      englishFooterOffenderCount: results.reduce((sum, result) => sum + (result.englishFooterCheck?.footerOffenders.length ?? 0), 0),
    },
    results,
  };

  await writeFile(path.join(OUTPUT_DIR, "measurements.json"), JSON.stringify(report, null, 2), "utf8");
  console.log(JSON.stringify(report.summary, null, 2));

  if (report.summary.errorCount > 0 || report.summary.consoleErrorCount > 0 || report.summary.pageErrorCount > 0) {
    process.exitCode = 1;
  }
  if (EXPECT_NO_ROOT_OVERFLOW && report.summary.mobileRootOverflowCount > 0) {
    process.exitCode = 1;
  }
  if (EXPECT_NO_ROOT_OVERFLOW && report.summary.mobileEnglishRootOverflowCount > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
