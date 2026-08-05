import PortfolioApp from "../src/App";

const SITE_URL = "https://www.liuyuelin.dev/";
const OG_IMAGE_URL = `${SITE_URL}assets/og-image.png`;
const DESCRIPTION =
  "Melbourne-based full-stack software developer building React, TypeScript and Node.js applications for SaaS platforms, internal tools and AI-assisted workflows.";
const SOCIAL_DESCRIPTION =
  "Explore full-stack case studies across React, Next.js, Node.js, cloud deployments, testing and AI-assisted workflows.";

export const dynamic = "error";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Yuelin Liu | Full-Stack Software Developer in Melbourne",
  description: DESCRIPTION,
  authors: [{ name: "Yuelin Liu" }],
  keywords: [
    "Full-stack software developer Melbourne",
    "React developer Melbourne",
    "Next.js developer",
    "Node.js developer",
    "TypeScript developer",
    "REST APIs",
    "Docker",
    "Kubernetes",
    "AI workflows",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "profile",
    title: "Yuelin Liu | Technical Portfolio",
    description: SOCIAL_DESCRIPTION,
    url: SITE_URL,
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
    title: "Yuelin Liu's Technical Portfolio",
    images: [OG_IMAGE_URL],
  },
  appleWebApp: {
    capable: true,
    title: "Yuelin's Portfolio",
    statusBarStyle: "black-translucent",
  },
  other: {
    image: OG_IMAGE_URL,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Yuelin Liu",
  image: OG_IMAGE_URL,
  jobTitle: "Full-Stack Software Developer",
  url: SITE_URL,
  sameAs: [
    "https://www.linkedin.com/in/liuyuelintop/",
    "https://github.com/liuyuelintop",
    "https://blog.liuyuelin.dev/",
  ],
  description: DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Melbourne",
    addressRegion: "VIC",
    addressCountry: "Australia",
  },
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "University of Melbourne",
    url: "https://www.unimelb.edu.au",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Express",
    "REST APIs",
    "Docker",
    "Kubernetes",
    "AWS",
    "GCP",
    "Playwright",
    "AI workflows",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        id="person-json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <PortfolioApp />
    </>
  );
}
