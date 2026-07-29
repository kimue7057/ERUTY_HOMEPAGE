import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import { buildStartProjectHref } from "../../../../data/inquiryOptions";
import { useLanguage } from "../../../../context/LanguageContext";
import { BLUE, DARK, GRAY, BORDER, LIGHT_BG, T } from "../constants";

const WF_STAGE_LABELS = ["CURRENT WORK", "ERUMTER AX SYSTEM", "BUSINESS OPERATION"];
const WF_SYSTEM_ITEMS = ["Connected Data", "AI Processing", "Auto Workflow", "Human Review ✓", "Ops Control"];

function WorkflowTransformationVisual({
  ariaLabel,
  currentItems,
  outputItems,
}: {
  ariaLabel: string;
  currentItems: string[];
  outputItems: string[];
}) {
  const stages = [
    { label: WF_STAGE_LABELS[0], items: currentItems, isSystem: false },
    { label: WF_STAGE_LABELS[1], items: WF_SYSTEM_ITEMS, isSystem: true },
    { label: WF_STAGE_LABELS[2], items: outputItems, isSystem: false },
  ];

  const [activeStage, setActiveStage] = useState(0);
  const prefersReduced = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (prefersReduced.current) return;
    const id = setInterval(() => setActiveStage((s) => (s + 1) % stages.length), 2000);
    return () => clearInterval(id);
  }, [stages.length]);

  return (
    <div
      className="flex flex-col md:flex-row items-stretch gap-0 overflow-x-auto"
      style={{ border: `1px solid ${BORDER}`, borderRadius: 6, padding: "24px 20px", background: LIGHT_BG }}
      role="img"
      aria-label={ariaLabel}
    >
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex md:flex-row flex-col items-stretch gap-0">
          <div
            className="flex flex-col"
            style={{ minWidth: 140, maxWidth: stage.isSystem ? 170 : 150 }}
          >
            <div
              className="text-xs font-semibold mb-2.5 transition-colors duration-500"
              style={{
                fontFamily: "var(--font-mono)",
                color: activeStage === i ? (stage.isSystem ? BLUE : DARK) : "#B0B4BE",
                fontSize: "0.58rem",
                letterSpacing: "0.07em",
              }}
            >
              {stage.label}
            </div>
            <div
              className="flex-1 flex flex-col gap-1.5 p-3 transition-all duration-500"
              style={{
                border: `${stage.isSystem ? 1.5 : 1}px solid ${activeStage === i ? (stage.isSystem ? BLUE : DARK) : BORDER}`,
                borderRadius: 4,
                background: activeStage === i
                  ? stage.isSystem ? "rgba(55,55,242,0.05)" : "rgba(24,25,27,0.03)"
                  : "#fff",
              }}
            >
              {stage.items.map((item) => (
                <div
                  key={item}
                  className="text-xs transition-all duration-500 flex items-center gap-1.5"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.68rem",
                    color: activeStage === i
                      ? stage.isSystem && item.includes("✓") ? BLUE : DARK
                      : GRAY,
                    fontWeight: activeStage === i && stage.isSystem && item.includes("✓") ? 600 : 400,
                  }}
                >
                  {stage.isSystem && item.includes("✓") && activeStage === i && (
                    <Check size={10} style={{ color: BLUE, flexShrink: 0 }} />
                  )}
                  {item.replace(" ✓", "")}
                </div>
              ))}
            </div>
            <div
              className="mt-2 transition-all duration-500"
              style={{ height: 2, background: activeStage === i ? (stage.isSystem ? BLUE : DARK) : "transparent", borderRadius: 1 }}
            />
          </div>

          {i < stages.length - 1 && (
            <div
              className="flex items-center justify-center px-2 py-2 md:py-0 transition-colors duration-500 flex-shrink-0"
              style={{ color: activeStage === i ? BLUE : "#C8CBD2" }}
            >
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" className="hidden md:block">
                <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1.5" />
                <polyline points="7,1 12,5 7,9" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
              <svg width="10" height="14" viewBox="0 0 10 14" fill="none" className="md:hidden">
                <line x1="5" y1="0" x2="5" y2="10" stroke="currentColor" strokeWidth="1.5" />
                <polyline points="1,7 5,12 9,7" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function ErumterHeroSection({ onScrollToProcess }: { onScrollToProcess: () => void }) {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <section style={{ borderBottom: `1px solid ${BORDER}` }}>
      <div
        className="mx-auto flex flex-col md:flex-row items-center gap-12"
        style={{ maxWidth: 1280, padding: "80px 32px" }}
      >
        {/* Left */}
        <div className="flex-shrink-0 w-full md:w-5/12">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-xs font-semibold"
              style={{ fontFamily: "var(--font-mono)", color: BLUE, letterSpacing: "0.1em" }}
            >
              {t.heroKoreanLabel}
            </span>
            <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: GRAY, letterSpacing: "0.08em" }}>
              ERUMTER
            </span>
            <span style={{ width: 1, height: 12, background: BORDER, display: "inline-block" }} />
            <span style={{ fontSize: "0.6rem", fontFamily: "var(--font-mono)", color: GRAY, letterSpacing: "0.1em" }}>
              ENTERPRISE AX TRANSFORMATION
            </span>
          </div>

          <h1
            className="font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              color: DARK,
              lineHeight: 1.2,
              whiteSpace: "pre-line",
            }}
          >
            {t.heroHeading}
          </h1>

          <p className="text-base mb-10" style={{ color: GRAY, lineHeight: 1.85, whiteSpace: "pre-line" }}>
            {t.heroDesc}
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={buildStartProjectHref("erumter", "automation")}
              className="px-6 py-3 text-sm font-medium transition-all duration-200"
              style={{ background: BLUE, color: "#fff", borderRadius: 4 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#2626CC")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = BLUE)}
            >
              {t.heroCTA}
            </Link>
            <button
              className="flex items-center gap-1.5 text-sm font-medium transition-colors duration-150"
              style={{ color: DARK, background: "transparent" }}
              onClick={onScrollToProcess}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = BLUE)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = DARK)}
            >
              {t.heroSecondary}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Right — workflow visual */}
        <div className="w-full md:flex-1">
          <WorkflowTransformationVisual ariaLabel={t.wfAriaLabel} currentItems={t.wfCurrentItems} outputItems={t.wfOutputItems} />
        </div>
      </div>
    </section>
  );
}
