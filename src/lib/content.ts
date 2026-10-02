// All landing copy, headlines included. Sections render from here, and so do
// the JSON-LD (FAQPage, Service catalog) and /llms.txt: edit once, every
// surface updates.
import type { IconName } from "@/components/brand/icon";

/** A headline: lines split with <br>, plus one optional phrase to accent. */
export type Heading = { lines: readonly string[]; accent?: string };

export const nav = [
  { label: "What we build", href: "#possibilities" },
  { label: "How it works", href: "#approach" },
  { label: "Why laglabs", href: "#why-laglabs" },
] as const;

export const hero = {
  eyebrow: "A new kind of teammate",
  heading: { lines: ["More ambition.", "Less busywork."], accent: "busywork" },
  description: {
    before: "Your people have bigger things to do. We build ",
    strong: "AI employees",
    after:
      " that take on the everyday work, so your team can take on what’s next.",
  },
  primaryCta: "Build your AI team",
  secondaryCta: "See what’s possible",
  note: "Built for mid-sized companies. Designed around you.",
  visualLabel:
    "Example: your tools and business knowledge connect to an AI employee, which completes routine tasks and routes decisions to your team.",
  bottom: ["Your workflows", "Your existing tools", "Your rules"],
};

export const intro = {
  index: "01 /",
  eyebrow: "The opportunity",
  heading: {
    lines: [
      "You don’t need more on your plate.",
      "You need more on your side.",
    ],
    accent: "more on your side.",
  },
  paragraphs: [
    "The follow-ups. The copy-paste. The work between the work. It keeps good people busy without moving your business forward.",
    "We turn those bottlenecks into AI job descriptions. Then we build the employees to fill them, with your processes, your knowledge, and your people at the center.",
  ],
};

export type WorkflowStep = {
  icon: IconName;
  title: string;
  detail: string;
  tag?: { label: string; tone: "neutral" | "green" };
};

export type Role = {
  id: string;
  tab: string;
  badge: string;
  headline: [string, string];
  description: string;
  tasks: string[];
  cta: { label: string; subject: string };
  workflow: {
    icon: IconName;
    title: string;
    steps: WorkflowStep[];
    outcome: string;
  };
};

