# QA Report v2.1.4 – Case Switching Wire Fix

## Basis
- Ausgangspunkt: v2.1.3 Complex Phase + CRC Bundle Logic Patch

## Problem
- Fallwechsel über Dropdown/Sidebar war nicht mehr zuverlässig verdrahtet; UI blieb auf dem ersten Lungenfall stehen.

## Fix
- Robuste `switchCase`-Verdrahtung ergänzt.
- `v16SwitchToCase` für Kurssequenzen ebenfalls auf denselben sicheren Fallwechsel gelegt.
- `renderCasePicker` neu verdrahtet und Karten mit `data-case-id` versehen.
- Event-Delegation für Dropdown und Fallkarten ergänzt.

## Unverändert
- Ovar-Mehrphasenlogik v2.1.3 bleibt erhalten.
- CRC-Bundle-Logik bleibt erhalten.
- Kurse, Reports, Teaching Sheets, Methodenkatalog und v2.0b.5 Branding bleiben erhalten.
