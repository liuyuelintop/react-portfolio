# Portfolio Redesign Status

Last updated: 2026-08-05 AEST
Canonical redesign record for `www.liuyuelin.dev`.

## 1. Goal and non-goals

**Goal:** establish a reproducible, evidence-based baseline for a later portfolio redesign: repository architecture, public deployment, information hierarchy, visual system, discoverability, links, claims, verification gaps, dependencies, and rendering direction.

**Non-goals for Slice 1:** no application, copy, UI, style, metadata, route, link, asset, dependency, lockfile, deployment, test, environment, DNS, analytics, Search Console, or runtime changes. No later redesign slice is authorised or started.

## 2. Operating contract

- Workers never commit directly to `main`.
- Each slice starts from the latest merged `origin/main`.
- One new branch and one cohesive PR per slice.
- Dependent slices start only after the prior PR merges.
- No stacked PRs by default.
- Review corrections stay in the same branch and PR.
- Implementation and status documentation stay in the same PR.
- No separate documentation or closure PR.
- GitHub PR state and `main` history are the merge source of truth.
- Future slices are proposals until explicitly authorised.

## 3. Accepted Git baseline

| Item | Accepted value |
| --- | --- |
| Repository root | `/Users/yuelinliu/Repos/Personal/react-portfolio` |
| Origin | `https://github.com/liuyuelintop/react-portfolio.git` |
| Target branch | `main` |
| Freshly fetched `origin/main` | `9cf6bf0fbf99643b191fdc4e14b68f160a23492c` |
| Local `main` after fast-forward | `9cf6bf0fbf99643b191fdc4e14b68f160a23492c` |
| Equality check | `HEAD == main == origin/main` before branch creation |
| Slice branch | `audit/portfolio-redesign-baseline` |
| Branch collision check | No local or remote branch existed before creation |

The first run stopped because `karpathy.md` was a meaningful untracked user file. The owner subsequently authorised continuation. The file remained untouched and is excluded from the Slice 1 diff, commit, and PR. No unfinished merge, rebase, cherry-pick, revert, or bisect operation was detected.

## 4. Current architecture

### Repository, build, and deployment

- npm project with `package-lock.json` (lockfile v3); baseline toolchain was Node `22.19.0` and npm `10.9.3`.
- React `18.2.0`, React DOM `18.2.0`, Vite `5.2.8`, Tailwind CSS `3.4.3`, Framer Motion `11.0.24`, ESLint `8.57.0`, `prop-types`, `lucide-react`, and `react-icons`.
- Entry path: `index.html` -> `src/main.jsx` -> `src/App.jsx`. Content is primarily data-driven from `src/constants/`; components live under `src/components/`.
- `vite.config.js` contains only the React plugin. `npm run build` emits a static `dist/` bundle. There is no tracked Vercel, redirect, server, SSR, SSG, or prerender configuration.
- Public response headers and the successful `Vercel` status on baseline commit `9cf6bf0` identify Vercel as the current host. The repository contains no GitHub Actions workflows; deployment settings therefore live outside the tracked repository.
- Relevant documentation: `README.md`, `AGENTS.md`, `CLAUDE.md`, and `CHANGELOG.md`. `CLAUDE.md` and the theming sections of `README.md`/`AGENTS.md` contain stale four-theme statements that do not match runtime code.

### Rendering, routing, and loading

- The portfolio is client-side rendered. `ReactDOM.createRoot` mounts one SPA; there is no `hydrateRoot`, server entry, router, SSR, SSG, or prerender step.
- The live server response contains metadata/JSON-LD plus a placeholder root with a hidden H1, a `Featured Projects` H2, and an empty article. It does not contain the public recruiter narrative, experience, skills, project cards, contact content, or project detail copy.
- With JavaScript disabled, the application cannot render its real content or navigation. The tracked placeholder's `visually-hidden` class has no tracked definition, so its exact fallback visibility is not dependable.
- After JavaScript starts, the app-wide `Suspense` fallback is a full-screen animated spinner until lazy modules resolve. Each mounted section is lazy-loaded and wrapped in an error boundary. Project images add an animated skeleton, fade-in, lazy loading, and an error state.
- There is no route model. All navigation is same-page fragments. `/projects/moneyguard-ai-finance-pipeline` returned `404` on the public deployment.
- Flagship details exist only in local React state inside `ProjectModal`. Opening a modal leaves the URL and document title unchanged; detail content is not linkable, independently indexable, reloadable, or shareable. The modal focuses its close button and handles Escape, but does not make the background inert/`aria-hidden`, does not implement the existing focus-trap utility, and does not restore a route/history state.

