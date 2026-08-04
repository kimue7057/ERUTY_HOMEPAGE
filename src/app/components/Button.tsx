import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router";

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

export type ButtonLinkProps = FoundationButtonProps & Omit<LinkProps, "className">;

export function ButtonLink({
  children,
  className = "",
  size = "default",
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClassName(variant, size, className)} {...props}>
      {children}
    </Link>
  );
}
