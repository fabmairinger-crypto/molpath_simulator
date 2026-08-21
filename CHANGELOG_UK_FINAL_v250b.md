# MolPath Simulator v2.5.0b — Ukrainian locale integration

## Added
- Ukrainian locale `uk` with alias `uk-UA`.
- Native language label: `Українська`.
- Complete reviewed runtime message catalog: 14,308 message keys.
- Complete current namespace layer: 189 namespace leaf strings.
- Ukrainian blue/yellow SVG flag for the cross-platform language picker.

## Changed
- `i18n/languages.js`: registered `uk` / `uk-UA`, LTR, 🇺🇦.
- `i18n/core.js`: added Ukrainian SVG flag renderer.

## QA
- Message key parity with Persian and Arabic complete catalogs: 14,308 / 14,308.
- Empty translations: 0.
- Placeholder mismatches: 0.
- Namespace path parity: 189 / 189.
- Russian-specific Cyrillic character residues (`ы э ъ ё`): 0 in Ukrainian messages and namespaces.
- JavaScript syntax checks passed for `uk.js`, `languages.js`, and `core.js`.
- Registry smoke test: `uk-UA` resolves to `uk`, LTR, `uk.js` included in bootstrap.
