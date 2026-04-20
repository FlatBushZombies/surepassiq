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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Surepass IQ home"
        >
          <Image src="/logo.png" alt="Surepass IQ" width={48} height={48} />
        </Link>

        {/* Categories Dropdown - Desktop */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="hidden gap-1 lg:flex">
              Explore
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-64">
            {categories.slice(0, 6).map((category) => (
              <DropdownMenuItem key={category.id} asChild>
                <Link href={`/categories/${category.slug}`} className="flex items-center justify-between gap-3">
                  <span>{category.name}</span>
                  <ChevronDown className="h-3 w-3 -rotate-90 text-muted-foreground" />
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem asChild>
              <Link href="/categories" className="font-medium text-primary">
                View all categories
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search Bar */}
        <div className="relative hidden max-w-xl flex-1 md:flex">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border-border bg-secondary pl-10 pr-4 focus-visible:ring-primary"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-2 lg:flex">
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="h-5 w-5" />
            <span className="sr-only">Wishlist</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              2
            </span>
            <span className="sr-only">Cart</span>
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden items-center gap-2 lg:flex">
          {!user ? (
            <>
              <Button variant="outline" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Sign up</Link>
              </Button>
            </>
          ) : (
            <UserButton />
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              2
            </span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="border-t border-border px-4 py-2 md:hidden">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full bg-secondary pl-10 pr-4"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute left-0 right-0 top-full z-50 border-b border-border bg-card shadow-lg transition-all duration-300 lg:hidden",
          isMenuOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0 overflow-hidden border-b-0"
        )}
      >
        <nav className="flex flex-col p-4">
          <div className="mb-4 border-b border-border pb-4">
            <p className="mb-2 text-sm font-medium text-muted-foreground">Explore categories</p>
            {categories.slice(0, 6).map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="flex items-center rounded-md px-3 py-2 text-sm hover:bg-secondary"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{category.name}</span>
              </Link>
            ))}
            <Link
              href="/categories"
              className="mt-1 block rounded-md px-3 py-2 text-sm font-medium text-primary hover:bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              View all categories
            </Link>
          </div>
          {user && (
            <Link
              href="/my-learning"
              className="rounded-md px-3 py-2 text-sm hover:bg-secondary"
              onClick={() => setIsMenuOpen(false)}
            >
              My Learning
            </Link>
          )}
          <Link
            href="/wishlist"
            className="rounded-md px-3 py-2 text-sm hover:bg-secondary"
            onClick={() => setIsMenuOpen(false)}
          >
            Wishlist
          </Link>
          <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
            {!user ? (
              <>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/login">Log in</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </>
            ) : (
              <UserButton />
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
