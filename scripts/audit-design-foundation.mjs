/* global console */

import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const rootDir = process.cwd();
const sourceDir = path.join(rootDir, "src");
const outputDir = path.join(rootDir, "reports", "design-system");
const outputPath = path.join(outputDir, "foundation-audit.json");
const extensions = new Set([".css", ".scss", ".ts", ".tsx", ".html"]);

const exceptionMatchers = [
  { namespace: "service-hitpick-*", pattern: /[\\/]pages[\\/]services[\\/]hitpick[\\/]/i },
  { namespace: "service-erumter-*", pattern: /[\\/]pages[\\/]services[\\/]erumter[\\/]/i },
  { namespace: "mockup-*", pattern: /TechnologyComponents\.tsx$/i },
];

const arbitraryKinds = [
  { kind: "font-size", pattern: /(?:^|:|\s)text-\[[^\]]+\]/g },
  { kind: "line-height", pattern: /(?:^|:|\s)leading-\[[^\]]+\]/g },
  { kind: "letter-spacing", pattern: /(?:^|:|\s)tracking-\[[^\]]+\]/g },
  { kind: "spacing", pattern: /(?:^|:|\s)(?:-?(?:m|p)[trblxy]?|gap-[xy]?|space-[xy]|inset-[xy]?|top|right|bottom|left)-\[[^\]]+\]/g },
  { kind: "color", pattern: /(?:^|:|\s)(?:text|bg|border|fill|stroke)-\[(?:#[0-9a-f]{3,8}|rgba?\([^\]]+\))\]/gi },
];

const namespacePattern = /\b(?:service-hitpick|service-erumter|mockup|illustration|decorative-label|horizontal-scroll)-[\w-]+/g;
const directCssPattern = /\b(font-size|line-height|letter-spacing|gap|padding(?:-[a-z]+)?|margin(?:-[a-z]+)?|max-width)\s*:\s*([^;}{]+)/g;

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(absolute);
    return extensions.has(path.extname(entry.name)) ? [absolute] : [];
  });
}

function locationFor(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function relative(file) {
  return path.relative(rootDir, file).replaceAll("\\", "/");
}

function exceptionFor(file) {
  return exceptionMatchers.find(({ pattern }) => pattern.test(file))?.namespace ?? null;
}

const files = walk(sourceDir);
const arbitraryValues = [];
const namespaceUsages = [];
const directValues = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const sourceFile = relative(file);
  const exceptionNamespace = exceptionFor(file);

  for (const { kind, pattern } of arbitraryKinds) {
    pattern.lastIndex = 0;
    for (const match of content.matchAll(pattern)) {
      arbitraryValues.push({
        kind,
        value: match[0].trim(),
        file: sourceFile,
        line: locationFor(content, match.index),
        exceptionNamespace,
        status: exceptionNamespace ? "exception-review" : "normal-page-review",
      });
    }
  }

  namespacePattern.lastIndex = 0;
  for (const match of content.matchAll(namespacePattern)) {
    const namespace = `${match[0].split("-").slice(0, -1).join("-")}-*`;
    namespaceUsages.push({
      value: match[0],
      file: sourceFile,
      line: locationFor(content, match.index),
      expectedNamespace: exceptionNamespace,
      status: exceptionNamespace ? "in-exception-area" : "review-boundary",
      namespace,
    });
  }

  if (!exceptionNamespace && sourceFile !== "src/styles/theme.css") {
    directCssPattern.lastIndex = 0;
    for (const match of content.matchAll(directCssPattern)) {
      const value = match[2].trim();
      if (!/(?:px|rem|em|vw|vh|clamp\(|calc\()/i.test(value)) continue;
      directValues.push({
        property: match[1],
        value,
        file: sourceFile,
        line: locationFor(content, match.index),
        status: "inventory-not-ci-error",
      });
    }
  }
}

const uniqueArbitrary = new Set(arbitraryValues.map(({ kind, value }) => `${kind}:${value}`));
const report = {
  generatedAt: new Date().toISOString(),
  policy: {
    mode: "report-only",
    rootFontSize: "17px",
    note: "This inventory establishes a baseline. It intentionally does not fail CI.",
    exceptionNamespaces: [
      "service-hitpick-*",
      "service-erumter-*",
      "mockup-*",
      "illustration-*",
      "decorative-label-*",
      "horizontal-scroll-*",
    ],
  },
  summary: {
    filesScanned: files.length,
    arbitraryOccurrences: arbitraryValues.length,
    uniqueArbitraryValues: uniqueArbitrary.size,
    normalPageArbitraryOccurrences: arbitraryValues.filter(({ exceptionNamespace }) => !exceptionNamespace).length,
    exceptionArbitraryOccurrences: arbitraryValues.filter(({ exceptionNamespace }) => exceptionNamespace).length,
    namespaceBoundaryReviews: namespaceUsages.filter(({ status }) => status === "review-boundary").length,
    directValueReviews: directValues.length,
  },
  arbitraryValues,
  namespaceUsages,
  directValues,
};

fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`);

console.log(`Foundation audit: ${report.summary.filesScanned} files`);
console.log(`Arbitrary values: ${report.summary.arbitraryOccurrences} occurrences / ${report.summary.uniqueArbitraryValues} unique`);
console.log(`Exception occurrences: ${report.summary.exceptionArbitraryOccurrences}`);
console.log(`Report: ${relative(outputPath)}`);
