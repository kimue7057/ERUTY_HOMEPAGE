import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type Lang, useLanguage } from "../../context/LanguageContext";
import { PageContainer } from "../../components/PageContainer";
import { PageHeading } from "../../components/PageHeading";
import {
  CATEGORY_LABELS,
  PROJECTS,
  type LocalizedText,
  type Project,
  type ProjectCategory,
} from "../../data/projects";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BODY_TEXT = "#333842";
const MUTED = "#6E7481";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F5F7FB";
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

type ProjectFilter = "all" | ProjectCategory;

const PAGE_COPY = {
  ko: {
    heroEyebrow: "PROJECTS",
    heroHeadline: "실행으로 만든 프로젝트",
    heroDescription:
      "글로벌 사업 확장부터 AX·AI 시스템 구축까지, 이루티가 직접 수행한 프로젝트를 소개합니다.",
    featuredEyebrow: "FEATURED PROJECT",
    featuredButton: "프로젝트 보기",
    filterAll: "전체",
    filterLabel: "PROJECT CATEGORY",
    gridEmpty: "선택한 카테고리에 해당하는 공개 프로젝트를 준비 중입니다.",
    viewDetails: "상세 보기",
    closeDrawer: "프로젝트 상세 닫기",
    marketLabel: "시장 또는 대상",
    overviewLabel: "프로젝트 개요",
    roleLabel: "이루티의 역할",
    scopeLabel: "주요 수행 범위",
    outcomeLabel: "공개 가능한 결과",
    statusLabel: "상태",
    relatedVisualLabel: "관련 비주얼",
    ctaEyebrow: "START A PROJECT",
    ctaHeadline: "다음 프로젝트를 함께 준비해보세요",
    ctaDescription:
      "새로운 아이디어를 실제 사업과 시스템으로 만들 실행 파트너가 필요하신가요?",
    ctaButton: "프로젝트 문의하기",
  },
  en: {
    heroEyebrow: "PROJECTS",
    heroHeadline: "Projects Built Through Execution",
    heroDescription:
      "Explore global business, AX, AI, and technology projects delivered by ERUTY.",
    featuredEyebrow: "FEATURED PROJECT",
    featuredButton: "View Project",
    filterAll: "All",
    filterLabel: "PROJECT CATEGORY",
    gridEmpty: "Public projects for this category are being prepared.",
    viewDetails: "View Details",
    closeDrawer: "Close project details",
    marketLabel: "Market or Audience",
    overviewLabel: "Project Overview",
    roleLabel: "ERUTY Role",
    scopeLabel: "Scope",
    outcomeLabel: "Public Outcome",
    statusLabel: "Status",
    relatedVisualLabel: "Related Visual",
    ctaEyebrow: "START A PROJECT",
    ctaHeadline: "Let's Build the Next Project Together",
    ctaDescription:
      "Looking for an execution partner to turn a new idea into a real business or system?",
    ctaButton: "Start a Project",
  },
} as const;

const FILTERS: ProjectFilter[] = [
  "all",
  "global-business",
  "products-services",
  "rnd",
  "ict-app",
  "erumter-education",
];

const PUBLISHED_PROJECTS = PROJECTS.filter(
  (project) => project.visibility === "published",
);
const FEATURED_PROJECT =
  PUBLISHED_PROJECTS.find((project) => project.featured) ?? PUBLISHED_PROJECTS[0];
const GRID_PROJECTS = PUBLISHED_PROJECTS.filter(
  (project) => project.id !== FEATURED_PROJECT.id,
);

function getLocalizedText(text: LocalizedText, lang: Lang) {
  return text[lang];
}

