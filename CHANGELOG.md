# CHANGELOG – MolPath Simulator v2.4.0n

## A2 CRC Deep-Dive expansion

Base: **v2.4.0m**

### Added / upgraded
- `MTB_CRC_003_v1_3` → full Deep Dive: BRAF V600E in right-sided mCRC; removed melanoma copyover; pMMR/MSS twist; CRC-specific BRAF/EGFR logic.
- `MTB_CRC_004_v1_3` → full Deep Dive: wrong polyp block / no invasive carcinoma; technical vs clinical validity; stop + request correct invasive material.
- `MTB_CRC_005_v1_3` → full Deep Dive: **RAS/BRAF wild type as a therapeutically meaningful negative selection result** for anti-EGFR in appropriate left-sided mCRC; HER2 amplification as later target/resistance context.

### Medical/content corrections
- Removed `braf_melanoma` / `melanoma_io_context` from CRC003 active logic.
- CRC003 no longer uses a melanoma BRAF/MEK interpretation; BRAF V600E is handled with CRC-specific BRAF/EGFR context and independent MMR/MSI assessment.
- CRC004 no longer produces a falsely successful MSI/MMR tumor workup from a non-invasive polyp remnant; the correct path is material review and representative invasive tumor tissue.
- CRC005 explicitly teaches that RAS/BRAF wild type is not “nothing found”: absence of established downstream MAPK resistance drivers is a positive selection criterion for anti-EGFR antibodies in the appropriate clinical context, but does not guarantee response.
- HER2 wording is deliberately bounded: target / possible resistance context; no claim of acquisition without baseline HER2 testing.

### Architecture
- No new Signature Cases.
- Existing Deep-Dive/Signature separation from v2.4.0m retained.
- No UI polish or asset work.
- German master content only; translations intentionally deferred until content freeze.

### Counts after patch
- Deep Dives: **23/91**
- MTB Deep Dives: **16/32**
- A2 CRC block: **5/5**
- Signature Cases: **15**
