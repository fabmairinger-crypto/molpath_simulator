# MolPath Simulator v2.4.0u — LAB Block 1 / C1 Präanalytik

## Basis
- Exakte Ausgangsbasis: **v2.4.0t FINAL**.
- Patch-only: geändert wird ausschließlich `index.html`; Metadateien dieses Pakets sind neu.
- Patientenversorgung / MTB + MET bleibt unverändert bei **42/42 Deep Dive, vollständig übersetzt**.

## Audit vor Änderung
- Fallinventar LAB (C1–C5): **27 Fälle**.
- In v2.4.0t vorhanden: **27/27**.
- Bereits Deep Dive: **3/27** (`LAB_RUN_002`, `LAB_POST_001`, `LAB_DOC_001`).
- Diese drei sind Signature Cases; der kanonische Signature-Bestand bleibt **15**.

## LAB Block 1 — C1 Präanalytik & Probenmanagement
Neu als kuratierte deutsche Deep Dives ausgebaut:
1. `LAB_PRE_001_v1_3` — unbeschriftete Primärprobe / Identität
2. `LAB_PRE_002_v1_3` — grenzwertiges FFPE / Tumoranteil / DNA-QC / Negativaussage
3. `LAB_PRE_003_v1_3` — verzögerte Liquid Biopsy / Röhrchentyp / Präanalytik
4. `LAB_PRE_004_v1_3` — dekalzifiziertes Knochenmaterial / Dekalzifikationsprozess / Assay-Scope
5. `LAB_PRE_005_v1_3` — Materialschutz Routine vs. Forschung

Jeder Fall erhält fallindividuell:
- Opening Scene und Case Briefing
- Context Cards + Pre-results
- Material-/Ressourcenconstraints
- Clinical-Reasoning-Gates
- fallbezogene Laborleitungsentscheidung
- Root-Cause-Optionen
- CAPA-/Audit-Komponenten
- Twist / Ergebnisvarianten / Follow-up-Logik
- Deep-Dive-Debrief und Instructor Model Answer

## Status nach Patch
- LAB: **8/27 Deep Dive**
- neu in diesem Patch: **5**
- LAB verbleibend: **19**
- Gesamtbestand Deep Dive: **54/91**
- Signature Cases: **15/15 unverändert**

## Internationalisierung
- Dieser Patch ist der **deutsche LAB-Master für Block 1**.
- Analog zum erfolgreichen MTB/MET-Workflow werden die LAB-Inhalte zunächst bis 27/27 in Deutsch eingefroren; danach folgt der gebündelte EN/RO/EL/ES/FR-Übersetzungspass.
- Bestehende v2.4.0t-Übersetzungen werden nicht verändert.

## Nicht geändert
- Keine MTB-/MET-Falllogik
- Keine bestehenden Signature-Deep-Dives
- Keine UI-Architektur
- Keine Assets
- Keine bestehenden Übersetzungsregistries
