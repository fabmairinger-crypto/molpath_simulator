# QA Report – v2.2.4p Signature Case 01

## Basis

- Fortsetzungsbasis: `v8.zip` / v2.2.4o
- Fall: `MTB_CNS_001_v1_0`
- Review-Hash: `1e74b5118f69aa53ff54d92541b6482c494094c4f21af1ed7bf3de6622016f35`
- Reviewte eindeutige Texte: 78
- Runtime-Positionen: 89

## Integration

- EN / RO / EL / ES / FR integriert
- Basisfall (`cases`) vollständig lokalisiert
- Metadaten/Lernziele (`V15_META_RECORDS`) lokalisiert
- Beide Clinical-Reasoning-Gates (`V15_GATE_RECORDS`) lokalisiert
- Deutsche Originalwerte werden beim Rückwechsel wiederhergestellt
- Technische IDs/Enums bleiben unverändert
- Kein neuer `MutationObserver`
- Kein zusätzlicher Language-Change-Listener
- Deep Dives 01–11 und bestehender Methodenkatalog bleiben Bestandteil der Build-Basis

## Quellintegrität

Die drei v8-Quellobjekte für den CNS-Fall wurden vor Integration strukturell mit dem freigegebenen Review-Payload verglichen:

- `cases`: exakt identisch
- `V15_META_RECORDS`: exakt identisch
- `V15_GATE_RECORDS`: exakt identisch

Entfernt man ausschließlich den neu eingefügten `v224p_cns_signature01_translation`-Block, ergibt sich erneut exakt der SHA256 der ursprünglichen v8-`index.html`:

`7c1d89a57e88fbdf44f1a627e06fb1c5a53f6c9151ad61647ca9392c15a3cc10`

Damit sind keine unbeabsichtigten Änderungen außerhalb des neuen Signature-Blocks enthalten.

## Runtime-Harness

- Node-Syntaxprüfung: bestanden
- Sprachfolge geprüft: DE → EN → RO → EL → ES → FR → DE
- Falltitel, klinischer Text, vollständige Interpretation, Metadaten/Lernziel und Reasoning-Gates in jeder Sprache korrekt
- Versionsstempel stabil
- Technische Felder (`id`, `mode`, `logic`, `difficulty`, `domain`, Gate-Typ, Score-Domain, Score-Cap) unverändert
- Signature-01-Wrapper erzeugt

Hinweis: Der Test ist ein isolierter Runtime-Harness. Eine vollständige visuelle Browsernavigation wird nicht behauptet.

## Unverändert

- Falllogik
- korrekte Antwort-/Test-IDs
- Scores / Score-Caps
- TAT
- Methoden-IDs und Methodenwerte
- Speicherstände
- bestehende Deep-Dive-Inhalte
