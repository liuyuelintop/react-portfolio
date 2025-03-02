import { PROJECTS } from "../constants/projects";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { useMemo } from "react";

export default function Projects() {
    // 避免 map() 在不必要的情况下重新计算
    const projectList = useMemo(() => (
        PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
        ))
    ), [PROJECTS]);

    return (
        <div className="border-b border-neutral-900 pb-4">
            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                className="my-20 text-center text-4xl"
            >
                Projects
            </motion.h2>
            <div className="flex flex-col gap-4">
                {projectList}
            </div>
        </div>
    );
}
