# QA Report v1.7d.1 – Clinical Reasoning Gate Fix

## Anlass

Im Signature Case `MTB_NSCLC_001_v0_6` blieb der Clinical-Reasoning-Score trotz Auswahl korrekter Antworten bei 0 %.

## Diagnose

Die Deep-Dive-Gates verwenden folgende Datenstruktur:

```json
{
  "options": [{"id":"...", "label":"..."}],
  "correct": ["id_der_korrekten_option"]
}
```

Die v1.7d-App hatte beim Rendern fälschlich `option.correct` geprüft. Da dieses Feld in den Deep-Dive-Daten nicht existiert, wurden alle Optionen als falsch gewertet.

## Fix

Die Mapping-Logik wurde geändert auf:

```js
correct: v17Arr(q.correct).includes(o.id)
```

## Prüfpunkte

- JavaScript-Syntaxcheck: bestanden.
- Deep-Dive-Gate-Mapping: korrekte Optionen werden als korrekt erkannt.
- Keine bewussten Änderungen an Fallbibliothek, Kurslogik, Methodenkatalog oder Berichten.

## Status

Freigegeben als Bugfix-Version `v1.7d.1`.
