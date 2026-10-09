import { Icon } from "@/components/brand/icon";
import { StatusDot, TextLink } from "@/components/brand/primitives";
import { type DataSource, dataSources, possibilities } from "@/lib/content";
import { mailto } from "@/lib/site";

/**
 * WAI-ARIA tabs rendered on the server; src/islands/enhance.ts adds the
 * click/keyboard behaviour. Every panel is in the HTML so crawlers and answer
 * engines see every data source; without the script (the `js` class) CSS shows them all.
 */
export function DataTabs() {
  return (
    <div>
      <div
        className="role-tabs"
        role="tablist"
        aria-label={possibilities.tabsLabel}
      >
        {dataSources.map((source, i) => (
          <button
            key={source.id}
            type="button"
            role="tab"
            id={`tab-${source.id}`}
            aria-controls={`panel-${source.id}`}
            aria-selected={i === 0}
            tabIndex={i === 0 ? 0 : -1}
            className="role-tab"
          >
            <span className="tab-number">0{i + 1}</span> {source.tab}{" "}
            <Icon name="diagonal" />
          </button>
        ))}
      </div>

      {dataSources.map((source, i) => (
        <div
          key={source.id}
          role="tabpanel"
          id={`panel-${source.id}`}
          aria-labelledby={`tab-${source.id}`}
          hidden={i !== 0}
          className="role-panel"
        >
          <SourceCopy source={source} />
          <WorkflowCard source={source} />
        </div>
      ))}
    </div>
  );
}

function SourceCopy({ source }: { source: DataSource }) {
  return (
    <div className="role-copy">
      <span className="role-badge">{source.badge}</span>
      <h3>
        {source.headline[0]} <br />
        {source.headline[1]}
      </h3>
      <p>{source.description}</p>
      <ul className="check-list">
        {source.examples.map((example) => (
          <li key={example}>{example}</li>
        ))}
      </ul>
      <TextLink href={mailto(source.cta.subject)}>
        {source.cta.label} <Icon name="diagonal" />
      </TextLink>
    </div>
  );
}

function WorkflowCard({ source }: { source: DataSource }) {
  const { workflow } = source;
  return (
    <div className="workflow-card">
      <div className="workflow-top">
        <span className="workflow-icon">
          <Icon name={workflow.icon} />
        </span>
        <div>
          <strong>{workflow.title}</strong>
          <span>Example workflow</span>
        </div>
        <span className="workflow-dots" aria-hidden="true">
          ···
        </span>
      </div>
      <ol className="workflow-steps">
        {workflow.steps.map((step) => (
          <li key={step.title}>
            <span className="step-bullet">
              <Icon name={step.icon} />
            </span>
            <div>
              <strong>{step.title}</strong>
              <span>{step.detail}</span>
            </div>
            {step.tag ? (
              <span
                className={
                  step.tag.tone === "green" ? "step-tag green-tag" : "step-tag"
                }
              >
                {step.tag.label}
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      <div className="workflow-outcome">
        <StatusDot /> {workflow.outcome}
      </div>
    </div>
  );
}
