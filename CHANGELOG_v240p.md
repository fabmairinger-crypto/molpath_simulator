# CHANGELOG – MolPath Simulator v2.4.0p

## A4 Immunescape / PD-L1 / MSI / TMB / TILs – Deep-Dive expansion

Base: **v2.4.0o**

### Added / upgraded
- `MTB_IO_002_v1_3` → full Deep Dive: metastatic pancreatic ductal adenocarcinoma with PD-L1 expression but pMMR/MSS, TMB-low and a strongly desmoplastic immune-excluded TME. Teaches PD-L1 ≠ pre-existing effective T-cell immunity and exploratory TME markers ≠ validated companion diagnostics.
- `MTB_IO_003_v1_3` → full Deep Dive: pMMR/MSS mCRC with PD-L1 CPS 25, low TMB and sparse TILs. Removes the erroneous fusion/RNA-NGS copy-over and teaches entity-specific biomarker hierarchy: PD-L1 is not a tumor-agnostic IO switch.
- `MTB_IO_004_v1_3` → full Deep Dive: recurrent endometrial carcinoma with MLH1/PMS2 loss and MSI-H. Correct reflex is MLH1 promoter methylation; CRC-style BRAF reflex is explicitly taught as the wrong entity transfer. Negative methylation triggers genetics referral without claiming proven Lynch syndrome.
- `MTB_IO_005_v1_3` → full Deep Dive: driver-negative, PD-L1-high NSCLC after clinically necessary antibiotics for bacterial pneumonia. Teaches association vs causality/confounding and keeps microbiome/FMT/probiotic strategies in the experimental domain.

### Medical/content corrections
- IO_003 fusion/RNA/FISH copy-over removed completely.
- IO_004 is no longer an unspecified 'MSI-H carcinoma' with CRC reflex logic; entity is now endometrial carcinoma and the MLH1 methylation pathway is explicit.
- IO_002 and IO_003 no longer equate PD-L1 positivity with checkpoint sensitivity.
- IO_005 no longer treats microbiome observations as a patient-specific decision biomarker.
- TMB/TIL/TME readouts are explicitly context markers and not universal substitutes for entity-specific validated biomarkers.

### Architecture
- No new Signature Cases.
- Existing Deep-Dive/Signature separation retained.
- No UI polish or asset work.
- German master content only; translations intentionally deferred until the complete MTB block is content-frozen.

### Counts after patch
- Deep Dives: **30/91**
- MTB Deep Dives: **23/32**
- A4 block: **5/5**
- Signature Cases: **15**
