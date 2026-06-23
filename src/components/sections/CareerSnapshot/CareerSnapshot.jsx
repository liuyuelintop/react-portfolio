import { motion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  BriefcaseBusiness,
  CheckCircle2,
  MessageSquareText,
  ShieldCheck,
} from "lucide-react";
import { CAREER_SNAPSHOT } from "../../../constants/constants";
import { useTheme } from "../../../contexts/ThemeContext";

const strengthIcons = [BriefcaseBusiness, ShieldCheck, BrainCircuit];

export default function CareerSnapshot() {
  const { currentTheme } = useTheme();
  const isMinimal = currentTheme === "minimal";

  const headingClass = isMinimal ? "text-gray-950" : "text-white";
  const textClass = isMinimal ? "text-gray-700" : "text-neutral-300";
  const mutedClass = isMinimal ? "text-gray-500" : "text-neutral-400";
  const cardClass = isMinimal
    ? "bg-white border-gray-200 shadow-lg shadow-gray-200/50"
    : "bg-neutral-900/70 border-neutral-800 shadow-xl shadow-black/20";
  const accentClass = isMinimal ? "text-blue-700 bg-blue-50" : "text-cyan-300 bg-cyan-400/10";

  return (
    <section className="max-w-6xl mx-auto px-4 lg:px-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-6 max-w-3xl"
      >
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${mutedClass}`}>
          {CAREER_SNAPSHOT.eyebrow}
        </p>
        <h2 className={`mt-3 text-3xl md:text-4xl font-bold leading-tight ${headingClass}`}>
          {CAREER_SNAPSHOT.headline}
        </h2>
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${textClass}`}>{CAREER_SNAPSHOT.summary}</p>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-3">
        {CAREER_SNAPSHOT.strengths.map((strength, index) => {
          const Icon = strengthIcons[index] || CheckCircle2;

          return (
            <motion.article
              key={strength.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
              className={`rounded-lg border p-5 md:p-6 ${cardClass}`}
            >
              <div className="flex items-start gap-3">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${accentClass}`}>
                  <Icon size={21} aria-hidden="true" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold leading-snug ${headingClass}`}>{strength.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed ${textClass}`}>{strength.statement}</p>
                </div>
              </div>

              <div className={`my-5 h-px ${isMinimal ? "bg-gray-200" : "bg-neutral-800"}`} />

              <div className="space-y-3">
                <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${mutedClass}`}>Evidence Trail</p>
                {strength.evidence.map((item) => (
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

              <div
                className={`mt-5 rounded-lg border p-3 ${
                  isMinimal ? "bg-gray-50 border-gray-200" : "bg-neutral-950/60 border-neutral-800"
                }`}
              >
                <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${mutedClass}`}>Recruiter read</p>
                <p className={`mt-2 text-sm leading-relaxed ${textClass}`}>{strength.recruiterRead}</p>
              </div>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delay: 0.16, duration: 0.45, ease: "easeOut" }}
        className={`mt-4 rounded-lg border p-5 md:p-6 ${cardClass}`}
      >
        <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <div className="flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${accentClass}`}>
                <MessageSquareText size={21} aria-hidden="true" />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${headingClass}`}>Interview hooks</h3>
                <p className={`mt-1 text-sm ${mutedClass}`}>Concrete topics that make the conversation stronger.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {CAREER_SNAPSHOT.interviewHooks.map((hook) => (
              <div
                key={hook.prompt}
                className={`rounded-lg border p-4 ${
                  isMinimal ? "bg-gray-50 border-gray-200" : "bg-neutral-950/50 border-neutral-800"
                }`}
              >
                <div className="flex gap-3">
                  <ArrowRight
                    size={17}
                    className={`mt-0.5 shrink-0 ${isMinimal ? "text-blue-700" : "text-cyan-300"}`}
                    aria-hidden="true"
                  />
                  <div>
                    <p className={`text-sm font-semibold ${headingClass}`}>{hook.prompt}</p>
                    <p className={`mt-1 text-sm leading-relaxed ${textClass}`}>{hook.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-current/10 pt-5">
          {CAREER_SNAPSHOT.targetStack.map((tech) => (
            <span
              key={tech}
              className={`rounded-md border px-2.5 py-1 text-xs font-medium ${
                isMinimal ? "bg-white border-gray-200 text-gray-700" : "bg-neutral-800 border-neutral-700 text-neutral-300"
              }`}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
