import { CONTACT } from "../../../constants/constants";
import { focusRingClasses } from "../../../utils/accessibility";
import ProfessionalContactForm from "./ProfessionalContactForm";
import Reveal from "../../ui/common/Reveal";

export default function Contact() {
  const contactMethods = [
    {
      label: "Email",
      value: CONTACT.email,
      href: `mailto:${CONTACT.email}`,
    },
    {
      label: "Phone",
      value: CONTACT.phoneNo,
      href: `tel:${CONTACT.phoneNo.replace(/\s/g, "")}`,
    },
    {
      label: "Location",
      value: CONTACT.address,
      href: null,
    },
  ];

  const socialLinks = [
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

  return (
    <div className="mx-auto max-w-5xl px-4 py-20 md:px-8 md:py-24">
      <Reveal>
        <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">Contact</h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-400 md:text-lg">
          I am based in Melbourne and open to full-stack software engineer opportunities. Email is
          usually the cleanest path for role details, interview scheduling and technical context.
        </p>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <div>
            <dl className="space-y-6">
              {contactMethods.map((method) => (
                <div key={method.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">
                    {method.label}
                  </dt>
                  <dd className="mt-1">
                    {method.href ? (
                      <a
                        href={method.href}
                        className={`inline-block break-words py-1 text-base font-medium text-white transition-colors hover:text-cyan-300 ${focusRingClasses}`}
                      >
                        {method.value}
                      </a>
                    ) : (
                      <span className="text-base font-medium text-white">{method.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={`mailto:${CONTACT.email}`}
                className={`inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 ${focusRingClasses}`}
              >
                Email me directly
              </a>
              <a
                href={CONTACT.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center justify-center rounded-lg border border-neutral-500 px-5 py-3 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-300 hover:text-white ${focusRingClasses}`}
              >
                LinkedIn profile
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-400">
              {socialLinks.map((link) => (
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
          </div>

          <ProfessionalContactForm />
        </div>
      </Reveal>
    </div>
  );
}
