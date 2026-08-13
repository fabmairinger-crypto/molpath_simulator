# QA Report – v2.4.0e LAB_RUN_002 QA Hotfix

## Scope
- Build basis: **v2.4.0d**
- Target case: `LAB_RUN_002_v0_8`
- Runtime file changed: `index.html`
- Assets changed: **no**
- Story / choice / reasoning content rewritten: **no**

## Static QA
- Inline executable script blocks: **35/35 syntax PASS** via `node --check`.
- Patch is appended to the existing v2.4.0d runtime; no rollback to older builds.
- Existing curated decision scores and 55%-cap value remain unchanged.

## Headless runtime QA
Executed in Chromium through Chrome DevTools Protocol with the patched runtime loaded directly into a browser document.

### Assessment before completion
PASS:
- Run screen contains no Deep-Dive learning-objective block.
- Prescriptive Deep-Dive title is not shown in the Opening Scene.
- QC screen contains no `Constraints` block.
- QC screen contains no neutral twist placeholder.
- QC screen contains no twist content / non-reproducibility reveal.
- Clinical-Reasoning Gate uses **3** curated Deep-Dive questions.
- After Gate submit, Assessment still shows:
  - no Correct/Wrong CSS reveal,
  - no question partial scores,
  - no Clinical-Reasoning total score.
- Live Run KPI does not classify the selected decision as optimal/critical before finalization.

### Critical-Fail regression matrix
All other Root-Cause, CAPA, Audit and Reasoning selections were set to the optimal path to isolate the decision cap behavior.

| Decision | Pre-cap | Final | Status |
|---|---:|---:|---|
| `release_low_vaf` | 76% | 55% | `critical_fail` |
| `block_kras_only` | 88% | 55% | `critical_fail` |
| `delete_control` | 75% | 55% | `critical_fail` |
| `comment_only` | 82% | 55% | `critical_fail` |
| `block_run_capa` | 100% | 100% | `passed` |

PASS:
- Non-optimal release paths are no longer classified as `borderline` at 55%.
- Optimal path remains unchanged at 100% / `passed`.
- Final Audit feedback uses critical styling for the critical path.
- Numeric-threshold wording `Tragfähig` is no longer shown for the targeted critical-fail path.
- Fallbericht/Score-domain classification and v1.8 score hero are consistent with `critical_fail`.

### Debrief
PASS:
- No new LAB story step introduced.
- After `Fall abschließen` in Audit, the existing Deep-Dive Debrief is present.
- The existing twist is revealed there after completion.

### Step layout
PASS at desktop viewport:
- `currentSteps()` = 7 LAB steps.
- computed desktop grid = 7 columns.
- responsive <=900 px behavior remains the existing 2-column layout.

### Regression smoke
PASS:
- Learning Mode still displays the existing constraints and twist as before.
- Learning Mode still reveals Gate feedback after Gate submit.
- An unrelated LAB case (`LAB_POST_001_v1_0`) renders normally in Assessment.
- NSCLC premium timeline code was not modified.

## Audit clarification
The initial audit suspected that the full LAB twist was directly visible in Assessment. Reinspection of the final v2.4.0d runtime showed that the later v1.8 reveal guard already suppresses the full twist text. The remaining neutral twist placeholder was nevertheless an avoidable hint and is now suppressed in Assessment before finalization.

## Result
**PASS for the defined v2.4.0e QA-hotfix scope.**

Next production phase can proceed independently: synthetic evidence assets first, then LAB-specific premium UI integration.
