# QA — MolPath rc2 A6.8

**Quell-, Vergleichs-, Syntax- und Runtime-Prüfungen: PASS. A6.8-Browsercheck: NOT RUN.** A6.7 ist vom Nutzer bestätigt.

| Prüfung | Ergebnis |
|---|---|
| Quellprüfungen | 227/227 PASS |
| A6.7-Ergebnisvergleiche | 45/45 PASS |
| Syntax | 99 Einheiten, 0 Fehler |
| A6.8 Runtime | 254/254 PASS, 0 Exceptions/Timeouts |
| Gezielter A6.7-Schreibprobe | 18 Pfade / 21 Aufrufe / 77 Feldkopien; gleicher Boot-Hash |
| Entfernte Parse-Schreiber | alle 17 zugehörigen Scriptcheckpoints ohne Falländerungen |
| Deep-Dive-Registrierung | IDs, Reihenfolge, Anzahl und Payloadänderungen an allen 97 Checkpoints gleich |
| Boot / finale Daten | initialisierter UI-Zustand und drei vollständige Datenhashes gleich zu A6.7 |
| Anzeigerekorde | 364 vollständige Rekorde je Schritt, zwölf Sprachschritte; einschließlich Texte exakt gleich |
| Berichte | sechs Hybridpfade in vier Sprachen; alle getesteten vollständigen HTML-Hashes gleich |
| Bestände | 91 Fälle / 91 Deep Dives / 30 Signatures / 44 Methods Focus / 5 Kurse / 23 Kursfälle |
| Scope | nur index.html, 49 präzise Edits; übriger Quelltext byte-identisch |
| Umkehrprüfung | rekonstruierte A6.7-index.html stimmt exakt mit dem bestätigten Basis-Hash überein |

Canonical-Snapshot-SHA256 vor Boot, nach Boot und am Ende: `a767970c2b67c0ee4066ff8794fe36f71255c497aeb7f9d8fc9e660d901f83d0`; jeweils identisch zu A6.7.

DE/EN/RO/EL/ES/FR/RU/TR/AR/FA/UK/DE werden geprüft, alle 91 Fälle gerendert. Case-, Deep-, Meta- und Gate-Anzeigerekorde werden vollständig gehasht. Berichtspfade in DE/EN/RO/UK umfassen Absent/Partial/Complete/Final sowie bestehende CRC2-MLH1- und CRC1-NGS-Äquivalenzprüfungen. Zwölf bestehende Curation-Fälle und vier verifizierte Metadatenkorrekturen bleiben erhalten.

Referenz für den vollständigen Ergebnisvergleich ist das bereits bestandene A6.7-Ergebnis. Zusätzlich wurde A6.7 gezielt an den alten Schreibstellen instrumentiert; dessen Boot-Hash stimmt mit der Referenz überein. Die ausgelieferte Runtime enthält diese Instrumentierung nicht. Detaillierte Ergebnisse, Schreibprobe und Edits unter `qa/`; Inventar im Manifest.

## Grenzen

Die VM nutzt ein DOM-Testdouble. Echte Browserdarstellung, Live-MutationObserver, RTL-Layout und Bilddekodierung sind nicht geprüft. Anleitung für den offenen A6.8-Browsercheck im Apply-Dokument. Gleichheit der Anzeigerekorde belegt Erhalt der Basis und keine vollständige Übersetzungsabdeckung.

Unveränderte Quellinputs stammen aus der verifizierten A6.7-Staging-Basis. languages/core/uk stammen aus dem vorhandenen UK-Final-Patch; übrige Sprachfixtures aus vorhandenen Einzeldateien. Diese Inputs sind nicht im Delta. `i18n/qa.js` bleibt als unveränderter Diagnose-Layer ausgelassen. Die vollständige rc1-Archivmaterialisierung war zuvor mit HTTP 502 blockiert; binäre Assets, FOM und vollständige Archividentität werden nicht behauptet. Basis und Canonical-Abhängigkeiten lassen sich mit dem beigefügten Verifier gegen deinen vollständigen Build prüfen.
