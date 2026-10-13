import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { PopularCoursesCarousel } from "@/components/home/popular-courses-carousel";
import { AiEraSection } from "@/components/home/ai-era-section";
import { SkillsTransformSection } from "@/components/home/skills-transform-section";
import { PopularSkillsSection } from "@/components/home/popular-skills-section";
import { StudentCTASection } from "@/components/home/student-cta-section";
import { courses, trendingCourseSlugs, type Course } from "@/constants";

export default function HomePage() {
  const trendingCourses = trendingCourseSlugs.map((slug) =>
    courses.find((course) => course.slug === slug),
  ).filter((course): course is Course => Boolean(course));

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <CategoriesSection />

        <div id="trending-courses" className="mx-auto max-w-7xl scroll-mt-20 px-4 lg:px-6">
          <PopularCoursesCarousel
            courses={trendingCourses}
            title="Trending Courses"
            certifiedLabel
            availabilityLabel
          />
        </div>

        <AiEraSection />

        <SkillsTransformSection />

        <PopularSkillsSection />

        <StudentCTASection />
      </main>

      <Footer />
    </div>
  );
}
