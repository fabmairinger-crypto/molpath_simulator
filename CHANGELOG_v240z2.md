# MolPath Simulator v2.4.0z2 — RES Deep Dive Block R1

## Basis
- v2.4.0z1

## Audit
- Gesamtinventar: 91 Fälle.
- Patientenversorgung/MTB+MET: 42/42 Deep Dive.
- LAB/QM: 27/27 Deep Dive.
- RES: 22 Fälle insgesamt.
- Bereits vor diesem Patch als RES Deep Dive vorhanden: RES_HYP_001_v0_9, RES_OMICS_001_v1_0, RES_ETH_001_v1_0 (3/22).
- Vor v2.4.0z2 verbleibend: 19 RES-Fälle.

## RES Blockplan
1. R1 — D1 Rest: RES_HYP_002, RES_OMICS_002, RES_OMICS_003, RES_IMM_001 (dieser Patch)
2. R2 — D2 Modelle/Validierung: RES_MOD_001–003, RES_VAL_001–002
3. R3 — D3 Ethik/Data/AI Rest: RES_ETH_002–003, RES_DATA_001, RES_AI_001
4. R4 — D4 Projektbetrieb/Code/Autorenschaft: RES_PM_001–002, RES_ROLE_001
5. R5 — D4 Grant/Implementation/Team: RES_GRANT_001, RES_IMPL_001, RES_TEAM_001

## Inhalt v2.4.0z2
Vier bisher generische RES-v1.3-Fälle wurden auf kuratiertes Deep-Dive-Niveau gebracht:
- RES_HYP_002_v1_3 — Biomarker-Operationalisierung, Cutoff-Entwicklung und prognostische vs. prädiktive Aussage.
- RES_OMICS_002_v1_3 — Top-DEG FAP, Tumor-Purity, CAF/ECM-Netzwerk und Kompartimentvalidierung.
- RES_OMICS_003_v1_3 — Hallmark-/Label-Inflation, Gene-set-Overlap, invasive Front und räumliche Validierung.
- RES_IMM_001_v1_3 — ICI-Resistenz, Bulk-IFNγ/JAK-STAT, Zellkompartiment, Antigenpräsentation und funktionelle Validierung.

Jeder Fall enthält:
- fallbezogene Projektidee/Kontext statt generischer RES-Schablone
- kuratierte Hypothesen-, PICO-, Design-, Methoden-, Analyse- und Pitfall-Optionen
- Opening Scene, Projektbriefing und Kontextkarten
- Vorbefunde/Datenlage und Ressourcen-Constraints
- 3 Clinical-Reasoning-Gates
- Decision Task, Expected Path, akzeptable Alternativen und Low-value-Traps
- Twist / kritischen Wendepunkt
- Result Packages, Follow-up-Logik und Deep-Dive-Debrief
- Dozenten-Musterantwort, Scoring-Fokus und Diskussionsfragen

## Status nach Patch
- RES Deep Dive: 7/22
- Gesamt Deep Dive: 76/91
- Verbleibend: 15 RES-Fälle
- Signature Cases: unverändert 15/15
- Sprache: deutscher RES-Master für R1; Übersetzung EN/RO/EL/ES/FR bewusst bis zum RES-Content-Freeze zurückgestellt.

## Technisch unverändert
- 15 kanonische Signature Cases
- bestehende MTB/MET- und LAB-Deep-Dives sowie deren Übersetzungen
- RES Signature Deep Dives RES_HYP_001, RES_OMICS_001 und RES_ETH_001
- bestehende Scoring-/Assessment-/Timeline-Engine
