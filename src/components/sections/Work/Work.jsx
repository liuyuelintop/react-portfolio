import PropTypes from "prop-types";
import Link from "next/link";
import { AT_A_GLANCE, TOOLBOX } from "../../../constants/constants";
import { WORK, WORK_FIGURES } from "../../../constants/work";
import Phone from "../../ui/common/Phone";
import TraceFigure from "./figures/TraceFigure";

const externalProps = { target: "_blank", rel: "noopener noreferrer" };
const ACTORS = { you: "You", code: "Code", model: "Model", chat: "Chat" };
const seconds = (value) => `${value.toFixed(1)}s`;

// Each card carries one small picture of its own kind, so the four pieces can
// be told apart before a word is read. None of them is interactive: the full
// figures live with the full accounts.
function Teaser({ item }) {
  if (item.teaser === "screens") {
    return (
      <div className="tz-screens">
        {item.screens.map((screen) => (
          <Phone key={screen.src} src={screen.src} alt={screen.alt} />
        ))}
      </div>
    );
  }

  if (item.teaser === "scale") {
    const { totals } = WORK_FIGURES.latency;
    return (
      <div className="tz-scale">
        {[
          ["before", item.scale.before, totals.before],
          ["after", item.scale.after, totals.after],
        ].map(([key, label, value]) => (
          <p key={key} className={key}>
            <span>{label}</span>
            <i style={{ "--share": value / totals.before }} />
            <b>{seconds(value)}</b>
          </p>
        ))}
      </div>
    );
  }

  if (item.teaser === "edits") {
    const lines = WORK_FIGURES.marshal.comparisons[0].lines;
    return (
      <ul className="tz-edits">
        {item.edits.map((id) => {
          const line = lines.find((entry) => entry.id === id);
          return (
            <li key={id} className={line.change}>
              <span className="mark" aria-hidden="true">{line.change === "del" ? "−" : "+"}</span>
              <span className="txt">{line.name}</span>
              <span className={`actor a-${line.actor}`}>{ACTORS[line.actor]}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  const lines = WORK_FIGURES.timecard.lines;
  return (
    <ul className="tz-receipt">
      {item.receipt.map((id) => {
        const line = lines.find((entry) => entry.id === id);
        const actor = line.trace[0].actor;
        return (
          <li key={id}>
            <span className="k">{line.label}</span>
            {line.prose ? (
              <span className="stream" aria-label={WORK_FIGURES.timecard.proseLabel}>
                <i />
                <i />
              </span>
            ) : (
              <span className="v">{line.value}</span>
            )}
            <span className={`actor a-${actor}`}>{ACTORS[actor]}</span>
          </li>
        );
      })}
    </ul>
  );
}

Teaser.propTypes = {
  item: PropTypes.object.isRequired,
};

// One piece of work, as much as a reader needs to decide whether to open it.
// The main link is stretched over the whole card, so the card is one target.
function Card({ item }) {
  const { link } = item;
  const linkProps = { className: "go", href: link.href };

  return (
    <li className={item.lead ? "card lead" : "card"} id={`work-${item.id}`}>
      <p className="card-top">
        <span className="eyebrow">{item.kind}</span>
        <span className="context">{item.context}</span>
      </p>
      <div className="card-head">
        <h3>{item.name}</h3>
        {item.line && <p className="line">{item.line}</p>}
        {item.headline && <p className="decision">{item.headline}</p>}
      </div>
      <div className="card-body">
        {item.summary && <p className="summary">{item.summary}</p>}
        {item.decision && <p className="summary">{item.decision}</p>}
        {item.status && (
          <p className="status">
            <i aria-hidden="true" />
            {item.status}
          </p>
        )}
        <p className="card-links">
          {link.href.startsWith("#") ? <a {...linkProps}>{link.label}</a> : <Link {...linkProps}>{link.label}</Link>}
          {item.source && (
            <a className="quiet" href={item.source.href} {...externalProps}>
              {item.source.label}
            </a>
          )}
        </p>
      </div>
      <div className="card-art">
        <Teaser item={item} />
        <p className="note">{item.note}</p>
      </div>
    </li>
  );
}

Card.propTypes = {
  item: PropTypes.object.isRequired,
};

// ByteCroniX is employment, so its account stays here in full: the role first,
// then one observation and the method behind it.
function Experience() {
  const role = WORK.experience;
  const [first, ...rest] = role.paragraphs;

  return (
    <section className="chapter" id={role.id} aria-labelledby="experience-title">
      <h3 id="experience-title">{role.label}</h3>
      <article className="story wide">
        <header>
          <p className="kicker">
            <b>{role.name}</b> <span>{role.context}</span>
          </p>
          <h4 className="headline">{role.headline}</h4>
        </header>
        <p className="first">{first}</p>
        <figure className="fig">
          <TraceFigure figure={WORK_FIGURES[role.figure]} />
          <figcaption className="cap">{role.figureCaption}</figcaption>
        </figure>
        <div className="rest">
          {rest.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="aside">{role.stack}</p>
        </div>
      </article>
    </section>
  );
}

function EvidenceRow({ entry }) {
  let title = entry.title;
  if (entry.href) {
    title = entry.external ? (
      <a href={entry.href} {...externalProps}>
        {entry.title}
      </a>
    ) : (
      <Link href={entry.href}>{entry.title}</Link>
    );
  }

  return (
    <li>
      <span className="t">{title}</span>
      <span className="s">{entry.summary}</span>
      <span className="m">
        {entry.meta}
        {entry.source && (
          <>
            {", "}
            <a
              className="quiet"
              href={entry.source}
              aria-label={`${entry.title} source on GitHub`}
              {...externalProps}
            >
              source
            </a>
          </>
        )}
      </span>
    </li>
  );
}

EvidenceRow.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default function Work() {
  return (
    <div className="wrap">
      <header className="work-head">
        <h2 className="sec">{WORK.heading}</h2>
        <p className="standfirst">{WORK.intro}</p>
      </header>

      {/* On a phone the four choices are named before any of them is shown. */}
      <ul className="picks" aria-label={WORK.overviewLabel}>
        {WORK.overview.map(({ id, name, kind }) => (
          <li key={id}>
            <a href={`#work-${id}`}>
              <b>{name}</b>
              <span>{kind}</span>
            </a>
          </li>
        ))}
      </ul>

      <ul className="board">
        {WORK.overview.map((item) => (
          <Card key={item.id} item={item} />
        ))}
      </ul>

      <Experience />

      <section className="evidence" aria-labelledby="evidence-title">
        <h3 id="evidence-title">{WORK.evidenceTitle}</h3>
        <ul className="also">
          {WORK.evidence.map((entry) => (
            <EvidenceRow key={entry.title} entry={entry} />
          ))}
        </ul>
      </section>

      <div className="facts">
        <dl className="glance" aria-label="At a glance">
          {AT_A_GLANCE.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>
                <b>{item.title}</b>
                {item.detail}
              </dd>
            </div>
          ))}
        </dl>
        <dl className="kit" aria-label="Tools">
          {TOOLBOX.map((group) => (
            <div key={group.label}>
              <dt>{group.label}</dt>
              <dd>{group.tools.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
