"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/constants";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const formatStudents = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  const formatReviews = (count: number) => {
    if (count >= 1000) {
      return `(${(count / 1000).toFixed(0)}K)`;
    }
    return `(${count})`;
  };

  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          {course.bestseller && (
            <Badge className="bg-warning font-semibold text-warning-foreground">
              Bestseller
            </Badge>
          )}
          {course.featured && <Badge variant="secondary">Featured</Badge>}
        </div>
      </div>

      <div className="space-y-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
            {course.category}
          </p>
          <Link href={`/course/${course.slug}`} className="block">
            <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-tight text-card-foreground group-hover:text-primary">
              {course.title}
            </h3>
          </Link>
          <p className="mt-1 text-xs text-muted-foreground">{course.instructor.name}</p>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <span className="font-bold text-[oklch(var(--rating))]">{course.rating.toFixed(1)}</span>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-3.5 w-3.5 ${
                  index < Math.floor(course.rating)
                    ? "fill-[oklch(var(--rating))] text-[oklch(var(--rating))]"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{formatReviews(course.reviewsCount)}</span>
        </div>

        <p className="text-xs text-muted-foreground">
          {course.duration} · {course.lectures} lessons · {course.level}
        </p>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
          <span>Includes assessment and completion certificate</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-card-foreground">
            ${course.price.toFixed(2)}
          </span>
          {course.originalPrice > course.price && (
            <span className="text-sm text-muted-foreground line-through">
              ${course.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="h-3 w-3" />
          <span>{formatStudents(course.studentsCount)} learners</span>
        </div>

        <div className="pt-2">
          <Link
            href={`/course/${course.slug}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            View course
          </Link>
        </div>
      </div>
    </article>
  );
}
