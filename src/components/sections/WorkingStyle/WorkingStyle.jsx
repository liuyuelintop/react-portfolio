import { motion } from "framer-motion";
import { Flame, Handshake, Wrench } from "lucide-react";
import { WORKING_STYLE } from "../../../constants/constants";
import { useTheme } from "../../../contexts/ThemeContext";

const pillarIcons = [Wrench, Flame, Handshake];

export default function WorkingStyle() {
  const { currentTheme } = useTheme();
  const isMinimal = currentTheme === "minimal";

  const headingClass = isMinimal ? "text-gray-950" : "text-white";
  const textClass = isMinimal ? "text-gray-700" : "text-neutral-300";
  const mutedClass = isMinimal ? "text-gray-500" : "text-neutral-400";
  const cardClass = isMinimal
    ? "bg-white border-gray-200 shadow-lg shadow-gray-200/40"
    : "bg-neutral-900/65 border-neutral-800 shadow-xl shadow-black/20";
  const panelClass = isMinimal ? "bg-gray-50 border-gray-200" : "bg-neutral-950/55 border-neutral-800";
  const iconClass = isMinimal ? "bg-blue-50 text-blue-700" : "bg-cyan-400/10 text-cyan-300";

  return (
    <section className="max-w-6xl mx-auto py-12 px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-3xl"
      >
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${mutedClass}`}>
          {WORKING_STYLE.eyebrow}
        </p>
        <h2 className={`mt-3 text-3xl md:text-4xl font-bold leading-tight ${headingClass}`}>
          {WORKING_STYLE.headline}
        </h2>
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${textClass}`}>{WORKING_STYLE.summary}</p>
      </motion.div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {WORKING_STYLE.pillars.map((pillar, index) => {
          const Icon = pillarIcons[index] || Wrench;

          return (
            <motion.article
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
              className={`rounded-lg border p-5 md:p-6 ${cardClass}`}
            >
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconClass}`}>
                <Icon size={21} aria-hidden="true" />
              </div>

              <h3 className={`mt-5 text-xl font-bold ${headingClass}`}>{pillar.title}</h3>
              <p className={`mt-2 text-sm font-medium leading-relaxed ${textClass}`}>{pillar.subtitle}</p>

              <div className={`my-5 h-px ${isMinimal ? "bg-gray-200" : "bg-neutral-800"}`} />

              <ul className="space-y-3">
                {pillar.details.map((detail) => (
                  <li key={detail} className={`flex gap-3 text-sm leading-relaxed ${textClass}`}>
                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${isMinimal ? "bg-blue-600" : "bg-cyan-300"}`} />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delay: 0.16, duration: 0.45, ease: "easeOut" }}
        className={`mt-4 grid gap-3 rounded-lg border p-5 md:grid-cols-2 ${panelClass}`}
      >
        {WORKING_STYLE.introOptions.map((option) => (
          <div key={option.label}>
            <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${mutedClass}`}>{option.label}</p>
            <p className={`mt-2 text-sm md:text-base font-semibold leading-relaxed ${headingClass}`}>
              {option.headline}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
