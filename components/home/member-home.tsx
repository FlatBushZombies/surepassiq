"use client";

import Image from "next/image";
import Link from "next/link";
import { PlayCircle, Trophy } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { categories, courses } from "@/constants";
import { useLearner } from "@/components/learning/learner-provider";
import { SkillCourseCard } from "@/components/courses/skill-course-card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getCourseProgressPercent } from "@/lib/learner-store";

export function MemberHome() {
  const { user } = useUser();
  const { enrolledCourses, getCourseState } = useLearner();

  const availableCourses = courses.filter(
    (course) => !enrolledCourses.some((enrolled) => enrolled.slug === course.slug),
  );
  const firstName = user?.firstName || user?.fullName || "there";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-12">
      {/* Welcome header */}
      <div className="flex items-center gap-4">
        <Image
          src={user?.imageUrl || "/surepass.jpeg"}
          alt={firstName}
          width={56}
          height={56}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
            Welcome, {firstName}
          </h1>
          <Link href="/categories" className="text-sm font-semibold text-primary hover:underline">
            Browse all courses
          </Link>
        </div>
      </div>

      {/* Category chips */}
      <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categories/${category.slug}`}
            className="shrink-0 whitespace-nowrap rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
          >
            {category.name}
          </Link>
        ))}
      </div>

      {/* Continue learning */}
      {enrolledCourses.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">Continue learning</h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {enrolledCourses.map((course) => {
              const courseState = getCourseState(course.slug);
              const progress = getCourseProgressPercent(course, courseState);

              return (
                <div
                  key={course.slug}
                  className="flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image src={course.image} alt={course.title} fill className="object-cover" />
                    {progress >= 100 && (
                      <span className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/90">
                        <Trophy className="h-4 w-4 text-primary" />
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="line-clamp-2 text-sm font-bold text-card-foreground">
                      {course.title}
                    </h3>
                    <div className="mt-3">
                      <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
                        <span>{progress}% complete</span>
                      </div>
                      <Progress value={progress} />
                    </div>
                    <Button size="sm" className="mt-4 w-full gap-1.5 text-xs" asChild>
                      <Link href={`/learn/${course.slug}`}>
                        <PlayCircle className="h-3.5 w-3.5" />
                        {progress > 0 ? "Continue learning" : "Start learning"}
                      </Link>
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Available courses */}
      {availableCourses.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">Available courses</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Explore the rest of the SurePass IQ catalog.
          </p>
          <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {availableCourses.slice(0, 12).map((course) => (
              <SkillCourseCard key={course.slug} course={course} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
