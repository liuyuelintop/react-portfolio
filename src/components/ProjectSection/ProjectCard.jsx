import { motion } from "framer-motion";
import { useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";

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
    const { currentTheme } = useTheme();
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
                    <div className={`rounded-xl p-6 border flex flex-col h-full ${
                        currentTheme === 'minimal'
                            ? 'bg-white border-gray-200 shadow-lg'
                            : 'bg-neutral-800 border-neutral-700'
                    }`}>
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full aspect-video object-cover rounded-lg mb-4"
                        />

                        <h3 className={`text-xl font-bold mb-2 ${
                            currentTheme === 'minimal' ? 'text-gray-900' : 'text-white'
                        }`}>
                            {project.title}
                        </h3>

                        <p className={`text-sm flex-1 ${
                            currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-300'
                        }`}>
                            {project.description.summary}
                        </p>

                        <button
                            onClick={onReadMore}
                            className={`text-sm mt-auto ${
                                currentTheme === 'minimal' ? 'text-blue-600 hover:text-blue-700' : 'text-purple-400 hover:text-purple-300'
                            }`}
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
                    <div className={`rounded-xl p-6 border flex flex-col h-full ${
                        currentTheme === 'minimal'
                            ? 'bg-gray-50 border-gray-300'
                            : 'bg-purple-900 border-purple-400'
                    }`}>
                        <h3 className={`text-lg font-bold mb-4 ${
                            currentTheme === 'minimal' ? 'text-gray-900' : 'text-white'
                        }`}>Tech Stack</h3>

                        <div className="flex-1">
                            <h4 className={`text-sm font-semibold mb-2 ${
                                currentTheme === 'minimal' ? 'text-gray-700' : 'text-blue-300'
                            }`}>Technologies:</h4>
                            <div className="flex flex-wrap gap-1">
                                {project.technologies.main.map((tech) => (
                                    <span
                                        key={tech}
                                        className={`px-2 py-1 rounded text-xs ${
                                            currentTheme === 'minimal'
                                                ? 'bg-gray-200 text-gray-700'
                                                : 'bg-purple-500 text-white'
                                        }`}
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
                            className={`px-4 py-2 rounded text-sm text-center mt-4 transition-colors ${
                                currentTheme === 'minimal'
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                    : 'bg-blue-500 hover:bg-blue-400 text-white'
                            }`}
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
