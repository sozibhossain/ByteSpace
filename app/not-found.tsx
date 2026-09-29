import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

/** Unknown routes and missing catalog entities use the supplied 404 reference. */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="not-found grid-blue">
        <div className="container">
          <div className="not-found-number" aria-hidden>
            404
          </div>
          <h1>
            The page you are looking
            <br className="hidden sm:block" /> for doesn&apos;t exist
          </h1>
          <p>Try a correct URL or go back to the homepage to start again.</p>
          <Link href="/" className="button min-h-12 px-8 bg-brand-lime text-brand-black">
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
