// Site-wide facts used by metadata, structured data, robots, sitemap and llms.txt.
export const site = {
  name: "laglabs",
  url: "https://laglabs.ai",
  email: "hello@laglabs.ai",
  locale: "en_US",
  language: "en",
  title: "laglabs — More ambition. Less busywork.",
  shortTitle: "laglabs",
  tagline: "More ambition. Less busywork.",
  description:
    "More ambition. Less busywork. laglabs builds custom AI employees for mid-sized companies — connected to your tools, tailored to your business, and managed by us.",
  ogDescription:
    "AI employees built around your business. Give your people the capacity to do what comes next.",
  summary:
    "laglabs designs, builds and manages custom AI employees for mid-sized companies: purpose-built AI systems with a defined role that work inside a company's existing tools, follow its processes and hand decisions to people.",
  keywords: [
    "AI employees",
    "AI teammates",
    "custom AI agents",
    "AI automation for mid-sized companies",
    "AI workforce",
    "managed AI implementation",
    "forward deployed engineering",
    "AI sales coordinator",
    "AI operations coordinator",
    "AI customer support",
    "AI research analyst",
  ],
  themeColor: "#f7f7f5",
} as const;

export function mailto(subject?: string) {
  return subject
    ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${site.email}`;
}
