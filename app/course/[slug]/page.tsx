import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Clock,
  BarChart3,
  Globe,
  Award,
  Play,
  Heart,
  Share2,
  CheckCircle2,
  Users,
  FileText,
  Trophy,
} from "lucide-react";
import { courses } from "@/constants";
import { CourseGrid } from "@/components/courses/course-grid";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  const relatedCourses = courses
    .filter((c) => c.category === course.category && c.id !== course.id)
    .slice(0, 4);

  const formatStudents = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(0)}K`;
    }
    return count.toString();
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Course Header */}
        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Course Info */}
              <div className="lg:col-span-2">
                {/* Breadcrumb */}
                <nav className="mb-4 flex items-center gap-2 text-sm text-muted">
                  <Link href="/" className="hover:text-background">
                    Home
                  </Link>
                  <span>/</span>
                  <Link
                    href={`/categories/${course.category.toLowerCase().replace(/ /g, "-")}`}
                    className="hover:text-background"
                  >
                    {course.category}
                  </Link>
                  <span>/</span>
                  <span className="text-background">{course.subcategory}</span>
                </nav>

                {/* Title */}
                <h1 className="mb-4 text-2xl font-bold leading-tight text-background md:text-3xl lg:text-4xl">
                  {course.title}
                </h1>

                {/* Description */}
                <p className="mb-4 text-lg text-muted">{course.description}</p>

                {/* Badges & Rating */}
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  {course.bestseller && (
                    <Badge className="bg-warning text-warning-foreground font-semibold">
                      Bestseller
                    </Badge>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-[oklch(var(--rating))]">
                      {course.rating.toFixed(1)}
                    </span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(course.rating)
                              ? "fill-[oklch(var(--rating))] text-[oklch(var(--rating))]"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted">
                      ({course.reviewsCount.toLocaleString()} ratings)
                    </span>
                  </div>
                  <span className="text-sm text-muted">
                    {formatStudents(course.studentsCount)} students
                  </span>
                </div>

                {/* Instructor */}
                <div className="mb-4 flex items-center gap-3">
                  <Image
                    src={course.instructor.avatar}
                    alt={course.instructor.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm text-muted">Created by</p>
                    <Link
                      href="#instructor"
                      className="font-medium text-primary hover:underline"
                    >
                      {course.instructor.name}
                    </Link>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    Last updated {course.lastUpdated}
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="h-4 w-4" />
                    {course.language}
                  </div>
                </div>
              </div>

              {/* Course Card */}
              <div className="lg:relative">
                <div className="overflow-hidden rounded-xl border border-border bg-card shadow-xl lg:sticky lg:top-24">
                  {/* Video Preview */}
                  <div className="relative aspect-video">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-foreground/30">
                      <button className="flex h-16 w-16 items-center justify-center rounded-full bg-card text-card-foreground shadow-lg transition-transform hover:scale-110">
                        <Play className="h-6 w-6 fill-current" />
                      </button>
                    </div>
                    <span className="absolute bottom-4 left-4 rounded bg-foreground/80 px-2 py-1 text-xs text-background">
                      Preview this course
                    </span>
                  </div>

                  <div className="p-6">
                    {/* Price */}
                    <div className="mb-4 flex items-center gap-2">
                      <span className="text-3xl font-bold text-card-foreground">
                        ${course.price.toFixed(2)}
                      </span>
                      {course.originalPrice > course.price && (
                        <>
                          <span className="text-lg text-muted-foreground line-through">
                            ${course.originalPrice.toFixed(2)}
                          </span>
                          <Badge variant="secondary" className="font-semibold">
                            {Math.round(
                              ((course.originalPrice - course.price) /
                                course.originalPrice) *
                                100
                            )}
                            % off
                          </Badge>
                        </>
                      )}
                    </div>

                    {/* Timer */}
                    <p className="mb-4 text-sm text-destructive font-medium">
                      ⏰ 2 days left at this price!
                    </p>

                    {/* Buttons */}
                    <div className="mb-4 flex flex-col gap-2">
                      <Button size="lg" className="w-full text-base font-semibold">
                        Add to cart
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="w-full text-base font-semibold"
                      >
                        Buy now
                      </Button>
                    </div>

                    <p className="mb-4 text-center text-xs text-muted-foreground">
                      30-Day Money-Back Guarantee
                    </p>

                    {/* Quick Info */}
                    <div className="border-t border-border pt-4">
                      <h4 className="mb-3 font-semibold text-card-foreground">
                        This course includes:
                      </h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2">
                          <Play className="h-4 w-4" />
                          {course.duration} on-demand video
                        </li>
                        <li className="flex items-center gap-2">
                          <FileText className="h-4 w-4" />
                          {course.lectures} downloadable resources
                        </li>
                        <li className="flex items-center gap-2">
                          <Trophy className="h-4 w-4" />
                          Certificate of completion
                        </li>
                        <li className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4" />
                          Full lifetime access
                        </li>
                      </ul>
                    </div>

                    {/* Share */}
                    <div className="mt-4 flex items-center justify-center gap-4 border-t border-border pt-4">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Heart className="h-4 w-4" />
                        Wishlist
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Content */}
        <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="lg:max-w-3xl">
            {/* What you'll learn */}
            <section className="mb-12 rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 text-xl font-bold text-card-foreground">
                What you&apos;ll learn
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {course.whatYouWillLearn.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-card-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Requirements */}
            <section className="mb-12">
              <h2 className="mb-4 text-xl font-bold text-foreground">Requirements</h2>
              <ul className="space-y-2">
                {course.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-foreground" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Instructor */}
            <section id="instructor" className="mb-12">
              <h2 className="mb-4 text-xl font-bold text-foreground">Instructor</h2>
              <div className="flex items-start gap-4">
                <Image
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
                <div>
                  <Link
                    href="#"
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    {course.instructor.name}
                  </Link>
                  <p className="mb-2 text-muted-foreground">
                    {course.instructor.title}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-[oklch(var(--rating))]" />
                      4.7 Instructor Rating
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      {formatStudents(course.reviewsCount)} Reviews
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {formatStudents(course.studentsCount)} Students
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Related Courses */}
          {relatedCourses.length > 0 && (
            <CourseGrid
              courses={relatedCourses}
              title="More courses you might like"
              subtitle={`Because you viewed courses in ${course.category}`}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}
