import coursesJson from "@/data/courses.json";
import creatorsJson from "@/data/creators.json";
import reviewsJson from "@/data/reviews.json";
import type { CatalogService } from "@/services/contract";
import { ServiceError } from "@/services/errors";
import { courseSchema, creatorSchema, reviewSchema } from "@/services/schema";
import type { CourseFilters, Progress } from "@/types/course";

const courses = courseSchema.array().parse(coursesJson);
const creators = creatorSchema.array().parse(creatorsJson);
const reviews = reviewSchema.array().parse(reviewsJson);
const progress = new Map<string, Progress>();

/** URL-driven mock scenarios exercise real loading/error/empty components locally. */
function scenario() {
  return typeof window === "undefined"
    ? null
    : new URLSearchParams(window.location.search).get("demoState");
}
async function wait(signal?: AbortSignal) {
  if (signal?.aborted) throw new DOMException("Cancelled", "AbortError");
  await new Promise<void>((resolve, reject) => {
    const abort = () => {
      clearTimeout(timer);
      reject(new DOMException("Cancelled", "AbortError"));
    };
    const timer = setTimeout(
      () => {
        signal?.removeEventListener("abort", abort);
        resolve();
      },
      scenario() === "slow" ? 2500 : 180,
    );
    signal?.addEventListener("abort", abort, { once: true });
  });
  if (scenario() === "error")
    throw new ServiceError(
      "NETWORK",
      "We couldn't load this content. Please check your connection and try again.",
    );
}
/** Normalize untrusted URL parameters before filtering and slicing. */
export function filterCourses(filters: CourseFilters) {
  const search = filters.search?.trim().toLowerCase() || "";
  let data = courses.filter(
    (c) =>
      (!search ||
        `${c.title} ${c.category} ${creators.find((x) => x.id === c.creatorId)?.name}`
          .toLowerCase()
          .includes(search)) &&
      (!filters.category || filters.category === "Featured" || c.category === filters.category) &&
      (!filters.level || c.level === filters.level) &&
      (!filters.creatorId || c.creatorId === filters.creatorId),
  );
  if (filters.sort === "rating")
    data = [...data].sort((a, b) => b.rating.average - a.rating.average);
  if (filters.sort === "price-low")
    data = [...data].sort((a, b) => a.pricing.amount - b.pricing.amount);
  if (filters.sort === "price-high")
    data = [...data].sort((a, b) => b.pricing.amount - a.pricing.amount);
  const requestedSize = Number(filters.pageSize ?? 6);
  const pageSize = Number.isFinite(requestedSize)
    ? Math.min(24, Math.max(1, Math.floor(requestedSize)))
    : 6;
  const totalPages = Math.ceil(data.length / pageSize);
  const requestedPage = Number(filters.page ?? 1);
  const page = Math.min(
    Math.max(1, totalPages),
    Number.isFinite(requestedPage) ? Math.max(1, Math.floor(requestedPage)) : 1,
  );
  return {
    data: data.slice((page - 1) * pageSize, page * pageSize),
    pagination: { page, pageSize, total: data.length, totalPages },
  };
}
function findCourse(idOrSlug: string) {
  const course = courses.find((c) => c.id === idOrSlug || c.slug === idOrSlug);
  if (!course) throw new ServiceError("NOT_FOUND", "This course could not be found.", 404);
  return course;
}

/** Read-only JSON catalog plus in-memory demo mutations. No backend is required. */
export const mockCatalog: CatalogService = {
  async getCourses(filters, signal) {
    await wait(signal);
    return scenario() === "empty"
      ? { data: [], pagination: { page: 1, pageSize: 6, total: 0, totalPages: 0 } }
      : filterCourses(filters);
  },
  async getCourse(slug, signal) {
    await wait(signal);
    return findCourse(slug);
  },
  async getCreator(slug, signal) {
    await wait(signal);
    const creator = creators.find((c) => c.slug === slug);
    if (!creator) throw new ServiceError("NOT_FOUND", "This creator could not be found.", 404);
    return creator;
  },
  async getCreators(signal) {
    await wait(signal);
    return creators;
  },
  async getReviews(courseId, rating, signal) {
    await wait(signal);
    findCourse(courseId);
    return scenario() === "empty"
      ? []
      : reviews.filter((r) => r.courseId === courseId && (!rating || r.rating === rating));
  },
  async getProgress(courseId, signal) {
    await wait(signal);
    findCourse(courseId);
    return progress.get(courseId) || { courseId, completedLessonIds: [] };
  },
  async completeLesson(courseId, lessonId) {
    await wait();
    const course = findCourse(courseId);
    if (!course.modules.some((m) => m.lessons.some((l) => l.id === lessonId)))
      throw new ServiceError("VALIDATION", "This lesson does not belong to the course.", 400);
    const current = progress.get(courseId) || { courseId, completedLessonIds: [] };
    const next = {
      courseId,
      completedLessonIds: [...new Set([...current.completedLessonIds, lessonId])],
    };
    progress.set(courseId, next);
    return next;
  },
  async followCreator(id, following) {
    await wait();
    if (!creators.some((c) => c.id === id))
      throw new ServiceError("NOT_FOUND", "This creator could not be found.", 404);
    return { following };
  },
};
