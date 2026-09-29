import { z } from "zod";

/** Validate external data at the adapter boundary rather than trusting TS casts. */
export const creatorSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  headline: z.string(),
  avatar: z.string(),
  bio: z.string(),
  followers: z.number().int().nonnegative(),
});
const lessonSchema = z.object({
  id: z.string(),
  title: z.string(),
  durationMinutes: z.number().nonnegative(),
  videoUrl: z.string(),
});
export const courseSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  category: z.string(),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  creatorId: z.string(),
  media: z.object({
    thumbnail: z.string(),
    previewPoster: z.string(),
    previewVideoUrl: z.string(),
    gallery: z.array(z.string()),
  }),
  pricing: z.object({
    amount: z.number().nonnegative(),
    currency: z.string().length(3),
    accessType: z.literal("lifetime"),
  }),
  stats: z.object({
    lessonCount: z.number().int().nonnegative(),
    durationMinutes: z.number().nonnegative(),
    studentCount: z.number().int().nonnegative(),
    commentCount: z.number().int().nonnegative(),
  }),
  rating: z.object({
    average: z.number().min(0).max(5),
    count: z.number().int().nonnegative(),
    distribution: z.record(z.string(), z.number().int().nonnegative()),
  }),
  description: z.array(z.string()),
  keyPoints: z.array(z.string()),
  includedFeatures: z.array(z.string()),
  modules: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      lessons: z.array(lessonSchema),
    }),
  ),
});
export const reviewSchema = z.object({
  id: z.string(),
  courseId: z.string(),
  author: z.object({ name: z.string(), headline: z.string(), avatar: z.string() }),
  rating: z.number().int().min(1).max(5),
  body: z.string(),
  createdAt: z.iso.datetime(),
});
export const progressSchema = z.object({
  courseId: z.string(),
  completedLessonIds: z.array(z.string()),
});
export const coursesResponseSchema = z.object({
  data: z.array(courseSchema),
  pagination: z.object({
    page: z.number().int().positive(),
    pageSize: z.number().int().positive(),
    total: z.number().int().nonnegative(),
    totalPages: z.number().int().nonnegative(),
  }),
});
