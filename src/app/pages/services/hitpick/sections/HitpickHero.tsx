import { useLanguage } from "../../../../context/LanguageContext";
import { T } from "../constants";

export function HitpickHero() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <section className="hp-hero" aria-labelledby="hp-hero-title">
      <div className="hp-hero-frame">
        <img
          className="hp-hero-image"
          src="/images/services/hitpick/hero-panorama.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
        />
        <div className="hp-hero-overlay" aria-hidden="true" />

        <div className="hp-hero-copy">
          <span className="hp-eyebrow hp-eyebrow-light">{t.heroLabel}</span>
          <h1 id="hp-hero-title">{t.heroHeading}</h1>
        </div>

        <div className="hp-hero-route" aria-hidden="true">
          {t.heroMediaLabel.split(" → ").map((item, index) => (
            <span key={item}>
              <i>{String(index + 1).padStart(2, "0")}</i>
              {item}
            </span>
          ))}
        </div>

        <p className="sr-only">{t.heroFallback}</p>
      </div>
    </section>
  );
}
