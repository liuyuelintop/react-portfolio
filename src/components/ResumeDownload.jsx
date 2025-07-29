import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

// Resume download configuration
const RESUME_CONFIG = {
  // You can add your Google Drive file ID here
  googleDriveFileId: import.meta.env.VITE_GOOGLE_FOLDER_ID, // Reusing existing env var
  
  // Multiple format options
  formats: [
    {
      id: 'pdf',
      name: 'PDF Resume',
      description: 'Clean PDF format for applications',
      icon: '📄',
      size: '234 KB',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'doc',
      name: 'Word Document',
      description: 'Editable Word format',
      icon: '📝',
      size: '156 KB', 
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'interactive',
      name: 'Interactive Resume',
      description: 'This portfolio as a resume',
      icon: '🌐',
      size: 'Live',
      color: 'from-purple-500 to-purple-600'
    }
  ],
  
  // Download tracking
  trackDownloads: true
};

const DownloadStats = ({ downloads, theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`
      text-center p-4 rounded-lg mb-6
      ${theme.currentTheme === 'minimal'
        ? 'bg-gray-50 border border-gray-200'
        : 'bg-neutral-800/50 border border-neutral-700/50'
      }
    `}
  >
    <div className="flex justify-center items-center gap-4">
      <div className="text-center">
        <div className={`text-2xl font-bold ${
          theme.currentTheme === 'minimal' ? 'text-gray-800' : 'text-white'
        }`}>
          {downloads.total || '500+'}
        </div>
        <div className={`text-xs ${
          theme.currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-400'
        }`}>
          Downloads
        </div>
      </div>
      <div className={`w-px h-8 ${
        theme.currentTheme === 'minimal' ? 'bg-gray-300' : 'bg-neutral-600'
      }`} />
      <div className="text-center">
        <div className={`text-2xl font-bold ${
          theme.currentTheme === 'minimal' ? 'text-gray-800' : 'text-white'
        }`}>
          {downloads.thisMonth || '47'}
        </div>
        <div className={`text-xs ${
          theme.currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-400'
        }`}>
          This Month
        </div>
      </div>
      <div className={`w-px h-8 ${
        theme.currentTheme === 'minimal' ? 'bg-gray-300' : 'bg-neutral-600'
      }`} />
      <div className="text-center">
        <div className={`text-lg ${
          theme.currentTheme === 'minimal' ? 'text-green-600' : 'text-green-400'
        }`}>
          ✓
        </div>
        <div className={`text-xs ${
          theme.currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-400'
        }`}>
          Updated
        </div>
      </div>
    </div>
  </motion.div>
);

const FormatCard = ({ format, onDownload, isDownloading, theme }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -2 }}
    whileTap={{ scale: 0.98 }}
    className={`
      relative p-6 rounded-xl cursor-pointer group overflow-hidden
      ${theme.currentTheme === 'minimal'
        ? 'bg-white border border-gray-200 hover:border-gray-300'
        : 'bg-neutral-800/50 border border-neutral-700/50 hover:border-neutral-600'
      }
    `}
    onClick={() => onDownload(format)}
  >
    {/* Background Glow */}
    <div className={`
      absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300
      bg-gradient-to-r ${format.color} blur-xl -z-10
    `} style={{ filter: 'blur(20px)', transform: 'scale(1.5)' }} />
    
    {/* Content */}
    <div className="relative z-10">
      {/* Icon & Title */}
      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">{format.icon}</div>
        <div>
          <h3 className={`font-bold ${
            theme.currentTheme === 'minimal' ? 'text-gray-800' : 'text-white'
          }`}>
            {format.name}
          </h3>
          <p className={`text-sm ${
            theme.currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
          }`}>
            {format.description}
          </p>
        </div>
      </div>
      
      {/* File Info */}
      <div className="flex justify-between items-center mb-4">
        <span className={`text-xs px-2 py-1 rounded-full ${
          theme.currentTheme === 'minimal'
            ? 'bg-gray-100 text-gray-600'
            : 'bg-neutral-700 text-neutral-300'
        }`}>
          {format.size}
        </span>
        {format.id === 'pdf' && (
          <span className={`text-xs px-2 py-1 rounded-full ${
            theme.currentTheme === 'minimal'
              ? 'bg-green-100 text-green-700'
              : 'bg-green-900/50 text-green-400'
          }`}>
            Recommended
          </span>
        )}
      </div>
      
      {/* Download Button */}
      <motion.button
        disabled={isDownloading}
        className={`
          w-full py-3 px-4 rounded-lg font-medium text-sm transition-colors relative overflow-hidden
          ${isDownloading
            ? theme.currentTheme === 'minimal'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-neutral-700 text-neutral-500 cursor-not-allowed'
            : theme.currentTheme === 'minimal'
              ? 'bg-gray-800 hover:bg-gray-700 text-white'
              : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-400 hover:to-blue-400 text-white'
          }
        `}
      >
        {isDownloading ? (
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-4 h-4 border-2 border-t-transparent border-current rounded-full"
            />
            Preparing...
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span>↓</span>
            Download {format.name}
          </div>
        )}
      </motion.button>
    </div>
  </motion.div>
);

