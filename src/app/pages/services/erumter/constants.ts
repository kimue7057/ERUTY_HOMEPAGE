import type { Lang } from "../../../context/LanguageContext";

export type Localized = Record<Lang, string>;

export const ERUMTER_MEDIA = {
  hero: "/images/company/team/team-leadership-hero.webp",
  problem: "/images/services/erumter/workflow-office.webp",
  education: "/images/services/erumter/ax-workshop.webp",
  operations: "/images/services/erumter/system-operations.webp",
} as const;

export const ERUMTER_COPY = {
  ko: {
    hero: {
      eyebrow: "ERUMTER AX",
      title: "AI를 도입하는 것이 아니라,\n일하는 방식을 다시 만듭니다.",
      description:
        "업무 진단부터 AI 시스템 구축, 자동화, 교육과 운영 고도화까지 연결합니다.",
      primary: "AX 프로젝트 상담하기",
      secondary: "이룸터 AX 알아보기",
      panelTitle: "업무 진단 프레임",
      panelItems: [
        ["자동화 가능 업무", "반복 흐름 확인"],
        ["AI 적용 가능 업무", "판단 기준 확인"],
        ["연결 가능한 데이터", "데이터 위치 확인"],
        ["업무 프로세스 상태", "병목 구간 확인"],
      ],
    },
    problem: {
      eyebrow: "THE PROBLEM",
      title: "도구는 늘었지만,\n업무는 여전히 사람이 연결하고 있습니다.",
      description:
        "정보는 여러 도구와 시스템에 흩어져 있고, 담당자는 찾고 옮기고 확인하는 일을 반복합니다.",
      nodes: ["이메일", "엑셀·데이터", "문서", "승인 요청", "메신저", "내부 시스템"],
      center: "사람이 직접 연결",
    },
    process: {
      eyebrow: "ERUMTER AX PROCESS",
      title: "진단부터 운영까지,\n하나의 흐름으로 연결합니다.",
      description:
        "이룸터는 도구를 제안하는 데서 멈추지 않고 실제 업무에 작동하는 구조를 함께 만듭니다.",
      outputLabel: "핵심 산출물",
    },
    education: {
      eyebrow: "AX EDUCATION",
      title: "AX는 사람과 조직의 변화에서 시작됩니다.",
      description:
        "구축한 시스템이 실제 업무 방식이 되도록 진단, 실무 교육, 적용 지원과 운영 정착까지 이어갑니다.",
      flow: ["업무 진단", "실무 교육", "적용 지원", "운영 정착"],
    },
    solutions: {
      eyebrow: "SOLUTIONS",
      title: "기업의 업무에 맞춰\nAX의 범위를 설계합니다.",
      description:
        "전략과 교육, 소프트웨어, 자동화와 에이전트를 분리된 서비스가 아닌 하나의 업무 전환 구조로 연결합니다.",
    },
    compare: {
      eyebrow: "BEFORE / AFTER",
      title: "AX로 업무는 이렇게 달라집니다.",
      before: "Before",
      after: "After",
      beforeAlt: "자료를 찾고 정리하는 업무 장면",
      afterAlt: "AI 업무 시스템을 함께 검토하는 장면",
    },
    final: {
      eyebrow: "START YOUR AX",
      title: "어떤 업무부터\nAX로 전환할 수 있을까요?",
      description:
        "현재 업무와 반복 과정을 알려주시면, 가능한 전환 범위와 구축 방법을 함께 검토합니다.",
      cta: "AX 프로젝트 상담하기",
    },
    imageFallback: "업무 장면 이미지",
  },
  en: {
    hero: {
      eyebrow: "ERUMTER AX",
      title: "We don't just introduce AI.\nWe redesign how work gets done.",
      description:
        "From workflow diagnosis and AI system development to automation, education, and operational improvement.",
      primary: "Discuss an AX Project",
      secondary: "Explore Erumter AX",
      panelTitle: "Workflow diagnosis frame",
      panelItems: [
        ["Automation-ready work", "Review recurring flows"],
        ["AI-applicable work", "Review decision criteria"],
        ["Connectable data", "Review data locations"],
        ["Process status", "Review bottlenecks"],
      ],
    },
    problem: {
      eyebrow: "THE PROBLEM",
      title: "Tools have multiplied,\nbut people still connect the work.",
      description:
        "Information remains scattered across tools and systems, leaving teams to repeatedly search, transfer, and verify it.",
      nodes: ["Email", "Spreadsheets & data", "Documents", "Approvals", "Messenger", "Internal systems"],
      center: "Connected manually",
    },
    process: {
      eyebrow: "ERUMTER AX PROCESS",
      title: "One connected path,\nfrom discovery to operation.",
      description:
        "Erumter goes beyond recommending tools. We build an operating model that works inside the real workflow.",
      outputLabel: "Key outputs",
    },
    education: {
      eyebrow: "AX EDUCATION",
      title: "AX begins with people and organizational change.",
      description:
        "We connect diagnosis, practical education, adoption support, and operational enablement so the system becomes the way work gets done.",
      flow: ["Workflow diagnosis", "Practical training", "Adoption support", "Operational enablement"],
    },
    solutions: {
      eyebrow: "SOLUTIONS",
      title: "AX scope designed\naround your work.",
      description:
        "We connect strategy, education, software, automation, and agents into one transformation model instead of isolated services.",
    },
    compare: {
      eyebrow: "BEFORE / AFTER",
      title: "How AX changes the way work gets done.",
      before: "Before",
      after: "After",
      beforeAlt: "A professional searching and organizing business materials",
      afterAlt: "Colleagues reviewing an AI workflow system",
    },
    final: {
      eyebrow: "START YOUR AX",
      title: "Which workflow should\nyou transform first?",
      description:
        "Tell us about your current workflow and recurring tasks. We'll review the feasible scope and the right way to build it.",
      cta: "Discuss an AX Project",
    },
    imageFallback: "Workplace scene",
  },
} as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discover",
    description: {
      ko: "업무 흐름과 반복 작업, 병목 구간, 데이터 구조를 진단합니다.",
      en: "We diagnose workflows, repetitive tasks, bottlenecks, and data structures.",
    },
    outputs: {
      ko: ["업무 흐름 맵", "자동화 후보 업무", "데이터 연결 범위"],
      en: ["Workflow map", "Automation candidates", "Data connection scope"],
    },
    image: ERUMTER_MEDIA.problem,
    imageAlt: {
      ko: "분산된 자료와 업무 흐름을 진단하는 사무실 장면",
      en: "An office workflow being assessed across scattered materials",
    },
    overlay: {
      ko: ["반복 작업 식별", "병목 구간 확인", "데이터 위치 파악"],
      en: ["Identify repetition", "Locate bottlenecks", "Map data sources"],
    },
  },
  {
    number: "02",
    title: "Design",
    description: {
      ko: "사람, 데이터, AI와 기존 시스템이 연결되는 업무 구조를 설계합니다.",
      en: "We design how people, data, AI, and existing systems work together.",
    },
    outputs: {
      ko: ["목표 업무 설계", "사람과 AI의 역할", "시스템 연결 구조"],
      en: ["Target workflow", "Human and AI roles", "System architecture"],
    },
    image: ERUMTER_MEDIA.hero,
    imageAlt: {
      ko: "팀이 함께 업무 구조를 설계하는 회의 장면",
      en: "A team designing a new operating model together",
    },
    overlay: {
      ko: ["사람의 판단", "AI의 분석", "기존 시스템 연결"],
      en: ["Human judgment", "AI analysis", "System connections"],
    },
  },
  {
    number: "03",
    title: "Build",
    description: {
      ko: "실제 업무에 필요한 AI 소프트웨어와 자동화 기능을 개발합니다.",
      en: "We develop the AI software and automation capabilities the work requires.",
    },
    outputs: {
      ko: ["업무용 AI 기능", "자동화 워크플로", "관리·검토 화면"],
      en: ["AI work features", "Automated workflow", "Review interface"],
    },
    image: ERUMTER_MEDIA.operations,
    imageAlt: {
      ko: "기업용 업무 시스템을 개발하고 검토하는 장면",
      en: "An enterprise workflow system being built and reviewed",
    },
    overlay: {
      ko: ["데이터 수집", "AI 분석", "검토 후 실행"],
      en: ["Collect data", "Analyze with AI", "Review then execute"],
    },
  },
  {
    number: "04",
    title: "Deploy",
    description: {
      ko: "구축한 시스템을 기존 업무와 연결하고 조직에 적용합니다.",
      en: "We connect the system to existing work and deploy it across the organization.",
    },
    outputs: {
      ko: ["기존 시스템 연동", "사용자 적용 지원", "운영 기준"],
      en: ["System integration", "User adoption support", "Operating standards"],
    },
    image: ERUMTER_MEDIA.education,
    imageAlt: {
      ko: "구축한 시스템을 실무 조직에 적용하는 워크숍 장면",
      en: "A workshop deploying the new system into practical team workflows",
    },
    overlay: {
      ko: ["업무 연결", "실무자 적용", "운영 기준 정리"],
      en: ["Connect workflows", "Enable users", "Set operating rules"],
    },
  },
  {
    number: "05",
    title: "Operate",
    description: {
      ko: "운영 결과를 확인하고 정확도와 자동화 범위를 지속적으로 개선합니다.",
      en: "We review outcomes and continuously improve accuracy and automation scope.",
    },
    outputs: {
      ko: ["운영 결과 점검", "정확도 개선", "자동화 범위 확장"],
      en: ["Outcome review", "Accuracy improvement", "Automation expansion"],
    },
    image: ERUMTER_MEDIA.operations,
    imageAlt: {
      ko: "운영 중인 업무 시스템 결과를 함께 확인하는 장면",
      en: "Colleagues reviewing the performance of an operating workflow system",
    },
    overlay: {
      ko: ["결과 확인", "오류와 예외 검토", "다음 개선 반영"],
      en: ["Review outcomes", "Inspect exceptions", "Apply improvements"],
    },
  },
] as const;

