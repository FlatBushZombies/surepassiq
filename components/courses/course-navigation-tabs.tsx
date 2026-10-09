"use client";

import { useCallback, useEffect, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  PlayCircle,
  RotateCcw,
  Sparkles,
  Trophy,
  Wrench,
  XCircle,
  Save,
  CheckSquare,
  Square,
  AlertTriangle,
  Award,
} from "lucide-react";
import type { Course, PracticalLab } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface CourseNavigationTabsProps {
  course: Course;
}

type TabType = "modules" | "mock-tests" | "timed-test" | "practical-labs" | "resources";

const answerLetters = ["A", "B", "C", "D", "E", "F"];

export function CourseNavigationTabs({ course }: CourseNavigationTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>("modules");

  // Mock Test State
  const [mockQuestionIndex, setMockQuestionIndex] = useState(0);
  const [mockAnswers, setMockAnswers] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Timed Test State
  const [timedAnswers, setTimedAnswers] = useState<Record<string, number>>({});
  const [isTimedRunning, setIsTimedRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes default
  const [timedSubmitted, setTimedSubmitted] = useState(false);
  const [timedScore, setTimedScore] = useState<number | null>(null);

  // Practical Labs State
  const [checkedTools, setCheckedTools] = useState<Record<string, boolean>>({});
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  // Notes State
  const [userNotes, setUserNotes] = useState<string>("");
  const [savedNotes, setSavedNotes] = useState<string[]>([]);
  const [noteSavedFeedback, setNoteSavedFeedback] = useState(false);

  const handleCompleteTimedExam = useCallback(() => {
    setIsTimedRunning(false);
    setTimedSubmitted(true);
    let correctCount = 0;
    const questions = course.assessment.questions;
    questions.forEach((q) => {
      if (timedAnswers[q.id] === q.correctOption) {
        correctCount += 1;
      }
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    setTimedScore(finalScore);
  }, [course.assessment.questions, timedAnswers]);

  // Timer Effect for Timed Exam
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTimedRunning && timeLeft > 0 && !timedSubmitted) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimedRunning && !timedSubmitted) {
      queueMicrotask(handleCompleteTimedExam);
    }
    return () => clearInterval(timer);
  }, [handleCompleteTimedExam, isTimedRunning, timeLeft, timedSubmitted]);

  const startTimedExam = () => {
    setIsTimedRunning(true);
    setTimedSubmitted(false);
    setTimeLeft(900);
    setTimedAnswers({});
    setTimedScore(null);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const toggleToolCheck = (toolId: string) => {
    setCheckedTools((prev) => ({ ...prev, [toolId]: !prev[toolId] }));
  };

  const toggleStepCheck = (stepId: string) => {
    setCheckedSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  const handleSaveNote = () => {
    if (!userNotes.trim()) return;
    setSavedNotes((prev) => [userNotes.trim(), ...prev]);
    setUserNotes("");
    setNoteSavedFeedback(true);
    setTimeout(() => setNoteSavedFeedback(false), 2500);
  };

  // Generate fallback practical lab if none provided
  const labs: PracticalLab[] = course.practicalLabs || [
    {
      id: "lab-1",
      title: `${course.title} - Step-by-Step Hands-On Practical`,
      durationMinutes: 45,
      description: `Complete this practical workshop exercise to demonstrate mastery in ${course.subcategory || course.title}.`,
      toolsNeeded: [
        "Primary Workbook & Checklist",
        "Required Industry Software / Safety Gear",
        "Diagnostic & Verification Tools",
        "Work Surface & Measurement Device",
      ],
      steps: [
        "Set up workspace and perform safety & baseline checklist review.",
        "Execute initial diagnostic and measure specifications according to guidelines.",
        "Perform core procedure applying techniques learned in Modules 1 & 2.",
        "Inspect outcome, verify tolerance/correctness, and document results.",
      ],
      safetyTips: [
        "Always wear appropriate personal protective equipment (PPE) when working with physical tools.",
        "Double-check configurations before applying full load or power.",
      ],
    },
  ];

  const mockQuestions = course.assessment.questions;
  const currentMockQuestion = mockQuestions[mockQuestionIndex] ?? mockQuestions[0];
  const mockSelectedOption = currentMockQuestion
    ? mockAnswers[currentMockQuestion.id]
    : undefined;
  const currentMockRevealed = currentMockQuestion
    ? Boolean(revealedAnswers[currentMockQuestion.id])
    : false;
  const currentMockCorrect = currentMockQuestion
    ? mockSelectedOption === currentMockQuestion.correctOption
    : false;
  const mockCorrectCount = mockQuestions.filter(
    (question) =>
      revealedAnswers[question.id] &&
      mockAnswers[question.id] === question.correctOption,
  ).length;
  const mockWrongCount = mockQuestions.filter(
    (question) =>
      revealedAnswers[question.id] &&
      mockAnswers[question.id] !== undefined &&
      mockAnswers[question.id] !== question.correctOption,
  ).length;
  const mockRemainingCount = Math.max(
    mockQuestions.length - mockCorrectCount - mockWrongCount,
    0,
  );

  const handleMockOptionSelect = (optionIndex: number) => {
    if (!currentMockQuestion || revealedAnswers[currentMockQuestion.id]) {
      return;
    }

    setMockAnswers((prev) => ({
      ...prev,
      [currentMockQuestion.id]: optionIndex,
    }));
    setRevealedAnswers((prev) => ({
      ...prev,
      [currentMockQuestion.id]: true,
    }));
  };

  const handleMockNext = () => {
    if (!mockQuestions.length) {
      return;
    }

    if (mockRemainingCount === 0 && currentMockRevealed) {
      setMockQuestionIndex(0);
      setMockAnswers({});
      setRevealedAnswers({});
      return;
    }

    const nextUnansweredIndex = mockQuestions.findIndex(
      (question, index) => index > mockQuestionIndex && !revealedAnswers[question.id],
    );
    const firstUnansweredIndex = mockQuestions.findIndex(
      (question) => !revealedAnswers[question.id],
    );

    if (firstUnansweredIndex < 0) {
      setMockQuestionIndex(0);
      return;
    }

    setMockQuestionIndex(
      nextUnansweredIndex >= 0 ? nextUnansweredIndex : firstUnansweredIndex,
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Universal Course Navigation Tabs */}
      <div className="rounded-2xl border border-border bg-card p-2 shadow-sm">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setActiveTab("modules")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "modules"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Modules & Lessons</span>
            <Badge
              variant="outline"
              className={`ml-1 text-xs ${
                activeTab === "modules"
                  ? "border-primary-foreground/30 text-primary-foreground"
                  : "border-border text-muted-foreground"
              }`}
            >
              {course.modules.length}
            </Badge>
          </button>

          <button
            onClick={() => setActiveTab("mock-tests")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "mock-tests"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <HelpCircle className="h-4 w-4" />
            <span>Mock Tests</span>
            <Badge
              variant="outline"
              className={`ml-1 text-xs ${
                activeTab === "mock-tests"
                  ? "border-primary-foreground/30 text-primary-foreground"
                  : "border-border text-muted-foreground"
              }`}
            >
              Practice
            </Badge>
          </button>

          <button
            onClick={() => setActiveTab("timed-test")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "timed-test"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Clock className="h-4 w-4" />
            <span>Timed Test</span>
            <Badge
              variant="outline"
              className={`ml-1 text-xs ${
                activeTab === "timed-test"
                  ? "border-primary-foreground/30 text-primary-foreground"
                  : "border-border text-muted-foreground"
              }`}
            >
              Exam
            </Badge>
          </button>

          <button
            onClick={() => setActiveTab("practical-labs")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "practical-labs"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <Wrench className="h-4 w-4" />
            <span>Practical Labs</span>
            <Badge
              variant="outline"
              className={`ml-1 text-xs ${
                activeTab === "practical-labs"
                  ? "border-primary-foreground/30 text-primary-foreground"
                  : "border-border text-muted-foreground"
              }`}
            >
              Hands-On
            </Badge>
          </button>

          <button
            onClick={() => setActiveTab("resources")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
              activeTab === "resources"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
          >
            <FileText className="h-4 w-4" />
            <span>Resources & Notes</span>
          </button>
        </div>
      </div>

      {/* TAB 1: MODULES & LESSONS */}
      {activeTab === "modules" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-2xl font-bold text-card-foreground">Course Modules & Curriculum</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Work through the structured learning modules below. Each module includes video lessons, interactive readings, and knowledge checks.
            </p>

            <div className="mt-6 space-y-5">
              {course.modules.map((module, idx) => (
                <div key={module.id} className="rounded-2xl border border-border p-5 bg-background/50">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        Module {idx + 1}
                      </span>
                      <h4 className="text-lg font-bold text-card-foreground">{module.title}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{module.summary}</p>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {module.lessons.length} Lessons
                    </Badge>
                  </div>

                  <div className="mt-4 space-y-2">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border border-border/80 bg-card p-3.5 transition hover:border-slate-300 dark:hover:border-slate-700"
                      >
                        <div className="flex items-start gap-3">
                          <PlayCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <div>
                            <p className="text-sm font-semibold text-card-foreground">{lesson.title}</p>
                            <p className="text-xs text-muted-foreground">{lesson.summary}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                          <span className="text-xs font-medium text-muted-foreground">
                            {lesson.kind} · {lesson.durationMinutes} mins
                          </span>
                          <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg">
                            Start Lesson
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MOCK TESTS (PRACTICE) */}
      {activeTab === "mock-tests" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
              <div>
                <Badge variant="secondary" className="mb-2">Practice Mode</Badge>
                <h3 className="text-2xl font-bold text-card-foreground">Course Mock Test Bank</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Test your knowledge with immediate feedback and detailed rationale for every answer.
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setMockQuestionIndex(0);
                  setMockAnswers({});
                  setRevealedAnswers({});
                }}
                className="gap-2 shrink-0"
              >
                <RotateCcw className="h-4 w-4" /> Reset Practice
              </Button>
            </div>

            {currentMockQuestion && (
              <div className="mx-auto mt-6 max-w-5xl">
                <div className="mb-5 flex flex-wrap justify-center gap-3">
                  <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-red-950/30 dark:text-red-100">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-600" />
                    {mockRemainingCount} Remaining
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-amber-950/30 dark:text-amber-100">
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                    {mockWrongCount} Wrong
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-bold text-slate-700 dark:bg-emerald-950/30 dark:text-emerald-100">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
                    {mockCorrectCount} Correct
                  </div>
                </div>

                <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-8">
                  <p className="mb-3 text-sm font-bold text-muted-foreground">
                    Question {mockQuestionIndex + 1} of {mockQuestions.length}
                  </p>
                  <h4 className="text-2xl font-extrabold leading-tight text-slate-950 dark:text-white sm:text-3xl">
                    {currentMockQuestion.prompt}
                  </h4>

                  <div className="mt-8 space-y-3.5">
                    {currentMockQuestion.options.map((option, optionIndex) => {
                      const selected = mockSelectedOption === optionIndex;
                      const correct = optionIndex === currentMockQuestion.correctOption;
                      const wrongSelection =
                        currentMockRevealed && selected && !currentMockCorrect;
                      const showCorrect = currentMockRevealed && correct;
                      const mutedAfterReveal =
                        currentMockRevealed && !selected && !correct;

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
                          disabled={currentMockRevealed}
                          onClick={() => handleMockOptionSelect(optionIndex)}
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

                  {currentMockRevealed && (
                    <div
                      className={`mt-4 rounded-[20px] border p-5 ${
                        currentMockCorrect
                          ? "border-emerald-200 bg-emerald-50 text-slate-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-50"
                          : "border-red-200 bg-red-50 text-slate-900 dark:border-red-900 dark:bg-red-950/30 dark:text-red-50"
                      }`}
                    >
                      <p
                        className={`flex items-center gap-2 text-base font-extrabold ${
                          currentMockCorrect ? "text-emerald-700" : "text-red-600"
                        }`}
                      >
                        {currentMockCorrect ? (
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
                        {currentMockQuestion.explanation}
                      </p>
                    </div>
                  )}

                  <div className="mt-4 rounded-[20px] border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                    <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_minmax(180px,0.6fr)]">
                      <Button
                        variant="outline"
                        disabled={!currentMockRevealed}
                        className="h-14 justify-start rounded-2xl border-slate-200 px-5 text-left text-base font-bold text-slate-700 dark:border-slate-800 dark:text-slate-200"
                      >
                        <Sparkles className="h-5 w-5 text-red-600" />
                        Correct Answer Explanation
                      </Button>
                      <Button
                        disabled={!currentMockRevealed}
                        onClick={handleMockNext}
                        className="h-14 rounded-2xl bg-red-600 text-base font-extrabold text-white hover:bg-red-700"
                      >
                        {mockRemainingCount === 0 ? "Restart" : "Next"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: TIMED TEST (EXAM SIMULATION) */}
      {activeTab === "timed-test" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
              <div>
                <Badge variant="destructive" className="mb-2">Exam Simulator</Badge>
                <h3 className="text-2xl font-bold text-card-foreground">Timed Examination</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Simulate real exam conditions under a strict countdown timer. Score at least {course.assessment.passMark}% to qualify.
                </p>
              </div>

              {isTimedRunning && (
                <div className="flex items-center gap-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 px-4 py-2.5 text-amber-600 dark:text-amber-400">
                  <Clock className="h-5 w-5 animate-pulse" />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wider">Time Remaining</p>
                    <p className="text-xl font-bold font-mono">{formatTime(timeLeft)}</p>
                  </div>
                </div>
              )}
            </div>

            {!isTimedRunning && !timedSubmitted && (
              <div className="mt-8 text-center py-10 rounded-2xl border border-dashed border-border bg-muted/20 space-y-4">
                <Trophy className="mx-auto h-12 w-12 text-primary" />
                <h4 className="text-xl font-bold text-card-foreground">Ready for the Timed Challenge?</h4>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  You will have 15 minutes to complete {course.assessment.questions.length} questions. Once started, the timer cannot be paused.
                </p>
                <Button size="lg" onClick={startTimedExam} className="px-8 font-bold gap-2">
                  <PlayCircle className="h-5 w-5" /> Start Timed Test
                </Button>
              </div>
            )}

            {isTimedRunning && !timedSubmitted && (
              <div className="mt-6 space-y-6">
                {course.assessment.questions.map((q, idx) => (
                  <div key={q.id} className="rounded-2xl border border-border p-5 bg-card">
                    <h4 className="text-base font-semibold text-card-foreground">
                      {idx + 1}. {q.prompt}
                    </h4>
                    <div className="mt-4 space-y-2.5">
                      {q.options.map((opt, optIdx) => (
                        <label
                          key={opt}
                          onClick={() =>
                            setTimedAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                          }
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition ${
                            timedAnswers[q.id] === optIdx
                              ? "border-primary bg-primary/10 text-primary font-medium"
                              : "border-border bg-background hover:bg-muted/50"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`timed-${q.id}`}
                            checked={timedAnswers[q.id] === optIdx}
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
                  <Button size="lg" onClick={handleCompleteTimedExam} className="font-bold gap-2">
                    <CheckCircle2 className="h-5 w-5" /> Submit Timed Exam
                  </Button>
                </div>
              </div>
            )}

            {timedSubmitted && timedScore !== null && (
              <div className="mt-6 space-y-6">
                <div
                  className={`rounded-2xl border p-6 text-center space-y-3 ${
                    timedScore >= course.assessment.passMark
                      ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-950 dark:text-emerald-100"
                      : "border-rose-500/40 bg-rose-500/10 text-rose-950 dark:text-rose-100"
                  }`}
                >
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-md">
                    {timedScore >= course.assessment.passMark ? (
                      <Award className="h-8 w-8 text-emerald-500" />
                    ) : (
                      <AlertTriangle className="h-8 w-8 text-rose-500" />
                    )}
                  </div>
                  <h4 className="text-2xl font-bold">
                    {timedScore >= course.assessment.passMark
                      ? "Congratulations! You Passed!"
                      : "Assessment Score Below Pass Mark"}
                  </h4>
                  <p className="text-3xl font-extrabold font-mono">{timedScore}% Score</p>
                  <p className="text-sm max-w-md mx-auto opacity-90">
                    {timedScore >= course.assessment.passMark
                      ? `Great job! You exceeded the required ${course.assessment.passMark}% pass mark under exam conditions.`
                      : `The pass threshold is ${course.assessment.passMark}%. Review the course modules and try the timed exam again.`}
                  </p>
                  <div className="pt-2">
                    <Button onClick={startTimedExam} variant="outline" className="font-semibold gap-2">
                      <RotateCcw className="h-4 w-4" /> Retake Timed Exam
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: PRACTICAL LABS & EXERCISES */}
      {activeTab === "practical-labs" && (
        <div className="space-y-6">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="border-b border-border pb-5">
              <Badge variant="secondary" className="mb-2">Hands-On Practice</Badge>
              <h3 className="text-2xl font-bold text-card-foreground">Practical Workshop & Field Labs</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Apply real-world practical skills with step-by-step procedures, tool checklists, and safety guidelines.
              </p>
            </div>

            <div className="mt-6 space-y-6">
              {labs.map((lab) => (
                <div key={lab.id} className="rounded-2xl border border-border p-6 bg-background/40 space-y-6">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <h4 className="text-xl font-bold text-card-foreground">{lab.title}</h4>
                      <Badge variant="outline" className="gap-1">
                        <Clock className="h-3.5 w-3.5" /> {lab.durationMinutes} mins
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{lab.description}</p>
                  </div>

                  {/* Tool Checklist */}
                  <div className="rounded-xl border border-border p-4 bg-card">
                    <h5 className="text-sm font-bold text-card-foreground mb-3 flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-primary" /> Required Equipment & Tools Checklist
                    </h5>
                    <div className="grid gap-2 sm:grid-cols-2">
                      {lab.toolsNeeded.map((tool: string, tIdx: number) => {
                        const toolKey = `${lab.id}-tool-${tIdx}`;
                        const isChecked = checkedTools[toolKey];
                        return (
                          <button
                            key={tool}
                            onClick={() => toggleToolCheck(toolKey)}
                            className={`flex items-center gap-2.5 rounded-lg border p-2.5 text-xs text-left transition ${
                              isChecked
                                ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200"
                                : "border-border hover:bg-muted/40 text-card-foreground"
                            }`}
                          >
                            {isChecked ? (
                              <CheckSquare className="h-4 w-4 shrink-0 text-emerald-500" />
                            ) : (
                              <Square className="h-4 w-4 shrink-0 text-muted-foreground" />
                            )}
                            <span className={isChecked ? "line-through opacity-80" : ""}>{tool}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step by Step Procedures */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-bold text-card-foreground flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" /> Step-by-Step Practical Procedure
                    </h5>
                    <div className="space-y-2.5">
                      {lab.steps.map((step: string, sIdx: number) => {
                        const stepKey = `${lab.id}-step-${sIdx}`;
                        const isDone = checkedSteps[stepKey];
                        return (
                          <div
                            key={step}
                            onClick={() => toggleStepCheck(stepKey)}
                            className={`flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-sm transition ${
                              isDone
                                ? "border-emerald-500/50 bg-emerald-500/5 text-muted-foreground"
                                : "border-border bg-card hover:border-slate-300 dark:hover:border-slate-700 text-card-foreground"
                            }`}
                          >
                            <span
                              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                                isDone
                                  ? "bg-emerald-500 text-white"
                                  : "bg-primary/10 text-primary"
                              }`}
                            >
                              {sIdx + 1}
                            </span>
                            <span className={`flex-1 pt-0.5 ${isDone ? "line-through" : ""}`}>
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Safety Tips */}
                  {lab.safetyTips && lab.safetyTips.length > 0 && (
                    <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-900 dark:text-amber-200">
                      <p className="font-bold flex items-center gap-1.5 mb-1.5 text-amber-800 dark:text-amber-300">
                        <AlertTriangle className="h-4 w-4" /> Safety & Precautionary Warning
                      </p>
                      <ul className="list-disc pl-4 space-y-1">
                        {lab.safetyTips.map((tip: string) => (
                          <li key={tip}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: RESOURCES & NOTES */}
      {activeTab === "resources" && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Study Resources */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-card-foreground flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" /> Downloadable Study Resources
            </h3>
            <p className="text-sm text-muted-foreground">
              Reference materials, cheatsheets, and guidebooks for this course.
            </p>

            <div className="space-y-3 pt-2">
              {course.resources.map((res) => (
                <div key={res.id} className="rounded-2xl border border-border p-4 bg-background/50 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-card-foreground text-sm">{res.title}</h4>
                    <Badge variant="outline">{res.kind}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{res.description}</p>
                  <Button size="sm" variant="ghost" className="h-8 text-xs font-semibold text-primary px-0 hover:bg-transparent">
                    View Resource Document →
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Student Notes Notepad */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-card-foreground flex items-center gap-2">
              <Save className="h-5 w-5 text-primary" /> Personal Course Notebook
            </h3>
            <p className="text-sm text-muted-foreground">
              Jot down personal study notes, practical reminders, or formulas. Saved locally for your review.
            </p>

            <div className="space-y-3">
              <Textarea
                placeholder="Type your notes here..."
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                rows={4}
                className="rounded-xl border-border bg-background"
              />
              <Button onClick={handleSaveNote} className="w-full font-bold gap-2">
                <Save className="h-4 w-4" /> Save Note
              </Button>
              {noteSavedFeedback && (
                <p className="text-xs font-semibold text-emerald-500 text-center animate-pulse">
                  ✓ Note saved successfully!
                </p>
              )}
            </div>

            {savedNotes.length > 0 && (
              <div className="mt-4 space-y-2.5 pt-3 border-t border-border">
                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Saved Notes</h4>
                {savedNotes.map((note, idx) => (
                  <div key={idx} className="rounded-xl border border-border p-3 text-xs bg-muted/30 text-card-foreground">
                    {note}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
