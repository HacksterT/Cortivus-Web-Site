# PRD: Forms API Infrastructure (Part 1)

## Overview

**Feature Name:** Cortivus Forms API - External Form Submission Service

**Description:** A lightweight API microservice that receives contact form submissions from the static cortivus.com website, writes them to the existing CRM PostgreSQL database, and triggers email notifications. This replaces the current FormSpree integration with a self-hosted solution.

**Problem:** The cortivus.com contact form currently uses FormSpree (free tier), creating an unnecessary dependency and extra hop to get data into the CRM. With existing home server infrastructure (MacDevServer with Docker, Cloudflare tunnels, and PostgreSQL CRM), we can handle form submissions directly.

**Context:** This is the first external consumer of the CRM database. Future lead magnets will communicate via Docker network internally; only cortivus.com (static site on GitHub Pages) requires external API access via Cloudflare tunnel.

**Related Documentation:**
- Server config: `C:\Projects\macdevserver\macdevserver-config.md`
- Docker config: `C:\Projects\macdevserver\macdevserver-docker-config.md`
- CRM schema: `C:\Projects\cortivus-cip-marketing\crm\docs\crm-schema.md`

---

## Working Backlog

### Feature: Forms API Infrastructure

#### Phase 1: Database & Backend

- [ ] **STORY-01**: As a system administrator, I want to add a notes field to the CRM contacts table so that contact form messages can be stored

  - **Priority**: Must-Have
  - **Acceptance Criteria**: (verified at Manual Testing checkpoint)
    - [ ] `notes` TEXT field exists in contacts table
    - [ ] Existing contacts are unaffected (field is nullable)
    - [ ] Field accepts text up to 10,000 characters
    - [ ] pgAdmin shows new field in table structure
  - **Tasks**:
    - [ ] Backend: Create SQL migration script to add `notes TEXT` column to contacts table
    - [ ] Backend: Test migration up (add column) and down (remove column) locally
    - [ ] Backend: Deploy migration to cipm_crm_postgres on MacDevServer
    - [ ] Backend: Verify migration via psql: `\d contacts` shows notes field
    - [ ] Testing: Insert test contact with notes field, verify retrieval
    - [ ] Local Testing: Verify notes field works via pgAdmin query
    - [ ] Manual Testing: CHECKPOINT — Verify via pgAdmin at https://hackstert.cortivus.com/crm-admin/ that notes field exists
    - [ ] Git: Commit migration script to cortivus-crm repo with `[skip ci]`
  - **Technical Notes**:
    - Migration runs on MacDevServer: `docker exec -it cipm_crm_postgres psql -U cipm_user -d cortivus_crm`
    - Use `ALTER TABLE contacts ADD COLUMN notes TEXT;`
    - No foreign keys or indexes needed for notes field
  - **Blockers**: None

---

- [ ] **STORY-02**: As a developer, I want to create a forms-api Docker service so that external forms can write to the CRM database

  - **Priority**: Must-Have
  - **Acceptance Criteria**: (verified at Manual Testing checkpoint)
    - [ ] Container `forms_api` runs successfully on MacDevServer
    - [ ] POST `/api/contact` endpoint accepts JSON with: name, email, organization, message
    - [ ] Endpoint returns 200 with `{"status": "success", "message": "..."}` on success
    - [ ] Endpoint returns 400 with `{"status": "error", "message": "..."}` for validation failures
    - [ ] Endpoint returns 500 with `{"status": "error", "message": "..."}` for server errors
    - [ ] Contact is written to CRM database with correct field mapping:
      - `name` → split into `first_name` and `last_name` (or store in `first_name` if no space)
      - `email` → `email`
      - `organization` → `organization`
      - `message` → `notes`
      - `source_channel` → `'website-contact'`
    - [ ] Duplicate email updates existing contact (upsert behavior)
    - [ ] Health check endpoint `/health` returns 200
  - **Tasks**:
    - [ ] Backend: Create `forms-api/` directory in hacksterT-website repo
    - [ ] Backend: Create `requirements.txt` (fastapi, uvicorn, psycopg2-binary, pydantic)
    - [ ] Backend: Create `main.py` with FastAPI app, `/api/contact` POST endpoint, `/health` GET endpoint
    - [ ] Backend: Implement input validation (email format, required fields, max lengths)
    - [ ] Backend: Implement database connection using environment variable `DATABASE_URL`
    - [ ] Backend: Implement upsert logic (INSERT ON CONFLICT UPDATE)
    - [ ] Backend: Create `Dockerfile` (python:3.11-slim base)
    - [ ] Backend: Add forms-api service to `docker-compose.yml` with profile `cipm`
    - [ ] Backend: Configure networks: `hackstert-network` (nginx routing) + `cipm-backend` (database)
    - [ ] Backend: Add environment variables to `.env.cipm`
    - [ ] Testing: Test endpoint locally with curl/Postman before deploying
    - [ ] Local Testing: Verify contact appears in database after POST
    - [ ] Manual Testing: CHECKPOINT — Run `docker logs forms_api` to verify no errors; query database to confirm contact saved
    - [ ] Git: Commit with `[skip ci]`, push to hacksterT-website repo
  - **Technical Notes**:
    - FastAPI chosen for automatic OpenAPI docs and validation
    - Database URL format: `postgresql://cipm_user:<password>@cipm_crm_postgres:5432/cortivus_crm`
    - Container should expose port 8080 internally (not to host)
    - Add `restart: unless-stopped` to docker-compose
    - Follow existing pattern from `hackstert_landing` service
  - **Blockers**: STORY-01 (notes field must exist)

