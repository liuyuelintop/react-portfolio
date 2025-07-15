import { motion } from "framer-motion";
import Modal from "../ui/Modal";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <Modal open={!!project} onClose={onClose}>
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 120 }}
        dragElastic={0.2}
        onDragEnd={(e, info) => {
          if (info.offset.y > 80) onClose(); // Auto close if dragged down more than 80px
        }}
        className="flex flex-col h-full"
      >
        {/* Top bar + Close */}
        <div className="flex items-center justify-between mb-2 sticky top-0 z-10 bg-neutral-900/95 rounded-t-xl">
          <button
            className="p-2 text-neutral-300 hover:text-purple-400 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-2xl"
            onClick={onClose}
            aria-label="Close"
          >×</button>
          <span className="flex-1 text-center font-bold text-lg sm:text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            {project.title}
          </span>
          <span className="w-10" />
        </div>
        {/* Content area */}
        <div className="flex-1 overflow-y-auto px-1 pb-4">
          <img
            src={project.image}
            alt={project.title}
            className="w-full aspect-video object-cover rounded-lg mb-3"
          />
          <p className="text-neutral-300 mb-3">{project.description.summary}</p>
          <ul className="mb-3 pl-4 list-disc text-neutral-400 text-sm space-y-1">
            {project.description.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
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
        </div>
        {/* Bottom main button */}
        <div className="mt-1 pb-1 flex flex-col gap-2">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-md px-6 py-3 transition text-base"
            >
              View Live Project
            </a>
          )}
          <button
            onClick={onClose}
            className="w-full text-center bg-neutral-800 hover:bg-neutral-700 text-purple-300 font-semibold rounded-md px-6 py-3 transition text-base"
          >
            Close
          </button>
        </div>
      </motion.div>
    </Modal>
  );
}