export const roles: Role[] = [
  {
    id: "sales",
    tab: "Sales",
    badge: "YOUR AI SALES COORDINATOR",
    headline: ["Keep the conversation going.", "And the pipeline moving."],
    description:
      "Give every opportunity the attention it deserves. An AI teammate handles the legwork so your salespeople can focus on the relationship.",
    tasks: [
      "Research accounts and prepare outreach",
      "Qualify inbound leads against your criteria",
      "Keep CRM records and follow-ups up to date",
    ],
    cta: {
      label: "Put AI to work in sales",
      subject: "Let’s build an AI sales teammate",
    },
    workflow: {
      icon: "spark",
      title: "From new lead to next step",
      steps: [
        {
          icon: "mail",
          title: "A new inquiry comes in",
          detail: "From your inbox or website",
          tag: { label: "Trigger", tone: "neutral" },
        },
        {
          icon: "spark",
          title: "Your AI teammate gets to work",
          detail: "Research → qualify → prepare reply",
        },
        {
          icon: "person",
          title: "Your team takes the conversation",
          detail: "With context, without the catch-up",
          tag: { label: "Handoff", tone: "green" },
        },
      ],
      outcome: "Less admin. More time for the close.",
    },
  },
  {
    id: "operations",
    tab: "Operations",
    badge: "YOUR AI OPERATIONS COORDINATOR",
    headline: ["Less chasing updates.", "More moving things forward."],
    description:
      "Keep the everyday details from becoming everyday delays. Your AI teammate connects the dots across documents, systems, and teams.",
    tasks: [
      "Extract and organize information from documents",
      "Update records across connected systems",
      "Track requests and flag exceptions for your team",
    ],
    cta: {
      label: "Put AI to work in operations",
      subject: "Let’s build an AI operations teammate",
    },
    workflow: {
      icon: "grid",
      title: "From paperwork to progress",
      steps: [
        {
          icon: "file",
          title: "A document arrives",
          detail: "An order, invoice, or request",
          tag: { label: "Trigger", tone: "neutral" },
        },
        {
          icon: "spark",
          title: "Your AI teammate organizes it",
          detail: "Extract → validate → update records",
        },
        {
          icon: "person",
          title: "Exceptions go to the right person",
          detail: "Decisions with context, not detective work",
          tag: { label: "Review", tone: "green" },
        },
      ],
      outcome: "Keep the work flowing, not the inbox growing.",
    },
  },
  {
    id: "support",
    tab: "Customer support",
    badge: "YOUR AI SUPPORT SPECIALIST",
    headline: [
      "Be there for your customers.",
      "Give your team room to breathe.",
    ],
    description:
      "Take repeat questions out of the queue. An AI teammate finds answers in your knowledge base and knows when a person should take over.",
    tasks: [
      "Answer routine questions using approved knowledge",
      "Gather context and categorize incoming requests",
      "Escalate sensitive or complex issues to your team",
    ],
    cta: {
      label: "Put AI to work in support",
      subject: "Let’s build an AI support teammate",
    },
    workflow: {
      icon: "chat",
      title: "From question to resolution",
      steps: [
        {
          icon: "chat",
          title: "A customer needs a hand",
          detail: "A question in a connected support channel",
          tag: { label: "Trigger", tone: "neutral" },
        },
        {
          icon: "spark",
          title: "Your AI teammate finds the answer",
          detail: "Understand → retrieve → respond",
        },
        {
          icon: "person",
          title: "People handle the personal stuff",
          detail: "Complex cases arrive with a clear summary",
          tag: { label: "Handoff", tone: "green" },
        },
      ],
      outcome: "More attention where it makes a difference.",
    },
  },
  {
    id: "knowledge",
    tab: "Knowledge & research",
    badge: "YOUR AI RESEARCH ANALYST",
    headline: ["Your company knows a lot.", "Put that knowledge to work."],
    description:
      "Turn scattered information into a useful starting point. Your AI teammate brings together research and internal knowledge, with sources your team can check.",
    tasks: [
      "Find answers across approved internal documents",
      "Prepare account briefs and research summaries",
      "Surface sources and flag missing information",
    ],
    cta: {
      label: "Put AI to work in research",
      subject: "Let’s build an AI research teammate",
    },
    workflow: {
      icon: "file",
      title: "From scattered to actionable",
      steps: [
        {
          icon: "chat",
          title: "Your team asks a question",
          detail: "A brief, a comparison, or a decision to make",
          tag: { label: "Trigger", tone: "neutral" },
        },
        {
          icon: "spark",
          title: "Your AI teammate connects the dots",
          detail: "Find → synthesize → cite sources",
        },
        {
          icon: "person",
          title: "Your people make the call",
          detail: "Review the evidence and choose what’s next",
          tag: { label: "Review", tone: "green" },
        },
      ],
      outcome: "Less time searching. More informed decisions.",
    },
  },
];

export const possibilities = {
  index: "02 /",
  eyebrow: "Meet the possibilities",
  heading: { lines: ["Real roles.", "Real work off your plate."] },
  aside: [
    "Start with the work that slows you down.",
    "Build the AI teammate that moves it forward.",
  ],
  tabsLabel: "Explore AI employee roles",
  foot: "A starting point, not a catalog. Every role is built to fit your business.",
  footCta: "Have something else in mind?",
};

