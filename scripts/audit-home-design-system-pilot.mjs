/* global console, document, getComputedStyle, window */

import crypto from "node:crypto";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { URL } from "node:url";
import { chromium } from "playwright";

const baseUrl = process.env.HOME_PILOT_BASE_URL ?? "http://127.0.0.1:4173";
const label = process.env.HOME_PILOT_LABEL ?? "after";
const reportDir = path.resolve("reports", "design-system");
const screenshotDir = path.resolve("screenshots", "home-design-system-pilot", label);
const reportPath = path.join(reportDir, `home-pilot-${label}.json`);

const viewports = {
  desktop: { width: 1440, height: 1000 },
  tablet1024: { width: 1024, height: 900 },
  tablet768: { width: 768, height: 1024 },
  mobile390: { width: 390, height: 844 },
  mobile360: { width: 360, height: 800 },
};

const routes = [
  { route: "/", languages: ["ko", "en"], viewports: Object.keys(viewports) },
  { route: "/company/careers", languages: ["ko"], viewports: ["desktop", "mobile390"] },
  { route: "/company/team", languages: ["ko"], viewports: ["desktop", "mobile390"] },
  { route: "/services/hitpick", languages: ["ko"], viewports: ["desktop", "mobile390"] },
  { route: "/services/erumter", languages: ["ko"], viewports: ["desktop", "mobile390"] },
  { route: "/technology", languages: ["ko"], viewports: ["desktop", "mobile390"] },
];

const roleSelectors = {
  heroTitle: "main > section:nth-of-type(1) h1",
  heroDescription: "main > section:nth-of-type(1) p",
  heroButton: "main > section:nth-of-type(1) a[href]",
  sectionTitle: ".eruty-section-title",
  sectionDescription: ".eruty-section-heading__description",
  cardTitle: ".eruty-card-title",
  cardBody: ".eruty-body-small",
  body: ".eruty-body",
  meta: ".eruty-meta",
  container: ".eruty-container",
  section: "main > section",
};

function slug(route) {
  return route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
}

function relative(filePath) {
  return path.relative(process.cwd(), filePath).replaceAll("\\", "/");
}

async function countHomeArbitraryValues() {
  const source = await readFile(path.resolve("src", "app", "pages", "HomePage.tsx"), "utf8");
  const tokens = [];
  for (const match of source.matchAll(/className\s*=\s*(?:"([^"]*)"|\{`([^`]*)`\})/g)) {
    for (const token of (match[1] ?? match[2] ?? "").split(/\s+/)) {
      if (token.includes("[") && token.includes("]")) tokens.push(token);
    }
  }
  return {
    occurrences: tokens.length,
    unique: new Set(tokens).size,
    values: Object.entries(
      tokens.reduce((counts, token) => ({ ...counts, [token]: (counts[token] ?? 0) + 1 }), {}),
    )
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value)),
  };
}

async function preparePage(page, language) {
  await page.addInitScript((languageValue) => {
    window.localStorage.setItem("eruty-lang", languageValue);
    window.setInterval = () => 0;
  }, language);
  await page.goto(new URL("/", baseUrl).toString(), { waitUntil: "load" });
}

