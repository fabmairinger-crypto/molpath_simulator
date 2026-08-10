# MolPath Simulator v2.2.1 – Translation Registry & Full Text Audit

## Ergebnis

- **6.029 stabile Quellschlüssel** wurden registriert.
- **3.373 eindeutige deutsche Textnachrichten** wurden dedupliziert.
- **105 Nachrichten** besitzen bereits Übersetzungen in allen fünf Zielsprachen.
- Quellbereiche: UI, Methoden, Fälle, harmonisierte Metadaten, Reasoning-Gates, Score-Caps, Kurse, Deep-Dive-Fälle und zusätzliche Runtime-UI-Literale.
- Technische IDs, Fallcodes, Methoden-IDs, Gene, Varianten und definierte Fachkürzel werden nicht als normale Übersetzungseinheiten behandelt.

## Sprachumfang

| Sprache | Code | bereits vollständig registrierte Nachrichten | aktuell fehlend | Abdeckung |
|---|---:|---:|---:|---:|
| English | `en` | 105 | 3268 | 3.11% |
| Română | `ro` | 105 | 3268 | 3.11% |
| Ελληνικά | `el` | 105 | 3268 | 3.11% |
| Español | `es` | 105 | 3268 | 3.11% |
| Français | `fr` | 105 | 3268 | 3.11% |

Die geringe Gesamtquote ist erwartbar: v2.2.0 übersetzte bewusst nur den zentralen UI-Kern. v2.2.1 inventarisiert nun den restlichen Content, ohne ihn voreilig oder unkontrolliert in die Runtime einzubauen.

## Umfang nach Bereich

| Bereich | Schlüssel |
|---|---:|
| `cases` | 1727 |
| `courses` | 55 |
| `deep_dive` | 1030 |
| `metadata` | 634 |
| `methods` | 424 |
| `reasoning_gates` | 439 |
| `runtime_ui` | 1300 |
| `scoring` | 273 |
| `ui` | 147 |

## Klassifikation eindeutiger Nachrichten

| Klasse | Anzahl | Bedeutung |
|---|---:|---|
| `protected` | 162 | Gen, Variante, Kürzel, Fallcode oder bewusst unveränderter Fachbegriff. |
| `review` | 422 | Kurzer/mehrdeutiger Text; vor produktiver Übersetzung semantisch prüfen. |
| `translatable` | 2789 | Normaler, sprachabhängiger Benutzertext. |

## Wartungslogik

Jeder deutsche Ausgangstext erhält einen SHA-256-Hash. Bei späteren Fall- oder UI-Änderungen kann ein Delta-Skript dadurch unterscheiden:

- unverändert → vorhandene Übersetzung bleibt gültig;
- geändert → nur der betroffene Schlüssel wird als veraltet markiert;
- neu → nur der neue Schlüssel wird in die Übersetzungswarteschlange aufgenommen;
- entfernt → Schlüssel wird archiviert, aber nicht stillschweigend wiederverwendet.

## Dateien

- `i18n_key_registry_v2_2_1.csv/json`: Quellschlüssel, Pfade, Hashes und Übersetzungsstatus
- `i18n_message_catalog_v2_2_1.json`: deduplizierter Nachrichtenkatalog
- `i18n_coverage_v2_2_1.csv`: Abdeckung nach Bereich und Sprache
- `i18n_glossary_v2_2_1.json`: geschützte molekularpathologische Terminologie

## Bewusst noch nicht durchgeführt

- Keine automatische Vollübersetzung aller Fälle in diesem Patch.
- Keine Umverdrahtung der Fallengine auf tausende neue `t(key)`-Aufrufe.
- Keine Änderung an Scoring, Ovar-Mehrphasenlogik, CRC-Bundle-Logik, Fallwechsel oder Reports.

Der nächste sichere Schritt ist die Übersetzung und Runtime-Anbindung der Blöcke **UI/Methoden/Reports**, danach der Fälle nach Domänen.
