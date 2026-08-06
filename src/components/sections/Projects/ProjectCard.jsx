import PropTypes from "prop-types";
import { ArrowRight, ExternalLink } from "lucide-react";
import OptimizedImage from "../../ui/common/OptimizedImage";
import { focusRingClasses } from "../../../utils/accessibility";

const ProjectCard = ({ project, index, onReadMore }) => {
  const externalUrl = project.url || project.github;
  const externalLabel = project.url ? "Live" : "Source";
  const externalAriaLabel = project.url
    ? `Visit ${project.title} live site`
    : `View ${project.title} source code`;
  const tags = project.technologies.main.slice(0, 4);

  return (
    <article className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-10">
      <OptimizedImage
        src={project.image}
        alt={`${project.title} product screenshot`}
        className="rounded-lg border border-neutral-800"
        aspectRatio="aspect-video"
        loading={index === 0 ? "eager" : "lazy"}
      />

      <div>
        <h3 className="text-2xl font-bold leading-snug text-white">{project.title}</h3>

        <p className="mt-3 text-base leading-relaxed text-neutral-300">
          {project.description.summary}
        </p>

        {project.roleFit && (
          <p className="mt-3 text-sm leading-relaxed text-neutral-400">{project.roleFit}</p>
        )}

        <p className="mt-4 text-sm text-neutral-400">{tags.join(" · ")}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onReadMore}
            className={`inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 ${focusRingClasses}`}
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
              className={`inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-500 px-5 py-3 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-300 hover:text-white ${focusRingClasses}`}
              aria-label={externalAriaLabel}
            >
              {externalLabel}
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.shape({
      summary: PropTypes.string.isRequired,
    }).isRequired,
    technologies: PropTypes.shape({
      main: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    roleFit: PropTypes.string,
    url: PropTypes.string,
    github: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  onReadMore: PropTypes.func.isRequired,
};

export default ProjectCard;
