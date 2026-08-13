# MolPath Simulator v2.4.0v — LAB Block 2 / C2 Analytik, Kontrollen & Run-Freigabe

## Basis
- Exakte Ausgangsbasis: **v2.4.0u APPROVED**.
- Patch-only: geändert wird ausschließlich `index.html`; Metadateien dieses Pakets sind neu.
- C1-Präanalytik aus v2.4.0u bleibt unverändert.
- Patientenversorgung / MTB + MET bleibt unverändert bei **42/42 Deep Dive, vollständig übersetzt**.

## LAB Block 2 — C2 Analytik, Kontrollen, Run-Freigabe
`LAB_RUN_002` ist bereits kuratierter Signature-Deep-Dive und bleibt unverändert. Neu ausgebaut:
1. `LAB_RUN_001_v1_3` — schwache Positivkontrolle / Sensitivität / differenzierte Run-Freigabe
2. `LAB_RUN_003_v1_3` — erhöhte Duplicate-Rate / Library-Komplexität / unique depth / regionsspezifische Befundgrenze
3. `LAB_RUN_004_v1_3` — neues NGS-Kit-Lot / risikobasierte Lot-Verifizierung / Change Control
4. `LAB_RUN_005_v1_3` — PCR-Inhibition durch Ethanolreste / interne Kontrolle / Cleanup vs. Verdünnung vs. Reextraktion
5. `LAB_RUN_006_v1_3` — Post-PCR im Prä-PCR-Bereich / Kontaminationsscope / Dekontamination / Restart / CAPA (Planspiel)

## Didaktische Schärfung
- Keine generische „Stop/CAPA“-Schablone: jede Run-Abweichung erhält eine eigene analytische Entscheidungslogik.
- `LAB_RUN_001`: Kontrollversagen wird nach betroffener Leistungsdimension und Ergebnisrisiko differenziert.
- `LAB_RUN_003`: Duplicate-Rate wird nicht isoliert, sondern über unabhängige Molekülinformation und regionsspezifische Coverage bewertet.
- `LAB_RUN_004`: Lot-Verifizierung wird sauber von kompletter Methodenvalidierung getrennt.
- `LAB_RUN_005`: Verdünnung kann Inhibition verbessern, aber gleichzeitig die klinische LoD verschlechtern.
- `LAB_RUN_006`: räumlich-zeitliches Scoping + qualifizierter Restart statt „Fläche reinigen und weiter“.

## Status nach Patch
- LAB: **13/27 Deep Dive**
- neu in diesem Patch: **5**
- LAB verbleibend: **14**
- Gesamtbestand Deep Dive: **59/91**
- Signature Cases: **15/15 unverändert**

## Internationalisierung
- Deutscher LAB-Master, Block 2.
- Bestehende Übersetzungen bleiben unberührt.
- LAB EN/RO/EL/ES/FR weiterhin gebündelt nach 27/27 Content-Freeze.

## Nicht geändert
- `LAB_RUN_002` Signature-Deep-Dive
- MTB/MET-Logik oder -Übersetzungen
- UI-Architektur
- Assets
- bestehende Übersetzungsregistries
