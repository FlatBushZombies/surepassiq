import Link from "next/link";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const footerLinks = {
  company: [
    { label: "About us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact us", href: "/contact" },
  ],
  community: [
    { label: "Affiliates", href: "/affiliates" },
    { label: "Partners", href: "/partners" },
    { label: "Investors", href: "/investors" },
    { label: "StudyTech Business", href: "/business" },
  ],
  institution: [
    { label: "Academic Calendar", href: "/academic-calendar" },
    { label: "Learning Support", href: "/learning-support" },
    { label: "Student Portal", href: "/student-portal" },
    { label: "Campus News", href: "/news" },
  ],
  help: [
    { label: "Help and Support", href: "/support" },
    { label: "Trust & Safety", href: "/trust-safety" },
    { label: "Accessibility", href: "/accessibility" },
    { label: "Sitemap", href: "/sitemap" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-6">
        {/* Top Section */}
        <div className="mb-12 flex flex-col items-start justify-between gap-8 border-b border-muted-foreground/20 pb-12 lg:flex-row lg:items-center">
          <div className="max-w-md">
            <h3 className="mb-2 text-xl font-semibold text-background">
              Learn with one trusted institution
            </h3>
            <p className="text-sm text-muted">
              Study with curated programs designed and delivered by our academic team.
            </p>
          </div>
          <Button
            variant="outline"
            className="border-background bg-transparent text-background hover:bg-background hover:text-foreground"
            asChild
          >
            <Link href="/categories">Browse courses</Link>
          </Button>
        </div>

        {/* Links Grid */}
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h4 className="mb-4 text-sm font-semibold text-background">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-background">Community</h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-background">Institution</h4>
            <ul className="space-y-3">
              {footerLinks.institution.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold text-background">Help</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-muted-foreground/20 pt-8 md:flex-row">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-base font-bold text-primary-foreground">S</span>
              </div>
              <span className="text-lg font-bold text-background">StudyTech</span>
            </Link>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-muted">
            <span>© 2025 StudyTech, Inc.</span>
            <Link href="/terms" className="hover:text-background">Terms</Link>
            <Link href="/privacy" className="hover:text-background">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-background">Cookie Settings</Link>
          </div>

          <Button variant="ghost" size="sm" className="gap-2 text-muted hover:bg-muted-foreground/10 hover:text-background">
            <Globe className="h-4 w-4" />
            English
          </Button>
        </div>
      </div>
    </footer>
  );
}
