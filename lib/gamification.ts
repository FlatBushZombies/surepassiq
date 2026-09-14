import type { Category, Course } from "@/constants";
import {
  hasPassedAssessment,
  isCourseComplete,
  type CommunityPost,
  type LearnerPlatformState,
} from "@/lib/learner-store";

// ---------------------------------------------------------------------------
// Points & levels
// ---------------------------------------------------------------------------

export interface PointsBreakdown {
  lessons: number;
  assessments: number;
  courses: number;
  notes: number;
  discussions: number;
  streak: number;
  challenges: number;
  total: number;
}

const POINTS_PER_LESSON = 10;
const POINTS_PER_ASSESSMENT_PASS = 50;
const POINTS_PER_COURSE_COMPLETE = 150;
const POINTS_PER_NOTE = 5;
const POINTS_PER_DISCUSSION_POST = 5;
const POINTS_PER_STREAK_DAY = 5;

export function getPointsBreakdown(
  courses: Course[],
  state: LearnerPlatformState,
): PointsBreakdown {
  const courseStates = Object.values(state.courseStates);

  const lessonsCompleted = courseStates.reduce(
    (total, courseState) => total + courseState.completedLessonIds.length,
    0,
  );
  const notesAdded = courseStates.reduce(
    (total, courseState) => total + courseState.notes.length,
    0,
  );
  const discussionsPosted = courseStates.reduce(
    (total, courseState) => total + courseState.discussions.length,
    0,
  );
  const assessmentsPassed = courses.filter((course) =>
    hasPassedAssessment(course, state.courseStates[course.slug]),
  ).length;
  const coursesCompleted = courses.filter((course) =>
    isCourseComplete(course, state.courseStates[course.slug]),
  ).length;

  const lessons = lessonsCompleted * POINTS_PER_LESSON;
  const assessments = assessmentsPassed * POINTS_PER_ASSESSMENT_PASS;
  const coursePoints = coursesCompleted * POINTS_PER_COURSE_COMPLETE;
  const notes = notesAdded * POINTS_PER_NOTE;
  const discussions = discussionsPosted * POINTS_PER_DISCUSSION_POST;
  const streak = state.streak.longest * POINTS_PER_STREAK_DAY;
  const challenges = Object.keys(state.challengeCompletions).reduce(
    (total, challengeId) => {
      const definition = CHALLENGES.find((item) => item.id === challengeId);
      return total + (definition?.points ?? 0);
    },
    0,
  );

  return {
    lessons,
    assessments,
    courses: coursePoints,
    notes,
    discussions,
    streak,
    challenges,
    total:
      lessons + assessments + coursePoints + notes + discussions + streak + challenges,
  };
}

export interface LevelInfo {
  level: number;
  title: string;
  points: number;
  currentThreshold: number;
  nextThreshold: number | null;
  progressToNext: number;
}

interface LevelDefinition {
  title: string;
  threshold: number;
}

export const LEVELS: LevelDefinition[] = [
  { title: "Newcomer", threshold: 0 },
  { title: "Learner", threshold: 100 },
  { title: "Achiever", threshold: 250 },
  { title: "Specialist", threshold: 500 },
  { title: "Expert", threshold: 900 },
  { title: "Mentor", threshold: 1500 },
  { title: "Master", threshold: 2400 },
  { title: "Luminary", threshold: 3600 },
  { title: "Legend", threshold: 5200 },
];

export function getLevel(points: number): LevelInfo {
  let levelIndex = 0;
  for (let index = 0; index < LEVELS.length; index += 1) {
    if (points >= LEVELS[index].threshold) {
      levelIndex = index;
    }
  }

  const current = LEVELS[levelIndex];
  const next = LEVELS[levelIndex + 1];
  const progressToNext = next
    ? Math.round(
        ((points - current.threshold) / (next.threshold - current.threshold)) *
          100,
      )
    : 100;

  return {
    level: levelIndex + 1,
    title: current.title,
    points,
    currentThreshold: current.threshold,
    nextThreshold: next ? next.threshold : null,
    progressToNext,
  };
}

// ---------------------------------------------------------------------------
// Challenges
// ---------------------------------------------------------------------------

