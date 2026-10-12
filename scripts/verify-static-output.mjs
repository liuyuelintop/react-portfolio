import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("out");
const homepagePath = path.join(outputDirectory, "index.html");
// next.config.js sets `trailingSlash: true`, so the case study is emitted as a
// directory index rather than `work/moneyguard.html`.
const caseStudyPath = path.join(outputDirectory, "work", "moneyguard", "index.html");
const dshStudyPath = path.join(
  outputDirectory,
  "work",
  "dsh-conversation-exporter",
  "index.html",
);
const alexStudyPath = path.join(outputDirectory, "work", "alex", "index.html");
const melbourneStudyPath = path.join(
  outputDirectory,
  "work",
  "melbourne-ultimate",
  "index.html",
);

const toText = (markup) =>
  markup
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:#x27|#39|apos);/gi, "'")
    .replace(/&quot;/gi, '"')
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();

const html = await readFile(homepagePath, "utf8");
const text = toText(html);

const requiredContent = [
  // Morning: hero and the at-a-glance strip
  "Yuelin Liu",
  "Morning. Software engineer in Melbourne.",
  "I build full-stack tools with clear workflows and dependable data boundaries.",
  "My work spans self-hosted applications, deterministic finance tools and AI integrations. I design the workflow, build the UI and backend, and test what happens when requests or assumptions fail.",
  "Download résumé",
  "Independent Developer",
  "Prospective-client demos for a Melbourne consultancy, Sep 2025 to present.",
  "Full-Stack Developer",
  "ByteCroniX, an early-stage AI SaaS, Mar to Jun 2025.",
  "Early-career roles",
  // Midday: the work. Its chapter contract is asserted section-scoped further down.
  "Midday. The work.",
  "Marshal",
  "MoneyGuard",
  "Job Search Dispatch",
  "DSH Conversation Exporter",
  "Melbourne University Ultimate Club Platform",
  "Client Data Delivery Validator",
  // Golden hour
  "Further out",
  // Late
  "Contact",
  "liuyuelintop@gmail.com",
];

for (const content of requiredContent) {
  assert.ok(text.includes(content), `Missing rendered homepage content: ${content}`);
}

const removedLanguage = [
  "Recruiter Snapshot",
  "Recruiter read",
  "Interview hooks",
  "Hiring signal",
  "Candidate Positioning",
  "Hiring fit",
  "Can own",
  "Evidence Trail",
  "Product-focused version",
  "Team-fit version",
];

for (const phrase of removedLanguage) {
  assert.ok(!text.includes(phrase), `Removed planning language is still rendered: ${phrase}`);
}

const requiredLinks = [
  'href="#hero"',
  'href="#projects"',
  'href="#further-out"',
  'href="https://blog.liuyuelin.dev/"',
  'href="#contact"',
];

for (const link of requiredLinks) {
  assert.ok(html.includes(link), `Missing rendered navigation link: ${link}`);
}

const sectionIdsInOrder = [
  'id="hero"',
  'id="projects"',
  'id="further-out"',
  'id="contact"',
];

let previousIndex = -1;
for (const sectionId of sectionIdsInOrder) {
  const index = html.indexOf(sectionId);
  assert.ok(index !== -1, `Missing rendered section anchor: ${sectionId}`);
  assert.ok(index > previousIndex, `Section anchor is out of order: ${sectionId}`);
  previousIndex = index;
}

const sectionHtml = (id, nextId) => {
  const start = html.indexOf(`id="${id}"`);
  const end = nextId ? html.indexOf(`id="${nextId}"`) : html.length;
  assert.ok(start !== -1 && end > start, `Could not isolate the ${id} section`);
  return html.slice(start, end);
};
const heroHtml = sectionHtml("hero", "projects");
const workHtml = sectionHtml("projects", "further-out");
const furtherOutHtml = sectionHtml("further-out", "contact");
const heroText = toText(heroHtml);
const workText = toText(workHtml);
const furtherOutText = toText(furtherOutHtml);

const metadataChecks = [
  /<link[^>]+rel="canonical"[^>]+href="https:\/\/www\.liuyuelin\.dev\/"/,
  /<meta[^>]+property="og:url"[^>]+content="https:\/\/www\.liuyuelin\.dev\/"/,
  /<meta[^>]+property="og:image"[^>]+content="https:\/\/www\.liuyuelin\.dev\/assets\/og-image\.png"/,
  /<meta[^>]+name="twitter:card"[^>]+content="summary_large_image"/,
  /<meta[^>]+name="twitter:image"[^>]+content="https:\/\/www\.liuyuelin\.dev\/assets\/og-image\.png"/,
  /<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?"@type":"Person"[\s\S]*?<\/script>/,
];

for (const pattern of metadataChecks) {
  assert.match(html, pattern);
}

assert.ok(text.length > 5000, "Homepage text is too small to be a meaningful static render");
assert.ok(!/<main[^>]*>\s*<\/main>/i.test(html), "Homepage contains an empty application shell");
assert.ok(!/h-screen items-center justify-center bg-neutral-950/.test(html), "Homepage contains the obsolete spinner shell");

// Lead stories and evidence rows link straight to evidence-bearing case studies.
for (const [title, slug] of [
  ["Marshal", "marshal"],
  ["MoneyGuard", "moneyguard"],
]) {
  assert.match(
    workHtml,
    new RegExp(`<a[^>]+href="/work/${slug}/"[^>]*>Read the ${title} case study`),
    `Homepage is missing the ${title} case-study link`,
  );
}
for (const [title, slug] of [
  ["Melbourne University Ultimate Club Platform", "melbourne-ultimate"],
  ["Job Search Dispatch", "job-search-dispatch"],
  ["DSH Conversation Exporter", "dsh-conversation-exporter"],
]) {
  assert.match(
    workHtml,
    new RegExp(`<a[^>]+href="/work/${slug}/"[^>]*>${title}</a>`),
    `Homepage is missing the ${title} case-study link`,
  );
}
for (const [label, href] of [
  ["DSH Conversation Exporter", "https://github.com/liuyuelintop/dsh-conversation-exporter"],
  ["MoneyGuard pipeline", "https://github.com/liuyuelintop/moneyguard-pipeline"],
  ["Client Data Delivery Validator", "https://github.com/liuyuelintop/client-data-delivery-validator"],
]) {
  assert.ok(workHtml.includes(`href="${href}"`), `Homepage is missing the ${label} public source link`);
}

