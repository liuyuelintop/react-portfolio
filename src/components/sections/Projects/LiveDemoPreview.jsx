import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "../../../contexts/ThemeContext"
import { detectProjectType, getPreviewOptions, PROJECT_TYPES } from "./ProjectPreviewDetector"
import AlternativePreview from "./AlternativePreview"

const DEMO_STATES = {
  LOADING: "loading",
  LOADED: "loaded",
  ERROR: "error",
}

const LoadingSpinner = ({ theme }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      className={`w-6 h-6 sm:w-8 sm:h-8 border-2 border-t-transparent rounded-full mb-3 sm:mb-4 ${theme.currentTheme === "minimal" ? "border-gray-400" : "border-purple-400"
        }`}
    />
    <p className={`text-xs sm:text-sm ${theme.currentTheme === "minimal" ? "text-gray-600" : "text-neutral-400"}`}>
      Loading live demo...
    </p>
  </div>
)

const ErrorState = ({ onRetry, theme }) => (
  <div className="flex flex-col items-center justify-center h-full p-4 sm:p-6">
    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⚠️</div>
    <p
      className={`text-xs sm:text-sm mb-3 sm:mb-4 text-center ${theme.currentTheme === "minimal" ? "text-gray-600" : "text-neutral-400"
        }`}
    >
      Unable to load preview. This might be due to security restrictions.
    </p>
    <div className="flex gap-2">
      <motion.button
        onClick={onRetry}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${theme.currentTheme === "minimal"
          ? "bg-gray-200 hover:bg-gray-300 text-gray-800"
          : "bg-neutral-700 hover:bg-neutral-600 text-white"
          }`}
      >
        Retry
      </motion.button>
    </div>
  </div>
)

const DeviceFrame = ({ children, device = "desktop", theme }) => {
  const frameStyles = {
    desktop: "aspect-video max-w-full",
    tablet: "aspect-[4/3] max-w-md mx-auto",
    mobile: "aspect-[9/16] max-w-xs mx-auto",
  }

  const deviceIcons = {
    desktop: "🖥️",
    tablet: "📱",
    mobile: "📱",
  }

  return (
    <div className={`relative ${frameStyles[device]}`}>
      {/* Device Frame */}
      <div
        className={`
        absolute inset-0 rounded-lg border-2 overflow-hidden
        ${theme.currentTheme === "minimal" ? "border-gray-300 bg-white" : "border-neutral-600 bg-neutral-800"}
      `}
      >
        {/* Device Header */}
        <div
          className={`
          h-6 sm:h-8 flex items-center justify-between px-2 sm:px-3 border-b
          ${theme.currentTheme === "minimal" ? "bg-gray-100 border-gray-200" : "bg-neutral-700 border-neutral-600"}
        `}
        >
          <div className="flex gap-1 sm:gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-red-400" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-yellow-400" />
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs opacity-75 flex items-center gap-1">
            {deviceIcons[device]} {device}
          </span>
        </div>
        {/* Content Area */}
        <div className="h-[calc(100%-1.5rem)] sm:h-[calc(100%-2rem)] overflow-hidden relative">{children}</div>
      </div>
    </div>
  )
}

const MobileControls = ({ device, setDevice, onOpenExternal, theme }) => (
  <div className="space-y-3">
    {/* Device Switcher */}
    <div
      className={`
      p-3 rounded-lg border
      ${theme.currentTheme === "minimal" ? "bg-white border-gray-200" : "bg-neutral-800 border-neutral-700"}
    `}
    >
      <h4
        className={`text-sm font-medium mb-2 ${theme.currentTheme === "minimal" ? "text-gray-700" : "text-neutral-300"
          }`}
      >
        Device View
      </h4>
      <div className="grid grid-cols-3 gap-2">
        {["desktop", "tablet", "mobile"].map((deviceType) => (
          <motion.button
            key={deviceType}
            onClick={() => setDevice(deviceType)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              p-3 rounded-lg text-xs font-medium transition-colors flex flex-col items-center gap-1
              ${device === deviceType
                ? theme.currentTheme === "minimal"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-purple-500 text-white"
                : theme.currentTheme === "minimal"
                  ? "hover:bg-gray-100 text-gray-600 border border-gray-200"
                  : "hover:bg-neutral-700 text-neutral-400 border border-neutral-600"
              }
            `}
          >
            <span className="text-lg">
              {deviceType === "desktop" && "🖥️"}
              {deviceType === "tablet" && "📱"}
              {deviceType === "mobile" && "📱"}
            </span>
            <span className="capitalize">{deviceType}</span>
          </motion.button>
        ))}
      </div>
    </div>

    {/* Action Button */}
    <motion.button
      onClick={onOpenExternal}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        w-full p-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2
        ${theme.currentTheme === "minimal"
          ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200"
          : "bg-neutral-700 hover:bg-neutral-600 text-neutral-300 border border-neutral-600"
        }
      `}
    >
      <span>🔗</span>
      Open in New Tab
    </motion.button>
  </div>
)

const DesktopControls = ({ device, setDevice, isFullscreen, onToggleFullscreen, onOpenExternal, theme }) => (
  <div
    className={`
    absolute top-4 right-4 z-20 flex gap-2 p-2 rounded-lg backdrop-blur-md
    ${theme.currentTheme === "minimal" ? "bg-white/90 border border-gray-200" : "bg-neutral-900/90 border border-neutral-700"}
  `}
  >
    {/* Device Switcher */}
    <div className="flex gap-1">
      {["desktop", "tablet", "mobile"].map((deviceType) => (
        <motion.button
          key={deviceType}
          onClick={() => setDevice(deviceType)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            p-2 rounded text-xs transition-colors
            ${device === deviceType
              ? theme.currentTheme === "minimal"
                ? "bg-gray-200 text-gray-800"
                : "bg-purple-500 text-white"
              : theme.currentTheme === "minimal"
                ? "hover:bg-gray-100 text-gray-600"
                : "hover:bg-neutral-700 text-neutral-400"
            }
          `}
          title={`Switch to ${deviceType} view`}
        >
          {deviceType === "desktop" && "🖥️"}
          {deviceType === "tablet" && "📱"}
          {deviceType === "mobile" && "📱"}
        </motion.button>
      ))}
    </div>

    {/* Action Buttons */}
    <div className="flex gap-1 border-l border-gray-300 pl-2 ml-2">
      <motion.button
        onClick={onToggleFullscreen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          p-2 rounded text-xs transition-colors
          ${theme.currentTheme === "minimal"
            ? "hover:bg-gray-100 text-gray-600"
            : "hover:bg-neutral-700 text-neutral-400"
          }
        `}
        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? "🔳" : "⛶"}
      </motion.button>
      <motion.button
        onClick={onOpenExternal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          p-2 rounded text-xs transition-colors
          ${theme.currentTheme === "minimal"
            ? "hover:bg-gray-100 text-gray-600"
            : "hover:bg-neutral-700 text-neutral-400"
          }
        `}
        title="Open in new tab"
      >
        🔗
      </motion.button>
    </div>
  </div>
)

