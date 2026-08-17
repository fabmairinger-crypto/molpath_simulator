# MolPath Simulator v2.5.0a — i18n Core Refactor

**Base:** v2.4.0z21  
**Date:** 2026-08-17  
**Scope:** i18n architecture only

## Invariants
- No case logic changes.
- No scoring changes.
- No test/order logic changes.
- No clinical/content edits.
- No asset changes.
- Existing languages remain DE / EN / RO / EL / ES / FR only.
- Responsive tablet/mobile CSS is byte-equivalent to v2.4.0z21.

## Audit of v2.4.0z21
- Runtime i18n core lived directly in `index.html` as `molpath-i18n-v220`.
- The core used a German-source-string dictionary (`DICT`) with 105 base keys for each target language EN/RO/EL/ES/FR.
- Language availability and labels were hard-coded in the core as `LANGS={de,en,ro,el,es,fr}`.
- The existing `i18n/` directory contained registry/catalog/glossary artifacts (`i18n_key_registry_v2_2_1`, `i18n_message_catalog_v2_2_1`, glossary, coverage/audit files), but these were not the sole runtime source.
- `window.MolPathTranslationRegistry` was runtime metadata (v2.2.1: 6029 keys / 3373 messages) rather than the primary lookup engine.
- Additional runtime translations were layered through exact dictionaries, template/context resolvers, method-catalog patches and curated case payloads.
- 29 major translation-payload inline script blocks occupied about 10.49 MB of `index.html`; the largest were the v2.4.0t signature dictionary, LAB/QM completion, and RES translation blocks.
- Two smaller feature-local six-language UI maps (`v230UiPolishPatch`, `v240l_performance_signature_filter`) also bypassed the central dictionary.
- Top-level source/audit artifacts also included 11 `*_i18n_RuntimePayload*.json` files and multiple historical translation JS patches; the active app used inlined equivalents rather than loading those files directly.

## Refactor
### Central registry
Added `i18n/languages.js` as the single language registry.
Each language definition now carries:
- `code`
- `label`
- `dir` (`ltr` / `rtl`)
- locale filename

The registry owns normalization and the single `applyDocumentLanguage()` path that sets:
- `document.documentElement.lang`
- `document.documentElement.dir`
- `body[data-molpath-lang]`

German (`de`) is the source/fallback language.

### Locale files
Added one core locale file per current language:
- `i18n/de.js`
- `i18n/en.js`
- `i18n/ro.js`
- `i18n/el.js`
- `i18n/es.js`
- `i18n/fr.js`

The former core `DICT` is no longer embedded in `index.html`.
The locale layer contains 111 source-string message keys per language: the original 105 core keys plus the six responsive-shell labels. `de.js` contains explicit German identity entries and acts as the core source-key inventory.

The two former feature-local six-language UI maps were also moved into per-language locale namespaces (`ui230` and `v240l`; 12 + 29 entries per language). Their exact existing copy is preserved. The corresponding index patches now ask the locale registry for their namespace instead of maintaining their own language maps.

### Bootstrap
`index.html` now loads only `i18n/languages.js` for the core i18n bootstrap.
`languages.js` loads all locale files registered in the registry, followed by `core.js` and `qa.js`, preserving synchronous parser-time execution.

Future language onboarding therefore does not require an `index.html` edit: add the locale file and register it in `languages.js`.

### Compatible runtime core
Added `i18n/core.js` while retaining the existing public runtime API expected by legacy patches:
- `window.MolPathI18n.dict`
- `setLang()`
- `apply()` / `applyNow()`
- `translate()`
- `languages`

German source-string fallback remains unchanged. Existing `MolPathI18nResolve`, exact-translation and `MolPathI18nAfterApply` hooks remain compatible. Feature-local exact-label recognition in the v2.4.0l UI patch is now derived dynamically from all registered locale namespaces instead of a hard-coded six-language reverse map.

### Legacy curated translation payloads
To avoid semantic risk, existing curated case/deep-dive/method translation payloads were not rewritten. They were moved byte-equivalently out of `index.html` into `i18n/legacy/` bundles and are loaded at the same parser positions/order as before.

This preserves:
- registry/hash metadata
- Blocks 01–03 templates/context resolution
- method catalog translations
- Deep-Dive/Signature case payloads
- v2.4 signature translation freeze
- LAB/QM translation completion
- RES translation blocks and hotfixes

### Responsive shell
Added `v250a_responsive_shell.js`.
The layout/CSS is unchanged from `v240z21_responsive_shell.js`; only version metadata and compact-shell text resolution were moved to the central i18n core. The historical z21 file remains unchanged.

## QA helper
Added `i18n/qa.js` exposing:

`window.MolPathI18nQA.run()`

It reports:
- registered languages and direction
- dictionary/source-key counts
- missing source keys per language
- missing runtime-union keys
- fallback behavior
- current document `lang` / `dir`

## QA results
See `QA_I18N_REFACTOR_v250a.json`.

Key results:
- non-i18n index content invariant: PASS
- extracted legacy translation payloads exact vs. z21: PASS
- DE/EN/RO/EL/ES/FR registry: PASS
- original core translations preserved exactly: PASS
- German source identity/fallback: PASS
- missing core source keys: 0 for EN/RO/EL/ES/FR
- all referenced external JS syntax: PASS
- all remaining inline JS syntax: PASS
- responsive CSS exact match to z21: PASS
- simulated RTL application sets `dir="rtl"`: PASS
- feature-local UI copy preserved exactly in all six languages: PASS
- direct six-language `COPY` maps remaining in `index.html`: 0
- index reduced from 15,761,080 to 4,129,533 bytes (~73.8% reduction)

A full Chromium UI smoke test could not be executed in the build environment because local browser navigation is administratively blocked; static invariance checks plus isolated runtime-core execution were used instead.

## Future language onboarding
For a new language such as Arabic:
1. add `i18n/ar.js`
2. add `{code:'ar', label:'العربية', dir:'rtl', file:'ar.js'}` to `i18n/languages.js`
3. no `index.html` edit required

No new languages are included in v2.5.0a.
