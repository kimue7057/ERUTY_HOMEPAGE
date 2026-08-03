import { useLanguage } from "../../../../context/LanguageContext";
import { ERUMTER_COPY, ERUMTER_MEDIA } from "../constants";
import { Reveal } from "../components/Reveal";
import { SceneImage } from "../components/SceneImage";

export function WhatErumterTransforms() {
  const { lang } = useLanguage();
  const t = ERUMTER_COPY[lang].problem;

  return (
    <section className="er-section er-problem" aria-labelledby="er-problem-title">
      <div className="er-container er-problem-layout">
        <Reveal className="er-section-copy">
          <span className="er-kicker er-kicker-code">{t.eyebrow}</span>
          <h2 id="er-problem-title">{t.title}</h2>
          <p>{t.description}</p>
        </Reveal>

        <Reveal className="er-problem-scene" delay={0.08}>
          <SceneImage
            src={ERUMTER_MEDIA.problem}
            alt={lang === "ko" ? "여러 자료와 시스템을 직접 연결하며 일하는 장면" : "A professional manually connecting work across materials and systems"}
          />
          <div className="er-problem-vignette" />
          <span className="er-problem-center">{t.center}</span>
          <div className="er-problem-nodes" aria-label={t.nodes.join(", ")}>
            {t.nodes.map((node, index) => (
              <span className={`er-problem-node er-problem-node-${index + 1}`} key={node}>
                <i aria-hidden="true" />
                {node}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
