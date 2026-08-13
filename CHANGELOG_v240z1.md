# MolPath Simulator v2.4.0z1 — LAB/QM Translation Placement Hotfix

## Basis
- v2.4.0z

## Fehlerursache
Der v2.4.0z-i18n-Block wurde versehentlich vor einem `</body></html>` eingefügt, das nicht das reale Dokumentende war, sondern innerhalb des JavaScript-Template-Strings des Report-Generators lag. Dadurch wurden `<script>`/JavaScript-Code in einen Template-String eingebettet und der Hauptscriptblock syntaktisch beschädigt.

## Fix
- v2.4.0z-i18n-Block aus dem Report-Template entfernt.
- Report-Template exakt auf den v2.4.0y1-Zustand zurückgeführt.
- Unveränderten LAB/QM-i18n-Block am tatsächlichen Dokumentende als eigener Top-Level-Scriptblock registriert.
- Versionsstempel auf v2.4.0z1 aktualisiert.

## Unverändert
- Alle 24 neuen LAB-Übersetzungsdatensätze und ihre Inhalte.
- 2.222 Translation-Mappings je Zielsprache (EN/RO/EL/ES/FR).
- Deutsche Mastertexte/Falllogik.
- LAB 27/27 Deep Dive.
- Signature 15/15.
- v2.4.0y1 C4/C5-Schema-Hotfix.
