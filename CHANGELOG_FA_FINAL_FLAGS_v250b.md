# MolPath Simulator v2.5.0b — Farsi + language flags patch

## Scope
- Added Persian/Farsi locale `i18n/fa.js`.
- Registered `fa` / `fa-IR` in the central language registry.
- Persian document direction is RTL and reuses the existing generic `i18n/rtl.css` layer.
- Added a flag symbol to every language entry in the language selector.
- No case logic, scoring, assets, method selection, or clinical content logic changed.

## Farsi coverage
- Runtime message mappings: 14,308 / 14,308 (same key set as final Arabic catalog).
- Recursive namespace leaves: 189 / 189 (same structural paths as DE/AR namespace source).
- Total translated leaves: 14,497.

## Language selector
- 🇩🇪 Deutsch
- 🇬🇧 English
- 🇷🇴 Română
- 🇬🇷 Ελληνικά
- 🇪🇸 Español
- 🇫🇷 Français
- 🇷🇺 Русский
- 🇹🇷 Türkçe
- 🇸🇦 العربية
- 🇮🇷 فارسی

## QA
- JavaScript syntax: passed (`fa.js`, `languages.js`, `core.js`).
- Farsi message key set vs Arabic master: 0 missing, 0 extra.
- Farsi recursive namespace paths vs DE/AR: 189 / 189 exact.
- `fa-IR` alias resolves to `fa`.
- Farsi is registered as `dir: rtl` and bootstrap includes `fa.js` + generic `rtl.css`.
- Translation checkpoint final QA: 0 alignment, placeholder, numeric-token, CJK, German-specific-character, or visible-rest errors.
