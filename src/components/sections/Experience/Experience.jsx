import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EXPERIENCES } from "../../../constants/experiences";
import { useTheme } from "../../../contexts/ThemeContext";
import SectionHeading from "../../ui/common/SectionHeading";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Experience card component
const ExperienceCard = ({ experience, index, isExpanded, onToggle, theme }) => {
  const isCurrentRole = experience.period.includes("Present");
  
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, scale: 1.01 }}
      className={`relative rounded-2xl p-6 md:p-8 border transition-all duration-300 cursor-pointer group ${
        theme === 'minimal'
          ? 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-xl shadow-lg'
          : 'bg-neutral-800/50 border-neutral-700 hover:border-neutral-600 hover:shadow-2xl shadow-xl shadow-black/10'
      }`}
      onClick={onToggle}
    >
      {isCurrentRole && (
        <div className="absolute -top-3 -right-3">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
            theme === 'minimal'
              ? 'bg-green-100 text-green-700 border border-green-200'
              : 'bg-green-900/30 text-green-400 border border-green-500/30'
          }`}>
            Current Role
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div className="flex-1">
          <h3 className={`text-xl md:text-2xl font-bold mb-2 ${
            theme === 'minimal' ? 'text-gray-900' : 'text-white'
          }`}>
            {experience.role}
          </h3>
          
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
            <a
              href={experience.company.url}
              onClick={(e) => e.stopPropagation()}
              className={`text-lg font-semibold transition-colors ${
                theme === 'minimal'
                  ? 'text-blue-600 hover:text-blue-700'
                  : 'text-blue-400 hover:text-blue-300'
              }`}
            >
              @{experience.company.name}
            </a>
            
            {experience.type && (
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                theme === 'minimal'
                  ? 'bg-gray-100 text-gray-700'
                  : 'bg-neutral-700 text-neutral-300'
              }`}>
                {experience.type}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <span className={`text-sm font-medium px-3 py-1 rounded-full ${
            theme === 'minimal'
              ? 'bg-gray-100 text-gray-700'
              : 'bg-neutral-700/50 text-neutral-300'
          }`}>
            {experience.period}
          </span>
          
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className={`text-sm ${
              theme === 'minimal' ? 'text-gray-500' : 'text-neutral-400'
            }`}
          >
            ▼
          </motion.div>
        </div>
      </div>

      {/* Key Highlights Preview */}
      <div className="mb-6">
        <p className={`text-sm md:text-base leading-relaxed ${
          theme === 'minimal' ? 'text-gray-700' : 'text-neutral-300'
        }`}>
          {experience.highlights[0]}
        </p>
        
        {experience.highlights.length > 1 && (
          <p className={`text-sm mt-2 ${
            theme === 'minimal' ? 'text-gray-500' : 'text-neutral-400'
          }`}>
            +{experience.highlights.length - 1} more achievements
          </p>
        )}
      </div>

      {/* Tech Stack Preview */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(experience.techStack)
          .slice(0, 2)
          .map(([category, technologies]) => 
            technologies.slice(0, 3).map((tech, techIndex) => (
              <span
                key={`${category}-${techIndex}`}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  theme === 'minimal'
                    ? 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    : 'bg-neutral-700/50 text-neutral-300 hover:bg-neutral-600/50'
                }`}
              >
                {tech}
              </span>
            ))
          )}
        
        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
          theme === 'minimal'
            ? 'bg-gray-100 text-gray-500'
            : 'bg-neutral-700/30 text-neutral-400'
        }`}>
          +more
        </span>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 pt-6 border-t border-gray-200 dark:border-neutral-700"
          >
            {/* All Highlights */}
            <div className="mb-6">
              <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${
                theme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
              }`}>
                Key Achievements
              </h4>
              
              <ul className="space-y-3">
                {experience.highlights.map((highlight, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-start text-sm md:text-base leading-relaxed ${
                      theme === 'minimal' ? 'text-gray-700' : 'text-neutral-300'
                    }`}
                  >
                    <span className={`mr-3 mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      theme === 'minimal' ? 'bg-gray-400' : 'bg-purple-400'
                    }`} />
                    {highlight}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Complete Tech Stack */}
            <div>
              <h4 className={`text-sm font-semibold mb-4 uppercase tracking-wider ${
                theme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
              }`}>
                Technology Stack
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(experience.techStack).map(([category, technologies]) => (
                  <div key={category} className="space-y-2">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${
                      theme === 'minimal' ? 'text-gray-600' : 'text-purple-400/80'
                    }`}>
                      {category}
                    </span>
                    
                    <div className="flex flex-wrap gap-1.5">
                      {technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                            theme === 'minimal'
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-neutral-700/50 text-purple-300 hover:bg-purple-400/10'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Experience() {
  const { currentTheme } = useTheme();
  const [expandedCard, setExpandedCard] = useState(null);

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section className="max-w-6xl mx-auto py-12 px-4 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <SectionHeading level="section">
          Professional Experience
        </SectionHeading>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className={`text-lg max-w-2xl mx-auto ${
            currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
          }`}
        >
          My journey through full-stack development, from graduate roles to senior engineering positions.
          Click on any experience to explore detailed achievements and technologies.
        </motion.p>
      </div>

      {/* Experience Cards */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {EXPERIENCES.map((experience, index) => (
          <ExperienceCard
            key={index}
            experience={experience}
            index={index}
            isExpanded={expandedCard === index}
            onToggle={() => toggleCard(index)}
            theme={currentTheme}
          />
        ))}
      </motion.div>
    </section>
  );
}