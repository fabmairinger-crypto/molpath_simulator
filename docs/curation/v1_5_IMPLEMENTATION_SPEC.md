# MolPath Simulator v1.5 – Implementation Spec

## Scope

Implement the AP1b-final case curation decisions into the application.

## Inputs

- `case_audit_v1_5_AP1b_final.csv`
- `case_metadata_v1_5_AP1b_final.json`
- `clinical_reasoning_gates_v1_5_AP1b_final.json`
- `score_caps_v1_5_AP1b_final.json`
- `method_rules_v1_5_AP1b_final.json`
- `AP1b_DECISION_LOG.md`

## Required App Changes

### 1. Case cards

Show:

- domain
- MET add-on badge if applicable
- length class
- difficulty
- estimated minutes
- status / review flag in instructor mode

### 2. Clinical-Reasoning-Gate

Before the main decision/order/action step:

- render 1 gate for Mini cases
- render 2–3 gates for Standard cases
- render 4 gates for Complex cases
- render phase-based gates for Planspiel cases

Mode behavior:

- Learning: hints visible
- Training: reduced hints
- Assessment: no hints before completion
- Instructor: correct answers and logic visible

### 3. Score-Cap Engine

Implement:

- strictest cap wins
- additional critical/fatal errors subtract inside cap
- cap never improves score
- pass/fail flags: `passed`, `borderline`, `critical_fail`, `incomplete`

### 4. Universal Method Rules

Keep universal method catalogue. Evaluate selected methods per case as:

- recommended
- optional
- reflex
- incomplete
- low_value
- misleading
- invalid

Assessment mode shows classification only after completion.

### 5. Reports

Final reports must show:

- Clinical-Reasoning result
- selected methods/actions with Method-Rule class
- score before caps
- active caps
- additional critical penalties
- final score
- pass/fail flag
- learning recommendation

Instructor report additionally shows:

- Musterpfad
- Bewertungslogik
- critical error definitions
- typical distractors / misleading method choices

## Non-Scope for v1.5

- Full story expansion of all cases
- UI redesign
- PDF export beyond browser printing
- Free-text scoring
- Full manual curation of all 91 cases

## Acceptance Criteria

- All 91 cases load.
- Case cards display harmonized length/difficulty/status.
- Clinical-Reasoning-Gates appear before the main decision.
- Score-Cap logic is transparent in the final report.
- Method Rules are reflected in score and report.
- Existing modes remain functional.
