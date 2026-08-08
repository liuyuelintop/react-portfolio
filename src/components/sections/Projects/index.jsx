import { useCallback, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { ARCHITECTURE_STUDY, PROJECTS, SUPPORTING_PROJECTS } from "../../../constants/projects";
import { useUI } from "../../../hooks/useUI";
import { focusRingClasses } from "../../../utils/accessibility";
import Reveal from "../../ui/common/Reveal";

export default function Projects() {
    const { setIsProjectModalOpen } = useUI();
    const [activeProject, setActiveProject] = useState(null);
    const projectTriggerRef = useRef(null);

    const openProject = useCallback((project, event) => {
        projectTriggerRef.current = event.currentTarget;
        setActiveProject(project);
        setIsProjectModalOpen(true);
    }, [setIsProjectModalOpen]);

    const closeProject = useCallback(() => {
        setActiveProject(null);
        setIsProjectModalOpen(false);
        window.requestAnimationFrame(() => projectTriggerRef.current?.focus());
    }, [setIsProjectModalOpen]);

    return (
        <div className="mx-auto max-w-5xl px-4 py-20 md:px-8 md:py-24">
            <Reveal>
                <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">
                    Selected Work
                </h2>

                <div className="mt-12 space-y-16 md:space-y-20">
                    {PROJECTS.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                            onReadMore={(event) => openProject(project, event)}
                        />
                    ))}
                </div>

                <div className="mt-20">
                    <h3 className="text-xl font-bold text-white">Learning &amp; Contributions</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-400">
                        {ARCHITECTURE_STUDY.intro}
                    </p>
                    <div className="mt-5 border-t border-neutral-800 py-4">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                            <span className="py-1 font-medium text-white">{ARCHITECTURE_STUDY.title}</span>
                            <span className="text-sm text-neutral-400">{ARCHITECTURE_STUDY.status}</span>
                        </div>
                        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-neutral-400">
                            {ARCHITECTURE_STUDY.summary}
                        </p>
                        <p className="mt-4 text-sm font-medium text-neutral-300">What I contributed</p>
                        <ul className="mt-2 max-w-2xl space-y-1.5 text-sm leading-relaxed text-neutral-400">
                            {ARCHITECTURE_STUDY.contributions.map((contribution) => (
                                <li key={contribution} className="flex gap-2">
                                    <span aria-hidden="true" className="text-neutral-600">—</span>
                                    <span>{contribution}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="mt-20">
                    <h3 className="text-xl font-bold text-white">Additional Work</h3>
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
                onClose={closeProject}
            />
        </div>
    );
}
