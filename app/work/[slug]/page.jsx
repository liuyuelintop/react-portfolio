import PropTypes from "prop-types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { CASE_STUDIES, CASE_STUDY_SLUGS } from "../../../src/constants/caseStudies";
import AlexArchitectureDiagram from "../../../src/components/ui/diagrams/AlexArchitectureDiagram";
import Masthead from "../../../src/components/layout/Masthead/Masthead";
import { focusRingClasses } from "../../../src/utils/accessibility";

const SITE_URL = "https://www.liuyuelin.dev/";
const OG_IMAGE_URL = `${SITE_URL}assets/og-image.png`;
const BACK_HREF = "/#projects";
const BACK_LABEL = "Back to all work";
const NAV_LINKS = [
  { label: "Work", href: BACK_HREF },
  { label: "Contact", href: "/#contact" },
];

export const dynamic = "error";
export const dynamicParams = false;

export function generateStaticParams() {
  return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES[slug];

  if (!caseStudy) return {};

  return {
    metadataBase: new URL(SITE_URL),
    title: caseStudy.metaTitle,
    description: caseStudy.metaDescription,
    authors: [{ name: "Yuelin Liu" }],
    alternates: {
      canonical: caseStudy.canonical,
    },
    openGraph: {
      type: "article",
      title: caseStudy.metaTitle,
      description: caseStudy.metaDescription,
      url: caseStudy.canonical,
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: "Yuelin Liu's portfolio cover - Full-Stack Software Developer in Melbourne",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@YuelinLiu_Dev",
      title: caseStudy.metaTitle,
      images: [OG_IMAGE_URL],
    },
  };
}

const backLinkClasses = `inline-flex items-center gap-2 py-3 text-sm font-medium text-muted transition-colors hover:text-link ${focusRingClasses}`;

// Diagrams are components rather than data, so a case study names one and the
// renderer resolves it. An unknown name renders nothing rather than throwing.
const DIAGRAMS = {
  alex: AlexArchitectureDiagram,
};

function SectionHeading({ id, children }) {
  return (
    <h2 id={id} className="font-serif text-3xl font-normal leading-tight tracking-tight text-ink md:text-4xl">
      {children}
    </h2>
  );
}

SectionHeading.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

function Bullet() {
  return (
    <span aria-hidden="true" className="mr-3 text-link">
      —
    </span>
  );
}

