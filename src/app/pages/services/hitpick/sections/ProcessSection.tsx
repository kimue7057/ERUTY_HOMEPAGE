import { useState, useEffect, useRef, forwardRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { BLUE, DARK, GRAY, BORDER, LIGHT_BG, PROCESS_STEPS, ProcessStep, T } from "../constants";

function DiscoverVisual({ active }: { active: boolean }) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="flex flex-col gap-2">
        {["Brand", "Product", "Content", "IP"].map((a, i) => (
          <div
            key={a}
            className="text-xs px-3 py-2 transition-all duration-300"
            style={{
              border: `1px solid ${active && i < 2 ? DARK : BORDER}`,
              borderRadius: 3,
              color: active && i < 2 ? DARK : GRAY,
              fontWeight: active && i < 2 ? 600 : 400,
              background: active && i < 2 ? "rgba(24,25,27,0.04)" : "transparent",
              minWidth: 72,
            }}
          >
            {a}
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
          <line x1="0" y1="6" x2="22" y2="6" stroke={active ? BLUE : BORDER} strokeWidth="1.5" />
          <polyline points="16,2 24,6 16,10" stroke={active ? BLUE : BORDER} strokeWidth="1.5" fill="none" />
        </svg>
      </div>
      <div
        className="text-xs px-4 py-3 font-semibold transition-all duration-300"
        style={{
          border: `1.5px solid ${active ? BLUE : BORDER}`,
          borderRadius: 4,
          color: active ? BLUE : GRAY,
          fontFamily: "var(--font-mono)",
          letterSpacing: "0.06em",
          background: active ? "rgba(55,55,242,0.05)" : "transparent",
          lineHeight: 1.6,
        }}
      >
        OPPORTUNITY<br />PIPELINE
      </div>
    </div>
  );
}

function ValidateVisual({ active, lang }: { active: boolean; lang: "ko" | "en" }) {
  const markets = [
    { name: "Japan", demand: "High", comp: "Mid", channel: "E-comm", status: "Priority" },
    { name: "Vietnam", demand: "Mid", comp: "Low", channel: "Social", status: "Testing" },
    { name: "Germany", demand: "Mid", comp: "High", channel: "Retail", status: "Research" },
  ];
  const note = lang === "ko"
    ? "* 예시 데이터 — 실제 분석 데이터로 교체 예정"
    : "* Sample data — to be replaced with actual analysis data";
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.72rem", fontFamily: "var(--font-body)" }}>
        <thead>
          <tr>
            {["Market", "Demand", "Competition", "Channel", "Status"].map((h) => (
              <th key={h} style={{ textAlign: "left", padding: "6px 10px", color: GRAY, fontWeight: 500, borderBottom: `1px solid ${BORDER}`, whiteSpace: "nowrap" }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {markets.map((m, i) => (
            <tr key={m.name} style={{ background: active && i === 0 ? "rgba(55,55,242,0.04)" : "transparent" }}>
              <td style={{ padding: "8px 10px", color: DARK, fontWeight: active && i === 0 ? 600 : 400 }}>{m.name}</td>
              <td style={{ padding: "8px 10px", color: m.demand === "High" ? "#2C9E5F" : GRAY }}>{m.demand}</td>
              <td style={{ padding: "8px 10px", color: m.comp === "High" ? "#D94B3A" : GRAY }}>{m.comp}</td>
              <td style={{ padding: "8px 10px", color: GRAY }}>{m.channel}</td>
              <td style={{ padding: "8px 10px" }}>
                <span style={{
                  fontSize: "0.6rem", fontFamily: "var(--font-mono)",
                  color: active && i === 0 ? BLUE : GRAY,
                  border: `1px solid ${active && i === 0 ? BLUE : BORDER}`,
                  borderRadius: 2, padding: "2px 6px",
                }}>
                  {m.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: "0.6rem", color: "#C8CBD2", marginTop: 8, fontFamily: "var(--font-mono)" }}>
        {note}
      </p>
    </div>
  );
}

function BuildDemandVisual({ active }: { active: boolean }) {
  const nodes = ["Brand · Product", "Local Content", "Creator", "Audience", "Purchase Interest"];
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {nodes.map((n, i) => (
        <div key={n} className="flex items-center gap-2">
          <div
            className="text-xs px-3 py-2 transition-all duration-300"
            style={{
              border: `1px solid ${active && i === 0 ? DARK : active ? BLUE : BORDER}`,
              borderRadius: 3,
              color: active && i === 0 ? DARK : active ? BLUE : GRAY,
              fontWeight: active && i === 0 ? 600 : 400,
              background: active && i === 0 ? "rgba(24,25,27,0.04)" : "transparent",
              whiteSpace: "nowrap",
            }}
          >
            {n}
          </div>
          {i < nodes.length - 1 && <ArrowRight size={12} style={{ color: active ? BLUE : BORDER, flexShrink: 0 }} />}
        </div>
      ))}
    </div>
  );
}

function ExecuteVisual({ active }: { active: boolean }) {
  const flow = ["Order", "Sales Channel", "Distribution", "Export · Delivery", "Settlement"];
  return (
    <div className="flex flex-col gap-2">
      {flow.map((node, i) => (
        <div key={node}>
          <div
            className="text-xs px-3 py-2 transition-all duration-300 inline-block"
            style={{
              border: `1px solid ${active ? (i === flow.length - 1 ? BLUE : DARK) : BORDER}`,
              borderRadius: 3,
              color: active ? (i === flow.length - 1 ? BLUE : DARK) : GRAY,
              fontWeight: active && i === flow.length - 1 ? 600 : 400,
              background: active && i === flow.length - 1 ? "rgba(55,55,242,0.05)" : "transparent",
              minWidth: 140,
            }}
          >
            {node}
          </div>
          {i < flow.length - 1 && (
            <div style={{ width: 1, height: 10, background: active ? BLUE : BORDER, marginLeft: 16, marginTop: 0 }} />
          )}
        </div>
      ))}
    </div>
  );
}

function ScaleVisual({ active }: { active: boolean }) {
  const nodes = ["Repeat Order", "New Market", "Expanded Channel", "New Partnership", "Investment"];
  return (
    <div className="flex flex-wrap gap-2">
      {nodes.map((n) => (
        <span
          key={n}
          className="text-xs px-3 py-2 transition-all duration-300"
          style={{
            border: `1px solid ${active ? BLUE : BORDER}`,
            borderRadius: 3,
            color: active ? BLUE : GRAY,
            background: active ? "rgba(55,55,242,0.05)" : "transparent",
          }}
        >
          {n}
        </span>
      ))}
    </div>
  );
}

function ProcessStepVisual({ step, index, active, lang }: { step: ProcessStep; index: number; active: boolean; lang: "ko" | "en" }) {
  const visuals = [
    <DiscoverVisual key="d" active={active} />,
    <ValidateVisual key="v" active={active} lang={lang} />,
    <BuildDemandVisual key="b" active={active} />,
    <ExecuteVisual key="e" active={active} />,
    <ScaleVisual key="s" active={active} />,
  ];

  return (
    <div
      className="p-8 transition-all duration-300"
      style={{
        border: `1px solid ${active ? BLUE : BORDER}`,
        borderRadius: 6,
        background: active ? "rgba(55,55,242,0.02)" : LIGHT_BG,
      }}
    >
      <div
        className="text-xs font-semibold mb-4"
        style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em", color: active ? BLUE : "#C8CBD2", fontSize: "0.6rem" }}
      >
        {step.num} · {step.en}
      </div>
      <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: active ? DARK : GRAY }}>
        {lang === "ko" ? step.ko : step.en}
      </h3>
      <p className="text-sm mb-7" style={{ color: GRAY, lineHeight: 1.8, whiteSpace: "pre-line" }}>
        {lang === "ko" ? step.desc : step.descEn}
      </p>
      <div>{visuals[index]}</div>
    </div>
  );
}

function MobileProcessStep({
  step, index, isOpen, onToggle, lang,
}: {
  step: ProcessStep; index: number; isOpen: boolean; onToggle: () => void; lang: "ko" | "en";
}) {
  const visuals = [
    <DiscoverVisual key="d" active />,
    <ValidateVisual key="v" active lang={lang} />,
    <BuildDemandVisual key="b" active />,
    <ExecuteVisual key="e" active />,
    <ScaleVisual key="s" active />,
  ];

  return (
    <div style={{ border: `1px solid ${isOpen ? BLUE : BORDER}`, borderRadius: 6, overflow: "hidden" }}>
      <button
        className="w-full flex items-center justify-between p-5 text-left"
        style={{ background: isOpen ? "rgba(55,55,242,0.03)" : "#fff", cursor: "pointer", minHeight: 64 }}
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold" style={{ fontFamily: "var(--font-mono)", color: isOpen ? BLUE : "#C8CBD2" }}>
            {step.num}
          </span>
          <div>
            <div className="text-xs font-semibold" style={{ fontFamily: "var(--font-mono)", color: isOpen ? BLUE : GRAY, letterSpacing: "0.08em", fontSize: "0.6rem" }}>
              {step.en}
            </div>
            <div className="text-sm font-medium mt-0.5" style={{ color: DARK }}>{lang === "ko" ? step.ko : step.en}</div>
          </div>
        </div>
        <ChevronDown
          size={16}
          style={{ color: GRAY, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <p className="text-sm mb-5" style={{ color: GRAY, lineHeight: 1.8, whiteSpace: "pre-line" }}>{lang === "ko" ? step.desc : step.descEn}</p>
          <div className="overflow-x-auto">{visuals[index]}</div>
        </div>
      )}
    </div>
  );
}

export const ProcessSection = forwardRef<HTMLDivElement>((_, ref) => {
  const { lang } = useLanguage();
  const t = T[lang];
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveStep(i); },
        { threshold: 0.5 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section ref={ref} style={{ background: "#fff", borderBottom: `1px solid ${BORDER}` }}>
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "80px 32px" }}>
        <div className="mb-16">
          <div className="text-xs font-semibold mb-4" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: BLUE }}>
            {t.processLabel}
          </div>
          <h2
            className="font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: DARK, lineHeight: 1.25, whiteSpace: "pre-line" }}
          >
            {t.processHeading}
          </h2>
          <p className="text-sm max-w-lg" style={{ color: GRAY, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t.processDesc}
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex gap-0">
          {/* Sticky left nav */}
          <div className="flex-shrink-0 w-64 pr-10">
            <div className="sticky" style={{ top: 96 }}>
              {PROCESS_STEPS.map((step, i) => (
                <button
                  key={step.num}
                  className="w-full text-left flex items-start gap-4 py-5 transition-all duration-200"
                  style={{
                    borderLeft: `2px solid ${activeStep === i ? BLUE : BORDER}`,
                    paddingLeft: 16,
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                >
                  <span
                    className="text-xs font-semibold flex-shrink-0 mt-0.5 transition-colors duration-200"
                    style={{ fontFamily: "var(--font-mono)", color: activeStep === i ? BLUE : "#C8CBD2" }}
                  >
                    {step.num}
                  </span>
                  <div>
                    <div
                      className="text-xs font-semibold mb-0.5 transition-colors duration-200"
                      style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em", color: activeStep === i ? BLUE : "#C8CBD2", fontSize: "0.6rem" }}
                    >
                      {step.en}
                    </div>
                    <div
                      className="text-sm font-medium transition-colors duration-200"
                      style={{ color: activeStep === i ? DARK : GRAY }}
                    >
                      {lang === "ko" ? step.ko : step.en}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Scrolling panels */}
          <div className="flex-1 flex flex-col">
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.num}
                ref={(el) => { stepRefs.current[i] = el; }}
                style={{ minHeight: 300, paddingBottom: 40 }}
              >
                <ProcessStepVisual step={step} index={i} active={activeStep === i} lang={lang} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden flex flex-col gap-2">
          {PROCESS_STEPS.map((step, i) => (
            <MobileProcessStep
              key={step.num}
              step={step}
              index={i}
              isOpen={activeStep === i}
              onToggle={() => setActiveStep(activeStep === i ? -1 : i)}
              lang={lang}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
