import { useState } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const T = {
  ko: {
    categories: ["전체", "사례 연구", "프로젝트 & 기회", "인사이트 & 리포트", "프로그램 & 이벤트", "뉴스룸", "자료 다운로드"],
    badge: "리소스",
    heading: "이루티 지식 허브",
    description: "글로벌 운영에서 나온 사례 연구, 인사이트, 프로젝트, 프로그램, 그리고 최신 소식",
    caseStudiesLabel: "사례 연구",
    caseStudiesHeading: "시장을 가로지른 성과들",
    market: "시장",
    erutyRole: "이루티 역할",
    opportunitiesLabel: "프로젝트 & 기회",
    opportunitiesHeading: "진행 중인 프로젝트와 오픈 딜",
    opportunityFilters: ["전체", "콘텐츠", "AX"],
    insightsLabel: "인사이트 & 리포트",
    insightsHeading: "시장 인텔리전스와 비즈니스 분석",
    programsLabel: "프로그램 & 이벤트",
    programsHeading: "교육, 전시, 이벤트",
    newsLabel: "뉴스룸",
    newsHeading: "이루티 최신 소식",
    downloadsLabel: "자료 다운로드",
    downloadsHeading: "문서 및 자료",
    caseStudies: [
      { id: 1, headline: "한국 콘텐츠를 베트남 비즈니스 파트너와 연결", country: "한국 → 베트남", type: "콘텐츠 배급", role: "전략 파트너 & 운영사", tech: "콘텐츠 인텔리전스 · 시장 분석", tags: ["배급", "파트너십"] },
      { id: 2, headline: "콘텐츠 추천을 위한 AI 기반 감성 분석 시스템", country: "한국", type: "AI 소프트웨어 개발", role: "기술 개발사", tech: "생성형 AI · 감성 분석 · LLM", tags: ["AI", "소프트웨어"] },
      { id: 3, headline: "유럽 시장 IP 라이선싱 기회 확대", country: "한국 → 독일 · 프랑스", type: "IP 라이선싱", role: "IP 비즈니스 어드바이저 & 운영사", tech: "권리 인프라 · 블록체인", tags: ["IP", "유럽"] },
      { id: 4, headline: "생성형 AI로 기업 HR·재무 워크플로우 자동화", country: "한국 · 싱가포르", type: "업무 자동화", role: "AX 전환 파트너", tech: "AI 에이전트 · 워크플로우 자동화", tags: ["자동화", "기업"] },
      { id: 5, headline: "동남아시아 시장을 위한 크리에이터 커머스 플랫폼", country: "한국 → VN · TW · SG", type: "커머스 & 크리에이터", role: "플랫폼 개발사 & 시장 파트너", tech: "커머스 플랫폼 · 오디언스 분석", tags: ["크리에이터", "커머스"] },
      { id: 6, headline: "공무원 2,000명 이상 대상 AX 교육 프로그램", country: "한국", type: "AX 교육", role: "프로그램 설계자 & 교육자", tech: "AI 리터러시 프레임워크 · LMS", tags: ["교육", "공공기관"] },
    ],
    opportunities: [
      { id: 1, title: "한국 드라마 IP OTT 배급 파트너", country: "동남아시아", type: "글로벌 배급", status: "진행중", partnership: "수익 배분", category: "콘텐츠" },
      { id: 2, title: "공동 투자 기회: 다큐멘터리 시리즈 제작", country: "한국 + 글로벌", type: "투자 & 제작", status: "협상중", partnership: "공동 투자", category: "콘텐츠" },
      { id: 3, title: "기업 AX 교육 프로그램: 금융 분야", country: "한국", type: "AX 교육", status: "진행중", partnership: "서비스 계약", category: "AX" },
      { id: 4, title: "애니메이션 프랜차이즈 IP 라이선싱 파트너", country: "일본 · 대만", type: "IP 라이선싱", status: "진행중", partnership: "라이선싱 피", category: "콘텐츠" },
      { id: 5, title: "AI 소프트웨어 개발: 이커머스 자동화", country: "싱가포르", type: "AI 개발", status: "검토중", partnership: "프로젝트 계약", category: "AX" },
      { id: 6, title: "글로벌 브랜드 협업: K-콘텐츠 크리에이터 네트워크", country: "글로벌", type: "브랜드 협업", status: "진행중", partnership: "수익 배분", category: "콘텐츠" },
    ],
    insights: [
      { id: 1, title: "글로벌 OTT 콘텐츠 시장 2025: 한국 IP 수출 기회", category: "시장 분석", date: "2025년 1월", region: "글로벌", type: "보고서" },
      { id: 2, title: "한국 기업의 AX 전환 현황", category: "기업 AI", date: "2024년 12월", region: "한국", type: "보고서" },
      { id: 3, title: "동남아시아 크리에이터 이코노미: 트렌드 및 수익화 방향", category: "크리에이터 트렌드", date: "2024년 11월", region: "동남아시아", type: "보고서" },
      { id: 4, title: "비즈니스 운영을 위한 AI 에이전트 시스템: 실용 가이드", category: "AI & 자동화", date: "2024년 11월", region: "글로벌", type: "가이드" },
      { id: 5, title: "베트남 콘텐츠 시장 진출: 한국 기업이 알아야 할 것", category: "국가별 분석", date: "2024년 10월", region: "베트남", type: "브리프" },
      { id: 6, title: "콘텐츠 비즈니스에서 블록체인 IP 관리의 실제 적용", category: "기술", date: "2024년 10월", region: "글로벌", type: "분석" },
    ],
    programs: [
      { id: 1, title: "AX 기초 — 비즈니스 리더를 위한 생성형 AI", type: "교육", date: "2025년 2월", location: "서울 · 온라인", status: "모집중" },
      { id: 2, title: "글로벌 콘텐츠 마켓 포럼 2025", type: "콘퍼런스", date: "2025년 3월", location: "서울, 한국", status: "모집중" },
      { id: 3, title: "이루티 참가: ContentMarket Asia 2025", type: "전시회", date: "2025년 4월", location: "싱가포르", status: "확정" },
      { id: 4, title: "기업 AX 프로그램: 맞춤형 12주 집중 과정", type: "교육", date: "상시 운영", location: "현장 / 온라인", status: "접수중" },
      { id: 5, title: "세미나: 콘텐츠 크리에이터를 위한 AI 기반 IP 비즈니스", type: "세미나", date: "2025년 1월", location: "서울, 한국", status: "완료" },
      { id: 6, title: "이루티 글로벌 파트너 모집 프로그램", type: "파트너 프로그램", date: "상시 운영", location: "글로벌", status: "모집중" },
    ],
    newsItems: [
      { id: 1, title: "이루티, 베트남 주요 플랫폼과 콘텐츠 배급 계약 체결", date: "2024년 12월", type: "파트너십" },
      { id: 2, title: "이루티, AI R&D 프로젝트 정부 승인 획득", date: "2024년 11월", type: "R&D" },
      { id: 3, title: "AX 교육 프로그램, 기업 전문가 500명 이상 수료", date: "2024년 11월", type: "교육" },
      { id: 4, title: "이루티, 기술·비즈니스 핵심 인재 채용 확대", date: "2024년 10월", type: "회사" },
      { id: 5, title: "콘텐츠 파트너 대상 새로운 IP 블록체인 인프라 배포 완료", date: "2024년 9월", type: "기술" },
    ],
    downloads: [
      { label: "회사 소개서", desc: "이루티 소개, 비즈니스 영역, 팀, 글로벌 네트워크 개요", format: "PDF", size: "2.4 MB" },
      { label: "서비스 개요", desc: "두 사업 영역 전체 서비스 상세 내용", format: "PDF", size: "3.1 MB" },
      { label: "기술 개요", desc: "기술 역량, 아키텍처, R&D 하이라이트", format: "PDF", size: "1.8 MB" },
      { label: "파트너십 제안서", desc: "글로벌 콘텐츠·기술 파트너십 프레임워크", format: "PDF", size: "1.2 MB" },
      { label: "AX 시장 보고서 2024", desc: "한국 및 아시아 기업의 AI 전환 현황", format: "PDF", size: "5.6 MB" },
    ],
    statusLabels: {
      "진행중": "진행중",
      "협상중": "협상중",
      "검토중": "검토중",
      "모집중": "모집중",
      "접수중": "접수중",
      "확정": "확정",
      "완료": "완료",
    } as Record<string, string>,
    opportunityFilterAll: "전체",
  },
  en: {
    categories: ["All", "Case Studies", "Projects & Opportunities", "Insights & Reports", "Programs & Events", "Newsroom", "Downloads"],
    badge: "Resources",
    heading: "ERUTY Knowledge Hub",
    description: "Case studies, insights, projects, programs, and the latest news from our global operations",
    caseStudiesLabel: "Case Studies",
    caseStudiesHeading: "Results Across Markets",
    market: "Market",
    erutyRole: "ERUTY Role",
    opportunitiesLabel: "Projects & Opportunities",
    opportunitiesHeading: "Active Projects & Open Deals",
    opportunityFilters: ["All", "Content", "AX"],
    insightsLabel: "Insights & Reports",
    insightsHeading: "Market Intelligence & Business Analysis",
    programsLabel: "Programs & Events",
    programsHeading: "Education, Exhibitions & Events",
    newsLabel: "Newsroom",
    newsHeading: "ERUTY Latest News",
    downloadsLabel: "Downloads",
    downloadsHeading: "Documents & Resources",
    caseStudies: [
      { id: 1, headline: "Connecting Korean Content with Vietnamese Business Partners", country: "Korea → Vietnam", type: "Content Distribution", role: "Strategic Partner & Operator", tech: "Content Intelligence · Market Analysis", tags: ["Distribution", "Partnership"] },
      { id: 2, headline: "AI-Powered Sentiment Analysis System for Content Recommendations", country: "Korea", type: "AI Software Development", role: "Technology Developer", tech: "Generative AI · Sentiment Analysis · LLM", tags: ["AI", "Software"] },
      { id: 3, headline: "Expanding IP Licensing Opportunities in the European Market", country: "Korea → Germany · France", type: "IP Licensing", role: "IP Business Advisor & Operator", tech: "Rights Infrastructure · Blockchain", tags: ["IP", "Europe"] },
      { id: 4, headline: "Automating Corporate HR & Finance Workflows with Generative AI", country: "Korea · Singapore", type: "Workflow Automation", role: "AX Transformation Partner", tech: "AI Agents · Workflow Automation", tags: ["Automation", "Enterprise"] },
      { id: 5, headline: "Creator Commerce Platform for Southeast Asian Markets", country: "Korea → VN · TW · SG", type: "Commerce & Creator", role: "Platform Developer & Market Partner", tech: "Commerce Platform · Audience Analytics", tags: ["Creator", "Commerce"] },
      { id: 6, headline: "AX Education Program for 2,000+ Government Officials", country: "Korea", type: "AX Education", role: "Program Designer & Educator", tech: "AI Literacy Framework · LMS", tags: ["Education", "Public Sector"] },
    ],
    opportunities: [
      { id: 1, title: "Korean Drama IP OTT Distribution Partner", country: "Southeast Asia", type: "Global Distribution", status: "Active", partnership: "Revenue Share", category: "Content" },
      { id: 2, title: "Co-Investment Opportunity: Documentary Series Production", country: "Korea + Global", type: "Investment & Production", status: "Negotiating", partnership: "Co-Investment", category: "Content" },
      { id: 3, title: "Corporate AX Education Program: Finance Sector", country: "Korea", type: "AX Education", status: "Active", partnership: "Service Contract", category: "AX" },
      { id: 4, title: "Animation Franchise IP Licensing Partner", country: "Japan · Taiwan", type: "IP Licensing", status: "Active", partnership: "Licensing Fee", category: "Content" },
      { id: 5, title: "AI Software Development: E-Commerce Automation", country: "Singapore", type: "AI Development", status: "Under Review", partnership: "Project Contract", category: "AX" },
      { id: 6, title: "Global Brand Collaboration: K-Content Creator Network", country: "Global", type: "Brand Collaboration", status: "Active", partnership: "Revenue Share", category: "Content" },
    ],
    insights: [
      { id: 1, title: "Global OTT Content Market 2025: Korean IP Export Opportunities", category: "Market Analysis", date: "Jan 2025", region: "Global", type: "Report" },
      { id: 2, title: "State of AX Transformation in Korean Enterprises", category: "Enterprise AI", date: "Dec 2024", region: "Korea", type: "Report" },
      { id: 3, title: "Southeast Asia Creator Economy: Trends & Monetization Directions", category: "Creator Trends", date: "Nov 2024", region: "Southeast Asia", type: "Report" },
      { id: 4, title: "AI Agent Systems for Business Operations: A Practical Guide", category: "AI & Automation", date: "Nov 2024", region: "Global", type: "Guide" },
      { id: 5, title: "Entering the Vietnam Content Market: What Korean Companies Need to Know", category: "Country Analysis", date: "Oct 2024", region: "Vietnam", type: "Brief" },
      { id: 6, title: "Real-World Applications of Blockchain IP Management in Content Business", category: "Technology", date: "Oct 2024", region: "Global", type: "Analysis" },
    ],
    programs: [
      { id: 1, title: "AX Fundamentals — Generative AI for Business Leaders", type: "Education", date: "Feb 2025", location: "Seoul · Online", status: "Recruiting" },
      { id: 2, title: "Global Content Market Forum 2025", type: "Conference", date: "Mar 2025", location: "Seoul, Korea", status: "Recruiting" },
      { id: 3, title: "ERUTY at ContentMarket Asia 2025", type: "Exhibition", date: "Apr 2025", location: "Singapore", status: "Confirmed" },
      { id: 4, title: "Corporate AX Program: Customized 12-Week Intensive", type: "Education", date: "Ongoing", location: "On-site / Online", status: "Accepting" },
      { id: 5, title: "Seminar: AI-Powered IP Business for Content Creators", type: "Seminar", date: "Jan 2025", location: "Seoul, Korea", status: "Completed" },
      { id: 6, title: "ERUTY Global Partner Recruitment Program", type: "Partner Program", date: "Ongoing", location: "Global", status: "Recruiting" },
    ],
    newsItems: [
      { id: 1, title: "ERUTY Signs Content Distribution Agreement with Major Vietnamese Platform", date: "Dec 2024", type: "Partnership" },
      { id: 2, title: "ERUTY Receives Government Approval for AI R&D Project", date: "Nov 2024", type: "R&D" },
      { id: 3, title: "AX Education Program Graduates 500+ Corporate Professionals", date: "Nov 2024", type: "Education" },
      { id: 4, title: "ERUTY Expands Hiring for Key Tech & Business Talent", date: "Oct 2024", type: "Company" },
      { id: 5, title: "New IP Blockchain Infrastructure Deployed for Content Partners", date: "Sep 2024", type: "Technology" },
    ],
    downloads: [
      { label: "Company Overview", desc: "Introduction to ERUTY, business areas, team, and global network overview", format: "PDF", size: "2.4 MB" },
      { label: "Service Overview", desc: "Full service details across both business areas", format: "PDF", size: "3.1 MB" },
      { label: "Technology Overview", desc: "Technical capabilities, architecture, and R&D highlights", format: "PDF", size: "1.8 MB" },
      { label: "Partnership Proposal", desc: "Global content & technology partnership framework", format: "PDF", size: "1.2 MB" },
      { label: "AX Market Report 2024", desc: "State of AI transformation in Korean and Asian enterprises", format: "PDF", size: "5.6 MB" },
    ],
    statusLabels: {
      "진행중": "Active",
      "협상중": "Negotiating",
      "검토중": "Under Review",
      "모집중": "Recruiting",
      "접수중": "Accepting",
      "확정": "Confirmed",
      "완료": "Completed",
      "Active": "Active",
      "Negotiating": "Negotiating",
      "Under Review": "Under Review",
      "Recruiting": "Recruiting",
      "Accepting": "Accepting",
      "Confirmed": "Confirmed",
      "Completed": "Completed",
    } as Record<string, string>,
    opportunityFilterAll: "All",
  },
};

