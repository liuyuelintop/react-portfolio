import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { getCompleteHeadingClasses } from '../../../utils/typography';

const SectionHeading = ({ 
  children, 
  level = 'section',
  className = '',
  as: Component = 'h2',
  animate = true,
  ...props 
}) => {
  const { currentTheme } = useTheme();
  const headingClasses = getCompleteHeadingClasses(level, currentTheme);
  const combinedClasses = `${headingClasses} ${className}`.trim();

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  if (animate) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={headingVariants}
      >
        <Component className={combinedClasses} {...props}>
          {children}
        </Component>
      </motion.div>
    );
  }

  return (
    <Component className={combinedClasses} {...props}>
      {children}
    </Component>
  );
};

export default SectionHeading;