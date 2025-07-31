// Typography utilities for consistent heading styles across themes

export const getHeadingClasses = (level = 'section', theme = 'default') => {
  const baseClasses = "font-bold bg-clip-text text-transparent";
  
  // Gradient patterns by theme
  const gradients = {
    default: 'bg-gradient-to-r from-purple-400 to-blue-400',
    neon: 'bg-gradient-to-r from-cyan-400 to-purple-400',
    minimal: 'bg-gradient-to-r from-gray-800 to-gray-600',
    corporate: 'bg-gradient-to-r from-blue-600 to-blue-800'
  };

  // Size patterns by hierarchy level
  const sizes = {
    hero: 'text-5xl md:text-7xl',
    section: 'text-3xl md:text-4xl',
    subsection: 'text-2xl md:text-3xl',
    card: 'text-xl md:text-2xl'
  };

  const gradient = gradients[theme] || gradients.default;
  const size = sizes[level] || sizes.section;

  return `${baseClasses} ${size} ${gradient}`;
};

// Predefined heading component classes
export const headingStyles = {
  // Hero section - largest and most prominent
  hero: {
    default: 'text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent',
    neon: 'text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent',
    minimal: 'text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent',
    corporate: 'text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'
  },
  
  // Main section headings - consistent across all sections
  section: {
    default: 'text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent',
    neon: 'text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent',
    minimal: 'text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent',
    corporate: 'text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'
  },

  // Sub-section headings
  subsection: {
    default: 'text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent',
    neon: 'text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent',
    minimal: 'text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent',
    corporate: 'text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'
  },

  // Card/component headings
  card: {
    default: 'text-xl md:text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent',
    neon: 'text-xl md:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent',
    minimal: 'text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent',
    corporate: 'text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent'
  }
};

// Helper function to get spacing classes for consistent margins
export const getHeadingSpacing = (level = 'section') => {
  const spacing = {
    hero: 'mb-6 md:mb-8',
    section: 'mb-6 md:mb-8',
    subsection: 'mb-4 md:mb-6', 
    card: 'mb-3 md:mb-4'
  };
  
  return spacing[level] || spacing.section;
};

// Complete heading utility that combines classes and spacing
export const getCompleteHeadingClasses = (level = 'section', theme = 'default') => {
  const headingClass = headingStyles[level]?.[theme] || headingStyles[level]?.default || headingStyles.section.default;
  const spacingClass = getHeadingSpacing(level);
  
  return `${headingClass} ${spacingClass}`;
};