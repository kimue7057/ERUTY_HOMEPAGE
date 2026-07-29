export const BLUE = "#3737F2";
export const DARK = "#18191B";
export const GRAY = "#737780";
export const BORDER = "#E4E6EA";
export const LIGHT_BG = "#F7F8FA";
export const NEAR_BLACK = "#111214";

export const AX_STEPS = [
  {
    num: "01", en: "DIAGNOSE", ko: "업무 진단",
    desc: "현재 업무, 데이터, 시스템과 반복 문제를 분석해\nAI 적용과 자동화 가능 영역을 찾습니다.",
    descEn: "We analyze current workflows, data, systems and recurring issues\nto identify areas for AI application and automation.",
  },
  {
    num: "02", en: "DESIGN", ko: "AX 설계",
    desc: "AI 적용 영역과 목표 업무 흐름,\n필요한 시스템과 사람의 역할을 설계합니다.",
    descEn: "We design the AI application scope, target workflow,\nrequired systems and human roles.",
  },
  {
    num: "03", en: "BUILD", ko: "AI 시스템 구축",
    desc: "AI 소프트웨어, 데이터 연동, 에이전트와\n자동화 워크플로를 실제 운영 가능한 형태로 개발합니다.",
    descEn: "We develop AI software, data integrations, agents and\nautomated workflows into production-ready systems.",
  },
  {
    num: "04", en: "ENABLE", ko: "교육과 조직 적용",
    desc: "실무자와 운영 담당자가 구축된 시스템을\n실제 업무에서 사용할 수 있도록 교육하고 적용합니다.",
    descEn: "We train practitioners and operations staff to use\nthe built system in actual work.",
  },
  {
    num: "05", en: "OPERATE", ko: "운영과 고도화",
    desc: "사용 데이터와 업무 성과를 확인하고,\n자동화 범위와 시스템을 지속적으로 개선합니다.",
    descEn: "We monitor usage data and operational performance,\nand continuously improve the automation scope and system.",
  },
];

export const BEFORE_AFTER_WORKFLOWS_KO: Record<string, { before: string[]; after: string[] }> = {
  "문서·보고": {
    before: ["자료를 각각 수집", "엑셀과 문서에 수기 정리", "담당자가 분석", "보고서 작성", "검토와 수정", "이메일·메신저 전달"],
    after: ["데이터 자동 연결", "AI 분석과 초안 생성", "담당자 검토 ✓", "승인된 결과 생성", "관련 담당자 자동 공유", "결과와 이력 저장"],
  },
  "데이터 분석": {
    before: ["여러 소스에서 수동 추출", "형식 맞춰 수기 가공", "분석 로직 매번 작성", "결과 해석과 보고 작성", "수동 배포와 공유"],
    after: ["데이터 소스 자동 수집", "AI 전처리·정제", "분석 자동 실행", "담당자 결과 검토 ✓", "리포트 자동 생성·배포"],
  },
  "마케팅 운영": {
    before: ["캠페인 소재 수기 작성", "채널별 수동 업로드", "성과 데이터 별도 확인", "담당자 판단으로 조정", "결과 보고 직접 작성"],
    after: ["AI 소재 초안 생성", "채널 자동 발행", "성과 실시간 집계", "담당자 승인·조정 ✓", "성과 리포트 자동화"],
  },
  "고객 응대": {
    before: ["문의 수동 접수", "담당자 직접 분류", "개별 답변 작성", "이관과 전달 수동 처리", "이력 별도 기록"],
    after: ["문의 자동 분류", "AI 응대 초안 생성", "담당자 검토·발송 ✓", "자동 이관·알림", "이력 자동 저장"],
  },
  "사내 지식": {
    before: ["담당자에게 직접 질문", "문서 여러 곳 검색", "최신 정보 확인 어려움", "부서마다 다른 기준 사용", "지식 공유 체계 없음"],
    after: ["AI 지식 검색", "출처 포함 답변 생성", "담당자 확인 후 활용 ✓", "업데이트 자동 반영", "전사 지식 체계화"],
  },
  "프로젝트 관리": {
    before: ["일정과 현황 수기 관리", "진행 상황 개별 확인", "리스크 사후 파악", "회의 결과 수동 정리", "보고 자료 직접 작성"],
    after: ["일정·현황 자동 집계", "진행 알림 자동 발송", "AI 리스크 조기 감지", "회의록 자동 생성·검토 ✓", "대시보드 자동 업데이트"],
  },
};

