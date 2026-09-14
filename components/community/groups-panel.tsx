"use client";

import { Users } from "lucide-react";
import { useLearner } from "@/components/learning/learner-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GroupsPanel() {
  const { studyGroups, joinedGroupSlugs, joinGroup, leaveGroup } = useLearner();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {studyGroups.map((group) => {
        const joined = joinedGroupSlugs.includes(group.slug);
        const memberCount = group.baseMemberCount + (joined ? 1 : 0);

        return (
          <Card key={group.slug}>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">{group.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{group.description}</p>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Users className="h-4 w-4" />
                  {memberCount} members
                </span>
                <Button
                  size="sm"
                  variant={joined ? "outline" : "default"}
                  onClick={() =>
                    joined ? leaveGroup(group.slug) : joinGroup(group.slug)
                  }
                >
                  {joined ? "Joined" : "Join group"}
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
