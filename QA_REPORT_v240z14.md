# QA Report — MolPath Simulator v2.4.0z14

## Scope
`MTB_CRC_001` flagship upgrade on base `v2.4.0z13a`.

## Static checks
- `v240z14_crc001_flagship.js`: **PASS** (`node --check`).
- `index.html` includes `v240z14_crc001_flagship.js`: **PASS**, exactly once.
- CRC_002 flagship script remains loaded before CRC_001: **PASS**.
- References to the four obsolete CRC_001 dashboard assets in active `index.html` / `*.js`: **0**.
- All nine new asset files present: **PASS**.
- Approved asset SHA-256 hashes preserved exactly: **PASS**.
- Image decode/integrity check: **PASS**.

## Runtime logic harness
The actual CRC_001 flagship runtime was executed in a Node VM test harness with the simulator's CRC marker-completeness semantics.

### Pre-test state
- Requisition, CT, H&E overview and H&E zoom available: **PASS**.
- Molecular result asset leakage before testing: **NONE / PASS**.
- Patient normalized to 58-year-old female, sigmoid primary: **PASS**.

### Path A — dedicated assays
Selected: `mmr_ihc`, `msi_pcr_ngs`, `ras_panel_crc`, `braf_v600e_crc`, `mlh1_methylation`.
- Missing required markers: **none**.
- Case state: **complete**.
- MMR, RAS, BRAF-qPCR, MSI and MLH1 assets shown: **PASS**.

### Path B — Colon NGS for RAS+BRAF
Selected: `mmr_ihc`, `msi_pcr_ngs`, `colon_ngs_panel`, `mlh1_methylation`.
- Missing required markers: **none**.
- Case state: **complete**.
- Extended RAS result recognized from NGS: **PASS**.
- BRAF V600E result recognized from NGS: **PASS**.
- False qPCR screenshot shown for NGS-derived BRAF: **NO / PASS**.
- NGS-specific BRAF result representation shown: **PASS**.

### Path C — broad panel for RAS+BRAF
Selected: `mmr_ihc`, `msi_pcr_ngs`, `broad_pan_panel`, `mlh1_methylation`.
- Missing required markers: **none**.
- Case state: **complete**.
- False qPCR screenshot shown: **NO / PASS**.

## Browser smoke test
A full Chromium navigation smoke test could not be completed in the current execution environment because local/file navigation is blocked by administrator policy (`ERR_BLOCKED_BY_ADMINISTRATOR`). Static syntax, file-integrity and runtime-logic tests above completed successfully. Final visual smoke testing should therefore be performed in the normal simulator browser after patch application.
