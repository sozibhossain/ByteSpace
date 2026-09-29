"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Aperture,
  AudioLines,
  Blocks,
  BriefcaseBusiness,
  Camera,
  CheckCircle2,
  Code2,
  Cpu,
  Laptop,
  PenTool,
  Sparkles,
  Zap,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchForm } from "@/components/courses/SearchForm";
import { CourseGrid } from "@/components/courses/CourseGrid";
import { Reveal } from "@/components/ui/Reveal";
import { CATEGORIES } from "@/constants/catalog";
import { CourseArtwork, HappyStudents, ProgressStat, Shape } from "@/components/ui/MarketingArt";

/** Desktop-reference hero with a scalable illustration scene and functional search. */
function HomeHero() {
  return (
    <section className="home-hero grid-blue">
      <Navbar />
      <div className="container hero-copy">
        <h1>
          Get Access to Hundreds
          <br className="hidden sm:block" /> Courses Available
        </h1>
        <p>
          Unlock your creativity, gain valuable knowledge, and grow your business with our wide
          range of courses.
        </p>
        <SearchForm />
      </div>
      <div className="hero-scene" aria-hidden>
        <div className="hero-dome" />
        <div className="hero-person">
          <Image
            src="/assets/hero/hero-student.png"
            alt=""
            fill
            sizes="(max-width: 540px) 440px, 600px"
            preload
          />
        </div>
        <div className="floating-stat hero-topic">
          UI/UX Design
          <br />
          <small>200 Courses · 1000+ Students</small>
        </div>
        <div className="floating-stat hero-progress">
          <ProgressStat />
        </div>
        <div className="floating-stat hero-students">
          <HappyStudents />
        </div>
      </div>
      <Shape file="shape-lime-spring-corner" className="shape-spring" />
      <Shape file="shape-yellow-cylinder" className="shape-cylinder" />
      <Shape file="shape-white-spring" className="shape-white-small" />
      <Shape file="shape-white-pyramid" className="shape-pyramid" />
      <Shape file="shape-white-torus" className="shape-torus" />
      <Shape file="shape-white-spring-dense" className="shape-white-large" />
    </section>
  );
}

/** Partner marks are typographic placeholders supplied by the reference design. */
function Partners() {
  return (
    <div className="partner-strip">
      <div className="container partner-inner">
        {[AudioLines, Aperture, Zap, Blocks, Cpu].map((Icon, i) => (
          <span key={i} className="partner-logo">
            <Icon size={38} aria-hidden />
            Logoipsum
          </span>
        ))}
      </div>
    </div>
  );
}
const paths = [
  { label: "Design", category: "UI/UX Design", icon: PenTool },
  { label: "Development", category: "Web Development", icon: Code2 },
  { label: "IT & Software", category: "Data Science", icon: Laptop },
  { label: "Business", category: "Freelance & Entrepreneurship", icon: BriefcaseBusiness },
  { label: "Marketing", category: "Marketing", icon: Sparkles },
  { label: "Photography", category: "Photography", icon: Camera },
];

