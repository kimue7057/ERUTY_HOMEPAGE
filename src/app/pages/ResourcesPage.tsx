import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { PageContainer } from "../components/PageContainer";
import { PageHeading } from "../components/PageHeading";
import { SectionHeading } from "../components/SectionHeading";
import { useLanguage } from "../context/LanguageContext";
import { RESOURCE_NEWS } from "../data/resourceNews";
import type { NewsItem } from "../data/resourceNews";
import { RESOURCE_RESEARCH } from "../data/resourceResearch";
import type {
  ResearchCategory,
  ResearchItem,
} from "../data/resourceResearch";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BODY_TEXT = "#333438";
const MUTED = "#737780";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F7F8FA";

type ResearchFilterId = "all" | "paper" | "patent" | "rnd";

const RESEARCH_FILTER_ORDER: readonly ResearchFilterId[] = [
  "all",
  "paper",
  "patent",
  "rnd",
];

const T = {
  ko: {
    badge: "리소스",
    heading: "이루티 지식 허브",
    description:
      "글로벌 운영에서 축적한 사례 연구, 인사이트, 프로젝트, 프로그램과 최신 소식을 정리합니다.",
    publicationsLabel: "연구·발표",
    publicationsHeading: "이루티의 기술 연구와 공개 자료",
    publicationsEmpty: "공개 가능한 연구 자료를 정리하고 있습니다.",
    researchFilterLabel: "연구·발표 분류",
    researchFilters: {
      all: "전체",
      paper: "논문",
      patent: "특허",
      rnd: "연구개발",
    },
    researchTypes: {
      paper: "논문",
      patent: "특허",
      "patent-application": "특허출원",
      rnd: "연구개발",
    },
    newsLabel: "뉴스룸",
    newsHeading: "이루티 최신 소식",
    latestNewsHeading: "최신 뉴스",
    archiveNewsHeading: "이전 소식",
    viewSource: "원문 보기",
    externalLink: "외부 링크",
  },
  en: {
    badge: "Resources",
    heading: "ERUTY Knowledge Hub",
    description:
      "Case studies, insights, projects, programs, and the latest updates from ERUTY's global operations.",
    publicationsLabel: "Research & Publications",
    publicationsHeading: "Technology Research and Publications",
    publicationsEmpty: "Public research materials are being prepared.",
    researchFilterLabel: "Research and publication categories",
    researchFilters: {
      all: "All",
      paper: "Publications",
      patent: "Patents",
      rnd: "R&D",
    },
    researchTypes: {
      paper: "Publication",
      patent: "Patent",
      "patent-application": "Patent Application",
      rnd: "R&D",
    },
    newsLabel: "Newsroom",
    newsHeading: "Latest from ERUTY",
    latestNewsHeading: "Latest News",
    archiveNewsHeading: "News Archive",
    viewSource: "View source",
    externalLink: "external link",
  },
} as const;

type ResourceCopy = (typeof T)[keyof typeof T];

function EmptyStateCard({ message }: { message: string }) {
  return (
    <div
      className="flex min-h-32 items-center justify-center p-8 text-center md:p-10"
      style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}
    >
      <p className="eruty-body" style={{ color: BODY_TEXT, fontWeight: 600 }}>
        {message}
      </p>
    </div>
  );
}

function formatPublishedDate(publishedAt: string) {
  return publishedAt.split("-").join(".");
}

function getResearchSortYear(year: string) {
  const years = year.match(/\d{4}/g)?.map(Number) ?? [0];
  return Math.max(...years);
}

function matchesResearchFilter(
  category: ResearchCategory,
  filter: ResearchFilterId,
) {
  if (filter === "all") return true;
  if (filter === "patent") {
    return category === "patent" || category === "patent-application";
  }
  return category === filter;
}

function getImagePosition(item: NewsItem) {
  if ("imagePosition" in item && typeof item.imagePosition === "string") {
    return item.imagePosition;
  }
  return "center";
}

