import { notFound } from "next/navigation";
import { courses } from "@/constants";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { LearningWorkspace } from "@/components/learning/learning-workspace";

interface LearnPageProps {
  params: Promise<{ slug: string }>;
}

export default async function LearnPage(props: LearnPageProps) {
  const { slug } = await props.params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-muted/20">
        <section className="border-b border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              Learning workspace
            </p>
            <h1 className="mt-2 text-3xl font-bold text-foreground">{course.title}</h1>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              Work through lessons, save notes, join the discussion, and complete the
              final assessment to unlock your certificate.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
          <LearningWorkspace course={course} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return courses.map((course) => ({ slug: course.slug }));
}
