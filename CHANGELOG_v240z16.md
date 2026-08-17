# MolPath Simulator v2.4.0z16 — MET_NGS_003 Flagship

**Base:** v2.4.0z15  
**Scope:** `MET_NGS_003_v1_0` only — premium / flagship upgrade.

## Changes
- Upgraded `MET_NGS_003` to the established Flagship presentation level.
- Fixed the former placeholder variant at runtime to the synthetic case-consistent finding **ERBB2 c.2314G>T (p.L772P), VAF 18.4%, VUS**.
- Added nine approved synthetic assets:
  1. molecular pathology request form,
  2. oncology / MTB consultation letter,
  3. H&E liver metastasis / FFPE block L2,
  4. ERBB2 NGS variant viewer,
  5. molecular NGS VUS report,
  6. HER2 IHC 1+ report,
  7. HER2/ERBB2 FISH non-amplified report,
  8. variant curation & evidence workspace,
  9. integrated molecular pathology / MTB report.
- Added method-specific evidence gating:
  - request form, oncology letter and H&E are baseline case evidence;
  - variant viewer + NGS VUS report appear only after `erbb2_variant_ngs` or `broad_pan_panel`;
  - HER2 IHC appears only after `her2_ihc`;
  - HER2/ERBB2 FISH appears only after `her2_fish`;
  - evidence curation workspace appears only after `vus_literature_review`;
  - integrated MTB report appears only after all four core evidence groups are complete.
- Preserved the central teaching rule: a technically convincing ERBB2 variant remains **non-actionable while classified as VUS without corroborating predictive evidence**.
- `direct_her2_therapy` remains an explicit overcalling / wrong-decision path and never generates positive actionable evidence.
- Full completion requires variant assessment, HER2 IHC, HER2 FISH/ISH and curated VUS evidence review.
- Added localized Flagship copy for DE / EN / RO / EL / ES / FR.
- Version stamp updated to **v2.4.0z16**.

## Unchanged
- No global scoring-model rewrite.
- No changes to Signature membership, global navigation, course structure or other cases.
- No existing Flagship module or existing asset was modified or deleted.
- `MTB_NSCLC_002`, CRC Flagships and all LAB/RES Flagships remain untouched.
