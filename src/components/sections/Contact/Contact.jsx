import { motion } from "framer-motion";
import {
  CheckCircle2,
  Github,
  Linkedin,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
} from "lucide-react";
import { CONTACT } from "../../../constants/constants";
import { useTheme } from "../../../contexts/ThemeContext";
import { getThemeFocusRing } from "../../../utils/accessibility";
import ProfessionalContactForm from "./ProfessionalContactForm";
import SectionHeading from "../../ui/common/SectionHeading";

export default function Contact() {
  const { currentTheme } = useTheme();
  const isMinimal = currentTheme === "minimal";
  const focusRing = getThemeFocusRing(currentTheme);

  const styles = {
    heading: isMinimal ? "text-gray-950" : "text-white",
    text: isMinimal ? "text-gray-700" : "text-neutral-300",
    muted: isMinimal ? "text-gray-500" : "text-neutral-400",
    card: isMinimal
      ? "bg-white border-gray-200 shadow-lg shadow-gray-200/40"
      : "bg-neutral-900/65 border-neutral-800 shadow-xl shadow-black/20",
    panel: isMinimal ? "bg-gray-50 border-gray-200" : "bg-neutral-950/55 border-neutral-800",
    icon: isMinimal ? "bg-blue-50 text-blue-700" : "bg-cyan-400/10 text-cyan-300",
    accent: isMinimal ? "text-blue-600" : "text-cyan-300",
    chip: isMinimal ? "bg-white border-gray-200 text-gray-700" : "bg-neutral-800 border-neutral-700 text-neutral-300",
    primaryButton: isMinimal ? "bg-gray-950 text-white hover:bg-gray-800" : "bg-white text-neutral-950 hover:bg-neutral-200",
    secondaryButton: isMinimal
      ? "border-gray-200 text-gray-700 hover:bg-gray-50"
      : "border-neutral-700 text-neutral-300 hover:bg-neutral-800",
  };

  const contactMethods = [
    {
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
      icon: Mail,
    },
    {
      label: "Phone",
      value: CONTACT.phoneNo,
      href: `tel:${CONTACT.phoneNo.replace(/\s/g, "")}`,
      icon: Phone,
    },
    {
      label: "Location",
      value: CONTACT.address,
      href: null,
      icon: MapPin,
    },
  ];

  const socialLinks = [
    { label: "LinkedIn", href: CONTACT.socials.linkedin, icon: Linkedin },
    { label: "GitHub", href: CONTACT.socials.github, icon: Github },
    { label: "Writing", href: CONTACT.socials.blog, icon: MessageSquareText },
  ];

  const hiringSignals = [
    "Melbourne hybrid or on-site conversations",
    "Full-stack software engineer roles for 2026",
    "React, Next.js, Node.js, APIs, cloud and AI workflow fit",
    "Full Australian work rights until Mar 2029",
  ];

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
          Next Step
        </p>
        <SectionHeading level="section" animate={false} className="mt-3">
          Let&apos;s talk about the role
        </SectionHeading>
        <p className={`mt-4 text-base md:text-lg leading-relaxed ${styles.text}`}>
          If the work involves product UI, API contracts, cloud delivery or AI-enabled workflows, the best next step is
          a direct conversation. I am based in Melbourne and open to full-stack software engineer opportunities.
        </p>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-[0.92fr_1.08fr]">
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className={`rounded-lg border p-5 md:p-6 ${styles.card}`}
        >
          <div className="flex items-start gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}>
              <MessageSquareText size={21} aria-hidden="true" />
            </div>
            <div>
              <h3 className={`text-xl font-bold ${styles.heading}`}>Fastest ways to reach me</h3>
              <p className={`mt-2 text-sm leading-relaxed ${styles.text}`}>
                Recruiters and hiring managers can contact me directly. Email is usually the cleanest path for role
                details, interview scheduling and technical context.
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              const content = (
                <>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}>
                    <Icon size={18} aria-hidden="true" />
                  </span>
                  <span>
                    <span className={`block text-xs font-semibold uppercase tracking-[0.16em] ${styles.muted}`}>
                      {method.label}
                    </span>
                    <span className={`mt-1 block break-words text-sm font-semibold ${styles.heading}`}>
                      {method.value}
                    </span>
                  </span>
                </>
              );

              if (!method.href) {
                return (
                  <div key={method.label} className={`flex gap-3 rounded-lg border p-4 ${styles.panel}`}>
                    {content}
                  </div>
                );
              }

              return (
                <a
                  key={method.label}
                  href={method.href}
                  className={`flex gap-3 rounded-lg border p-4 transition-colors ${styles.panel} ${focusRing}`}
                >
                  {content}
                </a>
              );
            })}
          </div>

          <div className={`mt-5 rounded-lg border p-4 ${styles.panel}`}>
            <p className={`text-xs font-semibold uppercase tracking-[0.16em] ${styles.muted}`}>
              Hiring fit
            </p>
            <div className="mt-3 space-y-2.5">
              {hiringSignals.map((signal) => (
                <div key={signal} className="flex gap-3">
                  <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${styles.accent}`} aria-hidden="true" />
                  <p className={`text-sm leading-relaxed ${styles.text}`}>{signal}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <a
              href={`mailto:${CONTACT.email}`}
              className={`inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${styles.primaryButton} ${focusRing}`}
            >
              Email me directly
            </a>
            <a
              href={CONTACT.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors ${styles.secondaryButton} ${focusRing}`}
            >
              LinkedIn profile
            </a>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {socialLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${styles.chip} ${focusRing}`}
                >
                  <Icon size={14} aria-hidden="true" />
                  {link.label}
                </a>
              );
            })}
          </div>
        </motion.article>

        <ProfessionalContactForm />
      </div>
    </section>
  );
}
