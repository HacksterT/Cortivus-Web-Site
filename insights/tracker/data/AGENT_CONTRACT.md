# Cortivus AI Safety Hub - Tracker Agent Contract

**Schema version:** 1.0
**Owner:** Troy Sybert / Cortivus
**Contract location:** `/insights/tracker/data/AGENT_CONTRACT.md`
**Last updated:** 2026-06-01

This document is the binding contract between the Atlas research agent and the Cortivus tracker data layer. The agent reads and writes files under `/insights/tracker/data/` according to this contract. The site renderer reads the same files and presents them to visitors. Any change to the schema requires updating the `schema_version` field in `index.json`, the version line above, and the renderer logic.

---

## Repository and write model

The tracker data lives in the public site repository at `Cortivus-Web-Site`. The agent operates on a working clone:

1. `git pull origin main` to get latest curated state
2. Read existing topic file for the target topic
3. Compute changes (new items, updated items, refreshed `last_run`)
4. Write the topic file back
5. `git add data/topics/<topic-id>.json data/index.json`
6. `git commit -m "tracker(<topic-id>): <change summary>"` (see commit format below)
7. `git push origin main`

Cloudflare Pages auto-deploys on push to `main`. No HTTP endpoint, no staging environment for v1. All agent writes are auditable through git history.

**Commit message format:**
```
tracker(<topic-id>): <summary line>

scanned: <ISO timestamp>
added: <N>
updated: <N>
sources_verified: <N>

[optional details]
```

Examples:
```
tracker(ambient-listening): daily scan, 1 new, 2 updated

scanned: 2026-06-15T08:00:00Z
added: 1
updated: 2
sources_verified: 1
```

---

## File layout

```
/insights/tracker/data/
  index.json                          # manifest (this is what the renderer fetches first)
  AGENT_CONTRACT.md                   # this file
  topics/
    ambient-listening.json
    state-ai-regulation.json
    prior-auth.json
    clinical-decision-support.json
    ai-radiology.json
    vendor-activity.json
  effects/                            # HUMAN-MANAGED — agent read-only
    ambient-listening.json            # seed data for Effects Analysis visualization
    schema.md                         # data contract and API shape documentation
```

The `effects/` subdirectory is **agent read-only**. It contains structured evidence synthesis data extracted from the Cure8 database by a human-supervised extraction workflow. The agent may read these files for reference but must not write, update, or delete them. Changes to `effects/` data require a human-initiated extraction from Cure8 followed by a code review.

The agent may write to:
- Topic files where `auto_managed: true`
- The `last_updated` field in `index.json` whenever it modifies any topic

The agent may **not** write to:
- Topic files where `auto_managed: false` (human-curated)
- The `topics` array of `index.json` (adding or removing topics is a human action)
- `AGENT_CONTRACT.md`
- Any item where `human_curated: true` (see exception below for `update_log`)
- Anything under `effects/` (human-managed, see above)

---

## Manifest schema (`index.json`)

```json
{
  "schema_version": "1.0",
  "last_updated": "ISO 8601 timestamp",
  "note": "string",
  "topics": [
    { "id": "string", "file": "topics/<id>.json" }
  ]
}
```

Agent writes only `last_updated` after a topic modification.

---

## Topic schema (`topics/<id>.json`)

```json
{
  "id": "string",                        // immutable, matches manifest id
  "name": "string",                      // display name
  "description": "string",               // 1-2 sentence framing
  "auto_managed": true,                  // if false, agent does not write
  "last_run": "ISO 8601 or null",        // when agent last scanned; written by agent
  "source_list": [
    {
      "name": "string",
      "url": "string or null",
      "category": "primary | reporting | analysis | research"
    }
  ],
  "items": [ /* see item schema below */ ]
}
```

`source_list` is the agent's scan target list. The agent reads it to know what to scan. A human curates the list. The agent may append a new source to the list when it discovers a new authoritative outlet, but must not delete existing entries.

---

## Item schema

