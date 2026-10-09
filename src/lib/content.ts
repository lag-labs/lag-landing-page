// All landing copy, headlines included. Sections render from here, and so do
// the JSON-LD (FAQPage, Service catalog) and /llms.txt: edit once, every
// surface updates.
import type { IconName } from "@/components/brand/icon";

/** A headline: lines split with <br>, plus one optional phrase to accent. */
export type Heading = { lines: readonly string[]; accent?: string };

export const nav = [
  { label: "What qualifies", href: "#possibilities" },
  { label: "How it works", href: "#approach" },
  { label: "For AI labs", href: "#labs" },
] as const;

export const hero = {
  eyebrow: "Company data for frontier AI",
  heading: { lines: ["Real work.", "Real revenue."], accent: "revenue" },
  description: {
    before:
      "AI labs need to learn how real companies run. We turn the records your team already creates into ",
    strong: "licensed, de-identified datasets",
    after: ", and a new line of revenue for you.",
  },
  primaryCta: "See what your data is worth",
  secondaryCta: "See what qualifies",
  note: "You approve every dataset. You keep ownership.",
  visualLabel:
    "Example: records from your systems are scoped by you, de-identified by laglabs and approved by your team before being licensed to an AI lab.",
  bottomLead: { before: "Licensed on", strong: "your terms." },
  bottom: ["Your scope", "Sensitive details removed", "Your approval"],
  managed: "Handled by laglabs",
  visual: {
    topline: "YOUR DATA. YOUR TERMS.",
    request: { label: "DEMAND", title: "AI labs need real work" },
    context: { title: "Your records.", detail: "Tickets, docs, orders." },
    tools: { title: "Your systems", detail: "Scoped by you." },
    core: "Safe to share.",
    result: {
      heading: "Ready to license",
      rows: ["Details de-identified", "Scope approved", "License signed"],
    },
    human: { before: "Your approval.", strong: "Before anything moves." },
  },
};

export const intro = {
  index: "01 /",
  eyebrow: "The opportunity",
  heading: {
    lines: ["AI has read the internet.", "It hasn’t seen your work."],
    accent: "It hasn’t seen your work.",
  },
  paragraphs: [
    "Frontier models learned from what’s public. What they still miss is how work actually gets done: the ticket that escalated, the order that changed, the decision behind the document.",
    "Your company records that every day, in the tools you already use. We help you license it to AI labs, carefully and on your terms, as revenue from work you’ve already done.",
  ],
};

export type WorkflowStep = {
  icon: IconName;
  title: string;
  detail: string;
  tag?: { label: string; tone: "neutral" | "green" };
};

export type DataSource = {
  id: string;
  tab: string;
  badge: string;
  headline: [string, string];
  description: string;
  examples: string[];
  cta: { label: string; subject: string };
  workflow: {
    icon: IconName;
    title: string;
    steps: WorkflowStep[];
    outcome: string;
  };
};

