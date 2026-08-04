import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "text" | "icon";
export type ButtonSize = "compact" | "default" | "large";

type FoundationButtonProps = {
  children: ReactNode;
  className?: string;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

function buttonClassName(variant: ButtonVariant, size: ButtonSize, className: string) {
  return `eruty-button eruty-button--${variant} eruty-button--${size} ${className}`.trim();
}

export type ButtonProps = FoundationButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  className = "",
  size = "default",
  type = "button",
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={buttonClassName(variant, size, className)} {...props}>
      {children}
    </button>
  );
}

export type ButtonLinkProps = FoundationButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export function ButtonLink({
  children,
  className = "",
  size = "default",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <a className={buttonClassName(variant, size, className)} {...props}>
      {children}
    </a>
  );
}
