# MolPath Simulator v2.4.0z13 — Signature Flagship Expansion B01 (CRC)

Base: **v2.4.0z12**

## Scope
First production batch of the expansion from **15 Signature Cases** to a uniformly premium / flagship presentation layer.

Reference standard was derived from the three already completed Flagships:
- `MTB_NSCLC_001_v0_6`
- `LAB_RUN_002_v0_8`
- `RES_OMICS_001_v1_0`

## Signature audit
- Canonical Signature set validated: **15/15**.
- Existing Flagship level before this patch: **3/15**.
- `MET_NGS_003_v1_0` had an effective metadata inconsistency: a later method Deep-Dive payload carried `is_signature_case:false`, while canonical runtime Signature logic still treated the case as Signature.
- v2.4.0z13 explicitly repairs `MET_NGS_003_v1_0` to `signature_case=true` and `is_signature_case=true` without changing its content or scoring.

## B01 — CRC Flagship cases

### `MTB_CRC_001_v0_6`
Added:
- CRC Precision Oncology cockpit.
- Signature-specific decision axes for RAS/BRAF, MMR/MSI and MLH1 reflex logic.
- Synthetic pretreatment biomarker board.
- Integrated post-result biomarker dashboard.
- Synthetic BRAF p.V600E read-level evidence view.
- Synthetic MSI instability profile.
- Assessment-safe progressive evidence locking.
- Final flagship integration chain.

### `MTB_CRC_002_v1_3`
Added:
- CRC Precision Oncology cockpit.
- Signature-specific decision axes for MMR phenotype, reflex etiology and hereditary communication.
- Synthetic four-panel MMR-IHC evidence image: MLH1/PMS2 loss, MSH2/MSH6 retained, with internal-control concept.
- Synthetic MSI confirmation profile.
- Synthetic MLH1/BRAF reflex work-up visualization.
- Assessment-safe locking of interpretive reflex evidence until completion.
- Final flagship integration chain.

## Architecture
- The existing Deep-Dive narrative, scoring, gate correctness, test-selection logic and global premium timeline remain authoritative and unchanged.
- The new layer is deliberately additive: case-specific cockpit + evidence orchestration + result visualization.
- No new polling loop or MutationObserver was introduced.
- New premium UI labels cover DE / EN / RO / EL / ES / FR.
- New media are explicitly labelled synthetic / educational and contain no real patient data.

## Planned next batches
- B02: `MTB_NSCLC_002` + `MET_NGS_003`
- B03: `MTB_OVAR_001` + `MTB_OVAR_002`
- B04: `MTB_IO_001` + `MTB_CNS_001`
- B05: `LAB_POST_001` + `LAB_DOC_001`
- B06: `RES_HYP_001` + `RES_ETH_001`
