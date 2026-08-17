# MolPath Simulator v2.4.0z17 — MTB_OVAR_001 Flagship

**Base:** v2.4.0z16  
**Scope:** `MTB_OVAR_001_v0_7` only — premium / flagship asset integration on top of the existing two-round OVAR artifact workflow.

## Changes
- Upgraded `MTB_OVAR_001` to the established Flagship presentation level without replacing the existing two-round case logic.
- Added ten approved synthetic assets:
  1. oncology / MTB clinical letter,
  2. CT abdomen/pelvis recurrence snapshot,
  3. H&E overview,
  4. H&E zoom,
  5. PAX8 / WT1 / p53 / p16 IHC panel,
  6. tumour BRCA/HRR NGS report,
  7. HRD / genomic-scar gray-zone report,
  8. FFPE artifact/QC workspace,
  9. liquid-biopsy BRCA1 confirmation report,
  10. integrated molecular / MTB final report.
- Added progressive evidence gating matching the existing OVAR workflow:
  - clinical letter is baseline intake evidence;
  - CT recurrence snapshot is baseline clinical-history evidence;
  - H&E overview, H&E zoom and IHC are baseline pathology evidence;
  - tumour BRCA/HRR NGS appears only after `tumor_brca_hrr` in round 1;
  - HRD/genomic-scar report appears only after `hrd_score` in round 1;
  - FFPE artifact/QC workspace appears only after both round-1 core tests are present;
  - liquid-biopsy report appears only after `liquid_biopsy` in round 2;
  - integrated final report appears only after successful round-2 confirmation and transition to final MTB.
- Preserved the critical error path: accepting the artifact-suspicious old FFPE result early never reveals liquid-biopsy evidence or the integrated final report.
- Added localized Flagship captions for DE / EN / RO / EL / ES / FR.
- Version stamp updated to **v2.4.0z17**.

## Explicitly excluded
The following discarded generations are not part of this build and are not referenced by runtime code:
- erroneous BRAF V600 qPCR image,
- erroneous MLH1-promoter methylation image,
- unapproved duplicate/intermediate BRCA/HRR generation.

## Unchanged
- Existing OVAR phase logic, scoring and round-transition mechanics remain intact.
- No global scoring-model rewrite.
- No changes to Signature membership, global navigation, course structure or other cases.
- Existing z13–z16 Flagship modules and existing assets are not modified or deleted.
