import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = resolve(projectRoot, "dist");
const indexHtmlPath = resolve(distDir, "index.html");
const hostingConfigPath = resolve(projectRoot, ".openai", "hosting.json");
const distOpenAiDir = resolve(distDir, ".openai");
const serverDir = resolve(distDir, "server");

const indexHtml = await readFile(indexHtmlPath, "utf8");

await mkdir(distOpenAiDir, { recursive: true });
await mkdir(serverDir, { recursive: true });
await copyFile(hostingConfigPath, resolve(distOpenAiDir, "hosting.json"));

const workerSource = `const INDEX_HTML = ${JSON.stringify(indexHtml)};

function hasFileExtension(pathname) {
  return /\\/[^/]+\\.[A-Za-z0-9]+$/.test(pathname);
}

function htmlHeaders() {
  return {
    "content-type": "text/html; charset=utf-8",
    "cache-control": "no-cache",
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const isDocumentRequest =
      request.method === "GET" || request.method === "HEAD";

    if (env?.ASSETS?.fetch) {
      const assetResponse = await env.ASSETS.fetch(request);
      if (assetResponse.status !== 404 || hasFileExtension(url.pathname)) {
        return assetResponse;
      }
    }

    if (!isDocumentRequest) {
      return new Response("Method Not Allowed", {
        status: 405,
        headers: { allow: "GET, HEAD" },
      });
    }

    if (request.method === "HEAD") {
      return new Response(null, { headers: htmlHeaders() });
    }

    return new Response(INDEX_HTML, { headers: htmlHeaders() });
  },
};
`;

await writeFile(resolve(serverDir, "index.js"), workerSource);
