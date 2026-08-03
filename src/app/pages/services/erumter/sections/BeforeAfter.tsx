import { Check } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { COMPARISON, ERUMTER_COPY, ERUMTER_MEDIA } from "../constants";
import { Reveal } from "../components/Reveal";
import { SceneImage } from "../components/SceneImage";

export function BeforeAfter() {
  const { lang } = useLanguage();
  const t = ERUMTER_COPY[lang].compare;

  return (
    <section className="er-section er-comparison" aria-labelledby="er-comparison-title">
      <div className="er-container">
        <Reveal className="er-comparison-intro">
          <span className="er-kicker">{t.eyebrow}</span>
          <h2 id="er-comparison-title">{t.title}</h2>
        </Reveal>

        <div className="er-comparison-grid">
          <Reveal className="er-compare-panel er-before">
            <div className="er-compare-media">
              <SceneImage src={ERUMTER_MEDIA.problem} alt={t.beforeAlt} />
              <span>{t.before}</span>
            </div>
            <ol>
              {COMPARISON.before[lang].map((item, index) => (
                <li key={item}><span>0{index + 1}</span>{item}</li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="er-compare-panel er-after" delay={0.08}>
            <div className="er-compare-media">
              <SceneImage src={ERUMTER_MEDIA.operations} alt={t.afterAlt} />
              <span>{t.after}</span>
            </div>
            <ol>
              {COMPARISON.after[lang].map((item) => (
                <li key={item}><Check aria-hidden="true" size={15} />{item}</li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
