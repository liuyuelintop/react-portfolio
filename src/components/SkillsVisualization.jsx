import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

// Enhanced skills data with proficiency levels and categories
const SKILLS_DATA = {
  "Frontend Development": {
    icon: "🎨",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React/Next.js", level: 95, years: 3, projects: 15 },
      { name: "TypeScript", level: 90, years: 2, projects: 12 },
      { name: "Tailwind CSS", level: 92, years: 2, projects: 20 },
      { name: "Framer Motion", level: 85, years: 1, projects: 8 },
      { name: "JavaScript ES6+", level: 93, years: 4, projects: 25 },
    ]
  },
  "Backend Development": {
    icon: "⚙️",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 88, years: 3, projects: 18 },
      { name: "Express.js", level: 85, years: 3, projects: 15 },
      { name: "MongoDB", level: 82, years: 2, projects: 12 },
      { name: "PostgreSQL", level: 78, years: 2, projects: 10 },
      { name: "GraphQL", level: 75, years: 1, projects: 6 },
    ]
  },
  "AI & Machine Learning": {
    icon: "🤖",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "LangChain", level: 85, years: 1, projects: 5 },
      { name: "OpenAI API", level: 88, years: 1, projects: 8 },
      { name: "Vector Databases", level: 80, years: 1, projects: 4 },
      { name: "RAG Systems", level: 82, years: 1, projects: 6 },
      { name: "Python", level: 75, years: 2, projects: 10 },
    ]
  },
  "Cloud & DevOps": {
    icon: "☁️",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "AWS", level: 78, years: 2, projects: 12 },
      { name: "Vercel", level: 92, years: 2, projects: 25 },
      { name: "Docker", level: 80, years: 2, projects: 8 },
      { name: "CI/CD", level: 85, years: 2, projects: 15 },
      { name: "Git", level: 95, years: 4, projects: 30 },
    ]
  }
};

