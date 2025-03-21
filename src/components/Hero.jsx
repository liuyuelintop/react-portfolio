import { motion } from "framer-motion";
import { HERO_CONTENT, CONTACT } from "../constants/constants";
import { generalImages } from "../constants/assets";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { FiGithub, FiLinkedin, FiExternalLink } from "react-icons/fi";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20
        }
    }
};

export default function Hero() {
    return (
        <section className="mt-8 relative py-16 md:py-24 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24"
                >
                    {/* Profile Section - Enhanced Design */}
                    <motion.div
                        variants={itemVariants}
                        className="relative group flex-1 max-w-md order-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-500/10 blur-xl rounded-[2.5rem] -z-10" />
                        <div className="overflow-hidden rounded-[2.5rem] border-2 border-purple-900/50 group-hover:border-purple-400/30 transition-all duration-300 shadow-2xl shadow-purple-900/20 ">
                            <img
                                src={generalImages.profilePic}
                                alt="Yuelin Liu"
                                className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-300"
                            />
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="flex-1 space-y-6 order-2">
                        <motion.h1
                            variants={itemVariants}
                            className="text-3xl md:text-5xl text-white font-bold drop-shadow-[0_4px_12px_rgba(255,255,255,0.25)]"
                        >
                            Yuelin Liu
                        </motion.h1>

                        <motion.div variants={itemVariants} className="space-y-8">
                            <div className="space-y-4">
                                <h2 className="text-xl md:text-2xl text-purple-300 font-medium">
                                    Full Stack Developer
                                </h2>

                                <p className="text-lg text-neutral-300 leading-relaxed max-w-2xl">
                                    {HERO_CONTENT.summary}
                                </p>
                            </div>
                            {/* 新增社交链接按钮组 */}
                            <motion.div
                                variants={itemVariants}
                                className="flex gap-4 mt-6"
                            >
                                <a
                                    href={CONTACT.socials.github}
                                    target="_blank"
                                    className="p-3 rounded-xl bg-neutral-900/50 border border-purple-900/30 hover:border-purple-400/50 transition-colors flex items-center gap-2"
                                >
                                    <FiGithub className="h-6 w-6 text-purple-400" />
                                    <span className="text-purple-300 text-sm">GitHub</span>
                                </a>

                                <a
                                    href={CONTACT.socials.linkedin}
                                    target="_blank"
                                    className="p-3 rounded-xl bg-neutral-900/50 border border-purple-900/30 hover:border-purple-400/50 transition-colors flex items-center gap-2"
                                >
                                    <FiLinkedin className="h-6 w-6 text-purple-400" />
                                    <span className="text-purple-300 text-sm">LinkedIn</span>
                                </a>

                                <a
                                    href={CONTACT.socials.blog}
                                    target="_blank"
                                    className="p-3 rounded-xl bg-neutral-900/50 border border-purple-900/30 hover:border-purple-400/50 transition-colors flex items-center gap-2"
                                >
                                    <FiExternalLink className="h-6 w-6 text-purple-400" />
                                    <span className="text-purple-300 text-sm">Blog</span>
                                </a>
                            </motion.div>

                            {/* Skills Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {HERO_CONTENT.highlights.map((skill, index) => (
                                    <motion.div
                                        key={skill}
                                        variants={itemVariants}
                                        className="group p-3 rounded-xl bg-neutral-900/50 border border-purple-900/30 hover:border-purple-400/50 transition-colors"
                                    >
                                        <span className="text-purple-300 text-sm md:text-base group-hover:text-purple-400">
                                            {skill}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Contact Info */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col gap-4 text-neutral-300"
                            >
                                <a
                                    href={`mailto:${CONTACT.email}`}
                                    className="flex items-center gap-3 hover:text-purple-300 transition-colors"
                                >
                                    <EnvelopeIcon className="h-6 w-6 text-purple-400" />
                                    <span className="truncate">{CONTACT.email}</span>
                                </a>
                                <a
                                    href={`tel:${CONTACT.phoneNo}`}
                                    className="flex items-center gap-3 hover:text-purple-300 transition-colors"
                                >
                                    <PhoneIcon className="h-6 w-6 text-purple-400" />
                                    <span>{CONTACT.phoneNo}</span>
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}