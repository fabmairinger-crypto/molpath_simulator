# LAB_POST_001 Flagship Patch

Base: `MolPath Simulator v2-5-0b_HOME_TEST6_CENTRAL_I18N`

## Scope
- Upgrades `LAB_POST_001_v1_0` with 9 approved synthetic flagship assets.
- Preserves the existing v2.5.0b app version, scoring, decision options, reasoning gates, CAPA logic, audit logic and completion semantics.
- Adds media only through isolated wrappers around the existing LAB renderers.
- Keeps local image assets compatible with the v2.5.0b in-app asset modal.

## Progressive reveal
- `run_overview`: assets 1 + 5
- `qc_event`: asset 2
- `root_cause`: assets 3 + 4
- `capa`: assets 6 + 8
- after completion in `audit`: assets 7 + 9

## i18n
Adds the central `labPost001` locale namespace to DE/EN/RO/EL/ES/FR/RU/TR.

## Files
- New: `v250b_labpost001_flagship.js`
- New: `assets/lab_post_001/*.png` (9 files)
- Modified: `index.html` (one script include)
- Modified: eight central locale files (namespace addition only)
