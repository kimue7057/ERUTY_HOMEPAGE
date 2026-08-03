import { useCallback, useRef } from "react";
import { ErumterHeroSection } from "./sections/ErumterHeroSection";
import { WhatErumterTransforms } from "./sections/WhatErumterTransforms";
import { AXProcess } from "./sections/AXProcess";
import { AXEducation } from "./sections/AXEducation";
import { TransformationSolutions } from "./sections/TransformationSolutions";
import { BeforeAfter } from "./sections/BeforeAfter";
import { AXInquiryCTA } from "./sections/AXInquiryCTA";
import "./erumter.css";

export function ErumterPage() {
  const processRef = useRef<HTMLElement>(null);
  const scrollToProcess = useCallback(() => {
    processRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="erumter-page">
      <ErumterHeroSection onScrollToProcess={scrollToProcess} />
      <WhatErumterTransforms />
      <AXProcess ref={processRef} />
      <AXEducation />
      <TransformationSolutions />
      <BeforeAfter />
      <AXInquiryCTA />
    </div>
  );
}
