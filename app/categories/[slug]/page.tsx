import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
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
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Breadcrumb & Header */}
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="mb-6 flex items-center gap-1 text-sm">
              <Link 
                href="/" 
                className="text-primary hover:text-primary/80 hover:underline"
              >
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <Link 
                href="/categories" 
                className="text-primary hover:text-primary/80 hover:underline"
              >
                Categories
              </Link>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{category.name}</span>
            </nav>

            {/* Category Header */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <p className="text-sm font-medium text-muted-foreground">
                  Category
                </p>
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  {category.name}
                </h1>
                <p className="max-w-xl text-base text-muted-foreground">
                  Focused learning paths in {category.name.toLowerCase()} with guided
                  lessons, assessments, and completion tracking.
                </p>
              </div>
              
              {/* Subcategory Tags */}
              <div className="flex flex-wrap gap-1.5 lg:max-w-md lg:justify-end">
                {category.subcategories.map((topic) => (
                  <span 
                    key={topic} 
                    className="cursor-default rounded-sm bg-muted/60 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors duration-150 hover:bg-muted hover:text-foreground"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Toolbar & Results */}
        <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <CatalogToolbar
            searchPlaceholder={`Search within ${category.name}`}
            topics={category.subcategories.map((topic) => ({
              label: topic,
              value: topic.toLowerCase(),
            }))}
          />

          {/* Results Count */}
          <div className="mt-6 border-b border-border pb-4">
            <p className="text-sm text-muted-foreground">
              <span className="font-bold text-foreground">
                {filteredCourses.length} course{filteredCourses.length === 1 ? "" : "s"}
              </span>
              {" "}in {category.name}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Filter by topic, level, or search terms to narrow this category.
            </p>
          </div>

          {/* Course Grid */}
          <div className="mt-6">
            {filteredCourses.length > 0 ? (
              <CourseGrid courses={filteredCourses} />
            ) : (
              <div className="border border-dashed border-border py-16 text-center">
                <p className="text-base font-semibold text-foreground">
                  No courses found in this category
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Adjust the search or filter controls to broaden the results.
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

export async function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}
