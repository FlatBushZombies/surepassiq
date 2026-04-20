import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/constants";

export function TestimonialsSection() {
  return (
    <section className="bg-secondary py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">

        {/* Section Header */}
        <div className="mb-12 text-center">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-widest text-primary/70">
            Testimonials
          </p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
            What our learners say
          </h2>
          <p className="mt-2 text-sm text-black">
            Stories from learners building brighter futures across Zimbabwe
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <article
              key={testimonial.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-200 hover:border-border hover:shadow-[0_4px_20px_-4px_hsl(var(--foreground)/0.08)]"
            >
              {/* Top accent line on hover */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Quote icon — decorative, stays subordinate */}
              <Quote className="absolute right-5 top-5 h-7 w-7 text-primary/8 transition-colors duration-200 group-hover:text-primary/12" />

              {/* Rating */}
              <div className="mb-4 flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < testimonial.rating
                        ? "fill-[oklch(var(--rating))] text-[oklch(var(--rating))]"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Content — grows to push author to bottom */}
              <p className="mb-6 flex-1 text-sm leading-relaxed text-card-foreground/80">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Divider */}
              <div className="mb-4 h-px bg-border/50" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover ring-2 ring-border/60"
                />
                <div>
                  <p className="text-sm font-semibold text-card-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}