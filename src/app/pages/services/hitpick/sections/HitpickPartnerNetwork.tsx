import { Factory, Globe2, Network, Store, Users } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import { COMPANY_METRICS } from "../../../../data/companyMetrics";
import { PARTNER_LOGOS, T } from "../constants";

const CATEGORY_ICONS = [Factory, Users, Store, Globe2];

function PartnerRoleRow({ items, reverse = false }: { items: readonly string[]; reverse?: boolean }) {
  const repeated = [...items, ...items, ...items];
  return (
    <div className="hp-role-marquee" tabIndex={0}>
      <div className={`hp-role-track${reverse ? " is-reverse" : ""}`}>
        {repeated.map((item, index) => {
          const Icon = CATEGORY_ICONS[index % CATEGORY_ICONS.length] ?? Network;
          return (
            <div className="hp-role-node" key={`${item}-${index}`} aria-hidden={index >= items.length}>
              <span aria-hidden="true"><Icon size={22} strokeWidth={1.45} /></span>
              <strong>{item}</strong>
              <i aria-hidden="true" />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function HitpickPartnerNetwork() {
  const { lang } = useLanguage();
  const t = T[lang];
  const metrics = [COMPANY_METRICS.globalPartners, COMPANY_METRICS.creatorNetwork];
  const middleRow = [...t.partnerCategories].reverse();

  return (
    <section className="hp-section hp-partners" aria-labelledby="hp-partners-title">
      <div className="hp-shell">
        <header className="hp-heading hp-partner-heading">
          <span className="hp-eyebrow hp-eyebrow-code">{t.partnerLabel}</span>
          <h2 id="hp-partners-title" className="hp-display">{t.partnerHeading}</h2>
          <p>{t.partnerDescription}</p>
        </header>

        {PARTNER_LOGOS.length > 0 ? (
          <div className="hp-logo-grid">
            {PARTNER_LOGOS.map((logo) => (
              <a key={logo.name} href={logo.href} aria-label={logo.name}>
                <img src={logo.src} alt={logo.name} />
              </a>
            ))}
          </div>
        ) : (
          <div className="hp-network-board">
            <div className="hp-network-orbit" aria-hidden="true"><Network size={30} strokeWidth={1.2} /></div>
            <PartnerRoleRow items={t.partnerCategories} />
            <PartnerRoleRow items={middleRow} reverse />
            <PartnerRoleRow items={t.partnerCategories} />
            {/* <p>{t.partnerAssetNotice}</p> */}
          </div>
        )}

        <div className="hp-metrics">
          {metrics.map((metric, index) => (
            <article key={metric.value + metric.labelEn}>
              <span className="hp-metric-icon" aria-hidden="true">{index === 0 ? <Globe2 size={30} /> : <Users size={30} />}</span>
              <strong>{metric.value}</strong>
              <div>
                <h3>{lang === "ko" ? metric.labelKo : metric.labelEn}</h3>
                <p>{lang === "ko" ? metric.noteKo : metric.noteEn}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
