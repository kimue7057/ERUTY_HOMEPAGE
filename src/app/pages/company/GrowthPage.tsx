import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, X, FileText, ExternalLink, Lock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";
import { COMPANY_METRICS } from "../../data/companyMetrics";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BODY_TEXT = "#333438";
const MUTED = "#737780";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F5F6F8";

// ── 카테고리 색상 ─────────────────────────────────────────────────────────────

const categoryColor: Record<string, string> = {
  Company: NEAR_BLACK,
  Technology: BLUE,
  Business: "#16A34A",
  Global: "#D97706",
  Partnership: "#7C3AED",
  "R&D": "#0891B2",
};
const categoryLabel: Record<string, { ko: string; en: string }> = {
  Company: { ko: "회사", en: "Company" },
  Technology: { ko: "기술", en: "Technology" },
  Business: { ko: "사업", en: "Business" },
  Global: { ko: "글로벌", en: "Global" },
  Partnership: { ko: "파트너십", en: "Partnership" },
  "R&D": { ko: "연구개발", en: "R&D" },
};

const UI = {
  ko: {
    heroBadge: "Growth & Credentials",
    heroHeadline: "실행의 기록이,\n다음 성장의\n기반이 됩니다.",
    heroDesc: "이루티는 사업 성과와 기술 자산,\n글로벌 협력 경험을 바탕으로 성장하고 있습니다.",
    metricsNote: "회사 제공자료 및 회계 자료 기준",
    timelineLabel: "Growth Timeline",
    timelineHeadline: "이루티의 성장 기록",
    filterAll: "전체",
    achievementsLabel: "Business Achievements",
    achievementsHeadline: "사업으로 증명한 실행력",
    achievementsNote: "공개 가능한 범위에서 사업 수행 내용을 정리했습니다.",
    achievementsRoleLabel: "이루티의 역할",
    achievementsOutcomeLabel: "성과",
    credentialsLabel: "Corporate Credentials",
    credentialsHeadline: "기업 자격 & 신뢰 자산",
    credGroupLabel: { certification: "A. 기업 인증", ip: "B. 지식재산", rd: "C. 연구개발", trust: "D. 사업 신뢰" },
    statusLabel: { active: "확인됨", pending: "진행중", placeholder: "비공개" },
    drawerIssuer: "발급 기관", drawerDate: "날짜", drawerRef: "참조 번호", drawerProject: "관련 프로젝트",
    drawerSummaryLabel: "요약",
    docAvailable: "문서 확인", docAvailableSub: "공개 문서 보기",
    docPrivate: "문서 비공개", docPlaceholder: "문서 비공개", docInternal: "내부 보관 — 필요시 요청 가능",
    monthSuffix: "월",
    ctaHeadline: "검증된 역량으로\n다음 프로젝트를\n준비합니다.",
    ctaBtn1: "기술 살펴보기", ctaBtn2: "프로젝트 제안하기",
    relatedDoc: "관련 자료",
  },
  en: {
    heroBadge: "Growth & Credentials",
    heroHeadline: "A Record of Execution\nBuilds the Foundation\nfor Next Growth.",
    heroDesc: "ERUTY grows on the basis of business results,\ntechnology assets, and global collaboration experience.",
    metricsNote: "Based on company-provided information and accounting records",
    timelineLabel: "Growth Timeline",
    timelineHeadline: "ERUTY Growth Record",
    filterAll: "All",
    achievementsLabel: "Business Achievements",
    achievementsHeadline: "Execution Proven Through Business",
    achievementsNote: "Business execution details are summarized within the public disclosure range.",
    achievementsRoleLabel: "ERUTY Role",
    achievementsOutcomeLabel: "Outcome",
    credentialsLabel: "Corporate Credentials",
    credentialsHeadline: "Corporate Credentials & Trust Assets",
    credGroupLabel: { certification: "A. Certifications", ip: "B. Intellectual Property", rd: "C. R&D", trust: "D. Business Trust" },
    statusLabel: { active: "Confirmed", pending: "In Progress", placeholder: "Private" },
    drawerIssuer: "Issuing Body", drawerDate: "Date", drawerRef: "Reference No.", drawerProject: "Related Project",
    drawerSummaryLabel: "Summary",
    docAvailable: "View Document", docAvailableSub: "View public document",
    docPrivate: "Document Private", docPlaceholder: "Document Private", docInternal: "Internal — available on request",
    monthSuffix: "",
    ctaHeadline: "Ready with Verified\nCapabilities for\nYour Next Project.",
    ctaBtn1: "Explore Technology", ctaBtn2: "Propose a Project",
    relatedDoc: "Related Document",
  },
};

