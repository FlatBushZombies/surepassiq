import { BarChart3, BookOpen, Shield, Users, Zap, Award, Globe, Sparkles } from "lucide-react";

const features = [
  {
    icon: BookOpen,
    title: "Local content pathways",
    description:
      "Learning journeys built for Southern African corporate needs, from finance to customer experience.",
  },
  {
    icon: Users,
    title: "Leadership acceleration",
    description:
      "Develop the next generation of managers, team leads, and executive talent across the region.",
  },
  {
    icon: BarChart3,
    title: "Insight-driven impact",
    description:
      "Measure learning outcomes with analytics that show talent growth, retention and productivity.",
  },
  {
    icon: Shield,
    title: "Secure enterprise scale",
    description:
      "Protect your people and data while scaling learning for large teams and distributed offices.",
  },
  {
    icon: Sparkles,
    title: "Adaptive learning",
    description:
      "Personalized pathways keep employees engaged with content that matches their role and growth stage.",
  },
  {
    icon: Award,
    title: "Skills recognition",
    description:
      "Unlock internal certification and career pathways that matter to your organisation.",
  },
  {
    icon: Globe,
    title: "Regional expertise",
    description:
      "Designed for South Africa and neighbouring markets, with local examples and business relevance.",
  },
  {
    icon: Zap,
    title: "Rapid adoption",
    description:
      "Launch learning initiatives fast with dedicated onboarding and practical support.",
  },
];

export function BusinessFeatures() {
  return (
    <section className="py-20 lg:py-28" id="overview">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-[#191970] lg:text-4xl">
              Accelerate learning for Southern African corporates
            </h2>
            <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
              From leadership development to operational excellence, our platform helps startup and enterprise teams scale skills across the region.
            </p>
          </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 transition-colors hover:bg-muted/50"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center">
                <feature.icon className="h-6 w-6 text-foreground" strokeWidth={1.5} />
              </div>
              <h3 className="mb-2 text-base font-bold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
