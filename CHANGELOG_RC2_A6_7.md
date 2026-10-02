# MolPath rc2 A6.7 — weitere Patchtabellen aus Canonical

Basis: der vom Nutzer bestätigte vollständige A6.6-Build. **Integration Candidate; A6.7-Browser-Smoke offen.**

34 historische JSON-Datenblöcke in 18 bestehenden Inline-Scripts sind durch getrennte Canonical-Kopien ersetzt: 18 Deep-Dive-Arrays mit 84 Datensätzen und 16 Fall-Patchmaps mit 77 Datensätzen. Die Namen, IDs, Reihenfolge und Registrierungsfunktionen bleiben erhalten. Jede Fall-Patchmap wählt genau dieselben geordneten Top-Level-Felder wie zuvor; sie erweitert ihren Schreibumfang nicht.

Vorher wurden sämtliche Datenblöcke und ihre tatsächlichen Verbraucher zugeordnet. Alle IDs und Felder existieren in der finalen A4b-Quelle; es gibt keine fehlenden Felder oder Top-Level-Typwechsel. Vorhandene finale Kuration wird früher verwendet; es gibt keine neue fachliche Kuration. Bei den Deep Dives wird der vollständige bestehende Canonical-Datensatz des jeweiligen Falls kopiert.

Genau `index.html` ändert sich: **3.398.023 -> 2.182.829 Bytes**, also **1.215.194 Bytes weniger**. Alle anderen Laufzeitdateien, die komplette primäre Runtime, benannte Funktionen, Registrierungslogik, Styles und Scriptreihenfolge bleiben byte-identisch. Quelltext außerhalb der 34 Literale ist unverändert; die Umkehrprüfung rekonstruiert A6.6 exakt. Keine neuen UI-Texte, Sprachdateiänderungen, Wrapper oder Observer.

Validierung: 197/197 Quellprüfungen, 213/213 Projektions-/Basisvergleiche, 99 Syntaxeinheiten und 254/254 Runtime-Prüfungen. Als Referenz dient das bereits bestandene, vom Nutzer bestätigte A6.6-Ergebnis. Boot-Zustand, finale Datenhashes, Registrierung an jedem Scriptcheckpoint, sämtliche vollständigen Anzeigerekorde in elf Sprachen und die getesteten vollständigen Berichts-HTML-Ausgaben stimmen exakt überein.

Bestände: 91 Fälle, 91 Deep Dives, 30 Signatures, 44 Methods Focus, 5 Kurse, 23 eindeutige Kursfälle. Zwölf Curation-Fälle und vier verifizierte Metadatenkorrekturen bleiben erhalten. Die vorhandenen Datenschreiber und die späte Canonical-Integration bleiben aktiv; ihre weitere Vereinfachung ist der folgende getrennte Schritt.
