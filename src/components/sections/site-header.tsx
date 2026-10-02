import { Wordmark } from "@/components/brand/primitives";
import { PrimaryNav } from "./primary-nav";

/** On pages other than home pass `base="/"` so the links lead back to it. */
export function SiteHeader({ base }: { base?: string }) {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Wordmark href={base} />
        <PrimaryNav base={base} />
      </div>
    </header>
  );
}
