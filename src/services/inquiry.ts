import type {
  InquiryService,
  InquiryTypeSlug,
} from "../app/data/inquiryOptions";

export interface InquirySubmissionPayload {
  service: InquiryService;
  inquiryType: InquiryTypeSlug;
  organization: string;
  contactName: string;
  email: string;
  country: string;
  projectSummary: string;
  targetMarket: string;
  timeline: string;
  budget: string;
  consent: boolean;
  attachment?: File | null;
}

export interface InquirySubmissionResult {
  success: true;
  referenceId: string;
  deliveryId: string;
  mode: "live";
}

export async function submitInquiry(
  payload: InquirySubmissionPayload,
): Promise<InquirySubmissionResult> {
  const formData = new FormData();
  formData.set("service", payload.service);
  formData.set("inquiryType", payload.inquiryType);
  formData.set("organization", payload.organization);
  formData.set("contactName", payload.contactName);
  formData.set("email", payload.email);
  formData.set("country", payload.country);
  formData.set("projectSummary", payload.projectSummary);
  formData.set("targetMarket", payload.targetMarket);
  formData.set("timeline", payload.timeline);
  formData.set("budget", payload.budget);
  formData.set("consent", String(payload.consent));

  if (payload.attachment) {
    formData.set("attachment", payload.attachment, payload.attachment.name);
  }

  const response = await fetch("/api/inquiries", {
    method: "POST",
    body: formData,
  });
  const responseBody = await response.text();
  let result: InquirySubmissionResult | { success: false; message?: string } | null = null;

  if (responseBody) {
    try {
      result = JSON.parse(responseBody) as InquirySubmissionResult | { success: false; message?: string };
    } catch {
      throw new Error("INQUIRY_API_INVALID_RESPONSE");
    }
  }

  if (!result) {
    throw new Error("INQUIRY_API_EMPTY_RESPONSE");
  }
  if (!response.ok || !result.success) {
    throw new Error("message" in result && result.message
      ? result.message
      : "Inquiry submission failed.");
  }

  return result;
}
