import { useState } from "react";
import { Download } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { PageContainer } from "../components/PageContainer";
import { PageHeading } from "../components/PageHeading";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BODY_TEXT = "#333438";
const MUTED = "#737780";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F5F6F8";

export type ResourceVisibility = "published" | "draft" | "hidden";

type CaseStudy = {
  id: number;
  visibility: ResourceVisibility;
  headline: string;
  country: string;
  type: string;
  role: string;
  tech: string;
  tags: string[];
};

type Opportunity = {
  id: number;
  visibility: ResourceVisibility;
  title: string;
  country: string;
  type: string;
  status: string;
  partnership: string;
  category: string;
};

type Insight = {
  id: number;
  visibility: ResourceVisibility;
  title: string;
  category: string;
  date: string;
  region: string;
  type: string;
};

type Program = {
  id: number;
  visibility: ResourceVisibility;
  title: string;
  type: string;
  date: string;
  location: string;
  status: string;
};

type NewsItem = {
  id: number;
  visibility: ResourceVisibility;
  title: string;
  date: string;
  type: string;
};

type DownloadItem = {
  label: string;
  visibility: ResourceVisibility;
  desc: string;
  format: string;
  size: string;
  url?: string;
};

const T = {
  ko: {
    categories: ["전체", "사례 연구", "프로젝트 & 기회", "인사이트 & 리포트", "프로그램 & 이벤트", "뉴스룸", "자료 다운로드"],
    badge: "리소스",
    heading: "이루티 지식 허브",
    description: "글로벌 운영에서 축적한 사례 연구, 인사이트, 프로젝트, 프로그램과 최신 소식을 정리합니다.",
    emptyState: "공개 가능한 자료를 정리하고 있습니다.",
    caseStudiesLabel: "사례 연구",
    caseStudiesHeading: "시장과 사업 현장에 맞춘 사례",
    market: "시장",
    erutyRole: "이루티 역할",
    opportunitiesLabel: "프로젝트 & 기회",
    opportunitiesHeading: "진행 중인 프로젝트와 기회",
    opportunityFilters: ["전체", "콘텐츠", "AX"],
    insightsLabel: "인사이트 & 리포트",
    insightsHeading: "시장 분석과 사업 인사이트",
    programsLabel: "프로그램 & 이벤트",
    programsHeading: "교육, 프로그램, 이벤트",
    newsLabel: "뉴스룸",
    newsHeading: "이루티 최신 소식",
    downloadsLabel: "자료 다운로드",
    downloadsHeading: "문서와 소개 자료",
    statusLabels: {
      "진행중": "진행중",
      "협의중": "협의중",
      "검토중": "검토중",
      "모집중": "모집중",
      "접수중": "접수중",
      "확정": "확정",
      "완료": "완료",
    } as Record<string, string>,
  },
  en: {
    categories: ["All", "Case Studies", "Projects & Opportunities", "Insights & Reports", "Programs & Events", "Newsroom", "Downloads"],
    badge: "Resources",
    heading: "ERUTY Knowledge Hub",
    description: "Case studies, insights, projects, programs, and the latest updates from ERUTY's global operations.",
    emptyState: "Public materials are being prepared.",
    caseStudiesLabel: "Case Studies",
    caseStudiesHeading: "Cases Shaped for Markets and Business Execution",
    market: "Market",
    erutyRole: "ERUTY Role",
    opportunitiesLabel: "Projects & Opportunities",
    opportunitiesHeading: "Active Projects and Opportunities",
    opportunityFilters: ["All", "Content", "AX"],
    insightsLabel: "Insights & Reports",
    insightsHeading: "Market Analysis and Business Insight",
    programsLabel: "Programs & Events",
    programsHeading: "Education, Programs and Events",
    newsLabel: "Newsroom",
    newsHeading: "Latest from ERUTY",
    downloadsLabel: "Downloads",
    downloadsHeading: "Documents and Materials",
    statusLabels: {
      "Active": "Active",
      "Negotiating": "Negotiating",
      "Under Review": "Under Review",
      "Recruiting": "Recruiting",
      "Accepting": "Accepting",
      "Confirmed": "Confirmed",
      "Completed": "Completed",
    } as Record<string, string>,
  },
} as const;

