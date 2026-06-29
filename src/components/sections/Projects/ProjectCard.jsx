import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { ArrowRight, CheckCircle2, ExternalLink, Layers3 } from "lucide-react";
import { useTheme } from "../../../contexts/ThemeContext";
import OptimizedImage from "../../ui/common/OptimizedImage";
import { getThemeFocusRing } from "../../../utils/accessibility";

const ProjectCard = ({ project, index, onReadMore }) => {
  const { currentTheme } = useTheme();
  const isMinimal = currentTheme === "minimal";

  const styles = {
    heading: isMinimal ? "text-gray-950" : "text-white",
    text: isMinimal ? "text-gray-700" : "text-neutral-300",
    muted: isMinimal ? "text-gray-500" : "text-neutral-400",
    card: isMinimal
      ? "bg-white border-gray-200 shadow-lg shadow-gray-200/40"
      : "bg-neutral-900/65 border-neutral-800 shadow-xl shadow-black/20",
    panel: isMinimal ? "bg-gray-50 border-gray-200" : "bg-neutral-950/55 border-neutral-800",
    chip: isMinimal ? "bg-white border-gray-200 text-gray-700" : "bg-neutral-800 border-neutral-700 text-neutral-300",
    icon: isMinimal ? "bg-blue-50 text-blue-700" : "bg-cyan-400/10 text-cyan-300",
    accentText: isMinimal ? "text-blue-600" : "text-cyan-300",
    button: isMinimal
      ? "bg-gray-950 text-white hover:bg-gray-800"
      : "bg-white text-neutral-950 hover:bg-neutral-200",
    secondaryButton: isMinimal
      ? "border-gray-200 text-gray-700 hover:bg-gray-50"
      : "border-neutral-700 text-neutral-300 hover:bg-neutral-800",
  };
  const externalUrl = project.url || project.github;
  const externalLabel = project.url ? "Live" : "Source";
  const externalAriaLabel = project.url
    ? `Visit ${project.title} live site`
    : `View ${project.title} source code`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
      className={`flex h-full flex-col rounded-lg border p-5 md:p-6 ${styles.card}`}
    >
      <OptimizedImage
        src={project.image}
        alt={project.title}
        className="rounded-lg"
        aspectRatio="aspect-video"
      />

      <div className="mt-5 flex items-start justify-between gap-3">
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}>
          <Layers3 size={21} aria-hidden="true" />
        </div>
        {project.year && (
          <span className={`rounded-md border px-2 py-1 text-xs font-medium ${styles.chip}`}>
            {project.year}
          </span>
        )}
      </div>

      <h3 className={`mt-4 text-xl font-bold leading-snug ${styles.heading}`}>
        {project.title}
      </h3>
      <p className={`mt-3 text-sm leading-relaxed ${styles.text}`}>
        {project.description.summary}
      </p>

      {project.roleFit && (
        <div className={`mt-5 rounded-lg border p-4 ${styles.panel}`}>
          <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${styles.muted}`}>
            Hiring signal
          </p>
          <p className={`mt-2 text-sm leading-relaxed ${styles.text}`}>{project.roleFit}</p>
        </div>
      )}

      {project.evidence && (
        <div className="mt-5 space-y-2.5">
          {project.evidence.slice(0, 4).map((item) => (
            <div key={item} className="flex gap-3">
              <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${styles.accentText}`} aria-hidden="true" />
              <p className={`text-sm leading-relaxed ${styles.text}`}>{item}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.main.slice(0, 6).map((tech) => (
          <span key={tech} className={`rounded-md border px-2.5 py-1 text-xs font-medium ${styles.chip}`}>
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-auto flex flex-col gap-2 pt-6 sm:flex-row">
        <button
          type="button"
          onClick={onReadMore}
          className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${styles.button} ${getThemeFocusRing(currentTheme)}`}
          aria-label={`Read more about ${project.title}`}
        >
          View case study
          <ArrowRight size={16} aria-hidden="true" />
        </button>

        {externalUrl && (
          <a
            href={externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${styles.secondaryButton} ${getThemeFocusRing(currentTheme)}`}
            aria-label={externalAriaLabel}
          >
            {externalLabel}
            <ExternalLink size={16} aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    year: PropTypes.string,
    description: PropTypes.shape({
      summary: PropTypes.string.isRequired,
    }).isRequired,
    technologies: PropTypes.shape({
      main: PropTypes.arrayOf(PropTypes.string).isRequired,
      additional: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
    roleFit: PropTypes.string,
    evidence: PropTypes.arrayOf(PropTypes.string),
    url: PropTypes.string,
    github: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onReadMore: PropTypes.func.isRequired,
};

export default ProjectCard;
