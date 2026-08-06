import {
  RequestError,
  escapeHtml,
  isAllowedOrigin,
  json,
  readAttachment,
  requiredText,
  sendResendEmail,
} from "../src/server/resendEmail";

const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".zip"] as const;

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
      const name = requiredText(formData, "name", 80);
      const email = requiredText(formData, "email", 160);
      const phone = requiredText(formData, "phone", 40);
      const jobArea = requiredText(formData, "jobArea", 100);
      const careerLevel = requiredText(formData, "careerLevel", 100);
      const introduction = requiredText(formData, "introduction", 5000);
      const consent = formData.get("consent") === "true";

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new RequestError("Invalid email address.", 400);
      }
      if (!consent) {
        throw new RequestError("Privacy consent is required.", 400);
      }

      const attachment = await readAttachment(formData, ALLOWED_EXTENSIONS);
      const referenceId = `CAR-${Date.now()}-${crypto.randomUUID().slice(0, 8)}`;
      const text = [
        `지원 접수 번호: ${referenceId}`,
        `이름: ${name}`,
        `이메일: ${email}`,
        `연락처: ${phone}`,
        `관심 직무: ${jobArea}`,
        `경력 구분: ${careerLevel}`,
        "",
        "자기소개",
        introduction,
      ].join("\n");
      const html = `
        <h2>ERUTY 상시 인재 등록</h2>
        <p><strong>지원 접수 번호:</strong> ${escapeHtml(referenceId)}</p>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:720px">
          <tr><td style="border:1px solid #e4e6ea"><strong>이름</strong></td><td style="border:1px solid #e4e6ea">${escapeHtml(name)}</td></tr>
          <tr><td style="border:1px solid #e4e6ea"><strong>이메일</strong></td><td style="border:1px solid #e4e6ea">${escapeHtml(email)}</td></tr>
          <tr><td style="border:1px solid #e4e6ea"><strong>연락처</strong></td><td style="border:1px solid #e4e6ea">${escapeHtml(phone)}</td></tr>
          <tr><td style="border:1px solid #e4e6ea"><strong>관심 직무</strong></td><td style="border:1px solid #e4e6ea">${escapeHtml(jobArea)}</td></tr>
          <tr><td style="border:1px solid #e4e6ea"><strong>경력 구분</strong></td><td style="border:1px solid #e4e6ea">${escapeHtml(careerLevel)}</td></tr>
        </table>
        <h3>자기소개</h3>
        <p style="white-space:pre-wrap">${escapeHtml(introduction)}</p>
      `;
      const deliveryId = await sendResendEmail({
        notificationEmail: process.env.CAREERS_NOTIFICATION_EMAIL,
        replyTo: email,
        subject: `[ERUTY 채용] ${name} · ${jobArea}`,
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
      console.error("Careers API request failed.", error);
      return json({ success: false, message: "Application request failed." }, 500);
    }
  },
};
