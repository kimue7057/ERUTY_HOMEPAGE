import { useMemo, useState } from "react";
import { Building2, CircleDot, Megaphone, Radio, ShoppingBag, Users } from "lucide-react";
import { useLanguage } from "../../../../context/LanguageContext";
import {
  MARKET_SIGNALS,
  REGIONS,
  type MarketRegion,
  type MarketSignal,
  type SignalCategory,
  T,
} from "../constants";

type RegionFilter = "All" | MarketRegion;

const SIGNAL_ICONS = {
  Content: Megaphone,
  Consumer: Users,
  Channel: ShoppingBag,
  Partner: Building2,
} satisfies Record<SignalCategory, typeof Megaphone>;

function MarketPanel({ market }: { market: MarketSignal }) {
  const { lang } = useLanguage();
  const t = T[lang];
  const overview = [
    [t.signalLabels.monitoring, market.monitoring[lang]],
    [t.signalLabels.collected, market.collected[lang]],
    [t.signalLabels.coverage, market.coverage[lang]],
    [t.signalLabels.action, market.action[lang]],
    [t.signalLabels.output, market.output[lang]],
  ];

  return (
    <div className="hp-signal-panel" aria-live="polite">
      <header className="hp-signal-panel-header">
        <div>
          <span>{market.region}</span>
          <h3>{market.name}</h3>
        </div>
        <div className="hp-monitoring-badge"><Radio size={15} aria-hidden="true" />{t.signalMockupLabel}</div>
      </header>

      <dl className="hp-signal-overview">
        {overview.map(([label, value], index) => (
          <div key={label} className={index === 0 ? "is-live" : ""}>
            <dt>{label}</dt>
            <dd>{index === 0 && <CircleDot size={14} aria-hidden="true" />}{value}</dd>
          </div>
        ))}
      </dl>

      <div className="hp-signal-categories">
        {(Object.keys(SIGNAL_ICONS) as SignalCategory[]).map((category) => {
          const Icon = SIGNAL_ICONS[category];
          return (
            <article key={category}>
              <span className="hp-signal-category-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.5} /></span>
              <div>
                <small>{t.signalCategories[category]}</small>
                <strong>{market.signals[category][lang]}</strong>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}

export function HitpickSignalCoverage() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [region, setRegion] = useState<RegionFilter>("All");
  const [marketId, setMarketId] = useState(MARKET_SIGNALS[0].id);

  const visibleMarkets = useMemo(
    () => region === "All" ? MARKET_SIGNALS : MARKET_SIGNALS.filter((market) => market.region === region),
    [region],
  );
  const activeMarket = MARKET_SIGNALS.find((market) => market.id === marketId) ?? visibleMarkets[0];

  const selectRegion = (nextRegion: RegionFilter) => {
    setRegion(nextRegion);
    const firstMarket = nextRegion === "All"
      ? MARKET_SIGNALS[0]
      : MARKET_SIGNALS.find((market) => market.region === nextRegion);
    if (firstMarket) setMarketId(firstMarket.id);
  };

  return (
    <section className="hp-section hp-signals" aria-labelledby="hp-signals-title">
      <div className="hp-shell">
        <header className="hp-heading">
          <span className="hp-eyebrow">{t.signalLabel}</span>
          <h2 id="hp-signals-title" className="hp-display">{t.signalHeading}</h2>
          <p>{t.signalDescription}</p>
        </header>

        <div className="hp-region-tabs" role="tablist" aria-label={lang === "ko" ? "지역 필터" : "Region filters"}>
          {REGIONS.map((item) => (
            <button
              type="button"
              role="tab"
              key={item.key}
              aria-selected={region === item.key}
              className={region === item.key ? "is-active" : ""}
              onClick={() => selectRegion(item.key)}
            >
              {item.label[lang]}
            </button>
          ))}
        </div>

        <div className="hp-signal-stage">
          <aside className="hp-market-list" aria-label={t.marketList}>
            <span className="hp-market-list-label">{t.marketList}</span>
            {visibleMarkets.map((market) => (
              <button
                type="button"
                key={market.id}
                className={activeMarket.id === market.id ? "is-active" : ""}
                onClick={() => setMarketId(market.id)}
                aria-pressed={activeMarket.id === market.id}
              >
                <span>{market.name}</span>
                <small>{market.monitoring[lang]}</small>
              </button>
            ))}
          </aside>
          <MarketPanel market={activeMarket} />
        </div>
      </div>
    </section>
  );
}
