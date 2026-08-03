import type { Lang } from "../../../context/LanguageContext";

export const BLUE = "#3737F2";
export const DARK = "#18191B";
export const GRAY = "#676B74";
export const BORDER = "#E4E6EA";
export const LIGHT_BG = "#F7F8FA";
export const NEAR_BLACK = "#0B1020";

export type LocalizedText = Record<Lang, string>;
export type StepIcon = "search" | "spark" | "commerce" | "trade" | "growth";

export interface ExecutionStep {
  num: string;
  icon: StepIcon;
  visual: string;
  visualAlt: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  actions: Record<Lang, string[]>;
  outcomes: Record<Lang, string[]>;
  technology: {
    name: string;
    description: LocalizedText;
  };
}

export const EXECUTION_STEPS: ExecutionStep[] = [
  {
    num: "01",
    icon: "search",
    visual: "/images/services/hitpick/step-01-market-validation.webp",
    visualAlt: { ko: "세계 지도와 데이터 신호로 시장을 검토하는 설명용 목업", en: "Illustrative market review mockup with a world map and data signals" },
    title: { ko: "시장 검증", en: "Market Validation" },
    description: {
      ko: "국가별 수요, 경쟁 상품, 가격대와 소비자 반응을 비교해 어떤 시장에 어떤 방식으로 진입할지 결정합니다.",
      en: "We compare demand, competing products, pricing and consumer response to decide where and how to enter.",
    },
    actions: {
      ko: ["상품·카테고리 분석", "국가별 수요 비교", "경쟁·가격·채널 조사", "진입 전략 설계"],
      en: ["Product and category analysis", "Market demand comparison", "Competition, price and channel research", "Entry strategy design"],
    },
    outcomes: {
      ko: ["우선 진입 시장", "가격 전략", "상품 포지셔닝"],
      en: ["Priority market", "Pricing strategy", "Product positioning"],
    },
    technology: {
      name: "Global Data",
      description: {
        ko: "시장·소비·콘텐츠 데이터를 수집하고 정리해 상품과 시장의 적합도를 분석합니다.",
        en: "Collects and organizes market, consumer and content data to assess product-market fit.",
      },
    },
  },
  {
    num: "02",
    icon: "spark",
    visual: "/images/services/hitpick/step-02-demand-creation.webp",
    visualAlt: { ko: "크리에이터 콘텐츠가 관심으로 확산되는 설명용 목업", en: "Illustrative mockup of creator content spreading interest" },
    title: { ko: "수요 창출", en: "Demand Creation" },
    description: {
      ko: "브랜드와 시장에 맞는 크리에이터를 발굴하고, 현지 소비자가 공감하고 구매할 수 있는 콘텐츠와 캠페인을 실행합니다.",
      en: "We find market-fit creators and run content and campaigns that local consumers can relate to and buy from.",
    },
    actions: {
      ko: ["크리에이터 발굴·매칭", "현지화 콘텐츠 기획", "콘텐츠 제작·운영", "캠페인 성과 관리"],
      en: ["Creator sourcing and matching", "Localized content planning", "Content production and operations", "Campaign performance management"],
    },
    outcomes: {
      ko: ["크리에이터 후보군", "콘텐츠 방향", "구매 관심"],
      en: ["Creator shortlist", "Content direction", "Purchase interest"],
    },
    technology: {
      name: "Creator AX",
      description: {
        ko: "크리에이터 적합도와 콘텐츠 반응 데이터를 바탕으로 후보 발굴과 운영 과정을 지원합니다.",
        en: "Supports creator discovery and operations using creator-fit and content-response data.",
      },
    },
  },
  {
    num: "03",
    icon: "commerce",
    visual: "/images/services/hitpick/step-03-sales-execution.webp",
    visualAlt: { ko: "상품과 주문 흐름을 운영하는 커머스 설명용 목업", en: "Illustrative commerce operations mockup with products and order flows" },
    title: { ko: "판매 실행", en: "Sales Execution" },
    description: {
      ko: "시장에 적합한 판매 채널에 상품을 론칭하고, 상품 페이지부터 프로모션과 주문 전환까지 직접 운영합니다.",
      en: "We launch products on market-fit channels and operate everything from product pages to promotions and conversion.",
    },
    actions: {
      ko: ["판매 채널 선정", "상품 페이지 구성", "프로모션 운영", "주문·전환 관리"],
      en: ["Sales channel selection", "Product page setup", "Promotion operations", "Order and conversion management"],
    },
    outcomes: {
      ko: ["스토어 론칭", "주문 발생", "글로벌 매출"],
      en: ["Store launch", "Orders", "Global revenue"],
    },
    technology: {
      name: "Commerce Intelligence",
      description: {
        ko: "채널·콘텐츠·주문 데이터를 연결해 판매 전환과 다음 실행을 고도화합니다.",
        en: "Connects channel, content and order data to improve conversion and the next action.",
      },
    },
  },
  {
    num: "04",
    icon: "trade",
    visual: "/images/services/hitpick/step-04-export-operations.webp",
    visualAlt: { ko: "선박과 항공, 물류 흐름을 연결한 설명용 목업", en: "Illustrative export operations mockup connecting sea, air and logistics" },
    title: { ko: "수출 운영", en: "Export Operations" },
    description: {
      ko: "주문 이후 필요한 물류, 통관, 배송, 정산과 고객 대응을 연결해 판매가 실제 배송과 수익으로 이어지도록 운영합니다.",
      en: "We connect logistics, customs, delivery, settlement and customer support so sales become delivered orders and revenue.",
    },
    actions: {
      ko: ["출고·수출 서류", "통관·현지 배송", "계약·정산 연결", "반품·CS 운영 지원"],
      en: ["Shipping and export documents", "Customs and local delivery", "Contract and settlement coordination", "Returns and customer support"],
    },
    outcomes: {
      ko: ["출고 완료", "배송 추적", "안정적인 정산"],
      en: ["Shipment completion", "Delivery tracking", "Reliable settlement"],
    },
    technology: {
      name: "Trade Trust Layer",
      description: {
        ko: "거래·출고·배송·정산 이력을 연결해 신뢰할 수 있는 수출 운영을 지원합니다.",
        en: "Connects transaction, shipping, delivery and settlement records for reliable export operations.",
      },
    },
  },
  {
    num: "05",
    icon: "growth",
    visual: "/images/services/hitpick/step-05-growth-expansion.webp",
    visualAlt: { ko: "시장 확장과 성장 흐름을 보여주는 설명용 목업", en: "Illustrative mockup of market expansion and growth" },
    title: { ko: "성장 확장", en: "Growth Expansion" },
    description: {
      ko: "판매 결과를 분석해 리오더와 다음 진출 국가를 결정하고, 한 번의 프로젝트를 반복 가능한 글로벌 사업으로 확장합니다.",
      en: "We analyze sales to decide on reorders and the next market, turning one project into a repeatable global business.",
    },
    actions: {
      ko: ["판매 성과 분석", "리오더 판단", "제품 라인 확장", "추가 국가 진입"],
      en: ["Sales performance analysis", "Reorder decisions", "Product line expansion", "Additional market entry"],
    },
    outcomes: {
      ko: ["반복 주문", "국가 확장", "브랜드 성장"],
      en: ["Repeat orders", "Market expansion", "Brand growth"],
    },
    technology: {
      name: "Growth Intelligence",
      description: {
        ko: "국가·채널·콘텐츠별 성과를 분석해 다음 시장과 다음 실행 우선순위를 도출합니다.",
        en: "Analyzes performance by market, channel and content to prioritize the next market and action.",
      },
    },
  },
];

