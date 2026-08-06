import { ArrowRight , Building2, Code2, FlaskConical,  ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import { useLanguage, type Lang } from "../context/LanguageContext";
import { PageContainer } from "../components/PageContainer";
import { PageHeading } from "../components/PageHeading";
import { SectionHeading } from "../components/SectionHeading";
import {
  ArchitectureDiagram,
  FlowTriplet,
  HeroTechVisual,
  MarketIntelligenceMockup,
  serviceIcons,
  technologyColors,
  TrustLedgerMockup,
  WorkflowMockup,
} from "./technology/TechnologyComponents";

const { BLUE, INK, MUTED, BORDER, SURFACE } = technologyColors;

const COPY = {
  ko: {
    hero: {
      eyebrow: "TECHNOLOGY",
      title: "데이터를 사업 판단으로 바꾸고,\n판단을 실제 실행으로 연결하는 기술",
      description: "ERUTY는 시장 데이터 분석, AX 자동화, 블록체인 기반 신뢰 인프라를 통해 글로벌 사업 실행과 기업 업무 전환을 지원합니다.",
      link: "기술 구조 살펴보기",
    },
    architecture: {
      eyebrow: "INTEGRATED ARCHITECTURE",
      title: "통합 기술 아키텍처",
      description: "데이터에서 실행, 신뢰, 서비스 적용까지 하나의 구조로 연결합니다.",
    },
    core: [
      {
        index: "01",
        eyebrow: "GLOBAL MARKET INTELLIGENCE",
        title: "글로벌 마켓 인텔리전스",
        lead: "시장과 상품의 해외 가능성을 분석하는 기술",
        description: "국가별 시장 신호와 소비·콘텐츠 반응, 크리에이터, 상품 정보를 통합해 진입 우선순위와 실행 가능한 다음 액션을 제안합니다.",
        labels: ["입력", "처리", "출력"] as [string, string, string],
        flow: [
          ["국가별 시장 신호", "소비 트렌드", "콘텐츠 반응", "크리에이터 데이터", "상품 · 브랜드 정보"],
          ["데이터 수집 · 정규화", "분류", "시장 신호 분석", "적합도 평가", "우선순위화"],
          ["국가 우선순위", "브랜드 적합도", "크리에이터 후보", "실행 제안", "다음 액션"],
        ] as [string[], string[], string[]],
      },
      {
        index: "02",
        eyebrow: "AX ORCHESTRATION",
        title: "AX 실행·자동화 오케스트레이션",
        lead: "기업 업무를 실제로 자동화하는 기술",
        description: "업무 요청과 기존 시스템을 연결하고 AI 판단, API 연동, 사람 승인을 조율해 실제 운영 결과와 실행 로그를 만듭니다.",
        labels: ["입력", "처리", "출력"] as [string, string, string],
        flow: [
          ["업무 요청", "기존 시스템 데이터", "문서", "승인 조건"],
          ["업무 흐름 분석", "AI 판단", "API 연동", "문서 생성", "예외 처리", "사람 승인"],
          ["자동화된 업무", "AI 에이전트 실행 결과", "운영 대시보드", "실행 로그", "개선된 업무 흐름"],
        ] as [string[], string[], string[]],
      },
      {
        index: "03",
        eyebrow: "TRUST, RIGHTS & SETTLEMENT",
        title: "블록체인 신뢰·권리·정산 레이어",
        lead: "계약과 권리, 거래 이력을 검증 가능한 기록으로 연결하는 기술",
        description: "현재 계약·권리·이벤트 이력을 구조화하고 검증 기록으로 관리하는 기술을 개발하고 있습니다. 향후 정산 조건 관리와 결제 연계까지 확장할 수 있는 기반을 설계합니다.",
        labels: ["현재 기반", "핵심 처리", "확장 방향"] as [string, string, string],
        flow: [
          ["계약 정보 기록", "권리 정보 관리", "거래 · 이벤트 이력 관리"],
          ["정산 조건 관리", "검증 가능한 기록", "권리자 · 상태 추적"],
          ["정산 프로세스 연계", "결제 시스템 연계", "서비스 간 신뢰 데이터 활용"],
        ] as [string[], string[], string[]],
      },
    ],
    services: {
      eyebrow: "SERVICE APPLICATION",
      title: "기술이 서비스 실행으로 이어집니다",
      description: "같은 기술 기반을 각 서비스의 목적에 맞게 적용합니다.",
      cards: [
        { name: "Hitpick", tag: "글로벌 사업 실행", description: "글로벌 시장 분석과 수요 창출, 판매 실행을 지원하는 서비스", flow: ["상품 정보 입력", "시장 신호 분석", "적합 국가 선정", "크리에이터 후보", "판매 실행", "반응 재수집"], to: "/services/hitpick" },
        { name: "이룸터", tag: "기업 AX 전환", description: "기업의 업무와 서비스를 AX 기반으로 전환하는 서비스", flow: ["업무 흐름 진단", "시스템 연결", "AI 규칙 적용", "자동화 실행", "사람 승인", "운영 개선"], to: "/services/erumter" },
      ],
      link: "서비스 자세히 보기",
    },
    foundation: {
      eyebrow: "TECHNOLOGY FOUNDATION",
      title: "기술 신뢰를 만드는 기반",
      description: "지속적인 기술 개발과 실제 서비스 구현 역량을 통해 기술을 사업 실행에 연결합니다.",
      cards: [
        { title: "기업부설연구소", description: "AI, 블록체인, AX 분야의 기술 연구와 개발 수행" },
        { title: "지식재산권", description: "특허 등록 2건 · 특허 출원 1건" },
        { title: "AI · 블록체인 기술 개발", description: "AI 기반 분석 기술과 블록체인 기반 권리 기술 개발" },
        { title: "서비스 구현 역량", description: "웹 · 모바일 · API 기반 서비스 구현 및 운영" },
      ],
    },
    cta: { title: "새로운 사업 실행과 업무 전환을\nERUTY의 기술로 함께 만듭니다.", description: "필요한 기술 구조와 실행 방법을 함께 설계해 보세요.", button: "프로젝트 문의하기", secondary: "서비스 보기" },
  },
  en: {
    hero: {
      eyebrow: "TECHNOLOGY",
      title: "Turn data into business decisions,\nand decisions into real execution.",
      description: "ERUTY supports global business execution and enterprise transformation through market intelligence, AX automation, and blockchain-based trust infrastructure.",
      link: "Explore the architecture",
    },
    architecture: { eyebrow: "INTEGRATED ARCHITECTURE", title: "Integrated technology architecture", description: "One connected system from data and decisions to execution, trust, and service delivery." },
    core: [
      { index: "01", eyebrow: "GLOBAL MARKET INTELLIGENCE", title: "Global Market Intelligence", lead: "Technology that evaluates the global potential of markets and products", description: "We combine country-level signals, consumer trends, content response, creator data, and product information to prioritize markets and recommend executable next actions.", labels: ["Input", "Process", "Output"] as [string, string, string], flow: [["Country market signals", "Consumer trends", "Content response", "Creator data", "Product · brand data"], ["Collect · normalize", "Classify", "Analyze signals", "Fit evaluation", "Prioritize"], ["Market priority", "Brand fit", "Creator candidates", "Execution proposal", "Next action"]] as [string[], string[], string[]] },
      { index: "02", eyebrow: "AX ORCHESTRATION", title: "AX Execution & Automation Orchestration", lead: "Technology that automates how enterprise work actually gets done", description: "We connect work requests and existing systems, orchestrating AI decisions, APIs, and human approval to produce operational outcomes and auditable execution logs.", labels: ["Input", "Process", "Output"] as [string, string, string], flow: [["Work requests", "System data", "Documents", "Approval rules"], ["Workflow analysis", "AI decision", "API connection", "Document creation", "Exception handling", "Human approval"], ["Automated work", "Agent results", "Operations dashboard", "Execution log", "Improved workflow"]] as [string[], string[], string[]] },
      { index: "03", eyebrow: "TRUST, RIGHTS & SETTLEMENT", title: "Blockchain Trust, Rights & Settlement Layer", lead: "Technology that connects contracts, rights, and events to verifiable records", description: "We are developing structured, verifiable records for contracts, rights, and events. The foundation is designed to expand toward settlement terms and payment integration over time.", labels: ["Current foundation", "Core handling", "Expansion"] as [string, string, string], flow: [["Contract records", "Rights management", "Transaction · event history"], ["Settlement terms", "Verifiable records", "Holder · status tracking"], ["Settlement integration", "Payment integration", "Cross-service trust data"]] as [string[], string[], string[]] },
    ],
    services: { eyebrow: "SERVICE APPLICATION", title: "Technology connected to service execution", description: "The same technology foundation is applied to each service objective.", cards: [{ name: "Hitpick", tag: "Global business execution", description: "A service supporting global market analysis, demand generation, and sales execution", flow: ["Product input", "Signal analysis", "Market selection", "Creator candidates", "Sales execution", "Signal collection"], to: "/services/hitpick" }, { name: "Erumter", tag: "Enterprise AX", description: "A service transforming enterprise work and services through AX", flow: ["Workflow diagnosis", "System connection", "AI rules", "Automation", "Human approval", "Operations improvement"], to: "/services/erumter" }], link: "View service" },
    foundation: { eyebrow: "TECHNOLOGY FOUNDATION", title: "The foundation behind our technology", description: "Ongoing development and product delivery capabilities connect technology to business execution.", cards: [{ title: "Corporate R&D center", description: "Research and development across AI, blockchain, and AX" }, { title: "Intellectual property", description: "2 registered patents · 1 patent application" }, { title: "AI · blockchain development", description: "AI analysis technology and blockchain-based rights technology" }, { title: "Service engineering", description: "Web, mobile, and API-based service implementation and operation" }] },
    cta: { title: "Build new business execution and\nworkflow transformation with ERUTY.", description: "Let's design the right technology structure and execution model together.", button: "Start a project", secondary: "View services" },
  },
} as const;

function CoreTechnologySection({ item, index, lang }: { item: (typeof COPY)[Lang]["core"][number]; index: number; lang: Lang }) {
  const mockup = index === 0 ? <MarketIntelligenceMockup lang={lang} /> : index === 1 ? <WorkflowMockup lang={lang} /> : <TrustLedgerMockup lang={lang} />;
  const sectionIds = ["market-intelligence", "ax-orchestration", "trust-layer"];
  return (
    <section id={sectionIds[index]} className="eruty-section border-t" style={{ borderColor: BORDER, background: index === 1 ? SURFACE : "white" }} aria-labelledby={`${sectionIds[index]}-title`}>
      <div className="eruty-container">
        <div className={`grid items-center gap-10 lg:grid-cols-12 lg:gap-14 ${index === 1 ? "" : ""}`}>
          <div className={`lg:col-span-5 ${index === 1 ? "lg:order-2" : ""}`}>
            <div className="eruty-meta eruty-meta--code mb-5 font-bold" style={{ color: "#9AA0AD" }}>{item.index}</div>
            <div className="eruty-eyebrow-en mb-4" style={{ color: BLUE }}>{item.eyebrow}</div>
            <h2 id={`${sectionIds[index]}-title`} className="eruty-section-title" style={{ color: INK }}>{item.title}</h2>
            <p className="eruty-page-lead mt-5 font-bold" style={{ color: "#30333A" }}>{item.lead}</p>
            <p className="eruty-body mt-3" style={{ color: MUTED }}>{item.description}</p>
          </div>
          <div className={`min-w-0 lg:col-span-7 ${index === 1 ? "lg:order-1" : ""}`}>{mockup}</div>
        </div>
        <div className="mt-8 md:mt-10"><FlowTriplet labels={item.labels} sections={item.flow} /></div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, linkText, lang }: { service: (typeof COPY)[Lang]["services"]["cards"][number]; index: number; linkText: string; lang: Lang }) {
  const Icon = index === 0 ? serviceIcons.Globe2 : serviceIcons.Workflow;
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border bg-white" style={{ borderColor: BORDER }}>
      <div className="flex items-start justify-between border-b p-6 md:p-7" style={{ borderColor: BORDER }}>
        <div><div className={lang === "ko" ? "eruty-meta mb-2 font-bold" : "eruty-meta eruty-meta--code mb-2 font-bold"} style={{ color: BLUE }}>{service.tag}</div><h3 className="eruty-card-title" style={{ color: INK }}>{service.name}</h3></div>
        <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: "#EEF0FF", color: BLUE }}><Icon size={21} aria-hidden="true" /></span>
      </div>
      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="eruty-body-small mb-6" style={{ color: MUTED }}>{service.description}</p>
        <ol className="mb-7 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {service.flow.map((step, stepIndex) => <li key={step} className="eruty-body-small relative rounded-lg border bg-[#FAFBFC] px-3 py-3 font-semibold" style={{ borderColor: "#ECEEF2", color: "#555C6B" }}><span className="eruty-meta eruty-meta--code mb-2 block" style={{ color: "#9DA2AE" }}>0{stepIndex + 1}</span>{step}</li>)}
        </ol>
        <Link to={service.to} className="mt-auto inline-flex items-center gap-2 self-start text-sm font-bold" style={{ color: BLUE }}>{linkText}<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
      </div>
    </article>
  );
}

