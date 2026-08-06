import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowUpRight  } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import heroVideo from "../../assets/video/eruty-hero.mp4";
import { COMPANY_METRICS } from "../data/companyMetrics";
import { SectionHeading } from "../components/SectionHeading";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BODY_TEXT = "#333438";
const MUTED = "#737780";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F5F6F8";

/* ─── Translations ──────────────────────────────────────────────── */

const T = {
  ko: {
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
      headline: "브랜드는 더 넓은 시장으로,\n기업은 더 나은 업무 방식으로.",
      contentFlow: ["브랜드 발굴", "시장 검증", "판매·수출", "성장 확장"],
      axFlow: ["업무 분석", "AI 적용", "자동화 구축", "지속 운영"],
      panelA: {
        badge: "GLOBAL BUSINESS",
        service: "Hitpick",
        headline: "브랜드를 발굴하고, 글로벌 시장에서\n판매와 수출을 실행합니다.",
        desc: "데이터 기반 시장 검증부터 크리에이터 마케팅,\n커머스와 수출 운영까지 하나의 흐름으로 연결합니다.",
        features: ["시장 검증", "크리에이터 마케팅", "글로벌 판매·수출"],
        flowLabel: "실행 흐름",
        cta: "Hitpick 자세히 보기",
        href: "/services/hitpick",
      },
      panelB: {
        badge: "AX TRANSFORMATION",
        service: "이룸터",
        headline: "기업의 반복 업무를\n운영 가능한 AX 시스템으로 전환합니다.",
        desc: "업무 분석부터 AI 소프트웨어와 자동화 워크플로 구축,\n운영 최적화까지 실제 현장에 적용합니다.",
        features: ["AX 전략·교육", "AI 소프트웨어", "업무 자동화"],
        flowLabel: "전환 흐름",
        cta: "이룸터 자세히 보기",
        href: "/services/erumter",
      },
    },
    tech: {
      headline: "글로벌 사업과 AX 전환을\n움직이는 기술.",
      desc: "이루티는 시장과 운영 데이터를 분석하고,\n자동화와 제품 엔지니어링을 통해\n실제 실행 시스템을 구축합니다.",
      cta: "기술 역량 자세히 보기",
      href: "/technology",
      cards: [
        {
          number: "01",
          title: "AI & 데이터 인텔리전스",
          desc: "시장·소비·콘텐츠를 분석해\n사업 판단을 지원합니다.",
          keywords: "MARKET · CONSUMER · CONTENT",
        },
        {
          number: "02",
          title: "AX 자동화",
          desc: "반복 업무와 운영 흐름을\n자동화 시스템으로 전환합니다.",
          keywords: "WORKFLOW · AGENT · AUTOMATION",
        },
        {
          number: "03",
          title: "블록체인 신뢰 레이어",
          desc: "계약·증빙·정산 과정을\n신뢰 가능한 기록으로 연결합니다.",
          keywords: "CONTRACT · RECORD · SETTLEMENT",
        },
        {
          number: "04",
          title: "제품 엔지니어링",
          desc: "웹·앱·SaaS 등 운영에 필요한\n제품과 시스템을 구현합니다.",
          keywords: "WEB · APP · SAAS · OPS",
        },
      ],
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
      headline: "비즈니스의 다음 성장을 함께 만듭니다.",
      desc: "글로벌 확장부터 AI 기반 업무 혁신까지.\n귀사의 목표에 맞는 최적의 솔루션을 제안합니다.",
      button: "문의하기",
    },
  },
  en: {
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
      headline: "Taking Brands to Wider Markets.\nTransforming How Enterprises Work.",
      contentFlow: ["Brand Discovery", "Market Validation", "Demand Creation", "Sales & Export", "Growth Expansion"],
      axFlow: ["Workflow Analysis", "AI Integration", "Automation Build", "Continuous Operation"],
      panelA: {
        badge: "GLOBAL BUSINESS",
        service: "Hitpick",
        headline: "We discover brands\nand execute global sales and export operations.",
        desc: "From data-driven market validation to creator marketing,\ncommerce, and export operations, we connect the full execution flow.",
        features: ["Market Validation", "Creator Marketing", "Global Sales & Export"],
        flowLabel: "Execution Flow",
        cta: "Explore Hitpick",
        href: "/services/hitpick",
      },
      panelB: {
        badge: "AX TRANSFORMATION",
        service: "Erumter",
        headline: "We transform repetitive operations\ninto production-ready AX systems.",
        desc: "From workflow analysis to AI software, automation workflows,\nand operational optimization, we build systems for real operations.",
        features: ["AX Strategy & Education", "AI Software", "Workflow Automation"],
        flowLabel: "Transformation Flow",
        cta: "Explore Erumter",
        href: "/services/erumter",
      },
    },
    tech: {
      headline: "Technology that Powers\nGlobal Business and AX Transformation.",
      desc: "ERUTY analyzes market and operational data,\nand builds execution systems through automation\nand product engineering.",
      cta: "Explore Technology",
      href: "/technology",
      cards: [
        {
          number: "01",
          title: "AI & Data Intelligence",
          desc: "We analyze market, consumer, and content signals\nto support business decisions.",
          keywords: "MARKET · CONSUMER · CONTENT",
        },
        {
          number: "02",
          title: "AX Automation",
          desc: "We turn repetitive workflows and operations\ninto executable automation systems.",
          keywords: "WORKFLOW · AGENT · AUTOMATION",
        },
        {
          number: "03",
          title: "Blockchain Trust Layer",
          desc: "We build trusted record infrastructure\nfor contracts, proof, and settlement.",
          keywords: "CONTRACT · RECORD · SETTLEMENT",
        },
        {
          number: "04",
          title: "Product Engineering",
          desc: "We build the systems required for\nweb, app, SaaS, and real operations.",
          keywords: "WEB · APP · SAAS · OPS",
        },
      ],
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
      headline: "Build Your Next Stage of Growth with ERUTY.",
      desc: "From global expansion to AI-powered operational innovation,\nwe propose the right solution for your goals.",
      button: "Contact Us",
    },
  },
};

