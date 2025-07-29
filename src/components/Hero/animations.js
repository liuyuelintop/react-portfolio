// Animation variants for Hero section components
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { 
      staggerChildren: 0.15, 
      delayChildren: 0.3,
      duration: 0.8
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 15,
      duration: 0.6
    },
  },
};

export const titleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20,
      duration: 0.8
    },
  },
};

export const floatingShapeVariants = {
  animate: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    rotate: [0, 360],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut",
      times: [0, 0.5, 1],
    },
  },
};

// Optimized variants for reduced motion preferences
export const floatingShapeVariantsReduced = {
  animate: {
    opacity: [0.3, 0.6, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const cursorGlowVariants = {
  blink: {
    opacity: [1, 0, 1],
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};