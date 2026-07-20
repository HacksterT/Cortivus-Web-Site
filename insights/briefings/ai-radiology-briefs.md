# AI Radiology Second Read - Cortivus AI Safety Tracker Briefs

Standing digest of 22 tracked stories. Regenerated from the canonical tracker JSON on each run; one block per story, full history in each story's changelog.

Most recent development on file: 2026-07-18.

---
### Radiology eye-tracking study: false-negative AI prompts cut mammography reader sensitivity from 71% to 39%  (research, updated 2026-07-18)
A Radiology (RSNA) study used eye-tracking to measure automation bias when AI (Lunit INSIGHT MMG) is used as a second reader in screening mammography. Ten experienced NHS breast-screen readers each interpreted 60 mammograms twice, with and without AI prompts, on a test set deliberately enriched with AI errors including 14 false negatives. When the AI produced false-negative prompts on cancer cases, median reader sensitivity fell from 71% to 39% (P=0.002), and readers fixated less on the missed cancers, indicating the AI miss redirected their visual search. False-positive AI prompts were largely ignored and specificity rose. The authors conclude AI should be calibrated to minimize false negatives, because AI errors, not correct prompts, drive automation bias and missed detections.

**Take.** This is direct eye-tracking evidence that a second-read AI's misses propagate into the human reader rather than being caught by them, collapsing the safety assumption that the radiologist backstops the algorithm. Any second-read deployment should audit reader performance specifically on AI-false-negative cases, and the vendor's false-negative rate, not headline sensitivity, is the number that governs patient harm.

**Changelog**
- 2026-07-18 added: Surfaced via Grok X scan; thread by NHS-affiliated radiology fellow summarizing a Radiology (RSNA) eye-tracking automation-bias study using Lunit INSIGHT MMG as a mammography second reader.

