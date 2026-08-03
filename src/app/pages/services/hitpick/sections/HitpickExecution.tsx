import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { EXECUTION_STEPS, T } from "../constants";

const AUTO_ADVANCE_MS = 4_500;
const SCROLL_SETTLE_MS = 900;

export function HitpickExecution() {
  const { lang } = useLanguage();
  const t = T[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const pauseReasonsRef = useRef(new Set<string>());
  const programmaticScrollRef = useRef(false);
  const programmaticScrollTimerRef = useRef<number | null>(null);
  const scrollResumeTimerRef = useRef<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const setPauseReason = useCallback((reason: string, paused: boolean) => {
    const reasons = pauseReasonsRef.current;
    if (paused) reasons.add(reason);
    else reasons.delete(reason);
    setIsPaused(reasons.size > 0);
  }, []);

  const moveTo = useCallback((index: number) => {
    const nextIndex = Math.max(0, Math.min(index, EXECUTION_STEPS.length - 1));
    const track = trackRef.current;
    const card = track?.querySelector<HTMLElement>(`[data-hp-card="${nextIndex}"]`);

    if (track && card) {
      programmaticScrollRef.current = true;
      if (programmaticScrollTimerRef.current !== null) window.clearTimeout(programmaticScrollTimerRef.current);
      const targetLeft = card.getBoundingClientRect().left - track.getBoundingClientRect().left + track.scrollLeft - 5;
      track.scrollTo({
        left: targetLeft,
        behavior: reducedMotionRef.current ? "auto" : "smooth",
      });
      programmaticScrollTimerRef.current = window.setTimeout(() => {
        programmaticScrollRef.current = false;
        programmaticScrollTimerRef.current = null;
      }, reducedMotionRef.current ? 0 : 700);
    }

    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);
  }, []);

  const syncIndex = useCallback(() => {
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
    activeIndexRef.current = nearest.index;
    setActiveIndex(nearest.index);
  }, []);

  const handleTrackScroll = useCallback(() => {
    syncIndex();
    if (programmaticScrollRef.current) return;
    setPauseReason("scroll", true);
    if (scrollResumeTimerRef.current !== null) window.clearTimeout(scrollResumeTimerRef.current);
    scrollResumeTimerRef.current = window.setTimeout(() => {
      setPauseReason("scroll", false);
      scrollResumeTimerRef.current = null;
    }, SCROLL_SETTLE_MS);
  }, [setPauseReason, syncIndex]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => {
      reducedMotionRef.current = media.matches;
      setReducedMotion(media.matches);
    };
    syncMotionPreference();
    media.addEventListener("change", syncMotionPreference);
    return () => media.removeEventListener("change", syncMotionPreference);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isPaused || reducedMotion) return;
    const intervalId = window.setInterval(() => {
      moveTo((activeIndexRef.current + 1) % EXECUTION_STEPS.length);
    }, AUTO_ADVANCE_MS);
    return () => window.clearInterval(intervalId);
  }, [isInView, isPaused, moveTo, reducedMotion]);

  useEffect(() => () => {
    if (scrollResumeTimerRef.current !== null) window.clearTimeout(scrollResumeTimerRef.current);
    if (programmaticScrollTimerRef.current !== null) window.clearTimeout(programmaticScrollTimerRef.current);
  }, []);

  return (
    <section ref={sectionRef} className="hp-section hp-execution" aria-labelledby="hp-execution-title">
      <div className="hp-shell">
        <header className="hp-heading hp-execution-heading">
          <span className="hp-eyebrow hp-eyebrow-code">{t.executionLabel}</span>
          <h2 id="hp-execution-title" className="hp-display">{t.executionHeading}</h2>
          <p>{t.executionDescription}</p>
        </header>

        <div
          className="hp-slider-stage"
          onMouseEnter={() => setPauseReason("hover", true)}
          onMouseLeave={() => setPauseReason("hover", false)}
          onFocusCapture={() => setPauseReason("focus", true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPauseReason("focus", false);
          }}
          onTouchStart={() => setPauseReason("touch", true)}
          onTouchEnd={() => setPauseReason("touch", false)}
          onTouchCancel={() => setPauseReason("touch", false)}
          onPointerDown={() => setPauseReason("pointer", true)}
          onPointerUp={() => setPauseReason("pointer", false)}
          onPointerCancel={() => setPauseReason("pointer", false)}
        >
          <div className="hp-slider-toolbar">
            <div className="hp-slider-controls" aria-label={lang === "ko" ? "실행 단계 이동" : "Move through execution steps"}>
              <button type="button" onClick={() => moveTo(activeIndex - 1)} disabled={activeIndex === 0} aria-label={t.previousStep}>
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <button type="button" onClick={() => moveTo(activeIndex + 1)} disabled={activeIndex === EXECUTION_STEPS.length - 1} aria-label={t.nextStep}>
                <ArrowRight size={20} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div ref={trackRef} className="hp-card-track" onScroll={handleTrackScroll} tabIndex={0}>
            {EXECUTION_STEPS.map((step, index) => (
              <article
                key={step.num}
                data-hp-card={index}
                className={`hp-execution-card${activeIndex === index ? " is-active" : ""}`}
                onMouseEnter={() => {
                  activeIndexRef.current = index;
                  setActiveIndex(index);
                }}
                onFocus={() => {
                  activeIndexRef.current = index;
                  setActiveIndex(index);
                }}
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
      </div>
    </section>
  );
}
