# Changelog v1.7d.1 – Clinical Reasoning Gate Fix

## Bugfix

- Korrigiert: Deep-Dive-/Signature-Case Clinical-Reasoning-Gates erkannten korrekte Antworten nicht als korrekt.
- Ursache: Die v1.7b Deep-Dive-Daten speichern korrekte Optionen in `question.correct`, während die v1.7d-Rendering-Logik irrtümlich `option.correct` erwartet hat.
- Fix: Mapping setzt `option.correct = question.correct.includes(option.id)`.

## Unverändert

- Alle 91 Fälle bleiben enthalten.
- v1.6 Kurs-/Session-Logik bleibt enthalten.
- v1.5.2 Clinical Gates, Score-Caps, Method Rules, Berichte, Methoden-UI bleiben enthalten.
- 8 Signature-/Deep-Dive-Fälle bleiben enthalten.

## Status

- JavaScript-Syntaxcheck bestanden.
- Statischer Gate-Mapping-Test: korrekte Deep-Dive-Optionen werden wieder als korrekt markiert.
