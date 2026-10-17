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

        {/* 3 dropdowns: Chart 1 jump, Chart 2 jump, Category filter */}
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
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

          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_CATEGORIES}>All categories</SelectItem>
              {roadSignCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h4 className="text-lg font-bold text-card-foreground">Road signs library</h4>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleSigns.map((sign) => (
            <div
              key={sign.id}
              id={`sign-${sign.id}`}
              className={`overflow-hidden rounded-2xl border bg-background/50 transition ${
                highlightedSignId === sign.id
                  ? "border-primary ring-2 ring-primary"
                  : "border-border"
              }`}
            >
              <div className="relative aspect-square w-full bg-muted/30 p-6">
                <Image
                  src={sign.imageUrl}
                  alt={`${sign.name} (${sign.code}) road sign`}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="space-y-2 p-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <Badge variant="outline">Chart {sign.chart}</Badge>
                  <Badge variant="secondary">{sign.category}</Badge>
                </div>
                <p className="font-bold text-card-foreground">
                  {sign.name} <span className="text-muted-foreground">({sign.code})</span>
                </p>
                <p className="text-sm text-muted-foreground">{sign.description}</p>
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