function getFocusableElements(container: HTMLElement | null) {
  if (!container) {
    return [] as HTMLElement[];
  }

  return Array.from(
    container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
  );
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function getRevealProps(prefersReducedMotion: boolean) {
  if (prefersReducedMotion) {
    return {};
  }

  return {
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };
}

function Eyebrow({ children }: { children: string }) {
  return (
    <div
      className="eruty-eyebrow-en mb-4"
      style={{ color: BLUE }}
    >
      {children}
    </div>
  );
}

function ConceptPill({ lang }: { lang: Lang }) {
  return (
    <div
      className={`pointer-events-none absolute right-4 top-4 z-10 rounded-full border px-3 py-1.5 eruty-meta ${
        lang === "en" ? "eruty-meta--code uppercase tracking-[0.12em]" : ""
      }`}
      style={{
        background: "rgba(7,17,30,0.72)",
        borderColor: "rgba(255,255,255,0.22)",
        color: "#FFFFFF",
        backdropFilter: "blur(10px)",
      }}
    >
      {lang === "ko" ? "콘셉트 이미지" : "CONCEPT IMAGE"}
    </div>
  );
}

function CategoryTag({
  category,
  lang,
  dark = false,
}: {
  category: ProjectCategory;
  lang: Lang;
  dark?: boolean;
}) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-[7px] text-[0.76rem] font-medium"
      style={{
        background: dark ? "rgba(255,255,255,0.12)" : "rgba(55,55,242,0.08)",
        color: dark ? "#FFFFFF" : NEAR_BLACK,
      }}
    >
      {getLocalizedText(CATEGORY_LABELS[category], lang)}
    </span>
  );
}

function HeroPattern() {
  return (
    <div className="pointer-events-none absolute right-[-9%] top-[-2rem] hidden h-[24rem] w-[60%] lg:block">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(55,55,242,0.16) 1px, transparent 1.2px)",
          backgroundSize: "14px 14px",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.95) 24%, rgba(0,0,0,0.86) 76%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.95) 24%, rgba(0,0,0,0.86) 76%, transparent 100%)",
        }}
      />
      <svg
        viewBox="0 0 760 360"
        className="absolute inset-0 h-full w-full"
        fill="none"
        aria-hidden="true"
      >
        {[0, 24, 48, 72, 96, 120].map((offset) => (
          <path
            key={offset}
            d={`M8 ${78 + offset} C 128 ${12 + offset} 248 ${12 + offset} 370 ${
              78 + offset
            } S 622 ${144 + offset} 752 ${78 + offset}`}
            stroke="rgba(55,55,242,0.18)"
            strokeWidth="1.35"
          />
        ))}
      </svg>
    </div>
  );
}

function HeroSection({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const { lang } = useLanguage();
  const copy = PAGE_COPY[lang];

  return (
    <motion.section
      data-growth-hero
      className="relative overflow-hidden border-b bg-white"
      style={{ borderColor: BORDER }}
      {...getRevealProps(prefersReducedMotion)}
    >
      <PageContainer>
        <div className="relative eruty-hero-section">
          <div className="relative z-10">
            <PageHeading
              eyebrow={copy.heroEyebrow}
              title={copy.heroHeadline}
              description={copy.heroDescription}
              align="center"
              lang={lang}
            />
          </div>
          <HeroPattern />
        </div>
      </PageContainer>
    </motion.section>
  );
}

function ProjectVisual({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const { lang } = useLanguage();

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1rem] bg-[#EDF2FA]">
      <img
        src={project.image}
        alt={getLocalizedText(project.imageAlt, lang)}
        className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.015]"
        width={1600}
        height={1000}
        loading="eager"
        fetchPriority={featured ? "high" : "auto"}
        draggable={false}
      />
      {project.visualIsConcept ? <ConceptPill lang={lang} /> : null}
    </div>
  );
}

