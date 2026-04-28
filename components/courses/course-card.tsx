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
    <article className="group flex h-full flex-col border-b border-border bg-card pb-4 transition-colors hover:bg-muted/30">
      <Link href={`/course/${course.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={course.image}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col px-1 pt-3">
        <Link href={`/course/${course.slug}`} className="block">
          <h3 className="line-clamp-2 text-sm font-bold leading-tight text-card-foreground">
            {course.title}
          </h3>
        </Link>

        <p className="mt-1 text-xs text-muted-foreground">{course.instructor.name}</p>

        <div className="mt-1 flex items-center gap-1">
          <span className="text-sm font-bold text-[oklch(var(--rating))]">
            {course.rating.toFixed(1)}
          </span>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-3 w-3 ${
                  index < Math.floor(course.rating)
                    ? "fill-[oklch(var(--rating))] text-[oklch(var(--rating))]"
                    : index < course.rating
                      ? "fill-[oklch(var(--rating))]/50 text-[oklch(var(--rating))]"
                      : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            {formatReviews(course.reviewsCount)}
          </span>
        </div>

        <p className="mt-1 text-xs text-muted-foreground">
          {course.duration} · {course.lectures} lessons · {course.level}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-base font-bold text-card-foreground">
            ${course.price.toFixed(2)}
          </span>
          {course.originalPrice > course.price && (
            <span className="text-xs text-muted-foreground line-through">
              ${course.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-1.5">
          {course.bestseller && (
            <Badge className="rounded-sm bg-[#eceb98] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#3d3c0a] hover:bg-[#eceb98]">
              Bestseller
            </Badge>
          )}
        </div>
      </div>
    </article>
  );
}
