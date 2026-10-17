/**
 * Zimbabwe intersection right-of-way rules for the Driving Theory course's
 * "Intersection Rules" tab. Consolidated from this course's own existing
 * module content and quiz explanations (constants/index.ts,
 * driving-theory-hazard-perception course, "Intersection Rules" module) —
 * provisionallessons.co.zw has no dedicated intersection-rules page
 * (confirmed 404), so no new facts are introduced here.
 */
export interface IntersectionRule {
  id: string;
  title: string;
  summary: string;
  details: string[];
}

export const intersectionRules: IntersectionRule[] = [
  {
    id: "uncontrolled",
    title: "Right of Way at Uncontrolled Intersections",
    summary: "Who gives way when there are no signs or robots.",
    details: [
      "Without signs or signals, the vehicle approaching from the right generally has right of way.",
      "Apply the give-way-to-the-right rule: slow down on approach and be ready to stop for traffic on your right.",
    ],
  },
  {
    id: "four-way-stop",
    title: "Robots & Four-Way Stops",
    summary: "Reading traffic-light sequences and stop-street priority correctly.",
    details: [
      "At a four-way stop, every vehicle must come to a complete stop regardless of arrival order.",
      "When two vehicles arrive at the same time, the vehicle to the right has priority and proceeds first.",
    ],
  },
  {
    id: "roundabouts",
    title: "Roundabouts",
    summary: "Entering, circulating, and exiting a roundabout safely.",
    details: [
      "Give way to traffic already circulating on the roundabout before entering.",
      "Keep to the correct lane for your exit and signal left just before leaving the roundabout.",
    ],
  },
];
