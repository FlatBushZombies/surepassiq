import { notFound } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CourseGrid } from "@/components/courses/course-grid";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { categories, courses } from "@/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryCourses = courses.filter(
    (c) => c.category.toLowerCase().replace(/ /g, "-") === slug ||
           c.category === category.name
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-secondary py-12 md:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            {/* Breadcrumb */}
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

            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-card text-4xl shadow-sm">
                {category.icon}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground md:text-4xl">
                  {category.name}
                </h1>
                <p className="text-muted-foreground">
                  {category.coursesCount.toLocaleString()} courses available
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Subcategories */}
        <section className="border-b border-border bg-card py-4">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Popular topics:
              </span>
              {category.subcategories.map((sub) => (
                <Badge
                  key={sub}
                  variant="secondary"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                >
                  {sub}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Courses */}
        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
          {/* Filters Bar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{categoryCourses.length}</span> courses
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Filter
              </Button>
              <Button variant="outline" size="sm">
                Sort by: Most Popular
              </Button>
            </div>
          </div>

          {categoryCourses.length > 0 ? (
            <CourseGrid courses={categoryCourses} />
          ) : (
            <div className="py-16 text-center">
              <p className="mb-4 text-xl font-semibold text-foreground">
                No courses found in this category
              </p>
              <p className="mb-6 text-muted-foreground">
                Check back later or explore other categories
              </p>
              <Button asChild>
                <Link href="/categories">Browse all categories</Link>
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return categories.map((category) => ({
    slug: category.slug,
  }));
}
