import { Wordmark } from "@/components/brand/primitives";
import { footer } from "@/lib/content";
import { site } from "@/lib/site";
import { MotionToggle } from "./motion";

/** On pages other than home pass `base="/"` so the wordmark leads back to it. */
export function SiteFooter({ base }: { base?: string }) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <Wordmark href={base} />
        <p>{footer.tagline}</p>
        <a className="back-top" href="#top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
      <div className="wrap footer-bottom">
        <span>
          © <span id="year">{new Date().getFullYear()}</span> {site.name}
        </span>
        <span>{footer.closing}</span>
        <MotionToggle />
      </div>
    </footer>
  );
}
