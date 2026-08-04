import type { HTMLAttributes, ReactNode } from "react";

export type SectionVariant = "compact" | "default" | "spacious" | "hero";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  variant?: SectionVariant;
};

const sectionClassByVariant = {
  compact: "eruty-section-compact",
  default: "eruty-section",
  spacious: "eruty-section-spacious",
  hero: "eruty-hero-section",
} as const;

export function Section({ children, className = "", variant = "default", ...props }: SectionProps) {
  return (
    <section className={`${sectionClassByVariant[variant]} ${className}`.trim()} {...props}>
      {children}
    </section>
  );
}
