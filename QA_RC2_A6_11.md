# QA — MolPath rc2 A6.11

**PASS** für Quell-, Vergleichs-, Syntax-, Runtime-, Gate-, CRC/LAB- und Zählerprüfungen. Echter A6.11-Browsercheck: **NOT RUN**.

| Prüfung | Ergebnis |
|---|---|
| Source / Scope / Umkehrprüfung | 434/434 |
| A6.10-Vergleich | 54/54 |
| Syntax | 100 Einheiten, 0 Fehler |
| Allgemeine Runtime | 254/254 |
| OVAR-Gates in elf Sprachen | 720/720 |
| CRC/LAB-Erhalt und Stabilität | 77/77 |
| Canonical | identisch vor/nach Boot, nach allen Sprach-/Fall-/Gate-Pfaden |
| Registrierung | alle 98 Checkpoints exakt identisch |
| Display | 364 Rekorde pro Sprachschritt, elf Sprachen plus Abschluss-DE, exakt gleich |
| Hybridberichte | sechs Pfade in vier Sprachen, exakt gleiche HTML-Hashes |
| Bestände | 91 Fälle / 91 Deep Dives / 30 Signatures / 44 Methods Focus / 5 Kurse / 23 Kursfälle |

| Instrumentierte Aufrufzahlen | A6.10 | A6.11 |
|---|---:|---:|
| Vollständige Core-Render beim Boot | 58 | 57 |
| Erstellte/observierende Observer | 7 | 5 |
| DOMContentLoaded-Callbacks | 90 | 89 |
| AfterApply-Hook-Frames pro Sprachwechsel | 39 | 20 |

Der neue Zählerlauf lädt die tatsächlichen Scripts in ihrer Reihenfolge. QA-only-Zähler erfassen Core-Render, i18n-Hook-Frames, Observer-Erstellungen und Scheduling im simulierten Clock-Lauf. Die Instrumentierung ist ausschließlich in der QA und schreibt keine klinischen Daten. Beide instrumentierten Läufe haben denselben Canonical-Snapshot wie die normale QA. Live-Mutationsauslieferung und echte Browserzeiten sind nicht gemessen.

Die Quellprüfung belegt jede Änderung, rekonstruiert A6.10 exakt rückwärts und prüft alle verbleibenden benannten Funktionen gegen ihre A6.10-Fassung nach Abzug ausschließlich der belegten leeren Aufrufe. Nur index.html ändert sich. Alle Styles und der gesamte Haupt-Runtime-Block bleiben byte-identisch. Keine Fachtext-/Label-Änderung, deshalb kein neues Sprach-Delta nötig; vollständige elfsprachige Anzeigerekorde bleiben gleich.

Die Gate-Prüfung verwendet echte Navigations-, Labor-, Antwort- und Entscheidungshandler. Score/TAT/Berichte der getesteten OVAR-Pfade entsprechen A6.10. Bei korrekten Antworten werden semantische Mengen unabhängig von zufälliger Reihenfolge verglichen. Im vollständig falschen Pfad kann wegen der Zufallsreihenfolge ein anderer falscher Distraktor gewählt werden; nur dessen ID wird beim Vergleich ausgeblendet, Frage-/Lösungsschlüssel und Score bleiben gleich. Die 720 funktionellen Gate-Checks laufen vollständig unverändert.

Canonical-Snapshot: `fadce9004be5fa0324e560678763d8434e0670d34f82e9b5ac213b7dc58f02b0`; exakt identisch zu A6.10.

## Grenzen

- Actual ordered JS executes in Node VM with a DOM test double and simulated clock. No live MutationObserver delivery, visual layout, RTL layout, binary image rendering or real browser wall-clock measurement.
- Unchanged inputs reuse the verified A6.10 fixture from uploaded source files and prior deltas. Full rc1 archive materialization was previously blocked by HTTP 502; binary assets, FOM and complete archive identity are not verified.
- Language fixtures reuse existing files plus the existing UK patch. Unchanged i18n/qa.js diagnostic layer is omitted by the VM runner.
- Metrics are QA-only counters; source instrumentation is not part of the payload. Callback counts describe the controlled run, not a percentage browser speed-up.

Die Apply-Datei beschreibt den offenen Browsercheck. Der Verifier prüft index.html und zehn unveränderte erforderliche Inputs; binäre Assets und die vollständige lokale Archividentität sind damit nicht geprüft.
