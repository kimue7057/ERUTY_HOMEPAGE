import { useState } from "react";
import { useLanguage } from "../../../../context/LanguageContext";
import { BLUE, DARK, GRAY, BORDER, LIGHT_BG, MARKETS, REGIONS, STATUS_COLORS, MarketData, T } from "../constants";

function MarketDetail({ market, lang, exampleNote }: { market: MarketData; lang: "ko" | "en"; exampleNote: string }) {
  const rows: { label: string; value: string; accent?: string }[] = [
    { label: "Status", value: market.status, accent: STATUS_COLORS[market.status] },
    { label: "Business Area", value: market.businessArea },
    { label: "Target Asset", value: lang === "ko" ? market.targetAsset : market.targetAssetEn },
    { label: "Hitpick Role", value: lang === "ko" ? market.role : market.roleEn },
    { label: "Local Partner", value: lang === "ko" ? market.partnerType : market.partnerTypeEn },
    { label: "Current Activity", value: lang === "ko" ? market.activity : market.activityEn },
  ];

  return (
    <div style={{ border: `1px solid ${BORDER}`, borderRadius: 6, overflow: "hidden" }}>
      <div className="p-6" style={{ borderBottom: `1px solid ${BORDER}`, background: LIGHT_BG }}>
        <div
          className="text-xs font-semibold mb-2"
          style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: GRAY, fontSize: "0.6rem" }}
        >
          {market.region.toUpperCase()} · {market.name.toUpperCase()}
        </div>
        <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-display)", color: DARK, lineHeight: 1.3 }}>
          {lang === "ko" ? market.project : market.projectEn}
        </h3>
        <p style={{ fontSize: "0.6rem", color: "#C0C4CC", fontFamily: "var(--font-mono)" }}>
          {exampleNote}
        </p>
      </div>

      <div className="p-6 flex flex-col">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="flex items-start gap-4 py-3"
            style={{ borderBottom: i < rows.length - 1 ? `1px solid ${BORDER}` : "none" }}
          >
            <span className="text-xs flex-shrink-0 w-28" style={{ color: GRAY }}>{row.label}</span>
            <span className="text-sm flex-1" style={{ color: row.accent ?? DARK, fontWeight: row.accent ? 600 : 400 }}>
              {row.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function MarketsSection() {
  const { lang } = useLanguage();
  const t = T[lang];
  const [activeRegion, setActiveRegion] = useState("Asia");
  const [activeMarket, setActiveMarket] = useState<MarketData>(MARKETS[0]);

  const filtered = activeRegion === "All" ? MARKETS : MARKETS.filter((m) => m.region === activeRegion);

  const selectRegion = (r: string) => {
    setActiveRegion(r);
    const first = r === "All" ? MARKETS[0] : MARKETS.find((m) => m.region === r);
    if (first) setActiveMarket(first);
  };

  return (
    <section style={{ background: "#fff", borderBottom: `1px solid ${BORDER}` }}>
      <div className="mx-auto" style={{ maxWidth: 1280, padding: "80px 32px" }}>
        <div className="mb-12">
          <div className="text-xs font-semibold mb-4" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em", color: BLUE }}>
            {t.marketsLabel}
          </div>
          <h2
            className="font-bold mb-4"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: DARK, lineHeight: 1.25, whiteSpace: "pre-line" }}
          >
            {t.marketsHeading}
          </h2>
          <p className="text-sm max-w-lg" style={{ color: GRAY, lineHeight: 1.8, whiteSpace: "pre-line" }}>
            {t.marketsDesc}
          </p>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex gap-8 items-start">
          <div className="flex-shrink-0 w-60">
            <div className="flex flex-wrap gap-1.5 mb-5">
              {REGIONS.map((r) => (
                <button
                  key={r}
                  className="text-xs px-3 py-1.5 transition-all duration-150"
                  style={{
                    border: `1px solid ${activeRegion === r ? DARK : BORDER}`,
                    borderRadius: 3,
                    color: activeRegion === r ? DARK : GRAY,
                    fontWeight: activeRegion === r ? 600 : 400,
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => selectRegion(r)}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-0.5">
              {filtered.map((m) => (
                <button
                  key={m.name}
                  className="w-full text-left flex items-center justify-between px-3 py-3 transition-all duration-150"
                  style={{
                    borderRadius: 4,
                    borderLeft: `2px solid ${activeMarket.name === m.name ? BLUE : "transparent"}`,
                    background: activeMarket.name === m.name ? "rgba(55,55,242,0.05)" : "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveMarket(m)}
                >
                  <span className="text-sm" style={{ color: activeMarket.name === m.name ? DARK : GRAY, fontWeight: activeMarket.name === m.name ? 600 : 400 }}>
                    {m.name}
                  </span>
                  <span className="text-xs" style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", color: STATUS_COLORS[m.status] }}>
                    {m.status}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <MarketDetail market={activeMarket} lang={lang} exampleNote={t.exampleNote} />
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <div className="flex overflow-x-auto gap-2 mb-5 pb-1">
            {REGIONS.map((r) => (
              <button
                key={r}
                className="flex-shrink-0 text-xs px-3 py-2"
                style={{
                  border: `1px solid ${activeRegion === r ? DARK : BORDER}`,
                  borderRadius: 3,
                  color: activeRegion === r ? DARK : GRAY,
                  fontWeight: activeRegion === r ? 600 : 400,
                  background: "transparent",
                  minHeight: 44,
                }}
                onClick={() => selectRegion(r)}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-3">
            {filtered.map((m) => (
              <div key={m.name}>
                <button
                  className="w-full text-left flex items-center justify-between px-4 py-4"
                  style={{
                    border: `1px solid ${activeMarket.name === m.name ? BLUE : BORDER}`,
                    borderRadius: 4,
                    background: activeMarket.name === m.name ? "rgba(55,55,242,0.03)" : "#fff",
                    minHeight: 52,
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveMarket(m)}
                >
                  <span className="text-sm font-medium" style={{ color: DARK }}>{m.name}</span>
                  <span className="text-xs" style={{ fontFamily: "var(--font-mono)", fontSize: "0.56rem", color: STATUS_COLORS[m.status] }}>
                    {m.status}
                  </span>
                </button>
                {activeMarket.name === m.name && (
                  <div className="mt-2"><MarketDetail market={m} lang={lang} exampleNote={t.exampleNote} /></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
