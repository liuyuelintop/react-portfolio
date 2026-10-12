import { useEffect, useRef, useState } from 'react';

// A figure performs once, the first time it is mostly in view. `armed` turns on
// after hydration when motion is allowed, so the figure can hold its opening
// pose; `seen` turns on when it comes into view. Under reduced motion neither
// does, and the figure stays in its finished, static state. `onSight` runs once,
// at the moment the figure is first seen.
export function useFirstSight(threshold = 0.6, onSight = undefined) {
  const ref = useRef(null);
  const sight = useRef(onSight);
  const [armed, setArmed] = useState(false);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    sight.current = onSight;
  });

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    setArmed(true);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        setSeen(true);
        sight.current?.();
      },
      { threshold },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, armed, seen };
}
