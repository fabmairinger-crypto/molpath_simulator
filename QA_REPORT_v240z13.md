# QA Report — MolPath Simulator v2.4.0z13

## Static / syntax QA
- Inline JavaScript blocks checked with `node --check`: **67 / 67 passed**.
- New v2.4.0z13 script standalone syntax check: **passed**.
- New Flagship script occurrence in `index.html`: **1**.
- New visual assets: **7 / 7 present and valid PNG** (1400 × 850 px).
- No new `MutationObserver`, `setInterval` or polling loop in the z13 layer.

## Signature QA
- Canonical expected Signature set: **15**.
- z12 metadata audit contained **14 yes + 1 erroneous no** (`MET_NGS_003_v1_0`).
- z13 audit artifact now contains **15 yes**.
- Runtime z13 layer explicitly restores Signature metadata for `MET_NGS_003_v1_0`.

## Content / behavior QA
- B01 cases: `MTB_CRC_001_v0_6`, `MTB_CRC_002_v1_3`.
- Base Deep-Dive payloads remain unchanged.
- Base scoring and reasoning gates remain unchanged.
- Global premium timeline remains unchanged.
- Assessment mode: post-result / interpretive premium evidence is gated until case completion.
- `MTB_CRC_002`: MMR-IHC stays visible before completion because it is an explicit pre-existing finding in the case briefing.
- Responsive breakpoint included for cockpit, decision frame and media grid.

## Runtime-browser note
The environment blocked local Chromium/Playwright navigation by administrator policy, so visual runtime QA could not be automated here. Static JS parsing, asset validation and wiring checks passed; the patch should still receive the normal local application smoke test after installation.
