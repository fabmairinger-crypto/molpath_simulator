# MolPath rc2 A6.6 — Basisfälle und initiale Deep Dives aus Canonical

Basis: der vom Nutzer bestätigte vollständige A6.5-Build. Status: **Integration Candidate; A6.6-Browser-Smoke offen**.

Die alte 91-Fälle-Literaltabelle und die acht initialen Deep-Dive-Literale in `index.html` sind durch getrennte Kopien der vorhandenen finalen A4b-Daten ersetzt. Die Fallprojektion lässt `course_case=false` genau wie der bestehende A5-Adapter weg. Die Deep-Dive-Projektion wählt dieselben acht IDs in derselben Reihenfolge; damit bleibt die stufenweise Registrierung vollständig erhalten.

Vor der Änderung wurden die Datenblöcke, ihre Unterschiede zu Canonical und die tatsächlichen späteren Schreibpfade geprüft. Beide alten Literale repräsentierten historische Zwischenstände. Sämtliche vorhandenen Content-, Asset-, Sprach- und Curation-Schichten bleiben erhalten. Sie schreiben während des Ladens weiterhin einzelne Datenfelder; die bestehende späte Canonical-Integration bleibt erforderlich und liefert denselben finalen Zustand. Es gibt keine neue fachliche Kuration.

Genau `index.html` ändert sich: **3.884.089 -> 3.398.023 Bytes**, also **486.066 Bytes weniger**. Alle anderen Laufzeitdateien, Scriptreihenfolge, benannten Funktionen, Styles und übriger Quelltext bleiben byte-identisch. Die Umkehrprüfung rekonstruiert A6.5 durch exakt zwei Ersetzungen. Keine neuen UI-Texte, Sprachdateiänderungen, Wrapper oder Observer.

Validierung: 93/93 Quellprüfungen, 38/38 Projektions-/Basisvergleiche, 99 Syntaxeinheiten und 254/254 Runtime-Prüfungen. Der gesonderte A6.5-Vergleichslauf besteht ebenfalls 254/254. Finale Canonical-Snapshots und Boot-Zustand sind identisch. An jedem aufgezeichneten Scriptcheckpoint stimmen Fall-/Deep-Dive-IDs, Reihenfolge und Anzahl mit A6.5 überein.

Zusätzlich stimmen alle 364 vollständigen Anzeigerekorde pro Sprachschritt einschließlich Texten exakt mit A6.5 überein: elf Sprachen plus Rückkehr nach Deutsch. Die sechs getesteten Hybrid-Berichtspfade sind in vier Sprachen auch als vollständiges HTML identisch. Compatibility-Kopien teilen keine verschachtelten Objekte mit Canonical.

Bestände bleiben 91 Fälle, 91 Deep Dives, 30 Signatures, 44 Methods Focus, 5 Kurse und 23 eindeutige Kursfälle. Die zwölf Curation-Fälle und vier verifizierten Metadatenkorrekturen bleiben erhalten. Die weiteren historischen Patch-Datentabellen sind ein separater Folgeschritt und bleiben in A6.6 vorhanden.