const statusColors: Record<string, string> = {
  "진행중": "#22C55E",
  "협상중": "#F59E0B",
  "검토중": "#737780",
  "모집중": "#22C55E",
  "접수중": "#3737F2",
  "확정": "#F59E0B",
  "완료": "#737780",
  "Active": "#22C55E",
  "Negotiating": "#F59E0B",
  "Under Review": "#737780",
  "Recruiting": "#22C55E",
  "Accepting": "#3737F2",
  "Confirmed": "#F59E0B",
  "Completed": "#737780",
};

export function ResourcesPage() {
  const { lang } = useLanguage();
  const t = T[lang];

  const [activeCategory, setActiveCategory] = useState(t.categories[0]);
  const [opportunityFilter, setOpportunityFilter] = useState(t.opportunityFilters[0]);

  // Keep filter state synced with language by using index
  const activeCategoryIndex = T.ko.categories.findIndex((c) => c === activeCategory) !== -1
    ? T.ko.categories.findIndex((c) => c === activeCategory)
    : T.en.categories.findIndex((c) => c === activeCategory);

  const opportunityFilterIndex = T.ko.opportunityFilters.findIndex((f) => f === opportunityFilter) !== -1
    ? T.ko.opportunityFilters.findIndex((f) => f === opportunityFilter)
    : T.en.opportunityFilters.findIndex((f) => f === opportunityFilter);

  const activeCat = t.categories[activeCategoryIndex] ?? t.categories[0];
  const activeOppFilter = t.opportunityFilters[opportunityFilterIndex] ?? t.opportunityFilters[0];

  const isAll = activeCat === t.categories[0];
  const showCaseStudies = isAll || activeCat === t.categories[1];
  const showOpportunities = isAll || activeCat === t.categories[2];
  const showInsights = isAll || activeCat === t.categories[3];
  const showPrograms = isAll || activeCat === t.categories[4];
  const showNews = isAll || activeCat === t.categories[5];
  const showDownloads = isAll || activeCat === t.categories[6];

  const filteredOpportunities = activeOppFilter === t.opportunityFilters[0]
    ? t.opportunities
    : t.opportunities.filter((o) => {
        // match by position: index 1 = Content, index 2 = AX
        const filterIdx = t.opportunityFilters.indexOf(activeOppFilter);
        const koFilter = T.ko.opportunityFilters[filterIdx];
        const koOpportunities = T.ko.opportunities;
        const matchingKoIds = koOpportunities.filter((o) => o.category === koFilter).map((o) => o.id);
        return matchingKoIds.includes(o.id);
      });

  return (
    <div className="pt-16" style={{ background: "#FFFFFF" }}>
      {/* Header */}
      <section className="py-24" style={{ borderBottom: "1px solid #E4E6EA" }}>
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="inline-block text-xs mb-8 px-3 py-1.5 tracking-widest uppercase" style={{ color: "#3737F2", border: "1px solid rgba(55,55,242,0.3)", fontFamily: "var(--font-mono)" }}>
            {t.badge}
          </div>
          <h1 className="mb-6" style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(2.5rem, 5vw, 4.5rem)", lineHeight: 1.05, color: "#18191B", letterSpacing: "-0.02em" }}>
            {t.heading}
          </h1>
          <p style={{ fontSize: "1.05rem", color: "#737780", maxWidth: 480, lineHeight: 1.65 }}>
            {t.description}
          </p>
        </div>
      </section>

      {/* Category Navigation */}
      <section style={{ borderBottom: "1px solid #E4E6EA", position: "sticky", top: 64, zIndex: 30, background: "#FFFFFF" }}>
        <div className="max-w-[1440px] mx-auto px-8 flex gap-0 overflow-x-auto">
          {t.categories.map((cat, idx) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-4 text-sm whitespace-nowrap transition-all cursor-pointer"
              style={{
                color: activeCategoryIndex === idx ? "#18191B" : "#737780",
                borderBottom: activeCategoryIndex === idx ? "2px solid #3737F2" : "2px solid transparent",
                fontFamily: "var(--font-body)",
                fontWeight: activeCategoryIndex === idx ? 500 : 400,
                background: "transparent",
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      {showCaseStudies && (
        <section className="py-20" style={{ borderBottom: "1px solid #E4E6EA" }}>
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="text-xs tracking-widest uppercase mb-4" style={{ color: "#737780", fontFamily: "var(--font-mono)" }}>{t.caseStudiesLabel}</div>
            <h2 className="mb-10" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#18191B" }}>
              {t.caseStudiesHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.caseStudies.map((c) => (
                <a
                  key={c.id}
                  aria-disabled="true" onClick={(e: React.MouseEvent) => e.preventDefault()}
                  className="group p-7 block transition-colors"
                  style={{ background: "#FFFFFF", border: "1px solid #E4E6EA" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#333438")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#E4E6EA")}
                >
                  <div className="flex flex-wrap gap-2 mb-5">
                    {c.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5" style={{ border: "1px solid rgba(55,55,242,0.3)", color: "#3737F2", fontFamily: "var(--font-mono)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="mb-4 text-base leading-snug" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "#18191B" }}>
                    {c.headline}
                  </h3>
                  <div className="flex flex-col gap-2 mb-5">
                    {[{ label: t.market, value: c.country }, { label: t.erutyRole, value: c.role }].map((r) => (
                      <div key={r.label} className="flex items-center gap-2 text-xs">
                        <span style={{ color: "#737780", fontFamily: "var(--font-mono)", width: 70 }}>{r.label}</span>
                        <span style={{ color: "#333438" }}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "#737780", fontFamily: "var(--font-mono)" }}>{c.tech.split(" · ")[0]}</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#3737F2" }} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Projects & Opportunities */}
      {showOpportunities && (
        <section className="py-20" style={{ background: "#F5F6F8", borderBottom: "1px solid #E4E6EA" }}>
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="text-xs tracking-widest uppercase mb-4" style={{ color: "#737780", fontFamily: "var(--font-mono)" }}>{t.opportunitiesLabel}</div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#18191B" }}>
                {t.opportunitiesHeading}
              </h2>
              <div className="flex gap-2">
                {t.opportunityFilters.map((f, idx) => (
                  <button
                    key={f}
                    onClick={() => setOpportunityFilter(f)}
                    className="px-4 py-2 text-xs transition-all cursor-pointer"
                    style={{
                      background: opportunityFilterIndex === idx ? "#18191B" : "transparent",
                      color: opportunityFilterIndex === idx ? "#FFFFFF" : "#737780",
                      border: "1px solid #E4E6EA",
                      fontFamily: "var(--font-mono)",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-px">
              {filteredOpportunities.map((o) => (
                <a
                  key={o.id}
                  aria-disabled="true" onClick={(e: React.MouseEvent) => e.preventDefault()}
                  className="group flex items-center justify-between p-5 transition-colors"
                  style={{ background: "#FFFFFF", border: "1px solid #E4E6EA" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#333438")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#E4E6EA")}
                >
                  <div className="flex items-center gap-6 flex-1">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: statusColors[o.status] || "#737780" }} />
                    <div>
                      <div className="text-sm mb-1" style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "#18191B" }}>{o.title}</div>
                      <div className="flex items-center gap-4 text-xs" style={{ color: "#737780" }}>
                        <span>{o.country}</span>
                        <span style={{ color: "#E4E6EA" }}>·</span>
                        <span>{o.type}</span>
                        <span style={{ color: "#E4E6EA" }}>·</span>
                        <span>{o.partnership}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 flex-shrink-0">
                    <span className="text-xs px-2.5 py-1" style={{ color: statusColors[o.status] || "#737780", border: `1px solid ${(statusColors[o.status] || "#737780") + "33"}`, fontFamily: "var(--font-mono)" }}>
                      {o.status}
                    </span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#3737F2" }} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Insights & Reports */}
      {showInsights && (
        <section className="py-20" style={{ borderBottom: "1px solid #E4E6EA" }}>
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="text-xs tracking-widest uppercase mb-4" style={{ color: "#737780", fontFamily: "var(--font-mono)" }}>{t.insightsLabel}</div>
            <h2 className="mb-10" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#18191B" }}>
              {t.insightsHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.insights.map((item) => (
                <a
                  key={item.id}
                  aria-disabled="true" onClick={(e: React.MouseEvent) => e.preventDefault()}
                  className="group p-7 block transition-colors"
                  style={{ background: "#FFFFFF", border: "1px solid #E4E6EA" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#333438")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#E4E6EA")}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs px-2 py-0.5" style={{ border: "1px solid rgba(245,158,11,0.3)", color: "#F59E0B", fontFamily: "var(--font-mono)" }}>
                      {item.type}
                    </span>
                    <span className="text-xs" style={{ color: "#737780", fontFamily: "var(--font-mono)" }}>{item.date}</span>
                  </div>
                  <h3 className="mb-3 text-sm leading-snug" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "#18191B" }}>
                    {item.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: "#737780", fontFamily: "var(--font-mono)" }}>{item.region} · {item.category}</span>
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#3737F2" }} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Programs & Events */}
      {showPrograms && (
        <section className="py-20" style={{ background: "#F5F6F8", borderBottom: "1px solid #E4E6EA" }}>
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="text-xs tracking-widest uppercase mb-4" style={{ color: "#737780", fontFamily: "var(--font-mono)" }}>{t.programsLabel}</div>
            <h2 className="mb-10" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#18191B" }}>
              {t.programsHeading}
            </h2>
            <div className="flex flex-col gap-px">
              {t.programs.map((p) => (
                <a
                  key={p.id}
                  aria-disabled="true" onClick={(e: React.MouseEvent) => e.preventDefault()}
                  className="group flex items-center justify-between p-6 transition-colors"
                  style={{ background: "#FFFFFF", border: "1px solid #E4E6EA" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#333438")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#E4E6EA")}
                >
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="text-sm mb-1" style={{ fontFamily: "var(--font-body)", fontWeight: 500, color: "#18191B" }}>{p.title}</div>
                      <div className="text-xs" style={{ color: "#737780", fontFamily: "var(--font-mono)" }}>
                        {p.date} · {p.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs" style={{ color: "#737780", fontFamily: "var(--font-mono)" }}>{p.type}</span>
                    <span className="text-xs px-2.5 py-1" style={{ color: statusColors[p.status] || "#737780", border: `1px solid ${(statusColors[p.status] || "#737780") + "33"}`, fontFamily: "var(--font-mono)" }}>
                      {p.status}
                    </span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#3737F2" }} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsroom */}
      {showNews && (
        <section className="py-20" style={{ borderBottom: "1px solid #E4E6EA" }}>
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="text-xs tracking-widest uppercase mb-4" style={{ color: "#737780", fontFamily: "var(--font-mono)" }}>{t.newsLabel}</div>
            <h2 className="mb-10" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#18191B" }}>
              {t.newsHeading}
            </h2>
            <div className="flex flex-col gap-px">
              {t.newsItems.map((n) => (
                <a
                  key={n.id}
                  aria-disabled="true" onClick={(e: React.MouseEvent) => e.preventDefault()}
                  className="group flex items-center justify-between py-5 transition-colors"
                  style={{ borderBottom: "1px solid #E4E6EA" }}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xs flex-shrink-0" style={{ color: "#737780", fontFamily: "var(--font-mono)", width: 80 }}>
                      {n.date}
                    </span>
                    <span className="text-sm" style={{ color: "#18191B", fontFamily: "var(--font-body)" }}>{n.title}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs" style={{ color: "#737780", fontFamily: "var(--font-mono)" }}>{n.type}</span>
                    <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "#3737F2" }} />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Downloads */}
      {showDownloads && (
        <section className="py-20">
          <div className="max-w-[1440px] mx-auto px-8">
            <div className="text-xs tracking-widest uppercase mb-4" style={{ color: "#737780", fontFamily: "var(--font-mono)" }}>{t.downloadsLabel}</div>
            <h2 className="mb-10" style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#18191B" }}>
              {t.downloadsHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.downloads.map((d) => (
                <a
                  key={d.label}
                  aria-disabled="true" onClick={(e: React.MouseEvent) => e.preventDefault()}
                  className="group flex items-start justify-between p-7"
                  style={{ background: "#FFFFFF", border: "1px solid #E4E6EA" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#333438")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = "#E4E6EA")}
                >
                  <div className="flex-1">
                    <div className="text-sm mb-2" style={{ fontFamily: "var(--font-display)", fontWeight: 600, color: "#18191B" }}>{d.label}</div>
                    <div className="text-xs mb-4" style={{ color: "#737780", lineHeight: 1.6 }}>{d.desc}</div>
                    <div className="text-xs" style={{ color: "#737780", fontFamily: "var(--font-mono)" }}>
                      {d.format} · {d.size}
                    </div>
                  </div>
                  <Download size={16} className="flex-shrink-0 ml-4 mt-0.5 transition-colors" style={{ color: "#737780" }} />
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
