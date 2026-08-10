# QA Report – v2.2.4j LAB Run QC Deep Dive 06 Translation

## Integrated case

- Case ID: `LAB_RUN_002_v0_8`
- Reviewed messages: 147
- Active source locations: 159
- Runtime scope corrections: 1
- Languages: EN, RO, EL, ES, FR

## Runtime scope audit

The curated review payload covered the complete laboratory-QM narrative, metadata and decision content. During integration, the visible combined AP1b metadata summary was localized. Technical IDs, enums, filter values and internal keys remain unchanged.

## Interaction and language tests

Passed in Chromium:

- event-loop response after a 50-ms timer: 0.322 seconds
- event-loop response after a post-switch click: 2.563 seconds
- real click before language switching
- real click after switching through all target languages
- language sequence DE → EN → RO → EL → ES → FR → DE
- localized base-case and deep-dive titles in all five languages
- localized run-hold decision and CAPA component
- localized contamination twist and both follow-up triggers
- localized review flag and AP1b summary
- German restoration after switching back
- Deep Dives 01–05 remain registered and translated
- method-catalog patch remains registered
- version label remains stable at `v2.2.4j LAB Run QC Deep Dive 06 Translation`
- JavaScript console errors: 0
- page errors: 0

No MutationObserver and no additional language-change listener were added.

## Unchanged

- case and method IDs
- decision IDs and technical enums
- points, section budget and TAT
- scoring and score caps
- save data
- laboratory decision logic
