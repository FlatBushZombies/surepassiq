"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Reveal } from "@/components/ui/reveal";
import { SkillCourseCard } from "@/components/courses/skill-course-card";
import { courses, type Course } from "@/constants";
import { cn } from "@/lib/utils";

interface SkillsTab {
  label: string;
  match: (course: Course) => boolean;
}

const tabs: SkillsTab[] = [
  { label: "AI & Data", match: (c) => c.category === "AI & Data" },
  { label: "Business", match: (c) => c.category === "Business" },
  { label: "Design", match: (c) => c.category === "Design" },
  { label: "Marketing", match: (c) => c.category === "Marketing" },
  { label: "IT & Software", match: (c) => c.category === "IT & Software" },
  { label: "Personal Development", match: (c) => c.category === "Personal Development" },
  { label: "Child Development", match: (c) => c.category === "Child Development" },
  { label: "Driving", match: (c) => c.category === "Driving" },
  { label: "AI Video Generation", match: (c) => c.category === "AI Video Generation" },
  {
    label: "Exam Preparation",
    match: (c) => c.category === "Test Prep" && c.subcategory === "Exam Preparation",
  },
];

export function SkillsTransformSection() {
  const [activeTab, setActiveTab] = React.useState(0);
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const activeCategory = tabs[activeTab].label;
  const tabCourses = React.useMemo(
    () => courses.filter((course) => tabs[activeTab].match(course)),
    [activeTab],
  );

  React.useEffect(() => {
    if (!api) return;

    const updateScrollButtons = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

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

        {/* Tabs + carousel controls */}
        <div className="mt-8 flex items-end justify-between gap-4 border-b border-border">
          <div className="flex gap-6 overflow-x-auto sm:gap-8">
            {tabs.map((tab, index) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(index)}
                className={cn(
                  "relative shrink-0 whitespace-nowrap pb-3 text-sm transition-colors duration-150 ease-out-strong sm:text-base",
                  index === activeTab
                    ? "font-bold text-foreground"
                    : "font-medium text-muted-foreground hover:text-foreground",
                )}
              >
                {tab.label}
                {index === activeTab && (
                  <span className="absolute inset-x-0 -bottom-px h-0.5 bg-foreground" />
                )}
              </button>
            ))}
          </div>

          {tabCourses.length > 0 && (
            <div className="mb-2 flex shrink-0 items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full border-border bg-background shadow-xs hover:bg-accent disabled:opacity-40"
                onClick={() => api?.scrollPrev()}
                disabled={!canScrollPrev}
                aria-label="Previous courses"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 rounded-full border-border bg-background shadow-xs hover:bg-accent disabled:opacity-40"
                onClick={() => api?.scrollNext()}
                disabled={!canScrollNext}
                aria-label="Next courses"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
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
