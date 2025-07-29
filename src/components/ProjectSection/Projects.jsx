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
        <section className="max-w-6xl mx-auto py-8 px-4 lg:px-8">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r bg-clip-text text-transparent ${
                    currentTheme === 'minimal'
                        ? 'from-gray-800 via-gray-700 to-gray-600'
                        : 'from-purple-400 via-indigo-400 to-blue-400'
                }`}
            >
                My Projects
            </motion.h2>
            <motion.div
                variants={cardContainerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 projects-grid h-full"
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
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setVisibleCount((c) => c + INITIAL_VISIBLE)}
                        className={`px-6 py-2 rounded-lg transition ${
                            currentTheme === 'minimal'
                                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                : 'bg-neutral-800 text-purple-300 hover:bg-purple-800'
                        }`}
                    >
                        Show More
                    </button>
                </div>
            )}
            <ProjectModal
                project={activeProject}
                onClose={() => setActiveProject(null)}
            />
        </section>
    );
}