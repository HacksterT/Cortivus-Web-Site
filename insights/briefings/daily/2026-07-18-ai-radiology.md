# AI Radiology Second Read - What changed 2026-07-18

1 story/stories developed on 2026-07-18.

---

### Radiology eye-tracking study: false-negative AI prompts cut mammography reader sensitivity from 71% to 39%  (research, updated 2026-07-18)
A Radiology (RSNA) study used eye-tracking to measure automation bias when AI (Lunit INSIGHT MMG) is used as a second reader in screening mammography. Ten experienced NHS breast-screen readers each interpreted 60 mammograms twice, with and without AI prompts, on a test set deliberately enriched with AI errors including 14 false negatives. When the AI produced false-negative prompts on cancer cases, median reader sensitivity fell from 71% to 39% (P=0.002), and readers fixated less on the missed cancers, indicating the AI miss redirected their visual search. False-positive AI prompts were largely ignored and specificity rose. The authors conclude AI should be calibrated to minimize false negatives, because AI errors, not correct prompts, drive automation bias and missed detections.

**Take.** This is direct eye-tracking evidence that a second-read AI's misses propagate into the human reader rather than being caught by them, collapsing the safety assumption that the radiologist backstops the algorithm. Any second-read deployment should audit reader performance specifically on AI-false-negative cases, and the vendor's false-negative rate, not headline sensitivity, is the number that governs patient harm.

**Changelog**
- 2026-07-18 added: Surfaced via Grok X scan; thread by NHS-affiliated radiology fellow summarizing a Radiology (RSNA) eye-tracking automation-bias study using Lunit INSIGHT MMG as a mammography second reader.

Source: [Radiology (RSNA)](https://pubs.rsna.org/doi/10.1148/radiol.252590)
