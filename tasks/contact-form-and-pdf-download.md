# PRD: Contact Form & Dictionary PDF Download

**Date:** 2026-02-02  
**Status:** In Progress  
**Priority:** High — lead capture is broken until resolved

---

## Summary

The cortivus.com contact form and dictionary PDF download flow were tested end-to-end. Several issues were found and partially resolved. The remaining blocker is a Cloudflare security rule intercepting API requests.

---

## What Was Done

### ✅ Dictionary Download Modal Removed
- **Problem:** The dictionary page (`/dictionary/`) had a separate download modal with its own form. The Cloudflare Turnstile captcha widget couldn't render inside the hidden modal, so every submission failed with "Bot verification required."
- **Fix:** Removed the entire modal (HTML, CSS, JS — 343 lines). "Download as PDF" buttons now redirect to the homepage contact form (`/#contact`) with the "Request Dictionary PDF" radio auto-selected via sessionStorage.
- **Commit:** `2e5e05e`

### ✅ Instant PDF Download Link Added
- **Problem:** The original flow emailed the PDF as an attachment. HacksterT wants an instant download instead — the email becomes a welcome message.
- **Fix:** After successful form submission with `request_type: dictionary-pdf`, the success message now shows a direct download button pointing to `/dictionary/Translation_Dictionary.pdf`.
- **Commit:** `5411371`

### ✅ Email Sender Updated
- Changed `GMAIL_FROM_ADDRESS` from `TroySybert@Cortivus.com` to `Spock@Cortivus.com` in both `~/.secrets` and `~/.local/bin/send-email`.
- Gmail API has both addresses as verified send-as aliases. Spock@Cortivus.com is the default.

### 🔴 Backend Container Stopped
- The contact service (`cipm_contact_service`) was stopped to eliminate attack surface while the form is non-functional.
- **To restart:** `docker start cipm_contact_service`

---

## What's Blocking

### 🔴 BLOCKER: Cloudflare WAF Challenging API Requests
- **Problem:** Cloudflare's security layer (Browser Integrity Check / bot challenge) intercepts browser fetch() requests to `tools.cortivus.com/api/contact`. The browser receives a JavaScript challenge page instead of a JSON response, which causes `net::ERR_FAILED` and a CORS error.
- **Why curl works but browsers don't:** curl doesn't execute JavaScript, so Cloudflare lets it through. Browser fetch() can't execute a challenge page inline.
- **Fix:** In Cloudflare Dashboard → cortivus.com → Security → WAF → Create rule:
  - **Rule name:** `Skip challenge for tools API`
  - **When:** Hostname equals `tools.cortivus.com` AND URI Path starts with `/api/`
  - **Action:** Skip (all security features)
- **Why it's safe:** The backend already has Turnstile verification + honeypot field for bot protection. Double-challenging at the Cloudflare layer breaks the flow.

---

## What Still Needs to Be Done

### 1. Cloudflare WAF Skip Rule
- [ ] Create the WAF rule in Cloudflare Dashboard (see blocker above)
- [ ] Restart container: `docker start cipm_contact_service`
- [ ] Test form submission from browser (both "Request Information" and "Request Dictionary PDF")

### 2. Dictionary PDF File
- [ ] Finish designing `Translation_Dictionary.pdf`
- [ ] Add to repo at `/dictionary/Translation_Dictionary.pdf`
- [ ] Push to main → Cloudflare Pages deploys it
- **Note:** The download button on the success screen already points to this path. It will 404 until the file is added.

### 3. Backend Email: Welcome Instead of PDF Attachment
- [ ] Update `handle_dictionary_pdf()` in `cortivus-cip-marketing/magnet-business-dictionary/app/main.py`
- [ ] Remove the PDF attachment logic (no longer needed since user downloads directly)
- [ ] Rewrite email as a "glad to get to know you" welcome message
- [ ] Rebuild container: `cd ~/cortivus-cip-marketing/magnet-business-dictionary && docker compose up -d --build`

### 4. Test Full Flow End-to-End
- [ ] Dictionary page → "Download as PDF" → lands on homepage form with PDF radio selected
- [ ] Fill form → submit → Turnstile passes → CRM upsert → welcome email sent → download button appears
- [ ] Click download → PDF downloads
- [ ] Test "Request Information" flow still works
- [ ] Test on mobile

---

## Architecture Reference

```
Browser (cortivus.com)
  └─ fetch POST → tools.cortivus.com/api/contact
       └─ Cloudflare Tunnel → localhost:8022
            └─ Docker: cipm_contact_service (FastAPI)
                 ├─ Turnstile verification
                 ├─ CRM upsert (PostgreSQL, cipm-backend network)
                 └─ Email via gog CLI (Gmail API)
```

**Repo:** HacksterT/Cortivus-Web-Site (Cloudflare Pages, main → production)  
**Backend:** HacksterT/cortivus-cip-marketing/magnet-business-dictionary (Docker on home server)
