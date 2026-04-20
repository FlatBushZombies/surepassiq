import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { categories } from "@/constants";

export default function CategoriesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-6">
            <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              All Categories
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Explore our comprehensive collection of courses across all categories.
              Find the perfect course to advance your skills and career.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/login" className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">
                Enroll now
              </Link>
              <Link href="/categories" className="rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary">
                Browse categories
              </Link>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary hover:shadow-lg hover:shadow-primary/10"
                >
                  <div className="p-6">
                    <div className="mb-4 flex items-center gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-secondary text-3xl">
                        {category.icon}
                      </div>
                      <div>
                        <h2 className="text-xl font-semibold text-card-foreground group-hover:text-primary">
                          {category.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {category.coursesCount.toLocaleString()} courses
                        </p>
                      </div>
                    </div>

                    {/* Subcategories */}
                    <div className="mb-4">
                      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Popular topics
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {category.subcategories.slice(0, 3).map((sub) => (
                          <span
                            key={sub}
                            className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                          >
                            {sub}
                          </span>
                        ))}
                        {category.subcategories.length > 3 && (
                          <span className="rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                            +{category.subcategories.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm font-medium text-primary">
                      Explore courses
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
