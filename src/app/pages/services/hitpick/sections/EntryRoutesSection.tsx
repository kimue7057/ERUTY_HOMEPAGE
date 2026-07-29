import { ArrowRight } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { BLUE, DARK, GRAY, BORDER, LIGHT_BG, T } from "../constants";

export function EntryRoutesSection() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <section style={{ background: LIGHT_BG, borderBottom: `1px solid ${BORDER}` }}>
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "80px 32px" }}>
        <div className="mb-12">
          <div className="text-xs font-semibold mb-4" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: BLUE }}>
            {t.entryLabel}
          </div>
          <h2
            className="font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: DARK, lineHeight: 1.25, whiteSpace: "pre-line" }}
          >
            {t.entryHeading}
          </h2>
          <p className="text-sm max-w-xl" style={{ color: GRAY, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t.entryDesc}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-stretch">
          {/* Area A — Brand & Product ~65% */}
          <div
            className="flex-1 p-8"
            style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 6 }}
          >
            <div
              className="text-xs font-semibold mb-2"
              style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: BLUE, fontSize: "0.6rem" }}
            >
              BRAND & PRODUCT EXPANSION
            </div>
            <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: DARK }}>
              {t.brandHeading}
            </h3>
            <p className="text-sm mb-6" style={{ color: GRAY, lineHeight: 1.75, whiteSpace: "pre-line" }}>
              {t.brandDesc}
            </p>

            {/* Mini flow */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              {["Brand · Product", "Market Validation", "Local Content", "Creator Demand", "Sales Channel", "Growth"].map((node, i, arr) => (
                <div key={node} className="flex items-center gap-2">
                  <span
                    className="text-xs px-2.5 py-1"
                    style={{
                      border: `1px solid ${i === 0 ? DARK : BORDER}`,
                      borderRadius: 3,
                      color: i === 0 ? DARK : GRAY,
                      fontWeight: i === 0 ? 600 : 400,
                      fontFamily: "var(--font-body)",
                      background: i === 0 ? "rgba(24,25,27,0.04)" : "transparent",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {node}
                  </span>
                  {i < arr.length - 1 && <ArrowRight size={11} style={{ color: "#C8CBD2", flexShrink: 0 }} />}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {t.brandTags.map((s) => (
                <span
                  key={s}
                  className="text-xs px-2.5 py-1"
                  style={{ border: `1px solid ${BORDER}`, borderRadius: 3, color: GRAY, fontFamily: "var(--font-body)" }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Area B — Content & IP ~35% */}
          <div
            className="w-full md:w-80 flex-shrink-0 p-8 flex flex-col justify-between"
            style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 6 }}
          >
            <div>
              <div
                className="text-xs font-semibold mb-2"
                style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: GRAY, fontSize: "0.6rem" }}
              >
                CONTENT & IP EXPANSION
              </div>
              <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: DARK, whiteSpace: "pre-line" }}>
                {t.contentHeading}
              </h3>
              <p className="text-sm mb-6" style={{ color: GRAY, lineHeight: 1.75, whiteSpace: "pre-line" }}>
                {t.contentDesc}
              </p>
              <div className="flex flex-col gap-2.5">
                {t.contentItems.map((s) => (
                  <div key={s} className="flex items-center gap-2.5">
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: BORDER, flexShrink: 0 }} />
                    <span className="text-sm" style={{ color: GRAY }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5" style={{ borderTop: `1px solid ${BORDER}` }}>
              <div
                className="text-xs font-semibold"
                style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: BLUE, fontSize: "0.6rem" }}
              >
                HITPICK GLOBAL EXECUTION
              </div>
              <p className="text-xs mt-1" style={{ color: GRAY }}>{t.executionNote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