export type MarketRegion = "Asia" | "Europe" | "Middle East" | "North America";
export type SignalCategory = "Content" | "Consumer" | "Channel" | "Partner";

export interface MarketSignal {
  id: string;
  name: string;
  region: MarketRegion;
  monitoring: LocalizedText;
  collected: LocalizedText;
  coverage: LocalizedText;
  action: LocalizedText;
  output: LocalizedText;
  signals: Record<SignalCategory, LocalizedText>;
}

const signal = (
  id: string,
  name: string,
  region: MarketRegion,
  ko: [string, string, string, string, string, string, string, string, string],
  en: [string, string, string, string, string, string, string, string, string],
): MarketSignal => ({
  id,
  name,
  region,
  monitoring: { ko: ko[0], en: en[0] },
  collected: { ko: ko[1], en: en[1] },
  coverage: { ko: ko[2], en: en[2] },
  action: { ko: ko[3], en: en[3] },
  output: { ko: ko[4], en: en[4] },
  signals: {
    Content: { ko: ko[5], en: en[5] },
    Consumer: { ko: ko[6], en: en[6] },
    Channel: { ko: ko[7], en: en[7] },
    Partner: { ko: ko[8], en: en[8] },
  },
});

export const MARKET_SIGNALS: MarketSignal[] = [
  signal("jp", "Japan", "Asia",
    ["지속 모니터링", "콘텐츠·소비 반응 수집", "수요·가격·채널 구조", "시장 검증 및 판매 채널 검토", "진입 방식 정교화", "현지 콘텐츠 반응", "소비자 관심 흐름", "이커머스 채널 구조", "유통 파트너 환경"],
    ["Ongoing monitoring", "Content and consumer response", "Demand, pricing and channels", "Market validation and channel review", "Refining the entry approach", "Local content response", "Consumer interest signals", "E-commerce structure", "Distribution partner landscape"]),
  signal("vn", "Vietnam", "Asia",
    ["데이터 수집 중", "콘텐츠·시장 신호 수집", "콘텐츠·소비·파트너 환경", "사업 기회 및 파트너 구조 검토", "현지 실행 조건 정리", "콘텐츠 관심 흐름", "소비자 반응 탐색", "소셜·커머스 구조", "현지 네트워크 구축"],
    ["Data collection", "Content and market signals", "Content, consumer and partners", "Opportunity and partner model review", "Defining local execution conditions", "Content interest signals", "Consumer response discovery", "Social and commerce structure", "Local network building"]),
  signal("tw", "Taiwan", "Asia",
    ["시장 신호 분석", "수요·채널 신호 수집", "소비재 수요와 채널", "초기 진입 가능성 검토", "채널 탐색 방향 정리", "현지화 콘텐츠 방향", "카테고리 관심 신호", "판매 채널 탐색", "유통 환경 검토"],
    ["Market signal analysis", "Demand and channel signals", "Consumer demand and channels", "Early entry feasibility review", "Structuring channel exploration", "Localized content direction", "Category interest signals", "Sales channel exploration", "Distribution landscape review"]),
  signal("sg", "Singapore", "Asia",
    ["파트너 환경 검토", "사업·파트너 신호 수집", "동남아 연결 구조", "지역 파트너 네트워크 검토", "거점 역할 구체화", "콘텐츠 사업 기회", "시장 수요 흐름", "지역 연결 채널", "파트너 네트워크 구축"],
    ["Partner landscape review", "Business and partner signals", "Southeast Asia connectivity", "Regional partner network review", "Clarifying the hub role", "Content business opportunities", "Market demand signals", "Regional connection channels", "Partner network building"]),
  signal("kr", "Korea", "Asia",
    ["지속 모니터링", "브랜드·상품 신호 수집", "발굴·기획·검증 구조", "글로벌 확장 대상 검토", "시장 검증 준비", "브랜드 콘텐츠 자산", "초기 수요 가설", "진출 채널 후보", "생산·사업 파트너 환경"],
    ["Ongoing monitoring", "Brand and product signals", "Discovery, planning and validation", "Global expansion candidate review", "Preparing market validation", "Brand content assets", "Initial demand hypotheses", "Potential entry channels", "Production and business partners"]),
  signal("de", "Germany", "Europe",
    ["실행 기회 검토", "시장·경쟁 신호 수집", "소비재 수요와 경쟁 환경", "유럽 진입 전략 검토", "시장 가설 정리", "콘텐츠 적합성 검토", "소비자 수요 탐색", "유통 채널 구조", "현지 파트너 탐색"],
    ["Execution opportunity review", "Market and competition signals", "Consumer demand and competition", "European entry strategy review", "Structuring market hypotheses", "Content fit review", "Consumer demand discovery", "Distribution channel structure", "Local partner scouting"]),
  signal("ae", "UAE", "Middle East",
    ["파트너 네트워크 구축", "시장·파트너 신호 수집", "콘텐츠·소비재 환경", "현지 사업 기회 검토", "파트너 연결 방향 정리", "콘텐츠 수요 신호", "카테고리 관심 탐색", "유통 구조 검토", "현지 파트너 탐색"],
    ["Partner network building", "Market and partner signals", "Content and consumer goods", "Local opportunity review", "Structuring partner connections", "Content demand signals", "Category interest discovery", "Distribution structure review", "Local partner scouting"]),
  signal("us", "United States", "North America",
    ["파트너 환경 검토", "시장·채널 신호 수집", "브랜드·콘텐츠 진입 구조", "사업 협업 방식 검토", "진입 우선순위 정리", "콘텐츠 반응 탐색", "소비자 관심 흐름", "판매·배급 채널 구조", "사업 파트너 환경"],
    ["Partner landscape review", "Market and channel signals", "Brand and content entry models", "Business collaboration review", "Structuring entry priorities", "Content response discovery", "Consumer interest signals", "Sales and distribution channels", "Business partner landscape"]),
];

