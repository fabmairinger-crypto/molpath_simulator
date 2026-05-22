# CHANGELOG v1.8b – Teaching Sheets + Kursbericht 2.0

Datum: 2026-05-19T12:35:15

## Basis
- Ausgangsstand: v1.8a Reports Patch / v1.7e QA-Freeze
- Keine bewussten Kürzungen der bestehenden App-Funktionalität.

## Neu
- Teaching Sheet pro Fall als druckbare HTML-Ansicht.
- Teaching Sheet ist im Lern-, Trainings- und Assessment Mode erst nach Fallabschluss verfügbar.
- Teaching Sheet ist im Dozentenmodus jederzeit verfügbar.
- Kursbericht 2.0 mit Kursübersicht, Fortschritt, Domänenprofil, kritischen Mustern, Lernempfehlung und Wiederholungsfällen.
- Kursbericht 2.0 wird nur im Kursmodus angezeigt und freigeschaltet.
- Kursdatenexport im Kursmodus um Domänenprofil erweitert.
- Kursfortschritt speichert ab v1.8b zusätzlich Domänen-Scores je abgeschlossenem Kursfall.
- Export-/Berichtsbereich erweitert: Fallbericht 2.0, Dozentenbericht 2.0, Teaching Sheet, Kursbericht 2.0, JSON-Export.

## Sichtbarkeitslogik
- Fallbericht: nach Fallabschluss; im Dozentenmodus jederzeit zugänglich.
- Dozentenbericht: nur Dozentenmodus.
- Teaching Sheet: nach Fallabschluss; im Dozentenmodus jederzeit.
- Kursbericht 2.0: nur Kursmodus und mindestens ein abgeschlossener Kursfall.

## QA
- JavaScript-Syntaxcheck bestanden.
- v1.8a-Funktionen bleiben enthalten: Twist-Leak-Fix, Fallbericht 2.0, Dozentenbericht 2.0.
