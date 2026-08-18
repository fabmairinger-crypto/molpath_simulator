# MolPath Simulator v2.5.0b — Russian locale (1/8)

Patch-only language pack for Russian (`ru`, LTR).

## Files
- `i18n/ru.js` — Russian locale (13,353 message entries; 13,328 active runtime source strings + 25 dynamic template patterns; 41 namespace strings).
- `i18n/languages.js` — v2.5.0b registry plus `{code:'ru', label:'Русский', dir:'ltr', file:'ru.js'}`.
- `i18n/core.js` — generic dynamic-template fallback required for new registry-driven locales. Existing distinct legacy/contextual translations retain precedence.
- `QA_RU_1of8_v250b.json` — automated QA report.

No case logic, scoring, assets, or scientific case content structure is changed.

Browser smoke navigation was attempted but is blocked by the execution environment (`ERR_BLOCKED_BY_ADMINISTRATOR`); this is not reported as a browser PASS. Runtime VM and syntax/integrity checks are included in the QA report.
