"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden min-h-[480px] sm:min-h-[520px] lg:min-h-[560px]">
      {/* Full-bleed background image */}
      <div className="absolute inset-0">
        <Image
          src="/surepass-hero.jpeg"
          alt="SurePass IQ hero training"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Content on top */}
      <div className="relative mx-auto flex min-h-[480px] w-full max-w-[1440px] items-center px-4 py-12 sm:min-h-[520px] sm:px-6 lg:min-h-[560px] lg:px-12 lg:py-16">
        <div className="max-w-xl animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out-strong fill-mode-both motion-reduce:slide-in-from-bottom-0">
          <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-black/80">
            ESSENTIAL-SKILLS TRAINING 
          </span>

          <h1 className="mb-4 text-4xl font-bold tracking-tight text-black sm:text-5xl md:text-6xl lg:text-[56px] lg:leading-[1.15]">
            Upskill and reimagine the future.
          </h1>

          <p className="mb-8 text-base text-black/85 sm:text-lg md:text-xl font-normal leading-relaxed">
            Keep yourself engaged and stand out.
          </p>

          <div>
            <Button
              asChild
              size="lg"
              className="h-12 rounded-none bg-black px-6 text-sm font-bold text-white hover:bg-black/85"
            >
              <Link href="/#trending-courses">Browse courses</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