// The work is argued in three chapters, one per principle. Each leads with one
// story (a decision and its illustration) and lists further evidence under it,
// so a project or role appears once. Markers are asserted in reading order.
const chapters = [
  { principle: "I start with the workflow, not the feature.", markers: [
    "Marshal",
    "Self-hosted application workspace for laptop and phone. Personal project, 2026, pre-alpha. MIT-licensed, source private while pre-alpha.",
    "The useful change was removing steps.",
    // The problem first, in the owner's words, then the product's own correction.
    "Applying with a chat assistant meant the same loop for every job",
    "so most of that repetition is gone. It is still being refined.",
    "I removed the mandatory chain. A cover letter and a résumé can each be generated directly from the saved job description and permitted background.",
    // Self-hosting is stated with its boundary: the model still receives input.
    "Each person runs their own instance: on one machine, with Docker, or on a server reached over a private Tailscale network",
    "Model calls still send the selected input to the provider you choose.",
    "TypeScript, React / Vite, Node.js, Docker. Designed and built end to end.",
    "Read the Marshal case study",
    // The illustration follows one job through the merged workflow. All six
    // steps are in the static HTML, not only the one on show.
    "One job, from a link to a document",
    "Bring in the job",
    "Filter the background",
    "the server removes unconfirmed, expired and out-of-scope claims",
    "Generate either document",
    "Check the reply",
    "These checks catch bounded errors, not semantic truth.",
    "Edit, on any device",
    "Review and export",
    "No AI acceptance step is required.",
    "An illustration of the change, not the product interface.",
    "Prospective-client demos",
    "Demonstration applications for a specialty coffee retailer and a drone training provider, built from informal briefs with Next.js 15 App Router, Clerk OAuth and Convex.",
    "Sep 2025 to present",
  ] },
  { principle: "I measure before I optimise.", markers: [
    "ByteCroniX",
    "Full-Stack Developer at an early-stage AI SaaS, Mar to Jun 2025.",
    "From 26.7 seconds to 5.6.",
    // The role is wider than one endpoint, and the story has to say so first.
    "I worked across the BFF routes and REST integrations behind the web, Android and iOS clients",
    "implemented OpenAI function-calling flows in Node.js/Express",
    "worked across API testing and delivery workflows using Postman, Jest/Supertest, NGINX and multi-service CI/CD",
    "I added timing instrumentation to a points-summary request and identified the current and proposed scoring services as the dominant latency contributors",
    "The observed local integration-test response went from 26.7s to 5.6s.",
    "Node.js, Express, BFF and REST integrations, OpenAI Function Calling, Postman, Jest/Supertest, NGINX, Docker.",
    // The illustration is the method: four steps of measuring around one change.
    "Measure first, then change one layer",
    "The system",
    "An inherited path",
    "Add timing logs",
    "Find where the time goes",
    "Parallelise the independent calls",
    "Measure again",
    "An observed result, not a production benchmark.",
    "Totals are the observed local integration-test responses. Nothing else is measured here.",
    "Melbourne University Ultimate Club Platform",
    "Traced silent session-role failures to fragmented authentication usage, and centralised session reads behind one database-verified guard.",
    "Case study, not currently maintained",
  ] },
  { principle: "I turn assumptions into enforceable boundaries.", markers: [
    "MoneyGuard",
    "Wage planning for hourly workers: an OCR and audit pipeline, then a local-first web workspace. Personal project, 2026. Web source private, pipeline public.",
    "Keep the financial answer in code.",
    // The story has to name the whole product, not only its arithmetic.
    "reads a photographed timecard with a vision model, validates what comes back",
    "streams an AI-written audit into a report the code lays out",
    "Model output is treated as untrusted input.",
    "the optional AI path can explain selected figures; it does not calculate the financial result.",
    "TypeScript, Next.js / React, IndexedDB, Zod, Gemini and DeepSeek providers, Vitest / Playwright. Designed and built.",
    "Read the MoneyGuard case study",
    "Pipeline source",
    // The illustration follows one timecard across the model boundary and back.
    // All seven steps are in the static HTML, not only the one on show.
    "One timecard, from a phone to a report",
    "Photo arrives",
    "through a Telegram bot or the CLI",
    "Vision OCR",
    "Schema check",
    "Calculation",
    "Minimised payload",
    "Ledger line items are not part of it.",
    "Audit model",
    "It explains the figures; it never produces one.",
    "Report returns",
    "Sample figures are the pipeline's own mock run on a sample ledger. An illustration, not the product interface.",
    "Job Search Dispatch",
    "Restricted drafting to confirmed, permitted evidence, with validation, bounded repair and failure diagnostics before a generated letter replaces saved work.",
    "DSH Conversation Exporter",
    "Exports full conversations as clean Markdown, and excludes reasoning, tool activity and runtime metadata from the export.",
    "Client Data Delivery Validator",
    "Python/pandas validation workflow for synthetic client-delivery CSV data, with structured validation results and 12 pytest regression cases.",
  ] },
];

const chapterText = (index) => {
  const start = workText.indexOf(chapters[index].principle);
  const end = index + 1 < chapters.length
    ? workText.indexOf(chapters[index + 1].principle)
    : workText.indexOf("Product UI");
  assert.ok(start !== -1 && end > start, `Could not isolate the chapter: ${chapters[index].principle}`);
  return workText.slice(start, end);
};

chapters.forEach((chapter, chapterIndex) => {
  const text = chapterText(chapterIndex);
  let previousMarkerIndex = -1;
  for (const marker of chapter.markers) {
    const index = text.indexOf(marker, previousMarkerIndex + 1);
    assert.ok(index !== -1, `"${chapter.principle}" is missing or misorders: ${marker}`);
    previousMarkerIndex = index;
  }
});

assert.equal(
  (workHtml.match(/<section class="chapter"/g) ?? []).length,
  3,
  "The work must render exactly three chapters",
);
assert.equal(
  (workHtml.match(/<article\b/g) ?? []).length,
  3,
  "Each chapter must lead with exactly one story",
);
assert.equal(
  (workHtml.match(/<span class="t">/g) ?? []).length,
  5,
  "The chapters must list exactly five further-evidence rows",
);

// Melbourne University Ultimate is not currently maintained: it stays a compact
// evidence row and must not be promoted to a lead story.
assert.ok(
  !workHtml.includes("Read the Melbourne University Ultimate Club Platform case study"),
  "Melbourne University Ultimate must not render as a lead story",
);

// AI Harness is deliberately left off the homepage, and its repository is private.
assert.ok(!text.includes("AI Harness"), "AI Harness must not render on the homepage");
assert.ok(
  !html.includes("liuyuelintop/ai-harness"),
  "AI Harness must not expose a source link while its repository is private",
);

