import { categories, type Course } from "@/constants";

export type CourseSort =
  | "popular"
  | "rating"
  | "newest"
  | "price-low"
  | "price-high"
  | "title";

export interface CourseFilterOptions {
  query?: string;
  level?: string;
  category?: string;
  topic?: string;
  sort?: CourseSort;
}

export function getFirstValue(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export function normalizeSearchValue(value: string | undefined): string {
  return value?.trim().toLowerCase() ?? "";
}

export function getCourseCategorySlug(categoryName: string): string {
  return (
    categories.find((category) => category.name === categoryName)?.slug ??
    categoryName.toLowerCase().replace(/\s+/g, "-")
  );
}

export function matchesCourseQuery(course: Course, query: string): boolean {
  if (!query) {
    return true;
  }

  const searchableText = [
    course.title,
    course.description,
    course.category,
    course.subcategory,
    course.instructor.name,
    ...course.skills,
    ...course.whatYouWillLearn,
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query);
}

export function filterCourses(
  courseList: Course[],
  options: CourseFilterOptions,
): Course[] {
  const query = normalizeSearchValue(options.query);
  const level = normalizeSearchValue(options.level);
  const category = normalizeSearchValue(options.category);
  const topic = normalizeSearchValue(options.topic);

  return courseList.filter((course) => {
    const matchesQuery = matchesCourseQuery(course, query);
    const matchesLevel =
      !level || level === "all" || course.level.toLowerCase() === level;
    const matchesCategory =
      !category ||
      category === "all" ||
      getCourseCategorySlug(course.category) === category;
    const matchesTopic =
      !topic || topic === "all" || course.subcategory.toLowerCase() === topic;

    return matchesQuery && matchesLevel && matchesCategory && matchesTopic;
  });
}

export function sortCourses(courseList: Course[], sort: CourseSort = "popular") {
  return [...courseList].sort((left, right) => {
    switch (sort) {
      case "rating":
        return right.rating - left.rating;
      case "newest":
        return Date.parse(right.lastUpdated) - Date.parse(left.lastUpdated);
      case "price-low":
        return left.price - right.price;
      case "price-high":
        return right.price - left.price;
      case "title":
        return left.title.localeCompare(right.title);
      case "popular":
      default:
        return right.studentsCount - left.studentsCount;
    }
  });
}

export function getCatalogLevels() {
  return ["All Levels", "Beginner", "Intermediate", "Advanced"] as const;
}

/**
 * Deterministic star-distribution (5-star down to 1-star) derived from a
 * course's average rating, for display only — not based on individual
 * reviews, since per-review data doesn't exist in the catalog.
 */
export function getRatingDistribution(rating: number): { stars: number; percent: number }[] {
  const clampedRating = Math.min(5, Math.max(1, rating));
  const weights = [5, 4, 3, 2, 1].map((stars) => {
    const distance = Math.abs(clampedRating - stars);
    return Math.max(0, 1 - distance / 2.5) ** 3;
  });
  const total = weights.reduce((sum, weight) => sum + weight, 0) || 1;

  return weights.map((weight, index) => ({
    stars: 5 - index,
    percent: Math.round((weight / total) * 100),
  }));
}
