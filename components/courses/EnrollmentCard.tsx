"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Award, FolderOpen, Handshake, Video } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { durationLabel, priceLabel } from "@/lib/utils";
import type { Course, Creator } from "@/types/course";

const icons = [FolderOpen, Video, Award, Handshake];
/** Enrollment remains an explicit preview until purchasing/auth endpoints exist. */
export function EnrollmentCard({ course, creator }: { course: Course; creator: Creator }) {
  const [message, setMessage] = useState("");
  const lessons = course.modules.flatMap((m) => m.lessons);
  return (
    <aside className="enrollment-card" aria-label="Course enrollment">
      <h2>
        {course.stats.lessonCount} Lessons ({durationLabel(course.stats.durationMinutes)})
      </h2>
      <ol className="preview-lessons">
        {lessons.slice(0, 3).map((l, i) => (
          <li key={l.id} className="preview-lesson">
            <span>{String(i + 1).padStart(2, "0")}</span>
            <span>{l.title}</span>
            <span>{l.durationMinutes} mins</span>
          </li>
        ))}
      </ol>
      <p className="muted mt-4">{lessons.length - 3} more videos</p>
      <p className="enroll-message">
        Ready to Dive In? Enroll Now and Start Building Your Digital Future!
      </p>
      <p className="enrollment-price">
        {priceLabel(course.pricing.amount, course.pricing.currency)}
        <small>/{course.pricing.accessType}</small>
      </p>
      <Button
        fullWidth
        onClick={() =>
          setMessage(
            "This is a course preview. Enrollment and checkout will become available when the platform launches.",
          )
        }
      >
        Enroll Now
      </Button>
      {message && (
        <p className="feedback" role="status">
          {message}
        </p>
      )}
      <h2 className="!mb-0 !mt-7">This course includes</h2>
      <ul className="includes">
        {course.includedFeatures.map((f, i) => {
          const Icon = icons[i % icons.length];
          return (
            <li key={f}>
              <Icon size={20} aria-hidden />
              {f}
            </li>
          );
        })}
      </ul>
      <div className="sidebar-creator">
        <div className="creator-avatar-row">
          <Image src={creator.avatar} alt="" width={52} height={52} />
          <div>
            <p className="font-medium">{creator.name}</p>
            <p className="muted text-sm">Professional Creator</p>
          </div>
        </div>
        <p className="enroll-message">
          Learn practical skills with thoughtful guidance from your creative instructor.
        </p>
        <Link
          href={`/creators/${creator.slug}`}
          className="button border border-[var(--border)] px-5 min-h-9 text-sm"
        >
          See Full Profile
        </Link>
      </div>
    </aside>
  );
}
