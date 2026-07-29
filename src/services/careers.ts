export interface CareerAttachment {
  name: string;
  size: number;
  type: string;
}

export interface CareerApplicationPayload {
  name: string;
  email: string;
  phone: string;
  jobArea: string;
  careerLevel: string;
  introduction: string;
  consent: boolean;
  attachment?: CareerAttachment | null;
}

export interface CareerApplicationResult {
  success: true;
  referenceId: string;
  mode: "mock";
}

const MOCK_DELAY_MS = 1200;

function shouldUseMockSubmission() {
  return import.meta.env.VITE_ENABLE_MOCK_SUBMISSIONS !== "false";
}

export async function submitCareerApplication(
  payload: CareerApplicationPayload,
): Promise<CareerApplicationResult> {
  if (!shouldUseMockSubmission()) {
    throw new Error("Careers API is not configured yet.");
  }

  await new Promise((resolve) => window.setTimeout(resolve, MOCK_DELAY_MS));

  if (payload.email.toLowerCase().includes("fail")) {
    throw new Error("Mock career submission failed. Try another email to simulate success.");
  }

  return {
    success: true,
    referenceId: `CAR-${Date.now()}`,
    mode: "mock",
  };
}
