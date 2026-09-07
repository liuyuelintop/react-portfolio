import PropTypes from "prop-types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { CASE_STUDIES, CASE_STUDY_SLUGS } from "../../../src/constants/caseStudies";
import AlexArchitectureDiagram from "../../../src/components/ui/diagrams/AlexArchitectureDiagram";
import { focusRingClasses } from "../../../src/utils/accessibility";

const SITE_URL = "https://www.liuyuelin.dev/";
const OG_IMAGE_URL = `${SITE_URL}assets/og-image.png`;
const BACK_HREF = "/#projects";

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

const backLinkClasses = `inline-flex items-center gap-2 py-3 text-sm font-medium text-neutral-400 transition-colors hover:text-cyan-300 ${focusRingClasses}`;

// Diagrams are components rather than data, so a case study names one and the
// renderer resolves it. An unknown name renders nothing rather than throwing.
const DIAGRAMS = {
  alex: AlexArchitectureDiagram,
};

function SectionHeading({ id, children }) {
  return (
    <h2 id={id} className="text-2xl font-bold leading-snug text-white md:text-3xl">
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
    <span aria-hidden="true" className="mr-3 text-cyan-300">
      —
    </span>
  );
}

function SectionBody({ section }) {
  switch (section.kind) {
    case "prose":
      return section.paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-5 leading-relaxed text-neutral-300">
          {paragraph}
        </p>
      ));

    case "bullets":
      return (
        <ul className="mt-5 space-y-4">
          {section.items.map((item) => (
            <li key={item} className="leading-relaxed text-neutral-300">
              <Bullet />
              {item}
            </li>
          ))}
        </ul>
      );

    case "steps":
      return (
        <ol className="mt-6 divide-y divide-neutral-800 border-y border-neutral-800">
          {section.items.map((stage) => (
            <li key={stage.step} className="py-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="font-mono text-sm text-cyan-300">{stage.step}</span>
                <h3 className="text-base font-semibold text-white">{stage.label}</h3>
              </div>
              <p className="mt-2 leading-relaxed text-neutral-300">{stage.detail}</p>
              <p className="mt-2 font-mono text-xs text-neutral-500">{stage.source}</p>
            </li>
          ))}
        </ol>
      );

    case "decisions":
      return (
        <ul className="mt-6 divide-y divide-neutral-800 border-y border-neutral-800">
          {section.items.map((item) => (
            <li key={item.decision} className="py-6">
              <h3 className="text-base font-semibold text-white">{item.decision}</h3>
              <p className="mt-3 leading-relaxed text-neutral-300">{item.reason}</p>
              <p className="mt-3 leading-relaxed text-neutral-400">
                <span className="font-semibold text-neutral-300">Tradeoff accepted: </span>
                {item.tradeoff}
              </p>
            </li>
          ))}
        </ul>
      );

    case "groups":
      return (
        <>
          <p className="mt-5 leading-relaxed text-neutral-300">{section.intro}</p>
          {section.groups.map((group) => (
            <div key={group.heading} className="mt-10">
              <h3 className="text-lg font-semibold text-white">{group.heading}</h3>
              <ul className="mt-4 space-y-3">
                {group.points.map((point) => (
                  <li key={point} className="leading-relaxed text-neutral-300">
                    <Bullet />
                    {point}
                  </li>
                ))}
              </ul>
              {group.note && (
                <p className="mt-5 border-l-2 border-cyan-300 pl-5 leading-relaxed text-neutral-200">
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
          <p className="mt-5 leading-relaxed text-neutral-300">{section.intro}</p>
          <ul className="mt-6 space-y-6">
            {section.items.map((item) => (
              <li key={item.heading}>
                <h3 className="text-base font-semibold text-white">{item.heading}</h3>
                <p className="mt-2 leading-relaxed text-neutral-300">{item.detail}</p>
              </li>
            ))}
          </ul>
          {section.note && (
            <p className="mt-8 border-l-2 border-neutral-700 pl-5 leading-relaxed text-neutral-400">
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
            <p className="mt-5 leading-relaxed text-neutral-300">{section.intro}</p>
          )}
          <ul className="mt-6 divide-y divide-neutral-800 border-y border-neutral-800">
            {section.items.map((item) => (
              <li key={item.label} className="py-6">
                <h3 className="text-base font-semibold text-white">{item.label}</h3>
                <p className="mt-3 leading-relaxed text-neutral-300">{item.detail}</p>
                {item.href && (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-neutral-400 transition-colors hover:text-cyan-300 ${focusRingClasses}`}
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
            <p className="mt-5 leading-relaxed text-neutral-300">{section.intro}</p>
          )}
          {Diagram && (
            // The prose column is max-w-3xl, which is narrower than the drawing
            // needs. Once the viewport can spare the room, the figure breaks out
            // of the column rather than shrinking the labels.
            <figure className="mt-8 lg:-mx-24 xl:-mx-32">
              <Diagram />
              {section.caption && (
                <figcaption className="mt-3 text-sm leading-relaxed text-neutral-400">
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
    <div className="min-h-screen overflow-x-hidden bg-neutral-950 text-neutral-300 antialiased">
      <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4 md:px-8">
          <Link
            href="/"
            className={`text-base font-semibold text-white transition-colors hover:text-cyan-300 ${focusRingClasses}`}
          >
            Yuelin Liu
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href={BACK_HREF}
              className={`px-1 py-3 text-sm font-medium text-neutral-400 transition-colors hover:text-white ${focusRingClasses}`}
            >
              Selected Work
            </Link>
            <Link
              href="/#contact"
              className={`px-1 py-3 text-sm font-medium text-neutral-400 transition-colors hover:text-white ${focusRingClasses}`}
            >
              Contact
            </Link>
          </div>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-3xl px-4 pb-24 pt-10 md:px-8 md:pt-14">
        <Link href={BACK_HREF} className={backLinkClasses}>
          <ArrowLeft size={16} aria-hidden="true" />
          Back to Selected Work
        </Link>

        <article className="mt-6">
          <h1 className="text-3xl font-bold leading-tight text-white md:text-4xl">
            {caseStudy.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-neutral-300">{caseStudy.summary}</p>

          {/* Ownership and lifecycle, for studies that state them. A study that
              omits it renders exactly as it did before. */}
          {caseStudy.ownership && (
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">{caseStudy.ownership}</p>
          )}

          {caseStudy.sections.map((section, index) =>
            section.kind === "sample" ? (
              <figure key="sample" className="mt-10">
                <pre className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-sm leading-relaxed text-neutral-200 md:p-6">
                  <code>{section.lines.join("\n")}</code>
                </pre>
                <figcaption className="mt-3 text-sm leading-relaxed text-neutral-400">
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

        <div className="mt-16 flex flex-wrap gap-3 border-t border-neutral-800 pt-10">
          {caseStudy.sourceUrl && (
            <a
              href={caseStudy.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 ${focusRingClasses}`}
            >
              {caseStudy.sourceLabel}
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          )}
          <Link
            href={BACK_HREF}
            className={`inline-flex items-center justify-center gap-2 rounded-lg border border-neutral-500 px-5 py-3 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-300 hover:text-white ${focusRingClasses}`}
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Back to Selected Work
          </Link>
        </div>
      </main>
    </div>
  );
}
