import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { PROJECTS, SUPPORTING_PROJECTS } from "../../../constants/projects";
import { useTheme } from "../../../contexts/ThemeContext";
import { useUI } from "../../../hooks/useUI";
import SectionHeading from "../../ui/common/SectionHeading";

export default function Projects() {
    const { currentTheme } = useTheme();
    const { setIsProjectModalOpen } = useUI();
    const [activeProject, setActiveProject] = useState(null);
    const isMinimal = currentTheme === "minimal";

    const headingClass = isMinimal ? "text-gray-950" : "text-white";
    const textClass = isMinimal ? "text-gray-700" : "text-neutral-300";
    const mutedClass = isMinimal ? "text-gray-500" : "text-neutral-400";
    const panelClass = isMinimal
        ? "bg-white border-gray-200 shadow-lg shadow-gray-200/40"
        : "bg-neutral-900/65 border-neutral-800 shadow-xl shadow-black/20";
    const innerPanelClass = isMinimal ? "bg-gray-50 border-gray-200" : "bg-neutral-950/55 border-neutral-800";
    const chipClass = isMinimal
        ? "bg-white border-gray-200 text-gray-700"
        : "bg-neutral-900 border-neutral-800 text-neutral-300";

    return (
        <section className="max-w-6xl mx-auto py-12 px-4 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mb-8 max-w-3xl"
            >
                <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${mutedClass}`}>
                    Selected Case Studies
                </p>
                <SectionHeading level="section" animate={false} className="mt-3">
                    Proof that maps to the role
                </SectionHeading>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className={`mt-4 text-base md:text-lg leading-relaxed ${textClass}`}
                >
                    Three flagship projects, selected for hiring relevance rather than quantity.
                    Each one shows judgment across product ownership, reliability, cloud delivery or AI workflow design.
                </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 projects-grid">
                {PROJECTS.length > 0 ? (
                    PROJECTS.map((project, index) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            index={index}
                            onReadMore={() => {
                                setActiveProject(project);
                                setIsProjectModalOpen(true);
                            }}
                        />
                    ))
                ) : (
                    <div className={`col-span-full text-center ${headingClass}`}>
                        <p>No projects found. Total projects: {PROJECTS.length}</p>
                    </div>
                )}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: 0.12, duration: 0.45, ease: "easeOut" }}
                className={`mt-4 rounded-lg border p-5 md:p-6 ${panelClass}`}
            >
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h3 className={`text-xl font-bold ${headingClass}`}>
                            Supporting Builds
                        </h3>
                        <p className={`mt-2 text-sm max-w-2xl ${mutedClass}`}>
                            Useful breadth without letting smaller builds compete with the main case studies.
                        </p>
                    </div>
                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {SUPPORTING_PROJECTS.map((project) => (
                        <a
                            key={project.title}
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`block rounded-lg border p-4 transition-colors ${innerPanelClass}`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <h4 className={`font-semibold ${headingClass}`}>
                                    {project.title}
                                </h4>
                                <ExternalLink size={16} className={`mt-1 shrink-0 ${mutedClass}`} aria-hidden="true" />
                            </div>
                            <p className={`mt-2 text-sm leading-relaxed ${textClass}`}>
                                {project.summary}
                            </p>
                            <p className={`mt-3 text-xs font-semibold uppercase tracking-[0.14em] ${mutedClass}`}>
                                {project.whyItMatters}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {project.stack.map((tool) => (
                                    <span
                                        key={tool}
                                        className={`rounded-md border px-2 py-1 text-xs ${chipClass}`}
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </a>
                    ))}
                </div>
            </motion.div>

            <ProjectModal
                project={activeProject}
                onClose={() => {
                    setActiveProject(null);
                    setIsProjectModalOpen(false);
                }}
            />
        </section>
    );
}
