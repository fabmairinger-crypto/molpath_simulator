# Übergabestand 2026-10-09

A6.14 von Fabian im Browser bestätigt. A6.15 ersetzt acht externe v240z13..20-Flagship-JS-Dateien, nicht index.html. Ausschließlich inaktive Parser-Start-Render werden übersprungen; Styles, Presentation-Refreshes, Timer, aktive Fall-Render und Late-load-Verhalten erhalten. A6.15-Browsercheck offen.

Moderne Timeline und aktuelle Schrittaufteilung unverändert. 91 Fälle, 91 Deep Dives, 30 Signatures, 44 Methods Focus, fünf Kurse und 23 eindeutige Kursfälle unverändert. OVAR1 mit zwei abgestimmten Reasoning-Stufen und vier Fragen; Gate-Modul und Canonical aus A6.10 bleiben erforderlich. Fachliche Gate-Änderungen vorher besprechen.

NodeVM-Messung: Core-Render 48 -> 40; geplante Callbacks 847 -> 695. Neun Startup-Szenarien mit unverändertem Home/Timeline/Styles-Endzustand. Keine reale Browser-Zeitmessung. Weitere Änderungen nur anhand tatsächlicher Aufrufwege und mit Vergleichs-QA.
