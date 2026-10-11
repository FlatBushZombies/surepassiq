import { CheckCircle2 } from "lucide-react";
import type { Course } from "@/constants";

export function PracticalCourseSummary({ course }: { course: Course }) {
  return (
    <section id="curriculum" className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-card-foreground">Course curriculum</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        A practical, hands-on breakdown of what this course covers.
      </p>

      <div className="mt-6 space-y-5">
        {course.modules.map((module, index) => (
          <div key={module.id} className="rounded-2xl border border-border p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-primary">
              Module {index + 1}
            </p>
            <h3 className="mt-1 text-lg font-bold text-card-foreground">{module.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{module.summary}</p>
            <ul className="mt-4 space-y-2">
              {module.lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="flex items-start gap-2 text-sm text-card-foreground"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{lesson.title}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
