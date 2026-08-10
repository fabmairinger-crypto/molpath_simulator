# QA Report – v2.2.4h HGSOC Deep Dive 04 Translation

## Integrated case

- Case ID: `MTB_OVAR_002_v1_3`
- Reviewed messages: 169
- Active source locations: 178
- Runtime scope corrections: 6
- Languages: EN, RO, EL, ES, FR

## Runtime scope audit

The curated review payload covered the clinical narrative and decision content. During integration, six additional visible structural values were localized:

- complex length label
- advanced difficulty label
- MVP review flag
- AP1b summary line
- VUS-overcalling follow-up trigger
- missing-HRD follow-up trigger

Technical IDs, filter enums and internal keys remain unchanged.

## Interaction and language tests

Passed in Chromium:

- event-loop response after a 50-ms timer: 0.203 seconds
- event-loop response after a post-switch click: 1.832 seconds
- real click before language switching
- real click after switching through all target languages
- language sequence DE → EN → RO → EL → ES → FR → DE
- localized base-case title in all five languages
- localized deep-dive title in all five languages
- localized VUS-evidence required-group label in all five languages
- localized follow-up triggers, review flag, difficulty and length class
- German restoration after switching back
- Deep Dives 01–03 remain registered and translated
- method-catalog patch remains registered
- version label remains stable at `v2.2.4h HGSOC Deep Dive 04 Translation`
- JavaScript console errors: 0
- page errors: 0

No MutationObserver and no additional language-change listener were added.

## Unchanged

- case and method IDs
- allowed tests
- points, section budget and TAT
- scoring and score caps
- save data
- clinical decision logic
