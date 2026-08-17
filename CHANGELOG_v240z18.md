# MolPath Simulator v2.4.0z18 — MTB_OVAR_002 Flagship

**Base:** v2.4.0z17  
**Scope:** `MTB_OVAR_002_v1_3` only — premium / flagship asset integration plus case-local removal of a legacy fusion-template residue.

## Changes
- Upgraded `MTB_OVAR_002` to the established Flagship presentation level while preserving the existing generic-patient / Deep-Dive workflow architecture.
- Added exactly ten approved synthetic assets:
  1. pink pathology / molecular-pathology referral form,
  2. H&E overview,
  3. H&E detail,
  4. PAX8 / WT1 / p53 / p16 IHC panel,
  5. initial tumour NGS report,
  6. BRCA2 variant-viewer snapshot,
  7. VUS curation workspace,
  8. HRD / genomic-scar negative report,
  9. germline BRCA2-VUS report,
  10. integrated molecular-pathology / MTB final report.
- Locked the case-wide molecular identity to:
  - `TP53 NM_000546.6:c.743G>A, p.(Arg248Gln)` — pathogenic / class 5;
  - `BRCA2 NM_000059.4:c.7007G>A, p.(Arg2336His)` — VUS / class 3, tumour VAF 48.1%;
  - HRD score 30, HRD-negative;
  - the same BRCA2 variant detected heterozygously in the germline while remaining a VUS.
- Replaced the visible Deep-Dive placeholder `BRCA2 c.X p.Y` case-locally with the locked BRCA2 HGVS.
- Removed the erroneous legacy fusion pathway from `MTB_OVAR_002` allowed / required case logic. The case now requires four independent evidence layers:
  - tumour BRCA/HRR (`tumor_brca_hrr` or `broad_pan_panel`),
  - VUS evidence curation (`vusic`),
  - HRD assessment (`hrd_score`),
  - germline / genetics context (`germline_referral`).
- Added strict progressive evidence gating:
  - referral form is baseline intake evidence;
  - H&E overview/detail and IHC are baseline histology evidence;
  - tumour NGS + BRCA2 viewer appear only after tumour BRCA/HRR testing;
  - VUS curation appears only after `vusic`;
  - HRD report appears only after `hrd_score`;
  - germline report appears only after `germline_referral`;
  - integrated final report appears only after all four correct evidence layers **and** true case finalization.
- Added guardrail for legacy/persisted fusion selections: a legacy fusion choice can never reveal the integrated final report.
- Added localized Flagship captions and case-local interpretation text for DE / EN / RO / EL / ES / FR.
- Version stamp updated to **v2.4.0z18**.

## Explicitly excluded
The following rejected generations are not copied into `assets/mtb_ovar_002/` and are not used as runtime asset paths:
- foreign CRC / BRAF qPCR generation,
- foreign MMR / PMS2 generation,
- incorrect BRCA2 germline generation with altered HGVS (`c.7007A>G`, `p.Asn2336Ser`),
- non-integrated / wrong final-report attempts,
- the accidentally generated duplicate referral document that was explicitly discarded during Asset 3.

## Unchanged
- Signature membership and global case-library/navigation logic.
- Global scoring architecture and Deep-Dive timeline implementation.
- Existing z13–z17 Flagship modules and their assets.
- All non-`MTB_OVAR_002` cases.
