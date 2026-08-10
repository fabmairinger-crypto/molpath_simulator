# QA Report v2.2.0 – Multilingual Foundation

Basis: `molpath_simulator_v2_1_7_syntax_escape_fix_package.zip`

## Implementiert
- Sprachumschalter: Deutsch, English, Română, Ελληνικά, Español, Français.
- Clientseitige i18n-Schicht ohne Server, ohne API-Key, ohne externe Bezahl-API.
- Exact-match Translation Memory für zentrale UI-/Workflow-Texte.
- Fallback: fehlende Übersetzungen bleiben Deutsch.
- Text-Inventar `i18n_text_inventory_v2_2_0.csv` mit extrahierten aktuellen Texten für spätere Vollübersetzung/Review.
- Ovar-/CRC-Patches aus v2.1.7 bleiben erhalten.

## Grenzen
- Dies ist bewusst die Foundation-Schicht, keine behauptete vollständige fachliche Übersetzung aller Falltexte.
- Nicht übersetzte Fall-/Reportpassagen fallen sichtbar auf Deutsch zurück und sind im Inventar erfasst.

## Checks
- HTML geschrieben.
- JS-Syntaxprüfung: siehe Build-Check.
