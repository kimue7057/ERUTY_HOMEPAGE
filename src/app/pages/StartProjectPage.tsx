import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  getInquiryTypesForService,
  INQUIRY_SERVICE_OPTIONS,
  resolveInquirySelection,
  type InquiryService,
  type InquiryTypeSlug,
} from "../data/inquiryOptions";
import { useLanguage } from "../context/LanguageContext";
import {
  submitInquiry,
  type InquiryAttachment,
  type InquirySubmissionResult,
} from "../../services/inquiry";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const MUTED = "#737780";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F5F6F8";
const MAX_UPLOAD_MB = Number(import.meta.env.VITE_UPLOAD_MAX_FILE_MB ?? 20);
const MOCK_ENABLED = import.meta.env.VITE_ENABLE_MOCK_SUBMISSIONS !== "false";

const T = {
  ko: {
    badge: "프로젝트 시작",
    heading: "함께 만들어 봅시다.",
    description:
      "프로젝트에 대해 알려주시면 이루티의 적합한 팀과 연결해 드립니다.",
    successHeading: "문의가 접수되었습니다.",
    successBody:
      "담당 팀이 프로젝트 내용을 검토한 뒤 영업일 기준 2일 이내에 회신드립니다.",
    backHome: "홈으로 돌아가기",
    startAnother: "다른 문의 다시 작성",
    steps: [
      { label: "서비스 및 문의 유형", desc: "어떤 서비스와 목적이 필요한지 선택합니다." },
      { label: "프로젝트 상세", desc: "회사와 목표, 현재 상황을 알려 주세요." },
    ],
    directContact: "직접 연락",
    emailLabel: "이메일",
    hqLabel: "본사",
    hqValue: "부산광역시 남구 문현금융로 40, 21층 6호",
    replyLabel: "회신 기간",
    replyValue: "영업일 기준 2일 이내",
    mockLabel: "개발 모드 · Mock Inquiry Service",
    mockDesc:
      "현재 문의 제출은 mock 응답으로 동작합니다. 실제 API는 src/services/inquiry.ts에서 교체할 수 있습니다.",
    step1Label: "단계 01 · 서비스 및 문의 유형",
    step1Heading: "어떤 종류의 프로젝트를 논의하고 싶으신가요?",
    serviceLabel: "서비스 선택",
    typeLabel: "문의 유형 선택",
    nextButton: "다음으로",
    step2Heading: "프로젝트에 대해 알려주세요.",
    step2Summary: "선택한 서비스와 문의 유형을 기준으로 적합한 팀이 검토합니다.",
    fieldOrg: "기관 / 회사명",
    fieldOrgPlaceholder: "귀사 또는 기관 이름",
    fieldContact: "담당자",
    fieldContactPlaceholder: "성함 및 직책",
    fieldEmail: "이메일 주소",
    fieldCountry: "국가",
    fieldCountryPlaceholder: "국가 선택",
    fieldSummary: "프로젝트 요약",
    fieldSummaryPlaceholder:
      "프로젝트, 목표, 현재 상황을 2–5문장으로 설명해 주세요.",
    fieldMarket: "목표 시장 / 지역",
    fieldMarketPlaceholder: "예: 베트남, 동남아시아, 독일, 글로벌",
    fieldTimeline: "예상 일정",
    fieldTimelinePlaceholder: "일정 선택",
    fieldBudget: "예산 범위",
    fieldBudgetPlaceholder: "예산 범위 선택",
    fileAttach: "파일 첨부 (선택사항)",
    fileHint: `PDF, PPT, PPTX, DOC, DOCX 최대 ${MAX_UPLOAD_MB}MB`,
    fileEmpty: "파일을 드래그하거나 클릭해 업로드할 수 있습니다.",
    consent:
      "이루티가 이 프로젝트 문의에 응답하기 위해 내 정보를 처리하는 것에 동의합니다. 내 데이터는 개인정보처리방침에 따라 처리됩니다.",
    backButton: "이전으로",
    submitButton: "프로젝트 문의 제출",
    submittingButton: "제출 중...",
    failureTitle: "문의 전송에 실패했습니다.",
    failureBody: "잠시 후 다시 시도하거나 다른 이메일 주소로 테스트해 주세요.",
    budgets: [
      "$10,000 미만",
      "$10,000 – $50,000",
      "$50,000 – $200,000",
      "$200,000 – $1,000,000",
      "$1,000,000 이상",
      "협의 후 결정",
    ],
    timelines: [
      "가능한 빨리",
      "1–3개월",
      "3–6개월",
      "6–12개월",
      "12개월 이상",
      "유동적",
    ],
    countries: [
      "한국 (KR)",
      "베트남 (VN)",
      "싱가포르 (SG)",
      "일본 (JP)",
      "독일 (DE)",
      "UAE (AE)",
      "미국 (US)",
      "대만 (TW)",
      "인도네시아 (ID)",
      "기타",
    ],
    errService: "서비스를 선택해 주세요.",
    errType: "문의 유형을 선택해 주세요.",
    errOrg: "회사 또는 기관명을 입력해 주세요.",
    errContact: "담당자 이름을 입력해 주세요.",
    errEmail: "이메일을 입력해 주세요.",
    errEmailInvalid: "올바른 이메일 형식이 아닙니다.",
    errSummary: "프로젝트 요약을 입력해 주세요.",
    errSummaryMin: "프로젝트 요약은 30자 이상 입력해 주세요.",
    errConsent: "개인정보 처리 동의가 필요합니다.",
    errFileType: "지원하지 않는 파일 형식입니다.",
    errFileSize: `첨부파일은 ${MAX_UPLOAD_MB}MB 이하만 업로드할 수 있습니다.`,
    referenceLabel: "문의 번호",
  },
  en: {
    badge: "Start a Project",
    heading: "Let's build together.",
    description:
      "Tell us about your project and we'll connect you with the right team at ERUTY.",
    successHeading: "Your inquiry has been received.",
    successBody:
      "The relevant team will review your request and respond within 2 business days.",
    backHome: "Back to Home",
    startAnother: "Start another inquiry",
    steps: [
      {
        label: "Service & Inquiry Type",
        desc: "Choose the service and purpose that best fits your project.",
      },
      {
        label: "Project Details",
        desc: "Tell us about your company, goals, and current context.",
      },
    ],
    directContact: "Direct Contact",
    emailLabel: "Email",
    hqLabel: "Headquarters",
    hqValue: "21F, Suite 6, 40 Munhyeongeumyung-ro, Nam-gu, Busan, Republic of Korea",
    replyLabel: "Response Time",
    replyValue: "Within 2 business days",
    mockLabel: "Development mode · Mock Inquiry Service",
    mockDesc:
      "Submissions currently use a mock response. Replace the API implementation later in src/services/inquiry.ts.",
    step1Label: "Step 01 · Service & Inquiry Type",
    step1Heading: "What kind of project would you like to discuss?",
    serviceLabel: "Choose a service",
    typeLabel: "Choose an inquiry type",
    nextButton: "Next",
    step2Heading: "Tell us about your project.",
    step2Summary:
      "The request will be reviewed by the team most relevant to the selected service and inquiry type.",
    fieldOrg: "Organization / Company",
    fieldOrgPlaceholder: "Your company or organization name",
    fieldContact: "Contact Name",
    fieldContactPlaceholder: "Name and title",
    fieldEmail: "Email Address",
    fieldCountry: "Country",
    fieldCountryPlaceholder: "Select country",
    fieldSummary: "Project Summary",
    fieldSummaryPlaceholder:
      "Describe your project, goals, and current situation in 2–5 sentences.",
    fieldMarket: "Target Market / Region",
    fieldMarketPlaceholder: "e.g. Vietnam, Southeast Asia, Germany, Global",
    fieldTimeline: "Expected Timeline",
    fieldTimelinePlaceholder: "Select timeline",
    fieldBudget: "Budget Range",
    fieldBudgetPlaceholder: "Select budget range",
    fileAttach: "File Attachment (Optional)",
    fileHint: `PDF, PPT, PPTX, DOC, DOCX up to ${MAX_UPLOAD_MB}MB`,
    fileEmpty: "Click to upload or drop a file here.",
    consent:
      "I agree to ERUTY processing my information to respond to this project inquiry. My data will be handled under the privacy policy.",
    backButton: "Back",
    submitButton: "Submit Project Inquiry",
    submittingButton: "Submitting...",
    failureTitle: "We couldn't send your inquiry.",
    failureBody: "Please try again in a moment or use another email address for mock testing.",
    budgets: [
      "Under $10,000",
      "$10,000 – $50,000",
      "$50,000 – $200,000",
      "$200,000 – $1,000,000",
      "$1,000,000+",
      "To be discussed",
    ],
    timelines: [
      "ASAP",
      "1–3 months",
      "3–6 months",
      "6–12 months",
      "12+ months",
      "Flexible",
    ],
    countries: [
      "Korea (KR)",
      "Vietnam (VN)",
      "Singapore (SG)",
      "Japan (JP)",
      "Germany (DE)",
      "UAE (AE)",
      "USA (US)",
      "Taiwan (TW)",
      "Indonesia (ID)",
      "Other",
    ],
    errService: "Please choose a service.",
    errType: "Please choose an inquiry type.",
    errOrg: "Please enter your company or organization name.",
    errContact: "Please enter a contact name.",
    errEmail: "Please enter an email address.",
    errEmailInvalid: "Please enter a valid email address.",
    errSummary: "Please enter a project summary.",
    errSummaryMin: "Project summary must be at least 30 characters.",
    errConsent: "Privacy consent is required.",
    errFileType: "This file type is not supported.",
    errFileSize: `Attachments must be ${MAX_UPLOAD_MB}MB or smaller.`,
    referenceLabel: "Reference",
  },
} as const;

