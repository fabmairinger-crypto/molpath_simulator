# QA Report — MolPath Simulator v2.3.0

**Status: PASS**

- Base: v2.2.4s
- Isolation: removing exactly the v2.3.0 end-of-document UI block reproduces the base `index.html` byte-for-byte.
- JavaScript syntax: **30/30** script blocks pass `node --check`.
- Runtime UI harness: **DE / EN / RO / EL / ES / FR PASS**.
- Version stamp: `v2.3.0` PASS.
- Language selector reparenting below branding: PASS.
- Translation debug chip/note removal: PASS.
- Feedback mode / Navigation labels: PASS in all six languages.
- Hero case-type badge: Deep Dive + Signature Case logic PASS.
- LAB dashboard icon normalization: PASS.
- Legacy user-facing v1.8-engine sentence replacement: PASS.
- Existing case/translation payloads are untouched by construction (append-only isolated UI block).

## Visual browser smoke
A Chromium screenshot smoke test could not be completed because browser navigation is blocked by the container administrator policy. No visual-browser PASS is claimed.

## SHA256
- Base index: `9c249f286884082b32415dc744a2489cd8269e0731e3c669914c94a801ec3faa`
- Patched index: `3b96d2a030ddf81b1d190af03f67075c2bcf4f02c4b147c5e3dd4cda3bbb5c27`
- UI fragment: `90b4260845b5cd87b735c92361eb5d60a12f8d9c462614b89510f25f863da9b1`
