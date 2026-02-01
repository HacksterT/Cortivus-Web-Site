# Cortivus - Career Intelligence Platform

**Lead with Precision. Scale with AI.**

Cortivus helps healthcare executives accelerate their career development through AI-powered tools and structured mentoring. The Career Intelligence Platform combines personalized learning, job transition support, and executive mentoring—all powered by a comprehensive professional profile.

## Project Overview

This website serves as the marketing site for the **Cortivus Career Intelligence Platform**, featuring four integrated modules:

1. **Career Profile**: AI-enriched professional profile that powers all other modules
2. **The Tutor**: Skills gap analysis and personalized curriculum generation
3. **The Recruiter**: Resume writer, interview coach, and onboarding assistant
4. **The Mentor**: Structured 13-week mentoring cycles with PI Planning and sprint sessions

### Target Audience

- Chief Medical Officers (CMOs)
- VPs of Medical Affairs
- Healthcare Executives

## Development

This project is built with **Vanilla HTML, CSS, and JavaScript** for speed, simplicity, and easy deployment to Cloudflare Pages.

### Prerequisites

- Python 3.x (for local server)

### Branch Workflow

| Branch | Purpose |
|--------|---------|
| `main` | Production - auto-deploys to Cloudflare Pages (cortivus.com) |
| `dev` | Development - auto-creates preview deployment on Cloudflare Pages |

**Workflow:**
1. Always work on `dev` branch
2. Push to `dev` to get a preview deployment URL for testing
3. When ready to deploy, merge `dev` into `main` and push

### Running Locally

Use the included batch script to start a local server on port 4000:

```bash
.\serve.bat
```

Then open [http://localhost:4000](http://localhost:4000)

## Project Structure

```
Cortivus-Web-Site/
├── index.html              # Homepage - problem-first approach with platform overview
├── platform/               # Module pages
│   ├── career-profile/     # Career Profile module
│   ├── tutor/              # The Tutor module
│   ├── recruiter/          # The Recruiter module
│   └── mentor/             # The Mentor module
├── company/
│   └── team.html           # About page with team and mission
├── css/                    # Modular stylesheets
│   ├── core.css            # Variables, resets, base styles
│   ├── navigation.css      # Header, nav, dropdown
│   ├── hero.css            # Hero sections
│   ├── sections.css        # About, services, contact
│   ├── components.css      # Buttons, cards, forms
│   ├── platform.css        # Platform overview styles
│   ├── platform-modules.css # Module page styles
│   ├── homepage.css        # Homepage-specific styles
│   ├── footer.css          # Footer styles
│   └── responsive.css      # Mobile & tablet breakpoints
├── js/
│   ├── components.js       # Header/footer injection, navigation
│   └── main.js             # Mobile nav, interactions
├── images/                 # Optimized images and icons
├── archive/                # Archived legacy pages (portfolio, education)
├── pricing/                # Pricing page
└── tasks/                  # PRDs and planning documents
```

## Design Philosophy

* **Aesthetic**: "Executive Premium" – Dark theme with cyan/aqua accents, clean typography
* **Approach**: Problem-first messaging – Lead with challenges executives face, then present solutions
* **UX**: Consistent navigation with dropdown for platform modules

## Navigation Structure

- Home (`/`)
- Platform (dropdown)
  - Career Profile (`/platform/career-profile/`)
  - The Tutor (`/platform/tutor/`)
  - The Recruiter (`/platform/recruiter/`)
  - The Mentor (`/platform/mentor/`)
- About (`/company/team.html`)
- Contact (`/#contact`)

---
*© 2026 Cortivus*
