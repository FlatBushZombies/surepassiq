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
    <div className="relative flex items-center justify-center bg-[#E6E6EE] px-10 py-4 text-center text-xs font-medium text-slate-900 sm:text-sm">
      <p className="text-balance">
        <Link href="/categories" className="font-bold underline underline-offset-2">
          Get access
        </Link>{" "}
         to top courses for as little as $5.99.
      </p>
      <button
        type="button"
        onClick={handleDismiss}
        aria-label="Dismiss promo banner"
        className="absolute right-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-slate-900/70 transition-colors hover:bg-black/10 hover:text-slate-900"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
