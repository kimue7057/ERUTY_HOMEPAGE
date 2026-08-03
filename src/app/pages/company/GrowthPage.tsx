import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type Lang, useLanguage } from "../../context/LanguageContext";
import { PageContainer } from "../../components/PageContainer";
import { PageHeading } from "../../components/PageHeading";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BODY_TEXT = "#333842";
const MUTED = "#6E7481";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F5F7FB";
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type ProjectCategory =
  | "global-business"
  | "ai-ax"
  | "blockchain"
  | "product-rd"
  | "education";

type ProjectVisibility = "published" | "draft" | "hidden";

type LocalizedText = {
  ko: string;
  en: string;
};

type Project = {
  id: string;
  featured?: boolean;
  visibility: ProjectVisibility;
  year?: string;
  categories: ProjectCategory[];
  title: LocalizedText;
  summary: LocalizedText;
  role?: LocalizedText;
  scope?: LocalizedText[];
  outcome?: LocalizedText;
  status?: LocalizedText;
  market?: LocalizedText;
  image?: string;
  imageAlt?: LocalizedText;
  visualType?: "image" | "interface" | "abstract";
  visualIsConcept?: boolean;
};

type ProjectFilter = "all" | ProjectCategory;

const PAGE_COPY = {
  ko: {
    heroEyebrow: "PROJECTS",
    heroHeadline: "실행으로 만든 프로젝트",
    heroDescription:
      "글로벌 사업 확장부터 AX·AI 시스템 구축까지, 이루티가 직접 수행한 프로젝트를 소개합니다.",
    featuredEyebrow: "FEATURED PROJECT",
    featuredButton: "프로젝트 보기",
    filterAll: "전체",
    filterLabel: "PROJECT CATEGORY",
    gridEmpty: "선택한 카테고리에 해당하는 공개 프로젝트를 준비 중입니다.",
    viewDetails: "상세 보기",
    closeDrawer: "프로젝트 상세 닫기",
    yearLabel: "연도",
    marketLabel: "시장 또는 대상",
    overviewLabel: "프로젝트 개요",
    roleLabel: "이루티의 역할",
    scopeLabel: "주요 수행 범위",
    outcomeLabel: "공개 가능한 결과",
    statusLabel: "상태",
    relatedVisualLabel: "관련 비주얼",
    ctaEyebrow: "START A PROJECT",
    ctaHeadline: "다음 프로젝트를 함께 준비해보세요",
    ctaDescription:
      "새로운 아이디어를 실제 사업과 시스템으로 만들 실행 파트너가 필요하신가요?",
    ctaButton: "프로젝트 문의하기",
  },
  en: {
    heroEyebrow: "PROJECTS",
    heroHeadline: "Projects Built Through Execution",
    heroDescription:
      "Explore global business, AX, AI, and technology projects delivered by ERUTY.",
    featuredEyebrow: "FEATURED PROJECT",
    featuredButton: "View Project",
    filterAll: "All",
    filterLabel: "PROJECT CATEGORY",
    gridEmpty: "Public projects for this category are being prepared.",
    viewDetails: "View Details",
    closeDrawer: "Close project details",
    yearLabel: "Year",
    marketLabel: "Market or Audience",
    overviewLabel: "Project Overview",
    roleLabel: "ERUTY Role",
    scopeLabel: "Scope",
    outcomeLabel: "Public Outcome",
    statusLabel: "Status",
    relatedVisualLabel: "Related Visual",
    ctaEyebrow: "START A PROJECT",
    ctaHeadline: "Let's Build the Next Project Together",
    ctaDescription:
      "Looking for an execution partner to turn a new idea into a real business or system?",
    ctaButton: "Start a Project",
  },
} as const;

const CATEGORY_LABELS: Record<ProjectCategory, LocalizedText> = {
  "global-business": { ko: "글로벌 사업", en: "Global Business" },
  "ai-ax": { ko: "AI & AX", en: "AI & AX" },
  blockchain: { ko: "블록체인", en: "Blockchain" },
  "product-rd": { ko: "제품·R&D", en: "Product & R&D" },
  education: { ko: "교육사업", en: "Education" },
};

const FILTERS: ProjectFilter[] = [
  "all",
  "global-business",
  "ai-ax",
  "blockchain",
  "product-rd",
  "education",
];