```json
{
  "id": "string",                        // permanent, unique, kebab-case, includes topic prefix
  "date": "string",                      // event date: YYYY-MM-DD, YYYY-MM, YYYY, or YYYY-YYYY range
  "type": "litigation | regulatory | research | industry | failure-case",
  "headline": "string",                  // <= 140 chars, plain text
  "summary": "string",                   // 2-4 sentences, plain text
  "take": "string",                      // Cortivus read, 1-2 sentences
  "sources": [                           // 1+ sources required
    {
      "name": "string",
      "url": "string or null",
      "type": "primary | reporting | analysis | research",
      "date_accessed": "YYYY-MM-DD (optional)"
    }
  ],
  "first_added": "ISO 8601 timestamp",   // immutable after first write
  "last_updated": "ISO 8601 timestamp",  // updated only when item content changes
  "last_checked": "ISO 8601 timestamp",  // updated every time the agent looks at this item
  "verified": false,                     // human flips to true after review
  "verification_note": "string or null", // what needs verifying
  "human_curated": true,                 // if true, agent may not overwrite summary/take/headline
  "update_log": [                        // append-only history of changes
    {
      "timestamp": "ISO 8601",
      "type": "added | content_changed | status_change | source_added | development | correction",
      "note": "string",                  // what changed, in plain English
      "source": {                        // source attribution for THIS update
        "name": "string",
        "url": "string or null"
      },
      "added_by": "string"               // "atlas-cron" or "human" or specific username
    }
  ],
  "tags": ["string", "..."]              // freeform keywords, used for search later
}
```

### Item ID conventions

- Format: `<topic-short>-<date-anchor>-<slug>`
- `topic-short` examples: `amb` (ambient), `pa` (prior-auth), `reg` (regulation), `cds` (clinical decision support), `rad` (radiology), `ven` (vendor)
- `date-anchor`: the event date in compressed form (`2024-10-26` or `2025` or `2023-11`)
- `slug`: 2-4 words, kebab-case, descriptive

Examples:
- `amb-2024-10-26-whisper-ap`
- `pa-2023-11-barrows-v-united`
- `reg-2024-ca-ab489`

Once assigned, **ID is immutable**. If the agent finds a duplicate item, it must merge into the existing ID via `update_log`, not create a new one.

### Date field

The `date` field is the **event date** (when the thing happened in the world), not when it was added to the tracker. Precision varies:
- `YYYY-MM-DD` when exact date known
- `YYYY-MM` when only month known
- `YYYY` when only year known
- `YYYY-YYYY` when an ongoing event spans years

Agent should always use the most precise date form available from the source.

### Sources

Every item must have at least one source. Sources are an ordered array; the first entry is the **primary source** used for the hub-band link target. The agent's responsibilities for sources:

1. When adding a new item, populate at least one source with `name`. URL is preferred but may be null at draft time.
2. When verifying a previously null URL, update the source entry and append an `update_log` entry of type `source_added`.
3. When a new source surfaces for an existing item (e.g., a law firm publishes analysis of a case the tracker is following), append it to the `sources` array AND append an `update_log` entry of type `source_added`.
4. Never remove a source. Outdated sources may have `archived: true` added, but the entry stays.

