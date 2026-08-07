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
    title: "Alex - AWS Multi-Agent Wealth Platform",
    image: projectImages.alexAwsMultiAgentWealthPlatform,
    roleFit:
      "Serverless AWS architecture, agent orchestration, production observability and full-stack delivery.",
    description: {
      summary:
        "A cloud-native wealth-planning product where five AI agents coordinate planning, reporting and retirement workflows on AWS.",
      detailed:
        "Alex is a September 2025 engineering build focused on turning a multi-agent wealth-planning concept into production-shaped cloud infrastructure. It connects a Next.js + Clerk interface to Bedrock-backed agent workflows, async Lambda + SQS jobs, Aurora Serverless v2 persistence, S3 Vectors RAG, Terraform-defined infrastructure, and LangFuse/CloudWatch observability.",
      features: [
        "Orchestrated five domain agents for planning, tagging, reporting, investment-charter generation and retirement analysis through event-driven AWS workflows.",
        "Built async Lambda + SQS execution with structured outputs, tool calls, database writes and retry paths so agent work is observable instead of opaque.",
        "Designed a cost-conscious RAG layer with S3 Vectors and SageMaker embeddings, reducing vector storage cost by ~90% versus an OpenSearch-style setup.",
        "Provisioned eight Terraform stages covering permissions, research ingestion, agents, frontend delivery and enterprise guardrails.",
        "Exposed the system through a Next.js + Clerk frontend behind CloudFront/API Gateway, with LangFuse traces, CloudWatch dashboards, throttling and least-privilege IAM.",
      ],
    },
    technologies: {
      main: [
        "Next.js",
        "TypeScript",
        "Amazon Bedrock",
        "Terraform",
        "AWS Lambda",
        "Amazon SQS",
      ],
      additional: [
        "Aurora Serverless v2",
        "S3 Vectors",
        "SageMaker",
        "App Runner",
        "CloudFront",
        "API Gateway",
        "Clerk",
        "LangFuse",
        "CloudWatch",
      ],
      others: [
        "OpenAI Agents SDK",
        "Agentic Workflows",
        "RAG",
        "Infrastructure as Code",
        "LLM Observability",
        "Serverless Architecture",
      ],
    },
    year: "2025",
  },
  {
    title: "Ultimate Frisbee Club Website (Melbourne University)",
    image: projectImages.melbUniUltimate,
    roleFit:
      "Sole developer: relational modelling in MongoDB, server-side privacy filtering and serverless-safe data access.",
    description: {
      summary:
        "A Next.js 15 and MongoDB club website covering roster, tournament selection, events, announcements and alumni behind an admin dashboard.",
      detailed:
        "A solo build for one university club: nine Mongoose schemas behind 21 Next.js route handlers, with tournament selection modelled as a normalised join collection and member contact details redacted server-side by role rather than hidden in the UI.",
      features: [
        "Modelled tournament rosters as a normalised join collection with a compound unique index on tournament, team and player, so duplicate selections are rejected by the database rather than by application code.",
        "Redacted personal fields (email, phone, LinkedIn, employer) server-side according to session role, so unauthorised clients never receive the data instead of merely not displaying it.",
        "Cached the Mongoose connection promise across serverless invocations, with failure-path invalidation, to avoid exhausting the database connection pool on Vercel.",
        "Built a generic typed fetch hook and a CRUD hook composed on it, reused across thirteen resource hooks, and diagnosed an effect-dependency re-render loop by snapshotting request options in a ref.",
        "Adapted data-dense admin tables for small screens with responsive layout and larger touch targets.",
      ],
    },
    url: "https://melb-uni-ultimate.vercel.app",
    technologies: {
      main: ["Next.js 15", "TypeScript", "MongoDB", "Tailwind CSS"],
      additional: ["shadcn/ui", "Responsive UI", "Vercel"],
      others: ["Club Management", "Roster Management"],
    },
    year: "2025",
  },
];

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
