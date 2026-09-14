"use client";

import { Flame, Sparkles } from "lucide-react";
import { useLearner } from "@/components/learning/learner-provider";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function PointsSummaryCard() {
  const { pointsBreakdown, level, streak, leaderboard } = useLearner();

  return (
    <Card>
      <CardContent className="grid gap-6 py-6 sm:grid-cols-3 sm:divide-x sm:divide-border">
        <div className="flex items-center gap-3 sm:pr-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-5 w-5 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Level {level.level} · {level.title}
            </p>
            <p className="text-lg font-semibold text-foreground">
              {pointsBreakdown.total.toLocaleString()} pts
            </p>
            {level.nextThreshold !== null ? (
              <div className="mt-1.5 w-full">
                <Progress value={level.progressToNext} className="h-1.5" />
                <p className="mt-1 text-xs text-muted-foreground">
                  {level.nextThreshold - pointsBreakdown.total} pts to next level
                </p>
              </div>
            ) : (
              <p className="mt-1 text-xs text-muted-foreground">Top level reached</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3 sm:px-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-500/10">
            <Flame className="h-5 w-5 text-orange-500" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Learning streak
            </p>
            <p className="text-lg font-semibold text-foreground">
              {streak.current} day{streak.current === 1 ? "" : "s"}
            </p>
            <p className="text-xs text-muted-foreground">
              Longest: {streak.longest} day{streak.longest === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:pl-6">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <span className="text-sm font-bold text-primary">#{leaderboard.rank}</span>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Leaderboard rank
            </p>
            <p className="text-lg font-semibold text-foreground">
              {leaderboard.rank} of {leaderboard.total}
            </p>
            <p className="text-xs text-muted-foreground">Global ranking</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
