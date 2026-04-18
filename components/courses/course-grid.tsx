import { CourseCard } from "./course-card";
import type { Course } from "@/constants";

interface CourseGridProps {
  courses: Course[];
  title?: string;
  subtitle?: string;
}

export function CourseGrid({ courses, title, subtitle }: CourseGridProps) {
  return (
    <section className="py-8 md:py-12">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && (
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
          )}
          {subtitle && (
            <p className="mt-1 text-muted-foreground">{subtitle}</p>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}
