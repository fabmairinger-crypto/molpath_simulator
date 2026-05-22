# QA Report v2.1.1 – Batch1 Content Expansion Fix

## Basis
- Ausgangsbasis: `molpath_simulator_v2_0b_5_safe_layout_patch.html`
- Nicht auf fehlerhafter v2.0b.4 aufgebaut.
- v2.1 Batch1-Content wurde erneut sicher integriert.

## Gefundener Fehler
In der v2.1-Ausgabe wurde JavaScript/HTML als sichtbarer Text im Hauptpanel angezeigt. Ursache war eine unsichere Integration des Batch1-Skripts in Report-/HTML-Templates sowie unescaped `</script>`-Sequenzen in Template-Strings.

## Fix
- Report-Template-`</script>`-Sequenzen wurden als `<\/script>` maskiert.
- Batch1-Integration wird nur einmal im echten Hauptdokument vor `</body>` eingefügt, nicht in Report-Templates.
- v2.0b.5-Funktionalität bleibt erhalten.
- Batch1-Deep-Dive-Fälle bleiben integriert.

## Geprüft
- JavaScript-Syntaxcheck aller tatsächlichen Script-Blöcke: bestanden.
- Anzahl tatsächlicher Script-Blöcke: 4.
- Keine sichtbare Roh-JavaScript-Ausgabe durch vorzeitig geschlossenes Script erwartbar.

## Enthalten
- 91 Fälle
- Kurs-/Session-Logik
- Fallbericht, Dozentenbericht, Teaching Sheets, Kursbericht 2.0
- 8 bisherige Signature-Cases plus Batch1 Deep-Dive-Fälle
- Methodenkatalog, Methodensuche/-filter, Score-Caps, Clinical-Reasoning-Gates
