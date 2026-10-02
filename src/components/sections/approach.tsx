import { Icon } from "@/components/brand/icon";
import { Eyebrow, Headline, Lines } from "@/components/brand/primitives";
import { approach } from "@/lib/content";

export function Approach() {
  return (
    <section
      className="approach section-pad"
      id="approach"
      aria-labelledby="approach-title"
    >
      <div className="wrap">
        <div className="section-heading reveal">
          <div>
            <Eyebrow index={approach.index}>{approach.eyebrow}</Eyebrow>
            <h2 id="approach-title">
              <Headline heading={approach.heading} />
            </h2>
          </div>
          <p>
            <Lines lines={approach.aside} />
          </p>
        </div>
        <div className="process-grid">
          {approach.steps.map((step, i) => (
            <article key={step.title} className="process-card reveal">
              <div className="process-top">
                <span className="process-number">0{i + 1}</span>
                <Icon name={step.icon} />
              </div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
              <span className="process-deliverable">{step.deliverable}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
