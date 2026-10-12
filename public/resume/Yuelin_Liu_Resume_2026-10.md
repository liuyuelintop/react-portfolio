# Yuelin Liu

**Software Engineer — Full-Stack (TypeScript · React · Node.js)**

Melbourne, VIC · 0451 690 105 · [liuyuelintop@gmail.com](mailto:liuyuelintop@gmail.com)

[liuyuelin.dev](https://liuyuelin.dev) · [github.com/liuyuelintop](https://github.com/liuyuelintop) · [linkedin.com/in/liuyuelintop](https://linkedin.com/in/liuyuelintop)

**Full Australian work rights** · Temporary Graduate visa (subclass 485) to March 2029 · no sponsorship required

## Profile

Melbourne-based software engineer targeting early-career full-stack, backend and AI implementation roles. I build product interfaces, APIs and data workflows, with particular attention to deterministic validation, failure handling and clear boundaries around model-generated output. My projects include a self-hosted application workspace, a browser-local wage planner and a published developer plugin.

## Skills

- **Languages:** TypeScript, JavaScript (ES6+), Python, SQL, HTML5, CSS3
- **Frontend:** React 19, Next.js 15/16 (App Router), Vite, Tailwind CSS, responsive design, Chrome extensions (MV3)
- **Backend and data:** Node.js, Express, REST APIs, BFF (backend-for-frontend), MongoDB (Mongoose), Convex, IndexedDB (Dexie), Zod schema validation, authentication and RBAC (Clerk OAuth, NextAuth)
- **Delivery and testing:** Docker, GitHub Actions, Vercel, Git, Playwright, Vitest, Jest, Supertest, Postman
- **AI implementation:** LLM APIs, function calling, structured output validation, evidence filtering, provider routing, streaming and cancellation
- **Cloud training:** AWS (Lambda, SQS, Bedrock, Aurora, SageMaker, API Gateway, CloudFront), Terraform; self-hosting on Google Cloud

## Experience

### Independent Developer — Prospective Client Demos for a Melbourne Consultancy | Sep 2025 – Present

- Built demonstration applications from informal briefs for prospective specialty-coffee and drone-training clients, supporting a Melbourne consultancy's business pitches.
- Implemented authenticated, database-backed prototypes with Next.js App Router, Clerk OAuth and Convex as requirements became clearer.

### Full-Stack Developer — ByteCroniX (early-stage AI SaaS) | Mar 2025 – Jun 2025

- Instrumented an inherited points-summary path, identified scoring services as the dominant latency contributors and parallelised independent calls. An observed local integration-test response fell from 26.7 s to 5.6 s; this was not a production benchmark.
- Implemented OpenAI function-calling flows in a Node.js/Express codebase for AI-assisted product interactions.

## Products & Projects

### Marshal — Self-hosted job-application workspace for laptop and phone | Sep 2026 – Present

*Personal project; pre-alpha, private source. A successor to my Mac-only Dispatch workflow, designed for laptop and phone.*

- **Simplified the product.** Removed mandatory assessment, audit and acceptance steps. Cover letters and résumés generate and edit independently; optional fit assessment is reference material.
- **Protected newer work.** Built revisioned autosave, stale-write conflicts, local recovery and atomic JSON persistence, with previous revisions retained.
- **Kept checks at the boundaries.** Server-side filtering limits model inputs to confirmed, permitted evidence. Bounded citation/numeric checks and export guards support human review; they do not establish semantic truth.
- **Made self-hosting explicit.** Docker Compose, loopback binding, Tailscale access and backup/restore scripts. An earlier GCP deployment is documented; the deployed revision of the current redesign is unverified.
- **Verification.** Contract and stubbed browser tests cover document independence, failure recovery and conflicts. They do not establish live-model quality. *TypeScript, React, Node.js, Docker.*

### Job Search Dispatch — Job-ad ingestion gateway and browser bridge | Jul 2026 – Present

- **Dual-channel ingestion.** Fetch-by-URL runs a headless Chromium restricted to supported job boards, behind SSRF checks and DNS pinning; when that fails, a Manifest V3 extension reads the ad from the user's own open tab.
- **Flexible, dependable model access.** Bring-your-own-key routing across Anthropic, OpenAI, Gemini and DeepSeek, or the user's own Codex or Claude subscription through the official CLI sign-in, with trace IDs, server-owned deadlines and cancellation that reaches the upstream call.
- **Release discipline.** Runs as a managed macOS LaunchAgent. The 28 September release record lists 614 deterministic tests and 40 browser flows passing, and a drift test fails when a prompt reads any field its declared input contract omits.

### MoneyGuard — Local-first wage and cashflow tool for hourly workers | 2026

*Problem: hourly and casual workers are paid from timecards and cannot easily see what a week's shifts leave after expenses, or whether their cash will last until payday.*

- **Kept financial results deterministic.** Reviewed weekly inputs feed wage, burn and surplus calculations, purchase cost in paid hours, and expected/delayed-payday comparisons. A later deposit cannot hide a pre-payday shortage.
- **Designed for local ownership.** Audit history uses browser IndexedDB with validated exports. The base Payday Check draft is saved; temporary delay scenarios stay in the session.
- **Bounded optional AI.** Optional Gemini explanations are gated to local development or a configured protected preview and send a consented question plus selected current-audit metrics. Free text may contain personal information. Public fixture configuration disables real OCR and AI; model output does not own the arithmetic.
- **Testable boundaries.** Added calculation, payload, storage and browser test coverage around the planning workflow. *Next.js, React, TypeScript, Dexie, Vitest, Playwright.*

### DSH Conversation Exporter — Open-source developer plugin on npm | Jul 2026 – Aug 2026

- Published an MIT-licensed npm package (v0.3) that adds one-click **Export Chat**: clean Markdown of the human messages and final answers, with optional whole-turn selection, leaving the official log untouched.
- Filters on the host before export, dropping reasoning, tool activity and runtime metadata while preserving Markdown and Unicode. Release checks cover tests, syntax and an npm dry run. Listed in the Awesome DSH Plugin catalogue.

### Melbourne University Ultimate Club — Operations platform | Jul 2025 (hardened Aug 2026)

*Problem: the club ran rosters, tournament selection and events across spreadsheets and group chats.*

- Built a Next.js 15 / TypeScript / MongoDB platform covering public, member and admin workflows: roster and tournament selection, events, announcements and video.
- In a 2026 hardening pass, centralised authorisation on the server around database-backed roles, turned each write-path defect found into a regression test, and enforced them in GitHub Actions CI.

## Certifications & Training

### AI in Production: Gen AI and Agentic AI at Scale — Ed Donner, Udemy (18.5 h) | Oct 2025

- Deployed Ed Donner's capstone in my AWS account using seven Terraform configurations; traced its agent invocation, database and queue flows, proposed upstream corrections, then tore it down after the learning exercise. This was course architecture, not a system I designed.

### The Complete Agentic AI Engineering Course (2025) — Ed Donner, Udemy (17 h) | Aug 2025

- Hands-on agent projects across OpenAI Agents SDK, CrewAI, LangGraph and AutoGen, covering agent design patterns, tool use, multi-agent collaboration and the Model Context Protocol (MCP).

**DeepLearning.AI (Aug 2025):** Claude Code: A Highly Agentic Coding Assistant · Pydantic for LLM Workflows

## Education

- **Master of Information Technology** — The University of Melbourne | 2022 – 2023
- **BSc (Hons) Computer Science** — University of Nottingham Ningbo China | 2016 – 2020
