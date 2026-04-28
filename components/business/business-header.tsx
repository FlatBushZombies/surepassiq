"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  {
    label: "Why SurePassIQ",
    href: "#",
    submenu: [
      { label: "Overview", href: "/business#overview" },
      { label: "How it works", href: "/business#how-it-works" },
      { label: "Case studies", href: "/business/case-studies" },
    ],
  },
  {
    label: "Solutions",
    href: "#",
    submenu: [
      { label: "Enterprise", href: "/business/enterprise" },
      { label: "Small Business", href: "/business/small-business" },
      { label: "Government", href: "/business/government" },
    ],
  },
  { label: "Resources", href: "/business/resources" },
  { label: "Impact", href: "/business#overview" },
];

export function BusinessHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link href="/business" className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-foreground">
            SurePassIQ
          </span>
          <span className="border-l border-border pl-3 text-sm font-medium text-muted-foreground">
            Business
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center lg:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.submenu && setOpenSubmenu(item.label)}
              onMouseLeave={() => setOpenSubmenu(null)}
            >
              <Link
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-sm text-foreground transition-colors hover:text-muted-foreground"
              >
                {item.label}
                {item.submenu && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>
              {item.submenu && (
                <div
                  className={cn(
                    "absolute left-0 top-full min-w-[200px] border border-border bg-background py-2 shadow-lg transition-all",
                    openSubmenu === item.label
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  )}
                >
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-muted"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className="text-sm text-foreground transition-colors hover:text-muted-foreground"
          >
            Log in
          </Link>
          <Button variant="outline" className="rounded-none border-foreground text-sm font-bold" asChild>
            <Link href="/business/demo">Request a demo</Link>
          </Button>
          <Button className="rounded-none bg-foreground text-sm font-bold text-background hover:bg-foreground/90" asChild>
            <Link href="/business/start">Get started</Link>
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

      {/* Mobile Menu */}
      <div
        className={cn(
          "absolute left-0 right-0 top-full z-50 border-b border-border bg-background transition-all lg:hidden",
          isMenuOpen ? "max-h-[80vh] overflow-y-auto" : "max-h-0 overflow-hidden border-b-0"
        )}
      >
        <nav className="flex flex-col p-4">
          {navItems.map((item) => (
            <div key={item.label}>
              <Link
                href={item.href}
                className="block py-3 text-sm font-medium text-foreground"
                onClick={() => !item.submenu && setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.submenu && (
                <div className="ml-4 border-l border-border pl-4">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block py-2 text-sm text-muted-foreground"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-6 flex flex-col gap-3 border-t border-border pt-6">
            <Button variant="outline" className="w-full rounded-none border-foreground font-bold" asChild>
              <Link href="/business/demo">Request a demo</Link>
            </Button>
            <Button className="w-full rounded-none bg-foreground font-bold text-background" asChild>
              <Link href="/business/start">Get started</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
