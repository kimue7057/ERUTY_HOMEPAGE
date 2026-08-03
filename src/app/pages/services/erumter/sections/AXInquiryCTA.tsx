import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router";
import { useLanguage } from "../../../../context/LanguageContext";
import { buildStartProjectHref } from "../../../../data/inquiryOptions";
import { ERUMTER_COPY, ERUMTER_MEDIA } from "../constants";
import { Reveal } from "../components/Reveal";
import { SceneImage } from "../components/SceneImage";

export function AXInquiryCTA() {
  const { lang } = useLanguage();
  const t = ERUMTER_COPY[lang].final;
  const inquiryHref = buildStartProjectHref("erumter", "ax-diagnosis");

  return (
    <section className="er-final" aria-labelledby="er-final-title">
      <SceneImage
        src={ERUMTER_MEDIA.operations}
        alt={lang === "ko" ? "실제 업무 시스템의 운영 화면을 함께 확인하는 장면" : "A team reviewing an operating business system together"}
        className="er-final-media"
      />
      <div className="er-final-shade" />
      <div className="er-container er-final-inner">
        <Reveal>
          <span className="er-kicker er-kicker-light">{t.eyebrow}</span>
          <h2 id="er-final-title">{t.title}</h2>
          <p>{t.description}</p>
          <Link className="er-button er-button-primary" to={inquiryHref}>
            {t.cta}
            <ArrowUpRight aria-hidden="true" size={18} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
