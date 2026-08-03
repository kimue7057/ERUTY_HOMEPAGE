import { HitpickHero } from "./sections/HitpickHero";
import { HitpickIntro } from "./sections/HitpickIntro";
import { HitpickExecution } from "./sections/HitpickExecution";
import { HitpickTechnologyEngine } from "./sections/HitpickTechnologyEngine";
import { HitpickBlockchainTrust } from "./sections/HitpickBlockchainTrust";
import { HitpickSignalCoverage } from "./sections/HitpickSignalCoverage";
import { HitpickPartnerNetwork } from "./sections/HitpickPartnerNetwork";
import { HitpickFinalCta } from "./sections/HitpickFinalCta";
import "./HitpickPage.css";

export function HitpickPage() {
  return (
    <div className="hitpick-page">
      <HitpickHero />
      <HitpickIntro />
      <HitpickExecution />
      <HitpickTechnologyEngine />
      <HitpickBlockchainTrust />
      <HitpickSignalCoverage />
      <HitpickPartnerNetwork />
      <HitpickFinalCta />
    </div>
  );
}