const PROJECTS: Project[] = [
  {
    id: "emotion-personalization",
    featured: true,
    visibility: "published",
    categories: ["ai-ax", "product-rd"],
    title: {
      ko: "AI 기반 감성 분석 및 개인화 콘텐츠 시스템",
      en: "AI-Based Emotion Analysis & Personalized Content System",
    },
    summary: {
      ko: "사용자의 감정과 행동 데이터를 분석해 개인 맞춤형 콘텐츠를 제공하는 AI 기반 시스템을 설계·개발했습니다.",
      en: "An AI-based system designed to analyze user emotion and behavior data and deliver personalized content experiences.",
    },
    role: {
      ko: "감정 분석 로직, 개인화 콘텐츠 흐름, 운영 구조를 포함한 서비스 시스템을 설계·개발했습니다.",
      en: "ERUTY designed and developed the service system covering emotion analysis logic, personalization flow, and operational structure.",
    },
    scope: [
      {
        ko: "감정 및 행동 데이터 구조 설계",
        en: "Emotion and behavior data structure design",
      },
      {
        ko: "개인화 콘텐츠 추천 흐름 기획",
        en: "Personalized content recommendation flow planning",
      },
      {
        ko: "운영을 위한 분석·관리 인터페이스 구성",
        en: "Analysis and management interface configuration for operations",
      },
    ],
    outcome: {
      ko: "개인화 콘텐츠 제공을 위한 AI 시스템 구조를 공개 가능한 범위에서 정리했습니다.",
      en: "A public-facing overview of the AI system structure for personalized content delivery was prepared.",
    },
    status: {
      ko: "설계·개발 프로젝트",
      en: "Design and Development Project",
    },
    market: {
      ko: "디지털 콘텐츠 서비스",
      en: "Digital Content Services",
    },
    visualType: "interface",
    visualIsConcept: true,
  },
  {
    id: "content-profitability",
    visibility: "published",
    categories: ["ai-ax", "product-rd"],
    title: {
      ko: "AI 콘텐츠 수익성 분석 시스템",
      en: "AI Content Performance & Profitability Analysis",
    },
    summary: {
      ko: "콘텐츠와 시장 데이터를 분석해 사업성과 수익 가능성 판단을 지원하는 AI 분석 시스템입니다.",
      en: "An AI analysis system supporting content performance and profitability assessment through market and content data.",
    },
    role: {
      ko: "콘텐츠 사업성 검토를 위한 분석 구조와 운영 화면 구성을 설계했습니다.",
      en: "ERUTY designed the analysis structure and operational screens for content business assessment.",
    },
    scope: [
      {
        ko: "콘텐츠·시장 데이터 분석 흐름 설계",
        en: "Content and market data analysis flow design",
      },
      {
        ko: "수익성 판단을 위한 검토 인터페이스 구성",
        en: "Review interface configuration for profitability assessment",
      },
      {
        ko: "사업 의사결정을 위한 분석 리포트 구조 정리",
        en: "Analysis report structure for business decision-making",
      },
    ],
    outcome: {
      ko: "콘텐츠 기획과 사업성 검토에 활용할 수 있는 분석 환경을 구성했습니다.",
      en: "An analysis environment for content planning and business feasibility review was established.",
    },
    status: {
      ko: "제품·R&D 프로젝트",
      en: "Product and R&D Project",
    },
    market: {
      ko: "콘텐츠·시장 데이터 분석",
      en: "Content and Market Data Analysis",
    },
    visualType: "interface",
    visualIsConcept: true,
  },
  {
    id: "blockchain-rights",
    visibility: "published",
    categories: ["blockchain", "product-rd"],
    title: {
      ko: "블록체인 기반 저작권 관리·거래 시스템",
      en: "Blockchain-Based Rights Management & Transaction System",
    },
    summary: {
      ko: "콘텐츠 권리, 계약과 거래 이력을 관리할 수 있도록 설계한 블록체인 기반 시스템입니다.",
      en: "A blockchain-based system designed to manage content rights, contracts, and transaction records.",
    },
    role: {
      ko: "권리 구조 모델링, 거래 기록 흐름 설계, 시스템 화면 구성을 담당했습니다.",
      en: "ERUTY handled rights structure modeling, transaction flow design, and system interface planning.",
    },
    scope: [
      {
        ko: "권리 등록 및 관리 구조 설계",
        en: "Rights registration and management structure design",
      },
      {
        ko: "계약·거래 이력 추적 흐름 구성",
        en: "Contract and transaction history tracking flow",
      },
      {
        ko: "블록체인 기반 기록 관리 인터페이스 설계",
        en: "Blockchain-based record management interface design",
      },
    ],
    outcome: {
      ko: "콘텐츠 권리와 계약 이력을 체계적으로 관리할 수 있는 시스템 구조를 정리했습니다.",
      en: "A structured system for managing content rights and contract histories was defined.",
    },
    status: {
      ko: "제품·R&D 프로젝트",
      en: "Product and R&D Project",
    },
    market: {
      ko: "콘텐츠 권리·계약 관리",
      en: "Content Rights and Contract Management",
    },
    visualType: "abstract",
    visualIsConcept: true,
  },
  {
    id: "vietnam-market-development",
    visibility: "published",
    categories: ["global-business"],
    title: {
      ko: "베트남 시장 사업개발 및 파트너 연결",
      en: "Vietnam Market Development & Partner Network",
    },
    summary: {
      ko: "베트남 현지 파트너 네트워크를 기반으로 콘텐츠와 비즈니스 협업 구조를 검토하고 연결한 프로젝트입니다.",
      en: "A market development project connecting content and business opportunities through a local partner network in Vietnam.",
    },
    role: {
      ko: "현지 파트너 검토, 사업 기회 정리, 협업 구조 연결을 수행했습니다.",
      en: "ERUTY reviewed local partners, mapped business opportunities, and connected collaboration structures.",
    },
    scope: [
      {
        ko: "베트남 현지 파트너 네트워크 검토",
        en: "Review of local partner networks in Vietnam",
      },
      {
        ko: "콘텐츠·사업 협업 기회 정리",
        en: "Organization of content and business collaboration opportunities",
      },
      {
        ko: "현장 기반 파트너 연결 및 실행 준비",
        en: "On-site partner connection and execution preparation",
      },
    ],
    outcome: {
      ko: "베트남 현지 네트워크를 바탕으로 협업 검토와 연결을 지원했습니다.",
      en: "ERUTY supported collaboration review and partner connection through its local Vietnam network.",
    },
    status: {
      ko: "글로벌 사업 프로젝트",
      en: "Global Business Project",
    },
    market: {
      ko: "베트남 시장",
      en: "Vietnam Market",
    },
    image: "/images/company/about/journey-2025-vietnam.png",
    imageAlt: {
      ko: "베트남 현장 공개 이미지",
      en: "Public on-site image from Vietnam",
    },
    visualType: "image",
  },
  {
    id: "public-ax-education",
    visibility: "published",
    categories: ["education", "ai-ax"],
    title: {
      ko: "공공기관 대상 AX 교육 프로그램",
      en: "AX Education Program for Public Institutions",
    },
    summary: {
      ko: "공공기관의 AI 활용 역량 강화를 위한 교육 과정과 운영 프로그램을 설계·수행했습니다.",
      en: "An education program designed and delivered to strengthen practical AI capabilities in public institutions.",
    },
    role: {
      ko: "교육 과정 설계, 운영 구조 기획, 현장 실행 체계를 구성했습니다.",
      en: "ERUTY designed the curriculum, planned the operating model, and built the execution framework for delivery.",
    },
    scope: [
      {
        ko: "공공기관 대상 AX 교육 과정 설계",
        en: "AX curriculum design for public institutions",
      },
      {
        ko: "실습 중심 프로그램 운영 구조 정리",
        en: "Practice-oriented program operations framework",
      },
      {
        ko: "교육 운영을 위한 관리 화면 및 자료 구성",
        en: "Management views and supporting materials for delivery",
      },
    ],
    outcome: {
      ko: "공공기관 실무 환경에 맞춘 AX 교육 프로그램을 공개 가능한 범위에서 정리했습니다.",
      en: "A public-facing overview of an AX education program tailored to public-sector practice was prepared.",
    },
    status: {
      ko: "교육사업 프로젝트",
      en: "Education Project",
    },
    market: {
      ko: "공공기관",
      en: "Public Institutions",
    },
    visualType: "interface",
    visualIsConcept: true,
  },
];

