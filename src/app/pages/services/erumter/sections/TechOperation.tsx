import { useLanguage } from "../../../../context/LanguageContext";
import { BLUE, NEAR_BLACK, T } from "../constants";

export function TechOperation() {
  const { lang } = useLanguage();
  const t = T[lang];

  const arch = ["COMPANY DATA & SYSTEMS", "AI · KNOWLEDGE · AGENTS", "AUTOMATED WORKFLOW", "HUMAN REVIEW & CONTROL ✓", "OPERATIONAL RESULT"];

  return (
    <section style={{ background: NEAR_BLACK, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "80px 32px" }}>
        <div className="mb-14">
          <div className="text-xs font-semibold mb-4" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: BLUE }}>
            {t.techLabel}
          </div>
          <h2
            className="font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "#fff", lineHeight: 1.25, whiteSpace: "pre-line" }}
          >
            {t.techHeading}
          </h2>
          <p className="text-sm max-w-md" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t.techDesc}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Architecture flow */}
          <div className="flex-shrink-0 md:w-72">
            <div className="text-xs font-semibold mb-4" style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.28)", fontSize: "0.6rem", letterSpacing: "0.08em" }}>
              OPERATIONAL ARCHITECTURE
            </div>
            <div className="flex flex-col gap-0">
              {arch.map((node, i) => {
                const isHuman = node.includes("✓");
                return (
                  <div key={node}>
                    <div
                      className="px-4 py-3 text-xs font-semibold transition-all duration-300"
                      style={{
                        border: `${isHuman ? 1.5 : 1}px solid ${isHuman ? BLUE : "rgba(255,255,255,0.1)"}`,
                        borderRadius: 4,
                        color: isHuman ? BLUE : "rgba(255,255,255,0.7)",
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.06em",
                        fontSize: "0.6rem",
                        background: isHuman ? "rgba(55,55,242,0.1)" : "rgba(255,255,255,0.03)",
                      }}
                    >
                      {node}
                    </div>
                    {i < arch.length - 1 && (
                      <div style={{ width: 1, height: 12, background: isHuman ? BLUE : "rgba(255,255,255,0.12)", marginLeft: 16 }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Capabilities */}
          <div className="flex-1 flex flex-col gap-3">
            <div className="text-xs font-semibold mb-2" style={{ fontFamily: "var(--font-mono)", color: "rgba(255,255,255,0.28)", fontSize: "0.6rem", letterSpacing: "0.08em" }}>
              TECHNICAL CAPABILITIES
            </div>
            {t.caps.map((cap) => (
              <div
                key={cap.label}
                className="p-4"
                style={{
                  border: `${cap.highlight ? 1.5 : 1}px solid ${cap.highlight ? `rgba(55,55,242,0.4)` : "rgba(255,255,255,0.07)"}`,
                  borderRadius: 4,
                  background: cap.highlight ? "rgba(55,55,242,0.08)" : "rgba(255,255,255,0.03)",
                }}
              >
                <div
                  className="text-xs font-semibold mb-1"
                  style={{ fontFamily: "var(--font-mono)", color: cap.highlight ? BLUE : "rgba(255,255,255,0.5)", letterSpacing: "0.07em", fontSize: "0.58rem" }}
                >
                  {cap.label}
                </div>
                <div className="text-xs" style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{cap.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
