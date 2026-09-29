"use client";
import { useState } from "react";
import { CheckCircle2, Play, Video } from "lucide-react";
import { useCompleteLesson, useProgress } from "@/hooks/use-catalog";
import { safeErrorMessage } from "@/services/errors";
import { QueryError } from "@/components/ui/QueryState";
import { Button } from "@/components/ui/Button";
import type { Course, Lesson } from "@/types/course";

/** Curriculum completion is session-only in mock mode; success updates query data. */
export function CourseLessons({ course }: { course: Course }) {
  const progress = useProgress(course.id);
  const completion = useCompleteLesson(course.id);
  const [selected, setSelected] = useState<Lesson | null>(null);
  const [videoError, setVideoError] = useState(false);
  const completed = progress.data?.completedLessonIds || [];
  const percent = Math.round((completed.length / course.stats.lessonCount) * 100);
  return (
    <section aria-label="Course lessons">
      <h2>Explore the Modules</h2>
      <p>
        Immerse yourself in the course content as we break down each module into comprehensive
        lessons, providing practical insights and hands-on experiences.
      </p>
      <h2>Lesson List</h2>
      {course.modules.map((m, i) => (
        <details key={m.id} className="lesson-module">
          <summary>
            <span className="module-icon">
              <Video size={30} aria-hidden />
            </span>
            <div>
              <h3>
                Module {i + 1}: {m.title}
              </h3>
              <p>{m.description}</p>
            </div>
          </summary>
          <div className="module-lessons">
            {m.lessons.map((l) => (
              <div key={l.id} className="module-lesson">
                <button
                  className="flex items-center gap-2 text-left"
                  onClick={() => {
                    setSelected(l);
                    setVideoError(false);
                  }}
                >
                  <Play size={16} className="shrink-0" aria-hidden />
                  <span>
                    {l.title}
                    <small className="block muted">{l.durationMinutes} mins</small>
                  </span>
                </button>
                <Button
                  size="sm"
                  variant={completed.includes(l.id) ? "secondary" : "lime"}
                  disabled={
                    completed.includes(l.id) ||
                    progress.isPending ||
                    progress.isError ||
                    completion.isPending
                  }
                  isLoading={completion.isPending && completion.variables === l.id}
                  onClick={() => completion.mutate(l.id)}
                  leftIcon={
                    completed.includes(l.id) ? <CheckCircle2 size={16} aria-hidden /> : undefined
                  }
                >
                  {completed.includes(l.id) ? "Completed" : "Mark complete"}
                </Button>
              </div>
            ))}
          </div>
        </details>
      ))}
      {selected && (
        <div className="my-8 rounded-2xl bg-brand-surface p-4">
          <div className="flex justify-between gap-4 mb-4">
            <h3 className="font-bold">{selected.title}</h3>
            <button onClick={() => setSelected(null)} className="text-brand-blue">
              Close player
            </button>
          </div>
          {videoError ? (
            <p role="alert">The lesson video couldn&apos;t load. Reopen the lesson to try again.</p>
          ) : (
            <video
              key={selected.id}
              src={selected.videoUrl}
              controls
              autoPlay
              playsInline
              className="w-full rounded-xl"
              onError={() => setVideoError(true)}
            >
              <track
                kind="captions"
                src="/assets/courses/videos/course-preview-demo.vtt"
                srcLang="en"
                label="English"
                default
              />
            </video>
          )}
          <p className="demo-note !mb-0 !mt-3">
            All lessons use the same short demonstration video.
          </p>
        </div>
      )}
      <h2>Lesson Content</h2>
      <p>
        Engage with each lesson through video content, detailed explanations, and practical
        exercises. Apply what you learn at your own pace.
      </p>
      <h2>Lesson Progress Tracking</h2>
      <p>
        Witness your growth as you complete lessons, with an intuitive progress tracking feature
        guiding you through your learning journey.
      </p>
      {progress.isError ? (
        <QueryError error={progress.error} onRetry={() => void progress.refetch()} />
      ) : (
        <div className="progress-panel" aria-busy={progress.isPending}>
          <small>Learning Progress</small>
          <strong className="block text-4xl font-bold my-2">
            {progress.isPending ? "…" : `${percent}%`}
          </strong>
          <div
            className="progress-track"
            role="progressbar"
            aria-label="Course completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
          >
            <div style={{ width: `${percent}%` }} />
          </div>
          <span className="sr-only" role="status">
            {completed.length} of {course.stats.lessonCount} lessons completed
          </span>
        </div>
      )}
      {completion.isError && (
        <p className="feedback" role="alert">
          {safeErrorMessage(completion.error)}{" "}
          <button className="underline" onClick={() => completion.mutate(completion.variables)}>
            Retry
          </button>
        </p>
      )}
      <p className="demo-note !mt-4">
        Demo progress is kept only during this session and resets on reload.
      </p>
    </section>
  );
}
