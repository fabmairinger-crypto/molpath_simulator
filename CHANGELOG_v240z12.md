# MolPath Simulator v2.4.0z12 — Case Metadata Recalibration

Base: **v2.4.0z11**

## Scope
Post-Deep-Dive recalibration of **duration and difficulty metadata for all 91 cases**. No case text, scoring, reasoning gates, result logic, navigation logic or premium timeline behavior changed.

## Method
- Duration is synchronized to each case's already curated `estimated_minutes_deep` value from the final Deep-Dive payload.
- Difficulty uses the four values actually supported by the UI filter: `beginner`, `intermediate`, `advanced`, `expert`.
- Difficulty was judged by decision complexity, evidence integration, uncertainty/competing options, cross-domain consequences and system/planspiel character — **not by duration alone**.

## Changes
- Duration metadata changed in **62/91** cases relative to the effective v2.4.0z11 runtime metadata.
- Difficulty metadata changed/normalized in **38/91** cases.
- Removed unsupported hybrid values (`beginner_intermediate`, `intermediate_advanced`) from the effective runtime metadata.
- All 91 cases now use only filter-compatible difficulty values.
- Deep-Dive `estimated_minutes_deep` and base-case `estimated_time_min` are synchronized at runtime, so hero, cards and filters use the same duration.

## Difficulty distribution after recalibration
- Beginner: **14**
- Intermediate: **47**
- Advanced: **26**
- Expert: **4**

## Audit artifact
`CASE_METADATA_AUDIT_v240z12.csv` contains all 91 cases with old/new duration, old/new difficulty, change flags and calibration rationale.

## QA
- Deep-Dive registry: **91/91 unique case IDs**.
- Metadata registry: **91/91 exact ID match**.
- Difficulty enum audit: only `beginner`, `intermediate`, `advanced`, `expert`.
- Duration source audit: all 91 values derived from the final curated Deep-Dive payloads.
- No content/scoring/gate objects modified.
