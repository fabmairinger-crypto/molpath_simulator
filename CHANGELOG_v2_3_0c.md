# MolPath Simulator v2.3.0c — Signature Deep Dive i18n

## Basis
- technische Basis: **v2.3.0b**
- Patch-only; keine vollständige App-Kopie

## Geändert
Die vier in v2.3.0b zu Deep Dives ausgebauten Signature Cases wurden aus der kuratierten deutschen Fassung nach **EN / RO / EL / ES / FR** lokalisiert:

- `MTB_CNS_001_v1_0`
- `LAB_DOC_001_v1_0`
- `RES_OMICS_001_v1_0`
- `RES_ETH_001_v1_0`

Die deutsche Fassung bleibt unverändert die Content-Source-of-Truth. Die Lokalisierung betrifft ausschließlich die neuen Deep-Dive-Payloads; bestehende Base-Case-Übersetzungen bleiben unverändert aktiv.

## Bewusst unverändert
- 91 Fallobjekte / Case IDs
- 15 Deep Dives gesamt
- Clinical-Reasoning-Logik und Gate-IDs
- Method Rules
- Score Caps / Scoring Engines
- Courses / Progress
- Reports / JSON Export
- vorhandene 11 Deep-Dive-Übersetzungen
- Assets (keine neuen Assets)

## Runtime
- `index.html`: neuer finaler i18n-Layer `v230cSignatureDeepDiveTranslations`
- Version-Badge-Konstante auf `v2.3.0c` aktualisiert
- Sprachumschaltung kann jederzeit DE ↔ EN/RO/EL/ES/FR wechseln; Deep-Dive-Strings werden aus der unveränderten deutschen Source-Fassung reproduzierbar gesetzt.
