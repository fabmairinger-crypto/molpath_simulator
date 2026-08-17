# MolPath Simulator v2.5.0b — i18n Registry Compatibility Adapter

**Base:** v2.5.0a  
**Date:** 2026-08-17  
**Scope:** i18n architecture / future-language compatibility only

## Invariants
- No case logic changes.
- No scoring changes.
- No test/order logic changes.
- No asset changes.
- No clinical/content edits.
- Existing DE / EN / RO / EL / ES / FR locale content is unchanged.
- No new language is enabled in v2.5.0b.
- Responsive tablet/mobile CSS is unchanged from v2.5.0a.

## Why this adapter was needed
v2.5.0a centralized the core language registry and locale files, but several older runtime translation layers still contained active six-language guards such as `['de','en','ro','el','es','fr']`. These guards could force a newly registered language back to German inside mutable case/deep-dive structures even though the core i18n layer recognized the new locale.

A second risk was that `MolPathLocaleRegistry.register()` normalized an unknown locale code to the German source language. A typo in a future locale filename/code could therefore overwrite the German locale registration.

## Changes
### Central registry hardening
`i18n/languages.js` now exposes:
- `resolveRegistered(code)`
- `isRegistered(code)`
- `codes()`
- `targetCodes()`
- existing `normalize()`, `get()`, `list()`, `labelsObject()`, `applyDocumentLanguage()`

Language definitions are structurally alias-ready through an optional `aliases` array. `dir: 'ltr' | 'rtl'` remains centrally owned.

### Safe locale registration
`MolPathLocaleRegistry.register(code, payload)` now rejects an unregistered language code instead of silently normalizing it to German.

This prevents a future `tr.js`, `uk.js`, `zh-CN.js`, etc. from accidentally overwriting `de` if its registry entry is missing or mistyped.

### Legacy runtime adapter
Active language normalization in the legacy Deep-Dive/Signature runtime now delegates to `MolPathLanguageRegistry.normalize()` rather than hard-coded six-language lists.

Historical translation payload arrays and freeze metadata remain unchanged and continue to describe the languages actually present in those historical payloads.

For mutable legacy case/deep-dive structures, a registered language that has no historical payload now restores the German source structure before the central locale layer translates visible source strings. This prevents stale content when switching, for example, EN → a newly added language.

### Method catalog
The active method-catalog language application no longer rejects future registered language codes. Historical method translation maps still cover DE/EN/RO/EL/ES/FR; for a new language the catalog resets to the German source text, which can then be translated by the new locale file.

### Signature Deep Dives
The v2.3.0c Signature Deep-Dive adapter now uses the central registry and preserves compound language codes such as `zh-CN` instead of truncating them at the hyphen.

### Flagship asset UI
The eight current Flagship runtime language helpers now use the central registry. Their existing six-language `COPY` objects remain untouched; any future language safely falls back to German source copy for translation through its locale file.

Affected Flagship runtime files:
- `v240z13_crc002_flagship.js`
- `v240z14_crc001_flagship.js`
- `v240z15_nsclc002_flagship.js`
- `v240z16_metngs003_flagship.js`
- `v240z17_ovar001_flagship.js`
- `v240z18_ovar002_flagship.js`
- `v240z19_cns001_flagship.js`
- `v240z20_io001_flagship.js`

### LAB / RES inline runtime helpers
The remaining active LAB/RES language helpers in `index.html` now delegate to the central registry instead of testing a literal six-language array.

### Responsive shell
`v250b_responsive_shell.js` is the v2.5.0b shell entry point. Layout and CSS are unchanged from v2.5.0a; only release metadata changes.

## QA
See `QA_I18N_COMPAT_v250b.json`.

Key results:
- existing locale files DE/EN/RO/EL/ES/FR byte-identical to v2.5.0a: PASS
- external referenced JS syntax: 19/19 PASS
- inline JS syntax: 36/36 PASS
- no missing external script references: PASS
- active hard-coded six-language rejection patterns in patched runtime points: 0
- legacy mutable structured payload fallbacks to German source for future languages: 15
- unsafe direct future-language payload lookups in these paths: 0
- eight Flagship language helpers use central registry: PASS
- responsive CSS exact vs v2.5.0a: PASS
- future-language simulation including RTL: PASS
- unknown locale registration rejected: PASS
- existing six language normalization round-trip: PASS
- no new languages enabled in v2.5.0b: PASS

## Planned next language batch
The architecture is prepared for sequential addition of:
- Russian: `ru`
- Ukrainian: `uk` (ISO language code; not `ua`)
- Turkish: `tr`
- Japanese: `ja`
- Korean: `ko`
- Simplified Chinese: `zh-CN`
- Arabic: `ar` with `dir:'rtl'`
- Persian/Farsi: `fa` with `dir:'rtl'`

For each language, the intended onboarding path is now:
1. add one locale file `<code>.js`
2. add one definition in `i18n/languages.js`
3. no `index.html` language wiring changes
