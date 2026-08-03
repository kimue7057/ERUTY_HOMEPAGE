import { useLanguage } from "../../../../context/LanguageContext";
import { ERUMTER_COPY, ERUMTER_MEDIA } from "../constants";
import { Reveal } from "../components/Reveal";
import { SceneImage } from "../components/SceneImage";

export function AXEducation() {
  const { lang } = useLanguage();
  const t = ERUMTER_COPY[lang].education;

  return (
    <section className="er-section er-education" aria-labelledby="er-education-title">
      <div className="er-container">
        <Reveal className="er-education-grid">
          <div className="er-education-copy">
            <span className="er-kicker">{t.eyebrow}</span>
            <h2 id="er-education-title">{t.title}</h2>
            <p>{t.description}</p>
          </div>
          <div className="er-education-scene">
            <SceneImage
              src={ERUMTER_MEDIA.education}
              alt={lang === "ko" ? "실무자들이 함께 업무 흐름을 설계하는 교육 워크숍" : "A practical workshop where a team designs its workflow"}
            />
            <div className="er-education-flow">
              {t.flow.map((item, index) => (
                <span key={item}>
                  <i>0{index + 1}</i>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

