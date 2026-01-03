# PRD: Cortivus Website Overhaul - Career Intelligence Platform Focus

**Version:** 1.0
**Date:** January 2, 2026
**Status:** Ready for Implementation
**Branch:** dev

---

## 1. Overview

### Feature Name

Cortivus Website Overhaul - Career Intelligence Platform Pivot

### Description

Transform the Cortivus website from a multi-product portfolio showcase into a focused marketing site for the **Cortivus Career Intelligence Platform**. The overhaul repositions the site to lead with the problems healthcare executives face, then presents the Career Intelligence Platform and its four integrated modules as the solution.

### Problem Statement

The current website presents Cortivus as a hybrid "Executive Education + Product Studio" with scattered offerings (Curriculum Utility, Project Writer, Journey2Health, Sermon Generator, etc.). This dilutes the message and confuses potential customers. The business is now focused exclusively on the Career Intelligence Platform - an AI-powered career development tool for healthcare executives.

### Context

- **Current State:** Multi-product portfolio site with education page as primary offering
- **Target State:** Single-product focused site for Career Intelligence Platform
- **Target Audience:** CMOs, VPs of Medical Affairs, Healthcare Executives (same as before)
- **Tagline:** "Lead with Precision. Scale with AI." (retained)
- **Marketing Approach:** Lead with problems, then solutions (per marketing plan)
- **Marketing Strategy:** See [marketing-plan-executive-education.md](marketing-plan-executive-education.md) - this is the overarching go-to-market strategy that the website overhaul supports. The website serves as the digital foundation for LinkedIn content, thought leadership, webinars, and conversion of qualified leads.

---

## 2. Working Backlog

### Feature: Website Overhaul - Career Intelligence Platform

#### User Stories

- [x] **STORY-01**: As a healthcare executive, I want to immediately understand the problems Cortivus solves so that I can determine if the platform is relevant to my challenges

  - Priority: Must-Have
  - See: FR-1, FR-2, FR-3
  - Tasks:
    - [x] Frontend: Redesign homepage hero to lead with "The Executive's Paradox" problem statement
    - [x] Frontend: Create compelling problem cards (People, Data, Performance challenges)
    - [x] Frontend: Add transition section from problems to solution (Career Intelligence Platform intro)
    - [x] Frontend: Move radial/graph background images from education page to homepage, overlay on existing hero grid
    - [x] Content: Refine problem statement copy to resonate with target audience
  - Design Notes:
    - Retain existing homepage grid pattern in hero section
    - Layer the radial/graph visuals from `/education/` page over the grid for added depth
    - Maintain current "Executive Premium" dark theme with cyan/aqua accents
- [x] **STORY-02**: As a visitor, I want to understand the Career Intelligence Platform and its four modules so that I can see the full scope of the solution

  - Priority: Must-Have
  - See: FR-4, FR-5, FR-6
  - Tasks:
    - [x] Frontend: Create platform overview section on homepage with 4-module summary cards
    - [x] Frontend: Design module card layout (Career Profile, Tutor, Job Aid, Mentor)
    - [x] Frontend: Add "Learn More" links from each module card to detailed module pages
    - [x] Content: Write concise module descriptions for homepage cards
- [x] **STORY-03**: As a potential customer, I want to explore each module in detail so that I can understand specific features and benefits

  - Priority: Must-Have
  - See: FR-7, FR-8, FR-9, FR-10
  - Tasks:
    - [x] Frontend: Create `/platform/career-profile/index.html` module page
    - [x] Frontend: Create `/platform/tutor/index.html` module page
    - [x] Frontend: Create `/platform/job-aid/index.html` module page
    - [x] Frontend: Create `/platform/mentor/index.html` module page
    - [x] Frontend: Design consistent module page template (hero, features, benefits, CTA)
    - [x] Content: Write detailed feature descriptions for each module
    - [x] CSS: Create `css/platform-modules.css` for module page styling
- [x] **STORY-04**: As a visitor, I want clear calls-to-action so that I can easily sign up or contact Cortivus

  - Priority: Must-Have
  - See: FR-11, FR-12
  - Tasks:
    - [x] Frontend: Update all CTAs to lead to contact form (temporary)
    - [x] Frontend: Add CTA sections to each module page
    - [x] Frontend: Ensure contact form is accessible from all pages
    - [ ] Docs: Document future CTA integration with Lemon Squeezy/Digital Ocean
