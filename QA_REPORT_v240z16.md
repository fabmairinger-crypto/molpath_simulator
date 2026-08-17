# QA Report — MolPath Simulator v2.4.0z16

**Base:** v2.4.0z15  
**Target case:** `MET_NGS_003_v1_0`  
**Result:** PASS

## Static QA
- New runtime module passes JavaScript syntax validation (`node --check`).
- All 9 runtime asset references resolve to valid PNG files.
- `index.html` contains exactly one z16 module hook after the z15 NSCLC_002 module.
- Diff against the reconstructed v2.4.0z15 `index.html` is limited to the z16 script hook.
- The two rejected duplicate H&E generations are not included in the patch.

## Case-local runtime-stub QA
- No work-up: all four core groups remain missing.
- `erbb2_variant_ngs` only: case remains partial; variant viewer + NGS VUS report render; no IHC/FISH/curation/integrated report leaks.
- `broad_pan_panel` correctly satisfies the variant-assessment group.
- `her2_ihc` only: only the HER2-IHC asset is revealed.
- `her2_fish` only: only the FISH asset is revealed.
- `vus_literature_review` only: curation workspace renders, but integrated report remains hidden.
- `direct_her2_therapy` alone does not complete the case and generates an overcalling warning rather than positive evidence.
- Variant assessment + HER2-IHC + HER2-FISH + VUS curation: complete result; integrated MTB report is revealed.

## Regression scope
- New logic is guarded by `activeCase.id === "MET_NGS_003_v1_0"`.
- Existing z13/z14/z15 Flagship modules are not modified.
- Existing assets are not modified or deleted.
