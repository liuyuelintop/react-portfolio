import { motion } from "framer-motion";
import { memo, useMemo } from "react";

const cardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const ProjectCard = memo(({ project }) => {
    // 避免不必要的渲染
    const techBadges = useMemo(
        () =>
            project.technologies.map((tech, index) => (
                <span
                    key={index}
                    className="mr-1 mt-2 rounded bg-neutral-900 px-2 py-1 text-xs sm:text-sm font-medium text-purple-800"
                >
                    {tech}
                </span>
            )),
        [project.technologies]
    );

    return (
        <motion.div
            className="mb-8 flex flex-col md:flex-row items-center md:items-start"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
        >
            {/* 项目图片 */}
            <div className="w-full md:w-1/3 flex justify-center">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <img
                        className="mb-4 md:mb-0 rounded w-32 sm:w-40 md:w-48 lg:w-64"
                        src={project.image}
                        alt={project.title}
                    />
                </a>
            </div>

            {/* 项目文本 */}
            <div className="w-full md:w-2/3 text-center md:text-left px-4">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <h6 className="mb-2 text-lg sm:text-xl font-semibold">{project.title}</h6>
                </a>
                <p className="mb-4 text-sm sm:text-base text-neutral-400">{project.description}</p>
                <div className="flex flex-wrap justify-center md:justify-start">{techBadges}</div>
            </div>
        </motion.div>
    );
});

export default ProjectCard;
