import { BarChart3, Database, Plane, ShieldCheck, Sparkles, ShoppingCart } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { EXECUTION_STEPS, T } from "../constants";

const TECH_ICONS = [Database, Sparkles, ShoppingCart, ShieldCheck, BarChart3];

export function HitpickTechnologyEngine() {
  const { lang } = useLanguage();
  const t = T[lang];

  return (
    <section className="hp-tech" aria-labelledby="hp-tech-title">
      <div className="hp-shell">
        <header className="hp-tech-heading">
          <div>
            <span className="hp-eyebrow hp-eyebrow-light">TECHNOLOGY FOUNDATION</span>
            <h2 id="hp-tech-title">{t.technologyEngine}</h2>
          </div>
          <p>{t.technologyDescription}</p>
        </header>

        <div className="hp-tech-flow">
          {EXECUTION_STEPS.map((step, index) => {
            const Icon = TECH_ICONS[index] ?? Plane;
            return (
              <article key={step.technology.name}>
                <span className="hp-tech-index">{step.num}</span>
                <span className="hp-tech-icon" aria-hidden="true"><Icon size={25} strokeWidth={1.4} /></span>
                <h3>{step.technology.name}</h3>
                <p>{step.technology.description[lang]}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
