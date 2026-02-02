# PRD: Forms API Infrastructure (Part 2)

## Overview

**Feature Name:** Email Microservice & Reliability Features

**Description:** A shared internal email microservice that other containers can use to send notifications, plus retry logic and admin alerting for form submission failures. This completes the forms API infrastructure started in Part 1.

**Problem:** When form submissions fail (database down, network issues), data could be lost and admins won't know. Additionally, email sending logic shouldn't be duplicated across multiple services (forms-api, future lead magnets).

**Context:** The email microservice will be internal-only (Docker network), callable by forms-api and future lead magnet containers. It uses Gmail API with OAuth2 refresh tokens for sending emails. Admin alerts ensure no form submission goes unnoticed.

**Prerequisites:** Part 1 PRD must be completed (forms-api running, forms.cortivus.com accessible)

**Related Documentation:**
- Part 1 PRD: `C:\Projects\Cortivus-Web-Site\tasks\prd-forms-api-part1.md`
- Server config: `C:\Projects\macdevserver\macdevserver-config.md`
- Docker config: `C:\Projects\macdevserver\macdevserver-docker-config.md`

---

## Existing Email Implementation Reference

**IMPORTANT:** A complete email implementation already exists in the Cortivus Career Intelligence project. The email microservice should be **extracted and refactored** from this existing code, NOT built from scratch.

### Source Files to Extract

| Source File | Purpose | Extract To |
|-------------|---------|------------|
| `C:\Projects\cortivus-career-intelligence-dev\backend\app\services\email.py` | Gmail API wrapper, OAuth2 credentials, send_email() | `email-service/services/gmail_service.py` |
| `C:\Projects\cortivus-career-intelligence-dev\backend\app\services\tutor\drip\email_builder.py` | HTML template generation, CSS styling | `email-service/services/template_engine.py` |
| `C:\Projects\cortivus-career-intelligence-dev\backend\app\services\tutor\drip\delivery_executor.py` | Retry logic (3 attempts), admin alerts | `email-service/services/retry_handler.py` |
| `C:\Projects\cortivus-career-intelligence-dev\backend\app\core\config.py` | Pydantic settings pattern | `email-service/config/settings.py` |

### Setup Scripts (Already Exist)