export const BEFORE_AFTER_WORKFLOWS_EN: Record<string, { before: string[]; after: string[] }> = {
  "Documents & Reports": {
    before: ["Collect data individually", "Manual entry in Excel and docs", "Staff performs analysis", "Write report", "Review and revisions", "Send via email or messenger"],
    after: ["Data auto-connected", "AI analysis & draft generation", "Staff review ✓", "Approved output generated", "Auto-shared with relevant staff", "Results and history saved"],
  },
  "Data Analysis": {
    before: ["Manual extraction from multiple sources", "Manual formatting", "Write analysis logic each time", "Interpret results and write reports", "Manual distribution and sharing"],
    after: ["Auto-collect data sources", "AI preprocessing & cleansing", "Analysis runs automatically", "Staff reviews results ✓", "Reports auto-generated & distributed"],
  },
  "Marketing Ops": {
    before: ["Manually write campaign creatives", "Manual upload per channel", "Check performance data separately", "Adjust based on staff judgment", "Write results report manually"],
    after: ["AI draft creative generation", "Auto-publish to channels", "Real-time performance aggregation", "Staff approval & adjustment ✓", "Performance report automation"],
  },
  "Customer Support": {
    before: ["Manual inquiry intake", "Staff manually classifies", "Write individual replies", "Manual escalation and handoff", "Separate history logging"],
    after: ["Auto-classify inquiries", "AI draft response generation", "Staff review & send ✓", "Auto-escalation & alerts", "History auto-saved"],
  },
  "Internal Knowledge": {
    before: ["Ask colleagues directly", "Search across multiple docs", "Hard to verify latest info", "Different standards per department", "No knowledge-sharing system"],
    after: ["AI knowledge search", "Answers with source citations", "Staff verifies before use ✓", "Updates auto-reflected", "Company-wide knowledge organized"],
  },
  "Project Management": {
    before: ["Manual schedule & status management", "Check progress individually", "Risks identified after the fact", "Manual meeting notes", "Write reports manually"],
    after: ["Auto-aggregate schedule & status", "Auto-send progress alerts", "AI early risk detection", "Auto meeting minutes & review ✓", "Dashboard auto-updated"],
  },
};

export const PROJECT_CATEGORIES_KO = ["전체", "업무 자동화", "AI 소프트웨어", "생성형 AI", "데이터 시스템", "AX 교육"] as const;
export const PROJECT_CATEGORIES_EN = ["All", "Workflow Automation", "AI Software", "Generative AI", "Data Systems", "AX Education"] as const;

export interface Project {
  categoryIdx: number;
  clientType: string;
  clientTypeEn: string;
  problem: string;
  problemEn: string;
  role: string;
  roleEn: string;
  system: string;
  systemEn: string;
  tech: string[];
  techEn: string[];
  status: "진행 중" | "완료" | "기획 중";
  title: string;
  titleEn: string;
}

