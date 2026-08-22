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
  // Hero
  "Yuelin Liu",
  "Melbourne · Full-Stack Developer · AI & LLM Applications",
  "I build reliable full-stack software, with a focus on AI/LLM applications and developer tools.",
  "I work across product UI, APIs, authentication, data workflows and model-integrated features—turning messy requirements into reliable software.",
  // Selected Work
  "Selected Work",
  "DSH Conversation Exporter",
  "MoneyGuard",
  "More Engineering Work",
  "AI Harness",
  "Current work",
  "Melbourne University Ultimate Club Platform",
  "Client Data Delivery Validator",
  // Experience — exactly two roles, stated at the strength the evidence supports.
  "Independent Developer",
  "Prospective Client Demos for a Melbourne Consultancy",
  "Sep 2025 - Present",
  "Full-Stack Developer",
  "ByteCroniX — Early-Stage AI SaaS",
  "Mar 2025 - Jun 2025",
  // How I Build — its content contract is asserted section-scoped further down.
  "How I Build",
  // Contact
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
  'href="#experience"',
  'href="#how-i-build"',
  'href="https://blog.liuyuelin.dev/"',
  'href="#contact"',
];

for (const link of requiredLinks) {
  assert.ok(html.includes(link), `Missing rendered navigation link: ${link}`);
}

const sectionIdsInOrder = [
  'id="hero"',
  'id="projects"',
  'id="experience"',
  'id="how-i-build"',
  'id="contact"',
];

let previousIndex = -1;
for (const sectionId of sectionIdsInOrder) {
  const index = html.indexOf(sectionId);
  assert.ok(index !== -1, `Missing rendered section anchor: ${sectionId}`);
  assert.ok(index > previousIndex, `Section anchor is out of order: ${sectionId}`);
  previousIndex = index;
}

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

// Both flagship cards link straight to evidence-bearing case studies.
assert.match(
  html,
  /<a[^>]+href="\/work\/dsh-conversation-exporter\/"[^>]*>[\s\S]*?Read case study/,
  "Homepage is missing the DSH Conversation Exporter 'Read case study' link",
);
assert.ok(
  html.includes('href="https://github.com/liuyuelintop/dsh-conversation-exporter"'),
  "Homepage is missing the DSH Conversation Exporter public source link",
);
assert.match(
  html,
  /<a[^>]+href="\/work\/moneyguard\/"[^>]*>[\s\S]*?Read case study/,
  "Homepage is missing the MoneyGuard 'Read case study' link",
);
assert.ok(
  html.includes('href="https://github.com/liuyuelintop/moneyguard-pipeline"'),
  "Homepage is missing the MoneyGuard public source link",
);
assert.ok(
  html.includes('href="https://github.com/liuyuelintop/melb-uni-ultimate"'),
  "Homepage is missing the Melbourne University Ultimate public source link",
);
assert.ok(
  html.includes('href="https://github.com/liuyuelintop/client-data-delivery-validator"'),
  "Homepage is missing the Client Data Delivery Validator public source link",
);

const flagshipEvidenceHierarchy = [
  {
    title: "DSH Conversation Exporter",
    end: "MoneyGuard",
    markers: [
      "Exports full DeepSeek Harness conversations or selected whole turns as clean Markdown for reading, Git and cross-assistant handoff.",
      "Built and packaged as a DSH Web plugin · 2026",
      "Preserves Markdown and Unicode, keeps selective turn handling bounded, and excludes reasoning, tool activity and runtime metadata from exports.",
      "Stack · JavaScript · Node.js · DSH plugin APIs · Markdown",
      "Read case study",
      "Source",
    ],
  },
  {
    title: "MoneyGuard",
    end: "More Engineering Work",
    markers: [
      "Turns a timecard photo into a weekly wage, spending and surplus audit.",
      "Designed and built the end-to-end pipeline · 2026",
      "Keeps ledger calculations local, validates model-generated OCR with Zod, and streams audit prose through separate providers.",
      "Stack · TypeScript · Node.js · Gemini LLM · DeepSeek LLM",
      "Read case study",
      "Source",
    ],
  },
];

