import { projectImages } from "./assets";
import {
  DISPATCH_CASE_STUDY,
  DSH_CASE_STUDY,
  MARSHAL_CASE_STUDY,
  MELBOURNE_CASE_STUDY,
  MONEYGUARD_CASE_STUDY,
  caseStudyHref,
} from "./caseStudies";

export const PROJECTS = [
  {
    title: MARSHAL_CASE_STUDY.title,
    image: projectImages.marshal,
    imageCaption: "Pipeline board on desktop and phone · Fictional test data",
    description: {
      summary:
        "A self-hosted job-application workspace for laptop and phone: capture a job ad, check the fit, draft material that only says what I can back up, and track each application to an offer.",
    },
    ownership: MARSHAL_CASE_STUDY.ownership,
    implementation:
      "Rebuilds the ideas proven in my Mac-only Dispatch tool as one private instance that my own devices reach over Tailscale, with no public port. Designed to be shared: each person runs their own copy with Docker and their own API key, so nobody hosts anyone else's data.",
    caseStudyHref: caseStudyHref(MARSHAL_CASE_STUDY.slug),
    technologies: {
      main: ["TypeScript", "React / Vite", "Node.js", "Docker"],
    },
    year: "2026",
  },
  {
    title: DISPATCH_CASE_STUDY.title,
    image: projectImages.jobSearchDispatch,
    imageCaption: "Jobs workspace · Synthetic demo data",
    description: {
      summary: "An AI-powered job-search workspace for assessing opportunities, preparing tailored applications and keeping every next step organised.",
    },
    ownership: DISPATCH_CASE_STUDY.ownership,
    implementation:
      "Connects captured job ads with saved experience to assess fit and draft application materials, including cover letters—without repeatedly rebuilding context in an AI chat. Job ads arrive through a guarded headless fetch or a browser extension, the Writer runs on bring-your-own-key providers or a signed-in Codex or Claude subscription, and application progress and follow-ups stay together.",
    caseStudyHref: caseStudyHref(DISPATCH_CASE_STUDY.slug),
    technologies: {
      main: ["React / Vite", "TypeScript", "Node.js", "LLM APIs"],
    },
    year: "2026",
  },
  {
    title: DSH_CASE_STUDY.title,
    image: projectImages.dshConversationExporter,
    description: {
      summary:
        "Exports full DeepSeek Harness conversations or selected whole turns as clean Markdown for reading, Git and cross-assistant handoff.",
    },
    ownership: "Built and packaged as a DSH Web plugin · 2026",
    implementation:
      "Preserves Markdown and Unicode, keeps selective turn handling bounded, and excludes reasoning, tool activity and runtime metadata from exports.",
    caseStudyHref: caseStudyHref(DSH_CASE_STUDY.slug),
    github: DSH_CASE_STUDY.sourceUrl,
    technologies: {
      main: ["JavaScript", "Node.js", "DSH plugin APIs", "Markdown"],
    },
    year: "2026",
  },
  {
    title: MONEYGUARD_CASE_STUDY.title,
    image: projectImages.moneyguardAiFinancePipeline,
    description: {
      summary:
        "Turns a timecard photo into a weekly wage, spending and surplus audit.",
    },
    ownership: "Designed and built the end-to-end pipeline · 2026",
    implementation:
      "Keeps ledger calculations local, validates model-generated OCR with Zod, and streams audit prose through separate providers.",
    caseStudyHref: caseStudyHref(MONEYGUARD_CASE_STUDY.slug),
    github: MONEYGUARD_CASE_STUDY.sourceUrl,
    technologies: {
      main: ["TypeScript", "Node.js", "Gemini LLM", "DeepSeek LLM"],
    },
    year: "2026",
  },
];

export const SUPPORTING_PROJECTS = [
  {
    title: "AI Harness",
    status: "Current work",
    summary:
      "GitHub-native AI-assisted engineering workflow built around NEXT → IMPLEMENT → ACCEPT → SHIP, exact PR-head SHA acceptance, deterministic verification and explicit human approval.",
  },
  {
    title: MELBOURNE_CASE_STUDY.title,
    summary:
      "Revisited a Next.js/MongoDB application to centralise server-side authorisation and turn authentication and write-path defects into regression tests and CI.",
    url: MELBOURNE_CASE_STUDY.sourceUrl,
  },
  {
    title: "Client Data Delivery Validator",
    summary:
      "Python/pandas validation workflow for synthetic client-delivery CSV data with structured validation results and 12 pytest regression cases.",
    url: "https://github.com/liuyuelintop/client-data-delivery-validator",
  },
];
