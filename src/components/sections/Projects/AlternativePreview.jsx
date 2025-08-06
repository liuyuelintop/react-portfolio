"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useTheme } from "../../../contexts/ThemeContext"
import { CareerChatbot } from "../CareerChatbot"

const DemoVideoPreview = ({ project, theme }) => (
  <div
    className={`
    p-4 sm:p-8 text-center rounded-xl
    ${theme.currentTheme === "minimal" ? "bg-gradient-to-br from-gray-50 to-gray-100" : "bg-gradient-to-br from-neutral-800 to-neutral-900"}
  `}
  >
    <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🎥</div>
    <h3
      className={`text-lg sm:text-xl font-bold mb-2 sm:mb-3 ${theme.currentTheme === "minimal" ? "text-gray-800" : "text-white"}`}
    >
      Demo Video Coming Soon
    </h3>
    <p
      className={`text-xs sm:text-sm mb-4 sm:mb-6 ${theme.currentTheme === "minimal" ? "text-gray-600" : "text-neutral-400"}`}
    >
      A walkthrough video showcasing key features and functionality is in production.
    </p>
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.open(project.url, "_blank")}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium transition-colors
          ${theme.currentTheme === "minimal"
            ? "bg-gray-800 hover:bg-gray-700 text-white"
            : "bg-purple-500 hover:bg-purple-400 text-white"
          }
        `}
      >
        Visit Live Site
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`
          px-4 py-2 rounded-lg text-sm font-medium transition-colors border
          ${theme.currentTheme === "minimal"
            ? "border-gray-300 hover:bg-gray-50 text-gray-700"
            : "border-neutral-600 hover:bg-neutral-700 text-neutral-300"
          }
        `}
      >
        Notify When Ready
      </motion.button>
    </div>
  </div>
)

const GitHubPreview = ({ project, theme }) => {
  const [repoStats, setRepoStats] = useState({
    stars: "⭐",
    forks: "🍴",
    language: "💻",
    updated: "📅",
  })

  return (
    <div
      className={`
      p-4 sm:p-6 rounded-xl border
      ${theme.currentTheme === "minimal" ? "bg-white border-gray-200" : "bg-neutral-800 border-neutral-700"}
    `}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="text-2xl sm:text-3xl">💻</div>
        <div>
          <h3
            className={`text-sm sm:text-base font-bold ${theme.currentTheme === "minimal" ? "text-gray-800" : "text-white"}`}
          >
            Open Source Repository
          </h3>
          <p
            className={`text-xs sm:text-sm ${theme.currentTheme === "minimal" ? "text-gray-600" : "text-neutral-400"}`}
          >
            Explore the code, documentation, and implementation details
          </p>
        </div>
      </div>

      {/* Repo Stats */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
        {Object.entries(repoStats).map(([key, value]) => (
          <div
            key={key}
            className={`
            flex items-center gap-2 p-2 rounded-lg
            ${theme.currentTheme === "minimal" ? "bg-gray-50" : "bg-neutral-700/50"}
          `}
          >
            <span>{value}</span>
            <span
              className={`text-xs sm:text-sm capitalize ${theme.currentTheme === "minimal" ? "text-gray-600" : "text-neutral-400"}`}
            >
              {key}
            </span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open(project.url, "_blank")}
          className={`
            flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors
            ${theme.currentTheme === "minimal"
              ? "bg-gray-800 hover:bg-gray-700 text-white"
              : "bg-purple-500 hover:bg-purple-400 text-white"
            }
          `}
        >
          View Repository
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            px-4 py-2 rounded-lg text-sm font-medium transition-colors border
            ${theme.currentTheme === "minimal"
              ? "border-gray-300 hover:bg-gray-50 text-gray-700"
              : "border-neutral-600 hover:bg-neutral-700 text-neutral-300"
            }
          `}
        >
          📋 Clone
        </motion.button>
      </div>
    </div>
  )
}

