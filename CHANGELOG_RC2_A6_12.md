# A6.12 — Wörterbuchkopien pro Premium-Lokalisierungsdurchlauf wiederverwenden

Der aktive v240l-Sprach-Hook erzeugte beim Prüfen jedes einzelnen Textknotens wiederholt dieselben Sprachlisten und zusammengeführten Namespace-Wörterbücher. Ein lokaler, verzögert befüllter Cache lebt jetzt nur für einen synchronen localizePremium()-Aufruf. Sprachreihenfolge, erster passender Schlüssel, Zählerprüfung, Whitespace und CAPA-Warnbox bleiben erhalten. Beim nächsten Aufruf werden Register und Wörterbücher erneut gelesen, damit spätere Locale-Updates wirksam bleiben.

Sieben gezielte Ersetzungen in einem Inline-Script; nur index.html geändert. Render-Wrapper, Observer, Timer, klinische Daten, Reasoning-Gates, Sprachtexte und Lade-Reihenfolge bleiben gleich.

Differenztest mit 666 gemischtsprachigen Textknoten je Zielsprache: exakt gleiche Ausgabe in allen elf Sprachen; Namespace-Aufrufe 5.243 -> 12, Sprachlisten-Aufrufe 778 -> 1. Dies ist eine synthetische Testmenge und keine Messung echter Browserzeit oder Loader-Beschleunigung.

254 Runtime-, 720 OVAR-Gate-, 77 CRC/LAB- und 13 Premium-Differenzchecks bestanden; 100 Syntaxeinheiten ohne Fehler. Vollständige Runtime-Anzeigerekorde und Canonical-Snapshots entsprechen A6.11. Browsercheck für A6.12 offen.
