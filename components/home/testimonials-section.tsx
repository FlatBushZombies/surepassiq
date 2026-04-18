import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/constants";

export function TestimonialsSection() {
  return (
    <section className="bg-secondary py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">
            What our learners say
          </h2>
          <p className="mt-2 text-muted-foreground">
            Stories from learners building brighter futures across Zimbabwe
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="relative rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              {/* Quote Icon */}
              <Quote className="absolute right-6 top-6 h-8 w-8 text-primary/10" />

              {/* Rating */}
              <div className="mb-4 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? "fill-[oklch(var(--rating))] text-[oklch(var(--rating))]"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="mb-6 text-card-foreground">
                &ldquo;{testimonial.content}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-card-foreground">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
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
