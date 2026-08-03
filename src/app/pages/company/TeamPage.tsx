import { useRef, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { type Lang, useLanguage } from "../../context/LanguageContext";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";
const BODY_TEXT = "#333438";
const MUTED = "#737780";
const BORDER = "#E4E6EA";
const SOFT_BG = "#F5F6F8";
const TEAM_HERO_IMAGE = "/images/company/team/team-leadership-hero.webp";

type LeaderId = "kim-yusung" | "park-sangil" | "lee-kihong" | "kim-jinhyuk";

type LocalizedText = Record<Lang, string>;
type LocalizedList = Record<Lang, string[]>;

type LeaderProfile = {
  id: LeaderId;
  name: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  intro: LocalizedText;
  focusAreas: LocalizedList;
  keyScope: LocalizedList;
};

type WorkPillar = {
  id: string;
  number: string;
  title: LocalizedText;
  desc: LocalizedText;
  tags: LocalizedList;
};

type ProfileImage = {
  src: string;
  alt: LocalizedText;
  objectPosition?: string;
};

const PROFILE_IMAGE_BY_ID: Partial<Record<LeaderId, ProfileImage>> = {
  "kim-yusung": {
    src: "https://www.eruty.co.kr/images/common/ceo.png",
    alt: { ko: "김유성 대표이사 프로필 사진", en: "Profile photo of CEO Kim Yusung" },
    objectPosition: "center top",
  },
  "park-sangil": {
    src: "https://www.eruty.co.kr/images/common/coo.png",
    alt: { ko: "박상일 부대표 프로필 사진", en: "Profile photo of Vice President Park Sangil" },
    objectPosition: "center top",
  },
  "kim-jinhyuk": {
    src: "/images/company/team/kim-jinhyuk-director.jpg",
    alt: { ko: "김진혁 이사 프로필 사진", en: "Profile photo of Director Kim Jinhyuk" },
    objectPosition: "center top",
  },
};

const LEADERS: LeaderProfile[] = [
  {
    id: "kim-yusung",
    name: { ko: "김유성", en: "김유성" },
    title: { ko: "대표이사 / CEO", en: "CEO" },
    summary: {
      ko: "회사의 경영과 글로벌 사업 전략을 총괄합니다.",
      en: "Leads the company's management and global business strategy.",
    },
    intro: {
      ko: "ERUTY의 경영 전반과 글로벌 사업 방향을 이끌며, 시장과 파트너십이 실제 실행으로 이어지는 구조를 설계합니다.",
      en: "Leads ERUTY's overall management and global business direction, designing structures that turn markets and partnerships into execution.",
    },
    focusAreas: {
      ko: ["회사 경영", "글로벌 사업 전략", "시장·파트너 구조 설계"],
      en: ["Company management", "Global business strategy", "Market and partner structure design"],
    },
    keyScope: {
      ko: [
        "창업 성장기술개발사업 R&D 사업 수주",
        "블록체인 기술 사업화 지원 사업 수주",
        "블록체인 기반 저작권 관리 기술 특허 개발 및 등록",
        "메타오션 창업팀 대표 (2019~2022)",
      ],
      en: [
        "Won an R&D project under the Startup Growth Technology Development Program",
        "Won a project supporting blockchain technology commercialization",
        "Developed and registered a patent for blockchain-based copyright management technology",
        "Head of the founding team, Metaocean (2019-2022)",
      ],
    },
  },
  {
    id: "park-sangil",
    name: { ko: "박상일", en: "박상일" },
    title: { ko: "부대표 / COO & CBO", en: "Vice President / COO & CBO" },
    summary: {
      ko: "기업 운영, 사업 전략과 글로벌 성장을 총괄합니다.",
      en: "Leads corporate operations, business strategy, and global growth.",
    },
    intro: {
      ko: "기업 운영과 사업 실행 구조를 정리하고, 글로벌 확장을 위한 운영 리듬과 비즈니스 실행을 함께 조율합니다.",
      en: "Aligns corporate operations and business execution, coordinating the operating rhythm and business delivery required for global expansion.",
    },
    focusAreas: {
      ko: ["운영 구조 설계", "사업 전략 실행", "글로벌 성장 운영"],
      en: ["Operating structure design", "Business strategy execution", "Global growth operations"],
    },
    keyScope: {
      ko: [
        "에이트원 부사장 — 토큰증권(STO) 기반 금융 신사업 총괄",
        "카사코리아(Casa Korea) COO — 국내 최초 디지털 수익증권(DABS) 시스템 운영",
        "한국투자공사(KIC) 경영기획실 수석부장 — 대외협력·지배구조·투자운용 전략 총괄",
      ],
      en: [
        "Vice President, EightOne — Led new financial initiatives based on Security Token Offerings (STO)",
        "COO, Casa Korea — Operated DABS, Korea's first digital revenue securities system",
        "Senior Director, Management Planning Office, Korea Investment Corporation (KIC) — Oversaw external relations, governance, and investment strategy",
      ],
    },
  },
  {
    id: "kim-jinhyuk",
    name: { ko: "김진혁", en: "김진혁" },
    title: { ko: "개발 총괄 이사", en: "Director of Engineering" },
    summary: {
      ko: "AI·소프트웨어 개발 조직과 프로젝트 기술 실행을 총괄합니다.",
      en: "Leads AI and software engineering execution across the organization.",
    },
    intro: {
      ko: "제품 개발과 엔지니어링 실행을 연결하며, 프로젝트 요구사항이 실제 서비스와 운영 시스템으로 구현되도록 이끕니다.",
      en: "Connects product development and engineering execution, ensuring project requirements become real services and operating systems.",
    },
    focusAreas: {
      ko: ["제품 엔지니어링", "기술 실행 리드", "서비스 구현 및 운영"],
      en: ["Product engineering", "Technical execution leadership", "Service implementation and operations"],
    },
    keyScope: {
      ko: ["개발 총괄 이사", "AI·소프트웨어 개발 조직 총괄", "프로젝트 기술 실행 리드"],
      en: ["Director of Engineering", "AI and software engineering leadership", "Project technical execution lead"],
    },
  },
  {
    id: "lee-kihong",
    name: { ko: "이기홍 박사", en: "이기홍 박사" },
    title: { ko: "기업부설연구소장 / AI·데이터 연구개발 총괄", en: "Head of Corporate R&D Center / AI & Data R&D Lead" },
    summary: {
      ko: "기업부설연구소와 AI·데이터 연구개발을 총괄합니다.",
      en: "Leads the corporate R&D center and AI/data research and development.",
    },
    intro: {
      ko: "기업부설연구소를 중심으로 AI·데이터 연구개발 방향을 이끌며, 사업과 제품에 필요한 기술 기반을 설계합니다.",
      en: "Leads AI and data R&D through the corporate research center, shaping the technical foundation needed for business and product delivery.",
    },
    focusAreas: {
      ko: ["AI·데이터 연구개발", "기업부설연구소 운영", "기술 방향 설계"],
      en: ["AI and data R&D", "Corporate research center leadership", "Technology direction design"],
    },
    keyScope: {
      ko: ["기업부설연구소장", "AI·데이터 연구개발 총괄", "연구 기반 기술 전략 리드"],
      en: ["Head of Corporate R&D Center", "AI and data R&D leadership", "Research-driven technology strategy lead"],
    },
  },
];

const HOW_WE_WORK_PILLARS: WorkPillar[] = [
  {
    id: "global-business",
    number: "01",
    title: { ko: "Global Business", en: "Global Business" },
    desc: {
      ko: "시장 진입 전략, 파트너십, 사업 구조를 설계해 실행 가능한 글로벌 비즈니스 흐름을 만듭니다.",
      en: "Builds execution-ready global business flows through market entry strategy, partnerships, and business structure design.",
    },
    tags: {
      ko: ["시장 전략", "파트너십", "사업 구조"],
      en: ["Market strategy", "Partnerships", "Business structure"],
    },
  },
  {
    id: "ai-data",
    number: "02",
    title: { ko: "AI & Data", en: "AI & Data" },
    desc: {
      ko: "데이터 분석과 AI 구조 설계를 통해 의사결정과 서비스 고도화에 필요한 인텔리전스를 제공합니다.",
      en: "Provides the intelligence needed for decision-making and service improvement through data analysis and AI system design.",
    },
    tags: {
      ko: ["데이터 분석", "AI 구조", "운영 인텔리전스"],
      en: ["Data analysis", "AI systems", "Operational intelligence"],
    },
  },
  {
    id: "product-engineering",
    number: "03",
    title: { ko: "Product & Engineering", en: "Product & Engineering" },
    desc: {
      ko: "제품 설계, 엔지니어링, 운영 구현을 연결해 팀의 전략이 실제 서비스로 동작하도록 만듭니다.",
      en: "Connects product design, engineering, and operational delivery so the team's strategy works as a real service.",
    },
    tags: {
      ko: ["제품 설계", "엔지니어링", "운영 구현"],
      en: ["Product design", "Engineering", "Operational delivery"],
    },
  },
];

const TEXT = {
  ko: {
    heroLabel: "TEAM & LEADERSHIP",
    heroHeadline: "글로벌 사업과 기술 실행을\n하나의 팀 구조로 연결합니다.",
    heroDesc:
      "ERUTY의 Team & Leadership은 글로벌 사업, AI·데이터, 제품 엔지니어링이 한 흐름으로 움직이도록 설계되어 있습니다. 전략을 정리하고, 기술을 만들고, 실제 운영까지 이어지는 실행 중심 팀 구조를 지향합니다.",
    heroHighlights: ["글로벌 사업", "AI·데이터", "제품 엔지니어링", "실행 중심 팀"],
    heroImageAlt: "ERUTY 팀이 회의실에서 사업과 기술 전략을 논의하는 모습",
    leadershipLabel: "Leadership",
    leadershipHeadline: "사업과 기술 실행을 이끄는 리더십",
    leadershipDesc:
      "공개된 네 명의 리더십은 사업 전략, 운영, 연구개발, 제품 엔지니어링을 각각 맡으며 하나의 실행 구조로 협업합니다.",
    leadershipProfileLabel: "Leadership Profile",
    focusAreasLabel: "담당 영역",
    keyScopeLabel: "주요 경력",
    imageFallbackLabel: "프로필 이미지 준비 중",
    howWorkLabel: "How We Work",
    howWorkHeadline: "세 개의 핵심 축이\n하나의 실행 구조로 움직입니다.",
    howWorkDesc:
      "ERUTY 팀은 역할을 분리해 넘기기보다, 글로벌 사업과 AI·데이터, 제품 엔지니어링이 프로젝트 요구에 맞춰 함께 움직입니다.",
    ctaHeadline: "이루티와 함께\n다음 실행 구조를 설계하세요.",
    ctaBtn1: "채용 보기",
    ctaBtn2: "회사 소개 보기",
  },
  en: {
    heroLabel: "TEAM & LEADERSHIP",
    heroHeadline: "One team structure\nfor global business and technical execution.",
    heroDesc:
      "ERUTY's Team & Leadership is built so global business, AI and data, and product engineering move in one flow. We aim for an execution-centered structure that turns strategy into technology and operations.",
    heroHighlights: ["Global Business", "AI & Data", "Product Engineering", "Execution-Centered Team"],
    heroImageAlt: "ERUTY team collaborating on business and technology strategy",
    leadershipLabel: "Leadership",
    leadershipHeadline: "Leadership guiding business and technical execution",
    leadershipDesc:
      "The four public leadership profiles cover business strategy, operations, R&D, and product engineering while working as one execution structure.",
    leadershipProfileLabel: "Leadership Profile",
    focusAreasLabel: "Focus Areas",
    keyScopeLabel: "Career Highlights",
    imageFallbackLabel: "Profile image coming soon",
    howWorkLabel: "How We Work",
    howWorkHeadline: "Three core pillars,\none execution structure.",
    howWorkDesc:
      "Rather than handing work off between functions, ERUTY brings global business, AI and data, and product engineering together around what the project needs.",
    ctaHeadline: "Design the next execution structure\nwith ERUTY.",
    ctaBtn1: "View Careers",
    ctaBtn2: "View Company Overview",
  },
} as const;

function getProfileImage(personId: LeaderId) {
  return PROFILE_IMAGE_BY_ID[personId];
}

function getInitials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

function LeaderCardPortrait({ leaderId, name, lang }: { leaderId: LeaderId; name: string; lang: Lang }) {
  const image = getProfileImage(leaderId);

  if (image) {
    return (
      <div
        style={{
          width: 88,
          minWidth: 88,
          aspectRatio: "4 / 5",
          borderRadius: 18,
          overflow: "hidden",
          background: SOFT_BG,
          border: `1px solid ${BORDER}`,
        }}
      >
        <img
          src={image.src}
          alt={image.alt[lang] || name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: image.objectPosition || "center",
            display: "block",
          }}
        />
      </div>
    );
  }

  return (
    <div
      className="inline-flex items-center justify-center"
      style={{
        width: 88,
        minWidth: 88,
        aspectRatio: "4 / 5",
        borderRadius: 18,
        border: `1px solid ${BLUE}24`,
        background: "linear-gradient(180deg, #F8F9FF 0%, #EEF1FF 100%)",
        color: BLUE,
        fontFamily: "var(--font-display)",
        fontWeight: 800,
        fontSize: "1.1rem",
      }}
    >
      {getInitials(name)}
    </div>
  );
}