function NewsImage({
  item,
  // showCredit = true,
}: {
  item: NewsItem;
  showCredit?: boolean;
}) {
  return (
    <figure className="m-0 min-w-0">
      <div
        className="relative aspect-video w-full overflow-hidden"
        style={{ background: SOFT_BG, border: `1px solid ${BORDER}` }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center text-center text-xs font-semibold tracking-[0.18em]"
          style={{ color: MUTED }}
        >
          ERUTY NEWSROOM
        </div>
        <img
          src={item.image}
          alt={item.imageAlt}
          loading="lazy"
          width={1200}
          height={675}
          className="relative h-full w-full object-cover"
          style={{ objectPosition: getImagePosition(item) }}
          onError={(event) => {
            event.currentTarget.hidden = true;
          }}
        />
      </div>
      {/* {showCredit && item.imageCredit ? (
        <figcaption
          className="mt-1.5 text-[0.89375rem] leading-4"
          style={{ color: MUTED }}
        >
          {item.imageCredit}
        </figcaption>
      ) : null} */}
    </figure>
  );
}

function NewsMeta({ item }: { item: NewsItem }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
      <span className="eruty-meta font-medium" style={{ color: BLUE }}>
        {item.category}
      </span>
      <span aria-hidden="true" className="eruty-meta" style={{ color: BORDER }}>
        ·
      </span>
      <time
        dateTime={item.publishedAt}
        className="eruty-meta eruty-meta--code"
        style={{ color: MUTED }}
      >
        {formatPublishedDate(item.publishedAt)}
      </time>
    </div>
  );
}

