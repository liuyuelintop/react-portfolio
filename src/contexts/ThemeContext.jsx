import { createContext, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

const DEFAULT_THEME_NAME = 'default';

export const DEFAULT_THEME = {
  name: 'Default',
  primary: 'from-white to-neutral-200',
  secondary: 'from-cyan-300 to-blue-200',
  accent: 'cyan-300',
  background: 'neutral-950',
  surface: 'neutral-900',
  text: 'neutral-300',
  textBright: 'white',
  border: 'neutral-800',
  glow: 'cyan-300/10',
  shadow: 'rgba(0, 0, 0, 0.3)',
};

export function ThemeProvider({ children }) {
  useEffect(() => {
    const root = document.documentElement;

    Object.entries(DEFAULT_THEME).forEach(([key, value]) => {
      if (key !== 'name') {
        root.style.setProperty(`--theme-${key}`, value);
      }
    });

    document.body.className = `theme-${DEFAULT_THEME_NAME}`;
  }, []);

  const value = {
    currentTheme: DEFAULT_THEME_NAME,
    theme: DEFAULT_THEME,
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

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
