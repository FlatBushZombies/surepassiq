import { CourseCard } from "./course-card";
import { Reveal } from "@/components/ui/reveal";
import { staggerDelay } from "@/lib/stagger";
import type { Course } from "@/constants";

interface CourseGridProps {
  courses: Course[];
  title?: string;
  subtitle?: string;
}

export function CourseGrid({ courses, title, subtitle }: CourseGridProps) {
  return (
    <section className="py-6 md:py-10">
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course, index) => (
          <Reveal key={course.id} delay={staggerDelay(index)}>
            <CourseCard course={course} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
