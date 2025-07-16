import { useState } from "react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { PROJECTS } from "../../constants/projects";

export default function Projects() {
    const [activeProject, setActiveProject] = useState(null);

    return (
        <section className="max-w-5xl mx-auto py-8 px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                My Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {PROJECTS.map((project) => (
                    <ProjectCard
                        key={project.title}
                        project={project}
                        onReadMore={() => setActiveProject(project)}
                    />
                ))}
            </div>
            <ProjectModal
                project={activeProject}
                onClose={() => setActiveProject(null)}
            />
        </section>
    );
}
