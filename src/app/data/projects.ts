export type ProjectCategory =
  | "global-business"
  | "products-services"
  | "rnd"
  | "ict-app"
  | "erumter-education";

export type ProjectVisibility = "published" | "draft" | "hidden";

export type LocalizedText = {
  ko: string;
  en: string;
};

export type Project = {
  id: string;
  featured?: boolean;
  visibility: ProjectVisibility;
  categories: ProjectCategory[];
  title: LocalizedText;
  summary: LocalizedText;
  role: LocalizedText;
  scope: LocalizedText[];
  outcome: LocalizedText;
  status: LocalizedText;
  market: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  visualType: "image";
  visualIsConcept: true;
};

export const CATEGORY_LABELS: Record<ProjectCategory, LocalizedText> = {
  "global-business": { ko: "글로벌 사업", en: "Global Business" },
  "products-services": { ko: "제품·서비스", en: "Products & Services" },
  rnd: { ko: "R&D", en: "R&D" },
  "ict-app": { ko: "ICT·앱 개발", en: "ICT & App Development" },
  "erumter-education": {
    ko: "이룸터 AX 교육",
    en: "Erumter AX Education",
  },
};

export const PROJECTS: Project[] = [
  {
    id: "global-brand-commercialization",
    featured: true,
    visibility: "published",
    categories: ["global-business"],
    title: {
      ko: "글로벌 브랜드 사업화 프로젝트",
      en: "Global Brand Commercialization Project",
    },
    summary: {
      ko: "국내 유망 제품의 해외시장 가능성을 검토하고, 국가별 브랜드 전략과 크리에이터 마케팅, 글로벌 판매·수출 운영을 연결한 프로젝트입니다.",
      en: "A global commercialization project connecting overseas market validation, localized brand strategy, creator marketing, global sales, and export operations for promising Korean products.",
    },
    role: {
      ko: "제품과 시장을 분석하고 현지화된 브랜드 전략을 수립한 뒤, 크리에이터 콘텐츠를 활용한 수요 창출과 실제 판매·수출 운영까지 통합적으로 수행했습니다.",
      en: "ERUTY analyzed products and target markets, developed localized brand strategies, created demand through creator-led content, and managed global sales and export operations.",
    },
    scope: [
      { ko: "유망 제품 및 제조사 발굴", en: "Discovery of promising products and manufacturers" },
      { ko: "국가별 시장·소비자·경쟁 환경 분석", en: "Country-specific market, consumer, and competitor analysis" },
      { ko: "브랜드 포지셔닝과 현지화 전략", en: "Brand positioning and localization strategy" },
      { ko: "국내·현지 크리에이터 발굴 및 콘텐츠 실행", en: "Korean and local creator discovery and content execution" },
      { ko: "글로벌 판매 채널 운영", en: "Global sales channel operations" },
      { ko: "물류·통관·정산 등 수출 운영", en: "Export operations including logistics, customs, and settlement" },
      { ko: "판매 데이터 분석과 시장 확장", en: "Sales data analysis and market expansion" },
    ],
    outcome: {
      ko: "시장 검증부터 수요 창출, 판매와 수출 운영까지 분절된 글로벌 사업화 과정을 하나의 실행 구조로 연결했습니다.",
      en: "ERUTY connected market validation, demand creation, global sales, and export operations into one integrated commercialization process.",
    },
    status: {
      ko: "글로벌 사업화 프로젝트",
      en: "Global Commercialization Project",
    },
    market: {
      ko: "글로벌 소비재 시장",
      en: "Global Consumer Markets",
    },
    image: "/images/projects/01-global-brand-commercialization.webp",
    imageAlt: {
      ko: "제품 시장 분석, 크리에이터 콘텐츠, 글로벌 판매와 수출 운영을 표현한 콘셉트 이미지",
      en: "Concept image representing product market analysis, creator content, global sales, and export operations",
    },
    visualType: "image",
    visualIsConcept: true,
  },
  {
    id: "3d-marketplace",
    visibility: "published",
    categories: ["products-services"],
    title: { ko: "3D 마켓플레이스 구축", en: "3D Marketplace Development" },
    summary: {
      ko: "3D 디지털 에셋과 콘텐츠를 등록하고 탐색·관리·거래할 수 있도록 구축한 웹 기반 마켓플레이스입니다.",
      en: "A web-based marketplace developed for registering, discovering, managing, and trading 3D digital assets and content.",
    },
    role: {
      ko: "3D 콘텐츠의 등록부터 검색, 상세 조회와 거래까지 이어지는 플랫폼 구조와 사용자·관리자 서비스를 설계·개발했습니다.",
      en: "ERUTY designed and developed the platform structure and user and administrator services covering 3D content registration, discovery, viewing, and transactions.",
    },
    scope: [
      { ko: "3D 에셋 등록 및 관리", en: "3D asset registration and management" },
      { ko: "콘텐츠 분류와 검색", en: "Content categorization and search" },
      { ko: "콘텐츠 상세 조회", en: "Detailed content viewing" },
      { ko: "판매자·구매자 이용 흐름", en: "Seller and buyer user flows" },
      { ko: "거래 및 콘텐츠 유통 구조", en: "Transaction and content distribution structure" },
      { ko: "사용자·관리자 웹 서비스", en: "User and administrator web services" },
    ],
    outcome: {
      ko: "3D 에셋을 체계적으로 등록하고 탐색·거래할 수 있는 웹 기반 마켓플레이스를 구축했습니다.",
      en: "ERUTY built a web-based marketplace for structured registration, discovery, and transactions of 3D assets.",
    },
    status: { ko: "플랫폼 구축 프로젝트", en: "Platform Development Project" },
    market: { ko: "3D 디지털 콘텐츠 시장", en: "3D Digital Content Market" },
    image: "/images/projects/02-3d-marketplace.webp",
    imageAlt: {
      ko: "3D 에셋이 등록된 디지털 마켓플레이스 화면을 표현한 콘셉트 이미지",
      en: "Concept image of a digital marketplace displaying registered 3D assets",
    },
    visualType: "image",
    visualIsConcept: true,
  },
  {
    id: "mental-wellness-service",
    visibility: "published",
    categories: ["products-services"],
    title: {
      ko: "마음돌봄 서비스 개발",
      en: "Digital Mental Wellness Service Development",
    },
    summary: {
      ko: "사용자가 AI 캐릭터와 일상적인 대화를 나누고 자신의 감정과 경험을 기록할 수 있도록 개발한 마음돌봄 서비스입니다.",
      en: "A digital mental wellness service that enables users to have everyday conversations with an AI character and record their emotions and experiences.",
    },
    role: {
      ko: "부산진구정신건강복지센터와 협력하여 서비스 구조, 대화형 AI 흐름, 감정 기록과 개인 맞춤형 콘텐츠 제공 기능을 개발했습니다.",
      en: "In collaboration with the Busanjin-gu Mental Health Welfare Center, ERUTY developed the service structure, conversational AI flow, emotion recording, and personalized content features.",
    },
    scope: [
      { ko: "AI 캐릭터 기반 일상 대화", en: "AI character-based everyday conversation" },
      { ko: "사용자 감정과 경험 기록", en: "Recording of user emotions and experiences" },
      { ko: "대화 내용 기반 감정 분석", en: "Conversation-based emotion analysis" },
      { ko: "개인 맞춤형 콘텐츠 생성", en: "Personalized content generation" },
      { ko: "마음돌봄 서비스 UI·UX", en: "Mental wellness service UI and UX" },
      { ko: "사용자·관리자 시스템", en: "User and administrator systems" },
    ],
    outcome: {
      ko: "일상적인 대화와 감정 기록을 기반으로 사용자의 마음돌봄을 지원하는 AI 서비스를 개발했습니다.",
      en: "ERUTY developed an AI service supporting everyday mental wellness through conversation and emotion recording.",
    },
    status: {
      ko: "부산진구정신건강복지센터 협력 개발",
      en: "Developed in Collaboration with the Busanjin-gu Mental Health Welfare Center",
    },
    market: {
      ko: "마음건강·디지털 돌봄 서비스",
      en: "Mental Wellness and Digital Care Services",
    },
    image: "/images/projects/03-mental-wellness-service.webp",
    imageAlt: {
      ko: "사용자가 스마트폰으로 AI 캐릭터와 대화하며 감정을 기록하는 모습을 표현한 콘셉트 이미지",
      en: "Concept image of a user recording emotions through a smartphone conversation with an AI character",
    },
    visualType: "image",
    visualIsConcept: true,
  },
  {
    id: "blockchain-content-rights",
    visibility: "published",
    categories: ["rnd"],
    title: {
      ko: "블록체인 기반 콘텐츠 저작권 관리·거래 시스템",
      en: "Blockchain-Based Content Rights Management and Transaction System",
    },
    summary: {
      ko: "콘텐츠의 권리 정보를 등록하고 계약, 거래와 관련 이력을 신뢰 가능한 형태로 관리하기 위해 개발한 블록체인 기반 시스템입니다.",
      en: "A blockchain-based system developed to register content rights and reliably manage related contracts and transaction records.",
    },
    role: {
      ko: "콘텐츠 권리 구조 모델링부터 계약·거래 기록, 블록체인 기반 이력 관리와 운영 인터페이스까지 설계·개발했습니다.",
      en: "ERUTY designed and developed content rights modeling, contract and transaction records, blockchain-based history management, and operational interfaces.",
    },
    scope: [
      { ko: "콘텐츠 저작권 등록 및 관리", en: "Content copyright registration and management" },
      { ko: "권리자와 권리 구조 관리", en: "Rights holder and ownership structure management" },
      { ko: "계약 및 거래 이력 기록", en: "Contract and transaction history recording" },
      { ko: "블록체인 기반 이력 추적", en: "Blockchain-based history tracking" },
      { ko: "수익·정산 정보 관리", en: "Revenue and settlement information management" },
      { ko: "사용자·관리자 인터페이스", en: "User and administrator interfaces" },
    ],
    outcome: {
      ko: "콘텐츠 권리와 계약·거래 이력을 체계적으로 기록하고 관리할 수 있는 블록체인 시스템을 개발했습니다.",
      en: "ERUTY developed a blockchain system for structured recording and management of content rights, contracts, and transaction histories.",
    },
    status: { ko: "기업부설연구소 R&D", en: "Corporate R&D Center Project" },
    market: { ko: "콘텐츠 권리·계약 관리", en: "Content Rights and Contract Management" },
    image: "/images/projects/04-blockchain-content-rights.webp",
    imageAlt: {
      ko: "콘텐츠 권리, 계약과 거래 기록이 블록체인으로 연결되는 구조를 표현한 콘셉트 이미지",
      en: "Concept image representing content rights, contracts, and transaction records connected through blockchain",
    },
    visualType: "image",
    visualIsConcept: true,
  },
  {
    id: "generative-ai-emotion-analysis",
    visibility: "published",
    categories: ["rnd"],
    title: {
      ko: "생성형 AI 기반 감정 분석 시스템",
      en: "Generative AI-Based Emotion Analysis System",
    },
    summary: {
      ko: "사용자의 대화와 텍스트 데이터를 분석해 감정 상태를 분류하고, 분석 결과를 바탕으로 개인 맞춤형 콘텐츠를 생성하는 AI 시스템입니다.",
      en: "An AI system that analyzes conversation and text data, classifies emotional states, and generates personalized content based on the analysis.",
    },
    role: {
      ko: "감정 데이터 구조, 분석 모델 적용 방식, 세부 감정 분류와 개인화 콘텐츠 생성을 위한 시스템을 연구·개발했습니다.",
      en: "ERUTY researched and developed the emotion data structure, model application process, detailed emotion classification, and personalized content generation system.",
    },
    scope: [
      { ko: "감정 데이터 수집 및 구조화", en: "Emotion data collection and structuring" },
      { ko: "대화·텍스트 기반 감정 분석", en: "Conversation and text-based emotion analysis" },
      { ko: "세부 감정 분류", en: "Detailed emotion classification" },
      { ko: "감정 변화와 분석 결과 요약", en: "Emotion trend and analysis summarization" },
      { ko: "개인 맞춤형 콘텐츠 생성", en: "Personalized content generation" },
      { ko: "분석·관리 인터페이스", en: "Analysis and management interfaces" },
    ],
    outcome: {
      ko: "생성형 AI를 활용해 사용자의 감정을 분석하고 개인화된 콘텐츠로 연결하는 기술 구조를 개발했습니다.",
      en: "ERUTY developed a technology structure that analyzes user emotions with generative AI and connects the analysis to personalized content.",
    },
    status: { ko: "기업부설연구소 R&D", en: "Corporate R&D Center Project" },
    market: {
      ko: "감정 분석·개인화 AI 서비스",
      en: "Emotion Analysis and Personalized AI Services",
    },
    image: "/images/projects/05-generative-ai-emotion-analysis.webp",
    imageAlt: {
      ko: "대화 데이터를 감정 스펙트럼으로 분석하고 개인화 콘텐츠를 생성하는 AI 화면 콘셉트 이미지",
      en: "Concept image of an AI interface analyzing conversation data into an emotion spectrum and generating personalized content",
    },
    visualType: "image",
    visualIsConcept: true,
  },
  {
    id: "blockchain-logistics-branding",
    visibility: "published",
    categories: ["rnd", "global-business"],
    title: {
      ko: "블록체인 물류 브랜딩 시스템",
      en: "Blockchain Logistics and Branding System",
    },
    summary: {
      ko: "제품의 생산과 출고부터 수출·통관·배송과 고객 도달까지의 주요 이력을 블록체인에 기록하고, 소비자가 제품의 이동 과정을 확인할 수 있도록 개발한 시스템입니다.",
      en: "A system developed to record product production, shipment, export, customs, delivery, and customer arrival histories on blockchain and make the product journey verifiable to consumers.",
    },
    role: {
      ko: "제품과 물류 단계의 증빙 정보를 구조화하고, 이동 이력과 관련 문서를 블록체인에 기록해 브랜드와 소비자가 확인할 수 있는 시스템을 설계·개발했습니다.",
      en: "ERUTY structured product and logistics evidence and designed a blockchain-based system enabling brands and consumers to verify movement histories and related documents.",
    },
    scope: [
      { ko: "제품 및 제조 정보 등록", en: "Product and manufacturing information registration" },
      { ko: "제품·로트별 식별 정보 관리", en: "Product and lot-level identification management" },
      { ko: "출고·운송·수출·통관 이력 기록", en: "Shipment, transport, export, and customs history recording" },
      { ko: "물류 관련 증빙 문서 연결", en: "Connection of logistics evidence documents" },
      { ko: "소비자용 제품 이력 확인 화면", en: "Consumer-facing product history verification interface" },
      { ko: "브랜드·파트너용 운영 대시보드", en: "Brand and partner operations dashboard" },
      { ko: "정산·결제 기능 확장 구조", en: "Extensible structure for settlement and payment features" },
    ],
    outcome: {
      ko: "제품이 생산되어 해외 고객에게 도달하는 과정을 신뢰 가능한 이력으로 기록하고, 해당 정보를 브랜드와 소비자가 확인할 수 있는 시스템 구조를 개발했습니다.",
      en: "ERUTY developed a system structure that records the product journey to overseas customers as a verifiable history accessible to brands and consumers.",
    },
    status: { ko: "기업부설연구소 R&D", en: "Corporate R&D Center Project" },
    market: {
      ko: "글로벌 소비재·수출 물류",
      en: "Global Consumer Goods and Export Logistics",
    },
    image: "/images/projects/06-blockchain-logistics-branding.webp",
    imageAlt: {
      ko: "제품의 생산, 출고, 수출, 통관, 배송과 소비자 확인 과정을 표현한 블록체인 물류 콘셉트 이미지",
      en: "Concept image representing blockchain-verified production, shipment, export, customs, delivery, and consumer verification",
    },
    visualType: "image",
    visualIsConcept: true,
  },
  {
    id: "smartwatch-golf-shoe-ict",
    visibility: "published",
    categories: ["ict-app"],
    title: {
      ko: "스마트워치·골프화 연동 ICT 앱 서비스 개발",
      en: "Smartwatch and Golf Shoe Connected ICT App Development",
    },
    summary: {
      ko: "스마트워치와 골프화에서 수집되는 데이터를 모바일 앱과 연동해 사용자의 활동 정보를 확인하고 관리할 수 있도록 개발한 ICT 서비스입니다.",
      en: "An ICT service developed to connect data from a smartwatch and golf shoes to a mobile application for viewing and managing user activity information.",
    },
    role: {
      ko: "웨어러블 기기와 골프화의 데이터 연동 구조, 데이터 처리와 모바일 사용자 서비스를 설계·개발했습니다.",
      en: "ERUTY designed and developed the data integration structure, processing flow, and mobile user service connecting wearable devices and golf shoes.",
    },
    scope: [
      { ko: "스마트워치 데이터 연동", en: "Smartwatch data integration" },
      { ko: "골프화 데이터 연동 구조", en: "Golf shoe data integration structure" },
      { ko: "디바이스 데이터 수집 및 처리", en: "Device data collection and processing" },
      { ko: "모바일 앱 개발", en: "Mobile application development" },
      { ko: "사용자 데이터 조회", en: "User data viewing" },
      { ko: "서비스 운영·관리 기능", en: "Service operations and management features" },
    ],
    outcome: {
      ko: "복수의 디바이스 데이터를 모바일 앱으로 연결하고 사용자에게 활동 정보를 제공하는 ICT 서비스를 개발했습니다.",
      en: "ERUTY developed an ICT service connecting multiple device data sources to a mobile app and presenting activity information to users.",
    },
    status: { ko: "ICT 앱 개발 프로젝트", en: "ICT App Development Project" },
    market: { ko: "스포츠·웨어러블 ICT", en: "Sports and Wearable ICT" },
    image: "/images/projects/07-smartwatch-golf-shoe-ict.webp",
    imageAlt: {
      ko: "골프장에서 스마트워치와 골프화를 착용한 사용자가 모바일 앱을 확인하는 콘셉트 이미지",
      en: "Concept image of a golfer using a mobile app connected to a smartwatch and golf shoes",
    },
    visualType: "image",
    visualIsConcept: true,
  },
  {
    id: "apartment-maintenance-app",
    visibility: "published",
    categories: ["ict-app"],
    title: {
      ko: "하자보수·아파트 관리 앱 서비스 개발",
      en: "Apartment Defect Repair and Management App Development",
    },
    summary: {
      ko: "아파트 입주민과 관리 주체가 하자보수 요청과 처리 현황을 등록·확인하고 공동주택 관리 업무를 운영할 수 있도록 개발한 앱 서비스입니다.",
      en: "An app service developed for apartment residents and management teams to submit and track defect repair requests and manage residential maintenance operations.",
    },
    role: {
      ko: "하자 접수부터 담당자 배정, 처리 상태 확인과 관리 업무까지 연결되는 모바일·관리자 시스템을 설계·개발했습니다.",
      en: "ERUTY designed and developed mobile and administrator systems connecting defect submission, staff assignment, repair status tracking, and management operations.",
    },
    scope: [
      { ko: "하자보수 요청 접수", en: "Defect repair request submission" },
      { ko: "사진과 요청 내용 등록", en: "Photo and request detail registration" },
      { ko: "담당자 배정", en: "Staff assignment" },
      { ko: "처리 단계와 상태 관리", en: "Repair stage and status management" },
      { ko: "입주민 진행 현황 확인", en: "Resident progress tracking" },
      { ko: "관리자 운영 시스템", en: "Administrator operations system" },
    ],
    outcome: {
      ko: "입주민과 관리 주체가 하자보수 접수와 처리 과정을 함께 확인할 수 있는 관리 서비스를 개발했습니다.",
      en: "ERUTY developed a management service enabling residents and property managers to share and track the defect repair process.",
    },
    status: { ko: "앱 서비스 개발 프로젝트", en: "App Service Development Project" },
    market: { ko: "공동주택·시설 관리", en: "Residential and Facility Management" },
    image: "/images/projects/08-apartment-maintenance-app.webp",
    imageAlt: {
      ko: "입주민이 아파트 하자를 스마트폰으로 접수하고 관리자가 처리 상태를 확인하는 콘셉트 이미지",
      en: "Concept image of a resident submitting an apartment defect through a smartphone while a manager reviews its status",
    },
    visualType: "image",
    visualIsConcept: true,
  },
  {
    id: "ar-vr-web-app",
    visibility: "published",
    categories: ["ict-app"],
    title: { ko: "AR·VR 웹·앱 서비스 개발", en: "AR and VR Web and App Service Development" },
    summary: {
      ko: "AR과 VR 기술을 활용한 디지털 콘텐츠를 웹과 모바일 환경에서 경험할 수 있도록 개발한 인터랙티브 서비스입니다.",
      en: "An interactive service developed for experiencing AR and VR digital content across web and mobile environments.",
    },
    role: {
      ko: "AR·VR 콘텐츠의 사용자 경험, 웹·앱 서비스 구조와 인터랙티브 화면을 설계·개발했습니다.",
      en: "ERUTY designed and developed the user experience, web and app service structure, and interactive interfaces for AR and VR content.",
    },
    scope: [
      { ko: "AR 콘텐츠 연동", en: "AR content integration" },
      { ko: "VR 콘텐츠 경험 구조", en: "VR content experience structure" },
      { ko: "웹·모바일 서비스 개발", en: "Web and mobile service development" },
      { ko: "인터랙티브 콘텐츠 제어", en: "Interactive content control" },
      { ko: "콘텐츠 관리 기능", en: "Content management features" },
      { ko: "사용자·관리자 인터페이스", en: "User and administrator interfaces" },
    ],
    outcome: {
      ko: "AR·VR 콘텐츠를 다양한 디바이스와 웹 환경에서 경험하고 관리할 수 있는 인터랙티브 서비스를 개발했습니다.",
      en: "ERUTY developed an interactive service for experiencing and managing AR and VR content across multiple devices and web environments.",
    },
    status: { ko: "AR·VR 서비스 개발 프로젝트", en: "AR and VR Service Development Project" },
    market: { ko: "실감형 디지털 콘텐츠", en: "Immersive Digital Content" },
    image: "/images/projects/09-ar-vr-web-app.webp",
    imageAlt: {
      ko: "사용자가 모바일 AR과 VR 기기로 3D 디지털 콘텐츠를 체험하는 콘셉트 이미지",
      en: "Concept image of a user experiencing 3D digital content through mobile AR and a VR device",
    },
    visualType: "image",
    visualIsConcept: true,
  },
  {
    id: "erumter-ax-work-automation-training",
    visibility: "published",
    categories: ["erumter-education"],
    title: {
      ko: "이룸터 AX 업무 자동화 교육 프로그램",
      en: "Erumter AX Workflow Automation Training Program",
    },
    summary: {
      ko: "기업과 기관의 실무자가 자신의 업무를 분석하고, 생성형 AI와 자동화 도구를 활용해 반복 업무를 효율화할 수 있도록 구성한 실무형 AX 교육 프로그램입니다.",
      en: "A practical AX training program enabling corporate and institutional professionals to analyze their work and improve repetitive tasks using generative AI and automation tools.",
    },
    role: {
      ko: "업무 진단부터 자동화 과제 발굴, AI 활용과 자동화 실행안 설계까지 연결되는 교육 과정과 실습 프로그램을 구성·운영했습니다.",
      en: "ERUTY designed and delivered a training and workshop program connecting workflow diagnosis, automation opportunity discovery, AI utilization, and automation planning.",
    },
    scope: [
      { ko: "AX와 업무 자동화의 이해", en: "Understanding AX and workflow automation" },
      { ko: "반복·비효율 업무 발굴", en: "Identification of repetitive and inefficient work" },
      { ko: "생성형 AI의 실무 활용", en: "Practical use of generative AI" },
      { ko: "문서·자료 조사·분석 자동화", en: "Automation of document research and analysis" },
      { ko: "자동화 업무 흐름 설계", en: "Automation workflow design" },
      { ko: "부서별 AX 적용 과제 도출", en: "Identification of department-specific AX opportunities" },
      { ko: "실습 결과물과 적용 계획 작성", en: "Development of practical outputs and implementation plans" },
    ],
    outcome: {
      ko: "교육 참여자가 자신의 실제 업무를 기준으로 자동화 대상과 적용 방안을 설계할 수 있도록 실습 중심 교육을 운영했습니다.",
      en: "ERUTY delivered hands-on training enabling participants to design automation opportunities and implementation plans based on their actual work.",
    },
    status: { ko: "이룸터 AX 교육 프로그램", en: "Erumter AX Training Program" },
    market: { ko: "기업·기관 실무자", en: "Corporate and Institutional Professionals" },
    image: "/images/projects/10-erumter-ax-work-automation-training.webp",
    imageAlt: {
      ko: "기업·기관 실무자가 노트북으로 AI 업무 자동화 실습을 진행하는 교육 현장 콘셉트 이미지",
      en: "Concept image of corporate and institutional professionals practicing AI workflow automation on laptops",
    },
    visualType: "image",
    visualIsConcept: true,
  },
  {
    id: "erumter-financial-automation-training",
    visibility: "published",
    categories: ["erumter-education"],
    title: {
      ko: "이룸터 AX 기반 금융 자동화 교육",
      en: "Erumter AX-Based Financial Automation Training",
    },
    summary: {
      ko: "금융 업무의 특성과 데이터 처리 과정을 이해하고, 생성형 AI와 자동화 기술을 금융 실무에 적용할 수 있도록 구성한 AX 교육 프로그램입니다.",
      en: "An AX training program designed to apply generative AI and automation technologies to financial work and data processing.",
    },
    role: {
      ko: "금융 실무에서 반복적으로 발생하는 업무를 분석하고, AI 활용과 자동화 적용 방안을 도출하는 교육 과정과 실습 프로그램을 구성·운영했습니다.",
      en: "ERUTY designed and delivered training and workshops for analyzing repetitive financial tasks and developing practical AI and automation applications.",
    },
    scope: [
      { ko: "금융산업 AX·자동화 사례", en: "Financial industry AX and automation cases" },
      { ko: "금융 실무의 반복 업무 발굴", en: "Identification of repetitive financial work" },
      { ko: "금융 자료 조사와 정보 정리", en: "Financial research and information organization" },
      { ko: "문서·보고서 작성 자동화", en: "Document and report automation" },
      { ko: "데이터 검토·분류 업무 활용", en: "Data review and classification applications" },
      { ko: "금융 업무 자동화 흐름 설계", en: "Financial workflow automation design" },
      { ko: "실무 적용 과제 도출", en: "Development of practical implementation opportunities" },
    ],
    outcome: {
      ko: "금융 실무자가 자신의 업무를 기준으로 AI 활용과 자동화 적용 방안을 설계할 수 있도록 교육을 운영했습니다.",
      en: "ERUTY delivered training enabling financial professionals to design AI and automation applications based on their actual work.",
    },
    status: {
      ko: "이룸터 금융 AX 교육 프로그램",
      en: "Erumter Financial AX Training Program",
    },
    market: { ko: "금융 분야 실무자", en: "Financial Sector Professionals" },
    image: "/images/projects/11-erumter-financial-automation-training.webp",
    imageAlt: {
      ko: "금융 분야 실무자가 데이터와 보고서 자동화 화면을 보며 실습하는 교육 현장 콘셉트 이미지",
      en: "Concept image of financial professionals practicing data and report automation",
    },
    visualType: "image",
    visualIsConcept: true,
  },
];
