import { useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, X, Search, Upload, CheckCircle, ChevronRight, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";
import { openPositions as _openPositions } from "../../data/openPositions";
import type { FilterKey } from "../../data/openPositions";
import { submitCareerApplication } from "../../../services/careers";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BODY_TEXT = "#333438";
const MUTED = "#737780";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F5F6F8";
const CAREER_MAX_UPLOAD_MB = 10;
const CAREERS_MOCK_ENABLED = import.meta.env.VITE_ENABLE_MOCK_SUBMISSIONS !== "false";

// ── 번역 ──────────────────────────────────────────────────────────────────────

const T = {
  ko: {
    heroLabel: "Careers at ERUTY",
    heroHeadline: "새로운 시장과 기술을\n함께 만들어갈\n사람을 찾습니다.",
    heroDesc: "콘텐츠와 기술을 연결하고,\n글로벌 사업의 가능성을 실제 실행으로 옮기는\n팀에 합류하세요.",
    heroBtn1: "채용 포지션 보기",
    heroBtn2: "상시 지원하기",
    heroTags: ["글로벌 비즈니스", "콘텐츠·파트너십", "AI·데이터", "소프트웨어 엔지니어링", "블록체인·인프라"],
    whatLabel: "What We Build",
    whatHeadline: "이루티가 만드는 것",
    what01Label: "01 — 글로벌 콘텐츠 사업 / Hitpick",
    what01Headline: "한국 콘텐츠를\n글로벌 시장에 연결합니다",
    what01Desc: "IP 투자·공동제작·글로벌 배급을 실행하는 콘텐츠 비즈니스입니다. 아시아, 유럽, 중동 시장의 파트너와 함께 실질적인 콘텐츠 유통 구조를 만듭니다.",
    what01Tags: ["IP 투자", "글로벌 배급", "브랜드 커머스", "크리에이터 협업"],
    what02Label: "02 — AX 전환 / 이룸터",
    what02Headline: "AI로 업무와 사업을\n전환합니다",
    what02Desc: "기업과 기관의 AI 전환을 돕는 교육·솔루션 사업입니다. AX 교육 프로그램부터 업무 자동화 소프트웨어까지 실행 가능한 형태로 공급합니다.",
    what02Tags: ["AX 교육", "AI 소프트웨어", "업무 자동화", "공공기관 납품"],
    whatAreas: [
      { label: "글로벌 비즈니스", desc: "시장 전략 & 파트너십" },
      { label: "콘텐츠·파트너십", desc: "IP & 배급" },
      { label: "AI·데이터", desc: "연구 & 인텔리전스" },
      { label: "소프트웨어", desc: "제품 & 플랫폼" },
      { label: "블록체인·인프라", desc: "IP 권리 & 시스템" },
    ],
    cultureLabel: "Culture",
    cultureHeadline: "우리가 일하는 방식",
    cultureNote: "* 위 원칙은 이루티 팀의 업무 방식을 설명하는 초안입니다. 확정 후 업데이트될 예정입니다.",
    positionsLabel: "Open Positions",
    positionsHeadline: "채용 공고",
    positionsSearchPlaceholder: "포지션 검색",
    filterOptions: [
      { key: "all" as const, label: "전체" },
      { key: "global" as const, label: "글로벌 사업" },
      { key: "content" as const, label: "콘텐츠·마케팅" },
      { key: "ai" as const, label: "AI·데이터" },
      { key: "software" as const, label: "소프트웨어 개발" },
      { key: "admin" as const, label: "경영지원" },
    ],
    emptyHeadline: "현재 진행 중인 채용 공고가 없습니다.",
    emptyDesc: "이루티와 함께하고 싶은 분은\n상시 인재 등록을 통해 지원해 주세요.",
    emptyBtn: "상시 인재 등록",
    workingPrinciples: [
      { num: "01", title: "문제에서 시작합니다", desc: "솔루션보다 먼저 문제를 정의합니다. 명확한 문제가 있어야 의미 있는 결과를 만들 수 있습니다." },
      { num: "02", title: "실행 가능한 결과를 만듭니다", desc: "아이디어에서 그치지 않고 실제 계약, 제품, 성과로 이어지는 실행에 집중합니다." },
      { num: "03", title: "분야를 넘어 협업합니다", desc: "비즈니스, 콘텐츠, AI, 엔지니어링이 하나의 프로젝트 안에서 함께 움직입니다." },
      { num: "04", title: "글로벌 시장을 기준으로 생각합니다", desc: "한국이 시작점이지만, 모든 사업의 기준은 국제 시장입니다." },
      { num: "05", title: "빠르게 만들고 지속적으로 개선합니다", desc: "완벽한 시작보다 빠른 실행을 우선합니다. 데이터와 피드백으로 지속 개선합니다." },
    ],
    processLabel: "Recruitment Process",
    processHeadline: "채용 진행 방식",
    processNote: "* 채용 프로세스는 포지션에 따라 일부 변경될 수 있습니다.",
    processSteps: [
      { num: "01", title: "지원서 접수", desc: "온라인 지원 또는 이메일 제출" },
      { num: "02", title: "서류 검토", desc: "포트폴리오 및 경력 서류 검토" },
      { num: "03", title: "실무 인터뷰", desc: "실무 관련 과제 또는 케이스 인터뷰" },
      { num: "04", title: "최종 인터뷰", desc: "리더십 및 협업 방식 논의" },
      { num: "05", title: "합류 제안", desc: "처우 협의 및 입사 안내" },
    ],
    modalDeadlinePrefix: "마감 ",
    modalPositionLabel: "포지션 소개",
    modalSections: ["주요 업무", "지원 자격", "우대 조건"],
    modalProcessLabel: "채용 프로세스",
    modalApplyBtn: "이 포지션에 지원하기",
    appLabel: "General Application",
    appHeadline: "상시 인재 등록",
    appDesc: "공고가 없어도 이루티와 함께하고 싶은 분은 상시 지원할 수 있습니다. 적합한 포지션이 생기면 먼저 연락드립니다.",
    successTitle: "지원이 완료되었습니다.",
    successDesc: "이루티 팀이 검토 후 연락드리겠습니다.\n관심 가져주셔서 감사합니다.",
    successRetry: "다시 지원하기",
    fieldName: "이름",
    fieldEmail: "이메일",
    fieldPhone: "연락처",
    fieldJobArea: "관심 직무",
    fieldCareer: "경력 구분",
    fieldIntro: "자기소개",
    fieldFile: "포트폴리오 또는 이력서",
    fileHint: "파일 첨부 (PDF, DOC, ZIP · 최대 10MB)",
    consentText: "개인정보 수집 및 이용에 동의합니다. 수집된 정보는 채용 목적으로만 사용되며, 검토 후 6개월 이내 파기됩니다.",
    submitBtn: "상시 지원하기",
    submittingBtn: "제출 중...",
    jobAreaOptions: ["선택해 주세요", "글로벌 사업", "콘텐츠·마케팅", "AI·데이터", "소프트웨어 개발", "경영지원", "기타"],
    careerOptions: ["선택해 주세요", "신입", "경력 1~3년", "경력 3~7년", "경력 7년 이상"],
    sideInfoLabel: "지원 안내",
    sideInfoItems: [
      { q: "검토 기간", a: "서류 접수 후 2~3주 이내 담당자가 연락드립니다." },
      { q: "문의", a: "careers@eruty.com으로 이메일 문의 가능합니다." },
      { q: "포트폴리오", a: "포트폴리오 및 작업물은 자유 양식으로 첨부해 주세요." },
      { q: "보안", a: "제출된 정보는 채용 목적 외 사용되지 않습니다." },
    ],
    lookingForLabel: "이런 분과 함께하고 싶습니다",
    lookingForItems: [
      "글로벌 시장과 사업에 관심이 있는 분",
      "콘텐츠, AI, 기술 중 하나 이상의 전문성을 가진 분",
      "모호한 상황에서 스스로 방향을 잡고 실행하는 분",
      "팀 협업을 중요하게 생각하는 분",
      "결과를 데이터로 측정하고 개선하려는 분",
    ],
    ctaHeadline: "당신의 경험이\n이루티의 다음\n가능성이 될 수 있습니다.",
    ctaBtn1: "상시 지원하기",
    ctaBtn2: "이루티 알아보기",
    errName: "이름을 입력해 주세요.",
    errEmail: "이메일을 입력해 주세요.",
    errEmailInvalid: "올바른 이메일 형식이 아닙니다.",
    errPhone: "연락처를 입력해 주세요.",
    errJobArea: "관심 직무를 선택해 주세요.",
    errCareer: "경력 구분을 선택해 주세요.",
    errIntro: "자기소개를 입력해 주세요.",
    errIntroMin: "자기소개는 30자 이상 입력해 주세요.",
    errConsent: "개인정보 수집 및 이용에 동의해 주세요.",
    charCount: (n: number) => `${n}자`,
    namePlaceholder: "홍길동",
    introPlaceholder: "자신의 경험과 이루티에 합류하고 싶은 이유를 간략히 소개해 주세요. (30자 이상)",
  },
  en: {
    heroLabel: "Careers at ERUTY",
    heroHeadline: "Looking for People\nto Build New Markets\nand Technology Together.",
    heroDesc: "Connect content and technology,\nand join the team that turns global business\npossibilities into real execution.",
    heroBtn1: "View Open Positions",
    heroBtn2: "Open Application",
    heroTags: ["Global Business", "Content · Partnership", "AI · Data", "Software Engineering", "Blockchain · Infrastructure"],
    whatLabel: "What We Build",
    whatHeadline: "What ERUTY Builds",
    what01Label: "01 — Global Content Business / Hitpick",
    what01Headline: "Connecting Korean Content\nto Global Markets",
    what01Desc: "A content business executing IP investment, co-production, and global distribution. We build real content distribution structures with partners across Asia, Europe, and the Middle East.",
    what01Tags: ["IP Investment", "Global Distribution", "Brand Commerce", "Creator Collaboration"],
    what02Label: "02 — AX Transformation / 이룸터",
    what02Headline: "Transforming Work and\nBusiness with AI",
    what02Desc: "An education and solution business helping companies and institutions with AI transformation. We supply AX training programs and workflow automation software in actionable form.",
    what02Tags: ["AX Training", "AI Software", "Workflow Automation", "Public Sector Delivery"],
    whatAreas: [
      { label: "Global Business", desc: "Market Strategy & Partnerships" },
      { label: "Content · Partnership", desc: "IP & Distribution" },
      { label: "AI · Data", desc: "Research & Intelligence" },
      { label: "Software", desc: "Product & Platform" },
      { label: "Blockchain · Infrastructure", desc: "IP Rights & Systems" },
    ],
    cultureLabel: "Culture",
    cultureHeadline: "How We Work",
    cultureNote: "* These principles are a draft describing ERUTY's working style. They will be updated once finalized.",
    positionsLabel: "Open Positions",
    positionsHeadline: "Job Openings",
    positionsSearchPlaceholder: "Search positions",
    filterOptions: [
      { key: "all" as const, label: "All" },
      { key: "global" as const, label: "Global Business" },
      { key: "content" as const, label: "Content·Marketing" },
      { key: "ai" as const, label: "AI·Data" },
      { key: "software" as const, label: "Software Dev" },
      { key: "admin" as const, label: "Operations" },
    ],
    emptyHeadline: "No open positions at the moment.",
    emptyDesc: "If you'd like to join ERUTY,\nplease submit an open application.",
    emptyBtn: "Open Application",
    workingPrinciples: [
      { num: "01", title: "We Start from the Problem", desc: "We define the problem before the solution. A clear problem is what leads to meaningful results." },
      { num: "02", title: "We Create Actionable Outcomes", desc: "We focus on execution that leads to real contracts, products, and results — not just ideas." },
      { num: "03", title: "We Collaborate Across Disciplines", desc: "Business, content, AI, and engineering move together within a single project." },
      { num: "04", title: "We Think in Terms of Global Markets", desc: "Korea is the starting point, but every business is measured by international standards." },
      { num: "05", title: "We Build Fast and Improve Continuously", desc: "We prioritize speed over perfection. We continuously improve with data and feedback." },
    ],
    processLabel: "Recruitment Process",
    processHeadline: "How We Hire",
    processNote: "* The process may vary slightly depending on the position.",
    processSteps: [
      { num: "01", title: "Application", desc: "Online application or email submission" },
      { num: "02", title: "Document Review", desc: "Portfolio and career document review" },
      { num: "03", title: "Practical Interview", desc: "Task or case interview related to the role" },
      { num: "04", title: "Final Interview", desc: "Discussion of leadership and collaboration style" },
      { num: "05", title: "Offer", desc: "Compensation discussion and onboarding" },
    ],
    modalDeadlinePrefix: "Deadline: ",
    modalPositionLabel: "About This Role",
    modalSections: ["Key Responsibilities", "Requirements", "Preferred Qualifications"],
    modalProcessLabel: "Hiring Process",
    modalApplyBtn: "Apply for This Position",
    appLabel: "General Application",
    appHeadline: "Open Application",
    appDesc: "Even without an open posting, you can apply anytime to join ERUTY. We'll reach out when a suitable position opens up.",
    successTitle: "Application Submitted.",
    successDesc: "The ERUTY team will review and get back to you.\nThank you for your interest.",
    successRetry: "Apply Again",
    fieldName: "Name",
    fieldEmail: "Email",
    fieldPhone: "Phone",
    fieldJobArea: "Area of Interest",
    fieldCareer: "Career Level",
    fieldIntro: "Introduction",
    fieldFile: "Portfolio or Resume",
    fileHint: "Attach file (PDF, DOC, ZIP · max 10MB)",
    consentText: "I agree to the collection and use of personal information. The information will only be used for recruitment purposes and will be deleted within 6 months after review.",
    submitBtn: "Submit Application",
    submittingBtn: "Submitting...",
    jobAreaOptions: ["Please select", "Global Business", "Content · Marketing", "AI · Data", "Software Dev", "Operations", "Other"],
    careerOptions: ["Please select", "Entry Level", "1–3 Years", "3–7 Years", "7+ Years"],
    sideInfoLabel: "Application Info",
    sideInfoItems: [
      { q: "Review Period", a: "A recruiter will contact you within 2–3 weeks of submission." },
      { q: "Inquiries", a: "Email us at careers@eruty.com." },
      { q: "Portfolio", a: "Attach your portfolio or work samples in any format." },
      { q: "Privacy", a: "Submitted information will not be used beyond recruitment purposes." },
    ],
    lookingForLabel: "We're Looking for Someone Who",
    lookingForItems: [
      "Is interested in global markets and business",
      "Has expertise in at least one of: content, AI, or technology",
      "Can find direction and execute in ambiguous situations",
      "Values team collaboration",
      "Measures results with data and strives to improve",
    ],
    ctaHeadline: "Your Experience Could Be\nERUTY's Next\nPossibility.",
    ctaBtn1: "Open Application",
    ctaBtn2: "Learn About ERUTY",
    errName: "Please enter your name.",
    errEmail: "Please enter your email.",
    errEmailInvalid: "Please enter a valid email address.",
    errPhone: "Please enter your phone number.",
    errJobArea: "Please select an area of interest.",
    errCareer: "Please select your career level.",
    errIntro: "Please write an introduction.",
    errIntroMin: "Introduction must be at least 30 characters.",
    errConsent: "Please agree to the collection and use of personal information.",
    charCount: (n: number) => `${n} chars`,
    namePlaceholder: "Jane Doe",
    introPlaceholder: "Briefly introduce your experience and why you'd like to join ERUTY. (30+ characters)",
  },
};

// ── 데이터 ────────────────────────────────────────────────────────────────────
// Job listings are managed in src/app/data/openPositions.ts
// Only published positions are shown in the public UI.
const openPositions = _openPositions.filter((p) => p.status === "published");

// ── 유틸 ──────────────────────────────────────────────────────────────────────

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── 섹션 1: 히어로 ────────────────────────────────────────────────────────────

function HeroSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 pt-28 pb-20">
        <div className="inline-block text-xs mb-14 px-3 py-1.5 tracking-widest uppercase" style={{ color: BLUE, border: `1px solid rgba(55,55,242,0.25)`, fontFamily: "var(--font-mono)" }}>
          {t.heroLabel}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.6rem, 5vw, 4.5rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: NEAR_BLACK }}>
              {t.heroHeadline.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h1>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end gap-8">
            <p style={{ fontSize: "1rem", lineHeight: 1.85, color: BODY_TEXT }}>
              {t.heroDesc.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollTo("open-positions")}
                className="inline-flex items-center gap-2 px-7 py-4 text-sm transition-all cursor-pointer"
                style={{ background: BLUE, color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500, border: "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#2828d4"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = BLUE; }}>
                {t.heroBtn1} <ArrowUpRight size={14} />
              </button>
              <button
                onClick={() => scrollTo("general-application")}
                className="inline-flex items-center gap-2 px-5 py-4 text-sm transition-all cursor-pointer"
                style={{ color: BLUE, fontFamily: "var(--font-body)", fontWeight: 500, background: "transparent", border: "none" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}>
                {t.heroBtn2} <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* 역량 태그 띠 */}
        <div className="flex flex-wrap gap-2 mt-16 pt-8" style={{ borderTop: `1px solid ${BORDER}` }}>
          {t.heroTags.map((tag) => (
            <span key={tag} className="text-xs px-3 py-1.5" style={{ border: `1px solid ${BORDER}`, color: MUTED, fontFamily: "var(--font-mono)" }}>{tag}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 섹션 2: What We Build ────────────────────────────────────────────────────

function WhatWeBuildSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <section style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.whatLabel}</div>
        <h2 className="mb-14" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.whatHeadline}
        </h2>

        {/* 두 사업 분야 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px mb-px" style={{ background: BORDER }}>
          <div className="p-10" style={{ background: NEAR_BLACK }}>
            <div className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono)" }}>{t.what01Label}</div>
            <h3 className="mb-5" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem", color: "#FFFFFF", lineHeight: 1.25 }}>
              {t.what01Headline.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h3>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.9rem", lineHeight: 1.8 }}>{t.what01Desc}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {t.what01Tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1" style={{ border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mono)" }}>{tag}</span>
              ))}
            </div>
          </div>
          <div className="p-10" style={{ background: "#FFFFFF" }}>
            <div className="text-xs mb-4" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.what02Label}</div>
            <h3 className="mb-5" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.4rem", color: NEAR_BLACK, lineHeight: 1.25 }}>
              {t.what02Headline.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h3>
            <p style={{ color: MUTED, fontSize: "0.9rem", lineHeight: 1.8 }}>{t.what02Desc}</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {t.what02Tags.map((tag) => (
                <span key={tag} className="text-xs px-2.5 py-1" style={{ border: `1px solid ${BORDER}`, color: MUTED, fontFamily: "var(--font-mono)" }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 역량 영역 */}
        <div className="flex gap-px" style={{ background: BORDER }}>
          {t.whatAreas.map((area) => (
            <div key={area.label} className="flex-1 min-w-0 p-5" style={{ background: "#FFFFFF" }}>
              <div className="text-xs mb-1 truncate" style={{ color: NEAR_BLACK, fontFamily: "var(--font-body)", fontWeight: 600 }}>{area.label}</div>
              <div className="text-xs truncate" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{area.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 섹션 3: 우리가 일하는 방식 ───────────────────────────────────────────────

function HowWeWorkSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.cultureLabel}</div>
        <h2 className="mb-12" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.cultureHeadline}
        </h2>

        <div className="flex flex-col gap-px" style={{ background: BORDER }}>
          {t.workingPrinciples.map((p, i) => (
            <div key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="grid grid-cols-12 items-center transition-all"
              style={{ background: hovered === i ? SOFT_BG : "#FFFFFF", cursor: "default" }}>
              <div className="col-span-12 md:col-span-1 p-6">
                <span style={{ fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: "0.7rem", color: BLUE }}>{p.num}</span>
              </div>
              <div className="col-span-12 md:col-span-4 p-6">
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1rem", color: NEAR_BLACK }}>{p.title}</div>
              </div>
              <div className="col-span-12 md:col-span-7 p-6">
                <p className="text-sm" style={{ color: BODY_TEXT, lineHeight: 1.75, maxWidth: 560 }}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs" style={{ color: MUTED, fontStyle: "italic" }}>
          {t.cultureNote}
        </p>
      </div>
    </section>
  );
}

// ── 섹션 4 & 5: 채용 포지션 + 공백 상태 ─────────────────────────────────────

function JobModal({ job, onClose, t }: {
  job: typeof openPositions[0];
  onClose: () => void;
  t: typeof T["ko"];
}) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-end"
      style={{ background: "rgba(24,25,27,0.6)" }}
      onClick={onClose}>
      <motion.div
        initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="h-full flex flex-col overflow-auto"
        style={{ width: "min(600px, 100vw)", background: "#FFFFFF" }}
        onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="flex items-start gap-4 p-7" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="flex-1">
            <div className="text-xs mb-2" style={{ color: BLUE, fontFamily: "var(--font-mono)" }}>{job.team} · {job.type}</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.3rem", color: NEAR_BLACK }}>{job.title}</div>
            <div className="flex flex-wrap gap-3 mt-3">
              {[job.level, job.location, `${t.modalDeadlinePrefix}${job.deadline}`].map((tag) => (
                <span key={tag} className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{tag}</span>
              ))}
            </div>
          </div>
          <button onClick={onClose} className="p-1 flex-shrink-0 cursor-pointer" style={{ color: MUTED }}><X size={18} /></button>
        </div>

        {/* 바디 */}
        <div className="flex-1 p-7 flex flex-col gap-8 overflow-auto">
          <div>
            <div className="text-xs mb-3" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.modalPositionLabel}</div>
            <p className="text-sm" style={{ color: BODY_TEXT, lineHeight: 1.8 }}>{job.overview}</p>
          </div>
          {[
            { label: t.modalSections[0], items: job.responsibilities },
            { label: t.modalSections[1], items: job.required },
            { label: t.modalSections[2], items: job.preferred },
          ].map((section) => (
            <div key={section.label}>
              <div className="text-xs mb-3" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{section.label}</div>
              <div className="flex flex-col gap-2">
                {section.items.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-sm" style={{ color: BODY_TEXT, lineHeight: 1.6 }}>
                    <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: BLUE }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div className="text-xs mb-3" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.modalProcessLabel}</div>
            <div className="flex items-center gap-1 flex-wrap">
              {t.processSteps.map((s, i) => (
                <div key={i} className="flex items-center gap-1">
                  <span className="text-xs px-2.5 py-1" style={{ background: SOFT_BG, color: BODY_TEXT, fontFamily: "var(--font-mono)" }}>{s.title}</span>
                  {i < t.processSteps.length - 1 && <ChevronRight size={12} style={{ color: MUTED }} />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 지원 버튼 */}
        <div className="p-7" style={{ borderTop: `1px solid ${BORDER}` }}>
          <button
            onClick={() => { onClose(); setTimeout(() => scrollTo("general-application"), 300); }}
            className="w-full flex items-center justify-center gap-2 py-4 text-sm transition-all cursor-pointer"
            style={{ background: BLUE, color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500, border: "none" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#2828d4"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = BLUE; }}>
            {t.modalApplyBtn} <ArrowUpRight size={14} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PositionsSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [filter, setFilter] = useState<PositionsFilterKey>("all");
  const [search, setSearch] = useState("");
  const [selectedJob, setSelectedJob] = useState<typeof openPositions[0] | null>(null);
  const filterAliases: Record<PositionsFilterKey, FilterKey[]> = {
    all: ["all"],
    global: ["global"],
    content: ["content"],
    technology: ["technology"],
    design: ["design"],
    ai: ["technology"],
    software: ["technology"],
    admin: ["design"],
  };

  const visible = openPositions.filter((p) => {
    const matchFilter =
      filter === "all" || filterAliases[filter].includes(p.teamKey);
    const matchSearch = search === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.team.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <section id="open-positions" style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.positionsLabel}</div>
        <h2 className="mb-10" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.positionsHeadline}
        </h2>

        {/* 검색 + 필터 */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: MUTED }} />
            <input
              type="text"
              placeholder={t.positionsSearchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm"
              style={{ border: `1px solid ${BORDER}`, background: "#FFFFFF", color: NEAR_BLACK, fontFamily: "var(--font-body)", outline: "none" }}
            />
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {t.filterOptions.map((opt) => (
            <button key={opt.key} onClick={() => setFilter(opt.key)}
              className="px-4 py-2 text-xs transition-all cursor-pointer"
              style={{ background: filter === opt.key ? NEAR_BLACK : "#FFFFFF", color: filter === opt.key ? "#FFFFFF" : BODY_TEXT, border: `1px solid ${filter === opt.key ? NEAR_BLACK : BORDER}`, fontFamily: "var(--font-body)" }}>
              {opt.label}
            </button>
          ))}
        </div>

        {/* 리스트 또는 공백 상태 */}
        {visible.length > 0 ? (
          <div className="flex flex-col gap-px" style={{ background: BORDER }}>
            {visible.map((job) => (
              <button key={job.id} onClick={() => setSelectedJob(job)}
                className="grid grid-cols-12 items-center p-5 text-left w-full cursor-pointer transition-all"
                style={{ background: "#FFFFFF" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = SOFT_BG; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; }}>
                <div className="col-span-12 md:col-span-5">
                  <div className="text-sm mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: NEAR_BLACK }}>{job.title}</div>
                  <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{job.team}</div>
                </div>
                <div className="col-span-4 md:col-span-2">
                  <span className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{job.type}</span>
                </div>
                <div className="col-span-4 md:col-span-2">
                  <span className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{job.level}</span>
                </div>
                <div className="col-span-4 md:col-span-2">
                  <span className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{job.location}</span>
                </div>
                <div className="col-span-12 md:col-span-1 flex justify-end">
                  <ArrowUpRight size={14} style={{ color: MUTED }} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* 공백 상태 */
          <div className="flex flex-col items-center justify-center py-24 gap-6" style={{ border: `1px solid ${BORDER}`, background: "#FFFFFF" }}>
            <div className="w-14 h-14 flex items-center justify-center" style={{ background: SOFT_BG }}>
              <Search size={22} style={{ color: MUTED }} />
            </div>
            <div className="text-center">
              <div className="text-base mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: NEAR_BLACK }}>
                {t.emptyHeadline}
              </div>
              <p className="text-sm" style={{ color: MUTED, lineHeight: 1.7, maxWidth: 360 }}>
                {t.emptyDesc.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </p>
            </div>
            <button
              onClick={() => scrollTo("general-application")}
              className="flex items-center gap-2 px-6 py-3 text-sm transition-all cursor-pointer"
              style={{ background: BLUE, color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500, border: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#2828d4"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = BLUE; }}>
              {t.emptyBtn} <ArrowUpRight size={13} />
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedJob && <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} t={t} />}
      </AnimatePresence>
    </section>
  );
}

// ── 섹션 6: 채용 프로세스 ────────────────────────────────────────────────────

function ProcessSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.processLabel}</div>
        <h2 className="mb-12" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.processHeadline}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-px" style={{ background: BORDER }}>
          {t.processSteps.map((s, i) => (
            <div key={i} className="p-7 flex flex-col gap-4" style={{ background: "#FFFFFF" }}>
              <div className="text-xs" style={{ color: BLUE, fontFamily: "var(--font-mono)", fontWeight: 600 }}>{s.num}</div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: NEAR_BLACK }}>{s.title}</div>
              <p className="text-xs" style={{ color: MUTED, lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs" style={{ color: MUTED }}>
          {t.processNote}
        </p>
      </div>
    </section>
  );
}

// ── 섹션 7: 상시 지원 폼 ──────────────────────────────────────────────────────

type FormStatus = "idle" | "loading" | "success" | "error";
type PositionsFilterKey = FilterKey | "ai" | "software" | "admin";

interface FormState {
  name: string;
  email: string;
  phone: string;
  jobArea: string;
  careerLevel: string;
  intro: string;
  file: File | null;
  consent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  jobArea?: string;
  careerLevel?: string;
  intro?: string;
  file?: string;
  consent?: string;
}

function ApplicationSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<FormStatus>("idle");
  const [form, setForm] = useState<FormState>({
    name: "", email: "", phone: "", jobArea: "", careerLevel: "", intro: "", file: null, consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submissionError, setSubmissionError] = useState("");
  const mockLabel = lang === "ko" ? "개발 모드 · Mock Careers Service" : "Development mode · Mock Careers Service";
  const mockDesc = lang === "ko"
    ? "현재 채용 지원 제출은 mock 응답으로 동작합니다. 실제 API는 src/services/careers.ts에서 교체할 수 있습니다."
    : "Submissions currently use a mock response. Replace the API implementation later in src/services/careers.ts.";
  const failureTitle = lang === "ko" ? "지원서 전송에 실패했습니다." : "We couldn't send the application.";
  const fallbackFailureBody = lang === "ko"
    ? "잠시 후 다시 시도하거나 다른 이메일 주소로 테스트해 주세요."
    : "Please try again in a moment or use another email for mock testing.";

  function set(field: keyof FormState, value: string | boolean | File | null) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!form.name.trim()) e.name = t.errName;
    if (!form.email.trim()) e.email = t.errEmail;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = t.errEmailInvalid;
    if (!form.phone.trim()) e.phone = t.errPhone;
    if (!form.jobArea || form.jobArea === t.jobAreaOptions[0]) e.jobArea = t.errJobArea;
    if (!form.careerLevel || form.careerLevel === t.careerOptions[0]) e.careerLevel = t.errCareer;
    if (!form.intro.trim()) e.intro = t.errIntro;
    else if (form.intro.trim().length < 30) e.intro = t.errIntroMin;
    if (form.file) {
      const lowerName = form.file.name.toLowerCase();
      const allowed = [".pdf", ".doc", ".docx", ".zip"];
      const hasAllowedExtension = allowed.some((extension) => lowerName.endsWith(extension));
      if (!hasAllowedExtension) {
        e.file = lang === "ko" ? "지원하지 않는 파일 형식입니다." : "This file type is not supported.";
      } else if (form.file.size > CAREER_MAX_UPLOAD_MB * 1024 * 1024) {
        e.file = lang === "ko"
          ? `첨부파일은 ${CAREER_MAX_UPLOAD_MB}MB 이하만 업로드할 수 있습니다.`
          : `Attachments must be ${CAREER_MAX_UPLOAD_MB}MB or smaller.`;
      }
    }
    if (!form.consent) e.consent = t.errConsent;
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setStatus("loading");
    setSubmissionError("");
    try {
      await submitCareerApplication({
        name: form.name,
        email: form.email,
        phone: form.phone,
        jobArea: form.jobArea,
        careerLevel: form.careerLevel,
        introduction: form.intro,
        consent: form.consent,
        attachment: form.file ? { name: form.file.name, size: form.file.size, type: form.file.type } : null,
      });
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setSubmissionError(
        error instanceof Error ? error.message : fallbackFailureBody,
      );
    }
  }

  function handleReset() {
    setForm({ name: "", email: "", phone: "", jobArea: "", careerLevel: "", intro: "", file: null, consent: false });
    setErrors({});
    setStatus("idle");
    setSubmissionError("");
  }

  const inputStyle = (hasError?: string): React.CSSProperties => ({
    width: "100%", padding: "12px 14px", fontSize: "0.9rem",
    border: `1px solid ${hasError ? "#EF4444" : BORDER}`,
    background: "#FFFFFF", color: NEAR_BLACK, fontFamily: "var(--font-body)", outline: "none",
  });

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: "0.75rem", marginBottom: 6,
    color: MUTED, fontFamily: "var(--font-mono)",
  };

  const errorMsg = (msg?: string) => msg ? (
    <div className="flex items-center gap-1 mt-1.5">
      <AlertCircle size={11} style={{ color: "#EF4444", flexShrink: 0 }} />
      <span style={{ fontSize: "0.72rem", color: "#EF4444", fontFamily: "var(--font-mono)" }}>{msg}</span>
    </div>
  ) : null;

  return (
    <section id="general-application" style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.appLabel}</div>
        <h2 className="mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.appHeadline}
        </h2>
        <p className="mb-12 text-sm" style={{ color: MUTED, maxWidth: 480, lineHeight: 1.7 }}>
          {t.appDesc}
        </p>
        {CAREERS_MOCK_ENABLED ? (
          <div className="mb-6 border px-4 py-3" style={{ borderColor: BORDER, background: "#FFFFFF" }}>
            <div className="mb-1 text-xs uppercase tracking-widest" style={{ color: BLUE, fontFamily: "var(--font-mono)" }}>
              {mockLabel}
            </div>
            <p className="text-sm" style={{ color: MUTED, lineHeight: 1.7 }}>
              {mockDesc}
            </p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-20 gap-6" style={{ border: `1px solid ${BORDER}`, background: "#FFFFFF" }}>
                  <div className="w-16 h-16 flex items-center justify-center" style={{ background: "#F0FDF4", borderRadius: "50%" }}>
                    <CheckCircle size={30} style={{ color: "#16A34A" }} />
                  </div>
                  <div className="text-center">
                    <div className="text-lg mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: NEAR_BLACK }}>{t.successTitle}</div>
                    <p className="text-sm" style={{ color: MUTED, lineHeight: 1.7 }}>
                      {t.successDesc.split("\n").map((line, i, arr) => (
                        <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                      ))}
                    </p>
                  </div>
                  <button onClick={handleReset} className="text-xs cursor-pointer" style={{ color: BLUE, fontFamily: "var(--font-mono)", background: "none", border: "none" }}>
                    {t.successRetry}
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} noValidate className="flex flex-col gap-5" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}`, padding: 32 }}>
                  {status === "error" ? (
                    <div className="border px-4 py-3" style={{ borderColor: "#FCA5A5", background: "#FEF2F2" }}>
                      <div className="mb-1 flex items-center gap-2 text-sm" style={{ color: "#991B1B", fontWeight: 600 }}>
                        <AlertCircle size={14} />
                        {failureTitle}
                      </div>
                      <p className="text-sm" style={{ color: "#B91C1C", lineHeight: 1.6 }}>
                        {submissionError || fallbackFailureBody}
                      </p>
                    </div>
                  ) : null}
                  {/* 이름 + 이메일 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>{t.fieldName} <span style={{ color: "#EF4444" }}>*</span></label>
                      <input type="text" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder={t.namePlaceholder} style={inputStyle(errors.name)} />
                      {errorMsg(errors.name)}
                    </div>
                    <div>
                      <label style={labelStyle}>{t.fieldEmail} <span style={{ color: "#EF4444" }}>*</span></label>
                      <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="hello@email.com" style={inputStyle(errors.email)} />
                      {errorMsg(errors.email)}
                    </div>
                  </div>

                  {/* 연락처 */}
                  <div>
                    <label style={labelStyle}>{t.fieldPhone} <span style={{ color: "#EF4444" }}>*</span></label>
                    <input type="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="010-0000-0000" style={inputStyle(errors.phone)} />
                    {errorMsg(errors.phone)}
                  </div>

                  {/* 관심 직무 + 경력 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>{t.fieldJobArea} <span style={{ color: "#EF4444" }}>*</span></label>
                      <select value={form.jobArea} onChange={(e) => set("jobArea", e.target.value)} style={{ ...inputStyle(errors.jobArea), appearance: "none" }}>
                        {t.jobAreaOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      {errorMsg(errors.jobArea)}
                    </div>
                    <div>
                      <label style={labelStyle}>{t.fieldCareer} <span style={{ color: "#EF4444" }}>*</span></label>
                      <select value={form.careerLevel} onChange={(e) => set("careerLevel", e.target.value)} style={{ ...inputStyle(errors.careerLevel), appearance: "none" }}>
                        {t.careerOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                      {errorMsg(errors.careerLevel)}
                    </div>
                  </div>

                  {/* 자기소개 */}
                  <div>
                    <label style={labelStyle}>{t.fieldIntro} <span style={{ color: "#EF4444" }}>*</span></label>
                    <textarea
                      value={form.intro}
                      onChange={(e) => set("intro", e.target.value)}
                      rows={6}
                      placeholder={t.introPlaceholder}
                      style={{ ...inputStyle(errors.intro), resize: "vertical", lineHeight: 1.7 }}
                    />
                    <div className="flex justify-between mt-1.5">
                      {errors.intro ? errorMsg(errors.intro) : <div />}
                      <span style={{ fontSize: "0.72rem", color: MUTED, fontFamily: "var(--font-mono)" }}>{t.charCount(form.intro.length)}</span>
                    </div>
                  </div>

                  {/* 파일 첨부 */}
                  <div>
                    <label style={labelStyle}>{t.fieldFile}</label>
                    <input ref={fileInputRef} type="file" accept=".pdf,.doc,.docx,.zip" className="hidden"
                      onChange={(e) => set("file", e.target.files?.[0] ?? null)} />
                    <button type="button" onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center gap-3 px-4 py-3 cursor-pointer transition-all"
                      style={{ border: `1px dashed ${errors.file ? "#EF4444" : BORDER}`, background: "transparent" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BLUE; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}>
                      <Upload size={14} style={{ color: MUTED, flexShrink: 0 }} />
                      <span className="text-sm text-left" style={{ color: form.file ? NEAR_BLACK : MUTED, fontFamily: "var(--font-body)" }}>
                        {form.file ? form.file.name : t.fileHint}
                      </span>
                      {form.file && (
                        <button type="button" onClick={(e) => { e.stopPropagation(); set("file", null); }}
                          className="ml-auto cursor-pointer" style={{ color: MUTED, background: "none", border: "none" }}>
                          <X size={13} />
                        </button>
                      )}
                    </button>
                    {errorMsg(errors.file)}
                  </div>

                  {/* 개인정보 동의 */}
                  <div>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <div
                        onClick={() => set("consent", !form.consent)}
                        className="w-4 h-4 flex-shrink-0 mt-0.5 flex items-center justify-center transition-all"
                        style={{ border: `1.5px solid ${errors.consent ? "#EF4444" : form.consent ? BLUE : BORDER}`, background: form.consent ? BLUE : "transparent", cursor: "pointer" }}>
                        {form.consent && <CheckCircle size={10} style={{ color: "#FFFFFF" }} />}
                      </div>
                      <span className="text-xs" style={{ color: MUTED, lineHeight: 1.6 }}>
                        {t.consentText} <span style={{ color: "#EF4444" }}>*</span>
                      </span>
                    </label>
                    {errorMsg(errors.consent)}
                  </div>

                  {/* 제출 버튼 */}
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 py-4 text-sm transition-all"
                    style={{ background: status === "loading" ? MUTED : BLUE, color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500, border: "none", cursor: status === "loading" ? "not-allowed" : "pointer" }}>
                    {status === "loading" ? (
                      <>
                        <div className="w-4 h-4 rounded-full animate-spin" style={{ border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#FFFFFF" }} />
                        {t.submittingBtn}
                      </>
                    ) : (
                      <>{t.submitBtn} <ArrowUpRight size={14} /></>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* 사이드 안내 */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="p-7" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}>
              <div className="text-xs mb-4" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.sideInfoLabel}</div>
              <div className="flex flex-col gap-4">
                {t.sideInfoItems.map((item) => (
                  <div key={item.q}>
                    <div className="text-xs mb-1" style={{ fontFamily: "var(--font-mono)", color: NEAR_BLACK, fontWeight: 600 }}>{item.q}</div>
                    <div className="text-xs" style={{ color: MUTED, lineHeight: 1.6 }}>{item.a}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-7" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}>
              <div className="text-xs mb-4" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.lookingForLabel}</div>
              <div className="flex flex-col gap-2">
                {t.lookingForItems.map((item) => (
                  <div key={item} className="flex items-start gap-2 text-xs" style={{ color: BODY_TEXT, lineHeight: 1.6 }}>
                    <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ background: BLUE }} />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
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
            <button
              onClick={() => scrollTo("general-application")}
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm transition-all cursor-pointer"
              style={{ background: BLUE, color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500, border: "none" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#2828d4"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = BLUE; }}>
              {t.ctaBtn1} <ArrowUpRight size={14} />
            </button>
            <Link to="/company/about"
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

// ── 페이지 ────────────────────────────────────────────────────────────────────

export function CareersPage() {
  return (
    <div className="pt-16" style={{ background: "#FFFFFF" }}>
      <HeroSection />
      <WhatWeBuildSection />
      <HowWeWorkSection />
      <PositionsSection />
      <ProcessSection />
      <ApplicationSection />
      <CtaSection />
    </div>
  );
}
