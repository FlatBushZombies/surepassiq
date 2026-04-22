"use client";

import { FormEvent, startTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CatalogSearchFormProps {
  placeholder?: string;
  destination?: string;
  initialQuery?: string;
  buttonLabel?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  compact?: boolean;
}

export function CatalogSearchForm({
  placeholder = "Search courses",
  destination = "/categories",
  initialQuery = "",
  buttonLabel = "Search",
  className,
  inputClassName,
  buttonClassName,
  compact = false,
}: CatalogSearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      params.set("query", trimmedQuery);
    }

    startTransition(() => {
      router.push(
        params.toString() ? `${destination}?${params.toString()}` : destination,
      );
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={className ?? "flex flex-col gap-3 sm:flex-row"}
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
        <Input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className={inputClassName ?? "pl-10"}
        />
      </div>
      <Button
        type="submit"
        className={buttonClassName}
        size={compact ? "sm" : "lg"}
      >
        {buttonLabel}
      </Button>
    </form>
  );
}