export type ChallengeMetric =
  | "lessons_completed"
  | "assessments_passed"
  | "courses_completed"
  | "notes_added"
  | "streak_days"
  | "community_posts";

export interface ChallengeDefinition {
  id: string;
  title: string;
  description: string;
  metric: ChallengeMetric;
  target: number;
  points: number;
}

export const CHALLENGES: ChallengeDefinition[] = [
  {
    id: "first-steps",
    title: "First Steps",
    description: "Complete 3 lessons across any course.",
    metric: "lessons_completed",
    target: 3,
    points: 30,
  },
  {
    id: "deep-diver",
    title: "Deep Diver",
    description: "Complete 15 lessons in total.",
    metric: "lessons_completed",
    target: 15,
    points: 100,
  },
  {
    id: "quiz-master",
    title: "Quiz Master",
    description: "Pass 3 course assessments.",
    metric: "assessments_passed",
    target: 3,
    points: 90,
  },
  {
    id: "finish-line",
    title: "Finish Line",
    description: "Complete a full course and unlock its certificate.",
    metric: "courses_completed",
    target: 1,
    points: 100,
  },
  {
    id: "course-collector",
    title: "Course Collector",
    description: "Complete 3 full courses.",
    metric: "courses_completed",
    target: 3,
    points: 250,
  },
  {
    id: "note-taker",
    title: "Note Taker",
    description: "Save 5 notes while learning.",
    metric: "notes_added",
    target: 5,
    points: 40,
  },
  {
    id: "seven-day-streak",
    title: "7-Day Streak",
    description: "Show up and learn 7 days in a row.",
    metric: "streak_days",
    target: 7,
    points: 70,
  },
  {
    id: "community-voice",
    title: "Community Voice",
    description: "Share 3 posts or discussion replies with the community.",
    metric: "community_posts",
    target: 3,
    points: 45,
  },
];

export function getChallengeMetricValue(
  metric: ChallengeMetric,
  courses: Course[],
  state: LearnerPlatformState,
): number {
  const courseStates = Object.values(state.courseStates);

  switch (metric) {
    case "lessons_completed":
      return courseStates.reduce(
        (total, courseState) => total + courseState.completedLessonIds.length,
        0,
      );
    case "assessments_passed":
      return courses.filter((course) =>
        hasPassedAssessment(course, state.courseStates[course.slug]),
      ).length;
    case "courses_completed":
      return courses.filter((course) =>
        isCourseComplete(course, state.courseStates[course.slug]),
      ).length;
    case "notes_added":
      return courseStates.reduce(
        (total, courseState) => total + courseState.notes.length,
        0,
      );
    case "streak_days":
      return state.streak.longest;
    case "community_posts": {
      const discussionPosts = courseStates.reduce(
        (total, courseState) => total + courseState.discussions.length,
        0,
      );
      const feedPosts = state.communityPosts.filter(
        (post) => !post.isSeed,
      ).length;
      return discussionPosts + feedPosts;
    }
    default:
      return 0;
  }
}

export interface ChallengeProgress {
  definition: ChallengeDefinition;
  joined: boolean;
  current: number;
  complete: boolean;
  completedAt?: string;
}

export function getChallengeProgress(
  courses: Course[],
  state: LearnerPlatformState,
): ChallengeProgress[] {
  return CHALLENGES.map((definition) => {
    const current = getChallengeMetricValue(definition.metric, courses, state);
    return {
      definition,
      joined: state.joinedChallengeIds.includes(definition.id),
      current: Math.min(current, definition.target),
      complete: Boolean(state.challengeCompletions[definition.id]),
      completedAt: state.challengeCompletions[definition.id],
    };
  });
}

/**
 * Marks any joined challenge whose target has been reached as complete.
 * Returns the updated state plus the list of challenges that were just
 * completed (empty if none) so the caller can surface notifications. Safe to
 * call after every state mutation — it is a no-op for challenges that are
 * not joined or already completed.
 */
