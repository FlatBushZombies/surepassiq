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

/* ─────────────────────────────────────────────
   Inline premium styles injected once
───────────────────────────────────────────── */
const PremiumStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap');

    :root {
      --ink:       #0e0e12;
      --ink-soft:  #1a1a24;
      --ink-muted: #2a2a38;
      --surface:   #14141c;
      --surface-2: #1e1e2a;
      --surface-3: #252534;
      --border:    rgba(255,255,255,0.07);
      --border-hi: rgba(255,255,255,0.13);
      --gold:      #c9a84c;
      --gold-dim:  #8c6e2f;
      --gold-glow: rgba(201,168,76,0.15);
      --cream:     #f0ead8;
      --cream-dim: #9e9886;
      --white:     #ffffff;
      --success:   #4caf82;
      --font-disp: 'Cormorant Garamond', Georgia, serif;
      --font-body: 'Outfit', sans-serif;
    }

    .pml-root * { box-sizing: border-box; }
    .pml-root { background: var(--ink); font-family: var(--font-body); color: var(--cream); }

    /* ── Hero banner ── */
    .pml-hero {
      position: relative;
      padding: 56px 0 48px;
      overflow: hidden;
    }
    .pml-hero::before {
      content: '';
      position: absolute; inset: 0;
      background:
        radial-gradient(ellipse 60% 80% at 80% 50%, rgba(201,168,76,0.08) 0%, transparent 65%),
        radial-gradient(ellipse 40% 60% at 10% 0%, rgba(201,168,76,0.05) 0%, transparent 55%);
      pointer-events: none;
    }
    .pml-hero-eyebrow {
      font-family: var(--font-body);
      font-size: 10px;
      font-weight: 500;
      letter-spacing: .25em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 12px;
    }
    .pml-hero h1 {
      font-family: var(--font-disp);
      font-size: clamp(2.4rem, 5vw, 3.6rem);
      font-weight: 300;
      line-height: 1.1;
      letter-spacing: -.01em;
      color: var(--cream);
      margin: 0 0 10px;
    }
    .pml-hero h1 em { font-style: italic; color: var(--gold); }
    .pml-hero-sub {
      font-size: .875rem;
      color: var(--cream-dim);
      font-weight: 300;
    }

    /* ── Divider line ── */
    .pml-rule {
      border: none;
      border-top: 1px solid var(--border);
      margin: 0;
    }

    /* ── Layout wrapper ── */
    .pml-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
    @media(min-width:1024px){ .pml-container { padding: 0 40px; } }

    /* ── Profile card ── */
    .pml-profile-grid {
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr;
    }
    @media(min-width:900px){
      .pml-profile-grid { grid-template-columns: 1fr 340px; }
    }

    .pml-card {
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 28px;
      position: relative;
      overflow: hidden;
    }
    .pml-card::after {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border-hi), transparent);
    }

    .pml-avatar {
      width: 64px; height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--gold-dim), var(--gold));
      display: flex; align-items: center; justify-content: center;
      font-family: var(--font-disp);
      font-size: 1.5rem;
      font-weight: 500;
      color: var(--ink);
      flex-shrink: 0;
    }

    .pml-profile-label {
      font-size: 9px;
      font-weight: 500;
      letter-spacing: .22em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 6px;
    }
    .pml-profile-name {
      font-family: var(--font-disp);
      font-size: 1.65rem;
      font-weight: 400;
      color: var(--cream);
      margin: 0 0 4px;
    }
    .pml-profile-email { font-size: .8rem; color: var(--cream-dim); }

    .pml-stat-pair {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 20px;
    }
    .pml-stat-box {
      background: var(--surface-3);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 16px 18px;
    }
    .pml-stat-label { font-size: .7rem; color: var(--cream-dim); margin-bottom: 8px; }
    .pml-stat-value {
      font-family: var(--font-disp);
      font-size: 2rem;
      font-weight: 500;
      color: var(--gold);
      line-height: 1;
    }

    /* ── Milestone card ── */
    .pml-milestone-card {
      background: linear-gradient(145deg, var(--surface-2) 0%, var(--ink-muted) 100%);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 28px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
      overflow: hidden;
    }
    .pml-milestone-card::before {
      content: '';
      position: absolute;
      bottom: -40px; right: -40px;
      width: 160px; height: 160px;
      border-radius: 50%;
      background: var(--gold-glow);
      filter: blur(40px);
    }
    .pml-milestone-label {
      font-size: 9px;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: var(--gold);
      margin-bottom: 10px;
    }
    .pml-milestone-title {
      font-family: var(--font-disp);
      font-size: 1.4rem;
      font-weight: 400;
      color: var(--cream);
      line-height: 1.3;
      margin: 0 0 12px;
    }
    .pml-milestone-body {
      font-size: .8rem;
      color: var(--cream-dim);
      line-height: 1.6;
      margin-bottom: 24px;
    }
    .pml-btn-pair { display: flex; gap: 10px; flex-wrap: wrap; }

    /* ── Premium button ── */
    .pml-btn {
      display: inline-flex; align-items: center; gap: 6px;
      font-family: var(--font-body);
      font-size: .78rem;
      font-weight: 500;
      letter-spacing: .04em;
      padding: 9px 18px;
      border-radius: 100px;
      border: none;
      cursor: pointer;
      transition: all .2s ease;
      text-decoration: none;
    }
    .pml-btn-primary {
      background: linear-gradient(135deg, var(--gold-dim), var(--gold));
      color: var(--ink);
    }
    .pml-btn-primary:hover { filter: brightness(1.1); transform: translateY(-1px); }
    .pml-btn-ghost {
      background: transparent;
      color: var(--cream);
      border: 1px solid var(--border-hi);
    }
    .pml-btn-ghost:hover { background: var(--surface-3); }

    /* ── Progress overview section ── */
    .pml-section { padding: 48px 0; }
    .pml-section-title {
      font-family: var(--font-disp);
      font-size: 1.6rem;
      font-weight: 400;
      color: var(--cream);
      margin: 0 0 24px;
    }
    .pml-section-title span { color: var(--gold); font-style: italic; }

    /* ── Achievements section ── */
    .pml-ach-section {
      padding: 48px 0;
      background: var(--surface);
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
    }

    /* ── Tab bar ── */
    .pml-tabbar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 14px;
      padding: 16px 0;
      border-bottom: 1px solid var(--border);
    }
    .pml-tabs {
      display: flex;
      gap: 2px;
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 100px;
      padding: 4px;
    }
    .pml-tab {
      font-family: var(--font-body);
      font-size: .78rem;
      font-weight: 500;
      padding: 7px 18px;
      border-radius: 100px;
      border: none;
      cursor: pointer;
      color: var(--cream-dim);
      background: transparent;
      transition: all .18s;
    }
    .pml-tab:hover { color: var(--cream); }
    .pml-tab-active {
      background: var(--surface-3);
      color: var(--gold);
      box-shadow: 0 0 0 1px var(--border-hi);
    }

    .pml-search-wrap {
      display: flex; gap: 8px; align-items: center;
    }
    .pml-search-field {
      position: relative;
    }
    .pml-search-field svg {
      position: absolute;
      left: 12px; top: 50%;
      transform: translateY(-50%);
      color: var(--cream-dim);
      pointer-events: none;
    }
    .pml-search-input {
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 100px;
      padding: 8px 16px 8px 36px;
      font-family: var(--font-body);
      font-size: .8rem;
      color: var(--cream);
      width: 220px;
      outline: none;
      transition: border-color .2s;
    }
    .pml-search-input::placeholder { color: var(--cream-dim); }
    .pml-search-input:focus { border-color: var(--gold-dim); }
    .pml-filter-btn {
      width: 36px; height: 36px;
      border-radius: 50%;
      background: var(--surface-2);
      border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      color: var(--cream-dim);
      transition: all .2s;
    }
    .pml-filter-btn:hover { border-color: var(--gold-dim); color: var(--gold); }

    /* ── Course grid ── */
    .pml-course-grid {
      display: grid;
      gap: 20px;
      grid-template-columns: 1fr;
    }
    @media(min-width:640px){ .pml-course-grid { grid-template-columns: repeat(2, 1fr); } }
    @media(min-width:1024px){ .pml-course-grid { grid-template-columns: repeat(3, 1fr); } }

    /* ── Course card ── */
    .pml-course-card {
      background: var(--surface-2);
      border: 1px solid var(--border);
      border-radius: 18px;
      overflow: hidden;
      transition: border-color .2s, transform .2s, box-shadow .2s;
    }
    .pml-course-card:hover {
      border-color: var(--border-hi);
      transform: translateY(-3px);
      box-shadow: 0 16px 40px rgba(0,0,0,.4), 0 0 0 0 transparent;
    }
    .pml-course-thumb {
      position: relative;
      aspect-ratio: 16/9;
      overflow: hidden;
    }
    .pml-course-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform .3s; }
    .pml-course-card:hover .pml-course-thumb img { transform: scale(1.04); }

    .pml-thumb-overlay {
      position: absolute; inset: 0;
      background: rgba(14,14,18,0);
      display: flex; align-items: center; justify-content: center;
      opacity: 0;
      transition: all .25s;
    }
    .pml-course-card:hover .pml-thumb-overlay {
      background: rgba(14,14,18,.45);
      opacity: 1;
    }
    .pml-play-btn {
      width: 52px; height: 52px;
      border-radius: 50%;
      background: var(--ink);
      border: 1.5px solid var(--gold);
      display: flex; align-items: center; justify-content: center;
      color: var(--gold);
      transition: transform .2s;
      text-decoration: none;
    }
    .pml-play-btn:hover { transform: scale(1.12); }

    .pml-badge-completed {
      position: absolute;
      top: 10px; right: 10px;
      background: linear-gradient(135deg, var(--gold-dim), var(--gold));
      color: var(--ink);
      font-size: .65rem;
      font-weight: 600;
      letter-spacing: .08em;
      text-transform: uppercase;
      padding: 4px 10px;
      border-radius: 100px;
    }

    .pml-course-body { padding: 18px 18px 16px; }
    .pml-progress-meta {
      display: flex; justify-content: space-between;
      font-size: .7rem;
      color: var(--cream-dim);
      margin-bottom: 7px;
    }
    .pml-progress-track {
      height: 3px;
      background: var(--surface-3);
      border-radius: 100px;
      margin-bottom: 14px;
      overflow: hidden;
    }
    .pml-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--gold-dim), var(--gold));
      border-radius: 100px;
      transition: width .4s ease;
    }

    .pml-course-title {
      font-family: var(--font-disp);
      font-size: 1.05rem;
      font-weight: 500;
      color: var(--cream);
      line-height: 1.35;
      margin: 0 0 5px;
      text-decoration: none;
      display: block;
      transition: color .15s;
    }
    .pml-course-title:hover { color: var(--gold); }
    .pml-course-instructor { font-size: .73rem; color: var(--cream-dim); margin-bottom: 14px; }

    .pml-card-footer {
      display: flex; align-items: center; justify-content: space-between;
    }
    .pml-continue-btn {
      display: inline-flex; align-items: center; gap: 5px;
      font-size: .75rem;
      font-weight: 500;
      padding: 7px 14px;
      border-radius: 100px;
      background: linear-gradient(135deg, var(--gold-dim), var(--gold));
      color: var(--ink);
      border: none;
      cursor: pointer;
      text-decoration: none;
      transition: filter .2s, transform .15s;
    }
    .pml-continue-btn:hover { filter: brightness(1.1); transform: translateY(-1px); }

    .pml-more-btn {
      width: 32px; height: 32px;
      border-radius: 50%;
      background: transparent;
      border: 1px solid var(--border);
      display: flex; align-items: center; justify-content: center;
      color: var(--cream-dim);
      cursor: pointer;
      transition: all .2s;
    }
    .pml-more-btn:hover { border-color: var(--border-hi); color: var(--cream); }

    /* ── Empty state ── */
    .pml-empty {
      text-align: center;
      padding: 80px 20px;
    }
    .pml-empty-title {
      font-family: var(--font-disp);
      font-size: 1.8rem;
      font-weight: 400;
      color: var(--cream);
      margin-bottom: 12px;
    }
    .pml-empty-sub { font-size: .875rem; color: var(--cream-dim); margin-bottom: 28px; }

    /* ── Sign-in gate ── */
    .pml-gate {
      display: flex; align-items: center; justify-content: center;
      min-height: 60vh;
      text-align: center;
      padding: 40px 20px;
    }
    .pml-gate-title {
      font-family: var(--font-disp);
      font-size: clamp(1.6rem, 4vw, 2.4rem);
      font-weight: 300;
      color: var(--cream);
      margin-bottom: 14px;
    }
    .pml-gate-sub { font-size: .875rem; color: var(--cream-dim); margin-bottom: 28px; }

    /* ── Thin decorative line ── */
    .pml-deco-line {
      width: 48px; height: 1px;
      background: linear-gradient(90deg, transparent, var(--gold), transparent);
      margin: 0 auto 20px;
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   Inline ProgressOverview wrapper (preserves component)
───────────────────────────────────────────── */
/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function MyLearningPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const { user } = useUser();

  const filteredCourses = enrolledCourses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === "completed") return matchesSearch && course.progress === 100;
    if (activeTab === "in-progress") return matchesSearch && course.progress < 100;
    return matchesSearch;
  });

  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter((c) => c.progress === 100).length;
  const totalHours = 87;
  const currentStreak = 7;

  return (
    <div className="pml-root flex min-h-screen flex-col">
      <PremiumStyles />
      <Header />

      <main className="flex-1">
        {user ? (
          <>
            {/* ── HERO ── */}
            <section className="pml-hero">
              <div className="pml-container">
                <p className="pml-hero-eyebrow">Dashboard</p>
                <h1>My <em>learning</em></h1>
                <p className="pml-hero-sub">Continue where you left off and track your progress.</p>
              </div>
            </section>

            <hr className="pml-rule" />

            {/* ── PROFILE + MILESTONE ── */}
            <section className="pml-section">
              <div className="pml-container">
                <div className="pml-profile-grid">

                  {/* Profile card */}
                  <div className="pml-card">
                    <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                      <div className="pml-avatar">
                        {user.firstName?.[0] ?? user.fullName?.[0] ?? "U"}
                      </div>
                      <div>
                        <p className="pml-profile-label">Learner profile</p>
                        <h2 className="pml-profile-name">
                          {user.firstName
                            ? `${user.firstName} ${user.lastName ?? ""}`.trim()
                            : user.fullName || "Learning member"}
                        </h2>
                        <p className="pml-profile-email">
                          {user.primaryEmailAddress?.emailAddress ?? "No email available"}
                        </p>
                      </div>
                    </div>

                    <div className="pml-stat-pair">
                      <div className="pml-stat-box">
                        <p className="pml-stat-label">Enrolled courses</p>
                        <p className="pml-stat-value">{totalCourses}</p>
                      </div>
                      <div className="pml-stat-box">
                        <p className="pml-stat-label">Unlocked achievements</p>
                        <p className="pml-stat-value">
                          {achievements.filter((a) => a.unlocked).length}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Milestone card */}
                  <div className="pml-milestone-card">
                    <div>
                      <p className="pml-milestone-label">Next milestone</p>
                      <h3 className="pml-milestone-title">
                        Complete another course this month
                      </h3>
                      <p className="pml-milestone-body">
                        Keep your momentum going and unlock new achievements by diving into a course.
                      </p>
                    </div>
                    <div className="pml-btn-pair">
                      <Link href="/my-learning" className="pml-btn pml-btn-primary">
                        View progress
                      </Link>
                      <Link href="/categories" className="pml-btn pml-btn-ghost">
                        Browse courses
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* ── PROGRESS OVERVIEW ── */}
            <section className="pml-section" style={{ paddingTop: 0 }}>
              <div className="pml-container">
                <ProgressOverview
                  totalCourses={totalCourses}
                  completedCourses={completedCourses}
                  totalHours={totalHours}
                  currentStreak={currentStreak}
                />
              </div>
            </section>

            {/* ── ACHIEVEMENTS ── */}
            <section className="pml-ach-section">
              <div className="pml-container">
                <Achievements achievements={achievements} />
              </div>
            </section>

            {/* ── TAB BAR ── */}
            <section style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
              <div className="pml-container">
                <div className="pml-tabbar">
                  <div className="pml-tabs">
                    {[
                      { id: "all", label: "All courses" },
                      { id: "in-progress", label: "In Progress" },
                      { id: "completed", label: "Completed" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`pml-tab${activeTab === tab.id ? " pml-tab-active" : ""}`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="pml-search-wrap">
                    <div className="pml-search-field">
                      <Search size={14} />
                      <input
                        type="search"
                        placeholder="Search my courses"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pml-search-input"
                      />
                    </div>
                    <button className="pml-filter-btn">
                      <Filter size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* ── COURSE GRID ── */}
            <section className="pml-section">
              <div className="pml-container">
                {filteredCourses.length > 0 ? (
                  <div className="pml-course-grid">
                    {filteredCourses.map((course) => (
                      <article key={course.id} className="pml-course-card">

                        {/* Thumbnail */}
                        <div className="pml-course-thumb">
                          <Image
                            src={course.image}
                            alt={course.title}
                            fill
                            className="object-cover"
                          />
                          <div className="pml-thumb-overlay">
                            <Link href={`/course/${course.slug}`} className="pml-play-btn">
                              <Play size={18} style={{ marginLeft: 2 }} />
                            </Link>
                          </div>
                          {course.progress === 100 && (
                            <span className="pml-badge-completed">Completed</span>
                          )}
                        </div>

                        {/* Body */}
                        <div className="pml-course-body">
                          <div className="pml-progress-meta">
                            <span>{course.progress}% complete</span>
                            <span>{course.lastAccessed}</span>
                          </div>
                          <div className="pml-progress-track">
                            <div
                              className="pml-progress-fill"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>

                          <Link href={`/course/${course.slug}`} className="pml-course-title">
                            {course.title}
                          </Link>
                          <p className="pml-course-instructor">{course.instructor.name}</p>

                          <div className="pml-card-footer">
                            <Link href={`/course/${course.slug}`} className="pml-continue-btn">
                              <Play size={11} style={{ fill: "currentColor" }} />
                              {course.progress === 100 ? "Review" : "Continue"}
                            </Link>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="pml-more-btn">
                                  <MoreVertical size={14} />
                                </button>
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
                  <div className="pml-empty">
                    <div className="pml-deco-line" />
                    <h2 className="pml-empty-title">No courses found</h2>
                    <p className="pml-empty-sub">
                      {searchQuery
                        ? "Try a different search term"
                        : "Start learning by enrolling in a course"}
                    </p>
                    <Link href="/" className="pml-btn pml-btn-primary">
                      Browse courses
                    </Link>
                  </div>
                )}
              </div>
            </section>
          </>
        ) : (
          <div className="pml-gate">
            <div>
              <div className="pml-deco-line" />
              <h1 className="pml-gate-title">
                Sign in to view your learning progress
              </h1>
              <p className="pml-gate-sub">
                Track your courses, achievements, and overall progress.
              </p>
              <Link href="/login" className="pml-btn pml-btn-primary">
                Sign in
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}