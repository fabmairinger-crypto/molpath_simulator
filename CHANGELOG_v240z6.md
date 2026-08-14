# MolPath Simulator v2.4.0z6 — RES R5 / RES Content Freeze

## Basis
- Ausgangsstand: **v2.4.0z5**
- Patch-only; bestehende MTB/MET/LAB- und RES-R1–R4-Inhalte bleiben unverändert.

## Neu: RES Deep Dive Block R5

### RES_GRANT_001 — Drittmittel / Projektarchitektur
- großer Planspielfall: Aims → Work Packages → Deliverables → Milestones / Go-No-Go
- task-basierter Budget- und FTE-Plan, Critical Path und Risk Register
- Twist: reale Rekrutierungsrate macht das prospektive Ziel n=250 unmöglich; Scope muss transparent revidiert werden

### RES_IMPL_001 — Translation in Routine
- publizierter synthetischer TRI-3-Expressionsscore wird auf lokale FFPE-Routine übertragen
- trennt analytische Validität, klinische Validität und Workflow-/Implementierungsfähigkeit
- Cutoff-Lock, Fail-Rate, TAT, Materialverbrauch und Kosten
- Twist: 22 % FFPE-Fail-Rate durch Gen C → gezieltes Redesign statt Fehlklassifikation

### RES_TEAM_001 — Interdisziplinäre Übersetzung
- Klinik, Pathologie, Labor und Bioinformatik werden über eine explizite End-to-End-Übersetzungskette verbunden
- gemeinsame Endpunktdefinition, Cohort flow, Data Dictionary, Sample-ID-Mapping, Handover und Decision Log
- Twist: nach 80 Messungen werden Chemo-ICI, Steroide und variable Bildgebung als relevante Heterogenität sichtbar

## Status nach R5
- RES Deep Dive: **22/22**
- Gesamt Deep Dive: **91/91**
- verbleibende Nicht-Deep-Dive-Fälle: **0**
- Signature Cases: **15/15 unverändert**
- RES deutscher Master-Content: **Freeze erreicht**
- Nicht-deutsche RES-Übersetzungen: weiterhin ausstehend; nächster sinnvoller Schritt ist die gesammelte RES-i18n-Phase.

## Technische Änderungen
- Versionstempel auf **v2.4.0z6** aktualisiert, inklusive Re-Stamp nach Sprachwechsel.
- Drei neue RES-R5-Deep-Dives werden zur Laufzeit in `DEEP_DIVE_CASES_V17` / `DEEP_DIVE_MAP_V17` registriert.
- Die drei Basisfälle werden als Deep Dive, explizit **nicht** als Signature Case, markiert.