function LeaderDetailMedia({ leaderId, name, lang, fallbackLabel }: { leaderId: LeaderId; name: string; lang: Lang; fallbackLabel: string }) {
  const image = getProfileImage(leaderId);

  if (image) {
    return (
      <img
        src={image.src}
        alt={image.alt[lang] || name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: image.objectPosition || "center",
          display: "block",
        }}
      />
    );
  }

  return (
    <div
      className="h-full w-full flex flex-col items-center justify-center gap-4"
      style={{
        background: "linear-gradient(180deg, #F7F8FD 0%, #EEF2FF 100%)",
        color: BLUE,
        padding: 32,
      }}
    >
      <div
        className="inline-flex items-center justify-center"
        style={{
          width: 108,
          height: 108,
          borderRadius: 28,
          background: "#FFFFFF",
          border: `1px solid ${BLUE}22`,
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "2rem",
        }}
      >
        {getInitials(name)}
      </div>
      <div className="text-center" style={{ color: MUTED, fontSize: "0.86rem", lineHeight: 1.7, fontFamily: "var(--font-mono)" }}>
        {fallbackLabel}
      </div>
    </div>
  );
}

function SectionIntro({ label, title, desc }: { label: string; title: string; desc: string }) {
  return (
    <div className="flex flex-col gap-4 max-w-[760px]">
      <div className="text-xs tracking-[0.24em] uppercase" style={{ color: BLUE, fontFamily: "var(--font-mono)" }}>
        {label}
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(1.9rem, 3vw, 3rem)",
          lineHeight: 1.08,
          letterSpacing: "-0.03em",
          color: NEAR_BLACK,
          whiteSpace: "pre-line",
        }}
      >
        {title}
      </h2>
      <p style={{ color: BODY_TEXT, fontSize: "1rem", lineHeight: 1.82, maxWidth: 720 }}>{desc}</p>
    </div>
  );
}

