import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-background py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="rounded-sm bg-primary px-6 py-10 text-center md:px-12 md:py-14">
          {/* Badge */}
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-sm bg-primary-foreground/10 px-3 py-1.5 text-sm font-medium text-primary-foreground">
            <Sparkles className="h-4 w-4" />
            Start learning today
          </div>

          {/* Heading */}
          <h2 className="mx-auto mb-3 max-w-2xl text-2xl font-bold text-primary-foreground md:text-3xl lg:text-4xl">
            <span className="text-balance">
              Unlock your potential with Surepass IQ
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mb-6 max-w-lg text-sm text-primary-foreground/80 md:text-base">
            Join our growing learner community and start mastering new skills today.
            Get access to focused courses designed by our institution.
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-11 rounded-sm bg-primary-foreground px-6 text-sm font-semibold text-primary hover:bg-primary-foreground/90"
            >
              <Link href="/signup">
                Get started for free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 rounded-sm border-primary-foreground/30 bg-transparent px-6 text-sm font-semibold text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link href="/business">Surepass IQ for Business</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
