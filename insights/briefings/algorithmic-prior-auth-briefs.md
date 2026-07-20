# Algorithmic Prior Authorization - Cortivus AI Safety Tracker Briefs

Standing digest of 8 tracked stories. Regenerated from the canonical tracker JSON on each run; one block per story, full history in each story's changelog.

Most recent development on file: 2026-07-18.

---
### Senate opens bipartisan probe of Medicare Advantage insurers over AI-driven care denials  (regulatory, updated 2026-07-18)
STAT News reported on July 15, 2026 that the largest Medicare Advantage insurers face a new bipartisan Senate inquiry into their use of artificial intelligence in coverage and care-denial decisions, led by Sens. Richard Blumenthal and Josh Hawley. The inquiry follows the June 2026 federal OIG findings on deny-then-reverse post-acute care denials and the ongoing nH Predict / naviHealth litigation against UnitedHealth. Contemporaneous X commentary framed UnitedHealth, Humana, and CVS as the principal targets of the scrutiny over AI-assisted rejection of Medicare Advantage claims. The senators' primary correspondence, the precise list of insurers contacted, and the specific documents requested were not retrieved in this scan.

**Take.** A bipartisan Senate inquiry raises the political cost of algorithmic utilization review at the same target-misalignment failure mode the nH Predict and WISeR items document: systems optimized to cut spend produce denials reversed on appeal. For a curator, the open question is whether this converts into subpoena-backed oversight or remains a letter-writing exercise.

**Changelog**
- 2026-07-18 added: Surfaced via STAT News health-tech RSS feed (July 15, 2026) and corroborated by X commentary naming UnitedHealth, Humana, and CVS as targets.

