# QA Report – MolPath Simulator v2.2.3 Clean Translation Rebuild

## Build strategy
- Baseline: `v2.2.1 Translation Registry & Full Text Audit`.
- The broken v2.2.2 HTML was not used as an application source.
- Only the 347 complete translation pairs per target language were imported from the v2.2.2 message catalog.
- The stable v2.2.1 DOM, main application script, case engine, render logic, course logic and report logic were left unchanged.
- One isolated translation merge script was appended immediately before `</body>`.

## Static QA
- HTML parses to 10 script blocks and 8 style blocks.
- All 10 JavaScript blocks passed `node --check`.
- No literal `</script>` sequence exists inside the appended translation script.
- New entries per target language: 347.
- Total dictionary entries per target language: 452.
- HTML SHA-256: `bb3a6e709c47f6a433fd9624ee336e0d695e4b361a6cf20a83346a3433ebe81b`.

## Chromium runtime QA
The standalone app was loaded in Chromium and checked through the browser runtime.

- Case library: 91 cases.
- Case selector: 91 selectable entries.
- Initial active case loaded normally.
- Sidebar and main workspace are both visible.
- Dashboard shows 91 total cases, 42 MTB, 27 QM/LAB and 22 RES cases.
- Five course entries remain available.
- Translation dictionaries load with 452 entries for EN, RO, EL, ES and FR.
- Language switching preserves all 91 cases and all 91 selector options.
- Translation smoke test for `Freies Spielen`:
  - EN: `Free play`
  - RO: `Joc liber`
  - EL: `Ελεύθερη εξάσκηση`
  - ES: `Juego libre`
  - FR: `Mode libre`
- Case-switch runtime test passed: `MTB_NSCLC_001_v0_6` → `MTB_OVAR_001_v0_7`.
- Ovar-specific step sequence appeared after switching, including Runde 1, Laborlauf 1 and Befundbewertung.
- No runtime error events were observed during the checks.

## Explicitly inherited unchanged from v2.2.1
- Ovar two-round workflow and dynamic score/TAT logic.
- CRC bundle logic.
- Case switching.
- Courses and session logic.
- Reports, teaching sheets, instructor reports and course reports.
- v2.0b.5 safe layout and branding.
