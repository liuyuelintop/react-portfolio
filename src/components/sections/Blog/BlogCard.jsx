import { motion } from "framer-motion";
import { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "../../../contexts/ThemeContext";
import { getThemeFocusRing } from "../../../utils/accessibility";

// Animation variants consistent with ProjectCard
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

const BlogCard = ({ post, index }) => {
    const { currentTheme } = useTheme();
    const [showAllTags, setShowAllTags] = useState(false);

    const handleTagsToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowAllTags(prev => !prev);
    };

    const handleCardClick = () => {
        window.open(post.canonicalUrl, '_blank', 'noopener,noreferrer');
    };

    // Get theme-specific colors and styles
    const getCardStyles = () => {
        switch (currentTheme) {
            case 'minimal':
                return {
                    card: 'bg-white border-gray-200 shadow-lg hover:shadow-xl hover:border-gray-300',
                    title: 'text-gray-900',
                    description: 'text-gray-600',
                    date: 'bg-blue-50 text-blue-700 border-blue-200',
                    tagBadge: 'bg-gray-100 text-gray-700 border-gray-200',
                    tagButton: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
                    readButton: 'bg-blue-600 hover:bg-blue-700 text-white',
                    link: 'text-blue-600 hover:text-blue-700'
                };
            case 'neon':
                return {
                    card: 'bg-black border-cyan-500/30 shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30 hover:border-cyan-400/50',
                    title: 'text-white',
                    description: 'text-gray-300',
                    date: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
                    tagBadge: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
                    tagButton: 'bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300',
                    readButton: 'bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white',
                    link: 'text-cyan-400 hover:text-cyan-300'
                };
            case 'corporate':
                return {
                    card: 'bg-slate-50 border-blue-200 shadow-lg hover:shadow-xl hover:border-blue-300',
                    title: 'text-slate-900',
                    description: 'text-slate-600',
                    date: 'bg-blue-50 text-blue-700 border-blue-200',
                    tagBadge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
                    tagButton: 'bg-blue-50 hover:bg-blue-100 text-blue-700',
                    readButton: 'bg-blue-600 hover:bg-blue-700 text-white',
                    link: 'text-blue-600 hover:text-blue-700'
                };
            default: // default theme
                return {
                    card: 'bg-neutral-800 border-neutral-700 shadow-lg hover:shadow-2xl hover:border-neutral-600 shadow-black/20',
                    title: 'text-white',
                    description: 'text-neutral-300',
                    date: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
                    tagBadge: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
                    tagButton: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300',
                    readButton: 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white',
                    link: 'text-purple-400 hover:text-purple-300'
                };
        }
    };

    const styles = getCardStyles();
    const maxTagsVisible = 3;
    const visibleTags = showAllTags ? post.tags : post.tags?.slice(0, maxTagsVisible) || [];
    const hasMoreTags = post.tags && post.tags.length > maxTagsVisible;

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
            className="relative h-full group"
        >
            <motion.div
                variants={hoverVariants}
                initial="rest"
                whileHover="hover"
                className="h-full cursor-pointer"
                onClick={handleCardClick}
            >
                <article className={`rounded-xl p-6 border flex flex-col h-full transition-all duration-300 ${styles.card}`}
                         style={{ minHeight: "380px" }}>
                    
                    {/* Date Badge */}
                    <div className="flex justify-between items-start mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${styles.date}`}>
                            {post.formattedDate}
                        </span>
                        <div className="flex items-center gap-2">
                            <span className="text-xs opacity-60">📖</span>
                        </div>
                    </div>

                    {/* Blog Title */}
                    <h3 className={`text-xl font-bold mb-3 line-clamp-2 ${styles.title}`}>
                        {post.title}
                    </h3>

                    {/* Blog Description/Excerpt */}
                    <p className={`text-sm mb-4 flex-1 line-clamp-3 ${styles.description}`}>
                        {post.excerpt || post.description}
                    </p>

                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="mb-4">
                            <div className="flex flex-wrap gap-2 mb-2">
                                {visibleTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className={`px-2 py-1 rounded text-xs border ${styles.tagBadge}`}
                                    >
                                        {tag}
                                    </span>
                                ))}
                                {hasMoreTags && !showAllTags && (
                                    <button
                                        onClick={handleTagsToggle}
                                        className={`px-2 py-1 rounded text-xs border transition-colors ${styles.tagButton} ${getThemeFocusRing(currentTheme)}`}
                                        aria-label="View all tags"
                                    >
                                        +{post.tags.length - maxTagsVisible} more
                                    </button>
                                )}
                                {showAllTags && hasMoreTags && (
                                    <button
                                        onClick={handleTagsToggle}
                                        className={`px-2 py-1 rounded text-xs border transition-colors ${styles.tagButton} ${getThemeFocusRing(currentTheme)}`}
                                        aria-label="Show fewer tags"
                                    >
                                        Show less
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Read More Button */}
                    <div className="mt-auto">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${styles.readButton} ${getThemeFocusRing(currentTheme)}`}
                            aria-label={`Read full article: ${post.title}`}
                        >
                            Read Full Article →
                        </motion.button>
                    </div>
                </article>
            </motion.div>

            {/* Hover effect indicator */}
            <div className={`
                absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none
                ${currentTheme === 'minimal' ? 'text-gray-400' : 'text-neutral-500'}
            `}>
                <span className="text-xs">↗</span>
            </div>
        </motion.div>
    );
};

BlogCard.propTypes = {
    post: PropTypes.shape({
        slug: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        excerpt: PropTypes.string,
        date: PropTypes.string.isRequired,
        formattedDate: PropTypes.string.isRequired,
        tags: PropTypes.arrayOf(PropTypes.string),
        canonicalUrl: PropTypes.string.isRequired
    }).isRequired,
    index: PropTypes.number
};

BlogCard.defaultProps = {
    index: 0
};

export default BlogCard;