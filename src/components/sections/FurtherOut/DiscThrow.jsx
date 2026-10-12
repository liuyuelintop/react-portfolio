import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// One throw, once, when golden hour comes into view. Two drawings because the
// arc has to be redrawn for a narrow page rather than scaled.
const FLIGHTS = [
  {
    key: "wide",
    viewBox: "0 0 1200 240",
    mask: { x: 0, y: -40, width: 1200, height: 300 },
    path: "M 30 34 C 330 -46, 780 4, 1096 168",
    end: "translate(1096 168) rotate(27)",
    disc: { rx: 23, ry: 7.6, shade: 3.4 },
    duration: "1.9s",
  },
  {
    key: "narrow",
    viewBox: "0 0 375 150",
    mask: { x: 0, y: -30, width: 375, height: 200 },
    path: "M 14 26 C 110 -22, 250 4, 334 100",
    end: "translate(334 100) rotate(48)",
    disc: { rx: 13, ry: 4.4, shade: 1.6 },
    duration: "1.7s",
  },
];

function Flight({ flight, phase }) {
  const motion = useRef(null);

  useEffect(() => {
    if (phase !== "go") return;
    const svg = motion.current?.ownerSVGElement;
    if (svg && getComputedStyle(svg).display !== "none") motion.current.beginElement?.();
  }, [phase]);

  return (
    <svg
      className={`flight fl-${flight.key}${phase === "idle" ? "" : ` ${phase}`}`}
      viewBox={flight.viewBox}
      aria-hidden="true"
    >
      <defs>
        <mask id={`disc-trail-${flight.key}`} maskUnits="userSpaceOnUse" {...flight.mask}>
          <path className="rv" pathLength="1" d={flight.path} />
        </mask>
      </defs>
      <path className="trail" mask={`url(#disc-trail-${flight.key})`} d={flight.path} />
      <g className="disc" transform={phase === "still" ? flight.end : undefined}>
        <ellipse className="shade" cx="0" cy={flight.disc.shade} rx={flight.disc.rx} ry={flight.disc.ry} />
        <ellipse rx={flight.disc.rx} ry={flight.disc.ry} />
        <animateMotion
          ref={motion}
          dur={flight.duration}
          begin="indefinite"
          fill="freeze"
          rotate="auto"
          calcMode="spline"
          keyTimes="0;1"
          keySplines=".15 .6 .25 1"
          path={flight.path}
        />
      </g>
    </svg>
  );
}

Flight.propTypes = {
  flight: PropTypes.object.isRequired,
  phase: PropTypes.oneOf(["idle", "go", "still"]).isRequired,
};

export default function DiscThrow() {
  const anchor = useRef(null);
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    const section = anchor.current?.parentElement;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        setPhase(still ? "still" : "go");
      },
      { rootMargin: "0px 0px -30% 0px" },
    );
    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={anchor} className="contents">
      {FLIGHTS.map((flight) => (
        <Flight key={flight.key} flight={flight} phase={phase} />
      ))}
    </div>
  );
}
