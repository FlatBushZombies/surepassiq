"use client";

import { Trophy } from "lucide-react";
import { useLearner } from "@/components/learning/learner-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function LeaderboardPanel() {
  const { leaderboard } = useLearner();

  return (
    <Card>
      <CardContent className="divide-y divide-border py-2">
        {leaderboard.entries.map((entry, index) => {
          const rank = index + 1;
          return (
            <div
              key={entry.id}
              className={cn(
                "flex items-center gap-4 px-2 py-3",
                entry.isYou && "rounded-lg bg-primary/5",
              )}
            >
              <div className="flex w-8 shrink-0 items-center justify-center">
                {rank <= 3 ? (
                  <Trophy
                    className={cn(
                      "h-5 w-5",
                      rank === 1 && "text-yellow-500",
                      rank === 2 && "text-slate-400",
                      rank === 3 && "text-amber-700",
                    )}
                  />
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">
                    {rank}
                  </span>
                )}
              </div>
              <Avatar className="h-8 w-8">
                <AvatarFallback>{getInitials(entry.name)}</AvatarFallback>
              </Avatar>
              <p
                className={cn(
                  "flex-1 truncate text-sm font-medium",
                  entry.isYou ? "text-primary" : "text-foreground",
                )}
              >
                {entry.name}
                {entry.isYou ? " (you)" : ""}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {entry.points.toLocaleString()} pts
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
