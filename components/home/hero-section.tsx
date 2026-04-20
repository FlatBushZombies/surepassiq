"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Play, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const heroImages = [
  "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/5905709/pexels-photo-5905709.jpeg?auto=compress&cs=tinysrgb&w=1920",
  "https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1920",
];

const highlights = [
  "24 practical courses",
  "Institution-led programs",
  "Lifetime access",
];

export function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-foreground">
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((img, index) => (
          <Image
            key={img}
            src={img}
            alt="Learning background"
            fill
            className={`object-cover transition-opacity duration-1000 ${
              index === currentImage ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
        {/* Layered gradients for depth and contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/92 via-foreground/75 to-foreground/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,transparent_50%,hsl(var(--foreground)/0.3)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28 lg:px-6 lg:py-36">
        <div className="max-w-xl">

          {/* Badge — entry animation first element */}
          <div
            className={`mb-7 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
            style={{ transitionDelay: "100ms" }}
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            New courses added weekly
          </div>

          {/* Heading — staggered reveal */}
          <h1
            className={`mb-5 text-4xl font-extrabold leading-[1.1] tracking-tight text-background md:text-5xl lg:text-[3.75rem] transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            Learn without{" "}
            <span className="text-primary">limits</span>
          </h1>

          {/* Subheading */}
          <p
            className={`mb-9 text-base leading-relaxed text-background/60 md:text-lg transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            Build practical skills with expertly designed programs from our institution.
          </p>

          {/* Search — grouped as a single unit */}
          <div
            className={`mb-8 flex max-w-lg flex-col gap-3 sm:flex-row transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground/70" />
              <Input
                type="search"
                placeholder="What do you want to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-xl border-border/60 bg-background/95 pl-12 pr-4 text-sm shadow-md backdrop-blur-sm focus-visible:border-primary/40 focus-visible:ring-1 focus-visible:ring-primary/30 transition-all"
              />
            </div>
            <Button
              size="lg"
              className="h-12 shrink-0 rounded-xl px-7 text-sm font-semibold shadow-md"
            >
              Search
            </Button>
          </div>

          {/* Highlights + CTA — visually separated */}
          <div
            className={`flex flex-col gap-5 transition-all duration-700 ${
              mounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            {/* Highlights row */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-1.5 text-sm text-background/60"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl border-background/20 bg-background/5 text-background/80 backdrop-blur-sm hover:border-background/40 hover:bg-background/10 hover:text-background transition-colors"
              >
                <Link href="/categories">Browse categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Indicators — anchored left to align with content */}
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