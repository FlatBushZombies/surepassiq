import Image from "next/image";
import Link from "next/link";
import { BusinessHeader } from "@/components/business/business-header";
import { BusinessFooter } from "@/components/business/business-footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Users, BookOpen, Award, TrendingUp, Globe, Zap } from "lucide-react";

export const metadata = {
  title: "What We Do | SurePassIQ Business",
  description: "Discover what SurePassIQ does to accelerate corporate learning in Southern Africa.",
};

const coreSolutions = [
  {
    icon: BookOpen,
    title: "On-Demand Learning",
    description: "Provide anytime access to the latest business, tech, leadership, and soft skills courses. Our extensive library covers everything from data science to communication skills.",
    image: "https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["15,000+ courses", "Mobile-friendly", "Offline access", "Certificate tracking"],
  },
  {
    icon: Zap,
    title: "Hands-On Learning",
    description: "Boost tech skills faster with learn-by-doing technical projects. Real-world simulations and coding environments let your team practice without risk.",
    image: "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Interactive labs", "Real-world projects", "Code sandboxes", "Instant feedback"],
  },
  {
    icon: Users,
    title: "Cohort Learning",
    description: "Grow your leaders with guided, self-paced programs. Structured learning paths with peer collaboration drive accountability and completion rates.",
    image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Expert facilitators", "Peer discussions", "Progress tracking", "Completion badges"],
  },
];

const stats = [
  { value: "500+", label: "Organizations Trust Us" },
  { value: "250K+", label: "Learners Trained" },
  { value: "98%", label: "Customer Satisfaction" },
  { value: "40%", label: "Faster Skill Development" },
];

const industries = [
  "Financial Services",
  "Mining & Resources",
  "Telecommunications",
  "Retail & Consumer",
  "Healthcare",
  "Manufacturing",
  "Government",
  "Education",
];

export default function WhatWeDoPage() {
  return (
    <div className="min-h-screen bg-background">
      <BusinessHeader />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
          <div className="absolute inset-0 opacity-20">
            <Image
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="relative mx-auto max-w-7xl px-4 lg:px-6">
            <div className="max-w-3xl">
              <span className="inline-block rounded-sm bg-primary px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground">
                Enterprise Solutions
              </span>
              <h1 className="mt-6 text-4xl font-bold tracking-tight text-background sm:text-5xl lg:text-6xl">
                What We Do
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-background/80 lg:text-xl">
                SurePassIQ empowers organizations across Southern Africa with cutting-edge learning solutions, tailored to local needs and global standards. We help companies build skilled, future-ready workforces.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" className="h-12 px-8 text-base font-semibold">
                  Request a Demo
                </Button>
                <Button size="lg" variant="outline" className="h-12 border-background/30 bg-transparent px-8 text-base font-semibold text-background hover:bg-background/10">
                  View Plans
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="border-b border-border bg-muted/30 py-8">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-primary lg:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Solutions */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Our Core Solutions
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Comprehensive learning experiences designed to meet your organization&apos;s unique needs.
              </p>
            </div>

            <div className="space-y-16 lg:space-y-24">
              {coreSolutions.map((solution, index) => {
                const Icon = solution.icon;
                const isReversed = index % 2 === 1;
                return (
                  <div 
                    key={solution.title} 
                    className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${isReversed ? "lg:flex-row-reverse" : ""}`}
                  >
                    {/* Image */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg lg:w-1/2">
                      <Image
                        src={solution.image}
                        alt={solution.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="lg:w-1/2">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground lg:text-3xl">
                        {solution.title}
                      </h3>
                      <p className="mt-4 text-base leading-relaxed text-muted-foreground lg:text-lg">
                        {solution.description}
                      </p>
                      <ul className="mt-6 grid grid-cols-2 gap-3">
                        {solution.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-foreground">
                            <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Button className="mt-8" variant="outline">
                        Learn More
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Why SurePassIQ */}
        <section className="bg-muted/30 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                Why Organizations Choose SurePassIQ
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                Built specifically for Southern African businesses, with global expertise.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-border bg-background p-6">
                <Globe className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">Local + Global Content</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Access world-class content from global experts, combined with locally relevant case studies and examples.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-6">
                <TrendingUp className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">Analytics & Insights</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Track learning progress, measure skill development, and demonstrate ROI with comprehensive reporting.
                </p>
              </div>
              <div className="rounded-lg border border-border bg-background p-6">
                <Award className="h-8 w-8 text-primary" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">Certification Paths</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Industry-recognized certifications that validate skills and advance careers across your organization.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Industries */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-6">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
                  Trusted Across Industries
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  From financial services to manufacturing, we help organizations across every sector build the skills they need to thrive.
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {industries.map((industry) => (
                    <span 
                      key={industry}
                      className="rounded-sm bg-muted px-3 py-1.5 text-sm font-medium text-foreground"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg lg:w-1/2">
                <Image
                  src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Diverse industries"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-6">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground lg:text-4xl">
              Ready to Transform Your Workforce?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Join leading organizations across Southern Africa who trust SurePassIQ to develop their teams.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" variant="secondary" className="h-12 px-8 text-base font-semibold">
                Request a Demo
              </Button>
              <Link href="/business/plans">
                <Button size="lg" variant="outline" className="h-12 border-primary-foreground/30 bg-transparent px-8 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <BusinessFooter />
    </div>
  );
}
