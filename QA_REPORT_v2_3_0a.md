# QA Report — v2.3.0a Version Badge Hotfix

- Base SHA256: `3b96d2a030ddf81b1d190af03f67075c2bcf4f02c4b147c5e3dd4cda3bbb5c27`
- Patched index SHA256: `34bd88417daa91e8c4067b1d8df6e5105200264299a40cbdd6e90c4917c93944`
- JavaScript syntax: PASS (30/30 executable script blocks)
- Targeted legacy observer check: PASS
- Legacy observer no longer writes to `#versionBadge`: PASS
- Legacy observer top-bar version: `v2.3.0`: PASS
- v2.3.0 UI-polish hero controller remains present: PASS
- Diff scope: exactly two source lines changed

## Root cause
The legacy `v224c-ui-residue-translation-patch` contained a document-wide MutationObserver that continuously re-applied the historical v2.2.4o version string to both the top-bar badge and the hero badge. This competed with the v2.3.0 UI-polish controller.
