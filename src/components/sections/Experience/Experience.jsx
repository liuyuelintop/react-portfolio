import PropTypes from "prop-types";
import { EXPERIENCES } from "../../../constants/experiences";
import Reveal from "../../ui/common/Reveal";

const flattenStack = (techStack) =>
  Object.values(techStack)
    .flat()
    .filter(Boolean);

const ExperienceItem = ({ experience }) => {
  const hasCompanyLink = experience.company.url && experience.company.url !== "#";
  const visibleStack = flattenStack(experience.techStack).slice(0, 10);
  const meta = [experience.location, experience.type].filter(Boolean).join(" · ");

  return (
    <article className="grid gap-6 border-t border-neutral-800 py-10 first:border-t-0 first:pt-0 md:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)] md:gap-10">
      <div>
        <h3 className="text-xl font-semibold leading-snug text-white">{experience.role}</h3>
        {hasCompanyLink ? (
          <a
            href={experience.company.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-block font-medium text-neutral-300 transition-colors hover:text-cyan-300"
          >
            {experience.company.name}
          </a>
        ) : (
          <p className="mt-1 font-medium text-neutral-300">{experience.company.name}</p>
        )}
        <p className="mt-3 text-sm text-neutral-400">{experience.period}</p>
        {meta && <p className="mt-1 text-sm text-neutral-400">{meta}</p>}
      </div>

      <div>
        <ul className="space-y-3">
          {experience.highlights.map((highlight) => (
            <li
              key={highlight}
              className="relative pl-5 text-[15px] leading-relaxed text-neutral-300 before:absolute before:left-0 before:top-[0.66em] before:h-1 before:w-1 before:rounded-full before:bg-neutral-500"
            >
              {highlight}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm leading-relaxed text-neutral-400">{visibleStack.join(" · ")}</p>
      </div>
    </article>
  );
};

ExperienceItem.propTypes = {
  experience: PropTypes.shape({
    period: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
    }).isRequired,
    location: PropTypes.string,
    type: PropTypes.string,
    highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
    techStack: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  }).isRequired,
};

export default function Experience() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-20 md:px-8 md:py-24">
      <Reveal>
        <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">Experience</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
          Product delivery, API ownership, deployment work and AI-enabled workflow implementation
          across freelance, SaaS and Melbourne business environments.
        </p>

        <div className="mt-12">
          {EXPERIENCES.map((experience) => (
            <ExperienceItem
              key={`${experience.company.name}-${experience.role}-${experience.period}`}
              experience={experience}
            />
          ))}
        </div>
      </Reveal>
    </div>
  );
}
