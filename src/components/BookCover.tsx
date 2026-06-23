import { useState } from "react";

interface BookCoverProps {
  src: string;
  alt: string;
  className?: string;
}

export function BookCover({ src, alt, className = "" }: BookCoverProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative bg-stone-900/50 ${className}`}>
      {!loaded && <div className="absolute inset-0 skeleton rounded-[inherit]" />}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover img-fade ${loaded ? "loaded" : ""}`}
        loading="lazy"
        draggable={false}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
