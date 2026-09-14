"use client";

import { CheckCircle2, Target } from "lucide-react";
import { useLearner } from "@/components/learning/learner-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export function ChallengesPanel() {
  const { challenges, joinChallenge } = useLearner();

  const active = challenges.filter((challenge) => challenge.joined && !challenge.complete);
  const completed = challenges.filter((challenge) => challenge.complete);
  const available = challenges.filter((challenge) => !challenge.joined);

  return (
    <div className="space-y-6">
      <Card className="border-dashed">
        <CardContent className="flex items-start gap-3 py-5">
          <Target className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm text-muted-foreground">
            Challenges are goals set for you to build momentum — join one to start
            tracking progress automatically as you learn. Completing a challenge
            awards bonus points toward your level.
          </p>
        </CardContent>
      </Card>

      {active.length > 0 ? (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            In progress
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {active.map((challenge) => (
              <ChallengeCard key={challenge.definition.id} challenge={challenge} />
            ))}
          </div>
        </section>
      ) : null}

      {available.length > 0 ? (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Available challenges
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {available.map((challenge) => (
              <ChallengeCard
                key={challenge.definition.id}
                challenge={challenge}
                onJoin={() => joinChallenge(challenge.definition.id)}
              />
            ))}
          </div>
        </section>
      ) : null}

      {completed.length > 0 ? (
        <section className="space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Completed
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {completed.map((challenge) => (
              <ChallengeCard key={challenge.definition.id} challenge={challenge} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function ChallengeCard({
  challenge,
  onJoin,
}: {
  challenge: ReturnType<typeof useLearner>["challenges"][number];
  onJoin?: () => void;
}) {
  const { definition, current, complete, joined } = challenge;
  const progressPercent = Math.round((current / definition.target) * 100);

  return (
    <Card className={complete ? "border-primary/30 bg-primary/5" : undefined}>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base">
          <span>{definition.title}</span>
          {complete ? (
            <CheckCircle2 className="h-5 w-5 text-primary" />
          ) : (
            <span className="text-xs font-medium text-muted-foreground">
              +{definition.points} pts
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">{definition.description}</p>
        {joined || complete ? (
          <div>
            <div className="mb-1.5 flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {current}/{definition.target}
              </span>
              <span>{complete ? "Complete" : `${progressPercent}%`}</span>
            </div>
            <Progress value={complete ? 100 : progressPercent} />
          </div>
        ) : (
          <Button size="sm" onClick={onJoin}>
            Start challenge
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
