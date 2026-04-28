const stats = [
  { value: "100+", label: "Southern African partners" },
  { value: "92%", label: "learning adoption rate" },
  { value: "120K+", label: "hours of local learning" },
  { value: "80%", label: "talent retention improvement" },
];

export function BusinessStats() {
  return (
    <section className="border-y border-border bg-foreground py-16 text-background lg:py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <p className="mb-1 text-4xl font-bold tracking-tight lg:text-5xl">
                {stat.value}
              </p>
              <p className="text-sm text-background/60">{stat.label}</p>
              {index < stats.length - 1 && (
                <div className="mt-6 hidden h-px w-full bg-background/10 lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
