import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function BusinessCTA() {
  return (
    <section className="bg-foreground py-20 text-background lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-[#191970] lg:text-4xl">
            Ready to accelerate learning in your business?
          </h2>
          <p className="mb-10 text-pretty text-lg leading-relaxed text-background/70">
            Empower your corporate teams with the tools and pathways they need to grow fast across Southern Africa.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="h-12 rounded-none bg-[#191970] px-8 text-sm font-bold text-white hover:bg-[#16165d]"
              asChild
            >
              <Link href="/business/demo">
                Request a demo
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 rounded-none border-[#191970] bg-transparent px-8 text-sm font-bold text-[#191970] hover:bg-[#191970]/10"
              asChild
            >
              <Link href="/business/contact">Talk to us</Link>
            </Button>
          </div>
          <p className="mt-8 text-sm text-background/50">
            Built for Southern African corporates and startup growth teams.
          </p>
        </div>
      </div>
    </section>
  );
}
