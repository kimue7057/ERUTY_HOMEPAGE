import { useRef, useCallback } from "react";
import { HeroSection } from "./sections/HeroSection";
import { EntryRoutesSection } from "./sections/EntryRoutesSection";
import { ProcessSection } from "./sections/ProcessSection";
import { IntelligenceSection } from "./sections/IntelligenceSection";
import { MarketsSection } from "./sections/MarketsSection";
import { CTASection } from "./sections/CTASection";

export function HitpickPage() {
  const processRef = useRef<HTMLDivElement>(null);

  const scrollToProcess = useCallback(() => {
    processRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div style={{ paddingTop: 76, background: "#fff" }}>
      <HeroSection onScrollToProcess={scrollToProcess} />
      <EntryRoutesSection />
      <ProcessSection ref={processRef} />
      <IntelligenceSection />
      <MarketsSection />
      <CTASection />
    </div>
  );
}
