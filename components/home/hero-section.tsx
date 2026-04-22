"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CatalogSearchForm } from "@/components/search/catalog-search-form";

const heroImages = [
  "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1920",
];

const highlights = [
  "Project-based lessons",
  "Assessments and certificates",
  "Learner dashboards and notes",
];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((previous) => (previous + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-foreground">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt="Learning background"
            fill
            priority={index === 0}
            className={`object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/92 via-foreground/75 to-foreground/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,transparent_50%,hsl(var(--foreground)/0.3)_100%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28 lg:px-6 lg:py-36">
        <div className="max-w-2xl">
          <div
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-700"
            style={{ transitionDelay: "100ms" }}
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Guided learning with assessments, notes, and certificates
          </div>

          <h1
            className="mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-background transition-all duration-700 md:text-5xl lg:text-[3.75rem]"
            style={{ transitionDelay: "200ms" }}
          >
            Learn practical skills and prove
            <span className="text-primary"> what you know</span>
          </h1>

          <p
            className="mb-9 max-w-xl text-base leading-relaxed text-background/70 transition-all duration-700 md:text-lg"
            style={{ transitionDelay: "300ms" }}
          >
            Explore focused programs in AI, data, design, business, and workplace
            skills. Track lesson progress, pass assessments, and grow through one
            clear learning platform.
          </p>

          <div
            className="mb-8 max-w-xl transition-all duration-700"
            style={{ transitionDelay: "400ms" }}
          >
            <CatalogSearchForm
              placeholder="Search by course, skill, or instructor"
              buttonLabel="Find courses"
              className="flex flex-col gap-3 sm:flex-row"
              inputClassName="h-12 rounded-xl border-border/60 bg-background/95 pl-10 pr-4 text-sm shadow-md backdrop-blur-sm"
              buttonClassName="h-12 rounded-xl px-7 text-sm font-semibold shadow-md"
            />
          </div>

          <div
            className="flex flex-col gap-5 transition-all duration-700"
            style={{ transitionDelay: "500ms" }}
          >
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-1.5 text-sm text-background/70"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-background/20 bg-background/5 text-background/80 backdrop-blur-sm hover:border-background/40 hover:bg-background/10 hover:text-background"
              >
                <Link href="/categories">Browse categories</Link>
              </Button>
              <Button asChild size="lg" className="rounded-xl px-6">
                <Link href="/my-learning">Open learner dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-4 flex gap-2 lg:left-6">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentImage
                ? "w-8 bg-background/80"
                : "w-1.5 bg-background/25 hover:bg-background/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
