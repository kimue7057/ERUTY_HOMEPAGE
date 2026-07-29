import { useState, useMemo } from "react";
import { Link } from "react-router";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BODY_TEXT = "#333438";
const MUTED = "#737780";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F5F6F8";

// ── 데이터 타입 ───────────────────────────────────────────────────────────────

type Status = "Active" | "Partner Network" | "Market Development" | "Planned";
type Region = "Asia" | "Europe" | "Middle East" | "North America";

interface Market {
  id: string;
  flag: string;
  status: Status;
  region: Region;
  fx: number;
  fy: number;
  lastUpdate: { ko: string; en: string };
  isHub?: boolean;
  name: { ko: string; en: string };
  focus: { ko: string[]; en: string[] };
  partnerTypes: { ko: string[]; en: string[] };
  activities: { ko: string[]; en: string[] };
  projects: { ko: string[]; en: string[] };
}

interface Activity {
  date: string;
  flag: string;
  type: { ko: string; en: string };
  title: { ko: string; en: string };
  desc: { ko: string; en: string };
  country: { ko: string; en: string };
}

interface PartnerCategory {
  label: { ko: string; en: string };
  placeholders: string[];
}

interface PartnershipType {
  title: { ko: string; en: string };
  desc: { ko: string; en: string };
  who: { ko: string; en: string };
}

// ── 번역 ──────────────────────────────────────────────────────────────────────

const T = {
  ko: {
    heroLabel: "Global Network",
    heroHeadline: "시장을 연결하고,\n새로운 사업 기회를\n확장합니다.",
    heroDesc: "이루티는 국가별 시장과 파트너의 특성을 바탕으로\n콘텐츠·기술·브랜드 사업의 글로벌 실행 기반을 구축합니다.",
    heroStats: [
      { label: "거점 시장" },
      { label: "활성 운영 시장" },
      { label: "글로벌 권역" },
    ],
    mapLabel: "Interactive Network",
    mapHeadline: "글로벌 운영 현황",
    marketPanelSections: ["주요 사업 분야", "파트너 유형", "주요 활동", "관련 프로젝트"],
    lastUpdatePrefix: "최근 업데이트 ",
    relatedCasesLink: "관련 사례 보기",
    regionalLabel: "Regional Activity",
    regionalHeadline: "권역별 사업 현황",
    businessAreaLabel: "사업 분야",
    recentActivityLabel: "최근 활동",
    detailLink: "자세히",
    partnerLabel: "Partner Ecosystem",
    partnerHeadline: "함께 사업을 만드는 파트너",
    partnerInquiry: "파트너 문의",
    partnerNote: "파트너사 로고 및 정보는 개별 협의 후 게시됩니다. 파트너십 문의는 ",
    partnerNoteEnd: "으로 연락 주세요.",
    activitiesLabel: "Global Activities",
    activitiesHeadline: "글로벌 활동 현황",
    activitiesEmpty: "해당 조건의 활동이 없습니다.",
    viewLink: "보기",
    partnershipLabel: "Partnership Types",
    partnershipHeadline: "이루티와 함께하는 방법",
    suitablePartner: "적합한 파트너",
    partnershipCta: "파트너십 제안하기",
    ctaHeadline: "새로운 시장에서\n함께 사업을 시작하세요.",
    ctaBtn1: "글로벌 파트너십 제안",
    ctaBtn2: "프로젝트 제안하기",
    statusLabels: {
      "Active": "활성",
      "Partner Network": "파트너 네트워크",
      "Market Development": "시장 개발",
      "Planned": "계획중",
    } as Record<Status, string>,
    regionLabels: {
      Asia: "아시아",
      Europe: "유럽",
      "Middle East": "중동",
      "North America": "북미",
    } as Record<Region, string>,
    activityTypeAll: "전체",
    activityTypes: ["전체", "해외 전시회", "현지 미팅", "MOU 및 협약", "시장 조사", "공동 프로젝트", "파트너 방문"],
    countryAll: "전체",
  },
  en: {
    heroLabel: "Global Network",
    heroHeadline: "Connecting Markets,\nExpanding New\nBusiness Opportunities.",
    heroDesc: "ERUTY builds the global execution foundation for content,\ntechnology, and brand businesses based on each country's market and partner characteristics.",
    heroStats: [
      { label: "Key Markets" },
      { label: "Active Markets" },
      { label: "Global Regions" },
    ],
    mapLabel: "Interactive Network",
    mapHeadline: "Global Operations",
    marketPanelSections: ["Key Business Areas", "Partner Types", "Key Activities", "Related Projects"],
    lastUpdatePrefix: "Last Updated: ",
    relatedCasesLink: "View Related Cases",
    regionalLabel: "Regional Activity",
    regionalHeadline: "Regional Business Status",
    businessAreaLabel: "Business Area",
    recentActivityLabel: "Recent Activity",
    detailLink: "Details",
    partnerLabel: "Partner Ecosystem",
    partnerHeadline: "Partners Building Business Together",
    partnerInquiry: "Partner Inquiry",
    partnerNote: "Partner logos and information will be posted after individual agreements. For partnership inquiries, contact ",
    partnerNoteEnd: ".",
    activitiesLabel: "Global Activities",
    activitiesHeadline: "Global Activity Updates",
    activitiesEmpty: "No activities match the selected criteria.",
    viewLink: "View",
    partnershipLabel: "Partnership Types",
    partnershipHeadline: "How to Partner with ERUTY",
    suitablePartner: "Suitable Partners",
    partnershipCta: "Propose Partnership",
    ctaHeadline: "Start a Business Together\nin a New Market.",
    ctaBtn1: "Propose Global Partnership",
    ctaBtn2: "Propose a Project",
    statusLabels: {
      "Active": "Active",
      "Partner Network": "Partner Network",
      "Market Development": "Market Development",
      "Planned": "Planned",
    } as Record<Status, string>,
    regionLabels: {
      Asia: "Asia",
      Europe: "Europe",
      "Middle East": "Middle East",
      "North America": "North America",
    } as Record<Region, string>,
    activityTypeAll: "All",
    activityTypes: ["All", "International Trade Shows", "Local Meetings", "MOU & Agreements", "Market Research", "Joint Projects", "Partner Visits"],
    countryAll: "All",
  },
};