/* ─── Category dot color map ──────────────────────────────────── */

/* ─── Reusable Eyebrow ─────────────────────────────────────────── */

type CountryCode = "US" | "DE" | "JP" | "SG" | "VN" | "AE" | "IN";

function CountryFlag({
  code,
  className,
  title,
}: {
  code: CountryCode;
  className?: string;
  title?: string;
}) {
  const commonProps = {
    viewBox: "0 0 24 16",
    className,
    role: title ? "img" : "presentation",
    "aria-hidden": title ? undefined : true,
    "aria-label": title,
    preserveAspectRatio: "xMidYMid meet",
  } as const;

  const frame = <rect x="0.5" y="0.5" width="23" height="15" rx="2" fill="#FFFFFF" stroke="#D6DAE0" />;

  switch (code) {
    case "US":
      return (
        <svg {...commonProps}>
          {title ? <title>{title}</title> : null}
          {frame}
          <g clipPath="url(#flag-us-clip)">
            <rect width="24" height="16" fill="#FFFFFF" />
            {Array.from({ length: 7 }).map((_, index) => (
              <rect key={index} y={index * 2.28} width="24" height="1.14" fill="#B22234" />
            ))}
            <rect width="10.4" height="8.4" fill="#3C3B6E" />
            {[
              [2, 2],
              [5, 2],
              [8, 2],
              [3.5, 4.2],
              [6.5, 4.2],
              [2, 6.4],
              [5, 6.4],
              [8, 6.4],
            ].map(([cx, cy], index) => (
              <circle key={index} cx={cx} cy={cy} r="0.45" fill="#FFFFFF" />
            ))}
          </g>
          <defs>
            <clipPath id="flag-us-clip">
              <rect x="0.5" y="0.5" width="23" height="15" rx="2" />
            </clipPath>
          </defs>
        </svg>
      );
    case "DE":
      return (
        <svg {...commonProps}>
          {title ? <title>{title}</title> : null}
          {frame}
          <g clipPath="url(#flag-de-clip)">
            <rect width="24" height="16" fill="#000000" />
            <rect y="5.333" width="24" height="5.334" fill="#DD0000" />
            <rect y="10.666" width="24" height="5.334" fill="#FFCE00" />
          </g>
          <defs>
            <clipPath id="flag-de-clip">
              <rect x="0.5" y="0.5" width="23" height="15" rx="2" />
            </clipPath>
          </defs>
        </svg>
      );
    case "JP":
      return (
        <svg {...commonProps}>
          {title ? <title>{title}</title> : null}
          {frame}
          <circle cx="12" cy="8" r="4.1" fill="#BC002D" />
        </svg>
      );
    case "SG":
      return (
        <svg {...commonProps}>
          {title ? <title>{title}</title> : null}
          {frame}
          <g clipPath="url(#flag-sg-clip)">
            <rect width="24" height="8" fill="#EF3340" />
            <rect y="8" width="24" height="8" fill="#FFFFFF" />
            <circle cx="6.2" cy="4.4" r="2.5" fill="#FFFFFF" />
            <circle cx="7.1" cy="4.4" r="2" fill="#EF3340" />
            {[
              [8.6, 2.4],
              [9.4, 3.6],
              [9.2, 5],
              [8, 5.8],
              [6.7, 5.3],
            ].map(([cx, cy], index) => (
              <circle key={index} cx={cx} cy={cy} r="0.42" fill="#FFFFFF" />
            ))}
          </g>
          <defs>
            <clipPath id="flag-sg-clip">
              <rect x="0.5" y="0.5" width="23" height="15" rx="2" />
            </clipPath>
          </defs>
        </svg>
      );
    case "VN":
      return (
        <svg {...commonProps}>
          {title ? <title>{title}</title> : null}
          {frame}
          <g clipPath="url(#flag-vn-clip)">
            <rect width="24" height="16" fill="#DA251D" />
            <path
              d="M12 3.1 13.7 7.2 18.1 7.4 14.6 10.1 15.8 14.2 12 11.7 8.2 14.2 9.4 10.1 5.9 7.4 10.3 7.2Z"
              fill="#FFDD00"
            />
          </g>
          <defs>
            <clipPath id="flag-vn-clip">
              <rect x="0.5" y="0.5" width="23" height="15" rx="2" />
            </clipPath>
          </defs>
        </svg>
      );
    case "AE":
      return (
        <svg {...commonProps}>
          {title ? <title>{title}</title> : null}
          {frame}
          <g clipPath="url(#flag-ae-clip)">
            <rect width="24" height="16" fill="#FFFFFF" />
            <rect width="6" height="16" fill="#FF0000" />
            <rect x="6" width="18" height="5.333" fill="#00732F" />
            <rect x="6" y="10.666" width="18" height="5.334" fill="#000000" />
          </g>
          <defs>
            <clipPath id="flag-ae-clip">
              <rect x="0.5" y="0.5" width="23" height="15" rx="2" />
            </clipPath>
          </defs>
        </svg>
      );
    case "IN":
      return (
        <svg {...commonProps}>
          {title ? <title>{title}</title> : null}
          {frame}
          <g clipPath="url(#flag-in-clip)">
            <rect width="24" height="16" fill="#FFFFFF" />
            <rect width="24" height="5.333" fill="#FF9933" />
            <rect y="10.666" width="24" height="5.334" fill="#138808" />
            <circle cx="12" cy="8" r="2.2" fill="none" stroke="#1A5FB4" strokeWidth="0.7" />
            {Array.from({ length: 12 }).map((_, index) => {
              const angle = (index * Math.PI) / 6;
              const x = 12 + Math.cos(angle) * 2.2;
              const y = 8 + Math.sin(angle) * 2.2;

              return <line key={index} x1="12" y1="8" x2={x} y2={y} stroke="#1A5FB4" strokeWidth="0.45" />;
            })}
            <circle cx="12" cy="8" r="0.45" fill="#1A5FB4" />
          </g>
          <defs>
            <clipPath id="flag-in-clip">
              <rect x="0.5" y="0.5" width="23" height="15" rx="2" />
            </clipPath>
          </defs>
        </svg>
      );
  }
}

