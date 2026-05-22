# QA REPORT v2.1.3 – Complex Phase + CRC Bundle Logic Patch

Date: 2026-05-21T14:14:47

## QA Scope

- JavaScript syntax check for all embedded scripts.
- Ovar multi-phase flow logic checked structurally.
- CRC bundle logic checked structurally.
- Packaging/manifest generated.

## Syntax

- Extracted embedded scripts from final HTML: passed `node --check`.

## Expected Manual QA

### Ovar Complex Case
1. Start `MTB_OVAR_001_v0_7`.
2. Confirm no follow-up/LB phase is visible at start.
3. Runde 1: request Tumor-BRCA/HRR + HRD/genomic scar.
4. Start lab run and review phase-1 result.
5. Choose “Nicht reliable – Nachforderung/Bestätigung”.
6. Confirm Runde 2 appears only now.
7. Request Liquid Biopsy.
8. Confirm final report/MTB includes phase timeline, LB confirmation, HRD limitation and germline recommendation.
9. Repeat early-MTB/acceptance path and confirm it is scored as critical/limited.

### CRC Bundle Case
1. Test focused route: RAS + BRAF + MMR-IHC + MSI + MLH1.
2. Test broad route: broad PAN panel + MMR-IHC + MLH1.
3. Confirm broad route is complete/acceptable and not a budget-killer.
4. Confirm TMB-only remains incomplete.

## QA Status

Automated syntax QA: passed.
Manual browser QA: pending user review.
