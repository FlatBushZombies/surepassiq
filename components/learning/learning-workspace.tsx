"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Award,
  Bookmark,
  BookOpenText,
  CheckCircle2,
  Circle,
  FileText,
  MessageSquare,
  NotebookPen,
  PlayCircle,
  RotateCcw,
  Sparkles,
  Star,
  XCircle,
} from "lucide-react";
import type { Course } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLearner } from "@/components/learning/learner-provider";
import {
  getAssessmentBestAttempt,
  getCourseProgressPercent,
  getLessonCount,
  hasPassedAssessment,
  isCourseComplete,
} from "@/lib/learner-store";

interface LearningWorkspaceProps {
  course: Course;
}

const answerLetters = ["A", "B", "C", "D", "E", "F"];

export function LearningWorkspace({ course }: LearningWorkspaceProps) {
  const {
    addDiscussionPost,
    addNote,
    enrollInCourse,
    getCourseState,
    saveReview,
    setLastVisitedLesson,
    submitAssessment,
    toggleLessonBookmark,
    toggleLessonComplete,
  } = useLearner();
  const [activeLessonId, setActiveLessonId] = useState(course.modules[0]?.lessons[0]?.id);
  const [noteDraft, setNoteDraft] = useState("");
  const [discussionDraft, setDiscussionDraft] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [assessmentResult, setAssessmentResult] = useState<{
    score: number;
    passed: boolean;
  } | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [assessmentQuestionIndex, setAssessmentQuestionIndex] = useState(0);
  const [revealedAssessmentAnswers, setRevealedAssessmentAnswers] = useState<
    Record<string, boolean>
  >({});

  const courseState = getCourseState(course.slug);
  const allLessons = course.modules.flatMap((module) => module.lessons);
  const fallbackLesson = allLessons.find((lesson) => lesson.id === activeLessonId) ?? allLessons[0];
  const selectedLessonId = courseState?.lastVisitedLessonId ?? activeLessonId;
  const selectedLesson =
    allLessons.find((lesson) => lesson.id === selectedLessonId) ?? fallbackLesson;
  const bestAttempt = getAssessmentBestAttempt(courseState, course.assessment.id);
  const progress = getCourseProgressPercent(course, courseState);
  const passedAssessment = hasPassedAssessment(course, courseState);
  const complete = isCourseComplete(course, courseState);
  const notesForSelectedLesson =
    courseState?.notes.filter((note) => note.lessonId === selectedLesson?.id) ?? [];

  const assessmentQuestions = course.assessment.questions;
  const currentAssessmentQuestion =
    assessmentQuestions[assessmentQuestionIndex] ?? assessmentQuestions[0];
  const selectedAssessmentOption = currentAssessmentQuestion
    ? answers[currentAssessmentQuestion.id]
    : undefined;
  const currentAssessmentRevealed = currentAssessmentQuestion
    ? Boolean(revealedAssessmentAnswers[currentAssessmentQuestion.id])
    : false;
  const currentAssessmentCorrect = currentAssessmentQuestion
    ? selectedAssessmentOption === currentAssessmentQuestion.correctOption
    : false;
  const assessmentCorrectCount = assessmentQuestions.filter(
    (question) =>
      revealedAssessmentAnswers[question.id] &&
      answers[question.id] === question.correctOption,
  ).length;
  const assessmentWrongCount = assessmentQuestions.filter(
    (question) =>
      revealedAssessmentAnswers[question.id] &&
      answers[question.id] !== undefined &&
      answers[question.id] !== question.correctOption,
  ).length;
  const assessmentRemainingCount = Math.max(
    assessmentQuestions.length - assessmentCorrectCount - assessmentWrongCount,
    0,
  );
  const isLastAssessmentQuestion =
    assessmentQuestionIndex === assessmentQuestions.length - 1;

  const handleAssessmentOptionSelect = (optionIndex: number) => {
    if (
      !currentAssessmentQuestion ||
      revealedAssessmentAnswers[currentAssessmentQuestion.id] ||
      assessmentResult
    ) {
      return;
    }

    setAnswers((current) => ({
      ...current,
      [currentAssessmentQuestion.id]: optionIndex,
    }));
    setRevealedAssessmentAnswers((current) => ({
      ...current,
      [currentAssessmentQuestion.id]: true,
    }));
  };

  const handleAssessmentNext = () => {
    if (!currentAssessmentQuestion) {
      return;
    }

    if (isLastAssessmentQuestion) {
      setAssessmentResult(submitAssessment(course.slug, answers));
      return;
    }

    setAssessmentQuestionIndex((index) =>
      Math.min(index + 1, assessmentQuestions.length - 1),
    );
  };

  const handleAssessmentRetry = () => {
    setAnswers({});
    setRevealedAssessmentAnswers({});
    setAssessmentQuestionIndex(0);
    setAssessmentResult(null);
  };

  useEffect(() => {
    if (!courseState) {
      enrollInCourse(course.slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course.slug, courseState]);

  if (!selectedLesson) {
    return null;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpenText className="h-4 w-4 text-primary" />
              Course progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>{progress}% complete</span>
                <span className="text-muted-foreground">
                  {courseState?.completedLessonIds.length ?? 0}/{getLessonCount(course)} lessons
                </span>
              </div>
              <Progress value={progress} />
            </div>
            <div className="rounded-xl border border-border bg-muted/40 p-3 text-sm">
              <p className="font-medium text-foreground">Assessment</p>
              <p className="mt-1 text-muted-foreground">
                {passedAssessment
                  ? `Passed at ${bestAttempt?.score ?? 0}%`
                  : `${course.assessment.passMark}% required to unlock completion`}
              </p>
            </div>
            {complete && (
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm">
                <div className="flex items-center gap-2 font-medium text-foreground">
                  <Award className="h-4 w-4 text-primary" />
                  Certificate unlocked
                </div>
                <p className="mt-1 text-muted-foreground">
                  You have completed every lesson and passed the final assessment.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Curriculum</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {course.modules.map((module) => (
              <div key={module.id} className="space-y-2">
                <div>
                  <p className="text-sm font-semibold text-foreground">{module.title}</p>
                  <p className="text-xs text-muted-foreground">{module.summary}</p>
                </div>
                <div className="space-y-2">
                  {module.lessons.map((lesson) => {
                    const completed = courseState?.completedLessonIds.includes(lesson.id);

                    return (
                      <button
                        key={lesson.id}
                        type="button"
                        onClick={() => {
                          setActiveLessonId(lesson.id);
                          setLastVisitedLesson(course.slug, lesson.id);
                        }}
                        className={`flex w-full items-start gap-3 rounded-xl border px-3 py-3 text-left transition ${
                          selectedLessonId === lesson.id
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted/40"
                        }`}
                      >
                        {completed ? (
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        ) : (
                          <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        )}
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground">{lesson.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {lesson.kind} · {lesson.durationMinutes} min
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </aside>

      <div className="space-y-6">
        <Card>
          <CardHeader className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{course.category}</Badge>
              <Badge variant="outline">{course.subcategory}</Badge>
              <Badge variant="outline">{course.level}</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Active lesson</p>
              <CardTitle className="text-2xl">{selectedLesson.title}</CardTitle>
              <p className="text-muted-foreground">{selectedLesson.summary}</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <PlayCircle className="h-4 w-4" />
                {selectedLesson.kind}
              </span>
              <span>{selectedLesson.durationMinutes} minutes</span>
            </div>

            <div className="rounded-2xl border border-border bg-muted/30 p-4">
              <p className="mb-3 text-sm font-semibold text-foreground">Lesson objectives</p>
              <ul className="space-y-2">
                {selectedLesson.objectives.map((objective) => (
                  <li key={objective} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedLesson.media && selectedLesson.media.length > 0 && (
              <div>
                <p className="mb-3 text-sm font-semibold text-foreground">Study material</p>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {selectedLesson.media.map((item) => (
                    <div
                      key={item.imageUrl}
                      className="overflow-hidden rounded-2xl border border-border bg-background"
                    >
                      <div className="relative aspect-square w-full bg-muted/40">
                        <Image
                          src={item.imageUrl}
                          alt={item.caption}
                          fill
                          className="object-contain p-3"
                          sizes="(max-width: 640px) 50vw, 200px"
                        />
                      </div>
                      <p className="border-t border-border p-2 text-center text-xs font-medium text-muted-foreground">
                        {item.caption}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Button onClick={() => toggleLessonComplete(course.slug, selectedLesson.id)}>
                {courseState?.completedLessonIds.includes(selectedLesson.id)
                  ? "Mark as incomplete"
                  : "Mark lesson complete"}
              </Button>
              <Button
                variant="outline"
                onClick={() => toggleLessonBookmark(course.slug, selectedLesson.id)}
              >
                <Bookmark
                  className={`mr-2 h-4 w-4 ${
                    courseState?.bookmarkedLessonIds.includes(selectedLesson.id)
                      ? "fill-current"
                      : ""
                  }`}
                />
                {courseState?.bookmarkedLessonIds.includes(selectedLesson.id)
                  ? "Bookmarked"
                  : "Bookmark lesson"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card id="assessment">
          <CardHeader>
            <CardTitle className="text-xl">{course.assessment.title}</CardTitle>
            <p className="text-sm text-muted-foreground">{course.assessment.description}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {assessmentResult ? (
              <>
                <div
                  className={`rounded-2xl border p-4 text-sm ${
                    assessmentResult.passed
                      ? "border-primary/20 bg-primary/5"
                      : "border-border bg-muted/40"
                  }`}
                >
                  <p className="font-semibold text-foreground">
                    {assessmentResult.passed ? "Assessment passed" : "Keep going"}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    You scored {assessmentResult.score}%. The pass mark is{" "}
                    {course.assessment.passMark}%.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="outline" onClick={handleAssessmentRetry}>
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Try again
                  </Button>
                  {bestAttempt && (
                    <p className="text-sm text-muted-foreground">
                      Best score: {bestAttempt.score}% (
                      {bestAttempt.passed ? "passed" : "not yet"})
                    </p>
                  )}
                </div>
              </>
            ) : currentAssessmentQuestion ? (
              <div>
                <div className="mb-5 flex flex-wrap justify-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-red-950/30 dark:text-red-100">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
                    {assessmentRemainingCount} Remaining
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-amber-950/30 dark:text-amber-100">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    {assessmentWrongCount} Wrong
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-emerald-950/30 dark:text-emerald-100">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                    {assessmentCorrectCount} Correct
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-8">
                  <p className="mb-3 text-sm font-bold text-muted-foreground">
                    Question {assessmentQuestionIndex + 1} of{" "}
                    {assessmentQuestions.length}
                  </p>
                  <h4 className="text-xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-2xl">
                    {currentAssessmentQuestion.prompt}
                  </h4>

                  {currentAssessmentQuestion.imageUrl && (
                    <div className="relative mx-auto mt-4 aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                      <Image
                        src={currentAssessmentQuestion.imageUrl}
                        alt="Question reference"
                        fill
                        className="object-contain p-4"
                        sizes="220px"
                      />
                    </div>
                  )}

                  <div className="mt-6 space-y-3">
                    {currentAssessmentQuestion.options.map((option, optionIndex) => {
                      const selected = selectedAssessmentOption === optionIndex;
                      const correct =
                        optionIndex === currentAssessmentQuestion.correctOption;
                      const wrongSelection =
                        currentAssessmentRevealed && selected && !currentAssessmentCorrect;
                      const showCorrect = currentAssessmentRevealed && correct;
                      const mutedAfterReveal =
                        currentAssessmentRevealed && !selected && !correct;

                      const optionClasses = showCorrect
                        ? "border-emerald-500 bg-emerald-50 text-slate-800 dark:border-emerald-400 dark:bg-emerald-950/40 dark:text-emerald-50"
                        : wrongSelection
                          ? "border-red-500 bg-red-50 text-slate-800 dark:border-red-400 dark:bg-red-950/40 dark:text-red-50"
                          : mutedAfterReveal
                            ? "border-slate-100 bg-white text-slate-400 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-500"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-200 dark:hover:border-slate-700";

                      const letterClasses = showCorrect
                        ? "bg-emerald-600 text-white"
                        : wrongSelection
                          ? "bg-red-600 text-white"
                          : "bg-slate-50 text-slate-400 dark:bg-slate-900 dark:text-slate-500";

                      return (
                        <button
                          key={option}
                          type="button"
                          disabled={currentAssessmentRevealed}
                          onClick={() => handleAssessmentOptionSelect(optionIndex)}
                          className={`flex min-h-16 w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left text-sm font-bold transition sm:min-h-20 sm:text-base ${optionClasses}`}
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-extrabold sm:h-10 sm:w-10 ${letterClasses}`}
                          >
                            {answerLetters[optionIndex] ?? optionIndex + 1}
                          </span>
                          <span className="min-w-0 flex-1 leading-snug">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {currentAssessmentRevealed && (
                    <div
                      className={`mt-4 rounded-2xl border p-5 ${
                        currentAssessmentCorrect
                          ? "border-emerald-200 bg-emerald-50 text-slate-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-50"
                          : "border-red-200 bg-red-50 text-slate-900 dark:border-red-900 dark:bg-red-950/30 dark:text-red-50"
                      }`}
                    >
                      <p
                        className={`flex items-center gap-2 text-base font-extrabold ${
                          currentAssessmentCorrect ? "text-emerald-700" : "text-red-600"
                        }`}
                      >
                        {currentAssessmentCorrect ? (
                          <>
                            <CheckCircle2 className="h-5 w-5" />
                            Correct
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5" />
                            Incorrect
                          </>
                        )}
                      </p>
                      <p className="mt-3 text-sm leading-relaxed sm:text-base">
                        {currentAssessmentQuestion.explanation}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(180px,0.6fr)]">
                      <Button
                        variant="outline"
                        disabled={!currentAssessmentRevealed}
                        className="h-14 justify-start rounded-2xl border-slate-200 px-5 text-left text-sm font-bold text-slate-700 dark:border-slate-800 dark:text-slate-200"
                      >
                        <Sparkles className="h-5 w-5 text-red-600" />
                        Correct Answer Explanation
                      </Button>
                      <Button
                        disabled={!currentAssessmentRevealed}
                        onClick={handleAssessmentNext}
                        className="h-14 rounded-2xl bg-red-600 text-base font-extrabold text-white hover:bg-red-700"
                      >
                        {isLastAssessmentQuestion ? "Submit assessment" : "Next"}
                      </Button>
                    </div>
                  </div>
                </div>

                {bestAttempt && (
                  <p className="mt-4 text-center text-sm text-muted-foreground">
                    Best score: {bestAttempt.score}% (
                    {bestAttempt.passed ? "passed" : "not yet"})
                  </p>
                )}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Resources and review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-3 md:grid-cols-2">
              {course.resources.map((resource) => (
                <div
                  key={resource.id}
                  className="overflow-hidden rounded-2xl border border-border bg-muted/30"
                >
                  {resource.imageUrl && (
                    <div className="relative h-32 w-full">
                      <Image
                        src={resource.imageUrl}
                        alt={resource.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      <p className="font-medium text-foreground">{resource.title}</p>
                    </div>
                    <p className="mb-2 text-sm text-muted-foreground">{resource.description}</p>
                    <Badge variant="outline">{resource.kind}</Badge>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-[120px_minmax(0,1fr)]">
              <div className="space-y-2">
                <Label htmlFor="review-rating">Rating</Label>
                <Input
                  id="review-rating"
                  type="number"
                  min={1}
                  max={5}
                  value={reviewRating}
                  onChange={(event) => setReviewRating(Number(event.target.value))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="review-comment">Reflection or review</Label>
                <Textarea
                  id="review-comment"
                  value={reviewComment}
                  onChange={(event) => setReviewComment(event.target.value)}
                  placeholder="Capture what you learned, where you struggled, or how you will apply this course."
                />
              </div>
            </div>

            <Button onClick={() => saveReview(course.slug, reviewRating, reviewComment)}>
              <Star className="mr-2 h-4 w-4" />
              Save review
            </Button>
          </CardContent>
        </Card>
      </div>

      <aside className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <NotebookPen className="h-4 w-4 text-primary" />
              Lesson notes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={noteDraft}
              onChange={(event) => setNoteDraft(event.target.value)}
              placeholder="Write your note for this lesson."
            />
            <Button
              className="w-full"
              onClick={() => {
                addNote(course.slug, selectedLesson.id, noteDraft);
                setNoteDraft("");
              }}
            >
              Save note
            </Button>
            <div className="space-y-3">
              {notesForSelectedLesson.length > 0 ? (
                notesForSelectedLesson.map((note) => (
                  <div key={note.id} className="rounded-xl border border-border bg-muted/30 p-3 text-sm">
                    <p className="text-foreground">{note.content}</p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {new Date(note.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Notes for this lesson will appear here once you save them.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MessageSquare className="h-4 w-4 text-primary" />
              Course discussion
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={discussionDraft}
              onChange={(event) => setDiscussionDraft(event.target.value)}
              placeholder="Ask a question, share an insight, or post a reflection."
            />
            <Button
              className="w-full"
              onClick={() => {
                addDiscussionPost(course.slug, discussionDraft);
                setDiscussionDraft("");
              }}
            >
              Post to discussion
            </Button>
            <div className="space-y-3">
              {(courseState?.discussions ?? []).length > 0 ? (
                courseState?.discussions
                  .slice()
                  .reverse()
                  .map((post) => (
                    <div key={post.id} className="rounded-xl border border-border bg-muted/30 p-3 text-sm">
                      <p className="text-foreground">{post.body}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {new Date(post.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Use this space to collect peer questions and coach-style reflections.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
