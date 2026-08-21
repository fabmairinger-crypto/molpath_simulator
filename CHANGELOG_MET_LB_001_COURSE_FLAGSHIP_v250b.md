# MET_LB_001 Course Flagship — delta patch

Base: MolPath Simulator v2.5.0b with the previously applied Methods Focus + MET_NGS_001 + MET_NGS_002 + MET_RNA_001 patches.

## Scope
Only `MET_LB_001_v1_3` is changed.

## Changes
- Promotes `MET_LB_001_v1_3` to Signature / Course Flagship.
- Adds seven phase-aware synthetic training assets:
  1. Liquid-biopsy resistance-testing request.
  2. Formally negative plasma-NGS report.
  3. Dedicated liquid-biopsy QC / tumor-fraction assessment (<0.1% ctDNA).
  4. Tissue rebiopsy H&E with adequate tumor content.
  5. Tissue-NGS showing persistent EGFR exon 19 deletion plus MET amplification.
  6. MET/CEP7 FISH orthogonal confirmation.
  7. Integrated final report.
- Curates the runtime narrative to the same EGFR-mutated NSCLC / osimertinib-progress / tissue-reflex storyline.
- Adds explicit teaching emphasis: technically valid plasma can still be biologically non-informative when tumor fraction is extremely low.

## Reveal logic
- Intake: asset 1.
- `liquid_biopsy`: assets 2–3.
- `rebiopsy_tissue`: asset 4.
- `broad_pan_panel`: assets 5–6.
- Completed report: asset 7.

## Not changed
- Scoring.
- Correct/incorrect decisions.
- Required groups.
- Allowed test selection.
- Completion semantics.
- Any other case.

## Delta contents
This ZIP intentionally does **not** contain assets or integration scripts for the three previously completed course flagships.
