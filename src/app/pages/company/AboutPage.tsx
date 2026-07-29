import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BODY_TEXT = "#333438";
const MUTED = "#737780";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F5F6F8";

// ── 번역 ──────────────────────────────────────────────────────────────────────

const T = {
  ko: {
    heroLabel: "About ERUTY",
    heroHeadline: "가능성을 연결해,\n글로벌 비즈니스를\n만듭니다.",
    heroDesc: "이루티는 콘텐츠와 기술, 글로벌 네트워크를 연결해\n새로운 사업을 설계하고 실행합니다.",
    heroVisualLabel: "글로벌 사업의 설계와 실행",
    heroVisualItems: [
      { label: "콘텐츠 & IP", sub: "Content Business" },
      { label: "AI & 데이터", sub: "Intelligence" },
      { label: "글로벌 파트너", sub: "20+ Countries" },
      { label: "자동화 시스템", sub: "AX Transformation" },
      { label: "브랜드 협업", sub: "Commerce" },
      { label: "기술 인프라", sub: "Engineering" },
    ],
    connectionLabel: "What We Connect",
    connectionHeadline: "서로 다른 가능성을\n하나의 사업으로\n연결합니다.",
    inputs: ["콘텐츠와 IP", "시장과 오디언스 데이터", "AI·소프트웨어 기술", "국내외 파트너", "브랜드와 유통 채널"],
    outputLabel: "Output",
    outputTitle: "글로벌 사업의\n설계와 실행",
    outputItems: ["콘텐츠 IP 사업화", "AI 전환 실행", "파트너 네트워크 운영"],
    businessLabel: "두 개의 사업 영역",
    businessHeadline: "두 개의 사업,\n하나의 글로벌 비전",
    businessALabel: "A — 글로벌 콘텐츠 사업",
    businessAHeadline: "콘텐츠와 IP를\n글로벌 비즈니스로 전환합니다.",
    businessADesc: "콘텐츠의 가능성을 분석하고 투자·제작·배급·라이선싱·브랜드 협업을 통해 실제 사업으로 연결합니다.",
    contentServices: ["투자·공동제작", "글로벌 배급", "IP 거래·라이선싱", "광고·브랜드 협업", "커머스·수익화"],
    businessBLabel: "B — AX 전환",
    businessBHeadline: "기업의 업무와 서비스를\n지능형 시스템으로 전환합니다.",
    businessBDesc: "업무를 분석하고 AI 교육·소프트웨어 개발·자동화 시스템을 통해 실제 운영 가능한 AX 환경을 구축합니다.",
    axServices: ["AX 실무교육", "AI 소프트웨어 개발", "업무 자동화", "AI 에이전트·워크플로", "맞춤형 프로그램"],
    serviceLink: "서비스 상세 보기",
    howLabel: "How We Work",
    howHeadline: "아이디어에서 실행까지",
    steps: [
      { n: "01", title: "기회 발굴", desc: "시장 신호와 파트너 네트워크를 통해 사업 기회를 식별합니다." },
      { n: "02", title: "시장과 데이터 분석", desc: "AI 분석 도구로 수요, 경쟁, 파트너 적합도를 정량화합니다." },
      { n: "03", title: "사업 또는 시스템 설계", desc: "검증된 프레임워크로 비즈니스 구조 또는 AX 청사진을 설계합니다." },
      { n: "04", title: "파트너 연결과 개발", desc: "투자자, 배급사, 기술 파트너와 협력해 실행 기반을 구축합니다." },
      { n: "05", title: "실행과 운영", desc: "계약 완료 후 사업 운영, 캠페인 실행, 시스템 배포를 담당합니다." },
      { n: "06", title: "성과 분석과 확장", desc: "데이터 기반으로 결과를 측정하고 다음 시장으로 확장합니다." },
    ],
    techLabel: "Technology Foundation",
    techHeadline: "실제 사업을\n움직이는 기술",
    techDesc: "AI·데이터·블록체인·소프트웨어 기술을\n사업 판단과 실제 운영 시스템에 적용합니다.",
    techItems: [
      { label: "AI & Data", title: "콘텐츠와 시장을 분석하는 지능", desc: "오디언스 행동, 시장 트렌드, 콘텐츠 신호를 분석해 사업 판단의 정확도를 높입니다.", accent: BLUE },
      { label: "Automation", title: "반복 업무를 처리하는 시스템", desc: "AI 에이전트와 워크플로우 자동화로 운영 비용을 낮추고 실행 속도를 높입니다.", accent: "#8B5CF6" },
      { label: "Blockchain & Rights", title: "IP와 수익을 보호하는 인프라", desc: "콘텐츠 권리의 등록·라이선싱·정산을 스마트 계약 기반으로 자동화합니다.", accent: "#F59E0B" },
      { label: "Software Engineering", title: "사업을 실행하는 제품 기술", desc: "플랫폼, SaaS, 어드민 시스템 등 비즈니스 운영에 필요한 소프트웨어를 직접 개발합니다.", accent: "#22C55E" },
    ],
    techMoreLabel: "기술 더 보기",
    profileLabel: "Company Profile",
    profileFields: [
      { label: "법인명", value: "주식회사 이루티" },
      { label: "대표자", value: "—" },
      { label: "설립연도", value: "—" },
      { label: "본사", value: "대한민국 서울" },
      { label: "주요 사업", value: "글로벌 콘텐츠 비즈니스, AX 전환" },
      { label: "기업부설연구소", value: "이루티 AI 연구소" },
      { label: "벤처기업 인증", value: "—" },
      { label: "연락처", value: "contact@eruty.com" },
    ],
    profilePending: "정보 업데이트 예정",
    ctaHeadline: "새로운 사업의 가능성을\n이루티와 함께 발견하세요.",
    ctaServices: "서비스 살펴보기",
    ctaProject: "프로젝트 제안하기",
  },
  en: {
    heroLabel: "About ERUTY",
    heroHeadline: "Connecting Possibilities,\nBuilding Global\nBusiness.",
    heroDesc: "ERUTY connects content, technology, and global networks\nto design and execute new businesses.",
    heroVisualLabel: "Design & Execution of Global Business",
    heroVisualItems: [
      { label: "Content & IP", sub: "Content Business" },
      { label: "AI & Data", sub: "Intelligence" },
      { label: "Global Partners", sub: "20+ Countries" },
      { label: "Automation Systems", sub: "AX Transformation" },
      { label: "Brand Collaboration", sub: "Commerce" },
      { label: "Tech Infrastructure", sub: "Engineering" },
    ],
    connectionLabel: "What We Connect",
    connectionHeadline: "Connecting Different Possibilities\ninto a Single Business.",
    inputs: ["Content & IP", "Market & Audience Data", "AI · Software Technology", "Domestic & Global Partners", "Brands & Distribution Channels"],
    outputLabel: "Output",
    outputTitle: "Design & Execution\nof Global Business",
    outputItems: ["Content IP Business", "AI Transformation", "Partner Network Operations"],
    businessLabel: "Two Business Areas",
    businessHeadline: "Two Businesses,\nOne Global Vision",
    businessALabel: "A — Global Content Business",
    businessAHeadline: "Turning Content & IP\ninto Global Business.",
    businessADesc: "We analyze content potential and connect it to real business through investment, production, distribution, licensing, and brand collaboration.",
    contentServices: ["Investment · Co-production", "Global Distribution", "IP Licensing", "Ad · Brand Collaboration", "Commerce · Monetization"],
    businessBLabel: "B — AX Transformation",
    businessBHeadline: "Transforming Business Operations\ninto Intelligent Systems.",
    businessBDesc: "We analyze workflows and build operational AX environments through AI training, software development, and automation systems.",
    axServices: ["AX Practical Training", "AI Software Development", "Workflow Automation", "AI Agents · Workflows", "Custom Programs"],
    serviceLink: "View Service Details",
    howLabel: "How We Work",
    howHeadline: "From Idea to Execution",
    steps: [
      { n: "01", title: "Opportunity Discovery", desc: "We identify business opportunities through market signals and partner networks." },
      { n: "02", title: "Market & Data Analysis", desc: "We quantify demand, competition, and partner fit using AI analysis tools." },
      { n: "03", title: "Business or System Design", desc: "We design business structures or AX blueprints using proven frameworks." },
      { n: "04", title: "Partner Connection & Development", desc: "We build execution foundations by collaborating with investors, distributors, and tech partners." },
      { n: "05", title: "Execution & Operations", desc: "After contracts close, we handle business operations, campaign execution, and system deployment." },
      { n: "06", title: "Performance Analysis & Scaling", desc: "We measure results with data and scale into the next market." },
    ],
    techLabel: "Technology Foundation",
    techHeadline: "The Technology\nDriving Real Business",
    techDesc: "We apply AI, data, blockchain, and software technology\nto business decisions and operational systems.",
    techItems: [
      { label: "AI & Data", title: "Intelligence for Analyzing Content & Markets", desc: "We analyze audience behavior, market trends, and content signals to improve the accuracy of business decisions.", accent: BLUE },
      { label: "Automation", title: "Systems That Handle Repetitive Tasks", desc: "AI agents and workflow automation reduce operating costs and increase execution speed.", accent: "#8B5CF6" },
      { label: "Blockchain & Rights", title: "Infrastructure Protecting IP & Revenue", desc: "We automate content rights registration, licensing, and settlement via smart contracts.", accent: "#F59E0B" },
      { label: "Software Engineering", title: "Product Technology Executing Business", desc: "We build the software needed to run businesses — platforms, SaaS, admin systems, and more.", accent: "#22C55E" },
    ],
    techMoreLabel: "Explore Technology",
    profileLabel: "Company Profile",
    profileFields: [
      { label: "Legal Name", value: "ERUTY Co., Ltd." },
      { label: "CEO", value: "—" },
      { label: "Founded", value: "—" },
      { label: "Headquarters", value: "Seoul, South Korea" },
      { label: "Core Business", value: "Global Content Business, AX Transformation" },
      { label: "Corporate Lab", value: "ERUTY AI Research Lab" },
      { label: "Venture Certification", value: "—" },
      { label: "Contact", value: "contact@eruty.com" },
    ],
    profilePending: "To be updated",
    ctaHeadline: "Discover the Possibilities\nof a New Business with ERUTY.",
    ctaServices: "Explore Services",
    ctaProject: "Propose a Project",
  },
};

