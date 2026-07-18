# waypoint

Personal portfolio and checkpoint log.

## Adding a checkpoint

Create a new markdown file in `src/content/checkpoints/` named like
`YYYY-MM-slug.md`:

```md
---
date: 2026-08-01
title: your checkpoint title
---

A sentence or two about it.
```

Commit and push — Vercel redeploys automatically.

## Adding a project

Edit the `projects` array in `src/components/Work.astro`.

## Local development

```bash
npm install
npm run dev
```

## Deploying

Push this repo to GitHub, then import it on [vercel.com/new](https://vercel.com/new).
Vercel auto-detects Astro — no config needed beyond the included `vercel.json`.
