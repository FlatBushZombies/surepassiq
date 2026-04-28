import Image from "next/image";

const testimonials = [
  {
    quote:
      "SurePassIQ helped our growing Johannesburg team build leadership skills fast and keep our people engaged with locally relevant learning.",
    author: "Nokuthula Moyo",
    role: "Talent Director",
    company: "Ubuntu Ventures",
    image: "/images/testimonial-1.jpg",
  },
  {
    quote:
      "We reduced onboarding time for new hires by 30% using tailored corporate pathways from SurePassIQ.",
    author: "Lihle Nkosi",
    role: "Chief People Officer",
    company: "Mzanzi Fintech",
    image: "/images/testimonial-2.jpg",
  },
  {
    quote:
      "Learning that understands the Southern African context makes adoption easy and helps our teams deliver results faster.",
    author: "Tariq Abrahams",
    role: "Head of Operations",
    company: "Kopano Logistics",
    image: "/images/testimonial-3.jpg",
  },
];

export function BusinessTestimonials() {
  return (
    <section className="bg-muted/30 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-[#191970] lg:text-4xl">
            Trusted by Southern African corporate teams
          </h2>
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            See how regional organizations are accelerating learning, leadership and growth with SurePassIQ.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="flex flex-col bg-card p-8"
            >
              <blockquote className="mb-8 flex-1 text-pretty leading-relaxed text-card-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-card-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
