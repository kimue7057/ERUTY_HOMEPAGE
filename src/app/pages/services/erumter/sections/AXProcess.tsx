import { forwardRef, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLanguage } from "../../../../context/LanguageContext";
import { ERUMTER_COPY, PROCESS_STEPS } from "../constants";
import { Reveal } from "../components/Reveal";
import { SceneImage } from "../components/SceneImage";

type ProcessStep = (typeof PROCESS_STEPS)[number];

function ProcessVisual({ step, lang, mobile = false }: { step: ProcessStep; lang: "ko" | "en"; mobile?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={mobile ? "er-process-mobile-visual" : "er-process-visual"}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          className={`er-process-frame er-process-frame-${step.number}`}
          key={`${mobile ? "mobile" : "desktop"}-${step.number}`}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.985 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <SceneImage src={step.image} alt={step.imageAlt[lang]} />
          <div className="er-process-image-shade" />
          <div className="er-process-overlay">
            <div className="er-process-overlay-head">
              <span>{step.number}</span>
              <strong>{step.title}</strong>
            </div>
            <div className="er-process-flow">
              {step.overlay[lang].map((item, index) => (
                <span key={item}>
                  <i aria-hidden="true" />
                  {item}
                  {index < step.overlay[lang].length - 1 ? <b aria-hidden="true">→</b> : null}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export const AXProcess = forwardRef<HTMLElement>(function AXProcess(_, forwardedRef) {
  const { lang } = useLanguage();
  const t = ERUMTER_COPY[lang].process;
  const [activeStep, setActiveStep] = useState(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = Number((visible.target as HTMLElement).dataset.stepIndex);
        if (Number.isFinite(index)) setActiveStep(index);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    itemRefs.current.forEach((item) => item && observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="er-section er-process" ref={forwardedRef} aria-labelledby="er-process-title">
      <div className="er-container">
        <Reveal className="er-process-intro">
          <span className="er-kicker er-kicker-light er-kicker-code">{t.eyebrow}</span>
          <h2 id="er-process-title">{t.title}</h2>
          <p>{t.description}</p>
        </Reveal>

        <div className="er-process-layout">
          <div className="er-process-steps">
            {PROCESS_STEPS.map((step, index) => (
              <article
                className={`er-process-step${activeStep === index ? " is-active" : ""}`}
                data-step-index={index}
                key={step.number}
                aria-current={activeStep === index ? "step" : undefined}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                tabIndex={0}
                onFocus={() => setActiveStep(index)}
                onMouseEnter={() => setActiveStep(index)}
              >
                <span className="er-process-number">STEP {step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description[lang]}</p>
                <div className="er-process-outputs">
                  <small>{t.outputLabel}</small>
                  <ul>
                    {step.outputs[lang].map((output) => <li key={output}>{output}</li>)}
                  </ul>
                </div>
              </article>
            ))}
          </div>
          <div className="er-process-axis" aria-hidden="true">
            <span className="er-process-axis-track" />
            <div className="er-process-axis-list">
              {PROCESS_STEPS.map((step, index) => (
                <span
                  className={`er-process-axis-node${activeStep === index ? " is-active" : ""}`}
                  key={step.number}
                >
                  <i />
                </span>
              ))}
            </div>
          </div>
          <div className="er-process-sticky">
            <ProcessVisual step={PROCESS_STEPS[activeStep]} lang={lang} />
          </div>
        </div>

        <div className="er-process-mobile">
          <nav className="er-process-mobile-progress" aria-label={t.eyebrow}>
            {PROCESS_STEPS.map((step, index) => (
              <button
                type="button"
                className={activeStep === index ? "is-active" : undefined}
                aria-current={activeStep === index ? "step" : undefined}
                aria-controls={`er-process-mobile-step-${index}`}
                onClick={() => setActiveStep(index)}
                key={step.number}
              >
                {step.number}
              </button>
            ))}
          </nav>

          <div className="er-process-mobile-steps">
            {PROCESS_STEPS.map((step, index) => (
              <details
                className="er-process-mobile-step"
                id={`er-process-mobile-step-${index}`}
                open={activeStep === index}
                onToggle={(event) => {
                  if (event.currentTarget.open) setActiveStep(index);
                }}
                key={step.number}
              >
                <summary>
                  <span>STEP {step.number}</span>
                  <strong>{step.title}</strong>
                </summary>
                <div className="er-process-mobile-copy">
                  <p>{step.description[lang]}</p>
                  <div className="er-process-outputs">
                    <small>{t.outputLabel}</small>
                    <ul>
                      {step.outputs[lang].map((output) => <li key={output}>{output}</li>)}
                    </ul>
                  </div>
                </div>
              </details>
            ))}
          </div>

          <ProcessVisual step={PROCESS_STEPS[activeStep]} lang={lang} mobile />
        </div>
      </div>
    </section>
  );
});
