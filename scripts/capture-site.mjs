/* global URL, console, document, window, HTMLElement, Event */

import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const DEFAULT_BASE_URL = "https://erutyhomepage.vercel.app";
const BASE_URL = process.env.CAPTURE_BASE_URL ?? DEFAULT_BASE_URL;
const OUTPUT_DIR = path.resolve("screenshots");
const NAVIGATION_TIMEOUT_MS = 60_000;
const POST_LOAD_WAIT_MS = 2_000;

const ROUTES = [
  { route: "/", filename: "home.png" },
  { route: "/company/about", filename: "company-about.png" },
  { route: "/company/team", filename: "company-team.png" },
  { route: "/company/growth", filename: "company-growth.png" },
  { route: "/company/careers", filename: "company-careers.png" },
  { route: "/services/hitpick", filename: "services-hitpick.png" },
  { route: "/services/erumter", filename: "services-erumter.png" },
  { route: "/technology", filename: "technology.png" },
  { route: "/resources", filename: "resources.png" },
  { route: "/start-a-project", filename: "start-a-project.png" },
];

const VIEWPORTS = [
  {
    name: "desktop",
    width: 1440,
    height: 1000,
    contextOptions: {
      viewport: { width: 1440, height: 1000 },
      deviceScaleFactor: 1,
    },
  },
  {
    name: "mobile",
    width: 390,
    height: 844,
    contextOptions: {
      viewport: { width: 390, height: 844 },
      deviceScaleFactor: 2,
      hasTouch: true,
      isMobile: true,
    },
  },
];

function buildUrl(route) {
  return new URL(route, BASE_URL).toString();
}

function normalizePath(filePath) {
  return filePath.split(path.sep).join("/");
}

function buildScreenshotPaths(viewportName, filename) {
  const relativePath = normalizePath(path.join(viewportName, filename));

  return {
    relativePath,
    absolutePath: path.join(OUTPUT_DIR, viewportName, filename),
  };
}

function toErrorMessage(error) {
  if (error instanceof Error) {
    return error.stack ?? error.message;
  }

  return String(error);
}

async function prepareOutputDirectory() {
  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(path.join(OUTPUT_DIR, "desktop"), { recursive: true });
  await mkdir(path.join(OUTPUT_DIR, "mobile"), { recursive: true });
}

async function captureLocatorScreenshot(page, viewport, options) {
  const { selector, filename, label } = options;
  const { relativePath, absolutePath } = buildScreenshotPaths(
    viewport.name,
    filename,
  );
  const result = {
    label,
    selector,
    screenshotFilename: relativePath,
    success: false,
    captureError: null,
  };

  try {
    const locator = page.locator(selector).first();
    await locator.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await locator.screenshot({ path: absolutePath });
    result.success = true;
  } catch (error) {
    result.captureError = toErrorMessage(error);
  }

  return result;
}

async function capturePreparedPageScreenshot(page, viewport, options) {
  const { filename, label, prepare } = options;
  const { relativePath, absolutePath } = buildScreenshotPaths(
    viewport.name,
    filename,
  );
  const result = {
    label,
    screenshotFilename: relativePath,
    success: false,
    captureError: null,
  };

  try {
    if (prepare) {
      await prepare();
    }

    await page.waitForTimeout(250);
    await page.screenshot({ path: absolutePath });
    result.success = true;
  } catch (error) {
    result.captureError = toErrorMessage(error);
  }

  return result;
}

async function scrollJourneyByCards(page, steps) {
  await page.locator("[data-about-journey]").scrollIntoViewIfNeeded();

  await page.evaluate((cardSteps) => {
    const scroller = document.querySelector("[data-journey-scroller]");
    const firstCard = scroller?.querySelector("[data-journey-card]");

    if (!(scroller instanceof HTMLElement) || !(firstCard instanceof HTMLElement)) {
      return;
    }

    const styles = window.getComputedStyle(scroller);
    const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
    const distance = (firstCard.getBoundingClientRect().width + gap) * cardSteps;

    scroller.scrollLeft = distance;
    scroller.dispatchEvent(new Event("scroll"));
  }, steps);

  await page.waitForTimeout(350);
}