Source: [Radiology (RSNA)](https://pubs.rsna.org/doi/10.1148/radiol.252590)

### FDA AI/ML SaMD list continues to grow across imaging categories  (industry, updated 2026-07-11)
The FDA's AI/ML SaMD list of authorized devices has continued to expand, with imaging applications representing the largest category. Adoption at academic medical centers is increasingly treated as routine for select use cases (intracranial hemorrhage detection, pulmonary embolism flagging, mammography second read).

**Take.** FDA clearance is not a substitute for site-specific validation. Clearance covers the device under its labeled use. The institution still owns the question of whether the device performs at expected accuracy in its own patient population.

**Changelog**
- 2026-06-18 development: FDA's curated AI-enabled medical device list refreshed June 17, 2026: 1,524 total authorized devices, with 92 cleared so far in 2026; radiology remains the dominant specialty.
- 2026-07-11 development: FDA updated its AI-enabled medical device list on 2026-07-10, adding 211 newly listed authorizations since the prior cutoff. Roughly 81% were radiology products, with automated radiological image processing (product code QIH) the single largest category at 58 clearances. The update included one de novo radiology authorization, Clairity's Allix5 (dated 2025-05-30). Confirms the continued radiology dominance this item tracks.

Source: [FDA AI/ML SaMD List](https://www.fda.gov/medical-devices/software-medical-device-samd/artificial-intelligence-and-machine-learning-aiml-enabled-medical-devices)

### ACR Council approves first ACR-SIIM Practice Parameter for Imaging AI; Assess-AI registry framework formalized  (regulatory, updated 2026-07-11)
At the ACR 2026 annual meeting in Washington, DC, the ACR Council approved the first ACR-SIIM Practice Parameter for Imaging Artificial Intelligence, jointly developed with the Society for Imaging Informatics in Medicine. The parameter provides stepwise guidance for AI selection, pre-deployment evaluation, real-world performance monitoring, and continuous quality improvement, and applies across physicians, technologists, medical physicists, informatics/IT, data scientists, and administrators. A companion Journal of the American College of Radiology article details the technical framework for Assess-AI, ACR's AI quality registry for post-deployment surveillance, drift detection, and quality improvement across multiple imaging AI algorithms.

**Take.** A practice parameter is the closest thing imaging has to a clinical standard of care. Hospitals running imaging AI without an Assess-AI-equivalent monitoring loop are now operating below an articulated professional standard, and that has medico-legal weight when a missed or wrong call is litigated.

**Changelog**
- 2026-06-02 added: Surfaced via Perplexity scan on ACR AI guidance.
- 2026-07-11 development: ACR Data Science Institute published the technical framework for Assess-AI in JACR, described as a national AI quality registry and data service for clinical imaging AI intended to monitor real-world performance and detect drift or safety issues over time. The newly approved practice parameter and Assess-AI are positioned as core requirements for facilities seeking ACR's ARCH-AI recognition, the first national AI quality-assurance designation for radiology facilities.

Source: [American College of Radiology (press release)](https://www.acr.org/News-and-Publications/Media-Center/2026/first-practice-parameter-for-imaging-ai)

### Trade press reports three new FDA AI imaging clearances (DeepHealth, Cercare, vascular) not yet posted to FDA's AI device list  (regulatory, updated 2026-07-11)
Radiology trade accounts on X (@Dx_imaging, @CardioBusiness) reported three FDA AI imaging clearances within the scan window: new functionalities for DeepHealth's AI breast (mammography) suite on June 26, a Cercare Medical brain-MRI AI segmentation module on June 25, and AI software for flagging vascular disease on June 24. As of June 27 none appear on the FDA's public AI-Enabled Medical Device List, which still ends at March 2026, reflecting the list's known posting lag. The DeepHealth mammography clearance is the most relevant to AI second-read imaging; the Cercare segmentation and vascular-flagging items are adjacent. All three are single-source social-media reports pending primary confirmation.

**Take.** A useful early signal of continued FDA throughput for imaging AI, but unverified trade-account posts are not a clearance record; confirm each against the 510(k) database before treating it as fact.

**Changelog**
- 2026-06-27 added: Surfaced via Grok X scan of radiology trade accounts; not yet on the FDA list.
- 2026-07-11 development: Cercare Medical's FDA 510(k) clearance, one of the three clearances this item flagged as not yet posted to FDA's list, is now confirmed by a company announcement (surfaced ~2026-07-10). The cleared product performs AI-powered brain tumor segmentation (semi-automated, on-premise tumor segmentation on MRI for neuro-oncology teams).

Source: [Cercare Medical (company announcement)](https://cercare-medical.com/cercare-medical-receives-fda-510k-clearance-for-ai-powered-brain-tumor-segmentation/)

### UCSF study: AI as mammography second reader raises sensitivity 8.4%, catching more interval and future cancers  (research, updated 2026-06-27)
A study published in Radiology: Imaging Cancer and highlighted by the UCSF Center for Intelligent Imaging reports that using AI as a second reader in mammography screening improved sensitivity by 8.4% versus standard reading. The authors, including Maggie Chung MD, found the AI second-read configuration detected additional interval cancers and future-round cancers that would otherwise have been missed. This positive earlier-detection signal contrasts with concurrent prospective trials (e.g., the Nature Cancer UK arbitration study) that reported non-inferiority without a stage shift. Cohort size, specificity, recall-rate impact, and external-validation status were not available from the announcement.

**Take.** A positive second-reader signal that cuts against the no-stage-shift findings reported elsewhere; the discordance is the story, and the deciding variable is more likely cohort and workflow than the model. Treat as hypothesis-generating until the cohort and external validation are seen.

**Changelog**
- 2026-06-27 added: Surfaced via Grok X scan from a UCSF Ci2 post linking the Radiology: Imaging Cancer paper.

Source: [Radiology: Imaging Cancer (Chung et al.)](https://pubs.rsna.org/doi/10.1148/rycan.269009)

### FDA grants breakthrough designation to two generative-AI devices (Cognita, Aidoc) that interpret chest X-rays and draft reports  (regulatory, updated 2026-06-27)
STAT reported that the FDA granted breakthrough device designation to two devices using generative AI to interpret chest X-rays and draft radiology reports, attributed to Cognita and Aidoc. The designations are part of a broader influx of generative-AI devices into the FDA breakthrough pipeline reported the same week. Breakthrough designation accelerates review and signals unmet-need potential, but it is not a clearance or approval and the devices are not yet authorized for marketing. Generative report-drafting moves AI from flagging findings toward producing interpretive text, which introduces new oversight questions.

**Take.** Breakthrough designation is a regulatory on-ramp, not a safety verdict; generative report-drafting shifts the failure mode from missed-finding to fabricated or anchored narrative, which demands hallucination and automation-bias controls well before deployment.

**Changelog**
- 2026-06-27 added: Surfaced via STAT health-tech RSS within the scan window.

Source: [STAT (Katie Palmer)](https://www.statnews.com/2026/06/25/radiology-generative-ai-cognita-aidoc-fda-breakthrough-designation/)

### Nature Cancer prospective UK trial: AI replacing the second reader in mammography double-reading is non-inferior, cuts workload, no stage shift  (research, updated 2026-06-21)
A prospective UK breast-screening study reported in Nature Cancer evaluated replacing the second human reader with AI inside a full double-reading workflow that retained specialist arbitration. The AI arm (first human reader + AI second reader + arbitration) was compared against the standard arm (two radiologists + arbitration). After arbitration, sensitivity was 49.2% in the AI arm versus 48.0% with two human readers (non-inferior), and specificity was also non-inferior. Cancer detection rate was slightly higher and recall slightly lower in the AI arm, but neither difference was statistically significant, and replacing the second reader with AI did not shift cancers to earlier stages. Overall reading workload fell when AI replaced the second human reader.

**Take.** Adds prospective, arbitration-inclusive evidence that AI can stand in for the second human reader without measurable loss of detection accuracy, but the absent stage shift means the demonstrated payoff is workload reduction, not earlier diagnosis; safe deployment still hinges on local threshold calibration and ongoing performance monitoring.

**Changelog**
- 2026-06-19 added: Surfaced via Perplexity sonar-pro mammography second-reader query during daily ai-radiology scan; flagged for primary-source verification.
- 2026-06-21 source_added: Located the primary journal DOI for the previously URL-less Nature Cancer citation. Full text confirms case-level sensitivity 49.2% in the AI arm vs 48.0% with two human readers (non-inferior), screen-detected-cancer sensitivity 92.3%, no shift to earlier-stage detection, and reduced reading workload.

Source: [Nature Cancer (article s43018-026-01128-z)](https://www.nature.com/articles/s43018-026-01128-z)

### Multicenter Japanese study validates DL pancreatic-cancer CT second reader; non-contrast sensitivity rises 41% to 86%  (research, updated 2026-06-18)
A retrospective multicenter study across 18 Japanese institutions (2,251 patients) externally validated two modality-specific deep-learning pipelines (pancreas and main-pancreatic-duct segmentation, mass detection, and indirect-finding classification) for pancreatic cancer detection on contrast-enhanced and non-contrast CT, benchmarked against six radiologists of varying experience. On non-contrast CT the models reached AUC 0.93 versus a reader mean of 0.91, raising sensitivity from 41.1% (readers) to 86.0%; on contrast-enhanced CT, AUC was 0.99 versus 0.99 with sensitivity rising from 82.6% to 97.7%. Gains were largest for small tumors (<=20 mm) and, on non-contrast CT, were driven by indirect findings such as parenchymal atrophy and main-pancreatic-duct changes. The authors frame the system as a potential second-reader tool that increases sensitivity at the cost of lower specificity. Published in Radiology (RSNA).

**Take.** The sensitivity jump on non-contrast CT targets the highest-value failure mode, incidental pancreatic cancers missed on scans ordered for other reasons, but the lower specificity means false-positive workups are the deployment cost a site must model locally. External validation across 18 sites is stronger evidence than single-institution claims, though it remains retrospective and reader-benchmarked rather than a prospective workflow trial.

**Changelog**
- 2026-06-18 added: Surfaced via Grok X scan; expert tweetorial summarizing a Radiology multicenter validation of deep-learning pancreatic-cancer CT second-reader models.

Source: [Radiology (RSNA)](https://pubs.rsna.org/doi/10.1148/radiol.253122)

### Radiology commentary publishes roadmap to measure and mitigate demographic bias in imaging AI  (research, updated 2026-06-17)
A multidisciplinary team of radiologists, informaticists, and computer scientists published a Radiology commentary outlining a roadmap to measure and address demographic bias in imaging AI. The authors note that many public radiology datasets lack basic demographic labels; in a prior analysis of 23 public chest x-ray datasets, only 17% reported race or ethnicity, hampering detection of subgroup underperformance. The roadmap targets three domains: imaging datasets (routine reporting of age, sex, race, ethnicity, and acquisition confounders such as scanner vendor, view, and site), demographic definitions (treating race and gender as self-identified and socially constructed to avoid distorted bias estimates), and statistical evaluation (standardized fairness frameworks and explicit documentation of operating thresholds). It recommends sharing raw images without site-specific post-processing to avoid shortcut learning and convening a consensus panel to standardize demographic reporting and fairness terminology. Coverage appeared in Physics World and AuntMinnie.

**Take.** Standardized bias measurement and mandatory subgroup reporting are precisely the controls an AI safety audit should verify, giving Cortivus a citable framework for stress-testing vendor fairness claims before deployment.

**Changelog**
- 2026-06-17 added: Surfaced via Perplexity scan of radiology AI bias/subpopulation underperformance in the scan window.

Source: [AuntMinnie - Radiologists offer roadmap for measuring and addressing AI bias](https://www.auntminnie.com/imaging-informatics/artificial-intelligence/article/15746507/radiologists-offer-roadmap-for-measuring-and-addressing-ai-bias)

### ACR comments on FDA draft AI guidance, urging lifecycle risk management, site-level validation, and continuous monitoring of radiology AI  (regulatory, updated 2026-06-17)
The American College of Radiology submitted formal comments to the FDA on its draft guidance addressing risk management across the lifecycle of AI-enabled medical devices, including radiology AI. ACR supports advancing safe and effective AI but urges more specificity in the product information manufacturers must provide to FDA, physicians, and practices so end users can evaluate and monitor AI safety and effectiveness. The letter emphasizes site-level validation before and during clinical use, ongoing performance monitoring, and tailored oversight for AI types with novel risk profiles. ACR frames radiology AI as requiring structured governance, local validation, and continuous monitoring rather than one-time approval alone.

**Take.** A specialty society pushing FDA toward lifecycle risk management, site-level validation, and continuous monitoring signals the exact compliance bar hospitals will be held to, which is the wedge for an AI audit and governance practice.

**Changelog**
- 2026-06-17 added: Surfaced via Perplexity scan of ACR AI position/guidance in the scan window.

Source: [American College of Radiology - Enhancements to FDA Draft AI Guidance](https://www.acr.org/News-and-Publications/enhancements-to-fda-draft-ai-guidance)

### Preprint: frozen foundation-model embeddings discard small-lesion signal in chest radiography, exposing a pre-deployment evaluation gap  (research, updated 2026-06-15)
A preprint posted to arXiv (2606.11606) and circulated on X reports that frozen embeddings from foundation models discard information needed to detect small lesions on chest radiographs. The authors argue that strong aggregate benchmark performance can mask this loss, so models built on these embeddings may underperform specifically on small or subtle findings once deployed. They frame it as an implications-for-pre-deployment-evaluation problem: standard evaluation that relies on frozen foundation-model embeddings can overstate clinical readiness. The work was surfaced through a computer-vision paper aggregator account rather than radiology trade press and has not yet been peer reviewed.

**Take.** If pre-deployment evaluation rides on frozen foundation-model embeddings, the findings that matter most clinically, small and early lesions, are exactly where the benchmark is least trustworthy. Site validation should stratify accuracy by lesion size, not rest on a single aggregate AUROC.

**Changelog**
- 2026-06-15 added: Surfaced via X (CV paper aggregator) during 48-hour scan; arXiv preprint on small-lesion signal loss from frozen foundation-model embeddings in chest radiography.

Source: [arXiv 2606.11606 (preprint)](https://arxiv.org/abs/2606.11606)

### Aidoc and NVIDIA launch BRIDGE framework for standardized clinical AI validation, deployment, and monitoring  (industry, updated 2026-06-14)
Aidoc and NVIDIA announced the BRIDGE framework as an evidence-driven approach for standardized validation, interoperability, scalable deployment, and continuous monitoring of clinical AI tools across health systems, aligned with NVIDIA's MONAI ecosystem. Aidoc reports its CARE foundation model and aiOS platform are deployed across more than 150 U.S. health systems and 1,600 hospitals worldwide, supporting both Aidoc and third-party models with pre-deployment validation, a model registry with guardrails and rollback, and real-time drift detection.

**Take.** Vendor-led standardization frameworks are useful infrastructure but not a substitute for institutional governance. Hospitals should ask which BRIDGE outputs are auditable by the deployment site, which are held inside the vendor, and what the contractual remedy is when site-level monitoring flags drift the vendor disputes.

**Changelog**
- 2026-06-02 added: Surfaced via Perplexity scan on Aidoc/Annalise/iCAD/Heuron deployment and validation activity.
- 2026-06-03 development: Aidoc released BRIDGE publicly as a free, open-source framework at HLTH Europe in Amsterdam. Aidoc now describes BRIDGE as the Blueprint for Resilient Integration and Deployment of Guided Excellence and frames it as an industry-wide guide to safe, scalable clinical AI deployment, codifying validation, integration, monitoring, and operational-readiness criteria from deployments across 1,500+ hospitals.
- 2026-06-11 development: BRIDGE released as a free, open-source, downloadable framework. Defines 'healthcare-ready' criteria and minimum viable production environment (MVPE) requirements spanning validation protocols, regulatory checkpoints, cost benchmarks, and post-deployment performance monitoring before clinical deployment.
- 2026-06-14 development: BRIDGE (Blueprint for Resilient Integration and Deployment of Guided Excellence) formally released as an open-source framework at HLTH Europe, authored by 17 experts. It specifies minimum-viable-production-environment (MVPE) preconditions, validation protocols, regulatory checkpoints, trust/explainability mechanisms, and continuous post-deployment monitoring criteria, and is now free to download.

Source: [Aidoc](https://www.aidoc.com/learn/blog/11-things-a-clinical-ai-platform-must-deliver/)

### Lancet Digital Health: AI as independent second reader in population-based mammography screening matches double human reading  (research, updated 2026-06-14)
A population-based study reported in The Lancet Digital Health evaluated AI (Transpara) as an independent second reader within double-reading breast cancer screening across more than 42,000 mammograms in the Netherlands. The authors conclude AI used as the second reader detects clinically relevant cancers comparable to two human readers, with potential to replace the second human reader and reduce workload. A one-human-reader-plus-AI configuration detected more cancers than conventional double reading, including additional interval and future-detected cancers, but raised the recall rate from 2.9% to 5.0%. The benefit appeared consistent across breast density categories.

**Take.** Replacing the second human reader is the workload prize health systems want, but the recall jump from 2.9 to 5.0 percent is the cost line leaders must price in. The detection gain is real; the added false-positive and downstream-workup burden is the deployment risk.

**Changelog**
- 2026-06-11 added: Surfaced via Perplexity scan of AI mammography second-read studies in the past 2 days.
- 2026-06-14 development: Companion full-population feasibility modeling quantifies the second-reader tradeoff: fully replacing the second human reader with AI cut human screening reads by 48.7% and recalls by 2.2% but lowered sensitivity by ~1.5 percentage points (statistically significant). Alternative configurations (AI triage of low/high-risk cases, or replacing the first reader) reduced workload ~49% without measurable loss in cancer detection.

Source: [The Lancet Digital Health](https://www.thelancet.com/journals/landig/article/PIIS2589-7500(25)00064-0/fulltext)

### Coverage resurfaces MIT work: high-accuracy radiology AI shows demographic fairness gaps that debiasing fails to fix on external data  (research, updated 2026-06-11)
Trade coverage summarized MIT-led work showing that radiology AI models with high overall diagnostic accuracy can have substantial performance gaps across demographic groups (race, sex) when applied outside their development environment. Models most accurate at predicting demographic attributes (e.g., race from chest X-rays) had the largest fairness gaps, implying reliance on demographic shortcuts. Debiasing methods improved fairness only within the same dataset; gaps reappeared in external hospital populations, underscoring the need for site-specific evaluation on the local patient population.

**Take.** High aggregate AUROC hides who the model fails. That debiasing held only in-distribution and collapsed on external populations is the core argument for local, subgroup-stratified validation before deployment.

**Changelog**
- 2026-06-11 added: Surfaced via Perplexity scan of radiology AI bias / subpopulation underperformance in the past 2 days.

Source: [Axis Imaging News](https://axisimagingnews.com/market-trends/cloud-computing/machine-learning-ai/radiology-ai-models-show-diagnostic-discrepancies-across-groups)

### FDA clears Subtle Medical SubtleHD (CT), extending its AI image-enhancement platform from MRI into low-contrast CT detection  (regulatory, updated 2026-06-11)
Subtle Medical received FDA clearance for SubtleHD (CT) on or around June 10, 2026, expanding its AI-powered image-enhancement technology from MRI into CT. Trade coverage frames the clearance as AI software for improving low-contrast CT detection. The clearance is for image enhancement and reconstruction rather than a diagnostic second-read or detection claim.

**Take.** An enhancement-class clearance, not a diagnostic claim. Denoising and low-contrast reconstruction alter the images radiologists actually read, so site validation should confirm the model neither suppresses true findings nor fabricates structure at the operating dose.

**Changelog**
- 2026-06-11 added: Surfaced via Grok/X scan of FDA AI imaging clearances in the past 2 days.

Source: [L2P Research Labs (@l2presearch)](https://x.com/l2presearch/status/2064659239269011491)

### ESR systematic review of 16 CE-marked CT lung-screening AI tools: nodule detection covered, endobronchial and cystic lesions unassessed, evidence mostly retrospective  (research, updated 2026-06-09)
The European Society of Radiology highlighted a systematic evaluation of 16 CE-marked AI tools for CT lung cancer screening, benchmarked against Lung-RADS 2022, BTS, EUPS, and ESTI guidelines. Most tools support solid and subsolid nodule detection, measurement, and growth assessment, but none evaluate endobronchial or cystic lesions. The available evidence base is predominantly retrospective diagnostic-accuracy data rather than prospective clinical-outcome studies. The authors caution that commercial availability does not equal clinical readiness.

**Take.** A CE mark certifies a narrow task, not coverage of the full differential; the unassessed endobronchial and cystic categories are exactly where silent misses accumulate. Departments should map each tool's validated scope against their guideline of record before trusting it as a second read.

**Changelog**
- 2026-06-09 added: Surfaced via ESR Journals X post during daily Grok scan.

Source: [ESR Journals (@ESRJournals)](https://x.com/ESRJournals/status/2063894019575353706)

### JACR review lays out five factors radiology departments must weigh when externally validating AI before clinical deployment  (research, updated 2026-06-08)
A review published online in the Journal of the American College of Radiology (May 21, 2026) outlines five factors radiology departments should evaluate before deploying AI: onsite versus cloud validation, patient privacy, data collection, computational requirements, and scoring protocol. It stresses that validation datasets must reflect the real-world target population with adequate sample sizes and statistical plans to assess subpopulation performance. The authors warn that many FDA-cleared tools show limited generalizability outside their development setting, making local external validation essential before routine clinical use.

**Take.** FDA clearance certifies a device, not its behavior in your scanner fleet and case mix. This review turns 'validate locally' into a concrete pre-deployment checklist that maps onto an FMEA-style review.

**Changelog**
- 2026-06-08 added: Surfaced via Perplexity scan of radiology AI external-validation coverage.

Source: [AuntMinnie](https://www.auntminnie.com/imaging-informatics/artificial-intelligence/article/15671429/5-factors-to-consider-when-validating-radiology-ai)

### Northwell study of 32,501 real-world CTPAs: Aidoc PE tool 97.8% concordant with radiologists but missed 15% of confirmed PEs  (research, updated 2026-06-04)
A Radiology: Artificial Intelligence study from Northwell Health evaluated a commercial Aidoc pulmonary embolism algorithm on 32,501 CT pulmonary angiograms performed across the health system over 18 months. Overall AI-radiologist agreement was 97.8%, higher for negative exams (98.18%) than positive ones (93.75%). In adjudicated disagreements radiologists were correct in 88.7% of cases, and 15% of confirmed PEs were missed by the AI but caught by radiologists. With AI output available to radiologists, combined sensitivity for PE reached 99.2%.

**Take.** This is the deployment-evidence pattern that matters: headline concordance looks excellent, but the discordant cases break heavily toward the radiologist, and a 15% AI miss rate on confirmed PEs rules out autonomous triage-out. The data support AI as a second read with mandatory human overread, and any governance program should be auditing exactly this disagreement structure.

**Changelog**
- 2026-06-04 added: Surfaced via Perplexity scan (PE/stroke/ICH accuracy query); date and figures verified against Neiman HPI press release.

Source: [Harvey L. Neiman Health Policy Institute press release](https://www.neimanhpi.org/press-releases/ai-for-pulmonary-embolism-detection-matches-radiologists-in-97-8-of-32000-real%E2%80%91world-ct-angiograms/)

### FDA 510(k) clears Philips Elevate Plus AI upgrade for EPIQ Elite and Affiniti ultrasound, including Koios AI for Bi-RADS/Ti-RADS lesion classification  (regulatory, updated 2026-06-03)
Philips received FDA 510(k) clearance for its Elevate Plus AI upgrade on the EPIQ Elite and Affiniti general-imaging ultrasound platforms. The release bundles multiple AI components under a single clearance: Auto Measure Abdomen (vendor-reported >93% accuracy), claimed up to 30% faster scanning, Koios AI for Bi-RADS and Ti-RADS classification of breast and thyroid lesions, and advanced visualization (XRes Pro+, Super Res MVI Pro). Surfaced via trade-press coverage on X dated June 2, 2026.

**Take.** Bundled-vendor clearances ship measurement automation and classification decision support under one 510(k) wrapper, with site-level validation typically deferred to operators. Hospitals should ask Philips for per-component validation data (especially Koios Bi-RADS/Ti-RADS performance on the institution's patient panel), the labeled-indication boundaries, and the Predetermined Change Control plan governing post-market modifications to any AI component.

**Changelog**
- 2026-06-03 added: Surfaced via Grok-X scan on FDA AI imaging clearance in the past 48 hours.

Source: [X / @MarcJacksonLA](https://x.com/MarcJacksonLA/status/2061819203775275170)

### UCLA external validation of ensemble mammography AI: lower AUROC and significant subgroup disparities in Hispanic women and women with prior breast cancer  (research, updated 2026-06-02)
A JAMA Network Open study externally validated an ensemble deep-learning mammography model derived from the DREAM Mammography Challenge on 37,317 exams from 26,817 women in a diverse UCLA screening cohort (2010-2020). Overall AUROC was 0.85 (95% CI 0.84-0.87), materially lower than prior external sites (Kaiser Permanente Washington AUROC 0.90; Karolinska Institute 0.92). When combined with radiologists, sensitivity dropped to 0.596 versus radiologists' 0.850 in women with prior breast cancer, and specificity fell in Hispanic women (0.894 vs 0.926). The authors attribute the gap to model underspecification and argue for population-specific fine-tuning and transparency before clinical adoption.

**Take.** An AI tool with a respectable headline AUROC can still systematically harm specific subgroups inside its deployment population. The deployment site, not the developer, is the only party positioned to detect this, and only if it stratifies its own validation by the demographics that match its panel.

**Changelog**
- 2026-06-02 added: Surfaced via Perplexity scan on radiology AI external validation.

Source: [JAMA Network Open (UCLA Medical Imaging Informatics)](https://mii.ucla.edu/external-validation-of-an-ensemble-model-for-automated)

### Mayo Clinic REDMOD AI detects pancreatic cancer on routine CT a median of ~16 months before clinical diagnosis  (research, updated 2026-06-02)
A multi-institutional validation of Mayo Clinic's REDMOD model, published in Gut in April 2026, reported 73% detection of pancreatic cancer on pre-diagnosis routine CT at a median of approximately 16 months before clinical diagnosis, nearly double radiologists' 39%. Performance was roughly three times better than radiologists on scans more than two years prior to diagnosis. The team is moving toward prospective trials.

**Take.** Longitudinal look-back AI is a different deployment context from same-session second read, with a different harm profile: incidental findings on years-old scans, anxiety, downstream work-up cost, and patient consent questions about retrospective re-analysis of prior imaging. Pilots need consent language and a defined work-up pathway in place before the model is allowed to flag historical exams.

**Changelog**
- 2026-06-02 added: Surfaced via Grok-X scan on radiology AI second-read validation.

Source: [Grok summary on X](https://x.com/grok/status/2061237995001307399)

### Johns Hopkins review: 81% of deep learning radiology algorithms degrade on external validation  (research, updated 2026-06-02)
A Johns Hopkins review of 86 deep learning radiology algorithms found that 81% showed reduced diagnostic accuracy on external datasets compared to internal data, with 49% showing at least a modest decline and 24% a substantial decline. The authors note that external datasets may over- or under-represent key features and may not reflect the realistic target patient population, contributing to performance shifts.

**Take.** Internal-test AUC is a sales document. The procurement question is the gap between internal-test and external-validation performance and whether the vendor will share both. If they will not, assume the worst end of the distribution and price the risk into the contract or pass on the tool.

**Changelog**
- 2026-06-02 added: Surfaced via Perplexity scan on radiology AI external validation across patient populations.

Source: [Radiology Business (Johns Hopkins review coverage)](https://radiologybusiness.com/topics/artificial-intelligence/most-imaging-ai-algorithms-perform-unimpressively-external)
