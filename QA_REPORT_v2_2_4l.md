# QA Report – v2.2.4l Deep Dive 08

## Basis

- Fortsetzungsbasis: `molpath_v2_2_4k_lab_post_deepdive07_translation_full_package.zip`
- Ursprüngliche Nutzerbasis dieser Serie: `v3.zip`
- Fall: `RES_HYP_001_v0_9`
- Review-Hash: `aa625cdbaf179c22074dd236e33925fb7eb66f5c8ea1c938676bcb3e1106fadc`
- Reviewte Texte: 200
- Quelltext-Lokationen: 216

## Integration

- EN / RO / EL / ES / FR integriert
- Deutsche Originalwerte werden beim Rückwechsel wiederhergestellt
- Kombinierte sichtbare RES/AP1b-Metadatenzeile lokalisiert
- Technische IDs/Enums (u. a. `research`, `res_hypothesis`, `beginner_intermediate`, `res_anchor`) bleiben unverändert
- Kein neuer `MutationObserver`
- Kein zusätzlicher Sprachwechsel-Listener
- Deep Dives 01–07 bleiben Bestandteil der Build-Basis

## Runtime-Harness

- Node-Syntaxprüfung: True
- Sprachfolge geprüft: DE → EN → RO → EL → ES → FR → DE
- Falltitel und Twist-Titel in jeder Sprache korrekt: True
- Versionsstempel in jeder Sprache stabil: True
- Technische Felder über alle Sprachen unverändert: True
- Deep-Dive-08-Wrapper erzeugt: True

Hinweis: Der Test ist ein isolierter Runtime-Harness mit den realen Fall-/Metadaten-/Deep-Dive-Strukturen. Eine vollständige visuelle Browsernavigation wird nicht behauptet.

## Unverändert

- Falllogik und korrekte Antwort-IDs
- Scores / Score-Caps
- TAT
- Methoden-IDs und Methodenwerte
- Speicherstände
- technische Enum-/ID-Werte
