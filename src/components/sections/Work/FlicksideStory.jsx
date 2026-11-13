import PropTypes from "prop-types";
import Phone from "../../ui/common/Phone";

const externalProps = { target: "_blank", rel: "noopener noreferrer" };

// The parts of the Flickside case study that the other studies do not have.
// They are plain markup with no hooks, so the case-study route stays a Server
// Component and the page is complete in the exported HTML. Flickside is shown,
// not illustrated: every picture here is the app's own screen.

// Where it came from: the throw, and the phone that says so.
export function Origin({ section }) {
  return (
    <div className="origin">
      <figure>
        <div className="collage">
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized local asset */}
          <img
            className="shot"
            src={section.photo.src}
            alt={section.photo.alt}
            width={section.photo.width}
            height={section.photo.height}
          />
          <Phone src={section.screen.src} alt={section.screen.alt} priority />
        </div>
        <figcaption className="cap">{section.caption}</figcaption>
      </figure>
      <div className="origin-copy">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}

// One throw in four screens.
export function Moments({ section }) {
  return (
    <div className="moments">
      {/* A sideways scroller has to be reachable from the keyboard. */}
      <div className="reel" tabIndex="0" role="region" aria-label={section.label}>
        <ol>
          {section.items.map(({ src, alt, title, text }, index) => (
            <li key={src}>
              <figure>
                <Phone src={src} alt={alt} />
                <figcaption>
                  <span className="n" aria-hidden="true">{index + 1}</span>
                  <b>{title}</b>
                  {text}
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
      <p className="cap">{section.note}</p>
    </div>
  );
}

// A friend's view while the throw is on, and two hours later: the same part of
// the same screen, with the two hours drawn between them.
export function Pair({ section }) {
  return (
    <div className="rule">
      <p className="rule-lede">{section.lede}</p>
      <div className="pair">
        {[section.before, section.after].map((view, index) => (
          <figure key={view.src} className={index === 0 ? "view before" : "view after"}>
            <div className="frame">
              <div className="crop">
                {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized local asset */}
                <img src={view.src} alt={view.alt} width="860" height="1864" loading="lazy" />
              </div>
              {index === 1 && (
                <p className="lapse" aria-hidden="true">
                  <i />
                  <span>{section.span}</span>
                </p>
              )}
            </div>
            <figcaption>
              <span className="when">{view.when}</span>
              <b>{view.reads}</b>
              {view.what}
            </figcaption>
          </figure>
        ))}
      </div>
      <dl className="points">
        {section.points.map(({ head, text }) => (
          <div key={head}>
            <dt>{head}</dt>
            <dd>{text}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

// The public website, and the demo a visitor can try.
export function Site({ section }) {
  const { image } = section;
  return (
    <div className="site">
      <div className="site-copy">
        <p>{section.line}</p>
        <div className="links">
          {section.links.map(({ label, href }, index) => (
            <a key={href} className={index === 0 ? "btn" : "quiet"} href={href} {...externalProps}>
              {label}
            </a>
          ))}
        </div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, pre-sized local asset */}
      <img className="site-shot" src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
    </div>
  );
}

const sectionProp = { section: PropTypes.object.isRequired };
Origin.propTypes = sectionProp;
Moments.propTypes = sectionProp;
Pair.propTypes = sectionProp;
Site.propTypes = sectionProp;