export const dataSources: DataSource[] = [
  {
    id: "support",
    tab: "Support",
    badge: "SUPPORT AND SERVICE DATA",
    headline: ["Every ticket is a lesson", "in how problems get solved."],
    description:
      "Real conversations, escalations and resolutions show AI how good service works, including the hard cases nobody would think to write down.",
    examples: [
      "Ticket histories and resolution notes",
      "Email and chat threads with customers",
      "Escalations, macros and help center articles",
    ],
    cta: {
      label: "License your support data",
      subject: "Licensing our support data",
    },
    workflow: {
      icon: "chat",
      title: "From help desk to dataset",
      steps: [
        {
          icon: "sliders",
          title: "You choose the scope",
          detail: "Which systems, which years, what stays out",
          tag: { label: "Scope", tone: "neutral" },
        },
        {
          icon: "spark",
          title: "laglabs prepares the data",
          detail: "Extract → de-identify → structure",
        },
        {
          icon: "person",
          title: "You approve before it moves",
          detail: "Review samples, then sign the license",
          tag: { label: "Approval", tone: "green" },
        },
      ],
      outcome: "Licensed on your terms. Paid as agreed.",
    },
  },
  {
    id: "operations",
    tab: "Operations",
    badge: "OPERATIONS AND BACK OFFICE DATA",
    headline: [
      "Orders, invoices, exceptions.",
      "The real shape of a business.",
    ],
    description:
      "The everyday paperwork of a company shows AI how processes run end to end, across documents, systems and the people who keep them moving.",
    examples: [
      "Orders, invoices and purchase records",
      "Scheduling, dispatch and project trails",
      "Process documents, checklists and SOPs",
    ],
    cta: {
      label: "License your operations data",
      subject: "Licensing our operations data",
    },
    workflow: {
      icon: "grid",
      title: "From records to a training set",
      steps: [
        {
          icon: "file",
          title: "You point us to the records",
          detail: "An export or limited access you approve",
          tag: { label: "Scope", tone: "neutral" },
        },
        {
          icon: "spark",
          title: "laglabs removes what’s sensitive",
          detail: "Names, accounts and identifiers replaced",
        },
        {
          icon: "person",
          title: "You sign off on the result",
          detail: "Samples first, delivery only after approval",
          tag: { label: "Approval", tone: "green" },
        },
      ],
      outcome: "Revenue from work you’ve already done.",
    },
  },
  {
    id: "sales",
    tab: "Sales & CRM",
    badge: "SALES AND CRM DATA",
    headline: ["Deals won and lost.", "Decisions AI can learn from."],
    description:
      "Pipeline history captures judgment in motion: who was contacted, what changed and why a deal moved forward or stalled.",
    examples: [
      "CRM history and pipeline changes",
      "Proposals, quotes and follow-ups",
      "Account notes and handoffs between teams",
    ],
    cta: {
      label: "License your sales data",
      subject: "Licensing our sales and CRM data",
    },
    workflow: {
      icon: "mail",
      title: "From pipeline to dataset",
      steps: [
        {
          icon: "sliders",
          title: "You set the boundaries",
          detail: "Leave out pricing, key accounts, anything",
          tag: { label: "Scope", tone: "neutral" },
        },
        {
          icon: "spark",
          title: "laglabs structures the history",
          detail: "De-identify → order events → document",
        },
        {
          icon: "person",
          title: "Your team reviews it",
          detail: "Nothing is shared without your yes",
          tag: { label: "Approval", tone: "green" },
        },
      ],
      outcome: "Your history, licensed. Your edge, kept.",
    },
  },
  {
    id: "engineering",
    tab: "Engineering & IT",
    badge: "ENGINEERING AND IT DATA",
    headline: ["Incidents, fixes and reviews.", "How software really ships."],
    description:
      "Issue trackers and incident reports show AI how teams debug, prioritize and recover, with the context and back and forth that public code never shows.",
    examples: [
      "Issue trackers and project boards",
      "Incident reports and postmortems",
      "Internal docs, runbooks and wikis",
    ],
    cta: {
      label: "License your engineering data",
      subject: "Licensing our engineering data",
    },
    workflow: {
      icon: "file",
      title: "From tracker to training set",
      steps: [
        {
          icon: "grid",
          title: "You pick the projects",
          detail: "Specific boards, teams or time ranges",
          tag: { label: "Scope", tone: "neutral" },
        },
        {
          icon: "spark",
          title: "laglabs cleans and links it",
          detail: "Strip secrets → de-identify → connect threads",
        },
        {
          icon: "person",
          title: "You approve the final dataset",
          detail: "Review before any lab sees a record",
          tag: { label: "Approval", tone: "green" },
        },
      ],
      outcome: "Years of know-how, finally valued.",
    },
  },
];

export const possibilities = {
  index: "02 /",
  eyebrow: "What qualifies",
  heading: { lines: ["The work you already do.", "The data AI labs need."] },
  aside: [
    "If your team works in software,",
    "it’s already creating valuable data.",
  ],
  tabsLabel: "Explore the kinds of company data AI labs license",
  foot: "Examples, not a checklist. Every dataset is scoped with you.",
  footCta: "Not sure what you have?",
};