Source: [STAT News, 'Medicare Advantage insurers face new bipartisan scrutiny over AI and care denials'](https://www.statnews.com/2026/07/15/medicare-advantage-ai-care-denials-probe-blumenthal-hawley/)

### CMS launches WISeR Model: AI-enabled prior authorization for Original Medicare in six states  (regulatory, updated 2026-07-18)
The CMS Innovation Center's Wasteful and Inappropriate Service Reduction (WISeR) Model began Jan 1, 2026 in Arizona, New Jersey, Ohio, Oklahoma, Texas, and Washington, running through Dec 31, 2031. It is the first AI-enabled prior authorization program in Original (fee-for-service) Medicare, applying to procedures CMS considers vulnerable to fraud, waste, or low-value use, with an initial scope focused on spine and pain-management services (electrical nerve stimulator implants, epidural steroid injections, percutaneous vertebral augmentation, image-guided lumbar decompression). CMS pairs each participating MAC jurisdiction with a 'technology-enabled medical review entity' and states that AI handles intake and triage while human clinicians must be involved in any denial. Center for Medicare Advocacy reports early experience in the six states shows delays, more complex workflows for physicians, and patients waiting in pain for procedures.

**Take.** WISeR ports the Medicare Advantage utilization-management architecture into fee-for-service Medicare. The same target-misalignment risk that produced the nH Predict reversal-rate pattern now sits inside Original Medicare, with appeal rights, RCA capacity, and beneficiary-level access metrics still being worked out under a six-year demonstration timeline.

**Changelog**
- 2026-06-02 added: Initial entry. Surfaced by CMS/CMMI primary sources and reinforced by X-platform commentary on 2026-06-01 noting early beneficiary impact in the six WISeR states.
- 2026-06-06 development: Advocacy groups and local outlets began surfacing patient-impact concerns from the WISeR AI prior-authorization demonstration across the six states. The Alliance for Retired Americans highlighted seniors facing AI-driven denials or delays for physician-ordered Medicare care and linked KUOW reporting on Washington enrollees under the program.
- 2026-06-11 development: Congressional opposition to the WISeR AI prior-authorization demonstration escalated (June 10, 2026). Sen. Patty Murray announced she is leading a Democratic effort to shut down WISeR, and Rep. Lois Frankel publicized an amendment in the FY27 Labor-HHS appropriations bill to halt further program funding. Framing centers on AI second-guessing physician-ordered care in Original Medicare.
- 2026-06-13 development: Congressional action against WISeR escalated from announced intent to a committee vote. On June 12, 2026, a House committee was reported (HealthExec) to have voted to block AI-enabled prior authorization in Original Medicare, directly targeting the WISeR demonstration and operationalizing the FY27 Labor-HHS amendment publicized June 10-11; coverage framed the move as bipartisan. The same week, STAT reported the AMA and lawmakers pushing back on AI-driven care denials. Primary committee markup/roll-call record not yet retrieved; sourcing is secondary trade and social reporting.
- 2026-06-15 source_added: Independent trade coverage (Healthcare Finance News, surfaced via @MedicalQuack on June 14, 2026) characterized the WISeR defunding action as a House Appropriations Committee vote to end program funding and emphasized private-equity involvement among the technology-enabled medical review entities. Corroborates the June 12 committee-vote development with an additional secondary outlet; primary committee markup/roll-call record still not retrieved.
- 2026-06-17 source_added: June 16, 2026 HealthExec trade coverage (surfaced via @MedicalQuack) confirms the House committee vote to block AI-enabled prior authorization in Original Medicare was unanimous, and directly targets the WISeR demonstration. This supplies the direct trade-article URL behind the June 12-15 social reposts and adds the 'unanimous' detail; primary committee markup/roll-call record still not retrieved.
- 2026-06-19 source_added: June 17-18, 2026: physician and health-policy commentary amplified the unanimous House Appropriations Committee vote to defund the WISeR AI prior-authorization pilot. Fierce Healthcare coverage circulated (via @aprilewilson), and Rep. Greg Landsman (D-OH) was shown (via @wendellpotter) pursuing repeal of the program, framing it as new AI-driven barriers to senior care. No new legislative action beyond the previously logged committee vote.
- 2026-06-20 development: June 19, 2026: WISeR coverage crossed from trade and physician channels into general-audience consumer media and acquired a populist label. BBC Science Focus ran 'AI is now approving (and denying) healthcare in 6 US states. And it's already harming patients,' and 24/7 Wall St. framed the same six-state demonstration as 'The RFK Jr. Medicare AI Program Already Denying Seniors Care in 6 States,' both recirculated across X on June 19. No new substantive program or legislative event; the signal is escalating public salience and the attachment of the demonstration to HHS Secretary RFK Jr. in mass-market framing.
- 2026-06-27 development: June 23, 2026: KFF Health News published the first detailed operational investigation of the live WISeR demonstration (Darius Tahir), documenting months of patient delays, unpaid physicians, and AI hallucinations in the AI-assisted prior-authorization workflow. Amplified across X by KFF Health News, health journalist Harris Meyer, and senior/disability advocacy accounts (NCPSSM, ADAP Advocacy) citing longer approval times, payment backlogs, and access concerns. Separately, the American Society of Echocardiography (surfaced via CASE Journal editor V.L. Sorrell MD) publicly opposed WISeR's use of AI prior authorization for traditional Medicare fee-for-service claims. This shifts the evidence base from advocacy/congressional framing to documented operational failure modes; 'AI hallucination' is a new, specific failure mode attached to this program.
- 2026-07-18 development: July 16, 2026: the defund fight moved to the Senate. STAT reported that Senate Republicans blocked an effort to terminate the WISeR AI prior-authorization demonstration, keeping the six-state pilot (AZ, NJ, OH, OK, TX, WA) alive after the House Appropriations Committee had voted in June to block it. Physician commentary (Christian Pean MD, July 13) restated that WISeR pays participating review vendors based on savings generated from reduced or denied services, with CMS asserting a human clinician reviews before any denial.

Source: [CMS Innovation Center, WISeR Model](https://www.cms.gov/)

### Six states enact 2026 laws requiring human clinician sign-off on AI-driven coverage denials  (regulatory, updated 2026-06-16)
A June 15, 2026 healthcare-policy thread reports that six states (Indiana, Utah, Washington, Alabama, Maryland, and Georgia) passed laws in spring 2026 restricting insurers' use of AI and algorithms in coverage decisions, requiring that a qualified clinician, not an algorithm alone, make any final denial of medically necessary care. The thread cites NAIC data that roughly 84% of insurers now use AI/ML, voluntary human-review pledges by about 60 insurers, a May 2026 MACPAC recommendation for human oversight of Medicaid medical-necessity determinations, and a March 2026 White House AI framework that could preempt state rules. Separate state-lawmaker posts describe a state becoming the first to require insurers to report how often AI denies care and empowering the insurance commissioner to investigate denial spikes. Primary statute texts, the NAIC figure, the MACPAC recommendation, and the White House framework were not retrieved in this scan.

**Take.** State legislatures are converting 'human in the loop' from a voluntary insurer pledge into a statutory mandate aimed at the same target-misalignment failure mode the nH Predict and WISeR items document. The unresolved variable is preemption: a March 2026 federal AI framework could override these clinician-final-decision laws before they take effect.

**Changelog**
- 2026-06-16 added: Surfaced via Grok/X scan; multiple June 15, 2026 healthcare-policy posts describing a six-state wave of 2026 AI-denial restriction laws requiring human clinician sign-off on final coverage denials.

Source: [Breaking News ABA (@breakingnewsaba)](https://x.com/breakingnewsaba/status/2066525412964937778)

### Federal investigators find Medicare Advantage plans block rehab care, then reverse denials on appeal  (regulatory, updated 2026-06-16)
STAT News reporters Casey Ross and Bob Herman reported on June 11, 2026 that a federal investigation found Medicare Advantage insurers erect barriers to post-acute rehabilitation care for older adults and frequently reverse those denials once a beneficiary or provider appeals. The deny-then-reverse pattern documented in the federal findings mirrors the allegations at the center of the nH Predict / naviHealth litigation against UnitedHealth. The reporting situates the findings within longstanding OIG scrutiny of inappropriate MA prior-authorization denials for services such as post-acute facility stays and advanced imaging. The underlying federal report and its precise scope were not retrieved in this scan.

**Take.** Deny-then-reverse-on-appeal is the operational signature of target-misaligned utilization review: a system optimized to cut spend produces denials it cannot defend on individualized review. Federal findings strengthen the evidentiary base linking Medicare Advantage automated review to access harms, but a curator should confirm whether the report names algorithmic tools specifically.

**Changelog**
- 2026-06-11 added: Surfaced via STAT News health-tech RSS feed.
- 2026-06-15 development: Clinical and trade press amplified the OIG findings on June 13, 2026. MedPage Today reported the federal investigation found three large Medicare Advantage organizations denied prior-authorization requests for long-term care hospitals and inpatient rehabilitation facilities at higher rates than peer plans, with denials frequently overturned on appeal but low appeal uptake. This sharpens the scope the June 11 STAT-sourced entry left unconfirmed (specific care settings: LTCH and inpatient rehab).
- 2026-06-16 development: Physician leaders and the American Hospital Association amplified the OIG findings on June 15, 2026 with sharper figures. Posts surfacing the OIG report state Medicare Advantage plans overturned roughly 95% of appealed prior-authorization denials for skilled nursing facility (SNF) admissions, and the AHA recap cites OIG findings of higher 2024 coverage-denial rates by UnitedHealth, Humana, and CVS Health Medicare Advantage plans for long-term care, rehab, and SNF. This extends the prior LTCH/inpatient-rehab scope to SNF and attaches a specific appeal-overturn figure and named plans; the 95% SNF figure and per-insurer 2024 rates should be confirmed against the underlying OIG report.

Source: [Casey Ross and Bob Herman, STAT News](https://www.statnews.com/2026/06/11/medicare-advantage-oig-report-rehab-care-deny-appeal-reverse/)

### Barrows v. UnitedHealth Group filed in D. Minnesota  (litigation, updated 2026-06-07)
Alleges the nH Predict model was knowingly used to override clinician judgment and deny care that beneficiaries were entitled to under Medicare Advantage.

**Take.** Target-misalignment as a legal theory: the model was trained to a target reflecting denial patterns rather than clinical recovery, and the use of that model in coverage decisions is at the center of the case.

**Changelog**
- 2026-06-02 correction: Open-source litigation trackers identify the lead D. Minn. nH Predict class action as Estate of Gene B. Lokken et al. v. UnitedHealth Group Inc. (No. 0:23-cv-03514). 'Barrows' is not found as the lead plaintiff caption; flag for human review to confirm whether this item should be re-captioned or whether a separate Barrows action exists.
- 2026-06-02 development: Feb 13, 2025: Judge John Tunheim (D. Minn.) granted in part and denied in part UnitedHealth's motion to dismiss in Estate of Lokken. Breach-of-contract and breach-of-implied-covenant claims allowed to proceed; several state-law and statutory consumer-protection claims dismissed as preempted by the Medicare Act. Court waived the exhaustion-of-Medicare-administrative-remedies requirement, finding the appeal process could be futile and produce irreparable injury.
- 2026-06-02 development: Mar 9, 2025: Discovery order in Estate of Lokken required UnitedHealth to produce broad records on the nH Predict algorithm, the naviHealth acquisition and projected cost savings, internal AI review board materials, government-investigation correspondence, and performance/compensation files for care coordinators and medical directors handling post-acute claims.
- 2026-06-03 source_added: Verifying URLs located for the Feb 13, 2025 partial-MTD ruling and Mar 9, 2025 discovery order: Healthcare Finance News and LegalHIE for the MTD, ArentFox Schiff alert for the discovery order, Georgetown Litigation Tracker docket entry, and PMC-indexed JAMA Health Forum analysis. No new substantive docket events surfaced in the past 48 hours.
- 2026-06-07 correction: Resolves the open caption question flagged on 2026-06-02. 'Barrows' refers to a distinct action: Barrows et al. v. Humana, Inc. (W.D. Ky. No. 3:23-cv-00654-CHB), filed Dec 12, 2023 by plaintiffs Joanne Barrows and Susan Hagood, alleging Humana used the nH Predict model to prematurely terminate post-acute care for Medicare Advantage members (breach of contract, breach of implied covenant of good faith and fair dealing, unjust enrichment, insurance bad faith). Humana's motion to dismiss remains pending with no reported merits ruling. This is separate from the UnitedHealth matter that this item's summary and sources actually describe (Estate of Gene B. Lokken v. UnitedHealth Group, Inc., D. Minn.). Recommend a human curator split this into two items or re-caption: the UnitedHealth/Lokken case and the Humana/Barrows case are parallel nH Predict suits but distinct defendants, courts, and dockets. No new docket activity in either case in the past 48 hours.

Source: [Healthcare Finance News - Class action against UnitedHealth's AI claim denials advances](https://www.healthcarefinancenews.com/news/class-action-lawsuit-against-unitedhealths-ai-claim-denials-advances)

### Arizona AG sues MultiPlan and major insurers over shared out-of-network pricing algorithm  (litigation, updated 2026-06-02)
Arizona Attorney General Kris Mayes announced an antitrust lawsuit against MultiPlan and a group of major health insurers, including Aetna, Cigna, and UnitedHealthcare, alleging the defendants used a shared MultiPlan algorithmic pricing tool to coordinate reimbursement rates for out-of-network claims rather than setting rates independently. The complaint frames the alleged conduct as 'old-fashioned price-fixing using new technology,' claims it slashed payments to Arizona doctors and hospitals and shifted costs to patients, and seeks injunctive relief, civil penalties, and restitution. MultiPlan publicly stated the allegations are without merit and that it complies with antitrust laws.

**Take.** First state-AG antitrust action squarely targeting a payer-side algorithm operating across competing insurers. Extends the algorithmic-denial conversation from individual coverage decisions to shared payment-setting infrastructure, opening a second regulatory front (antitrust) alongside the contract and ERISA theories already in motion.

**Changelog**
- 2026-06-02 added: Initial entry. Lawsuit filed 2026-06-01 per Arizona AG press release; surfaced by Perplexity confirmation and an X-platform post from Yellow Sheet Report citing state-affairs coverage.

Source: [Arizona Attorney General press release](https://www.azag.gov/)

### STAT News exposes nH Predict denial pattern at UnitedHealth  (research, updated 2026-06-01)
UnitedHealth's nH Predict model (acquired with NaviHealth in 2020) was used to predict and deny post-acute care for Medicare Advantage patients. When clinicians disagreed and recommended continued care, the model's recommendation prevailed in the denial. Patient appeals reversed denials at approximately 90%.

**Take.** The 90% reversal rate is the model's report card. The system is telling the institution the model is wrong, in detail, every time a denial is overturned.

**Changelog**
- (no recorded changes)

Source: Ross & Herman, STAT News

### ProPublica and STAT expose Cigna PXDX claim review system  (research, updated 2026-06-01)
In a two-month window in 2022, PXDX processed over 300,000 claim denials. The average physician review time per denial was 1.2 seconds. Physicians were batch-signing what the algorithm flagged rather than reading claims.

**Take.** The human-in-the-loop check, if it cannot reasonably be performed at the cadence the system requires, is a check on paper only. Workflow design matters as much as model design.

**Changelog**
- (no recorded changes)

Source: Rucker, Miller & Armstrong, ProPublica / STAT News