- [ ] **STORY-05**: As a site administrator, I want the portfolio pages archived (not accessible) so that I can focus marketing on Career Intelligence

  - Priority: Must-Have
  - See: FR-13, FR-14
  - Tasks:
    - [ ] Backend: Add redirect rules from `/portfolio/*` to homepage (or 404)
    - [ ] Frontend: Remove portfolio from navigation in `components.js`
    - [ ] Docs: Move portfolio pages to `/archive/portfolio/` for preservation
    - [ ] Testing: Verify old portfolio links redirect properly
    - [ ] CSS: Clean up legacy portfolio CSS files (execution.css, education.css, etc.)
- [x] **STORY-06**: As a visitor, I want updated navigation that reflects the new site structure so that I can easily find information

  - Priority: Must-Have
  - See: FR-15, FR-16
  - Tasks:
    - [x] Frontend: Update `js/components.js` navLinks array with new structure
    - [x] Frontend: Create "Platform" dropdown with 4 module links
    - [x] Frontend: Update footer links to match new navigation
    - [x] Testing: Verify navigation works on all pages
- [ ] **STORY-07**: As a visitor, I want to learn about the founder/mentor so that I can trust the expertise behind the platform

  - Priority: Should-Have
  - See: FR-17
  - Tasks:
    - [ ] Frontend: Update `/company/team.html` (About page) with revised Dr. Sybert bio card
    - [ ] Content: Revise Dr. Sybert bio card to emphasize healthcare leadership and mentoring
    - [ ] Content: Highlight physician engagement program development experience
    - [ ] Content: Consolidate tech expertise into fewer, more focused points (AI strategy, not granular tech skills)
  - Content Notes:
    - Lead with healthcare executive leadership experience (CMO, Mayo Clinic, VA)
    - Emphasize mentoring and physician engagement program development
    - Keep AI/tech as supporting competency, not primary focus
    - Combine multiple tech items (e.g., "AI Innovation, Clinical Informatics" instead of listing separately)
  - Note: Premium Advisory section on The Mentor page already has updated founder bio with credentials
- [ ] **STORY-08**: As a visitor, I want the site to load fast and look professional so that I trust Cortivus as a premium service

  - Priority: Should-Have
  - See: FR-18, FR-19
  - Tasks:
    - [ ] Frontend: Audit and optimize images
    - [ ] Frontend: Ensure consistent styling across new pages
    - [ ] Testing: Test on mobile devices
    - [ ] CSS: Verify dark theme consistency
- [ ] **STORY-09**: As a visitor, I want consistent, professional iconography across the site so that the platform feels cohesive and polished

  - Priority: Should-Have
  - Tasks:
    - [ ] Design: Define icon strategy (Font Awesome vs custom SVGs vs image-based icons)
    - [ ] Design: Create icon style guide (size, color, stroke weight consistency)
    - [ ] Design: Audit current icons across all pages for inconsistencies
    - [ ] Frontend: Implement chosen icon system across homepage
    - [ ] Frontend: Implement chosen icon system across module pages
    - [ ] Frontend: Ensure icons work properly in dark theme

#### Technical Tasks

- [ ] **TECH-01**: Archive portfolio pages without deletion

  - Reason: Preserve work for potential future use
  - Tasks:
    - [ ] Move `/portfolio/` contents to `/archive/portfolio/`
    - [ ] Update `.gitignore` if needed to exclude archive from deployments (optional)
    - [ ] Document archive location in README
- [x] **TECH-02**: Create new folder structure for platform module pages

  - Reason: Organize new content logically
  - Tasks:
    - [x] Create `/platform/` directory
    - [x] Create subdirectories for each module
    - [x] Create shared module page template
- [x] **TECH-03**: Update CSS architecture for new pages

  - Reason: Maintain modular CSS approach
  - Tasks:
    - [x] Create `css/platform-modules.css`
    - [x] Update `styles.css` imports
    - [x] Ensure responsive design on new pages

#### Blockers

- [x] **BLOCK-01**: Final copy for module pages not yet written

  - Blocking: STORY-03
  - Mitigation: Use content from Career Intelligence PRD as starting point, refine later
  - Resolution: Copy written and refined for all four module pages
- [x] **BLOCK-02**: No screenshots/mockups of the app available yet

  - Blocking: STORY-03 (partially)
  - Mitigation: Use placeholder images or abstract graphics initially
  - Resolution: Using existing icon images and abstract graphics

---

## 3. User Stories (Detailed)

