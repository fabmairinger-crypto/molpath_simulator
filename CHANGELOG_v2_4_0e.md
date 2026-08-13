# MolPath Simulator v2.4.0e – LAB_RUN_002 QA / Assessment Integrity Hotfix

## Basis
- **v2.4.0d** ist die alleinige Build-Basis.
- Scope: `LAB_RUN_002_v0_8` / `LAB_RUN_002`.
- Keine Premium-Assets und keine Final-Production-UI dieses Flagships in diesem Patch.

## Korrigiert
1. **Assessment: keine vorzeitigen Lösungshinweise im Run-/QC-Kontext**
   - Deep-Dive-Lernziele werden vor Fallabschluss nicht eingeblendet.
   - Der preskriptive Deep-Dive-Titel wird im Opening durch den neutralen vorhandenen Kurztitel ersetzt.
   - QC-Constraints werden im Assessment vor Abschluss ausgeblendet.
   - Auch der neutrale Twist-Platzhalter wird im Assessment vor Abschluss nicht mehr angezeigt.

2. **Assessment: Clinical-Reasoning-Gate bleibt nach Submit blind**
   - Antworten werden weiterhin gespeichert und das Gate bleibt funktional.
   - Vor Fallabschluss werden keine Correct/Wrong-Markierungen, Teil-Scores oder Gate-Gesamtscores angezeigt.

3. **Assessment: Run-KPI bewertet die Entscheidung nicht vorab**
   - Der Live-Run-Status verrät nicht mehr `gesperrt` vs. `kritisch` vor Fallabschluss.

4. **Critical-Fail-Semantik für kompromittierten Run**
   - Jede nicht-optimale Freigabeentscheidung in `LAB_RUN_002` wird nach Fallabschluss als `fatal` für die Cap-Statuslogik behandelt.
   - Der bestehende strengste Cap bleibt **55 %**; bei sonst perfekter Bearbeitung ergibt sich damit **55 % / `critical_fail`** statt **55 % / `borderline`**.
   - Der optimale Pfad bleibt **100 % / `passed`**.
   - Abschlussfeedback und Reportklassifikation folgen nun dem `critical_fail`-Status und widersprechen nicht mehr der kuratierten Deep-Dive-Definition.

5. **Deep-Dive-Debrief für LAB**
   - Der vorhandene Debrief wird im bestehenden `Audit`-Schritt erst **nach Fallabschluss** eingeblendet.
   - Kein neuer Storyschritt wurde hinzugefügt.

6. **7-Step-LAB-Layout**
   - Desktop-Grid des generischen LAB-Steppers von 6 auf 7 Spalten korrigiert.

## Bewusst unverändert
- Story und Deep-Dive-Text
- Step-Reihenfolge
- Decision Options
- Root-Cause-Optionen
- CAPA-Komponenten
- Audit-Checks
- Reasoning-Fragen und Antwortschlüssel
- numerische Basis-Scores der Entscheidungen
- Score-Domänen und Maximalwerte
- vorhandener 55%-Cap
- Reportschema / Exportstruktur
- alle anderen Fälle
- alle Assets

## Präzisierung aus dem Audit
Der eigentliche Twist-Text war in v2.4.0d bereits durch die spätere v1.8-Reveal-Logik vor einem direkten Assessment-Reveal geschützt. Korrigiert wurde daher zusätzlich der noch sichtbare neutrale Twist-Platzhalter sowie die tatsächlich bestätigten Leaks (Lernziele/Constraints/Gate-Feedback/KPI).
