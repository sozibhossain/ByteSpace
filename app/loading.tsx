import { CourseSkeletons } from "@/components/ui/QueryState";

/** Route transitions keep a stable loading region while server data resolves. */
export default function Loading() {
  return (
    <main className="container py-24" id="main-content">
      <CourseSkeletons />
    </main>
  );
}