function HeroSection() {
  const { lang } = useLanguage();
  const t = TEXT[lang];

  return (
    <section data-team-hero style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 pt-24 sm:pt-28 pb-18 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5 flex flex-col gap-7">
            <div
              className="inline-flex w-fit items-center px-3 py-1.5 text-xs tracking-[0.24em] uppercase"
              style={{
                color: BLUE,
                border: `1px solid ${BLUE}2B`,
                borderRadius: 999,
                fontFamily: "var(--font-mono)",
              }}
            >
              {t.heroLabel}
            </div>

            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2.5rem, 5vw, 4.6rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                color: NEAR_BLACK,
                whiteSpace: "pre-line",
              }}
            >
              {t.heroHeadline}
            </h1>

            <p style={{ color: BODY_TEXT, fontSize: "1rem", lineHeight: 1.86, maxWidth: 580 }}>{t.heroDesc}</p>

            <div className="flex flex-wrap gap-2.5">
              {t.heroHighlights.map((item) => (
                <span
                  key={item}
                  className="px-3.5 py-2 text-sm"
                  style={{
                    borderRadius: 999,
                    background: "#F7F8FC",
                    border: `1px solid ${BORDER}`,
                    color: NEAR_BLACK,
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div
              style={{
                borderRadius: 32,
                overflow: "hidden",
                border: `1px solid ${BORDER}`,
                boxShadow: "0 24px 64px rgba(17, 24, 39, 0.06)",
                background: "#F7F8FA",
              }}
            >
              <img
                src={TEAM_HERO_IMAGE}
                alt={t.heroImageAlt}
                style={{
                  width: "100%",
                  display: "block",
                  aspectRatio: "5 / 4",
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function LeadershipSection() {
  const { lang } = useLanguage();
  const t = TEXT[lang];
  const [activeIdx, setActiveIdx] = useState(0);
  const detailRef = useRef<HTMLDivElement | null>(null);
  const leader = LEADERS[activeIdx];

  const handleLeaderSelect = (index: number) => {
    setActiveIdx(index);

    if (typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)").matches) {
      window.requestAnimationFrame(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  };

  return (
    <section data-team-leadership style={{ background: SOFT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-18 sm:py-20">
        <SectionIntro label={t.leadershipLabel} title={t.leadershipHeadline} desc={t.leadershipDesc} />

        <div ref={detailRef} className="mt-10 sm:mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={leader.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22 }}
              className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden"
              style={{
                background: "#FFFFFF",
                border: `1px solid ${BORDER}`,
                borderRadius: 30,
                boxShadow: "0 20px 48px rgba(17, 24, 39, 0.05)",
              }}
            >
              <div className="lg:col-span-4" style={{ minHeight: 280 }}>
                <LeaderDetailMedia
                  leaderId={leader.id}
                  name={leader.name[lang]}
                  lang={lang}
                  fallbackLabel={t.imageFallbackLabel}
                />
              </div>

              <div className="lg:col-span-8 p-6 sm:p-8 lg:p-10 flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <div className="text-xs tracking-[0.24em] uppercase" style={{ color: BLUE, fontFamily: "var(--font-mono)" }}>
                    {t.leadershipProfileLabel}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 800,
                        fontSize: "clamp(1.8rem, 2.2vw, 2.7rem)",
                        lineHeight: 1.05,
                        letterSpacing: "-0.03em",
                        color: NEAR_BLACK,
                      }}
                    >
                      {leader.name[lang]}
                    </h3>
                    <p style={{ color: BLUE, fontSize: "0.95rem", lineHeight: 1.6, fontFamily: "var(--font-mono)" }}>{leader.title[lang]}</p>
                    <p style={{ color: BODY_TEXT, fontSize: "1rem", lineHeight: 1.84 }}>{leader.intro[lang]}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-6" style={{ borderTop: `1px solid ${BORDER}` }}>
                  <div className="flex flex-col gap-4">
                    <div className="text-xs tracking-[0.22em] uppercase" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>
                      {t.focusAreasLabel}
                    </div>
                    <div className="flex flex-col gap-3">
                      {leader.focusAreas[lang].map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-2" style={{ background: BLUE, flexShrink: 0 }} />
                          <p style={{ color: BODY_TEXT, fontSize: "0.97rem", lineHeight: 1.72 }}>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="text-xs tracking-[0.22em] uppercase" style={{ color: MUTED, fontFamily: "var(--font-mono)" }}>
                      {t.keyScopeLabel}
                    </div>
                    <div className="flex flex-col gap-3">
                      {leader.keyScope[lang].map((item) => (
                        <div key={item} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full mt-2" style={{ background: BORDER, flexShrink: 0 }} />
                          <p style={{ color: BODY_TEXT, fontSize: "0.97rem", lineHeight: 1.72 }}>{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {LEADERS.map((item, index) => {
            const isActive = index === activeIdx;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleLeaderSelect(index)}
                className="w-full text-left p-5 sm:p-6 transition-all"
                style={{
                  background: isActive ? "#FFFFFF" : "#FCFDFF",
                  border: `1px solid ${isActive ? BLUE : BORDER}`,
                  borderRadius: 24,
                  boxShadow: isActive ? "0 14px 28px rgba(55, 55, 242, 0.08)" : "none",
                }}
              >
                <div className="flex items-start gap-4">
                  <LeaderCardPortrait leaderId={item.id} name={item.name[lang]} lang={lang} />

                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                      <div
                        style={{
                          fontFamily: "var(--font-display)",
                          fontWeight: 700,
                          fontSize: "1.08rem",
                          color: NEAR_BLACK,
                          lineHeight: 1.2,
                        }}
                      >
                        {item.name[lang]}
                      </div>
                      <div
                        style={{
                          color: isActive ? BLUE : MUTED,
                          fontFamily: "var(--font-mono)",
                          fontSize: "0.78rem",
                          lineHeight: 1.5,
                        }}
                      >
                        {item.title[lang]}
                      </div>
                    </div>

                    <p style={{ color: BODY_TEXT, fontSize: "0.94rem", lineHeight: 1.72 }}>{item.summary[lang]}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HowWeWorkSection() {
  const { lang } = useLanguage();
  const t = TEXT[lang];

  return (
    <section data-team-how-we-work style={{ background: "#FFFFFF", borderBottom: `1px solid ${BORDER}` }}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 py-18 sm:py-20">
        <SectionIntro label={t.howWorkLabel} title={t.howWorkHeadline} desc={t.howWorkDesc} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5 mt-10 sm:mt-12">
          {HOW_WE_WORK_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="h-full p-6 sm:p-7"
              style={{
                background: SOFT_BG,
                border: `1px solid ${BORDER}`,
                borderRadius: 28,
              }}
            >
              <div className="flex flex-col gap-5 h-full">
                <div className="flex items-center justify-between gap-4">
                  <span style={{ color: BLUE, fontFamily: "var(--font-mono)", fontSize: "0.8rem", fontWeight: 600 }}>{pillar.number}</span>
                </div>

                <div className="flex flex-col gap-3">
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 700,
                      fontSize: "1.3rem",
                      lineHeight: 1.15,
                      color: NEAR_BLACK,
                    }}
                  >
                    {pillar.title[lang]}
                  </h3>
                  <p style={{ color: BODY_TEXT, fontSize: "0.97rem", lineHeight: 1.8 }}>{pillar.desc[lang]}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-auto pt-3">
                  {pillar.tags[lang].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 text-xs"
                      style={{
                        borderRadius: 999,
                        background: "#FFFFFF",
                        border: `1px solid ${BORDER}`,
                        color: MUTED,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const { lang } = useLanguage();
  const t = TEXT[lang];

  return (
    <section className="py-24 sm:py-28" style={{ background: NEAR_BLACK }}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end">
          <div className="lg:col-span-7">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.08,
                color: "#FFFFFF",
                letterSpacing: "-0.025em",
                whiteSpace: "pre-line",
              }}
            >
              {t.ctaHeadline}
            </h2>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row gap-3 lg:justify-end lg:pb-1">
            <Link
              to="/company/careers"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm transition-all"
              style={{ background: BLUE, color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              {t.ctaBtn1} <ArrowUpRight size={14} />
            </Link>
            <Link
              to="/company/about"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 text-sm transition-all"
              style={{ border: "1px solid rgba(255,255,255,0.2)", color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500 }}
            >
              {t.ctaBtn2}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function TeamPage() {
  return (
    <div className="pt-16" style={{ background: "#FFFFFF" }}>
      <HeroSection />
      <LeadershipSection />
      <HowWeWorkSection />
      <CtaSection />
    </div>
  );
}
