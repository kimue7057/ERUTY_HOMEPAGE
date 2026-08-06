import { Fragment } from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import { ERUMTER_COPY, SOLUTIONS } from "../constants";
import { Reveal } from "../components/Reveal";
import { SceneImage } from "../components/SceneImage";

export function TransformationSolutions() {
  const { lang } = useLanguage();
  const t = ERUMTER_COPY[lang].solutions;

  return (
    <section className="er-section er-solutions" aria-labelledby="er-solutions-title">
      <div className="er-container">
        <Reveal className="er-solutions-intro">
          <span className="er-kicker er-kicker-code">{t.eyebrow}</span>
          <h2 id="er-solutions-title">{t.title}</h2>
          <p>{t.description}</p>
        </Reveal>

        <div className="er-solutions-grid">
          {SOLUTIONS.map((solution, index) => (
            <Reveal className={`er-solution er-solution-${index + 1}`} delay={index % 2 ? 0.08 : 0} key={solution.title}>
              <div className="er-solution-media">
                <SceneImage src={solution.image} alt={solution.imageAlt[lang]} />
                <div className="er-solution-visual" aria-hidden="true">
                  {solution.visual[lang].map((item, visualIndex) => (
                    <Fragment key={item}>
                      <span>{item}</span>
                      {visualIndex < solution.visual[lang].length - 1 ? <i>→</i> : null}
                    </Fragment>
                  ))}
                </div>
              </div>
              <div className="er-solution-body">
                <span className="er-solution-number">{solution.number}</span>
                <div>
                  <h3>{solution.title}</h3>
                  <ul>
                    {solution.items[lang].map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
