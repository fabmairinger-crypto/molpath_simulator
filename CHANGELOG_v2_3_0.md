# MolPath Simulator v2.3.0 — UI Polish

Base: v2.2.4s (Signature 04 / RES Ethics)

## UI / UX
- Sidebar branding consolidated into one two-column brand block: Patho logo left; MolPath Simulator + powered by easyGene right.
- Language selector moved below the complete brand block and expanded to full sidebar width.
- Removed visible translation-development chip and German-fallback note from the language panel.
- Global visible app version standardized to **v2.3.0**.
- Hero badge now shows case type instead of an internal patch/version string: Deep Dive, Signature Case, or domain case type.
- Redundant current-case pill removed from the top status bar; top status now focuses on version, feedback mode, and free-play/course state.
- Legacy “stable v1.8 engine” wording removed from the user-facing dashboard copy.
- QM/Labor dashboard icon normalized to **LAB**, preventing the translated “Quality management” overflow.
- “Nutzungsmodus / Usage mode” relabeled as **Feedbackmodus / Feedback mode**.
- “Arbeitsmodus / Work mode” relabeled as **Navigation**.
- New UI labels and cleaned dashboard copy are curated for DE / EN / RO / EL / ES / FR.

## Version source
- Added `window.MOLPATH_APP_VERSION = "v2.3.0"` as the final UI release source of truth.
- `window.MolPathApp` and `window.MolPathUiPolish230` expose the release metadata.

## Scope
- UI-only patch.
- No case content, scoring, methods, reports, Deep Dive payloads, Signature payloads, or course logic changed.
