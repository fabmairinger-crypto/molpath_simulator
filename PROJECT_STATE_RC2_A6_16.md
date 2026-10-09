# Übergabestand 2026-10-09

A6.15 von Fabian im Browser bestätigt. A6.16 ersetzt vier Dateien unter i18n/legacy (v240z7/T1, z8/T2, z9/T3, z10/T4). Nur frühe Parser-Start-Render werden vom unveränderten z10a-Hotfix abgedeckt. Wörterbuch-Merges, Sprachübernahme, Provenienz, Callback-Reihenfolge und Late-load-Verhalten erhalten. A6.16-Browsercheck offen.

Moderne Timeline und aktuelle Schrittaufteilung unverändert. index.html aus A6.14 und die acht Flagship-Dateien aus A6.15 bleiben erforderlich. 91 Fälle, 91 Deep Dives, 30 Signatures, 44 Methods Focus, fünf Kurse und 23 eindeutige Kursfälle unverändert. OVAR1 mit zwei abgestimmten Reasoning-Stufen und vier Fragen; Gate-Modul und Canonical aus A6.10 unverändert erforderlich. Fachliche Gate-Änderungen vorher besprechen.

NodeVM-Messung: Core-Render 40 -> 36; geplante Callbacks 695 -> 619. Elf Startup-Sprachen mit identischen vollständigen Wörterbüchern und Home/Timeline/Styles-Endzuständen. Keine reale Browser-Zeitmessung. Weitere Änderungen nur anhand tatsächlicher Aufrufwege und mit Vergleichs-QA.
