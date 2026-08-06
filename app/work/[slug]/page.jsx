import PropTypes from "prop-types";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { CASE_STUDIES, CASE_STUDY_SLUGS } from "../../../src/constants/caseStudies";
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

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES[slug];

  if (!caseStudy) notFound();

  const { privacy, verification, sample } = caseStudy;

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

          <figure className="mt-10">
            <pre className="overflow-x-auto rounded-lg border border-neutral-800 bg-neutral-900 p-4 text-sm leading-relaxed text-neutral-200 md:p-6">
              <code>{sample.lines.join("\n")}</code>
            </pre>
            <figcaption className="mt-3 text-sm leading-relaxed text-neutral-400">
              {sample.caption}
            </figcaption>
          </figure>

          <section className="mt-16" aria-labelledby="problem">
            <SectionHeading id="problem">The problem</SectionHeading>
            {caseStudy.problem.map((paragraph) => (
              <p key={paragraph} className="mt-5 leading-relaxed text-neutral-300">
                {paragraph}
              </p>
            ))}
          </section>

          <section className="mt-16" aria-labelledby="constraints">
            <SectionHeading id="constraints">Constraints</SectionHeading>
            <ul className="mt-5 space-y-3">
              {caseStudy.constraints.map((constraint) => (
                <li key={constraint} className="leading-relaxed text-neutral-300">
                  <span aria-hidden="true" className="mr-3 text-cyan-300">
                    —
                  </span>
                  {constraint}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16" aria-labelledby="workflow">
            <SectionHeading id="workflow">Workflow</SectionHeading>
            <ol className="mt-6 divide-y divide-neutral-800 border-y border-neutral-800">
              {caseStudy.workflow.map((stage) => (
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
          </section>

          <section className="mt-16" aria-labelledby="architecture">
            <SectionHeading id="architecture">Architecture</SectionHeading>
            <ul className="mt-5 space-y-4">
              {caseStudy.architecture.map((point) => (
                <li key={point} className="leading-relaxed text-neutral-300">
                  <span aria-hidden="true" className="mr-3 text-cyan-300">
                    —
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-16" aria-labelledby="decisions">
            <SectionHeading id="decisions">Decisions I can defend</SectionHeading>
            <ul className="mt-6 divide-y divide-neutral-800 border-y border-neutral-800">
              {caseStudy.decisions.map((item) => (
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
          </section>

          <section className="mt-16" aria-labelledby="privacy">
            <SectionHeading id="privacy">Privacy boundaries</SectionHeading>
            <p className="mt-5 leading-relaxed text-neutral-300">{privacy.intro}</p>
            {privacy.groups.map((group) => (
              <div key={group.heading} className="mt-10">
                <h3 className="text-lg font-semibold text-white">{group.heading}</h3>
                <ul className="mt-4 space-y-3">
                  {group.points.map((point) => (
                    <li key={point} className="leading-relaxed text-neutral-300">
                      <span aria-hidden="true" className="mr-3 text-cyan-300">
                        —
                      </span>
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
          </section>

          <section className="mt-16" aria-labelledby="verification">
            <SectionHeading id="verification">Verification</SectionHeading>
            <p className="mt-5 leading-relaxed text-neutral-300">{verification.intro}</p>
            <ul className="mt-6 space-y-6">
              {verification.items.map((item) => (
                <li key={item.heading}>
                  <h3 className="text-base font-semibold text-white">{item.heading}</h3>
                  <p className="mt-2 leading-relaxed text-neutral-300">{item.detail}</p>
                </li>
              ))}
            </ul>
            <p className="mt-8 border-l-2 border-neutral-700 pl-5 leading-relaxed text-neutral-400">
              {verification.gaps}
            </p>
          </section>

          <section className="mt-16" aria-labelledby="limitations">
            <SectionHeading id="limitations">Current limitations and what I would change</SectionHeading>
            <ul className="mt-5 space-y-4">
              {caseStudy.limitations.map((limitation) => (
                <li key={limitation} className="leading-relaxed text-neutral-300">
                  <span aria-hidden="true" className="mr-3 text-cyan-300">
                    —
                  </span>
                  {limitation}
                </li>
              ))}
            </ul>
          </section>
        </article>

        <div className="mt-16 flex flex-wrap gap-3 border-t border-neutral-800 pt-10">
          <a
            href={caseStudy.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition-colors hover:bg-neutral-200 ${focusRingClasses}`}
          >
            {caseStudy.sourceLabel}
            <ExternalLink size={16} aria-hidden="true" />
          </a>
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
