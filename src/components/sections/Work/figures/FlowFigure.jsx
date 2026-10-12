import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FLOW_CONTROLS } from "../../../../constants/work";

const STEP_MS = 2800;

// What is being passed on at a step. Each kind is a few lines of markup; the
// content itself lives with the figure's data in constants/work.js.
function Payload({ payload }) {
  switch (payload.kind) {
    case "code":
      return (
        <pre className="payload">
          <code>{payload.lines.join("\n")}</code>
        </pre>
      );
    case "chain":
      return (
        <ol className="payload chain" data-separator={payload.separator ?? "→"}>
          {payload.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      );
    case "rows":
      return (
        <dl className="payload rows">
          {payload.rows.map((row) => (
            <div key={row.label}>
              <dt>{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
        </dl>
      );
    case "split":
      return (
        <div className="payload split">
          <p>
            <b>{payload.kept.label}</b>
            {payload.kept.items.join(", ")}
          </p>
          <p>
            <b>{payload.dropped.label}</b>
            <s>{payload.dropped.items.join(", ")}</s>
          </p>
        </div>
      );
    case "metrics":
      return (
        <dl className="payload metrics">
          {payload.items.map((metric) => (
            <div key={metric.label}>
              <dt>{metric.label}</dt>
              <dd>{metric.value}</dd>
            </div>
          ))}
        </dl>
      );
    case "verdict":
      return (
        <div className={payload.bad ? "payload verdict no" : "payload verdict"}>
          <code>{payload.code}</code>
          <span>{payload.rule}</span>
          <b>{payload.result}</b>
        </div>
      );
    case "pips":
      return (
        <div className="payload pips">
          <span className="row" aria-hidden="true">
            {Array.from({ length: payload.count }, (_, index) => (
              <i key={index} className={index < payload.at ? "met" : undefined} />
            ))}
          </span>
          <span>{payload.label}</span>
        </div>
      );
    case "bars": {
      const longest = Math.max(...payload.lanes.map((lane) => lane.seconds));
      return (
        <div className="payload bars">
          {payload.lanes.map((lane) => (
            <div key={lane.label} className={lane.accent ? "bar accent" : "bar"}>
              <div className="lbl">
                <span>{lane.label}</span>
                <b>{lane.seconds.toFixed(1)}s</b>
              </div>
              <div className="track">
                <i
                  style={{
                    "--share": lane.seconds / longest,
                    "--duration": `${lane.seconds / payload.speed}s`,
                  }}
                />
              </div>
            </div>
          ))}
          <span className="pace">{payload.note}</span>
        </div>
      );
    }
    case "timecard":
      return (
        <div className="payload timecard">
          <span className="file">{payload.file}</span>
          <span className="sheet" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span>
            {payload.label} <b>{payload.value}</b>
          </span>
        </div>
      );
    case "stream":
      return (
        <div className="payload stream">
          <span>{payload.label}</span>
          <span className="lines" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
        </div>
      );
    case "report":
      return (
        <pre className="payload report">
          <code>
            {payload.lines.join("\n")}
            {"\n"}
            <em>{payload.prose}</em>
          </code>
        </pre>
      );
    default:
      return null;
  }
}

Payload.propTypes = {
  payload: PropTypes.object.isRequired,
};

// A rail of steps on two lanes, and one card per step. It plays once when first
// seen; after that the reader drives it. A figure may carry scenarios: other
// runs that replace the steps, or stop the same steps early.
export default function FlowFigure({ figure }) {
  const [step, setStep] = useState(0);
  const [backwards, setBackwards] = useState(false);
  const [chosen, setChosen] = useState(-1);
  const [playing, setPlaying] = useState(false);
  const [reading, setReading] = useState(false);
  const panel = useRef(null);

  const scenarios = figure.scenarios ?? [];
  const scenario = scenarios[chosen];
  const inScenario = Boolean(scenario);
  const steps = (inScenario && scenario.steps) || figure.steps;
  const lanes = (inScenario && scenario.lanes) || figure.lanes;
  const stopIndex = inScenario && scenario.stopAt ? steps.findIndex((item) => item.id === scenario.stopAt) : -1;
  const last = stopIndex === -1 ? steps.length - 1 : stopIndex;
  const current = steps[Math.min(step, steps.length - 1)];

  const position = (index) => ({
    left: `${((index + 0.5) / steps.length) * 100}%`,
    top: steps[index].lane === "top" ? "24%" : "76%",
  });
  const point = (index) => ({ x: (index + 0.5) * 100, y: steps[index].lane === "top" ? 24 : 76 });
  const payloadFor = (item) => (inScenario && scenario.overrides?.[item.id]) || item.payload;

  useEffect(() => {
    const element = panel.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setPlaying(true);
      },
      { threshold: 0.6 },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Auto-advance waits while the pointer rests on the card being read.
  useEffect(() => {
    if (!playing || reading) return undefined;
    const timer = setTimeout(() => {
      if (step >= last) {
        setPlaying(false);
      } else {
        setBackwards(false);
        setStep(step + 1);
      }
    }, STEP_MS);

    return () => clearTimeout(timer);
  }, [playing, reading, step, last]);

  const goTo = (index) => {
    if (index < 0 || index > last) return;
    setPlaying(false);
    setBackwards(index < step);
    setStep(index);
  };

  const togglePlay = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (step >= last) {
      setBackwards(true);
      setStep(0);
    }
    setPlaying(true);
  };

  const chooseScenario = (index) => {
    const next = scenarios[index === chosen ? -1 : index];
    const nextSteps = next?.steps ?? figure.steps;
    const focus = next ? nextSteps.findIndex((item) => item.id === next.focus) : 0;
    setChosen(next ? index : -1);
    setPlaying(false);
    setBackwards(false);
    // Land on the step that shows what the scenario changes.
    setStep(Math.max(focus, 0));
  };

  let playLabel = FLOW_CONTROLS.play;
  if (playing) playLabel = FLOW_CONTROLS.pause;
  else if (step >= last) playLabel = FLOW_CONTROLS.replay;

  return (
    <div className="panel flowfig" ref={panel}>
      <h5>{scenario?.title ?? figure.title}</h5>
      <p className="how">{scenario?.how ?? figure.how}</p>

      <p className="lane">{lanes.top}</p>
      <div className="rail">
        <svg viewBox={`0 0 ${steps.length * 100} 100`} preserveAspectRatio="none" aria-hidden="true">
          {steps.slice(1).map((target, index) => {
            const from = point(index);
            const to = point(index + 1);
            let state;
            if (index >= last) state = "cut";
            else if (index < step) state = "done";
            return <line key={target.id} className={state} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />;
          })}
        </svg>
        <ol>
          {steps.map((station, index) => {
            const classes = [`tone-${station.tone}`];
            if (index <= step) classes.push("reached");
            if (index > last) classes.push("cut");
            return (
              <li
                key={station.id}
                className={classes.join(" ")}
                style={position(index)}
                aria-current={index === step ? "step" : undefined}
                onClick={() => goTo(index)}
              >
                <span aria-hidden="true">{index + 1}</span>
                <span className="sr-only">{station.name}</span>
              </li>
            );
          })}
        </ol>
        <i className="marker" style={position(Math.min(step, steps.length - 1))} aria-hidden="true" />
      </div>
      <p className="lane">{lanes.bottom}</p>

      {/* Every card is laid out in one cell so the panel keeps the height of
          the tallest and nothing below it moves between steps. */}
      <div
        className="flow-stage"
        onPointerEnter={(event) => event.pointerType === "mouse" && setReading(true)}
        onPointerLeave={() => setReading(false)}
      >
        {steps.map((card, index) => {
          const classes = ["flow-card"];
          if (index === step) classes.push(backwards ? "on back" : "on");
          return (
            <div key={card.id} className={classes.join(" ")} aria-hidden={index !== step}>
              <p className="where">
                <span className={`actor tone-${card.tone}`}>{card.actor}</span>
                Step {index + 1} of {steps.length}
              </p>
              <p className="what">{card.name}</p>
              <p className="why">{card.text}</p>
              <Payload payload={payloadFor(card)} />
            </div>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {playing ? "" : `Step ${step + 1} of ${steps.length}: ${current.name}`}
      </p>

      {/* Back and Next come first and stay focusable at the ends, so nothing
          moves or drops out from under the reader while the flow plays. */}
      <div className="flow-controls">
        <button className="tog" type="button" aria-disabled={step === 0} onClick={() => goTo(step - 1)}>
          {FLOW_CONTROLS.back}
        </button>
        <button className="tog" type="button" aria-disabled={step >= last} onClick={() => goTo(step + 1)}>
          {FLOW_CONTROLS.next}
        </button>
        <button className="tog play" type="button" onClick={togglePlay}>
          {playLabel}
        </button>
        {scenarios.map((option, index) => (
          <button
            key={option.label}
            className="tog scenario"
            type="button"
            aria-pressed={index === chosen}
            onClick={() => chooseScenario(index)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}

FlowFigure.propTypes = {
  figure: PropTypes.shape({
    title: PropTypes.string.isRequired,
    how: PropTypes.string.isRequired,
    lanes: PropTypes.object.isRequired,
    steps: PropTypes.array.isRequired,
    scenarios: PropTypes.array,
  }).isRequired,
};
