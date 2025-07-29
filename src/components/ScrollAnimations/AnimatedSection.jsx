import { motion } from 'framer-motion';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

// Pre-defined animation variants
export const ANIMATION_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  staggerItem: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' }
    }
  },
  slideInScale: {
    hidden: { opacity: 0, scale: 0.9, y: 40 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: 'easeOut',
        scale: { duration: 0.6 }
      }
    }
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -10, scale: 0.9 },
    visible: { 
      opacity: 1, 
      rotate: 0, 
      scale: 1,
      transition: { duration: 0.8, ease: 'easeOut' }
    }
  }
};

// Main animated section component
export default function AnimatedSection({
  children,
  variant = 'fadeInUp',
  delay = 0,
  className = '',
  threshold = 0.1,
  triggerOnce = true,
  customVariants = null,
  ...props
}) {
  const [ref, isVisible] = useScrollAnimation({
    threshold,
    delay,
    triggerOnce
  });

  const animationVariants = customVariants || ANIMATION_VARIANTS[variant];

  return (
    <motion.div
      ref={ref}
      variants={animationVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Specialized components for common use cases
export const AnimatedCard = ({ children, index = 0, className = '', ...props }) => (
  <AnimatedSection
    variant="slideInScale"
    delay={index * 100}
    className={`transform-gpu ${className}`}
    {...props}
  >
    {children}
  </AnimatedSection>
);

export const AnimatedText = ({ children, className = '', ...props }) => (
  <AnimatedSection
    variant="fadeInUp"
    className={`transform-gpu ${className}`}
    {...props}
  >
    {children}
  </AnimatedSection>
);

export const AnimatedGrid = ({ children, className = '', ...props }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      variants={ANIMATION_VARIANTS.staggerContainer}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className={`transform-gpu ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedGridItem = ({ children, className = '', ...props }) => (
  <motion.div
    variants={ANIMATION_VARIANTS.staggerItem}
    className={`transform-gpu ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);