function SectionBody({ section }) {
  switch (section.kind) {
    case "disclosure":
      return (
        <details className="mt-5 rounded-lg border border-rule p-5">
          <summary className={`cursor-pointer font-medium text-link ${focusRingClasses}`}>
            {section.summary}
          </summary>
          {section.sections.map((child, index) => (
            <div key={child.id || index} className="mt-10">
              {child.heading && <h3 className="font-serif text-2xl font-medium text-ink">{child.heading}</h3>}
              <SectionBody section={child} />
            </div>
          ))}
        </details>
      );

    case "sample":
      return (
        <figure>
          <pre className="overflow-x-auto rounded-lg border border-rule bg-lift p-4 text-sm text-ink">
            <code>{section.lines.join("\n")}</code>
          </pre>
          <figcaption className="mt-3 text-sm text-muted">{section.caption}</figcaption>
        </figure>
      );

    case "prose":
      return section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-5 leading-relaxed text-body">
          {paragraph}
        </p>
      ));

    case "bullets":
      return (
        <ul className="mt-5 space-y-4">
          {section.items.map((item) => (
            <li key={item} className="leading-relaxed text-body">
              <Bullet />
              {item}
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="mt-6 divide-y divide-rule border-y border-rule">
          {section.items.map((stage) => (
            <li key={stage.step} className="py-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-sm text-link">{stage.step}</span>
                <h3 className="text-base font-semibold text-ink">{stage.label}</h3>
              </div>
              <p className="mt-2 leading-relaxed text-body">{stage.detail}</p>
              <p className="mt-2 font-mono text-xs text-muted">{stage.source}</p>
            </li>
          ))}
        </ol>
      );

    case "decisions":
      return (
        <ul className="mt-6 divide-y divide-rule border-y border-rule">
          {section.items.map((item) => (
            <li key={item.decision} className="py-6">
              <h3 className="text-base font-semibold text-ink">{item.decision}</h3>
              <p className="mt-3 leading-relaxed text-body">{item.reason}</p>
              <p className="mt-3 leading-relaxed text-muted">
                <span className="font-semibold text-body">Tradeoff accepted: </span>
                {item.tradeoff}
              </p>
            </li>
          ))}
        </ul>
      );

    case "groups":
      return (
        <>
          <p className="mt-5 leading-relaxed text-body">{section.intro}</p>
          {section.groups.map((group) => (
            <div key={group.heading} className="mt-10">
              <h3 className="font-serif text-xl font-medium text-ink">{group.heading}</h3>
              <ul className="mt-4 space-y-3">
                {group.points.map((point) => (
                  <li key={point} className="leading-relaxed text-body">
                    <Bullet />
                    {point}
                  </li>
                ))}
              </ul>
              {group.note && (
                <p className="mt-5 border-l-2 border-link pl-5 leading-relaxed text-ink">
                  {group.note}
                </p>
              )}
            </div>
          ))}
        </>
      );

    case "details":
      return (
        <>
          <p className="mt-5 leading-relaxed text-body">{section.intro}</p>
          <ul className="mt-6 space-y-6">
            {section.items.map((item) => (
              <li key={item.heading}>
                <h3 className="text-base font-semibold text-ink">{item.heading}</h3>
                <p className="mt-2 leading-relaxed text-body">{item.detail}</p>
              </li>
            ))}
          </ul>
          {section.note && (
            <p className="mt-8 border-l-2 border-rule pl-5 leading-relaxed text-muted">
              {section.note}
            </p>
          )}
        </>
      );

    // Each item carries its own evidence link, so a claim and the diff that
    // backs it stay adjacent rather than collected into a footnote.
    case "links":
      return (
        <>
          {section.intro && (
            <p className="mt-5 leading-relaxed text-body">{section.intro}</p>
          )}
          <ul className="mt-6 divide-y divide-rule border-y border-rule">
            {section.items.map((item) => (
              <li key={item.label} className="py-6">
                <h3 className="text-base font-semibold text-ink">{item.label}</h3>
                <p className="mt-3 leading-relaxed text-body">{item.detail}</p>
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors hover:text-link ${focusRingClasses}`}
                  >
                    {item.linkLabel}
                    <ExternalLink size={13} aria-hidden="true" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </>
      );

    case "diagram": {
      const Diagram = DIAGRAMS[section.diagram];

      return (
        <>
          {section.intro && (
            <p className="mt-5 leading-relaxed text-body">{section.intro}</p>
          )}
          {Diagram && (
            // The prose column is max-w-3xl, which is narrower than the drawing
            // needs. Once the viewport can spare the room, the figure breaks out
            // of the column rather than shrinking the labels.
            <figure className="mt-8 lg:-mx-24 xl:-mx-32">
              <Diagram />
              {section.caption && (
                <figcaption className="mt-3 text-sm leading-relaxed text-muted">
                  {section.caption}
                </figcaption>
              )}
            </figure>
          )}
        </>
      );
    }

    default:
      return null;
  }
}

SectionBody.propTypes = {
  section: PropTypes.object.isRequired,
};

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES[slug];

  if (!caseStudy) notFound();

  return (
    <div className="min-h-screen overflow-x-clip bg-paper text-body antialiased">
      <Masthead homeHref="/" links={NAV_LINKS} />

      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-24 pt-10 md:px-8 md:pt-14">
        <Link href={BACK_HREF} className={backLinkClasses}>
          <ArrowLeft size={16} aria-hidden="true" />
          {BACK_LABEL}
        </Link>

        <article className="mt-6">
          <h1 className="font-serif text-4xl font-normal leading-[1.05] tracking-tight text-ink md:text-6xl">
            {caseStudy.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-body">{caseStudy.summary}</p>

          {/* Ownership and lifecycle, for studies that state them. A study that
              omits it renders exactly as it did before. */}
          {caseStudy.ownership && (
            <p className="mt-4 text-sm leading-relaxed text-muted">{caseStudy.ownership}</p>
          )}

          {caseStudy.sections.map((section, index) =>
            section.kind === "sample" ? (
              <figure key="sample" className="mt-10">
                <pre className="overflow-x-auto rounded-lg border border-rule bg-lift p-4 text-sm leading-relaxed text-ink md:p-6">
                  <code>{section.lines.join("\n")}</code>
                </pre>
                <figcaption className="mt-3 text-sm leading-relaxed text-muted">
                  {section.caption}
                </figcaption>
              </figure>
            ) : (
              <section
                key={section.id}
                className={index === 0 ? "mt-10" : "mt-16"}
                aria-labelledby={section.id}
              >
                <SectionHeading id={section.id}>{section.heading}</SectionHeading>
                <SectionBody section={section} />
              </section>
            ),
          )}
        </article>

        <div className="mt-16 flex flex-wrap gap-3 border-t border-rule pt-10">
          {caseStudy.sourceUrl && (
            <a
              href={caseStudy.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors hover:bg-link ${focusRingClasses}`}
            >
              {caseStudy.sourceLabel}
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          )}
          <Link
            href={BACK_HREF}
            className={`inline-flex items-center justify-center gap-2 rounded-full border border-ink px-5 py-3 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper ${focusRingClasses}`}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {BACK_LABEL}
          </Link>
        </div>
      </main>
    </div>
  );
}
