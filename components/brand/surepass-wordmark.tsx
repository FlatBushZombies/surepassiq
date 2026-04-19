import Image from "next/image";
import { cn } from "@/lib/utils";

const BRAND = "Surepass IQ";

/**
 * Renders the platform name with each letter "s" / "S" replaced by the logo mark.
 */
export function SurepassWordmark({
  className,
  logoClassName,
}: {
  className?: string;
  logoClassName?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-wrap items-baseline gap-px font-bold tracking-tight text-foreground",
        className
      )}
    >
      {BRAND.split("").map((char, i) =>
        char.toLowerCase() === "s" ? (
          <Image
            key={i}
            src="/logo-mark.svg"
            alt=""
            width={24}
            height={24}
            className={cn(
              "inline-block h-[1em] w-[1em] shrink-0 translate-y-[0.08em] object-contain",
              logoClassName
            )}
            aria-hidden
          />
        ) : (
          <span key={i}>{char}</span>
        )
      )}
    </span>
  );
}
