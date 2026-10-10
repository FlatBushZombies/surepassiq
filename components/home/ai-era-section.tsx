"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Trophy, MessageSquare, Lightbulb } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function AiEraSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-12">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] bg-[#1a1b26] p-6 sm:p-8 md:p-12 lg:p-14 text-white shadow-2xl border border-slate-800/80">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[40px] lg:leading-[1.18]">
                Reimagine your career in the AI era
              </h2>
              
              <p className="mt-4 text-sm text-slate-300 sm:text-base leading-relaxed max-w-lg">
                Future-proof your skills with Personal Plan. Get access to a variety of fresh content from real-world experts.
              </p>

              {/* 2x2 Feature Items */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {/* Feature 1 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#8b5cf6]/25 border border-[#8b5cf6]/50 text-purple-300">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-200">
                    <strong className="font-bold text-white">Learn</strong> AI and more
                  </span>
                </div>

                {/* Feature 2 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#10b981]/25 border border-[#10b981]/50 text-emerald-300">
                    <Trophy className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-200">
                    <strong className="font-bold text-white">Prep</strong> for a certification
                  </span>
                </div>

                {/* Feature 3 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f59e0b]/25 border border-[#f59e0b]/50 text-amber-300">
                    <MessageSquare className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-200">
                    <strong className="font-bold text-white">Practice</strong> with AI coaching
                  </span>
                </div>

                {/* Feature 4 */}
                <div className="flex items-center gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#06b6d4]/25 border border-[#06b6d4]/50 text-cyan-300">
                    <Lightbulb className="h-3.5 w-3.5" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-200">
                    <strong className="font-bold text-white">Advance</strong> your career
                  </span>
                </div>
              </div>

              {/* Call to action */}
              <div className="mt-8 flex flex-col items-start">
                <Link
                  href="/categories"
                  className="inline-flex items-center justify-center rounded-md bg-white px-7 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-slate-100 hover:shadow-lg active:scale-95"
                >
                  Learn more
                </Link>
                <p className="mt-2 text-xs font-medium text-slate-400">
                  Starting at $10.00/month
                </p>
              </div>
            </div>

            {/* Right Column: Career Image */}
            <div className="lg:col-span-6 relative h-[340px] sm:h-[380px] lg:h-[420px] w-full overflow-hidden rounded-[24px] bg-[#1a1b26] shadow-lg">
              <Image
                src="/AI-Era.png"
                alt="Reimagine your career in the AI era"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
