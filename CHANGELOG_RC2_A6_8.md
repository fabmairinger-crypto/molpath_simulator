# MolPath rc2 A6.8 — historische Fall-Schreibpfade entfernen

Basis: dein bestätigter vollständiger A6.7-Build. **Integration Candidate; A6.8-Browsercheck offen.**

18 verifizierte historische Fall-Schreibpfade in 18 Inline-Scripts entfallen: die V21-/V230B-Fallpromotions und 16 Fall-Patchschleifen aus MTB, MET, LAB und RES. Ihre 16 jetzt ungenutzten Patchtabellen mit 77 Datensätzen und 15 ausschließlich dafür verwendeten Suchhilfen sind ebenfalls entfernt. `byId` bleibt erhalten, da ein Renderer es verwendet.

Der gezielte A6.7-Probelauf erfasste alle 18 Pfade an ihren tatsächlichen Parse-/Boot-Aufrufstellen: 21 Aufrufe und 77 Feldkopien. 51 Feldkopien waren bereits wirkungslos; 26 veränderten vorübergehend Tags oder Schwierigkeit. Die vollständigen Schleifen schrieben zusätzlich historische Tags, Signature-Einstufungen und Metadaten. Diese Zwischenstände wurden beim abgeschlossenen Start wieder durch Canonical ersetzt. Die Entfernung wird deshalb durch den Vergleich des tatsächlichen A6.8-Endstands abgesichert und nicht als reine No-op-Löschung behauptet.

Die 18 Deep-Dive-Projektionen samt Registrierungslogik bleiben erhalten. IDs, Reihenfolge, Anzahl und Deep-Dive-Payloadänderungen stimmen an allen 97 Ladepunkten exakt mit A6.7 überein. Die gesamte primäre Runtime, Styles, Scriptreihenfolge und alle anderen Laufzeitdateien bleiben byte-identisch. Von den verbleibenden benannten Funktionen ändert sich ausschließlich der verifizierte Fall-Schreibblock in `integrate`; Rendering-, State- und Auswertungsfunktionen bleiben erhalten. Die Umkehrprüfung der 49 Edits rekonstruiert A6.7 exakt.

Nur `index.html` ändert sich: **2.182.829 -> 2.154.953 Bytes**, also **27.876 Bytes weniger**. Keine neue fachliche Kuration, Sprachdateiänderung, UI-Erweiterung oder zusätzlicher Wrapper/Observer. Finale Falldaten, alle vollständigen Anzeigerekorde in elf Sprachen und die getesteten Berichte sind exakt gleich zu A6.7.

Validierung: 227/227 Quellprüfungen, 45/45 Ergebnisvergleiche, 99 Syntaxeinheiten und 254/254 Runtime-Prüfungen bestanden. Bestände: 91 Fälle, 91 Deep Dives, 30 Signatures, 44 Methods Focus, 5 Kurse, 23 eindeutige Kursfälle.

Die übrigen unabhängigen Legacy-Schreibpfade und die späte Canonical-Integration bleiben für einen getrennten Folgeschritt bestehen. Die Integration wird in A6.8 weiterhin benötigt.
