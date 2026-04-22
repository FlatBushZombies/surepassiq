"use client";

import { useDeferredValue, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Bell, Bookmark, PlayCircle, Search, Sparkles, Trophy } from "lucide-react";
import { courses } from "@/constants";
import { useLearner } from "@/components/learning/learner-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  getCourseProgressPercent,
  isCourseComplete,
} from "@/lib/learner-store";

const tabs = [
  { id: "all", label: "All courses" },
  { id: "in-progress", label: "In progress" },
  { id: "completed", label: "Completed" },
] as const;

export function MyLearningDashboard() {
  const {
    achievements,
    enrolledCourses,
    getCourseState,
    notifications,
    unreadNotificationsCount,
  } = useLearner();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]["id"]>("all");
  const deferredSearch = useDeferredValue(searchQuery);

  const filteredCourses = enrolledCourses.filter((course) => {
    const progress = getCourseProgressPercent(course, getCourseState(course.slug));
    const matchesQuery =
      !deferredSearch ||
      course.title.toLowerCase().includes(deferredSearch.toLowerCase()) ||
      course.skills.some((skill) =>
        skill.toLowerCase().includes(deferredSearch.toLowerCase()),
      );

    if (activeTab === "completed") {
      return matchesQuery && progress >= 100;
    }

    if (activeTab === "in-progress") {
      return matchesQuery && progress > 0 && progress < 100;
    }

    return matchesQuery;
  });

  const completedCourses = enrolledCourses.filter((course) =>
    isCourseComplete(course, getCourseState(course.slug)),
  );
  const bookmarkedLessons = enrolledCourses.reduce((total, course) => {
    return total + (getCourseState(course.slug)?.bookmarkedLessonIds.length ?? 0);
  }, 0);
  const recommendedCourses = courses
    .filter((course) => !enrolledCourses.some((item) => item.slug === course.slug))
    .slice(0, 3);

  if (enrolledCourses.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-16 text-center">
          <Sparkles className="h-10 w-10 text-primary" />
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              Your learning dashboard is ready
            </h2>
            <p className="max-w-xl text-muted-foreground">
              Start a course to track progress, save notes, pass assessments, and
              unlock certificates here.
            </p>
          </div>
          <Button asChild>
            <Link href="/categories">Browse courses</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Enrolled courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{enrolledCourses.length}</div>
            <p className="text-sm text-muted-foreground">Active learning plans</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Certificates unlocked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedCourses.length}</div>
            <p className="text-sm text-muted-foreground">Courses finished end to end</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Bookmarked lessons</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{bookmarkedLessons}</div>
            <p className="text-sm text-muted-foreground">Saved for quick revision</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unread updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{unreadNotificationsCount}</div>
            <p className="text-sm text-muted-foreground">Course and assessment activity</p>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-6">
          <Card>
            <CardHeader className="gap-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="text-2xl">My learning</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Continue lessons, retake assessments, and keep momentum.
                  </p>
                </div>
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
                  <Input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search my courses"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    type="button"
                    variant={activeTab === tab.id ? "default" : "outline"}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {filteredCourses.length > 0 ? (
                filteredCourses.map((course) => {
                  const courseState = getCourseState(course.slug);
                  const progress = getCourseProgressPercent(course, courseState);

                  return (
                    <article
                      key={course.slug}
                      className="grid gap-4 rounded-2xl border border-border p-4 md:grid-cols-[180px_minmax(0,1fr)]"
                    >
                      <div className="relative aspect-video overflow-hidden rounded-xl">
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
                              {course.category}
                            </p>
                            <h3 className="text-lg font-semibold text-foreground">
                              {course.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {course.subcategory} · {course.duration}
                            </p>
                          </div>
                          {progress >= 100 && <Trophy className="h-5 w-5 text-primary" />}
                        </div>

                        <div>
                          <div className="mb-2 flex items-center justify-between text-sm">
                            <span>{progress}% complete</span>
                            <span className="text-muted-foreground">
                              {courseState?.completedLessonIds.length ?? 0}/{course.lectures} lessons
                            </span>
                          </div>
                          <Progress value={progress} />
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button asChild>
                            <Link href={`/learn/${course.slug}`}>
                              <PlayCircle className="mr-2 h-4 w-4" />
                              {progress > 0 ? "Continue learning" : "Start learning"}
                            </Link>
                          </Button>
                          <Button variant="outline" asChild>
                            <Link href={`/course/${course.slug}`}>View course</Link>
                          </Button>
                        </div>
                      </div>
                    </article>
                  );
                })
              ) : (
                <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
                  No enrolled courses match your search yet.
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Recommended next</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-3">
              {recommendedCourses.map((course) => (
                <Link
                  key={course.slug}
                  href={`/course/${course.slug}`}
                  className="rounded-2xl border border-border p-4 transition hover:border-primary/40 hover:bg-muted/30"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
                    {course.category}
                  </p>
                  <h3 className="mt-2 font-semibold text-foreground">{course.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {course.description}
                  </p>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Award className="h-5 w-5 text-primary" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`rounded-2xl border p-4 ${
                    achievement.unlocked
                      ? "border-primary/20 bg-primary/5"
                      : "border-border bg-muted/30"
                  }`}
                >
                  <p className="font-semibold text-foreground">{achievement.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {achievement.description}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Bell className="h-5 w-5 text-primary" />
                Recent updates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.length > 0 ? (
                notifications.slice(0, 4).map((notification) => (
                  <div key={notification.id} className="rounded-2xl border border-border p-4">
                    <p className="font-semibold text-foreground">{notification.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {notification.body}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Notifications will appear here when you enroll, pass assessments, or complete courses.
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <Bookmark className="h-5 w-5 text-primary" />
                Quick actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/wishlist">Open wishlist</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/notifications">Review notifications</Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link href="/categories">Browse more courses</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
