import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../../contexts/ThemeContext';
import { detectProjectType, getPreviewOptions, PROJECT_TYPES } from './ProjectPreviewDetector';
import AlternativePreview from './AlternativePreview';

const DEMO_STATES = {
  LOADING: 'loading',
  LOADED: 'loaded',
  ERROR: 'error'
};

const LoadingSpinner = ({ theme }) => (
  <div className="flex flex-col items-center justify-center h-full">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`w-8 h-8 border-2 border-t-transparent rounded-full mb-4 ${
        theme.currentTheme === 'minimal' ? 'border-gray-400' : 'border-purple-400'
      }`}
    />
    <p className={`text-sm ${
      theme.currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
    }`}>
      Loading live demo...
    </p>
  </div>
);

const ErrorState = ({ onRetry, theme }) => (
  <div className="flex flex-col items-center justify-center h-full p-6">
    <div className="text-4xl mb-4">⚠️</div>
    <p className={`text-sm mb-4 text-center ${
      theme.currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
    }`}>
      Unable to load preview. This might be due to security restrictions.
    </p>
    <div className="flex gap-2">
      <motion.button
        onClick={onRetry}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          theme.currentTheme === 'minimal' 
            ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' 
            : 'bg-neutral-700 hover:bg-neutral-600 text-white'
        }`}
      >
        Retry
      </motion.button>
    </div>
  </div>
);

const DeviceFrame = ({ children, device = 'desktop', theme }) => {
  const frameStyles = {
    desktop: 'aspect-video',
    tablet: 'aspect-[4/3]',  
    mobile: 'aspect-[9/16] max-w-xs mx-auto'
  };

  const deviceIcons = {
    desktop: '🖥️',
    tablet: '📱',
    mobile: '📱'
  };

  return (
    <div className={`relative ${frameStyles[device]}`}>
      {/* Device Frame */}
      <div className={`
        absolute inset-0 rounded-lg border-2 overflow-hidden
        ${theme.currentTheme === 'minimal' 
          ? 'border-gray-300 bg-white' 
          : 'border-neutral-600 bg-neutral-800'
        }
      `}>
        {/* Device Header */}
        <div className={`
          h-8 flex items-center justify-between px-3 border-b
          ${theme.currentTheme === 'minimal' 
            ? 'bg-gray-100 border-gray-200' 
            : 'bg-neutral-700 border-neutral-600'
          }
        `}>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <span className="text-xs opacity-75 flex items-center gap-1">
            {deviceIcons[device]} {device}
          </span>
        </div>
        
        {/* Content Area */}
        <div className="h-[calc(100%-2rem)] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  );
};

const InteractiveControls = ({ 
  device, 
  setDevice, 
  isFullscreen, 
  onToggleFullscreen, 
  onOpenExternal, 
  url,
  theme 
}) => (
  <div className={`
    absolute top-4 right-4 z-20 flex gap-2 p-2 rounded-lg backdrop-blur-md
    ${theme.currentTheme === 'minimal' 
      ? 'bg-white/90 border border-gray-200' 
      : 'bg-neutral-900/90 border border-neutral-700'
    }
  `}>
    {/* Device Switcher */}
    <div className="flex gap-1">
      {['desktop', 'tablet', 'mobile'].map((deviceType) => (
        <motion.button
          key={deviceType}
          onClick={() => setDevice(deviceType)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`
            p-2 rounded text-xs transition-colors
            ${device === deviceType 
              ? theme.currentTheme === 'minimal'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-purple-500 text-white'
              : theme.currentTheme === 'minimal'
                ? 'hover:bg-gray-100 text-gray-600'
                : 'hover:bg-neutral-700 text-neutral-400'
            }
          `}
          title={`Switch to ${deviceType} view`}
        >
          {deviceType === 'desktop' && '🖥️'}
          {deviceType === 'tablet' && '📱'}  
          {deviceType === 'mobile' && '📱'}
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
          ${theme.currentTheme === 'minimal'
            ? 'hover:bg-gray-100 text-gray-600'
            : 'hover:bg-neutral-700 text-neutral-400'
          }
        `}
        title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
      >
        {isFullscreen ? '🔳' : '⛶'}
      </motion.button>
      
      <motion.button
        onClick={onOpenExternal}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          p-2 rounded text-xs transition-colors
          ${theme.currentTheme === 'minimal'
            ? 'hover:bg-gray-100 text-gray-600'
            : 'hover:bg-neutral-700 text-neutral-400'
          }
        `}
        title="Open in new tab"
      >
        🔗
      </motion.button>
    </div>
  </div>
);

export default function LiveDemoPreview({ project, isVisible, onClose }) {
  const [demoState, setDemoState] = useState(DEMO_STATES.LOADING);
  const [device, setDevice] = useState('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  const [showIframe, setShowIframe] = useState(true);
  const iframeRef = useRef(null);
  const theme = useTheme();
  
  // Detect project type and get preview options
  const projectType = detectProjectType(project);
  const previewOptions = getPreviewOptions(project);

  useEffect(() => {
    if (isVisible && project?.url) {
      // For non-live-demo projects, show alternative preview by default
      if (projectType !== PROJECT_TYPES.LIVE_DEMO) {
        setShowIframe(false);
      } else {
        setDemoState(DEMO_STATES.LOADING);
        setLoadAttempts(0);
        setShowIframe(true);
      }
    }
  }, [isVisible, project?.url, projectType]);

  const handleIframeLoad = () => {
    setDemoState(DEMO_STATES.LOADED);
  };

  const handleIframeError = () => {
    setDemoState(DEMO_STATES.ERROR);
  };

  const handleRetry = () => {
    setLoadAttempts(prev => prev + 1);
    setDemoState(DEMO_STATES.LOADING);
    if (iframeRef.current) {
      iframeRef.current.src = `${project.url}?retry=${loadAttempts}`;
    }
  };

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleOpenExternal = () => {
    window.open(project.url, '_blank', 'noopener,noreferrer');
  };

  if (!isVisible || !project?.url) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className={`
          relative rounded-xl overflow-hidden
          ${isFullscreen 
            ? 'fixed inset-4 z-50' 
            : 'w-full'
          }
          ${theme.currentTheme === 'minimal' 
            ? 'bg-white border border-gray-200' 
            : 'bg-neutral-800 border border-neutral-700'
          }
        `}
      >
        {/* Interactive Controls */}
        <InteractiveControls
          device={device}
          setDevice={setDevice}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          onOpenExternal={handleOpenExternal}
          url={project.url}
          theme={theme}
        />

        {/* Preview Mode Switcher (for auth-required projects) */}
        {projectType === PROJECT_TYPES.AUTH_REQUIRED && (
          <div className={`
            absolute top-4 left-4 z-20 flex gap-1 p-1 rounded-lg backdrop-blur-md
            ${theme.currentTheme === 'minimal' 
              ? 'bg-white/90 border border-gray-200' 
              : 'bg-neutral-900/90 border border-neutral-700'
            }
          `}>
            <motion.button
              onClick={() => setShowIframe(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-3 py-1 rounded text-xs transition-colors
                ${showIframe 
                  ? theme.currentTheme === 'minimal'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-purple-500 text-white'
                  : theme.currentTheme === 'minimal'
                    ? 'hover:bg-gray-100 text-gray-600'
                    : 'hover:bg-neutral-700 text-neutral-400'
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
                px-3 py-1 rounded text-xs transition-colors
                ${!showIframe 
                  ? theme.currentTheme === 'minimal'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-purple-500 text-white'
                  : theme.currentTheme === 'minimal'
                    ? 'hover:bg-gray-100 text-gray-600'
                    : 'hover:bg-neutral-700 text-neutral-400'
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
              ${theme.currentTheme === 'minimal'
                ? 'bg-white/90 hover:bg-gray-100 text-gray-700'
                : 'bg-neutral-900/90 hover:bg-neutral-800 text-white'
              }
            `}
          >
            ✕
          </motion.button>
        )}

        {/* Demo Container */}
        <div className="p-4 h-full min-h-[400px]">
          {showIframe && previewOptions.canPreview ? (
            <DeviceFrame device={device} theme={theme}>
              {demoState === DEMO_STATES.LOADING && <LoadingSpinner theme={theme} />}
              
              {demoState === DEMO_STATES.ERROR && (
                <ErrorState onRetry={handleRetry} theme={theme} />
              )}

              <motion.iframe
                ref={iframeRef}
                src={project.url}
                title={`${project.title} Live Demo`}
                className={`
                  w-full h-full border-0 transition-opacity duration-300
                  ${demoState === DEMO_STATES.LOADED ? 'opacity-100' : 'opacity-0'}
                `}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </DeviceFrame>
          ) : (
            <AlternativePreview 
              project={project} 
              previewOptions={previewOptions}
            />
          )}
        </div>

        {/* Performance Indicator */}
        {demoState === DEMO_STATES.LOADED && showIframe && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`
              absolute bottom-4 left-4 px-3 py-2 rounded-lg text-xs backdrop-blur-md
              ${theme.currentTheme === 'minimal'
                ? 'bg-white/90 text-green-700 border border-gray-200'
                : 'bg-neutral-900/90 text-green-400 border border-neutral-700'
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
              absolute bottom-4 right-4 px-3 py-2 rounded-lg text-xs backdrop-blur-md
              ${theme.currentTheme === 'minimal'
                ? 'bg-white/90 text-blue-700 border border-gray-200'
                : 'bg-neutral-900/90 text-blue-400 border border-neutral-700'
              }
            `}
          >
            {projectType === PROJECT_TYPES.GITHUB_ONLY && '💻 Open Source'}
            {projectType === PROJECT_TYPES.AUTH_REQUIRED && '🔐 Auth Required'}
            {projectType === PROJECT_TYPES.EXTENSION && '⚡ Extension'}
            {projectType === PROJECT_TYPES.PRIVATE && '🔒 Private'}
          </motion.div>
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
  );
}