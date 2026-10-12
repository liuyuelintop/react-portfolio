import {
  DISPATCH_CASE_STUDY,
  DSH_CASE_STUDY,
  MARSHAL_CASE_STUDY,
  MELBOURNE_CASE_STUDY,
  MONEYGUARD_CASE_STUDY,
  caseStudyHref,
} from "./caseStudies";

// The work is argued in three chapters, one per working principle. Each chapter
// leads with one story (a decision, and a figure the reader can use) and lists
// further evidence under it, so a project or role appears once on the page.
//
// `figure` names a component in components/sections/Work/figures. Every number
// a figure shows must already be supported by the copy beside it.
export const WORK = {
  hour: "Midday. The work.",
  heading: "Work",
  chapters: [
    {
      principle: "I start with the workflow, not the feature.",
      lead: {
        name: MARSHAL_CASE_STUDY.title,
        context:
          "Self-hosted application workspace for laptop and phone. Personal project, 2026, pre-alpha. MIT-licensed, source private while pre-alpha.",
        headline: "The useful change was removing steps.",
        // The first paragraph is the owner's account of the problem. The hosting
        // and privacy sentences follow Marshal's README and SELF_HOSTING guide;
        // the repository is private, so the story must not call it open source.
        paragraphs: [
          "Applying with a chat assistant meant the same loop for every job: paste in a job ad that arrives garbled, paste my prompts, paste my résumé and background, then ask for a fit analysis, a résumé and a cover letter. Marshal keeps the job, my confirmed background and both documents in one workspace, so most of that repetition is gone. It is still being refined.",
          "Its first workflow repeated the mistake in a new form: an assessment, a pursuit decision, a letter plan, an audit or waiver, and acceptance before export. I removed the mandatory chain. A cover letter and a résumé can each be generated directly from the saved job description and permitted background.",
          "Each person runs their own instance: on one machine, with Docker, or on a server reached over a private Tailscale network from a laptop and a phone. Data is plain files and the model key stays on the server. Model calls still send the selected input to the provider you choose.",
        ],
        stack: "TypeScript, React / Vite, Node.js, Docker. Designed and built end to end.",
        links: [
          {
            label: `Read the ${MARSHAL_CASE_STUDY.title} case study`,
            href: caseStudyHref(MARSHAL_CASE_STUDY.slug),
          },
        ],
        figure: "marshal",
        figureCaption: "An illustration of the change, not the product interface.",
      },
      also: [
        {
          title: "Prospective-client demos",
          summary:
            "Demonstration applications for a specialty coffee retailer and a drone training provider, built from informal briefs with Next.js 15 App Router, Clerk OAuth and Convex.",
          meta: "Sep 2025 to present",
        },
      ],
    },
    {
      principle: "I measure before I optimise.",
      lead: {
        name: "ByteCroniX",
        context: "Full-Stack Developer at an early-stage AI SaaS, Mar to Jun 2025.",
        headline: "From 26.7 seconds to 5.6.",
        // Bounded by the owner's evidence register: BFF/REST, function calling and
        // testing/delivery are first-person; the timing observation is corroborated.
        // Service ownership, coverage figures and production results are not claimed.
        paragraphs: [
          "I worked across the BFF routes and REST integrations behind the web, Android and iOS clients, implemented OpenAI function-calling flows in Node.js/Express, and worked across API testing and delivery workflows using Postman, Jest/Supertest, NGINX and multi-service CI/CD.",
          "One inherited path shows how I work. I added timing instrumentation to a points-summary request and identified the current and proposed scoring services as the dominant latency contributors, then parallelised the independent service calls. The observed local integration-test response went from 26.7s to 5.6s.",
        ],
        stack: "Node.js, Express, BFF and REST integrations, OpenAI Function Calling, Postman, Jest/Supertest, NGINX, Docker.",
        links: [],
        figure: "latency",
        figureCaption:
          "Totals are the observed local integration-test responses. Nothing else is measured here.",
      },
      also: [
        {
          title: MELBOURNE_CASE_STUDY.title,
          summary:
            "Traced silent session-role failures to fragmented authentication usage, and centralised session reads behind one database-verified guard.",
          meta: "Case study, not currently maintained",
          href: caseStudyHref(MELBOURNE_CASE_STUDY.slug),
        },
      ],
    },
    {
      principle: "I turn assumptions into enforceable boundaries.",
      lead: {
        name: MONEYGUARD_CASE_STUDY.title,
        context:
          "Wage planning for hourly workers: an OCR and audit pipeline, then a local-first web workspace. Personal project, 2026. Web source private, pipeline public.",
        headline: "Keep the financial answer in code.",
        paragraphs: [
          "MoneyGuard reads a photographed timecard with a vision model, validates what comes back, computes pay, weekly burn and surplus in local code, and streams an AI-written audit into a report the code lays out. A web workspace builds on that pipeline to answer what is left from this week's work, how much work a purchase costs, and whether cash lasts if payday moves.",
          "Model output is treated as untrusted input. Reviewed inputs feed pure calculation functions, and the optional AI path can explain selected figures; it does not calculate the financial result.",
        ],
        stack:
          "TypeScript, Next.js / React, IndexedDB, Zod, Gemini and DeepSeek providers, Vitest / Playwright. Designed and built.",
        links: [
          {
            label: `Read the ${MONEYGUARD_CASE_STUDY.title} case study`,
            href: caseStudyHref(MONEYGUARD_CASE_STUDY.slug),
          },
          { label: "Pipeline source", href: MONEYGUARD_CASE_STUDY.sourceUrl, external: true },
        ],
        figure: "timecard",
        figureCaption:
          "Sample figures are the pipeline's own mock run on a sample ledger. An illustration, not the product interface.",
      },
      also: [
        {
          title: DISPATCH_CASE_STUDY.title,
          summary:
            "Restricted drafting to confirmed, permitted evidence, with validation, bounded repair and failure diagnostics before a generated letter replaces saved work.",
          meta: "Case study",
          href: caseStudyHref(DISPATCH_CASE_STUDY.slug),
        },
        {
          title: DSH_CASE_STUDY.title,
          summary:
            "Exports full conversations as clean Markdown, and excludes reasoning, tool activity and runtime metadata from the export.",
          meta: "Case study",
          href: caseStudyHref(DSH_CASE_STUDY.slug),
          source: DSH_CASE_STUDY.sourceUrl,
        },
        {
          title: "Client Data Delivery Validator",
          summary:
            "Python/pandas validation workflow for synthetic client-delivery CSV data, with structured validation results and 12 pytest regression cases.",
          meta: "Source",
          href: "https://github.com/liuyuelintop/client-data-delivery-validator",
          external: true,
        },
      ],
    },
  ],
};

