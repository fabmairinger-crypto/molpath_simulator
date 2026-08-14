# QA Report — v2.4.0z14a

## Static / syntax
- `node --check` CRC_001 runtime patch: PASS
- `node --check` CRC_002 runtime patch: PASS
- Full overlay from v2.4.0z13a + v2.4.0z14 + v2.4.0z14a: PASS
- Existing `index.html` script references resolve without index modification: PASS
- New asset files present and non-empty: PASS
- New assets byte-identical to the approved generated files: PASS

## Logic matrix
### MTB_CRC_001
- Extended-RAS + BRAF qPCR + MMR + MSI + MLH1: COMPLETE
- Colon-NGS + MMR + MSI + MLH1: COMPLETE
- Broad pan-NGS + MMR + MSI + MLH1: COMPLETE
- Pure Colon-NGS evidence: combined NGS asset shown; no dedicated RAS asset; no BRAF qPCR asset: PASS
- Dedicated PCR path: dedicated RAS + BRAF qPCR assets shown; no Colon-NGS asset: PASS

### MTB_CRC_002
- BRAF qPCR + MMR + MSI + MLH1: COMPLETE
- Colon-NGS + MMR + MSI + MLH1: COMPLETE
- Broad pan-NGS + MMR + MSI + MLH1: COMPLETE
- Pure Colon-NGS evidence: CRC_002 NGS asset shown; no BRAF qPCR asset: PASS
- Dedicated BRAF qPCR path: qPCR asset shown; no Colon-NGS asset: PASS

## Scope note
Diagnostic completeness is equivalent for an adequately covering NGS pathway and dedicated RAS/BRAF assays. Resource/TAT costs remain method-specific by design.
