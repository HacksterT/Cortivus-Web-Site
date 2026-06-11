---

# Effects Analysis Data Contract

**Schema version:** 1.0  
**Owner:** Troy Sybert / Cortivus  
**Location:** `/insights/tracker/data/effects/schema.md`  
**Last updated:** 2026-06-03

This document specifies the JSON contract for the effects analysis visualization. The static seed file `ambient-listening.json` and the future Cure8 live API must both conform to this contract. The renderer reads the same fields in both cases — swapping from static to live is a single URL change.

---

## Future API endpoint

```
GET /api/v1/books/{book_id}/concept-summary
```

Returns the same JSON structure as the seed file. The `book_id` path param matches `books.slug` in the Cure8 DB.

---

## Top-level structure

| Field | Type | Cure8 source | Notes |
|-------|------|--------------|-------|
| `meta.schema_version` | string | hardcoded | Increment on breaking schema changes |
| `meta.source` | string | hardcoded | Always "cure8/{book_slug}" |
| `meta.scope` | string | hardcoded | Always "book" for this endpoint |
| `meta.book_id` | string | `books.slug` | |
| `meta.book_name` | string | `books.title` | |
| `meta.generated` | ISO 8601 string | server timestamp | When the API response was generated |
| `meta.workflow_count` | integer | `COUNT(*) FROM workflows WHERE book_id=?` | |
| `meta.source_count` | integer | `COUNT(DISTINCT source_id) FROM evidence_refs JOIN effect_modes ... WHERE book_id=?` | |
| `concepts` | array | see below | One entry per concept in `effect_mode_concepts` that has at least one effect mode in this book |

---

## Concept object

| Field | Type | Cure8 source | Nullable |
|-------|------|--------------|----------|
| `concept_id` | integer | `effect_mode_concepts.id` | No |
| `slug` | string | `effect_mode_concepts.slug` | No |
| `name` | string | `effect_mode_concepts.name` | No |
| `description` | string | `effect_mode_concepts.description` | Yes — empty string if null |
| `polarity` | string | `effect_mode_concepts.polarity_bias` | No — values: "negative", "positive", "bidirectional", "contextual" |
| `parent_concept_id` | integer | null | `effect_mode_concepts.parent_concept_id` | Yes |
| `workflow_count` | integer | `COUNT(DISTINCT em.workflow_id) FROM effect_modes em WHERE em.concept_id=?` | No |
| `evidence_count` | integer | `COUNT(*) FROM evidence_refs er JOIN effect_modes em ON er.effect_mode_id=em.id WHERE em.concept_id=?` | No |
| `evidence_by_direction.supports` | integer | count of evidence_refs where direction='supports' for this concept | No |
| `evidence_by_direction.refutes` | integer | count of evidence_refs where direction='refutes' | No |
| `evidence_by_direction.mixed` | integer | count of evidence_refs where direction='mixed' | No |
| `magnitude_distribution.low` | integer | count where magnitude_ordinal='low' | No |
| `magnitude_distribution.moderate` | integer | count where magnitude_ordinal='moderate' | No |
| `magnitude_distribution.high` | integer | count where magnitude_ordinal='high' | No |
| `magnitude_distribution.unquantified` | integer | count where magnitude_ordinal IS NULL | No |
| `risk_scores` | array | `risk_scores` table rows linked to effect modes of this concept | No — empty array if none |
| `risk_scores[].context` | string | `risk_scores.context` | |
| `risk_scores[].severity` | integer | `risk_scores.severity` (1–10) | |
| `risk_scores[].occurrence` | integer | `risk_scores.occurrence` (1–10) | |
| `risk_scores[].detection` | integer | `risk_scores.detection` (1–10) | |
| `risk_scores[].rpn` | integer | severity × occurrence × detection | |
| `enablers` | string array | `enablers.name` where enabler links to an effect mode of this concept, deduped | No — empty array if none |
| `interventions` | string array | `interventions.name` where intervention links to an effect mode of this concept, deduped | No — empty array if none |
| `discussion_prompts` | string array | `discussion_prompts.prompt_text` linked to effect modes of this concept | No — empty array if none |

---

## Polarity values

| Value | Meaning |
|-------|---------|
| `negative` | Failure mode — the literature documents harm, burden, or degraded outcome |
| `positive` | Success mode — the literature documents benefit, efficiency gain, or improved outcome |
| `bidirectional` | Evidence goes both directions; direction depends on context |
| `contextual` | Literature refuses to call it good or bad — outcome is genuinely context-dependent |

---

## Magnitude scale

`magnitude_ordinal` maps to the `evidence_refs.magnitude_ordinal` column. Values: `low`, `moderate`, `high`, or null (recorded as `unquantified`). This captures qualitative evidence where "more" and "less" can be ordered without a number.

---

## Versioning

Breaking changes (field removals, type changes, value set changes) require incrementing `schema_version`. Additive changes (new optional fields) do not. The renderer should tolerate missing optional fields gracefully.

---
