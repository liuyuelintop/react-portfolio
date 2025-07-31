import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { useToast } from './Toast';

export default function ThemeSwitcher() {
  const { currentTheme, themes, switchTheme, isTransitioning } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const containerVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  };

  const currentThemeData = themes[currentTheme];

  return (
    <div className="fixed top-2 right-20 z-50">
      {/* Theme Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          relative w-12 h-12 rounded-full backdrop-blur-md border shadow-2xl
          transition-all duration-300 overflow-hidden group
          ${currentTheme === 'minimal'
            ? 'bg-white/90 border-gray-200 text-gray-700'
            : 'bg-neutral-900/90 border-neutral-700/50 text-white'
          }
          ${isTransitioning ? 'animate-pulse' : ''}
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
        <span className="relative z-10 text-2xl">
          {currentThemeData.icon}
        </span>

        {/* Indicator dot */}
        <div className={`
          absolute -top-1 -right-1 w-4 h-4 rounded-full border-2
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
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`
              absolute top-16 right-0 min-w-48 rounded-xl backdrop-blur-xl border shadow-2xl overflow-hidden
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
                  variants={itemVariants}
                  onClick={() => {
                    const previousTheme = currentTheme;
                    switchTheme(key);
                    setIsOpen(false);
                    
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
                  <span className="text-xl">{theme.icon}</span>

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
                      layoutId="activeTheme"
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
              💡 Theme preference is saved locally
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 -z-10 bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
    </div>
  );
}