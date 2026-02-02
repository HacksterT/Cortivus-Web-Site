# PRD: Cloudflare Pages Migration

**Version**: 1.0 | **Date**: February 1, 2026 | **Author**: HacksterT

> **Status**: PLANNING

---

## Overview

Migrate the Cortivus marketing website (cortivus.com) from GitHub Pages to Cloudflare Pages. The site is a static vanilla HTML/CSS/JS site with no build step. Cloudflare already manages DNS for cortivus.com, so this consolidates hosting and DNS under one provider, adds preview deployments for the `dev` branch, and positions the site for future Cloudflare Workers integration (form handling, lead magnets) without changing any existing functionality.

**Problem Solved**: The marketing site currently deploys to GitHub Pages via a CNAME file and relies on Cloudflare DNS proxying to GitHub's servers. This adds an unnecessary indirection layer and prevents use of Cloudflare-native features (preview deploys, Workers, R2 storage). With the application moving to DigitalOcean (`app.cortivus.com`), consolidating the marketing site on Cloudflare creates a clean split: Cloudflare owns the marketing domain, DigitalOcean owns the app subdomain.

**Scope**: Infrastructure migration only. No content changes, no form changes (Formspree stays), no lead magnet work. The site should look and behave identically after migration.

---

## Working Backlog

### Feature: Cloudflare Pages Migration

#### Phase 1: Deploy and Verify

- [ ] **STORY-01**: As a developer, I want the Cortivus website deployed on Cloudflare Pages so that I can verify it works before cutting over DNS
  - **Priority**: Must-Have
  - **Acceptance Criteria**: (verified at Manual Testing checkpoint)
    - [ ] Cloudflare Pages project exists and is connected to the GitHub repository
    - [ ] Production deploys trigger automatically on push to `main`
    - [ ] Preview deploys trigger automatically on push to `dev` (or any non-main branch)
    - [ ] All pages load correctly on the `*.pages.dev` URL: homepage, pricing, team, and all 4 platform module pages
    - [ ] Formspree contact form on the homepage submits successfully from the `*.pages.dev` domain
    - [ ] Images, fonts (FontAwesome CDN), and JavaScript (header/footer injection, mobile nav, carousel) all work
    - [ ] No mixed content warnings or broken resource references
  - **Tasks**:
    - [ ] Infrastructure: Create Cloudflare Pages project in Cloudflare dashboard — connect to `HacksterT/Cortivus-Web-Site` GitHub repo; set production branch to `main`; set build command to empty (no build step); set output directory to `/` (root)
    - [ ] Infrastructure: Enable preview deployments — configure to build on all non-production branches; verify `dev` branch triggers a preview deploy with a unique URL
    - [ ] Cleanup: Remove `CNAME` file from the repository — this is a GitHub Pages artifact that is not needed on Cloudflare Pages and can interfere with custom domain configuration
    - [ ] Verification: Test all pages on the `*.pages.dev` URL — homepage (`/`), pricing (`/pricing/`), team (`/company/team.html`), career-profile (`/platform/career-profile/`), tutor (`/platform/tutor/`), recruiter (`/platform/recruiter/`), mentor (`/platform/mentor/`)
    - [ ] Verification: Test contact form submission (Formspree) from the `*.pages.dev` URL; test mobile navigation toggle; test feature carousel on homepage; test all navigation dropdown links
    - [ ] Local Testing: Compare `*.pages.dev` site against current cortivus.com page-by-page to confirm visual and functional parity
    - [ ] Manual Testing: CHECKPOINT — Notify user to verify the `*.pages.dev` deployment matches current production
    - [ ] Git: Commit CNAME removal to `dev`, merge to `main`, verify Cloudflare Pages auto-deploys
  - **Technical Notes**:
    - Cloudflare Pages serves `index.html` files for clean URLs automatically (e.g., `/pricing/` serves `/pricing/index.html`), matching GitHub Pages behavior
    - The `form.html` legacy page (curriculum generator with n8n widget) should also be verified but is low priority — it may be archived later
    - The `archive/` directory will be deployed but is not linked from navigation — no action needed
    - FontAwesome is loaded via CDN, not local files, so no asset path issues expected
    - No environment variables or build secrets are needed — this is a fully static site
  - **Blockers**: None

#### Phase 2: DNS Cutover