export const REGIONS: { key: "All" | MarketRegion; label: LocalizedText }[] = [
  { key: "All", label: { ko: "전체", en: "All" } },
  { key: "Asia", label: { ko: "아시아", en: "Asia" } },
  { key: "Europe", label: { ko: "유럽", en: "Europe" } },
  { key: "Middle East", label: { ko: "중동", en: "Middle East" } },
  { key: "North America", label: { ko: "북미", en: "North America" } },
];

export interface PartnerLogo {
  name: string;
  src: string;
  href?: string;
}

// The current main branch does not contain approved partner logo assets.
// Keep this data source separate so verified assets can be added without changing the section layout.
export const PARTNER_LOGOS: PartnerLogo[] = [];

export const T = {
  ko: {
    heroLabel: "HITPICK",
    heroHeading: "브랜드의 가능성을,\n글로벌 매출로.",
    heroMediaLabel: "BRAND → MARKET → DEMAND → SALES → EXPORT → GROWTH",
    heroFallback: "브랜드와 상품이 시장 데이터, 크리에이터 콘텐츠, 글로벌 판매와 수출 운영을 거쳐 성장하는 흐름",
    videoPause: "영상 일시정지",
    videoPlay: "영상 재생",
    introLabel: "HITPICK",
    introHeading: "시장의 신호부터,\n실행과 성장까지.",
    introDescription: "히트픽은 글로벌 시장의 신호를 읽고, 크리에이터와 함께 수요를 만들며 판매·수출·운영까지 직접 실행하여 브랜드의 성장을 완성합니다.",
    introCta: "프로젝트 시작하기",
    summarySteps: ["시장 검증", "수요 창출", "판매 실행", "수출 운영", "성장 확장"],
    executionLabel: "SERVICE × TECHNOLOGY",
    executionHeading: "시장을 찾고, 수요를 만들고,\n판매와 수출을 직접 실행합니다.",
    executionDescription: "히트픽은 해외시장 조사에서 끝나지 않습니다. 상품과 시장을 검증하고, 콘텐츠와 크리에이터로 수요를 만들며, 판매와 수출 운영, 리오더와 확장까지 연결합니다.",
    executionActions: "대표 실행",
    executionOutcomes: "핵심 결과",
    executionTechnology: "연결 기술",
    executionProgress: "현재 단계",
    previousStep: "이전 단계",
    nextStep: "다음 단계",
    technologyEngine: "히트픽 테크놀로지 엔진",
    technologyDescription: "각 실행 단계의 판단과 운영을 연결하는 하나의 기반 레이어입니다.",
    signalLabel: "GLOBAL SIGNAL COVERAGE",
    signalHeading: "시장마다 다른 신호를 읽고,\n글로벌 데이터를 계속 축적합니다.",
    signalDescription: "각 시장의 콘텐츠 반응, 소비 흐름, 채널 구조와 파트너 환경을 지속적으로 확보하고, 이를 시장 검증과 실행 전략 수립에 반영합니다.",
    signalMockupLabel: "시장 신호 모니터링 · 설명용 인터페이스",
    marketList: "시장 선택",
    signalLabels: {
      monitoring: "Monitoring Status",
      collected: "Collected Signals",
      coverage: "Data Coverage",
      action: "Hitpick Action",
      output: "Current Output",
    },
    signalCategories: { Content: "콘텐츠", Consumer: "소비자", Channel: "채널", Partner: "파트너" },
    partnerLabel: "GLOBAL PARTNER NETWORK",
    partnerHeading: "실행은 혼자가 아니라,\n글로벌 파트너 네트워크와 함께 이뤄집니다.",
    partnerDescription: "브랜드·제조사, 크리에이터, 판매·유통, 현지 운영 파트너와 함께 시장 검증부터 판매와 수출 운영까지 연결합니다.",
    partnerCategories: ["브랜드·제조사", "크리에이터", "판매·유통", "현지 운영"],
    partnerAssetNotice: "현재 공개 가능한 파트너 로고 자산을 확인 중입니다. 검증된 로고만 이 영역에 추가됩니다.",
    ctaLabel: "START A PROJECT",
    ctaHeading: "브랜드의 다음 시장을,\n히트픽과 함께 시작하세요.",
    ctaDescription: "시장 검증부터 크리에이터 기반 수요 창출, 글로벌 판매와 수출 운영까지 함께 설계하고 실행합니다.",
    ctaButton: "프로젝트 시작하기",
  },
  en: {
    heroLabel: "HITPICK",
    heroHeading: "Turn Brand Potential\ninto Global Revenue.",
    heroMediaLabel: "BRAND → MARKET → DEMAND → SALES → EXPORT → GROWTH",
    heroFallback: "A brand and product journey through market data, creator content, global sales, export operations and growth",
    videoPause: "Pause video",
    videoPlay: "Play video",
    introLabel: "HITPICK",
    introHeading: "From Market Signals\nto Execution and Growth.",
    introDescription: "HITPICK reads global market signals, builds demand with creators, and directly executes sales, export and operations to complete brand growth.",
    introCta: "Start a Project",
    summarySteps: ["Market Validation", "Demand Creation", "Sales Execution", "Export Operations", "Growth Expansion"],
    executionLabel: "SERVICE × TECHNOLOGY",
    executionHeading: "Find the Market. Build Demand.\nExecute Sales and Export.",
    executionDescription: "HITPICK goes beyond overseas market research. We validate product-market fit, create demand with content and creators, and connect sales and export operations with reorder and expansion.",
    executionActions: "What We Execute",
    executionOutcomes: "Core Outcomes",
    executionTechnology: "Connected Technology",
    executionProgress: "Current step",
    previousStep: "Previous step",
    nextStep: "Next step",
    technologyEngine: "HITPICK TECHNOLOGY ENGINE",
    technologyDescription: "One foundation layer connecting decisions and operations across every execution step.",
    signalLabel: "GLOBAL SIGNAL COVERAGE",
    signalHeading: "Read Local Signals.\nBuild Global Intelligence.",
    signalDescription: "We continuously collect content response, consumer movement, channel structure and partner context in each market, then apply those signals to market validation and execution strategy.",
    signalMockupLabel: "Market signal monitoring · illustrative interface",
    marketList: "Select a market",
    signalLabels: {
      monitoring: "Monitoring Status",
      collected: "Collected Signals",
      coverage: "Data Coverage",
      action: "Hitpick Action",
      output: "Current Output",
    },
    signalCategories: { Content: "Content", Consumer: "Consumer", Channel: "Channel", Partner: "Partner" },
    partnerLabel: "GLOBAL PARTNER NETWORK",
    partnerHeading: "Global execution is built\nwith a connected partner network.",
    partnerDescription: "We connect brands and manufacturers, creators, sales and distribution, and local operating partners from market validation through sales and export operations.",
    partnerCategories: ["Brands & Manufacturers", "Creators", "Sales & Distribution", "Local Operations"],
    partnerAssetNotice: "Public partner logo assets are being verified. Only confirmed logos will be added here.",
    ctaLabel: "START A PROJECT",
    ctaHeading: "Start Your Brand’s Next Market\nwith HITPICK.",
    ctaDescription: "Together, we design and execute market validation, creator-led demand creation, global sales and export operations.",
    ctaButton: "Start a Project",
  },
} as const satisfies Record<Lang, object>;
