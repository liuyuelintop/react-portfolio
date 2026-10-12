import PropTypes from "prop-types";
import LampCord from "./LampCord";

// Shared by the homepage and the case-study routes, so it stays free of hooks:
// only the cord is a client component.
export default function Masthead({ homeHref, links }) {
  return (
    <div className="wrap">
      <header className="top">
        <a className="name" href={homeHref}>
          Yuelin Liu
        </a>
        <nav aria-label="Primary">
          {links.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>
      <LampCord />
    </div>
  );
}

Masthead.propTypes = {
  homeHref: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
