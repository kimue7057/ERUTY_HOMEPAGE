import { useState } from "react";
import { ArrowRight, ChevronDown, Check } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { BLUE, DARK, GRAY, BORDER, LIGHT_BG, T } from "../constants";

export function BeforeAfter() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [activeTabIdx, setActiveTabIdx] = useState(0);

  const tabs = t.wfTabs;
  const activeTab = tabs[activeTabIdx];
  const workflow = t.wfData[activeTab];

  return (
    <section style={{ background: "#fff", borderBottom: `1px solid ${BORDER}` }}>
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "80px 32px" }}>
        <div className="mb-10">
          <div className="text-xs font-semibold mb-4" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: BLUE }}>
            {t.beforeAfterLabel}
          </div>
          <h2
            className="font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: DARK, lineHeight: 1.25, whiteSpace: "pre-line" }}
          >
            {t.beforeAfterHeading}
          </h2>
          <p className="text-sm max-w-lg" style={{ color: GRAY, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t.beforeAfterDesc}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1.5 mb-8">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              className="text-xs px-3.5 py-2 transition-all duration-150"
              style={{
                border: `1px solid ${activeTabIdx === idx ? DARK : BORDER}`,
                borderRadius: 3,
                color: activeTabIdx === idx ? DARK : GRAY,
                fontWeight: activeTabIdx === idx ? 600 : 400,
                background: "transparent",
                cursor: "pointer",
                minHeight: 36,
              }}
              onClick={() => setActiveTabIdx(idx)}
              aria-pressed={activeTabIdx === idx}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Before / After */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Before */}
          <div className="flex-1 p-6" style={{ background: LIGHT_BG, border: `1px solid ${BORDER}`, borderRadius: 6 }}>
            <div className="text-xs font-semibold mb-5" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: GRAY, fontSize: "0.6rem" }}>
              BEFORE
            </div>
            <div className="flex flex-col gap-0">
              {workflow.before.map((step, i) => (
                <div key={i}>
                  <div
                    className="text-sm px-3 py-2.5"
                    style={{ border: `1px solid ${BORDER}`, borderRadius: 3, color: GRAY, background: "#fff" }}
                  >
                    {step}
                  </div>
                  {i < workflow.before.length - 1 && (
                    <div style={{ width: 1, height: 10, background: BORDER, marginLeft: 16 }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:flex items-center justify-center px-2">
            <ArrowRight size={20} style={{ color: BLUE }} />
          </div>
          <div className="md:hidden flex items-center justify-center py-2">
            <ChevronDown size={20} style={{ color: BLUE }} />
          </div>

          {/* After */}
          <div className="flex-1 p-6" style={{ background: "#fff", border: `1.5px solid ${BLUE}`, borderRadius: 6 }}>
            <div className="text-xs font-semibold mb-5" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: BLUE, fontSize: "0.6rem" }}>
              AFTER ERUMTER AX
            </div>
            <div className="flex flex-col gap-0">
              {workflow.after.map((step, i) => {
                const isHuman = step.includes("✓");
                return (
                  <div key={i}>
                    <div
                      className="text-sm px-3 py-2.5 flex items-center gap-2"
                      style={{
                        border: `1px solid ${isHuman ? BLUE : BORDER}`,
                        borderRadius: 3,
                        color: isHuman ? BLUE : DARK,
                        fontWeight: isHuman ? 600 : 400,
                        background: isHuman ? "rgba(55,55,242,0.05)" : LIGHT_BG,
                      }}
                    >
                      {isHuman && <Check size={12} style={{ color: BLUE, flexShrink: 0 }} />}
                      {step}
                    </div>
                    {i < workflow.after.length - 1 && (
                      <div style={{ width: 1, height: 10, background: isHuman ? BLUE : BORDER, marginLeft: 16 }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Expected changes */}
        <div className="mt-10 pt-8" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="text-xs font-semibold mb-4" style={{ fontFamily: "var(--font-mono)", color: GRAY, letterSpacing: "0.08em", fontSize: "0.6rem" }}>
            {t.expectedLabel}
          </div>
          <div className="flex flex-wrap gap-2">
            {t.expectedItems.map((s) => (
              <span key={s} className="text-xs px-3 py-1.5" style={{ border: `1px solid ${BORDER}`, borderRadius: 3, color: GRAY }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
