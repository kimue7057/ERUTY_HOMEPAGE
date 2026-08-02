import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowUpRight, Pause, Play, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import heroVideo from "../../assets/video/eruty-hero.mp4";
import { COMPANY_METRICS } from "../data/companyMetrics";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BODY_TEXT = "#333438";
const MUTED = "#737780";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F5F6F8";

/* ─── Translations ──────────────────────────────────────────────── */

const T = {
  ko: {
    hero: {
      videoLabel: "ERUTY  /  GLOBAL BUSINESS IN MOTION",
      pauseLabel: "영상 일시정지",
      playLabel: "영상 재생",
      headline: "가능성을 연결해,\n글로벌 비즈니스를 만듭니다.",
      desc: "이루티는 콘텐츠와 기술, 글로벌 네트워크를 연결해\n새로운 사업을 설계하고 실행합니다.",
      btn1: "이루티 알아보기",
      btn2: "프로젝트 시작하기",
    },
    statement: {
      eyebrow: "우리가 만드는 것",
      headline: "콘텐츠의 가능성을 글로벌 사업으로,\n기업의 업무를 지능형 시스템으로 전환합니다.",
      signalsLabel: "글로벌 활동 현황",
    },
    signals: [
      { country: "베트남", flag: "🇻🇳", desc: "콘텐츠 & 기술 파트너십" },
      { country: "싱가포르", flag: "🇸🇬", desc: "기술 & 투자 네트워크" },
      { country: "독일", flag: "🇩🇪", desc: "배급 & 커머스" },
      { country: "UAE", flag: "🇦🇪", desc: "글로벌 비즈니스 협업" },
      { country: "일본", flag: "🇯🇵", desc: "시장 확장" },
      { country: "대만", flag: "🇹🇼", desc: "콘텐츠 & 크리에이터 비즈니스" },
      { country: "인도네시아", flag: "🇮🇩", desc: "디지털 배급 & 커머스" },
      { country: "미국", flag: "🇺🇸", desc: "커머스 & 수익화" },
    ],
    metrics: [
      { value: "20+", label: "글로벌 파트너" },
      { value: "100+", label: "크리에이터 네트워크" },
      { value: "2건", label: "등록 특허" },
      { value: "1건", label: "특허 출원" },
    ],
    business: {
      eyebrow: "사업 분야",
      headline: "두 개의 분야. 하나의 글로벌 비전.",
      contentFlow: ["콘텐츠 & IP", "시장 인텔리전스", "사업 설계", "글로벌 파트너", "수익화"],
      axFlow: ["수동 업무", "데이터 연결", "AI 처리", "자동화 결과", "지속 운영"],
      panelA: {
        badge: "글로벌 콘텐츠 비즈니스",
        headline: "콘텐츠와 IP를\n글로벌 사업으로 전환합니다.",
        desc: "콘텐츠와 IP의 가능성을 발굴하고,\n투자·배급·라이선싱·브랜드 협업을 통해\n글로벌 시장의 실제 사업으로 연결합니다.",
        caps: ["투자 & 제작", "글로벌 배급", "IP 라이선싱", "브랜드 협업", "커머스 & 수익화"],
        flowLabel: "운영 흐름",
        powered: "Hitpick",
      },
      panelB: {
        badge: "AX 전환",
        headline: "업무를\n지능형 시스템으로 전환합니다.",
        desc: "기업의 업무와 서비스를 분석하고,\nAI 교육·소프트웨어 개발·자동화 시스템을 통해\n실제 운영 가능한 AX 환경을 구축합니다.",
        caps: ["AX 교육", "AI 소프트웨어 개발", "업무 자동화", "AI 에이전트 & 워크플로우", "맞춤형 프로그램"],
        flowLabel: "전환 흐름",
        delivered: "이룸터",
      },
    },
    tech: {
      eyebrow: "기술",
      headline: "실제 사업을 위한\n기술을 만듭니다.",
      desc: "AI·데이터·블록체인·소프트웨어 기술을\n실제 사업과 운영 시스템에 적용합니다.",
      tabs: [
        { id: "ai", label: "AI & 데이터" },
        { id: "automation", label: "자동화" },
        { id: "blockchain", label: "블록체인 & 권리" },
        { id: "software", label: "소프트웨어 엔지니어링" },
      ],
      pipelineLabel: "처리 단계",
      content: {
        ai: {
          title: "콘텐츠와 시장을 대규모로 분석하는 인텔리전스.",
          items: [
            { label: "글로벌 시장 신호", value: "국가별 시장 동향 모니터링" },
            { label: "콘텐츠 분석", value: "장르, 톤, 적합도 평가" },
            { label: "오디언스 인텔리전스", value: "크로스 플랫폼 세분화" },
            { label: "브랜드 적합도", value: "AI 기반 매칭 스코어" },
            { label: "비즈니스 기회 탐색", value: "자동 식별 시스템" },
            { label: "추천 엔진", value: "LLM 기반 결과 출력" },
          ],
          pipeline: ["데이터 수집", "특성 추출", "모델 추론", "신호 출력", "비즈니스 실행"],
        },
        automation: {
          title: "반복 업무를 대체하는 AI 에이전트 시스템.",
          items: [
            { label: "데이터 수집", value: "실시간 업무 데이터 연동" },
            { label: "AI 처리", value: "분석과 초안 생성" },
            { label: "문서 자동 생성", value: "보고서와 문서 초안 자동화" },
            { label: "보고서 자동화", value: "정기 보고 흐름 설계" },
            { label: "자동화 업무 단계", value: "단계별 워크플로 연결" },
            { label: "운영 효율화", value: "반복 업무 부담 경감" },
          ],
          pipeline: ["트리거", "에이전트 처리", "도구 실행", "검증", "결과 전달"],
        },
        blockchain: {
          title: "IP, 계약, 수익에 대한 불변의 기록.",
          items: [
            { label: "IP 등록소", value: "권리 자산 등록 체계" },
            { label: "스마트 계약", value: "라이선스 계약 자동화" },
            { label: "권리 관리", value: "역할 기반 접근 제어" },
            { label: "수익 분배", value: "자동 정산" },
            { label: "정산 주기", value: "월별 자동화" },
            { label: "감사 추적", value: "체인 상 불변 기록" },
          ],
          pipeline: ["IP 등록", "라이선스 발행", "사용 추적", "수익 분배", "정산"],
        },
        software: {
          title: "플랫폼과 AI 제품을 위한 풀스택 엔지니어링.",
          items: [
            { label: "웹 & 앱", value: "React, 네이티브 모바일" },
            { label: "SaaS 아키텍처", value: "멀티테넌트 플랫폼" },
            { label: "어드민 플랫폼", value: "내부 운영 대시보드" },
            { label: "API 연동", value: "OTT, CRM, 금융" },
            { label: "인프라", value: "클라우드 네이티브, CDN" },
            { label: "운영", value: "CI/CD, 모니터링" },
          ],
          pipeline: ["요구사항", "아키텍처", "개발", "QA & 테스트", "배포 & 모니터링"],
        },
      },
    },
    work: {
      eyebrow: "우리의 사업",
      headline: "시장을 넘어.\n실제 사업으로.",
      viewAll: "전체 사례 보기",
      cases: [
        { index: "01", market: "베트남", headline: "한국 콘텐츠와 현지 제작·비즈니스 파트너를 연결했습니다.", tags: ["글로벌 콘텐츠", "파트너십", "시장 진입"], role: "전략 파트너 & 시장 운영자", tech: "콘텐츠 인텔리전스 · 시장 분석" },
        { index: "02", market: "한국", headline: "AI 기반 감성 분석 및 개인화 콘텐츠 추천 시스템을 구축했습니다.", tags: ["AI", "데이터", "소프트웨어 엔지니어링"], role: "기술 개발사", tech: "생성형 AI · 감성 분석 · LLM" },
        { index: "03", market: "유럽", headline: "글로벌 시장에서 새로운 배급 및 커머스 기회를 창출했습니다.", tags: ["배급", "브랜드", "커머스"], role: "IP 비즈니스 자문 & 운영자", tech: "권리 인프라 · 시장 인텔리전스" },
      ],
      labels: { market: "시장", role: "이루티 역할", tech: "적용 기술", category: "분류" },
      detailLink: "사례 상세 보기",
    },
    resources: {
      eyebrow: "리소스",
      headline: "이루티의 최신 소식.",
      viewAll: "전체 리소스",
      readMore: "자세히 보기",
      featured: {
        category: "파트너십",
        date: "2024년 12월",
        title: "이루티, 새로운 콘텐츠 배급 파트너십으로 동남아 글로벌 네트워크 확대",
        desc: "이루티가 베트남과 싱가포르를 거점으로 동남아 콘텐츠 사업을 확대합니다. 기술 파트너십과 IP 거래를 통해 새로운 글로벌 네트워크를 구축합니다.",
        region: "베트남 · 싱가포르",
      },
      sideItems: [
        { category: "기술", date: "2024년 11월", title: "IP 거래를 위한 AI 기반 콘텐츠 평가 시스템 출시", region: "한국" },
        { category: "인사이트", date: "2024년 11월", title: "글로벌 OTT 콘텐츠 시장 2025: 한국 IP 수출 트렌드", region: "글로벌" },
        { category: "프로그램", date: "2024년 10월", title: "기업 대상 AX 전환 프로그램 2025년 1분기 모집 시작", region: "한국 · 온라인" },
      ],
      additionalItems: [
        { category: "프로젝트", date: "2024년 10월", title: "독일 미디어 그룹과 콘텐츠 배급 파트너십 계약 체결", region: "독일" },
        { category: "이벤트", date: "2024년 9월", title: "이루티, ContentMarket Asia 2024 패널 세션 및 전시 참가", region: "싱가포르" },
        { category: "기술", date: "2024년 9월", title: "콘텐츠 파트너 네트워크를 위한 블록체인 IP 등록 시스템 구축", region: "한국" },
      ],
    },
    cta: {
      headline: "다음 기회를\n이루티와 함께 만드세요.",
      desc: "콘텐츠 사업, 글로벌 파트너십,\nAX 전환과 기술 개발을 이루티와 함께 시작하세요.",
      btn1: "프로젝트 시작",
      btn2: "이루티 문의",
    },
  },
  en: {
    hero: {
      videoLabel: "ERUTY  /  GLOBAL BUSINESS IN MOTION",
      pauseLabel: "Pause video",
      playLabel: "Play video",
      headline: "Connecting Possibilities,\nBuilding Global Business.",
      desc: "ERUTY connects content, technology, and global networks\nto design and execute new business ventures.",
      btn1: "About ERUTY",
      btn2: "Start a Project",
    },
    statement: {
      eyebrow: "What We Create",
      headline: "Transforming content potential into global business,\nand enterprise operations into intelligent systems.",
      signalsLabel: "Global Activity",
    },
    signals: [
      { country: "Vietnam", flag: "🇻🇳", desc: "Content & Tech Partnership" },
      { country: "Singapore", flag: "🇸🇬", desc: "Technology & Investment Network" },
      { country: "Germany", flag: "🇩🇪", desc: "Distribution & Commerce" },
      { country: "UAE", flag: "🇦🇪", desc: "Global Business Collaboration" },
      { country: "Japan", flag: "🇯🇵", desc: "Market Expansion" },
      { country: "Taiwan", flag: "🇹🇼", desc: "Content & Creator Business" },
      { country: "Indonesia", flag: "🇮🇩", desc: "Digital Distribution & Commerce" },
      { country: "United States", flag: "🇺🇸", desc: "Commerce & Monetization" },
    ],
    metrics: [
      { value: "20+", label: "Global Partners" },
      { value: "100+", label: "Creator Network" },
      { value: "2", label: "Registered Patents" },
      { value: "1", label: "Patent Application" },
    ],
    business: {
      eyebrow: "Business Areas",
      headline: "Two Fields. One Global Vision.",
      contentFlow: ["Content & IP", "Market Intelligence", "Business Design", "Global Partners", "Monetization"],
      axFlow: ["Manual Tasks", "Data Connection", "AI Processing", "Automated Results", "Continuous Ops"],
      panelA: {
        badge: "Global Content Business",
        headline: "Transforming Content & IP\ninto Global Business.",
        desc: "We uncover the potential of content and IP,\nthen connect it to real global market opportunities\nthrough investment, distribution, licensing, and brand collaboration.",
        caps: ["Investment & Production", "Global Distribution", "IP Licensing", "Brand Collaboration", "Commerce & Monetization"],
        flowLabel: "Operational Flow",
        powered: "Hitpick",
      },
      panelB: {
        badge: "AX Transformation",
        headline: "Transforming Operations\ninto Intelligent Systems.",
        desc: "We analyze enterprise operations and services,\nthen build AI-powered AX environments\nthrough education, software development, and automation systems.",
        caps: ["AX Education", "AI Software Development", "Workflow Automation", "AI Agents & Workflows", "Custom Programs"],
        flowLabel: "Transformation Flow",
        delivered: "이룸터",
      },
    },
    tech: {
      eyebrow: "Technology",
      headline: "Technology Built\nfor Real Business.",
      desc: "We apply AI, data, blockchain, and software technology\nto real business operations and systems.",
      tabs: [
        { id: "ai", label: "AI & Data" },
        { id: "automation", label: "Automation" },
        { id: "blockchain", label: "Blockchain & Rights" },
        { id: "software", label: "Software Engineering" },
      ],
      pipelineLabel: "Processing Steps",
      content: {
        ai: {
          title: "Intelligence that analyzes content and markets at scale.",
          items: [
            { label: "Global Market Signals", value: "Country-level market monitoring" },
            { label: "Content Analysis", value: "Genre, Tone, Fit Scoring" },
            { label: "Audience Intelligence", value: "Cross-Platform Segmentation" },
            { label: "Brand Fit", value: "AI-Powered Match Score" },
            { label: "Business Opportunity Detection", value: "Auto-Identification System" },
            { label: "Recommendation Engine", value: "LLM-Based Output" },
          ],
          pipeline: ["Data Ingestion", "Feature Extraction", "Model Inference", "Signal Output", "Business Execution"],
        },
        automation: {
          title: "AI agent systems that replace repetitive operations.",
          items: [
            { label: "Data Sources", value: "Real-time workflow data connections" },
            { label: "AI Processing", value: "Analysis and draft generation" },
            { label: "Auto Document Gen", value: "Automated report and document drafting" },
            { label: "Report Automation", value: "Scheduled reporting workflows" },
            { label: "Automation Steps", value: "Multi-step workflow orchestration" },
            { label: "Operational Efficiency", value: "Reduced repetitive work burden" },
          ],
          pipeline: ["Trigger", "Agent Processing", "Tool Execution", "Validation", "Result Delivery"],
        },
        blockchain: {
          title: "Immutable records for IP, contracts, and revenue.",
          items: [
            { label: "IP Registry", value: "Rights asset registration system" },
            { label: "Smart Contracts", value: "Automated license execution" },
            { label: "Rights Management", value: "Role-Based Access Control" },
            { label: "Revenue Distribution", value: "Automated Settlement" },
            { label: "Settlement Cycle", value: "Monthly Automation" },
            { label: "Audit Trail", value: "On-Chain Immutable Records" },
          ],
          pipeline: ["IP Registration", "License Issuance", "Usage Tracking", "Revenue Distribution", "Settlement"],
        },
        software: {
          title: "Full-stack engineering for platforms and AI products.",
          items: [
            { label: "Web & App", value: "React, Native Mobile" },
            { label: "SaaS Architecture", value: "Multi-Tenant Platform" },
            { label: "Admin Platform", value: "Internal Operations Dashboard" },
            { label: "API Integration", value: "OTT, CRM, Fintech" },
            { label: "Infrastructure", value: "Cloud-Native, CDN" },
            { label: "Operations", value: "CI/CD, Monitoring" },
          ],
          pipeline: ["Requirements", "Architecture", "Development", "QA & Testing", "Deploy & Monitor"],
        },
      },
    },
    work: {
      eyebrow: "Our Business",
      headline: "Beyond Markets.\nReal Business.",
      viewAll: "View All Cases",
      cases: [
        { index: "01", market: "Vietnam", headline: "Connected Korean content with local production and business partners.", tags: ["Global Content", "Partnership", "Market Entry"], role: "Strategic Partner & Market Operator", tech: "Content Intelligence · Market Analysis" },
        { index: "02", market: "Korea", headline: "Built an AI-powered sentiment analysis and personalized content recommendation system.", tags: ["AI", "Data", "Software Engineering"], role: "Technology Developer", tech: "Generative AI · Sentiment Analysis · LLM" },
        { index: "03", market: "Europe", headline: "Created new distribution and commerce opportunities in global markets.", tags: ["Distribution", "Brand", "Commerce"], role: "IP Business Advisor & Operator", tech: "Rights Infrastructure · Market Intelligence" },
      ],
      labels: { market: "Market", role: "ERUTY Role", tech: "Technology Applied", category: "Category" },
      detailLink: "View Case Details",
    },
    resources: {
      eyebrow: "Resources",
      headline: "Latest from ERUTY.",
      viewAll: "All Resources",
      readMore: "Read more",
      featured: {
        category: "Partnership",
        date: "December 2024",
        title: "ERUTY Expands Southeast Asia Global Network with New Content Distribution Partnership",
        desc: "ERUTY expands its Southeast Asia content business with Vietnam and Singapore as hubs. Building new global networks through technology partnerships and IP deals.",
        region: "Vietnam · Singapore",
      },
      sideItems: [
        { category: "Technology", date: "November 2024", title: "Launched AI-Based Content Evaluation System for IP Deals", region: "Korea" },
        { category: "Insight", date: "November 2024", title: "Global OTT Content Market 2025: Korean IP Export Trends", region: "Global" },
        { category: "Program", date: "October 2024", title: "Enterprise AX Transformation Program Q1 2025 Enrollment Open", region: "Korea · Online" },
      ],
      additionalItems: [
        { category: "Project", date: "October 2024", title: "Content Distribution Partnership Agreement with German Media Group", region: "Germany" },
        { category: "Event", date: "September 2024", title: "ERUTY Participates in ContentMarket Asia 2024 Panel & Exhibition", region: "Singapore" },
        { category: "Technology", date: "September 2024", title: "Blockchain IP Registration System Deployed for Content Partner Network", region: "Korea" },
      ],
    },
    cta: {
      headline: "Build the Next Opportunity\nwith ERUTY.",
      desc: "Start your content business, global partnerships,\nAX transformation, and technology development with ERUTY.",
      btn1: "Start a Project",
      btn2: "Contact ERUTY",
    },
  },
};

