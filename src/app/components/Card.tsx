import type { HTMLAttributes, ReactNode } from "react";

export type CardVariant = "compact" | "default" | "featured" | "mockup";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div" | "section";
  children: ReactNode;
  variant?: CardVariant;
};

export function Card({ as: Element = "article", children, className = "", variant = "default", ...props }: CardProps) {
  return (
    <Element className={`eruty-card eruty-card--${variant} ${className}`.trim()} {...props}>
      {children}
    </Element>
  );
}

export function CardCopy({ children, className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`eruty-card__copy ${className}`.trim()} {...props}>
      {children}
    </div>
  );
}
