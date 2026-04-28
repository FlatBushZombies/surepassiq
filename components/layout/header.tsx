"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  Bell,
  BookOpen,
  ChevronDown,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";
import { categories, navLinks } from "@/constants";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();
  const { signOut } = useClerk();

  const showAuthButtons = isLoaded && !isSignedIn;
  const showProfileActions = isLoaded && isSignedIn;
  const userInitials =
    user?.firstName?.charAt(0).toUpperCase() ||
    user?.fullName?.charAt(0).toUpperCase() ||
    "U";

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background shadow-sm">
      <div className="mx-auto flex h-[72px] max-w-[1340px] items-center gap-2 px-4 lg:gap-6 lg:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="SurePassIQ home"
        >
          <Image
            src="/logo.png"
            alt="SurePassIQ"
            width={120}
            height={40}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* Categories Dropdown - Desktop */}
        <div
          className="relative hidden lg:block"
          onMouseEnter={() => setIsExploreOpen(true)}
          onMouseLeave={() => setIsExploreOpen(false)}
        >
          <button className="flex items-center gap-1 px-3 py-2 text-sm font-normal text-foreground transition hover:text-primary">
            Categories
            <ChevronDown className={cn("h-4 w-4 transition-transform", isExploreOpen && "rotate-180")} />
          </button>
          <div
            className={cn(
              "absolute left-0 top-full w-64 rounded-sm border border-border bg-background py-2 shadow-lg transition-all",
              isExploreOpen ? "visible opacity-100" : "invisible opacity-0"
            )}
          >
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="flex items-center justify-between px-4 py-2.5 text-sm text-foreground transition hover:bg-muted"
              >
                <span>{category.name}</span>
                <span className="text-xs text-muted-foreground">
                  {category.coursesCount}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden flex-1 lg:block">
          <form className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for anything"
              className="h-12 w-full rounded-full border-border bg-muted/40 pl-11 pr-6 text-sm placeholder:text-muted-foreground focus-visible:border-foreground focus-visible:bg-background focus-visible:ring-0"
            />
          </form>
        </div>

        {/* Nav Links - Desktop */}
        <nav className="hidden items-center lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-sm font-normal transition hover:text-primary ${
                link.href === "/business"
                  ? "text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/business"
            className="px-3 py-2 text-sm font-normal text-muted-foreground transition hover:text-primary"
          >
            Business
          </Link>
        </nav>

        {/* Right Actions - Desktop */}
        <div className="hidden items-center gap-1 lg:flex">
          <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
            <Link href="/my-learning" aria-label="My learning">
              <BookOpen className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative h-10 w-10" asChild>
            <Link href="/wishlist" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="relative h-10 w-10" asChild>
            <Link href="/notifications" aria-label="Notifications">
              <Bell className="h-5 w-5" />
            </Link>
          </Button>
          {showProfileActions ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-full"
                  aria-label="Open profile menu"
                >
                  <Avatar className="h-10 w-10">
                    {user?.imageUrl ? (
                      <AvatarImage
                        src={user.imageUrl}
                        alt={user.fullName ?? "Profile"}
                      />
                    ) : (
                      <AvatarFallback>{userInitials}</AvatarFallback>
                    )}
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onSelect={handleSignOut} variant="destructive">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>

        {/* Auth Buttons - Desktop */}
        {showAuthButtons ? (
          <div className="hidden items-center gap-2 lg:flex">
            <Button
              variant="outline"
              className="h-10 rounded-sm border-foreground px-4 text-sm font-bold text-foreground hover:bg-muted"
              asChild
            >
              <Link href="/login">Log in</Link>
            </Button>
            <Button
              className="h-10 rounded-sm bg-foreground px-4 text-sm font-bold text-background hover:bg-foreground/90"
              asChild
            >
              <Link href="/signup">Sign up</Link>
            </Button>
          </div>
        ) : null}

        {/* Mobile Actions */}
        <div className="ml-auto flex items-center gap-1 lg:hidden">
          <Button variant="ghost" size="icon" className="h-10 w-10" asChild>
            <Link href="/cart" aria-label="Shopping cart">
              <ShoppingCart className="h-5 w-5" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t border-border px-4 py-3 lg:hidden">
        <form className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for anything"
            className="h-10 w-full rounded-full border-border bg-muted/40 pl-10 pr-4 text-sm"
          />
        </form>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute left-0 right-0 top-full z-50 border-b border-border bg-background shadow-lg transition-all duration-200 lg:hidden",
          isMenuOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0 overflow-hidden border-b-0"
        )}
      >
        <nav className="flex flex-col p-4">
          <div className="mb-4 border-b border-border pb-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-muted-foreground">
              Categories
            </p>
            <div className="space-y-1">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="flex items-center justify-between py-2 text-sm text-foreground transition hover:text-primary"
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

          <div className="mb-4 space-y-1 border-b border-border pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium text-foreground transition hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/business"
              className="block py-2 text-sm font-medium text-muted-foreground transition hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Business
            </Link>
            <Link
              href="/my-learning"
              className="block py-2 text-sm font-medium text-foreground transition hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              My learning
            </Link>
            <Link
              href="/wishlist"
              className="block py-2 text-sm font-medium text-foreground transition hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Wishlist
            </Link>
          </div>

          {showAuthButtons ? (
            <div className="flex flex-col gap-2">
              <Button variant="outline" className="h-10 w-full rounded-sm border-foreground font-bold" asChild>
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  Log in
                </Link>
              </Button>
              <Button className="h-10 w-full rounded-sm bg-foreground font-bold text-background" asChild>
                <Link href="/signup" onClick={() => setIsMenuOpen(false)}>
                  Sign up
                </Link>
              </Button>
            </div>
          ) : showProfileActions ? (
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                className="h-10 w-full rounded-sm border-foreground font-bold"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleSignOut();
                }}
              >
                Log out
              </Button>
            </div>
          ) : null}
        </nav>
      </div>
    </header>
  );
}