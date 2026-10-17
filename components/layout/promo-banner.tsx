"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

const DISMISS_KEY = "surepassiq-promo-dismissed";

export function PromoBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let cancelled = false;

    try {
      const dismissed = localStorage.getItem(DISMISS_KEY) === "1";
      queueMicrotask(() => {
        if (!cancelled) {
          setIsVisible(!dismissed);
        }
      });
    } catch {
      queueMicrotask(() => {
        if (!cancelled) {
          setIsVisible(true);
        }
      });
    }

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore storage errors (private browsing, blocked storage, etc.)
    }
  };

  if (!isVisible) return null;

  return (
    <div className="relative flex items-center justify-center bg-[#5b3df0] px-10 py-2.5 text-center text-xs font-medium text-white sm:text-sm">
      <p className="text-balance">
        <Link href="/categories" className="font-bold underline underline-offset-2">
          Personal Plan
        </Link>{" "}
        is your career sidekick: Build, practice, and prove the skills your career actually needs.
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss promo banner"
        className="absolute right-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15 hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