export const SOLUTIONS = [
  {
    number: "01",
    title: "AX Strategy & Education",
    items: {
      ko: ["업무 진단", "AX 전환 설계", "실무 교육과 정착 지원"],
      en: ["Workflow diagnosis", "AX transformation design", "Practical training and adoption"],
    },
    image: ERUMTER_MEDIA.education,
    imageAlt: {
      ko: "팀이 업무 흐름을 설계하는 AX 교육 워크숍",
      en: "An AX education workshop where a team designs workflows",
    },
    visual: { ko: ["진단", "설계", "교육", "정착"], en: ["Diagnose", "Design", "Educate", "Adopt"] },
  },
  {
    number: "02",
    title: "AI Business Software",
    items: {
      ko: ["기업 맞춤형 AI 서비스", "내부 업무 시스템", "데이터 기반 운영 도구"],
      en: ["Custom enterprise AI services", "Internal work systems", "Data-driven operating tools"],
    },
    image: ERUMTER_MEDIA.operations,
    imageAlt: {
      ko: "기업용 AI 업무 소프트웨어를 검토하는 장면",
      en: "An enterprise AI work application being reviewed",
    },
    visual: { ko: ["기업 데이터", "AI 분석", "업무 화면"], en: ["Company data", "AI analysis", "Work interface"] },
  },
  {
    number: "03",
    title: "Workflow Automation",
    items: {
      ko: ["반복 업무 자동화", "문서와 데이터 처리", "보고·승인·알림 및 시스템 연동"],
      en: ["Repetitive task automation", "Document and data processing", "Reporting, approvals, alerts, and integrations"],
    },
    image: ERUMTER_MEDIA.problem,
    imageAlt: {
      ko: "문서와 데이터를 처리하는 반복 업무 장면",
      en: "A repetitive document and data processing workflow",
    },
    visual: { ko: ["수집", "처리", "승인", "연동"], en: ["Collect", "Process", "Approve", "Connect"] },
  },
  {
    number: "04",
    title: "AI Agents",
    items: {
      ko: ["기업 지식 기반 검색", "업무 분석과 판단 지원", "승인 후 작업 실행"],
      en: ["Enterprise knowledge search", "Analysis and decision support", "Approved task execution"],
    },
    image: ERUMTER_MEDIA.hero,
    imageAlt: {
      ko: "팀이 AI 에이전트 적용 업무를 함께 검토하는 장면",
      en: "A team reviewing how an AI agent supports their work",
    },
    visual: { ko: ["검색", "분석", "판단안", "승인 후 실행"], en: ["Search", "Analyze", "Recommend", "Execute after approval"] },
  },
] as const;

export const COMPARISON = {
  before: {
    ko: [
      "사람이 자료를 직접 찾음",
      "반복적으로 내용을 정리함",
      "담당자의 경험에 따라 판단함",
      "여러 시스템에 결과를 다시 입력함",
      "업무 결과가 다음 과정에 축적되지 않음",
    ],
    en: [
      "People search for materials manually",
      "Information is repeatedly reorganized",
      "Decisions depend on individual experience",
      "Results are re-entered into multiple systems",
      "Outcomes do not accumulate for the next process",
    ],
  },
  after: {
    ko: [
      "AI가 필요한 자료를 수집함",
      "기업의 데이터와 업무 기준으로 분석함",
      "판단안과 다음 작업을 제시함",
      "승인된 작업을 업무 시스템에서 실행함",
      "결과가 축적되어 다음 업무에 반영됨",
    ],
    en: [
      "AI gathers the required materials",
      "Analysis follows company data and work standards",
      "It proposes a decision and the next action",
      "Approved work runs in business systems",
      "Results accumulate and inform the next workflow",
    ],
  },
} as const;
