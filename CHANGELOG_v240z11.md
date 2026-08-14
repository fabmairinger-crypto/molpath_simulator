# MolPath Simulator v2.4.0z11 — Global Baseline Polish

Base: **v2.4.0z10a**

## Scope
UI/navigation consolidation after completion of the Deep-Dive rollout (**91/91 Deep Dive**, **15/15 canonical Signature Cases**). No case content, scoring, gates or decision logic changed.

## Changes

### 1. Deep-Dive badge retired
- Removed the visible **Deep Dive** badge from case headers, hero area, legacy badge rows, case cards and the Deep-Dive summary popup.
- `deep_dive` metadata and Deep-Dive content registry remain untouched and continue to drive the case renderer.
- **Signature Case** remains the selective distinction and is shown only for the canonical 15 Signature Cases.

### 2. Canonical case titles in navigation
- Case navigation no longer prioritizes legacy `short` values such as `LAB PRE`, `LAB RUN`, `RES: ...`, etc.
- Sidebar case cards, case selector, course rows and hero title now use the canonical Deep-Dive `title` (`v17Deep(c).title` / `deep_dive_title` fallback).
- Existing multilingual infrastructure is reused; no duplicate title catalogue was introduced.
- Title-localization audit: all **91/91** canonical titles have coverage in EN / RO / EL / ES / FR, either through the exact i18n dictionaries or the existing localized Signature Deep-Dive payload.

### 3. Premium timeline globalized
- Replaced the legacy numbered stepper for all MTB/MET, LAB and RES cases with the horizontal premium timeline pattern already used by the three flagship cases.
- Domain-specific palettes retained:
  - MTB/MET: blue/green/orange/purple/teal sequence
  - LAB: blue/orange/purple/red/teal/green/navy sequence
  - RES: navy/blue/purple/teal/orange/green/cyan/indigo sequence
- Current step is highlighted.
- Completed/visited steps remain clickable for backward navigation.
- Future steps remain locked.
- Active step is automatically centered in the horizontal scroll area.
- Timeline labels use the active language.

## QA
- 65 inline JavaScript blocks syntax-checked individually with `node --check`: **0 failures**.
- Static Deep-Dive registry audit: **91 unique cases**.
- Canonical Signature set: **15 unique cases**.
- Canonical navigation-title localization coverage: **91/91** in DE + EN/RO/EL/ES/FR.
- No new MutationObserver or polling loop introduced.
- Patch is UI/wiring-only; case content, scoring and workflow logic remain unchanged.
