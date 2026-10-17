"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, Lock, PlayCircle } from "lucide-react";
import type { Course, CourseLesson } from "@/constants";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CourseCurriculumProps {
  course: Course;
  isEnrolled: boolean;
}

export function CourseCurriculum({ course, isEnrolled }: CourseCurriculumProps) {
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(
    () => (course.modules[0] ? { [course.modules[0].id]: true } : {}),
  );
  const [previewLesson, setPreviewLesson] = useState<{
    lesson: CourseLesson;
    moduleTitle: string;
  } | null>(null);

  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) => ({ ...prev, [moduleId]: !prev[moduleId] }));
  };

  const allModulesExpanded = course.modules.every((module) => expandedModules[module.id]);
  const toggleAllModules = () => {
    const nextExpanded = !allModulesExpanded;
    setExpandedModules(
      Object.fromEntries(course.modules.map((module) => [module.id, nextExpanded])),
    );
  };

  // The first lesson of the first two modules is a free preview, mirroring
  // how Udemy unlocks a handful of early lectures for non-enrolled users.
  const isFreePreview = (moduleIndex: number, lessonIndex: number) =>
    lessonIndex === 0 && moduleIndex < 2;

  const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);
  const totalMinutes = course.modules.reduce(
    (sum, module) =>
      sum + module.lessons.reduce((lessonSum, lesson) => lessonSum + lesson.durationMinutes, 0),
    0,
  );
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;
  const totalLengthLabel =
    totalHours > 0 ? `${totalHours}h ${remainingMinutes}m` : `${remainingMinutes}m`;

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-2xl font-bold text-card-foreground">Course content</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {isEnrolled
            ? "Work through the structured learning modules below. Each module includes video lessons, interactive readings, and knowledge checks."
            : "A few early lessons are open for preview. Enroll to unlock the full curriculum."}
        </p>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm text-muted-foreground">
            {course.modules.length} sections • {totalLessons} lectures • {totalLengthLabel} total length
          </p>
          <Button
            size="sm"
            variant="ghost"
            onClick={toggleAllModules}
            className="h-8 px-2 text-xs font-semibold text-primary hover:bg-transparent hover:underline"
          >
            {allModulesExpanded ? "Collapse all sections" : "Expand all sections"}
          </Button>
        </div>

        <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border">
          {course.modules.map((module, moduleIdx) => {
            const isExpanded = Boolean(expandedModules[module.id]);
            return (
              <div key={module.id} className="bg-background/50">
                <button
                  type="button"
                  onClick={() => toggleModule(module.id)}
                  aria-expanded={isExpanded}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-muted/40"
                >
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Module {moduleIdx + 1}
                    </span>
                    <h4 className="text-lg font-bold text-card-foreground">{module.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{module.summary}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <Badge variant="secondary" className="shrink-0">
                      {module.lessons.length} Lessons
                    </Badge>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {isExpanded && (
                  <div className="space-y-2 px-5 pb-5">
                    {module.lessons.map((lesson, lessonIdx) => {
                      const isPreview = isFreePreview(moduleIdx, lessonIdx);
                      const isLocked = !isEnrolled && !isPreview;

                      return (
                        <div
                          key={lesson.id}
                          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-3.5 transition ${
                            isLocked
                              ? "border-border/60 bg-card/60"
                              : "border-border/80 bg-card hover:border-slate-300 dark:hover:border-slate-700"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            {isLocked ? (
                              <Lock className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                            ) : (
                              <PlayCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                            )}
                            <div>
                              <p
                                className={`text-sm font-semibold ${
                                  isLocked ? "text-muted-foreground" : "text-card-foreground"
                                }`}
                              >
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground">{lesson.summary}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                            <span className="text-xs font-medium text-muted-foreground">
                              {lesson.kind} · {lesson.durationMinutes} mins
                            </span>
                            {isLocked ? (
                              <Badge variant="outline" className="h-8 gap-1 rounded-lg text-xs text-muted-foreground">
                                <Lock className="h-3 w-3" /> Locked
                              </Badge>
                            ) : isPreview && !isEnrolled ? (
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1.5 rounded-lg text-xs"
                                onClick={() =>
                                  setPreviewLesson({ lesson, moduleTitle: module.title })
                                }
                              >
                                <PlayCircle className="h-3.5 w-3.5" /> Preview
                              </Button>
                            ) : (
                              <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg">
                                Start Lesson
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Free preview modal for non-enrolled users */}
      <Dialog open={Boolean(previewLesson)} onOpenChange={(open) => !open && setPreviewLesson(null)}>
        <DialogContent className="max-w-lg">
          {previewLesson && (
            <>
              <DialogHeader>
                <Badge variant="secondary" className="mb-2 w-fit">
                  {previewLesson.moduleTitle}
                </Badge>
                <DialogTitle>{previewLesson.lesson.title}</DialogTitle>
                <DialogDescription>{previewLesson.lesson.summary}</DialogDescription>
              </DialogHeader>

              <div className="flex aspect-video w-full items-center justify-center rounded-xl bg-slate-950">
                <PlayCircle className="h-14 w-14 text-white/80" />
              </div>

              {previewLesson.lesson.objectives.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    What you&apos;ll cover
                  </p>
                  <ul className="space-y-1.5">
                    {previewLesson.lesson.objectives.map((objective) => (
                      <li key={objective} className="flex items-start gap-2 text-sm text-card-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-xs text-muted-foreground">
                This lesson is free to preview. Enroll to unlock the full course.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
