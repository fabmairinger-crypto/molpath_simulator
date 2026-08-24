# LAB_PRE_001 Course Flagship — v2.5.0b delta

## Scope
Upgrades `LAB_PRE_001_v1_3` in **QM / Labor Basics** to full Course-Flagship / Signature-quality depth without adding a Signature badge.

## Curated teaching path
1. Physical specimen-intake scene: unlabeled EDTA primary tube; labeled transport bag and matching request.
2. LIMS identity hard stop: quarantine / not acceptable.
3. Request + communication log: highly plausible sender statements do **not** establish primary-container identity.
4. Physical + digital quarantine / chain-of-custody.
5. Root-cause process reconstruction: interrupted bedside labeling plus absent mandatory pre-transport verification.
6. Correctly labeled recollection with two identifiers, barcode and separate new accession.
7. Final deviation/CAPA disposition: old sample rejected/discarded, replacement accepted, CAPA open until effectiveness check.

## Core learning rule
**Plausibility is not specimen identity.** For a newly obtainable unlabeled EDTA primary specimen, telephone confirmation or matching outer documentation must not be used to retrospectively label or rescue the original tube.

## Runtime behavior
- Adds 7 phase-gated training assets.
- Harmonizes LAB_PRE_001 Deep-Dive content with the approved course narrative.
- Retains existing scoring IDs and correctness semantics.
- `course_flagship = true`.
- No `signature_case` promotion; no Signature badge.

## Course progress
After this patch: **20/23 distinct course cases** are at Flagship level. Remaining: `RES_ROLE_001`, `RES_IMPL_001`, `RES_ETH_002`.

## Hotfix packaging correction
- Added `v250b_asset_modal_hotfix.js`, already referenced by `index.html`.
- Restores the existing in-app asset modal / escape-close behavior when this delta patch is applied standalone.
- No case logic, scoring, assets, or Signature status changed.

## FIX2 — robust Asset Escaper
- LAB_PRE_001 loader moved to the established Course-Flagship loader block after LAB_RUN_001.
- Asset modal upgraded to `escaper-v2` with an always-visible **× Schließen** control.
- `Esc`/`Escape` key and backdrop click close the asset directly (no browser-history dependency).
- LAB_PRE_001 asset links no longer use `target="_blank"`; they are handled in-app by the asset viewer.
