import { useState, useEffect, useRef, forwardRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { BLUE, DARK, GRAY, BORDER, LIGHT_BG, AX_STEPS, T, TType } from "../constants";

function DiagnoseVisual({ active, t }: { active: boolean; t: TType }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.72rem", fontFamily: "var(--font-body)" }}>
        <tbody>
          {t.diagnoseRows.map((r) => (
            <tr key={r.label} style={{ background: active && r.highlight ? "rgba(55,55,242,0.05)" : "transparent" }}>
              <td style={{ padding: "8px 10px", color: GRAY, fontWeight: 500, width: 120, borderBottom: `1px solid ${BORDER}`, whiteSpace: "nowrap" }}>{r.label}</td>
              <td style={{ padding: "8px 10px", color: active && r.highlight ? BLUE : DARK, fontWeight: r.highlight && active ? 600 : 400, borderBottom: `1px solid ${BORDER}` }}>{r.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: "0.6rem", color: "#C0C4CC", marginTop: 8, fontFamily: "var(--font-mono)" }}>{t.diagnoseNote}</p>
    </div>
  );
}

function DesignVisual({ active, t }: { active: boolean; t: TType }) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      {t.designFlow.map((node, i) => (
        <div key={node.label} className="flex items-center gap-2">
          <div
            className="text-xs px-3 py-2.5 transition-all duration-300"
            style={{
              border: `${node.human ? 1.5 : 1}px solid ${active && node.human ? BLUE : active ? DARK : BORDER}`,
              borderRadius: 4,
              color: active && node.human ? BLUE : active ? DARK : GRAY,
              fontWeight: node.human ? 600 : 400,
              background: active && node.human ? "rgba(55,55,242,0.06)" : "transparent",
              minWidth: 110,
            }}
          >
            <div style={{ fontSize: "0.65rem", fontFamily: "var(--font-mono)", letterSpacing: "0.05em" }}>{node.label}</div>
            <div style={{ fontSize: "0.6rem", color: GRAY, marginTop: 2 }}>{node.sub}</div>
          </div>
          {i < t.designFlow.length - 1 && <ArrowRight size={12} style={{ color: active ? BLUE : BORDER, flexShrink: 0 }} />}
        </div>
      ))}
    </div>
  );
}

function BuildVisual({ active }: { active: boolean }) {
  const layers = ["DATA SOURCE", "KNOWLEDGE", "AI MODEL", "AGENT", "WORKFLOW", "USER INTERFACE"];
  return (
    <div className="flex flex-col gap-2">
      {layers.map((layer, i) => (
        <div key={layer}>
          <div
            className="text-xs px-3 py-2 transition-all duration-300 flex items-center justify-between"
            style={{
              border: `1px solid ${active ? (i === layers.length - 1 ? BLUE : DARK) : BORDER}`,
              borderRadius: 3,
              color: active ? (i === layers.length - 1 ? BLUE : DARK) : GRAY,
              fontFamily: "var(--font-mono)",
              fontSize: "0.62rem",
              background: active && i === layers.length - 1 ? "rgba(55,55,242,0.05)" : "transparent",
              letterSpacing: "0.06em",
              maxWidth: 240,
            }}
          >
            {layer}
          </div>
          {i < layers.length - 1 && (
            <div style={{ width: 1, height: 8, background: active ? BLUE : BORDER, marginLeft: 16 }} />
          )}
        </div>
      ))}
    </div>
  );
}

function EnableVisual({ active, t }: { active: boolean; t: TType }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {t.enableItems.map((item) => (
        <div
          key={item}
          className="flex items-center gap-2.5 p-3 text-xs transition-all duration-300"
          style={{
            border: `1px solid ${BORDER}`,
            borderRadius: 4,
            color: active ? DARK : GRAY,
            background: active ? "#fff" : "transparent",
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: active ? BLUE : BORDER, flexShrink: 0 }} />
          {item}
        </div>
      ))}
    </div>
  );
}

