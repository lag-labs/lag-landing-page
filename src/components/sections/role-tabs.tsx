import { Icon } from "@/components/brand/icon";
import { StatusDot, TextLink } from "@/components/brand/primitives";
import { possibilities, type Role, roles } from "@/lib/content";
import { mailto } from "@/lib/site";

/**
 * WAI-ARIA tabs rendered on the server; src/islands/enhance.ts adds the
 * click/keyboard behaviour. Every panel is in the HTML so crawlers and answer
 * engines see all four roles; without the script (the `js` class) CSS shows them all.
 */
export function RoleTabs() {
  return (
    <div>
      <div
        className="role-tabs"
        role="tablist"
        aria-label={possibilities.tabsLabel}
      >
        {roles.map((role, i) => (
          <button
            key={role.id}
            type="button"
            role="tab"
            id={`tab-${role.id}`}
            aria-controls={`panel-${role.id}`}
            aria-selected={i === 0}
            tabIndex={i === 0 ? 0 : -1}
            className="role-tab"
          >
            <span className="tab-number">0{i + 1}</span> {role.tab}{" "}
            <Icon name="diagonal" />
          </button>
        ))}
      </div>

      {roles.map((role, i) => (
        <div
          key={role.id}
          role="tabpanel"
          id={`panel-${role.id}`}
          aria-labelledby={`tab-${role.id}`}
          hidden={i !== 0}
          className="role-panel"
        >
          <RoleCopy role={role} />
          <WorkflowCard role={role} />
        </div>
      ))}
    </div>
  );
}

function RoleCopy({ role }: { role: Role }) {
  return (
    <div className="role-copy">
      <span className="role-badge">{role.badge}</span>
      <h3>
        {role.headline[0]} <br />
        {role.headline[1]}
      </h3>
      <p>{role.description}</p>
      <ul className="check-list">
        {role.tasks.map((task) => (
          <li key={task}>{task}</li>
        ))}
      </ul>
      <TextLink href={mailto(role.cta.subject)}>
        {role.cta.label} <Icon name="diagonal" />
      </TextLink>
    </div>
  );
}

function WorkflowCard({ role }: { role: Role }) {
  const { workflow } = role;
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
