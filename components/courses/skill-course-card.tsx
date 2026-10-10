"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/constants";

export function SkillCourseCard({ course }: { course: Course }) {
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
