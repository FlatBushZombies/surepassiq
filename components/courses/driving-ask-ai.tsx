import { Sparkles } from "lucide-react";

export function DrivingAskAi() {
  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mx-auto max-w-md py-14 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
        <h3 className="text-2xl font-bold text-card-foreground">Ask AI — coming soon</h3>
        <p className="text-sm text-muted-foreground">
          A built-in AI study assistant for road signs, intersection rules, and driving theory
          questions is on the way. Check back soon.
        </p>
      </div>
    </div>
  );
}