async function stabilize(page) {
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
        caret-color: transparent !important;
      }
      video { visibility: hidden !important; }
    `,
  });
  await page.evaluate(async () => {
    if (document.fonts?.ready) await document.fonts.ready;
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(120);
}

async function collectMetrics(page) {
  return page.evaluate((selectors) => {
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
        text: (element.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 120),
        className: typeof element.className === "string" ? element.className.slice(0, 260) : "",
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        lineHeight: style.lineHeight,
        letterSpacing: style.letterSpacing,
        color: style.color,
        backgroundColor: style.backgroundColor,
        padding: style.padding,
        margin: style.margin,
        gap: style.gap,
        width: style.width,
        maxWidth: style.maxWidth,
        minHeight: style.minHeight,
        borderRadius: style.borderRadius,
        rect: {
          x: Math.round(rect.x * 1000) / 1000,
          y: Math.round(rect.y * 1000) / 1000,
          width: Math.round(rect.width * 1000) / 1000,
          height: Math.round(rect.height * 1000) / 1000,
        },
      };
    };
    const roles = Object.fromEntries(
      Object.entries(selectors).map(([role, selector]) => [
        role,
        [...document.querySelectorAll(selector)].filter(visible).slice(0, 8).map(describe),
      ]),
    );
    const interactive = [...document.querySelectorAll("a[href], button")].filter(visible);
    const smallTouchTargets = interactive
      .map(describe)
      .filter(({ rect }) => rect.width < 44 || rect.height < 44)
      .slice(0, 40);
    const headings = [...document.querySelectorAll("h1, h2, h3, h4")].filter(visible).map((heading) => ({
      level: Number(heading.tagName.slice(1)),
      text: (heading.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 120),
    }));
    const root = document.documentElement;
    return {
      rootFontSize: getComputedStyle(root).fontSize,
      bodyFontSize: getComputedStyle(document.body).fontSize,
      document: {
        scrollWidth: root.scrollWidth,
        clientWidth: root.clientWidth,
        bodyScrollWidth: document.body.scrollWidth,
        scrollHeight: root.scrollHeight,
      },
      h1Count: headings.filter(({ level }) => level === 1).length,
      headings,
      smallTouchTargets,
      roles,
    };
  }, roleSelectors);
}

async function capture(page, outputPath, options = {}) {
  await mkdir(path.dirname(outputPath), { recursive: true });
  const buffer = await page.screenshot({
    path: outputPath,
    animations: "disabled",
    caret: "hide",
    fullPage: options.fullPage ?? false,
  });
  return {
    path: relative(outputPath),
    sha256: crypto.createHash("sha256").update(buffer).digest("hex"),
  };
}

async function captureHomeDetails(page, basePath, viewportName) {
  const captures = {};
  captures.full = await capture(page, `${basePath}-full.png`, { fullPage: true });
  if (!["desktop", "mobile390"].includes(viewportName)) return captures;
  const targets = {
    hero: "main > section:nth-of-type(1)",
    sectionHeading: "main > section:nth-of-type(3) .eruty-section-heading",
    cards: "main > section:nth-of-type(4)",
    cta: "main > section:nth-of-type(5)",
    footer: "footer",
  };
  for (const [name, selector] of Object.entries(targets)) {
    const locator = page.locator(selector).first();
    if ((await locator.count()) === 0 || !(await locator.isVisible())) continue;
    const outputPath = `${basePath}-${name}.png`;
    await mkdir(path.dirname(outputPath), { recursive: true });
    const buffer = await locator.screenshot({ path: outputPath, animations: "disabled", caret: "hide" });
    captures[name] = {
      path: relative(outputPath),
      sha256: crypto.createHash("sha256").update(buffer).digest("hex"),
    };
  }
  return captures;
}

function compareReports(before, after) {
  const beforeByKey = new Map(before.results.map((item) => [item.key, item]));
  const rows = after.results.map((current) => {
    const previous = beforeByKey.get(current.key);
    const screenshotMatches = previous
      ? Object.fromEntries(
          Object.entries(current.screenshots).map(([name, shot]) => [
            name,
            previous.screenshots[name]?.sha256 === shot.sha256,
          ]),
        )
      : {};
    return {
      key: current.key,
      route: current.route,
      viewport: current.viewport,
      language: current.language,
      isHome: current.route === "/",
      rootOverflowBefore: previous
        ? previous.metrics.document.scrollWidth - previous.metrics.document.clientWidth
        : null,
      rootOverflowAfter: current.metrics.document.scrollWidth - current.metrics.document.clientWidth,
      h1CountBefore: previous?.metrics.h1Count ?? null,
      h1CountAfter: current.metrics.h1Count,
      screenshotMatches,
      allScreenshotsMatch: Object.values(screenshotMatches).every(Boolean),
      before: previous?.metrics ?? null,
      after: current.metrics,
    };
  });
  return {
    generatedAt: new Date().toISOString(),
    beforeReport: relative(reportPath.replace(`home-pilot-${label}`, "home-pilot-before")),
    afterReport: relative(reportPath),
    summary: {
      comparisons: rows.length,
      regressionComparisons: rows.filter(({ isHome }) => !isHome).length,
      exactRegressionScreenshotMatches: rows.filter(({ isHome, allScreenshotsMatch }) => !isHome && allScreenshotsMatch).length,
      homeComparisons: rows.filter(({ isHome }) => isHome).length,
      exactHomeScreenshotMatches: rows.filter(({ isHome, allScreenshotsMatch }) => isHome && allScreenshotsMatch).length,
      afterRootOverflowCases: rows.filter(({ rootOverflowAfter }) => rootOverflowAfter > 1).length,
    },
    arbitraryValues: { before: before.arbitraryValues, after: after.arbitraryValues },
    rows,
  };
}

await rm(screenshotDir, { recursive: true, force: true });
await mkdir(screenshotDir, { recursive: true });
await mkdir(reportDir, { recursive: true });

const arbitraryValues = await countHomeArbitraryValues();
const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const routeConfig of routes) {
    for (const viewportName of routeConfig.viewports) {
      const viewport = viewports[viewportName];
      for (const language of routeConfig.languages) {
        const context = await browser.newContext({
          viewport,
          colorScheme: "light",
          deviceScaleFactor: 1,
          hasTouch: viewport.width <= 390,
          isMobile: viewport.width <= 390,
          reducedMotion: "reduce",
        });
        const page = await context.newPage();
        const errors = [];
        page.on("console", (message) => {
          if (message.type() === "error") errors.push(`console: ${message.text()}`);
        });
        page.on("pageerror", (error) => errors.push(`page: ${error.message}`));
        await preparePage(page, language);
        if (routeConfig.route !== "/") {
          await page.goto(new URL(routeConfig.route, baseUrl).toString(), { waitUntil: "load" });
        }
        await stabilize(page);
        const metrics = await collectMetrics(page);
        const basePath = path.join(screenshotDir, viewportName, language, slug(routeConfig.route));
        const screenshots = routeConfig.route === "/"
          ? await captureHomeDetails(page, basePath, viewportName)
          : { full: await capture(page, `${basePath}-full.png`, { fullPage: true }) };
        const key = `${routeConfig.route}|${viewportName}|${language}`;
        results.push({ key, route: routeConfig.route, viewport: viewportName, viewportSize: viewport, language, metrics, screenshots, errors });
        console.log(`${label} ${key}: ${metrics.document.scrollWidth}/${metrics.document.clientWidth}`);
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}

const report = {
  generatedAt: new Date().toISOString(),
  label,
  baseUrl,
  sourceRef: process.env.HOME_PILOT_SOURCE_REF ?? null,
  arbitraryValues,
  summary: {
    resultCount: results.length,
    screenshotCount: results.reduce((sum, result) => sum + Object.keys(result.screenshots).length, 0),
    rootOverflowCases: results.filter(({ metrics }) => metrics.document.scrollWidth - metrics.document.clientWidth > 1).length,
    consoleOrPageErrors: results.reduce((sum, result) => sum + result.errors.length, 0),
    invalidHomeH1Cases: results.filter(({ route, metrics }) => route === "/" && metrics.h1Count !== 1).length,
  },
  results,
};

await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Report: ${relative(reportPath)}`);

if (label === "after") {
  const beforePath = path.join(reportDir, "home-pilot-before.json");
  const before = JSON.parse(await readFile(beforePath, "utf8"));
  const comparison = compareReports(before, report);
  const comparisonPath = path.join(reportDir, "home-pilot-comparison.json");
  await writeFile(comparisonPath, `${JSON.stringify(comparison, null, 2)}\n`);
  console.log(`Comparison: ${relative(comparisonPath)}`);
}
