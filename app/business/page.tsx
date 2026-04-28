import { BusinessHeader } from "@/components/business/business-header";
import { BusinessHero } from "@/components/business/business-hero";
import { BusinessContentShowcase } from "@/components/business/business-content-showcase";
import { BusinessFeatures } from "@/components/business/business-features";
import { BusinessStats } from "@/components/business/business-stats";
import { BusinessTestimonials } from "@/components/business/business-testimonials";
import { BusinessCTA } from "@/components/business/business-cta";
import { BusinessFooter } from "@/components/business/business-footer";

export const metadata = {
  title: "SurePassIQ Business | Southern Africa Corporate Learning",
  description:
    "SurePassIQ accelerates corporate learning across Southern Africa, empowering startups and enterprise teams with local skills, leadership pathways, and measurable impact.",
};

export default function BusinessPage() {
  return (
    <div className="min-h-screen bg-background">
      <BusinessHeader />
      <main>
        <BusinessHero />
        <BusinessContentShowcase />
        <BusinessFeatures />
        <BusinessStats />
        <BusinessTestimonials />
        <BusinessCTA />
      </main>
      <BusinessFooter />
    </div>
  );
}
