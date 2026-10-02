# QA — MolPath rc2 A6.6

**Quell-, Projektions-, Syntax- und Runtime-Prüfungen: PASS. A6.6-Browser-Smoke: NOT RUN.** A6.5 ist vom Nutzer bestätigt.

| Prüfung | Ergebnis |
|---|---|
| Quellprüfungen | 93/93 PASS |
| Projektionen / Registrierung / A6.5-Vergleich | 38/38 PASS |
| Syntax | 99 JavaScript-Einheiten, 0 Fehler |
| A6.6 Runtime | 254/254 PASS, 0 Exceptions/Timeouts |
| A6.5 Vergleichslauf | 254/254 PASS, 0 Exceptions/Timeouts |
| Neue Projektionen | 91 Fälle + dieselben acht initialen Deep Dives; exakte Canonical-Compatibility-Payloads |
| Datenkopien | keine verschachtelten Aliase; Canonical bleibt bei Mutationen unverändert |
| Registrierung | IDs, Reihenfolge und Anzahl an allen 97 Scriptcheckpoints identisch |
| Boot-Zustand | Startfall, initialisierter Zustand und UI-Modus identisch zu A6.5 |
| Finale Daten | Hash vor/nach Boot und am Ende identisch zu A6.5 |
| Anzeigerekorde | 364 vollständige Rekorde je Schritt; zwölf Sprachschritte, einschließlich aller Texte exakt identisch |
| Berichte | sechs Hybridpfade in DE/EN/RO/UK; Absent/Partial/Complete/Final als komplettes HTML identisch |
| Bestände | 91 Fälle / 91 Deep Dives / 30 Signatures / 44 Methods Focus / 5 Kurse / 23 Kursfälle |
| Kuration / Metadaten | zwölf Curation-Fälle und vier verifizierte Korrekturen erhalten |
| Scope | nur index.html; alle anderen Runtime-Dateien byte-identisch |
| Funktionen / übriger Quelltext / Styles | byte-identisch erhalten |
| Ladefolge | exakt A6.5; A4b früh, Integration nach Curation, Signature Freeze zuletzt |
| Umkehrprüfung | zwei Ersetzungen rekonstruieren A6.5-index.html bytegenau |

Canonical-Snapshot-SHA256 vor Boot, nach Boot und am Ende, jeweils identisch zu A6.5: `a767970c2b67c0ee4066ff8794fe36f71255c497aeb7f9d8fc9e660d901f83d0`.

Der Runtime-Runner führt die tatsächliche Scriptreihenfolge aus. contentTrace dokumentiert historische Datenwrites und Registrierung bis zur finalen Integration. Die initialen Deep Dives bleiben acht; weitere Registrierungen und die abschließende Ergänzung auf 91 laufen unverändert. Historische Writes sind weiterhin vorhanden und können während des Ladens Felder erneut beschreiben. Sie wurden in diesem Delta nicht stillgelegt.

Die vollständigen Case-, Deep-, Meta- und Gate-Anzeigerekorde werden je Sprachschritt per SHA256 gegen A6.5 verglichen. Getestet werden DE/EN/RO/EL/ES/FR/RU/TR/AR/FA/UK/DE. Alle 91 Fälle werden gerendert. Für die sechs bestehenden Hybridfälle werden Berichtsausgaben als vollständiges HTML gehasht; CRC2-MLH1-Alias und CRC1-NGS-Äquivalenz bleiben erhalten. Details und beide Ladefolgen-Zusammenfassungen liegen unter `qa/`.

## Grenzen

Die VM nutzt ein DOM-Testdouble: keine Prüfung echter Browserdarstellung, Live-MutationObserver, Bilddekodierung oder RTL-Layouts. Der eigene A6.6-Browser-Smoke bleibt offen; gezielte Schritte stehen in der Apply-Anleitung. Die Anzeigevergleiche belegen Gleichheit zur Basis, keine vollständige Übersetzungsabdeckung.

Die unveränderten Quellinputs stammen aus der verifizierten A6.5-Staging-Basis. Für languages/core/uk kommt der vorhandene UK-Final-Patch zum Einsatz; die übrigen Sprachfixtures sind vorhandene Einzeldateien. Diese Dateien sind nicht im Delta. `i18n/qa.js` bleibt als unveränderter Diagnose-Layer im Runner ausgelassen.

Die vollständige rc1-Archivmaterialisierung war zuvor mit HTTP 502 blockiert. Binäre Assets, FOM und die vollständige Archividentität werden nicht behauptet. Basis und benötigte Canonical-Abhängigkeiten lassen sich mit `qa/verify_a6_6.py` gegen den vollständigen lokalen Build prüfen.
