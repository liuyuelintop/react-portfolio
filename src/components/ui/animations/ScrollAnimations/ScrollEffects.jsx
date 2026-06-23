import { motion } from 'framer-motion';
import { useTheme } from '../../../../contexts/ThemeContext';
import { useScrollProgress } from '../../../../hooks/useScrollAnimation';

export const ScrollProgressBar = () => {
  const scrollProgress = useScrollProgress();
  const { currentTheme } = useTheme();

  const gradientClass = {
    neon: 'from-cyan-400 to-pink-500',
    minimal: 'from-gray-600 to-gray-800',
    corporate: 'from-blue-500 to-blue-700',
    default: 'from-purple-500 to-blue-500',
  }[currentTheme] || 'from-purple-500 to-blue-500';

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 h-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: scrollProgress > 5 ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className={`h-full bg-gradient-to-r ${gradientClass}`}
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1, ease: 'easeOut' }}
      />
      <motion.div
        className={`absolute top-0 h-full bg-gradient-to-r ${gradientClass} blur-sm opacity-50`}
        style={{ width: `${scrollProgress}%` }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
};