// ── 데이터 ────────────────────────────────────────────────────────────────────

const statusColor: Record<Status, string> = {
  "Active": "#22C55E",
  "Partner Network": BLUE,
  "Market Development": "#F59E0B",
  "Planned": MUTED,
};

const regions: Region[] = ["Asia", "Europe", "Middle East", "North America"];

const markets: Market[] = [
  {
    id: "korea", flag: "🇰🇷", status: "Active", region: "Asia", fx: 0.851, fy: 0.295, isHub: true,
    name: { ko: "한국", en: "Korea" },
    focus: { ko: ["글로벌 콘텐츠 사업 HQ", "AX 교육 & 솔루션"], en: ["Global Content Business HQ", "AX Training & Solutions"] },
    partnerTypes: { ko: ["콘텐츠 스튜디오 & 제작사", "기업 & 공공기관", "기술 파트너"], en: ["Content Studios & Productions", "Enterprises & Public Institutions", "Technology Partners"] },
    activities: { ko: ["콘텐츠 IP 개발 및 투자", "AX 교육 프로그램 운영", "글로벌 파트너 유치"], en: ["Content IP Development & Investment", "AX Training Program Operations", "Global Partner Acquisition"] },
    projects: { ko: ["AX 교육 프로그램 (공공기관 2,000+)", "IP 블록체인 인프라 배포"], en: ["AX Training Program (2,000+ Public Sector)", "IP Blockchain Infrastructure Deployment"] },
    lastUpdate: { ko: "2024년 12월", en: "Dec 2024" },
  },
  {
    id: "vietnam", flag: "🇻🇳", status: "Active", region: "Asia", fx: 0.790, fy: 0.490,
    name: { ko: "베트남", en: "Vietnam" },
    focus: { ko: ["콘텐츠 배급", "기술 파트너십"], en: ["Content Distribution", "Technology Partnership"] },
    partnerTypes: { ko: ["OTT 플랫폼", "미디어 그룹", "현지 배급사"], en: ["OTT Platforms", "Media Groups", "Local Distributors"] },
    activities: { ko: ["한국 콘텐츠 배급 파트너십", "현지 플랫폼 콘텐츠 공급"], en: ["Korean Content Distribution Partnership", "Content Supply to Local Platforms"] },
    projects: { ko: ["베트남 OTT 플랫폼 배급 계약"], en: ["Vietnam OTT Platform Distribution Agreement"] },
    lastUpdate: { ko: "2024년 12월", en: "Dec 2024" },
  },
  {
    id: "singapore", flag: "🇸🇬", status: "Active", region: "Asia", fx: 0.780, fy: 0.570,
    name: { ko: "싱가포르", en: "Singapore" },
    focus: { ko: ["기술 & 투자 네트워크", "동남아 허브"], en: ["Technology & Investment Network", "SEA Hub"] },
    partnerTypes: { ko: ["투자사", "기술 기업", "스타트업"], en: ["Investors", "Tech Companies", "Startups"] },
    activities: { ko: ["동남아 시장 진출 거점 운영", "투자 네트워크 활성화"], en: ["SEA Market Entry Hub Operations", "Investment Network Activation"] },
    projects: { ko: ["이커머스 AI 자동화 프로젝트 (검토중)"], en: ["E-commerce AI Automation Project (Under Review)"] },
    lastUpdate: { ko: "2024년 11월", en: "Nov 2024" },
  },
  {
    id: "japan", flag: "🇯🇵", status: "Market Development", region: "Asia", fx: 0.887, fy: 0.290,
    name: { ko: "일본", en: "Japan" },
    focus: { ko: ["IP 라이선싱", "시장 확장"], en: ["IP Licensing", "Market Expansion"] },
    partnerTypes: { ko: ["콘텐츠 에이전시", "IP 보유사"], en: ["Content Agencies", "IP Holders"] },
    activities: { ko: ["IP 라이선싱 기회 발굴", "현지 파트너 미팅"], en: ["IP Licensing Opportunity Discovery", "Local Partner Meetings"] },
    projects: { ko: ["애니메이션 IP 라이선싱 파트너 (진행중)"], en: ["Animation IP Licensing Partner (In Progress)"] },
    lastUpdate: { ko: "2024년 10월", en: "Oct 2024" },
  },
  {
    id: "taiwan", flag: "🇹🇼", status: "Partner Network", region: "Asia", fx: 0.836, fy: 0.390,
    name: { ko: "대만", en: "Taiwan" },
    focus: { ko: ["콘텐츠 & 크리에이터 비즈니스"], en: ["Content & Creator Business"] },
    partnerTypes: { ko: ["크리에이터 에이전시", "미디어 기업"], en: ["Creator Agencies", "Media Companies"] },
    activities: { ko: ["크리에이터 협업 네트워크 구축"], en: ["Creator Collaboration Network Building"] },
    projects: { ko: ["K-콘텐츠 크리에이터 협업 (검토중)"], en: ["K-Content Creator Collaboration (Under Review)"] },
    lastUpdate: { ko: "2024년 9월", en: "Sep 2024" },
  },
  {
    id: "germany", flag: "🇩🇪", status: "Partner Network", region: "Europe", fx: 0.521, fy: 0.185,
    name: { ko: "독일", en: "Germany" },
    focus: { ko: ["배급 & 커머스", "IP 라이선싱"], en: ["Distribution & Commerce", "IP Licensing"] },
    partnerTypes: { ko: ["배급사", "유럽 미디어 그룹"], en: ["Distributors", "European Media Groups"] },
    activities: { ko: ["유럽 IP 라이선싱 네트워크 구축"], en: ["European IP Licensing Network Building"] },
    projects: { ko: ["유럽 IP 라이선싱 기회 (진행중)"], en: ["European IP Licensing Opportunity (In Progress)"] },
    lastUpdate: { ko: "2024년 11월", en: "Nov 2024" },
  },
  {
    id: "uae", flag: "🇦🇪", status: "Market Development", region: "Middle East", fx: 0.645, fy: 0.395,
    name: { ko: "UAE", en: "UAE" },
    focus: { ko: ["글로벌 비즈니스 협업"], en: ["Global Business Collaboration"] },
    partnerTypes: { ko: ["미디어 그룹", "투자사"], en: ["Media Groups", "Investors"] },
    activities: { ko: ["중동 시장 진출 준비", "파트너십 탐색"], en: ["Middle East Market Entry Preparation", "Partnership Exploration"] },
    projects: { ko: ["글로벌 파트너십 (탐색중)"], en: ["Global Partnership (Exploring)"] },
    lastUpdate: { ko: "2024년 8월", en: "Aug 2024" },
  },
  {
    id: "us", flag: "🇺🇸", status: "Planned", region: "North America", fx: 0.248, fy: 0.265,
    name: { ko: "미국", en: "USA" },
    focus: { ko: ["커머스 & 수익화"], en: ["Commerce & Monetization"] },
    partnerTypes: { ko: ["커머스 플랫폼", "투자사"], en: ["Commerce Platforms", "Investors"] },
    activities: { ko: ["북미 시장 조사 진행중"], en: ["North America Market Research Ongoing"] },
    projects: { ko: ["시장 진출 검토중"], en: ["Market Entry Under Review"] },
    lastUpdate: { ko: "2024년 7월", en: "Jul 2024" },
  },
];

