import { HiDownload } from "react-icons/hi";
import { CONTACT, HERO_CONTENT } from "../../../constants/constants";
import { focusRingClasses } from "../../../utils/accessibility";
import Reveal from "../../ui/common/Reveal";

const QUIET_LINKS = [
  {
    label: "LinkedIn",
    href: CONTACT.socials.linkedin,
    ariaLabel: "View Yuelin Liu's LinkedIn profile",
  },
  {
    label: "GitHub",
    href: CONTACT.socials.github,
    ariaLabel: "View Yuelin Liu's GitHub profile",
  },
  {
    label: "Writing",
    href: CONTACT.socials.blog,
    ariaLabel: "Read Yuelin Liu's technical writing",
  },
];

export default function Hero() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-20 pt-32 md:px-8 md:pb-28 md:pt-44">
      <Reveal onMount>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
          {HERO_CONTENT.name} · {HERO_CONTENT.eyebrow}
        </p>

        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-tight text-white md:text-6xl">
          {HERO_CONTENT.headline}
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-300 md:text-xl">
          {HERO_CONTENT.summary}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <a
            href={HERO_CONTENT.resumeUrl}
            download="Yuelin-Liu-Resume.pdf"
            aria-label="Download Yuelin Liu's resume as a PDF"
            className={`inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 ${focusRingClasses}`}
          >
            <HiDownload className="text-lg" aria-hidden="true" />
            Download Resume
          </a>
          <a
            href="#contact"
            className={`inline-flex items-center justify-center rounded-lg border border-neutral-500 px-5 py-3 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-300 hover:text-white ${focusRingClasses}`}
          >
            Contact
          </a>
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-400">
          {QUIET_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.ariaLabel}
              className={`py-1 underline-offset-4 transition-colors hover:text-white hover:underline ${focusRingClasses}`}
            >
              {link.label}
            </a>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