const DATA: Record<"ko" | "en", {
  caseStudies: CaseStudy[];
  opportunities: Opportunity[];
  insights: Insight[];
  programs: Program[];
  newsItems: NewsItem[];
  downloads: DownloadItem[];
}> = {
  ko: {
    caseStudies: [
      { id: 1, visibility: "draft" as const, headline: "한국 콘텐츠와 베트남 비즈니스 파트너 연결", country: "한국 · 베트남", type: "콘텐츠 배급", role: "전략 파트너 & 운영자", tech: "콘텐츠 인텔리전스 · 시장 분석", tags: ["배급", "파트너십"] },
      { id: 2, visibility: "draft" as const, headline: "콘텐츠 추천을 위한 AI 기반 감성 분석 시스템", country: "한국", type: "AI 소프트웨어 개발", role: "기술 개발사", tech: "생성형 AI · 감성 분석 · LLM", tags: ["AI", "소프트웨어"] },
      { id: 3, visibility: "draft" as const, headline: "유럽 시장 IP 라이선싱 기회 탐색", country: "한국 · 독일 · 프랑스", type: "IP 라이선싱", role: "IP 비즈니스 자문 & 운영", tech: "권리 인프라 · 블록체인", tags: ["IP", "유럽"] },
      { id: 4, visibility: "draft" as const, headline: "생성형 AI 기반 기업 업무 자동화", country: "한국 · 싱가포르", type: "업무 자동화", role: "AX 전환 파트너", tech: "AI 에이전트 · 워크플로 자동화", tags: ["자동화", "기업"] },
      { id: 5, visibility: "draft" as const, headline: "동남아 시장용 크리에이터 커머스 플랫폼", country: "한국 · VN · TW · SG", type: "커머스 & 크리에이터", role: "플랫폼 개발사 & 시장 파트너", tech: "커머스 플랫폼 · 오디언스 분석", tags: ["크리에이터", "커머스"] },
      { id: 6, visibility: "draft" as const, headline: "공공기관 대상 AX 교육 프로그램", country: "한국", type: "AX 교육", role: "프로그램 설계자 & 교육자", tech: "AI 리터러시 프레임워크 · LMS", tags: ["교육", "공공기관"] },
    ],
    opportunities: [
      { id: 1, visibility: "draft" as const, title: "한국 드라마 IP OTT 배급 파트너", country: "동남아시아", type: "글로벌 배급", status: "진행중", partnership: "수익 배분", category: "콘텐츠" },
      { id: 2, visibility: "draft" as const, title: "공동 투자 기회: 다큐멘터리 시리즈 제작", country: "한국 + 글로벌", type: "투자 & 제작", status: "협의중", partnership: "공동 투자", category: "콘텐츠" },
      { id: 3, visibility: "draft" as const, title: "기업 AX 교육 프로그램: 금융 분야", country: "한국", type: "AX 교육", status: "진행중", partnership: "서비스 계약", category: "AX" },
      { id: 4, visibility: "draft" as const, title: "애니메이션 프랜차이즈 IP 라이선싱 파트너", country: "일본 · 대만", type: "IP 라이선싱", status: "진행중", partnership: "라이선싱 딜", category: "콘텐츠" },
      { id: 5, visibility: "draft" as const, title: "AI 소프트웨어 개발: 이커머스 자동화", country: "싱가포르", type: "AI 개발", status: "검토중", partnership: "프로젝트 계약", category: "AX" },
      { id: 6, visibility: "draft" as const, title: "글로벌 브랜드 협업: K-콘텐츠 크리에이터 네트워크", country: "글로벌", type: "브랜드 협업", status: "진행중", partnership: "수익 배분", category: "콘텐츠" },
    ],
    insights: [
      { id: 1, visibility: "draft" as const, title: "글로벌 OTT 콘텐츠 시장 2025: 한국 IP 수출 기회", category: "시장 분석", date: "2025년 1월", region: "글로벌", type: "리포트" },
      { id: 2, visibility: "draft" as const, title: "한국 기업의 AX 전환 현황", category: "기업 AI", date: "2024년 12월", region: "한국", type: "리포트" },
      { id: 3, visibility: "draft" as const, title: "동남아 크리에이터 이코노미: 트렌드와 수익화 방향", category: "크리에이터 트렌드", date: "2024년 11월", region: "동남아시아", type: "리포트" },
      { id: 4, visibility: "draft" as const, title: "비즈니스 운영을 위한 AI 에이전트 시스템 가이드", category: "AI & 자동화", date: "2024년 11월", region: "글로벌", type: "가이드" },
      { id: 5, visibility: "draft" as const, title: "베트남 콘텐츠 시장 진출을 위한 체크포인트", category: "국가 분석", date: "2024년 10월", region: "베트남", type: "브리프" },
      { id: 6, visibility: "draft" as const, title: "콘텐츠 비즈니스의 블록체인 IP 관리 적용", category: "기술", date: "2024년 10월", region: "글로벌", type: "분석" },
    ],
    programs: [
      { id: 1, visibility: "draft" as const, title: "AX 기본과 생성형 AI 리더 교육", type: "교육", date: "2025년 2월", location: "서울 · 온라인", status: "모집중" },
      { id: 2, visibility: "draft" as const, title: "글로벌 콘텐츠 마켓 포럼 2025", type: "컨퍼런스", date: "2025년 3월", location: "서울, 한국", status: "모집중" },
      { id: 3, visibility: "draft" as const, title: "이루티 참가: ContentMarket Asia 2025", type: "전시", date: "2025년 4월", location: "싱가포르", status: "확정" },
      { id: 4, visibility: "draft" as const, title: "기업 AX 프로그램: 맞춤형 12주 집중 과정", type: "교육", date: "상시 운영", location: "현장 / 온라인", status: "접수중" },
      { id: 5, visibility: "draft" as const, title: "세미나: AI 기반 IP 비즈니스", type: "세미나", date: "2025년 1월", location: "서울, 한국", status: "완료" },
      { id: 6, visibility: "draft" as const, title: "이루티 글로벌 파트너 모집 프로그램", type: "파트너 프로그램", date: "상시 운영", location: "글로벌", status: "모집중" },
    ],
    newsItems: [
      { id: 1, visibility: "draft" as const, title: "이루티, 베트남 주요 플랫폼과 콘텐츠 배급 계약 체결", date: "2024년 12월", type: "파트너십" },
      { id: 2, visibility: "draft" as const, title: "이루티, AI R&D 프로젝트 정부 승인 획득", date: "2024년 11월", type: "R&D" },
      { id: 3, visibility: "draft" as const, title: "AX 교육 프로그램, 기업 전문가 수료", date: "2024년 11월", type: "교육" },
      { id: 4, visibility: "draft" as const, title: "이루티, 핵심 기술·사업 인재 채용 확대", date: "2024년 10월", type: "회사" },
      { id: 5, visibility: "draft" as const, title: "콘텐츠 파트너용 IP 블록체인 인프라 배포", date: "2024년 9월", type: "기술" },
    ],
    downloads: [
      { label: "회사 소개서", visibility: "draft" as const, desc: "이루티 소개, 사업 영역, 팀, 글로벌 네트워크 개요", format: "PDF", size: "2.4 MB" },
      { label: "서비스 개요", visibility: "draft" as const, desc: "전체 서비스와 사업 영역 상세 소개", format: "PDF", size: "3.1 MB" },
      { label: "기술 개요", visibility: "draft" as const, desc: "기술 역량, 아키텍처, R&D 하이라이트", format: "PDF", size: "1.8 MB" },
      { label: "파트너십 제안서", visibility: "draft" as const, desc: "글로벌 콘텐츠·기술 파트너십 프레임워크", format: "PDF", size: "1.2 MB" },
      { label: "AX 시장 리포트 2024", visibility: "draft" as const, desc: "한국 및 아시아 기업의 AI 전환 동향", format: "PDF", size: "5.6 MB" },
    ],
  },
  en: {
    caseStudies: [
      { id: 1, visibility: "draft" as const, headline: "Connecting Korean Content with Vietnamese Business Partners", country: "Korea · Vietnam", type: "Content Distribution", role: "Strategic Partner & Operator", tech: "Content Intelligence · Market Analysis", tags: ["Distribution", "Partnership"] },
      { id: 2, visibility: "draft" as const, headline: "AI-Powered Sentiment Analysis for Content Recommendation", country: "Korea", type: "AI Software Development", role: "Technology Developer", tech: "Generative AI · Sentiment Analysis · LLM", tags: ["AI", "Software"] },
      { id: 3, visibility: "draft" as const, headline: "Exploring IP Licensing Opportunities in Europe", country: "Korea · Germany · France", type: "IP Licensing", role: "IP Business Advisor & Operator", tech: "Rights Infrastructure · Blockchain", tags: ["IP", "Europe"] },
      { id: 4, visibility: "draft" as const, headline: "Enterprise Workflow Automation with Generative AI", country: "Korea · Singapore", type: "Workflow Automation", role: "AX Transformation Partner", tech: "AI Agents · Workflow Automation", tags: ["Automation", "Enterprise"] },
      { id: 5, visibility: "draft" as const, headline: "Creator Commerce Platform for Southeast Asia", country: "Korea · VN · TW · SG", type: "Commerce & Creator", role: "Platform Developer & Market Partner", tech: "Commerce Platform · Audience Analytics", tags: ["Creator", "Commerce"] },
      { id: 6, visibility: "draft" as const, headline: "AX Education Program for Public Institutions", country: "Korea", type: "AX Education", role: "Program Designer & Educator", tech: "AI Literacy Framework · LMS", tags: ["Education", "Public Sector"] },
    ],
    opportunities: [
      { id: 1, visibility: "draft" as const, title: "Korean Drama IP OTT Distribution Partner", country: "Southeast Asia", type: "Global Distribution", status: "Active", partnership: "Revenue Share", category: "Content" },
      { id: 2, visibility: "draft" as const, title: "Co-Investment Opportunity: Documentary Series Production", country: "Korea + Global", type: "Investment & Production", status: "Negotiating", partnership: "Co-Investment", category: "Content" },
      { id: 3, visibility: "draft" as const, title: "Corporate AX Education Program: Finance Sector", country: "Korea", type: "AX Education", status: "Active", partnership: "Service Contract", category: "AX" },
      { id: 4, visibility: "draft" as const, title: "Animation Franchise IP Licensing Partner", country: "Japan · Taiwan", type: "IP Licensing", status: "Active", partnership: "Licensing Deal", category: "Content" },
      { id: 5, visibility: "draft" as const, title: "AI Software Development: E-Commerce Automation", country: "Singapore", type: "AI Development", status: "Under Review", partnership: "Project Contract", category: "AX" },
      { id: 6, visibility: "draft" as const, title: "Global Brand Collaboration: K-Content Creator Network", country: "Global", type: "Brand Collaboration", status: "Active", partnership: "Revenue Share", category: "Content" },
    ],
    insights: [
      { id: 1, visibility: "draft" as const, title: "Global OTT Content Market 2025: Korean IP Export Opportunities", category: "Market Analysis", date: "Jan 2025", region: "Global", type: "Report" },
      { id: 2, visibility: "draft" as const, title: "State of AX Transformation in Korean Enterprises", category: "Enterprise AI", date: "Dec 2024", region: "Korea", type: "Report" },
      { id: 3, visibility: "draft" as const, title: "Southeast Asia Creator Economy: Trends and Monetization", category: "Creator Trends", date: "Nov 2024", region: "Southeast Asia", type: "Report" },
      { id: 4, visibility: "draft" as const, title: "AI Agent Systems for Business Operations", category: "AI & Automation", date: "Nov 2024", region: "Global", type: "Guide" },
      { id: 5, visibility: "draft" as const, title: "Entering the Vietnam Content Market: Key Considerations", category: "Country Analysis", date: "Oct 2024", region: "Vietnam", type: "Brief" },
      { id: 6, visibility: "draft" as const, title: "Blockchain IP Management in Content Business", category: "Technology", date: "Oct 2024", region: "Global", type: "Analysis" },
    ],
    programs: [
      { id: 1, visibility: "draft" as const, title: "AX Fundamentals and Generative AI for Leaders", type: "Education", date: "Feb 2025", location: "Seoul · Online", status: "Recruiting" },
      { id: 2, visibility: "draft" as const, title: "Global Content Market Forum 2025", type: "Conference", date: "Mar 2025", location: "Seoul, Korea", status: "Recruiting" },
      { id: 3, visibility: "draft" as const, title: "ERUTY at ContentMarket Asia 2025", type: "Exhibition", date: "Apr 2025", location: "Singapore", status: "Confirmed" },
      { id: 4, visibility: "draft" as const, title: "Corporate AX Program: Customized 12-Week Intensive", type: "Education", date: "Ongoing", location: "On-site / Online", status: "Accepting" },
      { id: 5, visibility: "draft" as const, title: "Seminar: AI-Powered IP Business", type: "Seminar", date: "Jan 2025", location: "Seoul, Korea", status: "Completed" },
      { id: 6, visibility: "draft" as const, title: "ERUTY Global Partner Recruitment Program", type: "Partner Program", date: "Ongoing", location: "Global", status: "Recruiting" },
    ],
    newsItems: [
      { id: 1, visibility: "draft" as const, title: "ERUTY Signs a Content Distribution Agreement with a Vietnamese Platform", date: "Dec 2024", type: "Partnership" },
      { id: 2, visibility: "draft" as const, title: "ERUTY Receives Government Approval for an AI R&D Project", date: "Nov 2024", type: "R&D" },
      { id: 3, visibility: "draft" as const, title: "AX Education Program Graduates Corporate Professionals", date: "Nov 2024", type: "Education" },
      { id: 4, visibility: "draft" as const, title: "ERUTY Expands Hiring for Key Tech and Business Talent", date: "Oct 2024", type: "Company" },
      { id: 5, visibility: "draft" as const, title: "IP Blockchain Infrastructure Deployed for Content Partners", date: "Sep 2024", type: "Technology" },
    ],
    downloads: [
      { label: "Company Overview", visibility: "draft" as const, desc: "Introduction to ERUTY, business areas, team, and global network overview", format: "PDF", size: "2.4 MB" },
      { label: "Service Overview", visibility: "draft" as const, desc: "Full service details across the business areas", format: "PDF", size: "3.1 MB" },
      { label: "Technology Overview", visibility: "draft" as const, desc: "Technical capabilities, architecture, and R&D highlights", format: "PDF", size: "1.8 MB" },
      { label: "Partnership Proposal", visibility: "draft" as const, desc: "Global content and technology partnership framework", format: "PDF", size: "1.2 MB" },
      { label: "AX Market Report 2024", visibility: "draft" as const, desc: "State of AI transformation in Korean and Asian enterprises", format: "PDF", size: "5.6 MB" },
    ],
  },
} as const;

