# Changelog v2.2.4a – Translation Quarantine Baseline

## Changed
- Removed the appended v2.2.4 `ADDITIONS` merge from the executable HTML.
- Preserved the complete v2.2.3 clean application and its previously accepted translation seed.
- Added a metadata-only version marker; it does **not** write to any language dictionary and does not call the translation engine.
- Stored the rejected v2.2.4 dictionary separately under `quarantine/` for audit traceability.

## Explicitly unchanged
- Application, navigation and rendering logic
- 91-case library and case switching
- Method catalogue and cart logic
- Ovar two-round workflow, scoring, TAT and budget logic
- Courses, reports, teaching sheets and export logic
- Existing v2.2.3 clean translations

## Status
This is the clean technical baseline for rebuilding the complete translation production system. The quarantined JSON must not be loaded into the application.
