# MolPath rc2 A6.5 — Gate- und Methodenregeln aus Canonical

Basis: der vom Nutzer bestätigte vollständige A6.4-Build. Status: **Integration Candidate; A6.5-Browser-Smoke offen**.

Die beiden verbleibenden V15-Literaltabellen `V15_GATE_RECORDS` und `V15_METHOD_RULE_RECORDS` sind durch getrennte Kopien der vorhandenen finalen A4b-Daten ersetzt. Historische Arrays und Maps bleiben als veränderliche Kompatibilitätsschnittstellen erhalten. Damit beziehen nun alle vier V15-Tabellen ihre Daten aus derselben Canonical-Quelle.

Die initiale A6.4-Gate-Tabelle wich ausschließlich bei `LAB_RUN_002_v0_8.gate_count` ab: 2 statt 3. Der unveränderte vorhandene LAB-Hotfix normalisiert dies bereits vor Boot auf die drei kuratierten Fragen. Die initiale Methodenregeltabelle wich ausschließlich in den zwölf bereits dokumentiert kuratierten Fällen ab. Das unveränderte Curation-Script liefert ebenfalls vor Boot die finalen Canonical-Regeln. Beide Abläufe wurden anhand der echten Scriptreihenfolge protokolliert.

A6.5 startet direkt mit diesen finalen Werten; die vorhandenen Aktualisierungen bleiben erhalten und erzeugen dieselben Ergebnisse. Es gibt keine neue fachliche Kuration und keine Änderung der Fragen, Antwortschlüssel oder Scoring-Funktionen.

Genau `index.html` ändert sich: **3.994.644 -> 3.884.089 Bytes**, also **110.555 Bytes weniger**. Die Ladefolge bleibt exakt wie in A6.4. Alle anderen Laufzeitdateien, benannten Funktionen, übrigen Case-/Deep-Dive-Literale, Styles und Asset-Pfade bleiben byte-identisch. Keine neuen UI-Texte, Sprachänderungen, Wrapper oder Observer.

Validierung: 91/91 Quellprüfungen, 24/24 Projektions-/Basisvergleiche, 99 Syntaxeinheiten und 254/254 Runtime-Prüfungen. Der gesonderte A6.4-Vergleichslauf besteht ebenfalls 254/254. Alle finalen Datenhashes und die getesteten Berichtswege stimmen exakt mit A6.4 überein. Die Compatibility-Kopien enthalten keine verschachtelten Referenzen auf Canonical; Änderungen an ihnen verändern die Quelle nicht.

Bestände bleiben 91 Fälle, 91 Deep Dives, 30 Signatures, 44 Methods Focus, 5 Kurse und 23 eindeutige Kursfälle. Die zwölf vorhandenen Curation-Fälle und vier verifizierten Metadatenkorrekturen bleiben erhalten. Weitere Case-/Deep-Dive-Duplikate sind ein separater Folgeschritt.
