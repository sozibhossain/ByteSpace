"use client";
import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { ImageOff } from "lucide-react";

/** Broken media gets a stable accessible fallback without collapsing its container. */
export function MediaImage(props: ImageProps) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  if (failedSource === String(props.src))
    return (
      <div
        role="img"
        aria-label={props.alt || "Image unavailable"}
        className="absolute inset-0 flex items-center justify-center bg-brand-surface text-text-slate"
      >
        <ImageOff size={28} aria-hidden />
      </div>
    );
  return <Image {...props} alt={props.alt} onError={() => setFailedSource(String(props.src))} />;
}
