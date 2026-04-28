import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function BusinessHero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
          {/* Content */}
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
              SurePassIQ Business
            </p>
            <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-[#191970] lg:text-5xl xl:text-6xl">
              Accelerate corporate learning across Southern Africa
            </h1>
            <p className="mb-8 text-pretty text-lg leading-relaxed text-muted-foreground lg:text-xl">
              A South African startup powering smarter learning journeys for corporate teams, leadership, and talent development across the region.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="h-12 rounded-none bg-[#191970] px-6 text-sm font-bold text-white hover:bg-[#16165d]"
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
                className="h-12 rounded-none border-[#191970] px-6 text-sm font-bold text-[#191970]"
                asChild
              >
                <Link href="/business/contact">Talk to us</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-square">
              <Image
                src="/images/business-hero.jpg"
                alt="Team collaborating and learning together"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating stats card */}
            <div className="absolute -bottom-6 -left-6 rounded-sm border border-[#d8c16a] bg-[#f7f0d6] p-5 shadow-xl lg:-left-12">
              <p className="text-3xl font-bold text-[#191970]">100+</p>
              <p className="text-sm text-[#191970]/80">Southern African</p>
              <p className="text-sm text-[#191970]/80">corporate partners</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
