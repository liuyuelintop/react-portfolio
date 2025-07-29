import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import ReferenceCard from "./ReferenceCard";
import { REFERENCES } from "../../constants/references";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTheme } from "../../contexts/ThemeContext";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
    transitionEnd: { position: "relative" },
  },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
};

export default function ReferenceSection() {
  const { currentTheme } = useTheme();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const paginate = (newDirection) => {
    if (isAnimating) return; // 🔒 阻止快速点击
    setDirection(newDirection);
    setIndex((prev) => (prev + newDirection + REFERENCES.length) % REFERENCES.length);
    setIsAnimating(true);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => paginate(1),
    onSwipedRight: () => paginate(-1),
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
    delta: 50,
    touchEventOptions: { passive: false },
  });

  return (
    <section className="py-12 px-6 max-w-4xl mx-auto flex flex-col items-center">
      <div className="text-center mb-16">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 tracking-tight bg-gradient-to-r bg-clip-text text-transparent ${
          currentTheme === 'minimal' 
            ? 'from-gray-800 via-gray-700 to-gray-600' 
            : 'from-purple-400 via-indigo-400 to-blue-400'
        }`}>
          Professional References
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${
          currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
        }`}>
          Testimonials from colleagues and supervisors who have worked with me directly.
        </p>
      </div>

      <div
        {...(isMobile ? handlers : {})}
        className="relative w-full flex items-center justify-center"
        style={{ minHeight: 400 }}
      >
        <motion.button
          aria-label="Previous reference"
          onClick={() => paginate(-1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`hidden md:flex absolute left-[-3rem] top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 shadow-lg ${
            currentTheme === 'minimal'
              ? 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-gray-200/50'
              : 'bg-neutral-800/80 hover:bg-purple-700/80 text-white border border-neutral-600 shadow-black/20'
          }`}
        >
          <FiChevronLeft size={24} />
        </motion.button>

        <AnimatePresence
          custom={direction}
          initial={false}
          onExitComplete={() => setIsAnimating(false)} // ✅ 解锁动画状态
        >
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 400, damping: 40 },
              opacity: { duration: 0.2 },
            }}
            className="w-full flex justify-center"
          >
            <ReferenceCard {...REFERENCES[index]} />
          </motion.div>
        </AnimatePresence>

        <motion.button
          aria-label="Next reference"
          onClick={() => paginate(1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`hidden md:flex absolute right-[-3rem] top-1/2 -translate-y-1/2 z-10 p-3 rounded-full transition-all duration-300 shadow-lg ${
            currentTheme === 'minimal'
              ? 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-gray-200/50'
              : 'bg-neutral-800/80 hover:bg-purple-700/80 text-white border border-neutral-600 shadow-black/20'
          }`}
        >
          <FiChevronRight size={24} />
        </motion.button>
      </div>

      <div className="flex items-center gap-3 mt-8">
        {REFERENCES.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              if (isAnimating || i === index) return;
              setDirection(i > index ? 1 : -1);
              setIndex(i);
              setIsAnimating(true);
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            className={`relative h-3 w-3 rounded-full transition-all duration-300 ${
              i === index 
                ? (currentTheme === 'minimal' ? 'bg-gray-700' : 'bg-purple-400')
                : (currentTheme === 'minimal' ? 'bg-gray-300 hover:bg-gray-400' : 'bg-neutral-600 hover:bg-neutral-500')
            }`}
            aria-label={`Go to reference ${i + 1}`}
          >
            {i === index && (
              <motion.div
                layoutId="activeIndicator"
                className={`absolute inset-0 rounded-full ${
                  currentTheme === 'minimal' ? 'bg-gray-700' : 'bg-purple-400'
                }`}
                style={{ scale: 1.5, opacity: 0.3 }}
              />
            )}
          </motion.button>
        ))}
        
        {/* Progress text */}
        <span className={`ml-4 text-sm font-medium ${
          currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-400'
        }`}>
          {index + 1} of {REFERENCES.length}
        </span>
      </div>
    </section>
  );
}
