import { PROJECTS } from "../constants";
import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

export default function Projects() {
    return (
        <div className="border-b border-neutral-900 pb-4">
            <motion.h2
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: -100 }}
                transition={{ duration: 0.5 }}
                className="my-20 text-center text-4xl">
                Projects
            </motion.h2>
            <div className="flex flex-col">
                {PROJECTS.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </div>
    )
}
