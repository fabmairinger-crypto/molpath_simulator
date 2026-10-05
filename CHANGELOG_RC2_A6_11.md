# MolPath rc2 A6.11 — leere Versions-Hooks bereinigt

Nach dem Deaktivieren historischer Versions- und Metadaten-Schreiber blieben ihre Laufzeitketten aktiv. Sie riefen leere Funktionen auf, legten zwei reine Versions-Observer an und lösten im z12-Block einen zusätzlichen vollständigen Start-Render aus.

Entfernt werden 25 leere private Funktionen, 19 reine i18n-Weiterleitungs-Hooks, ein leerer Render-Wrapper, zwei reine Versions-Observer mit ihren RAF-Helfern, zwei Version-only-Timeouts sowie der z12-Bootstrap. Das dokumentierte z12-Disabled-Flag und der Metadatenexport bleiben erhalten. Mixed-Hooks für Premium-Lokalisierung, Dashboard, Branding, Timeline, Filter, Styles und Premium-DOM-Korrekturen bleiben aktiv. Die bisherigen Observer-Abschaltungen bleiben defensiv und funktionieren auch bei nicht mehr angelegten Versions-Observern.

78 präzise Edits betreffen 24 Inline-Scripts. index.html wird um 8.051 Bytes kleiner. Die gesamte primäre Runtime, alle übrigen Laufzeitdateien, Daten, Styles, Sprachdateien und Lade-Reihenfolge bleiben unverändert. OVAR-Gates und deren Randomisierung bleiben vollständig erhalten.

Instrumentierter Vergleich: Boot-Render 58 -> 57; Observer-Erstellungen 7 -> 5; DOMContentLoaded-Callbacks 90 -> 89; Sprach-Hook-Frames je Sprachwechsel 39 -> 20. Gemessen im kontrollierten VM-Lauf. Daraus wird keine konkrete Browserzeit oder prozentuale Tempoverbesserung abgeleitet.

Status: geprüfter Integration Candidate; A6.11-Browsercheck offen. Basis A6.10 vom Nutzer bestätigt.
