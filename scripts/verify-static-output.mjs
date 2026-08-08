import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("out");
const homepagePath = path.join(outputDirectory, "index.html");
// next.config.js sets `trailingSlash: true`, so the case study is emitted as a
// directory index rather than `work/moneyguard.html`.
const caseStudyPath = path.join(outputDirectory, "work", "moneyguard", "index.html");

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
  "What I contributed",
  "A database verification utility.",
  "Corrections to the Planner test harness.",
  "Corrections to the setup guide and documentation.",
  "Documented Nova model and AWS region feedback.",
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
assert.ok(
  html.includes('aria-label="Read more about Melbourne University Ultimate Club Platform"'),
  "Homepage is missing the Melbourne University Ultimate modal trigger",
);
assert.ok(!html.includes('href="/work/alex/"'), "Alex must not receive an empty case-study route");
assert.ok(
  !html.includes('href="/work/melbourne-university-ultimate/"'),
  "Melbourne University Ultimate must not receive an empty case-study route",
);

// --- ALEX is learning evidence, not a flagship -------------------------------

// ALEX belongs to Learning & Contributions, which sits after both flagship
// projects and before Additional Work. It has no modal trigger, no case study
// and no live or source link of its own.
const orderedHomepageMarkers = [
  "MoneyGuard AI Finance Pipeline",
  "Melbourne University Ultimate Club Platform",
  "Learning & Contributions",
  "ALEX — AWS Multi-Agent Architecture Study",
  "What I contributed",
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
  !/aria-label="[^"]*\bALEX\b[^"]*"/i.test(html),
  "ALEX must not expose a modal trigger or link of its own",
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
  ["moneyguard"],
  "Static export must contain exactly the approved MoneyGuard case-study directory",
);

// --- Emitted public assets ---------------------------------------------------

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
  !sitemap.includes("/work/alex/"),
  "Sitemap must not advertise an ALEX case-study route",
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
  "Static output verified: homepage and MoneyGuard case study render meaningful HTML with correct metadata, links, privacy language and public assets.",
);
