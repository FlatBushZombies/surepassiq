"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface VisualCategory {
  id: string;
  title: string;
  href: string;
  image: string;
}

const visualCategories: VisualCategory[] = [
  {
    id: "generative-ai",
    title: "Generative AI",
    href: "/course/generative-ai",
    image: "/courses/gen-AI.jpeg",
  },
  {
    id: "it-certifications",
    title: "IT Certifications",
    href: "/course/it-certifications",
    image: "/courses/IT-certifications.jpeg",
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    href: "/course/prompt-engineering",
    image: "/courses/prompt-engineering.jpeg",
  },
  {
    id: "ai-agents",
    title: "AI Agents",
    href: "/course/ai-agents",
    image: "/courses/AI-agents.jpeg",
  },
  {
    id: "practical-skills",
    title: "Practical skills",
    href: "/categories/practical-trades",
    image: "/courses/practical-skills.jpeg",
  },
  {
    id: "exam-preparation",
    title: "Exam preparation",
    href: "/course/exam-preparation",
    image: "/courses/exam-preparations.jpeg",
  },
];

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
                Learn <em className="font-normal italic">essential</em> career and life skills
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                Surepass IQ helps you build in-demand skills fast and advance your career in a changing job market.
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
                          href={category.href}
                          className="group flex w-full flex-col rounded-[22px] transition-transform duration-300 ease-out-strong hover:-translate-y-1"
                        >
                          {/* Full-bleed image */}
                          <div className="relative h-[320px] w-full overflow-hidden rounded-[22px] bg-muted sm:h-[360px] lg:h-[380px]">
                            <Image
                              src={category.image}
                              alt={category.title}
                              fill
                              className="object-cover transition-transform duration-300 ease-out-strong group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          </div>

                          {/* Bottom label */}
                          <div className="mt-2.5 flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors duration-150 ease-out-strong group-hover:border-foreground/20">
                            <span className="text-sm font-bold text-card-foreground sm:text-base">
                              {category.title}
                            </span>
                            <ArrowRight className="h-4 w-4 text-card-foreground transition-transform duration-150 ease-out-strong group-hover:translate-x-1" />
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
