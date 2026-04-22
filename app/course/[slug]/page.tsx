import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Award,
  BookOpenText,
  CheckCircle2,
  Clock,
  Globe,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CourseGrid } from "@/components/courses/course-grid";
import { CourseActions } from "@/components/courses/course-actions";
import { courses } from "@/constants";
import { getCourseCategorySlug } from "@/lib/catalog";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage(props: CoursePageProps) {
  const { slug } = await props.params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    notFound();
  }

  const relatedCourses = courses
    .filter((item) => item.category === course.category && item.slug !== course.slug)
    .slice(0, 4);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-foreground text-background">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-6 lg:py-14">
            <div>
              <nav className="mb-4 flex items-center gap-2 text-sm text-background/70">
                <Link href="/" className="hover:text-background">
                  Home
                </Link>
                <span>/</span>
                <Link
                  href={`/categories/${getCourseCategorySlug(course.category)}`}
                  className="hover:text-background"
                >
                  {course.category}
                </Link>
                <span>/</span>
                <span className="text-background">{course.subcategory}</span>
              </nav>

              <div className="flex flex-wrap gap-2">
                {course.bestseller && <Badge>Bestseller</Badge>}
                {course.featured && <Badge variant="secondary">Featured path</Badge>}
                <Badge variant="outline" className="border-background/20 text-background">
                  {course.level}
                </Badge>
              </div>

              <h1 className="mt-5 text-4xl font-bold leading-tight">{course.title}</h1>
              <p className="mt-4 max-w-3xl text-lg text-background/75">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-background/70">
                <span className="inline-flex items-center gap-1">
                  <Star className="h-4 w-4 fill-current text-yellow-400" />
                  {course.rating.toFixed(1)} ({course.reviewsCount.toLocaleString()} reviews)
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {course.studentsCount.toLocaleString()} learners
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {course.duration}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {course.language}
                </span>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  width={56}
                  height={56}
                  className="rounded-full"
                />
                <div>
                  <p className="text-sm text-background/65">Instructor</p>
                  <p className="font-semibold text-background">{course.instructor.name}</p>
                  <p className="text-sm text-background/65">{course.instructor.title}</p>
                </div>
              </div>
            </div>

            <aside>
              <div className="overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-2xl">
                <div className="relative aspect-video">
                  <Image src={course.image} alt={course.title} fill className="object-cover" />
                </div>
                <div className="space-y-5 p-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold">${course.price.toFixed(2)}</span>
                      <span className="text-lg text-muted-foreground line-through">
                        ${course.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Payments are paused for now, so course access starts immediately inside the learning workspace.
                    </p>
                  </div>

                  <CourseActions courseSlug={course.slug} />

                  <div className="space-y-3 border-t border-border pt-5 text-sm text-muted-foreground">
                    <p className="font-semibold text-card-foreground">What this course includes</p>
                    <p className="inline-flex items-center gap-2">
                      <BookOpenText className="h-4 w-4" />
                      {course.lectures} guided lessons across {course.modules.length} modules
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Final assessment with {course.assessment.questions.length} questions
                    </p>
                    <p className="inline-flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Completion certificate when lessons and assessment are complete
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl space-y-10 px-4 py-10 lg:px-6 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="space-y-10">
              <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-card-foreground">
                  What you&apos;ll learn
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {course.whatYouWillLearn.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                      <span className="text-card-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section id="curriculum" className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-card-foreground">Curriculum preview</h2>
                <div className="mt-5 space-y-4">
                  {course.modules.map((module) => (
                    <article key={module.id} className="rounded-2xl border border-border p-4">
                      <h3 className="text-lg font-semibold text-card-foreground">{module.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{module.summary}</p>
                      <ul className="mt-4 space-y-2">
                        {module.lessons.map((lesson) => (
                          <li
                            key={lesson.id}
                            className="flex items-center justify-between gap-3 rounded-xl bg-muted/30 px-3 py-2 text-sm"
                          >
                            <span className="font-medium text-card-foreground">{lesson.title}</span>
                            <span className="text-muted-foreground">
                              {lesson.kind} · {lesson.durationMinutes} min
                            </span>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-2xl font-semibold text-card-foreground">Assessment and completion</h2>
                <p className="mt-3 text-muted-foreground">{course.assessment.description}</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-border p-4">
                    <p className="text-sm font-semibold text-card-foreground">Pass mark</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      You need {course.assessment.passMark}% to pass the assessment and complete the course.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border p-4">
                    <p className="text-sm font-semibold text-card-foreground">Completion rule</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Finish every lesson, submit the final assessment, and your certificate unlocks automatically.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            <aside className="space-y-6">
              <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-card-foreground">Skills you will build</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="rounded-full px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>

              <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-card-foreground">Requirements</h2>
                <ul className="mt-4 space-y-3">
                  {course.requirements.map((requirement) => (
                    <li key={requirement} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-card-foreground">Best for</h2>
                <ul className="mt-4 space-y-3">
                  {course.targetAudience.map((audience) => (
                    <li key={audience} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{audience}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </aside>
          </div>

          {relatedCourses.length > 0 && (
            <CourseGrid
              courses={relatedCourses}
              title="More in this category"
              subtitle={`Continue exploring ${course.category.toLowerCase()} courses`}
            />
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}
