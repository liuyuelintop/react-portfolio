import assert from "node:assert/strict";
import { access, readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const outputDirectory = path.resolve("out");
const homepagePath = path.join(outputDirectory, "index.html");

const html = await readFile(homepagePath, "utf8");
const text = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
  .replace(/<[^>]+>/g, " ")
  .replace(/&(?:#x27|#39|apos);/gi, "'")
  .replace(/&quot;/gi, '"')
  .replace(/&amp;/gi, "&")
  .replace(/\s+/g, " ")
  .trim();

const requiredContent = [
  "Melbourne Full-Stack Software Engineer",
  "Yuelin Liu",
  "turns messy operational workflows into usable React/Node products",
  "ByteCroniX - AI SaaS Platform",
  "MoneyGuard AI Finance Pipeline",
];

for (const content of requiredContent) {
  assert.ok(text.includes(content), `Missing rendered homepage content: ${content}`);
}

const requiredLinks = [
  'href="#hero"',
  'href="#work-style"',
  'href="#experience"',
  'href="#skills"',
  'href="#projects"',
  'href="https://blog.liuyuelin.dev/"',
  'href="#contact"',
];

for (const link of requiredLinks) {
  assert.ok(html.includes(link), `Missing rendered navigation link: ${link}`);
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

const emittedMedia = await readdir(path.join(outputDirectory, "_next/static/media"));
for (const imageName of [
  "moneyguard-ai-finance-pipeline",
  "alex-aws-multi-agent-wealth-platform",
  "melbUniUltimate",
]) {
  assert.ok(
    emittedMedia.some((file) => file.startsWith(`${imageName}.`) && file.endsWith(".webp")),
    `Bundled project image is missing: ${imageName}`,
  );
}

console.log("Static output verified: meaningful HTML, metadata, navigation, and public assets are present.");