for (const removedHomepageWork of [
  "Selected Work",
  "More Engineering Work",
  "How I Build",
  "Learning & Contributions",
  "ALEX — AWS Multi-Agent Architecture Study",
  "Additional Work",
  "SaaS IDE Platform",
  "Remote Interview Platform",
  "ApeUni FIB Extractor Monorepo",
  "Next Markdown Blog",
]) {
  assert.ok(
    !text.includes(removedHomepageWork),
    `Homepage still renders removed work hierarchy: ${removedHomepageWork}`,
  );
}

const bannedAlexLanguage = [
  // Previous flagship positioning.
  "Alex - AWS Multi-Agent Wealth Platform",
  "wealth-planning",
  "Orchestrated five domain agents",
  // Unsupported cost, performance and infrastructure claims.
  "reducing vector storage cost by ~90%",
  "vector storage cost by ~90%",
  "eight Terraform stages",
  "least-privilege IAM",
  // Unproven deployment, observability and concurrency.
  "production observability",
  "production-shaped",
  "production-grade",
  "enterprise-grade",
  "enterprise guardrails",
  "agents in parallel",
  "parallel agents",
  "in parallel",
  // The downstream agents are invoked with InvocationType="RequestResponse",
  // and the verification script is Ed Donner's course material.
  "concurrently",
  "wrote a database verification utility",
  "built a database verification utility",
  "currently deployed",
  "deployed serverless",
  "production deployment",
];

const lowerHomepageText = text.toLowerCase();
for (const phrase of bannedAlexLanguage) {
  assert.ok(
    !lowerHomepageText.includes(phrase.toLowerCase()),
    `Homepage contains a rejected ALEX claim: ${phrase}`,
  );
}

// --- Roles and the one measurement, stated at evidence strength ---------------

// The page previously carried a third role and a set of metrics the career-fact
// reconstruction does not support. These assertions are the regression net: the
// two roles are named once each in the at-a-glance strip, and the stale wording
// cannot come back.
const glanceStart = heroHtml.indexOf('aria-label="At a glance"');
assert.ok(glanceStart !== -1, "Could not isolate the at-a-glance strip");
const glanceHtml = heroHtml.slice(glanceStart);
assert.equal(
  (glanceHtml.match(/<dt\b/g) ?? []).length,
  4,
  "The at-a-glance strip must render exactly four entries",
);

// The one performance observation the evidence supports, at its exact strength:
// a single local integration-test response. It is stated once in prose, bounded
// by the caption beside its illustration, and appears nowhere outside its chapter.
const observedLatencySentence =
  "The observed local integration-test response went from 26.7s to 5.6s.";
assert.equal(
  text.split(observedLatencySentence).length - 1,
  1,
  "The 26.7s to 5.6s observation must be stated exactly once on the homepage",
);
const measuredChapter = chapterText(1);
const outsideMeasuredChapter = text.replace(measuredChapter, " ");
assert.ok(outsideMeasuredChapter.length < text.length, "Could not isolate the measured chapter");
assert.ok(
  !outsideMeasuredChapter.includes("26.7"),
  "The latency observation must stay inside the chapter that bounds it",
);

// Employment type and payment status are unevidenced, so no role may render a
// type badge. The Contact form's "Freelance build" option is deliberately
// outside this scope.
const rolesText = `${heroText} ${workText}`;
for (const badge of ["Freelance", "Full-time", "Commercial Project", "Contract", "Paid"]) {
  assert.ok(
    !rolesText.includes(badge),
    `Homepage renders an unevidenced employment-type badge: ${badge}`,
  );
}

// The owner's evidence register marks these ByteCroniX claims as needing
// evidence or not to be used: service ownership, coverage, deployment mechanics,
// leadership, and the superseded 29-second / 81% framing. They come from an
// August 2025 résumé and must not return without primary evidence.
for (const pattern of [
  /\bowned \d+ (?:core )?microservices\b/i,
  /\b\d+-service\b/i,
  /\bGKE\b/,
  /\bblue[–-]green\b/i,
  /\bzero-downtime\b/i,
  /\b\d+% test coverage\b/i,
  /\bled end-to-end\b/i,
  /\bhalving setup time\b/i,
  /\b29\s?s\b/,
]) {
  assert.ok(!pattern.test(text), `Homepage renders an unevidenced ByteCroniX claim: ${pattern}`);
}

const staleExperienceWording = [
  // Independent work overstated as a consultancy practice with commercial clients.
  "Freelance Full-Stack Developer & Consultant",
  "Independent Practice",
  "production-ready SaaS",
  "commercial clients and local sports clubs",
  // ByteCroniX dates, metrics and ownership the reconstruction contradicts.
  "Mar 2025 - Aug 2025",
  "Reduced API response time by 81%",
  "29s to 5.6s",
  "peak production loads",
  "directly increasing user form completion rates",
  "Maintained 4 core Node.js microservices",
  "near-zero-downtime",
  "90% PR test coverage",
  // Expresso Carwash was never software-development employment.
  "Expresso Carwash Pty Ltd",
  "saving approximately 6 hours per week per site",
  "eliminating manual server updates",
];

for (const phrase of staleExperienceWording) {
  assert.ok(!text.includes(phrase), `Homepage still renders stale role wording: ${phrase}`);
}

// --- Principles and toolbox describe habits the evidence demonstrates ---------

const toolboxStart = workHtml.indexOf('aria-label="Tools"');
assert.ok(toolboxStart !== -1, "Could not isolate the toolbox");
const toolboxHtml = workHtml.slice(toolboxStart);
const toolboxText = toText(toolboxHtml);

assert.equal(
  (toolboxHtml.match(/<dt\b/g) ?? []).length,
  4,
  "The toolbox must render exactly four groups",
);
for (const content of [
  "Product UI",
  "APIs and data",
  "Auth and delivery",
  "AI and validation",
  // Named rather than generic, and traceable: Clerk to the prototype stack,
  // NextAuth to the Melbourne session guard the page cites.
  "Clerk OAuth",
  "NextAuth",
]) {
  assert.ok(toolboxText.includes(content), `The toolbox is missing required content: ${content}`);
}

