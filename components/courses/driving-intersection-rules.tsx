import { CheckCircle2, Signpost } from "lucide-react";
import { intersectionRules } from "@/constants/intersection-rules";

export function DrivingIntersectionRules() {
  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-2xl font-bold text-card-foreground">Intersection Rules</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Right of way at junctions, robots, four-way stops, and roundabouts.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {intersectionRules.map((rule) => (
            <div key={rule.id} className="rounded-2xl border border-border bg-background/50 p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Signpost className="h-4.5 w-4.5" />
              </div>
              <p className="mt-3 font-bold text-card-foreground">{rule.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{rule.summary}</p>
              <ul className="mt-3 space-y-2">
                {rule.details.map((detail) => (
                  <li key={detail} className="flex items-start gap-2 text-sm text-card-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
