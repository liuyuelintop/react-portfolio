import { motion } from "framer-motion";
import PropTypes from "prop-types";
import {
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { EXPERIENCES } from "../../../constants/experiences";
import { useTheme } from "../../../contexts/ThemeContext";
import SectionHeading from "../../ui/common/SectionHeading";

const flattenStack = (techStack) =>
  Object.values(techStack)
    .flat()
    .filter(Boolean);

const ExperienceCard = ({ experience, index, styles }) => {
  const isCurrentRole = experience.period.includes("Present");
  const hasCompanyLink = experience.company.url && experience.company.url !== "#";
  const visibleStack = flattenStack(experience.techStack).slice(0, 10);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
      className={`rounded-lg border p-5 md:p-6 ${styles.card}`}
    >
      <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <div className="flex items-start gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}>
              <BriefcaseBusiness size={21} aria-hidden="true" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                {isCurrentRole && (
                  <span className={`rounded-md border px-2 py-1 text-xs font-semibold ${styles.currentBadge}`}>
                    Current
                  </span>
                )}
                {experience.type && (
                  <span className={`rounded-md border px-2 py-1 text-xs font-medium ${styles.chip}`}>
                    {experience.type}
                  </span>
                )}
              </div>
              <h3 className={`mt-3 text-xl font-bold leading-snug ${styles.heading}`}>
                {experience.role}
              </h3>
            </div>
          </div>

          <div className={`mt-5 space-y-3 text-sm ${styles.text}`}>
            <div className="flex gap-3">
              <Building2 size={16} className={`mt-0.5 shrink-0 ${styles.accentText}`} aria-hidden="true" />
              {hasCompanyLink ? (
                <a
                  href={experience.company.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1 font-semibold ${styles.link}`}
                >
                  {experience.company.name}
                  <ExternalLink size={13} aria-hidden="true" />
                </a>
              ) : (
                <span className="font-semibold">{experience.company.name}</span>
              )}
            </div>
            <div className="flex gap-3">
              <CalendarDays size={16} className={`mt-0.5 shrink-0 ${styles.accentText}`} aria-hidden="true" />
              <span>{experience.period}</span>
            </div>
            {experience.location && (
              <div className="flex gap-3">
                <MapPin size={16} className={`mt-0.5 shrink-0 ${styles.accentText}`} aria-hidden="true" />
                <span>{experience.location}</span>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className={`rounded-lg border p-4 ${styles.panel}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${styles.muted}`}>
              Delivery evidence
            </p>
            <div className="mt-3 space-y-3">
              {experience.highlights.map((highlight) => (
                <div key={highlight} className="flex gap-3">
                  <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${styles.accentText}`} aria-hidden="true" />
                  <p className={`text-sm leading-relaxed ${styles.text}`}>{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {visibleStack.map((tech) => (
              <span key={tech} className={`rounded-md border px-2.5 py-1 text-xs font-medium ${styles.chip}`}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

ExperienceCard.propTypes = {
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
  index: PropTypes.number.isRequired,
  styles: PropTypes.shape({
    heading: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    muted: PropTypes.string.isRequired,
    card: PropTypes.string.isRequired,
    panel: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    accentText: PropTypes.string.isRequired,
    chip: PropTypes.string.isRequired,
    currentBadge: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default function Experience() {
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
    icon: isMinimal ? "bg-blue-50 text-blue-700" : "bg-cyan-400/10 text-cyan-300",
    accentText: isMinimal ? "text-blue-600" : "text-cyan-300",
    chip: isMinimal ? "bg-white border-gray-200 text-gray-700" : "bg-neutral-800 border-neutral-700 text-neutral-300",
    currentBadge: isMinimal
      ? "bg-emerald-50 border-emerald-200 text-emerald-700"
      : "bg-emerald-400/10 border-emerald-400/20 text-emerald-300",
    link: isMinimal ? "text-blue-700 hover:text-blue-800" : "text-cyan-300 hover:text-cyan-200",
  };

  return (
    <section className="max-w-6xl mx-auto py-12 px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-8 max-w-3xl"
      >
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${styles.muted}`}>
          Commercial Track Record
        </p>
        <SectionHeading level="section" animate={false} className="mt-3">
          Where I have delivered
        </SectionHeading>
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${styles.text}`}>
          A concise record of product delivery, API ownership, deployment work and AI-enabled workflow
          implementation across freelance, SaaS and Melbourne business environments.
        </p>
      </motion.div>

      <div className="space-y-4">
        {EXPERIENCES.map((experience, index) => (
          <ExperienceCard
            key={`${experience.company.name}-${experience.role}-${experience.period}`}
            experience={experience}
            index={index}
            styles={styles}
          />
        ))}
      </div>
    </section>
  );
}
