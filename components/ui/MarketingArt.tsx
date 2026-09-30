"use client";
import Image from "next/image";
import { useCourses } from "@/hooks/use-catalog";
import { AvatarGroup, CourseCard } from "@/components/courses/CourseCard";

/** Decorations are shared independently of page components to avoid bundle coupling. */
export function Shape({
  file,
  className,
  eager = false,
}: {
  file: string;
  className: string;
  eager?: boolean;
}) {
  return (
    <div className={`shape ${className}`} aria-hidden>
      <div className="shape-motion ambient-float">
        <Image
          src={`/assets/shapes/${file}.png`}
          alt=""
          fill
          sizes="240px"
          loading={eager ? "eager" : "lazy"}
          style={{ objectFit: "contain" }}
        />
      </div>
    </div>
  );
}
/** Illustrative marketing progress is separate from learner-specific query data. */
export function ProgressStat() {
  return (
    <div className="stat-progress">
      <span>Learning Progress</span>
      <strong>55%</strong>
      <div className="progress-track">
        <div style={{ transform: "scaleX(0.55)" }} />
      </div>
    </div>
  );
}
export function HappyStudents({ avatarCount }: { avatarCount?: number }) {
  return (
    <>
      <div>Happy Students</div>
      <small>
        4.5 (240) <span className="text-brand-blue">★</span>
      </small>
      <div className="mt-2">
        <AvatarGroup overflow="2K+" count={avatarCount} />
      </div>
    </>
  );
}
/** Artwork resolves through services just like real catalog cards. */
export function CourseArtwork({ index = 0 }: { index?: number }) {
  const query = useCourses({ pageSize: 3 });
  const course = query.data?.data[index];
  return course ? <CourseCard course={course} /> : <div className="skeleton-card" />;
}
