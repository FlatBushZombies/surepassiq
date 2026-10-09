"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Menu, X, Sparkles, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const megaMenuData = {
  byNeed: [
    { label: "Enterprise-Wide Training", href: "/what-we-do#enterprise" },
    { label: "Team-Wide Training", href: "/what-we-do#team" },
    { label: "Tech Team Training", href: "/what-we-do#tech" },
    { label: "Leadership Development", href: "/what-we-do#leadership" },
    { label: "Dedicated Customer Success Team", href: "/what-we-do#customer-success" },
    { label: "Remote & Hybrid Team Training", href: "/what-we-do#remote" },
    { label: "Certification Prep & Badges", href: "/what-we-do#certification" },
    { label: "AI Upskilling", href: "/what-we-do#ai-upskilling" },
  ],
  byTeam: [
    { label: "Leaders & Executives", href: "/what-we-do#leaders" },
    { label: "Learning & Development", href: "/what-we-do#learning-dev" },
    { label: "Human Resources", href: "/what-we-do#hr" },
    { label: "Engineering", href: "/what-we-do#engineering" },
    { label: "IT Operations", href: "/what-we-do#it-ops" },
    { label: "Data Science", href: "/what-we-do#data-science" },
  ],
  byIndustry: [
    { label: "Technology", href: "/what-we-do#tech-industry" },
    { label: "Professional Services", href: "/what-we-do#professional" },
    { label: "Financial Services", href: "/what-we-do#financial" },
    { label: "Manufacturing", href: "/what-we-do#manufacturing" },
    { label: "Government", href: "/what-we-do#government" },
    { label: "Higher Ed", href: "/what-we-do#higher-ed" },
  ],
};