const ExtensionPreview = ({ project, theme }) => (
  <div
    className={`
    p-4 sm:p-6 rounded-xl
    ${theme.currentTheme === "minimal" ? "bg-gradient-to-br from-blue-50 to-indigo-50" : "bg-gradient-to-br from-purple-900/20 to-blue-900/20"}
  `}
  >
    <div className="text-center mb-4 sm:mb-6">
      <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">⚡</div>
      <h3
        className={`text-base sm:text-lg font-bold mb-2 ${theme.currentTheme === "minimal" ? "text-gray-800" : "text-white"}`}
      >
        Browser Extension
      </h3>
      <p className={`text-xs sm:text-sm ${theme.currentTheme === "minimal" ? "text-gray-600" : "text-neutral-400"}`}>
        This tool enhances your browser experience
      </p>
    </div>

    {/* Installation Steps */}
    <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
      {[
        "Download from GitHub repository",
        "Extract and load as unpacked extension",
        "Enable developer mode in browser",
        "Start using the enhanced features",
      ].map((step, index) => (
        <div key={index} className="flex items-start gap-2 sm:gap-3">
          <div
            className={`
            w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0
            ${theme.currentTheme === "minimal" ? "bg-blue-500 text-white" : "bg-purple-500 text-white"}
          `}
          >
            {index + 1}
          </div>
          <span
            className={`text-xs sm:text-sm ${theme.currentTheme === "minimal" ? "text-gray-700" : "text-neutral-300"}`}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => window.open(project.url, "_blank")}
      className={`
        w-full py-3 px-4 rounded-lg text-sm font-medium transition-colors
        ${theme.currentTheme === "minimal"
          ? "bg-blue-500 hover:bg-blue-400 text-white"
          : "bg-purple-500 hover:bg-purple-400 text-white"
        }
      `}
    >
      Get Extension
    </motion.button>
  </div>
)

const AuthRequiredPreview = ({ project, theme }) => (
  <div
    className={`
    p-4 sm:p-6 rounded-xl border-2 border-dashed
    ${theme.currentTheme === "minimal" ? "bg-yellow-50 border-yellow-200" : "bg-yellow-900/10 border-yellow-500/30"}
  `}
  >
    <div className="text-center">
      <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">🔐</div>
      <h3
        className={`text-base sm:text-lg font-bold mb-2 ${theme.currentTheme === "minimal" ? "text-gray-800" : "text-white"}`}
      >
        Authentication Required
      </h3>
      <p
        className={`text-xs sm:text-sm mb-3 sm:mb-4 ${theme.currentTheme === "minimal" ? "text-yellow-700" : "text-yellow-400"}`}
      >
        This application requires login to access full features. Preview may be limited due to security restrictions.
      </p>
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => window.open(project.url, "_blank")}
          className={`
            w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors
            ${theme.currentTheme === "minimal"
              ? "bg-yellow-600 hover:bg-yellow-500 text-white"
              : "bg-yellow-500 hover:bg-yellow-400 text-black"
            }
          `}
        >
          Visit Live Application
        </motion.button>
        <p className={`text-xs ${theme.currentTheme === "minimal" ? "text-yellow-600" : "text-yellow-400"}`}>
          💡 Demo credentials may be available on the live site
        </p>
      </div>
    </div>
  </div>
)

const ContactDemoPreview = ({ project, theme }) => (
  <div
    className={`
    p-4 sm:p-6 rounded-xl text-center
    ${theme.currentTheme === "minimal" ? "bg-gradient-to-br from-purple-50 to-pink-50" : "bg-gradient-to-br from-purple-900/20 to-pink-900/20"}
  `}
  >
    <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">📧</div>
    <h3
      className={`text-base sm:text-lg font-bold mb-2 ${theme.currentTheme === "minimal" ? "text-gray-800" : "text-white"}`}
    >
      Private Project
    </h3>
    <p
      className={`text-xs sm:text-sm mb-3 sm:mb-4 ${theme.currentTheme === "minimal" ? "text-gray-600" : "text-neutral-400"}`}
    >
      This project is currently private or in development. Contact me for a personalized demo.
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        px-6 py-2 rounded-lg text-sm font-medium transition-colors
        ${theme.currentTheme === "minimal"
          ? "bg-purple-500 hover:bg-purple-400 text-white"
          : "bg-purple-500 hover:bg-purple-400 text-white"
        }
      `}
    >
      Request Demo
    </motion.button>
  </div>
)

const GradioPreview = ({ project, theme }) => (
  <div className="w-full space-y-4">
    <div className="text-center mb-4">
      <div className="text-3xl sm:text-4xl mb-2">🤖</div>
      <h3
        className={`text-base sm:text-lg font-bold mb-2 ${theme.currentTheme === "minimal" ? "text-gray-800" : "text-white"}`}
      >
        Interactive AI Assistant
      </h3>
      <p
        className={`text-xs sm:text-sm mb-4 ${theme.currentTheme === "minimal" ? "text-gray-600" : "text-neutral-400"}`}
      >
        Chat directly with the AI assistant embedded below, or open the full version on Hugging Face Spaces.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => window.open(project.url, "_blank")}
        className={`
          mb-4 px-4 py-2 rounded-lg text-sm font-medium transition-colors border
          ${theme.currentTheme === "minimal"
            ? "border-gray-300 hover:bg-gray-50 text-gray-700"
            : "border-neutral-600 hover:bg-neutral-700 text-neutral-300"
          }
        `}
      >
        🤗 Open in Hugging Face
      </motion.button>
    </div>
    <CareerChatbot theme={theme.currentTheme} />
  </div>
)

export default function AlternativePreview({ project, previewOptions }) {
  const theme = useTheme()

  if (!previewOptions.alternativeActions?.length) {
    return null
  }

  // Render the appropriate preview based on recommended action
  const renderPreviewByType = () => {
    switch (previewOptions.recommendedAction) {
      case "demo_video":
        return <DemoVideoPreview project={project} theme={theme} />
      case "github_preview":
        return <GitHubPreview project={project} theme={theme} />
      case "install_guide":
        return <ExtensionPreview project={project} theme={theme} />
      case "contact_demo":
        return <ContactDemoPreview project={project} theme={theme} />
      case "gradio_embed":
        return <GradioPreview project={project} theme={theme} />
      default:
        return <AuthRequiredPreview project={project} theme={theme} />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {renderPreviewByType()}
    </motion.div>
  )
}