function OperateVisual({ active, t }: { active: boolean; t: TType }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.72rem", fontFamily: "var(--font-body)" }}>
        <tbody>
          {t.operateStatuses.map((s) => (
            <tr key={s.label} style={{ background: active && s.highlight ? "rgba(55,55,242,0.05)" : "transparent" }}>
              <td style={{ padding: "8px 10px", color: GRAY, width: 160, borderBottom: `1px solid ${BORDER}` }}>{s.label}</td>
              <td style={{ padding: "8px 10px", color: active && s.highlight ? BLUE : DARK, fontWeight: s.highlight && active ? 600 : 400, borderBottom: `1px solid ${BORDER}` }}>{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize: "0.6rem", color: "#C0C4CC", marginTop: 8, fontFamily: "var(--font-mono)" }}>{t.operateNote}</p>
    </div>
  );
}

function AXStepVisual({ step, index, active, lang, t }: { step: typeof AX_STEPS[0]; index: number; active: boolean; lang: "ko" | "en"; t: TType }) {
  const visuals = [
    <DiagnoseVisual key="d" active={active} t={t} />,
    <DesignVisual key="de" active={active} t={t} />,
    <BuildVisual key="b" active={active} />,
    <EnableVisual key="e" active={active} t={t} />,
    <OperateVisual key="o" active={active} t={t} />,
  ];
  return (
    <div
      className="p-8 transition-all duration-300"
      style={{ border: `1px solid ${active ? BLUE : BORDER}`, borderRadius: 6, background: active ? "rgba(55,55,242,0.02)" : LIGHT_BG }}
    >
      <div className="text-xs font-semibold mb-4" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em", color: active ? BLUE : "#C8CBD2", fontSize: "0.6rem" }}>
        {step.num} · {step.en}
      </div>
      <h3 className="text-xl font-bold mb-3" style={{ fontFamily: "var(--font-display)", color: active ? DARK : GRAY }}>
        {lang === "ko" ? step.ko : step.en}
      </h3>
      <p className="text-sm mb-7" style={{ color: GRAY, lineHeight: 1.8, whiteSpace: "pre-line" }}>{lang === "ko" ? step.desc : step.descEn}</p>
      <div>{visuals[index]}</div>
    </div>
  );
}

function AXMobileStep({ step, index, isOpen, onToggle, lang, t }: { step: typeof AX_STEPS[0]; index: number; isOpen: boolean; onToggle: () => void; lang: "ko" | "en"; t: TType }) {
  const visuals = [
    <DiagnoseVisual key="d" active t={t} />,
    <DesignVisual key="de" active t={t} />,
    <BuildVisual key="b" active />,
    <EnableVisual key="e" active t={t} />,
    <OperateVisual key="o" active t={t} />,
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
          <span className="text-xs font-semibold" style={{ fontFamily: "var(--font-mono)", color: isOpen ? BLUE : "#C8CBD2" }}>{step.num}</span>
          <div>
            <div className="text-xs font-semibold" style={{ fontFamily: "var(--font-mono)", color: isOpen ? BLUE : GRAY, letterSpacing: "0.08em", fontSize: "0.6rem" }}>{step.en}</div>
            <div className="text-sm font-medium mt-0.5" style={{ color: DARK }}>{lang === "ko" ? step.ko : step.en}</div>
          </div>
        </div>
        <ChevronDown size={16} style={{ color: GRAY, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s", flexShrink: 0 }} />
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

export const AXProcess = forwardRef<HTMLDivElement>((_, ref) => {
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

        {/* Desktop sticky */}
        <div className="hidden md:flex gap-0">
          <div className="flex-shrink-0 w-64 pr-10">
            <div className="sticky" style={{ top: 96 }}>
              {AX_STEPS.map((step, i) => (
                <button
                  key={step.num}
                  className="w-full text-left flex items-start gap-4 py-5 transition-all duration-200"
                  style={{ borderLeft: `2px solid ${activeStep === i ? BLUE : BORDER}`, paddingLeft: 16, background: "transparent", cursor: "pointer" }}
                  onClick={() => stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                >
                  <span className="text-xs font-semibold flex-shrink-0 mt-0.5 transition-colors duration-200" style={{ fontFamily: "var(--font-mono)", color: activeStep === i ? BLUE : "#C8CBD2" }}>
                    {step.num}
                  </span>
                  <div>
                    <div className="text-xs font-semibold mb-0.5 transition-colors duration-200" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.08em", color: activeStep === i ? BLUE : "#C8CBD2", fontSize: "0.6rem" }}>
                      {step.en}
                    </div>
                    <div className="text-sm font-medium transition-colors duration-200" style={{ color: activeStep === i ? DARK : GRAY }}>
                      {lang === "ko" ? step.ko : step.en}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            {AX_STEPS.map((step, i) => (
              <div key={step.num} ref={(el) => { stepRefs.current[i] = el; }} style={{ minHeight: 300, paddingBottom: 40 }}>
                <AXStepVisual step={step} index={i} active={activeStep === i} lang={lang} t={t} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden flex flex-col gap-2">
          {AX_STEPS.map((step, i) => (
            <AXMobileStep
              key={step.num}
              step={step}
              index={i}
              isOpen={activeStep === i}
              onToggle={() => setActiveStep(activeStep === i ? -1 : i)}
              lang={lang}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
