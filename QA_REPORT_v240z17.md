# QA Report — MolPath Simulator v2.4.0z17

**Base:** v2.4.0z16  
**Target case:** `MTB_OVAR_001_v0_7`  
**Result:** PASS (static + case-local runtime-stub QA)

## Static QA
- New runtime module passes JavaScript syntax validation (`node --check`).
- All 10 referenced OVAR asset paths resolve to valid PNG files.
- `index.html` contains exactly one z17 module hook after the z16 `MET_NGS_003` module.
- Diff against the original v2.4.0z16 `index.html` is limited to the z17 script hook.
- The new module is guarded by `activeCase.id === "MTB_OVAR_001_v0_7"`.
- No BRAF or MLH1 asset is referenced by the OVAR flagship module.
- The discarded BRAF, MLH1 and unapproved intermediate generations are absent from `assets/mtb_ovar_001/`.

## Case-local runtime-stub QA
- Intake: oncology/MTB letter visible; CT remains hidden.
- History: CT recurrence snapshot visible.
- Histology: H&E overview + H&E zoom + PAX8/WT1/p53/p16 IHC visible.
- Material page: no duplicate baseline asset block.
- Round 1, `tumor_brca_hrr` only: tumour BRCA/HRR NGS visible; HRD and FFPE-QC hidden.
- Round 1, `hrd_score` only: HRD report visible; tumour NGS and FFPE-QC hidden.
- Round 1, both core tests: tumour NGS + HRD + FFPE artifact/QC visible.
- Round 2, `liquid_biopsy`: liquid-biopsy confirmation visible; integrated final report still hidden.
- Early/incorrect `accepted_bad` path: integrated final report remains hidden.
- Final phase after liquid-biopsy confirmation: integrated MTB report visible.
- Non-OVAR case: wrapped render output is unchanged.

## Regression scope
- Existing OVAR two-round phase mechanics remain owned by the pre-existing v2.1.3/v2.1.6 workflow layer.
- Existing z13/z14/z15/z16 Flagship modules are not modified.
- Existing assets are not modified or deleted.

## Browser smoke note
A full Chromium `--dump-dom` smoke run of the ~15 MB single-page app did not complete within the restricted headless timeout in this build environment; no browser exception was captured before timeout. Runtime behavior is therefore certified by syntax/static checks plus the case-local stub tests above.
