# MolPath Simulator v2.4.0z13
## MTB_CRC_002 Flagship / Premium Asset Integration

Base: **v2.4.0z12**

### Scope
Only `MTB_CRC_002_v1_3` is upgraded in this patch. No global workflow, course, savegame or scoring-framework changes are introduced outside this case.

### Premium case file
Eight approved synthetic assets are integrated:
1. referral / request form
2. oncology / molecular request letter
3. H&E overview
4. H&E zoom from the representative tumour area
5. MMR IHC four-marker panel
6. MSI NGS 9-locus report
7. MLH1 promoter methylation qMSP / melt-curve report
8. BRAF p.V600E qPCR report

### Progressive evidence logic
- referral + clinical letter: visible from case intake
- H&E overview + zoom: visible at histology
- MMR IHC asset: only after `mmr_ihc` was selected and the laboratory run/report exists
- MSI NGS asset: only after `msi_pcr_ngs` was selected and the laboratory run/report exists
- MLH1 methylation asset: only after `mlh1_methylation` or `methylation_mlh1` was selected and the laboratory run/report exists
- BRAF qPCR asset: only after `braf_v600e_crc` was selected and the laboratory run/report exists

### Case logic
The flagship completion path now explicitly requires four case-defining components:
- MMR IHC
- dedicated MSI testing
- MLH1 promoter methylation
- BRAF p.V600E

The pre-test Clinical Reasoning gate was rewritten so that it asks for strategy and conditional reflex logic without revealing assay results before testing.

### Story / result consistency
The previous Deep-Dive reference outcome (`MLH1 unmethylated / BRAF V600E negative`) is not used in the Flagship debrief. The approved premium assets define the Flagship outcome as:
- MLH1/PMS2 loss; MSH2/MSH6 retained
- MSI-H, 7/9 loci unstable
- MLH1 promoter methylation positive
- BRAF p.V600E positive

This supports a strongly sporadic MLH1-inactivation context while retaining the teaching point that IHC alone does not diagnose or exclude Lynch syndrome.

### Assessment protection
No MMR/MSI/MLH1/BRAF premium result image is shown before the corresponding assay has actually been run. The final integrated debrief remains completion-gated (instructor mode excepted).
