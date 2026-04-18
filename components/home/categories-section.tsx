import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/constants";

export function CategoriesSection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Top categories
            </h2>
            <p className="mt-1 text-muted-foreground">
              Pick a track and start learning today
            </p>
          </div>
          <Link
            href="/categories"
            className="hidden items-center gap-1 text-sm font-medium text-primary hover:underline sm:flex"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group rounded-xl border border-border bg-card p-5 transition-all hover:border-primary hover:shadow-md"
            >
              <h3 className="mb-1 text-base font-semibold text-card-foreground group-hover:text-primary">
                {category.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {category.coursesCount.toLocaleString()} courses
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