---

#### Phase 2: External Access & Frontend

- [ ] **STORY-03**: As a system administrator, I want to expose the forms-api via forms.cortivus.com so that the static website can submit forms

  - **Priority**: Must-Have
  - **Acceptance Criteria**: (verified at Manual Testing checkpoint)
    - [ ] `forms.cortivus.com` resolves and is accessible via HTTPS
    - [ ] POST to `https://forms.cortivus.com/api/contact` reaches forms-api container
    - [ ] CORS headers allow requests from `cortivus.com` only
    - [ ] Requests from other origins are rejected
    - [ ] Health check at `https://forms.cortivus.com/health` returns 200
  - **Tasks**:
    - [ ] Infrastructure: Create new Cloudflare tunnel for forms.cortivus.com in Cloudflare Zero Trust dashboard
    - [ ] Infrastructure: Download tunnel credentials JSON to MacDevServer `~/hacksterT-website/cert/`
    - [ ] Infrastructure: Create `forms-cloudflared` service in docker-compose.yml (similar to hackstert_cloudflared)
    - [ ] Infrastructure: Create tunnel config.yaml pointing to nginx:8090
    - [ ] Infrastructure: Add DNS record in Cloudflare for forms.cortivus.com pointing to tunnel
    - [ ] Backend: Add nginx route for `/api/contact` and `/health` → forms_api:8080
    - [ ] Backend: Configure CORS in forms-api to allow only `https://cortivus.com` and `https://www.cortivus.com`
    - [ ] Infrastructure: Deploy tunnel container: `docker compose --profile cipm up -d`
    - [ ] Testing: Test with curl from external machine: `curl -X POST https://forms.cortivus.com/api/contact -H "Origin: https://cortivus.com" -d '...'`
    - [ ] Local Testing: Verify CORS rejection with wrong origin
    - [ ] Manual Testing: CHECKPOINT — From Windows browser, open DevTools Network tab and verify forms.cortivus.com is reachable
    - [ ] Git: Commit tunnel config and nginx changes with `[skip ci]`
  - **Technical Notes**:
    - Cloudflare tunnel setup: Zero Trust → Access → Tunnels → Create
    - Tunnel routes all traffic to nginx, nginx routes to appropriate backend
    - CORS middleware in FastAPI: `CORSMiddleware` with `allow_origins=["https://cortivus.com", "https://www.cortivus.com"]`
    - Consider Cloudflare WAF rules for additional protection (rate limiting, bot detection)
    - Nginx config location: `~/hacksterT-website/nginx/conf.d/default.conf`
  - **Blockers**: STORY-02 (forms-api must be running)

---

