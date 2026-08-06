import type { ReactNode } from "react";

type PageHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  inverse?: boolean;
  display?: "home" | "page";
  lang?: "ko" | "en";
  titleId?: string;
  actions?: ReactNode;
  className?: string;
};

function isKoreanEyebrow(eyebrow: ReactNode, lang?: "ko" | "en") {
  return typeof eyebrow === "string" ? /[가-힣]/.test(eyebrow) : lang === "ko";
}

export function PageHeading({
  eyebrow,
  title,
  // description,
  align = "left",
  inverse = false,
  display = "page",
  lang,
  titleId,
  // actions,
  className = "",
}: PageHeadingProps) {
  const alignmentClass = align === "center" ? "eruty-page-heading--center" : "";
  const inverseClass = inverse ? "eruty-page-heading--inverse" : "";
  const eyebrowClass = isKoreanEyebrow(eyebrow, lang) ? "eruty-eyebrow-ko" : "eruty-eyebrow-en";

  return (
    <div className={`eruty-page-heading ${alignmentClass} ${inverseClass} ${className}`.trim()}>
      {eyebrow ? (
        <div className={`eruty-page-heading__eyebrow ${eyebrowClass}`}>{eyebrow}</div>
      ) : null}
      <h1
        id={titleId}
        className={`eruty-page-heading__title eruty-preline-desktop ${
          display === "home" ? "eruty-home-display" : "eruty-page-title"
        }`}
      >
        {title}
      </h1>
      {/* {description ? (
        <p className="eruty-page-heading__description eruty-page-lead eruty-preline-desktop">
          {description}
        </p>
      ) : null} */}
      {/* {actions ? <div className="eruty-page-heading__actions">{actions}</div> : null} */}
    </div>
  );
}
