"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useLearner } from "@/components/learning/learner-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WishlistPage() {
  const { toggleWishlist, wishlistCourses } = useLearner();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Heart className="h-5 w-5 text-primary" />
          Wishlist
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Save courses you want to revisit and start later.
        </p>
      </CardHeader>
      <CardContent>
        {wishlistCourses.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {wishlistCourses.map((course) => (
              <article key={course.slug} className="overflow-hidden rounded-2xl border border-border">
                <div className="relative aspect-video">
                  <Image src={course.image} alt={course.title} fill className="object-cover" />
                </div>
                <div className="space-y-4 p-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
                      {course.category}
                    </p>
                    <h2 className="text-lg font-semibold text-foreground">{course.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground">{course.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild>
                      <Link href={`/course/${course.slug}`}>View course</Link>
                    </Button>
                    <Button variant="outline" onClick={() => toggleWishlist(course.slug)}>
                      Remove
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-10 text-center">
            <p className="text-lg font-semibold text-foreground">Your wishlist is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Save interesting courses from the catalog and they will appear here.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/categories">Browse courses</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
