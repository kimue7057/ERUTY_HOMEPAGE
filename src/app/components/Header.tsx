import { useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  buildStartProjectHref,
  type InquiryService,
} from "../data/inquiryOptions";
import { type Lang, useLanguage } from "../context/LanguageContext";
import erutyLogo from "../../assets/brand/eruty-logo.png";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BORDER = "#E4E6EA";
const MUTED = "#737780";
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type MenuKey = "company" | "services" | "technology" | "resources";

interface SimpleMenuItem {
  to: string;
  label: Record<Lang, string>;
  description: Record<Lang, string>;
}

interface ServicePanel {
  key: InquiryService;
  to: string;
  label: Record<Lang, string>;
  summary: Record<Lang, string>;
  items: Array<Record<Lang, string>>;
  inquiryType: "global-expansion" | "automation";
}

const COPY = {
  ko: {
    home: "홈",
    company: "회사",
    services: "서비스",
    technology: "기술",
    resources: "리소스",
    startProject: "프로젝트 시작",
    menuOpen: "메뉴 열기",
    menuClose: "메뉴 닫기",
    currentPage: "현재 페이지",
    language: {
      ko: "KR",
      en: "EN",
    },
    menuLabel: "주요 내비게이션",
    companyCaption: "회사 소개",
    servicesCaption: "서비스",
    technologyCaption: "기술 역량",
    resourcesCaption: "리소스 허브",
    viewPage: "페이지 보기",
    serviceCta: "프로젝트 문의",
    technologyLead:
      "이루티는 글로벌 사업과 AX 전환에 필요한 데이터, 자동화, 제품 엔지니어링 역량을 통합해 제공합니다.",
    resourcesLead:
      "사례 연구, 프로젝트 기회, 인사이트 리포트와 프로그램 소식을 한 곳에서 확인할 수 있습니다.",
  },
  en: {
    home: "Home",
    company: "Company",
    services: "Services",
    technology: "Technology",
    resources: "Resources",
    startProject: "Start a Project",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    currentPage: "Current page",
    language: {
      ko: "KR",
      en: "EN",
    },
    menuLabel: "Main navigation",
    companyCaption: "Company Overview",
    servicesCaption: "Services",
    technologyCaption: "Technology Capability",
    resourcesCaption: "Resource Hub",
    viewPage: "View page",
    serviceCta: "Start an inquiry",
    technologyLead:
      "ERUTY combines data, automation, and product engineering to execute global business and AX transformation.",
    resourcesLead:
      "Explore case studies, open projects, insights, reports, and program updates in one place.",
  },
} as const;

const COMPANY_ITEMS: SimpleMenuItem[] = [
  {
    to: "/company/about",
    label: { ko: "이루티 소개", en: "About ERUTY" },
    description: {
      ko: "콘텐츠와 기술, 글로벌 네트워크를 연결하는 기업 소개",
      en: "Meet the company connecting content, technology, and global networks.",
    },
  },
  {
    to: "/company/team",
    label: { ko: "팀 및 리더십", en: "Team & Leadership" },
    description: {
      ko: "글로벌 사업과 기술을 만드는 사람들",
      en: "Meet the people building global business and technology.",
    },
  },
  {
    to: "/company/growth",
    label: { ko: "프로젝트", en: "Projects" },
    description: {
      ko: "이루티가 수행한 글로벌 사업·AX·AI·기술 프로젝트",
      en: "Selected global business, AX, AI, and technology projects delivered by ERUTY.",
    },
  },
  {
    to: "/company/careers",
    label: { ko: "채용", en: "Careers" },
    description: {
      ko: "이루티와 함께할 인재를 찾습니다",
      en: "See open positions and general applications.",
    },
  },
];

const SERVICE_PANELS: ServicePanel[] = [
  {
    key: "hitpick",
    to: "/services/hitpick",
    inquiryType: "global-expansion",
    label: { ko: "Hitpick", en: "Hitpick" },
    summary: {
      ko: "글로벌 사업 확장 솔루션",
      en: "Global business expansion solution",
    },
    items: [
      { ko: "글로벌 확장", en: "Global Expansion" },
      { ko: "콘텐츠·IP", en: "Content & IP" },
      { ko: "크리에이터 마케팅", en: "Creator Marketing" },
      { ko: "글로벌 파트너", en: "Global Partner" },
    ],
  },
  {
    key: "erumter",
    to: "/services/erumter",
    inquiryType: "automation",
    label: { ko: "이룸터", en: "Erumter" },
    summary: {
      ko: "기업 AX·자동화 솔루션",
      en: "Enterprise AX and automation solution",
    },
    items: [
      { ko: "업무 자동화", en: "Workflow Automation" },
      { ko: "AI 개발", en: "AI Development" },
      { ko: "AX 교육", en: "AX Education" },
      { ko: "AX 진단", en: "AX Diagnosis" },
    ],
  },
];