type FormState = {
  organization: string;
  contactName: string;
  email: string;
  country: string;
  projectSummary: string;
  targetMarket: string;
  timeline: string;
  budget: string;
  consent: boolean;
  attachment: File | null;
};

type FormErrors = Partial<
  Record<
    | "service"
    | "type"
    | "organization"
    | "contactName"
    | "email"
    | "projectSummary"
    | "consent"
    | "attachment",
    string
  >
>;

type SubmissionState = "idle" | "submitting" | "success" | "error";

const initialFormState: FormState = {
  organization: "",
  contactName: "",
  email: "",
  country: "",
  projectSummary: "",
  targetMarket: "",
  timeline: "",
  budget: "",
  consent: false,
  attachment: null,
};

export function StartProjectPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [searchParams] = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const preselected = useMemo(
    () =>
      resolveInquirySelection(
        searchParams.get("service"),
        searchParams.get("type"),
      ),
    [searchParams],
  );

  const [selectedService, setSelectedService] = useState<InquiryService>(
    preselected.service,
  );
  const [selectedType, setSelectedType] = useState<InquiryTypeSlug>(
    preselected.type,
  );
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionResult, setSubmissionResult] =
    useState<InquirySubmissionResult | null>(null);
  const [submissionError, setSubmissionError] = useState<string>("");

  useEffect(() => {
    setSelectedService(preselected.service);
    setSelectedType(preselected.type);
  }, [preselected.service, preselected.type]);

  const serviceOptions = getInquiryTypesForService(selectedService);
  const selectedServiceOption = INQUIRY_SERVICE_OPTIONS.find(
    (option) => option.id === selectedService,
  );
  const selectedTypeOption = serviceOptions.find(
    (option) => option.slug === selectedType,
  );

  useEffect(() => {
    if (!serviceOptions.some((option) => option.slug === selectedType)) {
      setSelectedType(serviceOptions[0]?.slug ?? "general-inquiry");
    }
  }, [selectedService, selectedType, serviceOptions]);

  function updateField<Key extends keyof FormState>(
    key: Key,
    value: FormState[Key],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validate() {
    const nextErrors: FormErrors = {};
    if (!selectedService) nextErrors.service = t.errService;
    if (!selectedType) nextErrors.type = t.errType;
    if (!form.organization.trim()) nextErrors.organization = t.errOrg;
    if (!form.contactName.trim()) nextErrors.contactName = t.errContact;
    if (!form.email.trim()) nextErrors.email = t.errEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = t.errEmailInvalid;
    }
    if (!form.projectSummary.trim()) nextErrors.projectSummary = t.errSummary;
    else if (form.projectSummary.trim().length < 30) {
      nextErrors.projectSummary = t.errSummaryMin;
    }
    if (!form.consent) nextErrors.consent = t.errConsent;

    return nextErrors;
  }

  function validateAttachment(file: File) {
    const allowedExtensions = [".pdf", ".ppt", ".pptx", ".doc", ".docx"];
    const lowerName = file.name.toLowerCase();
    const hasValidExtension = allowedExtensions.some((extension) =>
      lowerName.endsWith(extension),
    );

    if (!hasValidExtension) {
      return t.errFileType;
    }

    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      return t.errFileSize;
    }

    return "";
  }

  function toAttachment(file: File | null): InquiryAttachment | null {
    if (!file) {
      return null;
    }

    return {
      name: file.name,
      size: file.size,
      type: file.type,
    };
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setStatus("submitting");
    setSubmissionError("");

    try {
      const result = await submitInquiry({
        service: selectedService,
        inquiryType: selectedType,
        organization: form.organization,
        contactName: form.contactName,
        email: form.email,
        country: form.country,
        projectSummary: form.projectSummary,
        targetMarket: form.targetMarket,
        timeline: form.timeline,
        budget: form.budget,
        consent: form.consent,
        attachment: toAttachment(form.attachment),
      });

      setSubmissionResult(result);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setSubmissionError(
        error instanceof Error ? error.message : t.failureBody,
      );
    }
  }

  function handleFileChange(file: File | null) {
    if (!file) {
      updateField("attachment", null);
      return;
    }

    const validationMessage = validateAttachment(file);
    if (validationMessage) {
      setErrors((current) => ({ ...current, attachment: validationMessage }));
      updateField("attachment", null);
      return;
    }

    updateField("attachment", file);
    setErrors((current) => ({ ...current, attachment: undefined }));
  }

  function resetSubmission() {
    setStatus("idle");
    setStep(1);
    setForm(initialFormState);
    setErrors({});
    setSubmissionError("");
    setSubmissionResult(null);
  }

  if (status === "success") {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-8 pt-16"
        style={{ background: "#FFFFFF" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl text-center"
        >
          <div
            className="mx-auto mb-8 flex h-14 w-14 items-center justify-center rounded-full"
            style={{
              background: "rgba(55,55,242,0.1)",
              border: "1px solid rgba(55,55,242,0.3)",
            }}
          >
            <Check size={22} style={{ color: BLUE }} />
          </div>
          <h1
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2.3rem, 5vw, 3.5rem)",
              color: NEAR_BLACK,
              lineHeight: 1.08,
            }}
          >
            {t.successHeading}
          </h1>
          <p
            className="mb-6"
            style={{ color: MUTED, lineHeight: 1.75, fontSize: "1rem" }}
          >
            {t.successBody}
          </p>
          {submissionResult ? (
            <div
              className="mx-auto mb-8 w-fit border px-4 py-2 text-sm"
              style={{ borderColor: BORDER, color: NEAR_BLACK }}
            >
              <strong>{t.referenceLabel}:</strong> {submissionResult.referenceId}
            </div>
          ) : null}
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm"
              style={{ background: NEAR_BLACK, color: "#FFFFFF", fontWeight: 500 }}
            >
              {t.backHome}
            </Link>
            <button
              type="button"
              onClick={resetSubmission}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm"
              style={{
                border: `1px solid ${BORDER}`,
                color: NEAR_BLACK,
                background: "#FFFFFF",
                fontWeight: 500,
              }}
            >
              {t.startAnother}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-16" style={{ background: "#FFFFFF" }}>
      <section className="py-20" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <div className="mx-auto max-w-[1440px] px-8">
          <div
            className="mb-8 inline-block border px-3 py-1.5 text-xs uppercase tracking-[0.24em]"
            style={{ color: BLUE, borderColor: "rgba(55,55,242,0.3)" }}
          >
            {t.badge}
          </div>
          <h1
            className="mb-4"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(2.6rem, 5vw, 4rem)",
              color: NEAR_BLACK,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {t.heading}
          </h1>
          <p
            style={{
              color: MUTED,
              maxWidth: 560,
              lineHeight: 1.7,
              fontSize: "1rem",
            }}
          >
            {t.description}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-[1440px] px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <aside>
              <div className="sticky top-24">
                <div className="flex flex-col gap-8">
                  {t.steps.map((item, index) => {
                    const currentStep = index + 1;
                    const completed = step > currentStep;
                    const active = step === currentStep;

                    return (
                      <div key={item.label} className="flex items-start gap-4">
                        <div
                          className="flex h-8 w-8 items-center justify-center text-xs"
                          style={{
                            background:
                              completed || active ? BLUE : SOFT_BG,
                            color:
                              completed || active ? "#FFFFFF" : MUTED,
                            fontFamily: "var(--font-mono)",
                            borderRadius: 999,
                          }}
                        >
                          {completed ? <Check size={12} /> : currentStep}
                        </div>
                        <div>
                          <div
                            className="mb-1 text-sm"
                            style={{
                              color: active || completed ? NEAR_BLACK : MUTED,
                              fontWeight: 600,
                            }}
                          >
                            {item.label}
                          </div>
                          <p
                            className="text-xs"
                            style={{ color: MUTED, lineHeight: 1.6 }}
                          >
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {MOCK_ENABLED ? (
                  <div
                    className="mt-12 border p-6"
                    style={{ background: SOFT_BG, borderColor: BORDER }}
                  >
                    <div
                      className="mb-3 text-xs uppercase tracking-[0.24em]"
                      style={{ color: BLUE, fontFamily: "var(--font-mono)" }}
                    >
                      {t.mockLabel}
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: MUTED, lineHeight: 1.7 }}
                    >
                      {t.mockDesc}
                    </p>
                  </div>
                ) : null}

                <div
                  className="mt-6 border p-6"
                  style={{ background: SOFT_BG, borderColor: BORDER }}
                >
                  <div
                    className="mb-4 text-xs uppercase tracking-[0.24em]"
                    style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                  >
                    {t.directContact}
                  </div>
                  <div className="flex flex-col gap-3 text-sm" style={{ color: "#333438" }}>
                    <div>
                      <div
                        className="mb-1 text-xs"
                        style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                      >
                        {t.emailLabel}
                      </div>
                      <span>contact@eruty.co.kr</span>
                    </div>
                    <div>
                      <div
                        className="mb-1 text-xs"
                        style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                      >
                        {t.hqLabel}
                      </div>
                      <span>{t.hqValue}</span>
                    </div>
                    <div>
                      <div
                        className="mb-1 text-xs"
                        style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                      >
                        {t.replyLabel}
                      </div>
                      <span>{t.replyValue}</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div
                    key="step-1"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="mb-6 text-xs uppercase tracking-[0.24em]"
                      style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                    >
                      {t.step1Label}
                    </div>
                    <h2
                      className="mb-8"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1.9rem",
                        color: NEAR_BLACK,
                      }}
                    >
                      {t.step1Heading}
                    </h2>

                    <div className="mb-10">
                      <div
                        className="mb-3 text-xs uppercase tracking-[0.18em]"
                        style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                      >
                        {t.serviceLabel}
                      </div>
                      <div className="grid gap-3 md:grid-cols-3">
                        {INQUIRY_SERVICE_OPTIONS.map((service) => {
                          const active = selectedService === service.id;

                          return (
                            <button
                              key={service.id}
                              type="button"
                              onClick={() => setSelectedService(service.id)}
                              className="text-left p-5 transition-all"
                              style={{
                                border: `1px solid ${active ? BLUE : BORDER}`,
                                background: active ? "rgba(55,55,242,0.05)" : "#FFFFFF",
                              }}
                              aria-pressed={active}
                            >
                              <div
                                className="mb-2 text-sm"
                                style={{
                                  color: active ? NEAR_BLACK : "#333438",
                                  fontWeight: 600,
                                }}
                              >
                                {service.label[lang]}
                              </div>
                              <p
                                className="text-xs"
                                style={{ color: MUTED, lineHeight: 1.6 }}
                              >
                                {service.description[lang]}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                      <FieldError message={errors.service} />
                    </div>

                    <div className="mb-10">
                      <div
                        className="mb-3 text-xs uppercase tracking-[0.18em]"
                        style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                      >
                        {t.typeLabel}
                      </div>
                      <div className="grid gap-2">
                        {serviceOptions.map((option) => {
                          const active = selectedType === option.slug;
                          return (
                            <button
                              key={option.slug}
                              type="button"
                              onClick={() => setSelectedType(option.slug)}
                              className="flex items-center justify-between gap-4 p-5 text-left"
                              style={{
                                border: `1px solid ${active ? BLUE : BORDER}`,
                                background: active ? "rgba(55,55,242,0.06)" : SOFT_BG,
                              }}
                              aria-pressed={active}
                            >
                              <div>
                                <div
                                  className="mb-1 text-sm"
                                  style={{
                                    color: active ? NEAR_BLACK : "#333438",
                                    fontWeight: 600,
                                  }}
                                >
                                  {option.label[lang]}
                                </div>
                                <p
                                  className="text-xs"
                                  style={{ color: MUTED, lineHeight: 1.6 }}
                                >
                                  {option.description[lang]}
                                </p>
                              </div>
                              {active ? <Check size={16} style={{ color: BLUE }} /> : null}
                            </button>
                          );
                        })}
                      </div>
                      <FieldError message={errors.type} />
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-8 py-4 text-sm"
                      style={{
                        background: NEAR_BLACK,
                        color: "#FFFFFF",
                        fontWeight: 500,
                      }}
                    >
                      {t.nextButton}
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="step-2"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className="mb-6 text-xs uppercase tracking-[0.24em]"
                      style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                    >
                      {selectedServiceOption?.label[lang]} / {selectedTypeOption?.label[lang]}
                    </div>
                    <h2
                      className="mb-3"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 700,
                        fontSize: "1.9rem",
                        color: NEAR_BLACK,
                      }}
                    >
                      {t.step2Heading}
                    </h2>
                    <p
                      className="mb-8 text-sm"
                      style={{ color: MUTED, lineHeight: 1.7 }}
                    >
                      {t.step2Summary}
                    </p>

                    {status === "error" ? (
                      <div
                        className="mb-6 border px-4 py-3"
                        style={{ borderColor: "#FCA5A5", background: "#FEF2F2" }}
                      >
                        <div
                          className="mb-1 flex items-center gap-2 text-sm"
                          style={{ color: "#991B1B", fontWeight: 600 }}
                        >
                          <AlertCircle size={14} />
                          {t.failureTitle}
                        </div>
                        <p className="text-sm" style={{ color: "#B91C1C", lineHeight: 1.65 }}>
                          {submissionError || t.failureBody}
                        </p>
                      </div>
                    ) : null}

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField
                          label={t.fieldOrg}
                          required
                          error={errors.organization}
                        >
                          <input
                            type="text"
                            value={form.organization}
                            onChange={(event) =>
                              updateField("organization", event.target.value)
                            }
                            placeholder={t.fieldOrgPlaceholder}
                          />
                        </FormField>
                        <FormField
                          label={t.fieldContact}
                          required
                          error={errors.contactName}
                        >
                          <input
                            type="text"
                            value={form.contactName}
                            onChange={(event) =>
                              updateField("contactName", event.target.value)
                            }
                            placeholder={t.fieldContactPlaceholder}
                          />
                        </FormField>
                      </div>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField label={t.fieldEmail} required error={errors.email}>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(event) =>
                              updateField("email", event.target.value)
                            }
                            placeholder="hello@company.com"
                          />
                        </FormField>
                        <FormField label={t.fieldCountry}>
                          <select
                            value={form.country}
                            onChange={(event) =>
                              updateField("country", event.target.value)
                            }
                          >
                            <option value="">{t.fieldCountryPlaceholder}</option>
                            {t.countries.map((country) => (
                              <option key={country} value={country}>
                                {country}
                              </option>
                            ))}
                          </select>
                        </FormField>
                      </div>

                      <FormField
                        label={t.fieldSummary}
                        required
                        error={errors.projectSummary}
                      >
                        <textarea
                          rows={5}
                          value={form.projectSummary}
                          onChange={(event) =>
                            updateField("projectSummary", event.target.value)
                          }
                          placeholder={t.fieldSummaryPlaceholder}
                        />
                      </FormField>

                      <FormField label={t.fieldMarket}>
                        <input
                          type="text"
                          value={form.targetMarket}
                          onChange={(event) =>
                            updateField("targetMarket", event.target.value)
                          }
                          placeholder={t.fieldMarketPlaceholder}
                        />
                      </FormField>

                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <FormField label={t.fieldTimeline}>
                          <select
                            value={form.timeline}
                            onChange={(event) =>
                              updateField("timeline", event.target.value)
                            }
                          >
                            <option value="">{t.fieldTimelinePlaceholder}</option>
                            {t.timelines.map((timeline) => (
                              <option key={timeline} value={timeline}>
                                {timeline}
                              </option>
                            ))}
                          </select>
                        </FormField>
                        <FormField label={t.fieldBudget}>
                          <select
                            value={form.budget}
                            onChange={(event) =>
                              updateField("budget", event.target.value)
                            }
                          >
                            <option value="">{t.fieldBudgetPlaceholder}</option>
                            {t.budgets.map((budget) => (
                              <option key={budget} value={budget}>
                                {budget}
                              </option>
                            ))}
                          </select>
                        </FormField>
                      </div>

                      <div>
                        <div
                          className="mb-2 text-xs uppercase tracking-[0.18em]"
                          style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                        >
                          {t.fileAttach}
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          accept=".pdf,.ppt,.pptx,.doc,.docx"
                          onChange={(event) =>
                            handleFileChange(event.target.files?.[0] ?? null)
                          }
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex w-full items-center gap-3 px-4 py-4 text-left"
                          style={{
                            border: `1px dashed ${errors.attachment ? "#EF4444" : BORDER}`,
                            background: "#FFFFFF",
                          }}
                        >
                          <Upload size={16} style={{ color: MUTED, flexShrink: 0 }} />
                          <div className="flex-1">
                            <div
                              className="text-sm"
                              style={{
                                color: form.attachment ? NEAR_BLACK : MUTED,
                                fontWeight: form.attachment ? 500 : 400,
                              }}
                            >
                              {form.attachment ? form.attachment.name : t.fileEmpty}
                            </div>
                            <div
                              className="mt-1 text-xs"
                              style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                            >
                              {t.fileHint}
                            </div>
                          </div>
                          {form.attachment ? (
                            <span
                              role="button"
                              tabIndex={0}
                              onClick={(event) => {
                                event.stopPropagation();
                                updateField("attachment", null);
                              }}
                              onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                  event.preventDefault();
                                  updateField("attachment", null);
                                }
                              }}
                              style={{ color: MUTED }}
                            >
                              <X size={16} />
                            </span>
                          ) : null}
                        </button>
                        <FieldError message={errors.attachment} />
                      </div>

                      <div>
                        <label className="flex items-start gap-3">
                          <button
                            type="button"
                            onClick={() => updateField("consent", !form.consent)}
                            className="mt-0.5 flex h-5 w-5 items-center justify-center"
                            style={{
                              border: `1px solid ${
                                errors.consent ? "#EF4444" : form.consent ? BLUE : BORDER
                              }`,
                              background: form.consent ? BLUE : "#FFFFFF",
                              flexShrink: 0,
                            }}
                          >
                            {form.consent ? <Check size={12} color="#FFFFFF" /> : null}
                          </button>
                          <span className="text-xs" style={{ color: MUTED, lineHeight: 1.7 }}>
                            {t.consent}
                          </span>
                        </label>
                        <FieldError message={errors.consent} />
                      </div>

                      <div className="flex flex-wrap items-center gap-4 pt-2">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="px-6 py-3.5 text-sm"
                          style={{
                            border: `1px solid ${BORDER}`,
                            color: MUTED,
                            background: "#FFFFFF",
                          }}
                        >
                          {t.backButton}
                        </button>
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className="inline-flex items-center gap-2 px-8 py-3.5 text-sm"
                          style={{
                            background:
                              status === "submitting" ? "#B8BBC4" : NEAR_BLACK,
                            color: "#FFFFFF",
                            fontWeight: 500,
                            cursor:
                              status === "submitting" ? "not-allowed" : "pointer",
                          }}
                        >
                          {status === "submitting"
                            ? t.submittingButton
                            : t.submitButton}
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function FormField({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        className="mb-2 block text-xs uppercase tracking-[0.18em]"
        style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
      >
        {label}
        {required ? <span style={{ color: BLUE }}> *</span> : null}
      </label>
      <style>{`
        .eruty-form-field input,
        .eruty-form-field select,
        .eruty-form-field textarea {
          width: 100%;
          border: 1px solid ${error ? "#EF4444" : BORDER};
          background: #FFFFFF;
          color: ${NEAR_BLACK};
          padding: 12px 14px;
          font-family: var(--font-body);
          font-size: 0.92rem;
          line-height: 1.65;
          outline: none;
          transition: border-color 0.16s ease;
        }

        .eruty-form-field input::placeholder,
        .eruty-form-field textarea::placeholder {
          color: ${MUTED};
        }

        .eruty-form-field input:focus,
        .eruty-form-field select:focus,
        .eruty-form-field textarea:focus {
          border-color: rgba(55,55,242,0.45);
        }

        .eruty-form-field textarea {
          resize: vertical;
        }
      `}</style>
      <div className="eruty-form-field">{children}</div>
      <FieldError message={error} />
    </div>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <div className="mt-1.5 flex items-center gap-1.5">
      <AlertCircle size={11} style={{ color: "#EF4444", flexShrink: 0 }} />
      <span
        style={{
          color: "#EF4444",
          fontSize: "0.72rem",
          fontFamily: "var(--font-mono)",
        }}
      >
        {message}
      </span>
    </div>
  );
}