### Information hierarchy

| Visible order | Source | Navigation/discovery notes |
| --- | --- | --- |
| Navigation | `src/components/layout/Navbar/Navbar.jsx` | Fixed bar with six equal-weight anchors: About, Work Style, Experience, Skills, Projects, Contact. Mobile collapses at `md`; active state is scroll-position based. Career Snapshot and Writing have no destination. Alt-key shortcuts add a second navigation system. |
| Hero | `Hero/Hero.jsx`, `HERO_CONTENT` | H1, typewriter roles, summary, resume/contact CTAs, social icons, and a nested recruiter snapshot. |
| Career/recruiter snapshot | `CareerSnapshot/CareerSnapshot.jsx`, `CAREER_SNAPSHOT` | No stable section ID. Repeats claims later shown in Experience, Skills, and Projects; includes public editorial labels such as “Evidence Trail”, “Recruiter read”, and “Interview hooks”. |
| Working style | `WorkingStyle/WorkingStyle.jsx`, `WORKING_STYLE` | Three personality cards plus two publicly exposed alternate positioning lines labelled “Product-focused version” and “Team-fit version”. |
| Experience | `Experience/Experience.jsx`, `EXPERIENCES` | Three roles and delivery-evidence panels. Employer URLs are `#`, so employer names render as text. |
| Skills | `Skills/SkillsVisualization.jsx`, `CAPABILITY_AREAS`/`TECHNOLOGY_GROUPS` | Capability cards repeat experience/project evidence, followed by four chip-heavy technology groups. |
| Projects | `Projects/index.jsx`, `PROJECTS`/`SUPPORTING_PROJECTS` | Three flagship cards appear after four positioning/capability sections. One 16:9 screenshot per flagship; detail is modal-only. Four supporting builds are direct external links. |
| Writing/blog | Not mounted in `App.jsx` | No Writing section or primary nav item. The external blog appears as an unlabeled hero icon, a supporting-build card, and a Contact social chip. The blog links back to the portfolio in its nav, hero, CTA, and footer, but targets the redirecting apex URL. |
| Contact | `Contact/Contact.jsx`, `ProfessionalContactForm.jsx`, `CONTACT` | Direct email/phone/LinkedIn/GitHub/blog paths plus a client-only form that validates input and opens a `mailto:` draft; it does not submit to a backend. |
| Footer | No visible React footer | `index.html` has only a hidden static footer with copyright year 2025 and a licence link. |

The hierarchy front-loads Hero, Career Snapshot, and Working Style before commercial evidence; Experience and Skills repeat much of the same proof before Projects. This makes the page narrative-heavy and delays project discovery. The six-anchor navigation is technically simple, but it omits Career Snapshot and Writing while adding scroll tracking and keyboard shortcuts.

### Visual and motion system