const metricsData = {
  ko: [
    { label: COMPANY_METRICS.founded.labelKo, value: COMPANY_METRICS.founded.value, unit: "", note: COMPANY_METRICS.founded.noteKo },
    { label: COMPANY_METRICS.revenue2024.labelKo, value: COMPANY_METRICS.revenue2024.valueKo, unit: "", note: COMPANY_METRICS.revenue2024.noteKo },
    { label: COMPANY_METRICS.revenue2025.labelKo, value: COMPANY_METRICS.revenue2025.valueKo, unit: "", note: COMPANY_METRICS.revenue2025.noteKo },
    { label: COMPANY_METRICS.globalPartners.labelKo, value: COMPANY_METRICS.globalPartners.value, unit: "", note: COMPANY_METRICS.globalPartners.noteKo },
    { label: COMPANY_METRICS.creatorNetwork.labelKo, value: COMPANY_METRICS.creatorNetwork.value, unit: "", note: COMPANY_METRICS.creatorNetwork.noteKo },
    { label: "특허", value: `등록 ${COMPANY_METRICS.registeredPatents.value}건 · 출원 ${COMPANY_METRICS.patentApplications.value}건`, unit: "", note: "특허 등록 및 출원 현황" },
  ],
  en: [
    { label: COMPANY_METRICS.founded.labelEn, value: COMPANY_METRICS.founded.value, unit: "", note: COMPANY_METRICS.founded.noteEn },
    { label: COMPANY_METRICS.revenue2024.labelEn, value: COMPANY_METRICS.revenue2024.valueEn, unit: "", note: COMPANY_METRICS.revenue2024.noteEn },
    { label: COMPANY_METRICS.revenue2025.labelEn, value: COMPANY_METRICS.revenue2025.valueEn, unit: "", note: COMPANY_METRICS.revenue2025.noteEn },
    { label: COMPANY_METRICS.globalPartners.labelEn, value: COMPANY_METRICS.globalPartners.value, unit: "", note: COMPANY_METRICS.globalPartners.noteEn },
    { label: COMPANY_METRICS.creatorNetwork.labelEn, value: COMPANY_METRICS.creatorNetwork.value, unit: "", note: COMPANY_METRICS.creatorNetwork.noteEn },
    { label: "Patents", value: `${COMPANY_METRICS.registeredPatents.value} Registered · ${COMPANY_METRICS.patentApplications.value} Application`, unit: "", note: "Registered patents and patent application status" },
  ],
};

