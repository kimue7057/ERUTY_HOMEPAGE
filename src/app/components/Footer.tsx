import { Link } from "react-router";
import { useLanguage } from "../context/LanguageContext";
import erutyLogo from "../../assets/brand/eruty-logo.png";

const BLUE = "#3737F2";
const NEAR_BLACK = "#18191B";

const T = {
  ko: {
    tagline: "콘텐츠, 인텔리전스, 시장을 연결하는 글로벌 비즈니스 & 기술 기업",
    sections: {
      "회사": [
        { label: "이루티 소개", to: "/company/about" },
        { label: "팀 & 리더십", to: "/company/team" },
        { label: "프로젝트", to: "/company/growth" },
        { label: "채용", to: "/company/careers" },
      ],
      "서비스": [
        { label: "콘텐츠 투자", to: "/services/hitpick" },
        { label: "글로벌 배급", to: "/services/hitpick" },
        { label: "IP & 라이선싱", to: "/services/hitpick" },
        { label: "브랜드 협업", to: "/services/hitpick" },
        { label: "AX 교육", to: "/services/erumter" },
        { label: "AI 개발", to: "/services/erumter" },
      ],
      "기술": [
        { label: "AI & 데이터", to: "/technology" },
        { label: "자동화", to: "/technology" },
        { label: "블록체인 & 권리", to: "/technology" },
        { label: "소프트웨어 엔지니어링", to: "/technology" },
        { label: "R&D", to: "/technology" },
      ],
      "리소스": [
        { label: "사례 연구", to: "/resources" },
        { label: "프로젝트 & 기회", to: "/resources" },
        { label: "인사이트 & 리포트", to: "/resources" },
        { label: "프로그램 & 이벤트", to: "/resources" },
        { label: "뉴스룸", to: "/resources" },
        { label: "자료 다운로드", to: "/resources" },
      ],
    },
    contact: "연락처",
    email: "이메일",
    hq: "본사",
    hqVal: "부산광역시 남구 문현금융로 40, 21층 6호",
    branch: "서울지사",
    branchVal: "서울특별시 영등포구 의사당대로 83, 오투타워 6층 서울핀테크랩",
    startProject: "프로젝트 시작",
    copyright: "© 2026 주식회사 이루티. All rights reserved.",
    privacy: "개인정보처리방침",
    terms: "이용약관",
    cookies: "쿠키 설정",
    bottomTag: "글로벌 콘텐츠 비즈니스 · AX 전환",
  },
  en: {
    tagline: "A global business & technology company connecting content, intelligence, and markets",
    sections: {
      "Company": [
        { label: "About ERUTY", to: "/company/about" },
        { label: "Team & Leadership", to: "/company/team" },
        { label: "Projects", to: "/company/growth" },
        { label: "Careers", to: "/company/careers" },
      ],
      "Services": [
        { label: "Content Investment", to: "/services/hitpick" },
        { label: "Global Distribution", to: "/services/hitpick" },
        { label: "IP & Licensing", to: "/services/hitpick" },
        { label: "Brand Collaboration", to: "/services/hitpick" },
        { label: "AX Education", to: "/services/erumter" },
        { label: "AI Development", to: "/services/erumter" },
      ],
      "Technology": [
        { label: "AI & Data", to: "/technology" },
        { label: "Automation", to: "/technology" },
        { label: "Blockchain & Rights", to: "/technology" },
        { label: "Software Engineering", to: "/technology" },
        { label: "R&D", to: "/technology" },
      ],
      "Resources": [
        { label: "Case Studies", to: "/resources" },
        { label: "Projects & Opportunities", to: "/resources" },
        { label: "Insights & Reports", to: "/resources" },
        { label: "Programs & Events", to: "/resources" },
        { label: "Newsroom", to: "/resources" },
        { label: "Downloads", to: "/resources" },
      ],
    },
    contact: "Contact",
    email: "Email",
    hq: "Headquarters",
    hqVal: "21F, Suite 6, 40 Munhyeongeumyung-ro, Nam-gu, Busan, Republic of Korea",
    branch: "Seoul Office",
    branchVal: "6F, O2 Tower, 83 Uisadang-daero, Yeongdeungpo-gu, Seoul\nSeoul Fintech Lab",
    startProject: "Start a Project",
    copyright: "© 2026 ERUTY Co., Ltd. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    cookies: "Cookie Settings",
    bottomTag: "Global Content Business · AX Transformation",
  },
};

