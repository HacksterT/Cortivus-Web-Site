---
trigger: always_on
---

# Rule: Generating Feature PRDs with Working Backlog

## Purpose

Create actionable PRDs for features that AI coders can implement. Output includes a checkbox-driven backlog for tracking progress.

## Two-Phase Process

### Phase 1: Clarification (3-5 Questions)

Ask only the most relevant questions based on gaps in the user's prompt. Wait for answers before proceeding.

**Question Areas:**

- **Problem/Goal**: What problem does this solve?
- **Core Functionality**: What key actions must users perform?
- **User Stories**: Provide 2-3 stories (As a [role], I want [action] so that [benefit])
- **Acceptance Criteria**: How do we verify it works?
- **Scope Boundaries**: What should this NOT do?
- **Data Requirements**: What data is needed/displayed/modified?
- **Edge Cases**: What error conditions exist?
- **Dependencies**: What other features/systems does this need?

**Skip questions already answered in the prompt.**

### Phase 2: Generate PRD

## PRD Structure

### 1. Overview

- Feature name, one-paragraph description, problem it solves
- Context: How this fits into the larger system

### 2. Working Backlog

**Purpose**: Primary checklist for implementation. AI coders pull from here.

**Format**:

```markdown
## Working Backlog

### Feature: [Feature Name]

#### User Stories
- [ ] **STORY-01**: As a [role], I want to [action] so that [benefit]
  - Priority: Must-Have | Should-Have | Nice-to-Have
  - See: FR-X, FR-Y for specs
  - Tasks:
    - [ ] Backend: [specific task]
    - [ ] Frontend: [specific task]
    - [ ] Testing: [specific task]
    - [ ] Docs: [specific task if needed]

- [ ] **STORY-02**: [Next story...]
  - Priority: [level]
  - See: FR-X, FR-Y
  - Tasks:
    - [ ] [Task 1]
    - [ ] [Task 2]

#### Technical Tasks
- [ ] **TECH-01**: [Technical task or refactoring]
  - Reason: [Why needed]

#### Blockers
- [ ] **BLOCK-01**: [Unresolved question]
  - Blocking: STORY-XX
```

**ID Conventions**: STORY-XX, TECH-XX, BLOCK-XX

**AI Instructions**: Pull items in priority order. Mark checkboxes complete. Reference Functional Requirements for implementation details.

### 3. User Stories (Detailed)

For each story from the backlog, provide:

```markdown
### STORY-XX: [Title]
**As a** [role] **I want to** [action] **So that** [benefit]

**Priority**: [Must-Have | Should-Have | Nice-to-Have]

**Acceptance Criteria**:
- [ ] [Testable criterion 1]
- [ ] [Testable criterion 2]

**Related Requirements**: FR-X, FR-Y

**Notes**: [Edge cases, clarifications if needed]
```

### 4. Functional Requirements

**Format**: FR-1, FR-2, etc.

Write as: "The system shall/must [specific, testable requirement]"

**Quality Standard**:

- ✅ "The system shall allow image uploads up to 5MB in JPEG or PNG format"
- ✅ "When upload fails (file too large), display error: 'File too large. Max 5MB'"
- ❌ "Make a good uploader"

Include error handling explicitly.

### 5. Non-Goals

Explicit list of what this will NOT do. Prevents scope creep.

### 6. Technical Considerations (if needed)

- Known constraints, architectural dependencies
- Specific approaches required (e.g., "Use PostgreSQL triggers for audit logging")

### 7. Dependencies

Internal (other features) and external (APIs, services) dependencies.

### 8. Success Metrics

Measurable indicators: "90% of users complete task without errors"

### 9. Open Questions

Unresolved issues. Include who should answer and why it matters.

## Writing Guidelines

**For AI Coders:**

- Define domain terms on first use
- Use concrete examples for complex requirements
- Specify error handling explicitly
- Include task breakdowns when stories are complex

**Functional Requirements Quality:**

- Specific and measurable
- Testable (done/not done)
- Unambiguous

## Output

- **Format**: Markdown
- **Location**: `/tasks/`
- **Filename**: `prd-[feature-name].md` (kebab-case)

## Interaction Protocol

1. Receive prompt → Identify gaps
2. Ask 3-5 clarifying questions → Wait for response
3. Generate PRD → Save to `/tasks/`
4. **Do NOT implement** → PRD is deliverable

## Validation

Before finalizing:

- [ ] Working Backlog present with all stories/tasks
- [ ] Every FR is testable
- [ ] Stories have clear acceptance criteria
- [ ] Task breakdowns for complex stories
- [ ] Story IDs consistent across sections

## Example Working Backlog

```markdown
## Working Backlog

### Feature: User Authentication

#### User Stories
- [ ] **STORY-01**: As a new user, I want to register with email/password so that I can create an account
  - Priority: Must-Have
  - See: FR-1, FR-2, FR-3
  - Tasks:
    - [ ] Backend: Create POST /api/auth/register endpoint
    - [ ] Backend: Implement bcrypt password hashing
    - [ ] Backend: Add email validation & duplicate check
    - [ ] Frontend: Build registration form component
    - [ ] Frontend: Add client-side validation
    - [ ] Testing: Write integration tests for registration
    - [ ] Docs: Update API documentation

- [ ] **STORY-02**: As a registered user, I want to log in so that I can access my account
  - Priority: Must-Have
  - See: FR-4, FR-5, FR-6
  - Tasks:
    - [ ] Backend: Create POST /api/auth/login endpoint
    - [ ] Backend: Implement JWT token generation
    - [ ] Frontend: Build login form component
    - [ ] Backend: Add authentication middleware
    - [ ] Testing: Write unit tests for auth logic

- [ ] **STORY-03**: As a user, I want to reset my password if I forget it
  - Priority: Should-Have
  - See: FR-7, FR-8, FR-9
  - Tasks:
    - [ ] Backend: Create password reset request endpoint
    - [ ] Backend: Implement secure reset token (24hr expiry)
    - [ ] Frontend: Build password reset form
    - [ ] Testing: Integration tests for reset flow

#### Blockers
- [ ] **BLOCK-01**: Which email service provider?
  - Blocking: STORY-03
```
