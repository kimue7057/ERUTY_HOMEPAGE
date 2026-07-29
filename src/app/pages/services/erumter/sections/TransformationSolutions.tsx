import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { BLUE, DARK, GRAY, BORDER, LIGHT_BG, T } from "../constants";

export function TransformationSolutions() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <section style={{ background: LIGHT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "80px 32px" }}>
        <div className="mb-12">
          <div className="text-xs font-semibold mb-4" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: BLUE }}>
            {t.solutionsLabel}
          </div>
          <h2
            className="font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: DARK, lineHeight: 1.25, whiteSpace: "pre-line" }}
          >
            {t.solutionsHeading}
          </h2>
          <p className="text-sm max-w-xl" style={{ color: GRAY, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t.solutionsDesc}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          {/* A — Workflow Automation ~40% */}
          <div className="flex-1 p-8" style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 6 }}>
            <div className="text-xs font-semibold mb-2" style={{ fontFamily: "var(--font-mono)", color: BLUE, fontSize: "0.6rem", letterSpacing: "0.1em" }}>
              WORKFLOW AUTOMATION & AI AGENTS
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: DARK }}>
              {t.autoHeading}
            </h3>
            <p className="text-sm mb-6" style={{ color: GRAY, lineHeight: 1.75, whiteSpace: "pre-line" }}>
              {t.autoDesc}
            </p>
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {["Trigger", "Data Collection", "AI Task", "Human Approval ✓", "Delivery", "Record"].map((n, i, arr) => (
                <div key={n} className="flex items-center gap-1.5">
                  <span
                    className="text-xs px-2 py-1"
                    style={{
                      border: `1px solid ${n.includes("✓") ? BLUE : BORDER}`,
                      borderRadius: 3,
                      color: n.includes("✓") ? BLUE : GRAY,
                      fontWeight: n.includes("✓") ? 600 : 400,
                      background: n.includes("✓") ? "rgba(55,55,242,0.05)" : "transparent",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {n}
                  </span>
                  {i < arr.length - 1 && <ArrowRight size={10} style={{ color: "#C8CBD2", flexShrink: 0 }} />}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {t.autoTags.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1" style={{ border: `1px solid ${BORDER}`, borderRadius: 3, color: GRAY }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* B — AI Product ~40% */}
          <div className="flex-1 p-8" style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 6 }}>
            <div className="text-xs font-semibold mb-2" style={{ fontFamily: "var(--font-mono)", color: GRAY, fontSize: "0.6rem", letterSpacing: "0.1em" }}>
              AI PRODUCT & SYSTEM
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: DARK }}>
              {t.aiProdHeading}
            </h3>
            <p className="text-sm mb-6" style={{ color: GRAY, lineHeight: 1.75, whiteSpace: "pre-line" }}>
              {t.aiProdDesc}
            </p>
            {/* Stack visual */}
            <div className="flex flex-col gap-1.5 mb-6 max-w-xs">
              {[
                { label: "Customer Interface", accent: false },
                { label: "AI Function", accent: true },
                { label: "Business Data", accent: false },
                { label: "Admin Console", accent: false },
              ].map((layer, i) => (
                <div key={layer.label} className="flex items-center gap-2">
                  <div
                    className="text-xs px-3 py-2 flex-1"
                    style={{
                      border: `1px solid ${layer.accent ? BLUE : BORDER}`,
                      borderRadius: 3,
                      color: layer.accent ? BLUE : DARK,
                      fontWeight: layer.accent ? 600 : 400,
                      background: layer.accent ? "rgba(55,55,242,0.05)" : "transparent",
                    }}
                  >
                    {layer.label}
                  </div>
                  {i < 3 && <div style={{ width: 1, height: 1 }} />}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {t.aiProdTags.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1" style={{ border: `1px solid ${BORDER}`, borderRadius: 3, color: GRAY }}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* C — AX Enablement ~20% */}
          <div className="w-full md:w-64 flex-shrink-0 p-6 flex flex-col" style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 6 }}>
            <div className="text-xs font-semibold mb-2" style={{ fontFamily: "var(--font-mono)", color: GRAY, fontSize: "0.6rem", letterSpacing: "0.1em" }}>
              AX ENABLEMENT
            </div>
            <h3 className="text-base font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: DARK }}>
              {t.educationHeading}
            </h3>
            <p className="text-xs mb-4" style={{ color: GRAY, lineHeight: 1.7, whiteSpace: "pre-line" }}>
              {t.educationDesc}
            </p>
            <div className="flex flex-col gap-2">
              {t.educationItems.map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: BORDER, flexShrink: 0 }} />
                  <span className="text-xs" style={{ color: GRAY }}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
