# QA Report – MolPath Simulator v1.5.2 QA Freeze

Datum: 2026-05-19

## Ziel

v1.5.2 ist ein Freeze-/Dokumentationsstand auf Basis von v1.5.1. Es wurden keine neuen Engine-Features ergänzt und keine App-Teile bewusst entfernt.

## Geprüfte Punkte

| Prüfpunkte | Status |
|---|---|
| Assessment Mode ohne Lösungshilfen vor Fallabschluss | geprüft, ok |
| Complex-Fälle mit Twist/Kipppunkt | geprüft, ok |
| Methoden-UI mit Suche/Filter/Klappboxen | geprüft, ok |
| Methodenbewertung nur im Lern-/Dozentenmodus sichtbar | geprüft, ok |
| Clinical-Reasoning-Gates | exemplarisch geprüft, ok |
| Score-Caps / Berichtslogik | exemplarisch geprüft, ok |
| Core-/MVP-/Complex-Stichprobe | geprüft, ok |
| Paketstruktur mit `archive/`, `exports/`, Daten, Assets, Templates | geprüft, ok |
| JavaScript-Syntaxcheck | geprüft, ok |

## Funktionsbestand

- 91 Fälle
- MTB/LAB/RES-Domänen
- Lern-/Trainings-/Assessment-/Dozentenmodus
- harmonisierte Fallkarten mit Länge, Schwierigkeit, Status und Review-Flags
- Clinical-Reasoning-Gates
- Score-Caps inklusive Kombinationslogik
- universeller Methodenkatalog
- Methodensuche, Methodengruppenfilter und aufklappbare Methodenkategorien
- Method-Rule-Filter nur im Lern- und Dozentenmodus
- Abschluss- und Dozentenberichte
- JSON-Export
- Assets, Templates, Fallinventar und AP1b-Kurationsunterlagen

## Ergebnis

v1.5.2 kann als stabiler AP1-Freeze und Arbeitsgrundlage für v1.6 Kurs-/Session-Logik verwendet werden.
