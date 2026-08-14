# MolPath Simulator v2.4.0z10a — RES T4 Deep-Dive i18n hotfix

Base: **v2.4.0z10**

## Bug fixed
- v2.4.0z10 localized the D4 case-library/base-case layer, so navigation cards changed language, but it did not include the separate R4/R5 Deep-Dive override objects used inside the running cases.
- v2.4.0z10a adds the missing exact-source localization for the actual Deep-Dive content of:
  - `RES_PM_001`
  - `RES_PM_002`
  - `RES_ROLE_001`
  - `RES_GRANT_001`
  - `RES_IMPL_001`
  - `RES_TEAM_001`
- Covered visible layers include opening scene, project briefing, learning objectives, context cards, pre-results, constraints, reasoning gates, decision task, expected path, alternatives, traps, twist, result packages, follow-up, debrief and instructor notes.
- Languages: DE master + EN / RO / EL / ES / FR.
- Translation-only hotfix; no case logic, scoring, gates, registry, Deep-Dive or Signature changes.

## Coverage
- Actual D4 Deep-Dive visible-source strings per case: pm001=107, pm002=106, role001=105, grant001=108, impl001=106, team001=108.
- Unique exact-source entries added to the hotfix dictionary: 636 per target language.

## QA
- Hotfix script inserted at the real document end, outside report/template strings.
- Every inline JavaScript block syntax-checked independently with Node.
- ZIP integrity tested.
- Expected status remains **91/91 Deep Dive** and **15/15 Signature**.
