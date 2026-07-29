import { useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import { BLUE, DARK, GRAY, BORDER, LIGHT_BG, PROJECT_CATEGORIES_KO, PROJECT_CATEGORIES_EN, PROJECTS, STATUS_COLOR, T } from "../constants";

export function AXProjects() {
  const { lang } = useLanguage();
  const t = T[lang];
  const categories = lang === "ko" ? PROJECT_CATEGORIES_KO : PROJECT_CATEGORIES_EN;
  const [activeCatIdx, setActiveCatIdx] = useState(0);

  const filtered = activeCatIdx === 0
    ? PROJECTS
    : PROJECTS.filter((p) => p.categoryIdx === activeCatIdx);

  return (
    <section style={{ background: "#fff", borderBottom: `1px solid ${BORDER}` }}>
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "80px 32px" }}>
        <div className="mb-10">
          <div className="text-xs font-semibold mb-4" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: BLUE }}>
            {t.projectsLabel}
          </div>
          <h2
            className="font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: DARK, lineHeight: 1.25, whiteSpace: "pre-line" }}
          >
            {t.projectsHeading}
          </h2>
          <p className="text-sm max-w-lg" style={{ color: GRAY, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t.projectsDesc}
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-1.5 mb-8 overflow-x-auto">
          {categories.map((cat, idx) => (
            <button
              key={cat}
              className="flex-shrink-0 text-xs px-3.5 py-2 transition-all duration-150"
              style={{
                border: `1px solid ${activeCatIdx === idx ? DARK : BORDER}`,
                borderRadius: 3,
                color: activeCatIdx === idx ? DARK : GRAY,
                fontWeight: activeCatIdx === idx ? 600 : 400,
                background: "transparent",
                cursor: "pointer",
                minHeight: 36,
              }}
              onClick={() => setActiveCatIdx(idx)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project panels */}
        <div className="flex flex-col gap-4">
          {filtered.map((project) => (
            <div
              key={project.title}
              style={{ border: `1px solid ${BORDER}`, borderRadius: 6, overflow: "hidden" }}
            >
              <div className="flex flex-col md:flex-row">
                {/* Left: header */}
                <div
                  className="p-6 md:w-72 flex-shrink-0 flex flex-col justify-between"
                  style={{ background: LIGHT_BG, borderRight: `1px solid ${BORDER}` }}
                >
                  <div>
                    <div className="text-xs font-semibold mb-2" style={{ fontFamily: "var(--font-mono)", color: GRAY, fontSize: "0.58rem", letterSpacing: "0.08em" }}>
                      {lang === "ko" ? project.clientType : project.clientTypeEn}
                    </div>
                    <h3 className="text-base font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: DARK, lineHeight: 1.35, whiteSpace: "pre-line" }}>
                      {lang === "ko" ? project.title : project.titleEn}
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {(lang === "ko" ? project.tech : project.techEn).map((tl) => (
                        <span key={tl} className="text-xs px-2 py-0.5" style={{ border: `1px solid ${BORDER}`, borderRadius: 3, color: GRAY }}>
                          {tl}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className="text-xs font-semibold"
                      style={{ fontFamily: "var(--font-mono)", color: STATUS_COLOR[project.status], fontSize: "0.6rem" }}
                    >
                      {t.statusLabels[project.status] ?? project.status}
                    </span>
                    <span className="text-xs" style={{ color: "#C0C4CC", fontFamily: "var(--font-mono)", fontSize: "0.6rem" }}>
                      {t.exampleNote}
                    </span>
                  </div>
                </div>

                {/* Right: detail */}
                <div className="flex-1 p-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-0">
                    {[
                      { label: t.problemLabel, value: lang === "ko" ? project.problem : project.problemEn },
                      { label: t.roleLabel, value: lang === "ko" ? project.role : project.roleEn },
                      { label: t.systemLabel, value: lang === "ko" ? project.system : project.systemEn },
                    ].map((row) => (
                      <div key={row.label} className="py-3" style={{ borderBottom: `1px solid ${BORDER}` }}>
                        <div className="text-xs mb-1" style={{ color: GRAY }}>{row.label}</div>
                        <div className="text-sm" style={{ color: DARK }}>{row.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
