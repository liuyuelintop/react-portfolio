import PropTypes from "prop-types";
import LightSwitch from "./LightSwitch";

// Shared by the homepage and the case-study routes, so it stays free of hooks:
// only the light switch is a client component. On a phone the links sit in a
// bar at the bottom of the screen, within reach of a thumb.
export default function Masthead({ homeHref, links }) {
  return (
    <header className="top">
      <div className="wrap">
        <a className="name" href={homeHref}>
          Yuelin Liu <span>Software engineer, Melbourne</span>
        </a>
        <nav aria-label="Primary">
          {links.map((link) => (
            <a key={link.label} href={link.href} download={link.download}>
              {link.label}
            </a>
          ))}
        </nav>
        <LightSwitch />
      </div>
    </header>
  );
}

Masthead.propTypes = {
  homeHref: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      download: PropTypes.string,
    }),
  ).isRequired,
};
