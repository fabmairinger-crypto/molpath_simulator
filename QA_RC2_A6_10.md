# QA — MolPath rc2 A6.10

Quell-, Vergleichs-, Syntax-, Runtime- und Szenarioprüfungen: **PASS**. Echter Browsercheck: **NOT RUN**.

| Prüfung | Ergebnis |
|---|---|
| Source/Scope/Umkehrprüfung | 134/134 |
| A6.9-Vergleiche | 47/47 |
| Syntax | 100 Einheiten; 0 Fehler |
| Allgemeine Runtime | 254/254; 0 Exceptions/Timeouts |
| OVAR-Gates | 720/720; alle elf Sprachen |
| CRC/LAB-Erhalt | 77/77; 72 identische Szenarien in vier Sprachen |
| Bestände | 91 Fälle, 91 Deep Dives, 30 Signatures, 44 Methods Focus, 5 Kurse, 23 Kursfälle |
| Gate-Optimalpfad | 100 % Rohscore und Gesamtscore |
| Frühe Akzeptanz | unverändert 62 % |
| Fehlende Bestätigung | unverändert 78 % Rohscore / 70 % Gesamtscore |
| Vollständig falsche Gates bei bestätigtem Pfad | bestehender 80-%-Cap |

Die 62 Verhaltenschecks pro Sprache prüfen tatsächliche Anforderungs-, Labor-, Gate- und Entscheidungshandler: erstes Gate sperrt Anforderung/Labor; ein Teillauf schaltet das zweite Gate nicht frei; nach Labor ist zunächst der Zwischenbefund zu prüfen; Akzeptieren, Nachfordern und Folge-Navigation warten auf die zweite Abgabe. Die zweite Anzeige enthält genau ihre zwei Fragen. Die Abschlussbewertung enthält alle vier Fragen. Vollständige Bestätigung, frühe Annahme, fehlende Bestätigung und vollständig falsche Gate-Antworten werden getrennt geprüft.

Zusätzlich geprüft: richtige MS-Teil-/Fehlantworten, ungültige IDs, Rücksprünge, gezielte Invalidierung eines Gates, neue Laborläufe, neuer Fallversuch, Dozentenmodus und verdecktes Assessment-Feedback bis Abschluss. 24 neue Versuche zeigen variable Antwortpositionen; zwölf Sprachschritte erhalten Reihenfolge, Antworten und semantische Bewertung. Bestehende LTR/RTL-Dokumentattribute bleiben korrekt. Das ist keine visuelle RTL-Prüfung.

Alle neuen Fragen, Optionen, Begründungen und Bedienelemente sind in elf Sprachen vorhanden. Die exakten freigegebenen deutschen Fragen und korrekten IDs werden gegen das separate Freigabedokument geprüft. Sprachlicher fachlicher Review durch Muttersprachler ist nicht Teil der automatischen QA.

Quellumfang: 19 präzise index.html-Edits; ihre Umkehr rekonstruiert A6.9 exakt. Nur der OVAR1-Canonical-Record ändert sich, dort Deep-Dive-Gate, Evaluations-Gate, dokumentierte Provenienz und aktualisierter Record-Hash. Andere 90 Records sowie OVAR-Case/Meta/Story/Truth/Assets/Methoden/Score-Caps bleiben identisch. Alle bisherigen übrigen Laufzeitdateien sind byte-identisch. Die neue Komponente schreibt keine klinischen Runtime-Payloads und installiert keine Wrapper/Timer/Observer.

Alle 97 bisherigen Ladepunkte behalten Fall-/Deep-Dive-IDs, Reihenfolge und Anzahl; ein zusätzlicher Modul-Ladepunkt kommt hinzu. Nicht-OVAR-Datenänderungen der historischen Layer sind unverändert. 364 Anzeigerekorde pro Sprachschritt: alle anderen 90 Fälle sowie OVAR-Case/Meta bleiben gleich; OVAR-Deep/Gate ändern sich gezielt. Sechs bisherige Hybridberichtspfade in vier Sprachen sowie CRC-/LAB-Scores, Berichte und Karten entsprechen A6.9 exakt.

Neuer Canonical-Snapshot-Hash vor Boot, nach Boot, nach Sprachwechseln, nach allen 91 Fällen und allen Zusatzszenarien: `fadce9004be5fa0324e560678763d8434e0670d34f82e9b5ac213b7dc58f02b0`. Er weicht wegen der freigegebenen Gate-Kuration absichtlich von A6.9 ab.

## Grenzen

- Ordered scripts run in Node VM with a DOM test double. No actual browser layout, live MutationObserver, RTL layout, binary image rendering or asset file existence verification.
- Unchanged inputs reuse the passed A6.9 staging fixture. Full rc1 archive materialization was previously blocked by HTTP 502; a complete standalone build is not bundled.
- The eleven-language fixture uses existing uploaded language files and the existing UK patch. These inputs are not bundled; equal records prove preservation, not complete translation quality for historical content.
- Unchanged i18n/qa.js diagnostic layer is omitted by the VM runner. Binary assets and FOM remain required from the complete build.

Die Apply-Datei beschreibt den ausstehenden Browsercheck. Ergebnisdateien und reproduzierbare VM-Harnesses liegen in qa/. Der Delta-Verifier prüft beide ersetzten Dateien, die neue Datei und acht notwendige unveränderte Quell-Abhängigkeiten gegen den vollständigen Build. Er prüft keine binären Assets und ersetzt keine vollständige Archivprüfung.
