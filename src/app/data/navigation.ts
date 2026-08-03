// ── Navigation Structure ──────────────────────────────────────────────────────
// This file centralizes the site navigation items.
// Used by Header.tsx for mega menus and mobile navigation.
// Update this file to add, remove, or rename navigation items.

export interface NavItem {
  to: string;
  label: { ko: string; en: string };
}

export interface MegaMenuItem {
  label: { ko: string; en: string };
  desc: { ko: string; en: string };
}

// Top-level navigation entries
// Items with `to` navigate directly; items without `to` open a mega menu.
export const mainNavItems = [
  {
    key: "company",
    label: { ko: "회사", en: "Company" },
    hasMegaMenu: true,
  },
  {
    key: "services",
    label: { ko: "서비스", en: "Services" },
    hasMegaMenu: true,
  },
  {
    key: "technology",
    label: { ko: "기술", en: "Technology" },
    to: "/technology",
    hasMegaMenu: false,
  },
  {
    key: "resources",
    label: { ko: "리소스", en: "Resources" },
    to: "/resources",
    hasMegaMenu: false,
  },
] as const;

// Company mega menu sub-items
export const companyNavItems: NavItem[] = [
  { to: "/company/about", label: { ko: "이루티 소개", en: "About ERUTY" } },
  { to: "/company/team", label: { ko: "팀 & 리더십", en: "Team & Leadership" } },
  { to: "/company/growth", label: { ko: "성장과 신뢰", en: "Growth & Trust" } },
  { to: "/company/careers", label: { ko: "채용", en: "Careers" } },
];

// Services mega menu sub-items
export const servicesNavItems = {
  hitpick: {
    to: "/services/hitpick",
    label: { ko: "힛픽 (HITPICK)", en: "HITPICK" },
    items: [
      { label: { ko: "콘텐츠 투자", en: "Content Investment" }, desc: { ko: "IP 발굴 및 공동 제작", en: "IP discovery and co-production" } },
      { label: { ko: "글로벌 배급", en: "Global Distribution" }, desc: { ko: "아시아·유럽·중동 배급", en: "Distribution across Asia, Europe, MENA" } },
      { label: { ko: "IP & 라이선싱", en: "IP & Licensing" }, desc: { ko: "포맷·캐릭터·브랜드 권리", en: "Format, character, and brand rights" } },
      { label: { ko: "브랜드 협업", en: "Brand Collaboration" }, desc: { ko: "크리에이터 및 브랜드 연계", en: "Creator and brand partnerships" } },
      { label: { ko: "글로벌 파트너십", en: "Global Partnership" }, desc: { ko: "현지 사업자 네트워크", en: "Local operator network" } },
    ],
  },
  erumter: {
    to: "/services/erumter",
    label: { ko: "이럼터 (ERUMTER)", en: "ERUMTER" },
    items: [
      { label: { ko: "AX 교육", en: "AX Education" }, desc: { ko: "조직 AI 전환 교육", en: "Organizational AI transformation training" } },
      { label: { ko: "AI 개발", en: "AI Development" }, desc: { ko: "맞춤 AI 소프트웨어 구축", en: "Custom AI software build" } },
      { label: { ko: "업무 자동화", en: "Workflow Automation" }, desc: { ko: "반복 업무 자동화 설계", en: "Repetitive task automation design" } },
      { label: { ko: "AX 진단", en: "AX Diagnosis" }, desc: { ko: "AI 전환 준비도 평가", en: "AI readiness assessment" } },
    ],
  },
};