| Script | Purpose | Location |
|--------|---------|----------|
| `generate_gmail_refresh_token.py` | OAuth2 setup - generates refresh token | `C:\Projects\cortivus-career-intelligence-dev\backend\scripts\` |
| `test_gmail_connection.py` | Test email sending works | `C:\Projects\cortivus-career-intelligence-dev\backend\scripts\` |
| `test_google_apis.py` | Combined Gmail + Drive test | `C:\Projects\cortivus-career-intelligence-dev\backend\scripts\` |

### Authentication Approach

**Type:** OAuth2 with Refresh Token (NOT Service Account)

**How it works** (from existing `email.py`):
```python
self.credentials = Credentials(
    token=None,  # Auto-refreshed on each request
    refresh_token=os.getenv("GOOGLE_REFRESH_TOKEN"),
    token_uri="https://oauth2.googleapis.com/token",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    scopes=["https://www.googleapis.com/auth/gmail.modify"],
)
```

**Key Points:**
- Token is auto-refreshed before each API call (token=None forces refresh)
- Scope `gmail.modify` allows sending and modifying emails
- Same credentials can be reused from existing dev environment

### Required Environment Variables

Add these to `.env.cipm` on MacDevServer:
```bash
# Gmail API OAuth2 Credentials (copy from existing .env)
GOOGLE_CLIENT_ID=<from cortivus-career-intelligence-dev .env>
GOOGLE_CLIENT_SECRET=<from cortivus-career-intelligence-dev .env>
GOOGLE_REFRESH_TOKEN=<from cortivus-career-intelligence-dev .env>
GMAIL_FROM_ADDRESS=<sender email, e.g., notifications@cortivus.com>
ADMIN_EMAIL=<admin email for alerts>
```

### Python Dependencies (from existing requirements.txt)

```
google-api-python-client==2.159.0
google-auth==2.37.0
google-auth-oauthlib==1.2.1
google-auth-httplib2==0.2.0
fastapi>=0.100.0
uvicorn>=0.23.0
pydantic>=2.0.0
httpx>=0.24.0
```

---

## Working Backlog

### Feature: Email Microservice & Reliability

#### Phase 1: Email Microservice

- [ ] **STORY-05**: As a developer, I want a shared email microservice so that any container can send email notifications without duplicating Google API code

  - **Priority**: Must-Have
  - **Acceptance Criteria**: (verified at Manual Testing checkpoint)
    - [ ] Container `email_service` runs successfully on MacDevServer
    - [ ] POST `/send` endpoint accepts JSON with: to, subject, body, body_html (optional)
    - [ ] Endpoint returns 200 with `{"status": "success", "message_id": "..."}` on success
    - [ ] Endpoint returns 400 for validation failures (missing fields, invalid email)
    - [ ] Endpoint returns 500 for send failures (auth error, quota exceeded)
    - [ ] Email is delivered to recipient via Google Workspace
    - [ ] Service is only accessible from Docker network (no external exposure)
    - [ ] Health check endpoint `/health` returns 200
  - **Tasks**:
    - [ ] Backend: Create `email-service/` directory in hacksterT-website repo
    - [ ] Backend: Extract `EmailService` class from `C:\Projects\cortivus-career-intelligence-dev\backend\app\services\email.py` → `email-service/services/gmail_service.py`
    - [ ] Backend: Create `requirements.txt` using dependencies from "Python Dependencies" section above
    - [ ] Backend: Create `main.py` with FastAPI app wrapping extracted EmailService
    - [ ] Backend: Create `/send` POST endpoint (accepts: to, subject, body, body_html)
    - [ ] Backend: Create `/health` GET endpoint
    - [ ] Backend: Create `Dockerfile` (python:3.11-slim base, similar to hackstert_landing)
    - [ ] Backend: Add email-service to `docker-compose.yml` with profile `cipm` (see Appendix)
    - [ ] Backend: Configure network: `cipm-backend` only (internal, NO hackstert-network)
    - [ ] Backend: Copy OAuth2 credentials from `C:\Projects\cortivus-career-intelligence-dev\.env` to MacDevServer `.env.cipm`:
      - `GOOGLE_CLIENT_ID`
      - `GOOGLE_CLIENT_SECRET`
      - `GOOGLE_REFRESH_TOKEN`
      - `GMAIL_FROM_ADDRESS`
      - `ADMIN_EMAIL`
    - [ ] Backend: Copy `test_gmail_connection.py` from `C:\Projects\cortivus-career-intelligence-dev\backend\scripts\` to email-service for verification
    - [ ] Testing: Test endpoint via curl from forms-api container: `docker exec forms_api curl -X POST http://email_service:8081/send -H "Content-Type: application/json" -d '{"to":"test@example.com","subject":"Test","body":"Hello"}'`
    - [ ] Local Testing: Verify email arrives in recipient inbox
    - [ ] Manual Testing: CHECKPOINT — Send test email, verify delivery and check `docker logs email_service`
    - [ ] Git: Commit with `[skip ci]`, push to hacksterT-website repo (credentials stay in .env.cipm, NOT in Git)
  - **Technical Notes**:
    - **EXTRACTION TASK**: Port existing code from cortivus-career-intelligence-dev, don't build from scratch
    - OAuth2 with refresh token - see "Authentication Approach" section for implementation details
    - The `token=None` in Credentials constructor forces auto-refresh on each request
    - From address (`GMAIL_FROM_ADDRESS`) must match the Google account that authorized the OAuth credentials
    - Singleton pattern from original EmailService should be preserved
    - Container exposes port 8081 internally only (no host port mapping)
    - No nginx route needed - service is internal Docker network only
  - **Blockers**: None - credentials already exist in cortivus-career-intelligence-dev .env

---

