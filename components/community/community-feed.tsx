"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useLearner } from "@/components/learning/learner-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function formatRelativeTime(iso: string) {
  const diffMs = Date.now() - Date.parse(iso);
  const diffHours = Math.round(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;

  const diffDays = Math.round(diffHours / 24);
  return `${diffDays}d ago`;
}

export function CommunityFeed() {
  const { communityFeed, addCommunityPost, toggleLikePost } = useLearner();
  const [draft, setDraft] = useState("");

  function handlePost() {
    if (!draft.trim()) return;
    addCommunityPost(draft);
    setDraft("");
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-3 py-5">
          <Textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Share a win, ask a question, or encourage another learner..."
            className="min-h-20"
          />
          <div className="flex justify-end">
            <Button onClick={handlePost} disabled={!draft.trim()}>
              Post
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {communityFeed.map((post) => (
          <Card key={post.id}>
            <CardContent className="space-y-3 py-5">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>{getInitials(post.authorName)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {post.authorName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatRelativeTime(post.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-sm text-foreground">{post.body}</p>
              <button
                type="button"
                onClick={() => toggleLikePost(post.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition hover:text-primary",
                  post.likedByYou && "text-primary",
                )}
              >
                <Heart
                  className={cn("h-4 w-4", post.likedByYou && "fill-primary")}
                />
                {post.likeCount}
              </button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
