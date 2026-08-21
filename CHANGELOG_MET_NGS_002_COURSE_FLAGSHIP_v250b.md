# MolPath Simulator v2.5.0b — MET_NGS_002 Course Flagship

- Promotes `MET_NGS_002_v1_3` from Deep Dive to Signature / Course Flagship.
- Adds seven phase-aware training assets following the curated method-pitfall chain:
  1. clinical resistance-testing request,
  2. FFPE-DNA QC,
  3. T790M low-VAF variant viewer,
  4. read-context / deamination-artifact pattern,
  5. independent re-extraction with non-reproducible T790M,
  6. orthogonal ddPCR + digital-NGS confirmation,
  7. corrected final report rejecting the unvalidated T790M call.
- Keeps scoring, correctness, required groups, allowed tests and completion semantics unchanged.
- Keeps the core teaching point explicit: low VAF is a warning signal, not a verdict; call-level QC and independent reproducibility determine analytical validity.
- Excludes duplicate QC/report generations, the optional HE overview and unrelated MET-pathway images from the runtime asset chain.
- Runtime case metadata remains aligned to the curated Deep Dive (67-year-old patient, ~20% tumor content, EGFR-mutated NSCLC with progression).
