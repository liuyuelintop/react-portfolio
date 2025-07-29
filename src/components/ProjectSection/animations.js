// Animation variants for Project cards and interactions
export const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    rotateX: -15,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.6,
    },
  },
};

export const card3DVariants = {
  rest: {
    rotateY: 0,
    z: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  hover: {
    rotateY: 5,
    z: 50,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
  flip: {
    rotateY: 180,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

export const cardImageVariants = {
  rest: {
    scale: 1,
    filter: "brightness(1)",
  },
  hover: {
    scale: 1.05,
    filter: "brightness(1.1)",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export const techTagVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    y: 10,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 150,
      damping: 15,
    },
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
};