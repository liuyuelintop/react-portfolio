import { expect, test } from "@playwright/test";

const BASE_URL = "http://127.0.0.1:4173";
const CONTACT_EMAIL = "liuyuelintop@gmail.com";

const CORE_ROUTES = [
  { path: "/", marker: "Selected Work", minimumTextLength: 5_000 },
  { path: "/work/moneyguard/", marker: "Privacy boundaries", minimumTextLength: 5_000 },
  { path: "/work/melbourne-ultimate/", marker: "Scope of verification", minimumTextLength: 4_000 },
  { path: "/work/alex/", marker: "Whose project this is", minimumTextLength: 3_000 },
];

const SOURCE_ACTIONS = [
  ["/work/moneyguard/", "https://github.com/liuyuelintop/moneyguard-pipeline"],
  ["/work/melbourne-ultimate/", "https://github.com/liuyuelintop/melb-uni-ultimate"],
  ["/work/alex/", "https://github.com/liuyuelintop/ed-ai-in-production-alex"],
];

const thirdPartyHosts = new Set(["fonts.googleapis.com", "fonts.gstatic.com"]);

const isThirdPartyUrl = (value) => {
  try {
    return thirdPartyHosts.has(new URL(value).hostname);
  } catch {
    return false;
  }
};

const observeOwnedBrowserErrors = (page) => {
  const errors = [];

  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() !== "error") return;

    const locationUrl = message.location().url;
    if (locationUrl && isThirdPartyUrl(locationUrl)) return;
    if ([...thirdPartyHosts].some((host) => message.text().includes(host))) return;

    errors.push(`console: ${message.text()}`);
  });
  page.on("requestfailed", (request) => {
    if (!request.url().startsWith(BASE_URL)) return;
    const failure = request.failure()?.errorText;
    // Next may cancel speculative prefetch HEAD requests when navigation or
    // scrolling changes. The corresponding route has already returned 200;
    // an intentional browser abort is not an application failure.
    if (failure === "net::ERR_ABORTED") return;
    errors.push(`request: ${request.method()} ${request.url()} ${failure}`);
  });
  page.on("response", (response) => {
    if (!response.url().startsWith(BASE_URL) || response.status() < 400) return;
    errors.push(`response: ${response.status()} ${response.url()}`);
  });

  return errors;
};

const waitForHydration = async (page) => {
  await page.locator("body > a", { hasText: "Skip to main content" }).waitFor();
};

test.describe("static export contract", () => {
  for (const route of CORE_ROUTES) {
    test(`${route.path} is meaningful without JavaScript`, async ({ browser }) => {
      const context = await browser.newContext({
        javaScriptEnabled: false,
        viewport: { width: 390, height: 844 },
      });
      const page = await context.newPage();
      const response = await page.goto(route.path, { waitUntil: "domcontentloaded" });

      expect(response?.status()).toBe(200);
      await expect(page.locator("main")).toContainText(route.marker);
      await expect(page.locator("h1")).toHaveCount(1);

      const visibleText = await page.locator("body").innerText();
      expect(visibleText.length).toBeGreaterThan(route.minimumTextLength);

      await context.close();
    });
  }
});

