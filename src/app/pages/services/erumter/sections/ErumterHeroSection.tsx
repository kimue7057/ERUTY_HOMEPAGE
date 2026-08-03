import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Link } from "react-router";
import { buildStartProjectHref } from "../../../../data/inquiryOptions";
import { useLanguage } from "../../../../context/LanguageContext";
import { ERUMTER_COPY, ERUMTER_MEDIA } from "../constants";
import { SceneImage } from "../components/SceneImage";

export function ErumterHeroSection({
  onScrollToProcess,
}: {
  onScrollToProcess: () => void;
}) {
  const { lang } = useLanguage();
  const t = ERUMTER_COPY[lang].hero;
  const reduceMotion = useReducedMotion();
  const inquiryHref = buildStartProjectHref("erumter", "ax-diagnosis");

  return (
    <section className="er-hero" aria-labelledby="erumter-hero-title">
      <SceneImage
        src={ERUMTER_MEDIA.hero}
        alt={lang === "ko" ? "팀이 회의실에서 업무를 함께 설계하는 장면" : "A team redesigning work together in a meeting room"}
        className="er-hero-media"
        priority
      />
      <div className="er-hero-shade" />
      <div className="er-container er-hero-layout">
        <motion.div
          className="er-hero-copy"
          initial={reduceMotion ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="er-kicker er-kicker-light">{t.eyebrow}</span>
          <h1 id="erumter-hero-title">{t.title}</h1>
          <p>{t.description}</p>
          <div className="er-hero-actions">
            <Link className="er-button er-button-primary" to={inquiryHref}>
              {t.primary}
              <ArrowUpRight aria-hidden="true" size={18} />
            </Link>
            <button className="er-text-link er-text-link-light" type="button" onClick={onScrollToProcess}>
              {t.secondary}
              <ArrowRight aria-hidden="true" size={18} />
            </button>
          </div>
        </motion.div>

        <motion.aside
          className="er-diagnostic-panel"
          aria-label={t.panelTitle}
          initial={reduceMotion ? false : { opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="er-diagnostic-head">
            <span>{t.panelTitle}</span>
            <span className="er-live-dot">AX</span>
          </div>
          <div className="er-diagnostic-list">
            {t.panelItems.map(([label, value], index) => (
              <div className="er-diagnostic-row" key={label}>
                <span className="er-diagnostic-index">0{index + 1}</span>
                <span>
                  <strong>{label}</strong>
                  <small>{value}</small>
                </span>
                <span className="er-diagnostic-status" aria-hidden="true" />
              </div>
            ))}
          </div>
        </motion.aside>
      </div>
      <button className="er-scroll-cue" type="button" onClick={onScrollToProcess} aria-label={t.secondary}>
        <ChevronDown aria-hidden="true" size={18} />
      </button>
    </section>
  );
}
