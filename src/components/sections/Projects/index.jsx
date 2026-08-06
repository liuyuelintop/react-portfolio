import { useState } from "react";
import { ExternalLink } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { PROJECTS, SUPPORTING_PROJECTS } from "../../../constants/projects";
import { useUI } from "../../../hooks/useUI";
import { focusRingClasses } from "../../../utils/accessibility";
import Reveal from "../../ui/common/Reveal";

export default function Projects() {
    const { setIsProjectModalOpen } = useUI();
    const [activeProject, setActiveProject] = useState(null);

    return (
        <div className="mx-auto max-w-5xl px-4 py-20 md:px-8 md:py-24">
            <Reveal>
                <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                    Selected Work
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
                    Three flagship projects, selected for hiring relevance rather than quantity.
                </p>

                <div className="mt-12 space-y-16 md:space-y-20">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                            onReadMore={() => {
                                setActiveProject(project);
                                setIsProjectModalOpen(true);
                            }}
                        />
                    ))}
                </div>

                <div className="mt-20">
                    <h3 className="text-xl font-bold text-white">Supporting Builds</h3>
                    <ul className="mt-5 divide-y divide-neutral-800 border-t border-neutral-800">
                        {SUPPORTING_PROJECTS.map((project) => (
                            <li key={project.title} className="py-4">
                                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                    {project.url ? (
                                        <a
                                            href={project.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`inline-flex items-center gap-1.5 py-1 font-medium text-white transition-colors hover:text-cyan-300 ${focusRingClasses}`}
                                        >
                                            {project.title}
                                            <ExternalLink size={14} aria-hidden="true" />
                                        </a>
                                    ) : (
                                        <span className="py-1 font-medium text-white">{project.title}</span>
                                    )}
                                    {project.status && (
                                        <span className="text-sm text-neutral-400">{project.status}</span>
                                    )}
                                </div>
                                <p className="mt-1 max-w-2xl text-sm leading-relaxed text-neutral-400">
                                    {project.summary}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            </Reveal>

            <ProjectModal
                project={activeProject}
                onClose={() => {
                    setActiveProject(null);
                    setIsProjectModalOpen(false);
                }}
            />
        </div>
    );
}
