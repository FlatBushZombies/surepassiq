"use client";

import { startTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { getCatalogLevels, type CourseSort } from "@/lib/catalog";

const sortOptions: { label: string; value: CourseSort }[] = [
  { label: "Most popular", value: "popular" },
  { label: "Highest rated", value: "rating" },
  { label: "Newest", value: "newest" },
  { label: "Price: low to high", value: "price-low" },
  { label: "Price: high to low", value: "price-high" },
  { label: "Title", value: "title" },
];

interface CatalogToolbarProps {
  searchPlaceholder?: string;
  categories?: { label: string; value: string }[];
  topics?: { label: string; value: string }[];
}

export function CatalogToolbar({
  searchPlaceholder = "Search courses, skills, or instructors",
  categories = [],
  topics = [],
}: CatalogToolbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(name: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value || value === "all") {
      params.delete(name);
    } else {
      params.set(name, value);
    }

    startTransition(() => {
      router.push(params.toString() ? `${pathname}?${params.toString()}` : pathname);
    });
  }

  function clearFilters() {
    startTransition(() => router.push(pathname));
  }

  return (
    <section className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <SlidersHorizontal className="h-4 w-4 text-primary" />
        <h2 className="text-sm font-semibold text-card-foreground">Search and filter</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_repeat(3,minmax(0,1fr))_auto]">
        <div className="space-y-2">
          <Label htmlFor="catalog-query">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/60" />
            <Input
              id="catalog-query"
              placeholder={searchPlaceholder}
              defaultValue={searchParams.get("query") ?? ""}
              className="pl-10"
              onKeyDown={(event) => {
                if (event.key !== "Enter") {
                  return;
                }

                updateParam("query", event.currentTarget.value.trim());
              }}
              onBlur={(event) => updateParam("query", event.currentTarget.value.trim())}
            />
          </div>
        </div>

        {categories.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="catalog-category">Category</Label>
            <select
              id="catalog-category"
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
              value={searchParams.get("category") ?? "all"}
              onChange={(event) => updateParam("category", event.target.value)}
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {topics.length > 0 && (
          <div className="space-y-2">
            <Label htmlFor="catalog-topic">Topic</Label>
            <select
              id="catalog-topic"
              className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
              value={searchParams.get("topic") ?? "all"}
              onChange={(event) => updateParam("topic", event.target.value)}
            >
              <option value="all">All topics</option>
              {topics.map((topic) => (
                <option key={topic.value} value={topic.value}>
                  {topic.label}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="catalog-level">Level</Label>
          <select
            id="catalog-level"
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
            value={searchParams.get("level") ?? "all"}
            onChange={(event) => updateParam("level", event.target.value)}
          >
            {getCatalogLevels().map((level) => (
              <option
                key={level}
                value={level === "All Levels" ? "all" : level.toLowerCase()}
              >
                {level}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="catalog-sort">Sort by</Label>
          <select
            id="catalog-sort"
            className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs"
            value={searchParams.get("sort") ?? "popular"}
            onChange={(event) => updateParam("sort", event.target.value)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <Button type="button" variant="outline" onClick={clearFilters}>
            Reset
          </Button>
        </div>
      </div>
    </section>
  );
}
