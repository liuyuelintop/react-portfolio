import { CONTACT } from "../../../constants/constants";
import ProfessionalContactForm from "./ProfessionalContactForm";

const ELSEWHERE = [
  { label: "LinkedIn", href: CONTACT.socials.linkedin },
  { label: "GitHub", href: CONTACT.socials.github },
  { label: "Writing", href: CONTACT.socials.blog },
];

export default function Contact() {
  return (
    <div className="wrap">
      <div className="contact-grid">
        <div className="lead">
          <h2 className="sec">Contact</h2>
          <p className="standfirst">{CONTACT.intro}</p>
          <a className="mail" href={`mailto:${CONTACT.email}`}>
            {CONTACT.email}
          </a>
          <dl className="reach">
            <dt>Phone</dt>
            <dd>
              <a className="quiet" href={`tel:${CONTACT.phoneNo.replace(/\s/g, "")}`}>
                {CONTACT.phoneNo}
              </a>
            </dd>
            <dt>Location</dt>
            <dd>{CONTACT.address}</dd>
            <dt>Elsewhere</dt>
            <dd>
              {ELSEWHERE.map((link) => (
                <a
                  key={link.label}
                  className="quiet"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              ))}
            </dd>
          </dl>
        </div>

        <ProfessionalContactForm />
      </div>

      <footer className="colophon">
        <p>Yuelin Liu, Melbourne, 2026.</p>
        <p>Set in Archivo and Schibsted Grotesk.</p>
      </footer>
    </div>
  );
}
