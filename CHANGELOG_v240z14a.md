# MolPath Simulator v2.4.0z14a — CRC NGS Evidence / Equivalence Hotfix

Base: **v2.4.0z14**

## MTB_CRC_001
- Added approved synthetic combined **Colon-/GI-NGS RAS/BRAF** report asset.
- `colon_ngs_panel` now renders one integrated NGS evidence sheet for **Extended RAS WT + BRAF p.V600E**.
- Pure Colon-NGS no longer shows the dedicated Extended-RAS report plus a synthetic BRAF text card.
- Dedicated `ras_panel_crc` and `braf_v600e_crc` continue to render their own assay-specific assets.
- `colon_ngs_panel` and `broad_pan_panel` remain diagnostically equivalent to dedicated RAS+BRAF testing for completion/scoring where they cover both targets.
- A broad pan-panel does **not** reuse the Colon-/GI-specific image; it remains a valid result pathway without a method-mismatched screenshot.

## MTB_CRC_002
- Fixed the BRAF reflex/completion bug: BRAF can now be fulfilled by `braf_v600e_crc`, `colon_ngs_panel`, or `broad_pan_panel`.
- Added approved synthetic CRC_002 **Colon-/GI-NGS BRAF/RAS** report asset.
- Pure Colon-NGS renders the NGS report and no longer requires or displays a BRAF qPCR result.
- Dedicated BRAF qPCR remains unchanged and renders the existing qPCR asset.
- Broad pan-panel is accepted as BRAF-capable but does not reuse the Colon-/GI-specific screenshot.

## Unchanged
- MMR-IHC, MSI, MLH1 methylation logic and existing assets.
- Other cases and global workflow/UI.
