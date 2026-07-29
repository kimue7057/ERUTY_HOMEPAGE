export const BLUE = "#3737F2";
export const DARK = "#18191B";
export const GRAY = "#737780";
export const BORDER = "#E4E6EA";
export const LIGHT_BG = "#F7F8FA";
export const NEAR_BLACK = "#111214";

export interface ProcessStep {
  num: string;
  en: string;
  ko: string;
  desc: string;
  descEn: string;
}

export interface MarketData {
  name: string;
  region: string;
  status: "Active" | "Testing" | "Market Development" | "Partner Network" | "Planned";
  businessArea: string;
  targetAsset: string;
  targetAssetEn: string;
  role: string;
  roleEn: string;
  partnerType: string;
  partnerTypeEn: string;
  activity: string;
  activityEn: string;
  project: string;
  projectEn: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    num: "01",
    en: "DISCOVER",
    ko: "기회 발굴",
    desc: "글로벌 확장 가능성이 있는 기업, 브랜드, 상품,\n콘텐츠와 IP를 발굴합니다.",
    descEn: "We identify companies, brands, products,\ncontent and IP with global expansion potential.",
  },
  {
    num: "02",
    en: "VALIDATE",
    ko: "시장 검증",
    desc: "국가별 수요, 경쟁환경, 가격대, 소비자와\n유통 채널을 분석해 우선 진출 시장을 선정합니다.",
    descEn: "We analyze demand, competition, pricing, consumers\nand distribution channels to select priority markets.",
  },
  {
    num: "03",
    en: "BUILD DEMAND",
    ko: "현지 수요 형성",
    desc: "시장에 적합한 콘텐츠, 크리에이터, 캠페인과\n파트너십을 활용해 구매와 관심의 이유를 만듭니다.",
    descEn: "We create reasons to buy and engage using market-fit\ncontent, creators, campaigns and partnerships.",
  },
  {
    num: "04",
    en: "EXECUTE",
    ko: "판매·배급·운영 실행",
    desc: "커머스 채널, 유통사와 배급사를 연결하고\n판매, 계약, 수출, 물류와 정산을 운영합니다.",
    descEn: "We connect commerce channels, distributors and partners,\nand operate sales, contracts, exports, logistics and settlement.",
  },
  {
    num: "05",
    en: "SCALE",
    ko: "성장과 시장 확장",
    desc: "성과 데이터를 바탕으로 리오더, 재구매,\n투자와 신규 국가 확장을 추진합니다.",
    descEn: "We drive reorders, repeat purchases,\ninvestment and new market expansion based on performance data.",
  },
];

