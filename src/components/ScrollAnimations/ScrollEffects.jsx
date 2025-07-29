import { motion } from 'framer-motion';
import { useScrollProgress, useParallax } from '../../hooks/useScrollAnimation';
import { useTheme } from '../../contexts/ThemeContext';

// Global scroll progress indicator
export const ScrollProgressBar = () => {
  const scrollProgress = useScrollProgress();
  const theme = useTheme();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: scrollProgress > 5 ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`h-full bg-gradient-to-r ${
          theme.currentTheme === 'neon'
            ? 'from-cyan-400 to-pink-500'
            : theme.currentTheme === 'minimal'
            ? 'from-gray-600 to-gray-800'  
            : theme.currentTheme === 'corporate'
            ? 'from-blue-500 to-blue-700'
            : 'from-purple-500 to-blue-500'
        }`}
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      />
      
      {/* Glow effect */}
      <motion.div
        className={`absolute top-0 h-full bg-gradient-to-r ${
          theme.currentTheme === 'neon'
            ? 'from-cyan-400/50 to-pink-500/50'
            : theme.currentTheme === 'minimal'
            ? 'from-gray-600/50 to-gray-800/50'
            : theme.currentTheme === 'corporate'
            ? 'from-blue-500/50 to-blue-700/50'
            : 'from-purple-500/50 to-blue-500/50'
        } blur-sm`}
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
};

// Parallax background elements
export const ParallaxBackground = () => {
  const slowParallax = useParallax(0.2);
  const mediumParallax = useParallax(0.4);
  const fastParallax = useParallax(0.6);
  const theme = useTheme();

  const getGradientColors = () => {
    switch (theme.currentTheme) {
      case 'neon':
        return {
          slow: 'from-cyan-500/10 to-pink-500/10',
          medium: 'from-purple-500/5 to-cyan-500/5',
          fast: 'from-pink-500/5 to-purple-500/5'
        };
      case 'minimal':
        return {
          slow: 'from-gray-400/5 to-gray-600/5',
          medium: 'from-gray-300/3 to-gray-500/3',
          fast: 'from-gray-500/3 to-gray-700/3'
        };
      case 'corporate':
        return {
          slow: 'from-blue-500/10 to-indigo-500/10',
          medium: 'from-blue-400/5 to-blue-600/5',
          fast: 'from-indigo-500/5 to-blue-500/5'
        };
      default:
        return {
          slow: 'from-purple-500/10 to-blue-500/10',
          medium: 'from-blue-500/5 to-purple-500/5',
          fast: 'from-purple-400/5 to-blue-400/5'
        };
    }
  };

  const colors = getGradientColors();

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Slow moving background shapes */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${colors.slow}`}
        style={{ transform: `translateY(${slowParallax}px)` }}
      >
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-30" />
      </motion.div>

      {/* Medium speed elements */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-tl ${colors.medium}`}
        style={{ transform: `translateY(${mediumParallax}px)` }}
      >
        <div className="absolute top-2/3 right-1/3 w-80 h-80 rounded-full blur-2xl opacity-20" />
      </motion.div>

      {/* Fast moving accents */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${colors.fast}`}
        style={{ transform: `translateY(${fastParallax}px)` }}
      >
        <div className="absolute top-1/2 left-2/3 w-64 h-64 rounded-full blur-xl opacity-15" />
      </motion.div>

      {/* Floating geometric shapes */}
      <motion.div
        style={{ transform: `translateY(${slowParallax * 0.5}px)` }}
        className="absolute top-1/3 right-1/4 opacity-5"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className={`w-32 h-32 border ${
            theme.currentTheme === 'minimal' ? 'border-gray-300' : 'border-purple-500/20'
          } rotate-45`}
        />
      </motion.div>

      <motion.div
        style={{ transform: `translateY(${mediumParallax * 0.3}px)` }}
        className="absolute bottom-1/4 left-1/5 opacity-5"
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`w-24 h-24 rounded-full border ${
            theme.currentTheme === 'minimal' ? 'border-gray-300' : 'border-blue-500/20'
          }`}
        />
      </motion.div>
    </div>
  );
};

// Animated reveal on scroll for text content
export const TextReveal = ({ children, className = '', delay = 0 }) => {
  const [ref, isVisible] = useScrollAnimation({ delay });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '100%' }}
        animate={isVisible ? { y: '0%' } : { y: '100%' }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Staggered list animations
export const StaggeredList = ({ children, className = '', itemDelay = 0.1 }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: itemDelay
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredListItem = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, x: -30 },
      visible: { 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.6, ease: 'easeOut' }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

// Number counter animation
export const AnimatedCounter = ({ 
  from = 0, 
  to, 
  duration = 2, 
  suffix = '', 
  className = '' 
}) => {
  const [ref, isVisible] = useScrollAnimation({ triggerOnce: true });

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
    >
      {isVisible ? `${to}${suffix}` : `${from}${suffix}`}
    </motion.span>
  );
};