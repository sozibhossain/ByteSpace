"use client";
import { useState } from "react";
import { Play } from "lucide-react";
import { MediaImage } from "@/components/ui/MediaImage";

/** Native controls support keyboard playback; failed media has actionable feedback. */
export function VideoPreview({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  return (
    <div className="course-preview">
      {failed ? (
        <div role="alert" className="h-full grid place-content-center gap-4 text-center p-8">
          <p>This preview couldn&apos;t be played.</p>
          <button
            className="button bg-brand-lime px-6 min-h-12"
            onClick={() => {
              setFailed(false);
              setPlaying(false);
            }}
          >
            Try again
          </button>
        </div>
      ) : playing ? (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
          aria-label={`${title} preview`}
          onError={() => setFailed(true)}
        >
          <track
            kind="captions"
            src="/assets/courses/videos/course-preview-demo.vtt"
            srcLang="en"
            label="English"
            default
          />
        </video>
      ) : (
        <>
          <MediaImage
            src={poster}
            alt={`Preview for ${title}`}
            fill
            sizes="(max-width: 800px) 95vw, 720px"
            preload
          />
          <button
            className="play-button"
            aria-label={`Play ${title} preview`}
            onClick={() => setPlaying(true)}
          >
            <span>
              <Play size={42} fill="white" className="text-white" aria-hidden />
            </span>
          </button>
        </>
      )}
    </div>
  );
}
