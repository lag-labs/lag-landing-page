// Plain-text views of the site for LLMs and answer engines (llmstxt.org).
// No dashes as punctuation here either: see the copy rules in the design skill.
// Generated from the same content as the page, so they never drift.
import {
  approach,
  contact,
  difference,
  faq,
  type Heading,
  hero,
  intro,
  possibilities,
  roles,
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
    "* Offer: custom AI employees, meaning AI systems with a defined role that carry out a workflow inside a company's existing tools.",
    "* Audience: mid-sized companies.",
    "* Model: laglabs scopes, builds, launches and then manages and improves each AI employee; no in-house AI team is needed.",
    "* Control: defined permissions, review points and human handoffs; people stay in the loop for decisions that matter.",
    "* Pricing: scoped per workflow and agreed before any build begins.",
    `* Contact: ${site.email}`,
    "",
    "## Pages",
    "",
    `* [Home](${site.url}/): what laglabs builds, example roles, how it works, principles and FAQ`,
    `* [Full text](${site.url}/llms-full.txt): the complete page content as plain text`,
    "",
    "## Example roles",
    "",
    ...roles.map(
      (role) =>
        `* ${role.tab}: ${role.headline.join(" ")} ${role.tasks.join("; ")}.`,
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
    ...roles.flatMap((role) => [
      `### ${role.tab}: ${lower(role.badge)}`,
      "",
      `${role.headline.join(" ")} ${role.description}`,
      "",
      ...role.tasks.map((task) => `* ${task}`),
      "",
      `Example workflow (${role.workflow.title}):`,
      ...role.workflow.steps.map(
        (step, i) => `${i + 1}. ${step.title} (${step.detail})`,
      ),
      `Outcome: ${role.workflow.outcome}`,
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
    "## Frequently asked questions",
    "",
    ...faq.items.flatMap((item) => [`### ${item.q}`, "", item.a, ""]),
    "## Contact",
    "",
    `${headline(contact.heading)} ${contact.body.join(" ")} Email ${site.email}.`,
    "",
  ].join("\n");
}
