import { Sparkles } from "lucide-react";

export function DrivingAskAi() {
  return (
    <div className="py-6 text-center space-y-4">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <Sparkles className="h-7 w-7 text-primary" />
      </div>
      <p className="text-sm text-muted-foreground">
        Coming soon — ask questions about road signs, intersection rules, and driving theory and
        get instant answers.
      </p>
    </div>
  );
}
