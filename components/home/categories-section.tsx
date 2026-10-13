"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface VisualCategory {
  id: string;
  title: string;
  categorySlug: string;
  topic?: string;
  image: string;
}

const visualCategories: VisualCategory[] = [
  {
    id: "gen-ai",
    title: "Gen AI",
    categorySlug: "ai-data",
    image: "/categories/gen-ai.jpg",
  },
  {
    id: "exam-preparation",
    title: "Exam Preparation",
    categorySlug: "test-prep",
    topic: "Exam Preparation",
    image: "/categories/exam-preparation.jpg",
  },
  {
    id: "microsoft-excel",
    title: "Microsoft Excel",
    categorySlug: "ai-data",
    topic: "Data Literacy",
    image: "/categories/excel.jpg",
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    categorySlug: "ai-data",
    topic: "Prompt Engineering",
    image: "/categories/prompt-engineering.jpg",
  },
  {
    id: "ai-tools",
    title: "AI Tools",
    categorySlug: "ai-data",
    topic: "AI Fundamentals",
    image: "/categories/ai-tools.jpg",
  },
  {
    id: "practical-trades",
    title: "Practical Trades",
    categorySlug: "practical-trades",
    image: "/categories/practical-trades.jpg",
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    categorySlug: "ai-data",
    image: "/categories/machine-learning.jpg",
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    categorySlug: "ai-data",
    topic: "AI Agents",
    image: "/categories/ai-agents.jpg",
  },
];

function getHref(category: VisualCategory) {
  if (!category.topic) {
    return `/categories/${category.categorySlug}`;
  }
  return {
    pathname: `/categories/${category.categorySlug}`,
    query: { topic: category.topic },
  };
}

const ITEMS_PER_PAGE = 3;

export function CategoriesSection() {
  const [pageIndex, setPageIndex] = useState(0);
  const pageCount = Math.ceil(visualCategories.length / ITEMS_PER_PAGE);
  const pages = Array.from({ length: pageCount }, (_, index) =>
    visualCategories.slice(
      index * ITEMS_PER_PAGE,
      index * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
    ),
  );

  const handlePrev = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : pageCount - 1));
  };

  const handleNext = () => {
    setPageIndex((prev) => (prev < pageCount - 1 ? prev + 1 : 0));
  };

  return (
    <section className="bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <Reveal>
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left Text Block */}
            <div className="flex flex-col justify-center lg:col-span-4">
              <h2 className="text-3xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:text-[38px]">
                Learn <em className="font-normal italic">essential</em> career and practical skills
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                Surepass enables you to quickly develop in-demand skills and advance your career in a constantly evolving job market.
              </p>
            </div>

            {/* Right Carousel Block */}
            <div className="flex flex-col gap-6 overflow-hidden lg:col-span-8">
              <div className="overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-out-strong"
                  style={{ transform: `translateX(-${pageIndex * 100}%)` }}
                >
                  {pages.map((page, index) => (
                    <div
                      key={index}
                      className="grid w-full shrink-0 grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5"
                    >
                      {page.map((category) => (
                        <Link
                          key={category.id}
                          href={getHref(category)}
                          className="group relative block h-[320px] w-full overflow-hidden rounded-[22px] bg-muted transition-transform duration-300 ease-out-strong hover:-translate-y-1 sm:h-[360px] lg:h-[380px]"
                        >
                          {/* Full-bleed image */}
                          <Image
                            src={category.image}
                            alt={category.title}
                            fill
                            className="object-cover transition-transform duration-300 ease-out-strong group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />

                          {/* Legibility gradient */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                          {/* Title overlay */}
                          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-4">
                            <span className="text-base font-bold text-white sm:text-lg">
                              {category.title}
                            </span>
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-foreground transition-transform duration-150 ease-out-strong group-hover:translate-x-1">
                              <ArrowRight className="h-4 w-4" />
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation Controls */}
              {pageCount > 1 && (
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={handlePrev}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-foreground transition-[background-color,transform] duration-150 ease-out-strong hover:bg-muted active:scale-95"
                    aria-label="Previous categories"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>

                  {/* Indicator Dots */}
                  <div className="flex items-center gap-2 px-2">
                    {pages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setPageIndex(idx)}
                        className={`h-2.5 transition-all duration-300 ease-out-strong ${
                          idx === pageIndex
                            ? "w-8 rounded-full bg-primary"
                            : "w-2.5 rounded-full bg-muted hover:bg-muted-foreground/30"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleNext}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background text-foreground transition-[background-color,transform] duration-150 ease-out-strong hover:bg-muted active:scale-95"
                    aria-label="Next categories"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
