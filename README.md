# waypoint

Personal portfolio and checkpoint log.

## Adding a checkpoint

Create a new markdown file in `src/content/checkpoints/` named like
`YYYY-MM-slug.md`:

```md
---
date: 2026-08-01
title: your checkpoint title
kind: highlight   # or: learning
issuer: Harvard   # optional, shown on learning rows
---

A sentence or two about it.
```

`highlight` entries (awards, milestones) appear under **highlights** with their
text shown. `learning` entries (courses, certificates) appear as compact rows
under **learning**, showing the date, title and issuer.

Projects and open source work live in their own sections, so don't add
checkpoints for them.

Commit and push — Vercel redeploys automatically.

## Projects (hidden for now)

The work section is off the page while open source is the focus. The
component is still at `src/components/sections/Work.astro`. To bring it back,
import it in `src/pages/index.astro`, add it to the nav in
`src/components/layout/Header.astro`, and renumber the section indices.

## Merged PR counts

The PR numbers in the hero and the open source section come from GitHub's
search API (`src/lib/github.ts`). They are fetched at build time and then
refreshed live in the visitor's browser (`src/components/PrCounts.astro`).
To add an org, add its repo to `OSS_REPOS` and give it an entry in the open
source section.

Optional: set a `GITHUB_TOKEN` environment variable on Vercel (a fine-grained
token with no extra permissions is enough) so builds aren't rate-limited.
Without it, builds that can't reach GitHub use the last known counts in
`FALLBACK`.

## Local development

```bash
npm install
npm run dev
```

## Deploying

Push this repo to GitHub, then import it on [vercel.com/new](https://vercel.com/new).
Vercel auto-detects Astro — no config needed beyond the included `vercel.json`.
