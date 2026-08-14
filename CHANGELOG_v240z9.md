# MolPath Simulator v2.4.0z9 — RES T3 i18n

Base: **v2.4.0z8**

## Changed
- Completed multilingual localization for RES D3: `RES_ETH_001`, `RES_ETH_002`, `RES_ETH_003`, `RES_DATA_001`, `RES_AI_001`.
- `RES_ETH_001` already had complete Signature localization and is preserved unchanged.
- Newly localized in this patch: `RES_ETH_002`, `RES_ETH_003`, `RES_DATA_001`, `RES_AI_001`.
- Languages: DE master + EN / RO / EL / ES / FR.
- Translation layer only; no case logic, scoring, gates, registry, Deep-Dive or Signature changes.
- Version stamp updated to v2.4.0z9.

## QA
- Exact-source translation dictionaries merged without intra-T3 collisions.
- T3 block inserted at the real document end (not inside report template strings).
- Inline JavaScript syntax checked separately.
- Expected status remains 91/91 Deep Dive and 15/15 Signature.