const activitiesData: Activity[] = [
  {
    date: "2024.12", flag: "🇻🇳",
    country: { ko: "베트남", en: "Vietnam" },
    type: { ko: "MOU 및 협약", en: "MOU & Agreements" },
    title: { ko: "베트남 주요 OTT 플랫폼 배급 계약 체결", en: "Vietnam Major OTT Platform Distribution Agreement Signed" },
    desc: { ko: "한국 콘텐츠의 베트남 배급을 위한 정식 파트너십 계약을 완료했습니다.", en: "We completed a formal partnership agreement for distributing Korean content in Vietnam." },
  },
  {
    date: "2024.11", flag: "🇰🇷",
    country: { ko: "한국", en: "Korea" },
    type: { ko: "공동 프로젝트", en: "Joint Projects" },
    title: { ko: "AI R&D 정부 과제 수행 개시", en: "AI R&D Government Project Launched" },
    desc: { ko: "과학기술정보통신부 주관 AI 연구 개발 과제가 공식 개시되었습니다.", en: "The AI R&D project supervised by the Ministry of Science and ICT has officially commenced." },
  },
  {
    date: "2024.10", flag: "🇩🇪",
    country: { ko: "독일", en: "Germany" },
    type: { ko: "현지 미팅", en: "Local Meetings" },
    title: { ko: "유럽 IP 라이선싱 파트너 미팅", en: "European IP Licensing Partner Meeting" },
    desc: { ko: "독일 및 프랑스 배급사와 한국 IP 라이선싱 협력 가능성을 논의했습니다.", en: "We discussed Korean IP licensing collaboration possibilities with German and French distributors." },
  },
  {
    date: "2024.09", flag: "🇸🇬",
    country: { ko: "싱가포르", en: "Singapore" },
    type: { ko: "해외 전시회", en: "International Trade Shows" },
    title: { ko: "ContentMarket Asia 2024 참가", en: "ContentMarket Asia 2024 Participation" },
    desc: { ko: "싱가포르에서 열린 아시아 콘텐츠 마켓에 참가해 현지 파트너와 네트워킹을 진행했습니다.", en: "We participated in the Asia Content Market held in Singapore and networked with local partners." },
  },
  {
    date: "2024.09", flag: "🇰🇷",
    country: { ko: "한국", en: "Korea" },
    type: { ko: "공동 프로젝트", en: "Joint Projects" },
    title: { ko: "IP 블록체인 인프라 배포 완료", en: "IP Blockchain Infrastructure Deployment Complete" },
    desc: { ko: "콘텐츠 파트너를 위한 스마트 계약 기반 IP 권리 관리 인프라가 배포되었습니다.", en: "Smart contract-based IP rights management infrastructure for content partners has been deployed." },
  },
  {
    date: "2024.08", flag: "🇦🇪",
    country: { ko: "UAE", en: "UAE" },
    type: { ko: "시장 조사", en: "Market Research" },
    title: { ko: "중동 콘텐츠 시장 조사 진행", en: "Middle East Content Market Research Conducted" },
    desc: { ko: "UAE를 중심으로 중동 콘텐츠 시장 현황과 파트너십 가능성을 조사했습니다.", en: "We researched the Middle East content market landscape and partnership possibilities centered on UAE." },
  },
  {
    date: "2024.07", flag: "🇯🇵",
    country: { ko: "일본", en: "Japan" },
    type: { ko: "파트너 방문", en: "Partner Visits" },
    title: { ko: "일본 IP 에이전시 방문 미팅", en: "Japan IP Agency Visit Meeting" },
    desc: { ko: "애니메이션 및 엔터테인먼트 IP 라이선싱 협력을 위한 일본 현지 미팅을 진행했습니다.", en: "We conducted in-person meetings in Japan for animation and entertainment IP licensing collaboration." },
  },
  {
    date: "2024.06", flag: "🇹🇼",
    country: { ko: "대만", en: "Taiwan" },
    type: { ko: "현지 미팅", en: "Local Meetings" },
    title: { ko: "대만 크리에이터 네트워크 미팅", en: "Taiwan Creator Network Meeting" },
    desc: { ko: "K-콘텐츠 크리에이터와 대만 플랫폼 협업 방안을 논의했습니다.", en: "We discussed K-content creator collaboration with Taiwanese platforms." },
  },
];