const HOME_ACTIVITY_UI = {
  ko: {
    headline: "가능성을 연결해,\n글로벌 비즈니스를 만듭니다.",
    activityTitle: "글로벌 활동 현황",
    networkBadgeLabel: "GLOBAL NETWORK",
    placeholderLabel: "대표 이미지",
    previousLabel: "이전 국가 보기",
    nextLabel: "다음 국가 보기",
    partnerLabel: "글로벌 파트너 네트워크",
    partnerNote: "기술 · 유통 · 콘텐츠 · 비즈니스 파트너",
    creatorLabel: "크리에이터 네트워크",
    creatorNote: "국내외 콘텐츠 · 마케팅 협업 네트워크",
  },
  en: {
    headline: "Connecting Possibilities,\nBuilding Global Business.",
    activityTitle: "Global Activity",
    networkBadgeLabel: "GLOBAL NETWORK",
    placeholderLabel: "Representative Image",
    previousLabel: "Previous country",
    nextLabel: "Next country",
    partnerLabel: "Global Partner Network",
    partnerNote: "Technology · Distribution · Content · Business Partners",
    creatorLabel: "Creator Network",
    creatorNote: "Domestic & Global Content · Marketing Collaboration",
  },
} as const;

const HOME_ACTIVITY_SLIDES = [
  {
    code: "US",
    nameKo: "미국",
    nameEn: "United States",
    activityEn: "Commerce & Strategic Partnerships",
    activityKo: "글로벌 비즈니스 및 전략 파트너 네트워크",
    image: "/images/home/global-activity/us-representative.png",
    isPlaceholder: true,
  },
  {
    code: "DE",
    nameKo: "독일",
    nameEn: "Germany",
    activityEn: "Distribution & Commerce Network",
    activityKo: "유럽 유통·커머스 파트너 네트워크",
    image: "/images/home/global-activity/de-representative.png",
    isPlaceholder: true,
  },
  {
    code: "JP",
    nameKo: "일본",
    nameEn: "Japan",
    activityEn: "Market Expansion Network",
    activityKo: "현지 시장 및 비즈니스 파트너 네트워크",
    image: "/images/home/global-activity/jp-representative.png",
    isPlaceholder: true,
  },
  {
    code: "SG",
    nameKo: "싱가포르",
    nameEn: "Singapore",
    activityEn: "Technology & Investment Network",
    activityKo: "기술·투자 및 비즈니스 파트너 네트워크",
    image: "/images/home/global-activity/sg-representative.png",
    isPlaceholder: true,
  },
  {
    code: "VN",
    nameKo: "베트남",
    nameEn: "Vietnam",
    activityEn: "Content & Technology Partnership",
    activityKo: "콘텐츠·기술 및 현지 파트너 네트워크",
    image: "/images/home/global-activity/vn-representative.png",
    isPlaceholder: true,
  },
  {
    code: "AE",
    nameKo: "UAE",
    nameEn: "UAE",
    activityEn: "Global Business Collaboration",
    activityKo: "중동 글로벌 비즈니스 협력 네트워크",
    image: "/images/home/global-activity/ae-representative.png",
    isPlaceholder: true,
  },
  {
    code: "IN",
    nameKo: "인도",
    nameEn: "India",
    activityEn: "Global Network Development",
    activityKo: "글로벌 시장 및 파트너 네트워크",
    image: "/images/home/global-activity/in-representative.png",
    isPlaceholder: true,
  },
] as const;