const PUBLISHED_PROJECTS = PROJECTS.filter(
  (project) => project.visibility === "published",
);
const FEATURED_PROJECT =
  PUBLISHED_PROJECTS.find((project) => project.featured) ?? PUBLISHED_PROJECTS[0];
const GRID_PROJECTS = PUBLISHED_PROJECTS.filter(
  (project) => project.id !== FEATURED_PROJECT.id,
);

function getLocalizedText(text: LocalizedText, lang: Lang) {
  return text[lang];
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [] as HTMLElement[];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function getRevealProps(prefersReducedMotion: boolean) {
  if (prefersReducedMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };
}

function Eyebrow({ children }: { children: string }) {
  return (
    <div
      className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em]"
      style={{ color: BLUE, fontFamily: "var(--font-mono)" }}
    >
      {children}
    </div>
  );
}

function ConceptPill() {
  return (
    <div
      className="absolute right-4 top-4 rounded-full px-3 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em]"
      style={{
        background: "rgba(255,255,255,0.12)",
        color: "#FFFFFF",
        fontFamily: "var(--font-mono)",
        backdropFilter: "blur(10px)",
      }}
    >
      CONCEPT VISUAL
    </div>
  );
}

function CategoryTag({
  category,
  lang,
  dark = false,
}: {
  category: ProjectCategory;
  lang: Lang;
  dark?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-[7px] text-[0.76rem] font-medium"
      style={{
        background: dark ? "rgba(255,255,255,0.12)" : "rgba(55,55,242,0.08)",
        color: dark ? "#FFFFFF" : NEAR_BLACK,
      }}
    >
      {getLocalizedText(CATEGORY_LABELS[category], lang)}
    </span>
  );
}

function HeroPattern() {
  return (
    <div className="pointer-events-none absolute right-[-9%] top-[-2rem] hidden h-[24rem] w-[60%] lg:block">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(55,55,242,0.16) 1px, transparent 1.2px)",
          backgroundSize: "14px 14px",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.95) 24%, rgba(0,0,0,0.86) 76%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.95) 24%, rgba(0,0,0,0.86) 76%, transparent 100%)",
        }}
      />
      <svg
        viewBox="0 0 760 360"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        {[0, 24, 48, 72, 96, 120].map((offset) => (
          <path
            key={offset}
            d={`M8 ${78 + offset} C 128 ${12 + offset} 248 ${12 + offset} 370 ${
              78 + offset
            } S 622 ${144 + offset} 752 ${78 + offset}`}
            stroke="rgba(55,55,242,0.18)"
            strokeWidth="1.35"
          />
        ))}
      </svg>
    </div>
  );
}

function HeroSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const { lang } = useLanguage();
  const copy = PAGE_COPY[lang];

  return (
    <motion.section
      data-growth-hero
      className="relative overflow-hidden border-b bg-white"
      style={{ borderColor: BORDER }}
      {...getRevealProps(prefersReducedMotion)}
    >
      <PageContainer>
        <div className="relative eruty-hero-section">
          <div className="relative z-10">
            <PageHeading
              eyebrow={copy.heroEyebrow}
              title={copy.heroHeadline}
              description={copy.heroDescription}
              align="center"
              lang={lang}
            />
          </div>
          <HeroPattern />
        </div>
      </PageContainer>
    </motion.section>
  );
}

