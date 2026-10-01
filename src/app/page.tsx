import { Approach } from "@/components/sections/approach";
import { Contact } from "@/components/sections/contact";
import { Difference } from "@/components/sections/difference";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Possibilities } from "@/components/sections/possibilities";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { structuredData } from "@/lib/structured-data";

const jsonLd = JSON.stringify(structuredData()).replace(/</g, "\\u003c");

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Intro />
        <Possibilities />
        <Approach />
        <Difference />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: escaped JSON-LD built from our own content
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
    </>
  );
}