const HOME_ACTIVITY_DEFAULT_INDEX = 0;

// ── 1. 히어로 ──────────────────────────────────────────────────────────────────

function HeroSection() {
  const prefersReduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section style={{ background: "#FFFFFF" }}>
      <div className="eruty-container pb-4 lg:pb-5">
        <div
          className="relative mt-7 overflow-hidden"
          style={{
            borderRadius: 8,
            background: "#111",
            boxShadow: "0 18px 44px rgba(24,25,27,0.1)",
          }}
        >
          <div style={{ paddingBottom: "43.7%" }} />
          <video
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
        </div>

      </div>
    </section>
  );
}

// ── 2. Global Activity ────────────────────────────────────────────────────────

function GlobalActivitySection() {
  const { lang } = useLanguage();
  const ui = HOME_ACTIVITY_UI[lang];
  const [activeIndex, setActiveIndex] = useState(HOME_ACTIVITY_DEFAULT_INDEX);
  const [isPointerPaused, setIsPointerPaused] = useState(false);
  const [isFocusPaused, setIsFocusPaused] = useState(false);
  const [cycleNonce, setCycleNonce] = useState(0);
  const chipListRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const totalSlides = HOME_ACTIVITY_SLIDES.length;
  const activeSlide = HOME_ACTIVITY_SLIDES[activeIndex];
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const metrics = [
    {
      value: COMPANY_METRICS.globalPartners.value,
      label: ui.partnerLabel,
      note: ui.partnerNote,
    },
    {
      value: COMPANY_METRICS.creatorNetwork.value,
      label: ui.creatorLabel,
      note: ui.creatorNote,
    },
  ];
  const isAutoPaused = isPointerPaused || isFocusPaused;

  useEffect(() => {
    if (prefersReducedMotion || isAutoPaused) return undefined;

    const cycleTimer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalSlides);
    }, 5000);

    return () => window.clearInterval(cycleTimer);
  }, [cycleNonce, isAutoPaused, prefersReducedMotion, totalSlides]);

  useEffect(() => {
    const chipList = chipListRef.current;
    const activeChip = chipRefs.current[activeIndex];

    if (!chipList || !activeChip) return;

    const listRect = chipList.getBoundingClientRect();
    const chipRect = activeChip.getBoundingClientRect();
    const targetLeft =
      chipList.scrollLeft +
      chipRect.left -
      listRect.left -
      (chipList.clientWidth - chipRect.width) / 2;

    chipList.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [activeIndex, prefersReducedMotion]);

  const restartCycle = () => {
    setCycleNonce((current) => current + 1);
  };

  const selectSlide = (index: number) => {
    setActiveIndex(index);
    restartCycle();
  };

  // const moveSlide = (direction: -1 | 1) => {
  //   setActiveIndex((current) => (current + direction + totalSlides) % totalSlides);
  //   restartCycle();
  // };

  const handleBlurCapture = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsFocusPaused(false);
    }
  };

  return (
    <section
      style={{
        background: "#F6F7FA",
      }}
    >
      <div className="mx-auto px-8" style={{ maxWidth: 1280 }}>
        <div className="pb-14 pt-5 lg:pb-16 lg:pt-6" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(300px,0.72fr)] xl:grid-rows-[auto_auto_85px] xl:gap-x-6 xl:gap-y-0">
            <div
              className="xl:contents"
              onMouseEnter={() => setIsPointerPaused(true)}
              onMouseLeave={() => setIsPointerPaused(false)}
              onFocusCapture={() => setIsFocusPaused(true)}
              onBlurCapture={handleBlurCapture}
            >
              <div className="pb-9 lg:pb-12 xl:col-start-1 xl:row-start-1">
                <div className="mb-3 flex items-center gap-4 lg:mb-4">
                  <span
                    style={{
                      color: BLUE,
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.91rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {ui.activityTitle}
                  </span>
                  <span
                    aria-hidden="true"
                    className="h-px flex-1"
                    style={{ background: "rgba(55,55,242,0.18)" }}
                  />
                </div>
                <h1
                  className="eruty-home-display eruty-preline-desktop eruty-keep-all"
                  style={{ color: NEAR_BLACK, maxWidth: 900, letterSpacing: "-0.025em" }}
                >
                  {ui.headline}
                </h1>
              </div>

              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={activeSlide.code}
                  className="xl:col-start-1 xl:row-start-2"
                  initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                  animate={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                  exit={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.38, ease: "easeOut" }}
                >
                  <div
                    className="relative aspect-[16/10] overflow-hidden border border-border sm:aspect-[16/9] xl:aspect-[16/7] xl:min-h-[340px] xl:max-h-[390px]"
                    style={{
                      borderRadius: 8,
                      boxShadow: "0 10px 22px rgba(24,25,27,0.04)",
                    }}
                  >
                    <img
                      src={activeSlide.image}
                      alt={
                        lang === "ko"
                          ? `${activeSlide.nameKo} 글로벌 네트워크 대표 이미지`
                          : `Representative image for ${activeSlide.nameEn} global network`
                      }
                      className="absolute inset-0 h-full w-full"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(10,10,12,0) 40%, rgba(10,10,12,0.68) 100%), linear-gradient(90deg, rgba(10,10,12,0.38) 0%, rgba(10,10,12,0.12) 44%, rgba(10,10,12,0) 100%)",
                      }}
                    />

                    {/* {activeSlide.isPlaceholder ? (
                      <div
                        className="absolute right-4 top-4 px-2.5 py-1"
                        style={{
                          borderRadius: 999,
                          border: "1px solid rgba(255,255,255,0.16)",
                          background: "rgba(12,13,16,0.22)",
                          color: "rgba(255,255,255,0.82)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.91rem",
                          letterSpacing: "0.05em",
                          backdropFilter: "blur(8px)",
                        }}
                      >
                        {ui.placeholderLabel}
                      </div>
                    ) : null} */}

                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 xl:p-8">
                      {/* <div
                        className="inline-flex items-center gap-2 px-3 py-1.5"
                        style={{
                          borderRadius: 999,
                          border: "1px solid rgba(255,255,255,0.18)",
                          background: "rgba(12,13,16,0.22)",
                          backdropFilter: "blur(10px)",
                          color: "rgba(255,255,255,0.82)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.936rem",
                          letterSpacing: "0.08em",
                        }}
                      >
                        <CountryFlag code={activeSlide.code} className="h-4 w-6" />
                        {activeSlide.code} · {ui.networkBadgeLabel}
                      </div> */}

                      <div className="mt-5 pr-20">
                        <div
                          className="eruty-keep-all"
                          style={{
                            fontFamily: "var(--font-display)",
                            fontWeight: 800,
                            fontSize: "clamp(2.15rem, 4vw, 3.2rem)",
                            lineHeight: 1.02,
                            letterSpacing: "-0.04em",
                            color: "#FFFFFF",
                          }}
                        >
                          {lang === "ko" ? activeSlide.nameKo : activeSlide.nameEn}
                        </div>
                        <div
                          className="eruty-keep-all mt-2"
                          style={{
                            fontFamily: "var(--font-body)",
                            fontWeight: 600,
                            fontSize: "clamp(1.3rem, 1.25vw, 1.534rem)",
                            lineHeight: 1.35,
                            color: "rgba(255,255,255,0.88)",
                            wordBreak: "keep-all",
                            overflowWrap: "normal",
                          }}
                        >
                          {lang === "ko" ? activeSlide.activityKo : activeSlide.activityEn}
                        </div>
                      </div>

                      <div className="absolute bottom-6 right-6 flex items-center gap-2">
                        {HOME_ACTIVITY_SLIDES.map((slide, index) => (
                          <span
                            key={slide.code}
                            aria-hidden="true"
                            className="block rounded-full"
                            style={{
                              width: index === activeIndex ? 18 : 7,
                              height: 7,
                              background: index === activeIndex ? BLUE : "rgba(255,255,255,0.34)",
                              transition: "all 180ms ease",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div
                ref={chipListRef}
                className="eruty-horizontal-scroll mt-8 flex gap-3 overflow-x-auto pb-1 xl:col-start-1 xl:row-start-3 xl:mt-[5px] xl:grid xl:h-20 xl:grid-cols-7 xl:overflow-visible xl:pb-0"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {HOME_ACTIVITY_SLIDES.map((slide, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={slide.code}
                      ref={(element) => {
                        chipRefs.current[index] = element;
                      }}
                      type="button"
                      onClick={() => selectSlide(index)}
                      aria-pressed={isActive}
                      aria-label={
                        lang === "ko"
                          ? `${slide.nameKo} 활동 보기`
                          : `View ${slide.nameEn} activity`
                      }
                      className="eruty-activity-chip eruty-keep-all min-w-[132px] shrink-0 cursor-pointer text-left transition-all duration-200 xl:min-w-0 xl:shrink xl:whitespace-nowrap"
                      style={{
                        minHeight: 80,
                        padding: "0.85rem 0.9rem",
                        borderRadius: 8,
                        border: isActive ? `1px solid ${BLUE}` : `1px solid ${BORDER}`,
                        background: isActive ? "rgba(55,55,242,0.06)" : "#FFFFFF",
                        boxShadow: isActive ? "0 8px 18px rgba(55,55,242,0.06)" : "none",
                      }}
                    >
                      <span className="mb-2 flex items-center gap-2">
                        <CountryFlag code={slide.code} className="h-4 w-6" />
                        <span
                          style={{
                            color: isActive ? BLUE : MUTED,
                            fontFamily: "var(--font-mono)",
                            fontSize: "1.04rem",
                            letterSpacing: "0.08em",
                          }}
                        >
                          {slide.code}
                        </span>
                      </span>
                      <span
                        className="block whitespace-nowrap"
                        style={{
                          color: isActive ? NEAR_BLACK : BODY_TEXT,
                          fontSize: "1.092rem",
                          lineHeight: 1.45,
                          fontFamily: "var(--font-body)",
                          fontWeight: 600,
                          wordBreak: "keep-all",
                          overflowWrap: "normal",
                        }}
                      >
                        {lang === "ko" ? slide.nameKo : slide.nameEn}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="xl:col-start-2 xl:row-span-2 xl:row-start-2 xl:h-full">
              <div className="grid grid-cols-2 gap-2 sm:gap-4 xl:h-full xl:grid-cols-1 xl:grid-rows-2">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="min-h-[208px] min-w-0 p-4 sm:min-h-[236px] sm:p-6 xl:min-h-0 xl:p-6"
                    style={{
                      borderRadius: 8,
                      border: `1px solid ${BORDER}`,
                      background: "#FFFFFF",
                      boxShadow: "0 8px 18px rgba(24,25,27,0.03)",
                    }}
                  >
                    <div className="mb-3 flex items-start gap-2 sm:mb-6 sm:gap-3 xl:mb-4">
                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-10 sm:w-10"
                        style={{
                          border: "1px solid rgba(55,55,242,0.18)",
                          background: "rgba(55,55,242,0.04)",
                        }}
                      >
                        <span className="h-1.5 w-1.5 rounded-full" style={{ background: BLUE }} />
                      </div>
                      <div className="mt-4 h-px flex-1 sm:mt-5" style={{ background: BORDER }} />
                    </div>

                    <div
                      className="eruty-metric-value"
                      style={{
                        color: BLUE,
                        fontSize: "clamp(2.5rem, 5vw, 3.7rem)",
                        lineHeight: 0.95,
                      }}
                    >
                      {metric.value}
                    </div>
                    <div
                      className="eruty-card-title eruty-keep-all mt-4 xl:mt-3"
                      style={{
                        color: NEAR_BLACK,
                        fontSize: "clamp(1.15rem, 1.35vw, 1.45rem)",
                        lineHeight: 1.25,
                      }}
                    >
                      {metric.label}
                    </div>
                    <p
                      className="eruty-body-small eruty-keep-all mt-2.5 xl:mt-2"
                      style={{
                        maxWidth: 320,
                        color: BODY_TEXT,
                        fontSize: "clamp(0.92rem, 1.15vw, 1.04rem)",
                        lineHeight: 1.45,
                      }}
                    >
                      {metric.note}
                    </p>
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

// ── 3. Business Fields ─────────────────────────────────────────────────────────

function BusinessFields() {
  const { lang } = useLanguage();
  const t = T[lang].business;
  const [hoveredPanel, setHoveredPanel] = useState<"panelA" | "panelB" | null>(null);
  const [focusedPanel, setFocusedPanel] = useState<"panelA" | "panelB" | null>(null);
  const isPanelADark = hoveredPanel === "panelA" || focusedPanel === "panelA";
  const isPanelBDark = hoveredPanel === "panelB" || focusedPanel === "panelB";

  const renderDesktopFlow = (steps: string[], dark: boolean) => (
    <div className="hidden xl:grid gap-2.5" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
      {steps.map((step, i) => (
          <div key={step} className="relative min-w-0">
            {i < steps.length - 1 && (
              <span
                className="pointer-events-none absolute -right-[0.95rem] top-1/2 z-10 -translate-y-1/2 text-xs"
                style={{ color: dark ? "rgba(255,255,255,0.24)" : MUTED }}
              >
                →
              </span>
            )}
            <div
              className="h-full rounded-[6px] border px-3 py-3.5"
              style={{
                background: dark ? "rgba(255,255,255,0.08)" : SOFT_BG,
                borderColor: dark ? "rgba(255,255,255,0.12)" : BORDER,
                color: dark ? "rgba(255,255,255,0.84)" : BODY_TEXT,
              }}
            >
              <div
                className="mb-2 text-[11px]"
                style={{
                  fontFamily: "var(--font-mono)",
                  color: dark ? "rgba(255,255,255,0.42)" : MUTED,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontSize: "1.092rem", lineHeight: 1.45, fontWeight: 600, wordBreak: "keep-all", overflowWrap: "normal" }}>
                {step}
              </div>
            </div>
          </div>
      ))}
    </div>
  );

  const renderMobileFlow = (steps: string[], dark: boolean) => (
    <div className="grid grid-cols-2 gap-2 xl:hidden">
      {steps.map((step, i) => (
          <div
            key={step}
            className="flex min-w-0 items-center gap-2 rounded-[6px] border px-2.5 py-2.5"
            style={{
              background: dark ? "rgba(255,255,255,0.06)" : SOFT_BG,
              borderColor: dark ? "rgba(255,255,255,0.1)" : BORDER,
              color: dark ? "rgba(255,255,255,0.86)" : BODY_TEXT,
            }}
          >
            <span
              className="shrink-0 text-[11px]"
              style={{
                fontFamily: "var(--font-mono)",
                color: dark ? "rgba(255,255,255,0.42)" : MUTED,
              }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span style={{ fontSize: "1.092rem", lineHeight: 1.4, fontWeight: 600, wordBreak: "keep-all", overflowWrap: "normal" }}>
              {step}
            </span>
          </div>
      ))}
    </div>
  );

  return (
    <section className="eruty-section" style={{ background: SOFT_BG }}>
      <div className="mx-auto px-6 sm:px-8" style={{ maxWidth: 1280 }}>
        <SectionHeading eyebrow={t.eyebrow} title={t.headline} align="center" lang={lang} />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-6">
          {/* Panel A */}
          <div
            className="relative flex flex-col overflow-hidden rounded-[6px] border p-5 sm:p-8 xl:min-h-[540px] xl:p-10"
            style={{
              background: isPanelADark ? NEAR_BLACK : "#FFFFFF",
              borderColor: isPanelADark ? NEAR_BLACK : BORDER,
            }}
            onMouseEnter={() => setHoveredPanel("panelA")}
            onMouseLeave={() => setHoveredPanel(null)}
            onFocusCapture={() => setFocusedPanel("panelA")}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setFocusedPanel(null);
              }
            }}
          >
            <div className="eruty-meta eruty-meta--code mb-3" style={{ color: BLUE, alignSelf: "flex-start" }}>
              {t.panelA.badge}
            </div>
            <div className="mb-3 sm:mb-5" style={{ color: isPanelADark ? "#FFFFFF" : NEAR_BLACK, fontSize: "clamp(1.4625rem, 1.35vw, 1.7875rem)", fontWeight: 700 }}>
              {t.panelA.service}
            </div>
            <h3
              className="eruty-subsection-title eruty-preline-desktop"
              style={{
                color: isPanelADark ? "#FFFFFF" : NEAR_BLACK,
                maxWidth: 520,
              }}
            >
              {t.panelA.headline}
            </h3>
            {/* <p
              className="eruty-body mb-6"
              style={{
                color: "rgba(255,255,255,0.82)",
                maxWidth: 540,
                whiteSpace: "pre-line",
              }}
            >
              {t.panelA.desc}
            </p> */}
            <div className="mb-6 mt-4 flex flex-wrap gap-2 sm:mb-9 sm:mt-5 sm:gap-2.5">
              {t.panelA.features.map((feature) => (
                <span
                  key={feature}
                  className="px-3.5 py-2"
                  style={{
                    border: `1px solid ${isPanelADark ? "rgba(255,255,255,0.14)" : BORDER}`,
                    color: isPanelADark ? "rgba(255,255,255,0.88)" : BODY_TEXT,
                    background: isPanelADark ? "rgba(255,255,255,0.06)" : SOFT_BG,
                    borderRadius: 6,
                    fontSize: "1.222rem",
                    fontWeight: 500,
                    lineHeight: 1.35,
                    wordBreak: "keep-all",
                    overflowWrap: "normal",
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
            <div className="mt-auto">
              <div className="eruty-meta !mb-4" style={{ color: isPanelADark ? "rgba(255,255,255,0.5)" : MUTED, fontWeight: 600 }}>
                {t.panelA.flowLabel}
              </div>
              {renderDesktopFlow(t.contentFlow, isPanelADark)}
              {renderMobileFlow(t.contentFlow, isPanelADark)}
            </div>
            <div className="mt-4 border-t pt-4 sm:mt-6 sm:pt-5" style={{ borderColor: isPanelADark ? "rgba(255,255,255,0.1)" : BORDER }}>
              <Link
                to={t.panelA.href}
                className="inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3737F2]"
                style={{ color: isPanelADark ? "rgba(255,255,255,0.88)" : NEAR_BLACK, fontSize: "1.274rem", fontWeight: 600 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = BLUE)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = isPanelADark ? "rgba(255,255,255,0.88)" : NEAR_BLACK)}
              >
                {t.panelA.cta} <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>

          {/* Panel B */}
          <div
            className="relative flex flex-col overflow-hidden rounded-[6px] border p-5 sm:p-8 xl:min-h-[540px] xl:p-10"
            style={{
              background: isPanelBDark ? NEAR_BLACK : "#FFFFFF",
              borderColor: isPanelBDark ? NEAR_BLACK : BORDER,
            }}
            onMouseEnter={() => setHoveredPanel("panelB")}
            onMouseLeave={() => setHoveredPanel(null)}
            onFocusCapture={() => setFocusedPanel("panelB")}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setFocusedPanel(null);
              }
            }}
          >
            <div className="eruty-meta eruty-meta--code mb-3" style={{ color: BLUE, alignSelf: "flex-start" }}>
              {t.panelB.badge}
            </div>
            <div className="mb-3 sm:mb-5" style={{ color: isPanelBDark ? "#FFFFFF" : NEAR_BLACK, fontSize: "clamp(1.4625rem, 1.35vw, 1.7875rem)", fontWeight: 700 }}>
              {t.panelB.service}
            </div>
            <h3
              className="eruty-subsection-title eruty-preline-desktop"
              style={{
                color: isPanelBDark ? "#FFFFFF" : NEAR_BLACK,
                maxWidth: 520,
              }}
            >
              {t.panelB.headline}
            </h3>
            {/* <p
              className="eruty-body mb-6"
              style={{
                color: BODY_TEXT,
                maxWidth: 540,
                whiteSpace: "pre-line",
              }}
            >
              {t.panelB.desc}
            </p> */}
            <div className="mb-6 mt-4 flex flex-wrap gap-2 sm:mb-9 sm:mt-5 sm:gap-2.5">
              {t.panelB.features.map((feature) => (
                <span
                  key={feature}
                  className="px-3.5 py-2"
                  style={{
                    border: `1px solid ${isPanelBDark ? "rgba(255,255,255,0.14)" : BORDER}`,
                    color: isPanelBDark ? "rgba(255,255,255,0.88)" : BODY_TEXT,
                    background: isPanelBDark ? "rgba(255,255,255,0.06)" : SOFT_BG,
                    borderRadius: 6,
                    fontSize: "1.222rem",
                    fontWeight: 500,
                    lineHeight: 1.35,
                    wordBreak: "keep-all",
                    overflowWrap: "normal",
                  }}
                >
                  {feature}
                </span>
              ))}
            </div>
            <div className="mt-auto">
              <div className="eruty-meta !mb-4" style={{ color: isPanelBDark ? "rgba(255,255,255,0.5)" : MUTED, fontWeight: 600 }}>
                {t.panelB.flowLabel}
              </div>
              {renderDesktopFlow(t.axFlow, isPanelBDark)}
              {renderMobileFlow(t.axFlow, isPanelBDark)}
            </div>
            <div className="mt-4 border-t pt-4 sm:mt-6 sm:pt-5" style={{ borderColor: isPanelBDark ? "rgba(255,255,255,0.1)" : BORDER }}>
              <Link
                to={t.panelB.href}
                className="inline-flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3737F2]"
                style={{ color: isPanelBDark ? "rgba(255,255,255,0.88)" : NEAR_BLACK, fontSize: "1.274rem", fontWeight: 600 }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = BLUE)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = isPanelBDark ? "rgba(255,255,255,0.88)" : NEAR_BLACK)}
              >
                {t.panelB.cta} <ArrowUpRight size={15} />
              </Link>
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

  return (
    <section
      className="eruty-section"
      style={{
        background: "linear-gradient(180deg, #17181B 0%, #15161A 100%)",
      }}
    >
      <div className="mx-auto px-6 sm:px-8" style={{ maxWidth: 1280 }}>
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.55fr)] xl:gap-14">
          <div className="xl:pr-4">
            <SectionHeading
              title={t.headline}
              description={t.desc}
              align="left"
              inverse
              lang={lang}
            />
            <div className="mt-10">
              <Link
                to={t.href}
                className="inline-flex items-center gap-2 pb-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3737F2]"
                style={{
                  color: "rgba(255,255,255,0.88)",
                  borderBottom: "1px solid rgba(255,255,255,0.22)",
                  fontSize: "1.3rem",
                  fontWeight: 600,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                  (e.currentTarget as HTMLElement).style.borderBottomColor = BLUE;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.88)";
                  (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(255,255,255,0.22)";
                }}
              >
                {t.cta} <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {t.cards.map((card) => (
              <div
                key={card.number}
                className="flex h-full min-h-[220px] min-w-0 flex-col rounded-[6px] border px-4 py-4 sm:min-h-[248px] sm:px-7 sm:py-7 lg:min-h-[264px]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  borderColor: "rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="eruty-meta eruty-meta--code"
                  style={{ color: BLUE }}
                >
                  {card.number}
                </div>
                <h3
                  className="eruty-card-title eruty-keep-all !mt-3"
                  style={{
                    color: "#FFFFFF",
                    maxWidth: 320,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  className="eruty-body-small eruty-keep-all !mt-1 whitespace-pre-line"
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    maxWidth: 520,
                  }}
                >
                  {card.desc}
                </p>
                <div
                  className={`eruty-meta !mt-3 min-h-[72px] pt-4 sm:min-h-[84px] sm:pt-7 ${lang === "en" ? "eruty-meta--code" : ""}`}
                  style={{
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(255,255,255,0.42)",
                  }}
                >
                  {card.keywords}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 5. Final CTA ───────────────────────────────────────────────────────────────

// function FinalCTA() {
//   const { lang } = useLanguage();
//   const t = T[lang].cta;

//   return (
//     <section className="eruty-section-compact" style={{ background: NEAR_BLACK }}>
//       <div className="mx-auto px-8" style={{ maxWidth: 1280 }}>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//           <div>
//             <h2
//               className="eruty-section-title"
//               style={{ color: "#FFFFFF", whiteSpace: "pre-line" }}
//             >
//               {t.headline}
//             </h2>
//           </div>
//           <div>
//             <p className="eruty-body mb-10" style={{ color: "rgba(255,255,255,0.5)", whiteSpace: "pre-line" }}>
//               {t.desc}
//             </p>
//             <Link
//               to="/start-a-project"
//               className="inline-flex px-7 py-3.5 text-sm transition-all duration-200"
//               style={{ background: BLUE, color: "#FFFFFF", fontWeight: 500, borderRadius: 4 }}
//               onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#2828d4")}
//               onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = BLUE)}
//             >
//               {t.button}
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

export function HomePage() {
  return (
    <>
      <HeroSection />
      <GlobalActivitySection />
      <BusinessFields />
      <TechnologySection />
      {/* <FinalCTA /> */}
    </>
  );
}
