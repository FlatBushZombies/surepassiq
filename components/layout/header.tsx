"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X, ChevronDown, Bell, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser, UserButton } from "@clerk/nextjs";
import { categories } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-md shadow-[0_1px_0_0_hsl(var(--border)/0.6)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-6">

        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center transition-opacity hover:opacity-80"
          aria-label="Surepass IQ home"
        >
          <Image src="/logo.png" alt="Surepass IQ" width={48} height={48} />
        </Link>

        {/* Categories Dropdown - Desktop */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="hidden gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground lg:flex"
            >
              Explore
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56 rounded-xl border-border/60 p-1.5 shadow-lg">
            {categories.slice(0, 6).map((category) => (
              <DropdownMenuItem key={category.id} asChild>
                <Link
                  href={`/categories/${category.slug}`}
                  className="flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm"
                >
                  <span>{category.name}</span>
                  <ChevronDown className="h-3 w-3 -rotate-90 text-muted-foreground/60" />
                </Link>
              </DropdownMenuItem>
            ))}
            <div className="my-1 border-t border-border/60" />
            <DropdownMenuItem asChild>
              <Link
                href="/categories"
                className="rounded-lg px-3 py-2 text-sm font-medium text-primary"
              >
                View all categories
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Bar */}
        <div className="relative hidden max-w-xl flex-1 md:flex">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            type="search"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border-border/60 bg-secondary/60 pl-10 pr-4 text-sm placeholder:text-muted-foreground/50 focus-visible:border-primary/40 focus-visible:bg-background focus-visible:ring-1 focus-visible:ring-primary/30 transition-all duration-200"
          />
        </div>

        {/* Desktop Icon Actions */}
        <nav className="hidden items-center gap-0.5 lg:flex">
          {[
            { icon: Heart, label: "Wishlist" },
            { icon: Bell, label: "Notifications" },
          ].map(({ icon: Icon, label }) => (
            <Button
              key={label}
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground"
            >
              <Icon className="h-4.5 w-4.5" />
              <span className="sr-only">{label}</span>
            </Button>
          ))}

          {/* Cart with badge */}
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold leading-none text-primary-foreground">
              2
            </span>
            <span className="sr-only">Cart</span>
          </Button>
        </nav>

        {/* Auth Buttons */}
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

        {/* Mobile Right Actions */}
        <div className="flex items-center gap-1 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="relative h-9 w-9 rounded-lg text-muted-foreground"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold leading-none text-primary-foreground">
              2
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-lg text-muted-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t border-border/60 px-4 py-2 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
          <Input
            type="search"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border-border/60 bg-secondary/60 pl-10 pr-4 text-sm placeholder:text-muted-foreground/50 focus-visible:ring-1 focus-visible:ring-primary/30"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute left-0 right-0 top-full z-50 border-b border-border/60 bg-background/98 backdrop-blur-md shadow-lg transition-all duration-300 lg:hidden",
          isMenuOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0 overflow-hidden border-b-0"
        )}
      >
        <nav className="flex flex-col gap-0.5 p-3">
          <div className="mb-2 px-3 pb-2">
            <p className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground/60">
              Explore categories
            </p>
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="flex items-center rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/categories"
              className="mt-0.5 flex items-center rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              View all categories
            </Link>
          </div>

          <div className="border-t border-border/60 pt-2">
            {user && (
              <Link
                href="/my-learning"
                className="flex items-center rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                My Learning
              </Link>
            )}
            <Link
              href="/wishlist"
              className="flex items-center rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-secondary hover:text-foreground transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Wishlist
            </Link>
          </div>

          <div className="mt-2 flex flex-col gap-2 border-t border-border/60 pt-3 pb-1 px-1">
            {!user ? (
              <>
                <Button variant="outline" size="sm" className="w-full rounded-lg font-medium" asChild>
                  <Link href="/login">Log in</Link>
                </Button>
                <Button size="sm" className="w-full rounded-lg font-medium" asChild>
                  <Link href="/signup">Sign up</Link>
                </Button>
              </>
            ) : (
              <div className="px-2">
                <UserButton />
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}