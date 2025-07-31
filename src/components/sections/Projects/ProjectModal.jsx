import { motion, AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import { useTheme } from "../../../contexts/ThemeContext"
import { getThemeFocusRing } from "../../../utils/accessibility"
import OptimizedImage from "../../ui/common/OptimizedImage"
import Button from "../../ui/common/Button"
import LiveDemoPreview from "./LiveDemoPreview"

// Animation variants
const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { duration: 0.2, ease: "easeIn" },
  },
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const contentVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0.1, duration: 0.3 },
  },
}

export default function ProjectModal({ project, onClose }) {
  const { currentTheme } = useTheme()
  const [activeTab, setActiveTab] = useState("overview")
  const [showLivePreview, setShowLivePreview] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const modalRef = useRef(null)
  const contentRef = useRef(null)
  const firstFocusableRef = useRef(null)

  // Get theme-specific styles
  const getThemeStyles = () => {
    switch (currentTheme) {
      case "minimal":
        return {
          modal: "bg-white border-gray-200",
          header: "text-gray-900 border-gray-200",
          text: "text-gray-600",
          textSecondary: "text-gray-500",
          button: "bg-gray-100 hover:bg-gray-200 text-gray-700",
          buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
          badge: "bg-gray-100 text-gray-700 border-gray-200",
          divider: "border-gray-200",
          tab: "hover:bg-gray-100",
          tabActive: "bg-gray-100 text-gray-900",
        }
      case "neon":
        return {
          modal: "bg-black border-cyan-500/30",
          header: "text-white border-cyan-500/30",
          text: "text-gray-300",
          textSecondary: "text-gray-400",
          button: "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300",
          buttonPrimary: "bg-cyan-500 hover:bg-cyan-400 text-black",
          badge: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
          divider: "border-cyan-500/30",
          tab: "hover:bg-cyan-500/10",
          tabActive: "bg-cyan-500/20 text-cyan-300",
        }
      case "corporate":
        return {
          modal: "bg-slate-50 border-blue-200",
          header: "text-slate-900 border-blue-200",
          text: "text-slate-600",
          textSecondary: "text-slate-500",
          button: "bg-blue-50 hover:bg-blue-100 text-blue-700",
          buttonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
          badge: "bg-blue-50 text-blue-700 border-blue-200",
          divider: "border-blue-200",
          tab: "hover:bg-blue-50",
          tabActive: "bg-blue-50 text-blue-700",
        }
      default: // default theme
        return {
          modal: "bg-neutral-900 border-neutral-700",
          header: "text-white border-neutral-700",
          text: "text-neutral-300",
          textSecondary: "text-neutral-400",
          button: "bg-neutral-800 hover:bg-neutral-700 text-neutral-300",
          buttonPrimary: "bg-purple-600 hover:bg-purple-700 text-white",
          badge: "bg-purple-500/20 text-purple-300 border-purple-500/30",
          divider: "border-neutral-700",
          tab: "hover:bg-neutral-800",
          tabActive: "bg-neutral-800 text-white",
        }
    }
  }

  const styles = getThemeStyles()

  // Handle escape key and focus management
  useEffect(() => {
    if (!project) return

    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    document.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    // Focus first focusable element
    setTimeout(() => {
      firstFocusableRef.current?.focus()
    }, 100)

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [project, onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  // Determine available tabs based on project data
  const baseTabs = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "features", label: "Features", icon: "✨" },
    { id: "tech", label: "Tech Stack", icon: "⚡" },
  ]

  // Add live preview tab if project has URL
  const tabs = project?.url ? [...baseTabs, { id: "preview", label: "Live Preview", icon: "🚀" }] : baseTabs

  // Handle tab change - manage live preview state and scroll
  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    if (tabId === "preview") {
      setShowLivePreview(true)
    } else {
      setShowLivePreview(false)
    }
    // Scroll to top when changing tabs
    if (contentRef.current) {
      contentRef.current.scrollTop = 0
    }
  }

  // Handle scroll in content area to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (contentRef.current) {
        const { scrollTop } = contentRef.current
        setShowScrollTop(scrollTop > 200)
      }
    }

    const contentElement = contentRef.current
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll)
      return () => contentElement.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          ref={modalRef}
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`relative rounded-xl sm:rounded-2xl border shadow-2xl w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden ${styles.modal}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          {/* Header - Fixed position for mobile accessibility */}
          <div className={`sticky top-0 z-10 flex items-start justify-between p-4 sm:p-6 border-b ${styles.divider} ${styles.modal}`}>
            <div className="flex-1 min-w-0 pr-3">
              <h2
                id="modal-title"
                className={`text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 ${styles.header} line-clamp-2`}
              >
                {project.title}
              </h2>
              <p className={`text-xs sm:text-sm ${styles.textSecondary} line-clamp-2`}>{project.description.summary}</p>
            </div>
            <button
              ref={firstFocusableRef}
              onClick={onClose}
              className={`flex-shrink-0 p-2 rounded-lg transition-colors ${styles.button} ${getThemeFocusRing(currentTheme)}`}
              aria-label="Close project details"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Tabs - Sticky and scrollable on mobile */}
          <div className={`sticky top-[72px] sm:top-[88px] z-10 flex border-b ${styles.divider} ${styles.modal} overflow-x-auto scrollbar-hide`}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-shrink-0 px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${activeTab === tab.id ? styles.tabActive : `${styles.text} ${styles.tab}`
                  } ${getThemeFocusRing(currentTheme)}`}
                aria-selected={activeTab === tab.id}
                role="tab"
              >
                <span className="mr-1 sm:mr-2">{tab.icon}</span>
                <span className="hidden xs:inline sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area - Improved scroll behavior */}
          <div 
            ref={contentRef}
            className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-transparent"
          >
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              className="p-4 sm:p-6"
            >
              {activeTab === "overview" && (
                <div className="space-y-4 sm:space-y-6">
                  {/* Project Image */}
                  <div className="relative rounded-lg sm:rounded-xl overflow-hidden">
                    <OptimizedImage
                      src={project.image}
                      alt={project.title}
                      className="w-full aspect-video object-cover"
                    />
                    {project.url && (
                      <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-transform hover:scale-105 text-sm sm:text-base ${styles.buttonPrimary} ${getThemeFocusRing(currentTheme)}`}
                        >
                          <span className="mr-2">🚀</span>
                          View Live Project
                        </a>
                      </div>
                    )}
                  </div>

                  {/* Project Description */}
                  <div>
                    <h3 className={`text-base sm:text-lg font-semibold mb-2 sm:mb-3 ${styles.header}`}>
                      About This Project
                    </h3>
                    <p className={`text-sm sm:text-base leading-relaxed ${styles.text}`}>
                      {project.description.detailed || project.description.summary}
                    </p>
                  </div>

                  {/* Key Stats */}
                  {(project.stats || project.github || project.year) && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4">
                      {project.stats?.stars && (
                        <div className={`text-center p-3 sm:p-4 rounded-lg ${styles.button}`}>
                          <div className={`text-lg sm:text-2xl font-bold ${styles.header}`}>{project.stats.stars}</div>
                          <div className={`text-xs ${styles.textSecondary}`}>GitHub Stars</div>
                        </div>
                      )}
                      {project.stats?.forks && (
                        <div className={`text-center p-3 sm:p-4 rounded-lg ${styles.button}`}>
                          <div className={`text-lg sm:text-2xl font-bold ${styles.header}`}>{project.stats.forks}</div>
                          <div className={`text-xs ${styles.textSecondary}`}>Forks</div>
                        </div>
                      )}
                      {project.stats?.downloads && (
                        <div className={`text-center p-3 sm:p-4 rounded-lg ${styles.button}`}>
                          <div className={`text-lg sm:text-2xl font-bold ${styles.header}`}>
                            {project.stats.downloads}
                          </div>
                          <div className={`text-xs ${styles.textSecondary}`}>Downloads</div>
                        </div>
                      )}
                      {project.year && (
                        <div className={`text-center p-3 sm:p-4 rounded-lg ${styles.button}`}>
                          <div className={`text-lg sm:text-2xl font-bold ${styles.header}`}>{project.year}</div>
                          <div className={`text-xs ${styles.textSecondary}`}>Year Built</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {activeTab === "features" && (
                <div className="space-y-3 sm:space-y-4">
                  <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${styles.header}`}>
                    Key Features & Highlights
                  </h3>
                  <div className="grid gap-2 sm:gap-3">
                    {project.description.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 sm:p-4 rounded-lg border ${styles.button}`}
                      >
                        <div className="flex items-start gap-2 sm:gap-3">
                          <span
                            className={`text-xs sm:text-sm ${styles.buttonPrimary} px-2 py-1 rounded font-bold flex-shrink-0`}
                          >
                            {index + 1}
                          </span>
                          <p className={`flex-1 text-sm sm:text-base ${styles.text}`}>{feature}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "tech" && (
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <h3 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${styles.header}`}>
                      Primary Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {project.technologies.main.map((tech, index) => (
                        <motion.span
                          key={tech}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full border font-medium text-sm ${styles.badge}`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {project.technologies.additional && project.technologies.additional.length > 0 && (
                    <div>
                      <h4 className={`text-sm sm:text-base font-medium mb-2 sm:mb-3 ${styles.text}`}>
                        Additional Tools & Libraries
                      </h4>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {project.technologies.additional.map((tech, index) => (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + index * 0.03 }}
                            className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm border opacity-80 ${styles.badge}`}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.technologies.others && project.technologies.others.length > 0 && (
                    <div className={`text-xs sm:text-sm ${styles.textSecondary}`}>
                      <p>Also utilized: {project.technologies.others.join(" • ")}</p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "preview" && project.url && (
                <div className="space-y-3 sm:space-y-4">
                  <LiveDemoPreview
                    project={project}
                    isVisible={showLivePreview}
                    onClose={() => setShowLivePreview(false)}
                    embedded={true}
                  />
                </div>
              )}
            </motion.div>
          </div>

          {/* Footer Actions - Stack on mobile */}
          <div className={`p-4 sm:p-6 border-t ${styles.divider}`}>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {project.url && (
                <Button
                  variant="primary"
                  className="w-full sm:flex-1 text-sm sm:text-base"
                  onClick={() => window.open(project.url, "_blank", "noopener,noreferrer")}
                  aria-label={`Visit ${project.title} live site`}
                >
                  <span className="mr-2">🚀</span>
                  Visit Live Project
                </Button>
              )}
              {project.github && (
                <Button
                  variant="secondary"
                  className="w-full sm:flex-1 text-sm sm:text-base"
                  onClick={() => window.open(project.github, "_blank", "noopener,noreferrer")}
                  aria-label={`View ${project.title} source code`}
                >
                  <span className="mr-2">💻</span>
                  View Source
                </Button>
              )}
              <Button
                variant="ghost"
                onClick={onClose}
                className="w-full sm:w-auto sm:px-6 text-sm sm:text-base"
                aria-label="Close modal"
              >
                Close
              </Button>
            </div>
          </div>

          {/* Scroll to top button for mobile */}
          <AnimatePresence>
            {showScrollTop && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={scrollToTop}
                className={`
                  absolute bottom-4 right-4 p-3 rounded-full shadow-lg z-20
                  ${styles.buttonPrimary}
                  md:hidden
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label="Scroll to top"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

ProjectModal.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.shape({
      summary: PropTypes.string.isRequired,
      detailed: PropTypes.string,
      features: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    technologies: PropTypes.shape({
      main: PropTypes.arrayOf(PropTypes.string).isRequired,
      additional: PropTypes.arrayOf(PropTypes.string),
      others: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    url: PropTypes.string,
    github: PropTypes.string,
    year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    stats: PropTypes.shape({
      stars: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      forks: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      downloads: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }),
  onClose: PropTypes.func.isRequired,
}
