# CHANGELOG – MolPath Simulator v2.4.0o

## A3 DNA-Reparatur / HRD / BRCA / PARP – Deep-Dive expansion

Base: **v2.4.0n**

### Added / upgraded
- `MTB_MAMMA_001_v1_3` → full Deep Dive: current metastatic ER/PgR/HER2 biology first; HER2 IHC 2+ requires ISH/FISH; PIK3CA as additive target context; tumor BRCA2 is not automatically germline.
- `MTB_PROST_001_v1_3` → full Deep Dive: BRCA2/HRR in mCRPC; MMR/MSI handled separately; tumor-vs-germline separation; ovarian-style HRD score removed from the required path.
- `MTB_TAML_001_v1_3` → full Deep Dive: myeloid neoplasm after cytotoxic therapy; TP53 + complex karyotype as dominant high-risk biology; low-VAF DNMT3A as possible CH clone; genomic instability is not a generic PARP/IO target.

### Medical/content corrections
- Breast case no longer treats a broad molecular panel as a substitute for current receptor/HER2 assessment.
- Breast tumor-only BRCA2 is explicitly separated from germline status and triggers genetics referral rather than automatic hereditary labeling.
- Prostate case no longer requires `hrd_score`; gen-specific BRCA/HRR plus MMR/MSI are the core molecular blocks.
- Prostate case explicitly teaches that tumor BRCA1/2 can be therapeutically relevant while germline origin remains a separate question.
- t-AML/myeloid case no longer reduces the case to DNMT3A/TET2/ASXL1 or treats genomic instability as an automatic target/IO signal.
- Cytotoxic-treatment history is used as a diagnostic qualifier/context integrated with morphology and genetics, not as the sole disease definition.

### Architecture
- No new Signature Cases.
- Existing Deep-Dive/Signature separation retained.
- No UI polish or asset work.
- German master content only; translations intentionally deferred until the complete MTB block is content-frozen.

### Counts after patch
- Deep Dives: **26/91**
- MTB Deep Dives: **19/32**
- A3 block: **5/5**
- Signature Cases: **15**