export function BusinessHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWhatWeDoHovered, setIsWhatWeDoHovered] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsWhatWeDoHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsWhatWeDoHovered(false);
    }, 150);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link
          href="/business"
          className="flex items-center gap-3 h-10 shrink-0"
          aria-label="SurePassIQ Business home"
        >
          <Image
            src="/logo.png"
            alt="SurePassIQ"
            width={96}
            height={32}
            priority
            className="h-8 w-auto object-contain"
          />
          <span className="border-l border-border/80 pl-3 text-sm font-semibold tracking-tight text-foreground/80">
            Business
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {/* What We Do with Mega Dropdown */}
          <div
            className="relative py-4"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link
              href="/what-we-do"
              className={cn(
                "flex items-center gap-1 px-3.5 py-2 text-sm font-medium transition-colors rounded-lg",
                isWhatWeDoHovered
                  ? "bg-[#f0ebff] text-[#5624d0] dark:bg-purple-950/70 dark:text-purple-300"
                  : "text-foreground hover:text-foreground/70"
              )}
            >
              What we do
            </Link>

            {/* Mega Dropdown Panel */}
            <div
              className={cn(
                "absolute left-0 top-[100%] w-[780px] rounded-2xl border border-border/80 bg-popover p-7 shadow-2xl transition-all duration-200 z-50",
                isWhatWeDoHovered
                  ? "visible opacity-100 translate-y-0"
                  : "invisible opacity-0 -translate-y-2 pointer-events-none"
              )}
            >
              <div className="grid grid-cols-3 gap-8">
                {/* Column 1: By need */}
                <div>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                    By need
                  </h3>
                  <ul className="space-y-2">
                    {megaMenuData.byNeed.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="block text-sm font-medium text-foreground/90 transition-colors hover:text-[#5624d0] dark:hover:text-purple-300 hover:translate-x-0.5 transform duration-150"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: By team */}
                <div>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                    By team
                  </h3>
                  <ul className="space-y-2">
                    {megaMenuData.byTeam.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="block text-sm font-medium text-foreground/90 transition-colors hover:text-[#5624d0] dark:hover:text-purple-300 hover:translate-x-0.5 transform duration-150"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 3: By industry */}
                <div>
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground/80">
                    By industry
                  </h3>
                  <ul className="space-y-2">
                    {megaMenuData.byIndustry.map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="block text-sm font-medium text-foreground/90 transition-colors hover:text-[#5624d0] dark:hover:text-purple-300 hover:translate-x-0.5 transform duration-150"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/what-we-do#how-we-do-it"
            className="px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
          >
            How we do it
          </Link>

          <Link
            href="/business/resources"
            className="px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
          >
            Resources
          </Link>

          <Link
            href="/business/plans"
            className="px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
          >
            Plans
          </Link>

          <Link
            href="/categories/ai-data"
            className="flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-foreground transition-colors hover:text-foreground/70"
          >
            AI Transformation
            <Sparkles className="h-3.5 w-3.5 fill-current text-purple-600 dark:text-purple-400" />
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="text-sm font-bold text-foreground transition-colors hover:text-foreground/70"
          >
            Login
          </Link>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-md bg-foreground px-5 py-2.5 text-sm font-bold text-background transition-all hover:bg-foreground/90">
                Get started
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Get started with SurePassIQ Business</DialogTitle>
              <DialogDescription>
                Empower your organization with tailored learning pathways, custom team analytics, and dedicated support.
              </DialogDescription>
              <div className="mt-4 text-sm text-muted-foreground">
                Reach out directly at{" "}
                <a
                  className="font-semibold text-primary underline"
                  href="mailto:support@surepassiq.com"
                >
                  support@surepassiq.com
                </a>
              </div>
              <DialogFooter>
                <Button asChild className="bg-foreground text-background">
                  <a href="mailto:support@surepassiq.com">Contact Sales</a>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-md border-border/80"
            aria-label="Language selector"
          >
            <Globe className="h-4 w-4 text-foreground" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "absolute left-0 right-0 top-full z-50 border-b border-border bg-background transition-all lg:hidden",
          isMenuOpen ? "max-h-[85vh] overflow-y-auto" : "max-h-0 overflow-hidden border-b-0"
        )}
      >
        <nav className="flex flex-col p-4 space-y-4">
          <div>
            <div className="py-2 text-sm font-bold text-foreground">What we do</div>
            <div className="ml-3 space-y-3 border-l border-border pl-3 pt-1">
              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase mb-1">By need</div>
                {megaMenuData.byNeed.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block py-1 text-sm text-foreground/80 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase mb-1">By team</div>
                {megaMenuData.byTeam.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block py-1 text-sm text-foreground/80 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div>
                <div className="text-xs font-bold text-muted-foreground uppercase mb-1">By industry</div>
                {megaMenuData.byIndustry.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block py-1 text-sm text-foreground/80 hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/what-we-do#how-we-do-it"
            className="py-2 text-sm font-medium text-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            How we do it
          </Link>

          <Link
            href="/business/resources"
            className="py-2 text-sm font-medium text-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            Resources
          </Link>

          <Link
            href="/business/plans"
            className="py-2 text-sm font-medium text-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            Plans
          </Link>

          <Link
            href="/categories/ai-data"
            className="flex items-center gap-2 py-2 text-sm font-medium text-foreground"
            onClick={() => setIsMenuOpen(false)}
          >
            AI Transformation
            <Sparkles className="h-4 w-4 text-purple-600" />
          </Link>

          <div className="pt-4 border-t border-border flex flex-col gap-3">
            <Link
              href="/login"
              className="text-center py-2 text-sm font-bold text-foreground border border-border rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full rounded-md bg-foreground font-bold text-background">
                  Get started
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Get started with SurePassIQ Business</DialogTitle>
                <DialogDescription>
                  Empower your organization with tailored learning pathways, custom team analytics, and dedicated support.
                </DialogDescription>
                <div className="mt-4 text-sm text-muted-foreground">
                  Reach out directly at{" "}
                  <a className="font-semibold text-primary underline" href="mailto:support@surepassiq.com">
                    support@surepassiq.com
                  </a>
                </div>
                <DialogFooter>
                  <Button asChild className="bg-foreground text-background">
                    <a href="mailto:support@surepassiq.com">Contact Sales</a>
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </nav>
      </div>
    </header>
  );
}

