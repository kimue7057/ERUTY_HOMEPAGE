import { useLanguage } from "../../../../context/LanguageContext";
import { BLUE, NEAR_BLACK, T } from "../constants";

export function IntelligenceSection() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <section style={{ background: NEAR_BLACK, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "80px 32px" }}>
        <div className="mb-14">
          <div className="text-xs font-semibold mb-4" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: BLUE }}>
            {t.intelLabel}
          </div>
          <h2
            className="font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#fff", lineHeight: 1.25, whiteSpace: "pre-line" }}
          >
            {t.intelHeading}
          </h2>
          <p className="text-sm max-w-md" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t.intelDesc}
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-4">
          {/* Inputs */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-xs font-semibold mb-1" style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.28)", letterSpacing: "0.08em", fontSize: "0.6rem" }}>
              GLOBAL DATA SIGNALS
            </div>
            {t.intelInputs.map((inp) => (
              <div
                key={inp.label}
                className="p-4"
                style={{ border: "1px solid rgba(255,255,255,0.07)", borderRadius: 4, background: "rgba(255,255,255,0.03)" }}
              >
                <div className="text-xs font-semibold mb-1" style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.35)", letterSpacing: "0.07em", fontSize: "0.58rem" }}>
                  {inp.label}
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{inp.value}</div>
              </div>
            ))}
          </div>

          {/* Center */}
          <div className="flex md:flex-col items-center justify-center gap-3 px-4">
            <div style={{ flex: 1, width: 1, background: "rgba(255,255,255,0.08)" }} className="hidden md:block" />
            <div
              className="px-5 py-4 text-center flex-shrink-0"
              style={{ border: `1.5px solid ${BLUE}`, borderRadius: 4, background: "rgba(55,55,242,0.1)" }}
            >
              <div
                className="text-xs font-semibold"
                style={{ fontFamily: "var(--font-mono)", color: BLUE, letterSpacing: "0.08em", fontSize: "0.6rem", lineHeight: 1.8 }}
              >
                HITPICK<br />INTELLIGENCE
              </div>
            </div>
            <div style={{ flex: 1, width: 1, background: "rgba(255,255,255,0.08)" }} className="hidden md:block" />
          </div>

          {/* Outputs */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-xs font-semibold mb-1" style={{ fontFamily: "var(--font-mono)", color: BLUE, letterSpacing: "0.08em", fontSize: "0.6rem" }}>
              BUSINESS DECISIONS
            </div>
            {t.intelOutputs.map((out) => (
              <div
                key={out}
                className="flex items-center gap-3 p-3.5"
                style={{ border: "1px solid rgba(55,55,242,0.22)", borderRadius: 4, background: "rgba(55,55,242,0.05)" }}
              >
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: BLUE, flexShrink: 0 }} />
                <span className="text-sm font-medium" style={{ color: "#fff" }}>{out}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
