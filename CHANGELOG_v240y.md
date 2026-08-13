# MolPath Simulator v2.4.0y — LAB Block 5 / C5 Digitalpathologie, Datenschutz, IT-Sicherheit & LIMS

## Basis
- Exakte Ausgangsbasis: **v2.4.0x APPROVED**.
- Patch-only: geändert wird ausschließlich `index.html`; Metadateien dieses Pakets sind neu.
- C1–C4 aus v2.4.0u/v/w/x bleiben unverändert.
- Patientenversorgung / MTB + MET bleibt unverändert bei **42/42 Deep Dive, vollständig übersetzt**.

## LAB Block 5 — C5
Neu ausgebaut:
1. `LAB_DIGI_001_v1_3` — aufgabenbezogene WSI-QC / Scanner-vs.-Präparat-Ursache / Tumoranteil / sicherer Fallback
2. `LAB_DIGI_002_v1_3` — PD-L1-KI / lokale End-to-End-Verifikation / cutoff-relevante Diskordanz / Human Oversight / Change-Control
3. `LAB_DATA_001_v1_3` — Patientendaten im Projektordner / Need-to-know / Datenminimierung / Pseudonymisierung / versteckte Excel-Inhalte
4. `LAB_DATA_002_v1_3` — Ransomware-/Archiv-Ausfall / Containment / klinischer Notbetrieb / sauberer Restore / Integrität / Reproduzierbarkeit (Planspiel)
5. `LAB_LIMS_001_v1_3` — LIMS-Downtime / zentrale temporäre IDs / Worklists / risikobasierte Freigabe / Reconciliation (Planspiel)

## Didaktische Schärfung
- `LAB_DIGI_001`: WSI-Eignung wird an der konkreten Aufgabe bewertet; Twist zeigt eine präparatbedingte lokale Unschärfe und relevante Korrektur des Tumoranteils.
- `LAB_DIGI_002`: KI wird nicht pauschal verworfen, sondern kontrolliert eingeführt; Twist zeigt ein reproduzierbares Zellklassifikations-Fehlermuster.
- `LAB_DATA_001`: sichtbares Löschen von Namen ist keine vollständige Pseudonymisierung; verstecktes Lookup und AutoSave-Version erweitern den Scope.
- `LAB_DATA_002`: vollständiges Planspiel mit parallelem Cyber-Containment und klinischer Business Continuity; Twist trennt Dateibackup von reproduzierbarer Analyseumgebung.
- `LAB_LIMS_001`: Downtime als eigener kontrollierter Betriebsmodus; Twist ist eine reale ID-Kollision durch zwei parallele lokale Listen vor Analysestart.

## Status nach Patch — LAB CONTENT FREEZE
- LAB: **27/27 Deep Dive**
- neu in diesem Patch: **5**
- LAB verbleibend: **0**
- Gesamtbestand Deep Dive: **73/91**
- Signature Cases: **15/15 unverändert**

## Internationalisierung
- Deutscher LAB-Master ist mit diesem Patch **27/27 content-frozen**.
- Bestehende Übersetzungen bleiben unberührt.
- Nächster sinnvoller Block: LAB EN/RO/EL/ES/FR auf Basis dieses Content-Freeze.

## Nicht geändert
- bestehende Signature-Deep-Dives
- MTB/MET-Logik oder -Übersetzungen
- UI-Architektur
- Assets
- bestehende Übersetzungsregistries
