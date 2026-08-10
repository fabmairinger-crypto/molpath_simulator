# QA Report – v2.2.4b Translation Integration Test – Blocks 01–03

## Scope

Integration of the curated review packages:

- Block 01: base UI, navigation, filters and mode labels
- Block 02: digital requisition, cart, resources and analytical run
- Block 03: runtime messages, feedback and generic report shells

This is an **integration-test build**. The translations remain in review and are not a final language release.

## Inventory

- Raw message records across the three blocks: **346**
- Unique German source messages: **331**
- Exact dictionary entries added: **306**
- Parameterized template rules: **25**
- Context-sensitive overrides: **4**
- Languages: **EN, RO, EL, ES, FR**

## Runtime changes

The original exact-string translator was extended in three bounded ways:

1. Curated exact dictionary entries are merged after the clean v2.2.3 dictionary.
2. Parameterized messages such as `{used}/{limit} Schnitte` are translated through placeholder-preserving template rules.
3. Four colliding generic terms use DOM context so that cart/laboratory terminology does not overwrite general case terminology.

No case logic, scoring logic, save data, clinical content, method selection or navigation logic was changed.

## Context-sensitive collisions

- `Laborlauf`: BLOCK01_UI ↔ BLOCK02_ORDER_CART_RESOURCES — context-sensitive: en, ro, el
- `empfohlen`: BLOCK01_UI ↔ BLOCK02_ORDER_CART_RESOURCES — context-sensitive: ro, el, fr
- `optional`: BLOCK01_UI ↔ BLOCK02_ORDER_CART_RESOURCES — context-sensitive: ro, el, fr
- `Material`: BLOCK01_UI ↔ BLOCK02_ORDER_CART_RESOURCES — context-sensitive: en, ro, el, es, fr

Default wording remains generic; specialized order/cart/laboratory wording is applied only in the relevant UI context.

## Static validation

- Base translator patch points found exactly once.
- The integration script uses a unique script ID.
- All five target-language dictionaries contain every exact entry.
- All template placeholders were already validated in the source review packages.
- SHA-256 hashes are recorded in `translation_manifest_blocks01_03.json`.

## Files

- Ready-to-run HTML: `molpath_simulator_v2_2_4b_i18n_blocks01_03_integration_test.html`
- Standalone integration script: `v224b_i18n_blocks01_03_patch.js`
- Manifest: `translation_manifest_blocks01_03.json`
- Manual test checklist: `TEST_CHECKLIST_v2_2_4b.md`
- Rollback instructions: `ROLLBACK_v2_2_4b.md`


## Automated browser validation

Chromium validation was completed at a 1440 × 1000 viewport using the ready-to-run HTML:

- EN order/cart shell: passed
- RO order/cart shell: passed
- EL order/cart shell: passed
- ES order/cart shell: passed
- FR order/cart shell: passed
- German restoration after language switching: passed
- EN report shell: passed
- FR report shell: passed
- JavaScript console errors: 0
- Unhandled page errors: 0
- Detected overflow flags in the selected button/badge/tag/heading set: 0

Parameterized checks passed for sections, resource points, working days and CAPA messages. Captured values inside a template are translated when an exact curated entry exists. Case-specific summaries remain German until their dedicated case package is translated; this is expected in the present integration build.

The patch-only applicator reproduced the ready-to-run HTML byte-for-byte with the same SHA-256 hash.

Evidence files:

- `PLAYWRIGHT_QA.json`
- `REPORT_QA.json`
- `screenshots/order_en.png`
- `screenshots/order_ro.png`
- `screenshots/order_el.png`
- `screenshots/order_es.png`
- `screenshots/order_fr.png`
- `screenshots/order_de_restored.png`
- `screenshots/report_fr.png`

## Known scope limitation

This build intentionally translates only Blocks 01–03. Dashboard narrative, case content, method catalog descriptions, course text, Deep Dives and Signature Cases can therefore still appear in German. Mixed-language screens outside the three approved scopes are expected at this stage and are not treated as runtime failures.
