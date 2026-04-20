"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import {
  Search,
  Play,
  MoreVertical,
  Star,
  Clock,
  Filter,
} from "lucide-react";
import { courses } from "@/constants";
import { ProgressOverview } from "@/components/progress-overview";
import { Achievements } from "@/components/achievements";

const enrolledCourses = courses.slice(0, 6).map((course, index) => ({
  ...course,
  progress: [75, 45, 100, 20, 60, 10][index],
  lastAccessed: [
    "2 hours ago",
    "Yesterday",
    "Completed",
    "3 days ago",
    "1 week ago",
    "Just started",
  ][index],
}));

const achievements = [
  {
    id: "1",
    title: "First Steps",
    description: "Complete your first course",
    icon: "star",
    unlocked: true,
    unlockedAt: "2 weeks ago",
  },
  {
    id: "2",
    title: "Dedicated Learner",
    description: "Complete 5 courses",
    icon: "trophy",
    unlocked: true,
    unlockedAt: "1 week ago",
  },
  {
    id: "3",
    title: "Speed Demon",
    description: "Complete a course in under 24 hours",
    icon: "target",
    unlocked: false,
  },
  {
    id: "4",
    title: "Century Club",
    description: "Reach 100 hours of learning",
    icon: "award",
    unlocked: false,
  },
];

export default function MyLearningPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "in-progress" | "completed">("all");
  const { user } = useUser();

  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "completed") return matchesSearch && course.progress === 100;
    if (activeTab === "in-progress") return matchesSearch && course.progress < 100;
    return matchesSearch;
  });

  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter((course) => course.progress === 100).length;
  const totalHours = 87;
  const currentStreak = 7;

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {user ? (
          <>
            <section className="bg-secondary py-8 md:py-12">
              <div className="mx-auto max-w-7xl px-4 lg:px-6">
                <h1 className="mb-2 text-3xl font-bold text-foreground md:text-4xl">
                  My learning
                </h1>
                <p className="text-muted-foreground">
                  Continue where you left off and track your progress.
                </p>
              </div>
            </section>

            <section className="py-8 md:py-10">
              <div className="mx-auto max-w-7xl px-4 lg:px-6">
                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                  <div className="rounded-[2rem] border border-border bg-card p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-xl font-semibold text-foreground">
                        {user.firstName?.[0] ?? user.fullName?.[0] ?? "U"}
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">
                          Learner profile
                        </p>
                        <h2 className="text-2xl font-semibold text-foreground">
                          {user.firstName
                            ? `${user.firstName} ${user.lastName ?? ""}`.trim()
                            : user.fullName || "Learning member"}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {user.primaryEmailAddress?.emailAddress ?? "No email available"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-3xl bg-secondary p-4">
                        <p className="text-sm text-muted-foreground">Enrolled courses</p>
                        <p className="mt-2 text-2xl font-semibold text-foreground">
                          {totalCourses}
                        </p>
                      </div>
                      <div className="rounded-3xl bg-secondary p-4">
                        <p className="text-sm text-muted-foreground">Unlocked achievements</p>
                        <p className="mt-2 text-2xl font-semibold text-foreground">
                          {achievements.filter((achievement) => achievement.unlocked).length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-border bg-card p-6">
                    <p className="text-sm text-muted-foreground">Next milestone</p>
                    <h3 className="mt-2 text-2xl font-semibold text-foreground">
                      Complete another course this month
                    </h3>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Keep your momentum going and unlock new achievements by diving into a course.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button asChild size="sm">
                        <Link href="/my-learning">View progress</Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href="/categories">Browse courses</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-8 md:py-12">
              <div className="mx-auto max-w-7xl px-4 lg:px-6">
                <ProgressOverview
                  totalCourses={totalCourses}
                  completedCourses={completedCourses}
                  totalHours={totalHours}
                  currentStreak={currentStreak}
                />
              </div>
            </section>

            <section className="py-8 md:py-12 bg-secondary/50">
              <div className="mx-auto max-w-7xl px-4 lg:px-6">
                <Achievements achievements={achievements} />
              </div>
            </section>

            <section className="border-b border-border bg-card">
              <div className="mx-auto max-w-7xl px-4 lg:px-6">
                <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                  <div className="flex items-center gap-1 rounded-lg bg-secondary p-1">
                    {[
                      { id: "all", label: "All courses" },
                      { id: "in-progress", label: "In Progress" },
                      { id: "completed", label: "Completed" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as typeof activeTab)}
                        className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                          activeTab === tab.id
                            ? "bg-card text-card-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search my courses"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-64 pl-10"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            <section className="py-8 md:py-12">
              <div className="mx-auto max-w-7xl px-4 lg:px-6">
                {filteredCourses.length > 0 ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredCourses.map((course) => (
                      <article
                        key={course.id}
                        className="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
                      >
                        <div className="relative aspect-video">
                          <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 opacity-0 transition-all group-hover:bg-foreground/30 group-hover:opacity-100">
                            <Link
                              href={`/course/${course.slug}`}
                              className="flex h-14 w-14 items-center justify-center rounded-full bg-card text-card-foreground shadow-lg transition-transform hover:scale-110"
                            >
                              <Play className="h-5 w-5 fill-current" />
                            </Link>
                          </div>
                          {course.progress === 100 && (
                            <div className="absolute right-2 top-2 rounded bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                              Completed
                            </div>
                          )}
                        </div>

                        <div className="p-4">
                          <div className="mb-3">
                            <div className="mb-1 flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">{course.progress}% complete</span>
                              <span className="text-muted-foreground">{course.lastAccessed}</span>
                            </div>
                            <Progress value={course.progress} className="h-1.5" />
                          </div>

                          <Link href={`/course/${course.slug}`}>
                            <h3 className="mb-1 line-clamp-2 font-semibold text-card-foreground hover:text-primary">
                              {course.title}
                            </h3>
                          </Link>

                          <p className="mb-3 text-xs text-muted-foreground">
                            {course.instructor.name}
                          </p>

                          <div className="flex items-center justify-between">
                            <Button asChild size="sm" className="gap-2">
                              <Link href={`/course/${course.slug}`}>
                                <Play className="h-3.5 w-3.5" />
                                {course.progress === 100 ? "Review" : "Continue"}
                              </Link>
                            </Button>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Star className="mr-2 h-4 w-4" />
                                  Leave a rating
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Clock className="mr-2 h-4 w-4" />
                                  View certificate
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center">
                    <p className="mb-4 text-xl font-semibold text-foreground">No courses found</p>
                    <p className="mb-6 text-muted-foreground">
                      {searchQuery
                        ? "Try a different search term"
                        : "Start learning by enrolling in a course"}
                    </p>
                    <Button asChild>
                      <Link href="/">Browse courses</Link>
                    </Button>
                  </div>
                )}
              </div>
            </section>
          </>
        ) : (
          <section className="flex min-h-[60vh] items-center justify-center">
            <div className="text-center">
              <h1 className="mb-4 text-3xl font-bold text-foreground">
                Sign in to view your learning progress
              </h1>
              <p className="mb-6 text-muted-foreground">
                Track your courses, achievements, and overall progress.
              </p>
              <Button asChild>
                <Link href="/login">Sign in</Link>
              </Button>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