export const MARKETS: MarketData[] = [
  {
    name: "Japan",
    region: "Asia",
    status: "Active",
    businessArea: "Brand & Product Expansion",
    targetAsset: "소비재 브랜드 · 뷰티 상품",
    targetAssetEn: "Consumer Brands · Beauty Products",
    role: "시장 검증 · 크리에이터 마케팅 · 커머스 운영",
    roleEn: "Market Validation · Creator Marketing · Commerce Operations",
    partnerType: "현지 유통사 · 이커머스 플랫폼",
    partnerTypeEn: "Local Distributors · E-commerce Platforms",
    activity: "한국 브랜드의 현지 수요 형성 및 판매 채널 운영",
    activityEn: "Building local demand for Korean brands and operating sales channels",
    project: "한국 브랜드의 현지 시장 검증과 크리에이터 기반 판매 실행",
    projectEn: "Market validation and creator-based sales execution for Korean brands",
  },
  {
    name: "Vietnam",
    region: "Asia",
    status: "Market Development",
    businessArea: "Content & IP · Brand Expansion",
    targetAsset: "콘텐츠 IP · 소비재 상품",
    targetAssetEn: "Content IP · Consumer Products",
    role: "사업 개발 · 파트너십 · 콘텐츠 사업화",
    roleEn: "Business Development · Partnerships · Content Commercialization",
    partnerType: "현지 콘텐츠·기술 파트너",
    partnerTypeEn: "Local Content & Tech Partners",
    activity: "글로벌 사업 개발 및 현지 파트너 네트워크 구축",
    activityEn: "Global business development and local partner network building",
    project: "현지 콘텐츠·기술 파트너와 함께 진행한 글로벌 사업 개발",
    projectEn: "Global business development with local content and tech partners",
  },
  {
    name: "Taiwan",
    region: "Asia",
    status: "Testing",
    businessArea: "Brand & Product Expansion",
    targetAsset: "K-브랜드 · 소비재",
    targetAssetEn: "K-Brands · Consumer Goods",
    role: "시장 검증 · 채널 탐색",
    roleEn: "Market Validation · Channel Exploration",
    partnerType: "이커머스 · 현지 유통 채널",
    partnerTypeEn: "E-commerce · Local Distribution Channels",
    activity: "시장 진입 가능성 검토 및 초기 채널 테스트",
    activityEn: "Market entry feasibility review and initial channel testing",
    project: "대만 시장 소비재 채널 진입 테스트",
    projectEn: "Consumer goods channel entry testing in the Taiwan market",
  },
  {
    name: "Singapore",
    region: "Asia",
    status: "Partner Network",
    businessArea: "Content & IP · Business Expansion",
    targetAsset: "IP · 콘텐츠 · 브랜드",
    targetAssetEn: "IP · Content · Brand",
    role: "파트너십 허브 · 동남아 거점",
    roleEn: "Partnership Hub · Southeast Asia Base",
    partnerType: "미디어 · 투자 · 유통 파트너",
    partnerTypeEn: "Media · Investment · Distribution Partners",
    activity: "동남아 사업 확장을 위한 파트너 네트워크 운영",
    activityEn: "Operating partner networks for Southeast Asia business expansion",
    project: "동남아 글로벌 사업 거점 구축",
    projectEn: "Building a Southeast Asia global business hub",
  },
  {
    name: "Korea",
    region: "Asia",
    status: "Active",
    businessArea: "Base Operations",
    targetAsset: "전체 자산",
    targetAssetEn: "All Assets",
    role: "사업 기획 · 검증 · 실행 총괄",
    roleEn: "Business Planning · Validation · Execution Management",
    partnerType: "국내 파트너 · 생산자 · 기업",
    partnerTypeEn: "Domestic Partners · Producers · Companies",
    activity: "글로벌 확장 대상 발굴 및 사업 기획 운영",
    activityEn: "Identifying global expansion candidates and managing business planning",
    project: "국내 기업·브랜드 글로벌 확장 기획",
    projectEn: "Global expansion planning for domestic companies and brands",
  },
  {
    name: "Germany",
    region: "Europe",
    status: "Planned",
    businessArea: "Brand & Product Expansion",
    targetAsset: "소비재 · K-콘텐츠",
    targetAssetEn: "Consumer Goods · K-Content",
    role: "시장 분석 · 진입 전략 설계",
    roleEn: "Market Analysis · Entry Strategy Design",
    partnerType: "현지 유통 파트너 (탐색 중)",
    partnerTypeEn: "Local Distribution Partners (Scouting)",
    activity: "유럽 시장 진입 전략 수립 단계",
    activityEn: "Formulating European market entry strategy",
    project: "유럽 소비재 시장 진입 타당성 검토",
    projectEn: "European consumer goods market entry feasibility study",
  },
  {
    name: "UAE",
    region: "Middle East",
    status: "Market Development",
    businessArea: "Content & IP · Brand Expansion",
    targetAsset: "K-콘텐츠 · 뷰티 · 식품",
    targetAssetEn: "K-Content · Beauty · Food",
    role: "현지 파트너 연결 · 콘텐츠 배급",
    roleEn: "Local Partner Connection · Content Distribution",
    partnerType: "미디어 파트너 · 유통사",
    partnerTypeEn: "Media Partners · Distributors",
    activity: "중동 시장 사업 개발 및 파트너 탐색",
    activityEn: "Middle East market business development and partner scouting",
    project: "중동 K-콘텐츠 및 소비재 시장 진입",
    projectEn: "K-Content and consumer goods market entry in the Middle East",
  },
  {
    name: "United States",
    region: "North America",
    status: "Partner Network",
    businessArea: "Content & IP · Brand Expansion",
    targetAsset: "IP · 포맷 · 브랜드",
    targetAssetEn: "IP · Format · Brand",
    role: "배급 · 라이선싱 · 브랜드 협업",
    roleEn: "Distribution · Licensing · Brand Collaboration",
    partnerType: "미디어 · 유통 · 투자 네트워크",
    partnerTypeEn: "Media · Distribution · Investment Network",
    activity: "북미 콘텐츠 IP 사업화 및 브랜드 진출 파트너십",
    activityEn: "North America content IP commercialization and brand entry partnerships",
    project: "북미 IP 라이선싱 및 한국 브랜드 진출 지원",
    projectEn: "North America IP licensing and Korean brand entry support",
  },
];

export const REGIONS = ["All", "Asia", "Europe", "Middle East", "North America"];

