# QA — MolPath rc2 A6.3

**Quell-, Syntax- und Runtime-Prüfungen: PASS. Browser-Smoke: NOT RUN.** Der Stand bleibt ein Integration Candidate.

| Prüfung | Ergebnis |
|---|---|
| Quellprüfungen | 265/265 PASS |
| JavaScript-Syntax | 99 Einheiten, 0 Fehler |
| Runtime-Verträge | 254/254 PASS, 0 Exceptions/Timeouts |
| Datenumfang | 91 Fälle / 91 Deep Dives / 30 Signatures / 44 Methods Focus / 5 Kurse / 23 Kursfälle |
| A6-Integrationschecks | 15/15 true |
| Boot / Sprache / Render | Canonical-Snapshots unverändert |
| V15 META/GATE/CAP/METHOD | exakte A5-Parität |
| Daten/Deep-Dive-Endstand | exakte A5-Parität |
| Curation / Metadaten | exakt 12 dokumentierte Fälle / 4 Korrekturen |
| Nichtversions-CSS / Asset-Pfade | erhalten in allen 24 Payload-Dateien |
| COPY / Assetregistry / Rendererhelfer | unverändert in den sechs Hybridmodulen |
| Version | alleinige Titel-/Globalquelle; sichtbarer Top-Wert stabil |
| Script-Reihenfolge | Adapter einmal früh; Integration nach A4b; Signature Freeze zuletzt |

Die VM lädt die tatsächlichen JavaScript-Quelldateien in der Reihenfolge aus der A6.2-index.html mit dem dokumentierten A6.3-Adaptermove. Sie führt die vorhandenen Boot-Callbacks, Renderer und Sprach-Callbacks aus. Geprüfte Sprachen: DE, EN, RO, EL, ES, FR, RU, TR, AR, FA, UK und Rückkehr zu DE. In jedem Schritt werden 364 getrennte Case/Deep/Meta/Gate-Anzeigerekorde auf erhaltene Struktur, IDs, Test-/Antwort-/Score-Werte und fehlende Referenzaliasierung geprüft. Jeder der 91 Fälle wird gerendert. Die sechs Berichtswege laufen in DE/EN/RO/UK mit keinem, teilweisem und vollständigem Befund; CRC2-MLH1-Alias und CRC1-NGS-Äquivalenz sind enthalten.

Snapshot-SHA256 vor Boot, nach Boot und am Ende: `a767970c2b67c0ee4066ff8794fe36f71255c497aeb7f9d8fc9e660d901f83d0`. Alle drei sind identisch. Die ausführlichen Ergebnisse stehen unter `qa/`.

## Prüfgrundlage und Grenzen

Die vollständige 489-MB-rc1-ZIP-Datei konnte wegen HTTP 502 nicht materialisiert werden. Verwendet wurden die echte A6.2-Delta-index.html, ihre Canonical-/Integrationsdateien und die tatsächlich vorhandenen einzeln hochgeladenen, referenzierten JS-Dateien. Die Basis-Hashes aller 24 geänderten Dateien stehen im Manifest und können mit `qa/verify_a6_3.py before` gegen deinen vollständigen Build geprüft werden.

Die Sprachdateien sind unveränderte vorhandene Inputs. `languages.js`, `core.js` und `uk.js` stammen für den QA-Aufbau aus dem vorhandenen UK-Final-Patch; alle anderen Sprachinputs aus den vorhandenen Einzeldateien. Diese Fixtures sind nicht im Delta. `i18n/qa.js` ist ein unveränderter Diagnose-Layer und wird vom VM-Runner ausgelassen. Der VM-Runner belegt keine vollständige Übersetzungsabdeckung.

Das DOM-Testdouble prüft JavaScript-Ausführung und Datenverträge, keine visuelle Darstellung, echten Browser-Eventablauf, Live-MutationObserver oder Bilddekodierung. Binary-Assets, FOM-Seiten/PDF und die vollständige Archividentität sind nicht geprüft. Ihre Pfade und die vorhandene Renderer-/Gate-Logik bleiben unverändert.

Der echte Browser konnte die lokale Test-URL nicht öffnen (`ERR_BLOCKED_BY_CLIENT`); Chromium ließ sich nicht installieren. Deshalb ist der Browser-Smoke einschließlich Assetanzeige, RTL, mobiler Ansicht und Konsole noch offen. Die konkrete Checkliste steht in `APPLY_RC2_A6_3.txt`.
