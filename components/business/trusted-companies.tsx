export function TrustedCompanies() {
  const companies = [
    { name: "Cisco", logo: "CISCO" },
    { name: "Volkswagen", logo: "VW" },
    { name: "Netflix", logo: "NETFLIX" },
    { name: "Eventbrite", logo: "eventbrite" },
    { name: "Box", logo: "BOX" },
    { name: "Nasdaq", logo: "NASDAQ" },
    { name: "P&G", logo: "P&G" },
    { name: "Adidas", logo: "adidas" },
  ];

  return (
    <section className="border-y border-border bg-muted/40 py-10 lg:py-12">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <p className="mb-8 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Trusted by over 16,000 companies and millions of learners worldwide
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:gap-x-16">
          {companies.map((company) => (
            <div
              key={company.name}
              className="text-lg font-bold tracking-tight text-muted-foreground/50 transition-colors hover:text-muted-foreground lg:text-xl"
            >
              {company.logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
