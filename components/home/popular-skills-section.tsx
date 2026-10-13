import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

interface SkillLink {
  label: string;
  categorySlug: string;
  topic: string;
}

function getHref(skill: SkillLink) {
  return {
    pathname: `/categories/${skill.categorySlug}`,
    query: { topic: skill.topic },
  };
}

const spotlight: SkillLink = {
  label: "Prompt Engineering",
  categorySlug: "ai-data",
  topic: "Prompt Engineering",
};

const columns: { title: string; skills: SkillLink[] }[] = [
  {
    title: "AI & Data",
    skills: [
      { label: "AI Agents", categorySlug: "ai-data", topic: "AI Agents" },
      { label: "AI Fundamentals", categorySlug: "ai-data", topic: "AI Fundamentals" },
      { label: "AI Video Generation", categorySlug: "ai-data", topic: "Text-to-Video" },
    ],
  },
  {
    title: "Exam Preparation",
    skills: [
      { label: "Driving Theory", categorySlug: "test-prep", topic: "Driving Theory" },
    ],
  },
  {
    title: "Practical Trades",
    skills: [
      { label: "Plumbing", categorySlug: "practical-trades", topic: "Plumbing" },
      { label: "Aluminum Fabrication", categorySlug: "practical-trades", topic: "Aluminum Fabrication" },
      { label: "Electronics Repair", categorySlug: "practical-trades", topic: "Electronic Repairs" },
    ],
  },
  {
    title: "Business & Leadership",
    skills: [
      { label: "Operations", categorySlug: "business", topic: "Operations" },
      { label: "Leadership", categorySlug: "personal-development", topic: "Leadership" },
    ],
  },
  {
    title: "Design & Marketing",
    skills: [
      { label: "UX Design", categorySlug: "design", topic: "UX Design" },
      { label: "Digital Marketing", categorySlug: "marketing", topic: "Digital Marketing" },
    ],
  },
];

export function PopularSkillsSection() {
  return (
    <section className="bg-muted/30 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Popular Skills
          </h2>
          <div className="mt-4 border-b border-border" />

          <div className="mt-8 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {/* Spotlight column */}
            <div>
              <h3 className="text-xl font-bold text-foreground sm:text-2xl">
                {spotlight.label} is a top skill
              </h3>
              <Link
                href={getHref(spotlight)}
                className="group mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
              >
                See {spotlight.label} courses
                <ChevronRight className="h-4 w-4 transition-transform duration-150 ease-out-strong group-hover:translate-x-0.5" />
              </Link>

              <Link
                href="/categories"
                className="group mt-6 inline-flex items-center gap-2 rounded-md border-2 border-primary px-4 py-2.5 text-sm font-bold text-primary transition-colors duration-150 ease-out-strong hover:bg-primary hover:text-primary-foreground"
              >
                Show all trending skills
                <ArrowUpRight className="h-4 w-4 transition-transform duration-150 ease-out-strong group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* Category columns */}
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-lg font-bold text-foreground">
                  {column.title}
                </h3>
                <div className="mt-4 space-y-3">
                  {column.skills.map((skill) => (
                    <Link
                      key={skill.label}
                      href={getHref(skill)}
                      className="group flex items-center gap-1 text-sm font-bold text-primary hover:underline"
                    >
                      {skill.label}
                      <ChevronRight className="h-4 w-4 transition-transform duration-150 ease-out-strong group-hover:translate-x-0.5" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
