# QA — MolPath rc2 A6.7

**Lokale Quell-, Projektions-, Syntax- und Runtime-Prüfungen: PASS. A6.7-Browser-Smoke: NOT RUN.** A6.6 ist vom Nutzer bestätigt.

| Prüfung | Ergebnis |
|---|---|
| Quellprüfungen | 197/197 PASS |
| Projektionen / A6.6-Vergleich | 213/213 PASS |
| Syntax | 99 Einheiten, 0 Fehler |
| A6.7 Runtime | 254/254 PASS, 0 Exceptions/Timeouts |
| Tabellen | 18 Deep-Dive-Arrays / 16 Fall-Patchmaps; alle IDs/Felder zugeordnet |
| Fall-Patch-Feldlisten | ursprüngliche geordnete Top-Level-Feldlisten erhalten |
| Canonical-Isolierung | keine verschachtelten Aliase; Mutationen an Kopien verändern Canonical nicht |
| Registrierung | IDs, Anzahl und Reihenfolge an allen 97 Checkpoints gleich zu A6.6 |
| Boot / finale Daten | initialisierter UI-Zustand und alle drei Datenhashes gleich zu A6.6 |
| Anzeigerekorde | 364 vollständige Rekorde je Schritt, zwölf Sprachschritte; einschließlich Texte exakt gleich |
| Berichte | sechs Hybridpfade in vier Sprachen, alle getesteten vollständigen HTML-Hashes gleich |
| Bestände | 91 Fälle / 91 Deep Dives / 30 Signatures / 44 Methods Focus / 5 Kurse / 23 Kursfälle |
| Scope | nur index.html; primäre Runtime, übrige Dateien/Funktionen/Styles unverändert |
| Umkehrprüfung | 34 Ersetzungen rekonstruieren die bestätigte A6.6-index.html exakt |

Canonical-Snapshot-SHA256 vor Boot, nach Boot und am Ende: `a767970c2b67c0ee4066ff8794fe36f71255c497aeb7f9d8fc9e660d901f83d0`; jeweils identisch zu A6.6.

DE/EN/RO/EL/ES/FR/RU/TR/AR/FA/UK/DE werden geprüft, alle 91 Fälle gerendert. Case-, Deep-, Meta- und Gate-Anzeigerekorde werden vollständig gehasht. Berichtspfade in DE/EN/RO/UK umfassen Absent/Partial/Complete/Final sowie die bestehenden CRC2-MLH1- und CRC1-NGS-Äquivalenzprüfungen. Referenz ist das bereits bestandene A6.6-Ergebnis; kein erneuter Referenzlauf wird behauptet. Detaillierte Ergebnisse und Ladefolgen-Zusammenfassungen unter `qa/`, Tabelleninventar im Manifest.

## Grenzen

Die VM nutzt ein DOM-Testdouble. Echte Browserdarstellung, Live-MutationObserver, RTL-Layout und Bilddekodierung sind nicht geprüft. Der eigene A6.7-Browsercheck bleibt offen; Anleitung im Apply-Dokument. Gleichheit der Anzeigerekorde belegt Erhalt der Basis, keine vollständige Übersetzungsabdeckung.

Unveränderte Quellinputs stammen aus der verifizierten A6.6-Staging-Basis. languages/core/uk stammen aus dem vorhandenen UK-Final-Patch, übrige Sprachfixtures aus vorhandenen Einzeldateien. Diese Inputs sind nicht im Delta. `i18n/qa.js` bleibt als unveränderter Diagnose-Layer ausgelassen. Die vollständige rc1-Archivmaterialisierung war zuvor mit HTTP 502 blockiert; binäre Assets, FOM und vollständige Archividentität werden nicht behauptet. Basis und Canonical-Abhängigkeiten lassen sich mit dem beigefügten Verifier gegen deinen vollständigen Build prüfen.
