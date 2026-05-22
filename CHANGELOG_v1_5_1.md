# MolPath Simulator v1.5.1 – Methods UI Patch

## Zweck
Patch auf Basis von v1.5 ohne bewusstes Entfernen bestehender Funktionen.

## Änderungen

- Methodensuche im digitalen Auftragsschein wiederhergestellt.
- Methodengruppen-Filter wiederhergestellt.
- Bewertungsfilter nach Method Rule (`recommended`, `optional`, `reflex`, `low_value`, `invalid`) nur in Lernmodus und Dozentenmodus sichtbar.
- In Trainingsmodus und Assessment Mode bleiben Method Rule-Hilfen verborgen und erscheinen erst im Abschlussbericht.
- Methodenbereiche als aufklappbare Kategorien umgesetzt.
- Kategorien öffnen automatisch bei aktiver Suche, gewähltem Methodengruppen-Filter oder bereits ausgewählten Methoden.
- Bestehende v1.5-Logik für Clinical-Reasoning-Gates, Score-Caps, Method Rules, Berichte, Dozentenmodus und Exporte bleibt erhalten.
- Zusätzlich wurde ein vorhandener doppelter Funktionskopf in `totals()` bereinigt, sodass der JavaScript-Syntaxcheck sauber durchläuft.

## Syntaxcheck
`node --check` auf dem extrahierten JavaScript: bestanden.
