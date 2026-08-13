# QA Report – v2.4.0f LAB_RUN_002 Final Production

## Static QA
- Base: **v2.4.0e**
- Runtime file changed: `index.html`
- Added asset folder: `assets/lab_run_002/`
- Inline executable scripts: **36/36 syntax PASS** (`node --check`)
- Asset decode check: **3/3 PNG PASS**
- No existing case options/IDs or scoring constants edited by the premium layer

## Runtime smoke test
Headless Chromium DOM/runtime test performed with the final HTML. Because the container blocks direct `file://`/localhost navigation by enterprise policy, the page was injected into a blank Chromium document with mocked `localStorage`; the production JavaScript itself was executed unchanged.

### Navigation
- LAB steps resolved to exactly **7**:
  `run_overview`, `qc_event`, `reasoning`, `decision`, `root_cause`, `capa`, `audit`
- Premium timeline: **7/7 buttons rendered**
- initial state: Run clickable/current; all future steps locked
- previously visited steps become clickable

### Assessment integrity before completion
- Run screen: premium Run/Batch Cockpit rendered
- Learning objectives hidden in Assessment opening screen: PASS
- QC screen:
  - 4 native QC cards
  - 3 selected call rows: P07 5.4 %, P12 6.1 %, NTC 1.8 %
  - interpretive image assets hidden/locked
  - Twist/Constraints not injected by the premium QC layer in Assessment
- Clinical Reasoning:
  - 3 original gates rendered
  - after submit: 0 correctness classes, 0 gate score, 0 partial score reveal
- Decision:
  - 5 original options rendered
  - wrong choice produces no immediate Assessment feedback/classification
- Root Cause:
  - 96 native wells rendered
  - 6 original RCA options rendered
  - P07 = 5.4 %, P12 = 6.1 %, NTC = 1.8 %
- CAPA: 6/6 original components rendered
- Audit: 4/4 original checks rendered
- Debrief before completion: hidden

### Scoring regression
Completed all non-decision components correctly.

| Decision path | Final score | Status |
|---|---:|---|
| `block_run_capa` | **100 %** | `passed` |
| `release_low_vaf` | **55 %** | `critical_fail` |

This confirms that the v2.4.0e critical-fail correction remains intact after the visual premiumization.

### Post-completion
- Deep-Dive Debrief visible: PASS
- Run/QC dashboard visible: PASS
- NTC Variant Viewer visible: PASS
- static plate-reference image not surfaced in UI: PASS

### Learning mode
- Full synthetic Run/QC dashboard visible in QC step: PASS
- Full synthetic NTC Variant Viewer visible in QC step: PASS
- existing Deep-Dive didactic reveal behavior preserved

### i18n smoke
- custom premium labels switch with app language state
- English QC smoke: `QC event`, `QC snapshot`, `Coverage`, `Base quality`, `Positive control`, `Negative control`: PASS
- curated Deep-Dive localization remains handled by existing v2.4 runtime

## Visual QA
- Assessment QC screen: native cards/table fit main content and preserve score sidebar
- Root-Cause plate adjusted to display all 12 columns on desktop without horizontal clipping
- CAPA renders as 3×2 lifecycle board on desktop and collapses responsively
- top 7-step timeline remains horizontal and visually consistent with Flagship 1

## Manual regression checklist
1. Start `LAB_RUN_002` in Assessment Mode.
2. Confirm only Run is initially clickable in the timeline.
3. Open QC and confirm P07 5.4 %, P12 6.1 %, NTC 1.8 % are visible as raw evidence.
4. Confirm the full screenshot assets are locked before completion.
5. Submit the Clinical-Reasoning-Gate and confirm no answer colouring/partial score appears.
6. Select a decision and continue through RCA/CAPA/Audit.
7. Confirm the native plate shows P07/PC/P12 adjacency and NTC separately.
8. Complete once with the optimal decision; expect 100 % / passed when all other selections are correct.
9. Complete once with `release_low_vaf`; expect max 55 % / critical_fail when all other selections are correct.
10. Confirm Deep-Dive Debrief and full synthetic media are visible only after completion in Assessment.
