"use client";
import Image from "next/image";
import type { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { SearchForm } from "@/components/courses/SearchForm";
import { HappyStudents, ProgressStat, Shape } from "@/components/ui/MarketingArt";

/** Position, entrance and ambient motion have separate layers to preserve centering. */
function HeroStat({ className, children }: { className: string; children: ReactNode }) {
  return (
    <div className={`floating-stat hero-stat-position ${className}`}>
      <div className="hero-stat-enter">
        <div className="hero-stat-surface ambient-float">{children}</div>
      </div>
    </div>
  );
}

/** CSS entrances work before hydration; content remains visible when animation is disabled. */
export function HomeHero() {
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
        <div className="hero-dome">
          <div className="hero-dome-surface" />
        </div>
        <div className="hero-person">
          <div className="hero-person-enter">
            <div className="hero-person-float ambient-float">
              <Image
                src="/assets/hero/hero-student.png"
                alt=""
                fill
                sizes="(max-width: 540px) 440px, 600px"
                preload
              />
            </div>
          </div>
        </div>
        <HeroStat className="hero-topic">
          UI/UX Design
          <br />
          <small>200 Courses · 1000+ Students</small>
        </HeroStat>
        <HeroStat className="hero-progress">
          <ProgressStat />
        </HeroStat>
        <HeroStat className="hero-students">
          <HappyStudents />
        </HeroStat>
      </div>
      <Shape file="shape-lime-zigzag-large" className="shape-spring" />
      <Shape file="shape-yellow-cylinder" className="shape-cylinder" />
      <Shape file="shape-white-spring" className="shape-white-small" />
      <Shape file="shape-white-pyramid" className="shape-pyramid" />
      <Shape file="shape-white-torus" className="shape-torus" />
      <Shape file="shape-white-spring-dense" className="shape-white-large" />
    </section>
  );
}
