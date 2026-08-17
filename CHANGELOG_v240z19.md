# MolPath Simulator v2.4.0z19 — MTB_CNS_001 Flagship

**Base:** v2.4.0z18  
**Scope:** `MTB_CNS_001_v1_0` only — premium / flagship visual integration with strict assay gating. The pre-existing Deep-Dive, scoring, required-group and case-completion logic remain unchanged.

## Changes
- Upgraded `MTB_CNS_001` to the established Flagship presentation level with exactly ten approved synthetic assets:
  1. neurochirurgical referral / diagnostic request,
  2. preoperative brain MRI,
  3. H&E overview,
  4. H&E detail with microvascular proliferation,
  5. Ki-67 / MIB-1 IHC (~35%),
  6. IDH1 R132H IHC + IDH1/2 sequencing report,
  7. glioma DNA-NGS report,
  8. MGMT promoter methylation report,
  9. CNS DNA-methylation classifier report,
  10. integrated neuropathology final report.
- Locked the visual case identity to the approved findings:
  - male, 68 years, left temporoparietal high-grade glial tumour;
  - block T3, tumour cell content ~80%;
  - Ki-67 ~35%;
  - IDH1 R132H IHC negative and IDH1/2 wildtype;
  - TERT promoter `c.-124C>T (C228T)`, VAF 35% in the NGS asset;
  - high-level EGFR amplification, copy number ~21.3;
  - MGMT promoter methylated, mean methylation 28%;
  - methylation classifier: Glioblastom / Glioblastoma, IDH-wildtype, calibrated score 0.98.

## Asset gating
- Intake: referral document only.
- History: MRI only.
- Histology: H&E overview + H&E detail + Ki-67.
- `idh1_ihc_seq`: IDH diagnostic report.
- `glioma_ngs_panel` or `broad_pan_panel`: glioma DNA-NGS report.
- `mgmt_methylation`: MGMT methylation report.
- CNS classifier image is shown only after `cns_methylation_classifier` **and** NGS **and** MGMT are present, because the approved classifier image's interpretation explicitly references TERT/EGFR and MGMT. This prevents result leakage when the classifier is ordered earlier.
- Integrated final report is shown only after true case finalization and explicit evidence for IDH-specific testing + NGS + MGMT + classifier, because the approved final image contains all four evidence layers.
- `tmb_msi_neuro` and other non-corresponding choices never unlock positive Flagship evidence.

## Unchanged
- Existing `MTB_CNS_001` `allowed_tests`, `required_groups`, result-section logic, Deep-Dive content and scoring.
- Global timeline, navigation, localization framework and Signature membership.
- All z13–z18 Flagship modules and assets.
- All non-`MTB_CNS_001` cases.

## Version
- Version stamp updated to **v2.4.0z19** through the final-loaded case-local runtime module.
