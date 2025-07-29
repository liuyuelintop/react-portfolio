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
            className="relative h-full group project-card-container"
            data-flipped={isFlipped}
            style={{ 
                perspective: "1200px",
                // Add padding to prevent overlap during transforms
                padding: "25px",
                margin: "-25px",
            }}
        >
            <motion.div
                variants={card3DVariants}
                animate={isFlipped ? "flip" : "rest"}
                whileHover={!isFlipped ? "hover" : "rest"}
                onClick={handleCardClick}
                className="relative w-full h-full cursor-pointer preserve-3d"
                style={{ 
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    filter: "drop-shadow(0 25px 50px rgba(0, 0, 0, 0.5)) drop-shadow(0 10px 20px rgba(147, 51, 234, 0.3))",
                    // Ensure transforms don't escape the container
                    willChange: "transform",
                    // Use contain to isolate the transform effects
                    contain: "layout style paint",
                }}
            >
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden">
                    <div className="bg-gradient-to-br from-neutral-800/70 via-neutral-800/60 to-neutral-900/80 backdrop-blur-sm rounded-xl p-6 border border-neutral-700/60 group-hover:border-purple-500/50 flex flex-col h-full transition-all duration-500 relative overflow-hidden">
                        {/* Subtle glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                        
                        {/* 3D lighting effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-60 rounded-xl pointer-events-none" />
                        <motion.a 
                            href={project.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block overflow-hidden rounded-lg mb-4 relative z-10 shadow-lg"
                            whileHover="hover"
                            variants={cardImageVariants}
                        >
                            <motion.img
                                src={project.image}
                                alt={project.title}
                                loading="lazy"
                                variants={cardImageVariants}
                                className="w-full aspect-video object-cover transition-all duration-300"
                            />
                            {/* Image overlay for depth */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                        </motion.a>
                        
                        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 relative z-10">
                            {project.title}
                        </h3>
                        
                        <p className="text-neutral-300 text-sm flex-1 line-clamp-3 mb-4 relative z-10 leading-relaxed">
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
                    <div className="bg-gradient-to-br from-purple-900/30 via-blue-900/25 to-indigo-900/30 backdrop-blur-md rounded-xl p-6 border border-purple-400/50 flex flex-col h-full relative overflow-hidden">
                        {/* Enhanced glow for back face */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-indigo-500/10 rounded-xl" />
                        
                        {/* 3D lighting for back */}
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-white/10 via-transparent to-transparent opacity-80 rounded-xl pointer-events-none" />
                        <h3 className="text-lg font-bold text-purple-200 mb-4 relative z-10">Tech Stack</h3>
                        
                        <div className="flex-1 space-y-3 relative z-10">
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
