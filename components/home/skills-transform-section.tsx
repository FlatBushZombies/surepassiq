"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Reveal } from "@/components/ui/reveal";
import { courses, type Course } from "@/constants";
import { cn } from "@/lib/utils";

const tabs = [
  "Child Development",
  "Driving",
  "AI Video Generation",
  "O Level",
  "A Level",
] as const;

export function SkillsTransformSection() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const activeCategory = tabs[activeTab];
  const tabCourses = React.useMemo(
    () => courses.filter((course) => course.category === activeCategory),
    [activeCategory],
  );

  React.useEffect(() => {
    if (!api) return;

    const updateScrollButtons = () => setCanScrollNext(api.canScrollNext());

    queueMicrotask(updateScrollButtons);
    api.on("select", updateScrollButtons);
    api.on("reInit", updateScrollButtons);

    return () => {
      api.off("select", updateScrollButtons);
      api.off("reInit", updateScrollButtons);
    };
  }, [api]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 lg:px-6 lg:py-16">
      <Reveal>
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Skills to transform your career and life
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
          From critical workplace skills to technical topics, Surepass IQ
          supports your professional development.
        </p>

        {/* Tabs */}
        <div className="mt-8 flex gap-6 overflow-x-auto border-b border-border sm:gap-8">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(index)}
              className={cn(
                "relative shrink-0 whitespace-nowrap pb-3 text-sm transition-colors duration-150 ease-out-strong sm:text-base",
                index === activeTab
                  ? "font-bold text-foreground"
                  : "font-medium text-muted-foreground hover:text-foreground",
              )}
            >
              {tab}
              {index === activeTab && (
                <span className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground" />
              )}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="relative mt-6">
          {tabCourses.length > 0 ? (
            <Carousel
              setApi={setApi}
              opts={{ align: "start", loop: false }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {tabCourses.map((course) => (
                  <CarouselItem
                    key={course.id}
                    className="basis-full pl-4 sm:basis-1/2 lg:basis-1/4"
                  >
                    <SkillCourseCard course={course} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              {canScrollNext && (
                <button
                  type="button"
                  onClick={() => api?.scrollNext()}
                  aria-label="Show more courses"
                  className="absolute right-0 top-[92px] flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-md transition-[background-color,transform] duration-150 ease-out-strong hover:bg-muted active:scale-95"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </Carousel>
          ) : (
            <p className="py-12 text-center text-sm text-muted-foreground">
              New {activeCategory} courses are coming soon.
            </p>
          )}
        </div>
      </Reveal>
    </section>
  );
}

function SkillCourseCard({ course }: { course: Course }) {
  return (
    <Link
      href={`/course/${course.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-shadow duration-150 ease-out-strong hover:shadow-md"
    >
      <div className="relative aspect-[2/1] w-full overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 ease-out-strong group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-bold text-card-foreground">
          {course.title}
        </h3>
        <p className="mt-1 truncate text-xs text-muted-foreground">
          {course.instructor.name}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          {course.bestseller && (
            <Badge className="rounded-sm bg-[#eceb98] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#3d3c0a] hover:bg-[#eceb98]">
              Bestseller
            </Badge>
          )}
          <span className="flex items-center gap-1 rounded-sm border border-border px-1.5 py-0.5 text-xs font-bold text-foreground">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            {course.rating.toFixed(1)}
          </span>
          <span className="rounded-sm border border-border px-1.5 py-0.5 text-xs text-muted-foreground">
            {course.reviewsCount.toLocaleString()} ratings
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-bold text-card-foreground">
              ${course.price.toFixed(2)}
            </span>
            {course.originalPrice > course.price && (
              <span className="text-xs text-muted-foreground line-through">
                ${course.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <span className="rounded-md border-2 border-primary px-3 py-1.5 text-xs font-bold text-primary transition-colors duration-150 ease-out-strong group-hover:bg-primary group-hover:text-primary-foreground">
            Add to cart
          </span>
        </div>
      </div>
    </Link>
  );
}
