import { Icon } from "@/components/brand/icon";
import { Eyebrow, Headline } from "@/components/brand/primitives";
import { difference } from "@/lib/content";

export function Difference() {
  return (
    <section
      className="difference section-pad"
      id="why-laglabs"
      aria-labelledby="difference-title"
    >
      <div className="wrap difference-grid">
        <div className="difference-copy reveal">
          <Eyebrow index={difference.index}>{difference.eyebrow}</Eyebrow>
          <h2 id="difference-title">
            <Headline heading={difference.heading} />
          </h2>
          <p>{difference.text}</p>
          <div className="human-equation" aria-hidden="true">
            <span>
              <Icon name="person" />
            </span>
            <b>+</b>
            <span className="equation-ai">
              <Icon name="spark" />
            </span>
            <b>=</b>
            <span className="equation-result">More possible. ↗</span>
          </div>
        </div>
        <div className="principles">
          {difference.principles.map((principle) => (
            <article key={principle.title} className="principle reveal">
              <span className="principle-icon">
                <Icon name={principle.icon} />
              </span>
              <div>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
