import { projectImages } from "./assets";

export const PROJECTS = [
  {
    title: "MoneyGuard AI Finance Pipeline",
    image: projectImages.moneyguardAiFinancePipeline,
    roleFit:
      "Privacy-first architecture, AI workflow reliability, and decoupled metadata design.",
    description: {
      summary:
        "A multi-LLM orchestrator that transforms timecard images into contextual financial audits, enforcing absolute data privacy and dynamic tag-based configuration.",
      detailed:
        "This project showcases production-grade AI engineering. While Gemini Vision extracts OCR data and DeepSeek provides reasoning, the core value lies in the defensive architecture: nested Zod schema validation, local in-memory data masking, a zero-hardcode semantic tag engine for metric aggregation, and robust rate-limit throttling to stabilize streaming updates.",
      features: [
        "Extracts industrial timecard data via Gemini Vision, tightly constrained by TypeScript and native structured JSON outputs.",
        "Implements a zero-hardcode, tag-driven configuration engine (e.g., 'strategic_weapon') to dynamically compute multi-dimensional asset ratios.",
        "Computes 'grind-to-value' metrics locally, strictly masking raw financial numbers before streaming anonymized payloads to DeepSeek.",
        "Engineers a fault-tolerant Telegram UX with progressive state-updates and a 1000ms timestamp throttle to gracefully prevent HTTP 429 exceptions.",
      ],
    },
    evidence: [
      "Structured LLM output validation",
      "Privacy-first data boundary",
      "Decoupled tag-driven architecture",
      "Fault-tolerant API integration",
    ],
    github: "https://github.com/liuyuelintop/moneyguard-pipeline",
    technologies: {
      main: ["TypeScript", "Node.js", "Gemini LLM", "DeepSeek LLM"],
      additional: [
        "Zod",
        "Telegram Bot API",
        "Semantic Configuration",
        "Data Masking",
      ],
      others: ["OCR", "Rate Limiting", "Structured Outputs"],
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
        "A cloud-native wealth-planning product where five AI agents coordinate portfolio planning, classification, reporting, investment-charter and retirement workflows on AWS.",
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
    evidence: [
      "Five-agent orchestration",
      "Serverless AWS delivery",
      "Cost-conscious RAG design",
      "Terraform infrastructure",
      "Observability and IAM controls",
    ],
    technologies: {
      main: [
        "Next.js",
        "TypeScript",
        "AWS Lambda",
        "Amazon SQS",
        "Amazon Bedrock",
        "Terraform",
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
    evidence: [
      "Local stakeholder context",
      "Responsive dashboard UI",
      "Reusable product template",
    ],
    url: "https://melb-uni-ultimate.vercel.app",
    technologies: {
      main: ["Next.js 15", "TypeScript", "Tailwind CSS", "Open Source"],
      additional: ["shadcn/ui", "MongoDB", "Responsive UI", "Vercel"],
      others: ["Club Management", "Player Statistics"],
    },
    year: "2025",
  },
];

export const SUPPORTING_PROJECTS = [
  {
    title: "SaaS IDE Platform",
    summary:
      "Next.js IDE-style product with auth, payments, snippets and real-time collaboration concepts.",
    whyItMatters: "Shows SaaS product thinking beyond a static portfolio.",
    url: "https://codecraft.liuyuelin.dev/",
    stack: ["Next.js", "Convex", "Clerk", "Webhooks", "Lemon Squeezy"],
  },
  {
    title: "Remote Interview Platform",
    summary:
      "Technical interview workflow with coding environment, video/audio and candidate review flows.",
    whyItMatters:
      "Relevant to collaborative tooling, dashboards and workflow-heavy SaaS.",
    status: "Private demo",
    stack: ["Next.js", "Stream", "Convex", "Clerk", "shadcn/ui"],
  },
  {
    title: "ApeUni FIB Extractor Monorepo",
    summary:
      "Browser automation toolkit packaged as both a Tampermonkey userscript and Chrome extension.",
    whyItMatters:
      "Shows practical automation, packaging and monorepo delivery.",
    url: "https://github.com/liuyuelintop/apeuni-fib-extractor-monorepo",
    stack: ["JavaScript", "TypeScript", "Chrome Extension", "ESBuild"],
  },
  {
    title: "Next Markdown Blog",
    summary:
      "Technical writing platform with MDX, syntax highlighting, SEO and static content workflows.",
    whyItMatters: "Shows documentation mindset and content infrastructure.",
    url: "https://blog.liuyuelin.dev/",
    stack: ["Next.js", "MDX", "Velite", "Tailwind CSS", "Vercel"],
  },
];
