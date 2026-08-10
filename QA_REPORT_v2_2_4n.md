# QA Report – v2.2.4n Deep Dive 10

## Basis

- Fortsetzungsbasis: `molpath_v2_2_4m_crc_deepdive09_translation_full_package.zip`
- Nutzerbasis dieser Serie: `v3.zip`
- Fall: `MTB_OVAR_001_v0_7`
- Review-Hash: `35bed3b5f467416d0dac628215404e7ab232220367e13ee02466574104ef1934`
- Reviewte Texte: 146
- Quelltext-Lokationen: 157

## Integration

- EN / RO / EL / ES / FR integriert
- Deutsche Originalwerte werden beim Rückwechsel wiederhergestellt
- BRCA1/HRD/PARP-, FFPE-Artefakt-, Liquid-Biopsy/ctDNA- und Keimbahn-Kommunikation integriert
- Technische IDs/Enums bleiben unverändert
- Kein neuer `MutationObserver`
- Kein zusätzlicher Sprachwechsel-Listener
- Deep Dives 01–09 bleiben Bestandteil der Build-Basis

## Bewusst nicht korrigiert

Der Quellstand enthält weiterhin zwei markierte Content-Unstimmigkeiten:
- Basisfall und Deep Dive verwenden unterschiedliche Alters-/Zeitangaben.
- In den Metadaten steht weiterhin das fachfremde Lernziel zur RNA-basierten Fusionsdiagnostik.

Beides wurde im Übersetzungspatch bewusst nicht inhaltlich verändert.

## Runtime-Harness

- Node-Syntaxprüfung: True
- Sprachfolge geprüft: DE → EN → RO → EL → ES → FR → DE
- Falltitel, Deep-Dive-Twist und Briefing in jeder Sprache korrekt: True
- Versionsstempel in jeder Sprache stabil: True
- Technische Felder über alle Sprachen unverändert: True
- Deep-Dive-10-Wrapper erzeugt: True

Hinweis: Der Test ist ein isolierter Runtime-Harness mit den realen Fall-/Metadaten-/Deep-Dive-Strukturen. Eine vollständige visuelle Browsernavigation wird nicht behauptet.

## Unverändert

- Falllogik und korrekte Antwort-IDs
- Scores / Score-Caps
- TAT
- Methoden-IDs und Methodenwerte
- Speicherstände
- technische Enum-/ID-Werte