const statusColors: Record<string, string> = {
  "진행중": "#22C55E",
  "협의중": "#F59E0B",
  "검토중": MUTED,
  "모집중": "#22C55E",
  "접수중": BLUE,
  "확정": "#F59E0B",
  "완료": MUTED,
  "Active": "#22C55E",
  "Negotiating": "#F59E0B",
  "Under Review": MUTED,
  "Recruiting": "#22C55E",
  "Accepting": BLUE,
  "Confirmed": "#F59E0B",
  "Completed": MUTED,
};

function SectionHeader({ label, heading }: { label: string; heading: string }) {
  return (
    <>
      <div className="text-xs tracking-widest uppercase mb-4" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{label}</div>
      <h2 className="mb-10" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: NEAR_BLACK }}>
        {heading}
      </h2>
    </>
  );
}

function EmptyStateCard({ message }: { message: string }) {
  return (
    <div className="p-8 md:p-10" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}>
      <p style={{ color: BODY_TEXT, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "clamp(1.02rem, 1.6vw, 1.18rem)", lineHeight: 1.72 }}>
        {message}
      </p>
    </div>
  );
}

export function ResourcesPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const data = DATA[lang];
  const categories = t.categories as readonly string[];
  const opportunityFilters = t.opportunityFilters as readonly string[];

  const [activeCategory, setActiveCategory] = useState<string>(t.categories[0]);
  const [opportunityFilter, setOpportunityFilter] = useState<string>(t.opportunityFilters[0]);

  const activeCategoryIndex = categories.indexOf(activeCategory);
  const activeOppFilterIndex = opportunityFilters.indexOf(opportunityFilter);

  const activeCat = activeCategoryIndex >= 0 ? categories[activeCategoryIndex] : categories[0];
  const activeOppFilter = activeOppFilterIndex >= 0 ? opportunityFilters[activeOppFilterIndex] : opportunityFilters[0];

  const isAll = activeCat === categories[0];
  const showCaseStudies = isAll || activeCat === categories[1];
  const showOpportunities = isAll || activeCat === categories[2];
  const showInsights = isAll || activeCat === categories[3];
  const showPrograms = isAll || activeCat === categories[4];
  const showNews = isAll || activeCat === categories[5];
  const showDownloads = isAll || activeCat === categories[6];

  const publishedCaseStudies = data.caseStudies.filter((item) => item.visibility === "published");
  const publishedInsights = data.insights.filter((item) => item.visibility === "published");
  const publishedPrograms = data.programs.filter((item) => item.visibility === "published");
  const publishedNews = data.newsItems.filter((item) => item.visibility === "published");
  const publishedDownloads = data.downloads.filter((item) => item.visibility === "published");
  const publishedOpportunities = data.opportunities.filter((item) => item.visibility === "published");
  const filteredOpportunities = activeOppFilter === opportunityFilters[0]
    ? publishedOpportunities
    : publishedOpportunities.filter((item) => item.category === activeOppFilter);

  return (
    <div style={{ background: "#FFFFFF" }}>
      <section style={{ borderBottom: `1px solid ${BORDER}` }}>
        <PageContainer className="eruty-hero-section">
          <PageHeading eyebrow={t.badge} title={t.heading} description={t.description} align="center" lang={lang} />
        </PageContainer>
      </section>

      <section style={{ borderBottom: `1px solid ${BORDER}`, position: "sticky", top: "var(--eruty-header-height)", zIndex: 30, background: "#FFFFFF" }}>
        <div className="eruty-container eruty-horizontal-scroll flex gap-0 overflow-x-auto">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className="px-5 py-4 text-sm whitespace-nowrap transition-all cursor-pointer"
              style={{
                color: activeCategoryIndex === index ? NEAR_BLACK : MUTED,
                borderBottom: activeCategoryIndex === index ? `2px solid ${BLUE}` : "2px solid transparent",
                fontFamily: "var(--font-body)",
                fontWeight: activeCategoryIndex === index ? 500 : 400,
                background: "transparent",
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {showCaseStudies && (
        <section className="py-20" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="eruty-container">
            <SectionHeader label={t.caseStudiesLabel} heading={t.caseStudiesHeading} />
            {publishedCaseStudies.length === 0 ? (
              <EmptyStateCard message={t.emptyState} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {publishedCaseStudies.map((item) => (
                  <div key={item.id} className="p-7" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {item.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5" style={{ border: `1px solid ${BLUE}33`, color: BLUE, fontFamily: "var(--font-mono)" }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mb-4" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", lineHeight: 1.5, color: NEAR_BLACK }}>
                      {item.headline}
                    </h3>
                    <div className="flex flex-col gap-2 mb-5">
                      {[{ label: t.market, value: item.country }, { label: t.erutyRole, value: item.role }].map((row) => (
                        <div key={row.label} className="flex items-center gap-2 text-xs">
                          <span style={{ color: MUTED, fontFamily: "var(--font-mono)", width: 84 }}>{row.label}</span>
                          <span style={{ color: BODY_TEXT, fontSize: "0.92rem", lineHeight: 1.6 }}>{row.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{item.tech}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {showOpportunities && (
        <section className="py-20" style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
          <div className="eruty-container">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
              <div>
                <SectionHeader label={t.opportunitiesLabel} heading={t.opportunitiesHeading} />
              </div>
              <div className="flex gap-2">
                {opportunityFilters.map((filter, index) => (
                  <button
                    key={filter}
                    onClick={() => setOpportunityFilter(filter)}
                    className="px-4 py-2 text-xs transition-all cursor-pointer"
                    style={{
                      background: activeOppFilterIndex === index ? NEAR_BLACK : "transparent",
                      color: activeOppFilterIndex === index ? "#FFFFFF" : MUTED,
                      border: `1px solid ${BORDER}`,
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
            {filteredOpportunities.length === 0 ? (
              <EmptyStateCard message={t.emptyState} />
            ) : (
              <div className="flex flex-col gap-px">
                {filteredOpportunities.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-5" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                    <div className="flex items-center gap-6 flex-1">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: statusColors[item.status] || MUTED }} />
                      <div>
                        <div className="text-sm mb-1" style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.98rem", color: NEAR_BLACK }}>{item.title}</div>
                        <div className="flex items-center gap-4 text-xs" style={{ color: MUTED }}>
                          <span>{item.country}</span>
                          <span style={{ color: BORDER }}>·</span>
                          <span>{item.type}</span>
                          <span style={{ color: BORDER }}>·</span>
                          <span>{item.partnership}</span>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs px-2.5 py-1" style={{ color: statusColors[item.status] || MUTED, border: `1px solid ${(statusColors[item.status] || MUTED) + "33"}`, fontFamily: "var(--font-mono)" }}>
                      {t.statusLabels[item.status] ?? item.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {showInsights && (
        <section className="py-20" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="eruty-container">
            <SectionHeader label={t.insightsLabel} heading={t.insightsHeading} />
            {publishedInsights.length === 0 ? (
              <EmptyStateCard message={t.emptyState} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {publishedInsights.map((item) => (
                  <div key={item.id} className="p-7" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs px-2 py-0.5" style={{ border: "1px solid rgba(245,158,11,0.3)", color: "#F59E0B", fontFamily: "var(--font-mono)" }}>
                        {item.type}
                      </span>
                      <span className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{item.date}</span>
                    </div>
                    <h3 className="mb-3" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", lineHeight: 1.55, color: NEAR_BLACK }}>
                      {item.title}
                    </h3>
                    <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{item.region} · {item.category}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {showPrograms && (
        <section className="py-20" style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
          <div className="eruty-container">
            <SectionHeader label={t.programsLabel} heading={t.programsHeading} />
            {publishedPrograms.length === 0 ? (
              <EmptyStateCard message={t.emptyState} />
            ) : (
              <div className="flex flex-col gap-px">
                {publishedPrograms.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-6" style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}>
                    <div>
                      <div className="text-sm mb-1" style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.98rem", color: NEAR_BLACK }}>{item.title}</div>
                      <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>
                        {item.date} · {item.location}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{item.type}</span>
                      <span className="text-xs px-2.5 py-1" style={{ color: statusColors[item.status] || MUTED, border: `1px solid ${(statusColors[item.status] || MUTED) + "33"}`, fontFamily: "var(--font-mono)" }}>
                        {t.statusLabels[item.status] ?? item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {showNews && (
        <section className="py-20" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <div className="eruty-container">
            <SectionHeader label={t.newsLabel} heading={t.newsHeading} />
            {publishedNews.length === 0 ? (
              <EmptyStateCard message={t.emptyState} />
            ) : (
              <div className="flex flex-col gap-px">
                {publishedNews.map((item) => (
                  <div key={item.id} className="flex items-center justify-between py-5" style={{ borderBottom: `1px solid ${BORDER}` }}>
                    <div className="flex items-center gap-6">
                      <span className="text-xs flex-shrink-0" style={{ color: MUTED, fontFamily: "var(--font-mono)", width: 80 }}>
                        {item.date}
                      </span>
                      <span className="text-sm" style={{ color: NEAR_BLACK, fontFamily: "var(--font-body)", fontSize: "0.98rem" }}>{item.title}</span>
                    </div>
                    <span className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>{item.type}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {showDownloads && (
        <section className="py-20">
          <div className="eruty-container">
            <SectionHeader label={t.downloadsLabel} heading={t.downloadsHeading} />
            {publishedDownloads.length === 0 ? (
              <EmptyStateCard message={t.emptyState} />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {publishedDownloads.map((item) => {
                  const isClickable = Boolean(item.url);
                  const Wrapper = isClickable ? "a" : "div";
                  const wrapperProps = isClickable ? { href: item.url, target: "_blank", rel: "noreferrer" } : {};

                  return (
                    <Wrapper
                      key={item.label}
                      {...wrapperProps}
                      className="group flex items-start justify-between p-7"
                      style={{ background: "#FFFFFF", border: `1px solid ${BORDER}`, cursor: isClickable ? "pointer" : "default" }}
                    >
                      <div className="flex-1">
                        <div className="text-sm mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: "1rem", color: NEAR_BLACK }}>{item.label}</div>
                        <div className="text-xs mb-4" style={{ color: BODY_TEXT, lineHeight: 1.68 }}>{item.desc}</div>
                        <div className="text-xs" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>
                          {item.format} · {item.size}
                        </div>
                      </div>
                      {isClickable && <Download size={16} className="flex-shrink-0 ml-4 mt-0.5" style={{ color: MUTED }} />}
                    </Wrapper>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
