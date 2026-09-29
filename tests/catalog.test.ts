import { test } from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import courses from "../data/courses.json";
import reviews from "../data/reviews.json";
import { filterCourses, mockCatalog } from "../services/mock/catalog";
import { ServiceError, shouldRetry } from "../services/errors";
import { courseSchema } from "../services/schema";
import { request } from "../services/http/client";
import { catalogKeys } from "../hooks/use-catalog";

/** Fixture invariants protect the shared contract before a real backend is connected. */
test("eight courses have distinct available thumbnails and one shared available video", () => {
  assert.equal(courses.length, 8);
  assert.equal(new Set(courses.map((c) => c.media.thumbnail)).size, 8);
  assert.equal(new Set(courses.map((c) => c.media.previewVideoUrl)).size, 1);
  for (const course of courses) {
    courseSchema.parse(course);
    for (const src of [
      course.media.thumbnail,
      course.media.previewPoster,
      course.media.previewVideoUrl,
      ...course.media.gallery,
    ])
      assert.ok(existsSync(`public${src}`), src);
    const lessons = course.modules.flatMap((m) => m.lessons);
    assert.equal(course.stats.lessonCount, lessons.length);
    assert.equal(
      course.stats.durationMinutes,
      lessons.reduce((n, l) => n + l.durationMinutes, 0),
    );
    const courseReviews = reviews.filter((r) => r.courseId === course.id);
    assert.equal(course.rating.count, courseReviews.length);
    assert.equal(
      course.rating.count,
      Object.values(course.rating.distribution).reduce((a, b) => a + b, 0),
    );
    assert.equal(
      course.rating.average,
      Math.round((courseReviews.reduce((n, r) => n + r.rating, 0) / courseReviews.length) * 10) /
        10,
    );
  }
});
test("search, category, level and creator filters compose", () => {
  assert.equal(filterCourses({ search: "FIGMA" }).data[0].slug, "learn-figma-from-basic");
  assert.equal(
    filterCourses({
      category: "Web Development",
      level: "advanced",
      creatorId: "creator-purepearl",
    }).pagination.total,
    1,
  );
  assert.equal(
    filterCourses({ category: "Web Development", level: "beginner" }).pagination.total,
    0,
  );
  assert.equal(filterCourses({ search: "no-matching-course" }).pagination.totalPages, 0);
});
test("pagination clamps invalid input and sorting spans the complete collection", () => {
  const first = filterCourses({ pageSize: 6 });
  const second = filterCourses({ page: 2, pageSize: 6 });
  assert.equal(first.data.length, 6);
  assert.equal(second.data.length, 2);
  assert.equal(filterCourses({ page: 999 }).pagination.page, 2);
  assert.equal(filterCourses({ page: NaN, pageSize: NaN }).pagination.page, 1);
  assert.equal(filterCourses({ page: -1, pageSize: 0 }).pagination.pageSize, 1);
  assert.equal(filterCourses({ sort: "price-high" }).data[0].pricing.amount, 39);
});
test("query keys distinguish every catalog filter and review rating", () => {
  assert.notDeepEqual(catalogKeys.courses({ page: 1 }), catalogKeys.courses({ page: 2 }));
  assert.notDeepEqual(
    catalogKeys.courses({ level: "beginner" }),
    catalogKeys.courses({ level: "advanced" }),
  );
  assert.notDeepEqual(catalogKeys.reviews("course-001", 5), catalogKeys.reviews("course-001", 1));
});
test("missing records return typed not-found failures", async () => {
  await assert.rejects(
    mockCatalog.getCourse("missing"),
    (error: unknown) => error instanceof ServiceError && error.code === "NOT_FOUND",
  );
});
test("cancelled requests do not resolve stale data", async () => {
  const controller = new AbortController();
  const pending = mockCatalog.getCourses({}, controller.signal);
  controller.abort();
  await assert.rejects(pending, { name: "AbortError" });
});
test("completion is idempotent and rejects a lesson from another course", async () => {
  const course = courses[0];
  const lesson = course.modules[0].lessons[0];
  await mockCatalog.completeLesson(course.id, lesson.id);
  const again = await mockCatalog.completeLesson(course.id, lesson.id);
  assert.deepEqual(again.completedLessonIds, [lesson.id]);
  await assert.rejects(
    mockCatalog.completeLesson(course.id, courses[1].modules[0].lessons[0].id),
    (e: unknown) => e instanceof ServiceError && e.code === "VALIDATION",
  );
  assert.deepEqual((await mockCatalog.getProgress(courses[1].id)).completedLessonIds, []);
});
test("retry policy is bounded and excludes permanent failures", () => {
  assert.equal(shouldRetry(0, new ServiceError("NETWORK", "offline")), true);
  assert.equal(shouldRetry(2, new ServiceError("SERVER", "unavailable")), false);
  for (const code of ["NOT_FOUND", "VALIDATION", "UNAUTHORIZED", "FORBIDDEN", "CONTRACT"] as const)
    assert.equal(shouldRetry(0, new ServiceError(code, "expected")), false);
});
test("HTTP transport checks status and validates responses without leaking server text", async () => {
  const previousFetch = globalThis.fetch;
  const previousBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  process.env.NEXT_PUBLIC_API_BASE_URL = "https://example.test";
  try {
    globalThis.fetch = async () => Response.json(courses[0]);
    assert.equal((await request("/courses/figma", courseSchema)).id, courses[0].id);
    globalThis.fetch = async () =>
      Response.json({ databasePassword: "sensitive" }, { status: 500 });
    await assert.rejects(
      request("/courses/figma", courseSchema),
      (e: unknown) =>
        e instanceof ServiceError && e.code === "SERVER" && !e.message.includes("sensitive"),
    );
    globalThis.fetch = async () => Response.json({ wrong: "shape" });
    await assert.rejects(
      request("/courses/figma", courseSchema),
      (e: unknown) => e instanceof ServiceError && e.code === "CONTRACT",
    );
    globalThis.fetch = async () => {
      throw new TypeError("Failed to fetch");
    };
    await assert.rejects(
      request("/courses/figma", courseSchema),
      (e: unknown) => e instanceof ServiceError && e.code === "NETWORK",
    );
  } finally {
    globalThis.fetch = previousFetch;
    if (previousBase === undefined) delete process.env.NEXT_PUBLIC_API_BASE_URL;
    else process.env.NEXT_PUBLIC_API_BASE_URL = previousBase;
  }
});