export const approach = {
  index: "03 /",
  eyebrow: "From idea to everyday impact",
  heading: { lines: ["You know your business.", "We make AI work in it."] },
  aside: [
    "One partner, from the first conversation",
    "to the work getting done.",
  ],
  steps: [
    {
      title: "Find the right work.",
      text: "We get close to your team, map the bottlenecks, and choose a first role with a clear business case.",
      deliverable: "A focused starting point",
      icon: "diagonal",
    },
    {
      title: "Build your teammate.",
      text: "We shape the AI around your knowledge, connect your tools, and define what it can do and when to ask.",
      deliverable: "Built for your reality",
      icon: "diagonal",
    },
    {
      title: "Launch with your people.",
      text: "We test real scenarios together, bring your team into the loop, and roll out with clear checkpoints.",
      deliverable: "Confidence before scale",
      icon: "diagonal",
    },
    {
      title: "Make it better. Repeat.",
      text: "We manage the system, review results, and keep improving. When the first role works, we build on it.",
      deliverable: "An ongoing partnership",
      icon: "loop",
    },
  ] satisfies {
    title: string;
    text: string;
    deliverable: string;
    icon: IconName;
  }[],
};

export const difference = {
  index: "04 /",
  eyebrow: "The laglabs way",
  heading: {
    lines: ["More capable.", "Still entirely you."],
    accent: "entirely you.",
  },
  text: "Growing your capacity shouldn’t mean losing what makes your company work. We build around your people, not around a product.",
  principles: [
    {
      icon: "sliders",
      title: "Your business is the blueprint.",
      text: "Your terminology, your processes, your definition of a job well done. That’s where we start.",
    },
    {
      icon: "grid",
      title: "Keep the tools you know.",
      text: "We connect to the systems your team already uses, wherever their APIs and permissions allow.",
    },
    {
      icon: "shield",
      title: "Your people stay in control.",
      text: "Defined permissions, review points, and human handoffs. You decide where autonomy ends and judgment begins.",
    },
    {
      icon: "loop",
      title: "We build it. We look after it.",
      text: "Implementation is the beginning. We stay involved to maintain, measure, and improve the work.",
    },
  ] satisfies { icon: IconName; title: string; text: string }[],
};

export const faq = {
  eyebrow: "A little more clarity",
  heading: { lines: ["Good questions.", "Straight answers."] },
  cta: "Ask us something else",
  items: [
    {
      q: "What exactly is an AI employee?",
      a: "It’s a purpose-built AI system with a defined role in your business. It combines your approved knowledge, instructions, and connected tools to carry out a workflow, rather than only answer questions. Think of a sales coordinator that prepares follow-ups and updates your CRM, with your team reviewing the decisions that matter.",
    },
    {
      q: "How is this different from a chatbot?",
      a: "A chatbot is often a place to ask questions. An AI employee is built to move a specific piece of work forward: gathering information, taking permitted actions in your tools, and handing off to people when needed. Conversation can be part of the experience, but the workflow is the point.",
    },
    {
      q: "Do we need an in-house AI team?",
      a: "No. We handle the technical work, from design and integration to ongoing improvement. We do need your team’s knowledge of the business and a point person to help define success, review workflows, and give feedback.",
    },
    {
      q: "Will it replace our people?",
      a: "Our starting point is giving your existing team more capacity. AI takes on repeatable work so your people can spend more time on relationships, judgment, and the work that needs their expertise. We design the division of responsibilities together.",
    },
    {
      q: "How do you handle access and mistakes?",
      a: "We define data access, allowed actions, approval requirements, and escalation paths with you before rollout. We test against real scenarios and review performance. AI can make mistakes, so sensitive actions need appropriate checks and a clear route back to a person.",
    },
    {
      q: "Where do we start, and what does it cost?",
      a: "Start with a conversation about one workflow that’s taking too much time. We’ll explore what’s feasible and scope the role, integrations, rollout, and ongoing support. Pricing and timing depend on that scope and are agreed before any build begins.",
    },
  ],
};

export const contact = {
  eyebrow: "Let’s make room for what’s next",
  heading: {
    lines: ["What would your team do", "with more possibility?"],
    accent: "more possibility?",
  },
  note: "BIG IDEAS. A PRACTICAL FIRST STEP.",
  subject: "Let’s build our AI team",
  arrowLabel: "Email laglabs to discuss your AI team",
  body: [
    "Tell us what’s slowing you down.",
    "Let’s find your first AI employee.",
  ],
};

export const footer = {
  tagline: "Human ambition. AI on your side.",
  closing: "Built for the way you work. And what comes next.",
};
