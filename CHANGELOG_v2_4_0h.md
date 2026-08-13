# CHANGELOG – MolPath Simulator v2.4.0h

## Basis
- Build-Basis: **v2.4.0g**
- Ziel: QA-/Assessment-Korrektur für `RES_OMICS_001` vor der visuellen Flagship-Premiumisierung.
- Keine neuen Assets. Keine neue Story- oder Step-Logik.

## Änderungen
1. **Clinical-Reasoning-Gate / Assessment**
   - Gate-Antworten werden nach Submit gespeichert, aber im Assessment vor Fallabschluss nicht als richtig/falsch markiert.
   - Teilscore und Clinical-Reasoning-Score bleiben bis zum Abschluss verborgen.
   - Schutz gilt global für nicht bereits separat geschützte Fälle; `LAB_RUN_002` behält seine bestehende Premium-Implementierung.
2. **RES_OMICS_001 Lernziele**
   - Explizite Deep-Dive-Lernziele werden im Assessment vor Abschluss nicht angezeigt.
3. **RES_OMICS_001 Debrief / Twist**
   - Der vorhandene kuratierte Deep-Dive-Debrief inklusive Twist wird nach Fallabschluss im bestehenden Schritt `Feedback` eingeblendet.
   - Kein zusätzlicher Storyschritt.
4. **Gate-Metadaten**
   - Runtime-`gate_count` für `RES_OMICS_001_v1_0` von Legacy-Wert 2 auf die tatsächlich kuratierten **4 Gates** normalisiert.
5. **Scoring-Kalibrierung**
   - Nur für `RES_OMICS_001_v1_0`: die drei unterfüllten Score-Domänen werden proportional auf ihre bestehenden Maximalwerte kalibriert.
   - Vollständig optimaler Pfad: **180/180 = 100 %**.
   - Auswahloptionen, relative Abzüge und bestehende Score-Caps bleiben unverändert.
6. **Version**
   - Runtime-/Badge-Version auf **v2.4.0h** angehoben.

## Nicht geändert
- Deep-Dive-Story
- Step-Reihenfolge
- Hypothesen-/PICO-/Design-/Methoden-/Analyseoptionen
- Reasoning-Fragen oder Correct-Keys
- Score-Cap-Regeln / 60%-Cap des RES-Omics-Falls
- Reports außerhalb der Debrief-Einblendung
- Premium-Timeline / visuelle Final-Production-Komponenten
- Assets