const milestonesData = {
  ko: [
    { id: "m1", year: "2024", month: "12", category: "Business", headline: "베트남 OTT 플랫폼 배급 파트너십 계약", desc: "한국 콘텐츠의 베트남 배급을 위한 파트너십 계약을 완료했습니다. 구체적인 계약 내용은 협의 후 공개 예정입니다." },
    { id: "m2", year: "2024", month: "11", category: "R&D", headline: "AI R&D 정부 과제 개시", desc: "과학기술정보통신부 주관 AI 연구 개발 과제가 공식 수행 기관으로 선정되어 과제가 개시되었습니다." },
    { id: "m3", year: "2024", month: "09", category: "Technology", headline: "IP 블록체인 권리 관리 인프라 배포", desc: "콘텐츠 파트너를 위한 스마트 계약 기반 IP 권리 관리 인프라를 배포 완료했습니다." },
    { id: "m4", year: "2024", month: "08", category: "Business", headline: "AX 교육 프로그램 공공기관 납품", desc: "정부 기관 대상 AI 리터러시 교육 프로그램 공급 계약을 체결하고 수료 인원 2,000명 이상을 달성했습니다." },
    { id: "m5", year: "2024", month: "05", category: "Global", headline: "싱가포르 거점 파트너십 구축", desc: "동남아시아 사업 허브로서 싱가포르 현지 파트너 네트워크를 공식 구축했습니다." },
    { id: "m6", year: "2024", month: "03", category: "Company", headline: "기업부설연구소 설립 인정", desc: "과학기술정보통신부로부터 기업부설연구소 설립 인정을 받아 공식 R&D 기관으로 등록되었습니다." },
    { id: "m7", year: "2023", month: "12", category: "Technology", headline: "AI 감성 분석 시스템 자체 개발 완료", desc: "콘텐츠 추천을 위한 AI 기반 감성 분석 시스템을 독자 개발했습니다." },
    { id: "m8", year: "2023", month: "06", category: "Partnership", headline: "글로벌 파트너 네트워크 1차 구성", desc: "아시아, 유럽, 중동 등 15개국 이상 파트너 네트워크 1차 구성을 완료했습니다." },
    { id: "m9", year: "2022", month: "09", category: "Company", headline: "주식회사 이루티 법인 설립", desc: "2022년 9월 22일 주식회사 이루티를 설립했습니다." },
  ],
  en: [
    { id: "m1", year: "2024", month: "12", category: "Business", headline: "Vietnam OTT Platform Distribution Partnership Signed", desc: "Completed a partnership agreement for distributing Korean content in Vietnam. Specific contract details will be disclosed after further discussion." },
    { id: "m2", year: "2024", month: "11", category: "R&D", headline: "Government AI R&D Project Commenced", desc: "Selected as an official executing organization for an AI R&D project under the Ministry of Science and ICT." },
    { id: "m3", year: "2024", month: "09", category: "Technology", headline: "IP Blockchain Rights Management Infrastructure Deployed", desc: "Completed deployment of smart contract-based IP rights management infrastructure for content partners." },
    { id: "m4", year: "2024", month: "08", category: "Business", headline: "AX Education Program Delivered to Public Institutions", desc: "Signed supply contract for AI literacy education program for government agencies, reaching 2,000+ completions." },
    { id: "m5", year: "2024", month: "05", category: "Global", headline: "Singapore Base Partnership Established", desc: "Officially established a local partner network in Singapore as a Southeast Asia business hub." },
    { id: "m6", year: "2024", month: "03", category: "Company", headline: "In-House Research Institute Recognition Granted", desc: "Recognized by the Ministry of Science and ICT as an official R&D institution." },
    { id: "m7", year: "2023", month: "12", category: "Technology", headline: "Proprietary AI Sentiment Analysis System Completed", desc: "Independently developed an AI-based sentiment analysis system for content recommendations." },
    { id: "m8", year: "2023", month: "06", category: "Partnership", headline: "Global Partner Network Phase 1 Established", desc: "Completed phase 1 of partner network spanning 15+ countries across Asia, Europe, and the Middle East." },
    { id: "m9", year: "2022", month: "09", category: "Company", headline: "ERUTY Co., Ltd. Incorporated", desc: "ERUTY Co., Ltd. was incorporated on September 22, 2022." },
  ],
};

const achievementsData = {
  ko: [
    { id: "a1", headline: "AX 교육 프로그램 공공기관 납품", area: "AX 교육·컨설팅", market: "한국", role: "커리큘럼 설계 및 교육 운영", outcome: "공공기관 대상 AI 리터러시 교육 프로그램 운영", status: "완료" },
    { id: "a2", headline: "AI R&D 정부 과제 수행", area: "AI 연구개발", market: "한국", role: "연구 수행 기관", outcome: "정부 과제 수행 체계 운영", status: "진행중" },
    { id: "a3", headline: "베트남 OTT 배급 파트너십", area: "글로벌 배급", market: "베트남", role: "배급 파트너 발굴 및 계약 실행", outcome: "베트남 대상 배급 협업 구조 구축", status: "완료" },
    { id: "a4", headline: "IP 블록체인 인프라 배포", area: "블록체인·인프라", market: "한국", role: "설계 및 개발, 배포", outcome: "콘텐츠 파트너 대상 기술 인프라 운영", status: "운영중" },
  ],
  en: [
    { id: "a1", headline: "AX Education Program Delivered to Public Institutions", area: "AX Education & Consulting", market: "Korea", role: "Curriculum design and education delivery", outcome: "Operation of an AI literacy education program for public institutions", status: "Completed" },
    { id: "a2", headline: "Government AI R&D Project Execution", area: "AI Research & Development", market: "Korea", role: "Research executing organization", outcome: "Operation of a government-funded AI R&D execution framework", status: "In Progress" },
    { id: "a3", headline: "Vietnam OTT Distribution Partnership", area: "Global Distribution", market: "Vietnam", role: "Distribution partner identification and contract execution", outcome: "Established a Vietnam-focused content distribution collaboration structure", status: "Completed" },
    { id: "a4", headline: "IP Blockchain Infrastructure Deployment", area: "Blockchain & Infrastructure", market: "Korea", role: "Design, development, and deployment", outcome: "Technical infrastructure in operation for content partners", status: "Active" },
  ],
};

// ── 데이터 (bilingual versions defined above in UI/metricsData/milestonesData/achievementsData)


type CredGroup = "certification" | "ip" | "rd" | "trust";

interface Credential {
  id: string;
  name: string; nameEn?: string;
  issuer: string; issuerEn?: string;
  date: string; dateEn?: string;
  status: "active" | "pending" | "placeholder";
  refNumber: string;
  summary: string; summaryEn?: string;
  docAvailable: boolean;
  group: CredGroup;
  tech?: string;
  project?: string; projectEn?: string;
}

