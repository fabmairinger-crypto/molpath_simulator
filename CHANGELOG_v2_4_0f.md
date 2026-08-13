# MolPath v2.4.0f – LAB_RUN_002 Final Production / Premium UI

## Basis
- **v2.4.0e LAB_RUN_002 QA Hotfix**
- alleinige technische Basis bleibt damit die v2.4.0d-Linie plus QA-Fix v2.4.0e

## Scope
Final-Production-/Premiumisierung von `LAB_RUN_002_v0_8` **ohne Änderung der kuratierten Story-, Decision-, Reasoning-, Scoring-, CAPA- oder Reportlogik**.

## Änderungen
- vorhandene 7 LAB-Schritte als horizontale Premium-Timeline gerendert:
  `Run → QC-Ereignis → Clinical Reasoning → Entscheidung → Ursache → CAPA → Audit`
- abgeschlossene/bereits besuchte Schritte bleiben anklickbar; noch nicht erreichte Schritte bleiben gesperrt
- Run-Kontext als nativer Run-/Batch-Cockpit dargestellt
- QC-Ereignis als native QC-Cards plus ausgewählte Variant-Call-Tabelle dargestellt
- zwei synthetische Low-VAF-Patientenproben ergänzt:
  - P07: `KRAS p.G12D`, VAF `5.4 %`
  - P12: `KRAS p.G12D`, VAF `6.1 %`
  - NTC: `KRAS p.G12D`, VAF `1.8 %`
- zwei freigegebene synthetische Medienassets integriert:
  - Run-/QC-Dashboard
  - NTC Variant Viewer
- interpretierende Medienansichten im Assessment vor Fallabschluss gesperrt; Rohdaten/QC bleiben sichtbar
- Clinical-Reasoning-Gate erhält nur einen neutralen Rohdaten-Snapshot; QA-sichere Reveal-Logik aus v2.4.0e bleibt bestehen
- bestehende Decision Options als native Run Release Console dargestellt
- Root-Cause-Step als nativer Investigation Workspace plus 96-Well-Plate-/Batch-Review dargestellt
- Plate-Map zeigt P07 und P12 knapp oberhalb der 5-%-Grenze räumlich benachbart zur Positivkontrolle und NTC als separaten QC-Flag
- CAPA als natives 6-stufiges Deviation/CAPA-Board dargestellt
- Audit als native Closure-/Traceability-Oberfläche dargestellt
- Deep-Dive-Debrief und Medienpaket weiterhin erst nach Fallabschluss
- sichtbare Top-Version im finalen UI-Layer auf `v2.4.0f` aktualisiert

## Assetentscheidung
Das zusätzlich erzeugte statische Plate-Layout wird als synthetisches Referenzasset mitgeliefert, aber **nicht in der Runtime angezeigt**, weil seine Well-Positionen nicht exakt zur bereits kuratierten Twist-Story passen. Die Runtime verwendet stattdessen die native, dynamische Plate-Map.

## Unverändert
- Deep-Dive-Text / Story
- Step-Reihenfolge
- Reasoning-Gates und richtige Antworten
- Decision Options / IDs / Feedback
- Root-Cause-Optionen / IDs / Bewertung
- CAPA-Komponenten / IDs / Required-Logik
- Audit-Checks / IDs / Bewertung
- Scoregewichte und Score-Caps
- v2.4.0e `critical_fail`-Korrektur
- Reports / Exporte
- alle anderen 90 Fälle
