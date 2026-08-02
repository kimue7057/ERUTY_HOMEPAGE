import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  FlaskConical,
  MapPin,
  ScrollText,
} from "lucide-react";
import { buildStartProjectHref } from "../../data/inquiryOptions";
import { type Lang, useLanguage } from "../../context/LanguageContext";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BODY_TEXT = "#333438";
const MUTED = "#6E7481";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F6F8FC";
const CARD_BG = "#FCFCFE";
const JOURNEY_SCROLL_GAP = 24;

type IdentityItem = {
  icon: LucideIcon;
  label: Record<Lang, string>;
  value: Record<Lang, string>;
};

type JourneyMedia =
  | {
      type: "image";
      src: string;
      alt: Record<Lang, string>;
      fit: "cover" | "contain";
      background?: string;
    }
  | {
      type: "placeholder";
      variant: "origin" | "foundation";
      alt: Record<Lang, string>;
    };

type JourneyEntry = {
  year: string;
  caption: Record<Lang, string>;
  items: Record<Lang, string[]>;
  media: JourneyMedia;
};

const IDENTITY_ITEMS: IdentityItem[] = [
  {
    icon: Building2,
    label: { ko: "설립연도", en: "Founded" },
    value: { ko: "2022", en: "2022" },
  },
  {
    icon: MapPin,
    label: { ko: "거점", en: "Bases" },
    value: { ko: "부산 · 서울", en: "Busan · Seoul" },
  },
  {
    icon: BadgeCheck,
    label: { ko: "기업인증", en: "Certification" },
    value: { ko: "벤처기업", en: "Venture Company" },
  },
  {
    icon: FlaskConical,
    label: { ko: "연구기반", en: "R&D Base" },
    value: { ko: "기업부설연구소", en: "Corporate R&D Center" },
  },
  {
    icon: ScrollText,
    label: { ko: "지식재산", en: "Intellectual Property" },
    value: {
      ko: "특허 등록 2건\n출원 1건",
      en: "2 Patents Registered\n1 Application",
    },
  },
];

