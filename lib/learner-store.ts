import type { Course } from "@/constants";

export interface LearnerNote {
  id: string;
  lessonId: string;
  content: string;
  createdAt: string;
}

export interface LearnerDiscussionPost {
  id: string;
  body: string;
  createdAt: string;
}

export interface LearnerReview {
  rating: number;
  comment: string;
  createdAt: string;
}

export interface AssessmentAttempt {
  assessmentId: string;
  score: number;
  passed: boolean;
  answers: Record<string, number>;
  submittedAt: string;
}

export interface LearnerCourseState {
  courseSlug: string;
  enrolledAt: string;
  completedLessonIds: string[];
  bookmarkedLessonIds: string[];
  notes: LearnerNote[];
  discussions: LearnerDiscussionPost[];
  assessmentAttempts: AssessmentAttempt[];
  review?: LearnerReview;
  certificateIssuedAt?: string;
  lastVisitedLessonId?: string;
}

export interface LearnerNotification {
  id: string;
  type: "course" | "assessment" | "achievement" | "engagement";
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  courseSlug?: string;
}

export interface LearnerPlatformState {
  wishlistedCourseSlugs: string[];
  courseStates: Record<string, LearnerCourseState>;
  notifications: LearnerNotification[];
}

export interface LearnerAchievement {
  id: string;
  title: string;
  description: string;
  icon: "star" | "trophy" | "target" | "award";
  unlocked: boolean;
  unlockedAt?: string;
}

export const LEARNER_STORAGE_KEY = "surepassiq.learner-state";

export function createDefaultLearnerState(): LearnerPlatformState {
  return {
    wishlistedCourseSlugs: [],
    courseStates: {},
    notifications: [],
  };
}

export function ensureCourseState(
  state: LearnerPlatformState,
  courseSlug: string,
): LearnerCourseState {
  return (
    state.courseStates[courseSlug] ?? {
      courseSlug,
      enrolledAt: new Date().toISOString(),
      completedLessonIds: [],
      bookmarkedLessonIds: [],
      notes: [],
      discussions: [],
      assessmentAttempts: [],
    }
  );
}

export function getLessonCount(course: Course) {
  return course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0,
  );
}

export function getAssessmentBestAttempt(
  courseState: LearnerCourseState | undefined,
  assessmentId: string,
) {
  if (!courseState) {
    return undefined;
  }

  return [...courseState.assessmentAttempts]
    .filter((attempt) => attempt.assessmentId === assessmentId)
    .sort((left, right) => right.score - left.score)[0];
}

export function hasPassedAssessment(
  course: Course,
  courseState: LearnerCourseState | undefined,
) {
  return Boolean(
    getAssessmentBestAttempt(courseState, course.assessment.id)?.passed,
  );
}

export function isCourseComplete(
  course: Course,
  courseState: LearnerCourseState | undefined,
) {
  if (!courseState) {
    return false;
  }

  return (
    courseState.completedLessonIds.length >= getLessonCount(course) &&
    hasPassedAssessment(course, courseState)
  );
}

export function getCourseProgressPercent(
  course: Course,
  courseState: LearnerCourseState | undefined,
) {
  if (!courseState) {
    return 0;
  }

  const totalUnits = getLessonCount(course) + 1;
  const completedUnits =
    courseState.completedLessonIds.length +
    (hasPassedAssessment(course, courseState) ? 1 : 0);

  return Math.round((completedUnits / totalUnits) * 100);
}

export function getLastLearningActivity(courseState: LearnerCourseState) {
  return (
    courseState.assessmentAttempts.at(-1)?.submittedAt ??
    courseState.notes.at(-1)?.createdAt ??
    courseState.discussions.at(-1)?.createdAt ??
    courseState.enrolledAt
  );
}

export function buildAchievements(
  courses: Course[],
  state: LearnerPlatformState,
): LearnerAchievement[] {
  const completedCourses = courses.filter((course) =>
    isCourseComplete(course, state.courseStates[course.slug]),
  );
  const passedAssessments = courses.filter((course) =>
    hasPassedAssessment(course, state.courseStates[course.slug]),
  );
  const bookmarkedLessons = Object.values(state.courseStates).reduce(
    (total, courseState) => total + courseState.bookmarkedLessonIds.length,
    0,
  );

  return [
    {
      id: "first-course",
      title: "First Finish",
      description: "Complete your first course and unlock your certificate.",
      icon: "star",
      unlocked: completedCourses.length >= 1,
      unlockedAt: completedCourses[0]
        ? state.courseStates[completedCourses[0].slug]?.certificateIssuedAt
        : undefined,
    },
    {
      id: "assessment-pro",
      title: "Assessment Ready",
      description: "Pass two course assessments with a strong score.",
      icon: "target",
      unlocked: passedAssessments.length >= 2,
      unlockedAt: passedAssessments[1]
        ? getAssessmentBestAttempt(
            state.courseStates[passedAssessments[1].slug],
            passedAssessments[1].assessment.id,
          )?.submittedAt
        : undefined,
    },
    {
      id: "curious-learner",
      title: "Curious Learner",
      description: "Bookmark three lessons so you can revisit important ideas later.",
      icon: "award",
      unlocked: bookmarkedLessons >= 3,
      unlockedAt: bookmarkedLessons >= 3 ? new Date().toISOString() : undefined,
    },
    {
      id: "momentum-builder",
      title: "Momentum Builder",
      description: "Complete two courses across different skill areas.",
      icon: "trophy",
      unlocked: completedCourses.length >= 2,
      unlockedAt: completedCourses[1]
        ? state.courseStates[completedCourses[1].slug]?.certificateIssuedAt
        : undefined,
    },
  ];
}
