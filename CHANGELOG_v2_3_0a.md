# MolPath Simulator v2.3.0a — Version Badge Hotfix

## Fixed
- Corrected the stale top-bar version badge that was still being reset to `v2.2.4o dMMR MSI-H Deep Dive 11 Translation`.
- Neutralized the legacy v2.2.4c UI-residue MutationObserver so it no longer overwrites the hero case-type badge.
- Top-bar badge is now stabilized at `v2.3.0`.
- Hero badge remains controlled by the v2.3.0 UI-polish logic (`Deep Dive`, `Signature Case`, `MTB Case`, `LAB Case`, `RES Case`, `Methods Case`).

## Scope
- Runtime/content logic unchanged.
- Translation payloads unchanged.
- Case, score, course and report logic unchanged.
- Exactly two lines changed relative to the v2.3.0 UI-polish build.
