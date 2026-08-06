import { Buffer } from "node:buffer";

export const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;

type ResendApiResult = {
  id?: string;
  message?: string;
  error?: { message?: string };
};

export type EmailAttachment = {
  filename: string;
  content: string;
};

export class RequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

export function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

export function requiredText(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key);
  if (typeof value !== "string" || !value.trim()) {
    throw new RequestError(`${key} is required.`, 400);
  }
  return value.trim().slice(0, maxLength);
}

export function optionalText(formData: FormData, key: string, maxLength: number) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function sanitizeFilename(filename: string) {
  return filename.replace(/[^a-zA-Z0-9._()\-가-힣]/g, "_").slice(0, 140);
}

export async function readAttachment(
  formData: FormData,
  allowedExtensions: readonly string[],
): Promise<EmailAttachment | undefined> {
  const value = formData.get("attachment");
  if (!(value instanceof File) || value.size === 0) return undefined;

  const lowerName = value.name.toLowerCase();
  if (!allowedExtensions.some((extension) => lowerName.endsWith(extension))) {
    throw new RequestError("Unsupported attachment type.", 400);
  }
  if (value.size > MAX_ATTACHMENT_BYTES) {
    throw new RequestError("Attachment must be 3MB or smaller.", 413);
  }

  return {
    filename: sanitizeFilename(value.name),
    content: Buffer.from(await value.arrayBuffer()).toString("base64"),
  };
}

export async function sendResendEmail({
  notificationEmail,
  replyTo,
  subject,
  html,
  text,
  attachment,
  idempotencyKey,
}: {
  notificationEmail: string | undefined;
  replyTo: string;
  subject: string;
  html: string;
  text: string;
  attachment?: EmailAttachment;
  idempotencyKey: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const recipients = notificationEmail
    ?.split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (!apiKey || !from || !recipients?.length) {
    throw new RequestError("Email service is not configured.", 503);
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify({
      from,
      to: recipients,
      reply_to: replyTo,
      subject,
      html,
      text,
      attachments: attachment ? [attachment] : undefined,
    }),
  });

  const responseText = await response.text();
  let result: ResendApiResult = {};
  if (responseText) {
    try {
      result = JSON.parse(responseText) as ResendApiResult;
    } catch {
      result = { message: responseText.slice(0, 300) };
    }
  }

  if (!response.ok || !result.id) {
    const message = result.message || result.error?.message || "Resend delivery failed.";
    console.error("Resend delivery failed.", response.status, message);
    throw new RequestError("Email delivery failed.", 502);
  }

  return result.id;
}
