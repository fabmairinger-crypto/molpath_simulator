# MolPath rc2-clean — A6.1 Canonical Integration Candidate

**Status: PASS_WITH_ENVIRONMENT_LIMITATION**

## Was A6.1 ändert

- Die dokumentierte 12-Fälle-Curation wird wieder an ihrer vorgesehenen Stelle geladen.
- A4b Canonical Cases + A5 Courses/Methods/Adapter werden danach geladen.
- `rc2_A6_canonical_integration.js` synchronisiert die bestehenden Runtime-Datenobjekte **in-place** auf den kanonischen Stand; Case-Objektidentitäten werden dabei erhalten.
- Der bestätigte persistente `v240z12`-Metadata-Writer wird im Index source-level deaktiviert. Sein Version-/Render-Wrapper bleibt bestehen; es wird **kein neuer Metadata-Render-Hook** ergänzt.
- Der bestehende `v250b_signature_taxonomy_freeze.js` bleibt letzter Layer.
- Keine historische Runtime-Datei und kein alter Datenblock wird in A6.1 gelöscht.

## Parität

| Check | Ergebnis |
|---|---|
| Candidate HTML: 91 cases after load | **PASS** · 91 |
| Candidate HTML: 91 Deep-Dive array entries | **PASS** · 91 |
| Candidate HTML: 91 Deep-Dive map entries | **PASS** · 91 |
| Candidate HTML: 5 courses | **PASS** · 5 |
| Canonical case payload parity after full A6 load | **PASS** · exact JSON equality after A5 compatibility normalization |
| Canonical Deep-Dive parity after full A6 load | **PASS** · exact JSON equality |
| V15 META parity | **PASS** · 91/91 |
| V15 GATE parity | **PASS** · 91/91 |
| V15 CAP parity | **PASS** · 91/91 |
| V15 METHOD parity incl. 12-case curation | **PASS** · 91/91 |
| Course parity | **PASS** · 5 courses / 23 unique cases |
| Methods Focus parity | **PASS** · 44 cases |
| Signature taxonomy parity | **PASS** · 30 cases |
| Course => Signature | **PASS** · 23 course cases |
| Documented 12-case curation active | **PASS** · MolPathCaseConsistencyCuration present |
| z12 persistent metadata writer disabled source-level | **PASS** · no replacement render wrapper introduced for metadata |
| A6 integration self-check did not throw | **PASS** · integration script completed |
| All 11 i18n post-apply hook calls completed in stress pass | **PASS** · calls=11 |
| No data drift after i18n/render-chain stress attempts | **PASS** · canonical cases/deep dives still exact |

## Bewusster Stop-Gate

- The locally materialized legacy_v223_v224_runtime.js is truncated at 999 parsed lines and therefore throws SyntaxError in the VM harness. This is an extraction limitation of the working copy, not a newly introduced A6 error.
- The lightweight VM DOM mock cannot complete the final visual render chain (missing browser DOM methods). 91 case render-chain invocations were attempted; all ended in mock-DOM errors, but canonical case/deep-dive data remained unchanged.
- Because of those two environment limitations, A6.1 is an integration candidate, not yet the production replacement build. No historical data blocks/files are deleted in this phase.

## Entscheidung

A6.1 beweist, dass die Canonical Library als **letzte Daten-Authority** in die bestehende Runtime eingehängt werden kann, ohne die finalen 91 Cases/Deep Dives/V15/Courses/Methods/Signature-Daten zu verändern. Wegen der lokalen Legacy-Runtime-/DOM-Testgrenze werden in diesem Schritt bewusst noch keine historischen Datenblöcke gelöscht.