const partnerCategories: PartnerCategory[] = [
  { label: { ko: "콘텐츠·제작", en: "Content · Production" }, placeholders: ["Studio A", "Studio B", "Production C"] },
  { label: { ko: "투자·유통", en: "Investment · Distribution" }, placeholders: ["Investor A", "Distributor B", "Distributor C"] },
  { label: { ko: "브랜드·커머스", en: "Brand · Commerce" }, placeholders: ["Brand A", "Platform B", "Agency C"] },
  { label: { ko: "기술·교육", en: "Technology · Education" }, placeholders: ["Tech A", "Lab B", "Edu C"] },
  { label: { ko: "기관·대학", en: "Institutions · Universities" }, placeholders: ["Agency A", "University B", "Assoc C"] },
];

const partnershipTypes: PartnershipType[] = [
  {
    title: { ko: "콘텐츠 투자·공동제작", en: "Content Investment · Co-production" },
    desc: { ko: "프로젝트 초기 단계부터 참여해 투자 구조를 설계하고 공동 제작 파트너를 연결합니다. 제작 완료 후 수익 분배까지 실행합니다.", en: "We participate from early project stages to design investment structures and connect co-production partners, executing through to revenue sharing after production." },
    who: { ko: "스튜디오, IP 보유사, 제작사, 투자자", en: "Studios, IP Holders, Production Companies, Investors" },
  },
  {
    title: { ko: "글로벌 배급", en: "Global Distribution" },
    desc: { ko: "완성된 콘텐츠를 타겟 시장의 OTT, 방송, 플랫폼과 연결합니다. 현지화 요건 검토부터 계약 협상, 공급까지 담당합니다.", en: "We connect finished content with OTT, broadcast, and platforms in target markets, handling everything from localization review to contract negotiation and supply." },
    who: { ko: "콘텐츠 제작사, 스튜디오, OTT 플랫폼", en: "Content Producers, Studios, OTT Platforms" },
  },
  {
    title: { ko: "IP 라이선싱", en: "IP Licensing" },
    desc: { ko: "콘텐츠 IP를 국가별·카테고리별로 분류하고 적합한 라이선시를 발굴합니다. 블록체인 기반 계약 및 권리 관리를 포함합니다.", en: "We classify content IP by country and category, identify suitable licensees, and manage blockchain-based contracts and rights management." },
    who: { ko: "IP 보유사, 제작사, 브랜드 라이선시", en: "IP Holders, Production Companies, Brand Licensees" },
  },
  {
    title: { ko: "브랜드·크리에이터 협업", en: "Brand · Creator Collaboration" },
    desc: { ko: "크리에이터와 글로벌 브랜드를 매칭하고 콘텐츠 기반 마케팅 캠페인을 설계·실행합니다.", en: "We match creators with global brands and design and execute content-driven marketing campaigns." },
    who: { ko: "글로벌 브랜드, 크리에이터 에이전시, 미디어 그룹", en: "Global Brands, Creator Agencies, Media Groups" },
  },
  {
    title: { ko: "기술·AX 프로젝트", en: "Technology · AX Projects" },
    desc: { ko: "AI 소프트웨어 개발, 업무 자동화, AX 교육 프로그램을 기업 또는 기관과 협력해 설계하고 실행합니다.", en: "We collaborate with companies or institutions to design and execute AI software development, workflow automation, and AX training programs." },
    who: { ko: "기업, 공공기관, 대학교, 기술 파트너", en: "Enterprises, Public Institutions, Universities, Technology Partners" },
  },
  {
    title: { ko: "현지 사업 파트너십", en: "Local Business Partnership" },
    desc: { ko: "특정 국가의 시장 진출을 위해 현지 파트너사와 사업 운영 구조를 설계합니다. 시장 조사부터 사업 실행까지 함께합니다.", en: "We design business operation structures with local partners for entry into specific country markets, from market research through to business execution." },
    who: { ko: "현지 기업, 배급사, 정부 기관, 투자사", en: "Local Enterprises, Distributors, Government Agencies, Investors" },
  },
];

