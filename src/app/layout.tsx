import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { IconSprite } from "@/components/brand/icon";
import { site } from "@/lib/site";
import "./globals.css";

const manrope = localFont({
  src: "../fonts/manrope-latin.woff2",
  variable: "--font-manrope",
  weight: "200 800",
  style: "normal",
  display: "swap",
  fallback: ["sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [...site.keywords],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  alternates: {
    canonical: "/",
    types: { "text/plain": "/llms.txt" },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.ogDescription,
    locale: site.locale,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.title }],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.ogDescription,
    images: ["/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { email: false, telephone: false, address: false },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
};

export const viewport: Viewport = {
  themeColor: site.themeColor,
  width: "device-width",
  initialScale: 1,
};

// Runs before first paint: the `js` class collapses the ≤600px menu and hides
// inactive role panels without a layout shift. If /enhance.js then fails to
// load, the class is removed again and the page falls back to its
// no-JavaScript layout (links visible, every role panel shown).
// Scripts marked data-keep survive scripts/strip-runtime.ts; everything else is removed.
const markEnhanced = `(function(c){c.add("js");addEventListener("error",function(e){var t=e.target;if(t&&t.tagName==="SCRIPT"&&t.src.indexOf("/enhance.js")>-1)c.remove("js")},true)})(document.documentElement.classList)`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={site.language}
      className={manrope.variable}
      suppressHydrationWarning
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static, first-party snippet */}
        <script data-keep dangerouslySetInnerHTML={{ __html: markEnhanced }} />
        {/* All client behaviour (src/islands/enhance.ts, built by Bun). */}
        <script data-keep src="/enhance.js" defer />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <IconSprite />
        {children}
      </body>
    </html>
  );
}
