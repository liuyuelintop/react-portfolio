import { useState } from "react";
import PropTypes from "prop-types";
import { useFirstSight } from "../../../../hooks";

const ACTORS = { you: "You", code: "Code", model: "Model", chat: "Chat", gate: "Gate" };

// The workflow as a document under tracked changes: what was removed is struck,
// what was added is marked in the margin. Accepting the changes folds the
// struck lines away and leaves the workflow as it is now. On first sight the
// strikes are drawn one after another; after that the reader drives it.
export default function RevisionFigure({ figure }) {
  const [which, setWhich] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [open, setOpen] = useState(figure.comparisons[0].open);
  const { ref, armed, seen } = useFirstSight();

  const comparison = figure.comparisons[which];
  let struck = 0;

  const choose = (index) => {
    setWhich(index);
    setAccepted(false);
    setOpen(figure.comparisons[index].open);
  };

  const classes = ["sheet", "revfig"];
  if (armed) classes.push("armed");
  if (seen) classes.push("seen");
  if (accepted) classes.push("accepted");

  return (
    <div className={classes.join(" ")} ref={ref}>
      <h5>{figure.title}</h5>
      <p className="how">{figure.how}</p>

      <div className="rev-tabs">
        {figure.comparisons.map((option, index) => (
          <button
            key={option.id}
            className="tog"
            type="button"
            aria-pressed={index === which}
            onClick={() => choose(index)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <ol className="rev-doc">
        {comparison.lines.map((line) => {
          const gone = accepted && line.change === "del";
          const isOpen = open === line.id && !gone;
          const noteId = `rev-${comparison.id}-${line.id}`;
          const order = line.change === "del" ? struck++ : 0;
          return (
            <li
              key={noteId}
              className={`rev-line ${line.change}`}
              style={{ "--order": order }}
              inert={gone}
            >
              <div className="rev-inner">
                <button
                  className="rev-head"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={noteId}
                  onClick={() => setOpen(isOpen ? null : line.id)}
                >
                  <span className="mark" aria-hidden="true">
                    {line.change === "del" && "−"}
                    {line.change === "ins" && "+"}
                  </span>
                  <span className="name">
                    {line.change === "del" && <span className="sr-only">{figure.removedLabel}: </span>}
                    {line.change === "ins" && !accepted && <span className="sr-only">{figure.addedLabel}: </span>}
                    <span className="txt">{line.name}</span>
                  </span>
                  <span className={`actor a-${line.actor}`}>{ACTORS[line.actor]}</span>
                </button>
                <div className="rev-note" id={noteId} aria-hidden={!isOpen}>
                  <p>{line.note}</p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="rev-summary" aria-live="polite">
        {accepted ? figure.acceptedSummary : comparison.summary}
      </p>

      <div className="fig-controls">
        <button className="tog solid" type="button" aria-pressed={accepted} onClick={() => setAccepted(!accepted)}>
          {accepted ? figure.reject : figure.accept}
        </button>
      </div>
    </div>
  );
}

RevisionFigure.propTypes = {
  figure: PropTypes.shape({
    title: PropTypes.string.isRequired,
    how: PropTypes.string.isRequired,
    accept: PropTypes.string.isRequired,
    reject: PropTypes.string.isRequired,
    removedLabel: PropTypes.string.isRequired,
    addedLabel: PropTypes.string.isRequired,
    acceptedSummary: PropTypes.string.isRequired,
    comparisons: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        open: PropTypes.string,
        lines: PropTypes.array.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};
