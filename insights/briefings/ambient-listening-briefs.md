# Ambient Listening - Cortivus AI Safety Tracker Briefs

Standing digest of 14 tracked stories. Regenerated from the canonical tracker JSON on each run; one block per story, full history in each story's changelog.

Most recent development on file: 2026-07-18.

---
### Preprint: clinician end-user feedback signals patient-safety risks in ambient AI scribes, chiefly medication and treatment  (research, updated 2026-07-18)
An arXiv preprint, 'Patient Safety Risks from AI Scribes: Signals from End-User Feedback' (2512.04118, posted December 2025), analyzes clinician end-user feedback on deployed ambient AI scribes. The authors conclude that AI scribes 'may induce various patient safety risks due to errors in transcription, most significantly regarding medication and treatment.' The analysis is qualitative, drawing on real-world user reports rather than a controlled accuracy audit or chart review. The authors explicitly state that further study is needed to quantify the absolute magnitude of risk. It is circulated in 2026 risk briefings as an early primary signal of real-world safety concerns.

**Take.** End-user feedback is a leading indicator, not a denominator: it flags where medication and treatment errors concentrate but cannot size the risk. The operational response is site-specific FMEA and post-deployment monitoring, not reassurance in either direction.

**Changelog**
- 2026-07-18 added: Surfaced via Perplexity scan of clinical AI scribe failure-mode reporting (scan 2026-07-18).