const JOURNEY_ENTRIES: JourneyEntry[] = [
  {
    year: "2026",
    caption: {
      ko: "2026년 7월 독일 GITEX AI Europe 2026 참가 공개 사진입니다.",
      en: "Public image from ERUTY's participation at GITEX AI Europe 2026 in Germany.",
    },
    items: {
      ko: [
        "CES 2026 참가 및 히트픽(HITPICK) 소개",
        "콘텐츠 통합 플랫폼 히트픽(HITPICK) 정식 출시",
        "독일 GITEX AI Europe 2026 참가",
      ],
      en: [
        "Participated in CES 2026 and introduced HITPICK",
        "Officially launched the integrated content platform HITPICK",
        "Participated in GITEX AI Europe 2026 in Germany",
      ],
    },
    media: {
      type: "image",
      src: "/images/company/about/journey-2026-gitex.png",
      alt: {
        ko: "독일 GITEX AI Europe 2026 현장 ERUTY 부스 사진",
        en: "ERUTY booth at GITEX AI Europe 2026 in Germany",
      },
      fit: "cover",
    },
  },
  {
    year: "2025",
    caption: {
      ko: "베트남 InnoEX 2025 현장 공개 사진입니다.",
      en: "Public on-site image from ERUTY's participation at InnoEX 2025 in Vietnam.",
    },
    items: {
      ko: [
        "생성형 AI 기반 개인 맞춤형 콘텐츠 자동 생성 모델 구축",
        "산학연 Collabo R&D 협약",
        "베트남 InnoEX 2025 전시회 참가",
      ],
      en: [
        "Built a generative AI-based personalized content auto-generation model",
        "Signed an industry-academia-research Collabo R&D agreement",
        "Participated in the InnoEX 2025 exhibition in Vietnam",
      ],
    },
    media: {
      type: "image",
      src: "/images/company/about/journey-2025-vietnam.png",
      alt: {
        ko: "베트남 InnoEX 2025 현장 단체 사진",
        en: "Group photo from InnoEX 2025 in Vietnam",
      },
      fit: "cover",
    },
  },
  {
    year: "2024",
    caption: {
      ko: "2024년 2월 등록 특허 증서를 대표 이미지로 사용했습니다.",
      en: "Uses the February 2024 registered patent certificate as the representative image.",
    },
    items: {
      ko: [
        "블록체인 기반 저작권 관리 기술 특허 1건 등록",
        "블록체인 기반 콘텐츠 저작권 관리 솔루션 정식 런칭",
        "창업성장기술개발 사업(디딤돌 R&D) 협약",
      ],
      en: [
        "Registered a patent for blockchain-based copyright management technology",
        "Officially launched the blockchain-based content copyright management solution",
        "Signed the Startup Growth Technology Development Program agreement",
      ],
    },
    media: {
      type: "image",
      src: "/images/company/about/journey-2024-patent-02.png",
      alt: {
        ko: "2024년 등록 특허 증서 이미지",
        en: "Patent certificate registered in 2024",
      },
      fit: "contain",
      background: "linear-gradient(180deg, #FAFBFD 0%, #EEF2F8 100%)",
    },
  },
  {
    year: "2023",
    caption: {
      ko: "벤처기업 인증서와 연구 기반 확립을 보여주는 공개 문서 이미지입니다.",
      en: "Public certification imagery reflecting venture status and ERUTY's R&D foundation.",
    },
    items: {
      ko: [
        "청년창업사관학교 수료",
        "벤처기업 인증",
        "기업부설연구소 설립",
      ],
      en: [
        "Completed Youth Startup Academy",
        "Certified as a venture company",
        "Established the corporate research center",
      ],
    },
    media: {
      type: "image",
      src: "/images/company/about/journey-2023-venture.png",
      alt: {
        ko: "2023 벤처기업 확인서 이미지",
        en: "2023 venture enterprise certificate",
      },
      fit: "contain",
      background: "linear-gradient(180deg, #F9FBFE 0%, #EEF3FA 100%)",
    },
  },
  {
    year: "2022",
    caption: {
      ko: "공개 현장 이미지가 없어 설립 시기의 아카이브 비주얼로 구성했습니다.",
      en: "Built with an archive visual for the incorporation period because no public image is available.",
    },
    items: {
      ko: [
        "주식회사 이루티 법인 설립 및 사업자 등록",
        "창업진흥원 예비창업패키지 선정 및 최우수 수료",
        "부산시 기술 창업 인큐베이팅 지원 사업 선정",
      ],
      en: [
        "ERUTY Co., Ltd. incorporated and business registration completed",
        "Selected for the Preliminary Startup Package and completed with top honors",
        "Selected for the Busan technology startup incubating support program",
      ],
    },
    media: {
      type: "placeholder",
      variant: "foundation",
      alt: {
        ko: "2022 설립 시기를 상징하는 추상 아카이브 비주얼",
        en: "Abstract archive visual symbolizing the 2022 incorporation period",
      },
    },
  },
  {
    year: "2021",
    caption: {
      ko: "공개 현장 이미지가 없어 아카이브 비주얼로 구성했습니다.",
      en: "Built with an archive visual because no public event image is available.",
    },
    items: {
      ko: ["생애 최초 청년 창업 지원 사업 선정"],
      en: ["Selected for the First Youth Startup Support Program"],
    },
    media: {
      type: "placeholder",
      variant: "origin",
      alt: {
        ko: "2021 창업 지원 기록을 상징하는 추상 아카이브 비주얼",
        en: "Abstract archive visual representing the 2021 startup support record",
      },
    },
  },
];