// Nothing in the accepted evidence demonstrates these as tools Yuelin builds
// with. Project rows may still name what a project itself used (Playwright in
// MoneyGuard, pytest in the validator), so this list is scoped to the toolbox.
for (const phrase of [
  "Jest",
  "GCP/GKE",
  "GCP GKE",
  "Kubernetes",
  "AWS Lambda",
  "Bedrock",
  "JWT/OAuth",
  "pytest",
  "Playwright",
  "Structured Outputs",
]) {
  assert.ok(
    !toolboxText.toLowerCase().includes(phrase.toLowerCase()),
    `The toolbox still renders an undemonstrated tool: ${phrase}`,
  );
}

const staleWorkWording = [
  // Principle titles the reconciliation replaced.
  "I translate messy workflows into shipped product.",
  "I reduce risk between feature branch and production.",
  "I build AI workflows with engineering guardrails.",
  // Evidence contradicted by the career-fact reconstruction.
  "Digitised Expresso Carwash spreadsheet workflows",
  "Expresso Carwash",
  "Melbourne clients and local sports clubs",
  "Maintained 4 Node.js microservices",
  "Added Jest and Playwright coverage",
  "masking, retry/backoff and timestamp throttling",
  // The one latency observation carries no derived statistics.
  "81%",
  "P95",
  "P99",
  // Over-claims the section must not reach for.
  "production optimisation",
  "production optimization",
  "production incident",
  "production security",
  "production-grade security",
  "comprehensive security testing",
  "absolute privacy",
  "anonymous",
  "zero data exposure",
  "all vulnerabilities",
];

const lowerWorkText = workText.toLowerCase();
for (const phrase of staleWorkWording) {
  assert.ok(
    !lowerWorkText.includes(phrase.toLowerCase()),
    `The work section still renders rejected wording: ${phrase}`,
  );
}

// --- Further out stays one strip, not a hobbies list ---------------------------

// Five places, each one photograph and one line, in a single sideways strip.
assert.equal(
  (furtherOutHtml.match(/<figcaption\b/g) ?? []).length,
  5,
  "Further out must render exactly five one-line places",
);
assert.equal(
  (furtherOutHtml.match(/<img\b/g) ?? []).length,
  5,
  "Further out must render exactly one photograph per place",
);
assert.match(
  furtherOutHtml,
  /<div class="strip" tabindex="0" role="region" aria-label="[^"]+"/,
  "The photo strip must be a labelled, keyboard-reachable region",
);
for (const place of ["On the sill", "At the table", "In town", "On the field", "Away"]) {
  assert.ok(furtherOutText.includes(place), `Further out is missing the place: ${place}`);
}
assert.ok(
  furtherOutText.includes("A bottle is how an evening gets kept."),
  "Further out is missing the Wine Log line",
);
// Alcohol stays understated: one line about memory, no counts or preferences.
for (const pattern of [/\b\d+ bottles\b/i, /\bshiraz\b/i, /\bpinot\b/i, /\bbeer\b/i]) {
  assert.ok(!pattern.test(text), `Homepage overstates drinking: ${pattern}`);
}

// --- Job Search Dispatch: private source, public evidence-bounded story -------

const dispatchHtml = await readFile(
  path.join(outputDirectory, "work", "job-search-dispatch", "index.html"), "utf8",
);
const dispatchText = toText(dispatchHtml);
assert.ok(html.includes('href="/work/job-search-dispatch/"'), "Homepage must link to Dispatch");
assert.equal((dispatchHtml.match(/<h1\b/g) ?? []).length, 1);
assert.match(dispatchHtml, /<title>Job Search Dispatch case study \| Yuelin Liu<\/title>/);
for (const metadata of [
  '<link rel="canonical" href="https://www.liuyuelin.dev/work/job-search-dispatch/"',
  '<meta property="og:url" content="https://www.liuyuelin.dev/work/job-search-dispatch/"',
]) {
  assert.ok(dispatchHtml.includes(metadata), `Dispatch metadata is missing: ${metadata}`);
}
for (const marker of [
  "from an AI-generated React MVP",
  "One ticket, from capture to review",
  "Decisions I can defend",
  "A concrete iteration: whose number is it?",
  "confirmed application-draft evidence claims",
  "Model calls leave the machine",
  "all 371 deterministic tests passed",
  "What changed in late September 2026",
  "614 deterministic tests",
  "I did not re-run that gate for this page",
  "Writer only is the default",
  "Evolving the workspace without losing saved work",
  "shared Zod boundary contracts",
  "1440, 390 and 320 pixels",
  "with synthetic data and no live model calls",
  "Current scope and limitations",
  "Later human edits are not semantically re-verified",
  "private source repository",
]) {
  assert.ok(dispatchText.includes(marker), `Dispatch case study is missing: ${marker}`);
}
assert.ok(dispatchHtml.includes('href="/#projects"'), "Dispatch must return to Selected Work");
assert.ok(dispatchText.length > 5000, "Dispatch must render a complete static story");
for (const markup of [html, dispatchHtml]) {
  assert.ok(!markup.includes('href="https://github.com/liuyuelintop/job-search-dispatch-browser-bridge'),
    "Dispatch must not link visitors to a private repository");
}
for (const pattern of [
  /\b(?:fully offline|zero data leakage|guaranteed accuracy|hallucination[- ]free)\b/i,
  /\b(?:automatically submits applications|guarantees truthful claims)\b/i,
  /\b(?:saved|saves) \d+ (?:hours|minutes)\b/i,
  /\b\d[\d,]*\+? (?:users|customers|interviews)\b/i,
]) {
  assert.ok(!pattern.test(dispatchText), `Dispatch contains an unsupported claim: ${pattern}`);
}

// --- Marshal: private source, pre-alpha, evidence-bounded story ---------------

