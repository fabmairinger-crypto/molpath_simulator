# MolPath v2.4.0g – LAB_RUN_002 Assessment Media Visibility Hotfix

## Basis
- **v2.4.0f LAB_RUN_002 Final Production / Premium UI**
- Dieser Patch ist ausschließlich auf v2.4.0f anzuwenden.

## Anlass
Die synthetischen Run-/QC-/Variant-Medien bilden realistische LIS/LIMS-/Analyseinformationen ab. QC-Warnungen, Kontaminationsverdacht und Review-Hinweise sind Teil der Arbeitssituation des Falls und stellen in `LAB_RUN_002` keine vorweggenommene Musterlösung dar.

## Änderung
- vollständiges synthetisches Run-/QC-Dashboard ist jetzt auch im **Assessment Mode vor Fallabschluss** sichtbar
- vollständiger synthetischer NTC Variant Viewer ist jetzt auch im **Assessment Mode vor Fallabschluss** sichtbar
- bestehende Media-Sperre im Assessment entfernt
- Medien bleiben ausschließlich für `LAB_RUN_002_v0_8` aktiv
- sichtbare Version auf `v2.4.0g` aktualisiert

## Unverändert / weiterhin geschützt
- Reasoning-Gate: keine Correct/Incorrect-Markierung im Assessment
- Reasoning-Gate: kein Teilscore im Assessment
- Decision-Feedback vor Abschluss bleibt verborgen
- Lernziele/Constraints/Twist-Auflösung bleiben nach bestehender QA-Logik geschützt
- Deep-Dive-Debrief bleibt bis zum Fallabschluss verborgen
- Story, Step-Reihenfolge und Decision Options unverändert
- Root-Cause-, CAPA- und Audit-Logik unverändert
- Scoregewichte, Caps und `critical_fail`-Fix aus v2.4.0e unverändert
- keine Assets verändert oder neu erzeugt
- alle anderen Fälle unverändert

## Patch-Inhalt
Nur geänderte Runtime-Datei plus Patch-Dokumentation. Die in v2.4.0f bereits installierten Assets unter `assets/lab_run_002/` werden vorausgesetzt und deshalb nicht erneut mitgeliefert.
