"use client";
import Image from "next/image";
import { useState } from "react";
import { Star } from "lucide-react";
import { useReviews } from "@/hooks/use-catalog";
import { EmptyState, QueryError } from "@/components/ui/QueryState";
import type { Course } from "@/types/course";

/** Stars always have a text equivalent so color/icon appearance is not the label. */
export function Stars({ rating, size = 18 }: { rating: number; size?: number }) {
  return (
    <span className="stars" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} fill={i < rating ? "currentColor" : "none"} aria-hidden />
      ))}
    </span>
  );
}
function reviewDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date));
}

/** Rating filters use independent query keys and preserve explicit empty results. */
export function CourseReviews({ course }: { course: Course }) {
  const [rating, setRating] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const query = useReviews(course.id, rating);
  return (
    <section aria-label="Course reviews">
      <h2>What Learners Are Saying</h2>
      <p>
        Discover what our learners have to say about their experience with &quot;{course.title}
        &quot;. Read reviews and ratings from individuals who have embarked on their creative
        journey.
      </p>
      <div className="rating-panel">
        <div className="rating-score">
          <small>Ratings</small>
          <strong>{course.rating.average}</strong>
          <small>{course.rating.count} reviews</small>
        </div>
        <div className="rating-bars">
          {[5, 4, 3, 2, 1].map((r) => (
            <div className="rating-bar-row" key={r}>
              <div
                className="progress-track"
                aria-label={`${r} stars: ${course.rating.distribution[r] || 0} reviews`}
              >
                <div
                  style={{
                    width: `${course.rating.count ? ((course.rating.distribution[r] || 0) / course.rating.count) * 100 : 0}%`,
                  }}
                />
              </div>
              <Stars rating={r} size={15} />
              <span>{course.rating.distribution[r] || 0}</span>
            </div>
          ))}
        </div>
      </div>
      <h2>Individual Reviews</h2>
      <div className="review-filters" aria-label="Filter reviews by rating">
        {[0, 5, 4, 3, 2, 1].map((r) => (
          <button
            key={r}
            className="pill inline-flex gap-1 items-center"
            aria-pressed={rating === r}
            onClick={() => {
              setRating(r);
              setVisibleCount(4);
            }}
          >
            {r === 0 ? (
              "All ratings"
            ) : (
              <>
                <Star size={16} fill="currentColor" aria-hidden />
                {r}
              </>
            )}
          </button>
        ))}
      </div>
      {query.isPending ? (
        <div role="status" aria-label="Loading reviews">
          <div className="skeleton-card !h-52" />
          <span className="sr-only">Loading reviews</span>
        </div>
      ) : query.isError ? (
        <QueryError error={query.error} onRetry={() => void query.refetch()} />
      ) : !query.data.length ? (
        <EmptyState
          title="No reviews for this rating"
          description="Try another rating to see what learners are saying."
          onReset={() => setRating(0)}
        />
      ) : (
        query.data.slice(0, visibleCount).map((r) => (
          <article key={r.id} className="review-card">
            <div className="review-card-header">
              <div className="creator-avatar-row">
                <Image src={r.author.avatar} alt="" width={44} height={44} />
                <div>
                  <h3 className="font-medium">{r.author.name}</h3>
                  <small className="muted">{r.author.headline}</small>
                </div>
              </div>
              <time className="muted text-xs" dateTime={r.createdAt}>
                {reviewDate(r.createdAt)}
              </time>
            </div>
            <Stars rating={r.rating} />
            <p>“{r.body}”</p>
          </article>
        ))
      )}
      {query.data && query.data.length > visibleCount && (
        <button
          className="button bg-brand-lime min-h-12 px-6"
          onClick={() => setVisibleCount((count) => count + 4)}
        >
          Load more reviews
        </button>
      )}
    </section>
  );
}
