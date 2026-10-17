"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  AlertTriangle,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  HelpCircle,
  PlayCircle,
  RotateCcw,
  Signpost,
  Sparkles,
  Trophy,
  XCircle,
} from "lucide-react";
import type { Course } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseCurriculum } from "@/components/courses/course-curriculum";
import { DrivingRoadSigns } from "@/components/courses/driving-road-signs";
import { useLearner } from "@/components/learning/learner-provider";

interface DrivingCourseNavigationProps {
  course: Course;
}

type DrivingTabType = "road-signs" | "lessons" | "practise-test" | "mock-test";

const answerLetters = ["A", "B", "C", "D", "E", "F"];
const MOCK_TEST_SECONDS = 8 * 60;

export function DrivingCourseNavigation({ course }: DrivingCourseNavigationProps) {
  const [activeTab, setActiveTab] = useState<DrivingTabType>("road-signs");
  const { state } = useLearner();
  const isEnrolled = Boolean(state.courseStates[course.slug]);

  // Practise Test state (untimed, immediate feedback)
  const [practiseQuestionIndex, setPractiseQuestionIndex] = useState(0);
  const [practiseAnswers, setPractiseAnswers] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Mock Test state (timed, 8 minutes)
  const [mockTestAnswers, setMockTestAnswers] = useState<Record<string, number>>({});
  const [isMockTestRunning, setIsMockTestRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(MOCK_TEST_SECONDS);
  const [mockTestSubmitted, setMockTestSubmitted] = useState(false);
  const [mockTestScore, setMockTestScore] = useState<number | null>(null);

  const handleCompleteMockTest = useCallback(() => {
    setIsMockTestRunning(false);
    setMockTestSubmitted(true);
    let correctCount = 0;
    const questions = course.assessment.questions;
    questions.forEach((q) => {
      if (mockTestAnswers[q.id] === q.correctOption) {
        correctCount += 1;
      }
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    setMockTestScore(finalScore);
  }, [course.assessment.questions, mockTestAnswers]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isMockTestRunning && timeLeft > 0 && !mockTestSubmitted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isMockTestRunning && !mockTestSubmitted) {
      queueMicrotask(handleCompleteMockTest);
    }
    return () => clearInterval(timer);
  }, [handleCompleteMockTest, isMockTestRunning, timeLeft, mockTestSubmitted]);

  const startMockTest = () => {
    setIsMockTestRunning(true);
    setMockTestSubmitted(false);
    setTimeLeft(MOCK_TEST_SECONDS);
    setMockTestAnswers({});
    setMockTestScore(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const questions = course.assessment.questions;
  const currentQuestion = questions[practiseQuestionIndex] ?? questions[0];
  const selectedOption = currentQuestion ? practiseAnswers[currentQuestion.id] : undefined;
  const currentRevealed = currentQuestion
    ? Boolean(revealedAnswers[currentQuestion.id])
    : false;
  const currentCorrect = currentQuestion
    ? selectedOption === currentQuestion.correctOption
    : false;
  const correctCount = questions.filter(
    (question) =>
      revealedAnswers[question.id] && practiseAnswers[question.id] === question.correctOption,
  ).length;
  const wrongCount = questions.filter(
    (question) =>
      revealedAnswers[question.id] &&
      practiseAnswers[question.id] !== undefined &&
      practiseAnswers[question.id] !== question.correctOption,
  ).length;
  const remainingCount = Math.max(questions.length - correctCount - wrongCount, 0);

  const handleOptionSelect = (optionIndex: number) => {
    if (!currentQuestion || revealedAnswers[currentQuestion.id]) {
      return;
    }

    setPractiseAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));
    setRevealedAnswers((prev) => ({ ...prev, [currentQuestion.id]: true }));
  };

  const handleNext = () => {
    if (!questions.length) {
      return;
    }

    if (remainingCount === 0 && currentRevealed) {
      setPractiseQuestionIndex(0);
      setPractiseAnswers({});
      setRevealedAnswers({});
      return;
    }

    const nextUnansweredIndex = questions.findIndex(
      (question, index) => index > practiseQuestionIndex && !revealedAnswers[question.id],
    );
    const firstUnansweredIndex = questions.findIndex((question) => !revealedAnswers[question.id]);

    if (firstUnansweredIndex < 0) {
      setPractiseQuestionIndex(0);
      return;
    }

    setPractiseQuestionIndex(nextUnansweredIndex >= 0 ? nextUnansweredIndex : firstUnansweredIndex);
  };

  return (
    <div className="w-full space-y-6">
      {/* Tab bar — hidden entirely while a Mock Test is running */}
      {!isMockTestRunning && (
        <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setActiveTab("road-signs")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                activeTab === "road-signs"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Signpost className="h-4 w-4" />
              <span>Road Signs</span>
            </button>

            <button
              onClick={() => setActiveTab("lessons")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                activeTab === "lessons"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Lessons</span>
              <Badge
                variant="outline"
                className={`ml-1 text-xs ${
                  activeTab === "lessons"
                    ? "border-primary-foreground/30 text-primary-foreground"
                    : "border-border text-muted-foreground"
                }`}
              >
                {course.modules.length}
              </Badge>
            </button>

            <button
              onClick={() => setActiveTab("practise-test")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                activeTab === "practise-test"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <HelpCircle className="h-4 w-4" />
              <span>Practise Test</span>
            </button>

            <button
              onClick={() => setActiveTab("mock-test")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                activeTab === "mock-test"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>Mock Test</span>
            </button>
          </div>
        </div>
      )}

      {/* ROAD SIGNS */}
      {activeTab === "road-signs" && !isMockTestRunning && <DrivingRoadSigns />}

      {/* LESSONS */}
      {activeTab === "lessons" && !isMockTestRunning && (
        <CourseCurriculum course={course} isEnrolled={isEnrolled} />
      )}

      {/* PRACTISE TEST (untimed, immediate feedback — same UI as before) */}
      {activeTab === "practise-test" && !isMockTestRunning && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
              <div>
                <Badge variant="secondary" className="mb-2">Practice Mode</Badge>
                <h3 className="text-2xl font-bold text-card-foreground">Course Practise Test Bank</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Test your knowledge with immediate feedback and detailed rationale for every answer.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setPractiseQuestionIndex(0);
                  setPractiseAnswers({});
                  setRevealedAnswers({});
                }}
                className="gap-2 shrink-0"
              >
                <RotateCcw className="h-4 w-4" /> Reset Practice
              </Button>
            </div>

            {currentQuestion && (
              <div className="mx-auto mt-6 max-w-5xl">
                <div className="mb-5 flex flex-wrap justify-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-red-950/30 dark:text-red-100">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
                    {remainingCount} Remaining
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-amber-950/30 dark:text-amber-100">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    {wrongCount} Wrong
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-emerald-950/30 dark:text-emerald-100">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                    {correctCount} Correct
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-8">
                  <p className="mb-3 text-sm font-bold text-muted-foreground">
                    Question {practiseQuestionIndex + 1} of {questions.length}
                  </p>
                  <h4 className="text-2xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-3xl">
                    {currentQuestion.prompt}
                  </h4>

                  {currentQuestion.imageUrl && (
                    <div className="relative mx-auto mt-5 aspect-square w-full max-w-[240px] overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
                      <Image
                        src={currentQuestion.imageUrl}
                        alt="Question reference"
                        fill
                        className="object-contain p-4"
                        sizes="240px"
                      />
                    </div>
                  )}

                  <div className="mt-8 space-y-3.5">
                    {currentQuestion.options.map((option, optionIndex) => {
                      const selected = selectedOption === optionIndex;
                      const correct = optionIndex === currentQuestion.correctOption;
                      const wrongSelection = currentRevealed && selected && !currentCorrect;
                      const showCorrect = currentRevealed && correct;
                      const mutedAfterReveal = currentRevealed && !selected && !correct;

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
                          disabled={currentRevealed}
                          onClick={() => handleOptionSelect(optionIndex)}
                          className={`flex min-h-20 w-full items-center gap-4 rounded-[20px] border px-5 py-4 text-left text-base font-bold transition sm:min-h-24 sm:gap-5 sm:px-6 sm:text-lg ${optionClasses}`}
                        >
                          <span
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-extrabold sm:h-12 sm:w-12 ${letterClasses}`}
                          >
                            {answerLetters[optionIndex] ?? optionIndex + 1}
                          </span>
                          <span className="min-w-0 flex-1 leading-snug">{option}</span>
                        </button>
                      );
                    })}
                  </div>

                  {currentRevealed && (
                    <div
                      className={`mt-4 rounded-[20px] border p-5 ${
                        currentCorrect
                          ? "border-emerald-200 bg-emerald-50 text-slate-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-50"
                          : "border-red-200 bg-red-50 text-slate-900 dark:border-red-900 dark:bg-red-950/30 dark:text-red-50"
                      }`}
                    >
                      <p
                        className={`flex items-center gap-2 text-base font-extrabold ${
                          currentCorrect ? "text-emerald-700" : "text-red-600"
                        }`}
                      >
                        {currentCorrect ? (
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
                      <p className="mt-3 max-w-3xl text-sm leading-relaxed sm:text-base">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 rounded-[20px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(180px,0.6fr)]">
                      <Button
                        variant="outline"
                        disabled={!currentRevealed}
                        className="h-14 justify-start rounded-2xl border-slate-200 px-5 text-left text-base font-bold text-slate-700 dark:border-slate-800 dark:text-slate-200"
                      >
                        <Sparkles className="h-5 w-5 text-red-600" />
                        Correct Answer Explanation
                      </Button>
                      <Button
                        disabled={!currentRevealed}
                        onClick={handleNext}
                        className="h-14 rounded-2xl bg-red-600 text-base font-extrabold text-white hover:bg-red-700"
                      >
                        {remainingCount === 0 ? "Restart" : "Next"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOCK TEST (timed, 8 minutes — same per-question UI as before) */}
      {activeTab === "mock-test" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
              <div>
                <Badge variant="destructive" className="mb-2">Exam Simulator</Badge>
                <h3 className="text-2xl font-bold text-card-foreground">Mock Test</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Simulate real exam conditions under a strict 8-minute countdown timer. Score at least {course.assessment.passMark}% to qualify.
                </p>
              </div>

              {isMockTestRunning && (
                <div className="flex items-center gap-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 px-4 py-2.5 text-amber-600 dark:text-amber-400">
                  <Clock className="h-5 w-5 animate-pulse" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider">Time Remaining</p>
                    <p className="text-xl font-bold font-mono">{formatTime(timeLeft)}</p>
                  </div>
                </div>
              )}
            </div>

            {!isMockTestRunning && !mockTestSubmitted && (
              <div className="mt-8 text-center py-10 rounded-2xl border border-dashed border-border bg-muted/20 space-y-4">
                <Trophy className="mx-auto h-12 w-12 text-primary" />
                <h4 className="text-xl font-bold text-card-foreground">Ready for the Mock Test?</h4>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  You will have 8 minutes to complete {course.assessment.questions.length} questions. Once started, the timer cannot be paused and no other tabs will be shown.
                </p>
                <Button size="lg" onClick={startMockTest} className="px-8 font-bold gap-2">
                  <PlayCircle className="h-5 w-5" /> Start Mock Test
                </Button>
              </div>
            )}

            {isMockTestRunning && !mockTestSubmitted && (
              <div className="mt-6 space-y-6">
                {course.assessment.questions.map((q, idx) => (
                  <div key={q.id} className="rounded-2xl border border-border p-5 bg-card">
                    <h4 className="text-base font-semibold text-card-foreground">
                      {idx + 1}. {q.prompt}
                    </h4>
                    {q.imageUrl && (
                      <div className="relative mt-3 aspect-square w-full max-w-[160px] overflow-hidden rounded-xl border border-border bg-muted/40">
                        <Image
                          src={q.imageUrl}
                          alt="Question reference"
                          fill
                          className="object-contain p-3"
                          sizes="160px"
                        />
                      </div>
                    )}
                    <div className="mt-4 space-y-2.5">
                      {q.options.map((opt, optIdx) => (
                        <label
                          key={opt}
                          onClick={() =>
                            setMockTestAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                          }
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition ${
                            mockTestAnswers[q.id] === optIdx
                              ? "border-primary bg-primary/10 text-primary font-medium"
                              : "border-border bg-background hover:bg-muted/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`mock-${q.id}`}
                            checked={mockTestAnswers[q.id] === optIdx}
                            onChange={() => {}}
                            className="mt-0.5"
                          />
                          <span>{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex justify-end pt-4 border-t border-border">
                  <Button size="lg" onClick={handleCompleteMockTest} className="font-bold gap-2">
                    <CheckCircle2 className="h-5 w-5" /> Submit Mock Test
                  </Button>
                </div>
              </div>
            )}

            {mockTestSubmitted && mockTestScore !== null && (
              <div className="mt-6 space-y-6">
                <div
                  className={`rounded-2xl border p-6 text-center space-y-3 ${
                    mockTestScore >= course.assessment.passMark
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100"
                      : "border-rose-500/40 bg-rose-500/10 text-rose-950 dark:text-rose-100"
                  }`}
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-md">
                    {mockTestScore >= course.assessment.passMark ? (
                      <Award className="h-8 w-8 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="h-8 w-8 text-rose-500" />
                    )}
                  </div>
                  <h4 className="text-2xl font-bold">
                    {mockTestScore >= course.assessment.passMark
                      ? "Congratulations! You Passed!"
                      : "Assessment Score Below Pass Mark"}
                  </h4>
                  <p className="text-3xl font-extrabold font-mono">{mockTestScore}% Score</p>
                  <p className="text-sm max-w-md mx-auto opacity-90">
                    {mockTestScore >= course.assessment.passMark
                      ? `Great job! You exceeded the required ${course.assessment.passMark}% pass mark under exam conditions.`
                      : `The pass threshold is ${course.assessment.passMark}%. Review the course lessons and try the Mock Test again.`}
                  </p>
                  <div className="pt-2">
                    <Button onClick={startMockTest} variant="outline" className="font-semibold gap-2">
                      <RotateCcw className="h-4 w-4" /> Retake Mock Test
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
