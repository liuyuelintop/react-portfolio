import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { useFirstSight } from "../../../../hooks";

const MODEL_SIDE = new Set(["model"]);
const ACTORS = { you: "You", code: "Code", model: "Model" };

// One line traced back to whoever wrote it. A dashed rule marks each place the
// trace crosses between code and a model.
function Lineage({ head, trace, figure, hidden }) {
  const crosses = trace.some((node) => MODEL_SIDE.has(node.actor));
  return (
    <div className="lineage-col" hidden={hidden}>
      <p className="lc-head">{head}</p>
      <ol className="lineage">
        {trace.map((node, index) => {
          const previous = trace[index - 1];
          const boundary =
            previous &&
            previous.actor !== "you" &&
            node.actor !== "you" &&
            MODEL_SIDE.has(node.actor) !== MODEL_SIDE.has(previous.actor);
          return (
            <Fragment key={`${node.name}-${index}`}>
              {boundary && (
                <li className="boundary">
                  <span>{figure.boundary}</span>
                </li>
              )}
              <li className={`node a-${node.actor}`}>
                <span className={`actor a-${node.actor}`}>{ACTORS[node.actor]}</span>
                <b>{node.name}</b>
                <span className="d">{node.text}</span>
              </li>
            </Fragment>
          );
        })}
      </ol>
      {!crosses && <p className="lc-safe">{figure.noModel}</p>}
    </div>
  );
}

Lineage.propTypes = {
  head: PropTypes.string.isRequired,
  trace: PropTypes.array.isRequired,
  figure: PropTypes.object.isRequired,
  hidden: PropTypes.bool.isRequired,
};

// The report the pipeline returns, as a receipt. Every line can be traced back
// to whoever wrote it, and the trace marks where it crosses the model boundary.
// On first sight the receipt prints and the model's prose streams into the
// place the code left for it. A misread stops the receipt at the schema check.
export default function ReceiptFigure({ figure }) {
  const [selected, setSelected] = useState(figure.open);
  const [misread, setMisread] = useState(false);
  const { ref, armed, seen } = useFirstSight();

  const classes = ["receiptfig"];
  if (armed) classes.push("armed");
  if (seen) classes.push("seen");
  if (misread) classes.push("void");

  return (
    <div className={classes.join(" ")} ref={ref}>
      <h5>{figure.title}</h5>
      <p className="how">{figure.how}</p>

      <div className="rc-grid">
        <div className="receipt">
          <p className="rc-title">{figure.report}</p>
          <ul inert={misread}>
            {figure.lines.map((item, index) => (
              <li key={item.id} style={{ "--order": index }}>
                <button
                  type="button"
                  className={item.prose ? "prose" : undefined}
                  aria-pressed={!misread && item.id === selected}
                  onClick={() => setSelected(item.id)}
                >
                  <span className="k">{item.label}:</span>
                  {item.prose ? (
                    <span className="stream">
                      <span className="sr-only">{figure.proseLabel}</span>
                      <i aria-hidden="true" />
                      <i aria-hidden="true" />
                      <i aria-hidden="true" />
                    </span>
                  ) : (
                    <span className="v">{item.value}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
          {misread && (
            <p className="rc-void" role="status">
              {figure.misread.message}
            </p>
          )}
        </div>

        {/* Every trace is in the static HTML; only the chosen one is shown. */}
        <div className="lineage-cols" aria-live="polite">
          {figure.lines.map((item) => (
            <Lineage
              key={item.id}
              head={`${item.label}: ${item.value ?? figure.proseLabel}`}
              trace={item.trace}
              figure={figure}
              hidden={misread || item.id !== selected}
            />
          ))}
          <Lineage head={figure.misread.label} trace={figure.misread.trace} figure={figure} hidden={!misread} />
        </div>
      </div>

      <div className="fig-controls">
        <button className="tog scenario" type="button" aria-pressed={misread} onClick={() => setMisread(!misread)}>
          {misread ? figure.misread.reset : figure.misread.label}
        </button>
      </div>
    </div>
  );
}

ReceiptFigure.propTypes = {
  figure: PropTypes.shape({
    title: PropTypes.string.isRequired,
    how: PropTypes.string.isRequired,
    report: PropTypes.string.isRequired,
    boundary: PropTypes.string.isRequired,
    noModel: PropTypes.string.isRequired,
    proseLabel: PropTypes.string.isRequired,
    open: PropTypes.string.isRequired,
    lines: PropTypes.array.isRequired,
    misread: PropTypes.shape({
      label: PropTypes.string.isRequired,
      reset: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      trace: PropTypes.array.isRequired,
    }).isRequired,
  }).isRequired,
};
