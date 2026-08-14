# MolPath Simulator v2.4.0z13a

Base: v2.4.0z13 CRC_002 Flagship patch

## Hotfix
- Fixed duplicate rendering of test-gated laboratory evidence assets in `MTB_CRC_002`.
- Root cause: the same `assayEvidence()` block was injected once into the report/MTB renderer and again inside the completed Deep-Dive debrief.
- Evidence assets now render exactly once in the report/MTB view.
- Deep-Dive debrief retains only integrated interpretation and key message.
- No changes to asset files, test gating, case decisions, scoring, result values, or completion logic.
