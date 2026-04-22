import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { sitePages } from "@/lib/site-pages";

interface StaticContentPageProps {
  params: Promise<{ slug: string[] }>;
}

export default async function StaticContentPage(props: StaticContentPageProps) {
  const { slug } = await props.params;

  if (slug.length !== 1) {
    notFound();
  }

  const page = sitePages[slug[0]];

  if (!page) {
    notFound();
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border bg-muted/20">
          <div className="mx-auto max-w-4xl px-4 py-14 text-center lg:px-6 lg:py-20">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              {page.eyebrow}
            </p>
            <h1 className="mt-3 text-4xl font-bold text-foreground">{page.title}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {page.description}
            </p>
            <div className="mt-8">
              <Button asChild>
                <Link href={page.ctaHref}>{page.ctaLabel}</Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-12 lg:px-6 lg:py-16">
          <div className="grid gap-6">
            {page.sections.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-card-foreground">
                  {section.title}
                </h2>
                <p className="mt-3 leading-7 text-muted-foreground">{section.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(sitePages).map((slug) => ({ slug: [slug] }));
}
