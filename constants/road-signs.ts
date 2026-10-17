/**
 * Zimbabwe road signs reference data for the Driving Theory course's
 * "Road Signs" tab. Chart 1 / Chart 2 and the category names below follow
 * provisionallessons.co.zw's own sign taxonomy (Chart 1 = Regulatory family,
 * Chart 2 = Warning family). Every image is a previously-verified Wikimedia
 * Commons SADC road sign SVG, already used elsewhere in this course.
 */
export interface RoadSign {
  id: string;
  code: string;
  name: string;
  chart: 1 | 2;
  category: string;
  imageUrl: string;
  description: string;
}

export const roadSigns: RoadSign[] = [
  // Chart 1 — Regulatory family
  {
    id: "r1",
    code: "R1",
    name: "Stop",
    chart: 1,
    category: "Control Signs",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/SADC_road_sign_R1.svg",
    description:
      "You must come to a complete stop before proceeding, even if the road looks clear.",
  },
  {
    id: "r2",
    code: "R2",
    name: "Give Way",
    chart: 1,
    category: "Control Signs",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/SADC_road_sign_R2.svg",
    description:
      "Slow down and give way to traffic on the road you are entering, stopping only if necessary.",
  },
  {
    id: "r3",
    code: "R3",
    name: "No Entry",
    chart: 1,
    category: "Prohibition Signs",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/SADC_road_sign_R3.svg",
    description: "Prohibits all vehicles from entering that road or lane.",
  },
  {
    id: "r201-60",
    code: "R201-60",
    name: "Speed Limit 60 km/h",
    chart: 1,
    category: "Prohibition Signs",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/SADC_road_sign_R201-60.svg",
    description: "A circular sign with a red border showing the maximum speed limit in km/h.",
  },
  {
    id: "r105",
    code: "R105",
    name: "Turn Left",
    chart: 1,
    category: "Command Signs",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/SADC_road_sign_R105.svg",
    description: "A mandatory direction sign — all traffic must turn left at this point.",
  },
  {
    id: "r137",
    code: "R137",
    name: "Roundabout Direction",
    chart: 1,
    category: "Command Signs",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/SADC_road_sign_R137.svg",
    description: "A mandatory direction sign showing the required direction of travel around a roundabout.",
  },

  // Chart 2 — Warning family
  {
    id: "w301",
    code: "W301",
    name: "Traffic Signal Ahead",
    chart: 2,
    category: "Symbolic Warning Signs",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/SADC_road_sign_W301.svg",
    description: "A traffic signal (commonly called a \"robot\") is ahead — be ready to stop.",
  },
  {
    id: "w306",
    code: "W306",
    name: "Pedestrian Crossing Ahead",
    chart: 2,
    category: "Symbolic Warning Signs",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/SADC_road_sign_W306.svg",
    description: "A pedestrian crossing lies ahead — slow down and watch for people crossing.",
  },
  {
    id: "w201",
    code: "W201",
    name: "Roundabout Ahead",
    chart: 2,
    category: "Road Layout Warning Signs",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/SADC_road_sign_W201.svg",
    description: "A roundabout is ahead — slow down and prepare to give way to traffic already on it.",
  },
  {
    id: "w204",
    code: "W204",
    name: "Sharp Curve Ahead",
    chart: 2,
    category: "Road Layout Warning Signs",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/SADC_road_sign_W204.svg",
    description: "The road ahead bends sharply — reduce speed before entering the curve.",
  },
  {
    id: "w310",
    code: "W310",
    name: "Cattle Ahead",
    chart: 2,
    category: "Symbolic Warning Signs",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/SADC_road_sign_W310.svg",
    description:
      "Cattle may be crossing or wandering onto the road ahead — a common hazard on rural Zimbabwean roads.",
  },
  {
    id: "w357",
    code: "W357",
    name: "Elephants Ahead",
    chart: 2,
    category: "Symbolic Warning Signs",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/SADC_road_sign_W357.svg",
    description: "Elephants may cross the road ahead — common near Zimbabwe's game parks and conservancies.",
  },
  {
    id: "w308",
    code: "W308",
    name: "Children Ahead",
    chart: 2,
    category: "Symbolic Warning Signs",
    imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/SADC_road_sign_W308.svg",
    description: "A school or area with children is ahead — slow down and watch for children near the road.",
  },
];

export const roadSignCategories = Array.from(
  new Set(roadSigns.map((sign) => sign.category)),
);
