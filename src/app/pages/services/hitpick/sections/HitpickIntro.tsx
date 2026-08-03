import { ArrowRight, BarChart3, Check, Plane, Search, ShoppingCart, Sparkles } from "lucide-react";
import { Link } from "react-router";
import { useLanguage } from "../../../../context/LanguageContext";
import { buildStartProjectHref } from "../../../../data/inquiryOptions";
import { T } from "../constants";

const STEP_ICONS = [Search, Sparkles, ShoppingCart, Plane, BarChart3];

export function HitpickIntro() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <section className="hp-section hp-intro" aria-labelledby="hp-intro-title">
      <div className="hp-shell">
        <div className="hp-intro-grid">
          <div>
            <span className="hp-eyebrow hp-eyebrow-code">{t.introLabel}</span>
            <h2 id="hp-intro-title" className="hp-display">{t.introHeading}</h2>
          </div>
          <div className="hp-intro-copy">
            <p>{t.introDescription}</p>
            <Link className="hp-button" to={buildStartProjectHref("hitpick", "global-expansion")}>
              {t.introCta}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <ol className="hp-process" aria-label={lang === "ko" ? "히트픽 실행 단계" : "HITPICK execution steps"}>
          {t.summarySteps.map((step, index) => {
            const Icon = STEP_ICONS[index];
            return (
              <li key={step}>
                <span className="hp-process-number">{String(index + 1).padStart(2, "0")}</span>
                <span className="hp-process-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.5} /></span>
                <strong>{step}</strong>
                <Check className="hp-process-check" size={15} aria-hidden="true" />
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
