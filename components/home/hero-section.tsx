"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#f4f2ee] text-[#2d2f31]">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-8 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
          {/* Left Column: Text & CTA */}
          <div className="flex flex-col justify-center lg:col-span-6 lg:pr-6">
            <span className="mb-4 text-xs font-bold uppercase tracking-widest text-[#2d2f31]/80">
              ENTERPRISE-WIDE TRAINING
            </span>

            <h1 className="mb-4 text-4xl font-bold tracking-tight text-[#1c1d1f] sm:text-5xl md:text-6xl lg:text-[56px] lg:leading-[1.15]">
              Upskill your entire workforce
            </h1>

            <p className="mb-8 text-base text-[#2d2f31]/80 sm:text-lg md:text-xl font-normal leading-relaxed">
              Keep your people engaged and help them grow.
            </p>

            <div>
              <Button
                asChild
                size="lg"
                className="h-12 rounded-none bg-[#1c1d1f] px-6 text-sm font-bold text-white transition-colors hover:bg-black"
              >
                <Link href="/business/demo">Request a demo</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: High Quality Pexels Workforce Image */}
          <div className="relative lg:col-span-6 flex justify-end">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/4] overflow-hidden rounded-sm">
              <Image
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600"
                alt="Diverse workforce collaborating and upskilling together"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}