function credField(ko: string, en: string | undefined, lang: string) {
  return lang === "en" && en ? en : ko;
}

const credentials: Credential[] = [
  {
    id: "c1", group: "certification",
    name: "벤처기업 확인", nameEn: "Venture Company Certification",
    issuer: "중소벤처기업부", issuerEn: "Ministry of SMEs and Startups",
    date: "정보 업데이트 예정", dateEn: "Pending Update",
    status: "placeholder",
    refNumber: "등록번호 업데이트 예정",
    summary: "중소벤처기업부로부터 벤처기업으로 확인된 인증입니다.",
    summaryEn: "Certification as a venture company issued by the Ministry of SMEs and Startups.",
    docAvailable: false,
  },
  {
    id: "c2", group: "certification",
    name: "기업부설연구소 설립 인정", nameEn: "Corporate R&D Center Establishment",
    issuer: "과학기술정보통신부", issuerEn: "Ministry of Science and ICT",
    date: "2024년 초", dateEn: "Early 2024",
    status: "active",
    refNumber: "비공개", 
    summary: "자체 AI·기술 연구를 위한 기업부설연구소 설립 인정을 취득했습니다.",
    summaryEn: "Obtained recognition for establishing a corporate R&D center for in-house AI and technology research.",
    docAvailable: false, tech: "AI Research",
  },
  {
    id: "c3", group: "certification",
    name: "추가 인증", nameEn: "Additional Certification",
    issuer: "업데이트 예정", issuerEn: "Pending Update",
    date: "업데이트 예정", dateEn: "Pending Update",
    status: "placeholder",
    refNumber: "업데이트 예정",
    summary: "추가 인증 정보는 취득 후 업데이트될 예정입니다.",
    summaryEn: "Additional certification information will be updated after acquisition.",
    docAvailable: false,
  },

  {
    id: "ip1", group: "ip",
    name: "등록 특허 2건", nameEn: "2 Registered Patents",
    issuer: "특허청", issuerEn: "Korean Intellectual Property Office",
    date: "등록 완료", dateEn: "Registered",
    status: "active",
    refNumber: "세부 번호 비공개",
    summary: "AI 및 사업화 기술 관련 등록 특허 2건을 보유하고 있습니다.",
    summaryEn: "ERUTY holds two registered patents related to AI and commercialization technologies.",
    docAvailable: false,
  },
  {
    id: "ip2", group: "ip",
    name: "출원 특허 1건", nameEn: "1 Patent Application",
    issuer: "특허청", issuerEn: "Korean Intellectual Property Office",
    date: "출원 진행중", dateEn: "Application in progress",
    status: "pending",
    refNumber: "세부 번호 비공개",
    summary: "AI 및 사업화 기술 관련 특허 1건을 출원 진행중입니다.",
    summaryEn: "ERUTY currently has one patent application in progress related to AI and commercialization technologies.",
    docAvailable: false,
  },

  {
    id: "rd1", group: "rd",
    name: "AI R&D 정부 과제", nameEn: "Government AI R&D Project",
    issuer: "과학기술정보통신부", issuerEn: "Ministry of Science and ICT",
    date: "2024년", dateEn: "2024",
    status: "active",
    refNumber: "비공개",
    summary: "과학기술정보통신부 주관 AI 연구 개발 과제를 수행 기관으로서 진행중입니다.",
    summaryEn: "Currently executing a government-commissioned AI R&D project supervised by the Ministry of Science and ICT.",
    docAvailable: false, tech: "AI Research", project: "AI R&D 과제", projectEn: "AI R&D Project",
  },
  {
    id: "rd2", group: "rd",
    name: "자체 AI 감성 분석 연구", nameEn: "In-house AI Sentiment Analysis Research",
    issuer: "이루티 기업부설연구소", issuerEn: "ERUTY Corporate R&D Center",
    date: "2023년", dateEn: "2023",
    status: "active",
    refNumber: "비공개",
    summary: "콘텐츠 추천을 위한 AI 감성 분석 알고리즘을 자체 연구 개발했습니다.",
    summaryEn: "Developed an in-house AI sentiment analysis algorithm for content recommendation.",
    docAvailable: false, tech: "AI · NLP",
  },
  {
    id: "rd3", group: "rd",
    name: "산학 협력 (업데이트 예정)", nameEn: "Industry-Academia Collaboration (Pending)",
    issuer: "협력 기관 업데이트 예정", issuerEn: "Partner Institution — Pending",
    date: "업데이트 예정", dateEn: "Pending Update",
    status: "placeholder",
    refNumber: "업데이트 예정",
    summary: "산학 협력 및 연구 기관 협력 정보는 협약 체결 후 업데이트될 예정입니다.",
    summaryEn: "Industry-academia and research institution collaboration details will be updated after agreement signing.",
    docAvailable: false,
  },

  {
    id: "tr1", group: "trust",
    name: "공공기관 AX 교육 계약", nameEn: "Public Institution AX Education Contract",
    issuer: "비공개 공공기관", issuerEn: "Private public institution",
    date: "2024년", dateEn: "2024",
    status: "active",
    refNumber: "비공개",
    summary: "정부 기관 대상 AI 교육 프로그램 납품 계약을 완료하고 이행했습니다.",
    summaryEn: "Completed and fulfilled an AI education program delivery contract with a government institution.",
    docAvailable: false, project: "AX 교육 프로그램", projectEn: "AX Education Program",
  },
  {
    id: "tr2", group: "trust",
    name: "베트남 OTT 배급 협약", nameEn: "Vietnam OTT Distribution Agreement",
    issuer: "비공개 파트너 플랫폼", issuerEn: "Private partner platform",
    date: "2024년 12월", dateEn: "December 2024",
    status: "active",
    refNumber: "비공개",
    summary: "베트남 OTT 플랫폼과의 콘텐츠 배급 파트너십 협약을 체결했습니다.",
    summaryEn: "Signed a content distribution partnership agreement with a Vietnam OTT platform.",
    docAvailable: false, project: "베트남 배급 파트너십", projectEn: "Vietnam Distribution Partnership",
  },
  {
    id: "tr3", group: "trust",
    name: "추가 수행 실적 (업데이트 예정)", nameEn: "Additional Track Record (Pending)",
    issuer: "업데이트 예정", issuerEn: "Pending Update",
    date: "업데이트 예정", dateEn: "Pending Update",
    status: "placeholder",
    refNumber: "업데이트 예정",
    summary: "추가 계약 및 수행 실적 정보는 확인 후 업데이트될 예정입니다.",
    summaryEn: "Additional contract and performance record information will be updated after verification.",
    docAvailable: false,
  },
];