const COPY = {
  ko: {
    heroLabel: "ABOUT ERUTY",
    heroHeadline: "가능성을 발견하고,\n글로벌 성장으로 실행합니다",
    heroDescription:
      "이루티는 데이터와 기술, 글로벌 네트워크를 바탕으로\n기업과 브랜드, 서비스의 가능성을 새로운 시장의 성장으로 연결합니다.",
    heroAlt:
      "글로벌 도시 스카이라인과 네트워크로 연결된 지구를 보여주는 승인 시안 기반 비주얼",
    identityLabel: "COMPANY IDENTITY",
    identityHeadline: "이루티는 가능성을\n성장으로 연결하는\n회사입니다",
    beginningLabel: "OUR BEGINNING",
    beginningHeadline:
      "좋은 가능성이 있어도,\n실행으로 연결되지 않으면\n성장할 수 없습니다.",
    beginningDescription:
      "우리는 시장과 기술, 사람과 실행이 서로 분리되어 있는 현실을 보았습니다.\n좋은 아이디어와 기술, 상품과 서비스가 사라지지 않고\n실제 사업과 성장으로 이어지도록 연결하는 회사를 만들고자\n이루티를 시작했습니다.",
    beginningAlt: "공식 회사소개 페이지에 공개된 야간 빌딩 이미지",
    beginningCaption: "공식 회사소개 페이지에 공개된 이미지",
    journeyLabel: "OUR JOURNEY",
    journeyHeadline: "우리의 발자취",
    journeyInstruction: "최근 기록부터 ERUTY의 주요 여정을 확인해 보세요.",
    journeyRegionLabel: "ERUTY 최신순 연혁 가로 스크롤 영역",
    journeyPrev: "더 최근 연혁 보기",
    journeyNext: "더 이전 연혁 보기",
    journeyTail: "이루티의 여정은 지금도 계속되고 있습니다.",
    ctaHeadline: "다음 글로벌 성장을 함께 실행합니다",
    ctaPrimary: "협력 문의하기",
    ctaSecondary: "프로젝트 시작하기",
  },
  en: {
    heroLabel: "ABOUT ERUTY",
    heroHeadline: "We discover potential,\nand execute global growth",
    heroDescription:
      "Powered by data, technology, and a global network,\nERUTY connects the potential of companies, brands, and services\nto growth in new markets.",
    heroAlt:
      "Approved visual showing a skyline and a globe connected by refined network lines",
    identityLabel: "COMPANY IDENTITY",
    identityHeadline: "ERUTY connects\npossibility\nto growth",
    beginningLabel: "OUR BEGINNING",
    beginningHeadline:
      "Potential cannot grow\nunless it is connected\nto execution.",
    beginningDescription:
      "We saw a reality where markets and technology,\npeople and execution remained disconnected.\nWe started ERUTY so that strong ideas, technology,\nproducts, and services continue into real business and growth.",
    beginningAlt: "Nighttime office building image used on ERUTY's official company page",
    beginningCaption: "Public image currently used on the official company page",
    journeyLabel: "OUR JOURNEY",
    journeyHeadline: "Our journey",
    journeyInstruction: "Explore ERUTY's journey, starting with our latest milestones.",
    journeyRegionLabel: "ERUTY latest-first journey archive",
    journeyPrev: "View more recent milestones",
    journeyNext: "View older milestones",
    journeyTail: "ERUTY's journey is still in motion.",
    ctaHeadline: "We execute the next stage of global growth together",
    ctaPrimary: "Partnership Inquiry",
    ctaSecondary: "Start a Project",
  },
} as const;

