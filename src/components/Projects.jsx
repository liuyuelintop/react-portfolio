import { PROJECTS } from "../constants/projects";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useMemo } from "react";

export default function Projects() {
    const projectList = useMemo(
        () => PROJECTS.map((project) => <ProjectCard key={project.title} project={project} />),
        [PROJECTS]
    );

    return (
        <section className="border-b border-neutral-900 pb-12 lg:pb-24">
            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="my-10 text-center text-3xl sm:text-4xl font-semibold px-4"
            >
                Projects
            </motion.h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
                {projectList}
            </div>
        </section>
    );
}
