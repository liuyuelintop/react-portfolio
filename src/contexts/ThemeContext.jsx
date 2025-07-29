import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const THEMES = {
  default: {
    name: 'Default',
    icon: '🌌',
    primary: 'from-purple-500 to-blue-500',
    secondary: 'from-purple-400 to-blue-400',
    accent: 'purple-500',
    background: 'neutral-950',
    surface: 'neutral-800',
    text: 'neutral-300',
    textBright: 'white',
    border: 'neutral-700',
    glow: 'purple-500/20',
    shadow: 'rgba(147, 51, 234, 0.3)',
  },
  neon: {
    name: 'Neon',
    icon: '⚡',
    primary: 'from-cyan-400 to-pink-500',
    secondary: 'from-green-400 to-blue-500',
    accent: 'cyan-400',
    background: 'black',
    surface: 'neutral-900',
    text: 'cyan-300',
    textBright: 'cyan-100',
    border: 'cyan-500/50',
    glow: 'cyan-400/30',
    shadow: 'rgba(0, 255, 255, 0.5)',
  },
  minimal: {
    name: 'Minimal',
    icon: '🤍',
    primary: 'from-gray-600 to-gray-800',
    secondary: 'from-gray-500 to-gray-700',
    accent: 'gray-600',
    background: 'white',
    surface: 'gray-50',
    text: 'gray-700',
    textBright: 'gray-900',
    border: 'gray-200',
    glow: 'gray-400/20',
    shadow: 'rgba(0, 0, 0, 0.1)',
  },
  corporate: {
    name: 'Corporate',
    icon: '💼',
    primary: 'from-blue-600 to-indigo-700',
    secondary: 'from-blue-500 to-indigo-600',
    accent: 'blue-600',
    background: 'slate-50',
    surface: 'white',
    text: 'slate-700',
    textBright: 'slate-900',
    border: 'slate-200',
    glow: 'blue-500/20',
    shadow: 'rgba(59, 130, 246, 0.2)',
  },
};

export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && THEMES[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Apply theme to document root
  useEffect(() => {
    const theme = THEMES[currentTheme];
    const root = document.documentElement;
    
    // Apply CSS custom properties for the theme
    Object.entries(theme).forEach(([key, value]) => {
      if (key !== 'name' && key !== 'icon') {
        root.style.setProperty(`--theme-${key}`, value);
      }
    });

    // Apply theme class to body
    document.body.className = `theme-${currentTheme}`;
  }, [currentTheme]);

  const switchTheme = (themeName) => {
    if (themeName === currentTheme || !THEMES[themeName]) return;
    
    setIsTransitioning(true);
    
    // Smooth transition effect
    setTimeout(() => {
      setCurrentTheme(themeName);
      localStorage.setItem('portfolio-theme', themeName);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 150);
  };

  const getThemeClasses = (element = 'default') => {
    const theme = THEMES[currentTheme];
    
    const classMap = {
      background: `bg-${theme.background}`,
      surface: `bg-${theme.surface}`,
      text: `text-${theme.text}`,
      textBright: `text-${theme.textBright}`,
      border: `border-${theme.border}`,
      primary: `bg-gradient-to-r ${theme.primary}`,
      secondary: `bg-gradient-to-r ${theme.secondary}`,
      accent: `text-${theme.accent}`,
      glow: `shadow-${theme.glow}`,
    };

    return classMap[element] || '';
  };

  const value = {
    currentTheme,
    themes: THEMES,
    switchTheme,
    isTransitioning,
    getThemeClasses,
    theme: THEMES[currentTheme],
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}