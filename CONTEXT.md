---
project: cortivus-web-site
updated: 2026-06-03
description: "Static marketing and intelligence-hub site for Cortivus — a clinical AI safety platform targeting hospital leaders — deployed on Cloudflare Pages."
path: /Users/hackstert/Projects/web-sites/Cortivus-Web-Site/CONTEXT.md
---

## Overview

Cortivus is a clinical AI safety platform for hospitals. This repository is the public marketing and intelligence-hub site at cortivus.com. The site has two primary jobs: (1) market the Cortivus career intelligence platform to healthcare executives (CMOs, VPs of Medical Affairs) through the platform module pages, and (2) serve the Cortivus AI Safety Hub — a public-facing intelligence resource that includes a live tracker of clinical AI case law and regulatory activity, "The Signal" (evidence pattern visualizations from peer-reviewed literature via the Cure8 evidence registry), and practice briefings. Built with vanilla HTML/CSS/JS, no framework, no build step.

## Architecture

### Deployment
- Cloudflare Pages — `main` branch → production (cortivus.com), `dev` branch → preview URL
- No build step. Cloudflare serves static files directly.
- Local dev: `python -m http.server 4000`

### CSS — 12 modular files, `styles.css` as entry point
- `css/core.css` — CSS variables and design tokens (all colors, gradients here)
- `css/navigation.css` — Fixed header, hover dropdown menus, mobile hamburger
- `css/hero.css` — Full-width hero sections
- `css/sections.css` — Content grids (about, services, contact)
- `css/components.css` — Buttons (primary/secondary/ghost), cards, forms, modals, carousels
- `css/platform.css` — Platform overview layout
- `css/platform-modules.css` — Shared module page styles (feature carousels, featured cards)
- `css/module-heroes.css` — Per-module hero sections with unique SVG backgrounds
- `css/homepage.css` — Homepage-specific (problem cards, solution section, platform preview)
- `css/pricing.css` — Pricing card grid
- `css/footer.css` — Footer layout
- `css/responsive.css` — Mobile breakpoint at 768px

### JavaScript
- `js/components.js` — `CortivusComponents` IIFE. Injects shared header and footer into every page via `renderHeader()` / `renderFooter()`. Owns navigation configuration including the Insights dropdown (children array with Insights Hub, The Tracker, The Signal). Active-state highlighting uses most-specific-wins prefix matching.
- `js/main.js` — Mobile nav toggle, dropdown mobile handling, modal open/close (curriculum modal on Tutor, feedback modal on Recruiter), feature carousel logic.

### Insights Hub — three-level hierarchy
- `insights/index.html` — Hub page. Loads latest tracker items via `TrackerRenderer.loadAllTopics`. Three hero CTAs: The Tracker, The Signal, Briefings.
- `insights/tracker/index.html` — Live tracker. Topics loaded from `insights/tracker/data/index.json`. Signal promo banner links to `/insights/tracker/signal/`.
- `insights/tracker/signal/index.html` — The Signal hub. Three cards: Ambient Listening (live, 3D tilt hover), + 2 coming-soon placeholders.
- `insights/tracker/signal/ambient-listening/index.html` — Full D3 visualization page. Florence Nightingale rose charts (polar stacked radial) showing failure and success modes.
- `insights/tracker/renderer.js` — `TrackerRenderer` module for loading and rendering tracker JSON data.
- `insights/tracker/effects-renderer.js` — `EffectsRenderer` module for D3 rose chart. Injects its own `.effects-card*` CSS on first call. Loads data from `insights/tracker/data/effects/ambient-listening.json`.
- `insights/tracker/data/` — Static JSON data. `index.json` is the tracker manifest. `effects/ambient-listening.json` is the Cure8 seed data (mirrors DB schema for drop-in API swap). Both are agent read-only per `AGENT_CONTRACT.md`.

### Page structure
- Every page: `components.js` injects header/footer at runtime; `main.js` handles interactions.
- Platform module pages: `platform/{career-profile,tutor,recruiter,mentor}/`
- Briefings: `insights/briefings/`, individual papers at `insights/{slug}/`
- Static JSON at `insights/tracker/data/` — not served by an API; will be swapped to Cure8 API when ready.

### Design tokens (all in `css/core.css`)
- Primary: `#00f5ff` (cyan highlights, glows)
- Secondary: `#0066ff` (gradients)
- Accent: `#ff006e` (CTAs)
- Background: `#0a0a0a`, Cards: `#111111`

## Key Conventions

- Header and footer live only in `js/components.js`. Never add them to individual HTML files.
- All color and spacing tokens live in `css/core.css` as CSS variables. Never hardcode color values in page CSS.
- Single responsive breakpoint: 768px, handled exclusively in `css/responsive.css`.
- Insights hub dropdown in nav: defined in `navLinks` array in `components.js` as `children` array. Active state uses longest-prefix-wins across children.
- Signal visualization JS follows IIFE pattern (`const EffectsRenderer = (function() { ... })()`). No ES modules. D3 and effects-renderer loaded with `defer` in `<head>` — script order governs execution order.
- rAF gating on mousemove handlers: use `requestAnimationFrame` + a `rafPending` flag — never write styles directly in mousemove.
- `tasks/needs-improvement.md` is the running backlog of deferred cleanup items from `/simplify` passes (NI-01 through NI-07 currently open).
- `archive/` — legacy code (old Azure Functions, old pages). Not part of live site. Do not edit.

## Dependencies

- **D3 v7** — CDN (`cdn.jsdelivr.net/npm/d3@7.9.0`) with SRI integrity hash. Used only on `insights/tracker/signal/ambient-listening/` for the rose chart.
- **Font Awesome 6.4** — CDN (`cdnjs.cloudflare.com`). Icons throughout the site.
- **Cloudflare Pages** — Hosting and CDN. Automatic deploys from GitHub.
- **Cure8** — Cortivus's internal structured evidence registry. Currently provides seed JSON at `insights/tracker/data/effects/ambient-listening.json`. Future: live API will replace static JSON (schema is forward-compatible).
- **Supabase / DigitalOcean Postgres** — Backend for the app (cortivus.com/app). Not used by this static site directly.
- **GitHub** — Source hosting and deployment trigger. `legacy/v1` branch and `v1-pre-signal` tag preserve the pre-Signal version of the site.

## Active Work

- **F01 Effects Analysis Visualization** (`tasks/F01-effects-analysis-visualization.md`, status: in-progress) — The Signal feature. All four stories built (data schema, design decisions, D3 visualization component, Signal architecture with hub + detail page). Awaiting visual/cosmetics review pass before committing to `main`.
- **The Signal cosmetics pass** — Next immediate task. Review `http://localhost:4000/insights/tracker/signal/` and `http://localhost:4000/insights/tracker/signal/ambient-listening/` for visual polish, spacing, and responsive behavior.
- **NI backlog** (`tasks/needs-improvement.md`) — Seven open items from the `/simplify` pass: shared `fetchJSON`, shared `escapeHtml`, month abbreviation decision, gradient-text consolidation, SVG grid background consolidation, coming-soon card HTML deduplication, and dynamic stat counts on the Signal hub card (NI-07 requires schema extension).
- **Forms API** (`tasks/prd-forms-api-part1.md`, `tasks/prd-forms-api-part2.md`) — Contact form and PDF download backend. Deferred; not active this sprint.
