# RES_HYP_001 Flagship Runtime FIX3 — STABLE

## Problem
FIX2 used a MutationObserver on `#content`. Its own remove/reinsert cycle generated new mutations, causing a recursive microtask/render loop. This explains UI freezes during MTB/LAB/RES or case switching and inconsistent asset rendering.

## Fix
- Removed the entire inline RES_HYP DOM/MutationObserver injector from `index.html`.
- Replaced it with one external `v250b_reshyp001_flagship.js` reference.
- New layer wraps the existing `renderContent()` output once per normal application render, matching the stable additive LAB flagship pattern.
- No MutationObserver, click listener, polling or timers.
- No scoring, choices, research-state or completion changes.
- 9/9 approved assets included again.

## Reveal logic
- Project idea: 1
- Hypothesis after choice: 2–3
- Methods: 5
- Analysis: 4 + 6
- Feedback: 7 + 8
- After completion: 9 additionally

## QA
PASS: JS syntax, asset paths, PNG signatures, locale namespaces, removal of FIX2 hook, deterministic reveal simulation, 100k render-call stress simulation.
