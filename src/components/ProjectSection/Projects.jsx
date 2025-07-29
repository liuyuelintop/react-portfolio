import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { PROJECTS } from "../../constants/projects";
import { cardContainerVariants } from "./animations";
import { useTheme } from "../../contexts/ThemeContext";

const INITIAL_VISIBLE = 3;

export default function Projects() {
    const { currentTheme } = useTheme();
    const [activeProject, setActiveProject] = useState(null);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

    const visibleProjects = PROJECTS.slice(0, visibleCount);

    return (
        <section className="max-w-7xl mx-auto py-12 px-4 lg:px-8">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className={`text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r bg-clip-text text-transparent ${
                        currentTheme === 'minimal'
                            ? 'from-gray-800 via-gray-700 to-gray-600'
                            : 'from-purple-400 via-indigo-400 to-blue-400'
                    }`}
                >
                    Featured Projects
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className={`text-lg max-w-2xl mx-auto ${
                        currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
                    }`}
                >
                    A showcase of my technical projects, demonstrating full-stack development, 
                    problem-solving skills, and attention to user experience.
                </motion.p>
            </div>
            <motion.div
                variants={cardContainerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 projects-grid"
            >
                {visibleProjects.length > 0 ? (
                    visibleProjects.map((project) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            onReadMore={() => setActiveProject(project)}
                        />
                    ))
                ) : (
                    <div className={`col-span-full text-center ${
                        currentTheme === 'minimal' ? 'text-gray-900' : 'text-white'
                    }`}>
                        <p>No projects found. Total projects: {PROJECTS.length}</p>
                    </div>
                )}
            </motion.div>
            {visibleCount < PROJECTS.length && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="flex justify-center mt-12"
                >
                    <motion.button
                        onClick={() => setVisibleCount((c) => c + INITIAL_VISIBLE)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`group flex items-center gap-2 px-8 py-3 rounded-xl font-medium transition-all duration-300 border ${
                            currentTheme === 'minimal'
                                ? 'bg-white border-gray-300 text-gray-700 hover:border-gray-400 hover:shadow-lg shadow-gray-200/50'
                                : 'bg-neutral-800/50 border-neutral-600 text-purple-300 hover:bg-purple-800/20 hover:border-purple-500 hover:shadow-lg shadow-purple-900/20'
                        }`}
                    >
                        <span>Load More Projects</span>
                        <motion.span
                            className="text-lg"
                            animate={{ rotate: visibleCount >= PROJECTS.length ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            ↓
                        </motion.span>
                        <span className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity ${
                            currentTheme === 'minimal' ? 'bg-gray-900' : 'bg-purple-500'
                        }`} />
                    </motion.button>
                </motion.div>
            )}
            <ProjectModal
                project={activeProject}
                onClose={() => setActiveProject(null)}
            />
        </section>
    );
}