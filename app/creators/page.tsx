import Image from "next/image";
import Link from "next/link";
import { catalog } from "@/services/catalog";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/ui/Reveal";
export const metadata = { title: "Meet the Creators" };

/** Small directory gives the reference navbar a working creator destination. */
export default async function Page() {
  const creators = await catalog.getCreators();
  return (
    <>
      <Navbar />
      <main id="main-content">
        <section className="catalog-hero grid-blue">
          <div className="container">
            <h1>Learn From Creative Experts</h1>
            <p>Meet the people helping you turn curiosity into your next skill.</p>
          </div>
        </section>
        <div className="container py-20 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {creators.map((c) => (
            <Reveal key={c.id}>
              <article className="course-card !p-8">
                <Image src={c.avatar} alt="" width={96} height={96} className="rounded-3xl mb-6" />
                <h2 className="text-2xl font-bold">{c.name}</h2>
                <p className="muted my-4">{c.headline}</p>
                <Link className="button bg-brand-lime px-6 min-h-12" href={`/creators/${c.slug}`}>
                  View Profile
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
