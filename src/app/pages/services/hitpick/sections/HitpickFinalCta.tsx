import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { useLanguage } from "../../../../context/LanguageContext";
import { buildStartProjectHref } from "../../../../data/inquiryOptions";
import { T } from "../constants";

export function HitpickFinalCta() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <section className="hp-final-cta" aria-labelledby="hp-cta-title">
      <img src="/images/services/hitpick/cta-global-network.webp" alt="" aria-hidden="true" loading="lazy" />
      <div className="hp-final-cta-overlay" aria-hidden="true" />
      <div className="hp-shell hp-final-cta-content">
        <span className="hp-eyebrow hp-eyebrow-light hp-eyebrow-code">{t.ctaLabel}</span>
        <h2 id="hp-cta-title" className="hp-display">{t.ctaHeading}</h2>
        <p>{t.ctaDescription}</p>
        <Link className="hp-button hp-button-light" to={buildStartProjectHref("hitpick", "global-expansion")}>
          {t.ctaButton}
          <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
