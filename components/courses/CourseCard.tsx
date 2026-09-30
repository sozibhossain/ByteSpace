"use client";
import Link from "next/link";
import Image from "next/image";
import { Signal, Star } from "lucide-react";
import { AVATARS } from "@/constants/catalog";
import { durationLabel, priceLabel } from "@/lib/utils";
import type { Course } from "@/types/course";
import { MediaImage } from "@/components/ui/MediaImage";
import { useCreators } from "@/hooks/use-catalog";

/** Shared social proof is decorative; the visible overflow count has a text label. */
export function AvatarGroup({
  overflow = "26+",
  count = AVATARS.length,
}: {
  overflow?: string;
  count?: number;
}) {
  return (
    <div className="avatar-group" aria-label={`Learner community, ${overflow} more learners`}>
      {Array.from({ length: count }, (_, i) => (
        <Image key={i} src={AVATARS[i % AVATARS.length]} alt="" width={32} height={32} />
      ))}
      <span className="avatar-overflow">{overflow}</span>
    </div>
  );
}
/** One course summary card is used by home, catalog, profile and auth artwork. */
export function CourseCard({ course }: { course: Course }) {
  const creators = useCreators();
  const creator = creators.data?.find((c) => c.id === course.creatorId);
  // Keep the compact card title from the mockup; the link retains the full course title.
  const cardTitle = course.title.split(":")[0].trim();
  return (
    <article className="course-card">
      <Link
        href={`/courses/${course.slug}`}
        className="card-image"
        aria-label={`View ${course.title}`}
      >
        <MediaImage
          src={course.media.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 540px) 90vw, (max-width: 800px) 45vw, 350px"
        />
        <div className="card-meta" aria-hidden>
          <span>{course.stats.lessonCount} Lessons</span>
          <span>{durationLabel(course.stats.durationMinutes)}</span>
          <span>{course.stats.commentCount} Comments</span>
        </div>
      </Link>
      <div className="card-heading">
        <h3>
          <Link href={`/courses/${course.slug}`} title={course.title}>
            {cardTitle}
          </Link>
        </h3>
        <span className="card-rating" aria-label={`${course.rating.average} out of 5 stars`}>
          {course.rating.average}
          <Star size={16} fill="var(--text-muted)" strokeWidth={0} aria-hidden />
        </span>
      </div>
      <p className="card-creator">
        by{" "}
        <Link href={creator ? `/creators/${creator.slug}` : "/creators"}>
          {creator?.name.toLowerCase() || "Course creator"}
        </Link>
      </p>
      <div className="card-students">
        <span className="level-badge">
          <Signal size={14} aria-hidden />
          {course.level}
        </span>
        <AvatarGroup overflow={`${Math.max(0, course.stats.studentCount - AVATARS.length)}+`} />
      </div>
      <p className="card-price">
        {priceLabel(course.pricing.amount, course.pricing.currency)}
        <small>/{course.pricing.accessType}</small>
      </p>
    </article>
  );
}
