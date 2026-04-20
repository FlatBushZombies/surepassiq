"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Users } from "lucide-react";
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
    <article className="group overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      {/* Course Image */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={course.image}
          alt={course.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {course.bestseller && (
          <Badge className="absolute left-2 top-2 bg-warning text-warning-foreground font-semibold">
            Bestseller
          </Badge>
        )}
      </div>

      {/* Course Content */}
      <div className="p-4">
        {/* Title */}
        <Link href={`/course/${course.slug}`} className="block">
          <h3 className="mb-1 line-clamp-2 text-base font-semibold leading-tight text-card-foreground group-hover:text-primary">
            {course.title}
          </h3>
        </Link>

        {/* Instructor */}
        <p className="mb-2 text-xs text-muted-foreground">{course.instructor.name}</p>

        {/* Rating */}
        <div className="mb-2 flex items-center gap-1">
          <span className="text-sm font-bold text-[oklch(var(--rating))]">
            {course.rating.toFixed(1)}
          </span>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(course.rating)
                    ? "fill-[oklch(var(--rating))] text-[oklch(var(--rating))]"
                    : i < course.rating
                    ? "fill-[oklch(var(--rating))]/50 text-[oklch(var(--rating))]"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">{formatReviews(course.reviewsCount)}</span>
        </div>

        {/* Duration & Level */}
        <p className="mb-2 text-xs text-muted-foreground">
          {course.duration} total · {course.lectures} lectures · {course.level}
        </p>

        {/* Price */}
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

        {/* Students count */}
        <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <Users className="h-3 w-3" />
          <span>{formatStudents(course.studentsCount)} students</span>
        </div>

        <div className="mt-4">
          <Link href={`/course/${course.slug}`} className="inline-flex w-full items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
            Enroll now
          </Link>
        </div>
      </div>
    </article>
  );
}