- [ ] **STORY-02**: As a business owner, I want cortivus.com to serve from Cloudflare Pages so that the migration is complete and GitHub Pages can be decommissioned
  - **Priority**: Must-Have
  - **Acceptance Criteria**: (verified at Manual Testing checkpoint)
    - [ ] `cortivus.com` and `www.cortivus.com` resolve to the Cloudflare Pages deployment
    - [ ] HTTPS works with a valid SSL certificate (no warnings)
    - [ ] All pages load correctly via `cortivus.com` (same verification as STORY-01)
    - [ ] Formspree contact form submits successfully from `cortivus.com`
    - [ ] GitHub Pages is disabled in the repository settings
    - [ ] README.md reflects the new Cloudflare Pages hosting and deployment workflow
    - [ ] No downtime or broken links during cutover
  - **Tasks**:
    - [ ] Infrastructure: Add `cortivus.com` as a custom domain in the Cloudflare Pages project settings; Cloudflare will automatically configure DNS records since it already manages the zone
    - [ ] Infrastructure: Add `www.cortivus.com` as a custom domain and configure redirect to `cortivus.com` (apex domain is primary)
    - [ ] Infrastructure: Verify SSL certificate is provisioned for the custom domain — Cloudflare Pages handles this automatically; confirm no mixed content warnings
    - [ ] Infrastructure: Disable GitHub Pages in GitHub repository settings (Settings > Pages > Source: None); remove any GitHub Pages-specific configuration
    - [ ] Docs: Update `README.md` — change hosting references from "GitHub Pages" to "Cloudflare Pages"; update deployment workflow section to note that push to `main` triggers Cloudflare Pages deploy; add note about preview deployments for `dev` branch; remove `CNAME` from project structure listing
    - [ ] Verification: Test all pages via `cortivus.com` — same page list as STORY-01; test form submission; test on mobile; test that old links and bookmarks still work
    - [ ] Manual Testing: CHECKPOINT — Notify user to verify cortivus.com is fully functional on Cloudflare Pages, confirm GitHub Pages is disabled
    - [ ] Git: Commit README changes to `dev`, merge to `main`
  - **Technical Notes**:
    - Since Cloudflare already manages DNS for cortivus.com, adding the custom domain in Cloudflare Pages should auto-configure the DNS records. No manual DNS record editing should be needed, but verify the A/CNAME records are updated.
    - The old GitHub Pages DNS configuration (CNAME pointing to `hackstert.github.io` or similar, plus GitHub's A records) should be replaced automatically. Verify the old records are removed.
    - SSL is handled by Cloudflare automatically — no certbot or manual certificate management needed
    - Coordinate timing: do the cutover during low-traffic hours. The DNS change should be nearly instant since Cloudflare manages the zone directly.
    - If `app.cortivus.com` DNS is being configured simultaneously (for the DigitalOcean migration), ensure the A record for `app` is added separately and does not conflict with the Pages configuration for the apex domain.
  - **Blockers**: STORY-01 (must verify the Pages deployment works before cutting over DNS)

---

## Non-Goals

- **Content changes**: No page additions, edits, or redesigns. The site should be identical after migration.
- **Form migration**: Formspree stays. The existing `prd-forms-api-part1.md` and `prd-forms-api-part2.md` remain as separate future work.
- **Lead magnets**: Adding lead magnet pages, email capture, or PDF hosting is future work.
- **Build pipeline**: The site has no build step and doesn't need one. No Node.js, no static site generator.
- **Legacy cleanup**: The `archive/` directory and `form.html` are not addressed in this PRD.

---

## Dependencies

### Internal Dependencies
- None. This is a standalone migration with no dependencies on the main application repo.

### External Dependencies
- **Cloudflare**: Account with DNS management for cortivus.com (existing)
- **GitHub**: Repository access for Cloudflare Pages integration
- **Formspree**: Existing form endpoint (no changes, must continue working)

### Cost
| Service | Cost |
|---------|------|
| Cloudflare Pages (free tier) | $0/mo — unlimited bandwidth, 500 builds/month |
| GitHub Pages (current) | $0/mo — will be decommissioned |
| **Net change** | $0 |

---

## Success Metrics

- Site serves from Cloudflare Pages at cortivus.com: Yes/No
- All pages load correctly (visual parity with GitHub Pages): Yes/No
- Formspree form works from new hosting: Yes/No
- Preview deployments work for `dev` branch: Yes/No
- GitHub Pages fully decommissioned: Yes/No
- Zero downtime during cutover: Yes/No

---

## Open Questions

**Q1**: Should `www.cortivus.com` redirect to `cortivus.com` or vice versa?
- **Recommendation**: Redirect `www` to apex (`cortivus.com`). The site currently uses the apex domain. Cloudflare Pages supports this natively.

**Q2**: Should the `archive/` directory be excluded from deployment?
- **Recommendation**: No — leave it. It's deployed but not linked. Excluding files from Cloudflare Pages requires a `.cfignore` file, which adds complexity for no real benefit. Address cleanup in a separate effort if desired.
