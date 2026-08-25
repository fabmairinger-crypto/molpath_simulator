# MolPath Simulator v2.6.0-rc1 — FOM integration release candidate

Date: 2026-08-25

## Release cut

- User-facing application version moved from the long-running `v2.5.0b` development line to `v2.6.0-rc1`.
- Historical `v250b_*` filenames and legacy patch identifiers are intentionally retained for runtime compatibility; the user-facing release version is now read from one central metadata object.
- This patch does **not** modify case truth, scoring rules, station logic, Methods Focus eligibility, Signature classification, course composition, or existing case assets.

## Flight Operations Manual

- Integrated the current 50-page Flight Operations Manual as **FOM v0.6**.
- Runtime references inside the manual were updated to `v2.6.0-rc1` and the document header/footer version to `0.6`.
- Added the original PDF as an offline app asset at `docs/fom/MolPath_Flight_Operations_Manual_v0.6.pdf`.
- Added 50 pre-rendered WebP pages for a reliable in-app viewer without depending on a browser PDF plug-in or an external tab.

## Home / Help

- Added a prominent **Flight Operations Manual** callout directly below the hero section.
- Added **Open manual** and **Download PDF** actions.
- Added a full-screen in-app manual viewer with previous/next navigation, page counter, zoom controls, keyboard navigation, close control, and adjacent-page preloading.
- Existing **How it works**, **Guided tutorial**, **Simulation areas**, and **What's new?** cards remain intact.

## Versioning

- Added `molpath_version.js` as the single source of truth for the current user-facing application version, FOM version, PDF path, viewer page path/count, and release date.
- Home, responsive shell, startup cover, and i18n compatibility adapter consume the central release version.

## Internationalisation

- Added the FOM Home/viewer strings to all 11 registered UI languages: DE, EN, RO, EL, ES, FR, RU, TR, AR, FA, UK.
- Added a localized What's New entry announcing FOM v0.6.
- Locale metadata now identifies the release as `v2.6.0-rc1`.

## QA performed

- JavaScript syntax validation for all modified JavaScript files.
- Locale payload comparison against the v2.5.0b base: only locale release metadata, FOM Home/viewer keys, and the additional What's New item changed.
- FOM preflight: 50 pages, openable, unencrypted, searchable/non-scanned.
- FOM render QA: all 50 pages rendered successfully; visual contact-sheet review showed no clipping, blank pages, or broken layout.
- FOM text audit: all 50 page headers report `/ 0.6`; the cover reports `V0.6`; no `v2.5.0b` runtime reference remains in the updated PDF.