function renderMultilineText(text: string) {
  return text.split("\n").map((line, index, lines) => (
    <span key={`${line}-${index}`}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));
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

function Eyebrow({ children, accent = true }: { children: string; accent?: boolean }) {
  return (
    <div
      className="mb-4 text-[0.78rem] font-semibold uppercase tracking-[0.24em]"
      style={{
        color: accent ? BLUE : MUTED,
        fontFamily: "var(--font-mono)",
      }}
    >
      {children}
    </div>
  );
}

function HeroSection() {
  const { lang } = useLanguage();
  const copy = COPY[lang];

  return (
    <section
      className="relative overflow-hidden border-b"
      style={{
        borderColor: BORDER,
        background:
          "radial-gradient(circle at 70% 12%, rgba(55,55,242,0.09), transparent 26%), linear-gradient(180deg, #FFFFFF 0%, #FBFCFF 100%)",
      }}
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        <div className="relative pb-16 pt-16 md:pb-20 md:pt-20 lg:min-h-[32rem] lg:pb-24 lg:pt-24">
          <div className="relative z-10 max-w-[48rem]">
            <Eyebrow>{copy.heroLabel}</Eyebrow>
            <h1
              className={`font-[800] ${lang === "ko" ? "eruty-keep-all" : ""}`}
              style={{
                color: NEAR_BLACK,
                fontSize: "clamp(2.95rem, 5vw, 4.75rem)",
                lineHeight: 1.06,
                letterSpacing: "-0.043em",
              }}
            >
              {renderMultilineText(copy.heroHeadline)}
            </h1>
            <p
              className={`mt-8 max-w-[36rem] ${lang === "ko" ? "eruty-keep-all" : ""}`}
              style={{
                color: "#4E5561",
                whiteSpace: "pre-line",
                fontSize: "clamp(0.97rem, 1.1vw, 1.08rem)",
                lineHeight: 1.82,
              }}
            >
              {copy.heroDescription}
            </p>
          </div>

          <div className="mt-10 lg:absolute lg:right-[-3.75rem] lg:top-2 lg:mt-0 lg:h-[27.75rem] lg:w-[56%] xl:right-[-4.25rem] xl:w-[57%]">
            <div className="relative h-[18.75rem] overflow-hidden rounded-[2rem] sm:h-[23rem] lg:h-full lg:rounded-none">
              <picture>
                <source
                  media="(max-width: 767px)"
                  srcSet="/images/company/about/hero-approved-visual-mobile.webp"
                />
                <img
                  src="/images/company/about/hero-approved-visual.webp"
                  alt={copy.heroAlt}
                  className="h-full w-full select-none object-cover object-[79%_56%]"
                  draggable={false}
                />
              </picture>
              <div className="absolute inset-y-0 left-0 w-[46%] bg-gradient-to-r from-white via-white/90 to-white/0 lg:w-[35%]" />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/80 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white via-white/45 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IdentitySection() {
  const { lang } = useLanguage();
  const copy = COPY[lang];

  return (
    <section className="relative z-20 -mt-12 md:-mt-16 lg:-mt-24">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        <div
          className="overflow-hidden rounded-[2rem] border"
          style={{
            borderColor: BORDER,
            background: CARD_BG,
            boxShadow: "0 22px 52px rgba(12, 29, 63, 0.08)",
          }}
        >
          <div className="grid gap-8 px-6 py-7 md:px-8 md:py-8 lg:grid-cols-[minmax(252px,320px)_1fr] lg:items-center lg:gap-10 lg:px-10">
            <div className="max-w-[20rem]">
              <Eyebrow>{copy.identityLabel}</Eyebrow>
              <h2
                className={`font-[800] ${lang === "ko" ? "eruty-keep-all" : ""}`}
                style={{
                  color: NEAR_BLACK,
                  fontSize: "clamp(1.9rem, 2.7vw, 2.5rem)",
                  lineHeight: 1.14,
                  letterSpacing: "-0.04em",
                }}
              >
                {renderMultilineText(copy.identityHeadline)}
              </h2>
            </div>

            <div
              className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0 lg:divide-x"
              style={{ borderColor: BORDER }}
            >
              {IDENTITY_ITEMS.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label.en}
                    className="flex min-h-[7rem] flex-col justify-center px-0 py-3 sm:px-4 sm:py-4 lg:px-6 lg:py-5"
                  >
                    <div className="mb-3 flex items-center">
                      <span
                        className="flex h-10 w-10 items-center justify-center rounded-full"
                        style={{
                          background: "rgba(55,55,242,0.08)",
                          color: BLUE,
                        }}
                      >
                        <Icon size={18} strokeWidth={1.9} />
                      </span>
                    </div>
                    <div
                      className="text-[0.78rem] uppercase"
                      style={{
                        color: MUTED,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {item.label[lang]}
                    </div>
                    <div
                      className={`${lang === "ko" ? "eruty-keep-all" : ""} mt-2 font-[700] tracking-[-0.02em]`}
                      style={{
                        color: BLUE,
                        fontSize: "clamp(1rem, 1.1vw, 1.08rem)",
                        lineHeight: 1.45,
                      }}
                    >
                      {renderMultilineText(item.value[lang])}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeginningSection() {
  const { lang } = useLanguage();
  const copy = COPY[lang];

  return (
    <section className="border-b py-20 md:py-24" style={{ borderColor: BORDER, background: "#FFFFFF" }}>
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.03fr)_minmax(0,0.97fr)] lg:gap-16">
          <div className="max-w-[35rem]">
            <Eyebrow>{copy.beginningLabel}</Eyebrow>
            <h2
              className={`font-[800] ${lang === "ko" ? "eruty-keep-all" : ""}`}
              style={{
                color: NEAR_BLACK,
                fontSize: "clamp(2.25rem, 3.9vw, 3.35rem)",
                lineHeight: 1.12,
                letterSpacing: "-0.045em",
              }}
            >
              {renderMultilineText(copy.beginningHeadline)}
            </h2>
            <p
              className={`mt-8 max-w-[32rem] ${lang === "ko" ? "eruty-keep-all" : ""}`}
              style={{
                color: BODY_TEXT,
                whiteSpace: "pre-line",
                fontSize: "clamp(0.96rem, 1.08vw, 1.04rem)",
                lineHeight: 1.86,
              }}
            >
              {copy.beginningDescription}
            </p>
          </div>

          <div className="lg:justify-self-end">
            <figure
              className="overflow-hidden rounded-[1.9rem] border"
              style={{
                borderColor: BORDER,
                background: "#F4F7FC",
                boxShadow: "0 14px 40px rgba(16, 31, 68, 0.05)",
              }}
            >
              <div style={{ aspectRatio: "1.42 / 1" }}>
                <img
                  src="/images/company/about/beginning-company-bg.png"
                  alt={copy.beginningAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </figure>
            <p
              className="mt-3"
              style={{
                color: MUTED,
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                lineHeight: 1.55,
              }}
            >
              {copy.beginningCaption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ArchivePlaceholder({
  variant,
  alt,
}: {
  variant: "origin" | "foundation";
  alt: string;
}) {
  if (variant === "origin") {
    return (
      <div
        role="img"
        aria-label={alt}
        className="relative h-full w-full overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 78% 18%, rgba(55,55,242,0.16), transparent 26%), linear-gradient(180deg, #F7FBFF 0%, #EAF1FB 100%)",
        }}
      >
        <div className="absolute left-0 right-0 top-[24%] h-px bg-[rgba(55,55,242,0.14)]" />
        <div className="absolute left-0 right-0 top-[44%] h-px bg-[rgba(55,55,242,0.10)]" />
        <div className="absolute left-0 right-0 top-[64%] h-px bg-[rgba(55,55,242,0.08)]" />
        <div className="absolute left-[10%] top-[18%] h-2 w-2 rounded-full bg-[rgba(55,55,242,0.68)]" />
        <div className="absolute left-[32%] top-[42%] h-2.5 w-2.5 rounded-full bg-[rgba(55,55,242,0.58)]" />
        <div className="absolute left-[64%] top-[32%] h-2 w-2 rounded-full bg-[rgba(55,55,242,0.5)]" />
        <div className="absolute left-[75%] top-[58%] h-3 w-3 rounded-full bg-[rgba(55,55,242,0.34)]" />
        <div className="absolute left-[10%] top-[18%] h-px w-[22%] rotate-[18deg] bg-[rgba(55,55,242,0.22)]" />
        <div className="absolute left-[32%] top-[42%] h-px w-[25%] -rotate-[15deg] bg-[rgba(55,55,242,0.18)]" />
        <div className="absolute left-[52%] top-[38%] h-px w-[26%] rotate-[28deg] bg-[rgba(55,55,242,0.18)]" />
        <div className="absolute bottom-0 left-0 right-0 h-[48%] bg-gradient-to-t from-white/80 to-transparent" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className="relative h-full w-full overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 72% 20%, rgba(55,55,242,0.12), transparent 24%), linear-gradient(180deg, #FAFCFF 0%, #ECF3FB 100%)",
      }}
    >
      <div className="absolute inset-y-0 right-[10%] flex items-end gap-3 pb-[10%]">
        <div className="h-[46%] w-10 rounded-t-[10px] bg-[#DDE7F8]" />
        <div className="h-[62%] w-12 rounded-t-[10px] bg-[#C9D9F4]" />
        <div className="h-[78%] w-14 rounded-t-[12px] bg-[#B6CCF1]" />
      </div>
      <div
        className="absolute bottom-[16%] left-[8%] h-[38%] w-[44%] rounded-[18px] border bg-white/62"
        style={{ borderColor: "rgba(55,55,242,0.10)" }}
      />
      <div className="absolute bottom-[41%] left-[14%] h-px w-[20%] bg-[rgba(55,55,242,0.20)]" />
      <div className="absolute bottom-[33%] left-[14%] h-px w-[24%] bg-[rgba(55,55,242,0.12)]" />
      <div className="absolute bottom-[25%] left-[14%] h-px w-[18%] bg-[rgba(55,55,242,0.12)]" />
      <div className="absolute inset-x-0 bottom-0 h-[34%] bg-gradient-to-t from-white/72 to-transparent" />
    </div>
  );
}

function JourneyCard({ entry, lang }: { entry: JourneyEntry; lang: Lang }) {
  const media = entry.media;

  return (
    <article
      data-journey-card
      className="flex shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] border bg-white"
      style={{
        width: "min(86vw, 20.75rem)",
        borderColor: BORDER,
        boxShadow: "0 14px 34px rgba(16, 31, 68, 0.05)",
      }}
    >
      <div
        className="overflow-hidden border-b"
        style={{ borderColor: BORDER, aspectRatio: "16 / 9" }}
      >
        {media.type === "image" ? (
          <div
            className="h-full w-full"
            style={{ background: media.background ?? "#EFF4FB" }}
          >
            <img
              src={media.src}
              alt={media.alt[lang]}
              className={`h-full w-full ${
                media.fit === "cover" ? "object-cover object-center" : "object-contain px-5 py-4"
              }`}
              draggable={false}
            />
          </div>
        ) : (
          <ArchivePlaceholder variant={media.variant} alt={media.alt[lang]} />
        )}
      </div>

      <div className="flex flex-1 flex-col px-6 pb-7 pt-6">
        <div
          data-journey-year
          className="font-[800] leading-none tracking-[-0.05em]"
          style={{
            color: BLUE,
            fontSize: "clamp(1.8rem, 2.2vw, 2.125rem)",
          }}
        >
          {entry.year}
        </div>
        <p
          className={`${lang === "ko" ? "eruty-keep-all" : ""} mt-3`}
          style={{
            color: MUTED,
            fontSize: "clamp(0.82rem, 0.95vw, 0.875rem)",
            lineHeight: 1.68,
          }}
        >
          {entry.caption[lang]}
        </p>
        <ul className="mt-4 flex-1 space-y-3">
          {entry.items[lang].map((item) => (
            <li
              key={item}
              className={`flex gap-3 ${lang === "ko" ? "eruty-keep-all" : ""}`}
              style={{
                color: BODY_TEXT,
                fontSize: "clamp(0.94rem, 1.05vw, 1rem)",
                lineHeight: 1.72,
              }}
            >
              <span
                className="mt-[0.72rem] h-[5px] w-[5px] rounded-full"
                style={{ background: BLUE }}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function JourneySection() {
  const { lang } = useLanguage();
  const copy = COPY[lang];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const pointerStateRef = useRef<{
    pointerId: number;
    startX: number;
    scrollLeft: number;
  } | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isDragging, setIsDragging] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [progress, setProgress] = useState(0);
  const [thumbWidth, setThumbWidth] = useState(0.22);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return undefined;
    }

    const updateScrollState = () => {
      const maxScroll = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
      const nextProgress = maxScroll === 0 ? 0 : scroller.scrollLeft / maxScroll;
      const nextThumbWidth = Math.min(1, scroller.clientWidth / Math.max(scroller.scrollWidth, 1));

      setCanScrollPrev(scroller.scrollLeft > 4);
      setCanScrollNext(scroller.scrollLeft < maxScroll - 4);
      setProgress(Math.min(1, Math.max(0, nextProgress)));
      setThumbWidth(Math.max(0.14, nextThumbWidth));
    };

    updateScrollState();

    scroller.addEventListener("scroll", updateScrollState, { passive: true });

    let resizeObserver: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateScrollState);
      resizeObserver.observe(scroller);
    }

    window.addEventListener("resize", updateScrollState);

    return () => {
      scroller.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      resizeObserver?.disconnect();
    };
  }, []);

  function scrollByCard(direction: -1 | 1) {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const firstCard = scroller.querySelector<HTMLElement>("[data-journey-card]");
    const cardWidth = firstCard?.getBoundingClientRect().width ?? 352;

    scroller.scrollBy({
      left: direction * (cardWidth + JOURNEY_SCROLL_GAP),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    if (!scroller || event.pointerType === "touch") {
      return;
    }

    pointerStateRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      scrollLeft: scroller.scrollLeft,
    };

    scroller.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    const pointerState = pointerStateRef.current;

    if (!scroller || !pointerState) {
      return;
    }

    const deltaX = event.clientX - pointerState.startX;
    scroller.scrollLeft = pointerState.scrollLeft - deltaX;
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    if (scroller?.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId);
    }

    pointerStateRef.current = null;
    setIsDragging(false);
  }

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
      return;
    }

    if (scroller.scrollWidth <= scroller.clientWidth + 1) {
      return;
    }

    event.preventDefault();
    scroller.scrollLeft += event.deltaY;
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    }
  }

  const thumbTranslate = progress * (1 - thumbWidth);

  return (
    <section className="overflow-hidden border-b py-24 md:py-28" style={{ borderColor: BORDER, background: SOFT_BG }}>
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[34rem]">
            <Eyebrow>{copy.journeyLabel}</Eyebrow>
            <h2
              className={`font-[800] ${lang === "ko" ? "eruty-keep-all" : ""}`}
              style={{
                color: NEAR_BLACK,
                fontSize: "clamp(2.75rem, 4vw, 3.25rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.045em",
              }}
            >
              {copy.journeyHeadline}
            </h2>
          </div>

          <div className="max-w-[26rem] lg:text-right">
            <p
              className={`${lang === "ko" ? "eruty-keep-all" : ""}`}
              style={{
                color: BODY_TEXT,
                fontSize: "clamp(0.94rem, 1vw, 1rem)",
                lineHeight: 1.72,
              }}
            >
              {copy.journeyInstruction}
            </p>
            <div className="mt-5 flex items-center gap-4 lg:justify-end">
              <button
                type="button"
                data-journey-prev
                onClick={() => scrollByCard(-1)}
                disabled={!canScrollPrev}
                aria-label={copy.journeyPrev}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed"
                style={{
                  borderColor: canScrollPrev ? "rgba(24,25,27,0.14)" : "rgba(24,25,27,0.09)",
                  color: canScrollPrev ? NEAR_BLACK : "rgba(24,25,27,0.38)",
                  background: "#FFFFFF",
                }}
              >
                <ArrowLeft size={19} />
              </button>
              <button
                type="button"
                data-journey-next
                onClick={() => scrollByCard(1)}
                disabled={!canScrollNext}
                aria-label={copy.journeyNext}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border transition-colors disabled:cursor-not-allowed"
                style={{
                  borderColor: canScrollNext ? "rgba(24,25,27,0.14)" : "rgba(24,25,27,0.09)",
                  color: canScrollNext ? NEAR_BLACK : "rgba(24,25,27,0.38)",
                  background: "#FFFFFF",
                }}
              >
                <ArrowRight size={19} />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-11">
          <div
            ref={scrollerRef}
            data-journey-scroller
            role="region"
            aria-label={copy.journeyRegionLabel}
            tabIndex={0}
            className={`eruty-horizontal-scroll flex overflow-x-auto overflow-y-hidden pb-5 pt-1 ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{
              gap: `${JOURNEY_SCROLL_GAP}px`,
              scrollSnapType: "x mandatory",
              scrollPaddingLeft: "0px",
              paddingRight: "max(2rem, 4vw)",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onPointerLeave={(event) => {
              if (pointerStateRef.current) {
                handlePointerEnd(event);
              }
            }}
            onWheel={handleWheel}
            onKeyDown={handleKeyDown}
          >
            {JOURNEY_ENTRIES.map((entry) => (
              <JourneyCard key={entry.year} entry={entry} lang={lang} />
            ))}
          </div>
        </div>

        <div
          data-journey-progress-track
          className="relative mt-7 h-[2px] w-full overflow-hidden rounded-full"
          style={{ background: "rgba(24,25,27,0.10)" }}
        >
          <div
            data-journey-progress-thumb
            className="absolute left-0 top-0 h-full rounded-full"
            style={{
              width: `${thumbWidth * 100}%`,
              transform: `translateX(${thumbTranslate * 100}%)`,
              background: BLUE,
              transition: prefersReducedMotion ? "none" : "transform 180ms ease-out",
            }}
          />
        </div>

        <p
          className={`mt-8 text-center text-[1rem] font-medium ${lang === "ko" ? "eruty-keep-all" : ""}`}
          style={{ color: BODY_TEXT }}
        >
          <span style={{ color: BLUE }}>{copy.journeyTail}</span>
        </p>
      </div>
    </section>
  );
}

function CtaSection() {
  const { lang } = useLanguage();
  const copy = COPY[lang];

  return (
    <section className="pb-0 pt-0" style={{ background: "#FFFFFF" }}>
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8">
        <div
          className="relative overflow-hidden rounded-[2rem] px-8 py-12 md:px-10 md:py-14 lg:px-14 lg:py-16"
          style={{
            background:
              "radial-gradient(circle at 82% 26%, rgba(82,130,255,0.22), transparent 24%), linear-gradient(135deg, #07162E 0%, #081A37 52%, #091327 100%)",
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0))]" />
          <div className="absolute -right-24 bottom-[-42%] h-[26rem] w-[44rem] rounded-[50%] border border-white/10" />
          <div className="absolute -right-8 bottom-[-36%] h-[22rem] w-[38rem] rounded-[50%] border border-white/10" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black/18 to-transparent" />
          <div className="absolute right-[12%] top-[26%] h-2 w-2 rounded-full bg-white/55" />
          <div className="absolute right-[19%] top-[36%] h-[6px] w-[6px] rounded-full bg-[#96C4FF]/70" />
          <div className="absolute right-[24%] top-[49%] h-2 w-2 rounded-full bg-white/45" />
          <div className="absolute right-[30%] top-[40%] h-px w-[11%] rotate-[14deg] bg-white/14" />
          <div className="absolute right-[22%] top-[49%] h-px w-[10%] -rotate-[20deg] bg-white/12" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[36rem]">
              <h2
                className={`font-[800] ${lang === "ko" ? "eruty-keep-all" : ""}`}
                style={{
                  color: "#FFFFFF",
                  fontSize: "clamp(2.1rem, 3.4vw, 3.05rem)",
                  lineHeight: 1.14,
                  letterSpacing: "-0.042em",
                }}
              >
                {copy.ctaHeadline}
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                to={buildStartProjectHref("general", "partnership")}
                className="inline-flex min-h-[50px] items-center justify-center rounded-full px-7 text-[0.9rem] font-medium transition-colors"
                style={{ background: BLUE, color: "#FFFFFF" }}
              >
                {copy.ctaPrimary}
              </Link>
              <Link
                to={buildStartProjectHref("general", "general-inquiry")}
                className="inline-flex min-h-[50px] items-center justify-center rounded-full border px-7 text-[0.9rem] font-medium transition-colors"
                style={{ borderColor: "rgba(255,255,255,0.28)", color: "#FFFFFF" }}
              >
                {copy.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutPage() {
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

  return (
    <div className="overflow-hidden bg-white pt-16">
      <HeroSection />
      <IdentitySection />
      <BeginningSection />
      <JourneySection />
      <CtaSection />
    </div>
  );
}
