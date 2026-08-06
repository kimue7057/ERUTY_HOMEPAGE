import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const T = {
  ko: {
    badge: "404",
    heading: "요청하신 페이지를 찾을 수 없습니다.",
    description:
      "주소가 변경되었거나 아직 배포되지 않은 페이지일 수 있습니다. 홈으로 이동하거나 프로젝트 문의 페이지로 이동해 주세요.",
    home: "홈으로 이동",
    startProject: "프로젝트 문의",
  },
  en: {
    badge: "404",
    heading: "We couldn't find that page.",
    description:
      "The address may have changed or the page may not be published yet. Head back home or move to the project inquiry page.",
    home: "Go Home",
    startProject: "Start a Project",
  },
};

export function NotFoundPage() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <section
      className="flex min-h-[calc(100vh-var(--eruty-header-height))] items-center"
      style={{ background: "#FFFFFF" }}
    >
      <div className="eruty-container flex flex-col gap-8 py-20">
        <div
          className="inline-flex w-fit items-center border px-3 py-1.5 text-xs uppercase tracking-[0.24em]"
          style={{ color: "#3737F2", borderColor: "rgba(55,55,242,0.25)" }}
        >
          {t.badge}
        </div>
        <div className="max-w-2xl">
          <h1 className="eruty-page-title mb-4" style={{ color: "#18191B" }}>
            {t.heading}
          </h1>
          <p
            style={{
              color: "#737780",
              fontSize: "1.3rem",
              lineHeight: 1.75,
              maxWidth: 680,
            }}
          >
            {t.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm"
            style={{ background: "#18191B", color: "#FFFFFF", fontWeight: 500 }}
          >
            {t.home}
          </Link>
          <Link
            to="/start-a-project"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm"
            style={{ border: "1px solid #E4E6EA", color: "#18191B", fontWeight: 500 }}
          >
            {t.startProject}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
