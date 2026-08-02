import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BODY_TEXT = "#333438";
const MUTED = "#737780";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F5F6F8";

type CapabilityArea = "global" | "content" | "ai" | "software" | "infra";

const PROFILE_IMAGE_BY_ID = {
  "kim-yusung": {
    src: "https://www.eruty.co.kr/images/common/ceo.png",
    alt: "김유성",
  },
  "park-sangil": {
    src: "https://www.eruty.co.kr/images/common/coo.png",
    alt: "박상일",
  },
} as const;

const teamMembers: never[] = [];
const advisors: never[] = [];

const LEADERS = [
  {
    id: "kim-yusung",
    nameKo: "김유성",
    nameEn: "김유성",
    titleKo: "대표이사 / CEO",
    titleEn: "CEO",
    summaryKo: "회사의 경영과 글로벌 사업 전략을 총괄합니다.",
    summaryEn: "Leads the company's management and global business strategy.",
  },
  {
    id: "park-sangil",
    nameKo: "박상일",
    nameEn: "박상일",
    titleKo: "부대표 / COO & CBO",
    titleEn: "Vice President / COO & CBO",
    summaryKo: "기업 운영, 사업 전략과 글로벌 성장을 총괄합니다.",
    summaryEn: "Leads corporate operations, business strategy, and global growth.",
  },
  {
    id: "lee-kihong",
    nameKo: "이기홍 박사",
    nameEn: "이기홍 박사",
    titleKo: "기업부설연구소장 / AI·데이터 연구개발 총괄",
    titleEn: "Head of Corporate R&D Center / AI & Data R&D Lead",
    summaryKo: "기업부설연구소와 AI·데이터 연구개발을 총괄합니다.",
    summaryEn: "Leads the corporate R&D center and AI/data research and development.",
  },
  {
    id: "kim-jinhyuk",
    nameKo: "김진혁",
    nameEn: "김진혁",
    titleKo: "개발 총괄 이사",
    titleEn: "Director of Engineering",
    summaryKo: "AI·소프트웨어 개발 조직과 프로젝트 기술 실행을 총괄합니다.",
    summaryEn: "Leads AI and software engineering execution across the organization.",
  },
] as const;