export const STATUS_COLORS: Record<string, string> = {
  "Active": BLUE,
  "Testing": "#E8891A",
  "Market Development": "#2C9E5F",
  "Partner Network": "#7B5EA7",
  "Planned": GRAY,
};

export const T = {
  ko: {
    heroHeading: "글로벌 진출을,\n실제 사업으로.",
    heroDesc: "Hitpick은 시장 검증, 콘텐츠·크리에이터 마케팅,\n판매·유통 운영을 연결해 기업의 해외 진출과 성장을 실행합니다.",
    heroCTA: "글로벌 사업 제안하기",
    heroSecondary: "진행 방식 살펴보기",
    flowAriaLabel: "Hitpick 글로벌 사업 확장 플로우",
    entryLabel: "WHAT HITPICK EXPANDS",
    entryHeading: "서로 다른 자산을,\n하나의 글로벌 사업으로 확장합니다.",
    entryDesc: "기업과 브랜드의 해외 진출부터 콘텐츠와 IP의 글로벌 사업화까지,\n하나의 시장 검증과 실행체계 안에서 연결합니다.",
    brandHeading: "기업과 브랜드의 해외 진출",
    brandDesc: "현지 시장을 검증하고 콘텐츠와 크리에이터를 활용해\n수요를 만든 뒤, 판매·유통·수출 운영까지 실행합니다.",
    brandTags: ["국가·시장 검증", "현지 콘텐츠 전략", "크리에이터 캠페인", "판매 채널 운영", "유통·수출·물류", "리오더·재구매·국가 확장"],
    contentHeading: "콘텐츠와 IP의\n글로벌 사업화",
    contentDesc: "콘텐츠와 IP를 글로벌 배급, 투자·공동제작,\n라이선싱과 브랜드 협업으로 확장합니다.",
    contentItems: ["글로벌 배급", "투자·공동제작", "IP·포맷 라이선싱", "브랜드 콘텐츠 협업", "권리·계약·수익화"],
    executionNote: "두 경로는 하나의 실행 체계로 연결됩니다.",
    processLabel: "HOW HITPICK WORKS",
    processHeading: "시장 진입부터 성장까지,\n하나의 과정으로 실행합니다.",
    processDesc: "분석이나 연결에서 끝나지 않고,\n현지 수요 형성과 판매·유통 운영까지 직접 이어갑니다.",
    intelLabel: "HITPICK INTELLIGENCE",
    intelHeading: "글로벌 사업의 판단을\n데이터로 더 정확하게.",
    intelDesc: "시장, 소비자, 콘텐츠, 채널과 판매 데이터를 분석해\n진출 국가와 실행 방식을 설계합니다.",
    intelInputs: [
      { label: "MARKET DATA", value: "시장 규모 · 트렌드 · 가격 · 경쟁" },
      { label: "AUDIENCE DATA", value: "소비자 · 오디언스 · 팬덤 · 반응" },
      { label: "CONTENT DATA", value: "콘텐츠 유형 · 메시지 · 크리에이터 적합도" },
      { label: "BUSINESS DATA", value: "채널 · 판매 · 배급 · 비용 · 운영 성과" },
    ],
    intelOutputs: ["우선 진출 시장", "가격·상품 전략", "콘텐츠 방향", "적합 크리에이터", "판매·유통 채널", "현지 파트너", "다음 확장 기회"],
    marketsLabel: "MARKETS & PROJECTS",
    marketsHeading: "시장마다 다른 방식으로,\n글로벌 사업을 실행합니다.",
    marketsDesc: "각 시장의 소비자, 채널과 파트너 환경에 맞춰\n진입 방식과 실행 구조를 다르게 설계합니다.",
    detailLabels: { Status: "Status", "Business Area": "Business Area", "Target Asset": "Target Asset", "Hitpick Role": "Hitpick Role", "Local Partner": "Local Partner", "Current Activity": "Current Activity" },
    exampleNote: "* 예시 프로젝트 구조 — 실제 정보로 교체 예정",
    ctaHeading: "어떤 가능성을\n글로벌 사업으로 확장하시겠습니까?",
    ctaDesc: "브랜드와 상품의 해외 진출부터 콘텐츠·IP의 배급과 투자,\n현지 유통과 사업 파트너십까지 Hitpick과 함께 시작할 수 있습니다.",
    ctaPrimary: "Hitpick에 사업 제안하기",
    ctaSecondary: "이루티에 문의하기",
    inquiryPaths: [
      { key: "brand", label: "기업·브랜드", desc: "브랜드와 상품을 해외 시장으로 확장하고 싶습니다." },
      { key: "content", label: "콘텐츠·IP", desc: "콘텐츠의 배급, 투자 또는 라이선싱을 진행하고 싶습니다." },
      { key: "creator", label: "크리에이터·마케팅", desc: "글로벌 크리에이터 캠페인과 콘텐츠 협업을 진행하고 싶습니다." },
      { key: "partner", label: "글로벌 파트너", desc: "현지 유통, 배급, 투자 또는 사업 파트너로 협력하고 싶습니다." },
    ],
    validateNote: "* 예시 데이터 — 실제 분석 데이터로 교체 예정",
    validateProjectNote: "* 예시 프로젝트 구조 — 실제 정보로 교체 예정",
  },
  en: {
    heroHeading: "Global expansion,\nas a real business.",
    heroDesc: "Hitpick connects market validation, content & creator marketing,\nand sales & distribution operations to execute your global growth.",
    heroCTA: "Propose a Global Business",
    heroSecondary: "See How It Works",
    flowAriaLabel: "Hitpick Global Business Expansion Flow",
    entryLabel: "WHAT HITPICK EXPANDS",
    entryHeading: "Different assets,\none global business expansion.",
    entryDesc: "From overseas expansion for companies and brands to global commercialization of content and IP,\nall connected within one market validation and execution system.",
    brandHeading: "Overseas Expansion for Companies & Brands",
    brandDesc: "We validate local markets, build demand using content and creators,\nthen execute sales, distribution and export operations.",
    brandTags: ["Country & Market Validation", "Local Content Strategy", "Creator Campaigns", "Sales Channel Operations", "Distribution · Export · Logistics", "Reorder · Repurchase · Market Expansion"],
    contentHeading: "Global Commercialization\nof Content & IP",
    contentDesc: "We expand content and IP through global distribution,\ninvestment, co-production, licensing and brand collaboration.",
    contentItems: ["Global Distribution", "Investment · Co-Production", "IP · Format Licensing", "Brand Content Collaboration", "Rights · Contracts · Monetization"],
    executionNote: "Both paths are connected within one execution system.",
    processLabel: "HOW HITPICK WORKS",
    processHeading: "From market entry to growth,\nexecuted as one process.",
    processDesc: "We don't stop at analysis or connections —\nwe continue through local demand creation and sales & distribution operations.",
    intelLabel: "HITPICK INTELLIGENCE",
    intelHeading: "Better decisions for global business,\npowered by data.",
    intelDesc: "We analyze market, consumer, content, channel and sales data\nto design your market entry and execution approach.",
    intelInputs: [
      { label: "MARKET DATA", value: "Market Size · Trends · Pricing · Competition" },
      { label: "AUDIENCE DATA", value: "Consumers · Audiences · Fandoms · Reactions" },
      { label: "CONTENT DATA", value: "Content Type · Message · Creator Fit" },
      { label: "BUSINESS DATA", value: "Channels · Sales · Distribution · Cost · Ops Performance" },
    ],
    intelOutputs: ["Priority Market", "Pricing & Product Strategy", "Content Direction", "Right Creators", "Sales & Distribution Channels", "Local Partners", "Next Expansion Opportunity"],
    marketsLabel: "MARKETS & PROJECTS",
    marketsHeading: "Different approaches per market,\none global business execution.",
    marketsDesc: "We design entry methods and execution structures\nto fit each market's consumers, channels and partner landscape.",
    detailLabels: { Status: "Status", "Business Area": "Business Area", "Target Asset": "Target Asset", "Hitpick Role": "Hitpick Role", "Local Partner": "Local Partner", "Current Activity": "Current Activity" },
    exampleNote: "* Example project structure — to be replaced with actual information",
    ctaHeading: "What possibility will you\nexpand into a global business?",
    ctaDesc: "From overseas brand and product expansion to content & IP distribution and investment,\nlocal distribution and business partnerships — you can start with Hitpick.",
    ctaPrimary: "Propose a Business to Hitpick",
    ctaSecondary: "Contact ERUTY",
    inquiryPaths: [
      { key: "brand", label: "Company · Brand", desc: "I want to expand my brand and products to overseas markets." },
      { key: "content", label: "Content · IP", desc: "I want to pursue distribution, investment or licensing of content." },
      { key: "creator", label: "Creator · Marketing", desc: "I want to run global creator campaigns and content collaborations." },
      { key: "partner", label: "Global Partner", desc: "I want to collaborate as a local distribution, distribution, investment or business partner." },
    ],
    validateNote: "* Sample data — to be replaced with actual analysis data",
    validateProjectNote: "* Example project structure — to be replaced with actual information",
  },
};
