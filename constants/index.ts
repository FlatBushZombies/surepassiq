export interface CourseLesson {
  id: string;
  title: string;
  kind: "video" | "reading" | "lab" | "reflection";
  durationMinutes: number;
  summary: string;
  objectives: string[];
}

export interface CourseModule {
  id: string;
  title: string;
  summary: string;
  lessons: CourseLesson[];
}

export interface AssessmentQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctOption: number;
  explanation: string;
}

export interface CourseAssessment {
  id: string;
  title: string;
  description: string;
  passMark: number;
  questions: AssessmentQuestion[];
}

export interface CourseResource {
  id: string;
  title: string;
  kind: "worksheet" | "template" | "checklist" | "guide";
  description: string;
}

export interface PracticalLab {
  id: string;
  title: string;
  durationMinutes: number;
  description: string;
  toolsNeeded: string[];
  steps: string[];
  safetyTips?: string[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  instructor: {
    name: string;
    avatar: string;
    title: string;
  };
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  studentsCount: number;
  duration: string;
  lectures: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "All Levels";
  category: string;
  subcategory: string;
  bestseller?: boolean;
  featured?: boolean;
  lastUpdated: string;
  language: string;
  whatYouWillLearn: string[];
  requirements: string[];
  targetAudience: string[];
  skills: string[];
  modules: CourseModule[];
  assessment: CourseAssessment;
  resources: CourseResource[];
  practicalLabs?: PracticalLab[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  coursesCount: number;
  subcategories: string[];
}

interface CategorySeed {
  id: string;
  name: string;
  slug: string;
  icon: string;
  subcategories: string[];
}

const categorySeeds: CategorySeed[] = [
  {
    id: "1",
    name: "AI & Data",
    slug: "ai-data",
    icon: "AI",
    subcategories: [
      "AI Fundamentals",
      "Prompt Engineering",
      "Data Literacy",
      "Automation Basics",
      "AI Ethics",
    ],
  },
  {
    id: "2",
    name: "Business",
    slug: "business",
    icon: "Biz",
    subcategories: [
      "Communication",
      "Management",
      "Sales",
      "Strategy",
      "Operations",
    ],
  },
  {
    id: "3",
    name: "Design",
    slug: "design",
    icon: "UX",
    subcategories: [
      "UX Design",
      "UI Design",
      "Design Systems",
      "User Research",
      "Prototyping",
    ],
  },
  {
    id: "4",
    name: "Marketing",
    slug: "marketing",
    icon: "Mkt",
    subcategories: [
      "Digital Marketing",
      "SEO",
      "Content Strategy",
      "Social Media",
      "Analytics",
    ],
  },
  {
    id: "5",
    name: "IT & Software",
    slug: "it-software",
    icon: "IT",
    subcategories: [
      "Cybersecurity",
      "Cloud Basics",
      "IT Certifications",
      "Networking",
      "DevOps",
    ],
  },
  {
    id: "6",
    name: "Personal Development",
    slug: "personal-development",
    icon: "Grow",
    subcategories: [
      "Leadership",
      "Productivity",
      "Career Growth",
      "Wellbeing",
      "Communication",
    ],
  },
  {
    id: "7",
    name: "Practical Trades",
    slug: "practical-trades",
    icon: "Trade",
    subcategories: [
      "Plumbing",
      "Aluminum Fabrication",
      "Cellphone & Laptop Repairs",
      "Electrical Basics",
    ],
  },
  {
    id: "8",
    name: "Test Prep",
    slug: "test-prep",
    icon: "Prep",
    subcategories: [
      "Exam Preparation",
      "Certification Practice",
      "Timed Tests",
    ],
  },
];

function createLesson(
  id: string,
  title: string,
  kind: CourseLesson["kind"],
  durationMinutes: number,
  summary: string,
  objectives: string[],
): CourseLesson {
  return { id, title, kind, durationMinutes, summary, objectives };
}

function createCourse(
  course: Omit<Course, "lectures">,
): Course {
  return {
    ...course,
    lectures: course.modules.reduce(
      (total, module) => total + module.lessons.length,
      0,
    ),
  };
}

export const courses: Course[] = [
  createCourse({
    id: "1",
    title: "AI Foundations for Everyday Work",
    slug: "ai-foundations-everyday-work",
    description:
      "Build confidence with modern AI tools, core terminology, safe prompting habits, and practical ways to save time at work.",
    instructor: {
      name: "Dr. Angela Dube",
      avatar:
        "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "AI Learning Lead",
    },
    image:
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 12.99,
    originalPrice: 79.99,
    rating: 4.7,
    reviewsCount: 182,
    studentsCount: 1240,
    duration: "8 hours",
    level: "Beginner",
    category: "AI & Data",
    subcategory: "AI Fundamentals",
    bestseller: true,
    featured: true,
    lastUpdated: "April 2026",
    language: "English",
    whatYouWillLearn: [
      "Explain core AI concepts without relying on hype or jargon",
      "Write effective prompts for summarising, drafting, and planning",
      "Spot common risks such as hallucinations, privacy leaks, and bias",
      "Build repeatable AI habits for email, meetings, and research tasks",
      "Choose the right workflow for when to use AI and when not to",
    ],
    requirements: [
      "No prior AI experience is required",
      "A laptop or smartphone with internet access",
      "A willingness to test prompts and reflect on results",
    ],
    targetAudience: [
      "Professionals new to AI",
      "University students preparing for modern workplaces",
      "Teams adopting AI tools for the first time",
    ],
    skills: [
      "Prompt writing",
      "Responsible AI use",
      "Workflow design",
      "Critical evaluation",
    ],
    modules: [
      {
        id: "m1",
        title: "Understanding the AI landscape",
        summary: "Get grounded in what AI can do, where it helps, and where it fails.",
        lessons: [
          createLesson(
            "l1",
            "What AI is and is not",
            "video",
            18,
            "A plain-language explanation of machine learning, generative AI, and assistive tools.",
            [
              "Differentiate predictive AI from generative AI",
              "Recognise realistic workplace use cases",
            ],
          ),
          createLesson(
            "l2",
            "Responsible AI habits",
            "reading",
            14,
            "A guided reading on privacy, verification, and safe usage patterns.",
            [
              "Identify sensitive information before prompting",
              "Use a verification checklist for outputs",
            ],
          ),
          createLesson(
            "l3",
            "Quick-win AI workflows",
            "lab",
            22,
            "A hands-on lab for summarising notes, drafting responses, and outlining plans.",
            [
              "Use AI to speed up repetitive text work",
              "Capture reusable prompt patterns",
            ],
          ),
        ],
      },
      {
        id: "m2",
        title: "Prompting with intent",
        summary: "Learn a repeatable structure for clearer, more reliable outputs.",
        lessons: [
          createLesson(
            "l4",
            "Prompt anatomy",
            "video",
            16,
            "Break prompts into role, context, task, constraints, and output format.",
            [
              "Write prompts with stronger context",
              "Control tone and output structure",
            ],
          ),
          createLesson(
            "l5",
            "Improving weak prompts",
            "lab",
            24,
            "Refactor vague prompts into structured prompts for real tasks.",
            [
              "Diagnose why a prompt underperforms",
              "Iterate prompts with measurable improvements",
            ],
          ),
          createLesson(
            "l6",
            "Reflection and action plan",
            "reflection",
            10,
            "Turn course ideas into three practical AI routines for your week.",
            [
              "Document a personal AI use policy",
              "Select three repeatable automation habits",
            ],
          ),
        ],
      },
    ],
    assessment: {
      id: "a1",
      title: "AI Foundations Checkpoint",
      description:
        "Test whether you can choose safe AI use cases and structure prompts clearly.",
      passMark: 70,
      questions: [
        {
          id: "q1",
          prompt: "Which prompt is most likely to produce a reliable meeting summary?",
          options: [
            "Summarise this.",
            "Summarise the attached meeting notes in 5 bullet points, list decisions, and flag open questions.",
            "Tell me everything about meetings.",
            "Write something useful from these notes.",
          ],
          correctOption: 1,
          explanation:
            "The best option provides task clarity, format, and a specific output structure.",
        },
        {
          id: "q2",
          prompt: "What is the safest approach when AI generates an unfamiliar statistic?",
          options: [
            "Use it immediately if it sounds reasonable.",
            "Ask AI to repeat it until it sounds more confident.",
            "Verify it against a trusted source before sharing it.",
            "Remove the number and keep the rest unchanged.",
          ],
          correctOption: 2,
          explanation:
            "Verification is essential because generative models can produce convincing false information.",
        },
        {
          id: "q3",
          prompt: "Which task is the strongest fit for a first AI workflow?",
          options: [
            "Making legal decisions without review",
            "Drafting a first version of a weekly report",
            "Approving payroll changes automatically",
            "Replacing all human feedback on student work",
          ],
          correctOption: 1,
          explanation:
            "Drafting and summarising are high-value, lower-risk starting points for AI adoption.",
        },
      ],
    },
    resources: [
      {
        id: "r1",
        title: "Prompt planning worksheet",
        kind: "worksheet",
        description: "A one-page framework for role, context, constraints, and success criteria.",
      },
      {
        id: "r2",
        title: "Responsible AI checklist",
        kind: "checklist",
        description: "A reusable checklist for privacy, facts, approval, and human review.",
      },
    ],
  }),
  createCourse({
    id: "2",
    title: "Prompt Engineering for Teams",
    slug: "prompt-engineering-for-teams",
    description:
      "Create reusable prompt systems for operations, customer support, and internal communication workflows.",
    instructor: {
      name: "Tariro Muchengeti",
      avatar:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "Prompt Systems Consultant",
    },
    image:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 14.99,
    originalPrice: 89.99,
    rating: 4.8,
    reviewsCount: 144,
    studentsCount: 920,
    duration: "7 hours",
    level: "Intermediate",
    category: "AI & Data",
    subcategory: "Prompt Engineering",
    bestseller: true,
    lastUpdated: "April 2026",
    language: "English",
    whatYouWillLearn: [
      "Design prompt templates teams can reuse across departments",
      "Set tone, structure, and quality rules for AI-generated content",
      "Create prompt libraries for support, reporting, and coordination work",
      "Evaluate prompts using output quality rubrics",
      "Reduce rework by standardising instructions and examples",
    ],
    requirements: [
      "Comfort using at least one AI chat tool",
      "Basic understanding of workplace workflows",
    ],
    targetAudience: [
      "Team leads standardising AI use",
      "Operations and support managers",
      "Knowledge workers building internal prompt libraries",
    ],
    skills: [
      "Prompt systems",
      "Workflow standardisation",
      "Quality control",
      "AI governance",
    ],
    modules: [
      {
        id: "m1",
        title: "From individual prompts to team systems",
        summary: "Turn isolated prompt experiments into a repeatable team capability.",
        lessons: [
          createLesson(
            "l1",
            "Prompt patterns that scale",
            "video",
            15,
            "See how examples, constraints, and templates make outputs easier to trust.",
            [
              "Create consistent prompts across repeat tasks",
              "Document patterns that teammates can reuse",
            ],
          ),
          createLesson(
            "l2",
            "Writing with examples",
            "lab",
            21,
            "Build few-shot prompts for customer responses and report summaries.",
            [
              "Use examples to improve style consistency",
              "Reduce ambiguity with worked samples",
            ],
          ),
          createLesson(
            "l3",
            "Prompt quality rubric",
            "reading",
            12,
            "Review a rubric for accuracy, clarity, tone, and actionability.",
            [
              "Score prompt outputs consistently",
              "Spot weak signals before publishing outputs",
            ],
          ),
        ],
      },
      {
        id: "m2",
        title: "Operational prompt libraries",
        summary: "Package prompts into reusable team assets.",
        lessons: [
          createLesson(
            "l4",
            "Support response templates",
            "video",
            14,
            "Create prompt templates for escalation, triage, and polite resolution.",
            [
              "Set response tone and escalation rules",
              "Handle exceptions with structured context",
            ],
          ),
          createLesson(
            "l5",
            "Internal reporting prompts",
            "lab",
            25,
            "Design prompts that transform meeting notes into action-focused reports.",
            [
              "Generate concise internal reports",
              "Control summaries by audience and level of detail",
            ],
          ),
          createLesson(
            "l6",
            "Prompt library handoff",
            "reflection",
            11,
            "Capture naming, ownership, and review rules for your first prompt library.",
            [
              "Document prompt ownership",
              "Create a maintenance plan for prompt templates",
            ],
          ),
        ],
      },
    ],
    assessment: {
      id: "a2",
      title: "Prompt Systems Assessment",
      description:
        "Check whether you can design prompts that teams can adopt and review consistently.",
      passMark: 70,
      questions: [
        {
          id: "q1",
          prompt: "What makes a prompt reusable across a team?",
          options: [
            "It is short and vague so everyone can interpret it differently.",
            "It includes context, expected output format, and review criteria.",
            "It only works for one person who wrote it.",
            "It avoids examples to save time.",
          ],
          correctOption: 1,
          explanation:
            "Reusable prompts work best when they include shared context and explicit success criteria.",
        },
        {
          id: "q2",
          prompt: "Why are examples valuable in a team prompt library?",
          options: [
            "They replace the need for context completely.",
            "They make prompts longer without adding much value.",
            "They help the model infer the desired style and structure.",
            "They guarantee zero hallucinations.",
          ],
          correctOption: 2,
          explanation:
            "Examples improve consistency by showing the model the kind of output expected.",
        },
        {
          id: "q3",
          prompt: "Which governance rule improves a prompt library most?",
          options: [
            "No one owns any prompt so updates happen naturally.",
            "Each prompt has an owner and a review date.",
            "All prompts are final after first publication.",
            "Users should never document changes.",
          ],
          correctOption: 1,
          explanation:
            "Ownership and review cycles keep prompt libraries accurate as workflows evolve.",
        },
      ],
    },
    resources: [
      {
        id: "r1",
        title: "Prompt library template",
        kind: "template",
        description: "A structured template for naming, versioning, and testing team prompts.",
      },
      {
        id: "r2",
        title: "Output review rubric",
        kind: "guide",
        description: "A rubric for scoring accuracy, clarity, tone, and actionability.",
      },
    ],
  }),
  createCourse({
    id: "3",
    title: "Data Analysis with Excel and Power BI",
    slug: "data-analysis-excel-power-bi",
    description:
      "Clean data, build dashboards, and communicate business insights clearly using Excel and Power BI.",
    instructor: {
      name: "Rudo Chari",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "Business Intelligence Trainer",
    },
    image:
      "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 13.99,
    originalPrice: 99.99,
    rating: 4.7,
    reviewsCount: 208,
    studentsCount: 1380,
    duration: "12 hours",
    level: "All Levels",
    category: "AI & Data",
    subcategory: "Data Literacy",
    featured: true,
    lastUpdated: "March 2026",
    language: "English",
    whatYouWillLearn: [
      "Clean and structure business data in Excel",
      "Use formulas, pivots, and data models to answer practical questions",
      "Build Power BI dashboards for leadership reporting",
      "Choose the right chart for the message you need to communicate",
      "Present insights in a way decision-makers can act on quickly",
    ],
    requirements: [
      "A computer with Excel installed",
      "No Power BI experience required",
    ],
    targetAudience: [
      "Analysts and coordinators",
      "Operations professionals working with reports",
      "Students preparing for data-heavy roles",
    ],
    skills: [
      "Excel analysis",
      "Power BI",
      "Dashboard design",
      "Business storytelling",
    ],
    modules: [
      {
        id: "m1",
        title: "Prepare reliable data",
        summary: "Move from messy spreadsheets to clean analysis-ready tables.",
        lessons: [
          createLesson(
            "l1",
            "Structuring raw data",
            "video",
            19,
            "Learn table layouts that support analysis instead of blocking it.",
            [
              "Spot common spreadsheet design mistakes",
              "Prepare raw records for later analysis",
            ],
          ),
          createLesson(
            "l2",
            "Cleaning with formulas",
            "lab",
            28,
            "Fix duplicates, inconsistent text, and missing values using practical formulas.",
            [
              "Clean text and dates in Excel",
              "Use formulas to create analysis-ready columns",
            ],
          ),
          createLesson(
            "l3",
            "Pivot tables that answer questions",
            "lab",
            23,
            "Turn cleaned tables into quick summaries for performance review.",
            [
              "Build pivot tables confidently",
              "Slice results by region, product, and time",
            ],
          ),
        ],
      },
      {
        id: "m2",
        title: "Design dashboards that drive decisions",
        summary: "Translate analysis into visual stories for managers and stakeholders.",
        lessons: [
          createLesson(
            "l4",
            "Power BI model basics",
            "video",
            18,
            "Connect data, shape fields, and prepare visuals with an analyst mindset.",
            [
              "Create a simple reporting model in Power BI",
              "Prepare measures that leadership actually needs",
            ],
          ),
          createLesson(
            "l5",
            "Choosing the right visual",
            "reading",
            13,
            "Study chart choices and how to avoid cluttered dashboards.",
            [
              "Match chart type to analytical question",
              "Reduce visual noise in dashboards",
            ],
          ),
          createLesson(
            "l6",
            "Executive reporting dashboard",
            "lab",
            26,
            "Build a final dashboard that communicates trends, risks, and next actions.",
            [
              "Assemble a polished dashboard",
              "Highlight insights with action-oriented language",
            ],
          ),
        ],
      },
    ],
    assessment: {
      id: "a3",
      title: "Data Storytelling Quiz",
      description:
        "Check whether you can choose correct tools and communicate insights clearly.",
      passMark: 70,
      questions: [
        {
          id: "q1",
          prompt: "What is the best first step before building a dashboard?",
          options: [
            "Choose colors and icons",
            "Clean and structure the source data",
            "Add every metric available",
            "Duplicate sheets for backup",
          ],
          correctOption: 1,
          explanation:
            "Good dashboards depend on clean, structured data before design choices matter.",
        },
        {
          id: "q2",
          prompt: "Which visual is strongest for showing a trend over time?",
          options: ["Pie chart", "Line chart", "Scatter plot", "Word cloud"],
          correctOption: 1,
          explanation:
            "Line charts make it easier to identify direction and change across time periods.",
        },
        {
          id: "q3",
          prompt: "What makes a dashboard decision-friendly?",
          options: [
            "Every available KPI is shown at once",
            "It focuses on a clear audience and a few meaningful questions",
            "It avoids titles to save space",
            "It hides context so viewers interpret it themselves",
          ],
          correctOption: 1,
          explanation:
            "Decision-ready dashboards are designed around audience needs, not data volume.",
        },
      ],
    },
    resources: [
      {
        id: "r1",
        title: "Dashboard planning canvas",
        kind: "worksheet",
        description: "Plan audience, key questions, metrics, and actions before building visuals.",
      },
      {
        id: "r2",
        title: "Excel cleanup checklist",
        kind: "checklist",
        description: "A practical sequence for turning messy data into analysis-ready tables.",
      },
    ],
  }),
  createCourse({
    id: "4",
    title: "AI Workflow Automation for Operations",
    slug: "ai-workflow-automation-operations",
    description:
      "Map repeatable tasks, automate handoffs, and use AI tools to reduce low-value operational work.",
    instructor: {
      name: "Michael Ncube",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "Operations Systems Strategist",
    },
    image:
      "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 15.99,
    originalPrice: 104.99,
    rating: 4.6,
    reviewsCount: 119,
    studentsCount: 740,
    duration: "9 hours",
    level: "Intermediate",
    category: "Business",
    subcategory: "Operations",
    bestseller: true,
    lastUpdated: "April 2026",
    language: "English",
    whatYouWillLearn: [
      "Identify operational processes that are strong candidates for automation",
      "Map handoffs, approvals, and exceptions before introducing automation",
      "Use AI to classify requests, generate drafts, and create summaries",
      "Measure automation impact using cycle time and error rate metrics",
      "Create a rollout plan that includes human review and fallback steps",
    ],
    requirements: [
      "Basic familiarity with operational processes",
      "An interest in process mapping and improvement",
    ],
    targetAudience: [
      "Operations coordinators",
      "Team leads improving internal workflows",
      "Process improvement professionals",
    ],
    skills: [
      "Process mapping",
      "Automation planning",
      "AI-assisted operations",
      "Change management",
    ],
    modules: [
      {
        id: "m1",
        title: "Find the right work to automate",
        summary: "Select high-volume, repeatable work before chasing shiny tools.",
        lessons: [
          createLesson(
            "l1",
            "Automation candidate checklist",
            "reading",
            12,
            "Evaluate effort, volume, risk, and exception handling before you automate.",
            [
              "Prioritise good automation candidates",
              "Avoid workflows that are too unstable to automate",
            ],
          ),
          createLesson(
            "l2",
            "Mapping approvals and handoffs",
            "video",
            17,
            "Document how work moves today so future automation has a clear target.",
            [
              "Map current-state processes clearly",
              "Spot hidden approval bottlenecks",
            ],
          ),
          createLesson(
            "l3",
            "Exception handling workshop",
            "lab",
            22,
            "Design fallback rules for incomplete data, escalation, and review.",
            [
              "Handle edge cases gracefully",
              "Maintain service quality during automation",
            ],
          ),
        ],
      },
      {
        id: "m2",
        title: "Launch and measure automation",
        summary: "Build a rollout and measurement plan that earns trust.",
        lessons: [
          createLesson(
            "l4",
            "AI-supported classification",
            "video",
            18,
            "Use AI for triage, tagging, and routing of incoming work requests.",
            [
              "Use AI to speed up intake workflows",
              "Design routing criteria with human review in mind",
            ],
          ),
          createLesson(
            "l5",
            "Operational success metrics",
            "reading",
            11,
            "Measure time saved, errors avoided, and process stability after launch.",
            [
              "Choose meaningful automation KPIs",
              "Track the effect of automation on quality",
            ],
          ),
          createLesson(
            "l6",
            "Automation rollout plan",
            "reflection",
            14,
            "Draft a pilot plan with stakeholders, safeguards, and feedback loops.",
            [
              "Plan a low-risk automation pilot",
              "Set ownership and review cadence",
            ],
          ),
        ],
      },
    ],
    assessment: {
      id: "a4",
      title: "Automation Readiness Review",
      description:
        "Check whether you can select the right workflow and design safe rollout rules.",
      passMark: 70,
      questions: [
        {
          id: "q1",
          prompt: "Which workflow is strongest for early automation?",
          options: [
            "A rare process with many exceptions",
            "A high-volume repeatable task with clear rules",
            "A legal decision requiring expert judgement",
            "An undefined process with no owner",
          ],
          correctOption: 1,
          explanation:
            "Repeatable tasks with clear rules offer the safest and fastest automation wins.",
        },
        {
          id: "q2",
          prompt: "Why is exception handling important in automation design?",
          options: [
            "It helps you delete human review entirely.",
            "It defines what should happen when the workflow cannot proceed normally.",
            "It reduces the need for process mapping.",
            "It makes metrics unnecessary.",
          ],
          correctOption: 1,
          explanation:
            "Exception paths prevent fragile automation and protect service quality.",
        },
        {
          id: "q3",
          prompt: "Which KPI best reflects operational automation impact?",
          options: [
            "Brand color usage",
            "Cycle time reduction on the target workflow",
            "Number of tabs open in a browser",
            "Social media engagement",
          ],
          correctOption: 1,
          explanation:
            "Cycle time is one of the clearest indicators that a workflow is improving.",
        },
      ],
    },
    resources: [
      {
        id: "r1",
        title: "Automation readiness scorecard",
        kind: "worksheet",
        description: "Score process stability, risk, and automation fit before implementing.",
      },
      {
        id: "r2",
        title: "Pilot rollout checklist",
        kind: "checklist",
        description: "A rollout checklist covering owners, exceptions, KPIs, and communications.",
      },
    ],
  }),
  createCourse({
    id: "5",
    title: "UX Design from Research to Prototype",
    slug: "ux-design-research-to-prototype",
    description:
      "Use research, flows, wireframes, and prototype testing to design products people can actually use.",
    instructor: {
      name: "Sarah Chikafa",
      avatar:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "Senior Product Designer",
    },
    image:
      "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 13.49,
    originalPrice: 84.99,
    rating: 4.8,
    reviewsCount: 167,
    studentsCount: 860,
    duration: "10 hours",
    level: "Beginner",
    category: "Design",
    subcategory: "UX Design",
    featured: true,
    lastUpdated: "March 2026",
    language: "English",
    whatYouWillLearn: [
      "Run lightweight user research and turn findings into design decisions",
      "Create user flows and wireframes for web and mobile products",
      "Prototype interaction patterns and test them with real scenarios",
      "Use design critique and iteration loops to improve usability",
      "Present your design rationale with confidence to teams and stakeholders",
    ],
    requirements: [
      "No design background required",
      "Access to Figma or a similar design tool",
    ],
    targetAudience: [
      "Aspiring UX designers",
      "Product managers collaborating with design teams",
      "Founders improving product usability",
    ],
    skills: [
      "User research",
      "Wireframing",
      "Prototyping",
      "Usability testing",
    ],
    modules: [
      {
        id: "m1",
        title: "Research and define the problem",
        summary: "Start with user needs before touching pixels.",
        lessons: [
          createLesson(
            "l1",
            "Research questions that matter",
            "video",
            15,
            "Frame interviews and observations around user goals and pain points.",
            [
              "Write stronger research questions",
              "Avoid leading users during interviews",
            ],
          ),
          createLesson(
            "l2",
            "Turning findings into flows",
            "lab",
            24,
            "Convert research notes into task flows and prioritised requirements.",
            [
              "Map current and ideal user journeys",
              "Extract design opportunities from raw notes",
            ],
          ),
          createLesson(
            "l3",
            "Wireframing fast",
            "lab",
            21,
            "Create lo-fi wireframes that focus on task clarity before polish.",
            [
              "Use wireframes to test structure",
              "Identify friction points early",
            ],
          ),
        ],
      },
      {
        id: "m2",
        title: "Prototype and validate",
        summary: "Use lightweight validation to improve decisions before handoff.",
        lessons: [
          createLesson(
            "l4",
            "Interactive prototypes",
            "video",
            17,
            "Build prototypes that simulate real tasks and decisions.",
            [
              "Link screens into meaningful user flows",
              "Prototype common interactions with intent",
            ],
          ),
          createLesson(
            "l5",
            "Usability testing basics",
            "reading",
            12,
            "Run simple tests, capture friction, and prioritise fixes.",
            [
              "Plan short usability sessions",
              "Capture findings in a decision-ready format",
            ],
          ),
          createLesson(
            "l6",
            "Design critique and iteration",
            "reflection",
            13,
            "Respond to feedback and decide what to change next.",
            [
              "Interpret critique without losing focus",
              "Prioritise design changes logically",
            ],
          ),
        ],
      },
    ],
    assessment: {
      id: "a5",
      title: "UX Fundamentals Assessment",
      description:
        "Check whether you can connect research, flows, and testing into a coherent design process.",
      passMark: 70,
      questions: [
        {
          id: "q1",
          prompt: "Why do UX designers start with research?",
          options: [
            "To make screens look more artistic",
            "To understand user goals and pain points before proposing solutions",
            "To avoid building prototypes entirely",
            "To replace stakeholder input",
          ],
          correctOption: 1,
          explanation:
            "Research grounds design decisions in real user behaviour and needs.",
        },
        {
          id: "q2",
          prompt: "What is the main purpose of a wireframe?",
          options: [
            "To finalise brand colors",
            "To test structure and content hierarchy quickly",
            "To prepare App Store metadata",
            "To replace user testing",
          ],
          correctOption: 1,
          explanation:
            "Wireframes are useful because they let teams test structure before visual polish.",
        },
        {
          id: "q3",
          prompt: "What should happen after a usability test?",
          options: [
            "Archive the findings and move on",
            "Translate observations into prioritised design changes",
            "Discard the prototype immediately",
            "Change everything users mention without review",
          ],
          correctOption: 1,
          explanation:
            "Testing is valuable when it leads to structured iteration and prioritised improvements.",
        },
      ],
    },
    resources: [
      {
        id: "r1",
        title: "User interview guide",
        kind: "guide",
        description: "A practical interview script for short product discovery sessions.",
      },
      {
        id: "r2",
        title: "Usability test note template",
        kind: "template",
        description: "Capture tasks, friction, evidence, and design actions in one place.",
      },
    ],
  }),
  createCourse({
    id: "6",
    title: "Digital Marketing Strategy Bootcamp",
    slug: "digital-marketing-strategy-bootcamp",
    description:
      "Plan campaigns, create content systems, and use analytics to improve marketing performance.",
    instructor: {
      name: "Mark Thompson",
      avatar:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "Growth Marketing Advisor",
    },
    image:
      "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 12.49,
    originalPrice: 74.99,
    rating: 4.6,
    reviewsCount: 131,
    studentsCount: 990,
    duration: "9 hours",
    level: "All Levels",
    category: "Marketing",
    subcategory: "Digital Marketing",
    bestseller: true,
    lastUpdated: "February 2026",
    language: "English",
    whatYouWillLearn: [
      "Build a marketing strategy around audience, offer, and channel fit",
      "Plan campaign messaging across social, email, and website touchpoints",
      "Create a content calendar with clear goals and KPIs",
      "Use analytics to identify what to double down on and what to stop",
      "Report marketing performance in business language stakeholders understand",
    ],
    requirements: [
      "No advanced marketing background required",
      "A willingness to analyse campaign data and audience behaviour",
    ],
    targetAudience: [
      "Small business owners",
      "Early-career marketers",
      "Teams managing digital campaigns",
    ],
    skills: [
      "Campaign planning",
      "Content strategy",
      "Marketing analytics",
      "Performance reporting",
    ],
    modules: [
      {
        id: "m1",
        title: "Strategy before channels",
        summary: "Clarify audience, goals, and message before you launch campaigns.",
        lessons: [
          createLesson(
            "l1",
            "Audience and offer alignment",
            "video",
            16,
            "Define who you serve, what they need, and why they should care now.",
            [
              "Clarify audience segments",
              "Refine offer-to-audience fit",
            ],
          ),
          createLesson(
            "l2",
            "Messaging framework",
            "lab",
            20,
            "Build campaign messages that connect pain points to your offer.",
            [
              "Write clearer marketing angles",
              "Connect benefits to customer needs",
            ],
          ),
          createLesson(
            "l3",
            "Choosing channels wisely",
            "reading",
            12,
            "Evaluate channels based on audience behaviour and available team capacity.",
            [
              "Pick channels based on evidence",
              "Avoid spreading effort too thin",
            ],
          ),
        ],
      },
      {
        id: "m2",
        title: "Measure and improve",
        summary: "Turn marketing activity into a repeatable improvement loop.",
        lessons: [
          createLesson(
            "l4",
            "Campaign analytics essentials",
            "video",
            18,
            "Track reach, clicks, conversion, and retention without drowning in metrics.",
            [
              "Measure marketing performance sensibly",
              "Choose KPIs that match campaign goals",
            ],
          ),
          createLesson(
            "l5",
            "Content calendar planning",
            "lab",
            19,
            "Create a calendar that aligns themes, formats, and call-to-action timing.",
            [
              "Plan content for consistency",
              "Link content to campaign goals",
            ],
          ),
          createLesson(
            "l6",
            "Reporting to stakeholders",
            "reflection",
            12,
            "Translate campaign results into lessons, risks, and next actions.",
            [
              "Create better performance summaries",
              "Recommend next steps from campaign data",
            ],
          ),
        ],
      },
    ],
    assessment: {
      id: "a6",
      title: "Campaign Strategy Checkpoint",
      description:
        "Check whether you can connect audience, message, channels, and KPIs into one strategy.",
      passMark: 70,
      questions: [
        {
          id: "q1",
          prompt: "What should guide channel selection most?",
          options: [
            "Whatever channel is newest",
            "Where the audience actually pays attention and can act",
            "The channel with the most design trends",
            "Only what competitors use",
          ],
          correctOption: 1,
          explanation:
            "Good channel choices start with audience behaviour and the action you want them to take.",
        },
        {
          id: "q2",
          prompt: "Why do KPIs matter in campaign planning?",
          options: [
            "They replace the need for creative work",
            "They tell you whether the campaign is moving toward its goal",
            "They make audience research unnecessary",
            "They only matter after a campaign fails",
          ],
          correctOption: 1,
          explanation:
            "KPIs connect activity to outcomes and show whether the strategy is working.",
        },
        {
          id: "q3",
          prompt: "What makes a useful stakeholder report?",
          options: [
            "A long list of raw numbers without interpretation",
            "A summary of results, lessons, and recommended next actions",
            "Only screenshots of social media posts",
            "A focus on vanity metrics alone",
          ],
          correctOption: 1,
          explanation:
            "Stakeholders need context and action, not just isolated metrics.",
        },
      ],
    },
    resources: [
      {
        id: "r1",
        title: "Campaign planning board",
        kind: "template",
        description: "Plan audience, message, channel mix, CTA, and KPIs in one place.",
      },
      {
        id: "r2",
        title: "Content calendar starter",
        kind: "template",
        description: "A weekly planning template for themes, formats, owners, and deadlines.",
      },
    ],
  }),
  createCourse({
    id: "7",
    title: "Cybersecurity Basics for Professionals",
    slug: "cybersecurity-basics-for-professionals",
    description:
      "Understand security risks, strengthen daily habits, and respond well to common cyber threats at work.",
    instructor: {
      name: "Farai Mlambo",
      avatar:
        "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "Cybersecurity Awareness Lead",
    },
    image:
      "https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 11.99,
    originalPrice: 69.99,
    rating: 4.7,
    reviewsCount: 154,
    studentsCount: 1120,
    duration: "7 hours",
    level: "All Levels",
    category: "IT & Software",
    subcategory: "Cybersecurity",
    featured: true,
    lastUpdated: "April 2026",
    language: "English",
    whatYouWillLearn: [
      "Recognise common security threats such as phishing and credential theft",
      "Apply practical safeguards for passwords, devices, and shared files",
      "Respond correctly when suspicious activity occurs",
      "Understand why policies such as MFA and access controls matter",
      "Build safer personal and team security habits without specialist jargon",
    ],
    requirements: [
      "No technical background is required",
      "An interest in safe digital working habits",
    ],
    targetAudience: [
      "Office teams and support staff",
      "Students entering digital workplaces",
      "Managers rolling out security awareness",
    ],
    skills: [
      "Threat awareness",
      "Phishing detection",
      "Access hygiene",
      "Incident response basics",
    ],
    modules: [
      {
        id: "m1",
        title: "Recognise everyday cyber risks",
        summary: "Learn the patterns behind the security incidents people face most often.",
        lessons: [
          createLesson(
            "l1",
            "Phishing red flags",
            "video",
            16,
            "Spot urgency tricks, spoofing patterns, and suspicious requests.",
            [
              "Identify common phishing signals",
              "Slow down when messages feel urgent",
            ],
          ),
          createLesson(
            "l2",
            "Password and MFA habits",
            "reading",
            13,
            "Understand how strong credentials and MFA reduce preventable breaches.",
            [
              "Improve login hygiene",
              "Explain the value of MFA clearly",
            ],
          ),
          createLesson(
            "l3",
            "Device and file safety",
            "lab",
            20,
            "Practice secure handling of devices, downloads, and shared documents.",
            [
              "Reduce endpoint risks",
              "Use safer file-sharing behaviours",
            ],
          ),
        ],
      },
      {
        id: "m2",
        title: "Respond and recover well",
        summary: "Know what to do when something suspicious happens.",
        lessons: [
          createLesson(
            "l4",
            "Reporting suspicious activity",
            "video",
            15,
            "Escalate the right information quickly without worsening the issue.",
            [
              "Report incidents faster",
              "Preserve evidence for the security team",
            ],
          ),
          createLesson(
            "l5",
            "Least privilege in practice",
            "reading",
            11,
            "Learn why access should be granted intentionally and reviewed regularly.",
            [
              "Describe least privilege clearly",
              "Connect access controls to risk reduction",
            ],
          ),
          createLesson(
            "l6",
            "Security habit reset",
            "reflection",
            10,
            "Document the daily and weekly habits you will improve after the course.",
            [
              "Define a personal security routine",
              "Turn awareness into action",
            ],
          ),
        ],
      },
    ],
    assessment: {
      id: "a7",
      title: "Cyber Safety Assessment",
      description:
        "Check whether you can recognise risky behaviour and choose the correct response.",
      passMark: 70,
      questions: [
        {
          id: "q1",
          prompt: "Which message is most likely a phishing attempt?",
          options: [
            "A standard calendar reminder from your team lead",
            "An urgent email asking you to verify your password on a strange link",
            "A weekly newsletter you subscribed to",
            "A shared agenda in your official workspace",
          ],
          correctOption: 1,
          explanation:
            "Urgency and suspicious password verification links are classic phishing signals.",
        },
        {
          id: "q2",
          prompt: "What is the strongest reason to enable MFA?",
          options: [
            "It makes passwords optional forever.",
            "It adds a second check even if a password is stolen.",
            "It removes the need for device security.",
            "It blocks all cyber threats completely.",
          ],
          correctOption: 1,
          explanation:
            "MFA reduces account compromise risk even when credentials leak.",
        },
        {
          id: "q3",
          prompt: "What should you do first after clicking a suspicious link?",
          options: [
            "Ignore it and hope nothing happened.",
            "Report the incident quickly according to your organisation's process.",
            "Delete all your email immediately.",
            "Post about it on social media.",
          ],
          correctOption: 1,
          explanation:
            "Prompt reporting helps contain issues and gives responders the best chance to act fast.",
        },
      ],
    },
    resources: [
      {
        id: "r1",
        title: "Phishing spot-check sheet",
        kind: "checklist",
        description: "A quick-reference checklist for reviewing suspicious emails and messages.",
      },
      {
        id: "r2",
        title: "Incident report guide",
        kind: "guide",
        description: "Capture the right details when escalating a security concern.",
      },
    ],
  }),
  createCourse({
    id: "8",
    title: "Leadership and Team Communication",
    slug: "leadership-and-team-communication",
    description:
      "Lead with clarity, coach with empathy, and improve team communication during growth, change, and pressure.",
    instructor: {
      name: "Chris Haroun",
      avatar:
        "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "Leadership Coach and MBA Lecturer",
    },
    image:
      "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
    price: 12.99,
    originalPrice: 82.99,
    rating: 4.8,
    reviewsCount: 221,
    studentsCount: 1590,
    duration: "6 hours",
    level: "All Levels",
    category: "Personal Development",
    subcategory: "Leadership",
    bestseller: true,
    lastUpdated: "March 2026",
    language: "English",
    whatYouWillLearn: [
      "Communicate expectations clearly without becoming rigid or unclear",
      "Handle feedback, conflict, and difficult conversations with more confidence",
      "Coach team members through growth and accountability moments",
      "Create meeting rhythms that improve follow-through and trust",
      "Adapt your leadership approach to different people and situations",
    ],
    requirements: [
      "No formal management role is required",
      "Helpful for anyone leading projects, teams, or peers",
    ],
    targetAudience: [
      "New managers and supervisors",
      "Team leads and project owners",
      "Professionals growing into leadership roles",
    ],
    skills: [
      "Leadership communication",
      "Feedback",
      "Conflict handling",
      "Team coaching",
    ],
    modules: [
      {
        id: "m1",
        title: "Communicate with clarity and trust",
        summary: "Create alignment without overcomplicating your message.",
        lessons: [
          createLesson(
            "l1",
            "Expectation setting",
            "video",
            14,
            "Clarify ownership, quality, deadlines, and support expectations early.",
            [
              "Set expectations more clearly",
              "Reduce avoidable confusion on teams",
            ],
          ),
          createLesson(
            "l2",
            "Feedback that helps people grow",
            "reading",
            12,
            "Use evidence, care, and direction when giving feedback.",
            [
              "Deliver feedback constructively",
              "Separate behaviour from identity",
            ],
          ),
          createLesson(
            "l3",
            "Difficult conversations practice",
            "lab",
            22,
            "Work through common leadership scenarios involving missed expectations and conflict.",
            [
              "Structure hard conversations better",
              "Stay calm during tense moments",
            ],
          ),
        ],
      },
      {
        id: "m2",
        title: "Coach performance and momentum",
        summary: "Keep teams moving with better routines and coaching habits.",
        lessons: [
          createLesson(
            "l4",
            "Team meeting rhythms",
            "video",
            13,
            "Run meetings that drive clarity, decisions, and follow-through.",
            [
              "Plan more effective team meetings",
              "Increase accountability after discussions",
            ],
          ),
          createLesson(
            "l5",
            "Coaching for ownership",
            "reading",
            11,
            "Ask better questions so people grow instead of becoming dependent.",
            [
              "Coach rather than simply instruct",
              "Encourage ownership in teammates",
            ],
          ),
          createLesson(
            "l6",
            "Personal leadership plan",
            "reflection",
            12,
            "Identify the habits that will improve your leadership this month.",
            [
              "Create a short-term growth plan",
              "Choose practical leadership habits to strengthen",
            ],
          ),
        ],
      },
    ],
    assessment: {
      id: "a8",
      title: "Leadership Communication Assessment",
      description:
        "Check whether you can handle expectations, feedback, and coaching with intent.",
      passMark: 70,
      questions: [
        {
          id: "q1",
          prompt: "What makes expectations clear?",
          options: [
            "Leaving details open so people can guess",
            "Explaining ownership, deadline, standard, and support",
            "Only mentioning urgency",
            "Repeating the task title several times",
          ],
          correctOption: 1,
          explanation:
            "Clarity comes from describing the work, timeline, quality bar, and available support.",
        },
        {
          id: "q2",
          prompt: "What improves difficult feedback conversations most?",
          options: [
            "Focusing on evidence and future actions",
            "Avoiding specifics to protect feelings",
            "Waiting until frustration builds",
            "Making the conversation public",
          ],
          correctOption: 0,
          explanation:
            "Constructive feedback is anchored in evidence and the next behaviour to improve.",
        },
        {
          id: "q3",
          prompt: "What is a coaching-focused leadership response?",
          options: [
            "Solving every problem for the employee",
            "Asking guiding questions that build ownership",
            "Removing responsibility from the employee immediately",
            "Avoiding follow-up conversations",
          ],
          correctOption: 1,
          explanation:
            "Coaching grows capability by helping people think through problems and actions.",
        },
      ],
    },
    resources: [
      {
        id: "r1",
        title: "Feedback conversation template",
        kind: "template",
        description: "A structure for preparing direct, respectful coaching conversations.",
      },
      {
        id: "r2",
        title: "Leadership habit tracker",
        kind: "worksheet",
        description: "Track your meeting, coaching, and communication habits week by week.",
      },
    ],
  }),
  createCourse({
    id: "gen-ai-essential",
    title: "Generative AI",
    slug: "generative-ai",
    description: "Master LLMs, ChatGPT, Claude, diffusion models, fine-tuning, and generative application development.",
    instructor: {
      name: "Dr. Angela Dube",
      avatar: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "Lead AI Researcher",
    },
    image: "/courses/gen-AI.jpeg",
    price: 19.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviewsCount: 340,
    studentsCount: 2150,
    duration: "10 hours",
    level: "All Levels",
    category: "AI & Data",
    subcategory: "Generative AI",
    bestseller: true,
    featured: true,
    lastUpdated: "October 2026",
    language: "English",
    whatYouWillLearn: [
      "Understand LLM architecture, attention mechanisms, and tokenization",
      "Build Retrieval-Augmented Generation (RAG) pipelines with vector DBs",
      "Master image and multimodal generation with Midjourney & Stable Diffusion",
      "Fine-tune open-weight models for specialized enterprise tasks",
    ],
    requirements: ["Basic computer literacy", "No prior coding required"],
    targetAudience: ["Professionals", "Developers", "Creatives", "Tech Enthusiasts"],
    skills: ["Generative AI", "LLMs", "RAG Pipelines", "Prompt Engineering"],
    modules: [
      {
        id: "m1",
        title: "Generative AI Core Principles",
        summary: "Foundations of Large Language Models and Generative Architecture.",
        lessons: [
          createLesson("l1", "Transformer Architecture & Attention", "video", 20, "How transformer models process text.", ["Understand self-attention"]),
          createLesson("l2", "Tokens, Context Windows & Temperature", "reading", 15, "Controlling output creativity.", ["Master temperature settings"]),
        ],
      },
      {
        id: "m2",
        title: "Enterprise RAG & Fine-Tuning",
        summary: "Connecting LLMs to custom knowledge bases.",
        lessons: [
          createLesson("l3", "Building a RAG Pipeline", "lab", 30, "Connect vector databases with LLMs.", ["Construct vector index"]),
        ],
      },
    ],
    assessment: {
      id: "a-genai",
      title: "Generative AI Knowledge & Mock Test",
      description: "Evaluate your understanding of LLMs, context windows, and RAG systems.",
      passMark: 75,
      questions: [
        {
          id: "q1",
          prompt: "What is the primary function of Retrieval-Augmented Generation (RAG)?",
          options: [
            "To retrain the model weights from scratch",
            "To supply external ground-truth documents into the prompt context",
            "To compress text files automatically",
            "To generate random images",
          ],
          correctOption: 1,
          explanation: "RAG retrieves relevant external facts and injects them into the prompt context to ground the response.",
        },
        {
          id: "q2",
          prompt: "Which parameter controls the randomness/creativity of LLM text generation?",
          options: ["Learning Rate", "Temperature", "Batch Size", "Epochs"],
          correctOption: 1,
          explanation: "Higher temperature increases output diversity, while lower temperature makes outputs more deterministic.",
        },
      ],
    },
    resources: [
      { id: "r1", title: "Generative AI Architecture Cheatsheet", kind: "guide", description: "Comprehensive diagram of RAG, vector databases, and prompt flows." },
    ],
    practicalLabs: [
      {
        id: "lab-genai",
        title: "Building an Enterprise RAG Assistant",
        durationMinutes: 45,
        description: "Set up a vector database, embed technical documents, and query them with a generative LLM.",
        toolsNeeded: ["Python / Node Environment", "Vector Database (Chroma / Pinecone)", "API Key"],
        steps: [
          "Chunk source text documents into 500-token segments with overlap.",
          "Generate text embeddings and store them in the vector database.",
          "Formulate retrieval query and fetch top 3 matching chunks.",
          "Pass retrieved context into the LLM system prompt and evaluate answer accuracy.",
        ],
        safetyTips: ["Ensure non-public enterprise data is masked before sending to public endpoints."],
      },
    ],
  }),
  createCourse({
    id: "it-cert-essential",
    title: "IT Certifications",
    slug: "it-certifications",
    description: "Comprehensive exam prep & hands-on practice for CompTIA Security+, A+, AWS Cloud Practitioner, & CCNA.",
    instructor: {
      name: "Marcus Vance",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "Senior Cloud & Security Architect",
    },
    image: "/courses/IT-certifications.jpeg",
    price: 24.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviewsCount: 412,
    studentsCount: 3100,
    duration: "16 hours",
    level: "All Levels",
    category: "IT & Software",
    subcategory: "IT Certifications",
    bestseller: true,
    featured: true,
    lastUpdated: "October 2026",
    language: "English",
    whatYouWillLearn: [
      "Master core networking protocols, OSI model, and IP subnetting",
      "Implement zero-trust security, firewalls, and encryption standards",
      "Pass CompTIA Security+, A+, and AWS Certified Solutions Architect exams",
      "Configure virtual cloud infrastructure and security groups",
    ],
    requirements: ["Basic computer knowledge"],
    targetAudience: ["IT Technicians", "System Admins", "Cloud Candidates", "Students"],
    skills: ["Cybersecurity", "Networking", "AWS Cloud", "System Admin"],
    modules: [
      {
        id: "m1",
        title: "Network & Security Fundamentals",
        summary: "OSI layers, TCP/IP, subnets, and threat vectors.",
        lessons: [
          createLesson("l1", "OSI Model & Port Numbers", "video", 25, "Master common ports and protocol layers.", ["Memorize key ports"]),
          createLesson("l2", "Zero-Trust Architecture", "reading", 20, "Principles of least privilege.", ["Understand access controls"]),
        ],
      },
    ],
    assessment: {
      id: "a-itcert",
      title: "IT Certification Exam Practice",
      description: "Timed and mock questions modeled on CompTIA and AWS exams.",
      passMark: 80,
      questions: [
        {
          id: "q1",
          prompt: "Which protocol operates on port 443 by default?",
          options: ["HTTP", "HTTPS", "SSH", "FTP"],
          correctOption: 1,
          explanation: "HTTPS uses TCP port 443 for encrypted TLS/SSL web traffic.",
        },
        {
          id: "q2",
          prompt: "Which cloud service model provides OS management while abstracting hardware?",
          options: ["IaaS", "PaaS", "SaaS", "FaaS"],
          correctOption: 1,
          explanation: "PaaS (Platform as a Service) provides runtimes and OS management while abstracting physical hardware.",
        },
      ],
    },
    resources: [
      { id: "r1", title: "CompTIA Port & Protocol Reference Sheet", kind: "guide", description: "Quick memory chart for common networking ports." },
    ],
    practicalLabs: [
      {
        id: "lab-itcert",
        title: "Virtual Subnetting & Security Group Configuration",
        durationMinutes: 40,
        description: "Configure a Virtual Private Cloud (VPC) with public and private subnets, NAT gateways, and firewall rules.",
        toolsNeeded: ["AWS Console or Local Simulator", "Command Prompt / Terminal", "SSH Client"],
        steps: [
          "Create a VPC with CIDR block 10.0.0.0/16.",
          "Subnet into public (10.0.1.0/24) and private (10.0.2.0/24) zones.",
          "Attach an Internet Gateway to the public route table.",
          "Restrict ingress traffic on the security group to SSH (port 22) and HTTPS (port 443).",
        ],
        safetyTips: ["Never expose database ports (e.g. 3306, 5432) directly to 0.0.0.0/0."],
      },
    ],
  }),
  createCourse({
    id: "prompt-eng-essential",
    title: "Prompt Engineering",
    slug: "prompt-engineering",
    description: "Systematic prompt design, few-shot techniques, chain-of-thought, and automated prompt engineering.",
    instructor: {
      name: "Tariro Muchengeti",
      avatar: "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "Prompt Systems Consultant",
    },
    image: "/courses/prompt-engineering.jpeg",
    price: 16.99,
    originalPrice: 89.99,
    rating: 4.9,
    reviewsCount: 280,
    studentsCount: 1890,
    duration: "8 hours",
    level: "All Levels",
    category: "AI & Data",
    subcategory: "Prompt Engineering",
    bestseller: true,
    lastUpdated: "October 2026",
    language: "English",
    whatYouWillLearn: [
      "Master role-based prompting, few-shot examples, and output formatting",
      "Use Chain-of-Thought (CoT) and Tree-of-Thoughts (ToT) for complex reasoning",
      "Eliminate hallucinations with grounded system guardrails",
      "Build reusable prompt libraries for enterprise support and operations",
    ],
    requirements: ["Access to ChatGPT, Claude, or any LLM"],
    targetAudience: ["AI Practitioners", "Copywriters", "Developers", "Managers"],
    skills: ["System Prompts", "Chain-of-Thought", "Output Structuring", "Guardrails"],
    modules: [
      {
        id: "m1",
        title: "Structural Prompt Architecture",
        summary: "Role, context, constraints, and JSON schema formatting.",
        lessons: [
          createLesson("l1", "The Anatomy of a Perfect Prompt", "video", 18, "Structuring role, task, and constraints.", ["Write structured prompts"]),
        ],
      },
    ],
    assessment: {
      id: "a-prompteng",
      title: "Prompt Engineering Certification Test",
      description: "Test your skill in few-shot prompting, schema enforcement, and guardrails.",
      passMark: 75,
      questions: [
        {
          id: "q1",
          prompt: "What is the primary benefit of Chain-of-Thought (CoT) prompting?",
          options: [
            "It makes responses shorter",
            "It forces the model to break complex reasoning into intermediate steps",
            "It translates text to JSON automatically",
            "It lowers token costs",
          ],
          correctOption: 1,
          explanation: "CoT prompting encourages step-by-step reasoning, improving accuracy on math and logic problems.",
        },
      ],
    },
    resources: [
      { id: "r1", title: "Enterprise Prompt Library Template", kind: "template", description: "Structured template for team prompt standardization." },
    ],
    practicalLabs: [
      {
        id: "lab-prompt",
        title: "Designing a Zero-Hallucination Customer Support System Prompt",
        durationMinutes: 30,
        description: "Draft a system prompt with explicit boundaries, JSON output requirements, and fallback rules.",
        toolsNeeded: ["LLM Playground", "Sample Support Tickets"],
        steps: [
          "Define System Role & Identity constraints.",
          "Provide 3 few-shot examples of correct JSON output format.",
          "Add strict fallback rules for out-of-scope inquiries.",
          "Test against 5 edge-case user prompts.",
        ],
      },
    ],
  }),
  createCourse({
    id: "ai-agents-essential",
    title: "AI Agents",
    slug: "ai-agents",
    description: "Design autonomous AI agents, tool integration, multi-agent frameworks (CrewAI, AutoGen, LangChain).",
    instructor: {
      name: "Dr. Angela Dube",
      avatar: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "AI Learning Lead",
    },
    image: "/courses/AI-agents.jpeg",
    price: 21.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviewsCount: 390,
    studentsCount: 2400,
    duration: "12 hours",
    level: "Intermediate",
    category: "AI & Data",
    subcategory: "AI Agents",
    bestseller: true,
    featured: true,
    lastUpdated: "October 2026",
    language: "English",
    whatYouWillLearn: [
      "Understand ReAct (Reason + Act) execution loops in autonomous agents",
      "Connect LLMs to real-world APIs, web searchers, and database tools",
      "Build multi-agent teams with CrewAI and AutoGen",
      "Implement memory systems (short-term, long-term, vector memory)",
    ],
    requirements: ["Basic programming concepts or AI familiarity"],
    targetAudience: ["AI Developers", "Automation Engineers", "Tech Enthusiasts"],
    skills: ["AI Agents", "ReAct Loop", "CrewAI", "Tool Calling"],
    modules: [
      {
        id: "m1",
        title: "Agent Architecture & Tool Calling",
        summary: "How agents reason, execute tools, and reflect on outputs.",
        lessons: [
          createLesson("l1", "The ReAct Loop Explained", "video", 22, "Thought, Action, Observation pattern.", ["Master ReAct loop"]),
        ],
      },
    ],
    assessment: {
      id: "a-agents",
      title: "Autonomous AI Agents Mastery Exam",
      description: "Test your knowledge of agent execution loops, tools, and multi-agent coordination.",
      passMark: 80,
      questions: [
        {
          id: "q1",
          prompt: "What does the 'ReAct' framework stand for in AI agent design?",
          options: [
            "Reactive Action",
            "Reason and Act",
            "Recursive Activation",
            "Real-time Acceleration",
          ],
          correctOption: 1,
          explanation: "ReAct combines Reasoning (thoughts) and Acting (tool invocation) in a continuous loop.",
        },
      ],
    },
    resources: [
      { id: "r1", title: "Multi-Agent Architecture Blueprint", kind: "guide", description: "Design pattern map for CrewAI & AutoGen agent workflows." },
    ],
    practicalLabs: [
      {
        id: "lab-agents",
        title: "Deploying a Multi-Agent Market Research Team",
        durationMinutes: 50,
        description: "Create a Researcher Agent and a Writer Agent that collaborate to produce market reports.",
        toolsNeeded: ["Python / Node Environment", "Agent Framework"],
        steps: [
          "Instantiate Researcher Agent with Google Search tool.",
          "Instantiate Writer Agent with Markdown formatting persona.",
          "Configure Task Handoff from Researcher to Writer.",
          "Execute task workflow and review final report.",
        ],
      },
    ],
  }),
  createCourse({
    id: "plumbing-essential",
    title: "Plumbing practical",
    slug: "plumbing-practical",
    description: "Hands-on training in pipe fitting, copper soldering, water pressure systems, drainage, & leak repair.",
    instructor: {
      name: "Blessing Moyo",
      avatar: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "Master Plumber & Vocational Instructor",
    },
    image: "/courses/plumbing-practical.png",
    price: 18.99,
    originalPrice: 94.99,
    rating: 4.9,
    reviewsCount: 520,
    studentsCount: 3800,
    duration: "14 hours",
    level: "All Levels",
    category: "Practical Trades",
    subcategory: "Plumbing",
    bestseller: true,
    featured: true,
    lastUpdated: "October 2026",
    language: "English",
    whatYouWillLearn: [
      "Master copper pipe cleaning, flux application, and sweat soldering",
      "Understand water pressure head, pressure regulators, and expansion tanks",
      "Assemble PVC, PEX, and galvanized pipe joints to building codes",
      "Diagnose and repair high-pressure leaks, blocked drains, and valve failures",
    ],
    requirements: ["Basic safety gear (gloves, protective eye wear)"],
    targetAudience: ["Aspiring Plumbers", "Maintenance Technicians", "Homeowners", "Contractors"],
    skills: ["Pipe Soldering", "PEX & PVC Assembly", "Pressure Diagnostics", "Drainage Systems"],
    modules: [
      {
        id: "m1",
        title: "Pipe Joining & Soldering Fundamentals",
        summary: "Techniques for leak-free copper, PEX, and PVC piping.",
        lessons: [
          createLesson("l1", "Copper Pipe Sweat Soldering", "video", 25, "Step-by-step soldering demonstration.", ["Master clean joint soldering"]),
          createLesson("l2", "PEX Crimping & Compression Fittings", "lab", 30, "Modern flexible piping methods.", ["Assemble PEX joints"]),
        ],
      },
      {
        id: "m2",
        title: "Water Supply & Pressure Testing",
        summary: "Pressure regulation, backflow prevention, and hydro testing.",
        lessons: [
          createLesson("l3", "Hydrostatic Pressure Diagnostics", "reading", 20, "Detecting micro-leaks under pressure.", ["Perform pressure check"]),
        ],
      },
    ],
    assessment: {
      id: "a-plumbing",
      title: "Practical Plumbing Licensing Practice Test",
      description: "Test your understanding of pipe fitting, water pressure calculations, and plumbing codes.",
      passMark: 80,
      questions: [
        {
          id: "q1",
          prompt: "What is the primary purpose of applying flux before soldering a copper pipe joint?",
          options: [
            "To cool down the pipe quickly",
            "To remove oxidation and allow solder to flow smoothly into the joint",
            "To change the color of the copper",
            "To fill large gaps in the pipe",
          ],
          correctOption: 1,
          explanation: "Flux cleans oxidation and promotes capillary action, drawing molten solder evenly into the joint.",
        },
        {
          id: "q2",
          prompt: "Which plumbing pipe material is most resistant to freezing and scale buildup?",
          options: ["Galvanized Iron", "PEX (Cross-linked Polyethylene)", "Uncoated Copper", "Cast Iron"],
          correctOption: 1,
          explanation: "PEX is flexible, resists freeze-expansion without bursting, and prevents mineral scale buildup.",
        },
      ],
    },
    resources: [
      { id: "r1", title: "Plumbing Pipe Sizing & Pressure Chart", kind: "guide", description: "Reference chart for flow rates, pipe diameters, and friction losses." },
      { id: "r2", title: "Standard Plumbing Tools Checklist", kind: "checklist", description: "Essential toolkit checklist for residential plumbing jobs." },
    ],
    practicalLabs: [
      {
        id: "lab-plumbing-1",
        title: "Copper Pipe Soldering & Hydrostatic Pressure Test",
        durationMinutes: 60,
        description: "Cut a 1/2-inch copper pipe, clean with emery cloth, apply lead-free flux, sweat a elbow joint, and pressurize to 60 PSI.",
        toolsNeeded: ["Propane Torch", "Lead-Free Solder & Flux", "Tubing Cutter", "Emery Cloth", "Pressure Gauge"],
        steps: [
          "Cut copper pipe clean and deburr internal rim using tubing cutter reamer.",
          "Sand pipe exterior and fitting interior until bright shiny copper is exposed.",
          "Apply thin layer of flux to pipe and fitting socket.",
          "Heat fitting joint evenly with torch until solder melts on contact, allowing capillary action to fill seam.",
          "Allow joint to cool naturally, attach pressure test rig, and pump to 60 PSI for 15 minutes.",
        ],
        safetyTips: [
          "Always keep a fire extinguisher nearby when using open flame torches.",
          "Wear heat-resistant gloves and protective safety glasses.",
        ],
      },
    ],
  }),
  createCourse({
    id: "alum-essential",
    title: "Aluminum fabrication",
    slug: "aluminum-fabrication",
    description: "Architectural aluminum cutting, TIG welding, window & door frame assembly, mitering, & structural joining.",
    instructor: {
      name: "Tinashe Zhou",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "Master Fabricator & Metal Work Specialist",
    },
    image: "/courses/aluminum-fabrication.png",
    price: 22.99,
    originalPrice: 109.99,
    rating: 4.9,
    reviewsCount: 460,
    studentsCount: 2950,
    duration: "15 hours",
    level: "All Levels",
    category: "Practical Trades",
    subcategory: "Aluminum Fabrication",
    bestseller: true,
    featured: true,
    lastUpdated: "October 2026",
    language: "English",
    whatYouWillLearn: [
      "Select aluminum profile gauges, alloys (6061 vs 6063), and tempers",
      "Operate miter saws, punch machines, and corner crimpers with high accuracy",
      "Perform clean AC TIG welding on aluminum sheets and hollow sections",
      "Assemble sliding windows, shopfront frames, and glass rubber seals",
    ],
    requirements: ["Safety boots, welding helmet, and gloves"],
    targetAudience: ["Fabricators", "Welders", "Construction Workers", "Entrepreneurs"],
    skills: ["Aluminum Mitering", "AC TIG Welding", "Frame Assembly", "Architectural Glass"],
    modules: [
      {
        id: "m1",
        title: "Aluminum Alloys & Cutting Precision",
        summary: "Profile characteristics, blade selection, and 45-degree miter cuts.",
        lessons: [
          createLesson("l1", "Profile Selection & Gauge Measurement", "video", 20, "Understanding 6063-T6 aluminum extrusion.", ["Identify alloy grades"]),
          createLesson("l2", "Miter Saw Setup & Angle Calibration", "lab", 35, "Cutting perfect 45-degree frame corners.", ["Execute precision miter"]),
        ],
      },
    ],
    assessment: {
      id: "a-alum",
      title: "Aluminum Fabrication & Assembly Test",
      description: "Test your knowledge of miter angles, corner cleat joining, and TIG welding settings.",
      passMark: 75,
      questions: [
        {
          id: "q1",
          prompt: "Why is Alternating Current (AC) required for TIG welding aluminum?",
          options: [
            "DC current burns through aluminum instantly",
            "AC current provides a cleaning action that breaks the stubborn oxide layer on aluminum",
            "AC current uses less gas",
            "DC current causes spark splatter",
          ],
          correctOption: 1,
          explanation: "Aluminum oxide melts at ~2000°C while base metal melts at ~660°C; the EP phase of AC breaks up the oxide shell.",
        },
      ],
    },
    resources: [
      { id: "r1", title: "Aluminum Miter & Deduction Calculator Sheet", kind: "worksheet", description: "Formulas for window frame cutting deductions and glass sizing." },
    ],
    practicalLabs: [
      {
        id: "lab-alum-1",
        title: "Window Frame Mitering, Corner Cleat Assembly & Weather Sealing",
        durationMinutes: 75,
        description: "Measure, miter-cut four aluminum profile sections at 45 degrees, insert corner keys, punch blind rivets, and fit rubber glazing bead.",
        toolsNeeded: ["Compound Miter Saw with Carbide Aluminum Blade", "Corner Cleat Keys", "Pop Rivet Gun", "Rubber Mallet", "Glazing Gasket"],
        steps: [
          "Measure window opening width and subtract 10mm for fitting clearance.",
          "Set miter saw to exact 45-degree angle and lock fence.",
          "Cut four profile sections ensuring zero burr on cut face.",
          "Insert internal corner cleats, apply silicone sealant, and clamp tight.",
          "Secure joint using pop rivets or pneumatic corner crimper and press rubber glazing seal into channel.",
        ],
        safetyTips: ["Wear full eye and ear protection when operating high-RPM aluminum blade saws."],
      },
    ],
  }),
  createCourse({
    id: "repairs-essential",
    title: "Cellphone & laptop repairs",
    slug: "cellphone-laptop-repairs",
    description: "Micro-soldering, SMD component replacement, screen digitizer assembly, battery repair, & liquid damage recovery.",
    instructor: {
      name: "Kudakwashe Chiwenga",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "Lead Hardware Repair Engineer",
    },
    image: "/courses/cellphone-laptop-repairs.png",
    price: 24.99,
    originalPrice: 119.99,
    rating: 4.9,
    reviewsCount: 680,
    studentsCount: 4200,
    duration: "18 hours",
    level: "All Levels",
    category: "Practical Trades",
    subcategory: "Cellphone & Laptop Repairs",
    bestseller: true,
    featured: true,
    lastUpdated: "October 2026",
    language: "English",
    whatYouWillLearn: [
      "Master micro-soldering under stereo microscope for SMD capacitors & ICs",
      "Perform full screen, digitizer, battery, and charging port replacements",
      "Trace motherboard schematics and identify short circuits with multimeter & thermal camera",
      "Execute ultrasonic liquid damage cleaning and BGA chip reballing",
    ],
    requirements: ["Basic precision screwdriver set recommended"],
    targetAudience: ["Repair Technicians", "Entrepreneurs", "Students", "Hobbyists"],
    skills: ["Micro-Soldering", "Screen Assembly", "Multimeter Tracing", "Liquid Damage Recovery"],
    modules: [
      {
        id: "m1",
        title: "Disassembly & Screen/Battery Replacement",
        summary: "Precision disassembly, heat gun separation, and component swaps.",
        lessons: [
          createLesson("l1", "Smartphone Disassembly & Heat Control", "video", 22, "Safely opening glass-back smartphones.", ["Master heat mat settings"]),
          createLesson("l2", "Laptop Screen & Hinge Replacement", "lab", 30, "Display flex cable replacement.", ["Replace laptop panel"]),
        ],
      },
      {
        id: "m2",
        title: "Micro-Soldering & Motherboard Diagnostics",
        summary: "Reading board schematics, short circuit clearing, and hot-air rework.",
        lessons: [
          createLesson("l3", "Multimeter Diode Mode Tracing", "video", 25, "Locating shorted capacitors to ground.", ["Trace board shorts"]),
        ],
      },
    ],
    assessment: {
      id: "a-repairs",
      title: "Hardware Repair Specialist Certification",
      description: "Evaluate your mastery of circuit tracing, hot-air station temperatures, and screen replacement.",
      passMark: 80,
      questions: [
        {
          id: "q1",
          prompt: "What multimeter mode is most effective for quickly identifying shorted capacitors on a motherboard?",
          options: [
            "AC Voltage Mode",
            "Diode / Continuity Mode",
            "Resistance High Range Mode",
            "Frequency Mode",
          ],
          correctOption: 1,
          explanation: "Diode/Continuity mode beeps or shows ~0.000V when probing a rail that has shorted directly to ground.",
        },
      ],
    },
    resources: [
      { id: "r1", title: "Smartphone & Laptop Component Pinout Guide", kind: "guide", description: "Standard voltage rails (VBUS, VBAT, VDD) reference sheet." },
    ],
    practicalLabs: [
      {
        id: "lab-repair-1",
        title: "Short Circuit Isolation & Hot-Air SMD Capacitor Replacement",
        durationMinutes: 60,
        description: "Locate a shorted decoupling capacitor using multimeter diode mode, remove with hot-air rework station at 360°C, and solder new component.",
        toolsNeeded: ["Hot-Air Rework Station", "Fine-Tip Soldering Iron", "Digital Multimeter", "Flux & Solder Wick", "Stereo Microscope or Magnifier"],
        steps: [
          "Connect bench power supply to battery connector and observe current draw.",
          "Probe main power rail capacitors in Diode Mode to identify 0.00V short to ground.",
          "Apply liquid rosin flux to shorted SMD capacitor.",
          "Set hot-air station to 360°C with air speed 3, heat component until solder liquefies, and lift with tweezers.",
          "Clean pads with solder wick, re-probe rail to confirm short is cleared, and solder replacement capacitor.",
        ],
        safetyTips: ["Disconnect battery completely before touching motherboard components with metal tweezers."],
      },
    ],
  }),
  createCourse({
    id: "examprep-essential",
    title: "Exam preparation",
    slug: "exam-preparation",
    description: "Active recall, spaced repetition, timed test strategies, memory techniques, & high-scoring exam tactics.",
    instructor: {
      name: "Dr. Angela Dube",
      avatar: "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
      title: "Learning Strategy Lead",
    },
    image: "/courses/exam-preparation.jpeg",
    price: 14.99,
    originalPrice: 79.99,
    rating: 4.9,
    reviewsCount: 310,
    studentsCount: 2800,
    duration: "7 hours",
    level: "All Levels",
    category: "Test Prep",
    subcategory: "Exam Preparation",
    bestseller: true,
    featured: true,
    lastUpdated: "October 2026",
    language: "English",
    whatYouWillLearn: [
      "Master Anki-style spaced repetition and active recall flashcard systems",
      "Apply the 2-Pass Method for timed multiple-choice and essay exams",
      "Overcome exam anxiety and maintain focus during high-stakes testing",
      "Construct personalized 30-day master study routines for any certification",
    ],
    requirements: ["Any upcoming exam or test"],
    targetAudience: ["Students", "Certification Candidates", "Professionals"],
    skills: ["Active Recall", "Spaced Repetition", "Test Tactics", "Time Management"],
    modules: [
      {
        id: "m1",
        title: "Scientific Study Systems",
        summary: "Why re-reading fails and active retrieval succeeds.",
        lessons: [
          createLesson("l1", "Active Recall vs Passive Review", "video", 18, "Evidence-based memory retention.", ["Implement active recall"]),
        ],
      },
    ],
    assessment: {
      id: "a-examprep",
      title: "Master Test-Taking Strategy Assessment",
      description: "Test your mastery of time management, process of elimination, and active study planning.",
      passMark: 75,
      questions: [
        {
          id: "q1",
          prompt: "What is the recommended strategy when encountering a very difficult question on a timed exam?",
          options: [
            "Spend 10 minutes solving it before moving on",
            "Flag it, make an educated initial pick, and return to it during Pass 2 if time permits",
            "Leave it completely blank immediately",
            "Guess randomly without reading the options",
          ],
          correctOption: 1,
          explanation: "The 2-Pass method secures easy points first and prevents getting stuck on time-consuming questions.",
        },
      ],
    },
    resources: [
      { id: "r1", title: "30-Day Master Exam Study Planner", kind: "worksheet", description: "Printable schedule template for spaced repetition study blocks." },
    ],
    practicalLabs: [
      {
        id: "lab-examprep-1",
        title: "Constructing Your Personalized 30-Day Spaced Repetition Study Schedule",
        durationMinutes: 30,
        description: "Map your target exam syllabus into active recall modules, set revision intervals, and perform a 15-minute simulated test sprint.",
        toolsNeeded: ["Study Planner Template", "Timer / Stopwatch"],
        steps: [
          "Break total course topics into 10 bite-sized study blocks.",
          "Schedule initial review on Day 1, followed by active recall checks on Day 3, Day 7, Day 14, and Day 28.",
          "Draft 20 flashcard questions focusing on weak topics.",
          "Run a 15-minute timed test sprint and calculate accuracy rate.",
        ],
      },
    ],
  }),
];

export const categories: Category[] = categorySeeds.map((category) => ({
  ...category,
  coursesCount: courses.filter((course) => course.category === category.name).length,
}));

export const testimonials = [
  {
    id: "1",
    name: "Tafadzwa Moyo",
    role: "Junior Software Developer, Harare",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    content:
      "The learning paths feel practical instead of theoretical. I used the AI and data modules at work within a week.",
    rating: 5,
  },
  {
    id: "2",
    name: "Rumbidzai Chikore",
    role: "Product Designer, Bulawayo",
    avatar:
      "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    content:
      "I loved that each course combined lessons, reflection, and a final assessment. It kept me accountable all the way through.",
    rating: 5,
  },
  {
    id: "3",
    name: "Kudakwashe Sibanda",
    role: "Operations Officer, Gweru",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1",
    content:
      "The workflow automation course gave me templates I could adapt immediately. It felt built for real teams, not just theory.",
    rating: 5,
  },
];

export const stats = [
  { label: "Active learners", value: "4,800+" },
  { label: "Career-ready courses", value: `${courses.length}` },
  { label: "Assessments available", value: `${courses.length}` },
  { label: "Completion certificates", value: "Issued daily" },
];

export const navLinks = [
  { label: "My Learning", href: "/my-learning" },
  { label: "Community", href: "/community" },
];