const marshalHtml = await readFile(
  path.join(outputDirectory, "work", "marshal", "index.html"), "utf8",
);
const marshalText = toText(marshalHtml);
assert.ok(html.includes('href="/work/marshal/"'), "Homepage must link to Marshal");
assert.ok(
  html.includes("An illustration of the change, not the product interface."),
  "Marshal visual must be disclosed as an illustration",
);
assert.equal((marshalHtml.match(/<h1\b/g) ?? []).length, 1);
assert.match(marshalHtml, /<title>Marshal case study \| Yuelin Liu<\/title>/);
for (const metadata of [
  '<link rel="canonical" href="https://www.liuyuelin.dev/work/marshal/"',
  '<meta property="og:url" content="https://www.liuyuelin.dev/work/marshal/"',
]) {
  assert.ok(marshalHtml.includes(metadata), `Marshal metadata is missing: ${metadata}`);
}
for (const marker of [
  "the tool I already had only ran on one Mac",
  "clean-room successor",
  "The useful change was removing steps",
  "I removed the mandatory assessment and audit/acceptance chain",
  "optional Match assessment is reference material rather than a gate",
  "Autosave with conflict detection",
  "keeps the last 20 revisions",
  "One instance per person, not a shared service",
  "model calls still send selected input",
  "Built to be shared",
  "remains private while the project is pre-alpha",
  "67379b5",
  "CI run completed successfully",
  "automated journeys use a stubbed model",
  "not a screenshot",
  "Current scope and limitations",
  "Live-model writing quality, the current deployment revision",
]) {
  assert.ok(marshalText.includes(marker), `Marshal case study is missing: ${marker}`);
}
assert.ok(marshalHtml.includes('href="/#projects"'), "Marshal must return to Selected Work");
assert.ok(marshalText.length > 5000, "Marshal must render a complete static story");
for (const markup of [html, marshalHtml]) {
  assert.ok(!markup.includes('href="https://github.com/liuyuelintop/marshal'),
    "Marshal must not link visitors to a private repository");
}
const marshalCardText = chapterText(0);
for (const claimText of [marshalText, marshalCardText]) {
  for (const pattern of [
    /\b(?:open[- ]source|fully offline|zero data leakage|guaranteed accuracy|hallucination[- ]free)\b/i,
    /\b(?:automatically submits applications|guarantees truthful claims|production[- ]ready)\b/i,
    /\b(?:saved|saves) \d+ (?:hours|minutes)\b/i,
    /\b\d[\d,]*\+? (?:users|customers|interviews|friends)\b/i,
  ]) {
    assert.ok(!pattern.test(claimText), `Marshal contains an unsupported claim: ${pattern}`);
  }
}

// Guard retired workflow claims and private source boundaries.
for (const stale of ["no fetch-from-link capture", "audit required unless waived", "draft material that only says what I can back up", "220 unit and contract tests"]) {
  assert.ok(!marshalText.toLowerCase().includes(stale.toLowerCase()), `Marshal contains retired copy: ${stale}`);
}
for (const markup of [html, await readFile(caseStudyPath, "utf8")]) {
  assert.ok(!markup.includes('href="https://github.com/liuyuelintop/moneyguard-web'),
    "MoneyGuard must not expose a private web-source CTA");
}
// Homepage figures are illustrations; each must say so beside the figure.
assert.equal(
  (workHtml.match(/<figcaption\b/g) ?? []).length,
  3,
  "Every lead-story figure must carry its disclosure caption",
);

// --- DSH Conversation Exporter case study -----------------------------------

const dshHtml = await readFile(dshStudyPath, "utf8");
const dshText = toText(dshHtml);

assert.match(
  dshHtml,
  /<title>DSH Conversation Exporter case study \| Yuelin Liu<\/title>/,
  "DSH case study is missing its route-specific title",
);
assert.match(
  dshHtml,
  /<link[^>]+rel="canonical"[^>]+href="https:\/\/www\.liuyuelin\.dev\/work\/dsh-conversation-exporter\/"/,
  "DSH case study canonical URL is missing or incorrect",
);
assert.match(
  dshHtml,
  /<meta[^>]+property="og:url"[^>]+content="https:\/\/www\.liuyuelin\.dev\/work\/dsh-conversation-exporter\/"/,
  "DSH case study og:url is missing or incorrect",
);
assert.equal(
  (dshHtml.match(/<h1\b/gi) ?? []).length,
  1,
  "DSH case study must render exactly one h1",
);

for (const heading of [
  "The problem",
  "What Export Chat does",
  "What selective whole-turn export adds",
  "What exported content deliberately excludes",
  "Host and request boundaries",
  "How the npm package is verified",
  "Current limitations",
]) {
  assert.ok(dshText.includes(heading), `DSH case study is missing the ${heading} section`);
}

for (const content of [
  "the official function belongs to DSH and is not functionality I built or replaced",
  "the final visible assistant answer from each turn",
  "previews capped at 180 characters",
  "Reasoning blocks, tool calls and results",
  "/api/conversation.export and /api/conversation.turns",
  "enforce a 4 KiB body limit",
  "npm pack --dry-run",
  "Version 0.3 targets @deepseek-ai/dsh@0.1.0-rc.6",
]) {
  assert.ok(dshText.includes(content), `DSH case study is missing required evidence: ${content}`);
}

for (const phrase of [
  "active users",
  "users served",
  "adoption",
  "production scale",
  "built DeepSeek",
  "contributed to DeepSeek",
]) {
  assert.ok(
    !dshText.toLowerCase().includes(phrase.toLowerCase()),
    `DSH case study contains an unsupported claim: ${phrase}`,
  );
}
assert.ok(
  !/\b\d[\d,]*\+?\s+downloads\b/i.test(dshText),
  "DSH case study contains an unsupported download metric",
);

for (const link of [
  'href="https://github.com/liuyuelintop/dsh-conversation-exporter"',
  'href="/#projects"',
]) {
  assert.ok(dshHtml.includes(link), `DSH case study is missing a required link: ${link}`);
}
assert.ok(
  dshText.length > 3000,
  "DSH case study text is too small to answer the bounded evidence questions",
);
assert.ok(
  !/<main[^>]*>\s*<\/main>/i.test(dshHtml),
  "DSH case study contains an empty application shell",
);

// --- MoneyGuard case study ---------------------------------------------------

const caseStudyHtml = await readFile(caseStudyPath, "utf8");
const caseStudyText = toText(caseStudyHtml);

assert.match(
  caseStudyHtml,
  /<title>MoneyGuard case study \| Yuelin Liu<\/title>/,
  "Case study is missing its route-specific title",
);
const caseStudyDescription =
  "How I evolved an AI extraction pipeline into a local-first planning tool, keeping financial calculations deterministic and optional model explanations behind explicit data boundaries.";
