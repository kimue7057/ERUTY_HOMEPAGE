import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center" | "split";
  inverse?: boolean;
  lang?: "ko" | "en";
  titleId?: string;
  action?: ReactNode;
  className?: string;
  compact?: boolean;
};

function isKoreanEyebrow(eyebrow: ReactNode, lang?: "ko" | "en") {
  return typeof eyebrow === "string" ? /[가-힣]/.test(eyebrow) : lang === "ko";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  inverse = false,
  lang,
  titleId,
  action,
  className = "",
  compact = false,
}: SectionHeadingProps) {
  const eyebrowClass = isKoreanEyebrow(eyebrow, lang) ? "eruty-eyebrow-ko" : "eruty-eyebrow-en";

  return (
    <div
      className={`eruty-section-heading eruty-section-heading--${align} ${
        inverse ? "eruty-section-heading--inverse" : ""
      } ${compact ? "eruty-section-heading--compact" : ""} ${className}`.trim()}
    >
      <div className="eruty-section-heading__primary">
        {eyebrow ? (
          <div className={`eruty-section-heading__eyebrow ${eyebrowClass}`}>{eyebrow}</div>
        ) : null}
        <h2 id={titleId} className="eruty-section-heading__title eruty-section-title eruty-preline-desktop">
          {title}
        </h2>
      </div>
      {description || action ? (
        <div className="eruty-section-heading__details">
          {description ? <div className="eruty-section-heading__description eruty-body">{description}</div> : null}
          {action ? <div className="eruty-section-heading__action">{action}</div> : null}
        </div>
      ) : null}
    </div>
  );
}
