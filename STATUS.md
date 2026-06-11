---
project: cortivus-web-site
status: active
phase: F01 — The Signal (post-build cosmetics + deploy)
next_step: "Run visual review of The Signal hub and ambient listening pages, then stage and commit all Signal work to main."
blockers: []
key_people:
  - "Troy (visual review checkpoint — required before push to main)"
updated: 2026-06-03
---

## Next Steps

- [ ] Troy: visual + cosmetics review of `/insights/tracker/signal/` and `/insights/tracker/signal/ambient-listening/` *(source: F01-S04-tracker-integration-polish.md)*
- [ ] Stage all Signal work and push to main (Cloudflare Pages auto-deploys) *(source: F01-S04-tracker-integration-polish.md)*
- [ ] NI-07: Extend effects JSON with a `summary` block, update Signal hub to render dynamic stat counts *(source: needs-improvement.md)*
- [ ] NI-01: Extract shared `fetchJSON` into `TrackerRenderer`, update both renderers to call it *(source: needs-improvement.md)*
- [ ] STORY-01: Add notes field to CRM contacts table for contact form message storage *(source: prd-forms-api-part1.md)*

## Notes

F01 (The Signal) is feature-complete and uncommitted. The Signal architecture: tracker promo banner → signal hub (3 cards with 3D tilt) → ambient listening detail page (D3 Florence Nightingale rose chart). Insights nav restructured to a hover dropdown with three children (Hub, Tracker, Signal). Old live site preserved at `v1-pre-signal` tag and `legacy/v1` branch. NI-01 through NI-07 are cleanup items from the `/simplify` pass — non-blocking, tracked in `tasks/needs-improvement.md`.