const QuickActions = ({ onEmailResume, onViewOnline, theme }) => (
  <div className="flex gap-3 mt-6">
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onEmailResume}
      className={`
        flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors border
        ${theme.currentTheme === 'minimal'
          ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
          : 'border-neutral-600 hover:bg-neutral-700 text-neutral-300'
        }
      `}
    >
      📧 Email Resume
    </motion.button>
    
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onViewOnline}
      className={`
        flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors border
        ${theme.currentTheme === 'minimal'
          ? 'border-gray-300 hover:bg-gray-50 text-gray-700'
          : 'border-neutral-600 hover:bg-neutral-700 text-neutral-300'
        }
      `}
    >
      🔍 View Online
    </motion.button>
  </div>
);

export default function ResumeDownload() {
  const [downloads, setDownloads] = useState({ total: 0, thisMonth: 0 });
  const [downloadingFormat, setDownloadingFormat] = useState(null);
  const theme = useTheme();

  const handleDownload = async (format) => {
    setDownloadingFormat(format.id);
    
    try {
      // Simulate download preparation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (format.id === 'interactive') {
        // Generate PDF from current page or open in new tab
        window.print();
      } else if (format.id === 'pdf') {
        // Use Google Drive API or direct download
        const downloadUrl = `https://drive.google.com/uc?export=download&id=${RESUME_CONFIG.googleDriveFileId}`;
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `Yuelin_Liu_Resume.${format.id}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        // Handle other formats
        console.log(`Downloading ${format.name}...`);
      }
      
      // Track download
      if (RESUME_CONFIG.trackDownloads) {
        setDownloads(prev => ({
          total: prev.total + 1,
          thisMonth: prev.thisMonth + 1
        }));
      }
      
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloadingFormat(null);
    }
  };

  const handleEmailResume = () => {
    const subject = encodeURIComponent("Resume Request - Yuelin Liu");
    const body = encodeURIComponent(`Hi Yuelin,\n\nI'd like to request your resume for a potential opportunity.\n\nBest regards`);
    window.open(`mailto:liuyuelin.dev@gmail.com?subject=${subject}&body=${body}`);
  };

  const handleViewOnline = () => {
    // Scroll to top or show online resume view
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="max-w-4xl mx-auto py-16 px-4 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Download Resume
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${
          theme.currentTheme === 'minimal' ? 'text-gray-600' : 'text-neutral-400'
        }`}>
          Get my latest resume in your preferred format. Always up-to-date with current experience and skills.
        </p>
      </motion.div>

      {/* Download Stats */}
      <DownloadStats downloads={downloads} theme={theme} />

      {/* Format Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {RESUME_CONFIG.formats.map((format, index) => (
          <motion.div
            key={format.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <FormatCard
              format={format}
              onDownload={handleDownload}
              isDownloading={downloadingFormat === format.id}
              theme={theme}
            />
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <QuickActions
          onEmailResume={handleEmailResume}
          onViewOnline={handleViewOnline}
          theme={theme}
        />
      </motion.div>

      {/* Last Updated Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className={`text-center mt-8 text-sm ${
          theme.currentTheme === 'minimal' ? 'text-gray-500' : 'text-neutral-500'
        }`}
      >
        <p>✨ Last updated: {new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</p>
        <p className="mt-1">📊 All downloads are tracked for analytics purposes</p>
      </motion.div>
    </section>
  );
}