assert.ok(
  caseStudyHtml.includes(`<meta name="description" content="${caseStudyDescription}"/>`),
  "Case study description is missing or incorrect",
);
assert.match(
  caseStudyHtml,
  /<link[^>]+rel="canonical"[^>]+href="https:\/\/www\.liuyuelin\.dev\/work\/moneyguard\/"/,
  "Case study canonical URL is missing or incorrect",
);
assert.match(
  caseStudyHtml,
  /<meta[^>]+property="og:url"[^>]+content="https:\/\/www\.liuyuelin\.dev\/work\/moneyguard\/"/,
  "Case study og:url is missing or incorrect",
);
for (const metadata of [
  `<meta property="og:title" content="MoneyGuard case study | Yuelin Liu"/>`,
  `<meta property="og:description" content="${caseStudyDescription}"/>`,
  '<meta property="og:image" content="https://www.liuyuelin.dev/assets/og-image.png"/>',
  '<meta property="og:type" content="article"/>',
  '<meta name="twitter:card" content="summary_large_image"/>',
  '<meta name="twitter:title" content="MoneyGuard case study | Yuelin Liu"/>',
  `<meta name="twitter:description" content="${caseStudyDescription}"/>`,
  '<meta name="twitter:image" content="https://www.liuyuelin.dev/assets/og-image.png"/>',
]) {
  assert.ok(caseStudyHtml.includes(metadata), `Case study metadata is missing: ${metadata}`);
}
assert.match(
  caseStudyHtml,
  /<h1[^>]*>[\s\S]*?MoneyGuard[\s\S]*?<\/h1>/,
  "Case study is missing its MoneyGuard heading",
);
assert.equal(
  (caseStudyHtml.match(/<h1\b/gi) ?? []).length,
  1,
  "Case study must render exactly one h1",
);

const requiredCaseStudySections = [
  "From extracting a timecard to making a decision",
  "Three questions the product can answer",
  "Keep the financial answer in code",
  "Evidence and current scope",
  "Earlier pipeline: architecture and verification",
  "The problem",
  "Constraints",
  "Workflow",
  "Architecture",
  "Decisions I can defend",
  "Privacy boundaries",
  "Verification",
  "Current limitations and what I would change",
];

for (const heading of requiredCaseStudySections) {
  assert.ok(
    caseStudyText.includes(heading),
    `Case study is missing the ${heading} section`,
  );
}

const requiredCaseStudyContent = [
  "79848c1",
  "source tests were inspected, not rerun",
  "free-text question itself can contain personal information",
  "production disabled",
  "before the optional deposit",
  "session and do not become hidden changes",
  // Workflow sequence, rendered statically without a diagram library.
  "Timecard image",
  "Vision OCR",
  "Zod validation",
  "Local financial computation",
  "Minimized audit payload",
  "Streamed report",
  // The privacy distinction between the two form factors must stay explicit.
  "CLI and library",
  "Hosted /extract endpoint",
  "The audit payload is not anonymous.",
  "the audit provider receives hours worked",
  "weekly gross income",
  "This form factor sends data across the network by design.",
  "The uploaded image goes to the vision provider",
  "returns hourlyRate to the authenticated caller",
  // Verification must describe the method, not just claim coverage.
  "substring check on sentinel values",
  "It does not establish that the payload is non-derivable",
  // Limitations must survive as a section with real content.
  "That decision is still open.",
];

for (const content of requiredCaseStudyContent) {
  assert.ok(
    caseStudyText.includes(content),
    `Case study is missing required content: ${content}`,
  );
}

const bannedCaseStudyLanguage = [
  "absolute privacy",
  "zero data exposure",
  "zero data leakage",
  "zero raw data leakage",
  "fully private",
  "completely private",
  "never leaves your machine",
  "never leave your machine",
  "anonymized",
  "anonymised",
  "completely anonymous",
  "fully anonymous",
  "totally anonymous",
  "guaranteed privacy",
  "privacy guarantee",
  "eliminates http 429",
  "eliminating all http 429",
  "prevent http 429",
  "prevents http 429",
  "zero hardcode",
  "zero-hardcode",
  "built for production",
  "hours saved",
  "production scale",
  "production adoption",
  "active users",
  "users served",
  "revenue generated",
  "performance improvement",
];

const lowerCaseStudyText = caseStudyText.toLowerCase();
for (const phrase of bannedCaseStudyLanguage) {
  assert.ok(
    !lowerCaseStudyText.includes(phrase),
    `Case study contains banned language: ${phrase}`,
  );
}

const requiredCaseStudyLinks = [
  'href="https://github.com/liuyuelintop/moneyguard-pipeline"',
  'href="/#projects"',
];

for (const link of requiredCaseStudyLinks) {
  assert.ok(
    caseStudyHtml.includes(link),
    `Case study is missing a required link: ${link}`,
  );
}

assert.ok(
  caseStudyText.length > 5000,
  "Case study text is too small to be a meaningful static render",
);
assert.ok(
  dshText.length < caseStudyText.length,
  "The bounded DSH case study must remain materially shorter than MoneyGuard",
);
assert.ok(
  !/<main[^>]*>\s*<\/main>/i.test(caseStudyHtml),
  "Case study contains an empty application shell",
);
assert.ok(
  !/h-screen items-center justify-center bg-neutral-950/.test(caseStudyHtml),
  "Case study contains the obsolete spinner shell",
);
assert.ok(
  !/animate-spin|role="progressbar"|Loading\.\.\./i.test(caseStudyHtml),
  "Case study renders a loading placeholder instead of content",
);

const emittedCaseStudyDirectories = (await readdir(path.join(outputDirectory, "work"), {
  withFileTypes: true,
}))
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
assert.deepEqual(
  emittedCaseStudyDirectories,
  ["alex", "dsh-conversation-exporter", "job-search-dispatch", "marshal", "melbourne-ultimate", "moneyguard"],
  "Static export must contain exactly the approved case-study directories",
);

// --- ALEX architecture study -------------------------------------------------

// The study page exists to be honest about work that is not Yuelin's. The
// assertions below are the contract: attribution before anything else, the
// architecture stated as the source says it behaves, the teardown recorded,
// and no reach for ownership language.
const alexHtml = await readFile(alexStudyPath, "utf8");
const alexText = toText(alexHtml);

assert.match(
  alexHtml,
  /<title>ALEX architecture study \| Yuelin Liu<\/title>/,
  "ALEX study is missing its route-specific title",
);
assert.match(
  alexHtml,
  /<link[^>]+rel="canonical"[^>]+href="https:\/\/www\.liuyuelin\.dev\/work\/alex\/"/,
  "ALEX study canonical URL is missing or incorrect",
);
assert.equal(
  (alexHtml.match(/<h1\b/gi) ?? []).length,
  1,
  "ALEX study must render exactly one h1",
);

for (const heading of [
  "Whose project this is",
  "What I set out to learn",
  "The architecture, as it actually runs",
  "Request path",
  "What I deployed, and what I tore down",
  "What I contributed upstream",
  "What this is not",
]) {
  assert.ok(alexText.includes(heading), `ALEX study is missing the ${heading} section`);
}

// Attribution must precede the architecture, not trail it.
const orderedAlexMarkers = [
  "Whose project this is",
  "Ed Donner",
  "MIT licence",
  "I did not design this system",
  "The architecture, as it actually runs",
  "What this is not",
  "Not my architecture.",
];

