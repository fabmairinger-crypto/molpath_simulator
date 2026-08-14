# MolPath Simulator v2.4.0z13 — Signature / Flagship Audit

Base: **v2.4.0z12**

## Audit result

- Canonical Signature set: **15 cases**.
- Existing full Flagship references: **3/15** (`MTB_NSCLC_001`, `LAB_RUN_002`, `RES_OMICS_001`).
- All 15 Signature cases already have a curated Deep-Dive narrative, reasoning gates, a critical twist and structured result packages.
- Before this batch, the remaining 12 Signature cases had no case-specific premium media layer.
- `MET_NGS_003_v1_0` is the only Signature case whose effective later Deep-Dive payload carried `is_signature_case:false`; runtime canonical logic still counted it as Signature. v2.4.0z13 explicitly repairs the case and Deep-Dive metadata to `true`.

## Flagship reference standard derived from the three completed cases

1. **Domain-specific cockpit** instead of a generic content card only.
2. **Progressive evidence layer**: raw/pre-result evidence early; interpretive evidence only when pedagogically appropriate.
3. **Assessment-safe locking** for media that would reveal the solution before case completion.
4. **Synthetic, clearly labelled assets** with no real patient data.
5. **Custom result visualization** that integrates several evidence dimensions instead of repeating prose.
6. **Existing scoring/gates remain authoritative**; the premium layer is presentation/evidence orchestration, not a second logic engine.
7. **Responsive and multilingual UI**; assets themselves are language-neutral where possible.

## Production batches

| Batch | Cases | Rationale | Status |
|---|---|---|---|
| Reference | MTB_NSCLC_001 · LAB_RUN_002 · RES_OMICS_001 | Existing cross-domain Flagship standard | complete |
| B01 | MTB_CRC_001 · MTB_CRC_002 | mCRC biomarker integration + MMR/Lynch reflex | **implemented in z13** |
| B02 | MTB_NSCLC_002 · MET_NGS_003 | resistance / liquid biopsy + variant interpretation | pending |
| B03 | MTB_OVAR_001 · MTB_OVAR_002 | HRD/BRCA + BRCA-VUS communication | pending |
| B04 | MTB_IO_001 · MTB_CNS_001 | integrated phenotype / biomarker reasoning | pending |
| B05 | LAB_POST_001 · LAB_DOC_001 | bioinformatics-QM + audit-proof documentation | pending |
| B06 | RES_HYP_001 · RES_ETH_001 | translational study design + ethics/consent | pending |

## B01 implementation

### MTB_CRC_001
- Premium CRC Precision Oncology cockpit.
- Pretreatment biomarker board (non-interpretive).
- Integrated post-result biomarker dashboard.
- Synthetic BRAF read-level evidence view.
- Synthetic MSI instability profile.
- Three-axis Decision Frame: RAS/BRAF, MMR/MSI, MLH1 reflex.

### MTB_CRC_002
- Premium CRC Precision Oncology cockpit.
- Synthetic four-panel MMR-IHC phenotype (MLH1/PMS2 loss, MSH2/MSH6 retained, internal controls).
- Post-completion MLH1/BRAF reflex work-up visualization.
- Synthetic MSI confirmation profile.
- Three-axis Decision Frame: phenotype, reflex etiology, hereditary communication.

## Guardrails

- No base case story, scoring, reasoning-gate correctness, test-selection logic or global premium timeline was changed.
- Interpretive premium evidence remains locked in **Assessment Mode** until completion.
- The two B01 cases reuse the existing Deep-Dive text and translation system; only the compact premium chrome adds a six-language label dictionary.
- All seven new media files are marked as synthetic/educational in the UI.
