import { motion } from "framer-motion";
import { useState } from "react";
import { cardVariants, card3DVariants, cardImageVariants, techTagVariants } from "./animations";

const ProjectCard = ({ project, onReadMore }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleCardClick = (e) => {
        // Don't flip if clicking on links or buttons
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.closest('button')) {
            return;
        }
        setIsFlipped(!isFlipped);
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            className="relative h-full perspective-1000"
            style={{ perspective: "1000px" }}
        >
            <motion.div
                variants={card3DVariants}
                animate={isFlipped ? "flip" : "rest"}
                whileHover={!isFlipped ? "hover" : "rest"}
                onClick={handleCardClick}
                className="relative w-full h-full cursor-pointer preserve-3d"
                style={{ 
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden"
                }}
            >
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                    <div className="bg-neutral-800/60 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-neutral-700/50 hover:border-purple-500/30 flex flex-col h-full transition-all duration-300">
                        <motion.a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block overflow-hidden rounded-lg mb-4"
                            whileHover="hover"
                            variants={cardImageVariants}
                        >
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                variants={cardImageVariants}
                                className="w-full aspect-video object-cover"
                            />
                        </motion.a>
                        
                        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
                            {project.title}
                        </h3>
                        
                        <p className="text-neutral-300 text-sm flex-1 line-clamp-3 mb-4">
                            {project.description.summary}
                        </p>
                        
                        <motion.button
                            onClick={onReadMore}
                            aria-label="Read More"
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            className="text-purple-400 hover:text-purple-300 text-sm font-medium mb-4 flex items-center self-start"
                        >
                            Read More <span className="ml-2">→</span>
                        </motion.button>
                        
                        <motion.div 
                            className="flex flex-wrap gap-2"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05,
                                    },
                                },
                            }}
                        >
                            {project.technologies.main.slice(0, 3).map((tech) => (
                                <motion.span
                                    key={tech}
                                    variants={techTagVariants}
                                    whileHover="hover"
                                    className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-xs font-medium text-purple-300 backdrop-blur-sm"
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </motion.div>
                        
                        <div className="mt-3 text-center">
                            <span className="text-xs text-neutral-500">Click to flip</span>
                        </div>
                    </div>
                </div>

                {/* Back Face */}
                <div 
                    className="absolute inset-0 w-full h-full backface-hidden"
                    style={{ transform: "rotateY(180deg)" }}
                >
                    <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-purple-500/30 flex flex-col h-full">
                        <h3 className="text-lg font-bold text-purple-300 mb-4">Tech Stack</h3>
                        
                        <div className="flex-1 space-y-3">
                            <div>
                                <h4 className="text-sm font-semibold text-blue-300 mb-2">Main Technologies</h4>
                                <div className="flex flex-wrap gap-1">
                                    {project.technologies.main.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-2 py-1 bg-purple-500/30 rounded text-xs text-purple-200"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            {project.technologies.others && (
                                <div>
                                    <h4 className="text-sm font-semibold text-cyan-300 mb-2">Additional Tools</h4>
                                    <div className="flex flex-wrap gap-1">
                                        {project.technologies.others.slice(0, 6).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-blue-500/30 rounded text-xs text-blue-200"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div className="mt-4 flex justify-between items-center">
                            <motion.a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white text-sm font-medium"
                            >
                                Visit Live Site
                            </motion.a>
                            
                            <span className="text-xs text-neutral-400">Click to flip back</span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectCard;
