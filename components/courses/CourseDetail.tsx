"use client";
import Link from "next/link";
import { useState } from "react";
import { Share2, Signal, Star, Users } from "lucide-react";
import { useCourse, useCreator } from "@/hooks/use-catalog";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { QueryError } from "@/components/ui/QueryState";
import { VideoPreview } from "./VideoPreview";
import { EnrollmentCard } from "./EnrollmentCard";
import { CourseAbout } from "./CourseAbout";
import { CourseLessons } from "./CourseLessons";
import { CourseReviews } from "./CourseReviews";
import type { Course, Creator } from "@/types/course";

export type CourseTab = "about" | "lessons" | "reviews";
/** Shared course shell uses navigable tabs, SSR initial data and refetch feedback. */
export function CourseDetail({
  initialCourse,
  initialCreator,
  tab,
}: {
  initialCourse: Course;
  initialCreator: Creator;
  tab: CourseTab;
}) {
  const courseQuery = useCourse(initialCourse.slug, initialCourse);
  const creatorQuery = useCreator(initialCreator.slug, initialCreator);
  const [shareMessage, setShareMessage] = useState("");
  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage("Course link copied.");
    } catch {
      setShareMessage(`Copy this link: ${window.location.href}`);
    }
  }
  const course = courseQuery.data || initialCourse;
  const creator = creatorQuery.data || initialCreator;
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="course-hero grid-blue">
          <div className="container">
            <div className="course-title-row">
              <div>
                <h1>{course.title}</h1>
                <p className="course-subtitle">{course.subtitle}</p>
                <p className="course-author">
                  by <Link href={`/creators/${creator.slug}`}>{creator.name.toLowerCase()}</Link>
                </p>
              </div>
              <Button size="sm" leftIcon={<Share2 size={17} aria-hidden />} onClick={share}>
                Share
              </Button>
            </div>
            {shareMessage && (
              <p role="status" className="mt-3 text-sm break-all">
                {shareMessage}
              </p>
            )}
            <div className="course-badges">
              <span>
                <Signal size={20} aria-hidden />
                <span className="!p-0 capitalize">{course.level}</span>
              </span>
              <span>
                <Star size={20} fill="currentColor" aria-hidden />
                {course.rating.average} ({course.rating.count} reviews)
              </span>
              <span>
                <Users size={20} aria-hidden />
                {course.stats.studentCount} Students
              </span>
            </div>
            <div className="course-media-row">
              <VideoPreview
                src={course.media.previewVideoUrl}
                poster={course.media.previewPoster}
                title={course.title}
              />
              <EnrollmentCard course={course} creator={creator} />
            </div>
          </div>
        </section>
        <section className="course-body container">
          <div className="course-main">
            <nav className="course-tabs" aria-label="Course sections">
              {(["about", "lessons", "reviews"] as const).map((t) => (
                <Link
                  key={t}
                  href={`/courses/${course.slug}${t === "about" ? "" : `/${t}`}`}
                  scroll={false}
                  className={`pill capitalize ${tab === t ? "active" : ""}`}
                  aria-current={tab === t ? "page" : undefined}
                >
                  {t}
                </Link>
              ))}
            </nav>
            <div key={tab} className="course-tab-content">
              {courseQuery.isError ? (
                <QueryError error={courseQuery.error} onRetry={() => void courseQuery.refetch()} />
              ) : tab === "about" ? (
                <CourseAbout course={course} />
              ) : tab === "lessons" ? (
                <CourseLessons course={course} />
              ) : (
                <CourseReviews course={course} />
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
