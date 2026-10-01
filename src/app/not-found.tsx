import type { Metadata } from "next";
import { ButtonLink, Eyebrow } from "@/components/brand/primitives";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="section-pad">
        <div className="wrap">
          <Eyebrow index="404 /">Page not found</Eyebrow>
          <h1 className="mt-7 whitespace-normal">
            Nothing here. <br />
            Plenty <span className="accent-word">elsewhere</span>.
          </h1>
          <p className="hero-description">
            The page you were looking for doesn’t exist or has moved.
          </p>
          <div className="hero-actions">
            <ButtonLink href="/">Back to laglabs</ButtonLink>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
