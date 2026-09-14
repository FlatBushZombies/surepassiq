"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";
import { categories, courses, type Course } from "@/constants";
import {
  LEARNER_STORAGE_KEY,
  buildAchievements,
  createDefaultLearnerState,
  ensureCourseState,
  getCourseProgressPercent,
  getLastLearningActivity,
  hasPassedAssessment,
  isCourseComplete,
  mergeWithDefaultState,
  recordLearnerActivity,
  type CommunityPost,
  type LearnerPlatformState,
} from "@/lib/learner-store";
import {
  applyChallengeCompletions,
  buildLeaderboard,
  buildStudyGroups,
  getChallengeProgress,
  getLevel,
  getPointsBreakdown,
  COMMUNITY_POST_SEED,
  type ChallengeProgress,
  type Leaderboard,
  type LevelInfo,
  type PointsBreakdown,
  type StudyGroup,
} from "@/lib/gamification";

interface LearnerContextValue {
  isReady: boolean;
  state: LearnerPlatformState;
  enrolledCourses: Course[];
  wishlistCourses: Course[];
  notifications: LearnerPlatformState["notifications"];
  unreadNotificationsCount: number;
  achievements: ReturnType<typeof buildAchievements>;
  pointsBreakdown: PointsBreakdown;
  level: LevelInfo;
  streak: LearnerPlatformState["streak"];
  challenges: ChallengeProgress[];
  leaderboard: Leaderboard;
  studyGroups: StudyGroup[];
  joinedGroupSlugs: string[];
  communityFeed: Array<CommunityPost & { likeCount: number; likedByYou: boolean }>;
  getCourseState: (courseSlug: string) => LearnerPlatformState["courseStates"][string] | undefined;
  getCourseProgress: (courseSlug: string) => number;
  enrollInCourse: (courseSlug: string) => void;
  toggleWishlist: (courseSlug: string) => void;
  toggleLessonComplete: (courseSlug: string, lessonId: string) => void;
  setLastVisitedLesson: (courseSlug: string, lessonId: string) => void;
  toggleLessonBookmark: (courseSlug: string, lessonId: string) => void;
  addNote: (courseSlug: string, lessonId: string, content: string) => void;
  addDiscussionPost: (courseSlug: string, body: string) => void;
  submitAssessment: (
    courseSlug: string,
    answers: Record<string, number>,
  ) => {
    score: number;
    passed: boolean;
  };
  saveReview: (courseSlug: string, rating: number, comment: string) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  joinChallenge: (challengeId: string) => void;
  addCommunityPost: (body: string, courseSlug?: string) => void;
  toggleLikePost: (postId: string) => void;
  joinGroup: (groupSlug: string) => void;
  leaveGroup: (groupSlug: string) => void;
}

const LearnerContext = createContext<LearnerContextValue | null>(null);

function appendNotification(
  state: LearnerPlatformState,
  input: Omit<LearnerPlatformState["notifications"][number], "id" | "createdAt" | "read">,
) {
  return {
    ...state,
    notifications: [
      {
        ...input,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        read: false,
      },
      ...state.notifications,
    ].slice(0, 40),
  };
}

