# Changelog

## 2026-10-13 (figures)

### Changed
- Gave each lead story its own kind of figure instead of one shared flow component, so each illustration argues what its story argues. Marshal's is the workflow as a document under tracked changes: the chat loop's or the first workflow's steps struck, Marshal's lines added, and "Accept all changes" folds the struck lines away. ByteCroniX's is one request as a trace: it starts as one opaque 26.7s bar, timing logs split it into spans, the scoring services are picked out, the change leaves the total "Not measured yet" until "Measure again" replays it at 5.6s. MoneyGuard's is the report as a receipt: choosing a line traces it back to whoever wrote it and marks where it crosses the model boundary; a misread of 380 hours voids the receipt at the schema check.
- ByteCroniX's story now sits full width, with its headline beside the prose and the trace beneath both.

### Removed
- Removed `FlowFigure` and its payload renderers.

## 2026-10-13

### Changed
- Redesigned the site as "one day on one sheet of paper": a light, editorial palette sampled from Flagstaff Gardens, Newsreader and Schibsted Grotesk, and four acts (Morning, Midday, Golden hour, Late).
- Merged Selected Work, Experience and How I Build into three work chapters. Each chapter is one principle, one lead story with a decision as its headline, one interactive illustration, and compact evidence rows. The three illustrations share one playable flow component: Marshal follows one job from a link to an exported document (and can show the copy-and-paste loop and the five mandatory steps it replaced), ByteCroniX shows four steps of measuring around one change, and MoneyGuard follows one timecard from a phone, out to a vision model, through local checks and calculation, out to an audit model, and back as a report.
- Widened the ByteCroniX story to the role's first-person scope (BFF and REST integrations for web, Android and iOS clients, OpenAI function calling, API testing and delivery workflows) while keeping the one corroborated measurement at its exact strength.
- Added an at-a-glance strip under the hero for a thirty-second read.
- Added a day/night switch (the lamp cord). Day is the default; the choice is stored and applies to the whole site, Contact and case studies included.
- Added Further out: a sideways strip of five places, each one photograph and one line, from the windowsill outwards.
- Restyled the case-study route and the ALEX diagram in the same palette, with the shared masthead.
- Rewrote the homepage contract in `scripts/verify-static-output.mjs` and the recruiter journeys for the new structure, keeping the evidence and over-claim guards.

### Removed
- Removed the dark theme, the project cards and modal, the Experience and How I Build sections, the mobile menu, and the scroll-reveal wrapper.
- Removed AI Harness from the homepage, and the static Marshal and MoneyGuard diagrams the interactive figures replace.

## 2026-06-24

### Removed
- Removed stale `docs/claude-development` files that described legacy Google Drive API resume delivery, GitHub activity integrations, AI assistant/chatbot sections, Lighthouse score claims, and old phase-based development notes.

## 2026-06-20

### Changed
- Repositioned the portfolio around Melbourne full-stack software engineer roles.
- Reworked the hero, recruiter snapshot, working style, experience, skills, projects, contact and SEO copy to match the 2026 resume.
- Replaced self-rated skills, Lighthouse metrics and weak quick-stat cards with evidence-led engineering capability areas.
- Rebuilt projects as three flagship case studies plus compact supporting builds to reduce tutorial/clone dilution.
- Removed stale AI assistant and legacy blog/brand/GitHub/reference sections from the main portfolio flow.

### Removed
- Removed the floating navigation UI that obscured mobile content.
- Removed obsolete Lighthouse score components and animation hook.
