import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export default function FloatingResumeButton() {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const theme = useTheme();

  const handleQuickDownload = async () => {
    setIsDownloading(true);
    
    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Quick PDF download
      const googleDriveFileId = import.meta.env.VITE_GOOGLE_FOLDER_ID;
      if (googleDriveFileId) {
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${googleDriveFileId}`;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = 'Yuelin_Liu_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Fallback: scroll to resume section
        document.getElementById('resume')?.scrollIntoView({ behavior: 'smooth' });
      }
      
    } catch (error) {
      console.error('Quick download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          delay: 2, // Appear after 2 seconds
          type: 'spring',
          stiffness: 300,
          damping: 30
        }}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        className="relative"
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className={`
                absolute right-16 top-1/2 transform -translate-y-1/2 whitespace-nowrap
                px-3 py-2 rounded-lg text-sm font-medium shadow-lg
                ${theme.currentTheme === 'minimal'
                  ? 'bg-gray-800 text-white'
                  : 'bg-white text-gray-800'
                }
              `}
            >
              Quick Download Resume
              {/* Arrow */}
              <div className={`
                absolute left-full top-1/2 transform -translate-y-1/2
                border-4 border-transparent
                ${theme.currentTheme === 'minimal'
                  ? 'border-l-gray-800'
                  : 'border-l-white'
                }
              `} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Button */}
        <motion.button
          onClick={handleQuickDownload}
          disabled={isDownloading}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`
            w-14 h-14 rounded-full shadow-2xl backdrop-blur-md border transition-all duration-300
            ${theme.currentTheme === 'minimal'
              ? 'bg-white/90 border-gray-200 text-gray-700 hover:bg-white'
              : 'bg-neutral-900/90 border-neutral-700 text-white hover:bg-neutral-800'
            } 
            ${isDownloading ? 'cursor-not-allowed' : 'cursor-pointer'}
          `}
        >
          {isDownloading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-6 h-6 border-2 border-t-transparent border-current rounded-full mx-auto"
            />
          ) : (
            <div className="text-xl">📄</div>
          )}
        </motion.button>

        {/* Pulsing Ring Animation */}
        {!isDownloading && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`
              absolute inset-0 rounded-full border-2
              ${theme.currentTheme === 'minimal'
                ? 'border-gray-400'
                : 'border-purple-400'
              }
            `}
          />
        )}
      </motion.div>
    </div>
  );
}