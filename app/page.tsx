import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { CourseGrid } from "@/components/courses/course-grid";
import { PopularCoursesCarousel } from "@/components/home/popular-courses-carousel";
import { AiEraSection } from "@/components/home/ai-era-section";
import { courses } from "@/constants";

export default function HomePage() {
  const featuredCourses = courses.filter((c) => c.bestseller).slice(0, 4);
  const popularCourses = courses.slice(0, 8);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <CourseGrid
            courses={featuredCourses}
            title="Featured courses"
            subtitle="Expand your career opportunities with these top-rated courses"
          />
        </div>
        
        <CategoriesSection />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <PopularCoursesCarousel courses={popularCourses} />
        </div>
        
        <AiEraSection />
      </main>

      <Footer />
    </div>
  );
}
