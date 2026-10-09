// Plain-text views of the site for LLMs and answer engines (llmstxt.org).
// No dashes as punctuation here either: see the copy rules in the design skill.
// Generated from the same content as the page, so they never drift.
import {
  approach,
  contact,
  dataSources,
  difference,
  faq,
  type Heading,
  hero,
  intro,
  labs,
  possibilities,
} from "@/lib/content";
import { site } from "@/lib/site";

const description = `${hero.description.before}${hero.description.strong}${hero.description.after}`;

const headline = (heading: Heading) => heading.lines.join(" ");
// Mono labels are uppercase in content; in prose they read lowercase, AI stays AI.
const lower = (label: string) => label.toLowerCase().replace(/\bai\b/g, "AI");

export function llmsTxt() {
  return [
    `# ${site.name}`,
    "",
    `> ${site.summary}`,
    "",
    `${site.tagline} ${description}`,
    "",
    "Key facts:",
    "* Offer: laglabs licenses real operational data from companies to frontier AI labs for training, fine-tuning, evaluation and agent environments.",
    "* Audiences: companies whose teams work in software (data suppliers) and AI labs (data buyers).",
    "* Model: laglabs scopes each dataset with the company, extracts, de-identifies and documents it, then negotiates the license and handles delivery.",
    "* Control: the company decides what is included, reviews samples and approves before anything is shared; it keeps ownership and licenses defined rights for defined uses.",
    "* Pricing: depends on industry, systems, history and demand; agreed in writing before anything is shared, and finding out costs nothing.",
    `* Contact: ${site.email}`,
    "",
    "## Pages",
    "",
    `* [Home](${site.url}/): what laglabs does, which company data qualifies, how it works, principles, what AI labs get and FAQ`,
    `* [Full text](${site.url}/llms-full.txt): the complete page content as plain text`,
    "",
    "## Company data that qualifies",
    "",
    ...dataSources.map(
      (source) =>
        `* ${source.tab}: ${source.headline.join(" ")} ${source.examples.join("; ")}.`,
    ),
    "",
    "## Optional",
    "",
    `* [Email laglabs](mailto:${site.email})`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  return [
    `# ${site.name}: ${site.tagline}`,
    "",
    `> ${site.summary}`,
    "",
    description,
    "",
    `## ${intro.eyebrow}`,
    "",
    headline(intro.heading),
    "",
    ...intro.paragraphs.flatMap((p) => [p, ""]),
    `## ${possibilities.eyebrow}`,
    "",
    `${headline(possibilities.heading)} ${possibilities.aside.join(" ")} ${possibilities.foot}`,
    "",
    ...dataSources.flatMap((source) => [
      `### ${source.tab}: ${lower(source.badge)}`,
      "",
      `${source.headline.join(" ")} ${source.description}`,
      "",
      ...source.examples.map((example) => `* ${example}`),
      "",
      `Example workflow (${source.workflow.title}):`,
      ...source.workflow.steps.map(
        (step, i) => `${i + 1}. ${step.title} (${step.detail})`,
      ),
      `Outcome: ${source.workflow.outcome}`,
      "",
    ]),
    `## How it works: ${lower(approach.eyebrow)}`,
    "",
    `${headline(approach.heading)} ${approach.aside.join(" ")}`,
    "",
    ...approach.steps.flatMap((step, i) => [
      `${i + 1}. ${step.title} ${step.text} (${step.deliverable})`,
    ]),
    "",
    `## ${difference.eyebrow}`,
    "",
    `${headline(difference.heading)} ${difference.text}`,
    "",
    ...difference.principles.map((p) => `* ${p.title} ${p.text}`),
    "",
    `## ${labs.eyebrow}`,
    "",
    `${headline(labs.heading)} ${labs.aside.join(" ")}`,
    "",
    ...labs.points.map((p) => `* ${p.title} ${p.text}`),
    "",
    `${labs.foot} ${labs.cta.label}: ${site.email}.`,
    "",
    "## Frequently asked questions",
    "",
    ...faq.items.flatMap((item) => [`### ${item.q}`, "", item.a, ""]),
    "## Contact",
    "",
    `${headline(contact.heading)} ${contact.body.join(" ")} Email ${site.email}.`,
    "",
  ].join("\n");
}
