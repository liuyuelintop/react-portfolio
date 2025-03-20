import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ProjectCard = ({ project }) => {
    const [expanded, setExpanded] = useState(false);

    // 卡片悬停动画配置
    const cardVariants = {
        hover: {
            y: -8,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 10
            }
        }
    };

    // 图片缩放动画配置
    const imageVariants = {
        hover: {
            scale: 1.03,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            className="h-full"
            whileHover="hover"
            variants={cardVariants}
        >
            <div className="h-full bg-neutral-800/40 rounded-xl p-6 shadow-2xl shadow-purple-900/20 hover:shadow-purple-900/40 transition-all duration-300 flex flex-col space-y-6">

                {/* 图片区域 - 完全匹配图片中的尺寸比例 */}
                <motion.div
                    className="overflow-hidden rounded-lg relative group"
                    variants={imageVariants}
                >
                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block aspect-video"
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                </motion.div>

                {/* 内容区域 - 精确对应图片布局 */}
                <div className="flex-1 flex flex-col space-y-4">
                    {/* 标题 - 完全匹配图片紫色渐变效果 */}
                    <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        {project.title}
                    </h3>

                    {/* 描述区域 - 符合图片的三行文本布局 */}
                    <div className="flex-1">
                        <AnimatePresence initial={false}>
                            <motion.div
                                className="text-neutral-300 text-sm leading-relaxed"
                                initial={{ height: expanded ? "auto" : "4.5em" }}
                                animate={{
                                    height: expanded ? "auto" : "4.5em",
                                    transition: {
                                        duration: 0.4,
                                        ease: [0.16, 1, 0.3, 1]
                                    }
                                }}
                                exit={{ height: "4.5em" }}
                                style={{ overflow: 'hidden' }}
                            >
                                {/* 摘要文本 - 完全匹配图片中的两行显示 */}
                                <p className={expanded ? "" : "line-clamp-2"}>
                                    {project.description.summary}
                                </p>

                                {/* 功能列表 - 精确对应图片中的项目符号样式 */}
                                {expanded && (
                                    <motion.ul
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="mt-4 space-y-2 pl-2"
                                    >
                                        {project.description.features.map((feature, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start text-neutral-400 text-sm"
                                            >
                                                <span className="text-purple-400 mr-2 mt-1">▸</span>
                                                {feature}
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* 底部区域 - 完全匹配图片中的按钮和技术标签布局 */}
                    <div className="border-t border-neutral-700/50 pt-4">
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="text-purple-400 hover:text-purple-300 text-sm font-medium w-full flex justify-between items-center pb-3 transition-colors"
                        >
                            <span>{expanded ? "Show Less" : "Read More"}</span>
                            <span className="ml-2">{expanded ? "↑" : "→"}</span>
                        </button>

                        {/* 技术标签 - 精确对应图片中的标签样式 */}
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.main.map((tech) => (
                                <motion.span
                                    key={tech}
                                    className="px-3 py-1 bg-neutral-700/50 rounded-full text-xs font-medium text-purple-300 backdrop-blur-sm"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    {tech}
                                </motion.span>
                            ))}
                        </div>
                        {expanded && project.technologies.others.length > 0 && (
                            <div className="mt-2 text-xs text-neutral-500">
                                Also used: {project.technologies.others.join(' • ')}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ProjectCard;