const SkillBar = ({ skill, index, isVisible, theme }) => {
  const [animatedLevel, setAnimatedLevel] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedLevel(skill.level);
      }, index * 100);
      return () => clearTimeout(timer);
    }
  }, [isVisible, skill.level, index]);

  const getSkillLevel = (level) => {
    if (level >= 90) return { text: "Expert", color: "text-green-400" };
    if (level >= 80) return { text: "Advanced", color: "text-blue-400" };
    if (level >= 70) return { text: "Intermediate", color: "text-yellow-400" };
    return { text: "Learning", color: "text-purple-400" };
  };

  const skillLevel = getSkillLevel(skill.level);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }}
      className="group"
    >
      {/* Skill Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <span className={`font-semibold ${
            theme.currentTheme === 'minimal' ? 'text-gray-800' : 'text-white'
          }`}>
            {skill.name}
          </span>
          <span className={`text-xs px-2 py-1 rounded-full ${skillLevel.color} bg-opacity-20`}>
            {skillLevel.text}
          </span>
        </div>
        <span className={`text-sm font-mono ${
          theme.currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
        }`}>
          {animatedLevel}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className={`relative h-2 rounded-full overflow-hidden ${
        theme.currentTheme === 'minimal' ? 'bg-gray-200' : 'bg-neutral-700'
      }`}>
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ width: "0%" }}
          animate={{ width: `${animatedLevel}%` }}
          transition={{ 
            duration: 1.5,
            delay: index * 0.1,
            ease: "easeOut"
          }}
        />
        
        {/* Glow effect */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 blur-sm opacity-60"
          initial={{ width: "0%" }}
          animate={{ width: `${animatedLevel}%` }}
          transition={{ 
            duration: 1.5,
            delay: index * 0.1,
            ease: "easeOut"
          }}
        />
      </div>

      {/* Skill Details on Hover */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: 0, 
          height: 0,
        }}
        whileHover={{ 
          opacity: 1, 
          height: "auto",
          transition: { duration: 0.2 }
        }}
        className={`mt-2 text-xs ${
          theme.currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-500'
        } overflow-hidden`}
      >
        <div className="flex gap-4">
          <span>📅 {skill.years} years</span>
          <span>🚀 {skill.projects} projects</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CategoryCard = ({ category, data, index, activeCategory, setActiveCategory, theme }) => {
  const isActive = activeCategory === category;
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: index * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }}
      className={`
        relative rounded-xl p-6 cursor-pointer transition-all duration-300
        ${theme.currentTheme === 'minimal' 
          ? 'bg-white border border-gray-200 hover:border-gray-300' 
          : 'bg-neutral-800/50 border border-neutral-700/50 hover:border-neutral-600/50'
        }
        ${isActive ? 'ring-2 ring-purple-500 ring-opacity-50' : ''}
      `}
      onClick={() => setActiveCategory(isActive ? null : category)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Category Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{data.icon}</span>
          <h3 className={`text-lg font-bold ${
            theme.currentTheme === 'minimal' ? 'text-gray-800' : 'text-white'
          }`}>
            {category}
          </h3>
        </div>
        
        <motion.div
          animate={{ rotate: isActive ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`text-sm ${
            theme.currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-400'
          }`}
        >
          ▼
        </motion.div>
      </div>

      {/* Skills Overview */}
      <div className="flex flex-wrap gap-2 mb-4">
        {data.skills.slice(0, 3).map((skill) => (
          <span
            key={skill.name}
            className={`text-xs px-2 py-1 rounded-full ${
              theme.currentTheme === 'minimal'
                ? 'bg-gray-100 text-gray-600'
                : 'bg-neutral-700 text-neutral-300'
            }`}
          >
            {skill.name}
          </span>
        ))}
        {data.skills.length > 3 && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            theme.currentTheme === 'minimal'
              ? 'bg-gray-100 text-gray-500'
              : 'bg-neutral-700 text-neutral-400'
          }`}>
            +{data.skills.length - 3} more
          </span>
        )}
      </div>

      {/* Expanded Skills */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            <div className={`w-full h-px ${
              theme.currentTheme === 'minimal' ? 'bg-gray-200' : 'bg-neutral-700'
            }`} />
            
            {data.skills.map((skill, skillIndex) => (
              <SkillBar
                key={skill.name}
                skill={skill}
                index={skillIndex}
                isVisible={isActive}
                theme={theme}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Glow */}
      <div className={`
        absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10
        bg-gradient-to-r ${data.color} blur-xl
      `} style={{ filter: 'blur(20px)' }} />
    </motion.div>
  );
};

export default function SkillsVisualization() {
  const [activeCategory, setActiveCategory] = useState(null);
  const theme = useTheme();

  return (
    <section className="max-w-6xl mx-auto py-16 px-4 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className={`text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent`}>
          Skills & Expertise
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${
          theme.currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
        }`}>
          Interactive visualization of my technical skills, experience levels, and project involvement.
          Click on any category to explore detailed proficiency levels.
        </p>
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(SKILLS_DATA).map(([category, data], index) => (
          <CategoryCard
            key={category}
            category={category}
            data={data}
            index={index}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            theme={theme}
          />
        ))}
      </div>

      {/* Quick Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          { label: "Years Experience", value: "4+", icon: "📅" },
          { label: "Projects Built", value: "50+", icon: "🚀" },
          { label: "Technologies", value: "20+", icon: "⚡" },
          { label: "Certifications", value: "5+", icon: "🏆" },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.05, y: -5 }}
            className={`
              text-center p-4 rounded-xl transition-all duration-300
              ${theme.currentTheme === 'minimal'
                ? 'bg-white border border-gray-200'
                : 'bg-neutral-800/30 border border-neutral-700/30'
              }
            `}
          >
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className={`text-2xl font-bold ${
              theme.currentTheme === 'minimal' ? 'text-gray-800' : 'text-white'
            }`}>
              {stat.value}
            </div>
            <div className={`text-sm ${
              theme.currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
            }`}>
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}