/* ─── Category dot color map ──────────────────────────────────── */

/* ─── Reusable Eyebrow ─────────────────────────────────────────── */

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div
      className="text-xs tracking-widest uppercase mb-5"
      style={{ color: light ? "rgba(255,255,255,0.35)" : MUTED, fontFamily: "var(--font-mono)", letterSpacing: "0.12em" }}
    >{children}</div>
  );
}

// ── 1. 히어로 ──────────────────────────────────────────────────────────────────

function HeroSection() {
  const { lang } = useLanguage();
  const t = T[lang].hero;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
  };

  return (
    <section className="pt-[76px]" style={{ background: "#FFFFFF" }}>
      <div className="mx-auto px-8" style={{ maxWidth: 1280 }}>
        <div className="mt-7 mb-8 relative overflow-hidden" style={{ borderRadius: 6, background: "#111" }}>
          <div style={{ paddingBottom: "43.7%" }} />
          <video
            ref={videoRef}
            src={heroVideo}
            autoPlay={!prefersReduced}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full"
            style={{ objectFit: "cover" }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.18) 100%)" }}
          />
          <div
            className="absolute bottom-4 left-5"
            style={{ color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono)", letterSpacing: "0.12em", fontSize: "0.7rem" }}
          >
            {t.videoLabel}
          </div>
          <button
            onClick={togglePlay}
            className="absolute bottom-4 right-4 flex items-center justify-center"
            style={{
              width: 32, height: 32,
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "50%",
              color: "#FFFFFF",
            }}
            aria-label={playing ? t.pauseLabel : t.playLabel}
          >
            {playing ? <Pause size={12} /> : <Play size={12} />}
          </button>
        </div>

        <div className="grid grid-cols-12 gap-6 pb-16" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="col-span-12 lg:col-span-7">
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2.6rem, 4.5vw, 4.25rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                color: NEAR_BLACK,
                whiteSpace: "pre-line",
              }}
            >
              {t.headline}
            </h1>
          </div>
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-end pb-1">
            <p className="mb-7" style={{ fontSize: "1rem", lineHeight: 1.85, color: BODY_TEXT, whiteSpace: "pre-line" }}>
              {t.desc}
            </p>
            <div className="flex items-center gap-6">
              <Link
                to="/company/about"
                className="px-6 py-3 text-sm transition-all duration-200"
                style={{ background: NEAR_BLACK, color: "#FFFFFF", fontWeight: 500, borderRadius: 4 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = BLUE)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = NEAR_BLACK)}
              >
                {t.btn1}
              </Link>
              <Link
                to="/start-a-project"
                className="flex items-center gap-1.5 text-sm transition-colors duration-150"
                style={{ color: BODY_TEXT }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = BLUE)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = BODY_TEXT)}
              >
                {t.btn2} <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 2. Statement + Global Signals ─────────────────────────────────────────────

function StatementSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const metrics = lang === "ko"
    ? [
        { value: COMPANY_METRICS.globalPartners.value, label: COMPANY_METRICS.globalPartners.labelKo },
        { value: COMPANY_METRICS.creatorNetwork.value, label: COMPANY_METRICS.creatorNetwork.labelKo },
        { value: `${COMPANY_METRICS.registeredPatents.value}건`, label: COMPANY_METRICS.registeredPatents.labelKo },
        { value: `${COMPANY_METRICS.patentApplications.value}건`, label: COMPANY_METRICS.patentApplications.labelKo },
      ]
    : [
        { value: COMPANY_METRICS.globalPartners.value, label: COMPANY_METRICS.globalPartners.labelEn },
        { value: COMPANY_METRICS.creatorNetwork.value, label: COMPANY_METRICS.creatorNetwork.labelEn },
        { value: COMPANY_METRICS.registeredPatents.value, label: COMPANY_METRICS.registeredPatents.labelEn },
        { value: COMPANY_METRICS.patentApplications.value, label: COMPANY_METRICS.patentApplications.labelEn },
      ];

  return (
    <section style={{ background: "#FFFFFF" }}>
      <div className="mx-auto px-8" style={{ maxWidth: 1280 }}>
        <div className="py-20" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <Eyebrow>{t.statement.eyebrow}</Eyebrow>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1.75rem, 3vw, 2.75rem)",
              lineHeight: 1.5,
              color: NEAR_BLACK,
              maxWidth: 780,
              whiteSpace: "pre-line",
            }}
          >
            {t.statement.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="lg:col-span-2 overflow-hidden py-8" style={{ borderRight: `1px solid ${BORDER}` }}>
            <div className="text-xs mb-5 tracking-widest uppercase" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>
              {t.statement.signalsLabel}
            </div>
            <div className="overflow-hidden">
              <motion.div
                className="flex gap-0 whitespace-nowrap"
                animate={{ x: [0, -2200] }}
                transition={{ duration: 36, ease: "linear", repeat: Infinity }}
              >
                {[...t.signals, ...t.signals, ...t.signals].map((s, i) => (
                  <div key={i} className="flex items-center gap-4 flex-shrink-0" style={{ paddingRight: 32 }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: BLUE }} />
                    <span className="flex items-center gap-1.5 text-sm font-medium" style={{ color: NEAR_BLACK }}>
                      <span style={{ fontSize: "1rem", lineHeight: 1 }}>{s.flag}</span>
                      {s.country}
                    </span>
                    <span className="text-sm" style={{ color: MUTED }}>— {s.desc}</span>
                    <span style={{ color: BORDER, paddingLeft: 16, paddingRight: 16 }}>|</span>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-2">
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className="p-6"
                style={{
                  borderRight: i % 2 === 0 ? `1px solid ${BORDER}` : "none",
                  borderBottom: i < 2 ? `1px solid ${BORDER}` : "none",
                }}
              >
                <div
                  className="mb-2"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    color: NEAR_BLACK,
                    fontSize: "clamp(2rem, 3vw, 2.45rem)",
                    lineHeight: 1.1,
                  }}
                >
                  {m.value}
                </div>
                <div style={{ color: MUTED, fontFamily: "var(--font-mono)", fontSize: "0.82rem", lineHeight: 1.5 }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 3. Business Fields ─────────────────────────────────────────────────────────

function BusinessFields() {
  const { lang } = useLanguage();
  const t = T[lang].business;
  const [contentStep, setContentStep] = useState(0);
  const [axStep, setAxStep] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setContentStep((s) => (s + 1) % t.contentFlow.length), 2000);
    const t2 = setInterval(() => setAxStep((s) => (s + 1) % t.axFlow.length), 2200);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [t.contentFlow.length, t.axFlow.length]);

  return (
    <section style={{ background: SOFT_BG }}>
      <div className="mx-auto px-8 py-20" style={{ maxWidth: 1280 }}>
        <div className="mb-14">
          <Eyebrow>{t.eyebrow}</Eyebrow>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: NEAR_BLACK, lineHeight: 1.2 }}>
            {t.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Panel A */}
          <div className="relative overflow-hidden p-10 flex flex-col" style={{ background: NEAR_BLACK, minHeight: 540, borderRadius: 6 }}>
            <div className="inline-block text-xs mb-6 px-2.5 py-1 tracking-widest" style={{ color: BLUE, border: `1px solid rgba(55,55,242,0.35)`, fontFamily: "var(--font-mono)", borderRadius: 3, alignSelf: "flex-start" }}>
              {t.panelA.badge}
            </div>
            <h3 className="mb-5" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.45rem, 2vw, 1.95rem)", color: "#FFFFFF", lineHeight: 1.35, whiteSpace: "pre-line" }}>
              {t.panelA.headline}
            </h3>
            <p className="mb-8" style={{ fontSize: "clamp(0.96rem, 1.2vw, 1rem)", lineHeight: 1.78, color: "rgba(255,255,255,0.76)", maxWidth: 360, whiteSpace: "pre-line" }}>
              {t.panelA.desc}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {t.panelA.caps.map((cap) => (
                <span key={cap} className="text-xs px-3 py-1.5" style={{ border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.55)", borderRadius: 3 }}>
                  {cap}
                </span>
              ))}
            </div>
            <div className="mt-auto">
              <div className="text-xs mb-3" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>{t.panelA.flowLabel}</div>
              <div className="flex items-center gap-0 flex-wrap">
                {t.contentFlow.map((step, i) => (
                  <div key={step} className="flex items-center">
                    <span className="text-xs px-3 py-1.5 transition-all duration-500" style={{ background: contentStep === i ? BLUE : "rgba(255,255,255,0.06)", color: contentStep === i ? "#FFFFFF" : "rgba(255,255,255,0.35)", borderRadius: 3, fontFamily: "var(--font-mono)", border: contentStep === i ? `1px solid ${BLUE}` : "1px solid rgba(255,255,255,0.08)" }}>
                      {step}
                    </span>
                    {i < t.contentFlow.length - 1 && (
                      <span className="px-1.5 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-5" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>
                Powered by <span style={{ color: "rgba(255,255,255,0.55)" }}>{t.panelA.powered}</span>
              </span>
            </div>
          </div>

          {/* Panel B */}
          <div className="relative overflow-hidden p-10 flex flex-col" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}`, minHeight: 540, borderRadius: 6 }}>
            <div className="inline-block text-xs mb-6 px-2.5 py-1 tracking-widest" style={{ color: BLUE, border: `1px solid rgba(55,55,242,0.25)`, fontFamily: "var(--font-mono)", borderRadius: 3, alignSelf: "flex-start" }}>
              {t.panelB.badge}
            </div>
            <h3 className="mb-5" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.45rem, 2vw, 1.95rem)", color: NEAR_BLACK, lineHeight: 1.35, whiteSpace: "pre-line" }}>
              {t.panelB.headline}
            </h3>
            <p className="mb-8" style={{ fontSize: "clamp(0.96rem, 1.2vw, 1rem)", lineHeight: 1.78, color: BODY_TEXT, maxWidth: 360, whiteSpace: "pre-line" }}>
              {t.panelB.desc}
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {t.panelB.caps.map((cap) => (
                <span key={cap} className="text-xs px-3 py-1.5" style={{ border: `1px solid ${BORDER}`, color: MUTED, borderRadius: 3 }}>
                  {cap}
                </span>
              ))}
            </div>
            <div className="mt-auto">
              <div className="text-xs mb-3" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.panelB.flowLabel}</div>
              <div className="flex items-center gap-0 flex-wrap">
                {t.axFlow.map((step, i) => (
                  <div key={step} className="flex items-center">
                    <span className="text-xs px-3 py-1.5 transition-all duration-500" style={{ background: axStep === i ? BLUE : SOFT_BG, color: axStep === i ? "#FFFFFF" : MUTED, borderRadius: 3, fontFamily: "var(--font-mono)", border: axStep === i ? `1px solid ${BLUE}` : `1px solid ${BORDER}` }}>
                      {step}
                    </span>
                    {i < t.axFlow.length - 1 && (
                      <span className="px-1.5 text-xs" style={{ color: BORDER }}>→</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-5" style={{ borderTop: `1px solid ${BORDER}` }}>
              <span className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>
                Delivered through <span style={{ color: BODY_TEXT }}>{t.panelB.delivered}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 4. Technology Section ──────────────────────────────────────────────────────

function TechnologySection() {
  const { lang } = useLanguage();
  const t = T[lang].tech;
  const [active, setActive] = useState("ai");
  const data = t.content[active as keyof typeof t.content];

  return (
    <section style={{ background: NEAR_BLACK }}>
      <div className="mx-auto px-8 py-24" style={{ maxWidth: 1280 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-14">
          <div>
            <Eyebrow light>{t.eyebrow}</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#FFFFFF", lineHeight: 1.2, whiteSpace: "pre-line" }}>
              {t.headline}
            </h2>
          </div>
          <div className="flex items-end">
            <p style={{ fontSize: "clamp(1rem, 1.25vw, 1.04rem)", lineHeight: 1.75, color: "rgba(255,255,255,0.7)", whiteSpace: "pre-line" }}>
              {t.desc}
            </p>
          </div>
        </div>

        <div className="flex gap-0 mb-10 overflow-x-auto" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {t.tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className="px-6 py-4 text-sm whitespace-nowrap transition-all cursor-pointer"
              style={{
                color: active === tab.id ? "#FFFFFF" : "rgba(255,255,255,0.4)",
                fontWeight: active === tab.id ? 600 : 400,
                borderBottom: active === tab.id ? `2px solid ${BLUE}` : "2px solid transparent",
                marginBottom: -1,
                background: "transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active + lang}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 p-8" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4 }}>
                <div className="mb-6" style={{ color: "rgba(255,255,255,0.74)", fontSize: "1rem", lineHeight: 1.6 }}>{data.title}</div>
                <div className="flex flex-col">
                  {data.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <span style={{ color: "rgba(255,255,255,0.68)", fontSize: "0.96rem", lineHeight: 1.6 }}>{item.label}</span>
                      <span style={{ fontFamily: "var(--font-mono)", color: "#FFFFFF", fontSize: "0.96rem", lineHeight: 1.6, textAlign: "right" }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-8" style={{ background: "rgba(55,55,242,0.06)", border: "1px solid rgba(55,55,242,0.15)", borderRadius: 4 }}>
                <div className="text-xs mb-6 tracking-widest" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>{t.pipelineLabel}</div>
                <div className="flex flex-col gap-3">
                  {data.pipeline.map((step, i) => (
                    <div key={step} className="flex items-center gap-3">
                      <div className="w-5 h-5 flex items-center justify-center text-xs flex-shrink-0" style={{ background: i === 0 ? BLUE : "rgba(255,255,255,0.06)", color: i === 0 ? "#FFF" : "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)", borderRadius: 2 }}>
                        {i + 1}
                      </div>
                        <div className="flex-1 px-3 py-2" style={{ background: i === 0 ? "rgba(55,55,242,0.15)" : "rgba(255,255,255,0.04)", border: `1px solid ${i === 0 ? "rgba(55,55,242,0.4)" : "rgba(255,255,255,0.06)"}`, color: i === 0 ? "#FFFFFF" : "rgba(255,255,255,0.6)", fontFamily: "var(--font-mono)", borderRadius: 3, fontSize: "0.8rem", lineHeight: 1.55 }}>
                          {step}
                        </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

// ── 5. Global Work ─────────────────────────────────────────────────────────────

function GlobalWork() {
  const { lang } = useLanguage();
  const t = T[lang].work;
  const [active, setActive] = useState(0);
  const c = t.cases[active];

  return (
    <section style={{ background: "#FFFFFF" }}>
      <div className="mx-auto px-8 py-24" style={{ maxWidth: 1280 }}>
        <div className="flex items-end justify-between mb-14">
          <div>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: NEAR_BLACK, lineHeight: 1.2, whiteSpace: "pre-line" }}>
              {t.headline}
            </h2>
          </div>
          <Link
            to="/resources"
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: MUTED }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = BLUE)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = MUTED)}
          >
            {t.viewAll} <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-4 flex flex-col gap-px" style={{ borderRight: `1px solid ${BORDER}` }}>
            {t.cases.map((cas, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="text-left p-6 transition-all duration-150 cursor-pointer"
                style={{ borderLeft: active === i ? `3px solid ${BLUE}` : "3px solid transparent", background: active === i ? SOFT_BG : "transparent" }}
              >
                <div className="text-xs mb-2" style={{ color: active === i ? BLUE : MUTED, fontFamily: "var(--font-mono)" }}>
                  {cas.index} / {cas.market}
                </div>
                <div className="text-sm leading-snug" style={{ color: active === i ? NEAR_BLACK : BODY_TEXT, fontWeight: active === i ? 500 : 400 }}>
                  {cas.headline}
                </div>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active + lang}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="lg:col-span-8 p-10"
              style={{ background: SOFT_BG, borderRadius: 4 }}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                {c.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}`, color: BODY_TEXT, borderRadius: 3 }}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-10" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.3rem, 2vw, 1.75rem)", color: NEAR_BLACK, lineHeight: 1.4 }}>
                {c.headline}
              </h3>
              <div className="grid grid-cols-2 gap-6 mb-8">
                {[
                  { label: t.labels.market, value: c.market },
                  { label: t.labels.role, value: c.role },
                  { label: t.labels.tech, value: c.tech },
                  { label: t.labels.category, value: c.tags.join(" · ") },
                ].map((row) => (
                  <div key={row.label}>
                    <div className="text-xs mb-1" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{row.label.toUpperCase()}</div>
                    <div className="text-sm" style={{ color: BODY_TEXT }}>{row.value}</div>
                  </div>
                ))}
              </div>
              <Link to="/resources" className="inline-flex items-center gap-2 text-sm transition-colors" style={{ color: BLUE, fontWeight: 500 }}>
                {t.detailLink} <ChevronRight size={14} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ── 6. Latest Resources ────────────────────────────────────────────────────────

function LatestResources() {
  const { lang } = useLanguage();
  const t = T[lang].resources;
  const emptyState = lang === "ko"
    ? "공개 가능한 자료를 정리하고 있습니다."
    : "Public materials are being prepared.";

  return (
    <section style={{ background: SOFT_BG }}>
      <div className="mx-auto px-8 py-24" style={{ maxWidth: 1280 }}>
        <div className="flex items-end justify-between mb-14">
          <div>
            <Eyebrow>{t.eyebrow}</Eyebrow>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: NEAR_BLACK }}>
              {t.headline}
            </h2>
          </div>
          <Link
            to="/resources"
            className="flex items-center gap-1.5 text-sm transition-colors"
            style={{ color: MUTED }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = BLUE)}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = MUTED)}
          >
            {t.viewAll} <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-12 p-10" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}`, borderRadius: 4 }}>
            <div className="text-xs mb-4" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.eyebrow}</div>
            <p style={{ color: BODY_TEXT, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.05rem, 1.8vw, 1.25rem)", lineHeight: 1.7 }}>
              {emptyState}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 7. Final CTA ───────────────────────────────────────────────────────────────

function FinalCTA() {
  const { lang } = useLanguage();
  const t = T[lang].cta;

  return (
    <section style={{ background: NEAR_BLACK }}>
      <div className="mx-auto px-8 py-32" style={{ maxWidth: 1280 }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.25rem, 4vw, 3.75rem)", color: "#FFFFFF", lineHeight: 1.15, letterSpacing: "-0.02em", whiteSpace: "pre-line" }}
            >
              {t.headline}
            </h2>
          </div>
          <div>
            <p className="mb-10 text-base" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.85, whiteSpace: "pre-line" }}>
              {t.desc}
            </p>
            <div className="flex items-center gap-5">
              <Link
                to="/start-a-project"
                className="px-7 py-3.5 text-sm transition-all duration-200"
                style={{ background: BLUE, color: "#FFFFFF", fontWeight: 500, borderRadius: 4 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#2828d4")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = BLUE)}
              >
                {t.btn1}
              </Link>
              <Link
                to="/start-a-project"
                className="flex items-center gap-1.5 text-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FFFFFF")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
              >
                {t.btn2} <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <HeroSection />
      <StatementSection />
      <BusinessFields />
      <TechnologySection />
      <GlobalWork />
      <LatestResources />
      <FinalCTA />
    </>
  );
}
