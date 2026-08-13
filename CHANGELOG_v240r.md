# MolPath Simulator v2.4.0r — Structural / Legal Hotfix

Base: v2.4.0q. Patch-only release.

## Changes
- Centralized Signature Case truth source: only explicit `is_signature_case === true` / `signature_case === true` count as Signature.
- Corrected legacy dashboard/card logic that still treated every Deep Dive as Signature.
- Expected dashboard state after v2.4.0q content freeze: 39 Deep Dives, 15 Signature Cases.
- Added a permanent bottom footer with `Educational use only · Disclaimer & Terms · © 2026 MolPath Simulator`.
- Added English Disclaimer & Terms modal.
- Added versioned first-use acknowledgement (localStorage key `molpath_terms_accept_2026-08-v1`).
- Disclaimer states educational/simulation purpose, no direct professional decision-making, independent verification duty, and a liability limitation only to the extent permitted by applicable law.
- Copyright clause prohibits unauthorized reproduction/redistribution/systematic extraction/commercial exploitation while preserving uses permitted by applicable law.
- Version stamp updated to v2.4.0r.

## Not changed
- No case content changes.
- No scoring/method/result logic changes.
- No translation/content expansion.
- MET Deep-Dive expansion is the next content block.
