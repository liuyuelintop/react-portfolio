import { motion } from "framer-motion";
import Modal from "../ui/Modal";
import { useState } from "react";

const BottomActions = ({ project, onClose, onPreview }) => (
  <div className="bg-neutral-900/95 pt-4 pb-4 flex flex-col gap-2 z-10">
    <div className="flex gap-2">
      {project.url && (
        <>
          <motion.button
            onClick={onPreview}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 text-center bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-semibold rounded-md px-6 py-3 transition text-base"
          >
            Preview Demo
          </motion.button>
          <motion.a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 text-center bg-purple-500 hover:bg-purple-400 text-white font-semibold rounded-md px-6 py-3 transition text-base"
          >
            Open Live Site
          </motion.a>
        </>
      )}
    </div>
    <motion.button
      onClick={onClose}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      aria-label="Close Modal"
      className="w-full text-center bg-neutral-800 hover:bg-neutral-700 text-purple-300 font-semibold rounded-md px-6 py-3 transition text-base"
    >
      Close
    </motion.button>
  </div>
);

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;
  const [imgLoaded, setImgLoaded] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <Modal open={!!project} onClose={onClose}>
      <div
        className="
          flex flex-col w-full h-full
          px-3 pt-2 pb-0 md:px-6 md:pt-4 md:pb-0
        "
        style={{ minWidth: 0, minHeight: 0 }}
      >
        {/* Top bar + Close */}
        <motion.div
          drag="y"
          dragConstraints={{ top: 0, bottom: 100 }}
          dragElastic={0.25}
          onDragEnd={(e, info) => {
            if (info.offset.y > 80) onClose();
          }}
          className="flex items-center justify-between mb-2 sticky top-0 z-20 bg-neutral-900/95 rounded-t-xl"
          style={{ WebkitUserSelect: "none" }}
        >
          <button
            className="p-2 text-neutral-300 hover:text-purple-400 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 text-2xl"
            onClick={onClose}
            aria-label="Close"
          >×</button>
          <span className="flex-1 text-center font-bold text-lg sm:text-2xl bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent px-2">
            {project.title}
          </span>
          <span className="w-10" />
        </motion.div>

        {/* Main Content (scrollable) */}
        <div className="flex-1 min-h-0 overflow-y-auto px-0 pb-1">
          <div className="w-full rounded-lg overflow-hidden mb-3 flex items-center justify-center" style={{ minHeight: 0 }}>
            {showPreview && project.url ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full aspect-video max-h-40 md:max-h-56 lg:max-h-64 bg-neutral-800 rounded-lg overflow-hidden"
              >
                <iframe
                  src={project.url}
                  title={`${project.title} Live Preview`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                  Live Preview
                </div>
              </motion.div>
            ) : (
              <div className="w-full aspect-video max-h-40 md:max-h-56 lg:max-h-64 flex items-center justify-center bg-neutral-800 relative">
                {!imgLoaded && (
                  <div className="w-full h-full bg-neutral-700 animate-pulse absolute top-0 left-0" />
                )}
                <motion.img
                  src={project.image}
                  alt={project.title}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    w-full h-full object-cover rounded-lg cursor-pointer
                    transition-opacity duration-500
                    ${imgLoaded ? "opacity-100" : "opacity-0"}
                  `}
                  onLoad={() => setImgLoaded(true)}
                  onClick={handlePreview}
                  loading="lazy"
                />
                {imgLoaded && project.url && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    onClick={handlePreview}
                  >
                    <div className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                      <span>▶</span>
                      <span>Preview Demo</span>
                    </div>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          <p className="text-neutral-300 mb-2 text-sm md:text-base">{project.description.summary}</p>
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
        {/* Bottom actions */}
        <BottomActions project={project} onClose={onClose} onPreview={handlePreview} />
      </div>
    </Modal>
  );
}
