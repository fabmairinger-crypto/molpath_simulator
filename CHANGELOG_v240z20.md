# MolPath Simulator v2.4.0z20

Base: **v2.4.0z19**  
Scope: **`MTB_IO_001_v1_0` Premium / Flagship completion**

## Added
- 9 approved, case-local assets under `assets/mtb_io_001/`:
  1. gyn-oncology referral / molecular pathology request
  2. H&E overview of omental recurrence/metastasis
  3. H&E detail with TIL-rich tumour microenvironment
  4. MMR 4-plex IHC (MLH1/PMS2 retained; MSH2/MSH6 lost)
  5. CD3/CD8 immune-context IHC
  6. MSI-H molecular report (8/9 unstable markers; MSI score 0.70)
  7. TMB NGS report (23.4 Mut/Mb)
  8. PD-L1 22C3 report (focal positivity; CPS 5)
  9. integrated molecular pathology / MTB final report
- `v240z20_io001_flagship.js` as a case-local runtime layer loaded after z19.

## Gating / guardrails
- Baseline visual evidence: referral at intake; H&E overview/detail at histology.
- `mmr_ihc` unlocks the MMR IHC image only.
- `immune_context_ihc` unlocks CD3/CD8 only.
- `msi_pcr_ngs` or `broad_pan_panel` unlocks MSI only.
- `tmb_ngs` or `broad_pan_panel` unlocks TMB only.
- `pdl1` unlocks PD-L1 only.
- `broad_pan_panel` explicitly does **not** unlock MMR, PD-L1 or CD3/CD8.
- The integrated final image appears only after true finalization **and** every result visibly contained in that image has been generated (MMR + MSI + TMB + PD-L1 + CD3/CD8).
- Core case completion/scoring remains the existing MMR + MSI + TMB requirement; optional PD-L1/CD3/CD8 do not become mandatory for completion.

## Case consistency
- Runtime presentation is locked to the current curated identity: 66-year-old woman, recurrent endometrioid endometrial carcinoma, FFPE omental recurrence/metastasis, ~45% tumour content.
- Legacy CUP / 63-year-old male presentation is suppressed for this case.
- Pre-result Deep-Dive text no longer reveals the MSH2/MSH6 result before testing.
- Result text is aligned to the approved visual assets: MSI-H 8/9 markers, TMB 23.4 Mut/Mb, PD-L1 CPS 5.

## Versioning
- App/runtime version advanced to `v2.4.0z20`.
- Package root normalized to the actual current root `v10/` in the z20 manifest.

## Signature / Flagship milestone
With `MTB_IO_001` completed, the Signature MTB/patient-care cases are now fully upgraded to Premium/Flagship visual level.
