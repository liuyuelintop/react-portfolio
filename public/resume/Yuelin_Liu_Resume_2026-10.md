# Yuelin Liu

**Software Engineer — Full-Stack (TypeScript · React · Node.js)**

Melbourne, VIC · 0451 690 105 · [liuyuelintop@gmail.com](mailto:liuyuelintop@gmail.com)

[liuyuelin.dev](https://liuyuelin.dev) · [github.com/liuyuelintop](https://github.com/liuyuelintop) · [linkedin.com/in/liuyuelintop](https://linkedin.com/in/liuyuelintop)

**Full Australian work rights** · Temporary Graduate visa (subclass 485) to March 2029 · no sponsorship required

## Profile

Full-stack engineer who works from the user's problem down to the architecture, then proves the result with tests. At an AI SaaS startup I traced a 26.7 s API path to its slowest dependencies and cut it to 5.6 s. Since then I have designed and built five products end to end, including a self-hosted job-application workspace that runs across laptop and phone, a privacy-first wage tool for hourly workers, and an open-source plugin published on npm.

## Skills

- **Languages:** TypeScript, JavaScript (ES6+), Python, SQL, HTML5, CSS3
- **Frontend:** React 19, Next.js 15/16 (App Router), Vite, Tailwind CSS, responsive design, Chrome extensions (MV3)
- **Backend and data:** Node.js, Express, REST APIs, BFF (backend-for-frontend), MongoDB (Mongoose), Convex, IndexedDB (Dexie), Zod schema validation, authentication and RBAC (Clerk OAuth, NextAuth)
- **Cloud and DevOps:** AWS (Lambda, SQS, Bedrock, SageMaker, Aurora Serverless, API Gateway, CloudFront), Terraform, Google Cloud (GCP), Docker, CI/CD (GitHub Actions, Vercel), NGINX, Linux, Git
- **Testing and quality:** Playwright (end-to-end), Vitest, Jest, Supertest, contract testing, Postman
- **AI and LLM engineering:** OpenAI, Anthropic Claude, Google Gemini and DeepSeek APIs; function calling; structured outputs; agent frameworks (OpenAI Agents SDK, LangGraph, CrewAI, AutoGen); MCP; prompt testing; evidence grounding; AI coding agents (Claude Code, Codex)

## Experience

### Independent Full-Stack Developer — Melbourne Tech Consultancy (Contract) | Sep 2025 – Present

- Turned informal, still-changing briefs from prospective specialty-coffee and drone-training clients into authenticated, database-backed prototypes that the consultancy demonstrated in its pitches.
- Owned each build end to end on short deadlines: data model, sign-in (Clerk OAuth), real-time backend (Convex) and Vercel deployment on Next.js 15, reshaping scope and schema as requirements firmed up.

### Full-Stack Developer — ByteCroniX (early-stage AI SaaS) | Mar 2025 – Jun 2025

- **Cut an inherited points-summary request from 26.7 s to 5.6 s (79% faster)** in integration testing: added timing instrumentation, found the scoring services were the dominant cost, then ran the independent service calls in parallel.
- Implemented OpenAI function-calling flows in the Node.js/Express backend for AI-assisted product interactions, delivered through BFF routes shared by the web, Android and iOS clients.
- Worked alongside senior engineers on API testing (Jest, Supertest, Postman), NGINX troubleshooting and multi-service CI/CD.

## Products & Projects

### Marshal — Self-hosted job-application workspace for laptop and phone | Sep 2026 – Present

*Why: my earlier tool, Job Search Dispatch, only ran on one Mac. I wanted to capture, write and track applications from any device, safely, and to give friends the same capability without asking them to trust my server.*

- **Works wherever I am, privately.** One instance serves laptop and phone over a private Tailscale network with no public port: capture a job ad on the phone, finish at the desk, and neither device overwrites the other's newer work.
- **The whole application loop in one place.** Capture → requirement-by-requirement fit check → cover letter → tailored A4 résumé and letter PDFs → pipeline board from Captured to Offer, with a queue of follow-ups that are due.
- **Drafts I can send without rechecking every line.** The AI only sees experience I have confirmed, every paragraph shows the facts behind it, and a deterministic check flags any number or name those facts do not support.
- **Built to be shared.** MIT-licensed and single-user by design: each friend runs their own copy with their own API key, on a laptop with one Docker Compose command or on a small VPS using the included deploy, backup and restore scripts. Their data stays in readable files they own. My instance runs on a 1 GB Google Cloud VM in Sydney.
- **Proof.** 220 unit and contract tests, 50+ browser journeys on phone and desktop viewports, a Docker PDF-rendering check and a secret scan pass on every push in GitHub Actions. *TypeScript, React 19, Node.js, Playwright, Docker.*

### Job Search Dispatch — Job-ad ingestion gateway and browser bridge | Jul 2026 – Present

*Problem: job boards refuse server-side fetches, and pasting long ads by hand is slow and lossy. Once the ad is in, model calls across providers hang, time out or drift without anyone noticing.*

- **Dual-channel ingestion.** Fetch-by-URL runs a headless Chromium restricted to supported job boards, behind SSRF checks and DNS pinning; when that fails, a Manifest V3 extension reads the ad from the user's own open tab. On the deployed service a live SEEK ad extracted in 1.3 s.
- **Flexible, dependable model access.** Bring-your-own-key routing across Anthropic, OpenAI, Gemini and DeepSeek, or the user's own Codex or Claude subscription through the official CLI sign-in, with trace IDs, server-owned deadlines and cancellation that reaches the upstream call.
- **Release discipline.** Runs as a managed macOS LaunchAgent. Every release is gated by 614 deterministic tests and 40 browser flows, and a drift test fails when a prompt reads any field its declared input contract omits.

### MoneyGuard — Local-first wage and cashflow tool for hourly workers | Jun 2026 – Aug 2026

*Problem: hourly and casual workers are paid from timecards and cannot easily see what a week's shifts leave after expenses, or whether their cash will last until payday.*

- **Photo to decision.** Timecard photo → reviewed extraction → Zod-validated data → pure, deterministic wage, burn and surplus calculations → payday forecast (safe / caution / critical), buffer planner and a "cost in labour hours" simulator.
- **Privacy as a product decision.** Financial history stays in the browser (IndexedDB). The optional AI explanation receives only masked weekly metrics, never images, line items or identifiers, and vision OCR runs only with explicit consent.
- **Runs without secrets.** Fixture providers let the whole product and its Vitest and Playwright suites run offline with no API keys. *Next.js 16, React 19, TypeScript, Dexie.*

### DSH Conversation Exporter — Open-source developer plugin on npm | Jul 2026 – Aug 2026

*Problem: DeepSeek Harness exports a session only as a raw event log (a ZIP of JSONL), which suits replay but not reading, version control or handing a conversation to another assistant.*

- Published an MIT-licensed npm package (v0.3) that adds one-click **Export Chat**: clean Markdown of the human messages and final answers, with optional whole-turn selection, leaving the official log untouched.
- Filters on the host before export, dropping reasoning, tool activity and runtime metadata while preserving Markdown and Unicode. Release checks cover tests, syntax and an npm dry run. Listed in the Awesome DSH Plugin catalogue.

### Melbourne University Ultimate Club — Operations platform | Jul 2025 (hardened Aug 2026)

*Problem: the club ran rosters, tournament selection and events across spreadsheets and group chats.*

- Built a Next.js 15 / TypeScript / MongoDB platform covering public, member and admin workflows: roster and tournament selection, events, announcements and video.
- In a 2026 hardening pass, centralised authorisation on the server around database-backed roles, turned each write-path defect found into a regression test, and enforced them in GitHub Actions CI.

## Certifications & Training

### AI in Production: Gen AI and Agentic AI at Scale — Ed Donner, Udemy (18.5 h) | Oct 2025

- **Deployed the capstone multi-agent system end to end in my own AWS account** from seven Terraform stages: an SQS queue with dead-letter queue feeding five agent Lambdas on Bedrock-hosted models, Aurora Serverless v2, a SageMaker embedding endpoint with S3 Vectors search, App Runner, API Gateway and CloudFront.
- Traced from the code how the orchestrator really invokes its agents, sent four corrections upstream to the course's guides and test harness, then tore the stack down once idle cost outweighed learning value. Coursework also covered LLM deployment on Vercel, Azure and GCP, CI/CD and LangFuse observability.

### The Complete Agentic AI Engineering Course (2025) — Ed Donner, Udemy (17 h) | Aug 2025

- Hands-on agent projects across OpenAI Agents SDK, CrewAI, LangGraph and AutoGen, covering agent design patterns, tool use, multi-agent collaboration and the Model Context Protocol (MCP).

**DeepLearning.AI (Aug 2025):** Claude Code: A Highly Agentic Coding Assistant · Pydantic for LLM Workflows

## Education

- **Master of Information Technology** — The University of Melbourne | 2022 – 2023
- **BSc (Hons) Computer Science** — University of Nottingham Ningbo China | 2016 – 2020
