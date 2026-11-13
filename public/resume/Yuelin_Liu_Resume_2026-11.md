# Yuelin Liu

**Software Engineer — Full-Stack (TypeScript · React · Node.js)**

Melbourne, VIC · 0451 690 105 · [liuyuelintop@gmail.com](mailto:liuyuelintop@gmail.com)

[liuyuelin.dev](https://www.liuyuelin.dev/) · [github.com/liuyuelintop](https://github.com/liuyuelintop) · [linkedin.com/in/liuyuelintop](https://www.linkedin.com/in/liuyuelintop/)

**Full Australian work rights** · Temporary Graduate visa (subclass 485) to March 2029 · no sponsorship required

## Profile

Full-stack engineer in Melbourne. I build web and mobile interfaces and the APIs behind them. At ByteCroniX I worked on integrations for web, Android and iOS clients. My recent independent work includes Flickside, an iPhone app in private beta, and tools for job applicants and hourly workers.

## Skills

- **Languages:** TypeScript, JavaScript, Python, SQL, HTML, CSS
- **Web and mobile:** React, Next.js App Router, React Native, Expo, Vite, Tailwind CSS, Chrome extensions (MV3)
- **Backend and data:** Node.js, Express, REST APIs, PostgreSQL (Supabase), row-level security, MongoDB, Convex, IndexedDB (Dexie), Zod
- **Delivery and testing:** Git, Docker, GitHub Actions, Vercel, TestFlight, Playwright, Vitest, Jest, Supertest, Postman
- **AI integration:** OpenAI function calling, structured output validation, provider routing, streaming and cancellation
- **Cloud training:** AWS Lambda, SQS, Bedrock, Aurora and Terraform

## Experience

### Independent Developer — Client Demos for a Melbourne Consultancy | Sep 2025 – Present

- Turned informal briefs for a specialty coffee retailer and a drone training provider into working demos for the consultancy's prospective-client pitches.
- Built sign-in and database-backed workflows with Next.js App Router, Clerk OAuth and Convex.

### Full-Stack Developer — ByteCroniX (early-stage AI SaaS) | Mar 2025 – Jun 2025

- Traced a slow points-summary request to two independent scoring calls. After I ran them concurrently, **response time fell from 26.7 s to 5.6 s** in a local integration test.
- Worked on backend-for-frontend routes and REST integrations for web, Android and iOS clients. Implemented OpenAI function calling in Node.js and Express, and tested APIs with Postman, Jest and Supertest.

## Products & Projects

### Flickside — iPhone app and official website for ultimate frisbee players | Oct 2026 – Present

*Personal project · Private iPhone beta on TestFlight · [Official website and interactive demo](https://out-throwing.pages.dev/)*

- **iPhone app.** Designed and built a React Native and Expo app where players check in with one tap, friends can ask to join, and completed throws become dated stamps in a personal journal.
- **Time-limited location sharing.** Stored optional precise check-ins separately from throw history. Supabase row-level security checks friendship, sharing permission and server time on every read. Friends lose access when the throw ends or after two hours, even if the app is closed.
- **Official website.** Built an interactive demo with fictional players. Visitors can advance a two-hour timer and see a friend's map change from a precise check-in to an approximate area without signing in or sharing their own location.

### Marshal — Self-hosted job-application workspace | Sep 2026 – Present

*Personal project · Pre-alpha · TypeScript, React, Node.js, Docker*

- **Independent drafts.** Replaced a multi-step approval workflow with two independent editors. Applicants can generate a résumé or cover letter from a saved job ad and the background facts they have approved for that use.
- **Cross-device editing.** Added revisioned autosave, stale-write detection and local recovery so a draft opened on a phone cannot silently overwrite newer edits from a laptop. Packaged the workspace for self-hosting with Docker Compose.

### MoneyGuard — Local-first wage and cashflow planner for hourly workers | 2026

- **Payday forecasting.** Built a Next.js planner that shows what a shift leaves after expenses, how many paid hours a purchase costs and when cash runs short if payday moves. The forecast checks the balance before a deposit arrives.
- **Calculations and storage.** TypeScript computes pay and cashflow from reviewed inputs. Audit history stays in IndexedDB. With consent, an optional AI feature sends selected figures and the user's question to Gemini for explanation.

### Job Search Dispatch — Job-ad capture and browser extension | Jul 2026 – Present

- Built a headless Chromium importer for supported SEEK and LinkedIn ads with checks that block private network destinations. A Manifest V3 extension can capture the ad from the user's open tab when the importer cannot read it.
- Added request tracing and cancellation across model providers. The September 2026 release checks passed 614 deterministic tests and 40 browser flows.

### DSH Conversation Exporter — Open-source developer plugin on npm | Jul 2026 – Aug 2026

- Published an MIT-licensed plugin that exports a full conversation or selected turns to Markdown. It preserves the user's messages and final answers, filters out reasoning and tool activity, and leaves the original log intact.

### Melbourne University Ultimate Club — Operations platform | Jul 2025 (hardened Aug 2026)

- Built roster, tournament selection and event workflows in Next.js and MongoDB. Centralised server-side authorisation so a change to an admin's role takes effect on the next request.
- Added 73 regression tests, including one that discovers routes and flags unguarded writes. GitHub Actions runs type checking, lint, tests and a build on each push.

## Certifications & Training

### AI in Production: Gen AI and Agentic AI at Scale — Ed Donner, Udemy (18.5 h) | Oct 2025

- Deployed the instructor's capstone to my AWS account using seven Terraform configurations, traced its agent calls and SQS workflow, proposed corrections upstream and tore down the infrastructure.

### The Complete Agentic AI Engineering Course (2025) — Ed Donner, Udemy (17 h) | Aug 2025

- Built course exercises with OpenAI Agents SDK, CrewAI, LangGraph and AutoGen, covering tool use and the Model Context Protocol (MCP).

**DeepLearning.AI (Aug 2025):** Claude Code: A Highly Agentic Coding Assistant · Pydantic for LLM Workflows

## Education

- **Master of Information Technology** — The University of Melbourne | 2022 – 2023
- **BSc (Hons) Computer Science** — University of Nottingham Ningbo China | 2016 – 2020
