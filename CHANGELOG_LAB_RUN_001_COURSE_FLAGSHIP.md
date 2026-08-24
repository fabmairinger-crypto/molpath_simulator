# LAB_RUN_001 Course Flagship patch

## Scope
- Upgrades `LAB_RUN_001_v1_3` in **QM / Labor Basics** to Course-Flagship / Signature-quality teaching depth.
- Does **not** promote the case to a Signature Case badge.
- Existing LAB scoring IDs, workflow navigation and completion semantics remain compatible.

## Seven approved assets
1. Run-QC overview: good patient metrics, weak positive control.
2. Positive-control detail: all five expected variants detected but systematically below VAF acceptance.
3. Patient-QC / coverage matrix: formal patient-library QC remains excellent.
4. Historical QC trend: abrupt control-specific VAF collapse rather than slow drift.
5. Traceability: `A1-WD10` working aliquot versus `A1-STOCK`; double dilution becomes discoverable.
6. Technical confirmation: correct STOCK preparation restores ~10% VAF.
7. Deviation/CAPA/final disposition: original run invalid, control repeat passed, patient reanalysis required before release.

## Runtime integration
- Asset phase-gating:
  - Run overview → asset 1
  - QC event → asset 2
  - LAB decision → asset 3
  - Root-cause analysis → assets 4–5
  - CAPA / targeted repeat → asset 6
  - Post-completion audit closure → asset 7
- Existing deep-dive content is polished to match the approved double-dilution root-cause narrative.
- Final teaching path explicitly separates technical correction, run validity, patient reanalysis and CAPA effectiveness follow-up.

## Course progress
- Course-Flagship upgrades completed: 6 dedicated upgrades (5 Methods Pitfalls + `LAB_RUN_001`).
- Overall distinct course cases at Flagship level: **19/23**.
- Remaining: `LAB_PRE_001_v1_3`, `RES_ROLE_001_v1_3`, `RES_IMPL_001_v1_3`, `RES_ETH_002_v1_3`.
