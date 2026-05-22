# QA Report v2.1.7 – Syntax Escape Fix

## Basis
- Ausgangspunkt: v2.1.6 Ovar Phase Text + Dynamic Score/TAT Fix
- Ziel: Behebung des erneut sichtbaren JavaScript-Textes im Main Panel.

## Problem
In mehreren Report-/Popup-HTML-Templates waren literal eingebettete `</script>`-Sequenzen enthalten. Der Browser beendet ein Script-Element auch dann an `</script>`, wenn diese Sequenz innerhalb eines JavaScript-Template-Strings steht. Dadurch wurde der restliche JavaScript-Code als Text gerendert.

## Fix
- Alle `</script>`-Sequenzen innerhalb der Report-/Popup-Template-Strings wurden als `<\\/script>` escaped.
- Die tatsächlichen Script-End-Tags der App bleiben unverändert.

## Checks
- HTML enthält nach Patch nur noch die tatsächlichen Script-End-Tags als `</script>`.
- Alle Script-Blöcke wurden extrahiert und mit `node --check` syntaxgeprüft.
- Ovar-Mehrphasenlogik, CRC-Bundle-Logik, Fallwechsel, Layout/Branding und Reportfunktionen wurden nicht bewusst verändert.

## Status
Passed.
