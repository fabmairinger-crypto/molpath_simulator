# MolPath Simulator v2.2.4c – UI Residue Translation Patch

## Basis

- Input: the exact `v6/index.html` supplied in `v6.zip`
- Input SHA-256: `5992947d04d75e02a38c99296bf087136945dcbd61b150ad8e7162f8fed73790`
- Output SHA-256: `c443ac7134a92a5e61aa61cf7e42937ea288d3d778427b10e48f553458bfb54b`
- Previous integration detected: `v2.2.4b Translation Integration Test – Blocks 01–03`

## Corrected generic UI residue

- learning/free-play/instructor labels
- dashboard heading, description, actions, counters and domain descriptions
- free-play explanatory note in the sidebar
- generic score-domain labels and score explanation
- generic instructor-mode prefix
- `MTB-Kernaussagen`
- Teaching Sheet button and generic availability texts
- dynamic `{count} Fälle` and `x von y Fällen angezeigt` texts
- repeated version-badge reset by the legacy safe-layout renderer

## Deliberately deferred

The following red-framed texts are part of the selected NSCLC Deep Dive and were not translated in this generic UI patch:

- learning objectives
- case file / clinical narrative
- optimal pathway and acceptable alternatives
- case-specific instructor notes and MTB statements
- case-specific twist / critical turning point

They will be translated together with the corresponding Deep Dive/Signature Case to preserve clinical consistency.

## Installation

Copy the supplied `index.html` into the current simulator folder and replace the existing `index.html`. The JavaScript patch is already embedded inline. The separate `.js` file is included for auditability only and does not need to be loaded separately.

## Safety

- No case logic, scores, methods, save data or assets were changed.
- The supplied folder structure was accepted as correct.
- The standalone v2.2.4b patch file may remain in the folder; the active patch is inline in `index.html`.

## Runtime verification

A Chromium DOM/runtime test was executed for EN, RO, EL, ES and FR at 1600 × 900.

- home dashboard translations: passed in all five languages
- instructor-mode translations: passed in all five languages
- score-domain labels: passed in all five languages
- teaching-sheet button and MTB heading: passed in all five languages
- version badge after mode-triggered rerender: passed in all five languages
- JavaScript console/page errors: 0
- visible overflow in tested buttons, pills, metrics and score labels: 0

The detailed machine-readable result is stored in `RUNTIME_QA_v2_2_4c.json`.