### STORY-01: Problem-First Homepage Experience

**As a** healthcare executive **I want to** immediately understand the problems Cortivus solves **So that** I can determine if the platform is relevant to my challenges

**Priority**: Must-Have

**Acceptance Criteria**:

- [x] Homepage hero leads with problem statement, not product pitch
- [x] "The Executive's Paradox" concept is prominently featured
- [x] Three problem areas are clearly articulated (People, Data/AI, Performance)
- [x] Visitor understands "this is for me" within 5 seconds

**Related Requirements**: FR-1, FR-2, FR-3

**Notes**: Aligns with marketing plan insight: "Healthcare executives don't buy AI tools. They buy solutions to political problems, burnout, and strategic paralysis."

---

### STORY-02: Platform Overview on Homepage

**As a** visitor **I want to** understand the Career Intelligence Platform and its four modules **So that** I can see the full scope of the solution

**Priority**: Must-Have

**Acceptance Criteria**:

- [x] Platform section appears after problem statement section
- [x] All four modules are represented with cards/tiles
- [x] Each module card has: icon/image, name, 1-2 sentence description, "Learn More" link
- [x] Visual hierarchy makes Career Profile appear as the central "hub"

**Related Requirements**: FR-4, FR-5, FR-6

**Notes**: Module order should be: Career Profile (hub), then Tutor, Job Aid, Mentor

---

### STORY-03: Detailed Module Pages

**As a** potential customer **I want to** explore each module in detail **So that** I can understand specific features and benefits

**Priority**: Must-Have

**Acceptance Criteria**:

- [x] Four separate module pages exist at `/platform/[module-name]/`
- [x] Each page has consistent structure: Hero, Features, Benefits, CTA
- [x] Features are specific and derived from Career Intelligence PRD
- [x] Pages load correctly with header/footer injection
- [x] Mobile responsive

**Related Requirements**: FR-7, FR-8, FR-9, FR-10

**Notes**:

- Career Profile: The hub - comprehensive professional profile with AI enrichment
- Tutor: Skills gap analysis + personalized curriculum generation
- Job Aid: Resume writer, interview coach, onboarding assistant
- Mentor: Executive mentoring with PI Planning, sprint sessions, strategy partner

---

### STORY-04: Clear Calls-to-Action

**As a** visitor **I want** clear calls-to-action **So that** I can easily sign up or contact Cortivus

**Priority**: Must-Have

**Acceptance Criteria**:

- [x] Primary CTA button appears in hero section
- [x] CTA appears at bottom of each module page
- [x] All CTAs currently link to contact form (`#contact` or `/index.html#contact`)
- [x] CTA copy is action-oriented ("Start Your Journey", "Get Started", etc.)

**Related Requirements**: FR-11, FR-12

**Notes**: Future integration will connect CTAs to Lemon Squeezy subscription → Digital Ocean app. For now, contact form is the conversion point.

---

### STORY-05: Portfolio Archival

**As a** site administrator **I want** the portfolio pages archived (not accessible) **So that** I can focus marketing on Career Intelligence

**Priority**: Must-Have

**Acceptance Criteria**:

- [ ] Portfolio pages are not accessible via navigation
- [ ] Direct URLs to `/portfolio/*` redirect to homepage (or show 404)
- [ ] Portfolio HTML files are preserved in `/archive/` folder
- [ ] No broken internal links remain on active pages

**Related Requirements**: FR-13, FR-14

**Notes**: Projects in portfolio (Journey2Health, Sermon Generator, MakeItADouble) may return in the future. Archive, don't delete.

---

### STORY-06: Updated Navigation

**As a** visitor **I want** updated navigation that reflects the new site structure **So that** I can easily find information

**Priority**: Must-Have

**Acceptance Criteria**:

- [x] Navigation includes: Home, Platform (dropdown), About, Contact
- [x] Platform dropdown contains links to all 4 module pages
- [x] "Portfolio" link is removed from navigation
- [x] Active state highlights current page
- [x] Mobile menu works correctly

**Related Requirements**: FR-15, FR-16

**Notes**: Navigation is centralized in `js/components.js` - single place to update.

---

## 4. Functional Requirements

### Homepage Requirements

**FR-1**: The homepage hero section shall lead with a problem-focused headline that addresses healthcare executive challenges, not a product-first pitch.

**FR-2**: The homepage shall include "The Executive's Paradox" section with three problem cards:

