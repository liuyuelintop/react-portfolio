import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { useToast } from './Toast';

export default function ThemeSwitcherButton({ 
  isMobile = false, 
  className = '',
  buttonSize = 'w-10 h-10',
  layoutId = 'activeTheme'
}) {
  const { currentTheme, themes, switchTheme, isTransitioning } = useTheme();
  const { toast } = useToast();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef(null);
  const themeButtonRef = useRef(null);

  const currentThemeData = themes[currentTheme];

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutsideThemeMenu = themeMenuRef.current && !themeMenuRef.current.contains(event.target);
      const isOutsideThemeButton = themeButtonRef.current && !themeButtonRef.current.contains(event.target);
      
      if (isThemeMenuOpen && isOutsideThemeMenu && isOutsideThemeButton) {
        setIsThemeMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isThemeMenuOpen]);

  const toggleThemeMenu = () => setIsThemeMenuOpen(prev => !prev);

  return (
    <div className={`relative ${className}`}>
      <motion.button
        ref={themeButtonRef}
        onClick={toggleThemeMenu}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative ${buttonSize} rounded-full backdrop-blur-md border shadow-lg
          transition-all duration-300 overflow-hidden group
          ${currentTheme === 'minimal'
            ? 'bg-white/90 border-gray-200 text-gray-700'
            : 'bg-neutral-900/90 border-neutral-700/50 text-white'
          }
          ${isTransitioning ? 'animate-pulse' : ''}
          ${isMobile ? '' : 'mr-2'}
        `}
        title={`Current theme: ${currentThemeData.name}`}
      >
        {/* Background glow effect */}
        <div className={`
          absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
          ${currentTheme === 'neon'
            ? 'bg-gradient-to-r from-cyan-400/20 to-pink-500/20'
            : currentTheme === 'minimal'
              ? 'bg-gradient-to-r from-gray-400/20 to-gray-600/20'
              : 'bg-gradient-to-r from-purple-500/20 to-blue-500/20'
          }
        `} />

        {/* Theme icon */}
        <span className="relative z-10 text-lg">
          {currentThemeData.icon}
        </span>

        {/* Indicator dot */}
        <div className={`
          absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2
          ${currentTheme === 'minimal' ? 'border-white' : 'border-neutral-900'}
          ${currentTheme === 'neon'
            ? 'bg-cyan-400'
            : currentTheme === 'minimal'
              ? 'bg-gray-600'
              : currentTheme === 'corporate'
                ? 'bg-blue-600'
                : 'bg-purple-500'
          }
        `} />
      </motion.button>

      {/* Theme Options Dropdown */}
      <AnimatePresence>
        {isThemeMenuOpen && (
          <motion.div
            ref={themeMenuRef}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={`
              absolute top-14 right-0 min-w-48 rounded-xl backdrop-blur-xl border shadow-2xl overflow-hidden z-50
              ${currentTheme === 'minimal'
                ? 'bg-white/95 border-gray-200'
                : 'bg-neutral-900/95 border-neutral-700/50'
              }
            `}
          >
            {/* Header */}
            <div className={`
              px-4 py-3 border-b
              ${currentTheme === 'minimal'
                ? 'border-gray-200 text-gray-700'
                : 'border-neutral-700/50 text-white'
              }
            `}>
              <h3 className="font-semibold text-sm">Choose Theme</h3>
            </div>

            {/* Theme Options */}
            <div className="p-2 space-y-1">
              {Object.entries(themes).map(([key, theme]) => (
                <motion.button
                  key={key}
                  onClick={() => {
                    const previousTheme = currentTheme;
                    switchTheme(key);
                    setIsThemeMenuOpen(false);
                    
                    // Show toast notification
                    if (key !== previousTheme) {
                      toast.success(`Switched to ${themes[key].name} theme`, {
                        duration: 2000
                      });
                    }
                  }}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left
                    transition-all duration-200 group
                    ${key === currentTheme
                      ? currentTheme === 'minimal'
                        ? 'bg-gray-100 text-gray-900'
                        : 'bg-neutral-800 text-white'
                      : currentTheme === 'minimal'
                        ? 'hover:bg-gray-50 text-gray-700'
                        : 'hover:bg-neutral-800/50 text-neutral-300'
                    }
                  `}
                >
                  {/* Theme icon */}
                  <span className="text-lg">{theme.icon}</span>

                  {/* Theme info */}
                  <div className="flex-1">
                    <div className="font-medium text-sm">{theme.name}</div>
                    <div className={`
                      text-xs opacity-75
                      ${currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-400'}
                    `}>
                      {key === 'default' && 'Purple & Blue gradient'}
                      {key === 'neon' && 'Cyberpunk vibes'}
                      {key === 'minimal' && 'Clean & professional'}
                      {key === 'corporate' && 'Business ready'}
                    </div>
                  </div>

                  {/* Active indicator */}
                  {key === currentTheme && (
                    <motion.div
                      layoutId={layoutId}
                      className={`
                        w-2 h-2 rounded-full
                        ${currentTheme === 'neon'
                          ? 'bg-cyan-400'
                          : currentTheme === 'minimal'
                            ? 'bg-gray-600'
                            : currentTheme === 'corporate'
                              ? 'bg-blue-600'
                              : 'bg-purple-500'
                        }
                      `}
                      transition={{
                        type: 'spring',
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Footer tip */}
            <div className={`
              px-4 py-3 border-t text-xs
              ${currentTheme === 'minimal'
                ? 'border-gray-200 text-gray-500'
                : 'border-neutral-700/50 text-neutral-400'
              }
            `}>
              💡 Theme saved locally
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}