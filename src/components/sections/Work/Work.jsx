import PropTypes from "prop-types";
import Link from "next/link";
import { TOOLBOX } from "../../../constants/constants";
import { WORK, WORK_FIGURES } from "../../../constants/work";
import HourMark from "../../ui/common/HourMark";
import ReceiptFigure from "./figures/ReceiptFigure";
import RevisionFigure from "./figures/RevisionFigure";
import TraceFigure from "./figures/TraceFigure";

const externalProps = { target: "_blank", rel: "noopener noreferrer" };

// Each story's figure is its own kind, keyed by the story's `figure`.
const FIGURES = { marshal: RevisionFigure, latency: TraceFigure, timecard: ReceiptFigure };

function LeadStory({ lead, flip }) {
  const Figure = FIGURES[lead.figure];
  const classes = ["story", `fig-${lead.figure}`];
  if (lead.layout === "wide") classes.push("wide");
  else if (flip) classes.push("flip");

  return (
    <article className={classes.join(" ")}>
      <div className="copy">
        <header>
          <p className="kicker">
            <b>{lead.name}</b> <span>{lead.context}</span>
          </p>
          <h4 className="headline">{lead.headline}</h4>
        </header>
        <div className="body">
          {lead.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <p className="aside">{lead.stack}</p>
          {lead.links.length > 0 && (
            <div className="links">
              {lead.links.map((link) =>
                link.external ? (
                  <a key={link.label} className="quiet" href={link.href} {...externalProps}>
                    {link.label}
                  </a>
                ) : (
                  <Link key={link.label} className="quiet" href={link.href}>
                    {link.label}
                  </Link>
                ),
              )}
            </div>
          )}
        </div>
      </div>
      <figure className="fig">
        <Figure figure={WORK_FIGURES[lead.figure]} />
        <figcaption className="cap">{lead.figureCaption}</figcaption>
      </figure>
    </article>
  );
}

LeadStory.propTypes = {
  lead: PropTypes.object.isRequired,
  flip: PropTypes.bool.isRequired,
};

function AlsoRow({ entry }) {
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

AlsoRow.propTypes = {
  entry: PropTypes.object.isRequired,
};

export default function Work() {
  return (
    <div className="wrap">
      <HourMark at="midday">{WORK.hour}</HourMark>
      <h2 className="sr-only">{WORK.heading}</h2>

      {WORK.chapters.map((chapter, index) => (
        <section key={chapter.principle} className="chapter">
          <h3>{chapter.principle}</h3>
          <LeadStory lead={chapter.lead} flip={index % 2 === 1} />
          <ul className="also">
            {chapter.also.map((entry) => (
              <AlsoRow key={entry.title} entry={entry} />
            ))}
          </ul>
        </section>
      ))}

      <dl className="kit" aria-label="Tools">
        {TOOLBOX.map((group) => (
          <div key={group.label}>
            <dt>{group.label}</dt>
            <dd>{group.tools.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
