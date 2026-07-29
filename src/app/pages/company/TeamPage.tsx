import { useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useLanguage } from "../../context/LanguageContext";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BODY_TEXT = "#333438";
const MUTED = "#737780";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F5F6F8";

const PROFILE_IMAGE_BY_ID = {
  "kim-yusung": {
    src: "https://www.eruty.co.kr/images/common/ceo.png",
    alt: "Yusung Kim",
  },
  "park-sangil": {
    src: "https://www.eruty.co.kr/images/common/coo.png",
    alt: "Sangil Park",
  },
} as const;

// ── 데이터 타입 ───────────────────────────────────────────────────────────────

type CapabilityArea = "global" | "content" | "ai" | "software" | "infra";

// ── 번역 ──────────────────────────────────────────────────────────────────────

const T = {
  ko: {
    heroLabel: "Team & Leadership",
    heroHeadline: "사업과 기술을 연결해,\n새로운 가능성을\n실행합니다.",
    heroDesc: "글로벌 비즈니스, 콘텐츠, AI와 소프트웨어 분야의\n전문 인력이 하나의 팀으로 프로젝트를 수행합니다.",
    heroStats: [
      { label: "전문 역량 그룹" },
      { label: "팀 구성원" },
      { label: "글로벌 운영 시장" },
    ],
    leadershipLabel: "Leadership",
    leadershipHeadline: "이루티를 이끄는 리더십",
    photoPlaceholder: "프로필 이미지 없음",
    namePlaceholderNote: "",
    responsibilityLabel: "주요 책임",
    introLabel: "소개",
    careerLabel: "주요 경력",
    roleLabel: "이루티에서의 역할",
    moreLeadershipNote: "ERUTY는 경영, 사업, 연구개발, 엔지니어링 리더십이 함께 실행 중심의 조직을 이끌고 있습니다.",
    capabilitiesLabel: "Capabilities",
    capabilitiesHeadline: "하나의 프로젝트를 완성하는\n다섯 가지 전문 역량",
    responsibilityCol: "주요 책임",
    capabilitiesCol: "핵심 역량",
    contributionCol: "프로젝트 기여",
    memberCountSuffix: "명",
    directoryLabel: "Team Directory",
    directoryHeadline: "팀 구성원",
    filterOptions: [
      { key: "all" as const, label: "전체" },
      { key: "global" as const, label: "글로벌 사업" },
      { key: "content" as const, label: "콘텐츠·파트너십" },
      { key: "ai" as const, label: "AI·데이터" },
      { key: "software" as const, label: "소프트웨어" },
      { key: "infra" as const, label: "인프라" },
    ],
    memberNameNote: "",
    memberPhotoNote: "프로필 이미지 없음",
    memberDetailBtn: "상세 보기",
    moreMembers: "리더십 중심\n구성원 개요",
    modalNameNote: "",
    modalResponsibility: "담당 업무",
    modalCareer: "주요 경력",
    modalExpertise: "전문 분야",
    modalProjects: "참여 프로젝트",
    howWorkLabel: "How We Work",
    howWorkHeadline: "분야를 넘어,\n하나의 팀으로 일합니다.",
    involvedLabel: "참여 역량 그룹",
    advisorsLabel: "Advisors & Expert Network",
    advisorsHeadline: "자문 & 외부 전문가 네트워크",
    advisorsDesc: "업계 전문가 및 연구 협력 기관과 함께 사업의 깊이를 더합니다.",
    advisorItems: [
      { role: "산업 자문", area: "글로벌 콘텐츠 배급" },
      { role: "기술 자문", area: "AI & 머신러닝" },
      { role: "학술 자문", area: "디지털 미디어 연구" },
    ],
    advisorNote: "자문위원 정보 업데이트 예정",
    moreAdvisors: "추가 자문위원\n업데이트 예정",
    ctaHeadline: "이루티와 함께\n새로운 시장을\n만들어갈 사람을 찾습니다.",
    ctaBtn1: "채용 보기",
    ctaBtn2: "이루티의 사업 알아보기",
    areaLabels: {
      global: "글로벌 사업",
      content: "콘텐츠·파트너십",
      ai: "AI·데이터",
      software: "소프트웨어",
      infra: "인프라",
    } as Record<CapabilityArea, string>,
    leaders: [
      {
        id: "kim-yusung",
        namePlaceholder: "김유성",
        title: "대표이사 / CEO",
        responsibility: "회사 경영, 글로벌 사업 전략, 신규 사업 개발과 주요 파트너십 총괄",
        intro: "주식회사 이루티의 창업자이자 대표이사로서 회사의 경영, 글로벌 사업 전략, 신규 사업 개발, 주요 국내외 파트너십과 AX 사업을 총괄합니다.",
        experience: [
          "2024 창업성장기술개발사업 R&D 사업 수주",
          "2024 블록체인 기술 사업화 지원 사업 수주",
          "2024 블록체인 기반 저작권 관리 기술 특허 개발 및 등록",
          "2023 청년창업사관학교 수료",
          "2022 예비창업패키지 최우수 수료",
          "2022~현재 이루티 대표",
          "2019~2022 메타오션 창업팀 대표",
        ],
        erutyRole: "회사의 경영과 사업 방향을 결정하고 글로벌 시장 확장, 주요 파트너십, Hitpick과 이룸터 사업을 총괄합니다.",
      },
      {
        id: "park-sangil",
        namePlaceholder: "박상일",
        title: "부대표 / COO & CBO",
        responsibility: "기업 운영, 사업 전략, 글로벌 성장과 주요 비즈니스 파트너십 총괄",
        intro: "금융, 투자, 디지털 사업과 기업 운영 분야의 경험을 바탕으로 이루티의 사업 전략, 기업 운영과 글로벌 성장을 총괄합니다.",
        experience: [
          "2025~현재 이루티 부대표",
          "전 에이트원 부사장",
          "전 카사코리아 COO",
          "한국투자공사 KIC 창립 멤버",
          "현대캐피탈·현대카드 경력",
          "금융·투자 및 디지털 사업 운영 경험",
          "연세대학교 졸업",
          "미국 시라큐스대학교 행정학 석사",
        ],
        erutyRole: "회사 운영 체계, 신규 사업과 수익모델, 글로벌 성장 전략과 주요 기업·금융 파트너십을 총괄합니다.",
      },
      {
        id: "lee-kihong",
        namePlaceholder: "이기홍 박사",
        title: "기업부설연구소장 / AI·데이터 연구개발 총괄",
        responsibility: "기업부설연구소 운영과 AI·데이터 연구개발 총괄",
        intro: "금융시장, 포트폴리오와 리스크 관리, 머신러닝 기반 투자 리서치 분야의 전문가입니다. 금융기관의 자산운용과 대체투자 실무, 금융공학과 퀀트투자 교육 경험을 바탕으로 이루티 기업부설연구소의 AI·데이터 연구개발을 총괄합니다.",
        experience: [
          "카네기멜론대학교 석사",
          "피츠버그대학교 Finance Ph.D",
          "KAIST 경영대학 겸임교수",
          "CFA·FRM 보유",
          "삼성생명 자산운용 및 포트폴리오 운용 경험",
          "HSBC 금융 업무 경험",
          "새마을금고중앙회 자산운용 경험",
          "한국투자공사 금융 및 투자 업무 경험",
          "국내외 사모펀드·대체투자 관련 실무 경험",
          "금융공학·머신러닝·퀀트투자 관련 저술 및 번역 경험",
          "금융 AI 교육 Lead Instructor",
        ],
        erutyRole: "기업부설연구소 운영, AI·데이터 연구개발 로드맵, 금융 데이터 분석, 투자 리서치 자동화와 AI 기반 의사결정 지원 기술 연구를 총괄합니다.",
      },
      {
        id: "kim-jinhyuk",
        namePlaceholder: "김진혁",
        title: "개발 총괄 이사",
        responsibility: "AI·소프트웨어 개발 조직과 프로젝트 기술 실행 총괄",
        intro: "이루티의 개발 총괄 이사로서 AI·소프트웨어 프로젝트의 기술 방향, 개발 조직 운영, 서비스 구현, 프로젝트 일정과 품질 관리를 총괄합니다.",
        experience: [
          "공개된 세부 경력 정보는 추후 확정 시 반영 예정",
          "AI·소프트웨어 프로젝트 기술 실행 총괄",
          "서비스 아키텍처 및 개발 계획 검토",
          "프론트엔드·백엔드·인프라 개발 조율",
          "개발 일정과 품질 관리 및 서비스 운영 총괄",
        ],
        erutyRole: "개발 조직 총괄, AI·소프트웨어 프로젝트 기술 방향 수립, 서비스 아키텍처와 개발 계획 검토, 서비스 배포와 운영 관리를 담당합니다.",
      },
    ],
    teamMembers: [
      { id: "kim-yusung", namePlaceholder: "김유성", title: "대표이사 / CEO", area: "global" as CapabilityArea, shortResponsibility: "회사 경영과 글로벌 사업 전략 총괄", fullResponsibility: "회사의 경영, 글로벌 사업 전략, 신규 사업 개발, 주요 국내외 파트너십과 AX 사업 전반을 총괄합니다.", career: ["2024 창업성장기술개발사업 R&D 사업 수주", "2024 블록체인 기술 사업화 지원 사업 수주", "2024 블록체인 기반 저작권 관리 기술 특허 개발 및 등록", "2023 청년창업사관학교 수료", "2022 예비창업패키지 최우수 수료", "2022~현재 이루티 대표", "2019~2022 메타오션 창업팀 대표"], expertise: ["회사 경영", "글로벌 사업 전략", "신규 사업 개발", "주요 파트너십", "AX 사업"], projects: ["글로벌 시장 확장", "주요 국내외 파트너십", "Hitpick 사업 총괄", "이룸터 사업 총괄"] },
      { id: "park-sangil", namePlaceholder: "박상일", title: "부대표 / COO & CBO", area: "content" as CapabilityArea, shortResponsibility: "기업 운영과 사업 전략, 글로벌 성장 총괄", fullResponsibility: "기업 운영 체계, 신규 사업과 수익모델, 글로벌 성장 전략, 주요 기업·금융 파트너십을 총괄합니다.", career: ["2025~현재 이루티 부대표", "전 에이트원 부사장", "전 카사코리아 COO", "한국투자공사 KIC 창립 멤버", "현대캐피탈·현대카드 경력", "연세대학교 졸업", "미국 시라큐스대학교 행정학 석사"], expertise: ["기업 운영", "사업 전략", "글로벌 성장", "기업·금융 파트너십", "신규 수익모델"], projects: ["운영 체계 고도화", "신규 사업 모델 기획", "글로벌 성장 전략", "핵심 파트너십 개발"] },
      { id: "lee-kihong", namePlaceholder: "이기홍 박사", title: "기업부설연구소장 / AI·데이터 연구개발 총괄", area: "ai" as CapabilityArea, shortResponsibility: "기업부설연구소와 AI·데이터 R&D 총괄", fullResponsibility: "기업부설연구소 운영, AI·데이터 연구개발 로드맵, 금융 데이터 분석, 투자 리서치 자동화, AI 기반 의사결정 지원 기술 연구를 총괄합니다.", career: ["카네기멜론대학교 석사", "피츠버그대학교 Finance Ph.D", "KAIST 경영대학 겸임교수", "CFA·FRM 보유", "삼성생명 자산운용 및 포트폴리오 운용 경험", "HSBC 금융 업무 경험", "새마을금고중앙회 자산운용 경험", "한국투자공사 금융 및 투자 업무 경험"], expertise: ["AI·데이터 연구개발", "금융 데이터 분석", "포트폴리오·리스크 관리", "머신러닝 기반 투자 리서치", "금융 AI 교육"], projects: ["기업부설연구소 운영", "AI·데이터 연구개발 로드맵", "투자 리서치 자동화", "AI 기반 의사결정 지원 기술 연구"] },
      { id: "kim-jinhyuk", namePlaceholder: "김진혁", title: "개발 총괄 이사", area: "software" as CapabilityArea, shortResponsibility: "AI·소프트웨어 프로젝트 기술 실행 총괄", fullResponsibility: "AI·소프트웨어 프로젝트의 기술 방향, 개발 조직 운영, 서비스 구현, 프로젝트 일정과 품질 관리, 서비스 배포와 운영을 총괄합니다.", career: ["공개된 세부 경력 정보는 추후 확정 시 반영 예정", "AI·소프트웨어 프로젝트 기술 실행 총괄", "서비스 아키텍처 및 개발 계획 검토", "프론트엔드·백엔드·인프라 개발 조율"], expertise: ["소프트웨어 개발", "AI·소프트웨어 프로젝트", "서비스 아키텍처", "개발 조직 운영", "프로젝트 일정 및 품질 관리", "서비스 배포와 운영"], projects: ["개발 조직 총괄", "기술 방향 수립", "서비스 아키텍처 검토", "서비스 배포와 운영 관리"] },
    ],
    capabilityGroups: [
      { id: "global", title: "Global Business", titleKo: "글로벌 비즈니스", responsibility: "해외 시장 진출 전략, 파트너십 개발, 배급 계약 실행", capabilities: ["시장 분석 & 기회 평가", "파트너 네트워크 운영", "배급 계약 협상", "IP 라이선싱"], contribution: "프로젝트 초기에 시장과 파트너를 특정하고, 계약과 실행 구조를 정의합니다.", areaKey: "global" as CapabilityArea },
      { id: "content", title: "Content & Partnership", titleKo: "콘텐츠·파트너십", responsibility: "콘텐츠 IP 투자·제작·배급, 브랜드 협업, 크리에이터 비즈니스", capabilities: ["IP 투자 & 공동제작", "글로벌 배급", "브랜드 커머스", "크리에이터 협업"], contribution: "콘텐츠 가치를 정의하고, 최적의 파트너 및 유통 구조를 연결합니다.", areaKey: "content" as CapabilityArea },
      { id: "ai", title: "AI & Data", titleKo: "AI·데이터", responsibility: "AI 시스템 개발, 데이터 파이프라인, 사업 인텔리전스 제공", capabilities: ["LLM & AI 에이전트", "감성 분석", "콘텐츠 추천", "데이터 인텔리전스"], contribution: "사업 데이터를 분석해 의사결정을 지원하고, AI 기반 자동화를 구현합니다.", areaKey: "ai" as CapabilityArea },
      { id: "software", title: "Software Engineering", titleKo: "소프트웨어 엔지니어링", responsibility: "비즈니스 플랫폼, SaaS 제품, AX 교육 솔루션 개발", capabilities: ["풀스택 개발", "SaaS 아키텍처", "API 통합", "클라우드 인프라"], contribution: "파트너와 고객이 사용하는 제품 및 내부 운영 시스템을 구축합니다.", areaKey: "software" as CapabilityArea },
      { id: "infra", title: "Blockchain & Infrastructure", titleKo: "블록체인·인프라", responsibility: "스마트 계약 기반 IP 권리 관리, 분산 시스템 운영", capabilities: ["스마트 계약 개발", "IP 권리 등록", "온체인 거래 처리", "인프라 운영"], contribution: "콘텐츠 IP 거래의 투명성과 신뢰성을 보장하는 기술 기반을 운영합니다.", areaKey: "infra" as CapabilityArea },
    ],
    workflowSteps: [
      { step: "01", title: "사업 목표 정의", desc: "프로젝트의 목표 시장, 파트너십 구조, 수익 모델을 구체화합니다.", involved: ["global", "content"] as CapabilityArea[] },
      { step: "02", title: "콘텐츠·시장 분석", desc: "목표 시장의 콘텐츠 수요, 경쟁 환경, 파트너 가능성을 분석합니다.", involved: ["content", "ai"] as CapabilityArea[] },
      { step: "03", title: "기술 설계", desc: "사업 목표를 달성하기 위한 AI 시스템, 플랫폼, 인프라 구조를 설계합니다.", involved: ["ai", "software", "infra"] as CapabilityArea[] },
      { step: "04", title: "개발과 파트너 실행", desc: "소프트웨어를 개발하고 파트너와 함께 콘텐츠 배급 및 사업을 실행합니다.", involved: ["software", "infra", "content", "global"] as CapabilityArea[] },
      { step: "05", title: "운영과 성과 개선", desc: "데이터를 기반으로 성과를 측정하고, 파트너십과 시스템을 지속적으로 개선합니다.", involved: ["ai", "global", "content", "software", "infra"] as CapabilityArea[] },
    ],
    memberCount: (n: number) => `구성원 ${n}명`,
  },
  en: {
    heroLabel: "Team & Leadership",
    heroHeadline: "Connecting Business and Technology,\nExecuting New\nPossibilities.",
    heroDesc: "Specialists in global business, content, AI, and software\nwork together as one team on every project.",
    heroStats: [
      { label: "Capability Groups" },
      { label: "Team Members" },
      { label: "Global Markets" },
    ],
    leadershipLabel: "Leadership",
    leadershipHeadline: "Leadership Driving ERUTY",
    photoPlaceholder: "No profile image",
    namePlaceholderNote: "",
    responsibilityLabel: "Key Responsibilities",
    introLabel: "Introduction",
    careerLabel: "Career History",
    roleLabel: "Role at ERUTY",
    moreLeadershipNote: "ERUTY is led by an execution-focused leadership team spanning management, business, R&D, and engineering.",
    capabilitiesLabel: "Capabilities",
    capabilitiesHeadline: "Five Specialized Capabilities\nCompleting One Project",
    responsibilityCol: "Key Responsibilities",
    capabilitiesCol: "Core Capabilities",
    contributionCol: "Project Contribution",
    memberCountSuffix: " members",
    directoryLabel: "Team Directory",
    directoryHeadline: "Team Members",
    filterOptions: [
      { key: "all" as const, label: "All" },
      { key: "global" as const, label: "Global Business" },
      { key: "content" as const, label: "Content · Partnership" },
      { key: "ai" as const, label: "AI · Data" },
      { key: "software" as const, label: "Software" },
      { key: "infra" as const, label: "Infrastructure" },
    ],
    memberNameNote: "",
    memberPhotoNote: "No profile image",
    memberDetailBtn: "View Details",
    moreMembers: "Cross-functional\nleadership overview",
    modalNameNote: "",
    modalResponsibility: "Responsibilities",
    modalCareer: "Career History",
    modalExpertise: "Expertise",
    modalProjects: "Projects",
    howWorkLabel: "How We Work",
    howWorkHeadline: "Across Disciplines,\nAs One Team.",
    involvedLabel: "Involved Capability Groups",
    advisorsLabel: "Advisors & Expert Network",
    advisorsHeadline: "Advisory & External Expert Network",
    advisorsDesc: "We deepen our business with industry experts and research collaboration institutions.",
    advisorItems: [
      { role: "Industry Advisor", area: "Global Content Distribution" },
      { role: "Technology Advisor", area: "AI & Machine Learning" },
      { role: "Academic Advisor", area: "Digital Media Research" },
    ],
    advisorNote: "Advisor information to be updated",
    moreAdvisors: "More advisors\nto be updated",
    ctaHeadline: "Looking for People to\nBuild New Markets\nwith ERUTY.",
    ctaBtn1: "View Careers",
    ctaBtn2: "Learn About ERUTY's Business",
    areaLabels: {
      global: "Global Business",
      content: "Content · Partnership",
      ai: "AI · Data",
      software: "Software",
      infra: "Infrastructure",
    } as Record<CapabilityArea, string>,
    leaders: [
      {
        id: "kim-yusung",
        namePlaceholder: "Yusung Kim",
        title: "Founder & CEO",
        responsibility: "Leads corporate management, global business strategy, new business development, and key partnerships",
        intro: "Founder and CEO of ERUTY, leading corporate management, global business strategy, new business development, key partnerships, and AX transformation.",
        experience: [
          "2024 Awarded a Startup Growth Technology Development R&D project",
          "2024 Awarded a blockchain technology commercialization support project",
          "2024 Developed and registered a blockchain-based copyright management technology patent",
          "2023 Completed the Youth Startup Academy program",
          "2022 Top completion award, Preliminary Startup Package",
          "2022–Present CEO, ERUTY",
          "2019–2022 Team Lead, MetaOcean founding team",
        ],
        erutyRole: "Leads ERUTY’s corporate direction, global expansion, key partnerships, and the Hitpick and Erumter businesses.",
      },
      {
        id: "park-sangil",
        namePlaceholder: "Sangil Park",
        title: "Vice President / COO & CBO",
        responsibility: "Leads corporate operations, business strategy, global growth, and major business partnerships",
        intro: "Drawing on extensive experience in finance, investment, digital business, and corporate operations, he leads ERUTY’s business strategy, operations, and global growth.",
        experience: [
          "2025–Present Vice President, ERUTY",
          "Former Executive Vice President, EightOne",
          "Former COO, Casa Korea",
          "Founding member, Korea Investment Corporation (KIC)",
          "Experience at Hyundai Capital and Hyundai Card",
          "Leadership across finance, investment, and digital business operations",
          "Yonsei University",
          "M.P.A., Syracuse University",
        ],
        erutyRole: "Leads corporate operations, new business models, global growth strategy, and major corporate and financial partnerships.",
      },
      {
        id: "lee-kihong",
        namePlaceholder: "Ki Hong Lee",
        title: "Head of R&D Center / AI & Data Research Lead",
        responsibility: "Leads the corporate R&D center and AI and data research initiatives",
        intro: "An expert in financial markets, portfolio and risk management, and machine-learning-based investment research. Drawing on experience in institutional asset management, alternative investments, financial engineering, and quantitative finance education, he leads AI and data research at ERUTY’s R&D Center.",
        experience: [
          "M.S., Carnegie Mellon University",
          "Ph.D. in Finance, University of Pittsburgh",
          "Adjunct Professor, KAIST College of Business",
          "CFA and FRM holder",
          "Asset management and portfolio management experience at Samsung Life Insurance",
          "Financial services experience at HSBC",
          "Asset management experience at the National Credit Union Federation of Korea",
          "Finance and investment experience at Korea Investment Corporation",
          "Hands-on experience in domestic and international private equity and alternative investments",
          "Authoring and translation experience in financial engineering, machine learning, and quantitative investing",
          "Lead instructor for financial AI education",
        ],
        erutyRole: "Leads ERUTY’s R&D Center, AI and data research roadmap, financial data analysis, investment research automation, and AI-powered decision support research.",
      },
      {
        id: "kim-jinhyuk",
        namePlaceholder: "Jinhyuk Kim",
        title: "Director of Engineering",
        responsibility: "Leads AI and software engineering execution across the organization",
        intro: "As Director of Engineering at ERUTY, he leads the technical direction of AI and software projects, engineering operations, service delivery, project schedules, and quality management.",
        experience: [
          "Detailed public career history is pending confirmation",
          "Leads technical execution across AI and software projects",
          "Reviews service architecture and development plans",
          "Coordinates frontend, backend, and infrastructure development",
          "Oversees delivery schedules, quality, deployment, and operations",
        ],
        erutyRole: "Leads ERUTY’s engineering organization, establishes technical direction for AI and software projects, reviews architecture and development plans, and oversees deployment and operations.",
      },
    ],
    teamMembers: [
      { id: "kim-yusung", namePlaceholder: "Yusung Kim", title: "Founder & CEO", area: "global" as CapabilityArea, shortResponsibility: "Leads corporate management and global business strategy", fullResponsibility: "Leads corporate management, global business strategy, new business development, key domestic and international partnerships, and AX initiatives across ERUTY.", career: ["2024 Awarded a Startup Growth Technology Development R&D project", "2024 Awarded a blockchain technology commercialization support project", "2024 Developed and registered a blockchain-based copyright management technology patent", "2023 Completed the Youth Startup Academy program", "2022 Top completion award, Preliminary Startup Package", "2022–Present CEO, ERUTY", "2019–2022 Team Lead, MetaOcean founding team"], expertise: ["Corporate Management", "Global Business Strategy", "New Business Development", "Key Partnerships", "AX Business"], projects: ["Global expansion", "Major domestic and international partnerships", "Hitpick business leadership", "Erumter business leadership"] },
      { id: "park-sangil", namePlaceholder: "Sangil Park", title: "Vice President / COO & CBO", area: "content" as CapabilityArea, shortResponsibility: "Leads operations, business strategy, and global growth", fullResponsibility: "Leads corporate operations, new business and revenue models, global growth strategy, and major corporate and financial partnerships.", career: ["2025–Present Vice President, ERUTY", "Former Executive Vice President, EightOne", "Former COO, Casa Korea", "Founding member, Korea Investment Corporation (KIC)", "Experience at Hyundai Capital and Hyundai Card", "Yonsei University", "M.P.A., Syracuse University"], expertise: ["Corporate Operations", "Business Strategy", "Global Growth", "Corporate and Financial Partnerships", "New Revenue Models"], projects: ["Operating model design", "New business model planning", "Global growth strategy", "Key partnership development"] },
      { id: "lee-kihong", namePlaceholder: "Ki Hong Lee", title: "Head of R&D Center / AI & Data Research Lead", area: "ai" as CapabilityArea, shortResponsibility: "Leads the R&D center and AI/data research roadmap", fullResponsibility: "Leads ERUTY’s R&D Center, AI and data research roadmap, financial data analysis, investment research automation, and AI-powered decision support research.", career: ["M.S., Carnegie Mellon University", "Ph.D. in Finance, University of Pittsburgh", "Adjunct Professor, KAIST College of Business", "CFA and FRM holder", "Asset management and portfolio management experience at Samsung Life Insurance", "Financial services experience at HSBC", "Asset management experience at the National Credit Union Federation of Korea", "Finance and investment experience at Korea Investment Corporation"], expertise: ["AI and Data R&D", "Financial Data Analysis", "Portfolio and Risk Management", "Machine-Learning Investment Research", "Financial AI Education"], projects: ["R&D Center operations", "AI and data research roadmap", "Investment research automation", "AI-powered decision support research"] },
      { id: "kim-jinhyuk", namePlaceholder: "Jinhyuk Kim", title: "Director of Engineering", area: "software" as CapabilityArea, shortResponsibility: "Leads technical execution for AI and software projects", fullResponsibility: "Leads the technical direction of AI and software projects, engineering operations, service delivery, project schedules, quality management, deployment, and operations.", career: ["Detailed public career history is pending confirmation", "Leads technical execution across AI and software projects", "Reviews service architecture and development plans", "Coordinates frontend, backend, and infrastructure development"], expertise: ["Software Development", "AI and Software Projects", "Service Architecture", "Engineering Operations", "Project Schedule and Quality Management", "Service Deployment and Operations"], projects: ["Engineering organization leadership", "Technical direction setting", "Architecture and development review", "Service deployment and operations"] },
    ],
    capabilityGroups: [
      { id: "global", title: "Global Business", titleKo: "Global Business", responsibility: "Overseas market entry strategy, partnership development, distribution contract execution", capabilities: ["Market Analysis & Opportunity Evaluation", "Partner Network Operations", "Distribution Contract Negotiation", "IP Licensing"], contribution: "At project initiation, identifies markets and partners, and defines contract and execution structures.", areaKey: "global" as CapabilityArea },
      { id: "content", title: "Content & Partnership", titleKo: "Content & Partnership", responsibility: "Content IP investment, production, distribution, brand collaboration, creator business", capabilities: ["IP Investment & Co-production", "Global Distribution", "Brand Commerce", "Creator Collaboration"], contribution: "Defines content value and connects optimal partners and distribution structures.", areaKey: "content" as CapabilityArea },
      { id: "ai", title: "AI & Data", titleKo: "AI & Data", responsibility: "AI system development, data pipelines, business intelligence delivery", capabilities: ["LLM & AI Agents", "Sentiment Analysis", "Content Recommendation", "Data Intelligence"], contribution: "Analyzes business data to support decision-making and implements AI-driven automation.", areaKey: "ai" as CapabilityArea },
      { id: "software", title: "Software Engineering", titleKo: "Software Engineering", responsibility: "Business platforms, SaaS products, AX training solution development", capabilities: ["Full-Stack Development", "SaaS Architecture", "API Integration", "Cloud Infrastructure"], contribution: "Builds products used by partners and customers, as well as internal operations systems.", areaKey: "software" as CapabilityArea },
      { id: "infra", title: "Blockchain & Infrastructure", titleKo: "Blockchain & Infrastructure", responsibility: "Smart contract-based IP rights management, distributed systems operations", capabilities: ["Smart Contract Development", "IP Rights Registration", "On-chain Transaction Processing", "Infrastructure Operations"], contribution: "Operates the technical foundation ensuring transparency and reliability in content IP transactions.", areaKey: "infra" as CapabilityArea },
    ],
    workflowSteps: [
      { step: "01", title: "Define Business Goals", desc: "Concretize the project's target market, partnership structure, and revenue model.", involved: ["global", "content"] as CapabilityArea[] },
      { step: "02", title: "Content & Market Analysis", desc: "Analyze content demand, competitive environment, and partner possibilities in the target market.", involved: ["content", "ai"] as CapabilityArea[] },
      { step: "03", title: "Technology Design", desc: "Design AI systems, platforms, and infrastructure structures to achieve business goals.", involved: ["ai", "software", "infra"] as CapabilityArea[] },
      { step: "04", title: "Development & Partner Execution", desc: "Develop software and execute content distribution and business with partners.", involved: ["software", "infra", "content", "global"] as CapabilityArea[] },
      { step: "05", title: "Operations & Performance Improvement", desc: "Measure performance based on data and continuously improve partnerships and systems.", involved: ["ai", "global", "content", "software", "infra"] as CapabilityArea[] },
    ],
    memberCount: (n: number) => `${n}${" members"}`,
  },
};

