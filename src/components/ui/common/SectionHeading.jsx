import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
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

SectionHeading.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf(['hero', 'section', 'subsection', 'card']),
  className: PropTypes.string,
  as: PropTypes.elementType,
  animate: PropTypes.bool,
};

export default SectionHeading;
