import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { PROJECTS } from "../../constants/projects";

const INITIAL_VISIBLE = 6;

export default function Projects() {
    const [activeProject, setActiveProject] = useState(null);
    const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

    const visibleProjects = PROJECTS.slice(0, visibleCount);

    return (
        <section className="max-w-5xl mx-auto py-8 px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                My Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {visibleProjects.map((project) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        onReadMore={() => setActiveProject(project)}
                    />
                ))}
            </div>
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