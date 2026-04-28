import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/constants";

export function TestimonialsSection() {
  return (
    <section className="bg-secondary py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        {/* Section Header - Udemy style: centered, clean */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            What our learners say
          </h2>
          <p className="mt-1 text-sm text-white">
            Stories from learners building brighter futures across Zimbabwe
          </p>
        </div>

        {/* Grid - Clean testimonial cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="relative flex flex-col rounded-sm border border-border bg-card p-5"
            >
              {/* Quote icon */}
              <Quote className="absolute right-4 top-4 h-6 w-6 text-muted-foreground/20" />

              {/* Rating */}
              <div className="mb-3 flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="mb-4 flex-1 text-sm leading-relaxed text-card-foreground/80">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Divider */}
              <div className="mb-4 h-px bg-border" />

              {/* Author */}
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
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
