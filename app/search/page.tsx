import { redirect } from "next/navigation";

/** Keep old search links working while maintaining one canonical catalog route. */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const values = await searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(values))
    if (typeof value === "string") query.set(key, value);
  redirect(`/courses?${query}`);
}
