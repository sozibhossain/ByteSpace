"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, Filter, Shapes, Signal, SlidersHorizontal } from "lucide-react";
import { useCourses } from "@/hooks/use-catalog";
import { CATEGORIES } from "@/constants/catalog";
import type { CourseFilters } from "@/types/course";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CourseCard } from "./CourseCard";
import { SearchForm } from "./SearchForm";
import { CourseSkeletons, EmptyState, QueryError } from "@/components/ui/QueryState";
import { Reveal } from "@/components/ui/Reveal";

/** Catalog URL is the source of truth; filter changes reset pagination atomically. */
export function CatalogResults({ creatorId }: { creatorId?: string }) {
  const params = useSearchParams();
  const router = useRouter();
  const rawPage = Number(params.get("page"));
  const filters: CourseFilters = {
    search: params.get("search") || "",
    category: CATEGORIES.includes(params.get("category") || "")
      ? params.get("category")!
      : "Featured",
    level: ["beginner", "intermediate", "advanced"].includes(params.get("level") || "")
      ? params.get("level")!
      : "",
    sort: ["rating", "price-low", "price-high"].includes(params.get("sort") || "")
      ? (params.get("sort") as CourseFilters["sort"])
      : "relevant",
    page: Number.isFinite(rawPage) && rawPage > 0 ? Math.floor(rawPage) : 1,
    pageSize: 6,
    creatorId,
  };
  const query = useCourses(filters);
  function update(changes: Record<string, string>, resetPage = true) {
    const next = new URLSearchParams(params);
    if (resetPage) next.delete("page");
    for (const [key, value] of Object.entries(changes)) {
      if (!value || value === "Featured" || value === "relevant") next.delete(key);
      else next.set(key, value);
    }
    router.replace(`?${next.toString()}`, { scroll: false });
  }
  const reset = () => update({ search: "", category: "", level: "", sort: "" });
  return (
    <div className="container catalog-body">
      <div className="filter-toolbar">
        <div className="filter-left">
          <button className="filter-control" onClick={reset}>
            <Filter size={16} aria-hidden />
            {filters.level || filters.category !== "Featured" || filters.search
              ? "Reset filters"
              : "All courses"}
          </button>
          <label className="filter-control">
            <Signal size={16} aria-hidden />
            <span className="sr-only">Course level</span>
            <select
              aria-label="Course level"
              value={filters.level}
              onChange={(e) => update({ level: e.target.value })}
            >
              <option value="">Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>
          <label className="filter-control">
            <Shapes size={16} aria-hidden />
            <span className="sr-only">Course category</span>
            <select
              aria-label="Course category"
              value={filters.category}
              onChange={(e) => update({ category: e.target.value })}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c === "Featured" ? "Category" : c}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="filter-control">
          <SlidersHorizontal size={16} aria-hidden />
          <span className="sr-only">Sort courses</span>
          <select
            aria-label="Sort courses"
            value={filters.sort}
            onChange={(e) => update({ sort: e.target.value })}
          >
            <option value="relevant">Most relevant</option>
            <option value="rating">Highest rated</option>
            <option value="price-low">Price: low to high</option>
            <option value="price-high">Price: high to low</option>
          </select>
        </label>
      </div>
      {!creatorId && (
        <div className="category-pills" aria-label="Category shortcuts">
          {CATEGORIES.slice(0, 8).map((c) => (
            <button
              key={c}
              className="pill"
              aria-pressed={filters.category === c}
              onClick={() => update({ category: c })}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <div className="refresh-indicator" role="status">
        {query.isFetching && !query.isPending
          ? "Updating courses…"
          : query.data
            ? `${query.data.pagination.total} courses`
            : ""}
      </div>
      {query.isPending ? (
        <CourseSkeletons />
      ) : query.isError ? (
        <QueryError error={query.error} onRetry={() => void query.refetch()} />
      ) : !query.data.data.length ? (
        <EmptyState onReset={reset} />
      ) : (
        <>
          <div
            key={query.data.data.map((course) => course.id).join("|")}
            className="course-grid catalog-result-content"
            aria-busy={query.isFetching}
          >
            {query.data.data.map((course, i) => (
              <Reveal key={course.id} delay={(i % 3) * 0.06}>
                <CourseCard course={course} />
              </Reveal>
            ))}
          </div>
          <nav className="pagination" aria-label="Course pagination">
            <button
              aria-label="Previous page"
              disabled={query.isPlaceholderData || query.data.pagination.page <= 1}
              onClick={() => update({ page: String(query.data.pagination.page - 1) }, false)}
            >
              <ChevronLeft className="mx-auto" size={20} aria-hidden />
            </button>
            {Array.from({ length: query.data.pagination.totalPages }, (_, i) => (
              <button
                key={i}
                aria-label={`Page ${i + 1}`}
                aria-current={query.data.pagination.page === i + 1 ? "page" : undefined}
                disabled={query.isPlaceholderData}
                onClick={() => update({ page: String(i + 1) }, false)}
              >
                {i + 1}
              </button>
            ))}
            <button
              aria-label="Next page"
              disabled={
                query.isPlaceholderData ||
                query.data.pagination.page >= query.data.pagination.totalPages
              }
              onClick={() => update({ page: String(query.data.pagination.page + 1) }, false)}
            >
              <ChevronRight className="mx-auto" size={20} aria-hidden />
            </button>
          </nav>
        </>
      )}
    </div>
  );
}

/** Search landing shell shares results with creator profiles. */
export function CatalogPage() {
  const params = useSearchParams();
  const router = useRouter();
  function search(value: string) {
    const next = new URLSearchParams(params);
    next.delete("page");
    if (value) next.set("search", value);
    else next.delete("search");
    router.replace(`/courses?${next}`, { scroll: false });
  }
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="catalog-hero grid-blue">
          <div className="container">
            <h1>Find Your Next Course</h1>
            <SearchForm initialValue={params.get("search") || ""} onSearch={search} />
          </div>
        </section>
        <CatalogResults />
      </main>
      <Footer />
    </>
  );
}