const statusColor: Record<Credential["status"], string> = {
  active: "#16A34A",
  pending: "#D97706",
  placeholder: MUTED,
};

// ── 섹션 1: 히어로 ────────────────────────────────────────────────────────────

function HeroSection() {
  const { lang } = useLanguage();
  const ui = UI[lang];
  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 pt-28 pb-0">
        <div className="inline-block text-xs mb-14 px-3 py-1.5 tracking-widest uppercase" style={{ color: BLUE, border: `1px solid rgba(55,55,242,0.25)`, fontFamily: "var(--font-mono)" }}>
          {ui.heroBadge}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-16">
          <div className="lg:col-span-7">
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.6rem, 5vw, 4.5rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: NEAR_BLACK, whiteSpace: "pre-line" }}>
              {ui.heroHeadline}
            </h1>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end gap-6">
            <p style={{ fontSize: "1rem", lineHeight: 1.85, color: BODY_TEXT, maxWidth: 400, whiteSpace: "pre-line" }}>
              {ui.heroDesc}
            </p>
          </div>
        </div>

        {/* 연도 진행 그래픽 */}
        <div className="flex items-end gap-px" style={{ background: BORDER }}>
          {["2023", "2024", "2025", "2026+"].map((y, i) => {
            const heights = [48, 80, 64, 40];
            const isCurrent = i === 1;
            return (
              <div key={y} className="flex-1 flex flex-col justify-end items-center gap-2 px-3 pb-4"
                style={{ background: isCurrent ? NEAR_BLACK : "#FFFFFF", paddingTop: 12 }}>
                <div style={{ width: "60%", height: heights[i], background: isCurrent ? BLUE : BORDER }} />
                <div className="text-xs" style={{ color: isCurrent ? "#FFFFFF" : MUTED, fontFamily: "var(--font-mono)", fontWeight: isCurrent ? 600 : 400 }}>{y}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 섹션 2: 핵심 지표 ────────────────────────────────────────────────────────

function MetricsSection() {
  const { lang } = useLanguage();
  const ui = UI[lang];
  const metrics = metricsData[lang];
  return (
    <section style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px" style={{ background: BORDER }}>
          {metrics.map((m) => (
            <div key={m.label} className="p-7" style={{ background: "#FFFFFF", minHeight: 184 }}>
              <div className="text-xs mb-3" style={{ color: MUTED, fontFamily: "var(--font-mono)", fontSize: "0.8rem", lineHeight: 1.5 }}>{m.label}</div>
              <div className="mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: NEAR_BLACK, fontSize: "clamp(2rem, 2.6vw, 2.35rem)", letterSpacing: "-0.03em", lineHeight: 1.18 }}>
                {m.value}
                {m.unit && <span style={{ fontSize: "1rem", color: BLUE, marginLeft: 4 }}>{m.unit}</span>}
              </div>
              <div className="text-xs" style={{ color: BODY_TEXT, fontSize: "0.82rem", lineHeight: 1.62 }}>{m.note}</div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>
          {ui.metricsNote}
        </p>
      </div>
    </section>
  );
}

// ── 섹션 3: 성장 타임라인 ────────────────────────────────────────────────────

function TimelineSection() {
  const { lang } = useLanguage();
  const ui = UI[lang];
  const milestones = milestonesData[lang];
  const [filterCat, setFilterCat] = useState<string>("all");
  const allCategories = ["all", ...Array.from(new Set(milestones.map((m) => m.category)))];
  const visible = filterCat === "all" ? milestones : milestones.filter((m) => m.category === filterCat);

  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{ui.timelineLabel}</div>
        <h2 className="mb-10" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {ui.timelineHeadline}
        </h2>

        <div className="flex flex-wrap gap-2 mb-10">
          {allCategories.map((cat) => (
            <button key={cat} onClick={() => setFilterCat(cat)}
              className="px-3 py-1.5 text-xs transition-all cursor-pointer"
              style={{
                background: filterCat === cat ? (categoryColor[cat] || NEAR_BLACK) : "transparent",
                color: filterCat === cat ? "#FFFFFF" : MUTED,
                border: `1px solid ${filterCat === cat ? (categoryColor[cat] || NEAR_BLACK) : BORDER}`,
                fontFamily: "var(--font-body)",
              }}>
              {cat === "all" ? ui.filterAll : (categoryLabel[cat]?.[lang] ?? cat)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={filterCat + lang} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="flex flex-col gap-px" style={{ background: BORDER }}>
            {visible.map((m, i) => {
              const isEven = i % 2 === 0;
              const catColor = categoryColor[m.category] || NEAR_BLACK;
              return (
                <div key={m.id} className="grid grid-cols-12" style={{ background: "#FFFFFF", minHeight: 120 }}>
                  <div className={`col-span-12 md:col-span-2 flex flex-col justify-center p-6 ${isEven ? "" : "md:order-last"}`}
                    style={{ background: isEven ? NEAR_BLACK : SOFT_BG, borderRight: isEven ? "none" : `1px solid ${BORDER}` }}>
                    <div className="text-2xl" style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: isEven ? "#FFFFFF" : NEAR_BLACK }}>{m.year}</div>
                    {m.month && <div className="text-xs mt-1" style={{ color: isEven ? "rgba(255,255,255,0.45)" : MUTED, fontFamily: "var(--font-mono)" }}>{m.month}{ui.monthSuffix}</div>}
                  </div>
                  <div className={`col-span-12 md:col-span-1 flex items-center justify-center p-4 ${isEven ? "" : "md:order-first"}`}
                    style={{ borderRight: `1px solid ${BORDER}` }}>
                    <div className="text-xs" style={{ color: catColor, fontFamily: "var(--font-mono)", fontWeight: 600, writingMode: "vertical-rl", transform: "rotate(180deg)", whiteSpace: "nowrap" }}>
                      {categoryLabel[m.category]?.[lang] ?? m.category}
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-9 flex flex-col justify-center p-7 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: catColor }} />
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.12rem", color: NEAR_BLACK, lineHeight: 1.45 }}>{m.headline}</div>
                    </div>
                    <p className="text-sm" style={{ color: BODY_TEXT, fontSize: "0.98rem", lineHeight: 1.74, maxWidth: 680 }}>{m.desc}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ── 섹션 4: 사업 성과 ────────────────────────────────────────────────────────

const achievementStatusColors = {
  ko: { "완료": "#16A34A", "진행중": "#D97706", "운영중": BLUE } as Record<string, string>,
  en: { "Completed": "#16A34A", "In Progress": "#D97706", "Active": BLUE } as Record<string, string>,
};

function AchievementsSection() {
  const { lang } = useLanguage();
  const ui = UI[lang];
  const achievements = achievementsData[lang];
  const statusColors = achievementStatusColors[lang];
  return (
    <section style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{ui.achievementsLabel}</div>
        <h2 className="mb-12" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {ui.achievementsHeadline}
        </h2>

        <div className="flex flex-col gap-px" style={{ background: BORDER }}>
          {achievements.map((a) => (
            <div key={a.id} className="grid grid-cols-12 gap-0" style={{ background: "#FFFFFF" }}>
              {/* 상태 표시 */}
              <div className="col-span-12 md:col-span-1 flex items-center justify-center p-5" style={{ borderRight: `1px solid ${BORDER}` }}>
                <div className="w-2 h-2 rounded-full" style={{ background: statusColors[a.status] || MUTED }} />
              </div>
              {/* 주요 정보 */}
              <div className="col-span-12 md:col-span-4 p-6" style={{ borderRight: `1px solid ${BORDER}` }}>
                <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{a.area} · {a.market}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.02rem", color: NEAR_BLACK, lineHeight: 1.45 }}>{a.headline}</div>
                <div className="mt-2">
                  <span className="text-xs px-2 py-0.5" style={{ border: `1px solid ${(statusColors[a.status] || MUTED) + "40"}`, color: statusColors[a.status] || MUTED, fontFamily: "var(--font-mono)" }}>
                    {a.status}
                  </span>
                </div>
              </div>
              {/* 역할 */}
              <div className="col-span-12 md:col-span-3 p-6" style={{ borderRight: `1px solid ${BORDER}` }}>
                <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{ui.achievementsRoleLabel}</div>
                <p className="text-sm" style={{ color: BODY_TEXT, fontSize: "0.96rem", lineHeight: 1.7 }}>{a.role}</p>
              </div>
              {/* 성과 */}
              <div className="col-span-12 md:col-span-4 p-6">
                <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{ui.achievementsOutcomeLabel}</div>
                <p className="text-sm" style={{ color: BODY_TEXT, fontSize: "0.96rem", lineHeight: 1.7 }}>{a.outcome}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs" style={{ color: BODY_TEXT, fontSize: "0.82rem", lineHeight: 1.6 }}>
          {ui.achievementsNote}
        </p>
      </div>
    </section>
  );
}

// ── 섹션 5 & 6: 기업 자격 + 상세 드로어 ─────────────────────────────────────

function CredentialBadge({ status, ui }: { status: Credential["status"]; ui: typeof UI["ko"] }) {
  const color = statusColor[status];
  return (
    <span className="text-xs px-2 py-0.5" style={{ border: `1px solid ${color}40`, color, fontFamily: "var(--font-mono)" }}>
      {ui.statusLabel[status]}
    </span>
  );
}

function CredentialsSection() {
  const { lang } = useLanguage();
  const ui = UI[lang];
  const [selected, setSelected] = useState<Credential | null>(null);
  const visibleCredentials = credentials.filter((credential) => credential.status !== "placeholder");
  const groups = (["certification", "ip", "rd", "trust"] as CredGroup[]).filter((group) =>
    visibleCredentials.some((credential) => credential.group === group),
  );

  const isPending = (v: string) => v.includes("예정") || v.toLowerCase().includes("pending") || v.toLowerCase().includes("to be updated");

  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}`, position: "relative", overflow: "hidden" }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{ui.credentialsLabel}</div>
        <h2 className="mb-12" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {ui.credentialsHeadline}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ background: BORDER }}>
          {groups.map((grp) => {
            const items = visibleCredentials.filter((c) => c.group === grp);
            return (
              <div key={grp} className="flex flex-col gap-px" style={{ background: BORDER }}>
                {/* 그룹 헤더 */}
                <div className="p-5" style={{ background: SOFT_BG }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.9rem", color: NEAR_BLACK }}>{ui.credGroupLabel[grp]}</div>
                </div>
                {/* 항목들 */}
                {items.map((c) => (
                  <button key={c.id} onClick={() => setSelected(selected?.id === c.id ? null : c)}
                    className="flex items-start gap-4 p-5 text-left w-full cursor-pointer transition-all"
                    style={{ background: selected?.id === c.id ? SOFT_BG : "#FFFFFF", borderLeft: `3px solid ${selected?.id === c.id ? BLUE : "transparent"}` }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="text-sm" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "0.98rem", color: NEAR_BLACK, lineHeight: 1.5 }}>{credField(c.name, c.nameEn, lang)}</div>
                        <CredentialBadge status={c.status} ui={ui} />
                      </div>
                      <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)", fontSize: "0.78rem", lineHeight: 1.5 }}>{credField(c.issuer, c.issuerEn, lang)} · {credField(c.date, c.dateEn, lang)}</div>
                    </div>
                    <ArrowUpRight size={14} style={{ color: selected?.id === c.id ? BLUE : MUTED, flexShrink: 0, marginTop: 2 }} />
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      </div>

      {/* 드로어 */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40" style={{ background: "rgba(24,25,27,0.45)" }}
              onClick={() => setSelected(null)} />
            <motion.div
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 flex flex-col"
              style={{ width: "min(480px, 100vw)", background: "#FFFFFF", boxShadow: "-4px 0 24px rgba(0,0,0,0.08)" }}>
              {/* 드로어 헤더 */}
              <div className="flex items-start justify-between p-6" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <div className="flex-1 min-w-0">
                  <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{ui.credGroupLabel[selected.group]}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: NEAR_BLACK }}>{credField(selected.name, selected.nameEn, lang)}</div>
                </div>
                <button onClick={() => setSelected(null)} className="p-1 flex-shrink-0 cursor-pointer" style={{ color: MUTED }}>
                  <X size={18} />
                </button>
              </div>

              {/* 드로어 바디 */}
              <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">
                {/* 상태 행 */}
                <div className="flex flex-wrap gap-3">
                  <CredentialBadge status={selected.status} ui={ui} />
                  {selected.tech && (
                    <span className="text-xs px-2 py-0.5" style={{ border: `1px solid ${BORDER}`, color: MUTED, fontFamily: "var(--font-mono)" }}>{selected.tech}</span>
                  )}
                </div>

                {/* 메타 정보 */}
                <div className="flex flex-col gap-px" style={{ background: BORDER }}>
                  {[
                    { label: ui.drawerIssuer, value: credField(selected.issuer, selected.issuerEn, lang) },
                    { label: ui.drawerDate, value: credField(selected.date, selected.dateEn, lang) },
                    { label: ui.drawerRef, value: selected.refNumber },
                    ...(selected.project ? [{ label: ui.drawerProject, value: credField(selected.project, selected.projectEn, lang) }] : []),
                  ].map((row) => (
                    <div key={row.label} className="grid grid-cols-5 p-3" style={{ background: "#FFFFFF" }}>
                      <div className="col-span-2 text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{row.label}</div>
                      <div className="col-span-3 text-xs" style={{ color: isPending(row.value) ? MUTED : BODY_TEXT, fontStyle: isPending(row.value) ? "italic" : "normal" }}>{row.value}</div>
                    </div>
                  ))}
                </div>

                {/* 요약 */}
                <div>
                  <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{ui.drawerSummaryLabel}</div>
                  <p className="text-sm" style={{ color: BODY_TEXT, lineHeight: 1.75 }}>{credField(selected.summary, selected.summaryEn, lang)}</p>
                </div>

                {/* 문서 */}
                <div style={{ border: `1px solid ${BORDER}`, padding: 20 }}>
                  {selected.docAvailable ? (
                    // TODO: Replace with real document URL when credential docs are hosted
                    <div className="flex items-center gap-3" style={{ cursor: "not-allowed", opacity: 0.7 }}>
                      <FileText size={18} style={{ color: BLUE }} />
                      <div>
                        <div className="text-sm" style={{ color: NEAR_BLACK, fontFamily: "var(--font-display)", fontWeight: 600 }}>{ui.docAvailable}</div>
                        <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{ui.docAvailableSub}</div>
                      </div>
                      <ExternalLink size={14} style={{ color: BLUE, marginLeft: "auto" }} />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Lock size={18} style={{ color: MUTED }} />
                      <div>
                        <div className="text-sm" style={{ color: MUTED, fontFamily: "var(--font-display)", fontWeight: 600 }}>{ui.docPrivate}</div>
                        <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>
                          {selected.status === "placeholder" ? ui.docPlaceholder : ui.docInternal}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── 최종 CTA ─────────────────────────────────────────────────────────────────

function CtaSection() {
  const { lang } = useLanguage();
  const ui = UI[lang];
  return (
    <section className="py-28" style={{ background: NEAR_BLACK }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.08, color: "#FFFFFF", letterSpacing: "-0.025em", whiteSpace: "pre-line" }}>
              {ui.ctaHeadline}
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end lg:pb-1">
            <Link to="/technology"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm transition-all"
              style={{ background: BLUE, color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#2828d4"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = BLUE; }}>
              {ui.ctaBtn1} <ArrowUpRight size={14} />
            </Link>
            <Link to="/start-a-project"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)"; }}>
              {ui.ctaBtn2}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 페이지 ────────────────────────────────────────────────────────────────────

export function GrowthPage() {
  return (
    <div className="pt-16" style={{ background: "#FFFFFF" }}>
      <HeroSection />
      <MetricsSection />
      <TimelineSection />
      <AchievementsSection />
      <CredentialsSection />
      <CtaSection />
    </div>
  );
}
