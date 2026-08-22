import { projectImages } from "./assets";
import {
  DSH_CASE_STUDY,
  MELBOURNE_CASE_STUDY,
  MONEYGUARD_CASE_STUDY,
  caseStudyHref,
} from "./caseStudies";

export const PROJECTS = [
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
