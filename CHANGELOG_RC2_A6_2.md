# MolPath rc2-clean — A6.2 Registry/Data-Authority Flatten

**Date:** 2026-10-01  
**Base:** working A6.1 integration candidate (browser smoke passed by user)  
**Status:** integration candidate — static/Node QA PASS, short browser smoke still required

## Scope
First conservative retirement tranche after A6.1. No case story, Deep-Dive payload, asset renderer, scoring logic or i18n payload is deleted in this step.

## Changes
1. Removed the obsolete 91-row `V240Z12_META` table from `index.html`.
   - Its writer was already source-disabled in A6.1.
   - The compatibility/version wrapper remains; it no longer owns data.
2. Flattened `COURSES_V16`.
   - Removed the legacy 5-course literal from the monolithic runtime.
   - `rc2_A5_courses.js` now loads before the legacy course runtime and is the single course registry authority.
   - `COURSES_V16` is a mutable compatibility clone of that canonical registry.
3. Flattened Methods Focus registry.
   - Removed the duplicate 44-case `REGISTRY` from `v250b_method_focus_filter.js`.
   - `rc2_A5_method_focus.js` loads immediately before the filter UI.
   - The filter/UI runtime now reads the canonical registry.
4. Updated A6 integration diagnostics to assert:
   - z12 writer disabled,
   - z12 legacy table absent,
   - Methods Focus registry is canonical,
   - 91 cases / 91 Deep Dives / 5 courses / 23 course cases / 30 signatures retain parity.

## Deliberately NOT changed
The persistent/hybrid writers in `v240z13`, `z14`, `z15`, `z16`, `z18` and `z20` remain loaded. They mix semantic case updates with language-/presentation-/report logic. The legacy v223/v224 language wrappers likewise remain. They will be source-split before any removal.

## Size effect
- `index.html`: 4,138,852 -> 4,129,452 bytes (9,400 bytes removed)
- `v250b_method_focus_filter.js`: 18,752 -> 12,094 bytes (6,658 bytes removed)

This step is intentionally small: it removes only authorities for which exact canonical parity has already been proven.
