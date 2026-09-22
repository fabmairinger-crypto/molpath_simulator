# MolPath Simulator — CNS/HEM Story/Deep-Dive i18n Consolidation

Patch: `v2.6.0-rc1+CNS_HEM_STORY_DEEPDIVE_I18N01`  
Base: `v2-6-0_rc1_v2.zip`

## Added
- Exact i18n coverage for the verified new Story/Deep-Dive source strings of `MTB_CNS_003` and `MTB_HEM_001`.
- 198 unique German source strings consolidated across all ten non-DE locales.
- 1,968 previously missing locale entries added.
- Existing exact translations are protected and are not overwritten at runtime.

## Intentionally unchanged
- Case JSON/data and both case-upgrade scripts.
- `i18n/core.js`, `i18n/languages.js`, legacy resolver files.
- Signature taxonomy and render-loop/root-cause-fix logic.
- Scoring, course membership and all assets.
- 22 new asset captions remain outside this Story/Deep-Dive-only scope.
