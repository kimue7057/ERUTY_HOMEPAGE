import type {
  InquiryService,
  InquiryTypeSlug,
} from "../app/data/inquiryOptions";

export interface InquiryAttachment {
  name: string;
  size: number;
  type: string;
}

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
  attachment?: InquiryAttachment | null;
}

export interface InquirySubmissionResult {
  success: true;
  referenceId: string;
  mode: "mock";
}

const MOCK_DELAY_MS = 1100;

function shouldUseMockSubmission() {
  return import.meta.env.VITE_ENABLE_MOCK_SUBMISSIONS !== "false";
}

export async function submitInquiry(
  payload: InquirySubmissionPayload,
): Promise<InquirySubmissionResult> {
  if (!shouldUseMockSubmission()) {
    throw new Error("Inquiry API is not configured yet.");
  }

  await new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY_MS));

  if (payload.email.toLowerCase().includes("fail")) {
    throw new Error("Mock inquiry submission failed. Try another email to simulate success.");
  }

  return {
    success: true,
    referenceId: `INQ-${Date.now()}`,
    mode: "mock",
  };
}
