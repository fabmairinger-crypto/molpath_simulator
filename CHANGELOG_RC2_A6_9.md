# MolPath rc2 A6.9 — OVAR/CRC-Schreiber und LAB-Normalisierung

Basis: dein bestätigter vollständiger A6.8-Build. **Integration Candidate; A6.9-Browsercheck offen.**

Drei überprüfte Daten-Schreibpfade entfallen: `patchCaseData` aus V213 (OVAR1/CRC1), `patchOvarText216` aus V216 (OVAR1) und die Start-Normalisierung aus V240Y1 für zehn LAB-C4/C5-Fälle. Die drei Definitionen und drei ausschließlich dafür verwendeten Hilfen sind entfernt. Das sind zehn präzise Edits in drei Inline-Scripts; einer davon aktualisiert nur den LAB-Konsolenstatus.

Die gezielte A6.8-Probe erreicht alle drei tatsächlichen Start-Aufrufstellen. V213 verändert vorübergehend zwei Fälle; V216 verändert OVAR1. Ihre endgültigen Inhalte liegen bereits in Canonical und werden nach den übrigen Legacy-Layern wiederhergestellt. Die LAB-Normalisierung wird insgesamt 78-mal aufgerufen, davon 20-mal für die passenden zehn Fälle über Map und Array. Alle 20 passenden Aufrufe erhalten schon das Canonical-Schema und ändern keine Inhalte.

Die LAB-Renderer-Anpassung `v240y1Cards`/`v17Cards` bleibt für beide Schlüsselpaare erhalten: `label/value` und `title/content`. Metadaten und zehn IDs bleiben gleich. OVAR-Runden, Entscheidungen, Berichte, dynamisches Scoring und TAT sowie CRC-Bundlelogik bleiben byte-identisch. Auch `findCase` bleibt erhalten, weil der Fallwechsel es benötigt. Alle verbliebenen benannten Funktionen sind unverändert.

Nur `index.html` ändert sich: **2.154.953 -> 2.145.298 Bytes**, also **9.655 Bytes weniger**. Die gesamte primäre Runtime, übrigen Laufzeitdateien, Styles und Scriptreihenfolge bleiben byte-identisch. Die Umkehrprüfung der zehn Edits rekonstruiert A6.8 exakt. Keine neue fachliche Kuration, Änderung von Produkttexten oder Sprachdateien, kein neuer Wrapper/Observer.

Validierung: 134/134 Quellprüfungen, 43/43 A6.8-Vergleiche, 99 Syntaxeinheiten, 254/254 Runtime-Prüfungen und 108/108 gezielte Szenarioprüfungen bestanden. Die Zusatzprüfung vergleicht neun OVAR- und fünf CRC-Zustände, zehn LAB-Fälle und drei Karten-Fallbacks in DE/EN/RO/UK: Scores, Score-Caps, TAT, Berichtsobjekte und vollständige HTML-Hashes stimmen exakt mit A6.8 überein.

Bestände: 91 Fälle, 91 Deep Dives, 30 Signatures, 44 Methods Focus, 5 Kurse, 23 eindeutige Kursfälle. Registrierung an allen 97 Ladepunkten, vollständige Anzeigedaten in elf Sprachen und getestete Hybridberichte bleiben gleich.

Die späte Canonical-Integration wird weiterhin benötigt: Nach den erhaltenen Legacy-Layern zeigt das Ladeprotokoll noch 57 abweichende Fall- und 23 Deep-Dive-Payloads, die sie ersetzt. Ihre Vereinfachung erfordert einen weiteren getrennten Schritt.