// ── 공통 컴포넌트 ─────────────────────────────────────────────────────────────

function getProfileImage(personId: string) {
  return PROFILE_IMAGE_BY_ID[personId as keyof typeof PROFILE_IMAGE_BY_ID];
}

function SmallPortrait({ personId, name }: { personId: string; name: string }) {
  const profileImage = getProfileImage(personId);

  return (
    <div style={{ width: 80, height: 100, background: SOFT_BG, position: "relative", overflow: "hidden", flexShrink: 0 }}>
      {profileImage ? (
        <img
          src={profileImage.src}
          alt={profileImage.alt || name}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      ) : (
        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
          <rect x="20%" y="15%" width="60%" height="70%" fill={BORDER} />
        </svg>
      )}
    </div>
  );
}

function AreaTag({ area, lang }: { area: CapabilityArea; lang: "ko" | "en" }) {
  return (
    <span className="inline-block text-xs px-2 py-0.5" style={{ border: `1px solid ${BLUE}30`, color: BLUE, fontFamily: "var(--font-mono)" }}>
      {T[lang].areaLabels[area]}
    </span>
  );
}

// ── 섹션 1: 히어로 ────────────────────────────────────────────────────────────

function HeroSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const capGroups = t.capabilityGroups;
  const statValues = ["5", `${t.teamMembers.length}`, "4"];
  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 pt-28 pb-0">
        <div className="inline-block text-xs mb-14 px-3 py-1.5 tracking-widest uppercase" style={{ color: BLUE, border: `1px solid rgba(55,55,242,0.25)`, fontFamily: "var(--font-mono)" }}>
          {t.heroLabel}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-20 mb-16">
          <div className="lg:col-span-6">
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.6rem, 5vw, 4.5rem)", lineHeight: 1.04, letterSpacing: "-0.03em", color: NEAR_BLACK }}>
              {t.heroHeadline.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </h1>
          </div>
          <div className="lg:col-span-6 flex flex-col justify-end gap-6">
            <p style={{ fontSize: "1rem", lineHeight: 1.85, color: BODY_TEXT, maxWidth: 440 }}>
              {t.heroDesc.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
            </p>
            <div className="flex flex-wrap gap-8">
              {t.heroStats.map((s, i) => (
                <div key={s.label}>
                  <div className="text-2xl mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 800, color: NEAR_BLACK }}>{statValues[i]}</div>
                  <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 역량 배너 */}
        <div className="flex gap-px" style={{ background: BORDER }}>
          {capGroups.map((g, i) => (
            <div key={g.id} className="flex-1 min-w-0 p-4" style={{ background: i === 0 ? NEAR_BLACK : "#FFFFFF" }}>
              <div className="text-xs mb-1" style={{ color: i === 0 ? "rgba(255,255,255,0.4)" : MUTED, fontFamily: "var(--font-mono)" }}>0{i + 1}</div>
              <div className="text-xs truncate" style={{ color: i === 0 ? "#FFFFFF" : NEAR_BLACK, fontFamily: "var(--font-body)", fontWeight: 600 }}>{g.titleKo}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 섹션 2: 리더십 ────────────────────────────────────────────────────────────

function LeadershipSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const leaders = t.leaders;
  const [activeIdx, setActiveIdx] = useState(0);
  const leader = leaders[activeIdx];
  const leaderImage = getProfileImage(leader.id);

  return (
    <section style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.leadershipLabel}</div>
        <h2 className="mb-12" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.leadershipHeadline}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 프로필 카드 */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={leader.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-12" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                {/* 초상 */}
                <div className="md:col-span-4 bg-gray-50" style={{ minHeight: 260 }}>
                  <div style={{ width: "100%", height: "100%", minHeight: 260, background: SOFT_BG, position: "relative", overflow: "hidden" }}>
                    {leaderImage ? (
                      <img
                        src={leaderImage.src}
                        alt={leaderImage.alt || leader.namePlaceholder}
                        style={{ width: "100%", height: "100%", minHeight: 260, objectFit: "cover", display: "block" }}
                      />
                    ) : (
                      <>
                        <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
                          <defs>
                            <pattern id="lp-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                              <path d="M 24 0 L 0 0 0 24" fill="none" stroke={BORDER} strokeWidth="0.6" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#lp-grid)" />
                          <rect x="22%" y="15%" width="56%" height="70%" fill="none" stroke={BORDER} strokeWidth="1" />
                          <rect x="32%" y="22%" width="36%" height="56%" fill={BORDER} />
                        </svg>
                        <div style={{ position: "absolute", bottom: 12, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
                          <span style={{ fontSize: 10, color: MUTED, fontFamily: "var(--font-mono)", background: "#FFFFFF", padding: "2px 8px" }}>{t.photoPlaceholder}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                {/* 텍스트 */}
                <div className="md:col-span-8 p-8 flex flex-col gap-6">
                  <div>
                    <div className="text-xs mb-1" style={{ color: BLUE, fontFamily: "var(--font-mono)" }}>{leader.title}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.4rem", color: NEAR_BLACK }}>{leader.namePlaceholder}</div>
                    {t.namePlaceholderNote && (
                      <div className="text-xs mt-1" style={{ color: MUTED, fontFamily: "var(--font-mono)", fontStyle: "italic" }}>{t.namePlaceholderNote}</div>
                    )}
                  </div>
                  <div>
                    <div className="text-xs mb-1.5" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.responsibilityLabel}</div>
                    <p className="text-sm" style={{ color: BODY_TEXT, lineHeight: 1.7 }}>{leader.responsibility}</p>
                  </div>
                  <div>
                    <div className="text-xs mb-1.5" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.introLabel}</div>
                    <p className="text-sm" style={{ color: MUTED, lineHeight: 1.7, fontStyle: "italic" }}>{leader.intro}</p>
                  </div>
                  <div>
                    <div className="text-xs mb-1.5" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.careerLabel}</div>
                    <div className="flex flex-col gap-1.5">
                      {leader.experience.map((e, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm" style={{ color: MUTED, fontStyle: "italic" }}>
                          <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: BORDER }} />
                          {e}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 16 }}>
                    <div className="text-xs mb-1.5" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.roleLabel}</div>
                    <p className="text-sm" style={{ color: BODY_TEXT }}>{leader.erutyRole}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* 리더 목록 */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            {leaders.map((l, i) => (
              <button key={l.id} onClick={() => setActiveIdx(i)}
                className="flex items-center gap-4 p-4 text-left w-full cursor-pointer transition-all"
                style={{ background: activeIdx === i ? "#FFFFFF" : "transparent", border: `1px solid ${activeIdx === i ? BLUE : "transparent"}`, borderLeft: `3px solid ${activeIdx === i ? BLUE : "transparent"}` }}>
                <SmallPortrait personId={l.id} name={l.namePlaceholder} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: activeIdx === i ? NEAR_BLACK : MUTED }}>{l.namePlaceholder}</div>
                  <div className="text-xs mt-0.5 truncate" style={{ color: activeIdx === i ? BLUE : MUTED, fontFamily: "var(--font-mono)" }}>{l.title}</div>
                </div>
                <ChevronRight size={14} style={{ color: activeIdx === i ? BLUE : "transparent", flexShrink: 0 }} />
              </button>
            ))}
            <div className="p-4" style={{ border: `1px dashed ${BORDER}` }}>
              <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)", fontStyle: "italic" }}>{t.moreLeadershipNote}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 섹션 3: 역량 그룹 ────────────────────────────────────────────────────────

function CapabilityGroupsSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const capGroups = t.capabilityGroups;
  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.capabilitiesLabel}</div>
        <h2 className="mb-12" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em", maxWidth: 480 }}>
          {t.capabilitiesHeadline.split("\n").map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </h2>
        <div className="flex flex-col gap-px" style={{ background: BORDER }}>
          {capGroups.map((g, i) => {
            const memberCount = t.teamMembers.filter((m) => m.area === g.areaKey).length;
            return (
              <div key={g.id} className="grid grid-cols-12 gap-6 p-7" style={{ background: "#FFFFFF" }}>
                <div className="col-span-12 md:col-span-1">
                  <div className="text-xs" style={{ color: BLUE, fontFamily: "var(--font-mono)", fontWeight: 600 }}>0{i + 1}</div>
                </div>
                <div className="col-span-12 md:col-span-3">
                  <div className="text-sm mb-1" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: NEAR_BLACK }}>{g.title}</div>
                  <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{g.titleKo}</div>
                </div>
                <div className="col-span-12 md:col-span-3">
                  <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.responsibilityCol}</div>
                  <p className="text-sm" style={{ color: BODY_TEXT, lineHeight: 1.6 }}>{g.responsibility}</p>
                </div>
                <div className="col-span-12 md:col-span-2">
                  <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.capabilitiesCol}</div>
                  <div className="flex flex-col gap-1.5">
                    {g.capabilities.map((c) => (
                      <div key={c} className="flex items-start gap-1.5 text-xs" style={{ color: BODY_TEXT }}>
                        <div className="w-1 h-1 rounded-full mt-1 flex-shrink-0" style={{ background: BLUE }} />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-3">
                  <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.contributionCol}</div>
                  <p className="text-xs" style={{ color: MUTED, lineHeight: 1.6 }}>{g.contribution}</p>
                  <div className="mt-3 text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>
                    {t.memberCount(memberCount)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── 섹션 4: 팀 디렉토리 ──────────────────────────────────────────────────────

function MemberCard({ member, onClick, lang }: { member: typeof T["ko"]["teamMembers"][0]; onClick: () => void; lang: "ko" | "en" }) {
  const t = T[lang];
  const [hovered, setHovered] = useState(false);
  const profileImage = getProfileImage(member.id);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col text-left cursor-pointer w-full"
      style={{ background: hovered ? SOFT_BG : "#FFFFFF", transition: "background 0.15s" }}
    >
      {/* 사진 */}
      <div style={{ width: "100%", aspectRatio: "4/5", background: SOFT_BG, position: "relative", overflow: "hidden", flexShrink: 0 }}>
        {profileImage ? (
          <img
            src={profileImage.src}
            alt={profileImage.alt || member.namePlaceholder}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <>
            <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
              <defs>
                <pattern id={`mc-${member.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke={BORDER} strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#mc-${member.id})`} />
              <rect x="25%" y="18%" width="50%" height="65%" fill={BORDER} />
            </svg>
            <div style={{ position: "absolute", bottom: 8, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
              <span style={{ fontSize: 9, color: MUTED, fontFamily: "var(--font-mono)", background: "#FFFFFF", padding: "1px 6px" }}>{t.memberPhotoNote}</span>
            </div>
          </>
        )}
      </div>
      {/* 텍스트 */}
      <div className="p-4 flex flex-col gap-2">
        <div>
          <div className="text-xs" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: NEAR_BLACK }}>{member.namePlaceholder}</div>
          {t.memberNameNote && (
            <div className="text-xs mt-0.5" style={{ color: MUTED, fontFamily: "var(--font-mono)", fontStyle: "italic" }}>{t.memberNameNote}</div>
          )}
        </div>
        <AreaTag area={member.area} lang={lang} />
        <div className="text-xs" style={{ color: MUTED, lineHeight: 1.5 }}>{member.shortResponsibility}</div>
        <div className="flex items-center gap-1 text-xs pt-1" style={{ color: hovered ? BLUE : "transparent", fontFamily: "var(--font-mono)", transition: "color 0.15s" }}>
          {t.memberDetailBtn} <ArrowUpRight size={10} />
        </div>
      </div>
    </button>
  );
}

function TeamDirectorySection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [filter, setFilter] = useState<"all" | CapabilityArea>("all");
  const [selected, setSelected] = useState<typeof T["ko"]["teamMembers"][0] | null>(null);

  const visible = filter === "all" ? t.teamMembers : t.teamMembers.filter((m) => m.area === filter);

  return (
    <section style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.directoryLabel}</div>
        <h2 className="mb-10" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.directoryHeadline}
        </h2>

        {/* 필터 */}
        <div className="flex flex-wrap gap-2 mb-8">
          {t.filterOptions.map((opt) => (
            <button key={opt.key} onClick={() => setFilter(opt.key)}
              className="px-4 py-2 text-xs transition-all cursor-pointer"
              style={{ background: filter === opt.key ? NEAR_BLACK : "#FFFFFF", color: filter === opt.key ? "#FFFFFF" : BODY_TEXT, border: `1px solid ${filter === opt.key ? NEAR_BLACK : BORDER}`, fontFamily: "var(--font-body)" }}>
              {opt.label}
            </button>
          ))}
        </div>

        {/* 그리드 */}
        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px" style={{ background: BORDER }}>
            {visible.map((m) => (
              <MemberCard key={m.id} member={m} onClick={() => setSelected(m)} lang={lang} />
            ))}
            <div className="flex items-center justify-center p-6" style={{ background: "#FFFFFF", minHeight: 200 }}>
              <div className="text-xs text-center" style={{ color: MUTED, fontFamily: "var(--font-mono)", fontStyle: "italic", lineHeight: 1.6 }}>
                {t.moreMembers.split("\n").map((line, i, arr) => (
                  <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 모달 */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(24,25,27,0.72)" }}
            onClick={() => setSelected(null)}>
            <motion.div initial={{ opacity: 0, scale: 0.97, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97 }} transition={{ duration: 0.18 }}
              style={{ background: "#FFFFFF", maxWidth: 620, width: "100%", maxHeight: "85vh", overflow: "auto" }}
              onClick={(e) => e.stopPropagation()}>
              {/* 모달 헤더 */}
              <div className="flex items-start gap-5 p-7" style={{ borderBottom: `1px solid ${BORDER}` }}>
                <SmallPortrait personId={selected.id} name={selected.namePlaceholder} />
                <div className="flex-1 min-w-0">
                  <div className="text-lg mb-0.5" style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: NEAR_BLACK }}>{selected.namePlaceholder}</div>
                  {t.modalNameNote && (
                    <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)", fontStyle: "italic" }}>{t.modalNameNote}</div>
                  )}
                  <div className="text-xs mb-3" style={{ color: BLUE, fontFamily: "var(--font-mono)" }}>{selected.title}</div>
                  <AreaTag area={selected.area} lang={lang} />
                </div>
                <button onClick={() => setSelected(null)} className="p-1 cursor-pointer flex-shrink-0" style={{ color: MUTED }}>
                  <X size={18} />
                </button>
              </div>
              {/* 모달 바디 */}
              <div className="p-7 flex flex-col gap-6">
                <div>
                  <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.modalResponsibility}</div>
                  <p className="text-sm" style={{ color: BODY_TEXT, lineHeight: 1.75 }}>{selected.fullResponsibility}</p>
                </div>
                <div>
                  <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.modalCareer}</div>
                  <div className="flex flex-col gap-1.5">
                    {selected.career.map((c, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm" style={{ color: MUTED, fontStyle: "italic" }}>
                        <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: BORDER }} />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.modalExpertise}</div>
                  <div className="flex flex-wrap gap-2">
                    {selected.expertise.map((e) => (
                      <span key={e} className="text-xs px-2.5 py-1" style={{ background: SOFT_BG, color: BODY_TEXT, fontFamily: "var(--font-mono)" }}>{e}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-xs mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.modalProjects}</div>
                  <div className="flex flex-col gap-1.5">
                    {selected.projects.map((p) => (
                      <div key={p} className="flex items-center gap-2 text-sm" style={{ color: BODY_TEXT }}>
                        <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: BLUE }} />
                        {p}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ── 섹션 5: 협업 방식 ────────────────────────────────────────────────────────

function HowWeWorkSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const capGroups = t.capabilityGroups;
  const workflowSteps = t.workflowSteps;
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.howWorkLabel}</div>
        <h2 className="mb-12" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.6rem, 2.5vw, 2.5rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.howWorkHeadline.split("\n").map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* 스텝 목록 */}
          <div className="lg:col-span-4 flex flex-col gap-px" style={{ background: BORDER }}>
            {workflowSteps.map((s, i) => (
              <button key={i} onClick={() => setActiveStep(i)}
                className="flex items-start gap-4 p-5 text-left w-full cursor-pointer"
                style={{ background: activeStep === i ? NEAR_BLACK : "#FFFFFF", transition: "background 0.15s" }}>
                <span className="text-xs flex-shrink-0 mt-0.5" style={{ fontFamily: "var(--font-mono)", fontWeight: 600, color: activeStep === i ? "rgba(255,255,255,0.5)" : BLUE }}>{s.step}</span>
                <span className="text-sm" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: activeStep === i ? "#FFFFFF" : NEAR_BLACK }}>{s.title}</span>
              </button>
            ))}
          </div>

          {/* 스텝 상세 */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={activeStep} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}
                className="p-8 flex flex-col gap-8" style={{ border: `1px solid ${BORDER}`, background: "#FFFFFF", minHeight: 280 }}>
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span style={{ fontFamily: "var(--font-mono)", color: BLUE, fontSize: "0.75rem", fontWeight: 600 }}>{workflowSteps[activeStep].step}</span>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.2rem", color: NEAR_BLACK }}>{workflowSteps[activeStep].title}</h3>
                  </div>
                  <p style={{ fontSize: "0.95rem", color: BODY_TEXT, lineHeight: 1.75 }}>{workflowSteps[activeStep].desc}</p>
                </div>

                <div>
                  <div className="text-xs mb-4" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.involvedLabel}</div>
                  <div className="flex flex-wrap gap-2">
                    {capGroups.map((g) => {
                      const isInvolved = workflowSteps[activeStep].involved.includes(g.areaKey);
                      return (
                        <div key={g.id} className="flex items-center gap-2 px-3 py-2"
                          style={{ background: isInvolved ? NEAR_BLACK : SOFT_BG, border: `1px solid ${isInvolved ? NEAR_BLACK : BORDER}`, transition: "all 0.15s" }}>
                          <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: isInvolved ? "#FFFFFF" : BORDER }} />
                          <span className="text-xs" style={{ color: isInvolved ? "#FFFFFF" : MUTED, fontFamily: "var(--font-body)" }}>{g.titleKo}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 진행도 */}
                <div className="flex gap-1 mt-auto">
                  {workflowSteps.map((_, i) => (
                    <div key={i} className="h-0.5 flex-1 rounded-full" style={{ background: i <= activeStep ? BLUE : BORDER, transition: "background 0.15s" }} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 섹션 6: 어드바이저 ───────────────────────────────────────────────────────

const SHOW_ADVISORS = true;

function AdvisorsSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  if (!SHOW_ADVISORS) return null;
  return (
    <section style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-8 py-20">
        <div className="text-xs tracking-widest uppercase mb-2" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{t.advisorsLabel}</div>
        <h2 className="mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(1.4rem, 2vw, 2rem)", color: NEAR_BLACK, letterSpacing: "-0.02em" }}>
          {t.advisorsHeadline}
        </h2>
        <p className="mb-10 text-sm" style={{ color: MUTED }}>{t.advisorsDesc}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: BORDER }}>
          {t.advisorItems.map((a, i) => (
            <div key={i} className="p-7" style={{ background: "#FFFFFF" }}>
              <div style={{ width: 48, height: 48, background: SOFT_BG, marginBottom: 20 }} />
              <div className="text-xs mb-1" style={{ color: BLUE, fontFamily: "var(--font-mono)" }}>{a.role}</div>
              <div className="text-sm mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: NEAR_BLACK }}>{a.area}</div>
              <p className="text-xs" style={{ color: MUTED, fontStyle: "italic" }}>{t.advisorNote}</p>
            </div>
          ))}
          <div className="flex items-center justify-center p-7" style={{ background: "#FFFFFF" }}>
            <div className="text-xs text-center" style={{ color: MUTED, fontFamily: "var(--font-mono)", fontStyle: "italic", lineHeight: 1.8 }}>
              {t.moreAdvisors.split("\n").map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              ))}
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
            <Link to="/company/careers"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm transition-all"
              style={{ background: BLUE, color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500 }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#2828d4"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = BLUE; }}>
              {t.ctaBtn1} <ArrowUpRight size={14} />
            </Link>
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

export function TeamPage() {
  return (
    <div className="pt-16" style={{ background: "#FFFFFF" }}>
      <HeroSection />
      <LeadershipSection />
      <CapabilityGroupsSection />
      <TeamDirectorySection />
      <HowWeWorkSection />
      <AdvisorsSection />
      <CtaSection />
    </div>
  );
}
