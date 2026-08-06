import {
  RequestError,
  escapeHtml,
  isAllowedOrigin,
  json,
  optionalText,
  readAttachment,
  requiredText,
  sendResendEmail,
} from "../src/server/resendEmail";

const ALLOWED_EXTENSIONS = [".pdf", ".ppt", ".pptx", ".doc", ".docx"] as const;
const INQUIRY_TYPES = {
  hitpick: ["global-expansion", "content-ip", "creator-marketing", "global-partner"],
  erumter: ["automation", "ai-development", "ax-education", "ax-diagnosis"],
  general: ["general-inquiry", "partnership", "other"],
} as const;

function validateSelection(service: string, inquiryType: string) {
  const allowedTypes = INQUIRY_TYPES[service as keyof typeof INQUIRY_TYPES];
  if (!allowedTypes || !(allowedTypes as readonly string[]).includes(inquiryType)) {
    throw new RequestError("Invalid service or inquiry type.", 400);
  }
}

function tableRow(label: string, value: string) {
  return `<tr><td style="border:1px solid #e4e6ea;width:180px"><strong>${label}</strong></td><td style="border:1px solid #e4e6ea">${escapeHtml(value || "-")}</td></tr>`;
}

export default {
  async fetch(request: Request) {
    if (request.method !== "POST") {
      return json({ success: false, message: "Method not allowed." }, 405);
    }
    if (!isAllowedOrigin(request)) {
      return json({ success: false, message: "Origin not allowed." }, 403);
    }

    try {
      const formData = await request.formData();
      const service = requiredText(formData, "service", 40);
      const inquiryType = requiredText(formData, "inquiryType", 80);
      const organization = requiredText(formData, "organization", 160);
      const contactName = requiredText(formData, "contactName", 100);
      const email = requiredText(formData, "email", 160);
      const country = optionalText(formData, "country", 100);
      const projectSummary = requiredText(formData, "projectSummary", 5000);
      const targetMarket = optionalText(formData, "targetMarket", 200);
      const timeline = optionalText(formData, "timeline", 100);
      const budget = optionalText(formData, "budget", 100);
      const consent = formData.get("consent") === "true";

      validateSelection(service, inquiryType);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new RequestError("Invalid email address.", 400);
      }
      if (projectSummary.length < 30) {
        throw new RequestError("Project summary must be at least 30 characters.", 400);
      }
      if (!consent) {
        throw new RequestError("Privacy consent is required.", 400);
      }

      const attachment = await readAttachment(formData, ALLOWED_EXTENSIONS);
      const referenceId = `INQ-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
      const text = [
        `문의 번호: ${referenceId}`,
        `서비스: ${service}`,
        `문의 유형: ${inquiryType}`,
        `기관 / 회사명: ${organization}`,
        `담당자: ${contactName}`,
        `이메일: ${email}`,
        `국가: ${country || "-"}`,
        `목표 시장 / 지역: ${targetMarket || "-"}`,
        `예상 일정: ${timeline || "-"}`,
        `예산 범위: ${budget || "-"}`,
        "",
        "프로젝트 요약",
        projectSummary,
      ].join("\n");
      const html = `
        <h2>ERUTY 프로젝트 문의</h2>
        <p><strong>문의 번호:</strong> ${escapeHtml(referenceId)}</p>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:760px">
          ${tableRow("서비스", service)}
          ${tableRow("문의 유형", inquiryType)}
          ${tableRow("기관 / 회사명", organization)}
          ${tableRow("담당자", contactName)}
          ${tableRow("이메일", email)}
          ${tableRow("국가", country)}
          ${tableRow("목표 시장 / 지역", targetMarket)}
          ${tableRow("예상 일정", timeline)}
          ${tableRow("예산 범위", budget)}
        </table>
        <h3>프로젝트 요약</h3>
        <p style="white-space:pre-wrap">${escapeHtml(projectSummary)}</p>
      `;
      const deliveryId = await sendResendEmail({
        notificationEmail: process.env.INQUIRY_NOTIFICATION_EMAIL,
        replyTo: email,
        subject: `[ERUTY 문의] ${organization} · ${service} / ${inquiryType}`,
        html,
        text,
        attachment,
        idempotencyKey: referenceId,
      });

      return json({ success: true, referenceId, deliveryId, mode: "live" });
    } catch (error) {
      if (error instanceof RequestError) {
        return json({ success: false, message: error.message }, error.status);
      }
      console.error("Inquiry API request failed.", error);
      return json({ success: false, message: "Inquiry request failed." }, 500);
    }
  },
};
