"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  BookOpen,
  ChevronDown,
  Heart,
  Menu,
  X,
} from "lucide-react";
import { useUser, UserButton } from "@clerk/nextjs";
import { categories, navLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CatalogSearchForm } from "@/components/search/catalog-search-form";
import { useLearner } from "@/components/learning/learner-provider";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUser();
  const { unreadNotificationsCount, state } = useLearner();

  const wishlistCount = state.wishlistedCourseSlugs.length;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity hover:opacity-80"
          aria-label="Surepass IQ home"
        >
          <Image src="/logo.png" alt="Surepass IQ" width={48} height={48} />
        </Link>

        <div className="hidden lg:block">
          <div className="flex items-center gap-4">
            <div className="relative">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-muted-foreground transition hover:text-foreground">
                  Explore
                  <ChevronDown className="h-3.5 w-3.5 transition group-open:rotate-180" />
                </summary>
                <div className="absolute left-0 top-full mt-3 w-64 rounded-2xl border border-border bg-card p-2 shadow-xl">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/categories/${category.slug}`}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-card-foreground transition hover:bg-muted"
                    >
                      <span>{category.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {category.coursesCount}
                      </span>
                    </Link>
                  ))}
                </div>
              </details>
            </div>

            <nav className="flex items-center gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="hidden max-w-xl flex-1 md:block">
          <CatalogSearchForm
            compact
            placeholder="Search courses, skills, or instructors"
            className="flex items-center gap-2"
            inputClassName="pl-10"
          />
        </div>

        <div className="hidden items-center gap-1 lg:flex">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/my-learning" aria-label="My learning">
              <BookOpen className="h-4.5 w-4.5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/wishlist" aria-label="Wishlist">
              <Heart className="h-4.5 w-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold leading-none text-primary-foreground">
                  {wishlistCount}
                </span>
              )}
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/notifications" aria-label="Notifications">
              <Bell className="h-4.5 w-4.5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold leading-none text-primary-foreground">
                  {unreadNotificationsCount}
                </span>
              )}
            </Link>
          </Button>
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          {!user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="text-sm font-medium text-muted-foreground hover:text-foreground"
                asChild
              >
                <Link href="/login">Log in</Link>
              </Button>
              <Button size="sm" className="rounded-lg text-sm font-medium" asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          ) : (
            <UserButton />
          )}
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/notifications" aria-label="Notifications">
              <Bell className="h-4.5 w-4.5" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold leading-none text-primary-foreground">
                  {unreadNotificationsCount}
                </span>
              )}
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      <div className="border-t border-border/60 px-4 py-2 md:hidden">
        <CatalogSearchForm
          compact
          placeholder="Search courses, skills, or instructors"
          className="flex items-center gap-2"
        />
      </div>

      <div
        className={cn(
          "absolute left-0 right-0 top-full z-50 border-b border-border/60 bg-background/98 backdrop-blur-md shadow-lg transition-all duration-300 lg:hidden",
          isMenuOpen ? "max-h-[85vh] overflow-y-auto" : "max-h-0 overflow-hidden border-b-0",
        )}
      >
        <nav className="flex flex-col gap-2 p-3">
          <div className="rounded-2xl border border-border bg-card p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Browse categories
            </p>
            <div className="space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-muted"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span>{category.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {category.coursesCount}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-3">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Quick links
            </p>
            <div className="space-y-1">
              {[...navLinks, { label: "Notifications", href: "/notifications" }].map(
                (link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block rounded-lg px-3 py-2 text-sm transition hover:bg-muted"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          </div>

          <div className="mt-1 rounded-2xl border border-border bg-card p-3">
            {!user ? (
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                    Log in
                  </Link>
                </Button>
                <Button size="sm" asChild>
                  <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                    Sign up
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="px-1">
                <UserButton />
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
