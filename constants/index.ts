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
  { label: "Categories", href: "/categories" },
  { label: "My Learning", href: "/my-learning" },
];
