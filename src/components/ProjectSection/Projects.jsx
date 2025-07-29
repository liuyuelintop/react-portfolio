import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { PROJECTS } from "../../constants/projects";
import { cardContainerVariants } from "./animations";

const INITIAL_VISIBLE = 6;

export default function Projects() {
    const [activeProject, setActiveProject] = useState(null);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

    const visibleProjects = PROJECTS.slice(0, visibleCount);
    
    // DEBUG: Log the data
    console.log('PROJECTS:', PROJECTS);
    console.log('visibleProjects:', visibleProjects);
    console.log('visibleCount:', visibleCount);

    return (
        <section className="max-w-6xl mx-auto py-8 px-4 lg:px-8">
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent"
            >
                My Projects
            </motion.h2>
            <motion.div 
                variants={cardContainerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 projects-grid"
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
                    <div className="col-span-full text-center text-white">
                        <p>No projects found. Total projects: {PROJECTS.length}</p>
                        <p>Debug: visibleCount = {visibleCount}</p>
                    </div>
                )}
            </motion.div>
            {visibleCount < PROJECTS.length && (
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setVisibleCount((c) => c + INITIAL_VISIBLE)}
                        className="px-6 py-2 bg-neutral-800 rounded-lg text-purple-300 hover:bg-purple-800 transition"
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