- [ ] **STORY-06**: As a system administrator, I want the forms-api to send email notifications when a contact form is submitted so that I'm immediately aware of new leads

  - **Priority**: Must-Have
  - **Acceptance Criteria**: (verified at Manual Testing checkpoint)
    - [ ] Successful form submission triggers email notification to admin
    - [ ] Email subject includes "New Contact Form Submission" and contact name
    - [ ] Email body includes all form fields: name, email, organization, message
    - [ ] Email body includes timestamp of submission
    - [ ] Email sending failure does NOT cause form submission to fail (fire-and-forget with logging)
    - [ ] Failed email sends are logged for debugging
  - **Tasks**:
    - [ ] Backend: Add email-service URL to forms-api environment: `EMAIL_SERVICE_URL=http://email_service:8081`
    - [ ] Backend: Add admin email to environment: `ADMIN_EMAIL=<admin-email>`
    - [ ] Backend: Update forms-api to call email-service after successful database write
    - [ ] Backend: Implement async/fire-and-forget pattern (don't wait for email response)
    - [ ] Backend: Add try/catch around email call with logging on failure
    - [ ] Backend: Create email template with formatted contact details
    - [ ] Backend: Add forms-api dependency on email-service in docker-compose.yml
    - [ ] Testing: Submit form, verify email arrives within 30 seconds
    - [ ] Testing: Temporarily stop email-service, verify form still submits successfully
    - [ ] Local Testing: Check forms-api logs for email-related entries
    - [ ] Manual Testing: CHECKPOINT — Submit contact form, verify notification email received
    - [ ] Git: Commit with `[skip ci]`
  - **Technical Notes**:
    - Use `httpx` with `timeout=5` for HTTP call to email-service
    - Fire-and-forget: Don't await response, log any exceptions
    - Email template example:
      ```
      Subject: New Contact Form Submission - Jane Smith

      New contact form submission received:

      Name: Jane Smith
      Email: jane@example.com
      Organization: Acme Hospital
      Message: I'm interested in learning more...

      Submitted: 2026-01-19 14:32:15 UTC
      Source: cortivus.com contact form
      ```
  - **Blockers**: STORY-05 (email-service must be running)

---

#### Phase 2: Reliability & Alerting

- [ ] **STORY-07**: As a system administrator, I want form submissions to be retried and alerts sent on failure so that no leads are lost

  - **Priority**: Must-Have
  - **Acceptance Criteria**: (verified at Manual Testing checkpoint)
    - [ ] Database write failures trigger up to 3 retry attempts with exponential backoff
    - [ ] If all retries fail, submission is written to local fallback file (`/app/data/failed_submissions.json`)
    - [ ] Admin receives alert email when submission fails after all retries
    - [ ] Alert email includes: error details, form data, timestamp, retry count
    - [ ] User receives generic error message (not technical details)
    - [ ] Fallback file persists across container restarts (volume mount)
    - [ ] Health check degrades (returns 503) if >10 failed submissions in fallback file
  - **Tasks**:
    - [ ] Backend: Reference retry pattern from `C:\Projects\cortivus-career-intelligence-dev\backend\app\services\tutor\drip\delivery_executor.py` (3 attempts with tracking)
    - [ ] Backend: Implement retry logic with exponential backoff (1s, 2s, 4s delays)
    - [ ] Backend: Create fallback file writer for failed submissions
    - [ ] Backend: Add volume mount for `/app/data/` in docker-compose.yml (persist to LaCie)
    - [ ] Backend: Implement admin alert email on final failure (call email-service `/send` endpoint)
    - [ ] Backend: Update health check to read fallback file and return 503 if threshold exceeded
    - [ ] Backend: Add logging for each retry attempt
    - [ ] Backend: Create `recovery.py` script to replay failed submissions from fallback file
    - [ ] Testing: Simulate database failure, verify retries occur
    - [ ] Testing: Verify fallback file is created with correct data
    - [ ] Testing: Verify alert email sent on failure
    - [ ] Local Testing: Check logs show retry attempts with delays
    - [ ] Manual Testing: CHECKPOINT — Stop database, submit form, verify alert received and data in fallback file
    - [ ] Git: Commit with `[skip ci]`
  - **Technical Notes**:
    - Reference existing retry pattern in `delivery_executor.py` which tracks `email_retry_count` and `last_email_error`
    - Fallback file location: `/mnt/lacie/data/cipm/forms-api/failed_submissions.json`
    - JSON format: `[{"timestamp": "...", "data": {...}, "error": "...", "retries": 3}, ...]`
    - Exponential backoff: `delay = 2^attempt` seconds (1s, 2s, 4s)
    - Recovery script: `recovery.py` reads fallback file and replays to database
    - Alert email subject: `[ALERT] Form Submission Failed - Requires Attention`
    - Alert email body should include: contact data, error message, timestamp, retry count
  - **Blockers**: STORY-06 (email integration must be working)

---

- [ ] **STORY-08**: As a system administrator, I want monitoring and documentation for the forms infrastructure so that I can maintain it effectively

  - **Priority**: Should-Have
  - **Acceptance Criteria**: (verified at Manual Testing checkpoint)
    - [ ] Docker config documentation updated with forms-api and email-service details
    - [ ] Troubleshooting section added for common issues
    - [ ] Recovery procedures documented for failed submissions
    - [ ] Container health visible in Portainer
    - [ ] Log files are rotated (don't fill disk)
  - **Tasks**:
    - [ ] Documentation: Update `macdevserver-docker-config.md` with forms-api container details
    - [ ] Documentation: Update `macdevserver-docker-config.md` with email-service container details
    - [ ] Documentation: Add troubleshooting section for forms infrastructure
    - [ ] Documentation: Document recovery procedure for failed_submissions.json
    - [ ] Infrastructure: Verify containers appear in Portainer with health status
    - [ ] Infrastructure: Configure Docker logging driver with max-size and max-file limits
    - [ ] Testing: Verify logs are being rotated
    - [ ] Local Testing: Check Portainer shows all new containers
    - [ ] Manual Testing: CHECKPOINT — Review updated documentation for completeness
    - [ ] Git: Commit documentation updates
  - **Technical Notes**:
    - Docker logging config in docker-compose.yml:
      ```yaml
      logging:
        driver: "json-file"
        options:
          max-size: "10m"
          max-file: "3"
      ```
    - Document the full flow: form → forms-api → database + email-service
    - Include curl commands for testing each service
  - **Blockers**: STORY-07 (all services must be deployed)

---

## Non-Goals

- **Rate limiting**: Deferred; low traffic expected initially
- **reCAPTCHA integration**: Start with honeypot, add if spam becomes issue
- **Email templates UI**: Hardcoded templates are sufficient for now
- **Multiple admin recipients**: Single admin email for now
- **Queuing system (Redis/RabbitMQ)**: Overkill for current scale; simple retry + fallback is sufficient

---

## Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| Part 1 PRD completed | Internal | Required |
| Google Workspace API access | External | Available (existing OAuth2 credentials) |
| OAuth2 credentials in cortivus-career-intelligence-dev | Internal | Available - copy to .env.cipm |
| forms-api running | Internal | From Part 1 |
| Source code in cortivus-career-intelligence-dev | Internal | Available for extraction |

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Email delivery success rate | >99% |
| Admin notification latency | <30 seconds |
| Failed submissions recovered | 100% within 24 hours |
| Zero silent failures | All failures generate alerts |

---

## Open Questions

1. ~~**Credential extraction**~~: **RESOLVED** - OAuth2 with refresh token. Credentials exist in `cortivus-career-intelligence-dev\.env`. Copy `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN` to MacDevServer `.env.cipm`.

2. **Fallback file review frequency**: How often should admin review `failed_submissions.json`? (Recommendation: Alert email will prompt review; no scheduled check needed)

---

## Appendix

### Email Service API Contract

**POST /send**

Request:
```json
{
  "to": "admin@cortivus.com",
  "subject": "New Contact Form Submission - Jane Smith",
  "body": "Plain text email body...",
  "body_html": "<html>Optional HTML body...</html>"
}
```

Success Response (200):
```json
{
  "status": "success",
  "message_id": "abc123xyz"
}
```

Error Response (400/500):
```json
{
  "status": "error",
  "message": "Invalid recipient email address"
}
```

### Docker Compose Addition (email-service)

```yaml
  # Email Service - Shared internal email sender (OAuth2 via environment variables)
  email-service:
    container_name: email_service
    build:
      context: ./email-service
    ports:
      - "8081"  # Internal only - no host mapping
    env_file:
      - .env.cipm  # Contains GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, GMAIL_FROM_ADDRESS, ADMIN_EMAIL
    networks:
      - cipm-backend  # Internal only - NO hackstert-network (not externally accessible)
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8081/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
    profiles:
      - cipm
      - all
```

**Note:** OAuth2 credentials are passed via environment variables in `.env.cipm`, NOT a mounted JSON file. The EmailService class reads `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REFRESH_TOKEN` from the environment.

### Forms API Data Volume Addition

```yaml
  forms-api:
    # ... existing config from Part 1 ...
    volumes:
      - /mnt/lacie/data/cipm/forms-api:/app/data
```

### Failed Submissions File Format

```json
[
  {
    "timestamp": "2026-01-19T14:32:15Z",
    "data": {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "organization": "Acme Hospital",
      "message": "I'm interested..."
    },
    "error": "Connection refused: cipm_crm_postgres:5432",
    "retries": 3
  }
]
```

### Recovery Script Usage

```bash
# From MacDevServer
cd ~/hacksterT-website/forms-api

# View failed submissions
cat /mnt/lacie/data/cipm/forms-api/failed_submissions.json | jq

# Run recovery (after fixing database issue)
docker exec forms_api python recovery.py

# Clear fallback file after successful recovery
echo "[]" > /mnt/lacie/data/cipm/forms-api/failed_submissions.json
```

### Existing Code Reference Summary

When implementing, extract from these files in `C:\Projects\cortivus-career-intelligence-dev\`:

| Component | Source File | Key Functions/Classes |
|-----------|-------------|----------------------|
| Gmail API wrapper | `backend/app/services/email.py` | `EmailService` class, `send_email()` method |
| HTML templates | `backend/app/services/tutor/drip/email_builder.py` | `EmailBuilder` class, CSS styling helpers |
| Retry logic | `backend/app/services/tutor/drip/delivery_executor.py` | Retry tracking, admin alert sending |
| Config pattern | `backend/app/core/config.py` | Pydantic `Settings` class |
| OAuth setup script | `backend/scripts/generate_gmail_refresh_token.py` | Browser-based OAuth2 flow |
| Connection test | `backend/scripts/test_gmail_connection.py` | Verify email sending works |

**Admin Alert Template** (from `email_builder.py`):
- Already has `build_admin_alert_email()` method
- Includes error details, user info, timestamp
- CSS styling for professional appearance

**Existing Retry Pattern** (from `delivery_executor.py`):
- Tracks `email_retry_count` in database
- Stores `last_email_error` for debugging
- Sends admin alert after max retries exceeded
- Pattern can be adapted for database write retries
