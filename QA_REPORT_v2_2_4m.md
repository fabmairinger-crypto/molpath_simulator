# QA Report – v2.2.4m Deep Dive 09

## Basis

- Fortsetzungsbasis: `molpath_v2_2_4l_res_hyp_deepdive08_translation_full_package.zip`
- Nutzerbasis dieser Serie: `v3.zip`
- Fall: `MTB_CRC_001_v0_6`
- Review-Hash: `1ffaf7f35e93a83ac246783709d10bbc5f1b7a57701df2a5ba4b826dec4b510e`
- Reviewte Texte: 136
- Quelltext-Lokationen: 149

## Integration

- EN / RO / EL / ES / FR integriert
- Deutsche Originalwerte werden beim Rückwechsel wiederhergestellt
- RAS/BRAF/MMR/MSI-, MLH1/PMS2-, anti-EGFR-, Immuntherapie- und Lynch/sporadisch-Kommunikation integriert
- Technische IDs/Enums bleiben unverändert
- Kein neuer `MutationObserver`
- Kein zusätzlicher Sprachwechsel-Listener
- Deep Dives 01–08 bleiben Bestandteil der Build-Basis

## Bewusst nicht korrigiert

Der Quellstand enthält weiterhin zwei unterschiedliche Szenariobeschreibungen für denselben Fall:
- Basisfall: 58-jährige Patientin, linksseitig/Sigma
- Deep Dive: 62-jähriger Patient, rechtsseitiges Kolon

Diese Diskrepanz wurde im Übersetzungspatch nicht inhaltlich verändert.

## Runtime-Harness

- Node-Syntaxprüfung: True
- Sprachfolge geprüft: DE → EN → RO → EL → ES → FR → DE
- Falltitel, Deep-Dive-Twist und Briefing in jeder Sprache korrekt: True
- Versionsstempel in jeder Sprache stabil: True
- Technische Felder über alle Sprachen unverändert: True
- Deep-Dive-09-Wrapper erzeugt: True

Hinweis: Der Test ist ein isolierter Runtime-Harness mit den realen Fall-/Metadaten-/Deep-Dive-Strukturen. Eine vollständige visuelle Browsernavigation wird nicht behauptet.

## Unverändert

- Falllogik und korrekte Antwort-IDs
- Scores / Score-Caps
- TAT
- Methoden-IDs und Methodenwerte
- Speicherstände
- technische Enum-/ID-Werte