// ── 섹션 1: 히어로 ────────────────────────────────────────────────────────────

function HeroSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 pt-28 pb-0">
        {/* 레이블 */}
        <div className="inline-block text-xs mb-16 px-3 py-1.5 tracking-widest uppercase" style={{ color: BLUE, border: `1px solid rgba(55,55,242,0.25)`, fontFamily: "var(--font-mono)" }}>
          {t.heroLabel}
        </div>

        {/* 헤드라인 + 설명 2열 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-20">
          <div className="lg:col-span-7">
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.8rem, 5.5vw, 5rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: NEAR_BLACK }}>
              {t.heroHeadline.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h1>
          </div>
          <div className="lg:col-span-5 flex flex-col justify-end">
            <p style={{ fontSize: "1.05rem", lineHeight: 1.85, color: BODY_TEXT, maxWidth: 400 }}>
              {t.heroDesc.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </p>
          </div>
        </div>

        {/* 하단 추상 비즈니스 비주얼 */}
        <HeroVisual />
      </div>
    </section>
  );
}

function HeroVisual() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <div className="w-full overflow-hidden" style={{ borderTop: `1px solid ${BORDER}` }}>
      <div className="grid grid-cols-3 md:grid-cols-6" style={{ borderBottom: `1px solid ${BORDER}` }}>
        {t.heroVisualItems.map((item, i) => (
          <div
            key={item.label}
            className="p-6 flex flex-col justify-between"
            style={{
              borderRight: i < 5 ? `1px solid ${BORDER}` : "none",
              minHeight: 120,
            }}
          >
            <div className="w-1.5 h-1.5 rounded-full mb-8" style={{ background: i % 2 === 0 ? BLUE : BORDER }} />
            <div>
              <div className="text-xs mb-0.5" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: NEAR_BLACK }}>{item.label}</div>
              <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center py-5" style={{ background: NEAR_BLACK }}>
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: BLUE }} />
          <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-mono)" }}>
            {t.heroVisualLabel}
          </span>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: BLUE }} />
        </div>
      </div>
    </div>
  );
}

