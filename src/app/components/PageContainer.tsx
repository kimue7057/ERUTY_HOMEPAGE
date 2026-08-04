import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "wide" | "reading";
  /** @deprecated Prefer variant="wide". Retained for visual and API compatibility. */
  wide?: boolean;
};

const containerClassByVariant = {
  default: "eruty-container",
  wide: "eruty-container-wide",
  reading: "eruty-container-reading",
} as const;

export function PageContainer({ children, className = "", variant = "default", wide = false }: PageContainerProps) {
  const resolvedVariant = wide ? "wide" : variant;

  return (
    <div className={`${containerClassByVariant[resolvedVariant]} ${className}`.trim()}>
      {children}
    </div>
  );
}
