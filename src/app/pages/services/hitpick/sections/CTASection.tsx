import { useState } from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { buildStartProjectHref } from "../../../../data/inquiryOptions";
import { useLanguage } from "../../../../context/LanguageContext";
import { BLUE, NEAR_BLACK, T } from "../constants";

export function CTASection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const inquiryHref = buildStartProjectHref(
    "hitpick",
    selectedPath === "content"
      ? "content-ip"
      : selectedPath === "creator"
        ? "creator-marketing"
        : selectedPath === "partner"
          ? "global-partner"
          : "global-expansion",
  );

  return (
    <section style={{ background: NEAR_BLACK }}>
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "96px 32px" }}>
        <div className="max-w-2xl mb-14">
          <h2
            className="font-bold mb-5"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.75rem)", color: "#fff", lineHeight: 1.22, whiteSpace: "pre-line" }}
          >
            {t.ctaHeading}
          </h2>
          <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.85, whiteSpace: "pre-line" }}>
            {t.ctaDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {t.inquiryPaths.map((path) => (
            <button
              key={path.key}
              className="text-left p-5 transition-all duration-200"
              style={{
                border: `1px solid ${selectedPath === path.key ? BLUE : "rgba(255,255,255,0.1)"}`,
                borderRadius: 5,
                background: selectedPath === path.key ? "rgba(55,55,242,0.12)" : "rgba(255,255,255,0.03)",
                cursor: "pointer",
                minHeight: 44,
              }}
              aria-pressed={selectedPath === path.key}
              onClick={() => setSelectedPath(selectedPath === path.key ? null : path.key)}
              onMouseEnter={(e) => {
                if (selectedPath !== path.key)
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.22)";
              }}
              onMouseLeave={(e) => {
                if (selectedPath !== path.key)
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              }}
            >
              <div className="text-sm font-semibold mb-1.5" style={{ color: selectedPath === path.key ? BLUE : "#fff" }}>
                {path.label}
              </div>
              <div className="text-xs" style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
                {path.desc}
              </div>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-5">
          <Link
            to={inquiryHref}
            className="px-7 py-3.5 text-sm font-medium transition-all duration-200"
            style={{ background: BLUE, color: "#fff", borderRadius: 4 }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "#2626CC")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = BLUE)}
          >
            {t.ctaPrimary}
          </Link>
          <Link
            to={inquiryHref}
            className="flex items-center gap-1.5 text-sm transition-colors duration-150"
            style={{ color: "rgba(255,255,255,0.5)" }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
          >
            {t.ctaSecondary}
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
}
