import { motion } from "framer-motion";
import { useState } from "react";

// Animation variants for card flip
const card3DVariants = {
    rest: { rotateY: 0, transition: { duration: 0.5 } },
    flip: { rotateY: 180, transition: { duration: 0.5 } },
    hover: { scale: 1.03 }
};
const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ProjectCard = ({ project, onReadMore }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleCardClick = (e) => {
        // Don't flip if clicking on links or buttons
        if (
            e.target.tagName === "A" ||
            e.target.tagName === "BUTTON" ||
            e.target.closest("button")
        ) {
            return;
        }
        setIsFlipped((prev) => !prev);
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className="relative h-full group project-card-container"
            data-flipped={isFlipped}
            style={{
                perspective: "1200px"
            }}
        >
            <motion.div
                variants={card3DVariants}
                animate={isFlipped ? "flip" : "rest"}
                whileHover={!isFlipped ? "hover" : "rest"}
                onClick={handleCardClick}
                className="relative w-full h-full cursor-pointer"
                style={{
                    transformStyle: "preserve-3d",
                    minHeight: "400px", // set min height to prevent jump
                }}
            >
                {/* Front Face */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                >
                    <div className="bg-neutral-800 rounded-xl p-6 border border-neutral-700 flex flex-col h-full">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full aspect-video object-cover rounded-lg mb-4"
                        />

                        <h3 className="text-xl font-bold text-white mb-2">
                            {project.title}
                        </h3>

                        <p className="text-neutral-300 text-sm flex-1">
                            {project.description.summary}
                        </p>

                        <button
                            onClick={onReadMore}
                            className="text-purple-400 text-sm mt-auto"
                        >
                            Read More →
                        </button>
                    </div>
                </div>

                {/* Back Face */}
                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        transform: "rotateY(180deg)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                    }}
                >
                    <div className="bg-purple-900 rounded-xl p-6 border border-purple-400 flex flex-col h-full">
                        <h3 className="text-lg font-bold text-white mb-4">Tech Stack</h3>

                        <div className="flex-1">
                            <h4 className="text-sm font-semibold text-blue-300 mb-2">Technologies:</h4>
                            <div className="flex flex-wrap gap-1">
                                {project.technologies.main.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2 py-1 bg-purple-500 rounded text-xs text-white"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 bg-blue-500 rounded text-white text-sm text-center mt-4"
                        >
                            Visit Live Site
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectCard;
