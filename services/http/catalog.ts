import { z } from "zod";
import { ENDPOINTS } from "@/constants/endpoints";
import type { CatalogService } from "@/services/contract";
import { request } from "./client";
import {
  courseSchema,
  coursesResponseSchema,
  creatorSchema,
  progressSchema,
  reviewSchema,
} from "@/services/schema";

/** HTTP adapter preserves the same domain interface as local JSON data. */
export const httpCatalog: CatalogService = {
  getCourses(filters, signal) {
    const query = new URLSearchParams(
      Object.entries(filters)
        .filter(([, v]) => v !== undefined && v !== "")
        .map(([k, v]) => [k, String(v)]),
    );
    return request(`${ENDPOINTS.courses}?${query}`, coursesResponseSchema, { signal });
  },
  getCourse: (slug, signal) => request(ENDPOINTS.course(slug), courseSchema, { signal }),
  getCreator: (slug, signal) => request(ENDPOINTS.creator(slug), creatorSchema, { signal }),
  getCreators: (signal) => request(ENDPOINTS.creators, creatorSchema.array(), { signal }),
  getReviews: (id, rating, signal) =>
    request(`${ENDPOINTS.reviews(id)}?rating=${rating}`, reviewSchema.array(), { signal }),
  getProgress: (id, signal) => request(ENDPOINTS.progress(id), progressSchema, { signal }),
  completeLesson: (id, lessonId) =>
    request(ENDPOINTS.progress(id), progressSchema, {
      method: "POST",
      body: JSON.stringify({ lessonId }),
    }),
  followCreator: (id, follow) =>
    request(ENDPOINTS.follow(id), z.object({ following: z.boolean() }), {
      method: "POST",
      body: JSON.stringify({ following: follow }),
    }),
};