function FeaturedProjectSection({
  project,
  onOpen,
  prefersReducedMotion,
}: {
  project: Project;
  onOpen: (project: Project, trigger: HTMLElement | null) => void;
  prefersReducedMotion: boolean;
}) {
  const { lang } = useLanguage();
  const copy = PAGE_COPY[lang];

  return (
    <motion.section
      data-growth-featured
      className="eruty-section-compact border-b bg-white"
      style={{ borderColor: BORDER }}
      {...getRevealProps(prefersReducedMotion)}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div className="mb-6">
          <Eyebrow>{copy.featuredEyebrow}</Eyebrow>
        </div>

        <div
          className="grid min-h-[420px] overflow-hidden rounded-[1rem] border lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)]"
          style={{
            borderColor: "rgba(9,17,31,0.08)",
            background:
              "linear-gradient(135deg, #081323 0%, #07111E 48%, #0C1626 100%)",
            boxShadow: "0 22px 60px rgba(12, 24, 43, 0.12)",
          }}
        >
          <div className="flex flex-col justify-between p-7 md:p-9 lg:p-10">
            <div>
              <div className="flex flex-wrap gap-2">
                {project.categories.map((category) => (
                  <CategoryTag
                    key={category}
                    category={category}
                    lang={lang}
                    dark
                  />
                ))}
              </div>

              <h2
                className={`eruty-section-title mt-7 max-w-[24rem] text-white ${
                  lang === "ko" ? "eruty-keep-all" : ""
                }`}
              >
                {getLocalizedText(project.title, lang)}
              </h2>

              <p
                className={`eruty-body mt-5 max-w-[25rem] ${
                  lang === "ko" ? "eruty-keep-all" : ""
                }`}
                style={{
                  color: "rgba(255,255,255,0.76)",
                }}
              >
                {getLocalizedText(project.summary, lang)}
              </p>

              <div
                className="eruty-meta mt-5"
                style={{ color: "rgba(255,255,255,0.6)" }}
              >
                {getLocalizedText(project.status, lang)}
              </div>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={(event) => onOpen(project, event.currentTarget)}
                className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#081323]"
                style={{
                  borderColor: "rgba(255,255,255,0.18)",
                  color: "#FFFFFF",
                }}
              >
                {copy.featuredButton}
                <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div className="min-h-[280px] border-t p-4 md:p-5 lg:min-h-full lg:border-l lg:border-t-0 lg:p-6">
            <div
              className="h-full rounded-[1rem]"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <ProjectVisual project={project} featured />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function FilterSection({
  activeFilter,
  onChange,
  prefersReducedMotion,
}: {
  activeFilter: ProjectFilter;
  onChange: (filter: ProjectFilter) => void;
  prefersReducedMotion: boolean;
}) {
  const { lang } = useLanguage();
  const copy = PAGE_COPY[lang];

  return (
    <motion.section
      className="bg-white py-8"
      {...getRevealProps(prefersReducedMotion)}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div
          className={`eruty-meta mb-4 ${lang === "en" ? "eruty-meta--code" : ""}`}
          style={{ color: MUTED }}
        >
          {copy.filterLabel}
        </div>
        <div className="flex flex-wrap gap-2 md:gap-3">
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            const label =
              filter === "all"
                ? copy.filterAll
                : getLocalizedText(CATEGORY_LABELS[filter], lang);

            return (
              <button
                key={filter}
                type="button"
                onClick={() => onChange(filter)}
                aria-pressed={isActive}
                className="rounded-full px-4 py-[11px] text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3737F2] focus-visible:ring-offset-2"
                style={{
                  background: isActive ? BLUE : "#FFFFFF",
                  color: isActive ? "#FFFFFF" : NEAR_BLACK,
                  border: `1px solid ${isActive ? BLUE : BORDER}`,
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}

function ProjectCard({
  project,
  onOpen,
  prefersReducedMotion,
}: {
  project: Project;
  onOpen: (project: Project, trigger: HTMLElement | null) => void;
  prefersReducedMotion: boolean;
}) {
  const { lang } = useLanguage();
  const copy = PAGE_COPY[lang];

  return (
    <motion.button
      layout
      type="button"
      onClick={(event) => onOpen(project, event.currentTarget)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-[1rem] border bg-white text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3737F2] focus-visible:ring-offset-2"
      style={{
        borderColor: BORDER,
        boxShadow: "0 16px 36px rgba(16, 31, 68, 0.06)",
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -3 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="overflow-hidden border-b"
        style={{ borderColor: BORDER, aspectRatio: "16 / 10" }}
      >
        <ProjectVisual project={project} />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap gap-2">
          {project.categories.slice(0, 2).map((category) => (
            <CategoryTag key={category} category={category} lang={lang} />
          ))}
        </div>

        <h3
          className={`eruty-card-title mt-4 ${
            lang === "ko" ? "eruty-keep-all" : ""
          }`}
          style={{ color: NEAR_BLACK }}
        >
          {getLocalizedText(project.title, lang)}
        </h3>

        <p
          className={`eruty-body-small mt-3 overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] ${
            lang === "ko" ? "eruty-keep-all" : ""
          }`}
          style={{ color: BODY_TEXT }}
        >
          {getLocalizedText(project.summary, lang)}
        </p>

        <div className="eruty-meta mt-5" style={{ color: MUTED }}>
          {getLocalizedText(project.status, lang)}
        </div>

        <div className="mt-auto flex items-center justify-between pt-5">
          <span
            className="text-sm font-medium"
            style={{ color: BLUE }}
          >
            {copy.viewDetails}
          </span>
          <ArrowRight size={16} style={{ color: BLUE }} />
        </div>
      </div>
    </motion.button>
  );
}

function ProjectGridSection({
  projects,
  onOpen,
  prefersReducedMotion,
}: {
  projects: Project[];
  onOpen: (project: Project, trigger: HTMLElement | null) => void;
  prefersReducedMotion: boolean;
}) {
  const { lang } = useLanguage();
  const copy = PAGE_COPY[lang];

  return (
    <motion.section
      data-growth-grid
      className="border-b bg-white pb-16 md:pb-20"
      style={{ borderColor: BORDER }}
      {...getRevealProps(prefersReducedMotion)}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.length > 0 ? (
            <motion.div layout className="grid gap-6 md:grid-cols-2 md:gap-7">
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={
                    prefersReducedMotion ? undefined : { opacity: 0, y: 14 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  exit={
                    prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }
                  }
                  transition={{
                    duration: prefersReducedMotion ? 0.12 : 0.22,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <ProjectCard
                    project={project}
                    onOpen={onOpen}
                    prefersReducedMotion={prefersReducedMotion}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
              className="rounded-[1rem] border px-6 py-12 text-center"
              style={{ borderColor: BORDER, background: SOFT_BG }}
            >
              <p
                className={`eruty-body ${lang === "ko" ? "eruty-keep-all" : ""}`}
                style={{ color: BODY_TEXT }}
              >
                {copy.gridEmpty}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

function DrawerVisual({
  project,
  lang,
}: {
  project: Project;
  lang: Lang;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-[1rem] border bg-[#EDF2FA]"
      style={{ borderColor: BORDER, aspectRatio: "16 / 10" }}
    >
      <img
        src={project.image}
        alt={getLocalizedText(project.imageAlt, lang)}
        className="h-full w-full object-cover object-center"
        width={1600}
        height={1000}
        loading="lazy"
        draggable={false}
      />
      {project.visualIsConcept ? <ConceptPill lang={lang} /> : null}
    </div>
  );
}

function ProjectDetailDrawer({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const { lang } = useLanguage();
  const copy = PAGE_COPY[lang];
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!project) {
      return undefined;
    }

    const previousHtmlOverflow = document.documentElement.style.overflow;
    const previousBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusableElements(panelRef.current);
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

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [onClose, project]);

  if (!project) {
    return null;
  }

  const detailRows: Array<{ label: string; value: string }> = [];
  if (project.market) {
    detailRows.push({
      label: copy.marketLabel,
      value: getLocalizedText(project.market, lang),
    });
  }
  if (project.status) {
    detailRows.push({
      label: copy.statusLabel,
      value: getLocalizedText(project.status, lang),
    });
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <button
          type="button"
          aria-label={copy.closeDrawer}
          className="absolute inset-0 h-full w-full"
          style={{ background: "rgba(10, 16, 29, 0.52)" }}
          onClick={onClose}
        />

        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${getLocalizedText(project.title, lang)} ${
            lang === "ko" ? "상세" : "details"
          }`}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          className="absolute bottom-0 right-0 top-0 flex w-full max-w-[560px] flex-col bg-white shadow-2xl"
        >
          <div
            className="flex items-start justify-between gap-4 px-6 pb-4 pt-6 md:px-7 md:pb-5"
            style={{ borderBottom: `1px solid ${BORDER}` }}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap gap-2">
                {project.categories.map((category) => (
                  <CategoryTag key={category} category={category} lang={lang} />
                ))}
              </div>
              <h3
                className={`eruty-subsection-title mt-4 ${
                  lang === "ko" ? "eruty-keep-all" : ""
                }`}
                style={{ color: NEAR_BLACK }}
              >
                {getLocalizedText(project.title, lang)}
              </h3>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={copy.closeDrawer}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3737F2] focus-visible:ring-offset-2"
              style={{ borderColor: BORDER, color: NEAR_BLACK }}
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-6 md:px-7 md:py-7">
            <div className="space-y-7">
              <section>
                <div
                  className={`eruty-meta mb-3 ${lang === "en" ? "eruty-meta--code" : ""}`}
                  style={{ color: MUTED }}
                >
                  {copy.relatedVisualLabel}
                </div>
                <DrawerVisual project={project} lang={lang} />
              </section>

              {detailRows.length > 0 ? (
                <section
                  className="overflow-hidden rounded-[1rem] border"
                  style={{ borderColor: BORDER }}
                >
                  {detailRows.map((row, index) => (
                    <div
                      key={row.label}
                      className="grid gap-2 px-4 py-4 md:grid-cols-[132px_1fr]"
                      style={{
                        borderTop:
                          index > 0 ? `1px solid ${BORDER}` : "1px solid transparent",
                      }}
                    >
                      <div
                        className={`eruty-meta ${lang === "en" ? "eruty-meta--code" : ""}`}
                        style={{ color: MUTED }}
                      >
                        {row.label}
                      </div>
                      <div
                        className={`eruty-body-small ${lang === "ko" ? "eruty-keep-all" : ""}`}
                        style={{ color: BODY_TEXT }}
                      >
                        {row.value}
                      </div>
                    </div>
                  ))}
                </section>
              ) : null}

              <section>
                <div
                  className={`eruty-meta mb-3 ${lang === "en" ? "eruty-meta--code" : ""}`}
                  style={{ color: MUTED }}
                >
                  {copy.overviewLabel}
                </div>
                <p
                  className={`eruty-body ${lang === "ko" ? "eruty-keep-all" : ""}`}
                  style={{ color: BODY_TEXT }}
                >
                  {getLocalizedText(project.summary, lang)}
                </p>
              </section>

              {project.role ? (
                <section>
                  <div
                    className={`eruty-meta mb-3 ${lang === "en" ? "eruty-meta--code" : ""}`}
                    style={{ color: MUTED }}
                  >
                    {copy.roleLabel}
                  </div>
                  <p
                    className={`eruty-body ${lang === "ko" ? "eruty-keep-all" : ""}`}
                    style={{ color: BODY_TEXT }}
                  >
                    {getLocalizedText(project.role, lang)}
                  </p>
                </section>
              ) : null}

              {project.scope && project.scope.length > 0 ? (
                <section>
                  <div
                    className={`eruty-meta mb-3 ${lang === "en" ? "eruty-meta--code" : ""}`}
                    style={{ color: MUTED }}
                  >
                    {copy.scopeLabel}
                  </div>
                  <ul className="space-y-3">
                    {project.scope.map((item) => (
                      <li
                        key={item.en}
                        className={`eruty-body flex gap-3 ${lang === "ko" ? "eruty-keep-all" : ""}`}
                        style={{ color: BODY_TEXT }}
                      >
                        <span
                          className="mt-[0.72rem] h-[6px] w-[6px] rounded-full"
                          style={{ background: BLUE }}
                        />
                        <span>{getLocalizedText(item, lang)}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {project.outcome ? (
                <section>
                  <div
                    className={`eruty-meta mb-3 ${lang === "en" ? "eruty-meta--code" : ""}`}
                    style={{ color: MUTED }}
                  >
                    {copy.outcomeLabel}
                  </div>
                  <p
                    className={`eruty-body ${lang === "ko" ? "eruty-keep-all" : ""}`}
                    style={{ color: BODY_TEXT }}
                  >
                    {getLocalizedText(project.outcome, lang)}
                  </p>
                </section>
              ) : null}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function CtaPattern() {
  return (
    <svg
      viewBox="0 0 1200 320"
      className="absolute inset-x-0 bottom-0 h-full w-full opacity-60"
      fill="none"
      aria-hidden="true"
    >
      {[0, 22, 44, 66].map((offset) => (
        <path
          key={offset}
          d={`M-40 ${248 + offset} C 168 ${176 + offset} 346 ${186 + offset} 540 ${
            230 + offset
          } S 896 ${300 + offset} 1240 ${214 + offset}`}
          stroke="rgba(55,55,242,0.28)"
          strokeWidth="1.6"
        />
      ))}
    </svg>
  );
}

function FinalCtaSection({
  prefersReducedMotion,
}: {
  prefersReducedMotion: boolean;
}) {
  const { lang } = useLanguage();
  const copy = PAGE_COPY[lang];

  return (
    <motion.section
      data-growth-cta
      className="eruty-section-compact overflow-hidden bg-[#060B14]"
      {...getRevealProps(prefersReducedMotion)}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[1rem] border px-6 py-12 md:px-10 md:py-14 lg:px-14"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background:
              "radial-gradient(circle at 78% 24%, rgba(55,55,242,0.12), transparent 24%), linear-gradient(180deg, #07111E 0%, #050A13 100%)",
          }}
        >
          <CtaPattern />
          <div className="relative z-10 max-w-[42rem]">
            <div
              className={`eruty-meta mb-4 ${lang === "en" ? "eruty-meta--code" : ""}`}
              style={{ color: "rgba(255,255,255,0.56)" }}
            >
              {copy.ctaEyebrow}
            </div>

            <h2
              className={`eruty-section-title text-white ${
                lang === "ko" ? "eruty-keep-all" : ""
              }`}
            >
              {copy.ctaHeadline}
            </h2>

            <p
              className={`eruty-body mt-4 max-w-[33rem] ${
                lang === "ko" ? "eruty-keep-all" : ""
              }`}
              style={{
                color: "rgba(255,255,255,0.72)",
              }}
            >
              {copy.ctaDescription}
            </p>

            <Link
              to="/start-a-project"
              className="mt-8 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-full px-6 text-[0.96rem] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#050A13]"
              style={{ background: BLUE, color: "#FFFFFF" }}
            >
              {copy.ctaButton}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export function GrowthPage() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const previousHtmlOverflowX = document.documentElement.style.overflowX;
    const previousBodyOverflowX = document.body.style.overflowX;

    document.documentElement.style.overflowX = "clip";
    document.body.style.overflowX = "clip";

    return () => {
      document.documentElement.style.overflowX = previousHtmlOverflowX;
      document.body.style.overflowX = previousBodyOverflowX;
    };
  }, []);

  const filteredProjects = GRID_PROJECTS.filter((project) =>
    activeFilter === "all"
      ? true
      : project.categories.includes(activeFilter),
  );

  const selectedProject =
    PUBLISHED_PROJECTS.find((project) => project.id === selectedProjectId) ?? null;

  function openProject(project: Project, trigger: HTMLElement | null) {
    triggerRef.current = trigger;
    setSelectedProjectId(project.id);
  }

  function closeProject() {
    setSelectedProjectId(null);
    const trigger = triggerRef.current;
    window.requestAnimationFrame(() => trigger?.focus());
  }

  return (
    <div className="overflow-hidden bg-white">
      <HeroSection prefersReducedMotion={prefersReducedMotion} />
      <FeaturedProjectSection
        project={FEATURED_PROJECT}
        onOpen={openProject}
        prefersReducedMotion={prefersReducedMotion}
      />
      <FilterSection
        activeFilter={activeFilter}
        onChange={setActiveFilter}
        prefersReducedMotion={prefersReducedMotion}
      />
      <ProjectGridSection
        projects={filteredProjects}
        onOpen={openProject}
        prefersReducedMotion={prefersReducedMotion}
      />
      <ProjectDetailDrawer project={selectedProject} onClose={closeProject} />
      <FinalCtaSection prefersReducedMotion={prefersReducedMotion} />
    </div>
  );
}
