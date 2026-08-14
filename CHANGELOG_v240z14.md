# MolPath Simulator v2.4.0z14 — MTB_CRC_001 Flagship

**Base:** v2.4.0z13a  
**Scope:** `MTB_CRC_001` only — premium / flagship upgrade.

## Changes
- Rebuilt `MTB_CRC_001` as a premium flagship case aligned with the established NSCLC and CRC_002 flagship presentation.
- Standardized the case identity to a **58-year-old female patient with a left-sided sigmoid adenocarcinoma and multiple liver metastases**.
- Kept morphology and molecular sampling coherent:
  - H&E: primary sigmoid carcinoma.
  - Molecular diagnostics: representative FFPE tissue from a liver metastasis (~45–50% tumor content).
- Added nine approved synthetic assets:
  1. pink molecular-pathology requisition form,
  2. staging CT,
  3. H&E overview,
  4. H&E zoom,
  5. 4-panel MMR IHC,
  6. extended RAS report,
  7. BRAF p.V600E qPCR result,
  8. 9-locus NGS MSI report,
  9. MLH1 promoter methylation qMSP report.
- Added strict progressive evidence gating: molecular result assets are only revealed after the corresponding test has been selected/performed.
- Preserved method correctness:
  - dedicated RAS + dedicated BRAF testing is a complete RAS/BRAF path;
  - `colon_ngs_panel` covering RAS+BRAF is equally complete;
  - `broad_pan_panel` covering RAS+BRAF is equally complete;
  - no extra PCR is required after an adequate NGS result.
- Prevented a method mismatch: the BRAF qPCR screenshot is shown only when the dedicated BRAF assay is used. When BRAF is obtained through NGS, the case renders an NGS-specific BRAF result card instead of a false qPCR image.
- Reworked case briefing, history, histology/material pages, report findings, clinical reasoning gates and debrief to the flagship presentation level.
- Retired the four previous CRC_001 dashboard-style assets. They are no longer referenced by the application and are listed in `DELETE_OBSOLETE_v240z14.txt` for physical cleanup.
- Version stamp updated to **v2.4.0z14**.

## Unchanged
- No global scoring model rewrite.
- No changes to other cases' content or flagship logic.
- No changes to CRC_002 assets/content.

## Physical cleanup
After copying the patch into the existing `v3` folder, `CLEANUP_OBSOLETE_v240z14.bat` can be run once on Windows to physically delete the four retired CRC_001 asset files. The application no longer references them even if they remain on disk.