// ── 섹션 1: 히어로 ────────────────────────────────────────────────────────────

function HeroSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const activeCount = markets.filter((m) => m.status === "Active").length;
  const statsValues = [`${markets.length}`, `${activeCount}`, "4"];
  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 pt-28 pb-20">
        <div className="inline-block text-xs mb-14 px-3 py-1.5 tracking-widest uppercase" style={{ color: BLUE, border: `1px solid rgba(55,55,242,0.25)`, fontFamily: "var(--font-mono)" }}>
          {t.heroLabel}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-16">
          <div className="lg:col-span-6">
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.6rem, 5vw, 4.5rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: NEAR_BLACK }}>
              {t.heroHeadline.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h1>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-end gap-8">
            <p style={{ fontSize: "1rem", lineHeight: 1.85, color: BODY_TEXT, maxWidth: 440 }}>
              {t.heroDesc.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </p>
            <div className="flex flex-wrap gap-6">
              {t.heroStats.map((s, i) => (
                <div key={s.label}>
                  <div className="text-2xl mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: NEAR_BLACK }}>{statsValues[i]}</div>
                  <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 히어로 네트워크 스트립 */}
        <div className="flex gap-px overflow-hidden" style={{ background: BORDER }}>
          {markets.map((m) => (
            <div key={m.id} className="flex-1 min-w-0 p-4" style={{ background: "#FFFFFF" }}>
              <div className="flex items-center gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: statusColor[m.status] }} />
                <span className="text-xs truncate" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{m.flag}</span>
              </div>
              <div className="text-xs" style={{ color: NEAR_BLACK, fontWeight: 600, fontFamily: "var(--font-body)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.name[lang]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 섹션 2: 인터랙티브 네트워크 맵 ──────────────────────────────────────────

const MAP_W = 1000;
const MAP_H = 500;

const continentPaths = [
  "M68,42 L298,42 L328,95 L298,190 L262,315 L208,372 L148,368 L73,308 L44,192 L52,112 Z",
  "M175,355 L278,355 L305,418 L275,490 L212,495 L158,465 L142,412 Z",
  "M438,35 L575,35 L595,82 L568,132 L535,148 L498,148 L460,128 L432,92 Z",
  "M448,142 L608,142 L632,248 L618,378 L558,488 L492,492 L432,448 L412,352 L428,242 Z",
  "M562,138 L725,138 L742,232 L702,285 L638,285 L598,238 Z",
  "M588,35 L895,35 L922,112 L902,192 L858,278 L795,308 L732,288 L682,252 L644,215 L622,152 L598,88 Z",
  "M762,242 L858,242 L878,312 L840,355 L778,345 L748,302 Z",
  "M862,88 L895,78 L918,98 L928,138 L908,162 L882,162 L858,138 Z",
  "M818,368 L968,368 L978,448 L942,488 L872,492 L818,458 Z",
];

function WorldMap({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const { lang } = useLanguage();
  const hub = markets.find((m) => m.isHub)!;
  const selectedMarket = markets.find((m) => m.id === selected);
  const hx = hub.fx * MAP_W;
  const hy = hub.fy * MAP_H;

  return (
    <div className="relative w-full" style={{ aspectRatio: `${MAP_W}/${MAP_H}`, background: SOFT_BG }}>
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {continentPaths.map((d, i) => (
          <path key={i} d={d} fill="#E8EAF0" stroke="none" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`v${i}`} x1={(i + 1) * 90} y1={0} x2={(i + 1) * 90} y2={MAP_H} stroke={BORDER} strokeWidth="0.5" strokeDasharray="4 4" />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <line key={`h${i}`} x1={0} y1={(i + 1) * 83} x2={MAP_W} y2={(i + 1) * 83} stroke={BORDER} strokeWidth="0.5" strokeDasharray="4 4" />
        ))}
        {[
          { label: "ASIA", x: 780, y: 55 },
          { label: "EUROPE", x: 500, y: 55 },
          { label: "MIDDLE EAST", x: 630, y: 175 },
          { label: "N. AMERICA", x: 170, y: 55 },
          { label: "S. AMERICA", x: 205, y: 420 },
          { label: "AFRICA", x: 500, y: 350 },
          { label: "OCEANIA", x: 880, y: 440 },
        ].map((l) => (
          <text key={l.label} x={l.x} y={l.y} textAnchor="middle"
            style={{ fill: "#C8CDD8", fontSize: 18, fontFamily: "var(--font-mono)", fontWeight: 500, letterSpacing: "0.15em" }}>
            {l.label}
          </text>
        ))}
        {selectedMarket && selectedMarket.id !== hub.id && (
          <motion.line key={selected} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }}
            x1={hx} y1={hy} x2={selectedMarket.fx * MAP_W} y2={selectedMarket.fy * MAP_H}
            stroke={BLUE} strokeWidth="1.5" strokeDasharray="6 4" />
        )}
        {markets.filter((m) => !m.isHub && m.status === "Active").map((m) => (
          <line key={`fade-${m.id}`} x1={hx} y1={hy} x2={m.fx * MAP_W} y2={m.fy * MAP_H} stroke={BORDER} strokeWidth="0.8" />
        ))}
        {markets.map((m) => {
          const mx = m.fx * MAP_W;
          const my = m.fy * MAP_H;
          const isSelected = m.id === selected;
          const isHub = !!m.isHub;
          return (
            <g key={m.id} style={{ cursor: "pointer" }} onClick={() => onSelect(m.id)}>
              {isSelected && <circle cx={mx} cy={my} r={isHub ? 16 : 14} fill={BLUE} fillOpacity="0.12" />}
              <circle cx={mx} cy={my} r={isHub ? 7 : 5} fill={isSelected ? BLUE : "#FFFFFF"} stroke={isSelected ? BLUE : statusColor[m.status]} strokeWidth={isHub ? 2.5 : 2} />
              {isHub && <circle cx={mx} cy={my} r={3} fill={isSelected ? "#FFFFFF" : BLUE} />}
              <text x={mx} y={my - (isHub ? 13 : 11)} textAnchor="middle"
                style={{ fill: isSelected ? BLUE : NEAR_BLACK, fontSize: 11, fontFamily: "var(--font-body)", fontWeight: isSelected ? 700 : 500 }}>
                {m.flag} {m.name[lang]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function MarketPanel({ market }: { market: Market }) {
  const { lang } = useLanguage();
  const t = T[lang];
  const sections = [
    { label: t.marketPanelSections[0], items: market.focus[lang] },
    { label: t.marketPanelSections[1], items: market.partnerTypes[lang] },
    { label: t.marketPanelSections[2], items: market.activities[lang] },
    { label: t.marketPanelSections[3], items: market.projects[lang] },
  ];
  return (
    <motion.div key={market.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}
      className="h-full flex flex-col" style={{ padding: "28px 28px", borderLeft: `1px solid ${BORDER}`, background: "#FFFFFF", minHeight: 400 }}>
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="text-2xl mb-1">{market.flag}</div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", color: NEAR_BLACK }}>{market.name[lang]}</div>
        </div>
        <span className="text-xs px-2 py-1 mt-1" style={{ border: `1px solid ${statusColor[market.status]}40`, color: statusColor[market.status], fontFamily: "var(--font-mono)" }}>
          {t.statusLabels[market.status]}
        </span>
      </div>

      <div className="flex flex-col gap-5 flex-1">
        {sections.map((section) => (
          <div key={section.label}>
            <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)", letterSpacing: "0.06em" }}>{section.label}</div>
            <div className="flex flex-col gap-1">
              {section.items.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm" style={{ color: BODY_TEXT, lineHeight: 1.5 }}>
                  <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: BLUE }} />
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-5 flex items-center justify-between" style={{ borderTop: `1px solid ${BORDER}`, marginTop: 16 }}>
        <span className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.lastUpdatePrefix}{market.lastUpdate[lang]}</span>
        <a aria-disabled="true" onClick={(e: React.MouseEvent) => e.preventDefault()} className="flex items-center gap-1 text-xs transition-colors" style={{ color: BLUE, fontFamily: "var(--font-mono)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}>
          {t.relatedCasesLink} <ArrowUpRight size={11} />
        </a>
      </div>
    </motion.div>
  );
}

function NetworkMapSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [selected, setSelected] = useState("korea");
  const selectedMarket = markets.find((m) => m.id === selected)!;

  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.mapLabel}</div>
        <h2 className="mb-10" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.mapHeadline}
        </h2>

        {/* 데스크탑 */}
        <div className="hidden lg:grid" style={{ gridTemplateColumns: "65fr 35fr", border: `1px solid ${BORDER}` }}>
          <WorldMap selected={selected} onSelect={setSelected} />
          <AnimatePresence mode="wait">
            <MarketPanel key={selected} market={selectedMarket} />
          </AnimatePresence>
        </div>

        {/* 시장 선택 버튼 (데스크탑 아래) */}
        <div className="hidden lg:flex flex-wrap gap-2 mt-4">
          {markets.map((m) => (
            <button key={m.id} onClick={() => setSelected(m.id)}
              className="flex items-center gap-2 px-3 py-2 text-xs transition-all cursor-pointer"
              style={{
                background: selected === m.id ? NEAR_BLACK : "transparent",
                color: selected === m.id ? "#FFFFFF" : BODY_TEXT,
                border: `1px solid ${selected === m.id ? NEAR_BLACK : BORDER}`,
                fontFamily: "var(--font-body)",
              }}>
              {m.flag} {m.name[lang]}
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[m.status] }} />
            </button>
          ))}
        </div>

        {/* 모바일: 지역별 리스트 */}
        <div className="lg:hidden flex flex-col gap-3">
          {markets.map((m) => (
            <div key={m.id}>
              <button
                className="w-full flex items-center justify-between p-4 transition-all cursor-pointer"
                style={{ background: selected === m.id ? SOFT_BG : "#FFFFFF", border: `1px solid ${selected === m.id ? BLUE : BORDER}`, borderLeft: `3px solid ${selected === m.id ? BLUE : "transparent"}` }}
                onClick={() => setSelected(selected === m.id ? "" : m.id)}
              >
                <div className="flex items-center gap-3">
                  <span>{m.flag}</span>
                  <div className="text-left">
                    <div className="text-sm" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: NEAR_BLACK }}>{m.name[lang]}</div>
                    <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{m.region}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5" style={{ color: statusColor[m.status], border: `1px solid ${statusColor[m.status]}40`, fontFamily: "var(--font-mono)" }}>{t.statusLabels[m.status]}</span>
                  <ChevronDown size={14} style={{ color: MUTED, transform: selected === m.id ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </div>
              </button>
              <AnimatePresence>
                {selected === m.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <div style={{ border: `1px solid ${BORDER}`, borderTop: "none" }}>
                      <MarketPanel market={m} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 섹션 3: 지역별 활동 ──────────────────────────────────────────────────────

function RegionalActivitySection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [activeRegion, setActiveRegion] = useState<Region>("Asia");

  const filtered = useMemo(() =>
    markets.filter((m) => m.region === activeRegion),
    [activeRegion]);

  return (
    <section className="py-20" style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.regionalLabel}</div>
        <h2 className="mb-10" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.regionalHeadline}
        </h2>

        {/* 지역 탭 */}
        <div className="flex gap-0 mb-8" style={{ borderBottom: `1px solid ${BORDER}` }}>
          {regions.map((r) => (
            <button key={r} onClick={() => setActiveRegion(r)}
              className="px-6 py-3 text-sm transition-all cursor-pointer whitespace-nowrap"
              style={{
                color: activeRegion === r ? NEAR_BLACK : MUTED,
                borderBottom: activeRegion === r ? `2px solid ${BLUE}` : "2px solid transparent",
                background: "transparent",
                fontFamily: "var(--font-body)",
                fontWeight: activeRegion === r ? 600 : 400,
              }}>
              {t.regionLabels[r]} <span className="ml-1 text-xs" style={{ color: activeRegion === r ? BLUE : MUTED, fontFamily: "var(--font-mono)" }}>
                {markets.filter((m) => m.region === r).length}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeRegion} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
            className="flex flex-col gap-px" style={{ background: BORDER }}>
            {filtered.map((m) => (
              <div key={m.id} className="grid grid-cols-12 gap-6 p-6 items-center" style={{ background: "#FFFFFF" }}>
                <div className="col-span-12 md:col-span-3 flex items-center gap-3">
                  <span style={{ fontSize: "1.25rem" }}>{m.flag}</span>
                  <div>
                    <div className="text-sm" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: NEAR_BLACK }}>{m.name[lang]}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: statusColor[m.status] }} />
                      <span className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.statusLabels[m.status]}</span>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <div className="text-xs mb-1" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.businessAreaLabel}</div>
                  <div className="text-sm" style={{ color: BODY_TEXT }}>{m.focus[lang].join(" · ")}</div>
                </div>
                <div className="col-span-12 md:col-span-3">
                  <div className="text-xs mb-1" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.recentActivityLabel}</div>
                  <div className="text-sm" style={{ color: BODY_TEXT }}>{m.activities[lang][0]}</div>
                </div>
                <div className="col-span-12 md:col-span-2 flex justify-end">
                  <a aria-disabled="true" onClick={(e: React.MouseEvent) => e.preventDefault()} className="flex items-center gap-1 text-xs" style={{ color: BLUE, fontFamily: "var(--font-mono)" }}>
                    {t.detailLink} <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ── 섹션 4: 파트너 에코시스템 ────────────────────────────────────────────────

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center gap-2 p-4 group cursor-pointer transition-all"
      style={{ border: `1px dashed ${BORDER}` }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BLUE; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}>
      <div className="w-12 h-12 flex items-center justify-center" style={{ background: SOFT_BG }}>
        <span className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>LOGO</span>
      </div>
      <span className="text-xs text-center" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{name}</span>
    </div>
  );
}

function PartnerEcosystemSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <section className="py-20" style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.partnerLabel}</div>
        <h2 className="mb-12" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.partnerHeadline}
        </h2>

        <div className="flex flex-col gap-8">
          {partnerCategories.map((cat) => (
            <div key={cat.label[lang]}>
              <div className="text-xs mb-4 pb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)", borderBottom: `1px solid ${BORDER}` }}>{cat.label[lang]}</div>
              <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-8 gap-2">
                {cat.placeholders.map((name) => (
                  <LogoPlaceholder key={name} name={name} />
                ))}
                <div className="flex items-center justify-center p-4" style={{ border: `1px dashed ${BORDER}` }}>
                  <span className="text-xs text-center" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.partnerInquiry}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm" style={{ color: MUTED }}>
          {t.partnerNote}<a href="mailto:contact@eruty.com" style={{ color: BLUE }}>contact@eruty.com</a>{t.partnerNoteEnd}
        </p>
      </div>
    </section>
  );
}

// ── 섹션 5: 글로벌 활동 피드 ─────────────────────────────────────────────────

function GlobalActivitiesSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [typeFilter, setTypeFilter] = useState(t.activityTypeAll);
  const [countryFilter, setCountryFilter] = useState(t.countryAll);

  const countries = [t.countryAll, ...Array.from(new Set(activitiesData.map((a) => a.country[lang])))];

  const filtered = activitiesData.filter((a) => {
    const matchType = typeFilter === t.activityTypeAll || a.type[lang] === typeFilter;
    const matchCountry = countryFilter === t.countryAll || a.country[lang] === countryFilter;
    return matchType && matchCountry;
  });

  return (
    <section className="py-20" style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.activitiesLabel}</div>
        <h2 className="mb-10" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.activitiesHeadline}
        </h2>

        {/* 필터 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {t.activityTypes.map((type) => (
            <button key={type} onClick={() => setTypeFilter(type)}
              className="px-3 py-1.5 text-xs transition-all cursor-pointer"
              style={{ background: typeFilter === type ? NEAR_BLACK : "transparent", color: typeFilter === type ? "#FFFFFF" : MUTED, border: `1px solid ${typeFilter === type ? NEAR_BLACK : BORDER}`, fontFamily: "var(--font-mono)" }}>
              {type}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {countries.map((c) => (
            <button key={c} onClick={() => setCountryFilter(c)}
              className="px-3 py-1.5 text-xs transition-all cursor-pointer"
              style={{ background: countryFilter === c ? BLUE + "15" : "transparent", color: countryFilter === c ? BLUE : MUTED, border: `1px solid ${countryFilter === c ? BLUE + "40" : BORDER}`, fontFamily: "var(--font-mono)" }}>
              {c}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={`${typeFilter}-${countryFilter}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}
            className="flex flex-col gap-px" style={{ background: BORDER }}>
            {filtered.length === 0 ? (
              <div className="p-8 text-center" style={{ background: "#FFFFFF" }}>
                <span className="text-sm" style={{ color: MUTED }}>{t.activitiesEmpty}</span>
              </div>
            ) : filtered.map((a, i) => (
              <div key={i} className="grid grid-cols-12 gap-4 p-5 items-start" style={{ background: "#FFFFFF" }}>
                <div className="col-span-2 md:col-span-1">
                  <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{a.date}</div>
                </div>
                <div className="col-span-2 md:col-span-1 flex items-center gap-1">
                  <span style={{ fontSize: "1rem" }}>{a.flag}</span>
                </div>
                <div className="col-span-8 md:col-span-2">
                  <span className="text-xs px-2 py-0.5" style={{ border: `1px solid ${BORDER}`, color: MUTED, fontFamily: "var(--font-mono)" }}>{a.type[lang]}</span>
                </div>
                <div className="col-span-12 md:col-span-7">
                  <div className="text-sm mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: NEAR_BLACK }}>{a.title[lang]}</div>
                  <div className="text-xs" style={{ color: MUTED, lineHeight: 1.6 }}>{a.desc[lang]}</div>
                </div>
                <div className="col-span-12 md:col-span-1 flex md:justify-end">
                  <a aria-disabled="true" onClick={(e: React.MouseEvent) => e.preventDefault()} className="text-xs flex items-center gap-0.5" style={{ color: BLUE, fontFamily: "var(--font-mono)" }}>
                    {t.viewLink} <ArrowUpRight size={11} />
                  </a>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ── 섹션 6: 파트너십 유형 ────────────────────────────────────────────────────

function PartnershipTypesSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20" style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.partnershipLabel}</div>
        <h2 className="mb-12" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.partnershipHeadline}
        </h2>
        <div className="flex flex-col gap-px" style={{ background: BORDER }}>
          {partnershipTypes.map((p, i) => (
            <div key={p.title.ko} style={{ background: "#FFFFFF" }}>
              <button
                className="w-full flex items-center justify-between p-6 text-left cursor-pointer"
                style={{ background: "transparent" }}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <div className="flex items-center gap-6">
                  <span className="text-xs flex-shrink-0" style={{ color: BLUE, fontFamily: "var(--font-mono)", fontWeight: 600 }}>0{i + 1}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: open === i ? BLUE : NEAR_BLACK }}>{p.title[lang]}</span>
                </div>
                <ChevronDown size={16} style={{ color: MUTED, transform: open === i ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-3 gap-6" style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 20 }}>
                      <div className="md:col-span-2">
                        <p className="text-sm" style={{ color: BODY_TEXT, lineHeight: 1.8 }}>{p.desc[lang]}</p>
                      </div>
                      <div>
                        <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.suitablePartner}</div>
                        <div className="text-sm" style={{ color: BODY_TEXT }}>{p.who[lang]}</div>
                      </div>
                    </div>
                    <div className="px-6 pb-6">
                      <Link to="/start-a-project"
                        className="inline-flex items-center gap-2 text-xs transition-colors"
                        style={{ color: BLUE, fontFamily: "var(--font-mono)" }}>
                        {t.partnershipCta} <ArrowUpRight size={12} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 최종 CTA ─────────────────────────────────────────────────────────────────

function CtaSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <section className="py-28" style={{ background: NEAR_BLACK }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.08, color: "#FFFFFF", letterSpacing: "-0.025em" }}>
              {t.ctaHeadline.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end lg:pb-1">
            <Link to="/start-a-project"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm transition-all"
              style={{ background: BLUE, color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#2828d4"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = BLUE; }}>
              {t.ctaBtn1} <ArrowUpRight size={14} />
            </Link>
            <Link to="/start-a-project"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}>
              {t.ctaBtn2}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 페이지 조합 ───────────────────────────────────────────────────────────────

export function GlobalNetworkPage() {
  return (
    <div className="pt-16" style={{ background: "#FFFFFF" }}>
      <HeroSection />
      <NetworkMapSection />
      <RegionalActivitySection />
      <PartnerEcosystemSection />
      <GlobalActivitiesSection />
      <PartnershipTypesSection />
      <CtaSection />
    </div>
  );
}
