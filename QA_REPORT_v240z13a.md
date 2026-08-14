# QA – v2.4.0z13a CRC_002 duplicate-evidence hotfix

Static checks:
- `assayEvidence()` remains the single test-gated evidence renderer.
- `renderReport()` contains one evidence injection.
- `renderMtb()` contains one evidence injection.
- `v17DebriefBlock()` contains no evidence injection.
- MMR / MSI / MLH1 / BRAF gating logic unchanged.
- Version stamp updated to v2.4.0z13a.

Expected runtime behavior:
- Each selected/performed assay snapshot appears once.
- Debrief does not repeat laboratory snapshots beneath the first evidence block.
