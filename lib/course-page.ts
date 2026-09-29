import { notFound } from "next/navigation";
import { catalog } from "@/services/catalog";
import { ServiceError } from "@/services/errors";

/** Translate only known missing entities to 404; service failures reach error.tsx. */
export async function loadCoursePage(slug: string) {
  try {
    const [course, creators] = await Promise.all([catalog.getCourse(slug), catalog.getCreators()]);
    const creator = creators.find((c) => c.id === course.creatorId);
    if (!creator) throw new ServiceError("CONTRACT", "The course creator is unavailable.");
    return { course, creator };
  } catch (error) {
    if (error instanceof ServiceError && error.code === "NOT_FOUND") notFound();
    throw error;
  }
}
