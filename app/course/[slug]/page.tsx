import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Award,
  BookOpenText,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  Laptop,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { CourseGrid } from "@/components/courses/course-grid";
import { CourseActions } from "@/components/courses/course-actions";
import { CourseNavigationTabs } from "@/components/courses/course-navigation-tabs";
import { PracticalCourseSummary } from "@/components/courses/practical-course-summary";
import { courses } from "@/constants";
import { getCourseCategorySlug, getRatingDistribution } from "@/lib/catalog";

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
  const isPractical = course.category === "Practical Trades";
  const isDrivingCourse = course.slug === "driving-theory-hazard-perception";
  const ratingDistribution = getRatingDistribution(course.rating);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-10">
              {/* Hero — dark panel, same grid row as the enroll card so it sits above the fold like Udemy's */}
              <div className="rounded-3xl bg-foreground p-6 text-background sm:p-8 lg:p-10">
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

                <h1 className="text-4xl font-bold leading-tight">{course.title}</h1>
                <p className="mt-4 text-lg text-background/75">
                  {course.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {course.bestseller && <Badge>Certified</Badge>}
                  {course.featured && <Badge variant="secondary">Featured path</Badge>}
                  <Badge variant="outline" className="border-background/20 text-background">
                    {course.level}
                  </Badge>
                </div>

                <p className="mt-4 text-sm text-background/70">
                  Created by{" "}
                  <span className="font-semibold text-background">{course.instructor.name}</span>
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-background/70">
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
                  <span>Last updated {course.lastUpdated}</span>
                </div>
              </div>

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

              <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-card-foreground">This course includes</h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <p className="inline-flex items-center gap-2 text-sm text-card-foreground">
                    <BookOpenText className="h-4 w-4 text-muted-foreground" />
                    {course.lectures} {isPractical ? "hands-on" : "guided"} lessons across {course.modules.length} modules
                  </p>
                  <p className="inline-flex items-center gap-2 text-sm text-card-foreground">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    {course.duration} of content
                  </p>
                  {course.resources.length > 0 && (
                    <p className="inline-flex items-center gap-2 text-sm text-card-foreground">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      {course.resources.length} downloadable resources
                    </p>
                  )}
                  <p className="inline-flex items-center gap-2 text-sm text-card-foreground">
                    <Laptop className="h-4 w-4 text-muted-foreground" />
                    Access on any device
                  </p>
                  {isPractical ? (
                    <p className="inline-flex items-center gap-2 text-sm text-card-foreground">
                      <Award className="h-4 w-4 text-muted-foreground" />
                      In-person, practical skills training
                    </p>
                  ) : (
                    <>
                      <p className="inline-flex items-center gap-2 text-sm text-card-foreground">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        Mock tests & timed exam simulation
                      </p>
                      <p className="inline-flex items-center gap-2 text-sm text-card-foreground">
                        <Award className="h-4 w-4 text-muted-foreground" />
                        Certificate of completion
                      </p>
                    </>
                  )}
                </div>
              </section>

              <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-card-foreground">Skills you&apos;ll gain</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="rounded-full px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </section>

              {isPractical && <PracticalCourseSummary course={course} />}

              {!isPractical && !isDrivingCourse && (
                /* Universal Course Navigation Tabs (Modules, Mock Tests, Timed Test, Practical Labs, Resources) */
                <section id="course-navigation">
                  <CourseNavigationTabs course={course} />
                </section>
              )}

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
                <h2 className="text-xl font-semibold text-card-foreground">Description</h2>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {course.description}
                </p>
              </section>

              <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-card-foreground">Who this course is for</h2>
                <ul className="mt-4 space-y-3">
                  {course.targetAudience.map((audience) => (
                    <li key={audience} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{audience}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-card-foreground">Instructor</h2>
                <div className="mt-5 flex items-start gap-4">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-lg font-bold text-primary">{course.instructor.name}</p>
                    <p className="text-sm text-muted-foreground">{course.instructor.title}</p>
                    <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                        {course.rating.toFixed(1)} Instructor Rating
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Users className="h-4 w-4" />
                        {course.studentsCount.toLocaleString()} Students
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <BookOpenText className="h-4 w-4" />
                        {course.reviewsCount.toLocaleString()} Reviews
                      </span>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {course.instructor.name} teaches {course.title} on SurePass IQ, focused on{" "}
                      {course.subcategory}.
                    </p>
                  </div>
                </div>
              </section>

              <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-card-foreground">Reviews</h2>
                <div className="mt-5 flex flex-col gap-8 sm:flex-row sm:items-center">
                  <div className="shrink-0 text-center sm:text-left">
                    <p className="text-5xl font-extrabold text-card-foreground">
                      {course.rating.toFixed(1)}
                    </p>
                    <div className="mt-2 flex items-center justify-center gap-1 sm:justify-start">
                      {[1, 2, 3, 4, 5].map((starIndex) => (
                        <Star
                          key={starIndex}
                          className={`h-4 w-4 ${
                            starIndex <= Math.round(course.rating)
                              ? "fill-current text-yellow-400"
                              : "text-muted-foreground/30"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {course.reviewsCount.toLocaleString()} reviews
                    </p>
                  </div>

                  <div className="flex-1 space-y-2">
                    {ratingDistribution.map(({ stars, percent }) => (
                      <div key={stars} className="flex items-center gap-3 text-sm">
                        <span className="flex w-14 shrink-0 items-center gap-1 text-muted-foreground">
                          {stars} <Star className="h-3.5 w-3.5 fill-current text-yellow-400" />
                        </span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-yellow-400"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="w-10 shrink-0 text-right text-xs text-muted-foreground">
                          {percent}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-[96px] lg:self-start">
              <div className="overflow-hidden rounded-3xl border border-border bg-card text-card-foreground shadow-2xl">
                <Link
                  href={`/learn/${course.slug}`}
                  className="group relative block aspect-video"
                >
                  <Image src={course.image} alt={course.title} fill className="object-cover" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/35 transition-colors group-hover:bg-black/45">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-foreground shadow-lg transition-transform group-hover:scale-105">
                      <PlayCircle className="h-7 w-7" />
                    </span>
                    <span className="text-sm font-semibold text-white">Preview this course</span>
                  </div>
                </Link>
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

                  <CourseActions courseSlug={course.slug} isPractical={isPractical} />
                </div>
              </div>
            </aside>
          </div>

          {relatedCourses.length > 0 && (
            <div className="mt-10">
              <CourseGrid
                courses={relatedCourses}
                title="More in this category"
                subtitle={`Continue exploring ${course.category.toLowerCase()} courses`}
              />
            </div>
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