export function applyChallengeCompletions(
  courses: Course[],
  state: LearnerPlatformState,
): { state: LearnerPlatformState; completed: ChallengeDefinition[] } {
  let next = state;
  const completed: ChallengeDefinition[] = [];

  for (const definition of CHALLENGES) {
    if (!next.joinedChallengeIds.includes(definition.id)) continue;
    if (next.challengeCompletions[definition.id]) continue;

    const current = getChallengeMetricValue(definition.metric, courses, next);
    if (current >= definition.target) {
      next = {
        ...next,
        challengeCompletions: {
          ...next.challengeCompletions,
          [definition.id]: new Date().toISOString(),
        },
      };
      completed.push(definition);
    }
  }

  return { state: next, completed };
}

// ---------------------------------------------------------------------------
// Leaderboard
// ---------------------------------------------------------------------------

export interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  isYou?: boolean;
}

const LEADERBOARD_SEED: Array<Omit<LeaderboardEntry, "isYou">> = [
  { id: "p1", name: "Amaka O.", points: 1840 },
  { id: "p2", name: "Daniel K.", points: 1520 },
  { id: "p3", name: "Priya S.", points: 1290 },
  { id: "p4", name: "Marcus B.", points: 980 },
  { id: "p5", name: "Chidi E.", points: 760 },
  { id: "p6", name: "Sofia R.", points: 610 },
  { id: "p7", name: "Ben T.", points: 430 },
  { id: "p8", name: "Grace N.", points: 310 },
  { id: "p9", name: "Liam F.", points: 180 },
  { id: "p10", name: "Yusuf A.", points: 90 },
];

export interface Leaderboard {
  rank: number;
  total: number;
  entries: LeaderboardEntry[];
}

export function buildLeaderboard(
  yourPoints: number,
  yourName = "You",
): Leaderboard {
  const entries: LeaderboardEntry[] = [
    ...LEADERBOARD_SEED,
    { id: "you", name: yourName, points: yourPoints, isYou: true },
  ].sort((left, right) => right.points - left.points);

  const rank = entries.findIndex((entry) => entry.isYou) + 1;

  return { rank, total: entries.length, entries };
}

// ---------------------------------------------------------------------------
// Study groups (cohorts)
// ---------------------------------------------------------------------------

export interface StudyGroup {
  slug: string;
  name: string;
  description: string;
  categoryName: string;
  baseMemberCount: number;
}

export function buildStudyGroups(categories: Category[]): StudyGroup[] {
  return categories.map((category, index) => ({
    slug: category.slug,
    name: `${category.name} Study Group`,
    description: `Learn alongside other students working through ${category.name} courses — share wins, ask questions, and stay accountable.`,
    categoryName: category.name,
    baseMemberCount: 42 + index * 17,
  }));
}

// ---------------------------------------------------------------------------
// Community feed
// ---------------------------------------------------------------------------

export const COMMUNITY_POST_SEED: CommunityPost[] = [
  {
    id: "seed-1",
    authorName: "Amaka O.",
    body: "Just passed the AI Fundamentals assessment on my second attempt — the prompt engineering module made it click. Anyone else working through that course right now?",
    createdAt: "2026-09-08T09:14:00.000Z",
    isSeed: true,
    baseLikeCount: 14,
  },
  {
    id: "seed-2",
    authorName: "Daniel K.",
    body: "Hit a 7-day streak this morning. Small daily sessions are working way better for me than cramming on weekends.",
    createdAt: "2026-09-10T18:02:00.000Z",
    isSeed: true,
    baseLikeCount: 21,
  },
  {
    id: "seed-3",
    authorName: "Priya S.",
    body: "Shared my case study from the Design module in the discussion thread — would love feedback from anyone who has finished it.",
    createdAt: "2026-09-11T13:47:00.000Z",
    isSeed: true,
    baseLikeCount: 9,
  },
  {
    id: "seed-4",
    authorName: "Marcus B.",
    body: "Completed my first course and unlocked the certificate. Starting Business Strategy next — any tips before I dive in?",
    createdAt: "2026-09-12T07:30:00.000Z",
    isSeed: true,
    baseLikeCount: 17,
  },
  {
    id: "seed-5",
    authorName: "Sofia R.",
    body: "The weekly challenges are a good nudge to actually finish lessons instead of just bookmarking them for later.",
    createdAt: "2026-09-13T20:11:00.000Z",
    isSeed: true,
    baseLikeCount: 11,
  },
];
