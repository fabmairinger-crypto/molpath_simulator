# QA Report – MolPath v2.4.0c

## Static / syntax
- Inline executable JS blocks checked: **34**
- Syntax PASS: **34/34**
- v2.4.0c patch script present exactly once: **PASS**
- No asset files changed in this patch: **PASS**

## Targeted behavior checks (code-level)
- Horizontal timeline uses `currentSteps()`, `state.step`, `state.viewed` and `gotoStep()`: **PASS**
- Future/unvisited steps disabled: **PASS**
- Duplicate vertical `.mp24-timeline` removed from pilot-rendered content: **PASS**
- Assessment Result Cards strip interpretation notes / clinical-relevance rows before finalization: **PASS**
- Base `Interpretation / Limitation` stripped in Assessment before finalization: **PASS**
- `.v17-debrief` stripped from report until `state.finalized`: **PASS**
- MTB debrief remains available after finalization: **PASS**

## Manual smoke test
1. NSCLC 001 öffnen: horizontaler Verlauf oben statt altem Stepper.
2. Auf abgeschlossene Schritte klicken und zurückspringen.
3. Zukünftiger Schritt vor Freischaltung nicht klickbar.
4. Assessment: Befund öffnen – keine Therapieinterpretation / RNA-Hinweise in Premium Cards.
5. Vor MTB kein Deep-Dive-Debrief im Befund.
6. MTB beantworten und `Fall abschließen` → Debrief erscheint unter dem MTB.
7. Keine zweite vertikale Timeline mehr in Anamnese/Befund/MTB.
