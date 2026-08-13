# MolPath Simulator v2.4.0y1 – LAB C4/C5 Schema Hotfix

Basis: v2.4.0y.

## Fix
- Behebt die fehlerhafte Darstellung der **Fallakte** (`[object Object]`) in allen 10 neu hinzugefügten LAB-Deep-Dives aus C4 und C5.
- Behebt leere **Vorbefund/QC-Kontextkarten**, die nur „Kontext“ zeigten.
- Normalisiert `case_briefing` aus Objektform in lesbaren Text.
- Normalisiert `pre_results` von `{label,value}` auf das vom bestehenden Renderer erwartete `{title,content}`-Schema.
- Ergänzt einen defensiven Renderer-Fallback für beide Kartenschemata.

## Betroffene Fälle
C4: LAB_DOC_002, LAB_AUDIT_001, LAB_CAPA_001, LAB_QM_001, LAB_LLM_001.

C5: LAB_DIGI_001, LAB_DIGI_002, LAB_DATA_001, LAB_DATA_002, LAB_LIMS_001.

## Unverändert
- Keine fachlichen Inhalte geändert.
- Keine Entscheidungen, Scores, Twists, CAPA-Logik oder Signature-Zuordnungen geändert.
- LAB bleibt 27/27 Deep Dive; Signature bleibt 15/15.
