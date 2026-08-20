# MolPath Simulator v2.5.0b — real flag icon hotfix

## Fix
- Replaces Unicode flag emoji in the visible language selector with inline SVG flag icons.
- Fixes Windows/Firefox rendering where Unicode regional-indicator flags appeared as `DE`, `GB`, `RO`, etc.
- Keeps the existing native `<select>` as the language state/accessibility source and overlays a custom visual picker.
- Applies to both the sidebar language selector and the Home/Help language selector.

## Scope
- No case, scoring, asset, translation-content or simulation-logic changes.
- Existing DE/EN/RO/EL/ES/FR/RU/TR/AR/FA registry and RTL behavior are unchanged.