const CAPABILITY_GROUPS = {
  ko: [
    {
      id: "global",
      title: "글로벌 비즈니스",
      titleEn: "Global Business",
      responsibility: "해외 시장 진출 전략, 사업 개발, 파트너십 설계",
      capabilities: ["시장 분석", "현지 파트너 발굴", "사업 구조 설계", "글로벌 네트워크 운영"],
      contribution: "시장과 파트너 구조를 정의하고 실행 기반을 만듭니다.",
      areaKey: "global" as CapabilityArea,
    },
    {
      id: "content",
      title: "콘텐츠 & 파트너십",
      titleEn: "Content & Partnership",
      responsibility: "콘텐츠 IP, 배급, 라이선싱, 브랜드 협업",
      capabilities: ["콘텐츠 사업화", "배급 구조 설계", "IP 협업", "브랜드 연계"],
      contribution: "콘텐츠와 IP를 실제 사업 기회로 연결합니다.",
      areaKey: "content" as CapabilityArea,
    },
    {
      id: "ai",
      title: "AI & 데이터",
      titleEn: "AI & Data",
      responsibility: "AI 시스템 설계, 데이터 분석, 연구개발",
      capabilities: ["LLM", "데이터 분석", "추천·검색", "AI 적용 전략"],
      contribution: "데이터 기반 의사결정과 AI 활용 구조를 설계합니다.",
      areaKey: "ai" as CapabilityArea,
    },
    {
      id: "software",
      title: "소프트웨어 엔지니어링",
      titleEn: "Software Engineering",
      responsibility: "웹·앱, 관리자 시스템, 운영 인터페이스 개발",
      capabilities: ["풀스택 개발", "SaaS 구조", "API 연동", "운영 시스템 구현"],
      contribution: "실제 사용 가능한 서비스와 운영 시스템을 구현합니다.",
      areaKey: "software" as CapabilityArea,
    },
    {
      id: "infra",
      title: "인프라 & 운영 구조",
      titleEn: "Infrastructure & Operations",
      responsibility: "기술 인프라, 권한 관리, 지속 운영 구조",
      capabilities: ["인프라 설계", "권한 관리", "운영 안정성", "배포와 모니터링"],
      contribution: "서비스가 안정적으로 운영될 수 있는 기반을 만듭니다.",
      areaKey: "infra" as CapabilityArea,
    },
  ],
  en: [
    {
      id: "global",
      title: "Global Business",
      titleEn: "Global Business",
      responsibility: "Overseas market entry strategy, business development, and partnership design",
      capabilities: ["Market analysis", "Local partner development", "Business model design", "Global network operations"],
      contribution: "Defines markets and partner structures to create an execution-ready foundation.",
      areaKey: "global" as CapabilityArea,
    },
    {
      id: "content",
      title: "Content & Partnership",
      titleEn: "Content & Partnership",
      responsibility: "Content IP, distribution, licensing, and brand collaboration",
      capabilities: ["Content commercialization", "Distribution design", "IP collaboration", "Brand partnership"],
      contribution: "Connects content and IP to real business opportunities.",
      areaKey: "content" as CapabilityArea,
    },
    {
      id: "ai",
      title: "AI & Data",
      titleEn: "AI & Data",
      responsibility: "AI system design, data analysis, and R&D",
      capabilities: ["LLM", "Data analysis", "Recommendation & search", "AI strategy"],
      contribution: "Designs data-driven decision support and AI application structures.",
      areaKey: "ai" as CapabilityArea,
    },
    {
      id: "software",
      title: "Software Engineering",
      titleEn: "Software Engineering",
      responsibility: "Web, app, admin, and operational interface development",
      capabilities: ["Full-stack development", "SaaS architecture", "API integration", "Operational systems"],
      contribution: "Builds usable products and operational systems for real teams.",
      areaKey: "software" as CapabilityArea,
    },
    {
      id: "infra",
      title: "Infrastructure & Operations",
      titleEn: "Infrastructure & Operations",
      responsibility: "Technical infrastructure, access control, and sustainable operations",
      capabilities: ["Infrastructure design", "Access control", "Operational stability", "Deployment & monitoring"],
      contribution: "Creates the foundation required for reliable ongoing service operation.",
      areaKey: "infra" as CapabilityArea,
    },
  ],
} as const;

const WORKFLOW_STEPS = {
  ko: [
    {
      step: "01",
      title: "사업 목표 정리",
      desc: "프로젝트의 시장, 파트너 구조, 우선순위를 함께 정리합니다.",
      involved: ["global", "content"] as CapabilityArea[],
    },
    {
      step: "02",
      title: "시장과 과제 분석",
      desc: "콘텐츠, 서비스, 기술 과제를 분석해 실행 범위를 정의합니다.",
      involved: ["content", "ai"] as CapabilityArea[],
    },
    {
      step: "03",
      title: "기술과 운영 설계",
      desc: "실행 방식에 맞는 시스템과 운영 구조를 함께 설계합니다.",
      involved: ["ai", "software", "infra"] as CapabilityArea[],
    },
    {
      step: "04",
      title: "구축과 실행",
      desc: "기술 구현과 사업 실행을 병행하며 프로젝트를 전개합니다.",
      involved: ["software", "infra", "content", "global"] as CapabilityArea[],
    },
    {
      step: "05",
      title: "운영과 개선",
      desc: "운영 결과를 바탕으로 다음 단계의 개선 방향을 도출합니다.",
      involved: ["ai", "global", "content", "software", "infra"] as CapabilityArea[],
    },
  ],
  en: [
    {
      step: "01",
      title: "Clarify Business Goals",
      desc: "We align on markets, partner structures, and project priorities.",
      involved: ["global", "content"] as CapabilityArea[],
    },
    {
      step: "02",
      title: "Analyze Market and Challenges",
      desc: "We define the execution scope through content, service, and technology analysis.",
      involved: ["content", "ai"] as CapabilityArea[],
    },
    {
      step: "03",
      title: "Design Technology and Operations",
      desc: "We design the system and operating structure required for execution.",
      involved: ["ai", "software", "infra"] as CapabilityArea[],
    },
    {
      step: "04",
      title: "Build and Execute",
      desc: "We deliver technical implementation and business execution in parallel.",
      involved: ["software", "infra", "content", "global"] as CapabilityArea[],
    },
    {
      step: "05",
      title: "Operate and Improve",
      desc: "We use operational learnings to define the next improvement steps.",
      involved: ["ai", "global", "content", "software", "infra"] as CapabilityArea[],
    },
  ],
} as const;

