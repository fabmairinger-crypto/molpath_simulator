# CHANGELOG — RES_HYP_001 Flagship Runtime FIX2

## Scope
Fixes asset rendering for `RES_HYP_001_v0_9` on top of the v2.5.0b build with both LAB flagships.

## Root cause
The first RES_HYP_001 patch contained all 9 PNG assets, but its runtime integration depended on wrapping the RES renderer functions. In the real application render chain this hook was not reliably reached, so the files existed on disk but no flagship assets were inserted into the case DOM.

## Fix
- Replaced renderer-wrapper integration with a DOM-based asset injector bound to `#content`.
- Injection is driven only by `activeCase.id` and `state.step`; scoring, choices, correctness, gates and completion logic are untouched.
- Added the DOM hook inline in `index.html`.
- Replaced `v250b_reshyp001_flagship.js` with the same guarded DOM hook as compatibility fallback.
- Preserved the in-app asset modal behavior via normal local `assets/...png` links.
- Re-bundled all 9 physical assets under `assets/res_hyp_001/`.

## Reveal logic
- `project_idea`: asset 1
- `hypothesis` after a hypothesis selection: assets 2–3
- `methods`: asset 5
- `analysis`: assets 4 + 6
- `feedback`: assets 7 + 8
- completed `feedback`: additionally asset 9

## Logic changes
None.
