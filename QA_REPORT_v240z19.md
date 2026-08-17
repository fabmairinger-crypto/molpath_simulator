# QA Report — MolPath Simulator v2.4.0z19

**Base:** v2.4.0z18  
**Target case:** `MTB_CNS_001_v1_0`  
**Result:** PASS (static + case-local runtime-stub QA; browser smoke environment-inconclusive)

## Static QA
- `v240z19_cns001_flagship.js` passes `node --check`.
- Exactly 10 approved CNS assets are referenced; all resolve as valid PNG files.
- All 10 CNS asset SHA256 hashes are unique.
- No new CNS asset hash collides with any pre-existing package PNG asset.
- `index.html` contains exactly one z19 module hook and loads it after z18.
- Diff against the pristine z18 `index.html` is exactly one blank line, one z19 comment and one external-script hook.
- The runtime module is strictly guarded to `MTB_CNS_001_v1_0`.
- No CRC/BRAF/MMR/BRCA/OVAR foreign-marker terms occur in the z19 runtime module.

## Runtime-stub QA
- Intake: referral only.
- History: MRI only.
- Histology: H&E overview + detail + Ki-67 exactly once.
- Material: no Flagship asset block, preventing duplicate baseline rendering.
- `tmb_msi_neuro` alone: reveals no positive Flagship evidence.
- `idh1_ihc_seq`: reveals IDH report only.
- `glioma_ngs_panel` or `broad_pan_panel`: reveals glioma NGS report.
- `mgmt_methylation`: reveals MGMT report.
- Classifier alone: visual classifier asset remains hidden because the approved image text also mentions NGS and MGMT findings.
- Classifier + NGS + MGMT: classifier asset becomes visible.
- Report stage never renders the integrated final report.
- MTB before finalization never renders the integrated final report.
- Final report requires explicit IDH-specific testing, NGS, MGMT, classifier and `state.finalized`.
- A distractor test is not an unlocking criterion and cannot reveal later assets by itself.
- Non-target case rendering is unchanged in the runtime-stub regression test.

## Existing logic preserved
The z19 module does not replace `allowed_tests`, `required_groups`, `missingTests`, `buildReport`, scoring, or Deep-Dive content for CNS_001. It wraps only the visual render surfaces and the version stamp.

## Browser smoke note
The container's Headless Chromium failed to return a DOM dump within the test window (including a minimal harness) and emitted environment/DBus errors. This is recorded as environment-inconclusive rather than an application failure. The same overall large-bundle browser timeout behavior was already documented for z18.
