# QA Report v2.2.4a – Translation Quarantine Baseline

## Isolation result
- The executable v2.2.4 `ADDITIONS` block was removed in full.
- The retained HTML core is byte-identical to the v2.2.3 clean baseline after excluding the final closing tags.
- The rejected dictionary is present only as a separate audit artifact and is not referenced by the application.
- The new metadata script does not mutate `MolPathI18n.dict` and does not call `MolPathI18n.apply()`.

## Static QA
- JavaScript blocks checked with Node: **11**
- Syntax failures: **0**
- Quarantined hybrid strings found in executable HTML: **0**
- Reference from executable HTML to rejected JSON: **none**

Checked examples include:
- `cazbericht`
- `casobericht`
- `casbericht anzeigen`
- `Befet avec Liavecation`

## Runtime parity QA
The clean v2.2.3 baseline and v2.2.4a were loaded under the same headless-browser test conditions.

| Check | v2.2.3 | v2.2.4a |
|---|---:|---:|
| EN dictionary entries | 452 | 452 |
| RO dictionary entries | 452 | 452 |
| EL dictionary entries | 452 | 452 |
| ES dictionary entries | 452 | 452 |
| FR dictionary entries | 452 | 452 |
| Rejected hybrid strings in runtime dictionaries | 0 | 0 |
| Console/error signature | baseline signature | identical baseline signature |

The existing clean translations for `Fallbericht anzeigen` remain intact:
- EN: `Show case report`
- RO: `Afișează raportul cazului`
- EL: `Εμφάνιση αναφοράς περιστατικού`
- ES: `Mostrar informe del caso`
- FR: `Afficher le rapport de cas`

## Scope statement
No case, scoring, method, course, report, render or navigation logic was intentionally modified. v2.2.4a is the controlled baseline for the new hash-based translation production system.