function InterfaceShell({
  children,
  featured = false,
  dark = true,
}: {
  children: ReactNode;
  featured?: boolean;
  dark?: boolean;
}) {
  return (
    <div
      className={`relative h-full w-full overflow-hidden rounded-[1rem] border ${
        featured ? "p-4 md:p-5" : "p-3.5"
      }`}
      style={{
        borderColor: dark ? "rgba(255,255,255,0.08)" : "rgba(55,55,242,0.08)",
        background: dark
          ? "linear-gradient(180deg, rgba(12,19,33,0.98) 0%, rgba(10,15,26,1) 100%)"
          : "linear-gradient(180deg, #FCFDFF 0%, #F1F5FB 100%)",
      }}
    >
      {children}
    </div>
  );
}

function EmotionConceptVisual({ featured = false }: { featured?: boolean }) {
  return (
    <InterfaceShell featured={featured}>
      <ConceptPill />
      <div className="grid h-full gap-3 md:grid-cols-[118px_1fr]">
        <div className="flex flex-col gap-2">
          <div
            className="h-10 rounded-[0.8rem]"
            style={{ background: "rgba(255,255,255,0.08)" }}
          />
          <div
            className="h-10 rounded-[0.8rem]"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <div
            className="h-10 rounded-[0.8rem]"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <div
            className="mt-2 flex-1 rounded-[1rem]"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
            }}
          />
        </div>

        <div className="flex h-full flex-col gap-3">
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              "rgba(55,55,242,0.28)",
              "rgba(116,155,255,0.18)",
              "rgba(255,255,255,0.08)",
            ].map((background, index) => (
              <div
                key={`${background}-${index}`}
                className="h-16 rounded-[0.9rem]"
                style={{ background }}
              />
            ))}
          </div>

          <div
            className="relative flex-1 overflow-hidden rounded-[1rem] border"
            style={{
              borderColor: "rgba(255,255,255,0.08)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)",
            }}
          >
            <svg
              viewBox="0 0 560 240"
              className="absolute inset-0 h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M18 162 C 82 102 128 86 182 120 S 292 198 350 152 S 470 76 540 118"
                stroke="rgba(119,212,255,0.88)"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M18 182 C 96 132 142 138 198 168 S 314 204 378 178 S 486 126 540 148"
                stroke="rgba(55,55,242,0.88)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M18 138 C 88 126 132 82 196 98 S 312 170 384 130 S 488 68 540 92"
                stroke="rgba(255,255,255,0.34)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-x-5 bottom-4 grid grid-cols-3 gap-2">
              {["48%", "58%", "42%"].map((height, index) => (
                <div
                  key={`${height}-${index}`}
                  className="rounded-[0.85rem]"
                  style={{
                    height,
                    background:
                      "linear-gradient(180deg, rgba(55,55,242,0.22) 0%, rgba(55,55,242,0.08) 100%)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </InterfaceShell>
  );
}

function AnalysisConceptVisual() {
  return (
    <InterfaceShell>
      <ConceptPill />
      <div className="grid h-full gap-3">
        <div className="grid grid-cols-[1.2fr_0.8fr] gap-3">
          <div
            className="rounded-[0.95rem] border p-3"
            style={{
              borderColor: "rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <div className="flex h-[7.5rem] items-end gap-2">
              {["38%", "62%", "44%", "72%", "56%", "82%"].map((height, index) => (
                <div
                  key={`${height}-${index}`}
                  className="flex-1 rounded-t-[0.6rem]"
                  style={{
                    height,
                    background:
                      index % 2 === 0
                        ? "rgba(55,55,242,0.9)"
                        : "rgba(107,188,255,0.82)",
                  }}
                />
              ))}
            </div>
          </div>

          <div
            className="flex items-center justify-center rounded-[0.95rem] border"
            style={{
              borderColor: "rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <div
              className="h-24 w-24 rounded-full"
              style={{
                background:
                  "conic-gradient(from 160deg, rgba(55,55,242,1), rgba(119,212,255,0.92), rgba(55,55,242,0.18), rgba(55,55,242,1))",
                padding: 10,
              }}
            >
              <div className="h-full w-full rounded-full bg-[#091221]" />
            </div>
          </div>
        </div>

        <div
          className="rounded-[0.95rem] border p-4"
          style={{
            borderColor: "rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.04)",
          }}
        >
          <svg viewBox="0 0 420 120" className="h-full w-full" fill="none" aria-hidden="true">
            <path
              d="M10 82 C 48 70 72 34 118 42 S 194 104 240 84 S 330 24 410 40"
              stroke="rgba(55,55,242,0.92)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M10 96 C 62 78 86 72 132 88 S 212 108 258 94 S 332 52 410 68"
              stroke="rgba(119,212,255,0.88)"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M10 62 C 52 56 92 18 136 26 S 206 88 258 64 S 340 18 410 22"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </InterfaceShell>
  );
}

function BlockchainConceptVisual() {
  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[1rem]"
      style={{
        background:
          "radial-gradient(circle at 50% 26%, rgba(95,168,255,0.22), transparent 28%), linear-gradient(180deg, #081427 0%, #09101D 100%)",
      }}
    >
      <ConceptPill />
      <svg
        viewBox="0 0 600 360"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        {[
          [180, 92],
          [424, 86],
          [138, 252],
          [458, 248],
          [300, 54],
          [304, 298],
        ].map(([x, y], index) => (
          <g key={`${x}-${y}-${index}`}>
            <line
              x1="300"
              y1="176"
              x2={x}
              y2={y}
              stroke="rgba(85,155,255,0.24)"
              strokeWidth="2"
            />
            <rect
              x={x - 34}
              y={y - 34}
              width="68"
              height="68"
              rx="12"
              fill="rgba(55,55,242,0.16)"
              stroke="rgba(119,212,255,0.34)"
            />
            <rect
              x={x - 16}
              y={y - 18}
              width="32"
              height="36"
              rx="6"
              fill="rgba(119,212,255,0.20)"
            />
          </g>
        ))}
      </svg>
      <div
        className="absolute left-1/2 top-1/2 h-[126px] w-[126px] -translate-x-1/2 -translate-y-1/2 rounded-[1.4rem] border"
        style={{
          borderColor: "rgba(119,212,255,0.45)",
          background:
            "linear-gradient(180deg, rgba(55,55,242,0.42) 0%, rgba(55,55,242,0.18) 100%)",
          boxShadow: "0 16px 44px rgba(11, 35, 88, 0.32)",
        }}
      >
        <div
          className="absolute inset-x-[34px] top-[28px] h-[24px] rounded-t-full border"
          style={{ borderColor: "rgba(255,255,255,0.72)" }}
        />
        <div
          className="absolute left-[26px] right-[26px] top-[44px] bottom-[26px] rounded-[1rem]"
          style={{ background: "rgba(255,255,255,0.12)" }}
        />
      </div>
    </div>
  );
}

function EducationConceptVisual() {
  return (
    <InterfaceShell dark={false}>
      <ConceptPill />
      <div className="grid h-full gap-3 md:grid-cols-[108px_1fr]">
        <div
          className="rounded-[0.95rem] border p-3"
          style={{
            borderColor: "rgba(55,55,242,0.08)",
            background: "rgba(255,255,255,0.72)",
          }}
        >
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={`side-${index}`}
                className="h-9 rounded-[0.8rem]"
                style={{
                  background:
                    index === 0
                      ? "rgba(55,55,242,0.12)"
                      : "rgba(24,25,27,0.05)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <div
            className="relative overflow-hidden rounded-[0.95rem] border"
            style={{
              borderColor: "rgba(55,55,242,0.08)",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.88) 0%, rgba(243,247,252,0.92) 100%)",
            }}
          >
            <div className="grid h-full gap-3 p-3 sm:grid-cols-[1.25fr_0.75fr]">
              <div
                className="flex items-center justify-center rounded-[0.85rem]"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(55,55,242,0.16) 0%, rgba(119,212,255,0.18) 100%)",
                }}
              >
                <div
                  className="h-16 w-16 rounded-full"
                  style={{ background: "rgba(55,55,242,0.22)" }}
                />
              </div>
              <div className="grid gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`course-${index}`}
                    className="rounded-[0.8rem]"
                    style={{
                      height: index === 0 ? 44 : 38,
                      background:
                        index === 0
                          ? "rgba(55,55,242,0.12)"
                          : "rgba(24,25,27,0.05)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`module-${index}`}
                className="rounded-[0.95rem] border p-3"
                style={{
                  borderColor: "rgba(55,55,242,0.08)",
                  background: "rgba(255,255,255,0.8)",
                }}
              >
                <div
                  className="h-10 rounded-[0.75rem]"
                  style={{
                    background:
                      index === 1
                        ? "rgba(119,212,255,0.16)"
                        : "rgba(55,55,242,0.10)",
                  }}
                />
                <div
                  className="mt-3 h-2.5 rounded-full"
                  style={{ background: "rgba(24,25,27,0.08)" }}
                />
                <div
                  className="mt-2 h-2.5 w-[72%] rounded-full"
                  style={{ background: "rgba(24,25,27,0.08)" }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </InterfaceShell>
  );
}

function ProjectVisual({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const { lang } = useLanguage();

  if (project.image && project.imageAlt) {
    return (
      <div className="relative h-full w-full overflow-hidden rounded-[1rem] bg-[#EDF2FA]">
        <img
          src={project.image}
          alt={getLocalizedText(project.imageAlt, lang)}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.015]"
          draggable={false}
        />
      </div>
    );
  }

  if (project.id === "emotion-personalization") {
    return <EmotionConceptVisual featured={featured} />;
  }

  if (project.id === "content-profitability") {
    return <AnalysisConceptVisual />;
  }

  if (project.id === "blockchain-rights") {
    return <BlockchainConceptVisual />;
  }

  return <EducationConceptVisual />;
}

function FeaturedProjectSection({
  project,
  onOpen,
  prefersReducedMotion,
}: {
  project: Project;
  onOpen: (project: Project, trigger: HTMLElement | null) => void;
  prefersReducedMotion: boolean;
}) {
  const { lang } = useLanguage();
  const copy = PAGE_COPY[lang];

  return (
    <motion.section
      data-growth-featured
      className="border-b bg-white py-10 md:py-12"
      style={{ borderColor: BORDER }}
      {...getRevealProps(prefersReducedMotion)}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="mb-6">
          <Eyebrow>{copy.featuredEyebrow}</Eyebrow>
        </div>

        <div
          className="grid min-h-[420px] overflow-hidden rounded-[1rem] border lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]"
          style={{
            borderColor: "rgba(9,17,31,0.08)",
            background:
              "linear-gradient(135deg, #081323 0%, #07111E 48%, #0C1626 100%)",
            boxShadow: "0 22px 60px rgba(12, 24, 43, 0.12)",
          }}
        >
          <div className="flex flex-col justify-between p-7 md:p-9 lg:p-10">
            <div>
              <div className="flex flex-wrap gap-2">
                {project.categories.map((category) => (
                  <CategoryTag
                    key={category}
                    category={category}
                    lang={lang}
                    dark
                  />
                ))}
                {project.year ? (
                  <span
                    className="inline-flex items-center rounded-full px-3 py-[7px] text-[0.76rem]"
                    style={{
                      background: "rgba(255,255,255,0.08)",
                      color: "rgba(255,255,255,0.92)",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {project.year}
                  </span>
                ) : null}
              </div>

              <h2
                className={`mt-7 max-w-[24rem] font-[800] tracking-[-0.042em] text-white ${
                  lang === "ko" ? "eruty-keep-all" : ""
                }`}
                style={{
                  fontSize: "clamp(2rem, 3.2vw, 2.9rem)",
                  lineHeight: 1.12,
                }}
              >
                {getLocalizedText(project.title, lang)}
              </h2>

              <p
                className={`mt-5 max-w-[25rem] ${
                  lang === "ko" ? "eruty-keep-all" : ""
                }`}
                style={{
                  color: "rgba(255,255,255,0.76)",
                  fontSize: "clamp(0.96875rem, 1.04vw, 1.03125rem)",
                  lineHeight: 1.8,
                }}
              >
                {getLocalizedText(project.summary, lang)}
              </p>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={(event) => onOpen(project, event.currentTarget)}
                className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#081323]"
                style={{
                  borderColor: "rgba(255,255,255,0.18)",
                  color: "#FFFFFF",
                }}
              >
                {copy.featuredButton}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div className="min-h-[280px] border-t p-4 md:p-5 lg:min-h-full lg:border-l lg:border-t-0 lg:p-6">
            <div
              className="h-full rounded-[1rem]"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <ProjectVisual project={project} featured />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function FilterSection({
  activeFilter,
  onChange,
  prefersReducedMotion,
}: {
  activeFilter: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
  prefersReducedMotion: boolean;
}) {
  const { lang } = useLanguage();
  const copy = PAGE_COPY[lang];

  return (
    <motion.section
      className="bg-white py-8"
      {...getRevealProps(prefersReducedMotion)}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em]" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>
          {copy.filterLabel}
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            const label =
              filter === "all"
                ? copy.filterAll
                : getLocalizedText(CATEGORY_LABELS[filter], lang);

            return (
              <button
                key={filter}
                type="button"
                onClick={() => onChange(filter)}
                aria-pressed={isActive}
                className="rounded-full px-4 py-[11px] text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3737F2] focus-visible:ring-offset-2"
                style={{
                  background: isActive ? BLUE : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : NEAR_BLACK,
                  border: `1px solid ${isActive ? BLUE : BORDER}`,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

function ProjectCard({
  project,
  onOpen,
  prefersReducedMotion,
}: {
  project: Project;
  onOpen: (project: Project, trigger: HTMLElement | null) => void;
  prefersReducedMotion: boolean;
}) {
  const { lang } = useLanguage();
  const copy = PAGE_COPY[lang];

  return (
    <motion.button
      layout
      type="button"
      onClick={(event) => onOpen(project, event.currentTarget)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[1rem] border bg-white text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3737F2] focus-visible:ring-offset-2"
      style={{
        borderColor: BORDER,
        boxShadow: "0 16px 36px rgba(16, 31, 68, 0.06)",
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="overflow-hidden border-b"
        style={{ borderColor: BORDER, aspectRatio: "16 / 10" }}
      >
        <ProjectVisual project={project} />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          {project.categories.slice(0, 2).map((category) => (
            <CategoryTag key={category} category={category} lang={lang} />
          ))}
        </div>

        <h3
          className={`mt-4 font-[800] tracking-[-0.03em] ${
            lang === "ko" ? "eruty-keep-all" : ""
          }`}
          style={{
            color: NEAR_BLACK,
            fontSize: "clamp(1.25rem, 1.55vw, 1.55rem)",
            lineHeight: 1.2,
          }}
        >
          {getLocalizedText(project.title, lang)}
        </h3>

        <p
          className={`mt-3 overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] ${
            lang === "ko" ? "eruty-keep-all" : ""
          }`}
          style={{
            color: BODY_TEXT,
            fontSize: "0.96875rem",
            lineHeight: 1.75,
          }}
        >
          {getLocalizedText(project.summary, lang)}
        </p>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span
            className="text-sm font-medium"
            style={{ color: BLUE }}
          >
            {copy.viewDetails}
          </span>
          <ArrowRight size={16} style={{ color: BLUE }} />
        </div>
      </div>
    </motion.button>
  );
}

function ProjectGridSection({
  projects,
  onOpen,
  prefersReducedMotion,
}: {
  projects: Project[];
  onOpen: (project: Project, trigger: HTMLElement | null) => void;
  prefersReducedMotion: boolean;
}) {
  const { lang } = useLanguage();
  const copy = PAGE_COPY[lang];

  return (
    <motion.section
      data-growth-grid
      className="border-b bg-white pb-16 md:pb-20"
      style={{ borderColor: BORDER }}
      {...getRevealProps(prefersReducedMotion)}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.length > 0 ? (
            <motion.div layout className="grid gap-6 md:grid-cols-2 md:gap-7">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={
                    prefersReducedMotion ? undefined : { opacity: 0, y: 14 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0.12 : 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProjectCard
                    project={project}
                    onOpen={onOpen}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              className="rounded-[1rem] border px-6 py-12 text-center"
              style={{ borderColor: BORDER, background: SOFT_BG }}
            >
              <p
                className={lang === "ko" ? "eruty-keep-all" : ""}
                style={{ color: BODY_TEXT, lineHeight: 1.8 }}
              >
                {copy.gridEmpty}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function DrawerVisual({
  project,
  lang,
}: {
  project: Project;
  lang: Lang;
}) {
  if (project.image && project.imageAlt) {
    return (
      <div
        className="overflow-hidden rounded-[1rem] border"
        style={{ borderColor: BORDER, aspectRatio: "16 / 10" }}
      >
        <img
          src={project.image}
          alt={getLocalizedText(project.imageAlt, lang)}
          className="h-full w-full object-cover object-center"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div style={{ aspectRatio: "16 / 10" }}>
      <ProjectVisual project={project} />
    </div>
  );
}

function ProjectDetailDrawer({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { lang } = useLanguage();
  const copy = PAGE_COPY[lang];
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusableElements(panelRef.current);
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [onClose, project]);

  if (!project) {
    return null;
  }

  const detailRows: Array<{ label: string; value: string }> = [];
  if (project.year) {
    detailRows.push({ label: copy.yearLabel, value: project.year });
  }
  if (project.market) {
    detailRows.push({
      label: copy.marketLabel,
      value: getLocalizedText(project.market, lang),
    });
  }
  if (project.status) {
    detailRows.push({
      label: copy.statusLabel,
      value: getLocalizedText(project.status, lang),
    });
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          aria-label={copy.closeDrawer}
          className="absolute inset-0 h-full w-full"
          style={{ background: "rgba(10, 16, 29, 0.52)" }}
          onClick={onClose}
        />

        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${getLocalizedText(project.title, lang)} ${
            lang === "ko" ? "상세" : "details"
          }`}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 right-0 top-0 flex w-full max-w-[560px] flex-col bg-white shadow-2xl"
        >
          <div
            className="flex items-start justify-between gap-4 px-6 pb-4 pt-6 md:px-7 md:pb-5"
            style={{ borderBottom: `1px solid ${BORDER}` }}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                {project.categories.map((category) => (
                  <CategoryTag key={category} category={category} lang={lang} />
                ))}
              </div>
              <h3
                className={`mt-4 font-[800] tracking-[-0.04em] ${
                  lang === "ko" ? "eruty-keep-all" : ""
                }`}
                style={{
                  color: NEAR_BLACK,
                  fontSize: "clamp(1.55rem, 2.3vw, 2rem)",
                  lineHeight: 1.18,
                }}
              >
                {getLocalizedText(project.title, lang)}
              </h3>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={copy.closeDrawer}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3737F2] focus-visible:ring-offset-2"
              style={{ borderColor: BORDER, color: NEAR_BLACK }}
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 md:px-7 md:py-7">
            <div className="space-y-7">
              <section>
                <div
                  className="mb-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                >
                  {copy.relatedVisualLabel}
                </div>
                <DrawerVisual project={project} lang={lang} />
              </section>

              {detailRows.length > 0 ? (
                <section
                  className="overflow-hidden rounded-[1rem] border"
                  style={{ borderColor: BORDER }}
                >
                  {detailRows.map((row, index) => (
                    <div
                      key={row.label}
                      className="grid gap-2 px-4 py-4 md:grid-cols-[132px_1fr]"
                      style={{
                        borderTop:
                          index > 0 ? `1px solid ${BORDER}` : "1px solid transparent",
                      }}
                    >
                      <div
                        className="text-[0.76rem] font-semibold uppercase tracking-[0.18em]"
                        style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                      >
                        {row.label}
                      </div>
                      <div
                        className={lang === "ko" ? "eruty-keep-all" : ""}
                        style={{
                          color: BODY_TEXT,
                          fontSize: "0.96875rem",
                          lineHeight: 1.72,
                        }}
                      >
                        {row.value}
                      </div>
                    </div>
                  ))}
                </section>
              ) : null}

              <section>
                <div
                  className="mb-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em]"
                  style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                >
                  {copy.overviewLabel}
                </div>
                <p
                  className={lang === "ko" ? "eruty-keep-all" : ""}
                  style={{
                    color: BODY_TEXT,
                    fontSize: "0.98rem",
                    lineHeight: 1.82,
                  }}
                >
                  {getLocalizedText(project.summary, lang)}
                </p>
              </section>

              {project.role ? (
                <section>
                  <div
                    className="mb-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                  >
                    {copy.roleLabel}
                  </div>
                  <p
                    className={lang === "ko" ? "eruty-keep-all" : ""}
                    style={{
                      color: BODY_TEXT,
                      fontSize: "0.98rem",
                      lineHeight: 1.82,
                    }}
                  >
                    {getLocalizedText(project.role, lang)}
                  </p>
                </section>
              ) : null}

              {project.scope && project.scope.length > 0 ? (
                <section>
                  <div
                    className="mb-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                  >
                    {copy.scopeLabel}
                  </div>
                  <ul className="space-y-3">
                    {project.scope.map((item) => (
                      <li
                        key={item.en}
                        className={`flex gap-3 ${lang === "ko" ? "eruty-keep-all" : ""}`}
                        style={{
                          color: BODY_TEXT,
                          fontSize: "0.98rem",
                          lineHeight: 1.78,
                        }}
                      >
                        <span
                          className="mt-[0.72rem] h-[6px] w-[6px] rounded-full"
                          style={{ background: BLUE }}
                        />
                        <span>{getLocalizedText(item, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {project.outcome ? (
                <section>
                  <div
                    className="mb-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                  >
                    {copy.outcomeLabel}
                  </div>
                  <p
                    className={lang === "ko" ? "eruty-keep-all" : ""}
                    style={{
                      color: BODY_TEXT,
                      fontSize: "0.98rem",
                      lineHeight: 1.82,
                    }}
                  >
                    {getLocalizedText(project.outcome, lang)}
                  </p>
                </section>
              ) : null}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CtaPattern() {
  return (
    <svg
      viewBox="0 0 1200 320"
      className="absolute inset-x-0 bottom-0 h-full w-full opacity-60"
      fill="none"
      aria-hidden="true"
    >
      {[0, 22, 44, 66].map((offset) => (
        <path
          key={offset}
          d={`M-40 ${248 + offset} C 168 ${176 + offset} 346 ${186 + offset} 540 ${
            230 + offset
          } S 896 ${300 + offset} 1240 ${214 + offset}`}
          stroke="rgba(55,55,242,0.28)"
          strokeWidth="1.6"
        />
      ))}
    </svg>
  );
}

function FinalCtaSection({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const { lang } = useLanguage();
  const copy = PAGE_COPY[lang];

  return (
    <motion.section
      data-growth-cta
      className="overflow-hidden bg-[#060B14] py-16 md:py-20"
      {...getRevealProps(prefersReducedMotion)}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[1rem] border px-6 py-12 md:px-10 md:py-14 lg:px-14"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background:
              "radial-gradient(circle at 78% 24%, rgba(55,55,242,0.12), transparent 24%), linear-gradient(180deg, #07111E 0%, #050A13 100%)",
          }}
        >
          <CtaPattern />
          <div className="relative z-10 max-w-[42rem]">
            <div
              className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em]"
              style={{ color: "rgba(255,255,255,0.56)", fontFamily: "var(--font-mono)" }}
            >
              {copy.ctaEyebrow}
            </div>

            <h2
              className={`font-[800] tracking-[-0.042em] text-white ${
                lang === "ko" ? "eruty-keep-all" : ""
              }`}
              style={{
                fontSize: "clamp(2rem, 3.2vw, 2.85rem)",
                lineHeight: 1.14,
              }}
            >
              {copy.ctaHeadline}
            </h2>

            <p
              className={`mt-4 max-w-[33rem] ${
                lang === "ko" ? "eruty-keep-all" : ""
              }`}
              style={{
                color: "rgba(255,255,255,0.72)",
                fontSize: "clamp(0.96875rem, 1.04vw, 1.0625rem)",
                lineHeight: 1.8,
              }}
            >
              {copy.ctaDescription}
            </p>

            <Link
              to="/start-a-project"
              className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 text-[0.96rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A13]"
              style={{ background: BLUE, color: "#FFFFFF" }}
            >
              {copy.ctaButton}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export function GrowthPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const previousHtmlOverflowX = document.documentElement.style.overflowX;
    const previousBodyOverflowX = document.body.style.overflowX;

    document.documentElement.style.overflowX = "clip";
    document.body.style.overflowX = "clip";

    return () => {
      document.documentElement.style.overflowX = previousHtmlOverflowX;
      document.body.style.overflowX = previousBodyOverflowX;
    };
  }, []);

  const filteredProjects = GRID_PROJECTS.filter((project) =>
    activeFilter === "all"
      ? true
      : project.categories.includes(activeFilter),
  );

  const selectedProject =
    PUBLISHED_PROJECTS.find((project) => project.id === selectedProjectId) ?? null;

  function openProject(project: Project, trigger: HTMLElement | null) {
    triggerRef.current = trigger;
    setSelectedProjectId(project.id);
  }

  function closeProject() {
    setSelectedProjectId(null);
    const trigger = triggerRef.current;
    window.requestAnimationFrame(() => trigger?.focus());
  }

  return (
    <div className="overflow-hidden bg-white">
      <HeroSection prefersReducedMotion={prefersReducedMotion} />
      <FeaturedProjectSection
        project={FEATURED_PROJECT}
        onOpen={openProject}
        prefersReducedMotion={prefersReducedMotion}
      />
      <FilterSection
        activeFilter={activeFilter}
        onChange={setActiveFilter}
        prefersReducedMotion={prefersReducedMotion}
      />
      <ProjectGridSection
        projects={filteredProjects}
        onOpen={openProject}
        prefersReducedMotion={prefersReducedMotion}
      />
      <ProjectDetailDrawer project={selectedProject} onClose={closeProject} />
      <FinalCtaSection prefersReducedMotion={prefersReducedMotion} />
    </div>
  );
}