const TECHNOLOGY_ITEMS = [
  {
    label: { ko: "AI & 데이터", en: "AI & Data" },
    description: {
      ko: "콘텐츠, 시장, 오디언스 신호를 분석하는 인텔리전스 레이어",
      en: "Intelligence systems for content, market, and audience signals.",
    },
  },
  {
    label: { ko: "자동화 시스템", en: "Automation Systems" },
    description: {
      ko: "반복 업무와 운영 흐름을 AI 에이전트로 전환",
      en: "Transform repetitive operations with AI agents and workflows.",
    },
  },
  {
    label: { ko: "블록체인 & 권리", en: "Blockchain & Rights" },
    description: {
      ko: "IP, 계약, 정산을 위한 권리 인프라",
      en: "Rights infrastructure for IP, contracts, and settlements.",
    },
  },
  {
    label: { ko: "제품 엔지니어링", en: "Product Engineering" },
    description: {
      ko: "웹·앱·SaaS와 운영 시스템 구현",
      en: "Build production-ready web, app, SaaS, and admin systems.",
    },
  },
];

const RESOURCE_ITEMS = [
  {
    label: { ko: "사례 연구", en: "Case Studies" },
    description: {
      ko: "시장별 실행 사례와 역할 구조",
      en: "Execution cases and delivery roles across markets.",
    },
  },
  {
    label: { ko: "프로젝트 & 기회", en: "Projects & Opportunities" },
    description: {
      ko: "진행 중인 파트너십과 오픈 딜 정보",
      en: "Open deals, partnerships, and in-progress opportunities.",
    },
  },
  {
    label: { ko: "인사이트 & 리포트", en: "Insights & Reports" },
    description: {
      ko: "시장 분석과 비즈니스 인텔리전스",
      en: "Market analysis and business intelligence reports.",
    },
  },
  {
    label: { ko: "프로그램 & 이벤트", en: "Programs & Events" },
    description: {
      ko: "교육, 세미나, 포럼, 전시 프로그램",
      en: "Programs, seminars, forums, and exhibitions.",
    },
  },
];

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [] as HTMLElement[];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
}