// ── 섹션 2: 연결 다이어그램 ───────────────────────────────────────────────────

function ConnectionSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <section className="py-28" style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center">
          {/* 왼쪽 타이틀 */}
          <div className="lg:col-span-4">
            <div className="text-xs tracking-widest uppercase mb-8" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.connectionLabel}</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.12, color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
              {t.connectionHeadline.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
          </div>

          {/* 오른쪽 다이어그램 */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-0 items-center">
              {/* 인풋 노드들 */}
              <div className="md:col-span-5 flex flex-col gap-3">
                {t.inputs.map((inp, i) => (
                  <motion.div
                    key={inp}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, duration: 0.35 }}
                    className="flex items-center gap-3 px-4 py-3"
                    style={{ border: `1px solid ${BORDER}`, background: "#FFFFFF" }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: BLUE }} />
                    <span className="text-sm" style={{ color: BODY_TEXT, fontFamily: "var(--font-body)" }}>{inp}</span>
                  </motion.div>
                ))}
              </div>

              {/* 연결선 */}
              <div className="md:col-span-2 flex items-center justify-center py-4 md:py-0">
                <div className="flex flex-col items-center gap-1 md:block">
                  <div className="hidden md:block w-full">
                    <svg width="100%" height="200" viewBox="0 0 60 200" preserveAspectRatio="none">
                      {[20, 55, 100, 145, 180].map((y) => (
                        <g key={y}>
                          <line x1="0" y1={y} x2="44" y2="100" stroke={BLUE} strokeWidth="0.8" strokeOpacity="0.4" />
                          <circle cx="0" cy={y} r="2.5" fill={BLUE} fillOpacity="0.5" />
                        </g>
                      ))}
                      <circle cx="50" cy="100" r="5" fill={BLUE} />
                      <line x1="55" y1="100" x2="60" y2="100" stroke={BLUE} strokeWidth="1.5" />
                    </svg>
                  </div>
                  <ArrowRight size={18} className="md:hidden" style={{ color: BLUE }} />
                </div>
              </div>

              {/* 아웃풋 */}
              <motion.div
                className="md:col-span-5"
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <div className="p-6 flex flex-col gap-3" style={{ background: NEAR_BLACK }}>
                  <div className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-mono)" }}>{t.outputLabel}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.1rem", color: "#FFFFFF", lineHeight: 1.3 }}>
                    {t.outputTitle.split("\n").map((line, i, arr) => (
                      <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                    ))}
                  </div>
                  <div className="pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    {t.outputItems.map((item) => (
                      <div key={item} className="flex items-center gap-2 mb-1.5">
                        <div className="w-1 h-1 rounded-full" style={{ background: BLUE }} />
                        <span className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 섹션 3: 두 개의 사업 ─────────────────────────────────────────────────────

function BusinessSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-4" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.businessLabel}</div>
        <h2 className="mb-16" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.12, color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.businessHeadline.split("\n").map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px" style={{ background: BORDER }}>
          {/* A: 글로벌 콘텐츠 사업 */}
          <div className="p-10 flex flex-col" style={{ background: "#FFFFFF" }}>
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="text-xs mb-3" style={{ color: BLUE, fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}>{t.businessALabel}</div>
                <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>by Hitpick</div>
              </div>
              <div className="w-8 h-8 flex items-center justify-center" style={{ background: BLUE }}>
                <span style={{ color: "#FFFFFF", fontSize: "0.75rem", fontFamily: "var(--font-mono)", fontWeight: 600 }}>A</span>
              </div>
            </div>

            <h3 className="mb-5" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", color: NEAR_BLACK, lineHeight: 1.2 }}>
              {t.businessAHeadline.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h3>

            <p className="mb-8 flex-1" style={{ color: BODY_TEXT, lineHeight: 1.8, fontSize: "0.9375rem", maxWidth: 440 }}>
              {t.businessADesc}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {t.contentServices.map((s) => (
                <span key={s} className="text-xs px-3 py-1.5" style={{ border: `1px solid ${BORDER}`, color: BODY_TEXT, fontFamily: "var(--font-mono)" }}>
                  {s}
                </span>
              ))}
            </div>

            <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 24 }}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm transition-colors"
                style={{ color: NEAR_BLACK, fontFamily: "var(--font-body)", fontWeight: 500 }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = BLUE; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = NEAR_BLACK; }}
              >
                {t.serviceLink} <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          {/* B: AX 전환 */}
          <div className="p-10 flex flex-col" style={{ background: NEAR_BLACK }}>
            <div className="flex items-start justify-between mb-8">
              <div>
                <div className="text-xs mb-3" style={{ color: BLUE, fontFamily: "var(--font-mono)", letterSpacing: "0.08em" }}>{t.businessBLabel}</div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>by 이룸터</div>
              </div>
              <div className="w-8 h-8 flex items-center justify-center" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.75rem", fontFamily: "var(--font-mono)", fontWeight: 600 }}>B</span>
              </div>
            </div>

            <h3 className="mb-5" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)", color: "#FFFFFF", lineHeight: 1.2 }}>
              {t.businessBHeadline.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h3>

            <p className="mb-8 flex-1" style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, fontSize: "0.9375rem", maxWidth: 440 }}>
              {t.businessBDesc}
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {t.axServices.map((s) => (
                <span key={s} className="text-xs px-3 py-1.5" style={{ border: "1px solid rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-mono)" }}>
                  {s}
                </span>
              ))}
            </div>

            <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24 }}>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm transition-colors"
                style={{ color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-body)", fontWeight: 500 }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)"; }}
              >
                {t.serviceLink} <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 섹션 4: 일하는 방식 ──────────────────────────────────────────────────────

function HowSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const steps = t.steps;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % steps.length), 2200);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section className="py-28" style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-xs tracking-widest uppercase mb-4" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.howLabel}</div>
        <h2 className="mb-16" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.12, color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.howHeadline}
        </h2>

        {/* 데스크탑: 가로 시퀀스 */}
        <div className="hidden md:grid gap-px" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)`, background: BORDER }}>
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="p-6 cursor-pointer transition-colors duration-200"
              style={{ background: active === i ? "#FFFFFF" : SOFT_BG }}
              onMouseEnter={() => setActive(i)}
            >
              <div className="text-xs mb-4" style={{ color: active === i ? BLUE : MUTED, fontFamily: "var(--font-mono)", fontWeight: active === i ? 600 : 400 }}>{s.n}</div>
              <div className="text-sm mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: active === i ? NEAR_BLACK : MUTED, lineHeight: 1.3 }}>{s.title}</div>
              <div className="text-xs" style={{ color: active === i ? BODY_TEXT : "transparent", lineHeight: 1.65, transition: "color 0.2s" }}>{s.desc}</div>
            </div>
          ))}
        </div>

        {/* 모바일: 세로 */}
        <div className="md:hidden flex flex-col gap-px" style={{ background: BORDER }}>
          {steps.map((s) => (
            <div key={s.n} className="p-6" style={{ background: "#FFFFFF" }}>
              <div className="flex items-start gap-4">
                <span className="text-xs mt-0.5" style={{ color: BLUE, fontFamily: "var(--font-mono)", fontWeight: 600, flexShrink: 0 }}>{s.n}</span>
                <div>
                  <div className="text-sm mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: NEAR_BLACK }}>{s.title}</div>
                  <div className="text-xs" style={{ color: MUTED, lineHeight: 1.65 }}>{s.desc}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 섹션 5: 기술 기반 ────────────────────────────────────────────────────────

function TechSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <section style={{ background: NEAR_BLACK, borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <div className="text-xs tracking-widest uppercase mb-6" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>{t.techLabel}</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.8rem, 3vw, 2.8rem)", lineHeight: 1.12, color: "#FFFFFF", letterSpacing: "-0.02em" }}>
              {t.techHeadline.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(255,255,255,0.5)", maxWidth: 460 }}>
              {t.techDesc.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.06)" }}>
          {t.techItems.map((item) => (
            <Link
              key={item.label}
              to="/technology"
              className="group p-8 block transition-colors duration-200"
              style={{ background: NEAR_BLACK }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#222326"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = NEAR_BLACK; }}
            >
              <div className="w-8 h-0.5 mb-8" style={{ background: item.accent }} />
              <div className="text-xs mb-4" style={{ color: item.accent, fontFamily: "var(--font-mono)" }}>{item.label}</div>
              <div className="text-sm mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "#FFFFFF", lineHeight: 1.3 }}>{item.title}</div>
              <div className="text-xs mb-8" style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>{item.desc}</div>
              <div className="flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: item.accent }}>
                {t.techMoreLabel} <ArrowUpRight size={12} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 섹션 6: 회사 정보 ────────────────────────────────────────────────────────

function ProfileSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  return (
    <section className="py-24" style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="text-xs tracking-widest uppercase mb-10" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.profileLabel}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: BORDER }}>
          {t.profileFields.map((f) => (
            <div key={f.label} className="flex items-baseline gap-6 px-6 py-5" style={{ background: "#FFFFFF" }}>
              <div className="w-32 flex-shrink-0 text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{f.label}</div>
              <div className="text-sm" style={{ color: f.value === "—" ? "#C0C3C9" : NEAR_BLACK, fontFamily: "var(--font-body)", fontStyle: f.value === "—" ? "italic" : "normal" }}>
                {f.value === "—" ? t.profilePending : f.value}
              </div>
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
    <section className="py-28" style={{ background: "#FFFFFF" }}>
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1.08, color: NEAR_BLACK, letterSpacing: "-0.025em" }}>
              {t.ctaHeadline.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end lg:pb-1">
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm transition-all"
              style={{ border: `1px solid ${BORDER}`, color: NEAR_BLACK, fontFamily: "var(--font-body)", fontWeight: 500 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = NEAR_BLACK; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = BORDER; }}
            >
              {t.ctaServices}
            </Link>
            <Link
              to="/start-a-project"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm transition-all"
              style={{ background: NEAR_BLACK, color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = BLUE; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = NEAR_BLACK; }}
            >
              {t.ctaProject} <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 페이지 조합 ───────────────────────────────────────────────────────────────

export function AboutPage() {
  return (
    <div className="pt-16" style={{ background: "#FFFFFF" }}>
      <HeroSection />
      <ConnectionSection />
      <BusinessSection />
      <HowSection />
      <TechSection />
      <ProfileSection />
      <CtaSection />
    </div>
  );
}
