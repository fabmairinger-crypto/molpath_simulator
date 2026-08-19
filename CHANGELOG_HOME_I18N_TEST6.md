# MolPath Simulator — HOME TEST6 central i18n cleanup

Basis: `v2-5-0b_HOME_TEST5_POSTLOADER` (funktionierend).

## Änderung
- Home-/Help-/Manual-/Tutorial-Copy aus der lokalen `COPY`-Map in `v250b_home_screen.js` entfernt.
- Neuer zentraler Namespace `home` in `i18n/de.js`, `en.js`, `ro.js`, `el.js`, `es.js`, `fr.js`, `ru.js`, `tr.js`.
- Home liest Texte ausschließlich über `MolPathLocaleRegistry.namespace('home', lang)`.
- Deutscher Source-Namespace bleibt zentraler Fallback über die bestehende LocaleRegistry.

## Coverage
- 8/8 Sprachen
- 36/36 Home-Keys je Sprache
- 5 Kurzanleitungs-Schritte
- 7 Tutorial-Schritte
- 3 Simulationsbereiche
- 4 What’s-new-Einträge

## Nicht verändert
- `i18n/core.js`
- `i18n/languages.js`
- `index.html`
- Responsive Shell
- Startup/Loader
- Asset-Modal
- Cases / Scoring / Runtime

Die Texte wurden unverändert aus TEST5 übernommen; dieser Patch ist ein Architektur-/i18n-Cleanup, keine neue Übersetzungsrunde.
