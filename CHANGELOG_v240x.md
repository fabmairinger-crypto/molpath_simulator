# MolPath Simulator v2.4.0x — LAB Block 4 / C4 Dokumentation, Audit, CAPA & Akkreditierung

## Basis
- Exakte Ausgangsbasis: **v2.4.0w APPROVED**.
- Patch-only: geändert wird ausschließlich `index.html`; Metadateien dieses Pakets sind neu.
- C1–C3 aus v2.4.0u/v/w bleiben unverändert.
- Patientenversorgung / MTB + MET bleibt unverändert bei **42/42 Deep Dive, vollständig übersetzt**.

## LAB Block 4 — C4
`LAB_DOC_001` ist bereits kuratierter Signature-Deep-Dive und bleibt unverändert. Neu ausgebaut:
1. `LAB_DOC_002_v1_3` — Ende-zu-Ende-Traceability / Wiederholungsläufe / objektive Identitätsbeweise / technische CAPA
2. `LAB_AUDIT_001_v1_3` — historische SOP-Gültigkeit / Kompetenznachweis / revisionsbezogene Impact-Analyse
3. `LAB_CAPA_001_v1_3` — wiederholte KRAS-G12D-Kontamination / Patientenscope / evidenzbasierte RCA / Restart & Effectiveness (Planspiel)
4. `LAB_QM_001_v1_3` — informell gelöster Near Miss / Just Culture / Barrieren / Trending
5. `LAB_LLM_001_v1_3` — LLM-SOP-Draft / lokale Validierung / Halluzinationskontrolle / Datenfluss / Human Review

## Didaktische Schärfung
- `LAB_DOC_002`: Plausibilität wird explizit von technischer Identität getrennt; Traceability wird als Beweiskette modelliert.
- `LAB_AUDIT_001`: der Auditor verlangt den historischen, nicht nur den aktuellen Zustand; v4.3 enthält im Twist eine entscheidungsrelevante Änderung.
- `LAB_CAPA_001`: vollständiges Planspiel von Containment über Root Cause bis Wirksamkeitsprüfung; Twist ist ein nicht risikobewerteter temporärer Zonen-/Gerätewechsel.
- `LAB_QM_001`: Near Miss wird nicht bestraft, sondern als Frühwarn- und Barriereninformation genutzt; Twist zeigt Underreporting als Trendproblem.
- `LAB_LLM_001`: LLM-Output bleibt untrusted Draft; lokale Validierungsdaten und kontrollierte Human Review sind autoritativ.

## Status nach Patch
- LAB: **22/27 Deep Dive**
- neu in diesem Patch: **5**
- LAB verbleibend: **5**
- Gesamtbestand Deep Dive: **68/91**
- Signature Cases: **15/15 unverändert**

## Internationalisierung
- Deutscher LAB-Master, Block 4.
- Bestehende Übersetzungen bleiben unberührt.
- LAB EN/RO/EL/ES/FR weiterhin gebündelt nach 27/27 Content-Freeze.

## Nicht geändert
- `LAB_DOC_001` Signature-Deep-Dive
- MTB/MET-Logik oder -Übersetzungen
- UI-Architektur
- Assets
- bestehende Übersetzungsregistries
