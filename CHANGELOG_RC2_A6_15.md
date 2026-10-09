# A6.15 — Flagship-Start nur für den aktiven Fall neu rendern

Acht Flagship-Module (CRC2, CRC1, NSCLC2, MET_NGS_003, OVAR1, OVAR2, CNS1, IO1) initialisierten beim Start ihre Styles und Falldarstellung und renderten anschließend die gesamte Ansicht auch dann, wenn ein anderer Fall aktiv war. Ein beim Laden erfasstes Parser-Flag begrenzt ausschließlich diesen initialen Render: Er bleibt aktiv, wenn der eigene Fall geöffnet ist oder das Modul nach dem Parser-Start geladen wird.

Alle acht Start-Callbacks, Styles, Presentation-Refreshes, historischen Stamp-Aufrufe/Timer und Fehlerbehandlung bleiben erhalten. Aktive Render-/i18n-/Asset-Handler, klinische Regeln, Gate-Logik und Sprachtexte bleiben byte-identisch. Pro Datei wird ausschließlich der Boot-Bereich erweitert. index.html inklusive moderner Timeline und Schrittaufteilung bleibt unverändert.

Kontrollierter Standardstart: vollständige Core-Render 48 -> 40; geplante Callbacks 847 -> 695; Timeline-Aufrufe 82 -> 66. Tatsächliche Timeline-DOM-Schreibvorgänge bleiben 8, DOMContentLoaded-Callbacks bleiben 80. Keine Aussage über echte Browserzeit.

254 Runtime-, 720 OVAR-Gate-, 77 CRC/LAB-, 40 Timeline- und 48 Boot-Guard-Checks bestanden. Neun Startup-Szenarien (Standard plus jeder der acht Flagship-Fälle als aktiver Startfall) mit je sieben Checks bestanden und stimmen bei Home-HTML/Sichtbarkeit, Timeline und Styles exakt mit A6.14 überein. Die Guards werden auch für späteres Laden bei interactive/complete mit aktivem und inaktivem Fall geprüft. 100 Syntaxeinheiten ohne Fehler. Echter A6.15-Browsercheck offen.
