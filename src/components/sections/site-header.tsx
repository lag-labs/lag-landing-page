import { Wordmark } from "@/components/brand/primitives";
import { PrimaryNav } from "./primary-nav";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Wordmark />
        <PrimaryNav />
      </div>
    </header>
  );
}
