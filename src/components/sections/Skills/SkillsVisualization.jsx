import { motion } from "framer-motion";
import { CheckCircle2, Layers3 } from "lucide-react";
import { CAPABILITY_AREAS, TOOLBOX_GROUPS } from "../../../constants/skills";
import { useTheme } from "../../../contexts/ThemeContext";
import SectionHeading from "../../ui/common/SectionHeading";

export default function SkillsVisualization() {
  const { currentTheme } = useTheme();
  const isMinimal = currentTheme === "minimal";

  const headingClass = isMinimal ? "text-gray-950" : "text-white";
  const textClass = isMinimal ? "text-gray-700" : "text-neutral-300";
  const mutedClass = isMinimal ? "text-gray-500" : "text-neutral-400";
  const cardClass = isMinimal
    ? "bg-white border-gray-200 shadow-lg shadow-gray-200/40"
    : "bg-neutral-900/65 border-neutral-800 shadow-xl shadow-black/20";
  const panelClass = isMinimal ? "bg-gray-50 border-gray-200" : "bg-neutral-950/55 border-neutral-800";

  return (
    <section className="max-w-6xl mx-auto py-16 px-4 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <SectionHeading level="section">Engineering Capabilities</SectionHeading>
        <p className={`text-lg max-w-3xl mx-auto ${mutedClass}`}>
          Practical ownership areas for teams that need a developer who can connect product UI,
          backend contracts, deployment paths and AI workflow reliability.
        </p>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-3">
        {CAPABILITY_AREAS.map((area, index) => (
          <motion.article
            key={area.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
            className={`rounded-lg border p-5 md:p-6 ${cardClass}`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                  isMinimal ? "bg-blue-50 text-blue-700" : "bg-cyan-400/10 text-cyan-300"
                }`}
              >
                <Layers3 size={21} aria-hidden="true" />
              </div>
              <div>
                <h3 className={`text-xl font-bold leading-snug ${headingClass}`}>{area.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${textClass}`}>{area.summary}</p>
              </div>
            </div>

            <div className={`my-5 h-px ${isMinimal ? "bg-gray-200" : "bg-neutral-800"}`} />

            <div className="space-y-5">
              <div>
                <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${mutedClass}`}>Can own</p>
                <div className="mt-3 space-y-2.5">
                  {area.canOwn.map((item) => (
                    <div key={item} className="flex gap-3">
                      <CheckCircle2
                        size={16}
                        className={`mt-0.5 shrink-0 ${isMinimal ? "text-blue-600" : "text-cyan-300"}`}
                        aria-hidden="true"
                      />
                      <p className={`text-sm leading-relaxed ${textClass}`}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={`rounded-lg border p-4 ${panelClass}`}>
                <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${mutedClass}`}>Evidence</p>
                <ul className="mt-3 space-y-2">
                  {area.evidence.map((item) => (
                    <li key={item} className={`text-sm leading-relaxed ${textClass}`}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {area.stack.map((tool) => (
                  <span
                    key={tool}
                    className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
                      isMinimal ? "bg-white border-gray-200 text-gray-700" : "bg-neutral-800 border-neutral-700 text-neutral-300"
                    }`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delay: 0.16, duration: 0.45, ease: "easeOut" }}
        className={`mt-4 rounded-lg border p-5 md:p-6 ${panelClass}`}
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {TOOLBOX_GROUPS.map((group) => (
            <div key={group.label}>
              <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${mutedClass}`}>{group.label}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <span
                    key={tool}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                      isMinimal ? "bg-white text-gray-700 border border-gray-200" : "bg-neutral-900 text-neutral-300 border border-neutral-800"
                    }`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