export function Footer() {
  const { lang, setLang } = useLanguage();
  const t = T[lang];

  return (
    <footer style={{ background: NEAR_BLACK }}>
      <div className="mx-auto px-8 pt-16 pb-8" style={{ maxWidth: 1280 }}>
        {/* 상단 */}
        <div className="grid grid-cols-12 gap-8 pb-14" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          {/* 브랜드 */}
          <div className="col-span-12 lg:col-span-3">
            <div className="mb-5">
              <img src={erutyLogo} alt="eruty" style={{ height: 24, width: "auto", filter: "invert(1) brightness(2)" }} />
            </div>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: 220 }}>
              {t.tagline}
            </p>
            <div className="flex items-center gap-3 text-xs" style={{ color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)" }}>
              <button
                className="transition-colors"
                style={{ color: lang === "ko" ? "#FFFFFF" : "rgba(255,255,255,0.3)", fontWeight: lang === "ko" ? 600 : 400, background: "transparent" }}
                onClick={() => setLang("ko")}
              >
                한국어
              </button>
              <span style={{ color: "rgba(255,255,255,0.15)" }}>|</span>
              <button
                className="transition-colors"
                style={{ color: lang === "en" ? "#FFFFFF" : "rgba(255,255,255,0.3)", fontWeight: lang === "en" ? 600 : 400, background: "transparent" }}
                onClick={() => setLang("en")}
              >
                English
              </button>
            </div>
          </div>

          {/* 링크 */}
          <div className="col-span-12 lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(t.sections).map(([category, items]) => (
              <div key={category}>
                <div className="text-xs mb-4 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}>
                  {category}
                </div>
                <ul className="flex flex-col gap-2">
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link
                        to={item.to}
                        className="text-sm transition-colors duration-150"
                        style={{ color: "rgba(255,255,255,0.45)" }}
                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#FFFFFF")}
                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.45)")}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* 연락처 */}
          <div className="col-span-12 lg:col-span-3">
            <div className="text-xs mb-4 tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-mono)" }}>
              {t.contact}
            </div>
            <div className="flex flex-col gap-3 text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
              <div>
                <div className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>{t.email}</div>
                <a href="mailto:contact@eruty.co.kr" className="hover:text-white transition-colors">contact@eruty.co.kr</a>
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>{t.hq}</div>
                <span style={{ whiteSpace: "pre-line" }}>{t.hqVal}</span>
              </div>
              <div>
                <div className="text-xs mb-0.5" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-mono)" }}>{t.branch}</div>
                <span style={{ whiteSpace: "pre-line" }}>{t.branchVal}</span>
              </div>
            </div>
            <Link
              to="/start-a-project"
              className="inline-flex mt-6 px-5 py-2.5 text-sm transition-all duration-200"
              style={{ background: BLUE, color: "#FFFFFF", fontFamily: "var(--font-body)", fontWeight: 500, borderRadius: 4 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#2828d4")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = BLUE)}
            >
              {t.startProject}
            </Link>
          </div>
        </div>

        {/* 하단 */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-8">
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-body)" }}>
            {t.copyright}
          </div>
          {/* Policy pages not yet published — shown as disabled until live URLs are available */}
          <div className="flex items-center gap-5 text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>
            <span style={{ cursor: "default" }}>{t.privacy}</span>
            <span style={{ cursor: "default" }}>{t.terms}</span>
            <span style={{ cursor: "default" }}>{t.cookies}</span>
          </div>
          <div className="text-xs" style={{ color: "rgba(255,255,255,0.15)", fontFamily: "var(--font-mono)" }}>
            {t.bottomTag}
          </div>
        </div>
      </div>
    </footer>
  );
}
