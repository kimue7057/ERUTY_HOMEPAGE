import { useRef, useCallback } from "react";
import { ErumterHeroSection } from "./sections/ErumterHeroSection";
import { WhatErumterTransforms } from "./sections/WhatErumterTransforms";
import { AXProcess } from "./sections/AXProcess";
import { TransformationSolutions } from "./sections/TransformationSolutions";
import { BeforeAfter } from "./sections/BeforeAfter";
import { TechOperation } from "./sections/TechOperation";
import { AXProjects } from "./sections/AXProjects";
import { AXInquiryCTA } from "./sections/AXInquiryCTA";

export function ErumterPage() {
  const processRef = useRef<HTMLDivElement>(null);
  const scrollToProcess = useCallback(() => {
    processRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div style={{ paddingTop: 76, background: "#fff" }}>
      <ErumterHeroSection onScrollToProcess={scrollToProcess} />
      <WhatErumterTransforms />
      <AXProcess ref={processRef} />
      <TransformationSolutions />
      <BeforeAfter />
      <TechOperation />
      <AXProjects />
      <AXInquiryCTA />
    </div>
  );
}
