# MolPath Simulator v2.5.0b — Turkish locale patch (2/8)

## Added
- Full Turkish locale `i18n/tr.js` (`Türkçe`, `ltr`).
- 13,550 translated/invariant conservative runtime-source entries.
- 25 dynamic runtime-template translations with preserved placeholders.
- 41 translated namespace strings.

## Changed
- `i18n/languages.js`: adds `{code:'tr', label:'Türkçe', dir:'ltr', file:'tr.js'}` after the existing Russian locale.

## Compatibility
- Apply on top of **v2.5.0b + completed RU patch**.
- Existing RU registry is preserved byte-for-byte apart from the appended TR definition.
- No changes to `index.html`, `i18n/core.js`, case logic, scoring, assets, or other locales.
