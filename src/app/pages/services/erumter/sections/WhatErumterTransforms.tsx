import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { BLUE, DARK, GRAY, BORDER, LIGHT_BG, T } from "../constants";

export function WhatErumterTransforms() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <section style={{ background: LIGHT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "80px 32px" }}>
        <div className="mb-12">
          <div className="text-xs font-semibold mb-4" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: BLUE }}>
            {t.transformLabel}
          </div>
          <h2
            className="font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: DARK, lineHeight: 1.25, whiteSpace: "pre-line" }}
          >
            {t.transformHeading}
          </h2>
          <p className="text-sm max-w-xl" style={{ color: GRAY, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t.transformDesc}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          {/* A — Work Transformation (45%) */}
          <div
            className="flex-1 p-8"
            style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 6 }}
          >
            <div className="text-xs font-semibold mb-2" style={{ fontFamily: "var(--font-mono)", color: BLUE, fontSize: "0.6rem", letterSpacing: "0.1em" }}>
              WORK TRANSFORMATION
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: DARK }}>
              {t.workHeading}
            </h3>
            <p className="text-sm mb-6" style={{ color: GRAY, lineHeight: 1.75, whiteSpace: "pre-line" }}>
              {t.workDesc}
            </p>

            {/* Mini workflow */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {["Manual Collection", "AI Processing", "Human Review ✓", "Automated Output"].map((n, i, arr) => (
                <div key={n} className="flex items-center gap-2">
                  <span
                    className="text-xs px-2.5 py-1"
                    style={{
                      border: `1px solid ${n.includes("✓") ? BLUE : i === 0 ? DARK : BORDER}`,
                      borderRadius: 3,
                      color: n.includes("✓") ? BLUE : i === 0 ? DARK : GRAY,
                      fontWeight: n.includes("✓") || i === 0 ? 600 : 400,
                      background: n.includes("✓") ? "rgba(55,55,242,0.05)" : i === 0 ? "rgba(24,25,27,0.04)" : "transparent",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {n}
                  </span>
                  {i < arr.length - 1 && <ArrowRight size={11} style={{ color: "#C8CBD2", flexShrink: 0 }} />}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {t.workTags.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1" style={{ border: `1px solid ${BORDER}`, borderRadius: 3, color: GRAY }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Right column: B + C stacked */}
          <div className="flex flex-col gap-4 md:w-80 flex-shrink-0">
            {/* B — Service Transformation (35%) */}
            <div className="flex-1 p-6" style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 6 }}>
              <div className="text-xs font-semibold mb-2" style={{ fontFamily: "var(--font-mono)", color: GRAY, fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                SERVICE TRANSFORMATION
              </div>
              <h3 className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: DARK }}>
                {t.serviceHeading}
              </h3>
              <p className="text-xs mb-4" style={{ color: GRAY, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {t.serviceDesc}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {t.serviceTags.map((s) => (
                  <span key={s} className="text-xs px-2 py-0.5" style={{ border: `1px solid ${BORDER}`, borderRadius: 3, color: GRAY }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* C — Organization Transformation (20%) */}
            <div className="p-6" style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 6 }}>
              <div className="text-xs font-semibold mb-2" style={{ fontFamily: "var(--font-mono)", color: GRAY, fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                ORGANIZATION TRANSFORMATION
              </div>
              <h3 className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: DARK }}>
                {t.orgHeading}
              </h3>
              <p className="text-xs mb-4" style={{ color: GRAY, lineHeight: 1.7, whiteSpace: "pre-line" }}>
                {t.orgDesc}
              </p>
              <div className="flex flex-col gap-1.5">
                {t.orgItems.map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: BORDER, flexShrink: 0 }} />
                    <span className="text-xs" style={{ color: GRAY }}>{s}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
                <div className="text-xs font-semibold" style={{ fontFamily: "var(--font-mono)", color: BLUE, fontSize: "0.6rem", letterSpacing: "0.1em" }}>
                  ERUMTER AX OPERATING SYSTEM
                </div>
                <p className="text-xs mt-1" style={{ color: GRAY }}>{t.orgNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