export const PROJECTS: Project[] = [
  {
    categoryIdx: 1,
    clientType: "중견 제조·유통 기업",
    clientTypeEn: "Mid-sized Manufacturing & Distribution Company",
    problem: "부서별 데이터가 분산되어 보고 작성에 과도한 시간 소요",
    problemEn: "Data scattered across departments causing excessive time spent on reporting",
    role: "업무 진단 · 자동화 설계 · 시스템 구축 · 운영 교육",
    roleEn: "Workflow Diagnosis · Automation Design · System Build · Operations Training",
    system: "데이터 수집·정제·보고 자동화 시스템",
    systemEn: "Data Collection, Cleansing & Reporting Automation System",
    tech: ["AI Agent", "Data Pipeline", "문서 자동화"],
    techEn: ["AI Agent", "Data Pipeline", "Document Automation"],
    status: "진행 중",
    title: "반복적인 데이터 수집과 보고 업무를 연결하는\n업무 자동화 시스템 구축",
    titleEn: "Building a Workflow Automation System\nConnecting Repetitive Data Collection and Reporting",
  },
  {
    categoryIdx: 2,
    clientType: "서비스·미디어 기업",
    clientTypeEn: "Service & Media Company",
    problem: "고객 반응 분석과 개인화 콘텐츠 제공 체계 부재",
    problemEn: "Lack of customer response analysis and personalized content delivery system",
    role: "AI 서비스 설계 · 개발 · 운영 시스템 구축",
    roleEn: "AI Service Design · Development · Operations System Build",
    system: "감정 분석·개인화 콘텐츠 생성 AI 서비스",
    systemEn: "Sentiment Analysis & Personalized Content Generation AI Service",
    tech: ["Generative AI", "Sentiment Analysis", "Admin System"],
    techEn: ["Generative AI", "Sentiment Analysis", "Admin System"],
    status: "완료",
    title: "감정 분석과 개인화 콘텐츠 생성을 위한\nAI 서비스 구축",
    titleEn: "Building an AI Service\nfor Sentiment Analysis and Personalized Content Generation",
  },
  {
    categoryIdx: 5,
    clientType: "대기업·공공기관",
    clientTypeEn: "Large Enterprise & Public Institution",
    problem: "구성원의 생성형 AI 활용 역량 부족, 도구 도입 후 미활용",
    problemEn: "Insufficient staff capability to use generative AI; tools adopted but unused",
    role: "AX 커리큘럼 설계 · 실무 교육 운영",
    roleEn: "AX Curriculum Design · Hands-on Training Operations",
    system: "직무별 생성형 AI 및 업무 자동화 교육 프로그램",
    systemEn: "Role-specific Generative AI and Workflow Automation Training Program",
    tech: ["실무 워크숍", "자동화 실습", "운영 교육"],
    techEn: ["Hands-on Workshop", "Automation Practice", "Operations Training"],
    status: "진행 중",
    title: "기업 실무자를 위한 생성형 AI와\n업무 자동화 프로그램 운영",
    titleEn: "Operating a Generative AI and Workflow Automation Program\nfor Corporate Practitioners",
  },
  {
    categoryIdx: 3,
    clientType: "전문 서비스 기업",
    clientTypeEn: "Professional Services Company",
    problem: "사내 문서·지식이 분산되어 검색·활용 어려움",
    problemEn: "Internal documents and knowledge scattered, making search and use difficult",
    role: "지식 체계 설계 · RAG 시스템 개발 · 운영 적용",
    roleEn: "Knowledge System Design · RAG System Development · Operational Deployment",
    system: "사내 지식 기반 AI 검색·응답 시스템",
    systemEn: "Internal Knowledge-Based AI Search & Response System",
    tech: ["RAG", "Vector DB", "Knowledge Management"],
    techEn: ["RAG", "Vector DB", "Knowledge Management"],
    status: "완료",
    title: "사내 문서와 지식을 연결한\nAI 내부 검색 시스템 구축",
    titleEn: "Building an AI Internal Search System\nConnecting Company Documents and Knowledge",
  },
  {
    categoryIdx: 4,
    clientType: "이커머스·리테일 기업",
    clientTypeEn: "E-commerce & Retail Company",
    problem: "판매·재고·고객 데이터가 분리되어 통합 분석 불가",
    problemEn: "Sales, inventory and customer data separated, preventing integrated analysis",
    role: "데이터 파이프라인 설계 · 통합 대시보드 개발",
    roleEn: "Data Pipeline Design · Integrated Dashboard Development",
    system: "통합 데이터 파이프라인·운영 대시보드",
    systemEn: "Integrated Data Pipeline & Operations Dashboard",
    tech: ["Data Integration", "Dashboard", "Analytics"],
    techEn: ["Data Integration", "Dashboard", "Analytics"],
    status: "기획 중",
    title: "분산된 판매·재고·고객 데이터를 연결하는\n통합 운영 데이터 시스템",
    titleEn: "Integrated Operations Data System\nConnecting Scattered Sales, Inventory and Customer Data",
  },
];

export const STATUS_COLOR: Record<string, string> = {
  "진행 중": BLUE,
  "완료": "#2C9E5F",
  "기획 중": "#E8891A",
};