- The People Puzzle (physician engagement, team dynamics)
- The Data & AI Gap (drowning in data, unclear AI strategy)
- Performance Stagnation (goals not met, burnout)

**FR-3**: The homepage shall include a transition element that introduces the Career Intelligence Platform as the solution to the stated problems.

### Platform Overview Requirements

**FR-4**: The homepage shall display a "Career Intelligence Platform" section with visual representation of all four modules.

**FR-5**: Each module card on the homepage shall include:

- Module name
- Brief description (1-2 sentences)
- Representative icon or image
- Link to detailed module page

**FR-6**: The Career Profile module shall be visually positioned as the central "hub" with the other three modules connected to it.

### Module Page Requirements

**FR-7**: The Career Profile page (`/platform/career-profile/`) shall describe:

- AI-enriched professional profile creation
- Skills inventory with proficiency ratings
- Experience documentation with KPI translation
- Publications, certifications, and projects tracking
- How the profile powers all other modules

**FR-8**: The Tutor page (`/platform/tutor/`) shall describe:

- Skills gap analysis (compare profile to job descriptions or goals)
- Personalized curriculum generation
- Learning path delivery via email
- Connection to Career Profile data

**FR-9**: The Job Aid page (`/platform/job-aid/`) shall describe:

- Resume Writer: Tailored CV generation from profile + job description
- Interview Coach: STAR-format practice with AI feedback
- Onboarding Assistant: First 100 Days framework for new roles
- All features leverage Career Profile data

**FR-10**: The Mentor page (`/platform/mentor/`) shall describe:

- Executive Mentoring with 13-week Mentor Cycles
- PI Planning sessions for career goal setting
- Sprint Sessions for ongoing accountability
- Strategy Partner for AI-assisted problem-solving
- Project Writer for epic/story development

### CTA Requirements

**FR-11**: All primary call-to-action buttons shall link to the contact form section (`/index.html#contact`) until subscription integration is complete.

**FR-12**: Each module page shall include at least one CTA section encouraging visitors to get started with the platform.

### Portfolio Archival Requirements

**FR-13**: The navigation shall not include any links to portfolio pages.

**FR-14**: Direct access to `/portfolio/`, `/portfolio/execution/`, `/portfolio/curriculum/`, `/portfolio/journey2health/`, `/portfolio/sermon-generator/` shall redirect to the homepage or display a custom 404 page.

### Navigation Requirements

**FR-15**: The main navigation shall include the following structure:

- Home (/)
- Platform (dropdown)
  - Career Profile (/platform/career-profile/)
  - The Tutor (/platform/tutor/)
  - The Job Aid (/platform/job-aid/)
  - The Mentor (/platform/mentor/)
