import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { PopularCoursesCarousel } from "@/components/home/popular-courses-carousel";
import { AiEraSection } from "@/components/home/ai-era-section";
import { SkillsTransformSection } from "@/components/home/skills-transform-section";
import { PopularSkillsSection } from "@/components/home/popular-skills-section";
import { courses, type Course } from "@/constants";

const TRENDING_FIRST_SLUGS = [
  "vid-provisional-prep",
  "early-child-reading-development",
  "ai-video-generation",
  "olevel-maths",
];

export default function HomePage() {
  const pinnedTrending = TRENDING_FIRST_SLUGS.map((slug) =>
    courses.find((course) => course.slug === slug),
  ).filter((course): course is Course => Boolean(course));
  const trendingCourses = [
    ...pinnedTrending,
    ...courses.filter((course) => !TRENDING_FIRST_SLUGS.includes(course.slug)),
  ];
  const popularCourses = courses.slice(0, 8);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <CategoriesSection />

        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <PopularCoursesCarousel
            courses={trendingCourses}
            title="Trending courses"
            subtitle="What learners are starting right now"
          />
        </div>

        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <PopularCoursesCarousel courses={popularCourses} />
        </div>

        <AiEraSection />

        <SkillsTransformSection />

        <PopularSkillsSection />
      </main>

      <Footer />
    </div>
  );
}
