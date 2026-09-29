import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
const topics: Record<string, { title: string; text: string }> = {
  about: {
    title: "About ByteSpace",
    text: "ByteSpace is a preview of a creative online learning platform. Explore sample courses and meet the creators.",
  },
  help: {
    title: "How can we help?",
    text: "Browse courses, filter by topic or level, and explore course previews. Account creation and enrollment are not available in this demo.",
  },
  contact: {
    title: "Get in touch",
    text: "Contact details will be published when the platform launches.",
  },
  affiliate: {
    title: "Grow with ByteSpace",
    text: "The affiliate program is planned for launch. Explore our creator community in the meantime.",
  },
  privacy: {
    title: "Privacy information",
    text: "This demo does not create accounts or submit newsletter subscriptions. Form credentials are not stored in localStorage or sent to a backend in mock mode. A complete privacy policy will be published before launch.",
  },
  terms: {
    title: "Terms of service",
    text: "This preview contains sample course content and illustrative reviews. Enrollment and purchases are unavailable. Launch terms will be published before accepting accounts or payments.",
  },
  cookies: {
    title: "Cookies settings",
    text: "This demo does not implement analytics or advertising cookies. Query data and demo lesson progress are held in memory for the current session.",
  },
  enrollment: {
    title: "Your learning journey starts here",
    text: "Course enrollment and checkout will be available when the platform launches. You can explore every course preview now.",
  },
};
/** Reference footer destinations are explicit launch placeholders, not fabricated policies. */
export default async function Page({ params }: { params: Promise<{ topic: string }> }) {
  const content = topics[(await params).topic];
  if (!content) notFound();
  return (
    <>
      <Navbar />
      <main id="main-content" className="container py-24 min-h-[60vh]">
        <h1 className="section-heading">{content.title}</h1>
        <p className="section-description my-8 max-w-3xl">{content.text}</p>
        <Link href="/courses" className="button bg-brand-lime px-6 min-h-12">
          Explore Courses
        </Link>
      </main>
      <Footer />
    </>
  );
}
