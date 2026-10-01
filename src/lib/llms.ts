// Plain-text views of the site for LLMs and answer engines (llmstxt.org).
// Generated from the same content as the page, so they never drift.
import {
  approach,
  contact,
  difference,
  faq,
  hero,
  intro,
  possibilities,
  roles,
} from "@/lib/content";
import { site } from "@/lib/site";

const description = `${hero.description.before}${hero.description.strong}${hero.description.after}`;

export function llmsTxt() {
  return [
    `# ${site.name}`,
    "",
    `> ${site.summary}`,
    "",
    `${site.tagline} ${description}`,
    "",
    "Key facts:",
    "- Offer: custom AI employees — AI systems with a defined role that carry out a workflow inside a company's existing tools.",
    "- Audience: mid-sized companies.",
    "- Model: laglabs scopes, builds, launches and then manages and improves each AI employee; no in-house AI team is needed.",
    "- Control: defined permissions, review points and human handoffs; people stay in the loop for decisions that matter.",
    "- Pricing: scoped per workflow and agreed before any build begins.",
    `- Contact: ${site.email}`,
    "",
    "## Pages",
    "",
    `- [Home](${site.url}/): what laglabs builds, example roles, how it works, principles and FAQ`,
    `- [Full text](${site.url}/llms-full.txt): the complete page content as plain text`,
    "",
    "## Example roles",
    "",
    ...roles.map(
      (role) =>
        `- ${role.tab}: ${role.headline.join(" ")} ${role.tasks.join("; ")}.`,
    ),
    "",
    "## Optional",
    "",
    `- [Email laglabs](mailto:${site.email})`,
    "",
  ].join("\n");
}

export function llmsFullTxt() {
  return [
    `# ${site.name} — ${site.tagline}`,
    "",
    `> ${site.summary}`,
    "",
    description,
    "",
    `## ${intro.eyebrow}`,
    "",
    "You don’t need more on your plate. You need more on your side.",
    "",
    ...intro.paragraphs.flatMap((p) => [p, ""]),
    `## ${possibilities.eyebrow}: real roles, real work off your plate`,
    "",
    `${possibilities.aside.join(" ")} ${possibilities.foot}`,
    "",
    ...roles.flatMap((role) => [
      `### ${role.tab} — ${role.badge.toLowerCase()}`,
      "",
      `${role.headline.join(" ")} ${role.description}`,
      "",
      ...role.tasks.map((task) => `- ${task}`),
      "",
      `Example workflow — ${role.workflow.title}:`,
      ...role.workflow.steps.map(
        (step, i) => `${i + 1}. ${step.title} (${step.detail})`,
      ),
      `Outcome: ${role.workflow.outcome}`,
      "",
    ]),
    `## How it works: ${approach.eyebrow.toLowerCase()}`,
    "",
    ...approach.steps.flatMap((step, i) => [
      `${i + 1}. ${step.title} ${step.text} (${step.deliverable})`,
    ]),
    "",
    `## ${difference.eyebrow}: more capable, still entirely you`,
    "",
    difference.text,
    "",
    ...difference.principles.map((p) => `- ${p.title} ${p.text}`),
    "",
    "## Frequently asked questions",
    "",
    ...faq.items.flatMap((item) => [`### ${item.q}`, "", item.a, ""]),
    "## Contact",
    "",
    `${contact.body.join(" ")} Email ${site.email}.`,
    "",
  ].join("\n");
}
