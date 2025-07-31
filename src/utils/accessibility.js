// Accessibility utilities for focus management and theme-aware focus rings

export const focusRingClasses = "focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 rounded-lg transition-all duration-200";

export const getThemeFocusRing = (theme) => {
  const rings = {
    default: "focus-visible:ring-purple-500",
    neon: "focus-visible:ring-cyan-400", 
    minimal: "focus-visible:ring-blue-500",
    corporate: "focus-visible:ring-blue-600"
  };
  
  const offsets = {
    default: "focus-visible:ring-offset-neutral-950",
    neon: "focus-visible:ring-offset-black",
    minimal: "focus-visible:ring-offset-white",
    corporate: "focus-visible:ring-offset-slate-50"
  };
  
  return `focus:outline-none focus-visible:ring-2 ${rings[theme]} focus-visible:ring-offset-2 ${offsets[theme]} rounded-lg transition-all duration-200`;
};

export const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start',
      inline: 'nearest'
    });
    
    // Focus management for screen readers
    const focusable = element.querySelector('h1, h2, h3, [tabindex], button, input, select, textarea, a[href]');
    if (focusable) {
      setTimeout(() => focusable.focus({ preventScroll: true }), 100);
    }
  }
};

export const trapFocus = (element) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];

  const handleTabKey = (e) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    }
  };

  element.addEventListener('keydown', handleTabKey);
  
  // Focus first element
  if (firstElement) {
    firstElement.focus();
  }

  return () => {
    element.removeEventListener('keydown', handleTabKey);
  };
};

export const createSkipLink = () => {
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-purple-600 text-white px-4 py-2 rounded-lg z-50 transition-all duration-200';
  
  skipLink.addEventListener('click', (e) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  });
  
  return skipLink;
};