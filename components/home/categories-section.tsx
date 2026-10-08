"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface VisualCategory {
  id: string;
  title: string;
  slug: string;
  image: string;
}

const visualCategories: VisualCategory[] = [
  {
    id: "cat-1",
    title: "Generative AI",
    slug: "ai-data",
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "cat-2",
    title: "IT Certifications",
    slug: "it-software",
    image: "https://images.pexels.com/photos/7005047/pexels-photo-7005047.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "cat-3",
    title: "Data Science",
    slug: "ai-data",
    image: "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "cat-4",
    title: "Web Development",
    slug: "it-software",
    image: "https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "cat-5",
    title: "Business Leadership",
    slug: "business",
    image: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "cat-6",
    title: "UX & UI Design",
    slug: "design",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

export function CategoriesSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;
  const maxIndex = Math.max(0, visualCategories.length - itemsPerPage);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  return (
    <section className="bg-background py-14 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12 lg:items-center">
          {/* Left Text Block */}
          <div className="lg:col-span-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[40px] leading-[1.2]">
              Learn <em className="italic font-normal">essential</em> career and life practical skills
            </h2>
            <p className="mt-4 text-base text-muted-foreground leading-relaxed">
              SurepassIQ helps you build in-demand skills fast and advance your career in a changing job market.
            </p>
          </div>

          {/* Right Carousel Block */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="overflow-hidden">
              <div
                className="flex gap-4 sm:gap-6 transition-transform duration-500 ease-out-strong"
                style={{
                  transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                }}
              >
                {visualCategories.map((category) => (
                  <div
                    key={category.id}
                    className="w-full min-w-[260px] sm:min-w-[280px] lg:min-w-[calc(33.333%-16px)] shrink-0"
                  >
                    <Link
                      href={`/categories/${category.slug}`}
                      className="group relative block aspect-[3/4] w-full overflow-hidden rounded-3xl bg-muted shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                      <Image
                        src={category.image}
                        alt={category.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      
                      {/* Card Overlay Pill */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-2xl bg-white/95 dark:bg-neutral-900/95 p-4 backdrop-blur-xs shadow-md transition-colors group-hover:bg-white dark:group-hover:bg-neutral-900">
                        <span className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
                          {category.title}
                        </span>
                        <ArrowRight className="h-4 w-4 text-neutral-800 dark:text-neutral-200 transition-transform group-hover:translate-x-1" />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Navigation Controls */}
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={handlePrev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all hover:bg-muted active:scale-95 disabled:opacity-50"
                aria-label="Previous categories"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              {/* Indicator Dots */}
              <div className="flex items-center gap-2 px-2">
                {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2.5 transition-all duration-300 ${
                      idx === currentIndex
                        ? "w-8 rounded-full bg-[#6b21a8] dark:bg-purple-500"
                        : "w-2.5 rounded-full bg-border hover:bg-muted-foreground/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background text-foreground transition-all hover:bg-muted active:scale-95 disabled:opacity-50"
                aria-label="Next categories"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