for (const project of flagshipEvidenceHierarchy) {
  const start = text.indexOf(project.title);
  const end = text.indexOf(project.end, start);
  assert.ok(start !== -1 && end > start, `Could not isolate homepage project: ${project.title}`);

  const projectText = text.slice(start, end);
  let previousIndex = -1;
  for (const marker of project.markers) {
    const index = projectText.indexOf(marker);
    assert.ok(index !== -1, `${project.title} is missing evidence marker: ${marker}`);
    assert.ok(index > previousIndex, `${project.title} evidence hierarchy is out of order at: ${marker}`);
    previousIndex = index;
  }
}

assert.ok(
  !html.includes('aria-label="Read the Melbourne University Ultimate Club Platform case study"'),
  "Melbourne University Ultimate must not render as a Featured Work card",
);
assert.ok(
  !html.includes('alt="Melbourne University Ultimate Club Platform product screenshot"'),
  "Melbourne University Ultimate must not render a Featured Work image",
);
assert.ok(
  !html.includes('href="/work/melbourne-ultimate/"'),
  "The compact Melbourne University Ultimate listing must link to source, not present as a featured case-study action",
);

// The recruiter path now leads with developer tooling, then AI application
// engineering, then a compact and deliberately subordinate supporting list.
const orderedHomepageMarkers = [
  "DSH Conversation Exporter",
  "MoneyGuard",
  "More Engineering Work",
  "AI Harness",
  "Current work",
  "Melbourne University Ultimate Club Platform",
  "Client Data Delivery Validator",
];

let previousMarkerIndex = -1;
for (const marker of orderedHomepageMarkers) {
  const index = text.indexOf(marker);
  assert.ok(index !== -1, `Missing homepage work-hierarchy marker: ${marker}`);
  assert.ok(
    index > previousMarkerIndex,
    `Homepage work hierarchy is out of order at: ${marker}`,
  );
  previousMarkerIndex = index;
}

const projectSectionStart = html.indexOf('id="projects"');
const projectSectionEnd = html.indexOf('id="experience"');
assert.ok(
  projectSectionStart !== -1 && projectSectionEnd > projectSectionStart,
  "Could not isolate the Selected Work section",
);
const projectSectionHtml = html.slice(projectSectionStart, projectSectionEnd);
assert.equal(
  (projectSectionHtml.match(/<article\b/g) ?? []).length,
  2,
  "Selected Work must render exactly two large Featured Work cards",
);

const supportingStart = projectSectionHtml.indexOf("More Engineering Work");
assert.ok(supportingStart !== -1, "Could not isolate More Engineering Work");
const supportingHtml = projectSectionHtml.slice(supportingStart);
const supportingText = toText(supportingHtml);
assert.equal(
  (supportingHtml.match(/<li\b/g) ?? []).length,
  3,
  "More Engineering Work must render exactly three compact list entries",
);
for (const summary of [
  "GitHub-native AI-assisted engineering workflow built around NEXT → IMPLEMENT → ACCEPT → SHIP, exact PR-head SHA acceptance, deterministic verification and explicit human approval.",
  "Revisited a Next.js/MongoDB application to centralise server-side authorisation and turn authentication and write-path defects into regression tests and CI.",
  "Python/pandas validation workflow for synthetic client-delivery CSV data with structured validation results and 12 pytest regression cases.",
]) {
  assert.ok(supportingText.includes(summary), `Supporting work is missing evidence: ${summary}`);
}
assert.ok(
  !supportingHtml.includes("liuyuelintop/ai-harness"),
  "AI Harness must not expose a source link while its repository is private",
);

