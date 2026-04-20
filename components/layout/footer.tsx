import Link from "next/link";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

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
    { label: "Surepass IQ for Business", href: "/business" },
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

        {/* Top CTA Section */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 border-b border-background/10 pb-12 lg:flex-row lg:items-center">
          <div className="max-w-sm">
            <h3 className="mb-1.5 text-lg font-semibold tracking-tight text-background">
              Learn with one trusted institution
            </h3>
            <p className="text-sm leading-relaxed text-background/50">
              Study with curated programs designed and delivered by our academic team.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 rounded-lg border-background/20 bg-transparent text-background/80 hover:border-background/50 hover:bg-background/5 hover:text-background transition-colors"
            asChild
          >
            <Link href="/categories">Browse courses</Link>
          </Button>
        </div>

        {/* Links Grid */}
        <div className="mb-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {[
            { title: "Company", links: footerLinks.company },
            { title: "Community", links: footerLinks.community },
            { title: "Institution", links: footerLinks.institution },
            { title: "Help", links: footerLinks.help },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-background/40">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/60 transition-colors duration-150 hover:text-background"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-start justify-between gap-4 border-t border-background/10 pt-8 md:flex-row md:items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center opacity-80 transition-opacity hover:opacity-100"
            aria-label="Surepass IQ home"
          >
            <Image src="/footer.png" alt="Surepass IQ" width={40} height={40} />
          </Link>

          {/* Legal Links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-background/40">
            <span>© 2026 Surepass IQ</span>
            <Link href="/terms" className="hover:text-background/70 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-background/70 transition-colors">Privacy Policy</Link>
            <Link href="/cookies" className="hover:text-background/70 transition-colors">Cookie Settings</Link>
          </div>

          {/* Language Selector */}
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 rounded-lg text-xs text-background/40 hover:bg-background/5 hover:text-background/70 transition-colors"
          >
            <Globe className="h-3.5 w-3.5" />
            English
          </Button>
        </div>
      </div>
    </footer>
  );
}