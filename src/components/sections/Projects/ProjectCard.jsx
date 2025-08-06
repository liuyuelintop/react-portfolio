import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../../contexts/ThemeContext";
import OptimizedImage from "../../ui/common/OptimizedImage";
import { getThemeFocusRing } from "../../../utils/accessibility";

// Clean animation variants without conflicts
const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { duration: 0.6, ease: "easeOut" } 
    },
};

const hoverVariants = {
    rest: { 
        y: 0, 
        scale: 1,
        transition: { duration: 0.3, ease: "easeOut" } 
    },
    hover: { 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

const overlayVariants = {
    hidden: { 
        opacity: 0, 
        scale: 0.95,
        transition: { duration: 0.2, ease: "easeOut" }
    },
    visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const ProjectCard = ({ project, onReadMore }) => {
    const { currentTheme } = useTheme();
    const [showTechStack, setShowTechStack] = useState(false);

    const handleTechStackToggle = (e) => {
        e.stopPropagation();
        setShowTechStack(prev => !prev);
    };

    const closeTechStack = () => {
        setShowTechStack(false);
    };

    // Get theme-specific colors and styles
    const getCardStyles = () => {
        switch (currentTheme) {
            case 'minimal':
                return {
                    card: 'bg-white border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300',
                    title: 'text-gray-900',
                    description: 'text-gray-600',
                    techBadge: 'bg-gray-100 text-gray-700 border-gray-200',
                    button: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50',
                    techButton: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
                    overlay: 'bg-white border-gray-200 shadow-2xl'
                };
            case 'neon':
                return {
                    card: 'bg-black border-cyan-500/30 shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 hover:border-cyan-400/50',
                    title: 'text-white',
                    description: 'text-gray-300',
                    techBadge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
                    button: 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10',
                    techButton: 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300',
                    overlay: 'bg-black border-cyan-500/50 shadow-2xl shadow-cyan-500/20'
                };
            case 'corporate':
                return {
                    card: 'bg-slate-50 border-blue-200 shadow-lg hover:shadow-xl hover:border-blue-300',
                    title: 'text-slate-900',
                    description: 'text-slate-600',
                    techBadge: 'bg-blue-50 text-blue-700 border-blue-200',
                    button: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50',
                    techButton: 'bg-blue-50 hover:bg-blue-100 text-blue-700',
                    overlay: 'bg-slate-50 border-blue-200 shadow-2xl'
                };
            default: // default theme
                return {
                    card: 'bg-neutral-800 border-neutral-700 shadow-lg hover:shadow-2xl hover:border-neutral-600 shadow-black/20',
                    title: 'text-white',
                    description: 'text-neutral-300',
                    techBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
                    button: 'text-purple-400 hover:text-purple-300 hover:bg-purple-500/10',
                    techButton: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300',
                    overlay: 'bg-neutral-800 border-neutral-600 shadow-2xl shadow-black/50'
                };
        }
    };

    const styles = getCardStyles();

    return (
        <>
            <motion.div
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="relative h-full group"
            >
                <motion.div
                    variants={hoverVariants}
                    initial="rest"
                    whileHover="hover"
                    className="h-full"
                >
                    <div className={`rounded-xl p-6 border flex flex-col h-full transition-all duration-300 ${styles.card}`}
                         style={{ minHeight: "420px" }}>
                        
                        {/* Project Image */}
                        <OptimizedImage
                            src={project.image}
                            alt={project.title}
                            className="rounded-lg mb-4"
                            aspectRatio="aspect-video"
                        />

                        {/* Project Title */}
                        <h3 className={`text-xl font-bold mb-2 ${styles.title}`}>
                            {project.title}
                        </h3>

                        {/* Project Description */}
                        <p className={`text-sm mb-4 flex-1 ${styles.description}`}>
                            {project.description.summary}
                        </p>

                        {/* Key Technologies Preview */}
                        <div className="mb-4">
                            <div className="flex flex-wrap gap-1 mb-2">
                                {project.technologies.main.slice(0, 3).map((tech) => (
                                    <span
                                        key={tech}
                                        className={`px-2 py-1 rounded text-xs border ${styles.techBadge}`}
                                    >
                                        {tech}
                                    </span>
                                ))}
                                {project.technologies.main.length > 3 && (
                                    <button
                                        onClick={handleTechStackToggle}
                                        className={`px-2 py-1 rounded text-xs border transition-colors ${styles.techButton} ${getThemeFocusRing(currentTheme)}`}
                                        aria-label="View all technologies"
                                    >
                                        +{project.technologies.main.length - 3} more
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 mt-auto">
                            <button
                                onClick={onReadMore}
                                className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${styles.button} ${getThemeFocusRing(currentTheme)}`}
                                aria-label={`Read more about ${project.title}`}
                            >
                                View Details
                            </button>
                            
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${styles.techButton} ${getThemeFocusRing(currentTheme)}`}
                                aria-label={`Visit ${project.title} live site`}
                            >
                                Live Site
                            </a>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Tech Stack Overlay Modal */}
            <AnimatePresence>
                {showTechStack && (
                    <motion.div
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={closeTechStack}
                    >
                        <motion.div
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            className={`rounded-xl p-6 border max-w-md w-full max-h-[80vh] overflow-y-auto ${styles.overlay}`}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h3 className={`text-lg font-bold ${styles.title}`}>
                                    {project.title} - Tech Stack
                                </h3>
                                <button
                                    onClick={closeTechStack}
                                    className={`p-2 rounded-lg transition-colors ${styles.techButton} ${getThemeFocusRing(currentTheme)}`}
                                    aria-label="Close tech stack details"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h4 className={`text-sm font-semibold mb-2 ${styles.description}`}>
                                        Main Technologies:
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.main.map((tech) => (
                                            <span
                                                key={tech}
                                                className={`px-3 py-1 rounded-full text-sm border ${styles.techBadge}`}
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {project.technologies.additional && project.technologies.additional.length > 0 && (
                                    <div>
                                        <h4 className={`text-sm font-semibold mb-2 ${styles.description}`}>
                                            Additional Tools:
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.additional.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className={`px-3 py-1 rounded-full text-xs border ${styles.techBadge} opacity-80`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6 pt-4 border-t border-current opacity-20">
                                <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`block w-full px-4 py-2 rounded-lg text-sm font-medium text-center transition-all duration-200 ${styles.button} ${getThemeFocusRing(currentTheme)}`}
                                >
                                    Visit Live Project
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

ProjectCard.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.shape({
            summary: PropTypes.string.isRequired
        }).isRequired,
        technologies: PropTypes.shape({
            main: PropTypes.arrayOf(PropTypes.string).isRequired,
            additional: PropTypes.arrayOf(PropTypes.string)
        }).isRequired,
        url: PropTypes.string.isRequired
    }).isRequired,
    onReadMore: PropTypes.func.isRequired
};

export default ProjectCard;
