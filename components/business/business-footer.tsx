import Link from "next/link";
import { Globe } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Overview", href: "/business#overview" },
    { label: "Features", href: "/business#features" },
    { label: "Impact", href: "/business#overview" },
    { label: "Case Studies", href: "/business/case-studies" },
  ],
  solutions: [
    { label: "Enterprise", href: "/business/enterprise" },
    { label: "Small Business", href: "/business/small-business" },
    { label: "Government", href: "/business/government" },
    { label: "Nonprofit", href: "/business/nonprofit" },
  ],
  resources: [
    { label: "Blog", href: "/business/blog" },
    { label: "Help Center", href: "/business/help" },
    { label: "Webinars", href: "/business/webinars" },
    { label: "API Docs", href: "/business/api" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Press", href: "/press" },
  ],
};

export function BusinessFooter() {
  return (
    <footer className="border-t border-border bg-foreground py-16 text-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-6">
        <div className="grid gap-10 lg:grid-cols-6">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <Link href="/business" className="flex items-center gap-3">
              <span className="text-xl font-bold">SurePassIQ</span>
              <span className="border-l border-background/20 pl-3 text-sm text-background/60">
                Business
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-background/60">
              Accelerate corporate learning across Southern Africa with a startup-built platform designed for local teams and regional growth.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-background/60">
              <Globe className="h-4 w-4" />
              <span>English</span>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-background/40">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-background/40">
              Solutions
            </h3>
            <ul className="space-y-3">
              {footerLinks.solutions.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-background/40">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-background/40">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-background/60 transition-colors hover:text-background"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-8 md:flex-row">
          <p className="text-sm text-background/40">
            &copy; {new Date().getFullYear()} SurePassIQ, Inc. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/terms"
              className="text-sm text-background/40 transition-colors hover:text-background"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-background/40 transition-colors hover:text-background"
            >
              Privacy Policy
            </Link>
            <Link
              href="/cookies"
              className="text-sm text-background/40 transition-colors hover:text-background"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
