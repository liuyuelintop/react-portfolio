import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTACT } from "../../../constants/constants";
import { useTheme } from "../../../contexts/ThemeContext";
import ProfessionalContactForm from "./ProfessionalContactForm";
import SectionHeading from "../../ui/common/SectionHeading";

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
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 120,
            damping: 20
        }
    }
};

export default function Contact() {
    const [activeTab, setActiveTab] = useState('info');
    const theme = useTheme();

    return (
        <section key={activeTab} className={`py-16 md:py-20 px-4 md:px-8 `}>
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Header */}
                    <motion.div variants={itemVariants}>
                        <SectionHeading level="section">
                            Get in Touch
                        </SectionHeading>
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className={`text-lg text-center mb-12 max-w-2xl mx-auto ${theme.currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
                            }`}
                    >
                        Ready to bring your ideas to life? Let&apos;s discuss your project and explore how we can work together.
                    </motion.p>

                    {/* Tab Navigation */}
                    <motion.div
                        variants={itemVariants}
                        className="flex justify-center mb-12"
                    >
                        <div className={`
                            flex rounded-lg p-1 
                            ${theme.currentTheme === 'minimal'
                                ? 'bg-white border border-gray-200'
                                : 'bg-neutral-900/50 border border-neutral-700'
                            }
                        `}>
                            {[
                                { id: 'info', label: 'Contact Info', icon: '📍' },
                                { id: 'form', label: 'Send Message', icon: '📧' }
                            ].map((tab) => (
                                <motion.button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`
                                        relative px-6 py-3 rounded-lg font-medium text-sm transition-all duration-200
                                        ${activeTab === tab.id
                                            ? theme.currentTheme === 'minimal'
                                                ? 'bg-gray-900 text-white'
                                                : 'bg-purple-500 text-white'
                                            : theme.currentTheme === 'minimal'
                                                ? 'text-gray-600 hover:text-gray-900'
                                                : 'text-neutral-400 hover:text-white'
                                        }
                                    `}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            {activeTab === 'info' && (
                                <motion.div
                                    key="contact-info"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Contact Info */}
                                    <div className="max-w-4xl mx-auto">
                                        <div className={`
                                            rounded-2xl p-8 shadow-xl border
                                            ${theme.currentTheme === 'minimal'
                                                ? 'bg-white border-gray-200 shadow-gray-100'
                                                : 'bg-neutral-900/50 border-neutral-800 shadow-purple-900/20'
                                            }
                                        `}>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                                {/* Address */}
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="text-center md:text-left"
                                                >
                                                    <div className={`
                                                        w-12 h-12 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4
                                                        ${theme.currentTheme === 'minimal'
                                                            ? 'bg-gray-100 text-gray-600'
                                                            : 'bg-neutral-800 text-purple-400'
                                                        }
                                                    `}>
                                                        📍
                                                    </div>
                                                    <h3 className={`font-semibold mb-2 ${theme.currentTheme === 'minimal' ? 'text-gray-900' : 'text-white'
                                                        }`}>
                                                        Address
                                                    </h3>
                                                    <p className={`text-sm leading-relaxed ${theme.currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-300'
                                                        }`}>
                                                        {CONTACT.address}
                                                    </p>
                                                </motion.div>

                                                {/* Phone */}
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="text-center md:text-left"
                                                >
                                                    <div className={`
                                                        w-12 h-12 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4
                                                        ${theme.currentTheme === 'minimal'
                                                            ? 'bg-gray-100 text-gray-600'
                                                            : 'bg-neutral-800 text-purple-400'
                                                        }
                                                    `}>
                                                        📞
                                                    </div>
                                                    <h3 className={`font-semibold mb-2 ${theme.currentTheme === 'minimal' ? 'text-gray-900' : 'text-white'
                                                        }`}>
                                                        Phone
                                                    </h3>
                                                    <a
                                                        href={`tel:${CONTACT.phoneNo}`}
                                                        className={`text-sm hover:underline ${theme.currentTheme === 'minimal'
                                                            ? 'text-gray-600 hover:text-gray-900'
                                                            : 'text-neutral-300 hover:text-white'
                                                            }`}
                                                    >
                                                        {CONTACT.phoneNo}
                                                    </a>
                                                </motion.div>

                                                {/* Email */}
                                                <motion.div
                                                    variants={itemVariants}
                                                    className="text-center md:text-left"
                                                >
                                                    <div className={`
                                                        w-12 h-12 rounded-full flex items-center justify-center mx-auto md:mx-0 mb-4
                                                        ${theme.currentTheme === 'minimal'
                                                            ? 'bg-gray-100 text-gray-600'
                                                            : 'bg-neutral-800 text-purple-400'
                                                        }
                                                    `}>
                                                        📧
                                                    </div>
                                                    <h3 className={`font-semibold mb-2 ${theme.currentTheme === 'minimal' ? 'text-gray-900' : 'text-white'
                                                        }`}>
                                                        Email
                                                    </h3>
                                                    <a
                                                        href={`mailto:${CONTACT.email}`}
                                                        className={`text-sm hover:underline break-all ${theme.currentTheme === 'minimal'
                                                            ? 'text-gray-600 hover:text-gray-900'
                                                            : 'text-neutral-300 hover:text-white'
                                                            }`}
                                                    >
                                                        {CONTACT.email}
                                                    </a>
                                                </motion.div>
                                            </div>

                                            {/* Quick Actions */}
                                            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-neutral-800/20">
                                                <motion.a
                                                    href={`mailto:${CONTACT.email}`}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`
                                                        flex-1 text-center py-3 px-6 rounded-lg font-medium transition-colors
                                                        ${theme.currentTheme === 'minimal'
                                                            ? 'bg-gray-900 hover:bg-gray-800 text-white'
                                                            : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white'
                                                        }
                                                    `}
                                                >
                                                    📧 Send Quick Email
                                                </motion.a>

                                                <motion.button
                                                    onClick={() => setActiveTab('form')}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className={`
                                                        flex-1 text-center py-3 px-6 rounded-lg font-medium border transition-colors
                                                        ${theme.currentTheme === 'minimal'
                                                            ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
                                                            : 'border-neutral-600 hover:bg-neutral-700 text-neutral-300'
                                                        }
                                                    `}
                                                >
                                                    📝 Use Contact Form
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeTab === 'form' && (
                                <motion.div
                                    key="contact-form"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ProfessionalContactForm />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}