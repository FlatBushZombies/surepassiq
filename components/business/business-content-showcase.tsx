import Image from "next/image";
import { TrendingUp, Award, Users, Layers } from "lucide-react";

const contentCategories = [
  {
    icon: TrendingUp,
    title: "Digital Skills",
    description: "Cloud, data analytics, Agile workflows and software skills for African teams.",
    courses: "1,200+",
  },
  {
    icon: Users,
    title: "Leadership",
    description: "Executive coaching, culture, and people development for regional growth.",
    courses: "900+",
  },
  {
    icon: Award,
    title: "Business Operations",
    description: "Finance, compliance, ESG and operations training tailored to local markets.",
    courses: "850+",
  },
  {
    icon: Layers,
    title: "Wellbeing & Growth",
    description: "Resilience, change management, career mobility and performance culture.",
    courses: "700+",
  },
];

export function BusinessContentShowcase() {
  return (
    <section className="py-20 lg:py-28" id="how-it-works">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/business-dashboard.jpg"
                alt="SurePassIQ Business Dashboard"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-6 max-w-[200px] rounded-2xl border border-[#f4b400]/30 bg-[#fff8da] p-4 shadow-xl lg:-right-10">
              <p className="text-2xl font-bold text-[#191970]">1,200+</p>
              <p className="text-sm text-[#191970]/80">local learning paths</p>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-[#191970] lg:text-4xl">
              Learning built for Southern African corporate teams
            </h2>
            <p className="mb-10 text-pretty text-lg leading-relaxed text-muted-foreground">
              Curated learning pathways designed for startups, enterprise and public sector teams across the region.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              {contentCategories.map((category) => (
                <div key={category.title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#f4b400]/15 text-[#191970]">
                    <category.icon className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-foreground">{category.title}</h3>
                      <span className="text-xs text-muted-foreground">{category.courses}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