/** Marketing sections reuse visuals while keeping personal progress out of course data. */
function Features() {
  return (
    <section className="features">
      <div className="container">
        <Reveal className="feature-row">
          <div className="feature-copy">
            <h2 className="section-heading">Your Path to Professional Growth Starts Here!</h2>
            <p>
              Explore our curated selection of courses tailored to enhance your capabilities and
              accelerate your career journey. Whether you are looking to sharpen specific skills,
              gain industry expertise, or embark on a new career path entirely, we have the
              resources you need.
            </p>
            <div className="feature-stats">
              <div>
                <strong>12K</strong>
                <span>Students</span>
              </div>
              <div>
                <strong>70+</strong>
                <span>Courses</span>
              </div>
              <div>
                <strong>16</strong>
                <span>Creators</span>
              </div>
            </div>
          </div>
          <div className="feature-art" aria-hidden inert>
            <div className="mini-course">
              <CourseArtwork />
            </div>
            <div className="feature-person">
              <Image src="/assets/hero/hero-student.png" alt="" fill sizes="550px" />
            </div>
            <div className="floating-stat feature-progress">
              <ProgressStat />
            </div>
            <Shape file="shape-lime-spring" className="feature-spring" />
          </div>
        </Reveal>
        <Reveal className="feature-row reverse">
          <div className="feature-art" aria-hidden inert>
            <div className="floating-stat feature-revenue">
              Total Revenue<small className="block !text-white">July 1–28</small>
              <strong>$120.29</strong>
              <div className="progress-track">
                <div style={{ width: "55%" }} />
              </div>
            </div>
            <div className="feature-person">
              <Image src="/assets/features/instructor-female.png" alt="" fill sizes="550px" />
            </div>
            <div className="floating-stat feature-happy">
              <HappyStudents />
            </div>
            <Shape file="shape-lime-squiggle-angled" className="feature-spring" />
          </div>
          <div className="feature-copy">
            <h2 className="section-heading">
              Create &amp; Manage
              <br />
              Courses Easily.
            </h2>
            <p>
              <strong>ByteSpace</strong> supports individuals or entities in the creation,
              publication, and administration of educational courses.
            </p>
            <ul className="feature-list">
              {[
                "Share Your Expertise",
                "Monetize Your Passion",
                "Flexibility and Autonomy",
                "Build a Community",
              ].map((item) => (
                <li key={item}>
                  <CheckCircle2 size={22} className="text-brand-blue" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
const testimonials = [
  {
    name: "Sarah M.",
    role: "Enthusiastic Learner",
    image: "avatar-yellow-background.png",
    quote:
      "ByteSpace has transformed my approach to learning. The diverse range of courses and the quality of content provided by creators have exceeded my expectations. The platform truly fosters a sense of community and lifelong learning.",
  },
  {
    name: "James L.",
    role: "Lifelong Learner",
    image: "creator-pink-background.png",
    quote:
      "I've tried several online learning platforms, and ByteSpace stands out for its vibrant community and the variety of courses available. The easy navigation and engaging content make it a go-to platform for continuous skill development.",
  },
  {
    name: "Alex B.",
    role: "Inspired Creator",
    image: "avatar-blue-shirt.png",
    quote:
      "As a creator, ByteSpace has been a game-changer for me. The Course Editor is user-friendly, and the support from the community is incredible. It's fulfilling to see my courses positively impact learners globally.",
  },
];

/** Home composes independently documented sections and a filterable course collection. */
export function HomePage() {
  const [category, setCategory] = useState("Featured");
  return (
    <>
      <HomeHero />
      <main id="main-content">
        <Partners />
        <section className="discover">
          <div className="container">
            <Reveal className="discover-intro">
              <h2 className="section-heading">
                Discover Your Passion,
                <br />
                Build Your Skills
              </h2>
              <p className="section-description">
                At ByteSpace Courses, we bring you closer to life-changing knowledge. Explore a
                variety of courses across different fields, from technology to the arts, and make a
                difference in your career and life.
              </p>
              <div className="category-pills" aria-label="Course categories">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    className="pill"
                    aria-pressed={category === c}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </button>
                ))}
                <Link className="pill !bg-transparent !text-brand-blue" href="/courses">
                  + More
                </Link>
              </div>
            </Reveal>
            <div className="mt-20">
              <CourseGrid
                filters={{ category, pageSize: 6 }}
                onReset={() => setCategory("Featured")}
              />
            </div>
          </div>
        </section>
        <section className="learning-paths container">
          <Reveal>
            <h2 className="section-heading">Explore Diverse Learning Paths at ByteSpace</h2>
            <p className="section-description">
              At ByteSpace, we believe in empowering individuals through knowledge. Our diverse
              range of courses spans various fields, ensuring there&apos;s something for everyone.
              Unleash your potential and explore our carefully curated categories.
            </p>
            <div className="path-grid">
              {paths.map(({ label, category, icon: Icon }) => (
                <Link
                  key={label}
                  className="path-card"
                  href={`/courses?category=${encodeURIComponent(category)}`}
                >
                  <span className="path-icon">
                    <Icon size={30} aria-hidden />
                  </span>
                  {label}
                </Link>
              ))}
            </div>
          </Reveal>
        </section>
        <Features />
        <section className="creator-cta grid-blue">
          <Shape file="shape-lime-spring-corner" className="cta-left" />
          <Shape file="shape-white-spring-dense" className="cta-right" />
          <div className="container">
            <Reveal>
              <h2 className="section-heading">Unlock Your Potential as a Creator with ByteSpace</h2>
              <p>
                Experience the collaboration of numerous creators and an expanding selection of
                courses. Register now and become a part of a community of local and international
                creators. Share your expertise and publish your finest course on the ByteSpace
                Course Library.
              </p>
              <Link
                href="/register"
                className="button bg-brand-lime text-brand-black px-8 min-h-12"
              >
                Join as Creator
              </Link>
            </Reveal>
          </div>
        </section>
        <section className="testimonials">
          <div className="container">
            <Reveal className="testimonial-intro">
              <h2 className="section-heading">Discover What Our Community Is Saying</h2>
              <p className="section-description">
                At ByteSpace, our vibrant community of learners and creators is at the heart of what
                we do. Hear directly from those who have experienced the transformative journey of
                learning and creating on our platform.
              </p>
            </Reveal>
            <div className="testimonial-grid">
              {testimonials.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.08}>
                  <article className="testimonial">
                    <Image
                      src={`/assets/avatars/${t.image}`}
                      alt=""
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                    <h3>{t.name}</h3>
                    <p className="role">{t.role}</p>
                    <blockquote>“{t.quote}”</blockquote>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="demo-note mt-8">
              Illustrative community stories and statistics for this demo.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
