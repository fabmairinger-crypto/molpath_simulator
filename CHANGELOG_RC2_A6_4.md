# MolPath rc2 A6.4 — zwei redundante V15-Tabellen entfernt

Basis: der vom Nutzer im lokalen Browser bestätigte vollständige A6.3-Build. Status: **Integration Candidate; A6.4-Browser-Smoke offen**.

`V15_META_RECORDS` und `V15_CAP_RECORDS` enthielten jeweils 91 Datensätze, die einschließlich Reihenfolge und JSON-Feldstruktur bereits exakt der kanonischen A4b-Quelle entsprachen. Die beiden Literaltabellen in `index.html` sind durch getrennte Canonical-Kopien ersetzt. Damit entfallen zwei zusätzliche Datenquellen; die historischen Array-/Map-Schnittstellen und veränderlichen Kompatibilitätsobjekte bleiben erhalten.

Der vorhandene Loader `rc2_A4b_canonical_cases_lossless.js` lädt dafür einmal direkt nach der Kursquelle und vor dem ersten Runtime-Script. Die Canonical-Datei wird byte-identisch verwendet. Sie führt ausschließlich ihre Datendefinition aus; keine Legacy-Schicht liest sie an diesem früheren Zeitpunkt, außer den beiden neuen Tabellenprojektionen. Der bestehende Adapter, Canonical-Integrationspunkt und Signature Freeze behalten ihre relative Reihenfolge. Signature Freeze bleibt zuletzt.

Genau `index.html` ändert sich: 4.123.232 -> 3.994.644 Bytes, also **128.588 Bytes weniger**. Alle übrigen Laufzeitdateien bleiben byte-identisch. Renderer, Scoring, Gates, Case-Literale, Deep-Dive-Literale, Texte, Styles und Asset-Pfade bleiben erhalten. Es gibt keine neuen sichtbaren Labels und keine Sprachdateiänderungen.

Die alte Gate-Tabelle unterscheidet sich in einem dokumentierten LAB_RUN_002-Feld (`gate_count`), die alte Methodenregeltabelle in den zwölf kuratierten Fällen von A4b. Diese beiden Tabellen bleiben in A6.4 erhalten und werden im folgenden Schritt mit ihren bestehenden Aktualisierungspfaden zugeordnet. Der bestehende A6-Integrationspunkt stellt bereits ihre finale A4b-Parität sicher.

Validierung: 86/86 Quellprüfungen, 13/13 Projektions-/Basisvergleiche, 99 Syntaxeinheiten und 254/254 Runtime-Prüfungen. Canonical-Snapshots vor/nach Boot und am Ende sowie die getesteten Berichtswege stimmen exakt mit A6.3 überein. Datenumfang: 91 Fälle, 91 Deep Dives, 30 Signatures, 44 Methods Focus, 5 Kurse, 23 eindeutige Kursfälle.
