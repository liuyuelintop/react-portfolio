import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("out");
const homepagePath = path.join(outputDirectory, "index.html");
// next.config.js sets `trailingSlash: true`, so the case study is emitted as a
// directory index rather than `work/moneyguard.html`.
const caseStudyPath = path.join(outputDirectory, "work", "moneyguard", "index.html");
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
  "Melbourne Full-Stack Software Engineer",
  "messy operational workflows into software people can actually use",
  // Selected Work
  "Selected Work",
  "MoneyGuard AI Finance Pipeline",
  "Melbourne University Ultimate Club Platform",
  "Additional Work",
  // ALEX is learning evidence, not owned work: the course attribution, the
  // five-role wording and the attributable contributions must all survive.
  "Learning & Contributions",
  "ALEX — AWS Multi-Agent Architecture Study",
  "Course-based study",
  "Adapted Ed Donner",
  "Udemy ALEX capstone",
  "SQS-backed five-role portfolio-analysis workflow",
  "Terraform-defined AWS architecture",
  // Owner-attested deployment, stated in the past tense with the teardown.
  "Deployed to AWS during the study, then torn down to stop the running cost.",
  "Stack studied:",
  "What I contributed",
  "Added a database-integrity verification step to guide 5.",
  "Fixed the Planner's local test harness, which created a job for a user that did not exist.",
  "Documented the cross-region ECR fix for SageMaker deployments outside us-east-1.",
  "Read the architecture study",
  // Experience
  "ByteCroniX - AI SaaS Platform",
  // How I Build
  "How I Build",
  "I translate messy workflows into shipped product.",
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

// The MoneyGuard card links straight to its case study instead of opening the modal.
assert.match(
  html,
  /<a[^>]+href="\/work\/moneyguard\/"[^>]*>[\s\S]*?Read case study/,
  "Homepage is missing the MoneyGuard 'Read case study' link",
);
assert.ok(
  html.includes('href="https://github.com/liuyuelintop/moneyguard-pipeline"'),
  "Homepage is missing the MoneyGuard public source link",
);
// Melbourne now links to its own case study rather than opening the modal, so
// the previous modal-trigger assertion described a state the card no longer has.
// It is replaced by the stronger pair below, not dropped.
assert.match(
  html,
  /<a[^>]+href="\/work\/melbourne-ultimate\/"[^>]*>[\s\S]*?Read case study/,
  "Homepage is missing the Melbourne University Ultimate 'Read case study' link",
);
assert.ok(
  html.includes('href="https://github.com/liuyuelintop/melb-uni-ultimate"'),
  "Homepage is missing the Melbourne University Ultimate public source link",
);
assert.ok(
  !/aria-label="Read more about[^"]*Melbourne University Ultimate/i.test(html),
  "Melbourne University Ultimate must not expose a modal trigger now that it has a case study",
);
// The deployment was not independently verified in the latest audit, so the card
// links to source and must not advertise a live site.
assert.ok(
  !html.includes("melb-uni-ultimate.vercel.app"),
  "Melbourne University Ultimate must not link to an unverified live deployment",
);
assert.ok(
  html.includes('href="/work/alex/"'),
  "Homepage is missing the link to the ALEX architecture study",
);

// --- ALEX is learning evidence, not a flagship -------------------------------

// ALEX belongs to Learning & Contributions, which sits after both flagship
// projects and before Additional Work. It has no modal trigger and no live
// link; its only outbound link is the study page, which leads with attribution.
const orderedHomepageMarkers = [
  "MoneyGuard AI Finance Pipeline",
  "Melbourne University Ultimate Club Platform",
  "Learning & Contributions",
  "ALEX — AWS Multi-Agent Architecture Study",
  "Stack studied:",
  "What I contributed",
  "Read the architecture study",
  "Additional Work",
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

assert.ok(
  !/aria-label="Read more about[^"]*ALEX/i.test(html),
  "ALEX must not expose a flagship modal trigger",
);

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
  ["alex", "melbourne-ultimate", "moneyguard"],
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
  "Why I revisited it",
  "Finding 01 — route groups hid the real URLs",
  "Finding 02 — valid sessions, missing roles",
  "Structural authorization redesign",
  "Mass-assignment remediation",
  "Findings turned into regression tests and CI",
  "Data model decision",
  "What is verified",
  "What remains unverified",
]) {
  assert.ok(
    melbourneText.includes(heading),
    `Melbourne study is missing the "${heading}" section`,
  );
}

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
const melbourneCardStart = text.indexOf("Melbourne University Ultimate Club Platform");
const melbourneCardEnd = text.indexOf("Learning & Contributions");
assert.ok(
  melbourneCardStart !== -1 && melbourneCardEnd > melbourneCardStart,
  "Could not isolate the Melbourne card on the homepage",
);
const melbourneCardText = text.slice(melbourneCardStart, melbourneCardEnd);

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
    `Melbourne homepage card contains contradicted wording matching ${pattern}`,
  );
  assert.ok(
    !pattern.test(melbourneText),
    `Melbourne case study contains contradicted wording matching ${pattern}`,
  );
}

// The required secondary call to action must not be a casualty of the check above.
assert.ok(
  melbourneCardText.includes("Source"),
  "Melbourne card is missing its Source call to action",
);

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
  ["/work/alex/", "/work/melbourne-ultimate/", "/work/moneyguard/"],
  "Sitemap must list exactly the approved routes under /work/",
);

const emittedMedia = await readdir(path.join(outputDirectory, "_next/static/media"));
for (const imageName of ["moneyguard-ai-finance-pipeline", "melbUniUltimate"]) {
  assert.ok(
    emittedMedia.some((file) => file.startsWith(`${imageName}.`) && file.endsWith(".webp")),
    `Bundled project image is missing: ${imageName}`,
  );
}

assert.ok(
  emittedMedia.every((file) => !file.startsWith("alex-aws-multi-agent-wealth-platform.")),
  "The ALEX flagship screenshot must no longer be bundled into the static export",
);

console.log(
  "Static output verified: the homepage, the MoneyGuard case study, the Melbourne University Ultimate case study and the ALEX architecture study render meaningful HTML with correct metadata, links, attribution, privacy language, stated limitations and public assets.",
);
