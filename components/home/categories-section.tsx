"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

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
    slug: "generative-ai",
    image: "/courses/gen-AI.jpeg",
  },
  {
    id: "cat-2",
    title: "IT Certifications",
    slug: "it-certifications",
    image: "/courses/IT-certifications.jpeg",
  },
  {
    id: "cat-3",
    title: "Prompt Engineering",
    slug: "prompt-engineering",
    image: "/courses/prompt-engineering.jpeg",
  },
  {
    id: "cat-4",
    title: "AI Agents",
    slug: "ai-agents",
    image: "/courses/AI-agents.jpeg",
  },
  {
    id: "cat-5",
    title: "Plumbing practical",
    slug: "plumbing-practical",
    image: "/courses/plumbing-practical.png",
  },
  {
    id: "cat-6",
    title: "Aluminum fabrication",
    slug: "aluminum-fabrication",
    image: "/courses/aluminum-fabrication.png",
  },
  {
    id: "cat-7",
    title: "Cellphone & laptop repairs",
    slug: "cellphone-laptop-repairs",
    image: "/courses/cellphone-laptop-repairs.png",
  },
  {
    id: "cat-8",
    title: "Exam preparation",
    slug: "exam-preparation",
    image: "/courses/exam-preparation.jpeg",
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
    <section className="bg-background py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <Reveal>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10 items-center">
            {/* Left Text Block */}
            <div className="lg:col-span-4 flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-[38px] leading-[1.2]">
                Learn <em className="italic font-normal">essential</em> career and life skills
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
                SurePass IQ helps you build in-demand skills fast and advance your career in a changing job market.
              </p>
            </div>

            {/* Right Carousel Block */}
            <div className="lg:col-span-8 flex flex-col gap-6 overflow-hidden">
              <div className="overflow-hidden">
                <div
                  className="flex gap-4 sm:gap-5 transition-transform duration-500 ease-out-strong"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
                  }}
                >
                  {visualCategories.map((category) => (
                    <div
                      key={category.id}
                      className="w-full min-w-[240px] sm:min-w-[260px] lg:min-w-[calc(33.333%-14px)] shrink-0"
                    >
                      <Link
                        href={`/course/${category.slug}`}
                        className="group flex flex-col w-full rounded-[22px] transition-all duration-300 hover:-translate-y-1"
                      >
                        {/* Top 3D Image Graphic (Controlled Height, not way too high) */}
                        <div className="relative h-[260px] w-full overflow-hidden rounded-[22px] border border-slate-200/70 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-800 sm:h-[280px] lg:h-[300px]">
                          <Image
                            src={category.image}
                            alt={category.title}
                            fill
                            className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.03]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                        
                        {/* Bottom White Label Box */}
                        <div className="mt-2.5 flex items-center justify-between rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-4 shadow-sm transition-all group-hover:border-slate-300 dark:group-hover:border-slate-700">
                          <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                            {category.title}
                          </span>
                          <ArrowRight className="h-4 w-4 text-slate-800 dark:text-slate-200 transition-transform group-hover:translate-x-1" />
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Navigation Controls (Purple Pill Active Dot + Arrow Buttons) */}
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={handlePrev}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-background text-foreground transition-all hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95"
                  aria-label="Previous categories"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                </button>

                {/* Indicator Dots with Active Purple Pill */}
                <div className="flex items-center gap-2 px-2">
                  {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2.5 transition-all duration-300 ${
                        idx === currentIndex
                          ? "w-8 rounded-full bg-[#6b21a8] dark:bg-purple-500"
                          : "w-2.5 rounded-full bg-slate-200 dark:bg-slate-700 hover:bg-slate-300"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-slate-800 bg-background text-foreground transition-all hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95"
                  aria-label="Next categories"
                >
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
