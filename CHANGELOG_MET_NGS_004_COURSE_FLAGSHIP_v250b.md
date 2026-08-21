# MET_NGS_004 Course Flagship — v2.5.0b delta

Base: `v2-5-0b_MET-cases_extension_4of5.zip`

## Scope
- Promotes `MET_NGS_004_v1_3` to Course Flagship / Signature Case.
- Adds the curated tumor-only BRCA2 → constitutional confirmation teaching path.
- Preserves scoring, required groups, method correctness, budgets and completion semantics.
- Adds 8 synthetic visual assets (7 curated workflow assets + 1 approved H&E context asset).

## Clinical continuity
- 61-year-old male with mCRPC.
- FFPE bone metastasis, tumor content ~60%.
- Tumor-only NGS: `BRCA2 c.5944_5947del (p.Ser1982Argfs*22)`, pathogenic LoF, VAF 48%.
- Family history: sister breast cancer at 46; father prostate cancer at 58.
- EDTA blood confirms the same BRCA2 variant heterozygously (~49%): pathogenic germline variant.
- Key teaching point: tumor VAF near 50% raises suspicion but does not establish germline origin.

## Runtime placement
1. Tumor-only NGS variant viewer — after tumor BRCA/HRR testing.
2. Tumor-only molecular report — after tumor BRCA/HRR testing.
3. Family-history pedigree — history section.
4. Genetics referral — once the germline pathway is selected.
5. Germline confirmation from EDTA blood — after constitutional testing.
6. Paired tumor-vs-germline interpretation — complete report after constitutional confirmation.
7. Approved HRD/PARP teaching screenshot — post-completion therapeutic context.
8. H&E bone-metastasis image — histology context (bonus asset).

## Files changed
- `index.html`: one script include added.
- `v250b_metngs004_course_flagship.js`: new isolated runtime layer.
- `assets/met_ngs_004/*`: new synthetic assets.
- audit/manifest/QA files only.
