import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CourseGrid } from "@/components/courses/course-grid";
import { CatalogToolbar } from "@/components/courses/catalog-toolbar";
import { categories, courses } from "@/constants";
import { filterCourses, getFirstValue, sortCourses } from "@/lib/catalog";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CategoryPage(props: CategoryPageProps) {
  const { slug } = await props.params;
  const searchParams = await props.searchParams;
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryCourses = courses.filter((course) => course.category === category.name);
  const filteredCourses = sortCourses(
    filterCourses(categoryCourses, {
      query: getFirstValue(searchParams.query),
      level: getFirstValue(searchParams.level),
      topic: getFirstValue(searchParams.topic),
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
            <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
              <span>/</span>
              <Link href="/categories" className="hover:text-foreground">
                Categories
              </Link>
              <span>/</span>
              <span className="text-foreground">{category.name}</span>
            </nav>

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
                  Category
                </p>
                <h1 className="mt-3 text-4xl font-bold text-foreground">{category.name}</h1>
                <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
                  Focused learning paths in {category.name.toLowerCase()} with guided
                  lessons, assessments, and completion tracking.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.subcategories.map((topic) => (
                  <Badge key={topic} variant="secondary" className="rounded-full px-3 py-1">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl space-y-8 px-4 py-8 lg:px-6 lg:py-10">
          <CatalogToolbar
            searchPlaceholder={`Search within ${category.name}`}
            topics={category.subcategories.map((topic) => ({
              label: topic,
              value: topic.toLowerCase(),
            }))}
          />

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-foreground">
                {filteredCourses.length} course{filteredCourses.length === 1 ? "" : "s"} in {category.name}
              </p>
              <p className="text-sm text-muted-foreground">
                Filter by topic, level, or search terms to narrow this category.
              </p>
            </div>
          </div>

          {filteredCourses.length > 0 ? (
            <CourseGrid courses={filteredCourses} />
          ) : (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center">
              <p className="text-lg font-semibold text-foreground">No courses found in this category</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Adjust the search or filter controls to broaden the results.
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}
