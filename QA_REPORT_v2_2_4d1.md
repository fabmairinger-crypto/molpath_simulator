# QA Report – MolPath Simulator v2.2.4d1 Method Catalog Escape Hotfix

## Fehlerursache

Der v2.2.4d-Methodenpatch wurde mit `replace(..., 1)` vor das **erste** Vorkommen von `</body></html>` gesetzt. Dieses erste Vorkommen war nicht das Ende der App, sondern Bestandteil der von `reportDocumentHtml()` erzeugten HTML-Zeichenkette. Das echte `</script>` des Patches beendete dadurch das äußere App-Script vorzeitig; der folgende JavaScript-Code erschien als sichtbarer Seitentext.

## Korrektur

Der Patch wird nun ausschließlich vor dem letzten tatsächlichen `</body>` der App eingefügt. Die Berichts-Template-Strings bleiben unverändert und enthalten weiterhin ihre absichtlich escaped `<\/script>`-Sequenzen.

## Prüfergebnisse

- Block-1–3-Patch vorhanden: 1
- UI-Reste-Patch vorhanden: 1
- Methoden-Hotfix vorhanden: 1
- Sichtbarer Rohcode `function openReportWindow`: False
- Sichtbarer Rohcode Fallregistry: False
- Einfügung am tatsächlichen Dokumentende: True
- HTML-Parser-Script-Elemente: 14
- Index SHA-256: `b2bae23d3e5078d7bd01c4a25340c2386ad90386674e46e7ca431f2cdab8de87`

Die 71 Methoden, 17 Kategorien und 55 Erklärungstexte sind inhaltlich unverändert gegenüber v2.2.4d; korrigiert wurde ausschließlich die Einfügeposition des Runtime-Scripts.