const TEXT = {
  ko: {
    heroLabel: "Team & Leadership",
    heroHeadline: "사업과 기술을 연결해,\n실행 가능한 팀을 만듭니다.",
    heroDesc: "이루티는 글로벌 사업, 콘텐츠, AI, 소프트웨어 역량이 함께 움직이는 구조로 프로젝트를 실행합니다.",
    heroStats: [
      { label: "전문 역량 그룹", value: "5" },
      { label: "리더십", value: "4" },
      { label: "핵심 협업 축", value: "4" },
    ],
    leadershipLabel: "Leadership",
    leadershipHeadline: "이루티를 이끄는 리더십",
    photoPlaceholder: "프로필 이미지 없음",
    responsibilityLabel: "한 줄 소개",
    introLabel: "소개",
    careerLabel: "공개 메모",
    roleLabel: "이루티 내 역할",
    moreLeadershipNote: "현재 공개 페이지에는 주요 리더십 4명의 프로필만 노출합니다.",
    capabilitiesLabel: "Capabilities",
    capabilitiesHeadline: "하나의 프로젝트를 완성하는\n다섯 가지 핵심 역량",
    responsibilityCol: "주요 책임",
    capabilitiesCol: "핵심 역량",
    contributionCol: "프로젝트 기여",
    directoryLabel: "Team Directory",
    directoryHeadline: "구성원 프로필",
    directoryEmpty: "추가 구성원 프로필을 정리하고 있습니다.",
    howWorkLabel: "How We Work",
    howWorkHeadline: "분야를 나누기보다,\n하나의 실행 구조로 협업합니다.",
    involvedLabel: "참여 역량 그룹",
    ctaHeadline: "이루티와 함께\n다음 실행 구조를 설계하세요.",
    ctaBtn1: "채용 보기",
    ctaBtn2: "회사 소개 보기",
  },
  en: {
    heroLabel: "Team & Leadership",
    heroHeadline: "Connecting business and technology\nthrough an execution-ready team.",
    heroDesc: "ERUTY executes projects through a structure where global business, content, AI, and software capabilities work together.",
    heroStats: [
      { label: "Capability Groups", value: "5" },
      { label: "Leadership", value: "4" },
      { label: "Core Collaboration Axes", value: "4" },
    ],
    leadershipLabel: "Leadership",
    leadershipHeadline: "Leadership Driving ERUTY",
    photoPlaceholder: "No profile image",
    responsibilityLabel: "One-line Summary",
    introLabel: "Introduction",
    careerLabel: "Public Note",
    roleLabel: "Role at ERUTY",
    moreLeadershipNote: "Only the four core leadership profiles are shown on the current public page.",
    capabilitiesLabel: "Capabilities",
    capabilitiesHeadline: "Five Core Capabilities\nThat Complete One Project",
    responsibilityCol: "Responsibilities",
    capabilitiesCol: "Core Capabilities",
    contributionCol: "Project Contribution",
    directoryLabel: "Team Directory",
    directoryHeadline: "Team Profiles",
    directoryEmpty: "Additional team profiles are being prepared.",
    howWorkLabel: "How We Work",
    howWorkHeadline: "We collaborate as one execution structure,\nnot as isolated disciplines.",
    involvedLabel: "Involved Capability Groups",
    ctaHeadline: "Design the next execution structure\nwith ERUTY.",
    ctaBtn1: "View Careers",
    ctaBtn2: "View Company Overview",
  },
} as const;

function getProfileImage(personId: string) {
  return PROFILE_IMAGE_BY_ID[personId as keyof typeof PROFILE_IMAGE_BY_ID];
}

