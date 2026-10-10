import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function StudentCTASection() {
  return (
    <section className="bg-foreground py-20 text-background lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-primary lg:text-4xl">
            Ready to accelerate your learning?
          </h2>
          <p className="mb-10 text-pretty text-lg leading-relaxed text-background/70">
            Join thousands of learners building practical skills with guided
            courses, assessments, and certificates on Surepass IQ.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-none px-8 text-sm font-bold"
              asChild
            >
              <Link href="/signup">
                Start learning free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-none border-primary bg-transparent px-8 text-sm font-bold text-primary hover:bg-primary/10"
              asChild
            >
              <Link href="/categories">Browse courses</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-background/50">
            Built for ambitious learners across Southern Africa.
          </p>
        </div>
      </div>
    </section>
  );
}