export const T = {
  ko: {
    heroKoreanLabel: "이룸터",
    heroHeading: "기업의 업무와 서비스를,\nAI가 작동하는 시스템으로.",
    heroDesc: "이룸터는 업무 진단부터 AX 교육, AI 소프트웨어 개발,\n자동화와 운영 고도화까지 기업의 AI 전환을 실행합니다.",
    heroCTA: "AX 프로젝트 제안하기",
    heroSecondary: "전환 방식 살펴보기",
    wfAriaLabel: "이룸터 AX 워크플로 전환 흐름",
    wfCurrentItems: ["수기 입력", "분산 데이터", "반복 문서", "개별 판단", "수동 승인"],
    wfOutputItems: ["보고서 생성", "업무 처리", "고객 대응", "의사결정 지원", "기록·이력"],
    transformLabel: "WHAT ERUMTER TRANSFORMS",
    transformHeading: "업무와 조직, 서비스를\n하나의 AX 체계로 전환합니다.",
    transformDesc: "반복 업무를 자동화하는 데서 끝나지 않고,\n기업의 데이터와 업무 방식, 서비스 운영 전체를 연결합니다.",
    workHeading: "업무의 전환",
    workDesc: "반복적이고 분산된 업무를\nAI 기반의 연결된 워크플로로 전환합니다.",
    workTags: ["자료 수집과 정리", "문서·보고서 생성", "데이터 분석", "승인과 전달", "마케팅·운영 업무", "내부 정보 검색"],
    serviceHeading: "서비스의 전환",
    serviceDesc: "기업이 보유한 데이터와 전문성을\n실제 사용 가능한 AI 서비스와 운영 시스템으로 구현합니다.",
    serviceTags: ["생성형 AI 웹·앱", "고객용 AI 서비스", "분석·추천 시스템", "관리자 운영 시스템", "사내 AI 플랫폼", "AI 기능 확장"],
    orgHeading: "조직의 전환",
    orgDesc: "구성원이 AI 시스템을 실제 업무에서 활용할 수 있도록\n교육과 운영 기준, 내재화 체계를 구축합니다.",
    orgItems: ["직무별 AX 교육", "생성형 AI 실무교육", "담당자 운영 교육", "AI 활용 가이드", "내부 확산 프로그램"],
    orgNote: "세 전환은 하나의 체계 안에서 연결됩니다.",
    processLabel: "HOW ERUMTER WORKS",
    processHeading: "도입에서 끝나지 않고,\n실제 업무에 정착할 때까지.",
    processDesc: "현재 업무를 진단하고 시스템을 구축한 뒤,\n구성원이 활용하고 운영할 수 있도록 전 과정을 함께합니다.",
    solutionsLabel: "AX SOLUTIONS",
    solutionsHeading: "기업의 상황에 맞는 방식으로\nAX 전환을 구현합니다.",
    solutionsDesc: "업무 자동화, AI 소프트웨어와 교육을\n각각 분리하지 않고 하나의 운영체계 안에서 설계합니다.",
    autoHeading: "업무 자동화와 AI 에이전트",
    autoDesc: "반복 업무와 부서 간 흐름을 연결해\nAI가 실제 업무를 처리하도록 구축합니다.",
    autoTags: ["문서·보고 자동화", "데이터 수집·정리", "사내 지식 검색", "부서별 AI 에이전트", "승인·알림·전달", "외부 서비스 연동"],
    aiProdHeading: "AI 소프트웨어 개발",
    aiProdDesc: "기업의 아이디어와 데이터를\n웹·앱·SaaS와 운영 시스템으로 구현합니다.",
    aiProdTags: ["생성형 AI 웹·앱", "AI SaaS", "관리자 시스템", "분석·추천 기능", "데이터 기반 서비스", "AI 기능 추가"],
    educationHeading: "기업·기관 AX 교육",
    educationDesc: "AI를 소개하는 교육이 아니라,\n실제 업무 전환과 시스템 활용을 위한 프로그램을 제공합니다.",
    educationItems: ["경영진 AX 이해", "직무별 생성형 AI", "업무 자동화 실습", "구축 시스템 운영 교육", "맞춤형 프로젝트 교육"],
    beforeAfterLabel: "WORKFLOW CHANGE",
    beforeAfterHeading: "AI가 추가되는 것이 아니라,\n업무의 흐름이 달라집니다.",
    beforeAfterDesc: "같은 업무라도 데이터 연결과 AI 처리,\n사람의 검토 구조에 따라 운영 방식이 달라집니다.",
    expectedLabel: "EXPECTED CHANGES — 정성적 변화 (수치 미포함)",
    expectedItems: ["반복 작업 감소", "업무 처리 속도 향상", "데이터 활용 확대", "담당자 간 업무 표준화", "정보 누락·전달 오류 감소", "운영 현황 가시성 확보"],
    techLabel: "TECHNOLOGY & OPERATION",
    techHeading: "실제 업무에서 작동하도록\n기술과 운영을 함께 설계합니다.",
    techDesc: "데이터 연결부터 AI 처리, 자동화와 사람의 통제까지\n기업 환경에서 지속적으로 운영 가능한 구조를 만듭니다.",
    caps: [
      { label: "DATA CONNECTION", value: "기존 문서, 데이터베이스, 업무 시스템과 외부 도구를 연결합니다.", highlight: false },
      { label: "GENERATIVE AI & KNOWLEDGE", value: "기업 데이터와 지식을 기반으로 검색, 분석과 생성을 수행합니다.", highlight: false },
      { label: "AGENTS & WORKFLOW", value: "여러 업무 단계를 AI 에이전트와 자동화 흐름으로 연결합니다.", highlight: false },
      { label: "SOFTWARE ENGINEERING", value: "웹·앱, 관리자 시스템과 실제 운영 인터페이스를 구현합니다.", highlight: false },
      { label: "HUMAN CONTROL ✓", value: "검토, 승인, 예외 처리와 권한 관리를 포함해 사람이 시스템을 통제합니다.", highlight: true },
    ],
    projectsLabel: "AX PROJECTS",
    projectsHeading: "실제 업무와 서비스에\n적용된 AX 프로젝트",
    projectsDesc: "교육, 개발, 자동화를 분리하지 않고\n기업과 기관의 실제 문제에 맞춰 구현합니다.",
    problemLabel: "기존 문제",
    roleLabel: "이룸터 역할",
    systemLabel: "구축 시스템",
    exampleNote: "* 예시 프로젝트 — 실제 정보로 교체 예정",
    ctaHeading: "어떤 업무부터\nAI로 전환하고 싶으신가요?",
    ctaDesc: "업무 자동화, AI 서비스 개발과 조직 교육까지\n현재 상황에 맞는 AX 방식부터 함께 설계합니다.",
    ctaPrimary: "이룸터에 AX 프로젝트 제안하기",
    ctaSecondary: "이루티에 문의하기",
    inquiryPaths: [
      { key: "automation", label: "업무 자동화", desc: "반복 업무와 부서별 프로세스를\n자동화하고 싶습니다." },
      { key: "product", label: "AI 서비스 개발", desc: "AI 기반 웹·앱 또는\n신규 서비스를 구축하고 싶습니다." },
      { key: "education", label: "기업 AX 교육", desc: "구성원의 AI 활용과\n업무 적용 역량을 높이고 싶습니다." },
      { key: "diagnosis", label: "AX 방향 진단", desc: "어떤 업무부터 시작해야 할지\n아직 정확히 모르겠습니다." },
    ],
    statusLabels: { "진행 중": "진행 중", "완료": "완료", "기획 중": "기획 중" } as Record<string, string>,
    diagnoseRows: [
      { label: "업무 단계", value: "자료 수집 → 정리 → 분석 → 보고" },
      { label: "담당자", value: "마케팅 2명 · 기획 1명" },
      { label: "사용 도구", value: "엑셀 · 이메일 · 메신저" },
      { label: "데이터 위치", value: "로컬 · 공유 드라이브 · 시스템" },
      { label: "자동화 가능", value: "수집 · 정리 · 초안 생성", highlight: true },
    ],
    diagnoseNote: "* 예시 진단 구조 — 실제 업무 분석 후 교체",
    operateStatuses: [
      { label: "Usage Status", value: "정상 운영 중" },
      { label: "Workflow Status", value: "7개 흐름 활성" },
      { label: "Human Review Queue", value: "검토 대기 3건", highlight: true },
      { label: "Exceptions", value: "예외 처리 1건" },
      { label: "Improvement Requests", value: "개선 요청 2건" },
    ],
    operateNote: "* 예시 운영 현황 — 실제 데이터로 교체",
    designFlow: [
      { label: "CURRENT PROCESS", sub: "현재 수기 업무", human: false },
      { label: "AUTOMATION POINT", sub: "AI 처리 영역", human: false },
      { label: "HUMAN DECISION ✓", sub: "검토·승인·예외", human: true },
      { label: "TARGET WORKFLOW", sub: "목표 업무 흐름", human: false },
    ],
    enableItems: ["직무별 사용 시나리오", "실습 프로그램", "운영 담당자 교육", "관리자 권한 설정", "사용 가이드 제공", "내부 확산 과정"],
    wfTabs: Object.keys(BEFORE_AFTER_WORKFLOWS_KO) as string[],
    wfData: BEFORE_AFTER_WORKFLOWS_KO,
  },
  en: {
    heroKoreanLabel: "이룸터",
    heroHeading: "Your company's workflows and services,\nas a system where AI operates.",
    heroDesc: "Erumter executes enterprise AI transformation — from workflow diagnosis\nand AX education to AI software development, automation and operational improvement.",
    heroCTA: "Propose an AX Project",
    heroSecondary: "See How We Transform",
    wfAriaLabel: "Erumter AX Workflow Transformation Flow",
    wfCurrentItems: ["Manual Entry", "Scattered Data", "Repetitive Docs", "Individual Judgment", "Manual Approval"],
    wfOutputItems: ["Report Generation", "Task Processing", "Customer Response", "Decision Support", "Records & History"],
    transformLabel: "WHAT ERUMTER TRANSFORMS",
    transformHeading: "Workflows, organization and services,\ntransformed into one AX system.",
    transformDesc: "We don't stop at automating repetitive tasks —\nwe connect your company's data, workflows and entire service operations.",
    workHeading: "Work Transformation",
    workDesc: "Transform repetitive and scattered workflows\ninto AI-powered connected processes.",
    workTags: ["Data Collection & Organization", "Document & Report Generation", "Data Analysis", "Approvals & Delivery", "Marketing & Operations", "Internal Knowledge Search"],
    serviceHeading: "Service Transformation",
    serviceDesc: "Turn your company's data and expertise\ninto usable AI services and operational systems.",
    serviceTags: ["Generative AI Web · App", "Customer-facing AI Service", "Analytics & Recommendation System", "Admin Operations System", "Internal AI Platform", "AI Feature Expansion"],
    orgHeading: "Organization Transformation",
    orgDesc: "Build the training, operational standards and adoption framework\nso staff can use AI systems in actual work.",
    orgItems: ["Role-based AX Education", "Generative AI Hands-on Training", "Operations Staff Training", "AI Usage Guide", "Internal Adoption Program"],
    orgNote: "All three transformations are connected within one system.",
    processLabel: "HOW ERUMTER WORKS",
    processHeading: "Not just implementation —\nuntil it's embedded in real work.",
    processDesc: "We diagnose current workflows and build systems,\nthen stay through the entire process until staff can use and operate them.",
    solutionsLabel: "AX SOLUTIONS",
    solutionsHeading: "AX transformation delivered\nthe way your company needs it.",
    solutionsDesc: "We design workflow automation, AI software and training\nnot as separate offerings but within one operational system.",
    autoHeading: "Workflow Automation & AI Agents",
    autoDesc: "We connect repetitive tasks and cross-department flows\nso AI handles real work.",
    autoTags: ["Document & Report Automation", "Data Collection & Organization", "Internal Knowledge Search", "Department AI Agents", "Approvals · Alerts · Delivery", "External Service Integration"],
    aiProdHeading: "AI Software Development",
    aiProdDesc: "We turn your company's ideas and data\ninto web, app, SaaS and operational systems.",
    aiProdTags: ["Generative AI Web · App", "AI SaaS", "Admin System", "Analytics & Recommendation", "Data-driven Service", "AI Feature Addition"],
    educationHeading: "Corporate & Institutional AX Education",
    educationDesc: "Not a training that introduces AI —\nbut a program for real workflow transformation and system adoption.",
    educationItems: ["Executive AX Understanding", "Role-based Generative AI", "Workflow Automation Practice", "Built System Operations Training", "Custom Project Training"],
    beforeAfterLabel: "WORKFLOW CHANGE",
    beforeAfterHeading: "AI isn't just added —\nthe way work flows changes.",
    beforeAfterDesc: "Even the same task runs differently\ndepending on data connection, AI processing and human review structure.",
    expectedLabel: "EXPECTED CHANGES — Qualitative (no figures included)",
    expectedItems: ["Reduction in repetitive tasks", "Faster task processing", "Expanded data utilization", "Standardized workflows across staff", "Fewer information gaps and handoff errors", "Improved operational visibility"],
    techLabel: "TECHNOLOGY & OPERATION",
    techHeading: "Technology and operations designed together\nto work in real workflows.",
    techDesc: "From data connection and AI processing to automation and human control —\nwe build structures that can be sustainably operated in enterprise environments.",
    caps: [
      { label: "DATA CONNECTION", value: "We connect existing documents, databases, work systems and external tools.", highlight: false },
      { label: "GENERATIVE AI & KNOWLEDGE", value: "We perform search, analysis and generation based on company data and knowledge.", highlight: false },
      { label: "AGENTS & WORKFLOW", value: "We connect multiple workflow stages with AI agents and automation flows.", highlight: false },
      { label: "SOFTWARE ENGINEERING", value: "We implement web, app, admin systems and real operational interfaces.", highlight: false },
      { label: "HUMAN CONTROL ✓", value: "Humans control the system — including review, approval, exception handling and access management.", highlight: true },
    ],
    projectsLabel: "AX PROJECTS",
    projectsHeading: "AX projects applied\nto real workflows and services",
    projectsDesc: "We don't separate education, development and automation —\nwe implement based on actual problems of companies and institutions.",
    problemLabel: "Problem",
    roleLabel: "Erumter Role",
    systemLabel: "System Built",
    exampleNote: "* Example project — to be replaced with actual information",
    ctaHeading: "Which workflows do you want\nto transform with AI first?",
    ctaDesc: "From workflow automation and AI service development to organizational training —\nwe design the right AX approach for your current situation.",
    ctaPrimary: "Propose an AX Project to Erumter",
    ctaSecondary: "Contact ERUTY",
    inquiryPaths: [
      { key: "automation", label: "Workflow Automation", desc: "I want to automate repetitive tasks\nand department-level processes." },
      { key: "product", label: "AI Service Development", desc: "I want to build an AI-powered web/app\nor a new service." },
      { key: "education", label: "Corporate AX Education", desc: "I want to improve staff capability\nto use AI in actual work." },
      { key: "diagnosis", label: "AX Direction Diagnosis", desc: "I'm not sure yet which workflow\nto start with." },
    ],
    statusLabels: { "진행 중": "In Progress", "완료": "Completed", "기획 중": "Planning" } as Record<string, string>,
    diagnoseRows: [
      { label: "Workflow Steps", value: "Collect → Organize → Analyze → Report" },
      { label: "Staff", value: "Marketing 2 · Planning 1" },
      { label: "Tools Used", value: "Excel · Email · Messenger" },
      { label: "Data Location", value: "Local · Shared Drive · System" },
      { label: "Automatable", value: "Collection · Organization · Draft Generation", highlight: true },
    ],
    diagnoseNote: "* Example diagnosis structure — to be replaced after actual workflow analysis",
    operateStatuses: [
      { label: "Usage Status", value: "Running normally" },
      { label: "Workflow Status", value: "7 flows active" },
      { label: "Human Review Queue", value: "3 items pending review", highlight: true },
      { label: "Exceptions", value: "1 exception being handled" },
      { label: "Improvement Requests", value: "2 improvement requests" },
    ],
    operateNote: "* Example operational status — to be replaced with actual data",
    designFlow: [
      { label: "CURRENT PROCESS", sub: "Current manual work", human: false },
      { label: "AUTOMATION POINT", sub: "AI processing area", human: false },
      { label: "HUMAN DECISION ✓", sub: "Review · Approval · Exception", human: true },
      { label: "TARGET WORKFLOW", sub: "Target workflow", human: false },
    ],
    enableItems: ["Role-based usage scenarios", "Hands-on practice programs", "Operations staff training", "Admin access configuration", "Usage guide provision", "Internal adoption process"],
    wfTabs: Object.keys(BEFORE_AFTER_WORKFLOWS_EN) as string[],
    wfData: BEFORE_AFTER_WORKFLOWS_EN,
  },
};

export type TType = typeof T["ko"];