function SmallPortrait({ personId, name }: { personId: string; name: string }) {
  const image = getProfileImage(personId);

  if (image) {
    return <img src={image.src} alt={image.alt || name} style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 4, flexShrink: 0 }} />;
  }

  return (
    <span
      className="inline-flex items-center justify-center text-xs"
      style={{ width: 44, height: 44, border: `1px solid ${BLUE}30`, color: BLUE, fontFamily: "var(--font-mono)", borderRadius: 4, flexShrink: 0 }}
    >
      {name.slice(0, 2)}
    </span>
  );
}

function HeroSection() {
  const { lang } = useLanguage();
  const t = TEXT[lang];
  const capGroups = CAPABILITY_GROUPS[lang];

  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 pt-28 pb-0">
        <div className="inline-block text-xs mb-14 px-3 py-1.5 tracking-widest uppercase" style={{ color: BLUE, border: `1px solid rgba(55,55,242,0.25)`, fontFamily: "var(--font-mono)" }}>
          {t.heroLabel}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-16">
          <div className="lg:col-span-6">
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.6rem, 5vw, 4.5rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: NEAR_BLACK, whiteSpace: "pre-line" }}>
              {t.heroHeadline}
            </h1>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-end gap-6">
            <p style={{ fontSize: "1.04rem", lineHeight: 1.78, color: BODY_TEXT, maxWidth: 480 }}>
              {t.heroDesc}
            </p>
            <div className="flex flex-wrap gap-8">
              {t.heroStats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: NEAR_BLACK }}>{stat.value}</div>
                  <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-px" style={{ background: BORDER }}>
          {capGroups.map((group, index) => (
            <div key={group.id} className="flex-1 min-w-0 p-4" style={{ background: index === 0 ? NEAR_BLACK : "#FFFFFF" }}>
              <div className="text-xs mb-1" style={{ color: index === 0 ? "rgba(255,255,255,0.4)" : MUTED, fontFamily: "var(--font-mono)" }}>0{index + 1}</div>
              <div className="text-xs truncate" style={{ color: index === 0 ? "#FFFFFF" : NEAR_BLACK, fontFamily: "var(--font-body)", fontWeight: 600 }}>{group.title}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LeadershipSection() {
  const { lang } = useLanguage();
  const t = TEXT[lang];
  const [activeIdx, setActiveIdx] = useState(0);
  const leader = LEADERS[activeIdx];
  const leaderImage = getProfileImage(leader.id);
  const name = lang === "ko" ? leader.nameKo : leader.nameEn;
  const title = lang === "ko" ? leader.titleKo : leader.titleEn;
  const summary = lang === "ko" ? leader.summaryKo : leader.summaryEn;
  const publicNote = lang === "ko" ? "공개 가능한 주요 경력을 정리하고 있습니다." : "Public career details are being prepared.";

  return (
    <section style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.leadershipLabel}</div>
        <h2 className="mb-12" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.leadershipHeadline}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={leader.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12"
                style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}
              >
                <div className="md:col-span-4 bg-gray-50" style={{ minHeight: 260 }}>
                  <div style={{ width: "100%", height: "100%", minHeight: 260, background: SOFT_BG, position: "relative", overflow: "hidden" }}>
                    {leaderImage ? (
                      <img src={leaderImage.src} alt={leaderImage.alt || name} style={{ width: "100%", height: "100%", minHeight: 260, objectFit: "cover", display: "block" }} />
                    ) : (
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 10, color: MUTED, fontFamily: "var(--font-mono)", background: "#FFFFFF", padding: "2px 8px" }}>{t.photoPlaceholder}</span>
                      </div>
                    )}
                  </div>
                </div>
                <div className="md:col-span-8 p-8 flex flex-col gap-6">
                  <div>
                    <div className="text-xs mb-1" style={{ color: BLUE, fontFamily: "var(--font-mono)" }}>{title}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", color: NEAR_BLACK }}>{name}</div>
                  </div>
                  <div>
                    <div className="text-xs mb-1.5" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.responsibilityLabel}</div>
                    <p style={{ color: BODY_TEXT, fontSize: "0.98rem", lineHeight: 1.72 }}>{summary}</p>
                  </div>
                  <div>
                    <div className="text-xs mb-1.5" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.introLabel}</div>
                    <p style={{ color: BODY_TEXT, fontSize: "0.98rem", lineHeight: 1.72 }}>{summary}</p>
                  </div>
                  <div>
                    <div className="text-xs mb-1.5" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.careerLabel}</div>
                    <div className="flex items-start gap-2" style={{ color: BODY_TEXT, fontSize: "0.95rem", lineHeight: 1.68 }}>
                      <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: BORDER }} />
                      {publicNote}
                    </div>
                  </div>
                  <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16 }}>
                    <div className="text-xs mb-1.5" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.roleLabel}</div>
                    <p className="text-sm" style={{ color: BODY_TEXT, fontSize: "0.96rem", lineHeight: 1.7 }}>{summary}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-2">
            {LEADERS.map((item, index) => {
              const itemName = lang === "ko" ? item.nameKo : item.nameEn;
              const itemTitle = lang === "ko" ? item.titleKo : item.titleEn;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIdx(index)}
                  className="flex items-center gap-4 p-4 text-left w-full cursor-pointer transition-all"
                  style={{ background: activeIdx === index ? "#FFFFFF" : "transparent", border: `1px solid ${activeIdx === index ? BLUE : "transparent"}`, borderLeft: `3px solid ${activeIdx === index ? BLUE : "transparent"}` }}
                >
                  <SmallPortrait personId={item.id} name={itemName} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm truncate" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: activeIdx === index ? NEAR_BLACK : MUTED }}>{itemName}</div>
                    <div className="text-xs mt-0.5 truncate" style={{ color: activeIdx === index ? BLUE : MUTED, fontFamily: "var(--font-mono)" }}>{itemTitle}</div>
                  </div>
                  <ChevronRight size={14} style={{ color: activeIdx === index ? BLUE : "transparent", flexShrink: 0 }} />
                </button>
              );
            })}
            <div className="p-4" style={{ border: `1px dashed ${BORDER}` }}>
              <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)", fontStyle: "italic", lineHeight: 1.7 }}>{t.moreLeadershipNote}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityGroupsSection() {
  const { lang } = useLanguage();
  const t = TEXT[lang];
  const capGroups = CAPABILITY_GROUPS[lang];

  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.capabilitiesLabel}</div>
        <h2 className="mb-12" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em", maxWidth: 520, whiteSpace: "pre-line" }}>
          {t.capabilitiesHeadline}
        </h2>
        <div className="flex flex-col gap-px" style={{ background: BORDER }}>
          {capGroups.map((group, index) => (
            <div key={group.id} className="grid grid-cols-12 gap-6 p-7" style={{ background: "#FFFFFF" }}>
              <div className="col-span-12 md:col-span-1">
                <div className="text-xs" style={{ color: BLUE, fontFamily: "var(--font-mono)", fontWeight: 600 }}>0{index + 1}</div>
              </div>
              <div className="col-span-12 md:col-span-3">
                <div className="text-sm mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: NEAR_BLACK }}>{group.title}</div>
                <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{group.titleEn}</div>
              </div>
              <div className="col-span-12 md:col-span-3">
                <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.responsibilityCol}</div>
                <p style={{ color: BODY_TEXT, fontSize: "0.96rem", lineHeight: 1.7 }}>{group.responsibility}</p>
              </div>
              <div className="col-span-12 md:col-span-3">
                <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.capabilitiesCol}</div>
                <div className="flex flex-wrap gap-2">
                  {group.capabilities.map((capability) => (
                    <span key={capability} className="text-xs px-2 py-1" style={{ border: `1px solid ${BORDER}`, color: MUTED }}>
                      {capability}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-12 md:col-span-2">
                <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.contributionCol}</div>
                <p style={{ color: BODY_TEXT, fontSize: "0.94rem", lineHeight: 1.68 }}>{group.contribution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamDirectorySection() {
  const { lang } = useLanguage();
  const t = TEXT[lang];
  const hasPublicTeamMembers = teamMembers.length > 0;

  return (
    <section style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.directoryLabel}</div>
        <h2 className="mb-10" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.directoryHeadline}
        </h2>
        {hasPublicTeamMembers ? null : (
          <div className="p-8" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}>
            <p style={{ color: BODY_TEXT, fontSize: "0.98rem", lineHeight: 1.72 }}>{t.directoryEmpty}</p>
          </div>
        )}
      </div>
    </section>
  );
}

function HowWeWorkSection() {
  const { lang } = useLanguage();
  const t = TEXT[lang];
  const workflowSteps = WORKFLOW_STEPS[lang];
  const capGroups = CAPABILITY_GROUPS[lang];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.howWorkLabel}</div>
        <h2 className="mb-12" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em", whiteSpace: "pre-line" }}>
          {t.howWorkHeadline}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 flex flex-col gap-px" style={{ background: BORDER }}>
            {workflowSteps.map((step, index) => (
              <button
                key={step.step}
                onClick={() => setActiveStep(index)}
                className="flex items-start gap-4 p-5 text-left w-full cursor-pointer"
                style={{ background: activeStep === index ? NEAR_BLACK : "#FFFFFF", transition: "background 0.15s" }}
              >
                <span className="text-xs flex-shrink-0 mt-0.5" style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: activeStep === index ? "rgba(255,255,255,0.5)" : BLUE }}>{step.step}</span>
                <span className="text-sm" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: activeStep === index ? "#FFFFFF" : NEAR_BLACK }}>{step.title}</span>
              </button>
            ))}
          </div>

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="p-8 flex flex-col gap-8"
                style={{ border: `1px solid ${BORDER}`, background: "#FFFFFF", minHeight: 280 }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span style={{ fontFamily: "var(--font-mono)", color: BLUE, fontSize: "0.75rem", fontWeight: 600 }}>{workflowSteps[activeStep].step}</span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", color: NEAR_BLACK }}>{workflowSteps[activeStep].title}</h3>
                  </div>
                  <p style={{ fontSize: "0.96rem", color: BODY_TEXT, lineHeight: 1.75 }}>{workflowSteps[activeStep].desc}</p>
                </div>

                <div>
                  <div className="text-xs mb-4" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.involvedLabel}</div>
                  <div className="flex flex-wrap gap-2">
                    {capGroups.map((group) => {
                      const isInvolved = workflowSteps[activeStep].involved.includes(group.areaKey);

                      return (
                        <div
                          key={group.id}
                          className="flex items-center gap-2 px-3 py-2"
                          style={{ background: isInvolved ? NEAR_BLACK : SOFT_BG, border: `1px solid ${isInvolved ? NEAR_BLACK : BORDER}`, transition: "all 0.15s" }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: isInvolved ? "#FFFFFF" : BORDER }} />
                          <span className="text-xs" style={{ color: isInvolved ? "#FFFFFF" : MUTED, fontFamily: "var(--font-body)" }}>{group.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="flex gap-1 mt-auto">
                  {workflowSteps.map((_, index) => (
                    <div key={index} className="h-0.5 flex-1 rounded-full" style={{ background: index <= activeStep ? BLUE : BORDER, transition: "background 0.15s" }} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const { lang } = useLanguage();
  const t = TEXT[lang];

  return (
    <section className="py-28" style={{ background: NEAR_BLACK }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.08, color: "#FFFFFF", letterSpacing: "-0.025em", whiteSpace: "pre-line" }}>
              {t.ctaHeadline}
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end lg:pb-1">
            <Link
              to="/company/careers"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm transition-all"
              style={{ background: BLUE, color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              {t.ctaBtn1} <ArrowUpRight size={14} />
            </Link>
            <Link
              to="/company/about"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              {t.ctaBtn2}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function AdvisorsSection() {
  if (advisors.length === 0) return null;
  return null;
}

export function TeamPage() {
  return (
    <div className="pt-16" style={{ background: "#FFFFFF" }}>
      <HeroSection />
      <LeadershipSection />
      <CapabilityGroupsSection />
      <TeamDirectorySection />
      <HowWeWorkSection />
      <AdvisorsSection />
      <CtaSection />
    </div>
  );
}
