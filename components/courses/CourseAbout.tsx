import { CheckCircle2 } from "lucide-react";
import type { Course } from "@/types/course";
import { MediaImage } from "@/components/ui/MediaImage";

/** Course content is rendered semantically rather than inserted as arbitrary HTML. */
export function CourseAbout({ course }: { course: Course }) {
  return (
    <section aria-label="About this course">
      <h2>Description</h2>
      {course.description.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
      <h2>Sneak Peek</h2>
      <div className="gallery-grid">
        {course.media.gallery.map((src, i) => (
          <div key={src} className="gallery-image">
            <MediaImage
              src={src}
              alt={`${course.title} example ${i + 1}`}
              fill
              sizes="(max-width: 540px) 45vw, 160px"
            />
          </div>
        ))}
      </div>
      <h2>Key Points</h2>
      <ul className="key-points">
        {course.keyPoints.map((p) => (
          <li key={p}>
            <CheckCircle2 size={22} className="text-brand-blue shrink-0" aria-hidden />
            {p}
          </li>
        ))}
      </ul>
    </section>
  );
}
