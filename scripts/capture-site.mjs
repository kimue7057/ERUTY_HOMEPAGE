/* global URL, console, document, window */

import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const BASE_URL = "https://erutyhomepage.vercel.app";
const OUTPUT_DIR = path.resolve("screenshots");
const NAVIGATION_TIMEOUT_MS = 60_000;
const POST_LOAD_WAIT_MS = 2_000;

const ROUTES = [
  { route: "/", filename: "home.png" },
  { route: "/company/about", filename: "company-about.png" },
  {
    route: "/company/global-network",
    filename: "company-global-network.png",
  },
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

async function captureRoute(context, viewport, routeConfig) {
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const targetUrl = buildUrl(routeConfig.route);
  const screenshotRelativePath = normalizePath(
    path.join(viewport.name, routeConfig.filename),
  );
  const screenshotPath = path.join(OUTPUT_DIR, viewport.name, routeConfig.filename);

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
  if (failedCaptures.length > 0) {
    console.warn(
      `Completed with ${failedCaptures.length} failed capture(s). See screenshots/report.json for details.`,
    );
  } else {
    console.log("Completed all screenshot captures successfully.");
  }
}

main().catch((error) => {
  console.error("Unable to complete screenshot capture.", error);
  process.exitCode = 1;
});
