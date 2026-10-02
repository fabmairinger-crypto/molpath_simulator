# QA — MolPath rc2 A6.4

**Quell-, Projektions-, Syntax- und Runtime-Prüfungen: PASS. A6.4-Browser-Smoke: NOT RUN.** Der Nutzer hat den kurzen lokalen A6.3-Browser-Smoke bestätigt; dies gilt als geprüfte Basis für A6.4.

| Prüfung | Ergebnis |
|---|---|
| Quellprüfungen | 86/86 PASS |
| Projektionen und Vergleich mit A6.3 | 13/13 PASS |
| Syntax | 99 JavaScript-Einheiten, 0 Fehler |
| Runtime | 254/254 PASS, 0 Exceptions/Timeouts |
| Entfernte Datentabellen | META 91 + CAP 91; exakte geordnete JSON-Parität mit A4b |
| Canonical-Isolierung | keine verschachtelten Referenzaliasierungen; Änderungen an Kompatibilitätskopien verändern A4b nicht |
| Boot / Render / Sprache | stabile Daten; Hashes exakt gleich zu A6.3 |
| Berichtspfade | sechs Hybridfälle in DE/EN/RO/UK; Ergebnisse exakt gleich zu A6.3 |
| Bestände | 91 Fälle / 91 Deep Dives / 30 Signatures / 44 Methods Focus / 5 Kurse / 23 Kursfälle |
| Curation / Metadaten | 12-Fälle-Kuration und 4 verifizierte Korrekturen erhalten |
| Scope | nur index.html; alle anderen Runtime-Dateien byte-identisch |
| Renderer-/Zustands-/Score-Funktionen | sämtliche benannten Funktionsdefinitionen byte-identisch |
| Case/Gate/Method/Deep-Literale | byte-identisch erhalten |
| Styles / Asset-Pfade | byte-identisch erhalten |
| Ladefolge | A4b einmal vor den Projektionen; unveränderter Integrationspunkt; Signature Freeze zuletzt |
| Umkehrprüfung | die vier Quelledits rekonstruieren die bestätigte A6.3-index.html exakt |

Canonical-Snapshot-SHA256 vor Boot, nach Boot und am Ende, jeweils identisch mit A6.3: `a767970c2b67c0ee4066ff8794fe36f71255c497aeb7f9d8fc9e660d901f83d0`.

Die VM prüft alle elf vorhandenen Sprachinputs plus Rückkehr nach Deutsch, 364 getrennte Case/Deep/Meta/Gate-Anzeigerekorde je Sprachschritt sowie das Rendern aller 91 Fälle. Die sechs Berichtswege werden in vier Sprachen getestet; CRC2-MLH1-Alias und CRC1-NGS-Äquivalenz bleiben erhalten. Detaillierte Ergebnisse stehen unter `qa/`.

## Grenzen

Die VM verwendet ein DOM-Testdouble und prüft keine echte Browserdarstellung, Live-MutationObserver, Bilddekodierung oder RTL-Layouts. Der Browser-Smoke für A6.4 einschließlich der früheren A4b-Ladung bleibt offen; die gezielte Checkliste steht in der Apply-Anleitung.

Die Basisdateien und Sprachfixtures werden unverändert aus der verifizierten A6.3-Staging-Basis wiederverwendet. Für `languages.js`, `core.js` und `uk.js` kommt der vorhandene UK-Final-Patch zum Einsatz; die übrigen Sprachinputs stammen aus vorhandenen Einzeldateien. Diese Inputs sind nicht im Delta. `i18n/qa.js` wird als unveränderter Diagnose-Layer vom VM-Runner ausgelassen. Vollständige Übersetzungsabdeckung wird nicht behauptet.

Die vollständige rc1-Archivmaterialisierung war zuvor mit HTTP 502 blockiert. Binäre Assets, FOM und die vollständige Archividentität werden nicht behauptet; alle vorhandenen Quellinputs, Rendererfunktionen, Styles und Asset-Pfadliterals sind unverändert. Der Basis-Hash der A6.3-index.html sowie die benötigten Canonical-Dateien können mit `qa/verify_a6_4.py` gegen deinen vollständigen Build geprüft werden.
