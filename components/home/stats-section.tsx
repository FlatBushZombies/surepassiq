import { stats } from "@/constants";
import { GraduationCap, BookOpen, Users, Award } from "lucide-react";

const icons = [GraduationCap, BookOpen, Users, Award];

export function StatsSection() {
  return (
    <section className="border-y border-border bg-primary py-10 md:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = icons[index];
            return (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="text-2xl font-bold text-primary-foreground md:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-0.5 text-sm text-primary-foreground/80">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
