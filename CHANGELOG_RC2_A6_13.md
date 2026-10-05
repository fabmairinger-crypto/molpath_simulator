# A6.13 — identische Timeline-Buttons erhalten

Die moderne z11-Timeline wird über renderSteps() und den abschließenden z11PostRender() geprüft. Beide Pfade bleiben aktiv. Nur das erneute Schreiben identischer Buttons entfällt, solange Soll-Markup und tatsächliches serialisiertes DOM übereinstimmen. Ein WeakMap-Eintrag pro Root speichert Soll-HTML und die Browser-Serialisierung nach dem letzten Schreiben. Dadurch führen normalisierte Attribute nicht zu unnötigen Neuschreibungen; externe DOM-Änderungen, neue Roots oder geänderte Schritte/Sprache/Freigaben lösen weiterhin einen Neuaufbau aus. Die Scrollkorrektur läuft auch ohne Neuschreiben.

Die moderne Aufteilung, Domain-Farben, Markierungen, Sperren, Klickhandler, Übersetzungen und OVAR-Gate-Stufen bleiben erhalten. Der vorhandene HTML-Generator ist unverändert. Drei gezielte Ersetzungen in einem Inline-Script; nur index.html geändert. Keine fachlichen Änderungen und kein neues Sprach-Delta.

254 Runtime-, 720 OVAR-Gate-, 77 CRC/LAB- und 40 Timeline-Differenzchecks bestanden; 100 Syntaxeinheiten ohne Fehler. Zusätzlich wurden 316 Timeline-Ausgaben in echten geordneten Runtime-Läufen verglichen: alle identisch, mit 91 Fällen und elf Sprachen.

Instrumentierter Boot: Timeline-DOM-Schreibvorgänge 107 -> 8. Anzahl Timeline-Aufrufe, Core-Render, Sprach-Hooks, Observer und geplante Callbacks bleiben gleich. Gemessen im VM-Lauf, keine Behauptung über reale Browserzeit. A6.13-Browsercheck offen.
