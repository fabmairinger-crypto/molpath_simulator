# CHANGELOG – MolPath Simulator v2.4.0q

## A5 + A6 final MTB Deep-Dive expansion / MTB content freeze

Base: **v2.4.0p**

### Added / upgraded – A5 Epigenetics / CNS / methylation
- `MTB_CNS_002_v1_3` → negative IDH1-R132H IHC with non-canonical IDH1 p.R132C on sequencing; G-CIMP/methylation classifier integrated without replacing defining markers.
- `MTB_CNS_003_v1_3` → ambiguous CNS tumor where a low-confidence classifier result from low-tumor-content material must be rejected and repeated from a better block.
- `MTB_HEM_001_v1_3` → DNMT3A/TET2 clonal hematopoiesis with persistent cytopenias; teaches CHIP vs CCUS vs MDS instead of a false binary.
- `MTB_METH_001_v1_3` → MLH1/PMS2-loss MSI-H CRC with BRAF wild type but positive MLH1 promoter methylation; teaches that BRAF WT does not prove Lynch syndrome.

### Added / upgraded – A6 Angiogenesis / TME / invasion
- `MTB_ANGIO_001_v1_3` → mCRC anti-VEGF mechanism without an invented VHL/HIF/VEGF companion diagnostic; RAS and anti-VEGF axes are separated.
- `MTB_RCC_001_v1_3` → ccRCC VHL/HIF/VEGF biology and rationale for VEGFR-TKI/IO combinations, with explicit limit that VHL alone does not select one specific standard regimen.
- `MTB_GBM_ANGIO_001_v1_3` → recurrent GBM with bevacizumab-associated edema reduction and radiographic pseudoresponse; RCC-style VHL/HIF testing removed from the required path.
- `MTB_TME_001_v1_3` → urothelial carcinoma with PD-L1/TMB but spatially immune-excluded CD8 cells in fibroblast-rich stroma; mechanistic TME interpretation without inventing a companion diagnostic.
- `MTB_INV_001_v1_3` → pT1 CRC after endoscopic R0 resection; high-grade tumor budding and LVI drive clinical risk, EMT-IHC remains optional mechanistic illustration.

### Medical/content corrections
- Removed VHL/HIF testing from the mCRC anti-VEGF case entirely.
- Removed VHL/HIF from the required GBM antiangiogenesis pathway and reframed it as an explicit entity-transfer trap only.
- CNS methylation classifier no longer treats focal bisulfite PCR as an equivalent substitute.
- HEM_001 now recognizes CCUS as the correct intermediate category when cytopenia + clonality are present without MDS-defining criteria.
- METH_001 no longer allows BRAF wild type to function as a positive Lynch test.
- INV_001 no longer requires EMT-IHC for a clinical pT1 decision; morphology is primary.

### Architecture / freeze
- No new Signature Cases.
- Existing Deep-Dive/Signature separation retained.
- No UI polish or asset work.
- German master content only.
- **MTB content is now complete/frozen at 32/32 Deep Dives and ready for a grouped translation pass.**

### Counts after patch
- Deep Dives: **39/91**
- MTB Deep Dives: **32/32**
- A5 block: **5/5**
- A6 block: **5/5**
- Signature Cases: **15**
