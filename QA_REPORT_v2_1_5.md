# QA Report v2.1.5 – Syntax Leak Fix

Date: 2026-05-22T07:03:08

## Scope

Hotfix auf Basis von v2.1.4. Ziel: sichtbaren JavaScript-Text im Main Panel entfernen, ohne Engine-, Fall-, Kurs- oder Reportfunktionalität zu kürzen.

## Ursache

Mehrere Report-/Popup-Templates enthielten rohe `</script>`-Sequenzen innerhalb eines inline JavaScript-Blocks. Browser beenden inline scripts an dieser Sequenz auch innerhalb von Template-Strings. Dadurch wurde der Rest des JavaScript-Codes als sichtbarer Text gerendert.

## Fix

- `</script>` innerhalb der eingebetteten Report-/Popup-Templates vor dem eigentlichen Hauptscript-Ende zu `<\/script>` escaped.
- v2.1.4-Fallwechsel-Fix, v2.1.3-Ovar-/CRC-Logik, v2.0b.5-Layout und alle v1.8-Reports bleiben erhalten.

## Checks

| Check | Ergebnis |
|---|---|
| Raw script closings vor Hauptscript-Ende | escaped |
| JavaScript-Syntaxcheck Block 1 | bestanden |
| JavaScript-Syntaxcheck weitere Patch-Blöcke | bestanden |
| Paketstruktur | erhalten |

## Hinweis

Bitte v2.1.4 verwerfen und v2.1.5 verwenden.
