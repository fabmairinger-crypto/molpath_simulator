# MolPath Simulator v2.4.0z3 — RES Deep Dive Block R2

## Basis
- v2.4.0z2 (RES R1)

## RES Block R2 — D2 Modelle / Validierung
Fünf bisher generische RES-v1.3-Fälle wurden auf kuratiertes Deep-Dive-Niveau gebracht:
- RES_MOD_001_v1_3 — Zelllinieneffekt vs. tatsächliche Modellpassung; molekularer Kontext, isogene Kontrollen, Dosis/Mechanismus.
- RES_MOD_002_v1_3 — Organoid für einfache PoC-Frage? Fit-for-purpose, gestufte Modellkomplexität und Stop-/Go-Gates.
- RES_MOD_003_v1_3 — PDO-Biobank als echtes Planspiel: Materialschutz, Präanalytik, Identity/Fidelity-QC, Kryo-Recovery, Metadaten, Release und Skalierung.
- RES_VAL_001_v1_3 — Omics-Kandidat CCNE1: unabhängige Kohorte vs. orthogonale Methode; RNA, FISH und IHC als getrennte Layer.
- RES_VAL_002_v1_3 — Starker präklinischer AXL-Effekt ohne Patientenmaterial: unselektierte Human-Tissue-Brücke, Kompartiment, Prävalenz und patientennahe Funktion.

## Didaktische Architektur
Jeder Fall enthält:
- fallindividuelle Forschungsstory und realistische Daten-/Ressourcenlage
- spezifische Hypothesen-, PICO-, Design-, Methoden-, Analyse- und Pitfall-Optionen
- Opening Scene, Projektbriefing und Kontextkarten
- Vorbefunde und Material-/Ressourcen-Constraints
- 3 Reasoning Gates
- Decision Task, Expected Path, akzeptable Alternativen und Low-value-Traps
- Twist / kritischen Wendepunkt
- Result Packages, Follow-up-Logik und Deep-Dive-Debrief
- Dozenten-Musterantwort, Scoring-Fokus und Diskussionsfragen

## Status nach Patch
- RES Deep Dive: 12/22
- Gesamt Deep Dive: 81/91
- Verbleibend: 10 RES-Fälle
- Signature Cases: unverändert 15/15
- Sprache: deutscher RES-Master für R1-R2; Übersetzung EN/RO/EL/ES/FR weiterhin bis zum RES-Content-Freeze zurückgestellt.

## Technisch unverändert
- 15 kanonische Signature Cases
- bestehende MTB/MET- und LAB-Deep-Dives sowie deren Übersetzungen
- bestehende RES-Signature-Deep-Dives
- RES R1 aus v2.4.0z2
- Scoring-/Assessment-/Timeline-Engine