for (const removedHomepageWork of [
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

// --- Experience is two roles, stated at evidence strength --------------------

// The Experience section previously carried a third role and a set of metrics
// the career-fact reconstruction does not support. These assertions are the
// regression net: the stale wording cannot come back, and neither can a third
// entry.
const experienceSectionStart = html.indexOf('id="experience"');
const experienceSectionEnd = html.indexOf('id="how-i-build"');
assert.ok(
  experienceSectionStart !== -1 && experienceSectionEnd > experienceSectionStart,
  "Could not isolate the Experience section",
);
const experienceHtml = html.slice(experienceSectionStart, experienceSectionEnd);
const experienceText = toText(experienceHtml);

assert.equal(
  (experienceHtml.match(/<article\b/g) ?? []).length,
  2,
  "Experience must render exactly two roles",
);

// The one performance observation the evidence supports, at its exact strength:
// a single local integration-test response, stated once and nowhere repeated.
const observedLatencySentence =
  "Profiled an inherited points-summary pipeline and parallelised independent service calls, reducing an observed local integration-test response from 26.7s to 5.6s.";
assert.equal(
  text.split(observedLatencySentence).length - 1,
  1,
  "The 26.7s to 5.6s observation must appear exactly once on the homepage",
);

for (const currentRoleEvidence of [
  "Build demonstration applications for prospective clients, including a specialty coffee retailer and a drone training provider, translating informal briefs into working prototypes for business pitches.",
  "Implement authenticated, database-backed prototypes with Next.js 15 App Router, Clerk OAuth and Convex as requirements become clearer.",
]) {
  assert.ok(
    experienceText.includes(currentRoleEvidence),
    `Independent Developer is missing current-role evidence: ${currentRoleEvidence}`,
  );
}

// Employment type and payment status are unevidenced, so no role may render a
// type badge. The Contact form's "Freelance build" option is deliberately
// outside this slice.
for (const badge of ["Freelance", "Full-time", "Commercial Project", "Contract", "Paid"]) {
  assert.ok(
    !experienceText.includes(badge),
    `Experience renders an unevidenced employment-type badge: ${badge}`,
  );
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
  assert.ok(!text.includes(phrase), `Homepage still renders stale Experience wording: ${phrase}`);
}

// --- How I Build describes habits the accepted evidence demonstrates ----------

// The previous principles predated the evidence reconciliation and cited work
// that Experience has since removed. These assertions are scoped to the section
// so that technologies which are accurately attributed elsewhere on the page —
// Bedrock and AWS Lambda in the ALEX study block, for instance — stay legal
// where their context is explained.
const howIBuildStart = html.indexOf('id="how-i-build"');
const howIBuildEnd = html.indexOf('id="contact"');
assert.ok(
  howIBuildStart !== -1 && howIBuildEnd > howIBuildStart,
  "Could not isolate the How I Build section",
);
const howIBuildHtml = html.slice(howIBuildStart, howIBuildEnd);
const howIBuildText = toText(howIBuildHtml);

const requiredHowIBuildContent = [
  // Intro.
  "I make the workflow concrete, measure what is actually happening, and turn fragile assumptions into explicit checks.",
  // The three principles.
  "I start with the workflow, not the feature.",
  "I measure before I optimise.",
  "I turn assumptions into enforceable boundaries.",
  // Evidence, one pair per principle, each traceable to accepted material.
  "Built prospective-client prototypes for a specialty coffee retailer and a drone training provider from informal business briefs.",
  "Built MoneyGuard around a real wage-checking workflow, separating model-assisted extraction from deterministic calculations.",
  "Instrumented ByteCroniX's inherited points-summary path, identified scoring services as the dominant latency contributors, then parallelised independent calls.",
  "Revisited Melbourne Ultimate, traced silent session-role failures to fragmented authentication usage, and centralised session reads behind one database-verified guard.",
  "Schema-validated MoneyGuard OCR output with Zod before deterministic wage calculations consume it.",
  "Turned Melbourne Ultimate authorization and mass-assignment findings into automated regression tests and CI checks.",
  // The four restrained toolbox groups.
  "Product UI",
  "APIs & Data",
  "Auth & Delivery",
  "AI & Validation",
  // Named rather than generic, and traceable: Clerk to the prototype stack in
  // Experience, NextAuth to the Melbourne session guard this section cites.
  "Clerk OAuth",
  "NextAuth",
];

for (const content of requiredHowIBuildContent) {
  assert.ok(
    howIBuildText.includes(content),
    `How I Build is missing required content: ${content}`,
  );
}

assert.equal(
  (howIBuildHtml.match(/<article\b/g) ?? []).length,
  3,
  "How I Build must render exactly three principles",
);
assert.equal(
  (howIBuildHtml.match(/<dt\b/g) ?? []).length,
  4,
  "How I Build must render exactly four toolbox groups",
);

const staleHowIBuildWording = [
  // Principle titles the reconciliation replaced.
  "I translate messy workflows into shipped product.",
  "I reduce risk between feature branch and production.",
  "I build AI workflows with engineering guardrails.",
  // Evidence contradicted by the career-fact reconstruction.
  "Digitised Expresso Carwash spreadsheet workflows",
  "Expresso Carwash",
  "Melbourne clients and local sports clubs",
  "Maintained 4 Node.js microservices",
  "GCP/GKE",
  "GCP GKE",
  "Added Jest and Playwright coverage",
  "Jest",
  "masking, retry/backoff and timestamp throttling",
  // Ownership-oriented cloud wording and course-derived technologies belong to
  // Learning & Contributions, not to a claim about how Yuelin builds.
  "Kubernetes",
  "AWS Lambda",
  "Bedrock",
  "JWT/OAuth",
  // Nothing in the accepted evidence demonstrates these. `pytest` and `Python`
  // would only trace to the course-based ALEX material; `Playwright` survived
  // solely in the unrendered legacy `technologies.js`.
  "pytest",
  "Playwright",
  "Structured Outputs",
  // The one latency observation stays bounded to Experience.
  "26.7s",
  "5.6s",
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

const lowerHowIBuildText = howIBuildText.toLowerCase();
for (const phrase of staleHowIBuildWording) {
  assert.ok(
    !lowerHowIBuildText.includes(phrase.toLowerCase()),
    `How I Build still renders rejected wording: ${phrase}`,
  );
}

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
  "How MoneyGuard splits OCR from reasoning, validates untrusted model output with Zod, and where its data boundary actually sits — with the tradeoffs stated.";
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
  ["alex", "dsh-conversation-exporter", "melbourne-ultimate", "moneyguard"],
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
const melbourneCardStart = supportingText.indexOf("Melbourne University Ultimate Club Platform");
const melbourneCardEnd = supportingText.indexOf("Client Data Delivery Validator");
assert.ok(
  melbourneCardStart !== -1 && melbourneCardEnd > melbourneCardStart,
  "Could not isolate the Melbourne supporting-work listing on the homepage",
);
const melbourneCardText = supportingText.slice(melbourneCardStart, melbourneCardEnd);

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
    "/work/melbourne-ultimate/",
    "/work/moneyguard/",
  ],
  "Sitemap must list exactly the approved routes under /work/",
);

const emittedMedia = await readdir(path.join(outputDirectory, "_next/static/media"));
for (const imageName of ["dsh-conversation-exporter", "moneyguard-ai-finance-pipeline"]) {
  assert.ok(
    emittedMedia.some((file) => file.startsWith(`${imageName}.`) && file.endsWith(".webp")),
    `Bundled project image is missing: ${imageName}`,
  );
}

assert.ok(
  emittedMedia.every((file) => !file.startsWith("melbUniUltimate.")),
  "The Melbourne Ultimate screenshot must no longer be bundled as Featured Work media",
);
assert.ok(
  emittedMedia.every((file) => !file.startsWith("alex-aws-multi-agent-wealth-platform.")),
  "The ALEX flagship screenshot must no longer be bundled into the static export",
);

console.log(
  "Static output verified: the homepage evidence hierarchy and all four case studies render meaningful HTML with correct metadata, source boundaries, stated limitations and public assets.",
);