- [ ] **STORY-04**: As a website visitor, I want the contact form to submit to our own API so that my information is captured in the CRM

  - **Priority**: Must-Have
  - **Acceptance Criteria**: (verified at Manual Testing checkpoint)
    - [ ] Contact form on cortivus.com submits to `https://forms.cortivus.com/api/contact`
    - [ ] Form shows loading state during submission
    - [ ] Successful submission shows success message to user
    - [ ] Failed submission shows error message to user
    - [ ] Form fields are cleared after successful submission
    - [ ] Form works on both desktop and mobile browsers
    - [ ] No FormSpree references remain in codebase
  - **Tasks**:
    - [ ] Frontend: Remove FormSpree action from contact form in `index.html`
    - [ ] Frontend: Add JavaScript to handle form submission via fetch()
    - [ ] Frontend: Implement loading state (disable button, show spinner or "Sending...")
    - [ ] Frontend: Implement success state (show thank you message, clear form)
    - [ ] Frontend: Implement error state (show user-friendly error message)
    - [ ] Frontend: Add form field validation before submission (email format, required fields)
    - [ ] Testing: Test submission flow end-to-end on local dev server
    - [ ] Testing: Test error handling by temporarily breaking API endpoint
    - [ ] Local Testing: Verify contact appears in CRM database after form submission
    - [ ] Manual Testing: CHECKPOINT — Submit form on live cortivus.com, verify contact in pgAdmin
    - [ ] Git: Commit with `[skip ci]`, push to Cortivus-Web-Site repo
  - **Technical Notes**:
    - JavaScript fetch() with `Content-Type: application/json`
    - Request body: `{ "name": "...", "email": "...", "organization": "...", "message": "..." }`
    - Handle network errors separately from API errors
    - Consider adding honeypot field for spam prevention (hidden field that bots fill out)
    - Form location: `C:\Projects\Cortivus-Web-Site\index.html` lines 215-233
  - **Blockers**: STORY-03 (forms.cortivus.com must be accessible)

---

## Non-Goals

- **Email notifications**: Covered in Part 2 PRD
- **Retry logic / failure handling**: Covered in Part 2 PRD
- **Admin alerting**: Covered in Part 2 PRD
- **Rate limiting**: Deferred; low traffic expected
- **Lead magnet integrations**: Will use internal Docker network, not this API
- **FormSpree migration of historical data**: No historical data to migrate

---

## Dependencies

| Dependency | Type | Status |
|------------|------|--------|
| MacDevServer running | Infrastructure | Available |
| cipm_crm_postgres database | Infrastructure | Deployed |
| Cloudflare account access | External | Available |
| cortivus.com DNS in Cloudflare | External | Configured |
| hacksterT-website repo access | Internal | Available |

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Form submission success rate | >99% |
| API response time (p95) | <500ms |
| Contacts captured in CRM | 100% of successful submissions |
| FormSpree dependency | Eliminated |

---

## Open Questions

1. **Spam prevention**: Should we implement honeypot field, reCAPTCHA, or rely on Cloudflare WAF? (Recommendation: Start with honeypot, add reCAPTCHA if spam becomes issue)

2. **Form field mapping**: The current form has single "Name" field. Should we keep it simple or split into First/Last name fields? (Current plan: Keep single field, split in backend)

---

## Appendix

### API Contract

**POST /api/contact**

Request:
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "organization": "Acme Hospital",
  "message": "I'm interested in learning more..."
}
```

Success Response (200):
```json
{
  "status": "success",
  "message": "Thank you for your message. We'll be in touch soon."
}
```

Validation Error Response (400):
```json
{
  "status": "error",
  "message": "Please provide a valid email address."
}
```

Server Error Response (500):
```json
{
  "status": "error",
  "message": "Something went wrong. Please try again later."
}
```

### Docker Compose Addition (forms-api)

```yaml
  # Forms API - External contact form handler
  forms-api:
    container_name: forms_api
    build:
      context: ./forms-api
    ports:
      - "8080"  # Internal only
    env_file:
      - .env.cipm
    environment:
      DATABASE_URL: postgresql://cipm_user:${POSTGRES_PASSWORD}@cipm_crm_postgres:5432/cortivus_crm
    networks:
      - hackstert-network
      - cipm-backend
    depends_on:
      - cipm-postgres
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/health"]
      interval: 30s
      timeout: 10s
      retries: 3
    profiles:
      - cipm
      - all
```
