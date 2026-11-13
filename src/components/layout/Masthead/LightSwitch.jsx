"use client";

import { useLight } from "../../../hooks/useLight";

// The site's only light switch: day by default, night on a press.
export default function LightSwitch() {
  const { light, toggle } = useLight();
  const night = light === "night";

  return (
    <button type="button" className="light" aria-label="Night mode" aria-pressed={night} onClick={toggle}>
      {/* Half lit: the lit half swaps sides with the light. */}
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle className="rim" cx="12" cy="12" r="8" />
        <path className="lit" d="M12 4a8 8 0 0 1 0 16z" />
      </svg>
    </button>
  );
}
