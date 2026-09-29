import { notFound } from "next/navigation";
import { catalog } from "@/services/catalog";
import { ServiceError } from "@/services/errors";
import { CreatorProfile } from "@/components/creators/CreatorProfile";

/** Resolve creator identity before rendering; transport failures retain error handling. */
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  let creator;
  try {
    creator = await catalog.getCreator((await params).slug);
  } catch (error) {
    if (error instanceof ServiceError && error.code === "NOT_FOUND") notFound();
    throw error;
  }
  return <CreatorProfile initialCreator={creator} />;
}
