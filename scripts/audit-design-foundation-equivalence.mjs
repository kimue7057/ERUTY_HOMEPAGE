/* global console, document, getComputedStyle, HTMLElement, window */

import crypto from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { URL } from "node:url";
import { chromium } from "playwright";

const baselineUrl = process.env.FOUNDATION_BASELINE_URL;
const currentUrl = process.env.FOUNDATION_CURRENT_URL;
const baselineRef = process.env.FOUNDATION_BASELINE_REF ?? null;
const currentRef = process.env.FOUNDATION_CURRENT_REF ?? null;

if (!baselineUrl || !currentUrl) {
  throw new Error("Set FOUNDATION_BASELINE_URL and FOUNDATION_CURRENT_URL before running this audit.");
}

const routes = [
  "/",
  "/company/careers",
  "/company/team",
  "/technology",
  "/services/hitpick",
  "/services/erumter",
];

const viewports = {
  desktop: { width: 1440, height: 1000 },
  mobile: { width: 390, height: 844 },
};

const outputDir = path.join(process.cwd(), "reports", "design-system");
const screenshotRoot = path.join(process.cwd(), "screenshots", "design-system-foundation");
const selectors = {
  displayHome: ".eruty-home-display",
  pageTitle: ".eruty-page-title",
  sectionTitle: ".eruty-section-title",
  cardTitle: ".eruty-card-title",
  body: ".eruty-body",
  bodySmall: ".eruty-body-small",
  pageDescription: ".eruty-page-heading__description",
  sectionDescription: ".eruty-section-heading__description",
  container: ".eruty-container",
  section: ".eruty-section, .eruty-section-compact, .eruty-hero-section",
  button: "main button, main a[href]",
};

function slug(route) {
  return route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
}

function number(value) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function delta(before, after) {
  if (before === null || after === null) return null;
  return Math.round((after - before) * 1000) / 1000;
}

