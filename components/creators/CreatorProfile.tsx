"use client";
import Image from "next/image";
import { Suspense } from "react";
import { useCreator, useFollowCreator, useCourses } from "@/hooks/use-catalog";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { CourseSkeletons, QueryError } from "@/components/ui/QueryState";
import { CatalogResults } from "@/components/courses/CatalogPage";
import { safeErrorMessage } from "@/services/errors";
import type { Creator } from "@/types/course";

/** Creator identity is shared with catalog filtering; follows are session-only in demo. */
export function CreatorProfile({ initialCreator }: { initialCreator: Creator }) {
  const query = useCreator(initialCreator.slug, initialCreator);
  const creator = query.data || initialCreator;
  const follow = useFollowCreator(creator.id);
  const following = follow.data?.following || false;
  const courses = useCourses({ creatorId: creator.id, pageSize: 6 });
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="creator-profile grid-blue">
          <div className="container">
            <div className="creator-profile-heading">
              <Image src={creator.avatar} alt={creator.name} width={96} height={96} />
              <div>
                <div className="flex flex-wrap items-center gap-4">
                  <h1>{creator.name}</h1>
                  <span className="pill !bg-brand-lime !text-text-primary">Creator</span>
                </div>
                <p>{creator.headline}</p>
              </div>
            </div>
            <p className="creator-profile-bio">{creator.bio}</p>
            <div className="creator-profile-bottom">
              <div>
                <span className="creator-stat">
                  <strong>{courses.data?.pagination.total ?? "…"}</strong>Products
                </span>
                <span className="creator-stat">
                  <strong>{creator.followers + (following ? 1 : 0)}</strong>Followers
                </span>
              </div>
              <Button
                isLoading={follow.isPending}
                onClick={() => follow.mutate(!following)}
                aria-pressed={following}
              >
                {following ? "Following" : "Follow"}
              </Button>
            </div>
            {follow.isError && (
              <p className="feedback" role="alert">
                {safeErrorMessage(follow.error)}
              </p>
            )}
            {follow.isSuccess && (
              <p className="mt-4 text-sm" role="status">
                {following
                  ? "Following this creator for this demo session."
                  : "You unfollowed this creator."}
              </p>
            )}
          </div>
        </section>
        {query.isError ? (
          <div className="container py-12">
            <QueryError error={query.error} onRetry={() => void query.refetch()} />
          </div>
        ) : (
          <Suspense
            fallback={
              <div className="container py-12">
                <CourseSkeletons />
              </div>
            }
          >
            <CatalogResults creatorId={creator.id} />
          </Suspense>
        )}
      </main>
      <Footer />
    </>
  );
}