test("desktop and mobile navigation preserve the recruiter path", async ({ page }, testInfo) => {
  const mobile = testInfo.project.name.startsWith("mobile");
  const errors = observeOwnedBrowserErrors(page);
  await page.goto("/");
  await waitForHydration(page);

  for (const [label, hash] of [
    ["Work", "#projects"],
    ["Experience", "#experience"],
    ["How I Build", "#how-i-build"],
    ["Contact", "#contact"],
  ]) {
    if (mobile) {
      await page.getByRole("button", { name: "Toggle navigation menu" }).click();
    }

    await page.getByRole("navigation").getByRole("link", { name: label, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${hash}$`));
  }

  const writing = page.getByRole("navigation").getByRole("link", { name: "Writing", exact: true });
  await expect(writing).toHaveAttribute("href", "https://blog.liuyuelin.dev/");
  await expect(writing).toHaveAttribute("target", "_blank");
  expect(errors).toEqual([]);
});

test("case-study entry, return, resume, and source actions stay usable", async ({ page, request }) => {
  const errors = observeOwnedBrowserErrors(page);
  await page.goto("/");
  await waitForHydration(page);

  await page.getByRole("link", { name: "Read the MoneyGuard AI Finance Pipeline case study" }).click();
  await expect(page).toHaveURL(/\/work\/moneyguard\/$/);
  await page.getByRole("link", { name: "Back to Selected Work" }).first().click();
  await expect(page).toHaveURL(/\/#projects$/);

  const resume = page.getByRole("link", { name: /download.*resume/i });
  await expect(resume).toHaveAttribute("href", "/resume/yuelin-liu-resume.pdf");
  const resumeResponse = await request.get("/resume/yuelin-liu-resume.pdf");
  expect(resumeResponse.status()).toBe(200);
  expect(resumeResponse.headers()["content-type"]).toContain("application/pdf");

  for (const [path, expectedHref] of SOURCE_ACTIONS) {
    await page.goto(path);
    const source = page.locator(`main a[href="${expectedHref}"]`).last();
    await expect(source).toBeVisible();
    await expect(source).toHaveAttribute("target", "_blank");
    await expect(source).toHaveAttribute("rel", /noopener/);
  }

  expect(errors).toEqual([]);
});

test("contact validation blocks bad details and prepares the correct email draft", async ({ page }) => {
  await page.addInitScript(() => {
    window.__portfolioOpenCalls = [];
    window.open = (...args) => {
      window.__portfolioOpenCalls.push(args);
      return null;
    };
  });

  await page.goto("/#contact");
  await waitForHydration(page);
  await page.getByRole("button", { name: "Open email draft" }).click();
  await expect(page.getByText("Name is required")).toBeVisible();
  await expect(page.getByText("Email is required")).toBeVisible();
  await expect(page.getByText("Subject is required")).toBeVisible();
  await expect(page.getByText("Please include at least 20 characters")).toBeVisible();
  expect(await page.evaluate(() => window.__portfolioOpenCalls)).toEqual([]);

  await page.getByRole("textbox", { name: "Your name" }).fill("Dana Recruiter");
  const email = page.getByRole("textbox", { name: "Email address" });
  await email.fill("dana-at-example");
  await page.getByRole("textbox", { name: "Subject" }).fill("Full-stack role");
  await page.getByRole("textbox", { name: "Message" }).fill(
    "I would like to discuss a full-stack software engineering opportunity.",
  );
  await page.getByRole("button", { name: "Open email draft" }).click();
  expect(await email.evaluate((element) => element.validity.typeMismatch)).toBe(true);
  expect(await page.evaluate(() => window.__portfolioOpenCalls)).toEqual([]);

  await email.fill("dana@example.com");
  await page.getByRole("textbox", { name: "Company or team" }).fill("Example Co");
  await page.getByRole("button", { name: "Open email draft" }).click();
  await expect(page.getByRole("heading", { name: "Email draft opened" })).toBeVisible();

  const calls = await page.evaluate(() => window.__portfolioOpenCalls);
  expect(calls).toHaveLength(1);
  expect(calls[0].slice(1)).toEqual(["_blank", "noopener,noreferrer"]);

  const draft = new URL(calls[0][0]);
  expect(draft.protocol).toBe("mailto:");
  expect(draft.pathname).toBe(CONTACT_EMAIL);
  expect(draft.searchParams.get("subject")).toBe("Full-stack role");
  expect(draft.searchParams.get("body")).toContain("Message focus: Full-time role");
  expect(draft.searchParams.get("body")).toContain("Name: Dana Recruiter");
  expect(draft.searchParams.get("body")).toContain("Email: dana@example.com");
  expect(draft.searchParams.get("body")).toContain("Company: Example Co");
});

test("keyboard order and focus indicators cover critical actions", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "Desktop tab order covers the complete rendered action set.");

  for (const route of CORE_ROUTES) {
    await page.goto(route.path);
    if (route.path === "/") await waitForHydration(page);

    const expected = await page.locator(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ).evaluateAll((elements) => elements
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        const style = getComputedStyle(element);
        return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden";
      })
      .map((element, index) => {
        const id = `${index}`;
        element.dataset.journeyTabOrder = id;
        return {
          id,
          label: element.getAttribute("aria-label")
            || element.textContent.trim().replace(/\s+/g, " ")
            || element.getAttribute("placeholder")
            || element.tagName,
        };
      }));

    await page.evaluate(() => {
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      window.scrollTo(0, 0);
    });

    for (const item of expected) {
      await page.keyboard.press("Tab");
      const focused = await page.evaluate(() => {
        const element = document.activeElement;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return {
          id: element.dataset.journeyTabOrder,
          hasIndicator: style.boxShadow !== "none" || style.outlineStyle !== "none",
          left: rect.left,
          right: rect.right,
          viewportWidth: document.documentElement.clientWidth,
        };
      });

      expect(focused.id, `Unexpected tab target near ${item.label} on ${route.path}`).toBe(item.id);
      expect(focused.hasIndicator, `Missing focus indicator on ${item.label} at ${route.path}`).toBe(true);
      expect(focused.left, `Focused action is clipped on ${route.path}`).toBeGreaterThanOrEqual(0);
      expect(focused.right, `Focused action is clipped on ${route.path}`).toBeLessThanOrEqual(
        focused.viewportWidth,
      );
    }
  }
});

test("reduced motion keeps content and actions available", async ({ browser }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "One reduced-motion browser context is sufficient.");
  const context = await browser.newContext({
    reducedMotion: "reduce",
    viewport: { width: 1280, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await waitForHydration(page);
  await page.waitForTimeout(300);

  await expect(page.locator("#hero h1")).toBeVisible();
  await expect(page.locator("#projects h2")).toBeVisible();
  await expect(page.getByRole("link", { name: /download.*resume/i })).toBeVisible();
  const runningAnimations = await page.evaluate(() => document.getAnimations()
    .filter((animation) => animation.playState === "running").length);
  expect(runningAnimations).toBe(0);

  await context.close();
});

test("supported widths have no page-level horizontal overflow", async ({ browser }, testInfo) => {
  test.skip(testInfo.project.name.startsWith("mobile"), "The width matrix runs once across dedicated contexts.");

  for (const width of [390, 768, 1024, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();

    for (const route of CORE_ROUTES) {
      await page.goto(route.path);
      await expect(page.locator("h1")).toBeVisible();
      const dimensions = await page.evaluate(() => ({
        clientWidth: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      expect(dimensions.scrollWidth, `${route.path} overflows at ${width}px`).toBeLessThanOrEqual(
        dimensions.clientWidth,
      );
    }

    await context.close();
  }
});

test("core routes are free of portfolio-owned browser errors", async ({ page }) => {
  const errors = observeOwnedBrowserErrors(page);

  for (const route of CORE_ROUTES) {
    const response = await page.goto(route.path, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
  }

  expect(errors).toEqual([]);
});
