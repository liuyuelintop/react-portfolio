import { projectImages } from "./assets";
import {
  ALEX_CASE_STUDY,
  MELBOURNE_CASE_STUDY,
  MONEYGUARD_CASE_STUDY,
  caseStudyHref,
} from "./caseStudies";

export const PROJECTS = [
  {
    title: "MoneyGuard AI Finance Pipeline",
    image: projectImages.moneyguardAiFinancePipeline,
    roleFit:
      "Local data-minimization boundary, stream-safe retry semantics, and dependency-injected providers.",
    // Case-study copy is owned by caseStudies.js; this entry references it.
    description: {
      summary: MONEYGUARD_CASE_STUDY.summary,
    },
    caseStudyHref: caseStudyHref(MONEYGUARD_CASE_STUDY.slug),
    github: MONEYGUARD_CASE_STUDY.sourceUrl,
    technologies: {
      main: ["TypeScript", "Node.js", "Gemini LLM", "DeepSeek LLM"],
    },
    year: "2026",
  },
  {
    title: MELBOURNE_CASE_STUDY.title,
    image: projectImages.melbUniUltimate,
    roleFit:
      "Root-cause debugging, server-side authorization hardening, data modelling and regression-proof CI.",
    // Case-study copy is owned by caseStudies.js; this entry references it.
    // The modal-only `detailed` and `features` copy is gone rather than hidden:
    // the card links straight to the case study, so nothing rendered it, and
    // every claim it carried was contradicted by the source.
    description: {
      summary: MELBOURNE_CASE_STUDY.summary,
    },
    ownership: MELBOURNE_CASE_STUDY.ownership,
    caseStudyHref: caseStudyHref(MELBOURNE_CASE_STUDY.slug),
    github: MELBOURNE_CASE_STUDY.sourceUrl,
    // No `url`. The deployment was not independently verified in the latest
    // audit and a historical seeded admin credential still needs owner-side
    // rotation, so the card links to source rather than to a live site.
    technologies: {
      main: ["Next.js 15", "TypeScript", "MongoDB", "Vitest"],
    },
    year: "2025",
  },
];

// Not owned work: this is architecture Yuelin studied rather than authored, so
// it is presented as learning evidence and never as a flagship project. Every
// contribution below is directly attributable; the surrounding architecture is
// course material.
export const ARCHITECTURE_STUDY = {
  intro:
    "Recent architecture I studied hands-on, and the corrections that came out of it.",
  title: ALEX_CASE_STUDY.title,
  status: "Course-based study",
  // The depth lives on the study page, which states the attribution first and
  // carries the architecture diagram. The homepage block stays a summary.
  href: caseStudyHref(ALEX_CASE_STUDY.slug),
  summary:
    "Adapted Ed Donner’s Udemy ALEX capstone locally to study an SQS-backed five-role portfolio-analysis workflow and Terraform-defined AWS architecture.",
  // Owner-attested, not repository-verified: the stack was deployed to AWS
  // during the study and deliberately torn down afterwards. Stated in the past
  // tense so it never reads as a running system.
  deployment:
    "Deployed to AWS during the study, then torn down to stop the running cost.",
  // A record of what was worked with, not a claim of professional delivery.
  stack: [
    "Amazon Bedrock",
    "AWS Lambda",
    "Amazon SQS",
    "Terraform",
    "Aurora Serverless v2",
    "Next.js",
  ],
  // Each line traces to a commit in liuyuelintop/ed-ai-in-production-alex.
  // The verification script itself is course material; the guide step is not,
  // so this claims the step and never the script.
  contributions: [
    "Added a database-integrity verification step to guide 5.",
    "Fixed the Planner's local test harness, which created a job for a user that did not exist.",
    "Corrected guide 8's logging example and rewrote its Charter validation and Tagger explainability sections to match the real agent code.",
    "Documented the cross-region ECR fix for SageMaker deployments outside us-east-1.",
  ],
};

export const SUPPORTING_PROJECTS = [
  {
    title: "SaaS IDE Platform",
    summary:
      "Next.js IDE-style product with auth, payments, snippets and real-time collaboration concepts.",
    url: "https://codecraft.liuyuelin.dev/",
  },
  {
    title: "Remote Interview Platform",
    summary:
      "Technical interview workflow with coding environment, video/audio and candidate review flows.",
    status: "Private demo",
  },
  {
    title: "ApeUni FIB Extractor Monorepo",
    summary:
      "Browser automation toolkit packaged as both a Tampermonkey userscript and Chrome extension.",
    url: "https://github.com/liuyuelintop/apeuni-fib-extractor-monorepo",
  },
  {
    title: "Next Markdown Blog",
    summary:
      "Technical writing platform with MDX, syntax highlighting, SEO and static content workflows.",
    url: "https://blog.liuyuelin.dev/",
  },
];
