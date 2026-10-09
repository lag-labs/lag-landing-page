import { Icon } from "@/components/brand/icon";
import { Eyebrow, Headline, Lines } from "@/components/brand/primitives";
import { labs } from "@/lib/content";
import { mailto } from "@/lib/site";

export function Labs() {
  return (
    <section
      className="labs section-pad"
      id="labs"
      aria-labelledby="labs-title"
    >
      <div className="wrap">
        <div className="section-heading reveal">
          <div>
            <Eyebrow index={labs.index}>{labs.eyebrow}</Eyebrow>
            <h2 id="labs-title">
              <Headline heading={labs.heading} />
            </h2>
          </div>
          <p>
            <Lines lines={labs.aside} />
          </p>
        </div>
        <div className="process-grid">
          {labs.points.map((point) => (
            <article key={point.title} className="process-card reveal">
              <div className="process-top">
                <span className="labs-icon">
                  <Icon name={point.icon} />
                </span>
              </div>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
              <span className="process-deliverable">{point.label}</span>
            </article>
          ))}
        </div>
        <div className="possibilities-foot">
          <span>{labs.foot}</span>
          <a href={mailto(labs.cta.subject)}>
            {labs.cta.label} <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
