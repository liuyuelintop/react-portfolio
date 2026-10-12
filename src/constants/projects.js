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
    image: "/images/marshal-workflow.svg",
    imageAlt: "Marshal workflow: independent cover letter and résumé editors, optional assessment, guarded export and revisioned saves",
    imageCaption: "Merged workflow diagram · Not a product screenshot",
    description: {
      summary:
        "A self-hosted application workspace that makes writing and reviewing documents simpler across laptop and phone.",
    },
    ownership: MARSHAL_CASE_STUDY.ownership,
    implementation:
      "Removed mandatory AI assessment and approval steps while retaining evidence permissions, independent document editing, guarded export and revision conflicts that protect newer work.",
    caseStudyHref: caseStudyHref(MARSHAL_CASE_STUDY.slug),
    technologies: {
      main: ["TypeScript", "React / Vite", "Node.js", "Docker"],
    },
    year: "2026",
  },
  {
    title: MONEYGUARD_CASE_STUDY.title,
    image: "/images/moneyguard-planning.svg",
    imageAlt: "MoneyGuard decision flow: reviewed inputs feed deterministic surplus, labour-cost and payday-buffer calculations",
    imageCaption: "Planning flow diagram · Not a product screenshot",
    description: {
      summary:
        "A local-first wage planning tool for understanding weekly surplus, purchase costs in paid hours and cash before payday.",
    },
    ownership: MONEYGUARD_CASE_STUDY.ownership,
    implementation:
      "Built deterministic cash-flow and delayed-payday comparisons with browser-local history. Optional AI explains selected figures; it does not calculate the financial result.",
    caseStudyHref: caseStudyHref(MONEYGUARD_CASE_STUDY.slug),
    github: MONEYGUARD_CASE_STUDY.sourceUrl,
    sourceLabel: "Pipeline source",
    technologies: {
      main: ["TypeScript", "Next.js / React", "IndexedDB", "Vitest / Playwright"],
    },
    year: "2026",
  },
  {
    title: DISPATCH_CASE_STUDY.title,
    image: projectImages.jobSearchDispatch,
    imageCaption: "Jobs workspace · Synthetic demo data · September 2026 interface",
    description: {
      summary: "A local job-search tool built around resilient job-ad ingestion and inspectable model calls.",
    },
    ownership: DISPATCH_CASE_STUDY.ownership,
    implementation:
      "Combined guarded headless fetching with an open-tab browser fallback, then added provider routing, cancellation and failure diagnostics. The workflow lessons became the starting point for Marshal.",
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
