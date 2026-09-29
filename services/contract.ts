import type { Course, CourseFilters, Creator, Paginated, Progress, Review } from "@/types/course";

/** UI hooks depend on this interface, never directly on JSON or endpoint paths. */
export interface CatalogService {
  getCourses(filters: CourseFilters, signal?: AbortSignal): Promise<Paginated<Course>>;
  getCourse(slug: string, signal?: AbortSignal): Promise<Course>;
  getCreator(slug: string, signal?: AbortSignal): Promise<Creator>;
  getCreators(signal?: AbortSignal): Promise<Creator[]>;
  getReviews(courseId: string, rating: number, signal?: AbortSignal): Promise<Review[]>;
  getProgress(courseId: string, signal?: AbortSignal): Promise<Progress>;
  completeLesson(courseId: string, lessonId: string): Promise<Progress>;
  followCreator(id: string, follow: boolean): Promise<{ following: boolean }>;
}
