# QA Report — MolPath Simulator v2.4.0z18

**Base:** v2.4.0z17  
**Target case:** `MTB_OVAR_002_v1_3`  
**Result:** PASS (static + case-local runtime-stub QA)

## Static QA
- `v240z18_ovar002_flagship.js` passes JavaScript syntax validation (`node --check`).
- All 10 referenced OVAR_002 assets resolve and validate as PNG files.
- All 10 approved assets have unique SHA256 hashes.
- Hash comparison against all locally available explicitly rejected generations shows **0 collisions**.
- `index.html` contains exactly one z18 module hook, loaded after the existing z17 OVAR_001 module.
- Diff against the pristine z17 `index.html` is exactly the single z18 external-script hook.
- The module is guarded to `MTB_OVAR_002_v1_3` and leaves non-target cases unchanged in the runtime-stub regression test.
- The actual package root is `v8/`; the z18 manifest uses `v8/...` paths, correcting the stale `v7/...` path convention present in the z17 manifest metadata.

## Case-logic QA
- Legacy `fusion_rna_ngs`, `rna_fusion_panel` and `fusion_fish` are removed from OVAR_002 `allowed_tests` and from required groups.
- Required evidence is now explicitly separated into tumour BRCA/HRR, VUS curation, HRD and germline/genetics context.
- The Deep-Dive placeholder `BRCA2 c.X p.Y` is replaced case-locally at runtime with `BRCA2 NM_000059.4:c.7007G>A, p.(Arg2336His)`.
- Canonical molecular values are locked in case-local report logic: BRCA2 VAF 48.1%, HRD score 30 / negative, germline heterozygous VUS, and pathogenic TP53 p.(Arg248Gln).

## Asset-gating QA
- Intake: pink referral form visible; no molecular result asset leaks.
- Histology: H&E overview + H&E detail + PAX8/WT1/p53/p16 IHC visible.
- Material: no duplicate Flagship asset block.
- Tumour BRCA/HRR only: initial tumour NGS + BRCA2 viewer visible; VUS-curation, HRD, germline and final assets hidden.
- `vusic` only: VUS-curation workspace visible; tumour-NGS asset remains hidden.
- `hrd_score` only: HRD-negative report visible; germline asset remains hidden.
- `germline_referral` only: germline report visible; HRD asset remains hidden.
- Complete test set at report stage: all five test-gated evidence assets visible, integrated final report still hidden.
- MTB before finalization: integrated final report hidden.
- True finalization after all four correct evidence layers: integrated final report visible.
- Persisted / erroneous legacy fusion selection: integrated final report remains hidden.

## Rejected-asset QA
The following are explicitly excluded from the package and runtime asset map:
- CRC/BRAF qPCR misgeneration,
- MMR/PMS2 misgeneration,
- wrong BRCA2 `c.7007A>G / p.Asn2336Ser` germline report,
- incorrect/non-integrated final attempts,
- discarded duplicate referral generation.

## Browser smoke note
A full Chromium `--dump-dom` run of the ~15 MB single-page app did not complete within the restricted 30-second headless timeout in the build environment. No application exception was captured before timeout. Runtime behavior is therefore certified here by syntax/static checks plus the passing case-local JavaScript runtime-stub tests, consistent with the QA strategy used for z17.
