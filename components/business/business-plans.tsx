import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Team",
    description: "For small teams getting started with learning",
    price: "$30",
    period: "per user / month",
    features: [
      "Access to 12,000+ top courses",
      "Basic learning analytics",
      "Course & path assignments",
      "Curated learning paths",
      "Standard support",
    ],
    cta: "Start free trial",
    href: "/business/start?plan=team",
    featured: false,
  },
  {
    name: "Enterprise",
    description: "For organizations with 100+ employees",
    price: "Custom",
    period: "pricing",
    features: [
      "Full library: 27,000+ courses",
      "Advanced analytics & insights",
      "Custom learning paths",
      "SSO & LMS integrations",
      "Dedicated customer success",
      "API access",
      "24/7 priority support",
    ],
    cta: "Request a demo",
    href: "/business/demo",
    featured: true,
  },
  {
    name: "Leadership Academy",
    description: "Executive development programs",
    price: "Custom",
    period: "pricing",
    features: [
      "Curated executive content",
      "1:1 executive coaching",
      "Cohort-based programs",
      "Leadership assessments",
      "White-glove onboarding",
    ],
    cta: "Contact sales",
    href: "/business/contact",
    featured: false,
  },
];

export function BusinessPlans() {
  return (
    <section className="py-20 lg:py-28" id="plans">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
            Plans for teams of all sizes
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            Start with a 14-day free trial. No credit card required.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col border p-8 ${
                plan.featured
                  ? "border-foreground bg-card"
                  : "border-border bg-card"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-8">
                  <span className="bg-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider text-background">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="mb-6">
                <h3 className="mb-1 text-xl font-bold text-card-foreground">
                  {plan.name}
                </h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-card-foreground">
                  {plan.price}
                </span>
                {plan.period !== "pricing" && (
                  <span className="ml-1 text-sm text-muted-foreground">
                    {plan.period}
                  </span>
                )}
              </div>
              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-foreground" strokeWidth={2} />
                    <span className="text-card-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full rounded-none font-bold ${
                  plan.featured
                    ? "bg-foreground text-background hover:bg-foreground/90"
                    : "border-foreground bg-transparent text-foreground hover:bg-muted"
                }`}
                variant={plan.featured ? "default" : "outline"}
                asChild
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
