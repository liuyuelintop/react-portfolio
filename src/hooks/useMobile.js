import { useState, useEffect } from 'react';

/**
 * Custom hook to detect mobile viewport
 * @param {number} breakpoint - The breakpoint width to consider mobile (default: 768px)
 * @returns {boolean} isMobile - True if viewport width is below breakpoint
 */
export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    // Handle SSR case
    if (typeof window === 'undefined') return false;
    return window.innerWidth < breakpoint;
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Set initial value
    checkMobile();

    // Add event listener
    window.addEventListener('resize', checkMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

export default useMobile;