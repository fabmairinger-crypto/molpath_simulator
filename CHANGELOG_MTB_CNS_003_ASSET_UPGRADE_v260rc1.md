# MTB_CNS_003 Asset / Content Upgrade — v2.6.0-rc1

## Scope
Case-local upgrade of `MTB_CNS_003_v1_3` to the current high-production asset standard. No global simulator logic or taxonomy is changed.

## Added
- 7 synthetic case-specific training assets: referral, H&E overview, H&E detail, IHC panel, low-tumor B1 methylation result, tumor-rich B2 HGAP methylation result, integrated final report.
- Case-local runtime layer `v260rc1_mtb_cns_003_asset_upgrade.js`.

## Content alignment
- 47-year-old woman with a 3.8 cm left posterior-fossa tumor.
- B1: ~15% tumor, technically successful methylation array but no confident class assignment.
- B2: ~65% tumor, high-confidence methylation-class match to high-grade astrocytoma with piloid features (HGAP), calibrated score 0.96.
- Methylation-based CNV: homozygous 9p21/CDKN2A/B loss plus additional segmental alterations.
- Histology/IHC are framed as concordant integrated findings; the DNA methylation classifier is the decisive classification layer for the methylation-defined HGAP entity.
- No formal CNS WHO grade is assigned to HGAP.

## Didactic core
Technical assay QC does not equal diagnostic interpretability. Tumor fraction/material representativeness and classifier confidence are part of result release.

## Guardrails
- Final integrated image is shown only after finalization when both `cns_methylation_classifier` and `broad_pan_panel` have been selected, because the final asset contains molecular findings from both layers.
- Signature taxonomy is untouched.
- Course assignment is untouched.
- Global scoring/completion logic is untouched.

## Known polish notes intentionally accepted
- H&E-detail minimap is not pixel-identical to the overview slide.
- IHC EMA panel is educationally adequate but could be replaced later by an even more archetypal focal dot-like pattern without changing case logic.
- New asset-layer captions and the newly curated narrative are DE-master / English-asset content; no new translation audit is included in this patch.