function SourceLink({ item, copy }: { item: NewsItem; copy: ResourceCopy }) {
  return (
    <a
      href={item.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${item.title}: ${copy.viewSource} (${copy.externalLink})`}
      className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#18191B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3737F2]"
      style={{ color: BLUE }}
    >
      {copy.viewSource}
      <ExternalLink aria-hidden="true" size={14} strokeWidth={1.8} />
    </a>
  );
}

function ResearchCard({
  item,
  lang,
  copy,
}: {
  item: ResearchItem;
  lang: "ko" | "en";
  copy: ResourceCopy;
}) {
  return (
    <article
      className="min-w-0 p-6 md:p-7"
      style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <span
          className="eruty-meta rounded-full px-2.5 py-1"
          style={{ border: `1px solid ${BLUE}33`, color: BLUE }}
        >
          {copy.researchTypes[item.category]}
        </span>
        <span className="eruty-meta eruty-meta--code" style={{ color: MUTED }}>
          {item.year}
        </span>
      </div>
      <h3
        className="eruty-card-title break-keep"
        style={{ color: NEAR_BLACK, overflowWrap: "break-word" }}
      >
        {lang === "ko" ? item.title : item.titleEn}
      </h3>
    </article>
  );
}

export function ResourcesPage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [activeResearchFilter, setActiveResearchFilter] =
    useState<ResearchFilterId>("all");

  const publishedResearch = RESOURCE_RESEARCH.map((item, index) => ({
    item,
    index,
  }))
    .filter(({ item }) => item.visibility === "published")
    .sort(
      (a, b) =>
        getResearchSortYear(b.item.year) - getResearchSortYear(a.item.year) ||
        a.index - b.index,
    )
    .map(({ item }) => item);

  const filteredResearch = publishedResearch.filter((item) =>
    matchesResearchFilter(item.category, activeResearchFilter),
  );

  const sortedNews = [...RESOURCE_NEWS[lang]]
    .filter((item) => item.visibility === "published")
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const latestNews = sortedNews.slice(0, 3);
  const archivedNews = sortedNews.slice(3);

  return (
    <div style={{ background: "#FFFFFF" }}>
      <section
        className="relative overflow-hidden"
        style={{ borderBottom: `1px solid ${BORDER}` }}
      >
        <div className="absolute inset-0" aria-hidden="true">
          <img
            src="/images/resources/resources-hero-visual.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, #FFFFFF 0%, rgba(255,255,255,0.96) 30%, rgba(255,255,255,0.58) 53%, rgba(255,255,255,0.08) 72%)",
            }}
          />
        </div>

        <PageContainer className="eruty-hero-section relative">
          <div className="relative z-10 max-w-[58%] sm:max-w-[54%] lg:max-w-[50%]">
            <PageHeading
              eyebrow={t.badge}
              title={t.heading}
              description={t.description}
              align="left"
              lang={lang}
            />
          </div>
        </PageContainer>
      </section>

      {sortedNews.length > 0 ? (
        <section
          id="newsroom"
          data-resource-section="newsroom"
          className="eruty-section"
          aria-labelledby="resources-news-heading"
          style={{ borderBottom: `1px solid ${BORDER}` }}
        >
          <div className="eruty-container">
            <SectionHeading
              eyebrow={t.newsLabel}
              title={t.newsHeading}
              titleId="resources-news-heading"
              align="center"
              lang={lang}
            />

            {latestNews.length > 0 ? (
              <div aria-labelledby="resources-latest-news-heading">
                <h3
                  id="resources-latest-news-heading"
                  className="mb-5 text-xl font-semibold md:mb-6 md:text-2xl"
                  style={{ color: NEAR_BLACK }}
                >
                  {t.latestNewsHeading}
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {latestNews.map((item) => (
                    <article
                      key={item.id}
                      className="flex min-w-0 flex-col overflow-hidden"
                      style={{ background: "#FFFFFF", border: `1px solid ${BORDER}` }}
                    >
                      <NewsImage item={item} />
                      <div className="flex flex-1 flex-col p-6">
                        <NewsMeta item={item} />
                        <h4
                          className="eruty-card-title mt-3 break-keep"
                          style={{ color: NEAR_BLACK, overflowWrap: "break-word" }}
                        >
                          {item.title}
                        </h4>
                        <p
                          className="eruty-body-small mt-3 overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:4]"
                          style={{ color: BODY_TEXT }}
                        >
                          {item.summary}
                        </p>
                        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-2 pt-5">
                          <span className="eruty-body-small" style={{ color: MUTED }}>
                            {item.publisher}
                          </span>
                          <span aria-hidden="true" style={{ color: BORDER }}>
                            ·
                          </span>
                          <SourceLink item={item} copy={t} />
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}

            {archivedNews.length > 0 ? (
              <div
                className="mt-14 md:mt-16"
                aria-labelledby="resources-archive-news-heading"
              >
                <h3
                  id="resources-archive-news-heading"
                  className="mb-5 text-xl font-semibold md:mb-6 md:text-2xl"
                  style={{ color: NEAR_BLACK }}
                >
                  {t.archiveNewsHeading}
                </h3>

                <ul className="m-0 list-none p-0">
                  {archivedNews.map((item) => (
                    <li
                      key={item.id}
                      className="grid min-w-0 gap-5 border-b py-6 first:border-t md:grid-cols-[15rem_minmax(0,1fr)] md:gap-7 md:py-7"
                      style={{ borderColor: BORDER }}
                    >
                      <NewsImage item={item} />
                      <article className="min-w-0">
                        <NewsMeta item={item} />
                        <h4
                          className="eruty-card-title mt-3 break-keep"
                          style={{ color: NEAR_BLACK, overflowWrap: "break-word" }}
                        >
                          {item.title}
                        </h4>
                        <p className="eruty-body-small mt-2" style={{ color: BODY_TEXT }}>
                          {item.summary}
                        </p>
                        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-2">
                          <span className="eruty-body-small" style={{ color: MUTED }}>
                            {item.publisher}
                          </span>
                          <span aria-hidden="true" style={{ color: BORDER }}>
                            ·
                          </span>
                          <SourceLink item={item} copy={t} />
                        </div>
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section
        id="publications"
        data-resource-section="research"
        className="eruty-section"
        aria-labelledby="resources-publications-heading"
      >
        <div className="eruty-container">
          <SectionHeading
            eyebrow={t.publicationsLabel}
            title={t.publicationsHeading}
            titleId="resources-publications-heading"
            align="center"
            lang={lang}
          />

          {publishedResearch.length === 0 ? (
            <EmptyStateCard message={t.publicationsEmpty} />
          ) : (
            <>
              <div
                className="mb-8 flex flex-wrap justify-center gap-2"
                aria-label={t.researchFilterLabel}
              >
                {RESEARCH_FILTER_ORDER.map((filterId) => {
                  const isActive = activeResearchFilter === filterId;

                  return (
                    <button
                      key={filterId}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveResearchFilter(filterId)}
                      className="cursor-pointer rounded-full border px-3.5 py-1.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3737F2]"
                      style={{
                        borderColor: isActive ? BLUE : BORDER,
                        background: isActive ? BLUE : "#FFFFFF",
                        color: isActive ? "#FFFFFF" : MUTED,
                        fontFamily: "var(--font-body)",
                        fontWeight: isActive ? 600 : 400,
                      }}
                    >
                      {t.researchFilters[filterId]}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredResearch.map((item) => (
                  <ResearchCard key={item.id} item={item} lang={lang} copy={t} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
