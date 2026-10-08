import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CourseGrid } from "@/components/courses/course-grid";
import { CourseNavigationTabs } from "@/components/courses/course-navigation-tabs";
import { courses } from "@/constants";
import { Badge } from "@/components/ui/badge";

interface CoursesPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CoursesPage(props: CoursesPageProps) {
  const searchParams = await props.searchParams;
  const activeSlug = typeof searchParams.slug === "string" ? searchParams.slug : undefined;
  
  // Find active course or default to the first essential course (Generative AI)
  const activeCourse = courses.find((c) => c.slug === activeSlug) || courses.find((c) => c.slug === "generative-ai") || courses[0];

  const essentialCourses = [
    { title: "Generative AI", slug: "generative-ai" },
    { title: "IT Certifications", slug: "it-certifications" },
    { title: "Prompt Engineering", slug: "prompt-engineering" },
    { title: "AI Agents", slug: "ai-agents" },
    { title: "Plumbing practical", slug: "plumbing-practical" },
    { title: "Aluminum fabrication", slug: "aluminum-fabrication" },
    { title: "Cellphone & laptop repairs", slug: "cellphone-laptop-repairs" },
    { title: "Exam preparation", slug: "exam-preparation" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Header Hero */}
        <section className="border-b border-border bg-foreground text-background">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
            <Badge variant="outline" className="border-background/30 text-background mb-3">
              SurePass IQ Learning Workspace
            </Badge>
            <h1 className="text-3xl font-extrabold lg:text-4xl">Essential Courses & Certifications</h1>
            <p className="mt-2 max-w-2xl text-base text-background/80">
              Select a course below to access modules, practice mock tests, timed exam simulators, practical hands-on labs, and downloadable study notes.
            </p>

            {/* Course Selector Tabs */}
            <div className="mt-8 flex flex-wrap gap-2 pt-2 border-t border-background/15">
              {essentialCourses.map((c) => {
                const isSelected = activeCourse.slug === c.slug;
                return (
                  <Link
                    key={c.slug}
                    href={`/courses?slug=${c.slug}`}
                    className={`rounded-xl px-4 py-2 text-xs sm:text-sm font-semibold transition-all ${
                      isSelected
                        ? "bg-background text-foreground shadow-md font-bold"
                        : "bg-background/10 text-background hover:bg-background/20"
                    }`}
                  >
                    {c.title}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Selected Course Workspace Section */}
        {activeCourse && (
          <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Active Course Workspace
                </span>
                <h2 className="text-2xl font-bold text-foreground mt-1">{activeCourse.title}</h2>
                <p className="text-sm text-muted-foreground mt-1">{activeCourse.description}</p>
              </div>
              <Link
                href={`/course/${activeCourse.slug}`}
                className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition hover:bg-primary/90 shrink-0"
              >
                View Full Course Page →
              </Link>
            </div>

            {/* Universal Course Navigation Tabs (Modules, Mock Tests, Timed Test, Practical Labs, Resources) */}
            <CourseNavigationTabs course={activeCourse} />
          </section>
        )}

        {/* All Courses Catalog Grid */}
        <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6 border-t border-border">
          <CourseGrid courses={courses} title="Explore All Available Courses" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
