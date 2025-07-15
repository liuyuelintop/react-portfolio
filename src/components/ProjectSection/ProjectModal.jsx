import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 }
};
const modalVariants = {
  hidden: { opacity: 0, scale: 0.98, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0 }
};

export default function ProjectModal({ project, onClose }) {
  // Prevent body scroll when modal is open (important for mobile!)
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  // ESC key to close modal
  useEffect(() => {
    if (!project) return;
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <motion.div
          className="bg-neutral-900 rounded-xl sm:p-8 p-4 max-w-lg w-[95vw] max-h-[90vh] overflow-y-auto relative shadow-2xl"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={modalVariants}
          onClick={e => e.stopPropagation()} // Prevent closing when clicking inside modal
          tabIndex={-1}
        >
          {/* Close button - big and accessible */}
          <button
            className="absolute top-2 right-2 sm:top-4 sm:right-4 text-neutral-400 hover:text-purple-400 text-2xl sm:text-xl font-bold rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>

          {/* Project image */}
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-video object-cover rounded-lg mb-4"
          />

          {/* Title */}
          <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-neutral-300 mb-4">{project.description.summary}</p>
          <ul className="mb-4 pl-4 list-disc text-neutral-400 text-sm space-y-1">
            {project.description.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>

          {/* Technology tags */}
          <div className="flex flex-wrap gap-2 mb-2">
            {project.technologies.main.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-neutral-700/50 rounded-full text-xs font-medium text-purple-300"
              >
                {tech}
              </span>
            ))}
          </div>
          {project.technologies.others?.length > 0 && (
            <div className="mt-2 text-xs text-neutral-500">
              Also used: {project.technologies.others.join(" • ")}
            </div>
          )}

          {/* View Project (CTA) */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-block text-center bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-md px-6 py-2 transition"
              >
                View Live Project
              </a>
            )}
            {/* Optionally: Show code repo link */}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-block text-center bg-neutral-700 hover:bg-neutral-600 text-purple-200 font-semibold rounded-md px-6 py-2 transition border border-purple-400"
              >
                View Code
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
