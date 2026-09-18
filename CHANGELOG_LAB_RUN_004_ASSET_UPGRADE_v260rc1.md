# LAB_RUN_004 Asset / Story / i18n Upgrade — v2.6.0-rc1

Patch ID: `v2.6.0-rc1+LAB_RUN_004_ASSET01_I18N`

## Scope
- Adds seven curated synthetic training assets for `LAB_RUN_004_v1_3`.
- Canonicalizes the base case to the existing curated risk-based lot-verification story.
- Aligns the Deep-Dive outcome with the new all-PASS verification dataset: the low-VAF boundary range is concordant and the new lot is formally released.
- Adds translations for every newly introduced/changed runtime story string and asset caption in EN, RO, EL, ES, FR, RU, TR, AR, FA and UK. Existing unchanged LAB_RUN_004 translations are preserved.
- Does not change Signature taxonomy, course membership or global scoring weights.

## Final didactic sequence
1. Initial lot-change situation / change control.
2. Risk-based verification plan (12 libraries; replication concentrated in the low-VAF control).
3. Predefined control materials and target values.
4. Run-QC comparison old vs new lot.
5. Variant/CNV concordance including 3/3 low-VAF detection.
6. Formal acceptance checklist and lot release.
7. Change-control close-out and traceability/audit trail.

## Core message
Lot verification is neither reflex full revalidation nor simple incoming-goods inspection. It is a predefined, risk-based local confirmation of continued assay performance before routine release. If all acceptance criteria are met and no relevant deviation exists, formal lot release is appropriate and a CAPA is not automatically required.

## i18n note
The simulator's dynamic story/caption text is synchronized across all 11 locales. The seven PNG assets are rasterized German training documents and do not dynamically change language; per-language raster assets would be a separate expansion project.
