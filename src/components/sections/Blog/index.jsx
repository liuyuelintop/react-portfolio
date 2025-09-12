import { motion, AnimatePresence } from "framer-motion";
import BlogCard from "./BlogCard";
import useBlogPosts from "../../../hooks/useBlogPosts";
import { BLOG_CONFIG } from "../../../constants/blog";
import { useTheme } from "../../../contexts/ThemeContext";
import SectionHeading from "../../ui/common/SectionHeading";

// Animation variants for the grid container
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            duration: 0.6
        }
    }
};

// Loading skeleton component
const BlogCardSkeleton = ({ theme }) => (
    <div className={`
        rounded-xl p-6 border animate-pulse h-full
        ${theme === 'minimal'
            ? 'bg-gray-100 border-gray-200'
            : 'bg-neutral-700/30 border-neutral-700'
        }
    `} style={{ minHeight: "380px" }}>
        <div className="flex justify-between items-start mb-4">
            <div className={`h-6 w-20 rounded-full ${
                theme === 'minimal' ? 'bg-gray-200' : 'bg-neutral-600'
            }`} />
            <div className={`h-4 w-4 rounded ${
                theme === 'minimal' ? 'bg-gray-200' : 'bg-neutral-600'
            }`} />
        </div>
        <div className={`h-6 rounded mb-3 ${
            theme === 'minimal' ? 'bg-gray-200' : 'bg-neutral-600'
        } w-4/5`} />
        <div className="space-y-2 mb-4 flex-1">
            <div className={`h-4 rounded ${
                theme === 'minimal' ? 'bg-gray-200' : 'bg-neutral-600'
            }`} />
            <div className={`h-4 rounded ${
                theme === 'minimal' ? 'bg-gray-200' : 'bg-neutral-600'
            } w-3/4`} />
            <div className={`h-4 rounded ${
                theme === 'minimal' ? 'bg-gray-200' : 'bg-neutral-600'
            } w-5/6`} />
        </div>
        <div className="flex gap-2 mb-4">
            {[1, 2, 3].map(i => (
                <div key={i} className={`h-6 w-16 rounded ${
                    theme === 'minimal' ? 'bg-gray-200' : 'bg-neutral-600'
                }`} />
            ))}
        </div>
        <div className={`h-10 rounded-lg mt-auto ${
            theme === 'minimal' ? 'bg-gray-200' : 'bg-neutral-600'
        }`} />
    </div>
);

// Error state component
const ErrorState = ({ error, onRetry, theme }) => (
    <div className="col-span-full text-center py-12">
        <div className="text-4xl mb-4">
            {error.includes('CORS') ? '🔒' : error.includes('Network') ? '🌐' : '📝'}
        </div>
        <h3 className={`text-lg font-bold mb-2 ${
            theme === 'minimal' ? 'text-gray-800' : 'text-white'
        }`}>
            {error.includes('CORS') ? 'CORS Configuration Needed' : 
             error.includes('Network') ? 'Blog Server Connection Failed' : 
             'Blog Posts Temporarily Unavailable'}
        </h3>
        <p className={`text-sm mb-4 max-w-lg mx-auto ${
            theme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
        }`}>
            {error}
        </p>
        <motion.button
            onClick={onRetry}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`
                px-6 py-3 rounded-lg text-sm font-medium transition-colors
                ${theme === 'minimal'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-purple-500 hover:bg-purple-400 text-white'
                }
            `}
        >
            Try Again
        </motion.button>
    </div>
);

// Empty state component
const EmptyState = ({ theme }) => (
    <div className="col-span-full text-center py-12">
        <div className="text-4xl mb-4">✍️</div>
        <h3 className={`text-lg font-bold mb-2 ${
            theme === 'minimal' ? 'text-gray-800' : 'text-white'
        }`}>
            Blog Coming Soon
        </h3>
        <p className={`text-sm ${
            theme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
        }`}>
            I'm working on some exciting content. Check back soon!
        </p>
    </div>
);


export default function Blog() {
    const { currentTheme } = useTheme();
    const { posts, loading, error, retry, lastUpdated } = useBlogPosts({
        limit: BLOG_CONFIG.defaultLimit
    });

    return (
        <section className="max-w-7xl mx-auto py-16 px-4 lg:px-8" id="blog">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <div className="flex items-center justify-center gap-4">
                    <SectionHeading level="section">
                        Latest from My Blog
                    </SectionHeading>
                    <motion.a
                        href="https://blog.liuyuelin.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className={`text-sm underline ${
                            currentTheme === 'minimal' ? 'text-gray-600 hover:text-gray-800' : 'text-neutral-400 hover:text-neutral-200'
                        } transition-colors`}
                    >
                        View all →
                    </motion.a>
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className={`text-lg max-w-2xl mx-auto mb-4 ${
                        currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
                    }`}
                >
                    Insights on web development, AI integration, and building modern applications.
                    Fresh perspectives from hands-on experience.
                </motion.p>
                {lastUpdated && !loading && (
                    <p className={`text-sm ${
                        currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-500'
                    }`}>
                        Last updated: {lastUpdated.toLocaleTimeString()}
                    </p>
                )}
            </motion.div>


            {/* Blog Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 mb-12"
            >
                {loading && (
                    <>
                        {[...Array(BLOG_CONFIG.initialVisible)].map((_, index) => (
                            <BlogCardSkeleton key={index} theme={currentTheme} />
                        ))}
                    </>
                )}

                {error && !posts.length && (
                    <ErrorState 
                        error={error} 
                        onRetry={retry} 
                        theme={currentTheme} 
                    />
                )}

                {!loading && !error && posts.length === 0 && (
                    <EmptyState theme={currentTheme} />
                )}

                {!loading && posts.length > 0 && (
                    <AnimatePresence>
                        {posts.map((post, index) => (
                            <BlogCard
                                key={post.slug}
                                post={post}
                                index={index}
                            />
                        ))}
                    </AnimatePresence>
                )}
            </motion.div>

        </section>
    );
}