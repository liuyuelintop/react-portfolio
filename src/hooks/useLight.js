import { useSyncExternalStore } from 'react';

// Day is the default. The choice lives on <html data-light>, where an inline
// script in app/layout.jsx restores it before first paint, so this hook reads
// the attribute rather than owning the state.
const STORAGE_KEY = 'portfolio-light';
const CHANGE_EVENT = 'portfolio:light';

const subscribe = (onChange) => {
  window.addEventListener(CHANGE_EVENT, onChange);
  return () => window.removeEventListener(CHANGE_EVENT, onChange);
};

const getSnapshot = () => (document.documentElement.dataset.light === 'night' ? 'night' : 'day');
const getServerSnapshot = () => 'day';

export function useLight() {
  const light = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next = light === 'night' ? 'day' : 'night';
    document.documentElement.dataset.light = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be unavailable (private mode); the light still changes.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));
  };

  return { light, toggle };
}

export default useLight;
