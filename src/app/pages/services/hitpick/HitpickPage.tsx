import { HitpickHero } from "./sections/HitpickHero";
import { HitpickIntro } from "./sections/HitpickIntro";
import { HitpickExecution } from "./sections/HitpickExecution";
import { HitpickTechnologyEngine } from "./sections/HitpickTechnologyEngine";
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
      <HitpickSignalCoverage />
      <HitpickPartnerNetwork />
      <HitpickFinalCta />
    </div>
  );
}
