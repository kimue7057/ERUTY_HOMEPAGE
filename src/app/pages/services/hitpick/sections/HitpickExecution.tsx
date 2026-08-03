import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { EXECUTION_STEPS, T } from "../constants";

export function HitpickExecution() {
  const { lang } = useLanguage();
  const t = T[lang];
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const moveTo = (index: number) => {
    const nextIndex = Math.max(0, Math.min(index, EXECUTION_STEPS.length - 1));
    const card = trackRef.current?.querySelector<HTMLElement>(`[data-hp-card="${nextIndex}"]`);
    card?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    setActiveIndex(nextIndex);
  };

  const syncIndex = () => {
    const track = trackRef.current;
    if (!track) return;
    const trackLeft = track.getBoundingClientRect().left;
    const cards = Array.from(track.querySelectorAll<HTMLElement>("[data-hp-card]"));
    const nearest = cards.reduce(
      (best, card, index) => {
        const distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
        return distance < best.distance ? { index, distance } : best;
      },
      { index: 0, distance: Number.POSITIVE_INFINITY },
    );
    setActiveIndex(nearest.index);
  };

  return (
    <section className="hp-section hp-execution" aria-labelledby="hp-execution-title">
      <div className="hp-shell">
        <header className="hp-heading hp-heading-row">
          <div>
            <span className="hp-eyebrow">{t.executionLabel}</span>
            <h2 id="hp-execution-title" className="hp-display">{t.executionHeading}</h2>
            <p>{t.executionDescription}</p>
          </div>
          <div className="hp-slider-controls" aria-label={lang === "ko" ? "실행 단계 이동" : "Move through execution steps"}>
            <button type="button" onClick={() => moveTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label={t.previousStep}>
              <ArrowLeft size={20} aria-hidden="true" />
            </button>
            <button type="button" onClick={() => moveTo(activeIndex + 1)} disabled={activeIndex === EXECUTION_STEPS.length - 1} aria-label={t.nextStep}>
              <ArrowRight size={20} aria-hidden="true" />
            </button>
          </div>
        </header>

        <div ref={trackRef} className="hp-card-track" onScroll={syncIndex} tabIndex={0}>
          {EXECUTION_STEPS.map((step, index) => (
            <article
              key={step.num}
              data-hp-card={index}
              className={`hp-execution-card${activeIndex === index ? " is-active" : ""}`}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              tabIndex={0}
            >
              <figure>
                <img src={step.visual} alt={step.visualAlt[lang]} loading={index > 1 ? "lazy" : "eager"} />
                <figcaption>{lang === "ko" ? "서비스 구조 설명용 목업" : "Illustrative service mockup"}</figcaption>
              </figure>
              <div className="hp-card-body">
                <span className="hp-card-number">{step.num}</span>
                <h3>{step.title[lang]}</h3>
                <p>{step.description[lang]}</p>
                <div className="hp-card-keywords">
                  {step.outcomes[lang].map((outcome) => <span key={outcome}>{outcome}</span>)}
                </div>
              </div>
            </article>
          ))}
          <div className="hp-track-spacer" aria-hidden="true" />
        </div>

        <div className="hp-progress" aria-hidden="true">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <div><i style={{ width: `${((activeIndex + 1) / EXECUTION_STEPS.length) * 100}%` }} /></div>
          <span>{String(EXECUTION_STEPS.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
