# MolPath Simulator v2.4.0z15 — MTB_NSCLC_002 Flagship

**Base:** v2.4.0z14a  
**Scope:** `MTB_NSCLC_002_v1_3` only — premium / flagship upgrade.

## Changes
- Upgraded `MTB_NSCLC_002` to the established Flagship presentation level.
- Added nine approved synthetic assets:
  1. oncology / MTB request letter,
  2. CT progression comparison,
  3. external negative plasma-NGS / liquid-biopsy report with ctDNA <0.2%,
  4. liver rebiopsy H&E overview,
  5. liver rebiopsy H&E zoom,
  6. tissue resistance NGS report,
  7. MET CNV viewer,
  8. targeted EGFR T790M/C797S resistance report,
  9. integrated tissue NGS report.
- Added progressive evidence gating:
  - clinical letter, CT and the already existing external liquid-biopsy report are visible as baseline case evidence;
  - rebiopsy H&E assets appear only after `rebiopsy_tissue`;
  - the targeted EGFR report appears only after `rebiopsy_tissue` + `egfr_t790m_c797s`;
  - tissue NGS, MET CNV and integrated NGS appear only after `rebiopsy_tissue` + `resistance_panel`.
- Corrected the case-local completion logic so a narrow EGFR-only resistance assay no longer counts as a complete resistance work-up.
- Full completion now requires an informative tissue rebiopsy plus broad resistance testing (`rebiopsy_tissue` + `resistance_panel`).
- The targeted EGFR-only route remains a valid partial path: EGFR exon-19 deletion persists, T790M/C797S are negative, while MET/CNV and other bypass mechanisms remain unassessed.
- Full tissue work-up reveals persistent EGFR exon-19 deletion, no small-cell transformation and high-level MET amplification (training-case CN ~10.4).
- Added localized Flagship copy for DE / EN / RO / EL / ES / FR.
- Version stamp updated to **v2.4.0z15**.

## Unchanged
- No global scoring-model rewrite.
- No changes to other cases, Signature membership, global navigation or existing Flagship modules.
- Existing CRC_001 / CRC_002 Flagship behavior remains untouched.
