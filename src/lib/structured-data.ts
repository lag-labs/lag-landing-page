import { approach, faq, roles } from "@/lib/content";
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
          "AI employees",
          "AI agents",
          "Workflow automation",
          "Large language models",
          "Systems integration",
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
        primaryImageOfPage: `${site.url}/og.png`,
        mainEntity: { "@id": id("faq") },
      },
      {
        "@type": "Service",
        "@id": id("service"),
        name: "Custom AI employees",
        serviceType: "AI employee design, implementation and management",
        description: site.summary,
        provider: { "@id": id("organization") },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Mid-sized companies",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Example AI employee roles",
          itemListElement: roles.map((role) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: titleCase(role.badge.replace(/^YOUR /, "")),
              description: `${role.description} Typical tasks: ${role.tasks.join("; ")}.`,
            },
          })),
        },
        potentialAction: {
          "@type": "CommunicateAction",
          name: "Email laglabs",
          target: `mailto:${site.email}`,
        },
        additionalProperty: approach.steps.map((step, i) => ({
          "@type": "PropertyValue",
          name: `Step ${i + 1}: ${step.title}`,
          value: step.text,
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

function titleCase(value: string) {
  return value
    .toLowerCase()
    .replace(/\b(ai)\b/g, "AI")
    .replace(/(^|\s)\S/g, (char) => char.toUpperCase());
}
