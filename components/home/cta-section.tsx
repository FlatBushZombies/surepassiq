import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary/80 p-8 text-center md:p-16">
          {/* Decorative elements */}
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-primary-foreground/5" />
          <div className="absolute -bottom-10 -right-10 h-60 w-60 rounded-full bg-primary-foreground/5" />
          
          <div className="relative">
            <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-1.5 text-sm font-medium text-primary-foreground">
              <Sparkles className="h-4 w-4" />
              Start learning today
            </div>
            
            <h2 className="mx-auto mb-4 max-w-2xl text-3xl font-bold text-primary-foreground md:text-4xl lg:text-5xl">
              <span className="text-balance">
                Unlock your potential with StudyTech
              </span>
            </h2>
            
            <p className="mx-auto mb-8 max-w-lg text-primary-foreground/80">
              Join our growing learner community and start mastering new skills today.
              Get access to focused courses designed by our institution.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-primary-foreground px-8 text-base font-semibold text-primary hover:bg-primary-foreground/90"
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
                className="rounded-xl border-primary-foreground/30 bg-transparent px-8 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="/business">StudyTech for Business</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
