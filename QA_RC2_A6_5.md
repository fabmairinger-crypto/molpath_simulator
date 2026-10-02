# QA — MolPath rc2 A6.5

**Quell-, Projektions-, Syntax- und Runtime-Prüfungen: PASS. A6.5-Browser-Smoke: NOT RUN.** A6.4 ist vom Nutzer bestätigt.

| Prüfung | Ergebnis |
|---|---|
| Quellprüfungen | 91/91 PASS |
| Projektionen / A6.4-Vergleich / Ladephasen | 24/24 PASS |
| Syntax | 99 JavaScript-Einheiten, 0 Fehler |
| A6.5 Runtime | 254/254 PASS, 0 Exceptions/Timeouts |
| A6.4 Vergleichslauf | 254/254 PASS, 0 Exceptions/Timeouts |
| Neue Projektionen | je 91 geordnete Datensätze, exakt gleich zur finalen Canonical-Quelle |
| Datenkopien | keine verschachtelten Aliase; Canonical bleibt bei Mutationen unverändert |
| Einziger alter Gate-Unterschied | LAB_RUN_002: 2 -> 3 durch bestehenden LAB-Hotfix |
| Alte Methoden-Unterschiede | genau zwölf bereits kuratierte Fälle; bestehende Kuration stellt Parität her |
| A6.5 Ladephasen | bereits initial Parität; erhaltene Aktualisierungen ändern keine Werte |
| Boot / Sprachwechsel / Rendern | stabile Daten und Version; Snapshot-Hashes identisch zu A6.4 |
| Berichtswege | sechs Hybridfälle in DE/EN/RO/UK; Ergebnisse exakt gleich zu A6.4 |
| Bestände | 91 Fälle / 91 Deep Dives / 30 Signatures / 44 Methods Focus / 5 Kurse / 23 Kursfälle |
| Kuration / Metadaten | zwölf Curation-Fälle und vier verifizierte Korrekturen erhalten |
| Scope | nur index.html; alle anderen Runtime-Dateien byte-identisch |
| Funktionen / Case- und Deep-Dive-Texte / Styles / Asset-Pfade | byte-identisch erhalten |
| Ladefolge | exakt A6.4; A4b früh, Integration nach Curation, Signature Freeze zuletzt |
| Umkehrprüfung | die zwei Ersetzungen rekonstruieren A6.4-index.html bytegenau |

Canonical-Snapshot-SHA256 vor Boot, nach Boot und am Ende, jeweils identisch zu A6.4: `a767970c2b67c0ee4066ff8794fe36f71255c497aeb7f9d8fc9e660d901f83d0`.

Die VM führt die tatsächliche Scriptreihenfolge aus, einschließlich der geladenen Sprachinputs. Sie prüft elf Sprachen plus Rückkehr nach Deutsch, 364 getrennte Case/Deep/Meta/Gate-Anzeigerekorde je Sprachschritt und Rendern aller 91 Fälle. Die sechs bestehenden Hybrid-Berichtspfade laufen in vier Sprachen; CRC2-MLH1-Alias und CRC1-NGS-Äquivalenz bleiben erhalten. `qa/projection_qa_results.json` enthält beide protokollierten Ladefolgen, `qa/runtime_qa_results.json` die A6.5-Prüfdetails.

## Grenzen

Die VM nutzt ein DOM-Testdouble: keine Prüfung echter Browserdarstellung, Live-MutationObserver, Bilddekodierung oder RTL-Layouts. Der eigene A6.5-Browser-Smoke bleibt offen; gezielte Schritte stehen in der Apply-Anleitung.

Die unveränderten Quellinputs stammen aus der verifizierten A6.4-Staging-Basis. Für languages/core/uk kommt der vorhandene UK-Final-Patch zum Einsatz; die übrigen Sprachfixtures sind vorhandene Einzeldateien. Diese Dateien sind nicht im Delta. `i18n/qa.js` bleibt als unveränderter Diagnose-Layer im Runner ausgelassen. Vollständige Übersetzungsabdeckung wird nicht behauptet.

Die vollständige rc1-Archivmaterialisierung war zuvor mit HTTP 502 blockiert. Binäre Assets, FOM und die vollständige Archividentität werden nicht behauptet; vorhandene Quellinputs, Funktionen, Styles und Asset-Pfade sind unverändert. Basis und benötigte Canonical-Abhängigkeiten lassen sich mit `qa/verify_a6_5.py` gegen den vollständigen lokalen Build prüfen.