let previousAlexMarkerIndex = -1;
for (const marker of orderedAlexMarkers) {
  const index = alexText.indexOf(marker);
  assert.ok(index !== -1, `ALEX study is missing required content: ${marker}`);
  assert.ok(index > previousAlexMarkerIndex, `ALEX study content is out of order at: ${marker}`);
  previousAlexMarkerIndex = index;
}

const requiredAlexContent = [
  // The correction that started this release: sequential, not simultaneous.
  'InvocationType="RequestResponse"',
  "not simultaneously",
  "the three specialists execute in sequence",
  // The stage count that was previously overstated.
  "seven Terraform root configurations",
  // The deployment is past tense, with the reason it ended.
  "Then I destroyed all of it.",
  "Nothing described on this page is running today.",
  // The diagram is text-bearing markup, so its labels are assertable.
  "SQS analysis_jobs",
  "Deterministic pre-pass",
  "no model decides whether these run",
  "nothing in the analysis path invokes it",
  "Aurora Serverless v2",
  // Contributions must name what is Ed's before what is Yuelin's.
  "The verification script itself is Ed's",
];

for (const content of requiredAlexContent) {
  assert.ok(alexText.includes(content), `ALEX study is missing required content: ${content}`);
}

// Every upstream claim carries its diff.
for (const branch of [
  "add-verify-database-step6",
  "fix-guide8-undefined-accounts",
  "docs/sagemaker-region-note",
]) {
  assert.ok(
    alexHtml.includes(
      `href="https://github.com/liuyuelintop/ed-ai-in-production-alex/compare/main...${branch}"`,
    ),
    `ALEX study is missing the evidence link for branch: ${branch}`,
  );
}

const bannedAlexStudyLanguage = [
  // Ownership. "Not my architecture." is required above, so the banned form
  // has to be the affirmative one.
  "this is my architecture",
  "i designed",
  "i architected",
  "i built this system",
  // Concurrency, which the source contradicts.
  "in parallel",
  "concurrently",
  "simultaneous invocation",
  // Unverified posture and figures.
  "production-grade",
  "production observability",
  "enterprise-grade",
  "least-privilege iam",
  "eight terraform stages",
  "~90%",
  "currently deployed",
  "live deployment",
];

const lowerAlexText = alexText.toLowerCase();
for (const phrase of bannedAlexStudyLanguage) {
  assert.ok(
    !lowerAlexText.includes(phrase),
    `ALEX study contains a rejected claim: ${phrase}`,
  );
}

assert.ok(
  alexText.length > 4000,
  "ALEX study text is too small to be a meaningful static render",
);
assert.ok(
  !/<main[^>]*>\s*<\/main>/i.test(alexHtml),
  "ALEX study contains an empty application shell",
);

// --- Emitted public assets ---------------------------------------------------

// --- Melbourne University Ultimate case study --------------------------------

// Owned work whose earlier copy overstated it. These assertions hold the page to
// the evidence audit: the mechanisms it may describe, and the limits it must
// keep stating.
const melbourneHtml = await readFile(melbourneStudyPath, "utf8");
const melbourneText = toText(melbourneHtml);

assert.match(
  melbourneHtml,
  /<title>Melbourne University Ultimate case study \| Yuelin Liu<\/title>/,
  "Melbourne study is missing its route-specific title",
);
assert.match(
  melbourneHtml,
  /<link[^>]+rel="canonical"[^>]+href="https:\/\/www\.liuyuelin\.dev\/work\/melbourne-ultimate\/"/,
  "Melbourne study canonical URL is missing or incorrect",
);
assert.match(
  melbourneHtml,
  /<meta[^>]+property="og:url"[^>]+content="https:\/\/www\.liuyuelin\.dev\/work\/melbourne-ultimate\/"/,
  "Melbourne study og:url is missing or incorrect",
);
assert.ok(
  melbourneHtml.includes(
    '<meta property="og:title" content="Melbourne University Ultimate case study | Yuelin Liu"/>',
  ),
  "Melbourne study og:title is missing or incorrect",
);
assert.ok(
  melbourneHtml.includes(
    '<meta name="twitter:title" content="Melbourne University Ultimate case study | Yuelin Liu"/>',
  ),
  "Melbourne study twitter:title is missing or incorrect",
);
assert.equal(
  (melbourneHtml.match(/<h1\b/gi) ?? []).length,
  1,
  "Melbourne study must render exactly one h1",
);
assert.ok(
  melbourneText.length > 3000,
  "Melbourne study has too little pre-JavaScript text to be a meaningful static render",
);
assert.ok(
  melbourneText.includes("Sole developer · Built July 2025 · Revisited and hardened August 2026"),
  "Melbourne study is missing its ownership and lifecycle line",
);
assert.ok(
  melbourneHtml.includes('href="https://github.com/liuyuelintop/melb-uni-ultimate"'),
  "Melbourne study is missing its public source link",
);

for (const heading of [
  "What the application is",
  "What changed",
  "Why I went back",
  "to a URL that never existed",
  "Why a valid session carried no role",
  "Structural authorization redesign",
  "Mass-assignment remediation",
  "Findings turned into regression tests and CI",
  "Data model decision",
  "What is verified",
  "Scope of verification",
]) {
  assert.ok(
    melbourneText.includes(heading),
    `Melbourne study is missing the "${heading}" section`,
  );
}

// The outcome has to be banked before the page describes what was wrong with
// the project. A reader who skims headings should meet capability first.
const changedIndex = melbourneText.indexOf("What changed");
const wentBackIndex = melbourneText.indexOf("Why I went back");
const firstInvestigationIndex = melbourneText.indexOf("to a URL that never existed");
assert.ok(
  changedIndex !== -1 && changedIndex < wentBackIndex,
  "Melbourne study must state what changed before explaining why it was revisited",
);
assert.ok(
  changedIndex < firstInvestigationIndex,
  "Melbourne study must state what changed before the debugging sections",
);

// The evidence must outweigh the caveats. The page previously listed six
// limitations against five verified claims, which reads as unproven work no
// matter how good the underlying evidence is.
const sectionListItems = (id, nextId) => {
  const start = melbourneHtml.indexOf(`id="${id}"`);
  const end = melbourneHtml.indexOf(`id="${nextId}"`);
  assert.ok(start !== -1 && end > start, `Could not isolate the ${id} section`);
  return (melbourneHtml.slice(start, end).match(/<li\b/g) ?? []).length;
};
const verifiedCount = sectionListItems("verified", "unverified");
const scopeCount = (melbourneHtml.slice(melbourneHtml.indexOf('id="unverified"')).match(/<li\b/g) ?? [])
  .length;
