"use client";

import * as React from "react";
import { CourseCard } from "@/components/courses/course-card";
import { Reveal } from "@/components/ui/reveal";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Course } from "@/constants";

interface PopularCoursesCarouselProps {
  courses: Course[];
  title?: string;
  subtitle?: string;
}

export function PopularCoursesCarousel({
  courses,
  title = "Most popular courses",
  subtitle = "Popular picks from our early learner community",
}: PopularCoursesCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrentSlide(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrentSlide(api.selectedScrollSnap());
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    });

    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, [api]);

  return (
    <section className="py-6 md:py-10">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
        }}
        className="w-full"
      >
        <div className="mb-6 flex items-end justify-between">
          <div>
            {title && (
              <h2 className="text-xl font-bold text-foreground md:text-2xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full border-neutral-300 dark:border-neutral-700 bg-background shadow-xs hover:bg-accent disabled:opacity-40"
              onClick={() => api?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Previous courses"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 rounded-full border-neutral-300 dark:border-neutral-700 bg-background shadow-xs hover:bg-accent disabled:opacity-40"
              onClick={() => api?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Next courses"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <CarouselContent className="-ml-4">
          {courses.map((course, index) => (
            <CarouselItem
              key={course.id}
              className="pl-4 basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
            >
              <div className="h-full">
                <CourseCard course={course} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
