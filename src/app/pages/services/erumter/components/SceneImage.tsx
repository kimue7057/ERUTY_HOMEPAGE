import { useState } from "react";

export function SceneImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={["er-scene-image", className].filter(Boolean).join(" ")}>
      {!failed ? (
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="er-scene-fallback" role="img" aria-label={alt}>
          <span>{alt}</span>
        </div>
      )}
    </div>
  );
}

