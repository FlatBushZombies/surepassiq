"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { Heart, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLearner } from "@/components/learning/learner-provider";

interface CourseActionsProps {
  courseSlug: string;
}

export function CourseActions({ courseSlug }: CourseActionsProps) {
  const router = useRouter();
  const { enrollInCourse, getCourseProgress, state, toggleWishlist } = useLearner();

  const isWishlisted = state.wishlistedCourseSlugs.includes(courseSlug);
  const isEnrolled = Boolean(state.courseStates[courseSlug]);
  const progress = getCourseProgress(courseSlug);

  function handleStartLearning() {
    enrollInCourse(courseSlug);
    startTransition(() => {
      router.push(`/learn/${courseSlug}`);
    });
  }

  return (
    <div className="space-y-3">
      <Button size="lg" className="w-full text-base font-semibold" onClick={handleStartLearning}>
        <PlayCircle className="mr-2 h-4 w-4" />
        {isEnrolled
          ? progress >= 100
            ? "Review course"
            : progress > 0
              ? "Continue learning"
              : "Start learning"
          : "Enroll and start learning"}
      </Button>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="lg"
          className="flex-1 text-base font-semibold"
          onClick={() => toggleWishlist(courseSlug)}
        >
          <Heart className={`mr-2 h-4 w-4 ${isWishlisted ? "fill-current" : ""}`} />
          {isWishlisted ? "Saved" : "Wishlist"}
        </Button>
        <Button
          variant="ghost"
          size="lg"
          className="flex-1 text-base font-semibold"
          asChild
        >
          <a href="#curriculum">Preview outline</a>
        </Button>
      </div>
    </div>
  );
}
