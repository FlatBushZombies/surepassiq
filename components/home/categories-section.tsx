import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/constants";

export function CategoriesSection() {
  return (
    <section className="bg-background py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">

        {/* Section Header */}
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-primary/70">
              Browse
            </p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Top categories
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Pick a track and start learning today
            </p>
          </div>
          <Link
            href="/categories"
            className="group hidden items-center gap-1.5 text-sm font-medium text-primary transition-all hover:gap-2.5 sm:flex"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 8).map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:bg-card hover:shadow-[0_4px_20px_-4px_hsl(var(--primary)/0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              {/* Subtle hover accent line */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Course count — top right, subordinate */}
              <span className="mb-3 block text-xs font-medium tabular-nums text-muted-foreground/60">
                {category.coursesCount.toLocaleString()} courses
              </span>

              {/* Category name */}
              <h3 className="text-sm font-semibold leading-snug text-card-foreground transition-colors duration-150 group-hover:text-primary">
                {category.name}
              </h3>

              {/* Subtle arrow on hover */}
              <div className="mt-3 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5">
                Explore
                <ArrowRight className="h-3 w-3" />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary"
          >
            View all categories
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}