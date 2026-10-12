"use client";

import { useState } from "react";
import { useLight } from "../../../hooks/useLight";

// The pull cord is the site's only light switch: day by default, night on a pull.
export default function LampCord() {
  const { light, toggle } = useLight();
  const [tugging, setTugging] = useState(false);
  const night = light === "night";

  return (
    <button
      type="button"
      className={tugging ? "cord tug" : "cord"}
      aria-label="Lamp"
      aria-pressed={night}
      onClick={() => {
        toggle();
        setTugging(true);
      }}
      onAnimationEnd={() => setTugging(false)}
    >
      <span aria-hidden="true">{night ? "Lamp on" : "Lamp off"}</span>
    </button>
  );
}
