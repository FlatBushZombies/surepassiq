"use client";

import { PointsSummaryCard } from "@/components/community/points-summary-card";
import { CommunityFeed } from "@/components/community/community-feed";
import { ChallengesPanel } from "@/components/community/challenges-panel";
import { LeaderboardPanel } from "@/components/community/leaderboard-panel";
import { GroupsPanel } from "@/components/community/groups-panel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function CommunityHub() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Community</h1>
        <p className="text-sm text-muted-foreground">
          Track your progress, take on challenges, and connect with other learners.
        </p>
      </div>

      <PointsSummaryCard />

      <Tabs defaultValue="feed">
        <div className="overflow-x-auto">
          <TabsList>
            <TabsTrigger value="feed">Feed</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="feed">
          <CommunityFeed />
        </TabsContent>
        <TabsContent value="challenges">
          <ChallengesPanel />
        </TabsContent>
        <TabsContent value="leaderboard">
          <LeaderboardPanel />
        </TabsContent>
        <TabsContent value="groups">
          <GroupsPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
}
