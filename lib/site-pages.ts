export interface SitePageSection {
  title: string;
  body: string;
}

export interface SitePageContent {
  title: string;
  eyebrow: string;
  description: string;
  sections: SitePageSection[];
  ctaLabel: string;
  ctaHref: string;
}

export const sitePages: Record<string, SitePageContent> = {
  about: {
    eyebrow: "Company",
    title: "About Surepass IQ",
    description:
      "Surepass IQ helps learners build practical digital and workplace skills through guided courses, assessments, and clear progress tracking.",
    sections: [
      {
        title: "What we build",
        body: "We focus on practical, career-relevant learning experiences that combine structured lessons, reflection, and measurable completion milestones.",
      },
      {
        title: "Who we serve",
        body: "Our platform is designed for ambitious learners, institutions, and teams that want structured upskilling without unnecessary complexity.",
      },
    ],
    ctaLabel: "Browse courses",
    ctaHref: "/categories",
  },
  careers: {
    eyebrow: "Company",
    title: "Careers",
    description:
      "We are building a learning platform that values clarity, practical impact, and learner success.",
    sections: [
      {
        title: "How we work",
        body: "We care about thoughtful product building, clear communication, and learning experiences that genuinely improve outcomes for users.",
      },
      {
        title: "Open roles",
        body: "Hiring details can live here later. For now, use this space to describe team values, role areas, and how candidates can express interest.",
      },
    ],
    ctaLabel: "Contact us",
    ctaHref: "/contact",
  },
  blog: {
    eyebrow: "Insights",
    title: "Learning and platform insights",
    description:
      "Use this space for articles on digital skills, course launches, learner stories, and practical career advice.",
    sections: [
      {
        title: "Suggested content pillars",
        body: "Publish tips on AI at work, digital literacy, study systems, portfolio building, and industry-specific learner success stories.",
      },
      {
        title: "Editorial direction",
        body: "Short, useful posts usually work best: practical guidance, real examples, and focused calls to action that point learners into the product.",
      },
    ],
    ctaLabel: "Explore the catalog",
    ctaHref: "/categories",
  },
  contact: {
    eyebrow: "Support",
    title: "Contact us",
    description:
      "Use this page for admissions support, partnership enquiries, platform questions, or learning guidance.",
    sections: [
      {
        title: "Learner support",
        body: "Add your support email, WhatsApp number, or operating hours so learners know how to reach your team quickly.",
      },
      {
        title: "Business and partnerships",
        body: "This section can route institutional enquiries, sponsorships, and training partnerships to the right contact.",
      },
    ],
    ctaLabel: "View support",
    ctaHref: "/support",
  },
  affiliates: {
    eyebrow: "Community",
    title: "Affiliates",
    description:
      "Create an affiliate program page for creators, educators, and communities that want to promote your programs.",
    sections: [
      {
        title: "Program structure",
        body: "Outline commissions, approval rules, brand usage, and payout timelines so partners know how the program works.",
      },
      {
        title: "Partner assets",
        body: "Share campaign links, learner personas, banners, and messaging guidance that affiliates can use responsibly.",
      },
    ],
    ctaLabel: "Explore courses",
    ctaHref: "/categories",
  },
  partners: {
    eyebrow: "Community",
    title: "Partners",
    description:
      "Use this page to explain how organisations, schools, and brands can collaborate with Surepass IQ.",
    sections: [
      {
        title: "Partnership models",
        body: "Potential models include curriculum partnerships, enterprise training bundles, scholarship sponsorships, and community co-delivery.",
      },
      {
        title: "Shared outcomes",
        body: "Strong partnership pages show what collaborators gain: reach, learner outcomes, reporting, and brand alignment.",
      },
    ],
    ctaLabel: "Open business page",
    ctaHref: "/business",
  },
  investors: {
    eyebrow: "Community",
    title: "Investors",
    description:
      "This is a placeholder investor relations page for company story, traction, and strategic direction.",
    sections: [
      {
        title: "Company story",
        body: "Share the problem you are solving, the market opportunity, and the traction signals that matter most to long-term supporters.",
      },
      {
        title: "Reporting",
        body: "Add investor contact details, milestone updates, and any formal documents when this area becomes active.",
      },
    ],
    ctaLabel: "Learn about the platform",
    ctaHref: "/about",
  },
  business: {
    eyebrow: "Business",
    title: "Surepass IQ for Business",
    description:
      "Offer structured workplace learning for teams that need practical upskilling, assessments, and visible completion tracking.",
    sections: [
      {
        title: "Team learning use cases",
        body: "Good business pages show how you support onboarding, digital literacy, role-based upskilling, and internal capability building.",
      },
      {
        title: "What to highlight",
        body: "Position assessments, certificates, learner dashboards, and progress visibility as the core value for team learning leaders.",
      },
    ],
    ctaLabel: "Contact us",
    ctaHref: "/contact",
  },
  "academic-calendar": {
    eyebrow: "Institution",
    title: "Academic calendar",
    description:
      "This page can later list term dates, onboarding windows, assessment periods, and important deadlines.",
    sections: [
      {
        title: "Important dates",
        body: "Track course release windows, assignment or assessment cycles, certification periods, and support deadlines here.",
      },
      {
        title: "Calendar guidance",
        body: "A good academic calendar should make timing obvious for learners, tutors, and institutional stakeholders.",
      },
    ],
    ctaLabel: "Open student portal",
    ctaHref: "/student-portal",
  },
  "learning-support": {
    eyebrow: "Institution",
    title: "Learning support",
    description:
      "Explain how learners can get academic help, platform guidance, and study support throughout their courses.",
    sections: [
      {
        title: "Support channels",
        body: "This can include tutor office hours, help centre links, structured coaching touchpoints, and escalation routes.",
      },
      {
        title: "Study success",
        body: "Offer guidance on planning learning time, preparing for assessments, and staying consistent through self-paced courses.",
      },
    ],
    ctaLabel: "Go to support",
    ctaHref: "/support",
  },
  "student-portal": {
    eyebrow: "Institution",
    title: "Student portal",
    description:
      "Use this area for learner quick links, onboarding instructions, and access points into the rest of the platform.",
    sections: [
      {
        title: "Recommended content",
        body: "A student portal usually highlights learner dashboard access, announcements, support, policies, and the academic calendar.",
      },
      {
        title: "Next step",
        body: "You can later replace this placeholder with authenticated student tools or a richer institutional landing page.",
      },
    ],
    ctaLabel: "Open My Learning",
    ctaHref: "/my-learning",
  },
  news: {
    eyebrow: "Institution",
    title: "Campus news",
    description:
      "Publish learner announcements, new program updates, scholarship opportunities, and community stories here.",
    sections: [
      {
        title: "Platform updates",
        body: "Share product improvements, newly published courses, certification news, and learner success announcements.",
      },
      {
        title: "Community stories",
        body: "Spotlight student wins, partnership launches, and institutional milestones to build trust and momentum.",
      },
    ],
    ctaLabel: "See notifications",
    ctaHref: "/notifications",
  },
  support: {
    eyebrow: "Help",
    title: "Help and support",
    description:
      "This page should guide learners to answers for login, course access, assessments, and general platform questions.",
    sections: [
      {
        title: "Common topics",
        body: "Examples include sign-in help, progress tracking, certificates, saved notes, wishlists, and assessment troubleshooting.",
      },
      {
        title: "Escalation path",
        body: "Add response times, support contact routes, and clear escalation guidance so learners know what to expect.",
      },
    ],
    ctaLabel: "Contact us",
    ctaHref: "/contact",
  },
  "trust-safety": {
    eyebrow: "Help",
    title: "Trust and safety",
    description:
      "Explain how learner data, platform use, moderation, and responsible AI practices are handled on Surepass IQ.",
    sections: [
      {
        title: "Platform safety",
        body: "Document moderation expectations for discussions, data protection commitments, and how abuse reports are handled.",
      },
      {
        title: "Responsible use",
        body: "This is also a good place to explain how you handle AI-assisted learning content and review quality standards.",
      },
    ],
    ctaLabel: "Read privacy policy",
    ctaHref: "/privacy",
  },
  accessibility: {
    eyebrow: "Help",
    title: "Accessibility",
    description:
      "Use this page to describe your accessibility commitments, supported features, and current improvement areas.",
    sections: [
      {
        title: "Accessibility commitments",
        body: "Document keyboard support, readable layouts, media alternatives, and the standards you aim to meet.",
      },
      {
        title: "Feedback loop",
        body: "Invite learners to report barriers and explain how accessibility issues are reviewed and resolved.",
      },
    ],
    ctaLabel: "Contact support",
    ctaHref: "/support",
  },
  sitemap: {
    eyebrow: "Help",
    title: "Sitemap",
    description:
      "A sitemap page can help visitors discover the major areas of your learning platform quickly.",
    sections: [
      {
        title: "Suggested sections",
        body: "Organise links around catalog pages, learner tools, company pages, institutional resources, and support content.",
      },
      {
        title: "Why it matters",
        body: "It improves discoverability for both users and search engines when your site structure grows.",
      },
    ],
    ctaLabel: "Browse categories",
    ctaHref: "/categories",
  },
  terms: {
    eyebrow: "Legal",
    title: "Terms",
    description:
      "Use this page for platform terms of service, learner responsibilities, account rules, and usage conditions.",
    sections: [
      {
        title: "Core areas",
        body: "Terms pages usually cover account access, acceptable use, intellectual property, cancellations, and platform limitations.",
      },
      {
        title: "Legal review",
        body: "Replace this placeholder with counsel-reviewed legal content before public launch.",
      },
    ],
    ctaLabel: "Read privacy policy",
    ctaHref: "/privacy",
  },
  privacy: {
    eyebrow: "Legal",
    title: "Privacy policy",
    description:
      "Document how learner data is collected, stored, processed, and protected across the platform.",
    sections: [
      {
        title: "Data categories",
        body: "Typical categories include account details, course progress, assessment activity, and learner-generated content such as notes or discussion posts.",
      },
      {
        title: "Transparency",
        body: "Explain what data is optional, what is required for service delivery, and how deletion or correction requests are handled.",
      },
    ],
    ctaLabel: "Cookie settings",
    ctaHref: "/cookies",
  },
  cookies: {
    eyebrow: "Legal",
    title: "Cookie settings",
    description:
      "Explain what cookies or similar technologies you use for authentication, analytics, and learner experience.",
    sections: [
      {
        title: "Purpose of cookies",
        body: "Authentication, preferences, and analytics are common reasons a learning platform uses cookies or local storage.",
      },
      {
        title: "Controls",
        body: "Outline whether learners can opt out of non-essential tracking and how those choices affect the experience.",
      },
    ],
    ctaLabel: "Go to privacy policy",
    ctaHref: "/privacy",
  },
};
