import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReferenceCard from "./ui/ReferenceCard";
import { REFERENCES } from "../constants/references";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
  center: { x: 0, opacity: 1, position: "relative" },
  exit: (direction) => ({
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
};

export default function ReferenceSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setIndex((prev) =>
      (prev + newDirection + REFERENCES.length) % REFERENCES.length
    );
  };

  return (
    <section className="py-20 px-6 max-w-2xl mx-auto flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12 tracking-tight">
        What Others Say
      </h2>
      <div className="relative w-full flex items-center justify-center" style={{ minHeight: 340 }}>
        <button
          aria-label="Previous"
          onClick={() => paginate(-1)}
          className="absolute left-0 z-10 p-2 rounded-full bg-neutral-800/70 hover:bg-purple-700/80 text-white transition"
        >
          <FiChevronLeft size={28} />
        </button>
        <AnimatePresence custom={direction} initial={false}>
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
        <button
          aria-label="Next"
          onClick={() => paginate(1)}
          className="absolute right-0 z-10 p-2 rounded-full bg-neutral-800/70 hover:bg-purple-700/80 text-white transition"
        >
          <FiChevronRight size={28} />
        </button>
      </div>
      <div className="flex gap-2 mt-6">
        {REFERENCES.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className={`h-2 w-6 rounded-full transition-all duration-200 ${i === index ? "bg-purple-400" : "bg-neutral-700"
              }`}
            aria-label={`Go to reference ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}