import { motion } from 'framer-motion';

const ProjectCard = ({ project, index }) => {
    return (
        <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: -100 }}
                transition={{ duration: 1 }}
                className="w-full lg:w-1/4">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <img className="mb-6 rounded"
                        width={200}
                        // height={150}
                        src={project.image}
                        alt={project.title} />
                </a>
            </motion.div>
            <motion.div
                whileInView={{ opacity: 1, x: 0 }}
                initial={{ opacity: 0, x: 100 }}
                transition={{ duration: 1 }}
                className="w-full max-w-xl lg:w-3/4">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                    <h6 className="mb-2 font-semibold">{project.title}</h6>
                </a>
                <p className="mb-4 text-neutral-400">
                    {project.description}
                </p>
                <div className="flex flex-wrap">
                    {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="mr-2 mt-4 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-800">
                            {tech}
                        </span>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectCard;