export function LearnerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LearnerPlatformState>(
    createDefaultLearnerState(),
  );
  const [isReady, setIsReady] = useState(false);
  const { user } = useUser();

  /**
   * Applies a state update, then (optionally) records daily learning
   * activity for the streak, then checks joined challenges for completion.
   * Centralizing this keeps streak/challenge bookkeeping consistent across
   * every mutation below instead of repeating it in each one.
   */
  function commitState(
    updater: (current: LearnerPlatformState) => LearnerPlatformState,
    options?: { trackActivity?: boolean },
  ) {
    setState((current) => {
      let next = updater(current);

      if (options?.trackActivity) {
        next = recordLearnerActivity(next);
      }

      const { state: withCompletions, completed } = applyChallengeCompletions(
        courses,
        next,
      );
      next = withCompletions;

      for (const definition of completed) {
        next = appendNotification(next, {
          type: "achievement",
          title: "Challenge complete",
          body: `You completed "${definition.title}" and earned ${definition.points} points.`,
        });
      }

      return next;
    });
  }

  useEffect(() => {
    let cancelled = false;

    try {
      const rawState = window.localStorage.getItem(LEARNER_STORAGE_KEY);
      const nextState = mergeWithDefaultState(
        rawState
          ? (JSON.parse(rawState) as Partial<LearnerPlatformState>)
          : undefined,
      );

      queueMicrotask(() => {
        if (!cancelled) {
          setState(nextState);
        }
      });
    } catch {
      queueMicrotask(() => {
        if (!cancelled) {
          setState(createDefaultLearnerState());
        }
      });
    } finally {
      setIsReady(true);
    }

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isReady) {
      return;
    }

    window.localStorage.setItem(LEARNER_STORAGE_KEY, JSON.stringify(state));
  }, [isReady, state]);

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (event.key !== LEARNER_STORAGE_KEY || !event.newValue) {
        return;
      }

      setState(
        mergeWithDefaultState(
          JSON.parse(event.newValue) as Partial<LearnerPlatformState>,
        ),
      );
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function getCourseState(courseSlug: string) {
    return state.courseStates[courseSlug];
  }

  function getCourseProgress(courseSlug: string) {
    const course = courses.find((item) => item.slug === courseSlug);
    if (!course) {
      return 0;
    }

    return getCourseProgressPercent(course, state.courseStates[courseSlug]);
  }

  function enrollInCourse(courseSlug: string) {
    const course = courses.find((item) => item.slug === courseSlug);
    if (!course) {
      return;
    }

    commitState((current) => {
      if (current.courseStates[courseSlug]) {
        return current;
      }

      const nextState = {
        ...current,
        courseStates: {
          ...current.courseStates,
          [courseSlug]: ensureCourseState(current, courseSlug),
        },
      };

      return appendNotification(nextState, {
        type: "course",
        title: "Course added to your learning plan",
        body: `${course.title} is now available in My Learning.`,
        courseSlug,
      });
    });
  }

  function toggleWishlist(courseSlug: string) {
    commitState((current) => {
      const exists = current.wishlistedCourseSlugs.includes(courseSlug);
      return {
        ...current,
        wishlistedCourseSlugs: exists
          ? current.wishlistedCourseSlugs.filter((slug) => slug !== courseSlug)
          : [courseSlug, ...current.wishlistedCourseSlugs],
      };
    });
  }

  function toggleLessonComplete(courseSlug: string, lessonId: string) {
    const course = courses.find((item) => item.slug === courseSlug);
    if (!course) {
      return;
    }

    commitState((current) => {
      const courseState = ensureCourseState(current, courseSlug);
      const completedLessonIds = courseState.completedLessonIds.includes(lessonId)
        ? courseState.completedLessonIds.filter((id) => id !== lessonId)
        : [...courseState.completedLessonIds, lessonId];

      const updatedCourseState = {
        ...courseState,
        completedLessonIds,
        lastVisitedLessonId: lessonId,
      };

      let nextState: LearnerPlatformState = {
        ...current,
        courseStates: {
          ...current.courseStates,
          [courseSlug]: updatedCourseState,
        },
      };

      const becameComplete =
        !courseState.certificateIssuedAt &&
        isCourseComplete(course, updatedCourseState);

      if (becameComplete) {
        nextState = {
          ...nextState,
          courseStates: {
            ...nextState.courseStates,
            [courseSlug]: {
              ...updatedCourseState,
              certificateIssuedAt: new Date().toISOString(),
            },
          },
        };
        nextState = appendNotification(nextState, {
          type: "achievement",
          title: "Course completed",
          body: `You completed ${course.title} and unlocked your certificate.`,
          courseSlug,
        });
      }

      return nextState;
    }, { trackActivity: true });
  }

  function setLastVisitedLesson(courseSlug: string, lessonId: string) {
    commitState((current) => {
      const courseState = ensureCourseState(current, courseSlug);
      return {
        ...current,
        courseStates: {
          ...current.courseStates,
          [courseSlug]: {
            ...courseState,
            lastVisitedLessonId: lessonId,
          },
        },
      };
    }, { trackActivity: true });
  }

  function toggleLessonBookmark(courseSlug: string, lessonId: string) {
    commitState((current) => {
      const courseState = ensureCourseState(current, courseSlug);
      const bookmarkedLessonIds = courseState.bookmarkedLessonIds.includes(lessonId)
        ? courseState.bookmarkedLessonIds.filter((id) => id !== lessonId)
        : [...courseState.bookmarkedLessonIds, lessonId];

      return {
        ...current,
        courseStates: {
          ...current.courseStates,
          [courseSlug]: {
            ...courseState,
            bookmarkedLessonIds,
          },
        },
      };
    });
  }

  function addNote(courseSlug: string, lessonId: string, content: string) {
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      return;
    }

    commitState((current) => {
      const courseState = ensureCourseState(current, courseSlug);
      return {
        ...current,
        courseStates: {
          ...current.courseStates,
          [courseSlug]: {
            ...courseState,
            notes: [
              ...courseState.notes,
              {
                id: crypto.randomUUID(),
                lessonId,
                content: trimmedContent,
                createdAt: new Date().toISOString(),
              },
            ],
          },
        },
      };
    }, { trackActivity: true });
  }

  function addDiscussionPost(courseSlug: string, body: string) {
    const trimmedBody = body.trim();
    if (!trimmedBody) {
      return;
    }

    commitState((current) => {
      const courseState = ensureCourseState(current, courseSlug);
      return appendNotification(
        {
          ...current,
          courseStates: {
            ...current.courseStates,
            [courseSlug]: {
              ...courseState,
              discussions: [
                ...courseState.discussions,
                {
                  id: crypto.randomUUID(),
                  body: trimmedBody,
                  createdAt: new Date().toISOString(),
                },
              ],
            },
          },
        },
        {
          type: "engagement",
          title: "Discussion updated",
          body: "Your discussion post has been saved to this course thread.",
          courseSlug,
        },
      );
    }, { trackActivity: true });
  }

  function submitAssessment(courseSlug: string, answers: Record<string, number>) {
    const course = courses.find((item) => item.slug === courseSlug);
    if (!course) {
      return { score: 0, passed: false };
    }

    let result = { score: 0, passed: false };

    commitState((current) => {
      const courseState = ensureCourseState(current, courseSlug);
      const correctAnswers = course.assessment.questions.filter(
        (question) => answers[question.id] === question.correctOption,
      ).length;
      const score = Math.round(
        (correctAnswers / course.assessment.questions.length) * 100,
      );
      const passed = score >= course.assessment.passMark;
      result = { score, passed };

      const hadPassed = hasPassedAssessment(course, courseState);
      let nextState: LearnerPlatformState = {
        ...current,
        courseStates: {
          ...current.courseStates,
          [courseSlug]: {
            ...courseState,
            assessmentAttempts: [
              ...courseState.assessmentAttempts,
              {
                assessmentId: course.assessment.id,
                score,
                passed,
                answers,
                submittedAt: new Date().toISOString(),
              },
            ],
          },
        },
      };

      if (passed && !hadPassed) {
        nextState = appendNotification(nextState, {
          type: "assessment",
          title: "Assessment passed",
          body: `You passed ${course.assessment.title} with a score of ${score}%.`,
          courseSlug,
        });
      }

      const updatedCourseState = nextState.courseStates[courseSlug];
      const becameComplete =
        !updatedCourseState.certificateIssuedAt &&
        isCourseComplete(course, updatedCourseState);

      if (becameComplete) {
        nextState = {
          ...nextState,
          courseStates: {
            ...nextState.courseStates,
            [courseSlug]: {
              ...updatedCourseState,
              certificateIssuedAt: new Date().toISOString(),
            },
          },
        };
        nextState = appendNotification(nextState, {
          type: "achievement",
          title: "Certificate unlocked",
          body: `You finished all lessons in ${course.title}.`,
          courseSlug,
        });
      }

      return nextState;
    }, { trackActivity: true });

    return result;
  }

  function saveReview(courseSlug: string, rating: number, comment: string) {
    commitState((current) => {
      const courseState = ensureCourseState(current, courseSlug);
      return {
        ...current,
        courseStates: {
          ...current.courseStates,
          [courseSlug]: {
            ...courseState,
            review: {
              rating,
              comment: comment.trim(),
              createdAt: new Date().toISOString(),
            },
          },
        },
      };
    });
  }

  function markNotificationRead(notificationId: string) {
    setState((current) => ({
      ...current,
      notifications: current.notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification,
      ),
    }));
  }

  function markAllNotificationsRead() {
    setState((current) => ({
      ...current,
      notifications: current.notifications.map((notification) => ({
        ...notification,
        read: true,
      })),
    }));
  }

  function joinChallenge(challengeId: string) {
    commitState((current) => {
      if (current.joinedChallengeIds.includes(challengeId)) {
        return current;
      }

      return appendNotification(
        {
          ...current,
          joinedChallengeIds: [...current.joinedChallengeIds, challengeId],
        },
        {
          type: "engagement",
          title: "Challenge started",
          body: "Track your progress from the Community tab.",
        },
      );
    });
  }

  function addCommunityPost(body: string, courseSlug?: string) {
    const trimmedBody = body.trim();
    if (!trimmedBody) {
      return;
    }

    commitState((current) => ({
      ...current,
      communityPosts: [
        {
          id: crypto.randomUUID(),
          authorName: user?.firstName ?? user?.fullName ?? "You",
          body: trimmedBody,
          createdAt: new Date().toISOString(),
          courseSlug,
          baseLikeCount: 0,
        },
        ...current.communityPosts,
      ],
    }), { trackActivity: true });
  }

  function toggleLikePost(postId: string) {
    commitState((current) => {
      const liked = current.likedPostIds.includes(postId);
      return {
        ...current,
        likedPostIds: liked
          ? current.likedPostIds.filter((id) => id !== postId)
          : [...current.likedPostIds, postId],
      };
    });
  }

  function joinGroup(groupSlug: string) {
    commitState((current) => {
      if (current.joinedGroupSlugs.includes(groupSlug)) {
        return current;
      }

      return {
        ...current,
        joinedGroupSlugs: [...current.joinedGroupSlugs, groupSlug],
      };
    });
  }

  function leaveGroup(groupSlug: string) {
    commitState((current) => ({
      ...current,
      joinedGroupSlugs: current.joinedGroupSlugs.filter(
        (slug) => slug !== groupSlug,
      ),
    }));
  }

  const enrolledCourses = courses
    .filter((course) => state.courseStates[course.slug])
    .sort((left, right) => {
      const leftState = state.courseStates[left.slug];
      const rightState = state.courseStates[right.slug];

      return (
        Date.parse(getLastLearningActivity(rightState)) -
        Date.parse(getLastLearningActivity(leftState))
      );
    });

  const wishlistCourses = state.wishlistedCourseSlugs
    .map((courseSlug) => courses.find((course) => course.slug === courseSlug))
    .filter((course): course is Course => Boolean(course));

  const achievements = buildAchievements(courses, state);
  const pointsBreakdown = getPointsBreakdown(courses, state);
  const level = getLevel(pointsBreakdown.total);
  const displayName = user?.firstName ?? user?.fullName ?? "You";
  const leaderboard = buildLeaderboard(pointsBreakdown.total, displayName);
  const challenges = getChallengeProgress(courses, state);
  const studyGroups = buildStudyGroups(categories);
  const communityFeed = [...COMMUNITY_POST_SEED, ...state.communityPosts]
    .sort((left, right) => Date.parse(right.createdAt) - Date.parse(left.createdAt))
    .map((post) => ({
      ...post,
      likedByYou: state.likedPostIds.includes(post.id),
      likeCount:
        post.baseLikeCount + (state.likedPostIds.includes(post.id) ? 1 : 0),
    }));

  return (
    <LearnerContext.Provider
      value={{
        isReady,
        state,
        enrolledCourses,
        wishlistCourses,
        notifications: state.notifications,
        unreadNotificationsCount: state.notifications.filter(
          (notification) => !notification.read,
        ).length,
        achievements,
        pointsBreakdown,
        level,
        streak: state.streak,
        challenges,
        leaderboard,
        studyGroups,
        joinedGroupSlugs: state.joinedGroupSlugs,
        communityFeed,
        getCourseState,
        getCourseProgress,
        enrollInCourse,
        toggleWishlist,
        toggleLessonComplete,
        setLastVisitedLesson,
        toggleLessonBookmark,
        addNote,
        addDiscussionPost,
        submitAssessment,
        saveReview,
        markNotificationRead,
        markAllNotificationsRead,
        joinChallenge,
        addCommunityPost,
        toggleLikePost,
        joinGroup,
        leaveGroup,
      }}
    >
      {children}
    </LearnerContext.Provider>
  );
}

export function useLearner() {
  const context = useContext(LearnerContext);

  if (!context) {
    throw new Error("useLearner must be used within a LearnerProvider");
  }

  return context;
}
