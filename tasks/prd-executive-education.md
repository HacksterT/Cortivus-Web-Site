# PRD: Executive Education Landing Page

## 1. Overview

This project involves creating a high-end, professional landing page (`cortivus.com/education`) to serve as the cornerstone for a new Executive Education offering. The page targets healthcare leaders (e.g., CMOs) and provides access to mentoring, personal AI automations, and proprietary tools (Curriculum Utility, Project Writer).

**Context**: This is a static site (GitHub Pages) serving as the marketing front-end. The actual tools will live behind a paywall on a separate subdomain (`curriculum.cortivus.com`), which is out of scope for this specific task.

## 2. Working Backlog

### Feature: Education Landing Page

#### User Stories

- [ ] **STORY-01**: As a healthcare executive, I want to understand the value of the "Executive Education" program so that I can decide if it helps my leadership goals.
  - **Priority**: Must-Have
  - **See**: FR-1, FR-2
  - **Tasks**:
    - [ ] Design: Create Hero section with compelling copy and imagery.
    - [ ] Design: Create "Problem/Solution" section addressing executive overwhelm.

- [ ] **STORY-02**: As a user, I want to see the specific offerings (Mentoring, AI Tools) so that I know what is included.
  - **Priority**: Must-Have
  - **See**: FR-3
  - **Tasks**:
    - [ ] Design: Create "Offerings Grid" (Mentoring, Curriculum Utility, Project Writer, Personal Automations).
    - [ ] Tech: Implement responsive grid layout for offerings.

- [ ] **STORY-03**: As a user, I want to clearly see how to engage (CTA) so that I can sign up or contact the founder.
  - **Priority**: Must-Have
  - **See**: FR-4
  - **Tasks**:
    - [ ] Design: Implement prominent CTA section.

- [ ] **STORY-04**: As a mobile user, I want the page to look professional on my phone so that I can browse on the go.
  - **Priority**: Must-Have
  - **See**: FR-5
  - **Tasks**:
    - [ ] Tech: Verify and adjust responsive styles.

#### Technical Tasks

- [ ] **TECH-01**: Create `education.html` and `css/education.css`.
- [ ] **TECH-02**: Update global navigation to include "Education" link.

## 3. User Stories (Detailed)

### STORY-01: Value Proposition

**As a** healthcare executive (CMO), **I want to** immediately grasp how this program helps me manage physicians and workload, **So that** I don't bounce off the page.

**Acceptance Criteria**:

- [ ] Hero section clearly states the mission ("Empowering Healthcare Leaders...").
- [ ] "About" section establishes authority (Founder's background).
- [ ] Visuals reinforce "Premium" and "Professional" aesthetic (Dark mode, clean typography).

### STORY-02: Offerings Display

**As a** potential client, **I want to** see the four main pillars (Mentoring, Automations, Curriculum, Project Tools), **So that** I understand the comprehensive nature of the service.

**Acceptance Criteria**:

- [ ] Four distinct cards/sections for the offerings.
- [ ] Mentions that apps are "Premium/Paywalled" (foundational context).

## 4. Functional Requirements

- **FR-1**: The system shall display a Hero section with a high-quality background and headline.
- **FR-2**: The system shall utilize the existing modular CSS architecture (`css/education.css` importing core styles).
- **FR-3**: The system shall display an interactive grid of offerings.
- **FR-4**: The system shall include a "Request Access" or "Contact" button linking to the existing form or email (mailto:servingyou@cortivus.com) for now.
- **FR-5**: The page must be fully responsive, stacking content gracefully on mobile devices.

## 5. Non-Goals

- Building the actual "Curriculum Utility" or "Project Writer" apps (these are external).
- User authentication on this landing page.
- Payment processing on this landing page.

## 6. Technical Considerations

- **Hosting**: GitHub Pages (Static HTML/CSS).
- **Style**: Use `css/core.css`, `css/components.css`, etc. for consistency. Create `css/education.css` for page-specific overrides.
- **Images**: Use placeholder images or generate new assets that match the "Dark/Premium" theme.

## 7. Open Questions

- **Q1**: Do you have specific copy/text for the Hero and Founder sections, or should I draft placeholders?
- **Q2**: For the CTA, should it link to the existing Formspree form (used in `index.html`) or a new one?
