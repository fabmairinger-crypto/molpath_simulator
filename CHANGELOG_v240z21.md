# MolPath Simulator v2.4.0z21 — Responsive Tablet/Mobile Shell

**Base:** v2.4.0z20  
**Date:** 2026-08-17

## Scope
UI-only responsive shell patch. No case content, diagnostic logic, scoring rules, test selection logic, flagship assets, translations, or case metadata were intentionally changed.

## Changes
- Tablet/mobile breakpoint extended to `<= 1400 px` so common tablet landscape widths no longer fall into the desktop three-column layout.
- Left navigation converted to an off-canvas drawer with menu button and backdrop.
- Main case content uses the full available viewport width in compact mode.
- Permanent right-hand score/metrics card converted to an on-demand bottom sheet in compact mode.
- Method-selection cart converted to an on-demand bottom sheet in compact mode.
- Home dashboard and course dashboard moved behind an on-demand Overview sheet in compact mode; they no longer consume multiple screens above the active case.
- Hero/KPI header compacted on tablet/mobile; full KPI grid remains available through Score and desktop behavior remains intact.
- Horizontal overflow hardened: responsive grids collapse, images/canvas are constrained, and wide case tables scroll locally rather than forcing the whole page sideways.
- Compact shell controls support DE/EN/RO/EL/ES/FR labels.
- Version stamp updated to `v2.4.0z21`.

## Desktop behavior
At widths `> 1400 px`, the compact toolbar/drawers are disabled and the existing desktop layout is retained.