export default function LiveDemoPreview({ project, isVisible, onClose, embedded = false }) {
  const [demoState, setDemoState] = useState(DEMO_STATES.LOADING)
  const [device, setDevice] = useState("desktop")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [loadAttempts, setLoadAttempts] = useState(0)
  const [showIframe, setShowIframe] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const iframeRef = useRef(null)
  const theme = useTheme()

  // Detect project type and get preview options
  const projectType = detectProjectType(project)
  const previewOptions = getPreviewOptions(project)

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isVisible && project?.url) {
      // For non-live-demo projects, show alternative preview by default
      if (projectType !== PROJECT_TYPES.LIVE_DEMO) {
        setShowIframe(false)
      } else {
        setDemoState(DEMO_STATES.LOADING)
        setLoadAttempts(0)
        setShowIframe(true)
      }
    }
  }, [isVisible, project?.url, projectType])

  const handleIframeLoad = () => {
    setDemoState(DEMO_STATES.LOADED)
  }

  const handleIframeError = () => {
    setDemoState(DEMO_STATES.ERROR)
  }

  const handleRetry = () => {
    setLoadAttempts((prev) => prev + 1)
    setDemoState(DEMO_STATES.LOADING)
    if (iframeRef.current) {
      iframeRef.current.src = `${project.url}?retry=${loadAttempts}`
    }
  }

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleOpenExternal = () => {
    window.open(project.url, "_blank", "noopener,noreferrer")
  }

  if (!isVisible || !project?.url) return null

  // Simplified embedded layout for ProjectModal
  if (embedded) {
    return (
      <div className="space-y-4">
        {/* Mobile Controls - Show above content on mobile */}
        {isMobile && showIframe && previewOptions.canPreview && (
          <MobileControls device={device} setDevice={setDevice} onOpenExternal={handleOpenExternal} theme={theme} />
        )}

        {/* Preview Content */}
        <div className="relative">
          {/* Desktop Controls - Hidden on mobile, no fullscreen in embedded mode */}
          {!isMobile && (
            <DesktopControls
              device={device}
              setDevice={setDevice}
              isFullscreen={false}
              onToggleFullscreen={() => {}} // Disabled in embedded mode
              onOpenExternal={handleOpenExternal}
              theme={theme}
            />
          )}

          {/* Preview Mode Switcher (for auth-required projects) - Positioned to avoid desktop controls */}
          {projectType === PROJECT_TYPES.AUTH_REQUIRED && (
            <div
              className={`
              absolute ${isMobile ? 'top-4 left-4' : 'top-16 left-4'} z-20 flex gap-1 p-1 rounded-lg backdrop-blur-md
              ${theme.currentTheme === "minimal" ? "bg-white/90 border border-gray-200" : "bg-neutral-900/90 border border-neutral-700"}
            `}
            >
              <motion.button
                onClick={() => setShowIframe(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-2 sm:px-3 py-1 rounded text-xs transition-colors
                  ${showIframe
                    ? theme.currentTheme === "minimal"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-purple-500 text-white"
                    : theme.currentTheme === "minimal"
                      ? "hover:bg-gray-100 text-gray-600"
                      : "hover:bg-neutral-700 text-neutral-400"
                  }
                `}
              >
                Try iframe
              </motion.button>
              <motion.button
                onClick={() => setShowIframe(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  px-2 sm:px-3 py-1 rounded text-xs transition-colors
                  ${!showIframe
                    ? theme.currentTheme === "minimal"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-purple-500 text-white"
                    : theme.currentTheme === "minimal"
                      ? "hover:bg-gray-100 text-gray-600"
                      : "hover:bg-neutral-700 text-neutral-400"
                  }
                `}
              >
                Alt view
              </motion.button>
            </div>
          )}

          {/* Demo Content */}
          <div className="min-h-[300px] sm:min-h-[400px]">
            {showIframe && previewOptions.canPreview ? (
              <motion.div
                key={device}
                initial={{ opacity: 0.8, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <DeviceFrame device={device} theme={theme}>
                {demoState === DEMO_STATES.LOADING && <LoadingSpinner theme={theme} />}
                {demoState === DEMO_STATES.ERROR && <ErrorState onRetry={handleRetry} theme={theme} />}
                <motion.iframe
                  ref={iframeRef}
                  src={project.url}
                  title={`${project.title} Live Demo`}
                  className={`
                    w-full h-full border-0 transition-opacity duration-300
                    ${demoState === DEMO_STATES.LOADED ? "opacity-100" : "opacity-0"}
                  `}
                  style={{
                    transform: device === 'mobile' ? 'scale(0.8)' : device === 'tablet' ? 'scale(0.9)' : 'scale(1)',
                    transformOrigin: 'top left',
                    width: device === 'mobile' ? '125%' : device === 'tablet' ? '111%' : '100%',
                    height: device === 'mobile' ? '125%' : device === 'tablet' ? '111%' : '100%'
                  }}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                </DeviceFrame>
              </motion.div>
            ) : (
              <AlternativePreview project={project} previewOptions={previewOptions} />
            )}
          </div>

          {/* Performance Indicator */}
          {demoState === DEMO_STATES.LOADED && showIframe && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                absolute bottom-4 left-4 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs backdrop-blur-md
                ${theme.currentTheme === "minimal"
                  ? "bg-white/90 text-green-700 border border-gray-200"
                  : "bg-neutral-900/90 text-green-400 border border-neutral-700"
                }
              `}
            >
              ✅ Live & Running
            </motion.div>
          )}

          {/* Project Type Badge */}
          {!showIframe && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                absolute top-4 right-4 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs backdrop-blur-md
                ${theme.currentTheme === "minimal"
                  ? "bg-white/90 text-blue-700 border border-gray-200"
                  : "bg-neutral-900/90 text-blue-400 border border-neutral-700"
                }
              `}
            >
              📱 {previewOptions.displayName}
            </motion.div>
          )}
        </div>
      </div>
    )
  }

  // Full modal layout (original)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className={`
          relative rounded-xl overflow-hidden
          ${isFullscreen ? "fixed inset-4 z-50" : "w-full"}
          ${theme.currentTheme === "minimal" ? "bg-white border border-gray-200" : "bg-neutral-800 border border-neutral-700"}
        `}
      >
        {/* Desktop Controls - Hidden on mobile */}
        {!isMobile && (
          <DesktopControls
            device={device}
            setDevice={setDevice}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            onOpenExternal={handleOpenExternal}
            theme={theme}
          />
        )}

        {/* Preview Mode Switcher (for auth-required projects) */}
        {projectType === PROJECT_TYPES.AUTH_REQUIRED && (
          <div
            className={`
            absolute top-4 left-4 z-20 flex gap-1 p-1 rounded-lg backdrop-blur-md
            ${theme.currentTheme === "minimal" ? "bg-white/90 border border-gray-200" : "bg-neutral-900/90 border border-neutral-700"}
          `}
          >
            <motion.button
              onClick={() => setShowIframe(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-2 sm:px-3 py-1 rounded text-xs transition-colors
                ${showIframe
                  ? theme.currentTheme === "minimal"
                    ? "bg-gray-200 text-gray-800"
                    : "bg-purple-500 text-white"
                  : theme.currentTheme === "minimal"
                    ? "hover:bg-gray-100 text-gray-600"
                    : "hover:bg-neutral-700 text-neutral-400"
                }
              `}
            >
              Try iframe
            </motion.button>
            <motion.button
              onClick={() => setShowIframe(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-2 sm:px-3 py-1 rounded text-xs transition-colors
                ${!showIframe
                  ? theme.currentTheme === "minimal"
                    ? "bg-gray-200 text-gray-800"
                    : "bg-purple-500 text-white"
                  : theme.currentTheme === "minimal"
                    ? "hover:bg-gray-100 text-gray-600"
                    : "hover:bg-neutral-700 text-neutral-400"
                }
              `}
            >
              Alt view
            </motion.button>
          </div>
        )}

        {/* Close Button for Fullscreen */}
        {isFullscreen && (
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`
              absolute top-4 left-4 z-20 w-8 h-8 rounded-full flex items-center justify-center
              ${theme.currentTheme === "minimal"
                ? "bg-white/90 hover:bg-gray-100 text-gray-700"
                : "bg-neutral-900/90 hover:bg-neutral-800 text-white"
              }
            `}
          >
            ✕
          </motion.button>
        )}

        {/* Demo Container */}
        <div className="p-3 sm:p-4 h-full min-h-[300px] sm:min-h-[400px]">
          {/* Mobile Controls - Show above content on mobile */}
          {isMobile && showIframe && previewOptions.canPreview && (
            <div className="mb-4">
              <MobileControls device={device} setDevice={setDevice} onOpenExternal={handleOpenExternal} theme={theme} />
            </div>
          )}

          {showIframe && previewOptions.canPreview ? (
            <motion.div
              key={device}
              initial={{ opacity: 0.8, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <DeviceFrame device={device} theme={theme}>
              {demoState === DEMO_STATES.LOADING && <LoadingSpinner theme={theme} />}
              {demoState === DEMO_STATES.ERROR && <ErrorState onRetry={handleRetry} theme={theme} />}
              <motion.iframe
                ref={iframeRef}
                src={project.url}
                title={`${project.title} Live Demo`}
                className={`
                  w-full h-full border-0 transition-opacity duration-300
                  ${demoState === DEMO_STATES.LOADED ? "opacity-100" : "opacity-0"}
                `}
                style={{
                  transform: device === 'mobile' ? 'scale(0.8)' : device === 'tablet' ? 'scale(0.9)' : 'scale(1)',
                  transformOrigin: 'top left',
                  width: device === 'mobile' ? '125%' : device === 'tablet' ? '111%' : '100%',
                  height: device === 'mobile' ? '125%' : device === 'tablet' ? '111%' : '100%'
                }}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
                referrerPolicy="strict-origin-when-cross-origin"
              />
              </DeviceFrame>
            </motion.div>
          ) : (
            <AlternativePreview project={project} previewOptions={previewOptions} />
          )}
        </div>

        {/* Performance Indicator */}
        {demoState === DEMO_STATES.LOADED && showIframe && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              absolute bottom-4 left-4 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs backdrop-blur-md
              ${theme.currentTheme === "minimal"
                ? "bg-white/90 text-green-700 border border-gray-200"
                : "bg-neutral-900/90 text-green-400 border border-neutral-700"
              }
            `}
          >
            ✅ Live & Running
          </motion.div>
        )}

        {/* Project Type Badge */}
        {!showIframe && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              absolute bottom-4 right-4 px-2 sm:px-3 py-1 sm:py-2 rounded-lg text-xs backdrop-blur-md
              ${theme.currentTheme === "minimal"
                ? "bg-white/90 text-blue-700 border border-gray-200"
                : "bg-neutral-900/90 text-blue-400 border border-neutral-700"
              }
            `}
          >
            {projectType === PROJECT_TYPES.GITHUB_ONLY && "💻 Open Source"}
            {projectType === PROJECT_TYPES.AUTH_REQUIRED && "🔐 Auth Required"}
            {projectType === PROJECT_TYPES.EXTENSION && "⚡ Extension"}
            {projectType === PROJECT_TYPES.PRIVATE && "🔒 Private"}
          </motion.div>
        )}

        {/* Mobile Tip */}
        {isMobile && showIframe && previewOptions.canPreview && (
          <div
            className={`
            absolute bottom-4 left-4 right-4 px-3 py-2 rounded-lg text-xs text-center backdrop-blur-md
            ${theme.currentTheme === "minimal"
                ? "bg-white/90 text-gray-600 border border-gray-200"
                : "bg-neutral-900/90 text-neutral-400 border border-neutral-700"
              }
          `}
          >
            💡 Use device controls above to switch views
          </div>
        )}

        {/* Fullscreen Backdrop */}
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm -z-10"
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
