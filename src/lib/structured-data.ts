import { approach, dataSources, faq } from "@/lib/content";
import { site } from "@/lib/site";

// One linked @graph so search and answer engines can resolve the entities.
// Keep it factual: no ratings, prices, addresses or claims the page doesn't make.
const id = (fragment: string) => `${site.url}/#${fragment}`;

export function structuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": id("organization"),
        name: site.name,
        url: site.url,
        email: site.email,
        logo: {
          "@type": "ImageObject",
          url: `${site.url}/icon-512.png`,
          width: 512,
          height: 512,
        },
        slogan: site.tagline,
        description: site.summary,
        knowsAbout: [
          "AI training data",
          "Data licensing",
          "Data de-identification",
          "Operational data",
          "Large language models",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: site.email,
          availableLanguage: ["English"],
        },
      },
      {
        "@type": "WebSite",
        "@id": id("website"),
        url: site.url,
        name: site.name,
        description: site.description,
        inLanguage: site.language,
        publisher: { "@id": id("organization") },
      },
      {
        "@type": "WebPage",
        "@id": id("webpage"),
        url: site.url,
        name: site.title,
        description: site.description,
        inLanguage: site.language,
        isPartOf: { "@id": id("website") },
        about: { "@id": id("service") },
        mentions: { "@id": id("process") },
        primaryImageOfPage: `${site.url}/og.png`,
        mainEntity: { "@id": id("faq") },
      },
      {
        "@type": "Service",
        "@id": id("service"),
        name: "Company data licensing for AI",
        serviceType:
          "AI training data sourcing, de-identification and licensing",
        description: site.summary,
        provider: { "@id": id("organization") },
        audience: [
          {
            "@type": "BusinessAudience",
            audienceType: "Companies with operational data",
          },
          { "@type": "BusinessAudience", audienceType: "AI labs" },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Kinds of company data licensed to AI labs",
          itemListElement: dataSources.map((source) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: `${source.tab} data`,
              description: `${source.description} Examples: ${source.examples.join("; ")}.`,
            },
          })),
        },
        potentialAction: {
          "@type": "CommunicateAction",
          name: "Email laglabs",
          target: `mailto:${site.email}`,
        },
      },
      {
        "@type": "ItemList",
        "@id": id("process"),
        name: "How laglabs licenses company data to AI labs",
        itemListOrder: "https://schema.org/ItemListOrderAscending",
        itemListElement: approach.steps.map((step, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: step.title,
          description: step.text,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": id("faq"),
        mainEntity: faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };
}
