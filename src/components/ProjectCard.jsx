import { Card, CardHeader, CardContent, CardFooter } from "./ui/Card";
import { useState } from "react";

const ProjectCard = ({ project }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="w-full transition-all hover:scale-105">
            <Card className="flex flex-col min-h-[380px]"> {/* 统一卡片高度 */}
                <CardHeader className="flex justify-center">
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="rounded-lg w-full h-48 md:h-56 object-cover transition-all hover:scale-105"
                        />
                    </a>
                </CardHeader>

                <CardContent>
                    <h6 className="text-lg font-bold text-white text-center pb-2">{project.title}</h6>

                    <p className={`text-sm text-neutral-400 ${expanded ? "max-h-full" : "line-clamp-2"}`}>
                        {project.description}
                    </p>

                    <button
                        className="text-xs text-purple-400 mt-2 hover:underline"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? "Show Less" : "Read More"}
                    </button>

                    <div className="flex flex-wrap gap-2 mt-3">
                        {project.technologies.map((tech, index) => (
                            <span
                                key={index}
                                className="rounded bg-neutral-800 px-2 py-1 text-xs font-medium text-purple-300"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ProjectCard;
