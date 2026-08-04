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

type DropdownMenuKey = "company" | "services";

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
  image: string;
}

const COPY = {
  ko: {
    home: "홈",
    company: "회사",
    services: "서비스",
    technology: "기술",
    resources: "리소스",
    contact: "문의하기",
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
    exploreService: "서비스 알아보기",
    serviceCta: "프로젝트 문의",
  },
  en: {
    home: "Home",
    company: "Company",
    services: "Services",
    technology: "Technology",
    resources: "Resources",
    contact: "Contact Us",
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
    exploreService: "Explore Service",
    serviceCta: "Start an inquiry",
  },
} as const;

const COMPANY_ITEMS: SimpleMenuItem[] = [
  {
    to: "/company/about",
    label: { ko: "이루티 소개", en: "About ERUTY" },
    description: {
      ko: "글로벌 사업과 AX·기술 역량을 연결하는 이루티의 방향과 실행 구조",
      en: "Explore ERUTY's direction and execution model connecting global business, AX, and technology.",
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
    label: { ko: "프로젝트 포트폴리오", en: "Project Portfolio" },
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
    image: "/images/services/hitpick/hero-video-poster.webp",
    label: { ko: "Hitpick", en: "Hitpick" },
    summary: {
      ko: "글로벌 브랜드 사업화 솔루션",
      en: "Global brand commercialization solution",
    },
    items: [
      { ko: "시장 검증", en: "Market Validation" },
      { ko: "크리에이터 기반 수요 창출", en: "Creator-Led Demand Creation" },
      { ko: "글로벌 판매·수출 운영", en: "Global Sales & Export Operations" },
      { ko: "리오더와 시장 확장", en: "Reorders & Market Expansion" },
    ],
  },
  {
    key: "erumter",
    to: "/services/erumter",
    inquiryType: "automation",
    image: "/images/services/erumter/workflow-office.webp",
    label: { ko: "이룸터", en: "Erumter" },
    summary: {
      ko: "기업 AX·업무 자동화 솔루션",
      en: "Enterprise AX and workflow automation solution",
    },
    items: [
      { ko: "업무 진단", en: "Workflow Diagnosis" },
      { ko: "AX 전환 설계", en: "AX Transformation Design" },
      { ko: "AI 시스템·업무 자동화", en: "AI Systems & Workflow Automation" },
      { ko: "AX 교육·운영 정착", en: "AX Training & Operational Adoption" },
    ],
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
  const pointerMenuRef = useRef<DropdownMenuKey | null>(null);
  const [activeMenu, setActiveMenu] = useState<DropdownMenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] =
    useState<DropdownMenuKey | null>("company");
  const [scrolled, setScrolled] = useState(false);

  const isCompanyActive = location.pathname.startsWith("/company");
  const isServicesActive = location.pathname.startsWith("/services");
  const isTechnologyActive = location.pathname === "/technology";
  const isResourcesActive = location.pathname === "/resources";
  const isHitpickActive = location.pathname.startsWith("/services/hitpick");
  const isErumterActive = location.pathname.startsWith("/services/erumter");

  const dropdownNav = useMemo(
    () => [
      { key: "company" as const, label: copy.company, active: isCompanyActive },
      { key: "services" as const, label: copy.services, active: isServicesActive },
    ],
    [copy.company, copy.services, isCompanyActive, isServicesActive],
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
      const target = event.target as Node;
      const clickedInsideHeader =
        headerRef.current?.contains(target) ?? false;
      const clickedInsideMobilePanel =
        mobilePanelRef.current?.contains(target) ?? false;

      if (!clickedInsideHeader && !clickedInsideMobilePanel) {
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

  function openMenu(key: DropdownMenuKey) {
    cancelCloseTimer();
    setActiveMenu(key);
  }

  function toggleMenu(key: DropdownMenuKey) {
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
          className="eruty-container flex h-[76px] items-center justify-between"
        >
          <Link to="/" className="flex items-center gap-3" aria-label="ERUTY home">
            <img
              src={erutyLogo}
              alt="ERUTY"
              style={{ width: "auto", height: 28 }}
            />
          </Link>

          <nav
            className="hidden items-center gap-2 lg:flex"
            aria-label={copy.menuLabel}
          >
            <HeaderLink to="/" label={copy.home} exact />
            {dropdownNav.map((item) => (
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
                onMouseEnter={() => openMenu(item.key)}
                onMouseLeave={scheduleClose}
                onPointerDown={() => {
                  pointerMenuRef.current = item.key;
                }}
                onPointerCancel={() => {
                  pointerMenuRef.current = null;
                }}
                onFocus={() => {
                  if (pointerMenuRef.current !== item.key) {
                    openMenu(item.key);
                  }
                }}
                onClick={() => {
                  pointerMenuRef.current = null;
                  toggleMenu(item.key);
                }}
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
            <HeaderLink to="/technology" label={copy.technology} />
            <HeaderLink to="/resources" label={copy.resources} />
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
              style={{ background: NEAR_BLACK, color: "#FFFFFF", fontWeight: 500, borderRadius: 6 }}
            >
              {copy.contact}
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
                    <div className="grid gap-4 lg:grid-cols-2">
                      {SERVICE_PANELS.map((panel) => {
                        const isActive =
                          (panel.key === "hitpick" && isHitpickActive) ||
                          (panel.key === "erumter" && isErumterActive);

                        return (
                          <Link
                            key={panel.key}
                            to={panel.to}
                            className="group relative flex h-full overflow-hidden transition-colors"
                            style={{
                              border: `1px solid ${isActive ? BLUE : BORDER}`,
                              background: "#FFFFFF",
                            }}
                            aria-current={isActive ? "page" : undefined}
                          >
                            <img
                              src={panel.image}
                              alt=""
                              aria-hidden="true"
                              loading="lazy"
                              className="absolute inset-0 h-full w-full object-cover opacity-[0.18] transition-transform duration-300 ease-out group-hover:scale-[1.02] group-focus-visible:scale-[1.02] motion-reduce:transform-none motion-reduce:transition-none"
                            />
                            <div
                              className="absolute inset-0"
                              aria-hidden="true"
                              style={{
                                background:
                                  "linear-gradient(90deg, rgba(255,255,255,0.99) 0%, rgba(255,255,255,0.96) 46%, rgba(255,255,255,0.78) 72%, rgba(255,255,255,0.54) 100%)",
                              }}
                            />
                            <div className="relative z-10 flex h-full w-full flex-col gap-5 p-6">
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <div
                                    className="mb-2 text-xs uppercase tracking-[0.24em]"
                                    style={{
                                      color: BLUE,
                                      fontFamily: "var(--font-mono)",
                                    }}
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
                                className="mt-auto inline-flex items-center gap-2 pt-2 text-sm"
                                style={{ color: BLUE, fontWeight: 500 }}
                              >
                                <span>{copy.exploreService}</span>
                                <ArrowRight size={14} />
                              </div>
                            </div>
                          </Link>
                        );
                      })}
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

              {dropdownNav.map((item) => (
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
                                  className="relative overflow-hidden border"
                                  style={{
                                    borderColor: isActive ? BLUE : BORDER,
                                    background: "#FFFFFF",
                                  }}
                                >
                                  <img
                                    src={panel.image}
                                    alt=""
                                    aria-hidden="true"
                                    loading="lazy"
                                    className="absolute inset-0 h-full w-full object-cover opacity-[0.16]"
                                  />
                                  <div
                                    className="absolute inset-0"
                                    aria-hidden="true"
                                    style={{
                                      background:
                                        "linear-gradient(90deg, rgba(255,255,255,0.99) 0%, rgba(255,255,255,0.96) 56%, rgba(255,255,255,0.72) 100%)",
                                    }}
                                  />
                                  <div className="relative z-10 p-4">
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
                                </div>
                              );
                            })}
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              ))}

              <MobileDirectLink
                to="/technology"
                label={copy.technology}
                active={isTechnologyActive}
                onNavigate={() => setMobileOpen(false)}
              />
              <MobileDirectLink
                to="/resources"
                label={copy.resources}
                active={isResourcesActive}
                onNavigate={() => setMobileOpen(false)}
              />

              <Link
                to="/start-a-project"
                className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm"
                style={{ background: NEAR_BLACK, color: "#FFFFFF", fontWeight: 500, borderRadius: 6 }}
                onClick={() => setMobileOpen(false)}
              >
                {copy.contact}
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

function MobileDirectLink({
  to,
  label,
  active,
  onNavigate,
}: {
  to: string;
  label: string;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <NavLink
      to={to}
      className="flex w-full items-center justify-between border-b py-4"
      style={{
        borderColor: BORDER,
        color: active ? BLUE : NEAR_BLACK,
        fontWeight: active ? 700 : 600,
      }}
      aria-current={active ? "page" : undefined}
      onClick={onNavigate}
    >
      <span>{label}</span>
      <ArrowRight aria-hidden="true" size={16} />
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
