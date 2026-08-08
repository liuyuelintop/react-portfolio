import { projectImages } from "./assets";
import { MONEYGUARD_CASE_STUDY, caseStudyHref } from "./caseStudies";

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
    title: "Melbourne University Ultimate Club Platform",
    image: projectImages.melbUniUltimate,
    roleFit:
      "Local product ownership, community workflows and maintainable Next.js delivery.",
    description: {
      summary:
        "An open-source Next.js 15 platform for sports club management, player stats and community engagement.",
      detailed:
        "This project shows practical product thinking: it translates a real local community need into maintainable workflows for events, announcements, player statistics and responsive dashboards.",
      features: [
        "Architected a modular open-source template for sports club management",
        "Implemented player statistics tracking, events, announcements and community workflows",
        "Used Next.js 15 server-side logic and optimized layouts for multi-device dashboards",
        "Designed a maintainable base that can be adapted by other clubs and teams",
      ],
    },
    url: "https://melb-uni-ultimate.vercel.app",
    technologies: {
      main: ["Next.js 15", "TypeScript", "MongoDB", "Tailwind CSS"],
      additional: ["shadcn/ui", "Responsive UI", "Vercel", "Open Source"],
      others: ["Club Management", "Player Statistics"],
    },
    year: "2025",
  },
];

export const SUPPORTING_PROJECTS = [
  {
    title: "ALEX — AWS Multi-Agent Architecture Study",
    summary:
      "Adapted Ed Donner’s Udemy ALEX capstone locally to study an SQS-backed five-role portfolio-analysis workflow and Terraform-defined AWS architecture, with contributions to database verification, Planner testing and guide corrections.",
    status: "Course-based study",
  },
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
