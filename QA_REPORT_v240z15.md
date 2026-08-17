# QA Report — MolPath Simulator v2.4.0z15

**Base:** v2.4.0z14a  
**Target case:** `MTB_NSCLC_002_v1_3`  
**Result:** PASS

## Static QA
- New runtime module passes JavaScript syntax validation (`node --check`).
- All 9 referenced NSCLC_002 assets exist at the exact runtime paths.
- `index.html` contains exactly one z15 module hook.
- Diff against the supplied v2.4.0z14a `index.html` shows only the intended z15 script inclusion.

## Case-local runtime-stub QA
Tested with mocked simulator state and the real z15 runtime module:
- No work-up: rebiopsy and broad resistance diagnostics remain missing.
- `rebiopsy_tissue + egfr_t790m_c797s`: partial result only; targeted EGFR report rendered; MET is not leaked.
- `rebiopsy_tissue + resistance_panel`: complete result; H&E, tissue NGS, MET CNV and integrated NGS assets rendered.
- `resistance_panel` without rebiopsy: no tissue MET result or MET image is exposed.

## Regression scope
- No existing Flagship JS file was modified.
- No existing asset was modified or deleted.
- No case outside `MTB_NSCLC_002_v1_3` is mutated by the new module.
