export interface CareerApplicationPayload {
  name: string;
  email: string;
  phone: string;
  jobArea: string;
  careerLevel: string;
  introduction: string;
  consent: boolean;
  attachment?: File | null;
}

export interface CareerApplicationResult {
  success: true;
  referenceId: string;
  deliveryId: string;
  mode: "live";
}

export async function submitCareerApplication(
  payload: CareerApplicationPayload,
): Promise<CareerApplicationResult> {
  const formData = new FormData();
  formData.set("name", payload.name);
  formData.set("email", payload.email);
  formData.set("phone", payload.phone);
  formData.set("jobArea", payload.jobArea);
  formData.set("careerLevel", payload.careerLevel);
  formData.set("introduction", payload.introduction);
  formData.set("consent", String(payload.consent));

  if (payload.attachment) {
    formData.set("attachment", payload.attachment, payload.attachment.name);
  }

  const response = await fetch("/api/careers", {
    method: "POST",
    body: formData,
  });
  const responseBody = await response.text();
  let result: CareerApplicationResult | { success: false; message?: string } | null = null;

  if (responseBody) {
    try {
      result = JSON.parse(responseBody) as CareerApplicationResult | { success: false; message?: string };
    } catch {
      throw new Error("CAREERS_API_INVALID_RESPONSE");
    }
  }

  if (!result) {
    throw new Error("CAREERS_API_EMPTY_RESPONSE");
  }

  if (!response.ok || !result.success) {
    throw new Error("message" in result && result.message
      ? result.message
      : "Career application submission failed.");
  }

  return result;
}