export const approach = {
  index: "03 /",
  eyebrow: "From first call to first payment",
  heading: { lines: ["You know your data.", "We take it to market."] },
  aside: ["One partner, from the first conversation", "to the license."],
  steps: [
    {
      title: "Map what you have.",
      text: "A short call about your systems, history and industry. We tell you what AI labs are looking for and what your data could be worth.",
      deliverable: "A clear picture, no commitment",
      icon: "diagonal",
    },
    {
      title: "Agree the scope.",
      text: "You decide which systems, time ranges and record types are in, and what stays out. Nothing is shared without your written approval.",
      deliverable: "Your rules, in writing",
      icon: "diagonal",
    },
    {
      title: "Prepare and protect.",
      text: "We extract, de-identify and structure the data. You review samples before any lab sees a single record.",
      deliverable: "A dataset you’ve signed off",
      icon: "diagonal",
    },
    {
      title: "License and get paid.",
      text: "We match your dataset with the right AI labs, negotiate the terms and handle delivery. You get paid as agreed.",
      deliverable: "New revenue from past work",
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
  eyebrow: "Your data, your terms",
  heading: {
    lines: ["New revenue.", "Nothing given away."],
    accent: "Nothing given away.",
  },
  text: "Licensing your data shouldn’t mean losing control of it. We built laglabs around the questions every owner asks first.",
  principles: [
    {
      icon: "sliders",
      title: "You decide what’s shared.",
      text: "Systems, time ranges, record types and buyers. If it’s not in the agreed scope, it doesn’t leave.",
    },
    {
      icon: "shield",
      title: "Sensitive details removed.",
      text: "Names, contact details and other identifiers for customers and employees are removed or replaced before any lab sees the data.",
    },
    {
      icon: "file",
      title: "A license, not a sale.",
      text: "You keep ownership. Labs get defined rights for defined uses, for an agreed period, written down before anything moves.",
    },
    {
      icon: "loop",
      title: "We do the heavy lifting.",
      text: "No engineering project for your team. We handle preparation, documentation, negotiation and delivery.",
    },
  ] satisfies { icon: IconName; title: string; text: string }[],
};

export const labs = {
  index: "05 /",
  eyebrow: "For AI labs",
  heading: {
    lines: ["Data you can’t scrape.", "Rights you can rely on."],
  },
  aside: [
    "Real records of real companies at work,",
    "licensed directly and ready to use.",
  ],
  points: [
    {
      icon: "grid",
      title: "Real workflows.",
      text: "Requests, decisions and exceptions across the systems companies actually use, in order and with context.",
      label: "Beyond the public web",
    },
    {
      icon: "file",
      title: "Clean provenance.",
      text: "Every dataset is licensed directly from the company that created it, with documented scope and permitted uses.",
      label: "Consent on record",
    },
    {
      icon: "shield",
      title: "De-identified.",
      text: "Personal and confidential details are removed or replaced before delivery, and every dataset comes documented.",
      label: "Privacy built in",
    },
    {
      icon: "sliders",
      title: "Sourced to your spec.",
      text: "Tell us the industry, systems, time range and volume you need. We find the companies that have it.",
      label: "Training, evals and environments",
    },
  ] satisfies { icon: IconName; title: string; text: string; label: string }[],
  foot: "Industries the public web doesn’t reach, from logistics to field services.",
  cta: {
    label: "Request a dataset",
    subject: "Dataset request from an AI lab",
  },
};

export const faq = {
  eyebrow: "A little more clarity",
  heading: { lines: ["Good questions.", "Straight answers."] },
  cta: "Ask us something else",
  items: [
    {
      q: "Why do AI labs pay for company data?",
      a: "Because the public internet is largely used up, and it rarely shows how work really gets done. Labs need real records of businesses operating: requests, decisions, exceptions and outcomes across everyday tools. That data can’t be scraped or convincingly synthesized, so labs license it from the companies that create it.",
    },
    {
      q: "What kinds of company data qualify?",
      a: "Most of the records your team creates in software: support tickets, email and chat threads, CRM history, orders and invoices, project boards, incident reports and internal documents. Years of history across several systems are usually the most valuable. What labs need changes over time, so we start with a short conversation about what you have.",
    },
    {
      q: "Do we keep ownership of our data?",
      a: "Yes. You license defined rights for defined uses, such as training or evaluating AI models, for an agreed period. You don’t sell or transfer ownership. The scope, permitted uses and any exclusivity are written into the agreement before anything is shared.",
    },
    {
      q: "How is sensitive information protected?",
      a: "Personal and confidential details are removed or replaced before any lab sees the data. Names, contact details, account numbers and other identifiers are de-identified, and you can exclude whole systems, record types or time ranges. You review samples and approve the final dataset before it’s delivered.",
    },
    {
      q: "Will anyone know the data came from us?",
      a: "Only if you agree to it. We don’t publish the names of the companies we work with, and buyers are introduced under confidentiality. Datasets are prepared so that your customers, employees and partners can’t be identified from the records.",
    },
    {
      q: "Could a lab use our data to compete with us?",
      a: "Labs license data to train and evaluate general AI models, not to enter your market. The agreement limits how the data can be used, and you can leave anything strategically sensitive, such as pricing, key accounts or product plans, out of the scope entirely.",
    },
    {
      q: "How much work is this for our team?",
      a: "Very little. After a short call, we agree the scope with you and handle extraction, de-identification, documentation, negotiation and delivery. Your team’s time goes into deciding what’s included and reviewing samples, not building pipelines. Any access we need is limited to what you approve.",
    },
    {
      q: "How much could we earn, and when are we paid?",
      a: "It depends on your industry, systems, years of history and how many labs want that kind of data. We give you an estimate after the first conversation, and the price, payment terms and schedule are agreed in writing before anything is shared. Finding out costs nothing.",
    },
    {
      q: "We’re an AI lab. Can you source data to a spec?",
      a: "Yes. Tell us the industry, systems, time range, volume and intended use, whether that’s training, fine-tuning, evaluation or agent environments. We find companies that have the data, agree the license with them, and deliver de-identified, documented datasets.",
    },
  ],
};

export const contact = {
  eyebrow: "Let’s see what your data is worth",
  heading: {
    lines: ["What could your work", "teach the next model?"],
    accent: "teach the next model?",
  },
  note: "NO COMMITMENT. NOTHING SHARED TO FIND OUT.",
  subject: "Licensing our company data",
  arrowLabel: "Email laglabs about licensing your company data",
  body: [
    "Tell us about your company and your tools.",
    "We’ll tell you what AI labs are looking for.",
  ],
};

export const footer = {
  tagline: "Real work. Better AI.",
  closing: "Your data, licensed on your terms.",
};
