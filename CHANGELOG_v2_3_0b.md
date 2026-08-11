# MolPath Simulator v2.3.0b — Signature → Deep Dive Expansion

## Added
- `MTB_CNS_001_v1_0` promoted from Signature Case to full German Deep Dive.
- `LAB_DOC_001_v1_0` promoted from Signature Case to full German Deep Dive.
- `RES_OMICS_001_v1_0` promoted from Signature Case to full German Deep Dive.
- `RES_ETH_001_v1_0` promoted from Signature Case to full German Deep Dive.

## Curated Deep-Dive content
Each case now provides the existing v1.7 Deep-Dive runtime schema: opening scene, case briefing, context cards, pre-results, constraints, upgraded reasoning gates, decision task, expected path, acceptable alternatives, low-value traps, critical twist, result packages, follow-up logic, debrief, instructor notes and report additions.

### LAB_DOC_001 teaching logic
- The weak patient sample is **not automatically repeated**.
- When identity, SOP/lot metadata, controls, raw data, Ct/replicates and analytical validity can be reconstructed, the sample can be released after documented professional reassessment.
- The documentation failure remains a relevant deviation/Near Miss. Because the case reveals a systemic documentation weakness, Root Cause analysis, CAPA and an effectiveness check are still required.
- This explicitly teaches risk-based QM: analytical validity and process conformity are separate questions.

## Preserved
- All 91 base cases and IDs.
- Existing case engines and base-case decision logic.
- Method Rules.
- Score Caps.
- Course logic and progress.
- Existing 11 Deep Dives.
- Reports and exports.
- Existing UI/i18n system.

## i18n scope
- New Deep-Dive content is intentionally curated in **German only**.
- Existing translations for the four base/signature cases remain unchanged.
- Translation of the new Deep-Dive layer is deferred until content freeze.

## Release scope
- Base: v2.3.0a (`index.html` SHA256 `34bd88417daa91e8c4067b1d8df6e5105200264299a40cbdd6e90c4917c93944`).
- Changed runtime file: `index.html` only.
- No assets generated or added.
