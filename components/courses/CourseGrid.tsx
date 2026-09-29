"use client";
import type { CourseFilters } from "@/types/course";
import { useCourses } from "@/hooks/use-catalog";
import { CourseCard } from "./CourseCard";
import { CourseSkeletons, EmptyState, QueryError } from "@/components/ui/QueryState";
import { Reveal } from "@/components/ui/Reveal";

/** Landing grid owns query feedback without coupling cards to a data source. */
export function CourseGrid({ filters, onReset }: { filters: CourseFilters; onReset?: () => void }) {
  const query = useCourses(filters);
  if (query.isPending) return <CourseSkeletons count={filters.pageSize || 6} />;
  if (query.isError) return <QueryError error={query.error} onRetry={() => void query.refetch()} />;
  if (!query.data.data.length) return <EmptyState onReset={onReset} />;
  return (
    <div>
      <div className="refresh-indicator" role="status">
        {query.isFetching ? "Updating courses…" : ""}
      </div>
      <div className="course-grid">
        {query.data.data.map((course, i) => (
          <Reveal key={course.id} delay={(i % 3) * 0.07}>
            <CourseCard course={course} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
