import type { IncomingMessage } from "node:http";
import type { Plugin } from "vite";
import { loadEnv } from "vite";
import careersApi from "../api/careers";
import inquiriesApi from "../api/inquiries";

type ApiHandler = {
  fetch(request: Request): Promise<Response>;
};

const API_HANDLERS: Record<string, ApiHandler> = {
  "/api/careers": careersApi,
  "/api/inquiries": inquiriesApi,
};

async function readRequestBody(request: IncomingMessage) {
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return chunks.length > 0 ? Buffer.concat(chunks) : undefined;
}

export function localApiPlugin(): Plugin {
  return {
    name: "eruty-local-api",
    config(_, { mode }) {
      const env = loadEnv(mode, process.cwd(), "");
      for (const key of [
        "RESEND_API_KEY",
        "RESEND_FROM_EMAIL",
        "INQUIRY_NOTIFICATION_EMAIL",
        "CAREERS_NOTIFICATION_EMAIL",
      ]) {
        if (env[key]) process.env[key] = env[key];
      }
    },
    configureServer(server) {
      server.middlewares.use(async (request, response, next) => {
        const host = request.headers.host || "localhost";
        const url = new URL(request.url || "/", `http://${host}`);
        const handler = API_HANDLERS[url.pathname];
        if (!handler) {
          next();
          return;
        }

        try {
          const headers = new Headers();
          for (const [key, value] of Object.entries(request.headers)) {
            if (Array.isArray(value)) {
              value.forEach((item) => headers.append(key, item));
            } else if (value !== undefined) {
              headers.set(key, value);
            }
          }
          const method = request.method || "GET";
          const body = method === "GET" || method === "HEAD"
            ? undefined
            : await readRequestBody(request);
          const apiResponse = await handler.fetch(new Request(url, { method, headers, body }));

          response.statusCode = apiResponse.status;
          apiResponse.headers.forEach((value, key) => response.setHeader(key, value));
          response.end(Buffer.from(await apiResponse.arrayBuffer()));
        } catch (error) {
          console.error("Local API middleware failed.", error);
          response.statusCode = 500;
          response.setHeader("Content-Type", "application/json; charset=utf-8");
          response.end(JSON.stringify({ success: false, message: "Local API request failed." }));
        }
      });
    },
  };
}