// Every lead story has the same kind of figure: a rail of steps on two lanes,
// and one card per step showing what is happening and what is being passed on.
// A figure may also carry `scenarios`: other runs the reader can switch to.
// The illustrations restate what the stories and case studies already claim;
// they introduce no new facts.
//
// `lane` is "top" or "bottom"; `tone` draws the station ("outline", "solid" or
// "dashed"); `payload.kind` names a renderer in figures/FlowFigure.jsx.
export const FLOW_CONTROLS = {
  play: "Play the flow",
  pause: "Pause",
  replay: "Replay",
  back: "Back",
  next: "Next",
};

export const WORK_FIGURES = {
  // Traced to the Marshal case study (workflow, decisions and simplification
  // sections), which is itself traced in docs/MARSHAL_CASE_STUDY_EVIDENCE.md.
  marshal: {
    title: "One job, from a link to a document",
    how: "Dashed steps are a model. Solid steps are code. Outlined steps are you.",
    lanes: { top: "A model", bottom: "You and the workspace" },
    steps: [
      {
        id: "capture",
        lane: "bottom",
        tone: "outline",
        actor: "You",
        name: "Bring in the job",
        text: "A supported SEEK or LinkedIn link is fetched into an editable preview, or the description is pasted. Capture it on a phone, finish at a desk.",
        payload: { kind: "chain", items: ["Supported link or pasted text", "Reviewed job description"] },
      },
      {
        id: "filter",
        lane: "bottom",
        tone: "solid",
        actor: "Code",
        name: "Filter the background",
        text: "Before a prompt is assembled, the server removes unconfirmed, expired and out-of-scope claims.",
        payload: {
          kind: "split",
          kept: { label: "Reaches the model", items: ["Confirmed, permitted evidence"] },
          dropped: { label: "Removed first", items: ["Unconfirmed", "Expired", "Out of scope"] },
        },
      },
      {
        id: "generate",
        lane: "top",
        tone: "dashed",
        actor: "Model",
        name: "Generate either document",
        text: "A cover letter and a résumé are each generated on their own, straight from the saved job and that background. A failed run does not erase the other document.",
        payload: {
          kind: "rows",
          rows: [
            { label: "Cover letter", value: "Its own editor and generation" },
            { label: "Résumé", value: "Its own editor and generation" },
          ],
        },
      },
      {
        id: "check",
        lane: "bottom",
        tone: "solid",
        actor: "Code",
        name: "Check the reply",
        text: "Generated text is checked for supported references and numeric quantities. These checks catch bounded errors, not semantic truth.",
        payload: {
          kind: "rows",
          rows: [
            { label: "Checked in code", value: "Supported references, numeric quantities" },
            { label: "Left to the reader", value: "Whether the writing is true" },
          ],
        },
      },
      {
        id: "edit",
        lane: "bottom",
        tone: "outline",
        actor: "You",
        name: "Edit, on any device",
        text: "Edits autosave as revisions. The server rejects a stale one and keeps the last 20, so a phone and a laptop cannot silently overwrite each other.",
        payload: {
          kind: "rows",
          rows: [
            { label: "Newer save", value: "Accepted, written atomically" },
            { label: "Stale save", value: "Rejected, working copy kept" },
          ],
        },
      },
      {
        id: "export",
        lane: "bottom",
        tone: "solid",
        actor: "Code",
        name: "Review and export",
        text: "You read the current text. Export rechecks permissions and document guards, then copies the text or renders an A4 PDF. No AI acceptance step is required.",
        payload: { kind: "chain", items: ["Your review", "Guarded export", "Manual submission"] },
      },
    ],
    scenarios: [
      // What applying looked like before the product: the owner's own account.
      {
        label: "Before: copy and paste",
        title: "The same job, by copy and paste",
        how: "Dashed steps happen in a chat window. Outlined steps are you.",
        focus: "copy",
        lanes: { top: "A chat window", bottom: "You, by hand" },
        steps: [
          {
            id: "copy",
            lane: "bottom",
            tone: "outline",
            actor: "You",
            name: "Copy the job ad",
            text: "Select the whole ad on the job board and copy it.",
            payload: { kind: "pips", count: 6, at: 1, label: "Manual step 1 of 6, for every job" },
          },
          {
            id: "paste-ad",
            lane: "top",
            tone: "dashed",
            actor: "Chat",
            name: "Paste it in",
            text: "It often arrives garbled.",
            payload: { kind: "pips", count: 6, at: 2, label: "Manual step 2 of 6, for every job" },
          },
          {
            id: "paste-prompt",
            lane: "top",
            tone: "dashed",
            actor: "Chat",
            name: "Paste the prompt",
            text: "The same instructions, found and pasted again.",
            payload: { kind: "pips", count: 6, at: 3, label: "Manual step 3 of 6, for every job" },
          },
          {
            id: "paste-self",
            lane: "top",
            tone: "dashed",
            actor: "Chat",
            name: "Paste yourself",
            text: "Résumé and background, pasted in again for every job.",
            payload: { kind: "pips", count: 6, at: 4, label: "Manual step 4 of 6, for every job" },
          },
          {
            id: "ask",
            lane: "top",
            tone: "dashed",
            actor: "Chat",
            name: "Ask three times",
            text: "For a fit analysis, then a résumé, then a cover letter.",
            payload: { kind: "pips", count: 6, at: 5, label: "Manual step 5 of 6, for every job" },
          },
          {
            id: "copy-out",
            lane: "bottom",
            tone: "outline",
            actor: "You",
            name: "Copy the answers out",
            text: "Into documents, by hand, then read them for work you never did.",
            payload: { kind: "pips", count: 6, at: 6, label: "Manual step 6 of 6, for every job" },
          },
          {
            id: "again",
            lane: "bottom",
            tone: "outline",
            actor: "You",
            name: "Next job",
            text: "Start again from the first step. Marshal keeps the job, the background and the documents, so most of this is gone.",
            payload: { kind: "chain", items: ["Next job", "Step 1 again"] },
          },
        ],
      },
      // The workflow Marshal itself replaced: five mandatory steps before export.
      {
        label: "Before: the first workflow",
        title: "The same job, through five mandatory steps",
        how: "Dashed steps had to happen before export was allowed.",
        focus: "assessment",
        lanes: { top: "Mandatory before export", bottom: "The task" },
        steps: [
          {
            id: "saved",
            lane: "bottom",
            tone: "outline",
            actor: "You",
            name: "Saved job",
            text: "The first workflow started in the same place: a saved job description.",
            payload: { kind: "pips", count: 5, at: 0, label: "Five mandatory steps before export" },
          },
          {
            id: "assessment",
            lane: "top",
            tone: "dashed",
            actor: "Gate",
            name: "Assessment",
            text: "It began with a mandatory AI assessment of the job.",
            payload: { kind: "pips", count: 5, at: 1, label: "Mandatory step 1 of 5" },
          },
          {
            id: "pursuit",
            lane: "top",
            tone: "dashed",
            actor: "Gate",
            name: "Pursuit decision",
            text: "Then a pursuit decision, before any writing.",
            payload: { kind: "pips", count: 5, at: 2, label: "Mandatory step 2 of 5" },
          },
          {
            id: "plan",
            lane: "top",
            tone: "dashed",
            actor: "Gate",
            name: "Letter plan",
            text: "Then a letter plan, before the letter itself.",
            payload: { kind: "pips", count: 5, at: 3, label: "Mandatory step 3 of 5" },
          },
          {
            id: "audit",
            lane: "top",
            tone: "dashed",
            actor: "Gate",
            name: "Audit or waiver",
            text: "The draft then needed a model audit, or an explicit waiver.",
            payload: { kind: "pips", count: 5, at: 4, label: "Mandatory step 4 of 5" },
          },
          {
            id: "acceptance",
            lane: "top",
            tone: "dashed",
            actor: "Gate",
            name: "Acceptance",
            text: "And acceptance, before export was allowed.",
            payload: { kind: "pips", count: 5, at: 5, label: "Mandatory step 5 of 5" },
          },
          {
            id: "first-export",
            lane: "bottom",
            tone: "solid",
            actor: "Code",
            name: "Export",
            text: "All five had to happen before a document could be exported. That put the application's process ahead of the task, so I removed the chain.",
            payload: { kind: "chain", items: ["Saved job", "Five mandatory steps", "Export"] },
          },
        ],
      },
    ],
  },

  // Bounded by the owner's evidence register (ByteCroniX claim register and the
  // 3 August 2026 addendum): instrumentation, the dominant scoring services,
  // Promise.all parallelisation and the 26.7s to 5.6s local observation are
  // corroborated first-person; the BFF/REST, function-calling and
  // testing/delivery context is first-person. Nothing here claims service
  // ownership, coverage, merge, deployment or a production result.
  latency: {
    title: "Measure first, then change one layer",
    how: "Solid steps measure. The dashed step changes code.",
    lanes: { top: "Change", bottom: "Measure" },
    steps: [
      {
        id: "system",
        lane: "bottom",
        tone: "outline",
        actor: "Context",
        name: "The system",
        text: "A Node.js/Express backend behind web, Android and iOS clients. I worked across its BFF routes and REST integrations, on OpenAI function-calling flows, and in its API testing and delivery workflows.",
        payload: {
          kind: "rows",
          rows: [
            { label: "Clients", value: "Web, Android, iOS" },
            { label: "Worked in", value: "BFF routes, REST integrations, OpenAI function calling" },
            { label: "With", value: "Postman, Jest/Supertest, NGINX, multi-service CI/CD" },
          ],
        },
      },
      {
        id: "inherit",
        lane: "bottom",
        tone: "solid",
        actor: "Measure",
        name: "An inherited path",
        text: "One request I had not written, the points summary, answered slowly in local integration tests. I measured it before touching it.",
        payload: { kind: "rows", rows: [{ label: "Observed", value: "26.7s for one response" }] },
      },
      {
        id: "instrument",
        lane: "bottom",
        tone: "solid",
        actor: "Measure",
        name: "Add timing logs",
        text: "Timing logs separated orchestration, mapping and downstream service time.",
        payload: { kind: "chain", separator: "+", items: ["Orchestration", "Mapping", "Downstream services"] },
      },
      {
        id: "find",
        lane: "bottom",
        tone: "solid",
        actor: "Measure",
        name: "Find where the time goes",
        text: "The logs showed that the current and proposed scoring services dominated the wait.",
        payload: {
          kind: "rows",
          rows: [
            { label: "Current scoring service", value: "Dominant" },
            { label: "Proposed scoring service", value: "Dominant" },
          ],
        },
      },
      {
        id: "change",
        lane: "top",
        tone: "dashed",
        actor: "Change",
        name: "Parallelise the independent calls",
        text: "I changed the smallest layer that explained the problem: independent calls were started together with Promise.all, at the orchestration layer and inside the two scoring services.",
        payload: {
          kind: "rows",
          rows: [
            { label: "Before", value: "One call after another" },
            { label: "After", value: "Independent calls started together" },
          ],
        },
      },
      {
        id: "remeasure",
        lane: "bottom",
        tone: "solid",
        actor: "Measure",
        name: "Measure again",
        text: "The same request in the same local Postman and Docker setup. An observed result, not a production benchmark.",
        payload: {
          kind: "bars",
          note: "Replayed at six times speed.",
          speed: 6,
          lanes: [
            { label: "Before, as inherited", seconds: 26.7 },
            { label: "After, with independent calls parallelised", seconds: 5.6, accent: true },
          ],
        },
      },
    ],
  },

  // One timecard followed through the public pipeline. Traced to
  // liuyuelintop/moneyguard-pipeline: the Telegram adapter in examples/telegram,
  // VisionResultSchema in src/schemas.ts (`z.coerce.number().positive().max(168)`),
  // the early return in src/pipeline.ts when safeParse fails, buildAuditPayload,
  // and the mock-run report quoted in the case study.
  timecard: {
    title: "One timecard, from a phone to a report",
    how: "Dashed steps are a model. Solid steps are code. Outlined steps are you.",
    lanes: { top: "Model providers", bottom: "Your phone and local code" },
    steps: [
      {
        id: "photo",
        lane: "bottom",
        tone: "outline",
        actor: "You",
        name: "Photo arrives",
        text: "A photo of the week's timecard is sent from a phone, through a Telegram bot or the CLI, to the machine that runs the pipeline.",
        payload: { kind: "timecard", file: "timecard.jpg", label: "Running total", value: "38" },
      },
      {
        id: "ocr",
        lane: "top",
        tone: "dashed",
        actor: "Model",
        name: "Vision OCR",
        text: "The image and a fixed prompt go to a vision model, with bounded retries. What comes back is model output, so it is not trusted yet.",
        payload: { kind: "code", lines: ['{ totalHours: 38, period: "2026-W26" }'] },
      },
      {
        id: "check",
        lane: "bottom",
        tone: "solid",
        actor: "Code",
        name: "Schema check",
        text: "A schema coerces a stringified number and refuses hours that no week can hold. A reading that fails stops here.",
        payload: {
          kind: "verdict",
          code: "totalHours: 38",
          rule: "Must be a number, above 0 and at most 168.",
          result: "Accepted.",
        },
      },
      {
        id: "calc",
        lane: "bottom",
        tone: "solid",
        actor: "Code",
        name: "Calculation",
        text: "A pure function turns the hours and a local ledger into gross pay, weekly burn and surplus, then classifies the week. No model takes part.",
        payload: {
          kind: "metrics",
          items: [
            { label: "Gross", value: "$950.00" },
            { label: "Burn", value: "$552.38" },
            { label: "Surplus", value: "$397.62" },
            { label: "Week", value: "STABLE" },
          ],
        },
      },
      {
        id: "payload",
        lane: "bottom",
        tone: "solid",
        actor: "Code",
        name: "Minimised payload",
        text: "The audit payload is composed from the metrics, the hours and the pay period. Ledger line items are not part of it.",
        payload: {
          kind: "split",
          kept: { label: "In the payload", items: ["Metrics", "Hours", "Pay period"] },
          dropped: { label: "Left out", items: ["Ledger line items", "Raw role string"] },
        },
      },
      {
        id: "audit",
        lane: "top",
        tone: "dashed",
        actor: "Model",
        name: "Audit model",
        text: "A second model receives that payload and streams back prose. It explains the figures; it never produces one.",
        payload: { kind: "stream", label: "Prose, streamed token by token" },
      },
      {
        id: "report",
        lane: "bottom",
        tone: "outline",
        actor: "You",
        name: "Report returns",
        text: "The code lays out the report and fills in every number. The model's prose streams into its place, and the report returns through the same transport.",
        payload: {
          kind: "report",
          lines: [
            "Wage Audit (2026-W26)",
            "Labor: 38 hrs",
            "Gross: $950.00 AUD",
            "Burn: $552.38 AUD",
            "Surplus: $397.62 AUD | STABLE",
          ],
          prose: "Audit: the model's prose",
        },
      },
    ],
    // A reading the schema rejects goes no further than the check.
    scenarios: [
      {
        label: "Misread the hours as 380",
        focus: "check",
        stopAt: "check",
        overrides: {
          ocr: { kind: "code", lines: ['{ totalHours: 380, period: "2026-W26" }'] },
          check: {
            kind: "verdict",
            bad: true,
            code: "totalHours: 380",
            rule: "Must be a number, above 0 and at most 168.",
            result: "Rejected: no week has 380 hours. The sender is asked for a clearer photo, and nothing further runs.",
          },
        },
      },
    ],
  },
};
