"use client";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { catalog } from "@/services/catalog";
import type { Course, CourseFilters, Creator } from "@/types/course";

/** Include every request parameter in keys to prevent cross-filter cache collisions. */
export const catalogKeys = {
  courses: (filters: CourseFilters) => ["courses", filters] as const,
  course: (slug: string) => ["course", slug] as const,
  creator: (slug: string) => ["creator", slug] as const,
  reviews: (id: string, rating: number) => ["reviews", id, rating] as const,
  progress: (id: string) => ["progress", id] as const,
};
export function useCourses(filters: CourseFilters) {
  return useQuery({
    queryKey: catalogKeys.courses(filters),
    queryFn: ({ signal }) => catalog.getCourses(filters, signal),
    placeholderData: keepPreviousData,
  });
}
export function useCourse(slug: string, initialData?: Course) {
  return useQuery({
    queryKey: catalogKeys.course(slug),
    queryFn: ({ signal }) => catalog.getCourse(slug, signal),
    initialData,
  });
}
export function useCreator(slug: string, initialData?: Creator) {
  return useQuery({
    queryKey: catalogKeys.creator(slug),
    queryFn: ({ signal }) => catalog.getCreator(slug, signal),
    initialData,
  });
}
export function useCreators() {
  return useQuery({ queryKey: ["creators"], queryFn: ({ signal }) => catalog.getCreators(signal) });
}
export function useReviews(id: string, rating = 0) {
  return useQuery({
    queryKey: catalogKeys.reviews(id, rating),
    queryFn: ({ signal }) => catalog.getReviews(id, rating, signal),
  });
}
export function useProgress(id: string) {
  return useQuery({
    queryKey: catalogKeys.progress(id),
    queryFn: ({ signal }) => catalog.getProgress(id, signal),
  });
}
/** Mutations reconcile the server result into the exact affected progress cache. */
export function useCompleteLesson(id: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: (lessonId: string) => catalog.completeLesson(id, lessonId),
    onSuccess: (progress) => client.setQueryData(catalogKeys.progress(id), progress),
  });
}
export function useFollowCreator(id: string) {
  return useMutation({ mutationFn: (following: boolean) => catalog.followCreator(id, following) });
}
