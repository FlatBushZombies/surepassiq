"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { roadSigns, roadSignCategories } from "@/constants/road-signs";

const ALL_CATEGORIES = "all";

export function DrivingRoadSigns() {
  const [highlightedSignId, setHighlightedSignId] = useState<string | null>(null);
  const [category, setCategory] = useState<string>(ALL_CATEGORIES);

  const chart1Signs = roadSigns.filter((sign) => sign.chart === 1);
  const chart2Signs = roadSigns.filter((sign) => sign.chart === 2);
  const visibleSigns = roadSigns.filter(
    (sign) => category === ALL_CATEGORIES || sign.category === category,
  );
  const categoryCounts = [
    { label: "All", value: ALL_CATEGORIES, count: roadSigns.length },
    ...roadSignCategories.map((cat) => ({
      label: cat,
      value: cat,
      count: roadSigns.filter((sign) => sign.category === cat).length,
    })),
  ];

  const jumpToSign = (signId: string) => {
    setHighlightedSignId(signId);
    document.getElementById(`sign-${signId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h3 className="text-2xl font-bold text-card-foreground">
          Zimbabwe Road Signs — Chart 1 &amp; Chart 2
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Browse every road sign covered in this course, grouped by official chart and category.
        </p>

        {/* Chart 1 / Chart 2 jump dropdowns */}
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <Select onValueChange={jumpToSign}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Jump to a Chart 1 sign" />
            </SelectTrigger>
            <SelectContent>
              {chart1Signs.map((sign) => (
                <SelectItem key={sign.id} value={sign.id}>
                  {sign.code} — {sign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={jumpToSign}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Jump to a Chart 2 sign" />
            </SelectTrigger>
            <SelectContent>
              {chart2Signs.map((sign) => (
                <SelectItem key={sign.id} value={sign.id}>
                  {sign.code} — {sign.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category filter pills with counts */}
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categoryCounts.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setCategory(item.value)}
              className={`flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === item.value
                  ? "bg-red-700 text-white"
                  : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              }`}
            >
              {item.label}
              <span
                className={`text-xs ${
                  category === item.value ? "text-white/80" : "text-muted-foreground/70"
                }`}
              >
                {item.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h4 className="text-lg font-bold text-card-foreground">Road signs library</h4>
        <div className="mt-5 grid gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visibleSigns.map((sign) => (
            <div
              key={sign.id}
              id={`sign-${sign.id}`}
              className={`overflow-hidden rounded-xl border bg-background/50 transition ${
                highlightedSignId === sign.id
                  ? "border-primary ring-2 ring-primary"
                  : "border-border"
              }`}
            >
              <div className="relative h-24 w-full bg-muted/30">
                <Image
                  src={sign.imageUrl}
                  alt={`${sign.name} (${sign.code}) road sign`}
                  fill
                  className="object-contain p-3"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />
              </div>
              <div className="space-y-1.5 p-3">
                <div className="flex flex-wrap items-center gap-1">
                  <Badge variant="outline" className="text-[10px]">Chart {sign.chart}</Badge>
                </div>
                <p className="text-sm font-bold text-card-foreground">
                  {sign.name} <span className="text-muted-foreground">({sign.code})</span>
                </p>
                <p className="text-xs text-muted-foreground">{sign.description}</p>
              </div>
            </div>
          ))}
        </div>

        {visibleSigns.length === 0 && (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No signs match this category.
          </p>
        )}
      </div>
    </div>
  );
}
