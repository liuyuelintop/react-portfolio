import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFirstSight } from "../../../../hooks";

const TICKS = [0, 5, 10, 15, 20, 25];
const SPANS_SHOWN = new Set(["spans", "dominant", "changed", "measured"]);
const CHANGED = new Set(["changed", "measured"]);

const seconds = (value) => `${value.toFixed(1)}s`;

// One request as a trace, walked through the method: run it, add timing logs,
// find the dominant spans, change one layer, then measure again. The change
// leaves the total unknown until it is measured. A run replays the request at
// the figure's speed, once on first sight and again on "Measure again".
export default function TraceFigure({ figure }) {
  const [step, setStep] = useState(0);
  const [run, setRun] = useState(null);
  const [elapsed, setElapsed] = useState(null);
  const startRun = (to) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setRun({ to, id: Date.now() });
  };
  const { ref, armed, seen } = useFirstSight(0.5, () => startRun(figure.totals.before));

  const max = figure.totals.before;
  const view = figure.steps[step].view;
  const changed = CHANGED.has(view);
  const total = changed ? figure.totals.after : figure.totals.before;
  const measured = view !== "changed";

  // The clock beside the request counts up while a run replays.
  useEffect(() => {
    if (!run) return undefined;
    const duration = (run.to / figure.speed) * 1000;
    const begun = performance.now();
    let frame;
    const tick = (now) => {
      const share = Math.min((now - begun) / duration, 1);
      setElapsed(run.to * share);
      if (share < 1) frame = requestAnimationFrame(tick);
      else setRun(null);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, figure.speed]);

  const goTo = (index) => {
    setStep(index);
    const next = figure.steps[index].view;
    if (next === "measured") startRun(figure.totals.after);
    else if (next === "opaque") startRun(figure.totals.before);
    else {
      setRun(null);
      setElapsed(null);
    }
  };

  const bar = (start, end) => ({ left: `${(start / max) * 100}%`, width: `${((end - start) / max) * 100}%` });
  const running = Boolean(run);

  let reading = seconds(total);
  if (running) reading = seconds(elapsed ?? 0);
  else if (!measured) reading = figure.unmeasured;

  const classes = ["panel", "tracefig", `view-${view}`];
  if (armed && !seen) classes.push("armed");
  if (running) classes.push("running");
  const last = step === figure.steps.length - 1;

  return (
    <div className={classes.join(" ")} ref={ref}>
      <div className="tr-head">
        <h5>{figure.title}</h5>
        <p className="how">{figure.how}</p>
      </div>

      <div className="tr-chart" aria-hidden="true">
        <div className="trow request">
          <p className="tl">
            <span>{figure.request}</span>
            <b className={measured || running ? "total" : "total unknown"}>{reading}</b>
            {view === "measured" && !running && <s className="was">{seconds(figure.totals.before)}</s>}
          </p>
          <div className="track">
            {TICKS.map((tick) => (
              <i key={tick} className="tick" style={{ left: `${(tick / max) * 100}%` }} />
            ))}
            {changed && <span className="ghost" style={bar(0, figure.totals.before)} />}
            <span
              key={running ? run.id : "still"}
              className="bar"
              style={{ ...bar(0, total), "--run": running ? `${run.to / figure.speed}s` : undefined }}
            />
          </div>
        </div>
        <div className="tr-spans">
          <p className="tr-blind">{figure.blind}</p>
          {figure.spans.map((span) => {
            const [start, end] = changed ? span.after : span.before;
            const rowClasses = ["trow", "span"];
            if (span.dominant && view !== "spans") rowClasses.push("dominant");
            return (
              <div key={span.id} className={rowClasses.join(" ")}>
                <p className="tl">
                  <span>{span.label}</span>
                  {span.dominant && <em>{figure.dominantLabel}</em>}
                </p>
                <div className="track">
                  {TICKS.map((tick) => (
                    <i key={tick} className="tick" style={{ left: `${(tick / max) * 100}%` }} />
                  ))}
                  <span className="bar" style={bar(start, end)} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="trow axis">
          <span className="tl" />
          <div className="track">
            {TICKS.map((tick) => (
              <span key={tick} style={{ left: `${(tick / max) * 100}%` }}>
                {tick}s
              </span>
            ))}
          </div>
        </div>
        <p className="pace">{figure.speedNote}</p>
      </div>

      <ol className="tr-steps">
        {figure.steps.map((item, index) => {
          let state;
          if (index < step) state = "done";
          else if (index === step) state = "now";
          return (
            <li key={item.id} className={state}>
              <button type="button" aria-current={index === step ? "step" : undefined} onClick={() => goTo(index)}>
                <span className="n" aria-hidden="true">
                  {index + 1}
                </span>
                {item.name}
              </button>
              <p>{item.text}</p>
            </li>
          );
        })}
      </ol>

      <p className="sr-only" aria-live="polite">
        {`Step ${step + 1} of ${figure.steps.length}: ${figure.steps[step].name}. ${figure.request}: ${
          measured ? seconds(total) : figure.unmeasured
        }.`}
      </p>

      <div className="fig-controls">
        <button className="tog solid" type="button" onClick={() => goTo(last ? 0 : step + 1)}>
          {last ? figure.restart : `${figure.next}: ${figure.steps[step + 1].name}`}
        </button>
      </div>
    </div>
  );
}

TraceFigure.propTypes = {
  figure: PropTypes.shape({
    title: PropTypes.string.isRequired,
    how: PropTypes.string.isRequired,
    request: PropTypes.string.isRequired,
    unmeasured: PropTypes.string.isRequired,
    blind: PropTypes.string.isRequired,
    dominantLabel: PropTypes.string.isRequired,
    speed: PropTypes.number.isRequired,
    speedNote: PropTypes.string.isRequired,
    totals: PropTypes.shape({ before: PropTypes.number, after: PropTypes.number }).isRequired,
    spans: PropTypes.array.isRequired,
    steps: PropTypes.array.isRequired,
    next: PropTypes.string.isRequired,
    restart: PropTypes.string.isRequired,
  }).isRequired,
};
