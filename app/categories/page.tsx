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
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Clean, minimal Udemy style */}
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              Catalog
            </p>
            <h1 className="mt-2 text-2xl font-bold text-foreground lg:text-3xl">
              All categories
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground lg:text-base">
              Explore guided courses, working assessments, learner tools, and
              skill-building pathways across our full catalog.
            </p>

            {/* Category Pills - Udemy style horizontal scroll */}
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="rounded-full border border-border bg-background px-4 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section className="mx-auto max-w-7xl px-4 py-6 lg:px-6 lg:py-8">
          <CatalogToolbar
            categories={categories.map((category) => ({
              label: category.name,
              value: category.slug,
            }))}
          />

          {/* Results Info */}
          <div className="mt-6 border-b border-border pb-4">
            <p className="text-sm font-bold text-foreground">
              {filteredCourses.length} result{filteredCourses.length === 1 ? "" : "s"}
            </p>
          </div>

          {/* Course Grid or Empty State */}
          <div className="mt-6">
            {filteredCourses.length > 0 ? (
              <CourseGrid courses={filteredCourses} />
            ) : (
              <div className="border border-border bg-muted/20 p-8 text-center">
                <p className="text-base font-bold text-foreground">
                  No courses matched your filters
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Try broadening your search or resetting the selected filters.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
