/** Stable domain contract shared by local fixtures and the future HTTP adapter. */
export type CourseLevel = "beginner" | "intermediate" | "advanced";
export interface Creator {
  id: string;
  slug: string;
  name: string;
  headline: string;
  avatar: string;
  bio: string;
  followers: number;
}
export interface Lesson {
  id: string;
  title: string;
  durationMinutes: number;
  videoUrl: string;
}
export interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}
export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  level: CourseLevel;
  creatorId: string;
  media: { thumbnail: string; previewPoster: string; previewVideoUrl: string; gallery: string[] };
  pricing: { amount: number; currency: string; accessType: "lifetime" };
  stats: {
    lessonCount: number;
    durationMinutes: number;
    studentCount: number;
    commentCount: number;
  };
  rating: { average: number; count: number; distribution: Record<string, number> };
  description: string[];
  keyPoints: string[];
  includedFeatures: string[];
  modules: CourseModule[];
}
export interface Review {
  id: string;
  courseId: string;
  author: { name: string; headline: string; avatar: string };
  rating: number;
  body: string;
  createdAt: string;
}
export interface CourseFilters {
  search?: string;
  category?: string;
  level?: string;
  sort?: "relevant" | "rating" | "price-low" | "price-high";
  page?: number;
  pageSize?: number;
  creatorId?: string;
}
export interface Paginated<T> {
  data: T[];
  pagination: { page: number; pageSize: number; total: number; totalPages: number };
}
/** Session-only mock progress. Real deployments must scope this data to a user. */
export interface Progress {
  courseId: string;
  completedLessonIds: string[];
}
