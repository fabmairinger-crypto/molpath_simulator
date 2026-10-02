# Versions- und Hybridwriter-Audit

Die alleinige sichtbare Versionsautorität ist `molpath_version.js`: `MolPathVersion.app` -> `applyVersion()` -> Tabtitel, `window.MOLPATH_APP_VERSION`, sichtbarer Top-Versionstext. Der ehemalige Hero-`versionBadge` bleibt in der bestehenden v230-UI ein Fallkategorie-Badge; nur im frühen Legacy-Layout dient er als Versionsfallback. Historische Modulversionskonstanten bleiben für Provenienz erhalten.

| Datei | Stillgelegte Stamp-Funktionen | Direkte Zuweisungen | Entfernte Versions-CSS-Regeln |
|---|---|---:|---:|
| `i18n/legacy/legacy_v223_v224_runtime.js` | stampVersion, stampVersion, stampVersion, stampVersion, stampVersion, stampVersion, stampVersion, stampVersion, stampVersion, stampVersion, stampVersion, stampVersion, stampVersion, stampVersion, stampVersion | 8 | 0 |
| `i18n/legacy/legacy_v230c_signature_deepdive.js` | — | 0 | 0 |
| `i18n/legacy/legacy_v240z10_res_t4_i18n.js` | v240z10Stamp | 0 | 0 |
| `i18n/legacy/legacy_v240z10a_res_t4_hotfix.js` | v240z10aStamp | 0 | 0 |
| `i18n/legacy/legacy_v240z7_res_t1_i18n.js` | v240z7Stamp | 0 | 0 |
| `i18n/legacy/legacy_v240z9_res_t3_i18n.js` | v240z9Stamp | 0 | 0 |
| `i18n/legacy/legacy_v240z_lab_i18n.js` | v240zStamp | 0 | 0 |
| `index.html` | lab24StampVersion, res24hStampVersion, res24iStampVersion, stamp, v240mStamp, v240nStamp, v240oStamp, v240pStamp, v240qStamp, stamp, v240sStamp, v240uStamp, v240vStamp, v240wStamp, v240xStamp, v240yStamp, v240y1Stamp, v240z2Stamp, v240z3Stamp, v240z4Stamp, v240z5Stamp, v240z6Stamp, z11Stamp, z12Stamp | 28 | 20 |
| `v240z13_crc002_flagship.js` | stamp | 0 | 2 |
| `v240z14_crc001_flagship.js` | stamp | 0 | 2 |
| `v240z15_nsclc002_flagship.js` | stamp | 0 | 2 |
| `v240z16_metngs003_flagship.js` | stamp | 0 | 2 |
| `v240z17_ovar001_flagship.js` | stamp | 0 | 2 |
| `v240z18_ovar002_flagship.js` | stamp | 0 | 2 |
| `v240z19_cns001_flagship.js` | stamp | 0 | 2 |
| `v240z20_io001_flagship.js` | stamp | 0 | 2 |
| `v250b_responsive_shell.js` | stamp | 0 | 0 |
| `v250b_startup_cover_hotfix.js` | stampVersion | 0 | 1 |
| `v260rc1_case_consistency_curation_i18n.js` | — | 0 | 0 |

Im index-Quelltext wurden zusätzlich die geprüften Titel-/Badgewriter in bestehenden Export-Templates entfernt. Die generischen Exporttitel und Reportinhalte bleiben erhalten. Die nichtversionsbezogenen Styles und alle Asset-Pfadliterals wurden separat auf Erhalt geprüft.

Die gemischte v230-Stamp-Funktion behält Kurs-/Fallnavigation und Hero-Kategorie; ihre Titel-/Versionszuweisungen sind entfernt. Vorhandene historische Callback-/Wrapperketten bleiben bestehen. Ein neuer Observer oder zusätzliche End-Wrapper wurde nicht eingeführt.

Die sechs `applyCaseLogic`-/`applyCasePresentation`-Schreibfunktionen z13/z14/z15/z16/z18/z20 aktualisieren nur getrennte Anzeigeobjekte. Der vorhandene Canonical-Integrationspunkt konfiguriert diese Kopien; die zugrunde liegenden A4b/A5-Daten bleiben unverändert. Zwei Legacy-Sprachhelfer sind auf dieselben Kopien umgestellt. `patchCases()` im Curation-Modul schreibt nach Canonical-Integration nicht erneut; TX und bestehende Report-/Methodenhooks bleiben erhalten.

Der rekursive Apply-Aufruf in `mergeI18n()` entfällt. Der vorhandene Boot-Apply bleibt erhalten. Alle Audit-Einträge stehen in `qa/writer_actions.json`.
