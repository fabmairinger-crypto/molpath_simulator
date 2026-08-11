# QA Report — MolPath Simulator v2.3.0b Signature → Deep Dive Expansion

## Build identity
- Base: **v2.3.0a**
- Base `index.html` SHA256: `34bd88417daa91e8c4067b1d8df6e5105200264299a40cbdd6e90c4917c93944`
- Patched `index.html` SHA256: `fa15c75c389e4c3b7a8aedb748d2b8b67a5768857a4aa64f12ff650f78a2319d`
- Changed runtime file: **`index.html` only**
- No assets added.

## Static/runtime-code QA
- Base executable script blocks: **30/30 syntax PASS**
- Patched executable script blocks: **31/31 syntax PASS**
- New `v230bSignatureDeepDiveExpansion` payload script: **syntax PASS**
- Patch isolation: **PASS** — removing the single new script block reproduces the v2.3.0a `index.html` byte-for-byte.
- Existing 91-case inventory preserved: **PASS**
- Existing 11 Deep Dives preserved: **PASS**
- Method Rules / Score Caps / Course logic / base-case decision engines: **unchanged by patch**

## Integration harness
A Node integration harness was run against mock copies of the established runtime registries (`DEEP_DIVE_CASES_V17`, `DEEP_DIVE_MAP_V17`, `cases`).

- Cases before/after: **91 / 91**
- Existing Deep Dives before: **11**
- Deep Dives after integration: **15**
- New case registrations: **4/4 PASS**
- `signature_case=true` and `deep_dive=true`: **4/4 PASS**
- Existing renderer-compatible `expected_path` arrays: **4/4 PASS**
- Integration triggers one final render: **PASS**

### Reasoning-gate counts
| Case | Gates |
|---|---:|
| `MTB_CNS_001_v1_0` | 3 |
| `LAB_DOC_001_v1_0` | 4 |
| `RES_OMICS_001_v1_0` | 4 |
| `RES_ETH_001_v1_0` | 4 |

## Content-specific QA
### `MTB_CNS_001_v1_0`
- Base details preserved: 68 years, subtotal resection, GBM morphology, Block T3, ~80% tumor, 14 sections.
- IDH / MGMT / methylation-classifier roles kept distinct.
- Twist explicitly demonstrates: broad DNA-NGS does **not** replace MGMT-promoter methylation.

### `LAB_DOC_001_v1_0`
- Approved teaching correction implemented exactly:
  - reconstruct first;
  - controls/raw data/sample identity/Ct-replicates remain traceable;
  - weak sample can be released after documented professional reassessment;
  - no reflex full-run repeat;
  - documentation defect remains a relevant deviation/Near Miss;
  - systemic weakness → Root Cause + CAPA + effectiveness check.
- Core teaching message: **analytical validity ≠ process conformity**.

### `RES_OMICS_001_v1_0`
- Existing 30-sample/200-DEG/TGFβ-ECM/antigen-presentation story preserved.
- Twist: best single discovery hit fails independent replication while the coordinated signature remains stable.

### `RES_ETH_001_v1_0`
- Existing 120-FFPE / inconsistent consent / material reserve / tumor-only germline-suspicion / Data-Sharing logic preserved.
- Twist uses the pre-planned incidental/germline-suspicion process instead of ad-hoc disclosure.

## i18n QA
- Existing translated Signature/Base-Case payloads are unchanged.
- New Deep-Dive layer is intentionally **German only** until content freeze.
- No new translation payload was generated in this patch.

## Browser smoke-test limitation
An automated visual/browser navigation smoke test could not be completed in this execution environment: navigation to both `file://` and loopback HTTP was blocked for Playwright, and Chromium `--dump-dom` did not complete within the test timeout.

Therefore the remaining manual regression after installation is:
1. Open the patched `index.html` locally.
2. Open each of the four promoted cases and verify the Deep-Dive opening/context/reasoning UI.
3. Open one pre-existing Deep Dive (e.g. `MTB_NSCLC_001_v0_6`) to confirm no renderer regression.
4. Optionally switch language once; base/signature translations should remain functional while the new Deep-Dive copy intentionally remains German until translation freeze.