- About (/company/team.html)
- Contact (/index.html#contact)

**FR-16**: The mobile navigation shall include all items from FR-15 in a collapsible menu format.

### Content Requirements

**FR-17**: The founder/mentor (Dr. Troy Sybert) bio shall appear on the About page and optionally on the homepage, emphasizing expertise relevant to the Career Intelligence Platform.

### Quality Requirements

**FR-18**: All pages shall maintain the existing "Executive Premium" dark theme aesthetic with cyan/aqua accents.

**FR-19**: All new pages shall be mobile responsive, tested on viewport widths of 375px, 768px, and 1200px+.

---

## 5. Non-Goals

This overhaul will NOT include:

1. **Subscription/Payment Integration** - Lemon Squeezy and Digital Ocean integration is future work
2. **App Embedding** - The Career Intelligence app itself remains separate; this is the marketing site only
3. **Blog/Content Marketing Section** - Not part of initial overhaul
4. **User Accounts on Marketing Site** - No login functionality on cortivus.com
5. **SEO Optimization** - Basic meta tags only; deep SEO is future work
6. **Analytics Integration** - Google Analytics or similar is future work
7. **New Visual Design System** - Using existing CSS variables and design patterns
8. **Portfolio Page Redesign** - Portfolio is archived, not redesigned

---

## 6. Technical Considerations

### Folder Structure (After Overhaul)

```
Cortivus-Web-Site/
├── index.html                    # Homepage (redesigned)
├── platform/                     # NEW: Module pages
│   ├── career-profile/
│   │   └── index.html
│   ├── tutor/
│   │   └── index.html
│   ├── job-aid/
│   │   └── index.html
│   └── mentor/
│       └── index.html
├── company/
│   └── team.html                 # About page (updated)
├── education/                    # DEPRECATED: Redirect to homepage
│   └── index.html
├── archive/                      # NEW: Archived portfolio
│   └── portfolio/
│       ├── index.html
│       ├── execution/
│       ├── curriculum/
│       ├── journey2health/
│       └── sermon-generator/
├── css/
│   ├── ... (existing)
│   └── platform-modules.css      # NEW: Module page styles
├── js/
│   ├── components.js             # UPDATED: New navigation
│   └── main.js
└── images/
    └── ... (existing + new module images)
```

### Redirect Strategy

For GitHub Pages (static hosting), redirects are handled via HTML meta refresh or JavaScript:

```html
<!-- In /portfolio/index.html after archival -->
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=/">
    <script>window.location.href = "/";</script>
</head>
<body>
    <p>Redirecting to <a href="/">homepage</a>...</p>
</body>
</html>
```

### Navigation Update (components.js)

```javascript
const navLinks = [
    { text: 'Home', href: '/' },
    {
        text: 'Platform',
        dropdown: [
            { text: 'Career Profile', href: '/platform/career-profile/' },
            { text: 'The Tutor', href: '/platform/tutor/' },
            { text: 'The Job Aid', href: '/platform/job-aid/' },
            { text: 'The Mentor', href: '/platform/mentor/' }
        ]
    },
    { text: 'About', href: '/company/team.html' },
    { text: 'Contact', href: '/#contact' }
];
```

### CSS Architecture

New file `css/platform-modules.css` will contain:

- Module page hero styles
- Feature grid layouts
- Benefit cards
- Module-specific accent variations (if desired)

Import in `styles.css`:

```css
@import url('css/platform-modules.css');
```

---

## 7. Dependencies

### Internal Dependencies

- Existing CSS architecture (core.css, components.css, etc.)
- Existing JS component system (components.js for header/footer)
- Existing contact form (Formspree integration)
- Existing images and assets

### External Dependencies

- None for initial launch
- Future: Lemon Squeezy for subscriptions
- Future: Digital Ocean for app hosting
- Future: Cloudflare for routing

### Content Dependencies

- Career Intelligence Platform PRD (`cortivus-project-overview_1.md`) for module descriptions
- Marketing Plan for messaging guidance
- Dr. Sybert bio content (existing)

---

## 8. Success Metrics

### Launch Metrics

- All 4 module pages are accessible and load correctly
- Navigation works on desktop and mobile
- Portfolio pages redirect to homepage
- Contact form receives submissions

### Engagement Metrics (Post-Launch)

- Time on site increases (visitors exploring module pages)
- Contact form submissions increase
- Bounce rate decreases (clearer value proposition)

### Business Metrics (Future)

- Subscription signups (once Lemon Squeezy integrated)
- Conversion rate from visit to trial/signup

---

## 9. Open Questions

| ID   | Question                                                                                 | Owner   | Impact                   |
| ---- | ---------------------------------------------------------------------------------------- | ------- | ------------------------ |
| OQ-1 | Should `/education/` redirect to homepage or to a specific module page?                | Product | Navigation clarity       |
| OQ-2 | Do we need placeholder images for module pages, or can we launch with abstract graphics? | Design  | Visual polish            |
| OQ-3 | Should the About page be renamed to "About" or "Team" or "Our Story"?                    | Product | Navigation naming        |
| OQ-4 | What is the timeline for Lemon Squeezy integration?                                      | Product | CTA destination planning |

---

## 10. Implementation Order

### Phase 1: Foundation (Stories 5, 6)

1. Archive portfolio pages
2. Update navigation structure
3. Create redirect pages for old URLs

### Phase 2: Homepage Redesign (Stories 1, 2, 4)

1. Redesign homepage with problem-first approach
2. Add platform overview section
3. Update CTAs

### Phase 3: Module Pages (Story 3)

1. Create module page template
2. Build Career Profile page
3. Build Tutor page
4. Build Job Aid page
5. Build Mentor page

### Phase 4: Polish (Stories 7, 8)

1. Update About/Team page
2. Mobile testing and fixes
3. Image optimization
4. Final QA

---

## Document Control

**Created:** January 2, 2026
**Author:** Claude Code
**Status:** Ready for Implementation
**Next Review:** After Phase 1 completion

**Related Documents:**

- `C:\Projects\cortivus-career-intelligence\tasks\cortivus-project-overview_1.md`
- `C:\Projects\Cortivus-Web-Site\tasks\marketing-plan-executive-education.md`
