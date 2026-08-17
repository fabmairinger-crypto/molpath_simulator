# QA Report — MolPath Simulator v2.4.0z20

**Base:** v2.4.0z19  
**Target case:** `MTB_IO_001_v1_0`  
**Result:** PASS (static + deterministic case-local runtime-stub QA; browser smoke environment-blocked/inconclusive)

## Static QA
- `v240z20_io001_flagship.js` passes `node --check`.
- Exactly 9 approved IO_001 assets are referenced and all resolve as valid PNG files.
- All 9 new asset SHA256 hashes are unique.
- No new IO_001 asset hash collides with a pre-existing package PNG asset.
- `index.html` contains exactly one z20 hook, loaded after z19 and immediately before the real final `</body></html>`.
- Diff against the pristine z19 `index.html` is limited to the final z20 external-script hook.
- The runtime layer is strictly guarded to `MTB_IO_001_v1_0`.
- No BRAF/RAS/MLH1-methylation/BRCA/MGMT/IDH/ALK/EGFR foreign-case marker logic is present in the z20 runtime layer.

## Runtime-stub QA
- Non-target case content/report/MTB wrappers are unchanged.
- Intake shows the gyn-oncology referral once.
- Histology shows exactly the two baseline H&E assets; no result asset leaks there.
- Material step adds no duplicate Flagship asset block.
- Deep-Dive pre-test presentation is the 66-year-old woman with recurrent endometrioid endometrial carcinoma, not the legacy 63-year-old male/CUP story.
- Pre-test Deep-Dive text no longer states the specific MSH2/MSH6 result before test generation.
- MMR, CD3/CD8, MSI, TMB and PD-L1 visual assets are independently gated.
- `broad_pan_panel` unlocks MSI and TMB only; it does not unlock MMR, PD-L1 or CD3/CD8.
- Report stage never renders the integrated final image.
- Core completion (MMR + MSI + TMB) remains unchanged.
- Because the approved final image itself visibly contains PD-L1 and CD3/CD8 results, the integrated image is intentionally stricter than core completion and requires all five visible evidence layers plus `state.finalized`.
- Before finalization, the integrated image is hidden.
- Exact textual result values are aligned to the approved visual evidence: MSH2/MSH6 loss, MSI-H 8/9 unstable markers / score 0.70, TMB 23.4 Mut/Mb, PD-L1 CPS 5, TIL-/CD8-rich pattern.

## Asset-path / duplicate QA
- All nine paths under `assets/mtb_io_001/` exist and are valid PNGs.
- Each asset is referenced through one case-local constant and rendered through one gate path.
- No copied CRC/BRAF/MLH1 or other foreign Flagship asset path occurs in z20.
- No duplicate rendering path was introduced for baseline or molecular result assets.

## Existing logic preserved
The z20 layer does not replace the existing core `allowed_tests`, required completion groups, scoring model or finalization action. It only:
1. aligns the visible IO_001 case identity with the current curated Deep-Dive story,
2. removes pre-result text leakage,
3. refines result wording to the approved asset values,
4. adds strictly gated visual evidence.

## Browser smoke note
Headless Chromium is installed, but the execution environment blocks navigation to both localhost and local `file://` pages with `ERR_BLOCKED_BY_ADMINISTRATOR`. This is recorded as environment-inconclusive rather than an application failure.
