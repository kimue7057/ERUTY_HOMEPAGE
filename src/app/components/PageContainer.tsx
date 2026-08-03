import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  wide?: boolean;
};

export function PageContainer({ children, className = "", wide = false }: PageContainerProps) {
  return (
    <div className={`${wide ? "eruty-container-wide" : "eruty-container"} ${className}`.trim()}>
      {children}
    </div>
  );
}
