# QA Report – v2.4.0z13 MTB_CRC_002 Flagship

## Static / mock QA
- `v240z13_crc002_flagship.js`: `node --check` PASS
- all 8 referenced assets present and non-empty: PASS
- external patch script referenced once from the final document body: PASS
- mock runtime test: PASS
  - MMR-only selection exposes MMR asset only
  - MSI / MLH1 / BRAF assets remain hidden when not selected
  - full four-test selection resolves `missingTests()` to empty
  - full four-test report contains all four assay assets

## Runtime smoke test requested on target system
Please smoke-test in the normal local app runtime:
1. open `MTB_CRC_002`
2. verify intake shows referral + clinical letter
3. verify Histo shows H&E overview + zoom, but no MMR result
4. order MMR only -> run -> report: only MMR premium result should appear
5. reset; order MMR + MSI + MLH1 + BRAF -> run -> report: all four premium result assets should appear
6. assessment mode: no result asset before laboratory run
7. language switch: core app remains functional and premium chrome re-renders

## Known asset-content note
The approved pink referral currently contains a different synthetic patient identifier/name/date set than the other seven assets. It is retained exactly as approved for this functional patch and should be harmonized before final content freeze.

## Headless browser note
A local Chromium smoke attempt was started against a full overlaid test build, but the container Chromium process did not return a DOM within the allowed runtime and emitted environment/DBus errors. Therefore browser-runtime QA remains to be performed in the normal desktop environment.
