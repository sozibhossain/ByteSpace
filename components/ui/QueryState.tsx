"use client";
import { AlertCircle, SearchX } from "lucide-react";
import { Button } from "./Button";
import { safeErrorMessage } from "@/services/errors";

/** Shared expected states keep retry and empty behavior consistent across pages. */
export function QueryError({ error, onRetry }: { error: unknown; onRetry: () => void }) {
  return (
    <div className="query-state" role="alert">
      <AlertCircle className="mx-auto" size={32} aria-hidden />
      <h2>We couldn&apos;t load this content</h2>
      <p>{safeErrorMessage(error)}</p>
      <Button onClick={onRetry}>Try again</Button>
    </div>
  );
}
export function EmptyState({
  title = "No courses found",
  description = "Try a different search or clear your filters.",
  onReset,
}: {
  title?: string;
  description?: string;
  onReset?: () => void;
}) {
  return (
    <div className="query-state" role="status">
      <SearchX className="mx-auto" size={32} aria-hidden />
      <h2>{title}</h2>
      <p>{description}</p>
      {onReset && <Button onClick={onReset}>Clear filters</Button>}
    </div>
  );
}
export function CourseSkeletons({ count = 6 }: { count?: number }) {
  return (
    <div role="status" aria-label="Loading courses">
      <span className="sr-only">Loading courses</span>
      <div className="course-grid" aria-hidden>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className="skeleton-card" />
        ))}
      </div>
    </div>
  );
}