export function TechnologyPage() {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const foundationIcons = [Building2, ShieldCheck, FlaskConical, Code2];

  return (
    <div className="overflow-hidden bg-white">
      <section className="relative overflow-hidden bg-[#07101F] py-20 md:py-28 lg:py-32" aria-labelledby="technology-hero-title">
        <div className="absolute inset-0 opacity-50" aria-hidden="true" style={{ background: "radial-gradient(circle at 75% 45%, rgba(55,55,242,.34), transparent 35%), linear-gradient(120deg, transparent 0 55%, rgba(18,47,112,.24) 55% 100%)" }} />
        <div className="absolute -bottom-32 left-[-10%] h-64 w-[120%] rounded-[50%] border border-[#2251B8]/20" aria-hidden="true" />
        <PageContainer className="relative grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <PageHeading
              eyebrow={copy.hero.eyebrow}
              title={copy.hero.title}
              description={copy.hero.description}
              inverse
              lang={lang}
              titleId="technology-hero-title"
              actions={<a href="#architecture" className="inline-flex min-h-12 items-center gap-2 text-sm font-bold text-[#8AA8FF]">{copy.hero.link}<ArrowRight size={15} aria-hidden="true" /></a>}
            />
          </div>
          <div className="lg:col-span-6"><HeroTechVisual lang={lang} /></div>
        </PageContainer>
      </section>

      <section id="architecture" className="eruty-section-compact" aria-labelledby="architecture-title">
        <div className="eruty-container">
          <SectionHeading {...copy.architecture} align="split" lang={lang} titleId="architecture-title"  />
          <ArchitectureDiagram lang={lang} />
        </div>
      </section>

      {copy.core.map((item, index) => <CoreTechnologySection key={item.index} item={item} index={index} lang={lang} />)}

      <section className="eruty-section" style={{ background: SURFACE }} aria-labelledby="services-title">
        <div className="eruty-container">
          <SectionHeading {...copy.services} align="center" lang={lang} titleId="services-title" />
          <div className="grid gap-5 lg:grid-cols-2">{copy.services.cards.map((service, index) => <ServiceCard key={service.name} service={service} index={index} linkText={copy.services.link} lang={lang} />)}</div>
        </div>
      </section>

      <section className="eruty-section-compact bg-[#07101F]" aria-labelledby="foundation-title">
        <div className="eruty-container">
          <SectionHeading {...copy.foundation} align="center" inverse lang={lang} titleId="foundation-title" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {copy.foundation.cards.map((card, index) => { const Icon = foundationIcons[index]; return <article key={card.title} className="rounded-xl border border-white/10 bg-white/[0.04] p-6"><span className="mb-6 flex h-10 w-10 items-center justify-center rounded-lg bg-[#17316B] text-[#81A3FF]"><Icon size={19} aria-hidden="true" /></span><h3 className="eruty-card-title mb-2 text-white">{card.title}</h3><p className="eruty-body-small text-white/50">{card.description}</p></article>; })}
          </div>
        </div>
      </section>

      {/* <section className="eruty-section-compact relative overflow-hidden bg-[#1237A5]" aria-labelledby="technology-cta-title">
        <div className="absolute inset-0 opacity-60" aria-hidden="true" style={{ background: "radial-gradient(circle at 82% 48%, rgba(78,124,255,.8), transparent 28%), linear-gradient(130deg, transparent 40%, rgba(4,18,54,.35) 40% 100%)" }} />
        <div className="eruty-container relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl"><div className="eruty-eyebrow-en mb-4 flex items-center gap-2 text-[#B7C8FF]"><Lightbulb size={14} aria-hidden="true" />NEXT EXECUTION</div><h2 id="technology-cta-title" className="eruty-section-title eruty-preline-desktop text-white">{copy.cta.title}</h2><p className="eruty-body mt-4 text-white/65">{copy.cta.description}</p></div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row"><Link to="/start-a-project" className="inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3.5 text-sm font-bold" style={{ color: "#1237A5" }}>{copy.cta.button}<ArrowUpRight size={15} aria-hidden="true" /></Link><Link to="/services/hitpick" className="inline-flex items-center justify-center gap-2 rounded-md border border-white/25 px-6 py-3.5 text-sm font-bold text-white">{copy.cta.secondary}<ArrowRight size={15} aria-hidden="true" /></Link></div>
        </div>
      </section> */}
    </div>
  );
}