assert.ok(
  verifiedCount > scopeCount,
  `Melbourne study lists ${verifiedCount} verified claims against ${scopeCount} limitations; the evidence must outweigh the caveats`,
);

// The three concepts the checkpoint exists to publish.
for (const [concept, needle] of [
  ["authorization", "23 of the 24 mutating handlers require a session"],
  ["testing and CI", "73 tests across 3 files"],
  ["data model", "unique index across those three fields"],
]) {
  assert.ok(
    melbourneText.includes(needle),
    `Melbourne study is missing its ${concept} evidence`,
  );
}

// The limitations are load-bearing: they are the reason the rest is credible,
// so each one is asserted individually rather than as a section heading alone.
for (const limitation of [
  "No real MongoDB end-to-end verification was performed",
  "not against a real database",
  "a signed-in non-admin session against a real database has not been fully exercised",
  "The live deployment was not independently observed",
  "Historical seeded admin credentials remain in the Git history",
  "Possible stale MongoDB indexes remain an operational check",
]) {
  assert.ok(
    melbourneText.includes(limitation),
    `Melbourne study is missing the limitation: ${limitation}`,
  );
}

// --- Contradicted wording, scoped to Melbourne only --------------------------

// Whole-phrase, word-boundary, case-insensitive. The banned phrase is
// "Open Source" — the "Source" call-to-action label is required copy and must
// survive this check. Other projects may legitimately use these words, so the
// homepage side is narrowed to the Melbourne card.
const melbourneCardStart = workText.indexOf("Melbourne University Ultimate Club Platform");
const melbourneCardEnd = workText.indexOf("I turn assumptions into enforceable boundaries.");
assert.ok(
  melbourneCardStart !== -1 && melbourneCardEnd > melbourneCardStart,
  "Could not isolate the Melbourne evidence row on the homepage",
);
const melbourneCardText = workText.slice(melbourneCardStart, melbourneCardEnd);

const contradictedMelbourneWording = [
  /\bopen[-\s]source\b/i,
  /\bplayer statistics\b/i,
  /\bstatistics tracking\b/i,
  /\breusable template\b/i,
  /\bmodular template\b/i,
  /\btemplate for (?:other clubs|sports clubs)\b/i,
  /\bcontact form\b/i,
  /\bperformance[-\s]first\b/i,
  /\bfast\b/i,
  /\bactively maintained\b/i,
  /\bcontinuously maintained\b/i,
  /\btrusted by\b/i,
  /\b\d[\d,]*\+? (?:users|members|clubs|teams|visitors|downloads)\b/i,
];

for (const pattern of contradictedMelbourneWording) {
  assert.ok(
    !pattern.test(melbourneCardText),
    `Melbourne homepage listing contains contradicted wording matching ${pattern}`,
  );
  assert.ok(
    !pattern.test(melbourneText),
    `Melbourne case study contains contradicted wording matching ${pattern}`,
  );
}

const emittedFiles = [
  "robots.txt",
  "sitemap.xml",
  "resume/yuelin-liu-resume.pdf",
  "assets/og-image.png",
  "vite.svg",
  "images/photos/flagstaff-jacaranda.webp",
  "images/photos/cat-lamp.webp",
  "images/photos/forehand.webp",
  "images/photos/cat-window.webp",
  "images/photos/wine-log-bottle.webp",
  "images/photos/park-tram.webp",
  "images/photos/huddle.webp",
];

for (const file of emittedFiles) {
  const filePath = path.join(outputDirectory, file);
  await access(filePath);
  assert.ok((await stat(filePath)).size > 0, `Static output file is empty: ${file}`);
}

const robots = await readFile(path.join(outputDirectory, "robots.txt"), "utf8");
const sitemap = await readFile(path.join(outputDirectory, "sitemap.xml"), "utf8");
assert.ok(robots.includes("Sitemap: https://www.liuyuelin.dev/sitemap.xml"));
assert.ok(sitemap.includes("<loc>https://www.liuyuelin.dev/</loc>"));
assert.ok(
  sitemap.includes("<loc>https://www.liuyuelin.dev/work/dsh-conversation-exporter/</loc>"),
  "Sitemap is missing the DSH Conversation Exporter case-study route",
);
assert.ok(
  sitemap.includes("<loc>https://www.liuyuelin.dev/work/moneyguard/</loc>"),
  "Sitemap is missing the MoneyGuard case-study route",
);
assert.ok(
  sitemap.includes("<loc>https://www.liuyuelin.dev/work/alex/</loc>"),
  "Sitemap is missing the ALEX architecture-study route",
);
assert.ok(
  sitemap.includes("<loc>https://www.liuyuelin.dev/work/melbourne-ultimate/</loc>"),
  "Sitemap is missing the Melbourne University Ultimate case-study route",
);
// The sitemap is derived from CASE_STUDY_SLUGS, so this catches a study being
// added to the data without being approved for publication.
const sitemapWorkRoutes = [...sitemap.matchAll(/<loc>https:\/\/www\.liuyuelin\.dev(\/work\/[^<]*)<\/loc>/g)]
  .map((match) => match[1])
  .sort();
assert.deepEqual(
  sitemapWorkRoutes,
  [
    "/work/alex/",
    "/work/dsh-conversation-exporter/",
    "/work/job-search-dispatch/",
    "/work/marshal/",
    "/work/melbourne-ultimate/",
    "/work/moneyguard/",
  ],
  "Sitemap must list exactly the approved routes under /work/",
);

assert.ok(sitemap.includes("<loc>https://www.liuyuelin.dev/work/job-search-dispatch/</loc>"),
  "Sitemap is missing Dispatch");

// The homepage no longer bundles project screenshots, so the media directory
// may not be emitted at all.
const emittedMedia = await readdir(path.join(outputDirectory, "_next/static/media")).catch(() => []);
assert.ok(
  emittedMedia.every((file) => !file.startsWith("melbUniUltimate.")),
  "The Melbourne Ultimate screenshot must not be bundled into the static export",
);
assert.ok(
  emittedMedia.every((file) => !file.startsWith("alex-aws-multi-agent-wealth-platform.")),
  "The ALEX flagship screenshot must no longer be bundled into the static export",
);

console.log(
  "Static output verified: the homepage evidence hierarchy and all six case studies render meaningful HTML with correct metadata, source boundaries, stated limitations and public assets.",
);