- Runtime theme: one hard-coded `default` dark theme. `ThemeContext` exposes no switcher, persistence, or system-preference detection. Dormant `neon`, `minimal`, and `corporate` branches remain across utilities/components, and documentation still describes four active themes.
- Palette: neutral/black surfaces with white text, cyan accents, purple/blue gradients, borders, glows, backdrop blur, and layered shadows. `DEFAULT_THEME` provides CSS custom properties; most components also embed Tailwind colour classes directly.
- Typography: Google Inter is requested in `index.html`; `src/index.css` uses the invalid shorthand `font: "Inter", sans-serif`, so the intended family is not reliably applied. Heading utilities use bold gradient text at hero/section/subsection/card scales.
- Layout: Tailwind defaults plus `max-w-6xl`, `px-4`/`lg:px-8`, and repeated `py-12`. Default Tailwind breakpoints apply (`sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536); a local `.xs:inline` helper starts at 475 px. Navigation switches at `md`; hero and project grids switch at `lg`.
- Radius/cards: `rounded-lg` is the dominant primitive; 96 rounded-class uses were found. There is no shared Card primitive: section-specific style maps repeat bordered, shadowed panels. Shared primitives are `Button`, `SectionHeading`, `OptimizedImage`, `Skeleton`, `Toast`, and `ErrorBoundary`.
- Icons/chips: Lucide or React Icons appear in 12 files; capability, technology, evidence, status, social, and action UI repeatedly use chips/badges/icons.
- Motion: 55 `motion.*` elements, app/nav entry, typewriter cycling, blinking cursor, scroll progress, section/card `whileInView`, hover/tap scaling, modal/tab transitions, image fades, skeleton pulse, and loading spinners. No `useReducedMotion` or `prefers-reduced-motion` integration exists. `floatingShapeVariantsReduced` is present but unused.
- Active flagship images are WebP (`1536x864`, `1672x941`, `838x500`) rendered in fixed 16:9 containers with `loading="lazy"`; there is no responsive `srcset`/`sizes`. Only the Melbourne University project has a modal iframe preview, also lazy-loaded. Strict frame headers can make the embedded view unavailable; the direct link is the only escape path.

### Metadata and discoverability

- Static title and description exist in `index.html` alongside profile Open Graph, Twitter card, and Person JSON-LD metadata.
- Canonical, `og:url`, JSON-LD `url`, JSON-LD `image`, `og:image`, and `twitter:image` use `https://liuyuelin.dev`, while the actual serving URL is `https://www.liuyuelin.dev/`. The apex returns `308` to `www`.
- The configured portfolio social image path redirects to `www` and then returns `404`; the source PNG is bundled under `src/assets/` with a hashed build filename rather than copied to `/assets/og-image.png`.
- There is no `robots.txt`, `sitemap.xml`, or manifest in the repository; all three public URLs returned `404`. There is no route/page-level metadata because there are no routes.
- The blog is a separately deployed, prerendered Next.js site. Its homepage has no observed canonical or `og:url`; its Open Graph/Twitter image is a reachable `next-blog-alpha-sable-40.vercel.app` URL rather than the public blog host.

### Tests, CI, and verification architecture

| Capability | Current baseline |
| --- | --- |
| Lint | `npm run lint`: ESLint for JS/JSX with zero warnings allowed. |
| Production build | `npm run build`: Vite production build. |
| Formatting/Markdown | No Prettier, Markdown lint, or formatting script. |
| Type checking | No TypeScript and no standalone type-check command; runtime props use `prop-types`. |
| Unit/integration/E2E | No test script or test files. |
| Accessibility | Utilities and manual conventions only; no axe/pa11y/Lighthouse CI. |
| Link checks | None. |
| Visual regression | None. |
| Repository CI | No tracked `.github/workflows`; baseline commit has only a successful external Vercel status. |
| Deployment verification | External Vercel status plus manual/public HTTP checks; no repository-owned smoke test. |

Redesign gaps: no automated route/static-HTML assertion, metadata/canonical/social-image check, broken-link scan, accessibility test, modal/focus test, responsive test, JavaScript-disabled check, or visual regression baseline.

## 5. Evidence ledger

Every material redesign hypothesis is classified exactly once below.

| Hypothesis | Classification | Evidence and boundary |
| --- | --- | --- |
| Client-only rendering leaves limited meaningful server HTML | **CONFIRMED** | `createRoot` SPA, no server/prerender entry, and live 5.18 kB HTML contains only metadata and placeholder semantic nodes. Full content appears only after JavaScript. |
| Canonical/apex/`www` URLs are inconsistent | **CONFIRMED** | Apex `308` -> `www`, but canonical, OG, Twitter, and JSON-LD URLs use apex. The social image target follows that redirect and returns `404`. |
| Portfolio/blog integration is weak | **PARTIALLY_CONFIRMED** | Mutual links exist, but Writing is absent from portfolio navigation/content, portfolio links are secondary, and blog backlinks use the redirecting apex. |
| Social images use preview hosts | **CONFIRMED** | Blog OG/Twitter images use `next-blog-alpha-sable-40.vercel.app`; the portfolio image is not preview-hosted but is broken at its configured URL. |
| Section order and content overlap dilute hierarchy | **CONFIRMED** | Hero/Career Snapshot/Working Style precede Experience; Career Snapshot, Experience, Skills, and Projects repeat the same workflow, cloud, testing, and AI evidence. |
| Modal-based project details limit discoverability | **CONFIRMED** | Modal state has no route, URL/title change, server HTML, page metadata, or deep link; an expected case-study URL returns `404`. |
| The live portfolio has excessive active themes | **CONTRADICTED** | Runtime exposes only the hard-coded default theme. Four-theme claims are stale documentation/dormant branches, not four user-selectable themes. |
| Motion is excessive | **PARTIALLY_CONFIRMED** | Motion is pervasive (55 motion elements plus typewriter/progress/spinners) and lacks reduced-motion handling; “excessive” remains a design judgement. |
| Cards, chips, icons, or private planning language are excessive | **PARTIALLY_CONFIRMED** | Repeated card/chip/icon patterns and public labels such as “Candidate Positioning”, “Recruiter read”, “Interview hooks”, “Product-focused version”, and “Team-fit version” are confirmed; the excess threshold is a design judgement. |
| Project screenshots are insufficiently prominent | **PARTIALLY_CONFIRMED** | Each flagship has one 16:9 screenshot in a one-third desktop card and repeated in its modal; there is no gallery or dedicated case-study page. Sufficiency requires a design/content decision. |
| Public links are stale, private, paused, or broken | **PARTIALLY_CONFIRMED** | Core sites/demos and GitHub repos returned `200`, but the portfolio OG image is `404`, the case-study route is `404`, and CodeInterview redirects to Clerk development-mode authentication. No paused host was observed. |
| Career and numerical claims need owner evidence | **OWNER_CONFIRMATION_REQUIRED** | The tracked résumé repeats many claims but is not independent substantiation. Employer, analytics, CI, deployment, time-study, visa, ownership, and cost-comparison evidence is not present in this repository. |

## 6. Link and public-claim risks

### Public deployment and metadata checks

Checks were non-destructive on 2026-08-05 AEST.

| Target | Result | Risk/observation |
| --- | --- | --- |
| `https://www.liuyuelin.dev/` | `200`, Vercel | Actual portfolio host; hydrated content matched the audited source. |
| `https://liuyuelin.dev/` | `308` -> `https://www.liuyuelin.dev/` | Redirect is healthy, but configured canonical/social URLs use the redirect source. |
| `https://blog.liuyuelin.dev/` | `200`, Vercel/Next prerender | Public and content-rich; portfolio backlink targets apex. |
| Portfolio `robots.txt` | `404` | No crawler policy or sitemap pointer. |
| Portfolio `sitemap.xml` | `404` | No discoverable route inventory. |
| Portfolio `manifest.json` | `404` | Apple web-app tags exist without a manifest. |
| Configured portfolio OG/Twitter image | `404` after apex -> `www` redirect | Broken social preview asset. |
| Blog OG/Twitter image | `200` image/png | Reachable, but served from a preview-style Vercel hostname. |
| Example case-study path | `404` | Confirms no project route/deep link. |

### Public link inventory

| Public path | HTTP/behavior | Recruiter suitability and confirmation need |
| --- | --- | --- |
| Resume `/resume/yuelin-liu-resume.pdf` | `200 application/pdf`; direct download works | Suitable. Owner must confirm dates, claims, phone/email, work-rights wording, and freshness. |
| GitHub profile | `200` | Public. Suitable as a general profile. |
| MoneyGuard source | `200`; public, non-archived GitHub repository | Suitable source evidence, but public privacy wording conflicts with the repository's narrower documented privacy posture. |
| ApeUni source | `200`; public, non-archived GitHub repository | Public packaging evidence. Owner should confirm maintenance/usage suitability; README still contains placeholder clone links and an unqualified “100% reliable” claim. |
| LinkedIn | HTTP `200` | Profile content/auth presentation was **UNVERIFIED**; owner should confirm recruiter-visible access and current content. |
| Blog | `200`; homepage publicly displays “65 Technical Articles” | Suitable writing destination, but content freshness, canonical, social host, and numerical homepage claims need review. |
| Melbourne University Ultimate demo | `200`; public club landing page | Recruiter-viewable without auth. Owner should confirm ownership, open-source status, and permission to present club work. |
| CodeCraft demo | `200`; public interactive editor visible without auth | Recruiter-viewable at landing; owner should confirm which advertised auth/payment/collaboration features are complete. |
| CodeInterview demo | Initial `200`, then client redirect to Clerk sign-in | Auth-gated and marked “Development mode”; weak cold-recruiter path. Owner must confirm intended access/status. |
| Alex project | No public demo or source link | Architecture, deployment, ownership, and status are **UNVERIFIED** and require owner confirmation. |
| `mailto:` email and `tel:` phone | Not HTTP-testable | Owner confirmation required for current contact details and desired public exposure. |

### Public claim evidence requirements

Absence of repository proof is not treated as falsity.

| Repository location | Public wording | Required evidence | Repository evidence, if any | Owner confirmation required |
| --- | --- | --- | --- | --- |
| `src/constants/constants.js:17,30`; `Contact.jsx:70` | “full Australian work rights until Mar 2029” | Current visa/work-right document and approved public wording | Tracked résumé repeats subclass 485 validity to Mar 2029 | Yes |
| `src/constants/experiences.js:3-60` | Role titles/dates for Independent Practice, ByteCroniX, and Expresso Carwash; “Present” status | Contracts, references, invoices/payslips, or owner-approved chronology | Tracked résumé repeats the same chronology | Yes |
| `src/constants/experiences.js:33` | “Reduced API response time by 81%, from 29s to 5.6s” | Reproducible benchmark/APM report with environment, sample, and before/after method | Tracked résumé repeats the claim; live blog also displays “81% API Performance Boost” | Yes |
| `src/constants/experiences.js:34` | “directly increasing user form completion rates” | Analytics definition, period, baseline, change, and attribution method | Tracked résumé repeats the wording; no measurement is stored | Yes |
| `src/constants/experiences.js:35-37` | “Maintained 4 core Node.js microservices”, “near-zero-downtime releases”, “90% PR test coverage” | Architecture inventory; deployment/uptime evidence; CI coverage reports and denominator | Tracked résumé repeats all three | Yes |
| `src/constants/experiences.js:57,60` | “saving approximately 6 hours per week per site”; “eliminating manual server updates” | Before/after time study by site; deployment process/history | Tracked résumé repeats both | Yes |
| `src/constants/experiences.js:12-14` | “production-ready SaaS features”, improved performance/SEO readiness, secure Clerk/Convex delivery | Client/deployment references, audit/measurement, and scope/ownership record | Tracked résumé repeats the work at a high level | Yes |
| `src/constants/projects.js:11-18,27` | MoneyGuard “absolute data privacy”, anonymised/masked outbound data, Zod validation, retry/backoff, 1000 ms throttle preventing 429s | Threat/data-flow model, tests, provider payload contract, and operational evidence for prevention/elimination claims | Public source supports Zod, local line-item minimisation, retry semantics, and a 1000 ms transport throttle. Its README explicitly says selected hours/gross are sent, the audit prompt is not anonymous, and hosted `/extract` sends image/rate data. | Yes |
| `src/constants/projects.js:47-55` | Alex: five agents, deployed serverless AWS stack, ~90% vector-storage saving, eight Terraform stages, observability/IAM controls | Public/private source review, deployed architecture, Terraform inventory, cost assumptions/calculation, and owner role | Résumé says a production AWS agent system was built/deployed; no linked source or independent repository evidence | Yes |
| `src/constants/projects.js:103-121` | Melbourne Ultimate: open-source Next.js 15 platform, server-side logic, statistics/workflows, reusable ownership | Source licence/repository, stakeholder permission, feature walkthrough, and current deployment status | Public landing proves the site/club deployment; it does not prove source, ownership, or all described features | Yes |
| `src/constants/projects.js:130-160` | Supporting builds: CodeCraft auth/payments/collaboration concepts; CodeInterview video/audio/review flows; ApeUni dual packaging; blog MDX/Velite/SEO | Feature-access walkthroughs, source/config, status, and intended recruiter access | CodeCraft public editor and ApeUni public monorepo support part of the wording; CodeInterview is auth-gated in Clerk development mode; blog is public | Yes, except ApeUni dual packaging is repository-supported |
| No location in this repository; live blog homepage | “65 Technical Articles”, “33 Topics Covered”, “81% API Performance Boost” | Deterministic content counts and performance evidence/source attribution | No blog source is in this repository; 81% mirrors the portfolio latency claim | Yes |

## 7. Rendering recommendation

Architecture should be decided and implemented separately from content and visual redesign. Do not combine a framework migration with claim rewrites, information-architecture changes, or a new visual system.

| Decision factor | Retain React/Vite and add prerendering/SSG | Migrate portfolio to Next.js |
| --- | --- | --- |
| Complexity | Lower initial file churn, but Vite's official SSR API is low-level; the project must add a server render entry, route model, head/metadata ownership, static route generation, and browser/server guards. | Higher migration churn, but routing, static HTML, per-route metadata, static params, sitemap/robots conventions, and OG asset conventions are framework-owned. |
| Retained code | Most constants and presentational JSX can remain; `main.jsx`, lazy loading, modal routing, and browser-only effects need adaptation for SSR/hydration. | Constants and much presentational JSX remain reusable; app composition, client boundaries, navigation, image handling, and browser effects require deliberate migration. |
| Routing/metadata | Requires selecting and maintaining routing and head/prerender integrations. | App Router and Metadata APIs directly support case-study URLs and route metadata. |
| Crawlability/case studies | Good if every route is generated and output is asserted; easy to regress without dedicated tests. | Static export/build can emit one HTML file per route with statically generated project slugs. |
| Blog integration | Remains a separate Next.js system unless navigation/content are integrated explicitly. | Aligns portfolio architecture with the existing Next.js blog and leaves an option to consolidate later, but consolidation is a separate owner decision. |
| Deployment | Can remain a Vercel static build; hosting rewrites for routes must be tracked. | Vercel-native; static export is portable, while server/ISR mode creates a stronger platform dependency. |
| Testing impact | Add server-render, hydration, route-output, metadata, link, a11y, and visual checks. | Add the same outcome checks plus migration regression coverage and server/client-boundary checks. |
| Risk | Low-to-medium if scope stays one homepage plus a few static routes; bespoke SSR/prerender plumbing is the long-term risk. | Medium-to-high migration risk; lower long-term routing/metadata risk for a multi-page portfolio. |

**PREFERRED_PATH:** migrate the portfolio to a static-first Next.js App Router architecture in a dedicated rendering slice, preserving content data and presentational components where practical. Generate the homepage and approved case-study slugs as static HTML; use route-owned metadata and public canonical assets. Choose Vercel server features only if an evidenced requirement cannot be met by static output.

**ALTERNATIVE_PATH:** retain React/Vite and add an explicit universal render entry, routing, and deterministic prerender step that emits and tests every public route. This is preferable only if the owner prioritises minimum framework churn and keeps the site deliberately small/separate from the blog.

**DECISION_RATIONALE:** the required destination is no longer only a hydrated one-page brochure: it needs durable case-study URLs, per-page metadata, crawlable initial HTML, canonical asset handling, sitemap/robots generation, and stronger blog alignment. Next.js provides these as first-class conventions and the existing blog already demonstrates successful Next.js prerendering on Vercel. Vite can prerender, but its official SSR guidance is intentionally low-level, so matching the same outcomes would introduce several separately owned integrations. The migration must remain architecture-only to control risk.

References: [Vite SSR/prerender guidance](https://vite.dev/guide/ssr), [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [Next.js metadata and OG images](https://nextjs.org/docs/app/getting-started/metadata-and-og-images), and [Next.js static route parameters](https://nextjs.org/docs/app/api-reference/functions/generate-static-params).

**OPEN_QUESTIONS:**

1. Should portfolio and blog remain separate deployments/repos, share only navigation/design, or converge into one Next.js content system?
2. Is static export the required deployment contract, or are Vercel server/ISR features justified?
3. Which project slugs, screenshots, demos, and source links are approved for public case studies?
4. Is `www` approved as the single canonical host for portfolio metadata, sitemap, JSON-LD, and blog backlinks?
5. Which claims survive owner evidence review before they are carried into the new architecture?

## 8. Proposed slice plan

Only Slice 1 is authorised. Every future slice remains `NOT_STARTED`.

| Slice | Proposed branch | Agent/model | Dependency | Status |
| --- | --- | --- | --- | --- |
| 1. Baseline Audit | `audit/portfolio-redesign-baseline` | Codex Desktop / GPT-5.6 Sol / Extra High | Authorised | `READY_FOR_REVIEW` |
| 2. Trust and Discovery | `fix/portfolio-trust-and-discovery` | Codex Desktop / GPT-5.6 Sol / High | Slice 1 merged and owner decisions supplied | `NOT_STARTED` |
| 3. Rendering Baseline | `feat/portfolio-rendering-baseline` | Codex Desktop / GPT-5.6 Sol / Extra High | Slice 2 merged and strategy approved | `NOT_STARTED` |
| 4. Content-First Redesign | `feat/portfolio-content-first-redesign` | Claude Code / Claude Fable 5 / highest available | Slice 3 merged and design contract approved | `NOT_STARTED` |
| 5. Case Studies | `feat/portfolio-case-studies` | Claude Code / Claude Sonnet 5 / High | Slice 4 merged and content approved | `NOT_STARTED` |
| 6. Release Hardening | `test/portfolio-release-hardening` | Codex Desktop / GPT-5.6 Sol / High | Slice 5 merged | `NOT_STARTED` |

## 9. Current slice status

`PORTFOLIO_SLICE_1_READY_FOR_REVIEW`

- Audit branch is based exactly on `origin/main` SHA `9cf6bf0fbf99643b191fdc4e14b68f160a23492c`.
- Repository, live portfolio, apex redirect, blog, public links, social assets, server HTML, hydrated DOM, modal behavior, and available claim evidence were inspected non-destructively.
- Baseline `npm run lint` and `npm run build` pass. No formatting, type-check, test, accessibility, link-check, or visual-regression command exists.
- Slice 1 changes only this canonical status document. No production or tracked generated files are changed.

## 10. Risks and open decisions

1. **Trust:** approve evidence or revised disposition for work rights, role chronology, employer/client ownership, latency, conversion, service count, coverage, downtime, time saved, deployment, AWS cost, and AI privacy claims.
2. **Public links:** decide whether to remove, replace, or provide recruiter-safe access for CodeInterview; add/approve an Alex source or demo; confirm current contact details and demo ownership.
3. **Canonical host:** approve `www` as the single portfolio canonical and update all portfolio/blog references together in a later authorised slice.
4. **Writing strategy:** decide whether Writing becomes a primary portfolio destination and whether the blog stays separate or converges.
5. **Rendering:** approve the preferred static-first Next.js path or explicitly select the Vite prerender alternative before Slice 3.
6. **Content hierarchy:** approve whether Career Snapshot/Working Style/Skills evidence should be consolidated and whether private planning labels should remain public.
7. **Visual contract:** define screenshot requirements, card/chip/icon limits, motion budget, and reduced-motion behavior before redesign implementation.
8. **Verification contract:** later slices need explicit automated route HTML, metadata, link, accessibility, responsive, and visual checks rather than relying only on lint/build/manual inspection.
9. **Documentation drift:** reconcile stale theme/AI/environment statements in existing docs only within a later explicitly authorised scope.

## 11. Next authorisation gate

Slice 2 may be authorised only after this PR is independently reviewed, accepted, and merged into `main`, and after the owner supplies decisions for canonical host, public link disposition, claim evidence, Writing/blog direction, and the provisional rendering strategy. The next worker must fetch the newly merged `origin/main`; no dependent or stacked branch may start from this branch.
