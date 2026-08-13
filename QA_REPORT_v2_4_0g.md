# QA Report – v2.4.0g LAB_RUN_002 Assessment Media Visibility Hotfix

## Scope
Gezielter Hotfix auf **v2.4.0f**. Keine Falllogik oder Assets wurden verändert.

## Code-Diff
Gegenüber v2.4.0f wurden nur folgende funktionalen Punkte geändert:
1. Versionsmarke `v2.4.0f` → `v2.4.0g`
2. `lab24MediaAllowed()` erlaubt die bestehenden Medien nun für den aktiven Fall unabhängig vom UI-Modus
3. sichtbarer CSS-Versionstext auf `v2.4.0g` aktualisiert

## Static QA
- Inline executable scripts: **36/36 syntax PASS** (`node --check`)
- Asset-Pfade unverändert: 3 bekannte `assets/lab_run_002/*.png`-Referenzen
- keine Decision-/RCA-/CAPA-/Audit-IDs verändert
- keine Scorekonstanten verändert

## Targeted media-policy smoke
- `LAB_RUN_002_v0_8` aktiv → `lab24MediaAllowed() = true`: **PASS**
- anderer Fall aktiv → `lab24MediaAllowed() = false`: **PASS**
- damit werden Run/QC-Dashboard und NTC Variant Viewer im Assessment vor Abschluss gerendert

## Assessment-Schutz – Regression
Folgende Schutzmechanismen bleiben unverändert im bestehenden Code:
- `lab24AssessmentLocked()` bleibt aktiv für Assessment vor Fallabschluss
- Learning Objectives / didaktische Zusatzblöcke bleiben im Assessment geschützt
- Reasoning-Gate-Reveal/Teilscore bleibt durch den v2.4.0e-QA-Hotfix geschützt
- Immediate Decision-/RCA-Feedback bleibt vor Abschluss verborgen
- Deep-Dive-Debrief wird weiterhin nur bei `state.lab.finalized` gerendert
- `critical_fail`-Korrektur aus v2.4.0e bleibt im Runtime-Code vorhanden

## Medien
Keine PNG-Datei wurde geändert. Der Patch setzt die bereits mit v2.4.0f installierten Assets voraus:
- `assets/lab_run_002/run_qc_dashboard_001.png`
- `assets/lab_run_002/ntc_variant_viewer_001.png`

Das statische Plate-Referenzasset bleibt weiterhin nur Referenz; die Runtime nutzt die native Plate-Map.

## Erwartetes Verhalten
### Assessment vor Abschluss
- vollständiges Run-/QC-Dashboard: **sichtbar**
- vollständiger NTC Variant Viewer: **sichtbar**
- QC FAIL / Review-/Kontaminationshinweise innerhalb dieser realistischen Systemansichten: **sichtbar**
- Nutzerantwort als richtig/falsch markiert: **nicht sichtbar**
- Gate-Teilscore: **nicht sichtbar**
- Musterlösung / Deep-Dive-Debrief: **nicht sichtbar**

### Nach Abschluss
- bestehendes Abschlussfeedback und Debrief unverändert
- Medien weiterhin sichtbar

## Manuelle Kurzprüfung
1. v2.4.0g über eine funktionierende v2.4.0f-Installation kopieren.
2. `LAB_RUN_002` im Assessment Mode öffnen.
3. Zum QC-Ereignis wechseln.
4. Prüfen, dass Run-/QC-Dashboard und NTC Variant Viewer vollständig sichtbar sind.
5. Clinical-Reasoning-Gate absenden: keine Correct/Incorrect-Farben und kein Teilscore.
6. Fall bis Audit abschließen: Debrief erscheint erst jetzt.
