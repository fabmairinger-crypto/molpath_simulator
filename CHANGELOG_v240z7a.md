# MolPath Simulator v2.4.0z7a — RES T1 escape hotfix

## Fixed
- Corrected placement of the `v240z7_res_t1_i18n` block.
- In v2.4.0z7 the T1 style/script block had been inserted at the first textual `</body></html>` occurrence, which belonged to the report HTML template inside the main JavaScript block.
- The literal `</script>` of the inserted T1 block could therefore terminate the surrounding browser script prematurely.
- The unchanged RES T1 translation layer is now placed immediately before the actual final document `</body></html>`.

## Scope
- Integration/escaping hotfix only.
- No case content changes.
- No translation content changes.
- No scoring, gate, Deep-Dive, Signature or registry changes.
- RES D1 remains 6/6 multilingual (DE/EN/RO/EL/ES/FR).
- Overall Deep Dive status remains 91/91; Signature status remains 15/15.

## QA
- All 60 inline JavaScript blocks extracted and checked with `node --check`: 0 syntax errors.
- T1 i18n block confirmed as a standalone final script block, outside the report template literal.
- ZIP integrity tested successfully.
