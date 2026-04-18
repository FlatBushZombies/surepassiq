import { stats } from "@/constants";
import { GraduationCap, BookOpen, Users, Award } from "lucide-react";

const icons = [GraduationCap, BookOpen, Users, Award];

export function StatsSection() {
  return (
    <section className="bg-primary py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = icons[index];
            return (
              <div key={stat.label} className="text-center">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/10">
                  <Icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <div className="text-3xl font-bold text-primary-foreground md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-primary-foreground/80">
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
