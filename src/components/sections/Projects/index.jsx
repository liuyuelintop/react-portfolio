import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { PROJECTS, SUPPORTING_PROJECTS } from "../../../constants/projects";
import { cardContainerVariants } from "./animations";
import { useTheme } from "../../../contexts/ThemeContext";
import { useUI } from "../../../hooks/useUI";
import SectionHeading from "../../ui/common/SectionHeading";

export default function Projects() {
    const { currentTheme } = useTheme();
    const { setIsProjectModalOpen } = useUI();
    const [activeProject, setActiveProject] = useState(null);

    return (
        <section className="max-w-7xl mx-auto py-12 px-4 lg:px-8">
            <div className="text-center mb-16">
                <SectionHeading level="section">
                    Role-Relevant Case Studies
                </SectionHeading>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className={`text-lg max-w-2xl mx-auto ${
                        currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
                    }`}
                >
                    Three flagship projects, selected for hiring relevance rather than quantity.
                    Each one shows judgment across product ownership, reliability, cloud delivery or AI workflow design.
                </motion.p>
            </div>
            <motion.div
                variants={cardContainerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 projects-grid"
            >
                {PROJECTS.length > 0 ? (
                    PROJECTS.map((project) => (
                        <ProjectCard
                            key={project.title}
                            project={project}
                            onReadMore={() => {
                                setActiveProject(project);
                                setIsProjectModalOpen(true);
                            }}
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

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ delay: 0.12, duration: 0.45, ease: "easeOut" }}
                className={`mt-10 rounded-lg border p-5 md:p-6 ${
                    currentTheme === 'minimal'
                        ? 'bg-white border-gray-200 shadow-lg shadow-gray-200/40'
                        : 'bg-neutral-900/60 border-neutral-800 shadow-xl shadow-black/20'
                }`}
            >
                <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                    <div>
                        <h3 className={`text-xl font-bold ${currentTheme === 'minimal' ? 'text-gray-950' : 'text-white'}`}>
                            Supporting Builds
                        </h3>
                        <p className={`mt-2 text-sm max-w-2xl ${
                            currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
                        }`}>
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
                            className={`block rounded-lg border p-4 transition-colors ${
                                currentTheme === 'minimal'
                                    ? 'bg-gray-50 border-gray-200 hover:bg-white hover:border-gray-300'
                                    : 'bg-neutral-950/50 border-neutral-800 hover:border-neutral-700'
                            }`}
                        >
                            <h4 className={`font-semibold ${currentTheme === 'minimal' ? 'text-gray-950' : 'text-white'}`}>
                                {project.title}
                            </h4>
                            <p className={`mt-2 text-sm leading-relaxed ${
                                currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-300'
                            }`}>
                                {project.summary}
                            </p>
                            <p className={`mt-3 text-xs font-semibold uppercase tracking-[0.14em] ${
                                currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-500'
                            }`}>
                                {project.whyItMatters}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {project.stack.map((tool) => (
                                    <span
                                        key={tool}
                                        className={`rounded-md border px-2 py-1 text-xs ${
                                            currentTheme === 'minimal'
                                                ? 'bg-white border-gray-200 text-gray-700'
                                                : 'bg-neutral-900 border-neutral-800 text-neutral-300'
                                        }`}
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
