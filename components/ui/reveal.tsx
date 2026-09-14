"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms — keep siblings within the 30-80ms band. */
  delay?: number;
}

/**
 * Fades + lifts content into view the first time it scrolls into the
 * viewport. Marketing-only: never wraps functional/interactive UI where a
 * user reads or acts on data. Reduced motion keeps the opacity fade and
 * drops the movement, per prefers-reduced-motion guidance.
 */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={cn(
        "transition-[opacity,transform] duration-500 ease-out-strong motion-reduce:transition-opacity motion-reduce:duration-300",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3 motion-reduce:translate-y-0",
        className,
      )}
    >
      {children}
    </div>
  );
}
