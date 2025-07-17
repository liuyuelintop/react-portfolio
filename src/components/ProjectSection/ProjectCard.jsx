const ProjectCard = ({ project, onReadMore }) => (
    <div className="bg-neutral-800/40 rounded-xl p-6 shadow-2xl flex flex-col h-full">
        <a href={project.url} target="_blank" rel="noopener noreferrer">
            <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full aspect-video object-cover rounded-lg mb-4"
            />
        </a>
        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            {project.title}
        </h3>
        <p className="text-neutral-300 text-sm flex-1 line-clamp-3">
            {project.description.summary}
        </p>
        <button
            onClick={onReadMore}
            aria-label="Read More"
            className="text-purple-400 hover:text-purple-300 text-sm font-medium mt-4 flex items-center"
        >
            Read More <span className="ml-2">→</span>
        </button>
        <div className="flex flex-wrap gap-2 mt-3">
            {project.technologies.main.map((tech) => (
                <span
                    key={tech}
                    className="px-3 py-1 bg-neutral-700/50 rounded-full text-xs font-medium text-purple-300"
                >
                    {tech}
                </span>
            ))}
        </div>
    </div>
);

export default ProjectCard;
