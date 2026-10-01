# CHANGELOG — MolPath rc2-clean A6.1 Canonical Integration Candidate

- Added canonical A4b/A5 data carriers and compatibility adapter to the runtime load chain.
- Restored the documented `v260rc1_case_consistency_curation_i18n.js` include immediately before final canonical integration / Signature Freeze.
- Added `rc2_A6_canonical_integration.js` to synchronise `cases`, all V15 maps/record arrays, Deep-Dive array/map and courses in-place from the canonical source.
- Disabled the persistent `v240z12` difficulty/time data writer source-level; retained its existing version/render wrapper.
- Kept `v250b_signature_taxonomy_freeze.js` as final layer.
- No historical runtime/data files removed in A6.1.
- QA: canonical data parity PASS; 91 cases, 91 Deep Dives, 5 courses, 23 unique course cases, 44 Methods Focus cases, 30 Signature cases, 12-case curation active.
- Stop-gate: full visual/runtime deletion phase deferred until complete legacy runtime can be exercised in a browser-equivalent environment.
