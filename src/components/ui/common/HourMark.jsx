import PropTypes from "prop-types";

// Where the sun is: the page's only section marker.
const SUN = {
  morning: <circle className="sun" cx="11.3" cy="9.3" r="3.4" />,
  midday: <circle className="sun" cx="24" cy="4" r="3.4" />,
  golden: <circle className="sun" cx="39.6" cy="13" r="3.4" />,
  late: <circle className="moon" cx="24" cy="9" r="4" />,
};

export default function HourMark({ at, children }) {
  return (
    <p className="hour">
      <svg viewBox="0 0 48 26" aria-hidden="true">
        {at !== "late" && <path className="arc" d="M6 22A18 18 0 0 1 42 22" />}
        <line className="hz" x1="2" y1="22" x2="46" y2="22" />
        {SUN[at]}
      </svg>
      {children}
    </p>
  );
}

HourMark.propTypes = {
  at: PropTypes.oneOf(["morning", "midday", "golden", "late"]).isRequired,
  children: PropTypes.node.isRequired,
};
