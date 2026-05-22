# QA Report v2.1.6 – Ovar Phase Text + Dynamic Score/TAT Fix

## Basis
- v2.1.5 Syntax Leak Fix
- Ovar-Mehrphasenlogik, CRC-Bundle-Logik und Case-Switching bleiben erhalten.

## Geprüfte / adressierte Punkte
- Phase-1-Texte im Ovar-Fall neutralisiert: keine BRCA1-Variante, kein C>T/G>A-Muster, kein HRD-Graubereich vor Runde-1-Laborlauf.
- Artefaktinformationen erscheinen erst als Laborergebnis nach Runde 1.
- Dynamisches Ovar-Complex-Scoring eingeführt: Domänenmaxima wachsen mit Phase 2.
- Scorecard zeigt keine Werte > Maximalwert mehr an.
- Liquid Biopsy in Runde 2 wird als korrekte Eskalation bewertet und ist kein Primär-Budget-Killer.
- TAT-Erweiterung durch begründete Bestätigungsdiagnostik wird im Material-/TAT-Scoring toleriert.

## Scope
Keine bewusste Entfernung von Funktionen, Fällen, Kursen, Reports, Teaching Sheets oder Methodenkatalog.
