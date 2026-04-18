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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-secondary">
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
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 md:py-24 lg:px-6 lg:py-32">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            <Play className="h-4 w-4 fill-current" />
            New courses added weekly
          </div>

          {/* Heading */}
          <h1 className="mb-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
            <span className="text-balance">Learn without limits</span>
          </h1>

          {/* Subheading */}
          <p className="mb-8 max-w-lg text-lg text-muted-foreground md:text-xl">
            Build practical skills with expertly designed programs from our institution.
          </p>

          {/* Search Bar */}
          <div className="mb-8 flex max-w-xl flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="What do you want to learn?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-xl border-border bg-card pl-12 pr-4 text-base shadow-sm focus-visible:ring-primary"
              />
            </div>
            <Button size="lg" className="h-12 rounded-xl px-8 text-base font-semibold shadow-md">
              Search
            </Button>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap items-center gap-4">
            {highlights.map((highlight) => (
              <div key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>

          {/* CTA Links */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Button asChild variant="outline" size="lg" className="rounded-xl">
              <Link href="/categories">Browse categories</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentImage
                ? "w-8 bg-primary"
                : "w-2 bg-primary/30 hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