export function Header() {
  const { lang, setLang } = useLanguage();
  const copy = COPY[lang];
  const location = useLocation();
  const headerRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>("company");
  const [scrolled, setScrolled] = useState(false);

  const isCompanyActive = location.pathname.startsWith("/company");
  const isServicesActive = location.pathname.startsWith("/services");
  const isTechnologyActive = location.pathname === "/technology";
  const isResourcesActive = location.pathname === "/resources";
  const isHitpickActive = location.pathname.startsWith("/services/hitpick");
  const isErumterActive = location.pathname.startsWith("/services/erumter");

  const topNav = useMemo(
    () => [
      { key: "company" as const, label: copy.company, active: isCompanyActive },
      { key: "services" as const, label: copy.services, active: isServicesActive },
      {
        key: "technology" as const,
        label: copy.technology,
        active: isTechnologyActive,
      },
      {
        key: "resources" as const,
        label: copy.resources,
        active: isResourcesActive,
      },
    ],
    [
      copy.company,
      copy.resources,
      copy.services,
      copy.technology,
      isCompanyActive,
      isResourcesActive,
      isServicesActive,
      isTechnologyActive,
    ],
  );

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node) &&
        mobilePanelRef.current &&
        !mobilePanelRef.current.contains(event.target as Node)
      ) {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveMenu(null);
        setMobileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    if (!activeMenu) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      getFocusableElements(panelRef.current)[0]?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [activeMenu]);

  useEffect(() => {
    if (!mobileOpen) {
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      getFocusableElements(mobilePanelRef.current)[0]?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [mobileOpen, mobileSection]);

  useEffect(() => {
    if (!mobileOpen) {
      return undefined;
    }

    const handleTrap = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusableElements(mobilePanelRef.current);
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTrap);
    return () => document.removeEventListener("keydown", handleTrap);
  }, [mobileOpen]);

  function cancelCloseTimer() {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }

  function scheduleClose() {
    cancelCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setActiveMenu(null), 130);
  }

  function openMenu(key: MenuKey) {
    cancelCloseTimer();
    setActiveMenu(key);
  }

  function toggleMenu(key: MenuKey) {
    setActiveMenu((current) => (current === key ? null : key));
  }

  return (
    <>
      <header
        ref={headerRef}
        className="fixed left-0 right-0 top-0 z-50 bg-white"
        style={{
          boxShadow: scrolled ? "0 1px 0 rgba(24,25,27,0.08)" : "0 1px 0 transparent",
        }}
      >
        <div
          className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-5 lg:px-8"
        >
          <Link to="/" className="flex items-center gap-3" aria-label="ERUTY home">
            <img
              src={erutyLogo}
              alt="ERUTY"
              style={{ width: "auto", height: 28 }}
            />
          </Link>

          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label={copy.menuLabel}
          >
            <HeaderLink to="/" label={copy.home} exact />
            {topNav.map((item) => (
              <button
                key={item.key}
                type="button"
                className="flex items-center gap-1 px-4 py-2 text-sm"
                style={{
                  color:
                    activeMenu === item.key || item.active ? BLUE : "#333438",
                  fontWeight: item.active ? 600 : 500,
                  background: "transparent",
                }}
                aria-expanded={activeMenu === item.key}
                aria-controls={`${item.key}-menu`}
                aria-haspopup="dialog"
                onMouseEnter={() => openMenu(item.key)}
                onMouseLeave={scheduleClose}
                onFocus={() => openMenu(item.key)}
                onClick={() => toggleMenu(item.key)}
              >
                {item.label}
                <ChevronDown
                  size={14}
                  style={{
                    transform:
                      activeMenu === item.key ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.18s ease",
                  }}
                />
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <div
              className="flex items-center gap-2 text-xs"
              style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
            >
              <button
                type="button"
                onClick={() => setLang("ko")}
                style={{
                  background: "transparent",
                  color: lang === "ko" ? NEAR_BLACK : MUTED,
                  fontWeight: lang === "ko" ? 700 : 500,
                }}
              >
                {copy.language.ko}
              </button>
              <span style={{ color: "#C7CAD1" }}>/</span>
              <button
                type="button"
                onClick={() => setLang("en")}
                style={{
                  background: "transparent",
                  color: lang === "en" ? NEAR_BLACK : MUTED,
                  fontWeight: lang === "en" ? 700 : 500,
                }}
              >
                {copy.language.en}
              </button>
            </div>
            <Link
              to="/start-a-project"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm"
              style={{ background: NEAR_BLACK, color: "#FFFFFF", fontWeight: 500 }}
            >
              {copy.startProject}
              <ArrowUpRight size={14} />
            </Link>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={mobileOpen ? copy.menuClose : copy.menuOpen}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {activeMenu ? (
            <motion.div
              key={activeMenu}
              ref={panelRef}
              id={`${activeMenu}-menu`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.16 }}
              className="hidden border-t lg:block"
              style={{ borderColor: BORDER, background: "#FFFFFF" }}
              onMouseEnter={cancelCloseTimer}
              onMouseLeave={scheduleClose}
            >
              <div className="mx-auto max-w-[1280px] px-8 py-8">
                {activeMenu === "company" && (
                  <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
                    <HeaderMenuIntro
                      caption={copy.companyCaption}
                      lead={
                        lang === "ko"
                          ? "사업의 방향과 실행 구조, 이루티의 팀을 한 번에 살펴볼 수 있습니다."
                          : "Learn how ERUTY is structured across business, execution, and people."
                      }
                    />
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                      {COMPANY_ITEMS.map((item) => (
                        <MenuItemLink
                          key={item.to}
                          to={item.to}
                          label={item.label[lang]}
                          description={item.description[lang]}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {activeMenu === "services" && (
                  <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
                    <HeaderMenuIntro
                      caption={copy.servicesCaption}
                      lead={
                        lang === "ko"
                          ? "글로벌 사업 확장과 AX 전환을 위한 두 서비스 라인을 확인하세요."
                          : "Explore ERUTY's two service lines for global business and AX transformation."
                      }
                    />
                    <div className="grid gap-4 xl:grid-cols-2">
                      {SERVICE_PANELS.map((panel) => {
                        const isActive =
                          (panel.key === "hitpick" && isHitpickActive) ||
                          (panel.key === "erumter" && isErumterActive);

                        return (
                          <Link
                            key={panel.key}
                            to={panel.to}
                            className="flex h-full flex-col gap-5 p-6 transition-colors"
                            style={{
                              border: `1px solid ${isActive ? BLUE : BORDER}`,
                              background: isActive
                                ? "rgba(55,55,242,0.04)"
                                : "#FFFFFF",
                            }}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <div
                                  className="mb-2 text-xs uppercase tracking-[0.24em]"
                                  style={{ color: BLUE, fontFamily: "var(--font-mono)" }}
                                >
                                  {panel.label[lang]}
                                </div>
                                <h3
                                  className="mb-2 text-xl"
                                  style={{
                                    fontFamily: "var(--font-display)",
                                    fontWeight: 700,
                                    color: NEAR_BLACK,
                                  }}
                                >
                                  {panel.summary[lang]}
                                </h3>
                              </div>
                              <ArrowUpRight size={16} style={{ color: BLUE }} />
                            </div>
                            <div className="grid gap-2">
                              {panel.items.map((item) => (
                                <div
                                  key={item[lang]}
                                  className="flex items-start gap-2 text-sm"
                                  style={{ color: "#333438", lineHeight: 1.65 }}
                                >
                                  <span
                                    className="mt-[7px] h-1.5 w-1.5 rounded-full"
                                    style={{ background: BLUE }}
                                  />
                                  <span>{item[lang]}</span>
                                </div>
                              ))}
                            </div>
                            <div
                              className="mt-auto flex items-center justify-between pt-2 text-sm"
                              style={{ color: BLUE, fontWeight: 500 }}
                            >
                              <span>{copy.viewPage}</span>
                              <span>{copy.serviceCta}</span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {activeMenu === "technology" && (
                  <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
                    <HeaderMenuIntro
                      caption={copy.technologyCaption}
                      lead={copy.technologyLead}
                    />
                    <div className="grid gap-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        {TECHNOLOGY_ITEMS.map((item) => (
                          <div
                            key={item.label[lang]}
                            className="border p-5"
                            style={{ borderColor: BORDER, background: "#FFFFFF" }}
                          >
                            <div
                              className="mb-2 text-sm"
                              style={{ color: NEAR_BLACK, fontWeight: 600 }}
                            >
                              {item.label[lang]}
                            </div>
                            <p
                              className="text-sm"
                              style={{ color: MUTED, lineHeight: 1.7 }}
                            >
                              {item.description[lang]}
                            </p>
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/technology"
                        className="inline-flex w-fit items-center gap-2 text-sm"
                        style={{ color: BLUE, fontWeight: 500 }}
                      >
                        {copy.viewPage}
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )}

                {activeMenu === "resources" && (
                  <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
                    <HeaderMenuIntro
                      caption={copy.resourcesCaption}
                      lead={copy.resourcesLead}
                    />
                    <div className="grid gap-4">
                      <div className="grid gap-3 md:grid-cols-2">
                        {RESOURCE_ITEMS.map((item) => (
                          <div
                            key={item.label[lang]}
                            className="border p-5"
                            style={{ borderColor: BORDER, background: "#FFFFFF" }}
                          >
                            <div
                              className="mb-2 text-sm"
                              style={{ color: NEAR_BLACK, fontWeight: 600 }}
                            >
                              {item.label[lang]}
                            </div>
                            <p
                              className="text-sm"
                              style={{ color: MUTED, lineHeight: 1.7 }}
                            >
                              {item.description[lang]}
                            </p>
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/resources"
                        className="inline-flex w-fit items-center gap-2 text-sm"
                        style={{ color: BLUE, fontWeight: 500 }}
                      >
                        {copy.viewPage}
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.16 }}
            className="fixed inset-x-0 top-[76px] z-40 lg:hidden"
            style={{ bottom: 0, background: "rgba(255,255,255,0.98)" }}
          >
            <div
              ref={mobilePanelRef}
              className="mx-auto flex h-full max-w-[1280px] flex-col overflow-y-auto px-5 pb-8 pt-6"
            >
              <div className="mb-6 flex items-center justify-between">
                <div
                  className="text-xs uppercase tracking-[0.24em]"
                  style={{ color: MUTED, fontFamily: "var(--font-mono)" }}
                >
                  {copy.menuLabel}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setLang("ko")}
                    style={{
                      background: "transparent",
                      color: lang === "ko" ? NEAR_BLACK : MUTED,
                      fontWeight: lang === "ko" ? 700 : 500,
                    }}
                  >
                    {copy.language.ko}
                  </button>
                  <span style={{ color: "#C7CAD1" }}>/</span>
                  <button
                    type="button"
                    onClick={() => setLang("en")}
                    style={{
                      background: "transparent",
                      color: lang === "en" ? NEAR_BLACK : MUTED,
                      fontWeight: lang === "en" ? 700 : 500,
                    }}
                  >
                    {copy.language.en}
                  </button>
                </div>
              </div>

              <div className="mb-2">
                <HeaderLink
                  to="/"
                  label={copy.home}
                  exact
                  compact
                  onNavigate={() => setMobileOpen(false)}
                />
              </div>

              {topNav.map((item) => (
                <div
                  key={item.key}
                  className="border-b"
                  style={{ borderColor: BORDER }}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between py-4 text-left"
                    onClick={() =>
                      setMobileSection((current) =>
                        current === item.key ? null : item.key,
                      )
                    }
                    aria-expanded={mobileSection === item.key}
                    aria-controls={`mobile-${item.key}`}
                  >
                    <span
                      style={{
                        color: item.active ? BLUE : NEAR_BLACK,
                        fontWeight: item.active ? 700 : 600,
                      }}
                    >
                      {item.label}
                    </span>
                    <ChevronDown
                      size={16}
                      style={{
                        transform:
                          mobileSection === item.key
                            ? "rotate(180deg)"
                            : "rotate(0deg)",
                        transition: "transform 0.18s ease",
                      }}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileSection === item.key ? (
                      <motion.div
                        id={`mobile-${item.key}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col gap-3 pb-5">
                          {item.key === "company" &&
                            COMPANY_ITEMS.map((entry) => (
                              <MobileMenuLink
                                key={entry.to}
                                to={entry.to}
                                label={entry.label[lang]}
                                description={entry.description[lang]}
                                active={location.pathname === entry.to}
                                onNavigate={() => setMobileOpen(false)}
                              />
                            ))}

                          {item.key === "services" &&
                            SERVICE_PANELS.map((panel) => {
                              const isActive =
                                (panel.key === "hitpick" && isHitpickActive) ||
                                (panel.key === "erumter" && isErumterActive);

                              return (
                                <div
                                  key={panel.key}
                                  className="border p-4"
                                  style={{
                                    borderColor: isActive ? BLUE : BORDER,
                                    background: isActive
                                      ? "rgba(55,55,242,0.04)"
                                      : "#FFFFFF",
                                  }}
                                >
                                  <div className="mb-4">
                                    <Link
                                      to={panel.to}
                                      className="inline-flex items-center gap-2 text-sm"
                                      style={{
                                        color: isActive ? BLUE : NEAR_BLACK,
                                        fontWeight: 700,
                                      }}
                                      aria-current={isActive ? "page" : undefined}
                                      onClick={() => setMobileOpen(false)}
                                    >
                                      {panel.label[lang]}
                                      <ArrowUpRight size={14} />
                                    </Link>
                                    <p
                                      className="mt-2 text-sm"
                                      style={{ color: MUTED, lineHeight: 1.65 }}
                                    >
                                      {panel.summary[lang]}
                                    </p>
                                  </div>
                                  <div className="mb-4 grid gap-2">
                                    {panel.items.map((service) => (
                                      <div
                                        key={service[lang]}
                                        className="flex items-start gap-2 text-sm"
                                        style={{ color: "#333438" }}
                                      >
                                        <span
                                          className="mt-[7px] h-1.5 w-1.5 rounded-full"
                                          style={{ background: BLUE }}
                                        />
                                        <span>{service[lang]}</span>
                                      </div>
                                    ))}
                                  </div>
                                  <Link
                                    to={buildStartProjectHref(
                                      panel.key,
                                      panel.inquiryType,
                                    )}
                                    className="inline-flex items-center gap-2 text-sm"
                                    style={{ color: BLUE, fontWeight: 500 }}
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {copy.serviceCta}
                                    <ArrowRight size={14} />
                                  </Link>
                                </div>
                              );
                            })}

                          {item.key === "technology" && (
                            <>
                              {TECHNOLOGY_ITEMS.map((entry) => (
                                <div key={entry.label[lang]} className="border p-4" style={{ borderColor: BORDER }}>
                                  <div
                                    className="mb-2 text-sm"
                                    style={{ color: NEAR_BLACK, fontWeight: 600 }}
                                  >
                                    {entry.label[lang]}
                                  </div>
                                  <p
                                    className="text-sm"
                                    style={{ color: MUTED, lineHeight: 1.65 }}
                                  >
                                    {entry.description[lang]}
                                  </p>
                                </div>
                              ))}
                              <Link
                                to="/technology"
                                className="inline-flex items-center gap-2 text-sm"
                                style={{ color: BLUE, fontWeight: 500 }}
                                onClick={() => setMobileOpen(false)}
                              >
                                {copy.viewPage}
                                <ArrowRight size={14} />
                              </Link>
                            </>
                          )}

                          {item.key === "resources" && (
                            <>
                              {RESOURCE_ITEMS.map((entry) => (
                                <div key={entry.label[lang]} className="border p-4" style={{ borderColor: BORDER }}>
                                  <div
                                    className="mb-2 text-sm"
                                    style={{ color: NEAR_BLACK, fontWeight: 600 }}
                                  >
                                    {entry.label[lang]}
                                  </div>
                                  <p
                                    className="text-sm"
                                    style={{ color: MUTED, lineHeight: 1.65 }}
                                  >
                                    {entry.description[lang]}
                                  </p>
                                </div>
                              ))}
                              <Link
                                to="/resources"
                                className="inline-flex items-center gap-2 text-sm"
                                style={{ color: BLUE, fontWeight: 500 }}
                                onClick={() => setMobileOpen(false)}
                              >
                                {copy.viewPage}
                                <ArrowRight size={14} />
                              </Link>
                            </>
                          )}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ))}

              <Link
                to="/start-a-project"
                className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm"
                style={{ background: NEAR_BLACK, color: "#FFFFFF", fontWeight: 500 }}
                onClick={() => setMobileOpen(false)}
              >
                {copy.startProject}
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function HeaderLink({
  to,
  label,
  exact = false,
  compact = false,
  onNavigate,
}: {
  to: string;
  label: string;
  exact?: boolean;
  compact?: boolean;
  onNavigate?: () => void;
}) {
  return (
    <NavLink to={to} end={exact} onClick={onNavigate}>
      {({ isActive }) => (
        <span
          className={compact ? "inline-flex py-2 text-sm" : "inline-flex px-4 py-2 text-sm"}
          style={{
            color: isActive ? BLUE : "#333438",
            fontWeight: isActive ? 700 : 500,
          }}
          aria-current={isActive ? "page" : undefined}
        >
          {label}
        </span>
      )}
    </NavLink>
  );
}

function HeaderMenuIntro({
  caption,
  lead,
}: {
  caption: string;
  lead: string;
}) {
  return (
    <div>
      <div
        className="mb-4 text-xs uppercase tracking-[0.24em]"
        style={{ color: BLUE, fontFamily: "var(--font-mono)" }}
      >
        {caption}
      </div>
      <p className="text-sm" style={{ color: MUTED, lineHeight: 1.75 }}>
        {lead}
      </p>
    </div>
  );
}

function MenuItemLink({
  to,
  label,
  description,
}: {
  to: string;
  label: string;
  description: string;
}) {
  return (
    <Link
      to={to}
      className="border p-5 transition-colors"
      style={{ borderColor: BORDER, background: "#FFFFFF" }}
    >
      <div
        className="mb-2 text-sm"
        style={{ color: NEAR_BLACK, fontWeight: 600 }}
      >
        {label}
      </div>
      <p className="text-sm" style={{ color: MUTED, lineHeight: 1.7 }}>
        {description}
      </p>
    </Link>
  );
}

function MobileMenuLink({
  to,
  label,
  description,
  active,
  onNavigate,
}: {
  to: string;
  label: string;
  description: string;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={to}
      className="border p-4"
      style={{
        borderColor: active ? BLUE : BORDER,
        background: active ? "rgba(55,55,242,0.04)" : "#FFFFFF",
      }}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      <div
        className="mb-2 text-sm"
        style={{ color: active ? BLUE : NEAR_BLACK, fontWeight: 600 }}
      >
        {label}
      </div>
      <p className="text-sm" style={{ color: MUTED, lineHeight: 1.65 }}>
        {description}
      </p>
    </Link>
  );
}
