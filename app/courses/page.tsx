import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogPage } from "@/components/courses/CatalogPage";
import { CourseSkeletons } from "@/components/ui/QueryState";
export const metadata: Metadata = { title: "Explore Courses" };

/** URL-aware client content is isolated behind Suspense for prerendering. */
export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="container py-20" id="main-content">
          <CourseSkeletons />
        </main>
      }
    >
      <CatalogPage />
    </Suspense>
  );
}