async function stabilize(page) {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-delay: 0s !important;
        animation-duration: 0s !important;
        transition-delay: 0s !important;
        transition-duration: 0s !important;
        caret-color: transparent !important;
      }
      video { visibility: hidden !important; }
    `,
  });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(150);
}

async function collect(page) {
  return page.evaluate((roleSelectors) => {
    const visible = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    };

    const describe = (element) => {
      const style = getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return {
        tag: element.tagName.toLowerCase(),
        className: typeof element.className === "string" ? element.className.slice(0, 240) : "",
        text: (element.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 100),
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        padding: style.padding,
        margin: style.margin,
        gap: style.gap,
        width: style.width,
        maxWidth: style.maxWidth,
        rect: {
          x: Math.round(rect.x * 1000) / 1000,
          y: Math.round(rect.y * 1000) / 1000,
          width: Math.round(rect.width * 1000) / 1000,
          height: Math.round(rect.height * 1000) / 1000,
        },
      };
    };

    const roles = Object.fromEntries(
      Object.entries(roleSelectors).map(([role, selector]) => [
        role,
        [...document.querySelectorAll(selector)].filter(visible).slice(0, 6).map(describe),
      ]),
    );

    const pageTitle = document.querySelector(".eruty-page-heading__title");
    const pageDescription = document.querySelector(".eruty-page-heading__description");
    const sectionTitle = document.querySelector(".eruty-section-heading__title");
    const sectionDetails = document.querySelector(".eruty-section-heading__details");
    const rectGap = (first, second) => {
      if (!(first instanceof HTMLElement) || !(second instanceof HTMLElement) || !visible(first) || !visible(second)) return null;
      return Math.round((second.getBoundingClientRect().top - first.getBoundingClientRect().bottom) * 1000) / 1000;
    };

    return {
      rootFontSize: getComputedStyle(document.documentElement).fontSize,
      bodyFontSize: getComputedStyle(document.body).fontSize,
      document: {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
      },
      gaps: {
        pageTitleDescription: rectGap(pageTitle, pageDescription),
        sectionTitleDescription: rectGap(sectionTitle, sectionDetails),
      },
      roles,
    };
  }, selectors);
}

function compareMetrics(before, after) {
  const differences = [];
  for (const [role, beforeItems] of Object.entries(before.roles)) {
    const afterItems = after.roles[role] ?? [];
    for (let index = 0; index < Math.max(beforeItems.length, afterItems.length); index += 1) {
      const beforeItem = beforeItems[index];
      const afterItem = afterItems[index];
      if (!beforeItem || !afterItem) {
        differences.push({ role, index, property: "presence", before: Boolean(beforeItem), after: Boolean(afterItem) });
        continue;
      }
      for (const property of ["fontSize", "lineHeight", "letterSpacing", "padding", "width", "maxWidth"]) {
        if (beforeItem[property] !== afterItem[property]) {
          differences.push({
            role,
            index,
            property,
            before: beforeItem[property],
            after: afterItem[property],
            deltaPx: delta(number(beforeItem[property]), number(afterItem[property])),
          });
        }
      }
      for (const property of ["width", "height"]) {
        if (beforeItem.rect[property] !== afterItem.rect[property]) {
          differences.push({
            role,
            index,
            property: `rect.${property}`,
            before: beforeItem.rect[property],
            after: afterItem.rect[property],
            deltaPx: delta(beforeItem.rect[property], afterItem.rect[property]),
          });
        }
      }
    }
  }
  return differences;
}

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const [viewportName, viewport] of Object.entries(viewports)) {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 1,
      colorScheme: "light",
      reducedMotion: "reduce",
    });
    for (const route of routes) {
      const conditions = {};
      for (const [condition, baseUrl] of [["before", baselineUrl], ["after", currentUrl]]) {
        const page = await context.newPage();
        const errors = [];
        page.on("console", (message) => {
          if (message.type() === "error") errors.push(`console: ${message.text()}`);
        });
        page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
        await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "networkidle" });
        await stabilize(page);
        const metrics = await collect(page);
        const screenshotDir = path.join(screenshotRoot, condition, viewportName);
        await mkdir(screenshotDir, { recursive: true });
        const screenshotPath = path.join(screenshotDir, `${slug(route)}.png`);
        const screenshot = await page.screenshot({
          path: screenshotPath,
          animations: "disabled",
          caret: "hide",
          fullPage: false,
        });
        conditions[condition] = {
          url: page.url(),
          metrics,
          errors,
          screenshot: path.relative(process.cwd(), screenshotPath).replaceAll("\\", "/"),
          screenshotSha256: crypto.createHash("sha256").update(screenshot).digest("hex"),
        };
        await page.close();
      }

      const differences = compareMetrics(conditions.before.metrics, conditions.after.metrics);
      results.push({
        route,
        viewport: viewportName,
        viewportSize: viewport,
        before: conditions.before,
        after: conditions.after,
        comparison: {
          screenshotHashMatch: conditions.before.screenshotSha256 === conditions.after.screenshotSha256,
          metricDifferenceCount: differences.length,
          differences,
          wrapChangeCount: differences.filter(({ property }) => property === "rect.height").length,
          horizontalOverflowBefore:
            conditions.before.metrics.document.scrollWidth - conditions.before.metrics.document.clientWidth,
          horizontalOverflowAfter:
            conditions.after.metrics.document.scrollWidth - conditions.after.metrics.document.clientWidth,
        },
      });
      console.log(`${viewportName} ${route}: ${differences.length} metric differences`);
    }
    await context.close();
  }
} finally {
  await browser.close();
}

const report = {
  generatedAt: new Date().toISOString(),
  baselineUrl,
  currentUrl,
  baselineRef,
  currentRef,
  routes,
  viewports,
  tolerances: {
    fontSizePx: 0.5,
    lineHeightPx: 1,
    componentHeightPx: 1,
    containerGutterPx: 0,
  },
  summary: {
    comparisons: results.length,
    exactScreenshotMatches: results.filter(({ comparison }) => comparison.screenshotHashMatch).length,
    metricDifferences: results.reduce((sum, { comparison }) => sum + comparison.metricDifferenceCount, 0),
    wrapChanges: results.reduce((sum, { comparison }) => sum + comparison.wrapChangeCount, 0),
    afterHorizontalOverflowCases: results.filter(({ comparison }) => comparison.horizontalOverflowAfter > 1).length,
    consoleOrPageErrors: results.reduce((sum, result) => sum + result.before.errors.length + result.after.errors.length, 0),
  },
  results,
};

await mkdir(outputDir, { recursive: true });
const outputPath = path.join(outputDir, "foundation-visual-equivalence.json");
await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Report: ${path.relative(process.cwd(), outputPath)}`);
