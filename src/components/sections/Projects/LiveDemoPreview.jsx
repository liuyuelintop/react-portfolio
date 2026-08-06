import { useState } from "react"
import PropTypes from "prop-types"
import { ExternalLink } from "lucide-react"
import { motion } from "framer-motion"
import { focusRingClasses } from "../../../utils/accessibility"

export default function LiveDemoPreview({ project, isVisible }) {
  const [isLoaded, setIsLoaded] = useState(false)

  if (!isVisible || !project?.url) return null

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-3 sm:p-4">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-neutral-300">
          Preview the live project here, or open it directly if the host blocks embedding.
        </p>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 ${focusRingClasses}`}
        >
          <ExternalLink size={15} aria-hidden="true" />
          Open Project
        </a>
      </div>

      <div className="relative aspect-video overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950">
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="h-7 w-7 rounded-full border-2 border-cyan-300 border-t-transparent"
              aria-label="Loading preview"
            />
          </div>
        )}
        <iframe
          src={project.url}
          title={`${project.title} live preview`}
          className={`h-full w-full border-0 transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          loading="lazy"
          sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-downloads"
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={() => setIsLoaded(true)}
        />
      </div>

      <p className="mt-3 text-xs text-neutral-400">
        Embedded previews can fail when a project sets strict frame headers; the direct link remains the canonical demo.
      </p>
    </div>
  )
}

LiveDemoPreview.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string,
  }),
  isVisible: PropTypes.bool.isRequired,
}
