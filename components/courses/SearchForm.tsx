"use client";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useId, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

/** Search submits a shareable URL instead of keeping hidden component-only state. */
export function SearchForm({
  initialValue = "",
  onSearch,
}: {
  initialValue?: string;
  onSearch?: (value: string) => void;
}) {
  const router = useRouter();
  const id = useId();
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = String(new FormData(e.currentTarget).get("search") || "").trim();
    if (onSearch) onSearch(value);
    else router.push(`/courses${value ? `?search=${encodeURIComponent(value)}` : ""}`);
  }
  return (
    <form className="search-form" role="search" onSubmit={submit}>
      <label className="sr-only" htmlFor={id}>
        Search courses, topics or creators
      </label>
      <div className="search-field">
        <Search size={19} aria-hidden />
        <input
          key={initialValue}
          id={id}
          name="search"
          defaultValue={initialValue}
          placeholder="Course, topic, creator"
          type="search"
          maxLength={120}
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  );
}
