import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import { T } from "../constants";

const STEP_THRESHOLDS = [0.19, 0.38, 0.57, 0.78] as const;

function getActiveStep(currentTime: number, duration: number) {
  if (!Number.isFinite(duration) || duration <= 0) return 0;

  const progress = currentTime / duration;
  const thresholdIndex = STEP_THRESHOLDS.findIndex(
    (threshold) => progress < threshold,
  );

  return thresholdIndex === -1 ? STEP_THRESHOLDS.length : thresholdIndex;
}

export function HitpickHero() {
  const { lang } = useLanguage();
  const t = T[lang];
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [videoStarted, setVideoStarted] = useState(false);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const nextStep = getActiveStep(video.currentTime, video.duration);
    setActiveStep((currentStep) =>
      currentStep === nextStep ? currentStep : nextStep,
    );
  }, []);

  useEffect(() => {
    const hero = heroRef.current;
    const video = videoRef.current;
    if (!hero || !video) return undefined;

    let isInViewport = true;

    const attemptPlayback = () => {
      if (!isInViewport || document.hidden) return;

      video.muted = true;
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => {
          setVideoStarted(false);
        });
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewport = entry.isIntersecting;
        if (isInViewport && !document.hidden) {
          attemptPlayback();
        } else {
          video.pause();
        }
      },
      { rootMargin: "120px 0px", threshold: 0.05 },
    );

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else {
        attemptPlayback();
      }
    };

    const handleLoadedMetadata = () => attemptPlayback();

    observer.observe(hero);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    attemptPlayback();

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, []);

  const currentStep = t.heroSteps[activeStep] ?? t.heroSteps[0];

  return (
    <section
      ref={heroRef}
      className="hp-hero"
      aria-labelledby="hp-hero-title"
    >
      <div className="hp-hero-frame">
        <div className="hp-hero-media">
          <video
            ref={videoRef}
            className={`hp-hero-video${videoStarted ? " is-playing" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster="/images/services/hitpick/hero-video-poster.webp"
            aria-hidden="true"
            onPlaying={() => setVideoStarted(true)}
            onError={() => setVideoStarted(false)}
            onTimeUpdate={handleTimeUpdate}
          >
            <source
              src="/videos/services/hitpick/hitpick-hero.webm"
              type="video/webm"
            />
            <source
              src="/videos/services/hitpick/hitpick-hero.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="hp-hero-overlay" aria-hidden="true" />

        <div className="hp-hero-copy">
          <span className="hp-eyebrow hp-eyebrow-light">{t.heroLabel}</span>
          <h1 id="hp-hero-title">{t.heroHeading}</h1>
          <p>{t.heroDescription}</p>
        </div>

        <div className="hp-hero-route" aria-hidden="true">
          <div className="hp-hero-route-track" data-active-step={activeStep}>
            {t.heroSteps.map((step, index) => (
              <span
                key={step.code}
                className={
                  index === activeStep
                    ? "is-active"
                    : index < activeStep
                      ? "is-complete"
                      : undefined
                }
              >
                <strong>
                  <i>{String(index + 1).padStart(2, "0")}</i>
                  <b>{step.code}</b>
                </strong>
                <small>{step.label}</small>
              </span>
            ))}
          </div>

          <p className="hp-hero-route-current">
            <i>{String(activeStep + 1).padStart(2, "0")}</i>
            <strong>{currentStep.code}</strong>
            <span>·</span>
            {currentStep.label}
          </p>
        </div>

        <p className="sr-only">{t.heroFallback}</p>
      </div>
    </section>
  );
}
