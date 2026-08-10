# QA Report – v2.2.4e1 NSCLC Interaction Hotfix

## Fehlerursache

Die vorherige v2.2.4e fügte einen zweiten dokumentweiten `MutationObserver` ein,
der die Versionsanzeige nach jedem DOM-Umbau erneut auf v2.2.4e setzte.

Im bestehenden UI-Reste-Patch lief bereits ein eigener Observer, der dieselbe Anzeige
auf v2.2.4d1 setzte. Zusammen mit dem allgemeinen Übersetzungs-Observer entstand
dadurch ein fortlaufendes Hin-und-her-Schreiben derselben Textknoten.

Auswirkung:

- Scrollen blieb möglich, weil es überwiegend im Browser-Compositor läuft.
- Klicks und andere JavaScript-Interaktionen reagierten nicht mehr zuverlässig,
  weil der Hauptthread durch die Mutation-Schleife ausgelastet war.

## Korrektur

- Der zusätzliche dokumentweite NSCLC-Observer wurde vollständig entfernt.
- Der bereits vorhandene UI-Reste-Observer ist nun der einzige Besitzer der
  Versionsanzeige und wurde kontrolliert auf v2.2.4e1 aktualisiert.
- Versionsfelder werden mit `data-i18n-skip` aus der allgemeinen Textübersetzung
  herausgenommen.
- Beim Wechsel der Sprache wird der NSCLC-Falldatensatz gezielt aktualisiert und
  anschließend einmal neu gerendert.
- Die 148 geprüften Übersetzungen und 153 Textpositionen bleiben unverändert.

## Automatischer Interaktionstest

Die vollständige gepatchte HTML wurde in Chromium über `set_content` geladen.

Bestanden:

- Event-Loop-Reaktion nach 50-ms-Timer: 0,111 Sekunden
- Klick auf „Freies Spielen“
- anschließender Klick auf „Kursmodus“
- Sprachwechsel auf Englisch
- englischer NSCLC-Falltitel korrekt
- Versionsanzeige bleibt v2.2.4e1
- JavaScript-Konsolenfehler: 0
- Page-Errors: 0
- Rückübersetzungs- und Methodenkatalog-Patches weiterhin vorhanden

Der entsprechende Test hing mit der fehlerhaften v2.2.4e reproduzierbar fest und
lief mit v2.2.4e1 vollständig durch.

## Unverändert

- Falllogik
- Scores und Score-Caps
- Methoden-IDs und Methodenwerte
- TAT
- Punkte und Gewebeschnitte
- Speicherstände
- erlaubte Tests
