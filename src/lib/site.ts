// Site-wide facts used by metadata, structured data, robots, sitemap and llms.txt.
export const site = {
  name: "laglabs",
  url: "https://laglabs.ai",
  email: "hello@laglabs.ai",
  locale: "en_US",
  language: "en",
  title: "laglabs | Real work. Real revenue.",
  shortTitle: "laglabs",
  tagline: "Real work. Real revenue.",
  description:
    "Real work. Real revenue. laglabs licenses de-identified operational data from companies to frontier AI labs, on terms you approve, while you keep ownership.",
  ogDescription:
    "Your company’s everyday work is the data AI labs need. License it on your terms.",
  summary:
    "laglabs sources real operational data from companies (support tickets, CRM history, orders, project trails and internal documents), de-identifies it and licenses it to frontier AI labs for training and evaluation. Companies approve the scope and keep ownership; labs get consented data with clean provenance.",
  keywords: [
    "AI training data",
    "license company data",
    "monetize business data",
    "operational data for AI",
    "data licensing for AI",
    "enterprise data monetization",
    "de-identified data",
    "real-world business data",
    "AI training data provider",
    "data for frontier AI labs",
  ],
  themeColor: "#f8f7f3",
} as const;

export function mailto(subject?: string) {
  return subject
    ? `mailto:${site.email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${site.email}`;
}
