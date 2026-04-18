import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { CourseGrid } from "@/components/courses/course-grid";
import { StatsSection } from "@/components/home/stats-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { CTASection } from "@/components/home/cta-section";
import { courses } from "@/constants";

export default function HomePage() {
  const featuredCourses = courses.filter((c) => c.bestseller).slice(0, 4);
  const popularCourses = courses.slice(0, 8);
  const newCourses = courses.slice(4, 8);

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
          <CourseGrid
            courses={popularCourses}
            title="Most popular courses"
            subtitle="Popular picks from our early learner community"
          />
        </div>
        
        <StatsSection />
        
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <CourseGrid
            courses={newCourses}
            title="Students are viewing"
            subtitle="Fresh programs learners are currently exploring"
          />
        </div>
        
        <TestimonialsSection />
        
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
