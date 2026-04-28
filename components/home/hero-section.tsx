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
    <section className="relative min-h-[600px] overflow-hidden bg-foreground lg:min-h-[540px]">
      {/* Background Images */}
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
        <div className="absolute inset-0 bg-foreground/80 lg:bg-gradient-to-r lg:from-foreground lg:via-foreground/90 lg:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 lg:px-6 lg:py-20">
        <div className="max-w-xl">
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-sm bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
            <Play className="h-3 w-3 fill-current" />
            Guided learning with assessments, notes, and certificates
          </div>

          {/* Heading */}
          <h1 className="mb-4 text-3xl font-bold leading-tight text-background md:text-4xl lg:text-5xl">
            Learn practical skills and prove
            <span className="text-primary"> what you know</span>
          </h1>

          {/* Description */}
          <p className="mb-6 text-base leading-relaxed text-background/70 lg:text-lg">
            Explore focused programs in AI, data, design, business, and workplace
            skills. Track lesson progress, pass assessments, and grow through one
            clear learning platform.
          </p>

          {/* Search Form */}
          <div className="mb-6">
            <CatalogSearchForm
              placeholder="Search by course, skill, or instructor"
              buttonLabel="Find courses"
              className="flex flex-col gap-2 sm:flex-row"
              inputClassName="h-12 rounded-sm border-0 bg-background pl-10 pr-4 text-sm shadow-none focus:ring-0"
              buttonClassName="h-12 rounded-sm px-6 text-sm font-semibold"
            />
          </div>

          {/* Highlights */}
          <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
            {highlights.map((highlight) => (
              <div
                key={highlight}
                className="flex items-center gap-1.5 text-sm text-background/70"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-sm px-6 text-sm font-semibold"
            >
              <Link href="/my-learning">Open learner dashboard</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 rounded-sm border-background/30 bg-transparent px-6 text-sm font-semibold text-background hover:bg-background/10 hover:text-background"
            >
              <Link href="/categories">Browse categories</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-6 left-4 flex gap-1.5 lg:left-6">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-1 rounded-full transition-all duration-300 ${
              index === currentImage
                ? "w-6 bg-background"
                : "w-1 bg-background/40 hover:bg-background/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