Source `type` taxonomy:
- `primary`: court filings, government documents, statutes, FDA databases, vendor official communications
- `reporting`: news organizations (AP, STAT, ProPublica, Becker's, Reuters, etc.)
- `analysis`: law firm client alerts, expert blogs, industry commentary
- `research`: peer-reviewed papers, preprints, white papers

---

## Operations the agent may perform

### 1. Scan a topic

For each `auto_managed: true` topic:
1. Read the topic file
2. Walk the `source_list` and check each source for new material since `last_run`
3. For each candidate finding, determine if it is a new item or an update to an existing item (match against existing `id` + `tags` + headline similarity)
4. Apply the operations below as appropriate
5. Update topic `last_run` to current ISO timestamp
6. If any change was made, update `index.json` `last_updated` field
7. Commit and push

### 2. Add a new item

Write a new item with:
- `id`: per the convention above
- `first_added`: current ISO timestamp
- `last_updated`: same as `first_added`
- `last_checked`: same as `first_added`
- `verified`: false (human will review and flip to true)
- `human_curated`: false (agent-added items are not human-curated until promoted)
- `update_log`: starts with one entry of type `added`, noting source of discovery
- All other fields populated to best ability

### 3. Update an existing item

Allowed update operations:
- **For any item (including `human_curated: true`):** append entries to `update_log` of type `development`, `status_change`, `source_added`, or `correction`. Update `last_updated` to current timestamp. Append new sources to `sources` array.
- **For `human_curated: false` items only:** the agent may also revise `summary`, `take`, `headline`, `date` precision, and `verification_note`. Each revision must be recorded in `update_log` of type `content_changed` with a note describing what was rewritten and why.
- **Always permitted:** update `last_checked` to current timestamp on every scan, regardless of whether content changed.

### 4. Promote an unverified item to verified

Only a human does this. Agent never sets `verified: true` or `human_curated: true`.

### 5. Mark a topic status

The renderer computes topic status from item activity and `last_run`. The agent does not write status directly. If a topic should be retired, the human marks `auto_managed: false` and adds a note to the description.

---

## What the agent must not do

- Modify `id` fields after creation
- Modify `first_added` after creation
- Overwrite content fields on `human_curated: true` items (`summary`, `take`, `headline`, `date`)
- Add or remove topics (this requires human edit of `index.json`)
- Delete items (mark with `update_log` type `correction` instead)
- Delete sources (mark archived if needed)
- Modify `AGENT_CONTRACT.md`
- Commit changes to files outside `/insights/tracker/data/`

---

## Validation the agent should perform before commit

1. Every item has a non-empty `id`, `headline`, `summary`, `take`
2. Every item has at least one source with a `name`
3. Every `id` is unique within its topic file
4. Every `first_added`, `last_updated`, `last_checked` is a valid ISO 8601 timestamp
5. The `type` field is one of the five enumerated values
6. The `date` field matches one of the supported formats (`YYYY-MM-DD`, `YYYY-MM`, `YYYY`, `YYYY-YYYY`)
7. The JSON parses cleanly (run `JSON.parse` or `jq .` before commit)
8. `last_run` is updated even on a no-change scan, so the topic does not appear stale

If any validation fails, the agent must abort the commit and surface an error.

---

## Failure modes and degradation

- **Source unreachable:** continue scanning other sources; do not error out. Log the unreachable source in the commit message.
- **Conflicting information across sources:** record both in the `summary` with attribution; flag `verification_note` for human review; do not pick a winner.
- **Possible duplicate of existing item:** if confidence is high, merge via `update_log`. If uncertain, add as a new item with `verification_note` flagging the possible duplicate and the candidate existing ID.
- **No new items found:** still update `last_run`, commit a no-op confirming the scan. This is how the tracker proves it is alive.

A no-op commit message looks like:
```
tracker(ambient-listening): daily scan, no new items

scanned: 2026-06-15T08:00:00Z
added: 0
updated: 0
```

---

## Frontmatter for the agent skill

The agent skill that implements this contract should declare:

```yaml
name: cortivus-tracker-scan
description: Daily targeted research scan and update of a single Cortivus AI Safety Hub tracker topic. Reads the topic's source_list, scans for new items and updates to existing items, applies the item and update_log schemas defined in AGENT_CONTRACT.md, writes to the per-topic JSON file under /insights/tracker/data/topics/, and commits with the contract's commit message format. Never overwrites human-curated content.
inputs:
  - topic_id: ambient-listening | algorithmic-prior-auth | ai-radiology | dr-ai
  - max_new_items: integer (default 5; safety cap so a noisy day cannot flood the topic)
  - min_relevance_score: float (default 0.7; threshold below which an item is flagged but not added)
outputs:
  - git_commit_sha: string
  - items_added: integer
  - items_updated: integer
  - sources_verified: integer
  - candidates_flagged_for_review: integer
```

---

## Pilot topic scope (v1.1)

The current pilot is four topics, all `auto_managed: true`:

1. `ambient-listening` — Ambient Listening
2. `algorithmic-prior-auth` — Algorithmic Prior Authorization
3. `ai-radiology` — AI Radiology Second Read
4. `dr-ai` — Dr. AI

The following topics were retired in v1.1: `state-ai-regulation` (50-state regulatory tracking is out of agent scope; AI-scope-of-practice regulation rolls into `dr-ai`), `clinical-decision-support` (too broad as a single feed), `vendor-activity` (cross-cutting category whose items belong inside their related system topic). The retired topic files remain on disk for git history but are not referenced by the manifest. The agent must not read or write to them.

## Version history

- 1.1 (2026-06-01): Reduced pilot scope to four topics. Retired `state-ai-regulation`, `clinical-decision-support`, `vendor-activity`. Renamed `prior-auth` to `algorithmic-prior-auth` for ID-display consistency. Added `dr-ai` topic (autonomous AI scope-of-practice trends). All four pilot topics are `auto_managed: true`.
- 1.0 (2026-06-01): Initial contract. Six topics, two pilot (ambient-listening, state-ai-regulation).
