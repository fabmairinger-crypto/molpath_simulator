# QA — MolPath rc2 A6.9

**Quell-, Vergleichs-, Syntax-, Runtime- und gezielte Szenarioprüfungen: PASS. A6.9-Browsercheck: NOT RUN.** A6.8 ist vom Nutzer bestätigt.

| Prüfung | Ergebnis |
|---|---|
| Quellprüfungen | 134/134 PASS |
| A6.8-Ergebnisvergleiche | 43/43 PASS |
| Syntax | 99 Einheiten, 0 Fehler |
| A6.9 Runtime | 254/254 PASS, 0 Exceptions/Timeouts |
| Gezielte A6.9-Szenarien | 108/108 PASS in DE/EN/RO/UK |
| Gezielte A6.8-Referenz | 108/108 PASS; alle drei alten Schreibstellen erreicht |
| LAB-Start-Normalisierung | 20 passende Aufrufe; Schema bereits Canonical, keine Inhaltsänderung |
| OVAR1/CRC1 | Phasen, Berichte, Scores, Score-Caps, TAT und getestete HTML-Ausgaben exakt gleich |
| LAB-Karten | zehn Fälle und drei Schlüsselvarianten pro Sprache exakt gleich; Eingaben nicht verändert |
| Registrierung | Fall-/Deep-Dive-IDs, Reihenfolge, Anzahl und Deep-Dive-Payloadänderungen an 97 Checkpoints gleich |
| Boot / finale Daten | initialisierter UI-Zustand und drei vollständige Datenhashes gleich zu A6.8 |
| Anzeigerekorde | 364 vollständige Rekorde je Schritt, zwölf Sprachschritte; einschließlich Texte exakt gleich |
| Hybridberichte | sechs Pfade in vier Sprachen; alle getesteten vollständigen HTML-Hashes gleich |
| Bestände | 91 Fälle / 91 Deep Dives / 30 Signatures / 44 Methods Focus / 5 Kurse / 23 Kursfälle |
| Scope / Umkehrprüfung | nur index.html, zehn Edits; übriger Quelltext byte-identisch; A6.8 exakt rekonstruiert |

Canonical-Snapshot-SHA256 vor Boot, nach Boot und am Ende: `a767970c2b67c0ee4066ff8794fe36f71255c497aeb7f9d8fc9e660d901f83d0`; jeweils identisch zu A6.8.

Die reguläre QA prüft DE/EN/RO/EL/ES/FR/RU/TR/AR/FA/UK/DE und rendert alle 91 Fälle. Case-, Deep-, Meta- und Gate-Anzeigerekorde werden vollständig gehasht. Hybridberichte in DE/EN/RO/UK umfassen Absent/Partial/Complete/Final sowie bestehende CRC2-MLH1- und CRC1-NGS-Äquivalenzprüfungen. Zwölf bestehende Curation-Fälle und vier verifizierte Metadatenkorrekturen bleiben erhalten.

Die neue Zusatzprüfung nutzt die vorhandenen OVAR-Aktionen für frühe Annahme, Zurückweisung und Abschluss mit/ohne Liquid Biopsy sowie eine wiederholte Gewebeanforderung. Patientenscore und Gesamtscore einschließlich bestehender Gate-Caps werden separat erfasst. `renderScoreCard` schreibt in den vorhandenen DOM-Knoten; dessen vollständiger HTML-Inhalt wird verglichen. CRC-Pfade umfassen fehlende, teilweise, fokussierte, Colon-NGS- und breite NGS-Anforderungen. LAB-Prüfungen vergleichen Kontext, Vorbefunde, Opening und Inhalt sowie beide Kartenschlüsselpaare.

Die volle A6.8-Referenz wird aus dem bereits bestandenen Ergebnis übernommen. Zusätzlich wurde A6.8 mit gezielten QA-Schreibproben und Szenarien ausgeführt; dessen Boot-Hash stimmt mit der Referenz überein. A6.9 wird ohne Instrumentierung ausgeführt. Ergebnisdateien, Aufrufproben und genaue Edits liegen unter `qa/`; keine QA-Instrumentierung ist in index.html enthalten.

## Grenzen

Die VM nutzt ein DOM-Testdouble. Echte Browserdarstellung, Live-MutationObserver, RTL-Layout und Bilddekodierung sind nicht geprüft. Anleitung für den offenen A6.9-Browsercheck im Apply-Dokument. Gleiche Anzeigerekorde belegen Erhalt der Basis und keine vollständige Übersetzungsabdeckung.

Unveränderte Quellinputs stammen aus der verifizierten A6.8-Staging-Basis. languages/core/uk stammen aus dem vorhandenen UK-Final-Patch; übrige Sprachfixtures aus vorhandenen Einzeldateien. Diese Inputs sind nicht im Delta. `i18n/qa.js` bleibt als unveränderter Diagnose-Layer ausgelassen. Die vollständige rc1-Archivmaterialisierung war zuvor mit HTTP 502 blockiert; binäre Assets, FOM und vollständige Archividentität werden nicht behauptet. Basis und Canonical-Abhängigkeiten lassen sich mit dem beigefügten Verifier gegen deinen vollständigen Build prüfen.