Source: [Patient Safety Risks from AI Scribes: Signals from End-User Feedback (arXiv 2512.04118)](https://arxiv.org/html/2512.04118v1)

### UCLA RCT of DAX and Nabla ambient scribes finds occasional clinically significant inaccuracies and one mild patient-safety event  (research, updated 2026-06-27)
A pragmatic randomized trial conducted across UCLA Health enrolled 238 physicians spanning 14 specialties and covered roughly 72,000 encounters, comparing two commercial ambient AI scribes (Microsoft DAX and Nabla) against usual documentation. Nabla use was associated with about a 10% reduction in documentation time. Physicians reported that AI-generated notes occasionally contained clinically significant inaccuracies, most commonly omissions of information and pronoun errors, and investigators recorded one mild patient-safety event during the trial. The authors concluded that ambient documentation requires active physician oversight rather than passive acceptance.

**Take.** The value here is a named failure taxonomy at scale: omissions and attribution errors, plus one documented safety event across 72,000 encounters. The control that matters is enforced clinician review and sign-off, not the vendor's word-error-rate claim.

**Changelog**
- 2026-06-18 added: Surfaced via Perplexity scan of recent ambient-scribe accuracy literature.
- 2026-06-27 development: NEJM AI publication of the DAX/Nabla ambient-scribe RCT surfaced June 24, 2026 via X (@Pub2Post), DOI 10.1056/AIoa2501000. Reported outcomes: Nabla reduced time-in-note by ~9.5%; both DAX and Nabla improved Mini-Z clinician-wellbeing scores; DAX showed a significant reduction in personal time on the EHR (after-hours documentation). Confirms the NEJM AI venue flagged in the verification note; exact publication date and the n=238 / ~72,000-encounter figures still require primary retrieval from the article.

Source: [UCLA Health (news release)](https://www.uclahealth.org/news/release/ucla-study-finds-ai-scribes-may-reduce-documentation-time)

### Washington v. Sutter Health filed in N.D. California  (litigation, updated 2026-06-23)
Patients allege sensitive medical conversations were captured and transmitted to the Abridge ambient documentation platform without clear prior patient consent. The pleaded theory is state wiretapping, not HIPAA violation.

**Take.** HIPAA has no private right of action; state wiretapping statutes do, with statutory damages and class certification potential. This is the door the plaintiffs' bar has chosen.

**Changelog**
- 2026-06-02 development: Tracked filing date now reported as April 7, 2026 (N.D. Cal.). Coverage describes defendants as Sutter Health, Memorial Health Services Inc., and MemorialCare Medical Foundation, and asserts three statutory theories: CIPA (state all-party consent), the Federal Wiretap Act, and the California Confidentiality of Medical Information Act (CMIA). Case at early stage with no merits rulings. Possible same case as the existing tracker item or a parallel suit; reconciliation pending docket confirmation.
- 2026-06-04 correction: Source attribution fix: the Fisher Phillips alert cited in the 2026-06-02 entry covers the Sharp HealthCare San Diego case (amb-2024-sharp-class-action), not this filing. The April 7, 2026 N.D. Cal. details (defendants Sutter Health, Memorial Health Services Inc., MemorialCare Medical Foundation; CIPA, Federal Wiretap Act, and CMIA theories) trace to the Alston & Bird privacy blog post already listed in sources. Docket confirmation still pending.
- 2026-06-09 source_added: Plaintiffs' bar and defense-side analysis continue to treat the N.D. Cal. complaint (Sutter Health, Memorial Health Services, MemorialCare Medical Foundation; Abridge AI Scribe) as a bellwether for CIPA/Federal Wiretap Act/CMIA theories against ambient scribes. Case remains at an early stage with no ruling on the merits; new coverage is secondary analysis, not a docket development.
- 2026-06-16 development: June 2026 legal analyses detail the N.D. Cal. complaint as filed April 7, 2026 naming Sutter Health, Memorial Health Services Inc., and MemorialCare Medical Foundation as defendants, asserting California Invasion of Privacy Act (CIPA), Federal Wiretap Act, and California Confidentiality of Medical Information Act (CMIA) claims over Abridge AI Scribe ambient capture without all-party consent. Abridge AI, Inc. is identified in the complaint but not named as a defendant.
- 2026-06-18 source_added: Added law-firm analysis synthesizing consent, privacy, and compliance lessons across the Sharp, Sutter, and MemorialCare ambient-scribe suits.
- 2026-06-23 correction: Removed the Fisher Phillips source; per the 2026-06-04 correction it covers the Sharp HealthCare case, not this Sutter/MemorialCare filing. Sutter attribution rests on the Alston & Bird post already in sources.

Source: [Alston & Bird Privacy Blog - Your AI Scribe May Be Taking Notes (and Plaintiffs Are Too)](https://www.alstonprivacy.com/your-ai-scribe-may-be-taking-notes-and-plaintiffs-are-too/)

### Vendor analysis cites Mayo Clinic Proceedings study reporting errors in 26% of ambient-scribe encounters  (research, updated 2026-06-21)
A June 2026 analysis by evaluation vendor Composo synthesizes a study it attributes to Mayo Clinic Proceedings examining ambient AI scribes across major US vendors in production use. The reported figures: errors in a mean 26.3% of encounters, 13.9 errors per transcript, and 3.0 errors per case carrying moderate-to-severe harm potential. The write-up enumerates a failure taxonomy spanning hallucinated medications, omitted red-flag symptoms, diagnostic leaps, fabricated consent statements, and dosage/route errors, and ties the fabricated-consent pattern to the Sharp HealthCare and Sutter/MemorialCare suits. The primary Mayo Clinic Proceedings article was not retrieved in this scan.

**Take.** If the 26% encounter-error and 3-per-case harm-potential figures survive against the primary source, they reframe ambient-scribe risk from anecdote to base rate and argue for an FMEA-style failure taxonomy plus mandatory clinician attestation before note sign-off.

**Changelog**
- 2026-06-12 added: Surfaced via Perplexity scan of clinical AI scribe failure-mode coverage, 2026-06-12.
- 2026-06-21 source_added: Added the direct URL for the Composo June 2026 analysis that operationalizes the Mayo Clinic Proceedings error profile (26.3% of encounters with >=1 error; mean 13.9 errors per transcript; ~3.0 errors per case with moderate-to-severe harm potential). Item previously carried named sources without URLs.

Source: [Composo — AI Scribe Failures 2026 (failure-pattern analysis)](https://www.composo.ai/post/ai-scribe-failures-2026)

### Perspective review catalogs ambient AI scribe failure modes and flags racial disparities in speech recognition  (research, updated 2026-06-21)
A perspective article, 'Beyond human ears: navigating the uncharted risks of AI scribes in clinical practice' (PMC12460601), synthesizes current empirical work on ambient LLM-based clinical scribes and identifies distinct failure modes that differ from human-scribe or dictation errors: AI hallucinations (plausible but baseless content, reported at roughly 1-3% but with definitions that vary widely across studies), critical omissions of clinically relevant detail, speaker-attribution errors that wrongly assign patient statements to the clinician, and contextual misinterpretations that alter documented medications or care plans. The authors also flag systematic performance disparities in the underlying speech-recognition systems, citing significantly higher transcription error rates for African American speakers than for White speakers. They argue this constitutes an equity-specific failure mode when scribes are deployed across heterogeneous patient populations and that ambient-scribe accuracy should be governed as a patient-safety concern, not merely an efficiency feature.

**Take.** The equity axis is the part most hospital AI committees are not auditing: a scribe that transcribes some patients less accurately encodes bias straight into the legal record and into any model later trained on those notes, an FMEA-relevant failure mode distinct from aggregate accuracy claims.

**Changelog**
- 2026-06-21 added: Surfaced via Perplexity scan of AI scribe failure-mode literature; not previously tracked. Distinct from JMIR e64993 and the Composo/Mayo item.

Source: [Beyond human ears: navigating the uncharted risks of AI scribes in clinical practice (PMC)](https://pmc.ncbi.nlm.nih.gov/articles/PMC12460601/)

### Abridge announces Nvidia and Eli Lilly deals, extends ambient platform into billing, trials, and real-time claims  (industry, updated 2026-06-14)
On June 11, 2026, STAT and Fortune reported that ambient-AI documentation vendor Abridge (valued around $5.3B) announced new partnerships with Nvidia and Eli Lilly. Coverage describes Abridge extending beyond clinical note generation into medical billing, drug-trial documentation, and real-time insurance-claim workflows under a new 'clinician intelligence' platform tied to a Series E raise. The move pushes ambient-captured audio further downstream into coding, payer, and research systems. Abridge is the vendor named in the active Sutter Health/MemorialCare wiretapping litigation already tracked here.

**Take.** Every new downstream destination for ambient-captured audio widens the consent and data-governance surface the Sutter and Sharp complaints already target. Billing, trials, and payer feeds are precisely the third-party data flows plaintiffs frame as undisclosed interception.

**Changelog**
- 2026-06-12 added: Surfaced via STAT health-tech RSS and Grok X scan, 2026-06-12.
- 2026-06-14 development: X corroboration (June 12-13, 2026) of the Nvidia/Eli Lilly platform announcement. Interoperability analyst Brendan Keeler framed it as an 'AI-native clinician intelligence platform' connecting care delivery, payment, and evidence-based treatment with a strategic Eli Lilly investment; a separate post cited the Nvidia collaboration to build a clinical-dialogue-tuned model and put Abridge's ambient platform at >3,000 physicians.

Source: [STAT (Health Tech)](https://www.statnews.com/2026/06/11/abridge-inks-deals-with-nvidia-and-lilly/)

### Physician commentary (Amy Faith Ho, MD) frames ambient-scribe suits as consent-process failures, not tech failures  (industry, updated 2026-06-12)
On June 11, 2026, emergency physician and health-policy writer Amy Faith Ho, MD MPH, posted a thread (linking a Medscape piece) on the emerging ambient AI scribe lawsuits. She argues the core defect is inadequate informed consent rather than the technology: allegations that platforms auto-populated or hard-coded consent attestations, and that physicians receive inadequate education on consent elements such as data retention, identifiability, third-party voices, and one- versus two-party state recording law. The post is expert commentary on the existing Sutter/MemorialCare and Sharp fact patterns, not a new legal development.

**Take.** Reinforces that the litigable defect sits in the consent workflow, not the model. Hospital governance, not vendor selection, is where the exposure is actually managed.

**Changelog**
- 2026-06-12 added: Surfaced via Grok X scan, 2026-06-12.

Source: [Amy Faith Ho, MD MPH (@amyfaithho, X)](https://x.com/amyfaithho/status/2065077235296473507)

### Sharp HealthCare class action surfaces hallucinated-consent fact pattern  (litigation, updated 2026-06-11)
The ambient-generated note stated the patient had been informed about the scribe and verbally consented when no such conversation occurred. The model inserted a boilerplate consent script into the chart, signed by a physician.

**Take.** Not a transcription error. A falsified record under the physician's signature. The precedent value is high.

**Changelog**
- 2026-06-04 development: Defense-counsel analysis fills in procedural detail: complaint filed November 26, 2025 in San Diego. Sharp allegedly deployed the ambient vendor in April 2025; claims rest on CIPA all-party consent and CMIA. Complaint alleges vendor retained audio ~30 days and Sharp could not immediately delete on request; putative class may exceed 100,000 patients. Relief sought includes statutory penalties and correction of allegedly inaccurate records. Sharp has not yet responded.
- 2026-06-05 source_added: Added direct news coverage (MobiHealthNews) of the Sharp HealthCare San Diego filing. Item previously carried only the unlinked complaint and a defense-firm client alert; this adds an independent reporting source for the same fact pattern (undisclosed ambient recording starting April 2025, CIPA and CMIA theories).
- 2026-06-11 development: June 2026 reporting details the filed complaint: a proposed class action in San Diego Superior Court naming Sharp HealthCare and affiliated groups (Sharp Rees-Stealy, SharpCare, Sharp Community Medical Group) over use of Abridge's ambient AI scribe. Core claims are CIPA all-party-consent/wiretapping and CMIA medical-privacy violations for recording clinician-patient conversations and transmitting audio to Abridge's cloud without consent, plus allegations that boilerplate EHR language falsely documented patient consent. Class period covers California patients recorded on or after April 1, 2025; plaintiffs cite a possible class exceeding 100,000 and seek statutory penalties, punitive damages, and injunctive relief. Vendor confirmed as Abridge; audio reportedly retained ~30 days.

Source: [Fisher Phillips - New Class Action Targets Healthcare AI Recordings](https://www.fisherphillips.com/en/insights/insights/new-class-action-targets-healthcare-ai-recordings)

### Atrium Health evaluation of DAX Copilot finds no broad efficiency gain; only highest-use group sees ~7% documentation-time reduction  (research, updated 2026-06-08)
Adjusted analysis at Atrium Health found few statistically significant efficiency differences between DAX Copilot users and matched controls beyond note time. High-use clinicians showed approximately a 7% decrease in documentation hours; the system-wide productivity claims did not survive matched-cohort analysis.

**Take.** Vendor headlines of '3-5 more patients per day' compress into a ~7% documentation-time reduction confined to the most-engaged users. Aggregate productivity benefits disappear once usage distributes unevenly across a real cohort, which is the deployment-context reality boards should plan for.

**Changelog**
- 2026-06-02 added: Identified via Perplexity scan summarizing real-world DAX Copilot deployment evaluations. Reporting-tier source; primary peer-reviewed publication still needs to be located.
- 2026-06-08 development: Coverage identifies the underlying study's publication venue as NEJM AI (New England Journal of Medicine AI), partially resolving the open verification note on the primary publication. Researchers concluded that 'widespread implementation of DAX in its current form is unlikely to generate appreciable gains' in productivity, with benefits concentrated among high-use clinicians (~7% documentation-hour reduction vs controls).

Source: [Healthcare IT News - Ambient AI doesn't improve efficiency across the board, study finds](https://www.healthcareitnews.com/news/ambient-ai-doesnt-improve-efficiency-across-board-study-finds)

### Heartland Dental class action extends consent-capture theory beyond acute care  (litigation, updated 2026-06-08)
Same wiretapping and consent theory applied to dental practice. Unauthorized recording of patient-clinician interactions alleged to violate two-party and all-party consent statutes.

**Take.** The plaintiffs' bar is treating consent-capture as the through-line for ambient AI litigation across care settings, not as an acute-care-only theory.

**Changelog**
- 2026-06-08 status_change: First ruling in the ambient-scribe wiretapping line: a federal court in Illinois dismissed the wiretapping claims in January 2026 under the 'ordinary course of business' exception. The court acknowledged plaintiffs had standing on other grounds and permitted refiling on some claims, leaving non-wiretapping theories alive. This is the first reported judicial test of the consent-capture theory and shows wiretapping counts are vulnerable to the ordinary-course defense even where other privacy claims survive.

Source: [Health Law Attorney Blog - Your AI Scribe Is Listening: Is Your Compliance Program?](https://www.healthlawattorneyblog.com/your-ai-scribe-is-listening-is-your-compliance-program/)

### Abridge extends ambient documentation to nurses at all health-system clients nationwide  (industry, updated 2026-06-03)
Abridge announced that its ambient AI clinical documentation product, previously deployed to physicians, is now generally available for nurses across every existing U.S. health-system customer. The release expands the audio-capture footprint from physician-led visits into nursing workflows on the same vendor stack.

**Take.** Extending the capture surface to nursing pushes ambient recording into encounters that are more frequent, more informal, and more likely to involve family or surrogate decision-makers. Health systems that validated consent, audio-retention, and content-quality controls for physician encounters need to re-run that validation for the nursing context before assuming the existing safeguards carry over.

**Changelog**
- 2026-06-03 added: Initial entry from scan. Source reports nationwide availability of Abridge ambient documentation for nurses at existing health-system clients.

Source: [Healthcare IT News - Abridge releases ambient AI tech for nurses](https://www.healthcareitnews.com/news/abridge-releases-ambient-ai-tech-nurses)

### JMIR single-center evaluation of Nuance DAX reports no measurable risk to patient safety or documentation quality  (research, updated 2026-06-02)
Peer-reviewed single-center observational study of clinicians using Nuance DAX ambient AI documentation reported no detected risk to patient safety, patient experience, or clinical documentation versus baseline, with modest positive trends in provider engagement. Safety was evaluated via high-level proxies rather than incident-level failure analysis, and the study did not characterize hallucination, omission, or rare-event rates.

**Take.** 'No risk detected' in a single institution with high-level proxies is the floor of what site-specific validation can claim, not the ceiling. Absence of evidence at the population level does not address the deployment-context failure modes that drive harm in individual encounters.

**Changelog**
- 2026-06-02 added: Identified via Perplexity scan on Nuance DAX patient-safety evaluations. Single-center observational evaluation indexed via PMC10990544.

Source: [JMIR (2024) - The Impact of Nuance DAX Ambient Listening AI Documentation (PMC10990544)](https://pmc.ncbi.nlm.nih.gov/articles/PMC10990544/)

### JMIR study finds documentation errors in 70% of notes from two commercial ambient AI scribes  (research, updated 2026-06-02)
Peer-reviewed evaluation (Journal of Medical Internet Research, 2025, e64993) of two commercially available ambient digital scribe products in a simulated clinical setting identified 127 documentation errors across 44 draft notes, with errors present in 31 of 44 notes (70%). Omission was the most common error type, and the authors flag omissions as harder for clinicians to detect on review. The two products differed significantly in error-type distribution (Fisher exact, P = .002).

**Take.** Omissions are the failure mode that breaks the 'clinician-in-the-loop' safety story: a reviewer cannot catch a clinically relevant fact that was never written to the chart. A 70% error rate in a simulated environment is the floor, not the ceiling, of what site-specific validation will find.

**Changelog**
- 2026-06-02 added: Identified via Perplexity scan on clinical AI scribe accuracy. Primary source is the JMIR 2025 paper.

Source: [JMIR 2025 - Accuracy and Safety of AI-Enabled Scribe Technology](https://www.jmir.org/2025/1/e64993/)

### AP/ABC News investigation documents Whisper hallucinations in clinical settings  (research, updated 2026-06-02)
Researchers at Cornell, University of Michigan, University of Washington, and Carnegie Mellon documented hallucination rates ranging from roughly 1% of audio snippets to at least one hallucination in 80% of transcripts inspected. Nabla, an ambient product built on Whisper, had over 30,000 clinicians on the platform at the time.

**Take.** OpenAI's own documentation warns against Whisper in high-stakes domains. Deployments proceeded anyway. Nabla deletes the source audio after note generation, eliminating the audit trail.

**Changelog**
- 2026-06-02 source_added: Located the underlying primary research: Koenecke et al., 'Careless Whisper: Speech-to-Text Hallucination Harms,' published at ACM FAccT 2024 (also on arXiv). The paper analyzed 13,140 English audio clips and found ~1.4% of transcriptions contained hallucinations; 38% of hallucinated outputs included explicit harms (violence, false authority, inaccurate associations). Hallucinations were more frequent for speakers with aphasia and were associated with longer non-vocal durations (pauses, silence). Cornell's press summary explicitly cites the patient-notes/misdiagnosis risk.

Source: [Koenecke et al., 'Careless Whisper: Speech-to-Text Hallucination Harms' (arXiv)](https://arxiv.org/html/2402.08021v2)
