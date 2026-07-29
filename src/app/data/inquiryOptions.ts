import type { Lang } from "../context/LanguageContext";

export type InquiryService = "hitpick" | "erumter" | "general";
export type InquiryTypeSlug =
  | "global-expansion"
  | "content-ip"
  | "creator-marketing"
  | "global-partner"
  | "automation"
  | "ai-development"
  | "ax-education"
  | "ax-diagnosis"
  | "general-inquiry"
  | "partnership"
  | "other";

export interface InquiryServiceOption {
  id: InquiryService;
  label: Record<Lang, string>;
  description: Record<Lang, string>;
}

export interface InquiryTypeOption {
  slug: InquiryTypeSlug;
  service: InquiryService;
  label: Record<Lang, string>;
  description: Record<Lang, string>;
}

export const INQUIRY_SERVICE_OPTIONS: InquiryServiceOption[] = [
  {
    id: "hitpick",
    label: { ko: "Hitpick", en: "Hitpick" },
    description: {
      ko: "글로벌 사업 확장, 콘텐츠·IP, 크리에이터 마케팅 문의",
      en: "Global expansion, content/IP, and creator marketing inquiries",
    },
  },
  {
    id: "erumter",
    label: { ko: "이룸터", en: "Erumter" },
    description: {
      ko: "AX 교육, AI 개발, 업무 자동화, 전환 진단 문의",
      en: "AX training, AI development, workflow automation, and diagnosis inquiries",
    },
  },
  {
    id: "general",
    label: { ko: "일반 문의", en: "General" },
    description: {
      ko: "서비스가 아직 정리되지 않은 일반 프로젝트 문의",
      en: "General project inquiries before service scope is finalized",
    },
  },
];

export const INQUIRY_TYPE_OPTIONS: InquiryTypeOption[] = [
  {
    slug: "global-expansion",
    service: "hitpick",
    label: { ko: "글로벌 확장", en: "Global Expansion" },
    description: {
      ko: "브랜드, 상품, 사업의 해외 진출을 검토합니다.",
      en: "Discuss overseas expansion for brands, products, and businesses.",
    },
  },
  {
    slug: "content-ip",
    service: "hitpick",
    label: { ko: "콘텐츠·IP", en: "Content & IP" },
    description: {
      ko: "콘텐츠 배급, 투자, 라이선싱 기회를 논의합니다.",
      en: "Discuss distribution, investment, and licensing opportunities for content and IP.",
    },
  },
  {
    slug: "creator-marketing",
    service: "hitpick",
    label: { ko: "크리에이터 마케팅", en: "Creator Marketing" },
    description: {
      ko: "크리에이터 협업, 캠페인, 현지 수요 형성을 검토합니다.",
      en: "Discuss creator campaigns, partnerships, and local demand generation.",
    },
  },
  {
    slug: "global-partner",
    service: "hitpick",
    label: { ko: "글로벌 파트너", en: "Global Partner" },
    description: {
      ko: "현지 유통, 투자, 배급, 사업 파트너십을 논의합니다.",
      en: "Discuss local distribution, investment, and business partnerships.",
    },
  },
  {
    slug: "automation",
    service: "erumter",
    label: { ko: "업무 자동화", en: "Workflow Automation" },
    description: {
      ko: "반복 업무와 부서 간 프로세스 자동화를 검토합니다.",
      en: "Discuss automation for repetitive tasks and cross-functional workflows.",
    },
  },
  {
    slug: "ai-development",
    service: "erumter",
    label: { ko: "AI 개발", en: "AI Development" },
    description: {
      ko: "AI 기반 웹·앱, 시스템, 기능 개발을 논의합니다.",
      en: "Discuss AI-powered products, apps, systems, and feature development.",
    },
  },
  {
    slug: "ax-education",
    service: "erumter",
    label: { ko: "AX 교육", en: "AX Education" },
    description: {
      ko: "조직 내 AI 활용 역량 강화를 위한 교육을 논의합니다.",
      en: "Discuss training programs that improve AI capability across teams.",
    },
  },
  {
    slug: "ax-diagnosis",
    service: "erumter",
    label: { ko: "AX 진단", en: "AX Diagnosis" },
    description: {
      ko: "어떤 업무부터 전환할지 진단과 로드맵을 검토합니다.",
      en: "Discuss readiness assessment and roadmap planning for AX transformation.",
    },
  },
  {
    slug: "general-inquiry",
    service: "general",
    label: { ko: "일반 프로젝트 문의", en: "General Project Inquiry" },
    description: {
      ko: "서비스 구분 없이 전체 프로젝트 방향을 문의합니다.",
      en: "Discuss project direction before choosing a specific service.",
    },
  },
  {
    slug: "partnership",
    service: "general",
    label: { ko: "사업 제휴", en: "Partnership" },
    description: {
      ko: "사업 제휴, 네트워크 협업, 제안 문의입니다.",
      en: "Discuss partnerships, network collaboration, or proposals.",
    },
  },
  {
    slug: "other",
    service: "general",
    label: { ko: "기타", en: "Other" },
    description: {
      ko: "아직 분류되지 않은 기타 문의입니다.",
      en: "Catch-all for inquiries that do not fit an existing category yet.",
    },
  },
];

export function getInquiryTypesForService(service: InquiryService) {
  return INQUIRY_TYPE_OPTIONS.filter((option) => option.service === service);
}

export function buildStartProjectHref(
  service: InquiryService,
  type?: InquiryTypeSlug | null,
) {
  if (!type) {
    return `/start-a-project?service=${service}`;
  }

  return `/start-a-project?service=${service}&type=${type}`;
}

export function resolveInquirySelection(
  serviceParam: string | null,
  typeParam: string | null,
) {
  const matchingType = INQUIRY_TYPE_OPTIONS.find((option) => option.slug === typeParam);
  const resolvedService =
    serviceParam === "hitpick" || serviceParam === "erumter" || serviceParam === "general"
      ? serviceParam
      : matchingType?.service ?? "general";

  const matchingSelection = INQUIRY_TYPE_OPTIONS.find(
    (option) => option.service === resolvedService && option.slug === typeParam,
  );

  return {
    service: resolvedService,
    type:
      matchingSelection?.slug ??
      getInquiryTypesForService(resolvedService)[0]?.slug ??
      "general-inquiry",
  };
}
