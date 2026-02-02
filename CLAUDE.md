# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for the Cortivus Career Intelligence Platform — an AI-powered career development tool targeting healthcare executives (CMOs, VPs of Medical Affairs). Built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step, no npm dependencies.

## Development Commands

**Start local dev server:**
```
serve.bat
# or directly:
python -m http.server 4000
```
Access at http://localhost:4000

There is no build step, linter, or test suite. Quality assurance is manual via browser.

## Deployment

Hosted on Cloudflare Pages with automatic GitHub-based deployments:
- `main` branch → Production (cortivus.com)
- `dev` branch → Preview deployment

Push to `dev` for preview, merge to `main` for production. No build configuration needed — Cloudflare serves static files directly.

## Architecture

### CSS (Modular, 12 files)

`styles.css` is the entry point — it imports all modules via `@import` in this order:

1. `css/core.css` — CSS variables, reset, base styles. **All design tokens live here** (colors, gradients, spacing).
2. `css/navigation.css` — Fixed header with blur backdrop, dropdown menus
3. `css/hero.css` — Full-width hero sections
4. `css/sections.css` — Content section grids (about, services, contact)
5. `css/components.css` — Buttons (primary/secondary/ghost), cards, forms, modals, carousels
6. `css/platform.css` — Platform overview layout
7. `css/platform-modules.css` — Shared module page styles (feature carousels, featured cards)
8. `css/module-heroes.css` — Per-module hero sections with unique SVG backgrounds
9. `css/homepage.css` — Homepage-specific (problem cards, solution section, platform preview)
10. `css/pricing.css` — Pricing card grid
11. `css/footer.css` — Footer layout and credentials
12. `css/responsive.css` — Mobile breakpoint at 768px (single-column stacking, hamburger nav)

### JavaScript (2 files)

- **`js/components.js`** — `CortivusComponents` object that dynamically injects the shared header and footer into every page via `renderHeader()` and `renderFooter()`. Contains navigation link configuration and active-state highlighting based on current path.
- **`js/main.js`** — All page interactions: mobile nav toggle, dropdown handling, modal open/close (curriculum modal on Tutor page, feedback modal on Recruiter page), and feature carousel logic (prev/next, dot indicators, responsive card count).

### Page Structure

Every page loads `components.js` which injects the header/footer, so those elements are not in the HTML source — they're rendered at runtime.

- **`index.html`** — Homepage: hero → problem section ("The Executive's Paradox") → solution intro → platform module preview → CTA
- **`platform/career-profile/index.html`** — Career Profile module page
- **`platform/tutor/index.html`** — The Tutor module page (has curriculum modal)
- **`platform/recruiter/index.html`** — The Recruiter module page (has feedback modal)
- **`platform/mentor/index.html`** — The Mentor module page
- **`pricing/index.html`** — Pricing tiers
- **`company/team.html`** — Team/About page with founder bio

Module pages follow a consistent pattern: module hero (with SVG background) → feature carousel (2 cards desktop, 1 mobile) → module-specific content → CTA.

### Design System

Dark "executive premium" theme:
- Primary: Cyan `#00f5ff` (highlights, glows)
- Secondary: Blue `#0066ff` (gradients)
- Accent: Hot Pink `#ff006e` (CTAs)
- Background: `#0a0a0a`, Cards: `#111111`
- Font: Segoe UI, sans-serif

## Agent Rules

See `.agent/rules/create-feature.md` for PRD generation guidelines when planning new features. It defines a two-phase process (Clarification → PRD Generation) and a Working Backlog format with story IDs (STORY-XX, TECH-XX, BLOCK-XX).

## Key Conventions

- Header and footer are shared components injected by JS — edit `js/components.js` to change navigation links or footer content, not individual HTML files.
- All color values and design tokens are centralized in `css/core.css` as CSS variables.
- The single responsive breakpoint is 768px, handled in `css/responsive.css`.
- The `archive/` directory contains legacy code (old Azure Functions, old pages) — not part of the live site.
