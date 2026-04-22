import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CourseGrid } from "@/components/courses/course-grid";
import { CatalogToolbar } from "@/components/courses/catalog-toolbar";
import { categories, courses } from "@/constants";
import { filterCourses, getFirstValue, sortCourses } from "@/lib/catalog";

interface CategoriesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoriesPage(props: CategoriesPageProps) {
  const searchParams = await props.searchParams;
  const filteredCourses = sortCourses(
    filterCourses(courses, {
      query: getFirstValue(searchParams.query),
      level: getFirstValue(searchParams.level),
      category: getFirstValue(searchParams.category),
      sort: (getFirstValue(searchParams.sort) as Parameters<typeof sortCourses>[1]) ?? "popular",
    }),
    (getFirstValue(searchParams.sort) as Parameters<typeof sortCourses>[1]) ?? "popular",
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-muted/20">
          <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6 lg:py-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              Catalog
            </p>
            <h1 className="mt-3 text-4xl font-bold text-foreground">All categories</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Explore guided courses, working assessments, learner tools, and
              skill-building pathways across our full catalog.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition hover:border-primary/40 hover:text-primary"
                >
                  {category.name} ({category.coursesCount})
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl space-y-8 px-4 py-8 lg:px-6 lg:py-10">
          <CatalogToolbar
            categories={categories.map((category) => ({
              label: category.name,
              value: category.slug,
            }))}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">
                {filteredCourses.length} course{filteredCourses.length === 1 ? "" : "s"} found
              </p>
              <p className="text-sm text-muted-foreground">
                Use search and filters to narrow the catalog by topic, level, and popularity.
              </p>
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <CourseGrid courses={filteredCourses} />
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center">
              <p className="text-lg font-semibold text-foreground">No courses matched your filters</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try broadening your search or resetting the selected filters.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
