import { Eyebrow, Lines } from "@/components/brand/primitives";
import { possibilities } from "@/lib/content";
import { RoleTabs } from "./role-tabs";

export function Possibilities() {
  return (
    <section
      className="possibilities section-pad"
      id="possibilities"
      aria-labelledby="possibilities-title"
    >
      <div className="wrap">
        <div className="section-heading reveal">
          <div>
            <Eyebrow index={possibilities.index}>
              {possibilities.eyebrow}
            </Eyebrow>
            <h2 id="possibilities-title">
              Real roles. <br />
              Real work off your plate.
            </h2>
          </div>
          <p>
            <Lines lines={possibilities.aside} />
          </p>
        </div>
        <RoleTabs />
        <div className="possibilities-foot">
          <span>{possibilities.foot}</span>
          <a href="#contact">
            {possibilities.footCta} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