async function captureAboutPageDetails(page, viewport) {
  const captures = [];

  captures.push(
    await captureLocatorScreenshot(page, viewport, {
      selector: "[data-about-hero]",
      filename: "company-about-hero.png",
      label: "Company About Hero",
    }),
  );

  captures.push(
    await captureLocatorScreenshot(page, viewport, {
      selector: "[data-about-identity]",
      filename: "company-about-identity.png",
      label: "Company About Identity",
    }),
  );

  captures.push(
    await captureLocatorScreenshot(page, viewport, {
      selector: "[data-about-beginning]",
      filename: "company-about-beginning.png",
      label: "Company About Beginning",
    }),
  );

  captures.push(
    await captureLocatorScreenshot(page, viewport, {
      selector: "[data-about-journey]",
      filename: "company-about-journey-start.png",
      label: "Company About Journey Start",
    }),
  );

  await scrollJourneyByCards(page, viewport.name === "desktop" ? 2 : 1);

  captures.push(
    await captureLocatorScreenshot(page, viewport, {
      selector: "[data-about-journey]",
      filename:
        viewport.name === "desktop"
          ? "company-about-journey-mid.png"
          : "company-about-journey-after.png",
      label:
        viewport.name === "desktop"
          ? "Company About Journey Mid"
          : "Company About Journey After Swipe",
    }),
  );

  if (viewport.name === "desktop") {
    captures.push(
      await capturePreparedPageScreenshot(page, viewport, {
        filename: "company-about-cta-footer.png",
        label: "Company About CTA and Footer",
        prepare: async () => {
          await page.evaluate(() => {
            const cta = document.querySelector("[data-about-cta]");
            const footer = document.querySelector("footer");

            if (!(cta instanceof HTMLElement) || !(footer instanceof HTMLElement)) {
              return;
            }

            const footerRect = footer.getBoundingClientRect();
            const scrollY = window.scrollY;
            const footerTop = footerRect.top + scrollY;
            const maxScrollTop = Math.max(
              0,
              document.documentElement.scrollHeight - window.innerHeight,
            );
            const targetTop = Math.min(
              maxScrollTop,
              Math.max(0, Math.round(footerTop - window.innerHeight * 0.42)),
            );

            window.scrollTo({ top: targetTop, behavior: "auto" });
          });
        },
      }),
    );
  }

  return captures;
}

async function captureRoute(context, viewport, routeConfig) {
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const targetUrl = buildUrl(routeConfig.route);
  const { relativePath: screenshotRelativePath, absolutePath: screenshotPath } =
    buildScreenshotPaths(viewport.name, routeConfig.filename);

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  page.on("pageerror", (error) => {
    pageErrors.push(toErrorMessage(error));
  });

  const result = {
    route: routeConfig.route,
    viewport: {
      name: viewport.name,
      width: viewport.width,
      height: viewport.height,
    },
    finalUrl: targetUrl,
    httpStatus: null,
    consoleErrors,
    pageErrors,
    horizontalOverflow: null,
    documentWidth: null,
    viewportWidth: viewport.width,
    documentHeight: null,
    screenshotFilename: screenshotRelativePath,
    detailCaptures: [],
    success: false,
    captureError: null,
  };

  try {
    const response = await page.goto(targetUrl, {
      waitUntil: "networkidle",
      timeout: NAVIGATION_TIMEOUT_MS,
    });

    result.httpStatus = response?.status() ?? null;

    await page.waitForTimeout(POST_LOAD_WAIT_MS);

    const metrics = await page.evaluate(() => ({
      documentHeight: document.documentElement.scrollHeight,
      documentWidth: document.documentElement.scrollWidth,
      finalUrl: window.location.href,
      horizontalOverflow:
        document.documentElement.scrollWidth > window.innerWidth,
      viewportWidth: window.innerWidth,
    }));

    result.finalUrl = metrics.finalUrl;
    result.horizontalOverflow = metrics.horizontalOverflow;
    result.documentWidth = metrics.documentWidth;
    result.viewportWidth = metrics.viewportWidth;
    result.documentHeight = metrics.documentHeight;

    await page.screenshot({
      path: screenshotPath,
      fullPage: true,
    });

    if (routeConfig.route === "/company/about") {
      result.detailCaptures = await captureAboutPageDetails(page, viewport);
    }

    result.success = true;
  } catch (error) {
    result.finalUrl = page.url() || targetUrl;
    result.captureError = toErrorMessage(error);
  } finally {
    await page.close();
  }

  return result;
}

async function main() {
  await prepareOutputDirectory();

  const browser = await chromium.launch({ headless: true });
  const report = {
    generatedAt: new Date().toISOString(),
    baseUrl: BASE_URL,
    results: [],
  };

  try {
    for (const viewport of VIEWPORTS) {
      const context = await browser.newContext(viewport.contextOptions);

      try {
        for (const routeConfig of ROUTES) {
          const result = await captureRoute(context, viewport, routeConfig);
          report.results.push(result);

          const statusLabel =
            result.httpStatus === null ? "no-response" : String(result.httpStatus);
          const suffix = result.success ? "ok" : "failed";
          console.log(
            `[${viewport.name}] ${routeConfig.route} -> ${statusLabel} (${suffix})`,
          );
        }
      } finally {
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  await writeFile(
    path.join(OUTPUT_DIR, "report.json"),
    JSON.stringify(report, null, 2),
    "utf8",
  );

  const failedCaptures = report.results.filter((entry) => !entry.success);
  const failedDetailCaptures = report.results.flatMap((entry) =>
    (entry.detailCaptures ?? []).filter((detail) => !detail.success),
  );

  if (failedCaptures.length > 0 || failedDetailCaptures.length > 0) {
    console.warn(
      `Completed with ${failedCaptures.length} failed page capture(s) and ${failedDetailCaptures.length} failed detail capture(s). See screenshots/report.json for details.`,
    );
  } else {
    console.log("Completed all screenshot captures successfully.");
  }
}

main().catch((error) => {
  console.error("Unable to complete screenshot capture.", error);
  process.exitCode = 1;
});
