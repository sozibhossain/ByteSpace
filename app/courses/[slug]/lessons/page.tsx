import { CourseDetail } from "@/components/courses/CourseDetail";
import { loadCoursePage } from "@/lib/course-page";
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { course } = await loadCoursePage((await params).slug);
  return { title: `${course.title} — Lessons` };
}
/** Lessons share the same course shell and server-side missing-entity handling. */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { course, creator } = await loadCoursePage((await params).slug);
  return <CourseDetail initialCourse={course} initialCreator={creator} tab="lessons" />;
}
