# QA Report – v2.2.4o Deep Dive 11

## Basis

- Fortsetzungsbasis: `molpath_v2_2_4n_ovar_deepdive10_translation_full_package.zip`
- Nutzerbasis dieser Serie: `v3.zip`
- Fall: `MTB_IO_001_v1_0`
- Review-Hash: `ebd0ecaf067cae61c4f45071fe74a1d12429d6873bce0d526c1ea20c8d4b6503`
- Reviewte Texte: 148
- Quelltext-Lokationen: 163

## Integration

- EN / RO / EL / ES / FR integriert
- Deutsche Originalwerte werden beim Rückwechsel wiederhergestellt
- dMMR/MSI-H-, MSH2/MSH6-, IO/PD-L1-, TMB/TIL- und Lynch-/Keimbahn-Kommunikation integriert
- Technische IDs/Enums bleiben unverändert
- Kein neuer `MutationObserver`
- Kein zusätzlicher Sprachwechsel-Listener
- Deep Dives 01–10 bleiben Bestandteil der Build-Basis

## Bewusst nicht korrigiert

Der Quellstand enthält weiterhin eine markierte Content-Unstimmigkeit:
- Der generische/CUP-artige Basisfall (63-jähriger Mann) und der Signature-Deep-Dive (66-jährige Frau mit rezidiviertem Endometriumkarzinom) beschreiben unterschiedliche klinische Szenarien.

Diese Diskrepanz wurde im Übersetzungspatch bewusst nicht inhaltlich verändert.

## Runtime-Harness

- Node-Syntaxprüfung: True
- Sprachfolge geprüft: DE → EN → RO → EL → ES → FR → DE
- Falltitel, Deep-Dive-Twist und Briefing in jeder Sprache korrekt: True
- Versionsstempel in jeder Sprache stabil: True
- Technische Felder über alle Sprachen unverändert: True
- Deep-Dive-11-Wrapper erzeugt: True

Hinweis: Der Test ist ein isolierter Runtime-Harness mit den realen Fall-/Metadaten-/Deep-Dive-Strukturen. Eine vollständige visuelle Browsernavigation wird nicht behauptet.

## Unverändert

- Falllogik und korrekte Antwort-IDs
- Scores / Score-Caps
- TAT
- Methoden-IDs und Methodenwerte
- Speicherstände
- technische Enum-/ID-Werte
