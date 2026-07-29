import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { buildStartProjectHref } from "../../../../data/inquiryOptions";
import { useLanguage } from "../../../../context/LanguageContext";
import { BLUE, DARK, GRAY, BORDER, LIGHT_BG, T } from "../constants";

const FLOW_STAGES = [
  { label: "BUSINESS ASSETS", items: ["Brand", "Product", "Content", "IP"], primary: true },
  { label: "MARKET INTEL", items: ["Target Market", "Demand", "Competition", "Channel"], primary: false },
  { label: "CONTENT & DEMAND", items: ["Content", "Creator", "Campaign", "Partnership"], primary: false },
  { label: "GLOBAL EXECUTION", items: ["Sales", "Distribution", "Operations", "Investment"], primary: false },
  { label: "GROWTH", items: ["Reorder", "Expansion", "New Market"], primary: false },
];

function HeroFlowVisual({ ariaLabel }: { ariaLabel: string }) {
  const [activeStage, setActiveStage] = useState(0);
  const prefersReduced = useRef(
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (prefersReduced.current) return;
    const id = setInterval(() => setActiveStage((s) => (s + 1) % FLOW_STAGES.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex items-stretch overflow-x-auto"
      style={{
        border: `1px solid ${BORDER}`,
        borderRadius: 6,
        padding: "28px 20px",
        background: LIGHT_BG,
        minHeight: 200,
      }}
      role="img"
      aria-label={ariaLabel}
    >
      {FLOW_STAGES.map((stage, i) => (
        <div key={stage.label} className="flex items-stretch gap-0">
          <div className="flex flex-col justify-start" style={{ minWidth: stage.primary ? 130 : 110, maxWidth: stage.primary ? 150 : 126 }}>
            <div
              className="text-xs font-semibold mb-2.5 transition-colors duration-500"
              style={{
                fontFamily: "var(--font-mono)",
                letterSpacing: "0.06em",
                color: activeStage === i ? BLUE : "#B0B4BE",
                fontSize: "0.58rem",
              }}
            >
              {stage.label}
            </div>
            <div
              className="flex-1 flex flex-col gap-1.5 p-3 transition-all duration-500"
              style={{
                border: `1px solid ${activeStage === i ? BLUE : BORDER}`,
                borderRadius: 4,
                background: activeStage === i ? "rgba(55,55,242,0.04)" : "#fff",
              }}
            >
              {stage.items.map((item, j) => (
                <div
                  key={item}
                  className="transition-all duration-500"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: stage.primary && j < 2 ? "0.72rem" : "0.65rem",
                    color: activeStage === i ? (j < 2 ? DARK : GRAY) : GRAY,
                    fontWeight: activeStage === i && stage.primary && j < 2 ? 600 : 400,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
            <div
              className="mt-2 transition-all duration-500"
              style={{ height: 2, background: activeStage === i ? BLUE : "transparent", borderRadius: 1 }}
            />
          </div>

          {i < FLOW_STAGES.length - 1 && (
            <div
              className="flex items-center px-1.5 transition-colors duration-500 flex-shrink-0"
              style={{ color: activeStage === i ? BLUE : "#CDD0D8" }}
            >
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                <line x1="0" y1="5" x2="10" y2="5" stroke="currentColor" strokeWidth="1.5" />
                <polyline points="7,1 12,5 7,9" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function HeroSection({ onScrollToProcess }: { onScrollToProcess: () => void }) {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <section style={{ borderBottom: `1px solid ${BORDER}` }}>
      <div
        className="mx-auto flex flex-col md:flex-row items-center gap-12"
        style={{ maxWidth: 1280, padding: "80px 32px" }}
      >
        {/* Left copy */}
        <div className="flex-shrink-0 w-full md:w-5/12">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-xs font-semibold tracking-widest"
              style={{ fontFamily: "var(--font-mono)", color: BLUE, letterSpacing: "0.12em" }}
            >
              HITPICK
            </span>
            <span style={{ width: 1, height: 12, background: BORDER, display: "inline-block" }} />
            <span
              className="text-xs tracking-widest"
              style={{ fontFamily: "var(--font-mono)", color: GRAY, letterSpacing: "0.1em" }}
            >
              GLOBAL BUSINESS EXPANSION
            </span>
          </div>

          <h1
            className="font-bold mb-6"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.2rem, 4vw, 3.25rem)",
              color: DARK,
              lineHeight: 1.18,
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
              to={buildStartProjectHref("hitpick", "global-expansion")}
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

        {/* Right visual */}
        <div className="w-full md:flex-1">
          <HeroFlowVisual ariaLabel={t.flowAriaLabel} />
        </div>
      </div>
    </section>
  );
}
