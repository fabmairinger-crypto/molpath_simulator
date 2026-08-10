# QA Report – v2.2.4i ERBB2 VUS Deep Dive 05 Translation

## Integrated case

- Case ID: `MET_NGS_003_v1_0`
- Reviewed messages: 160
- Active source locations: 167
- Runtime scope corrections: 3
- Languages: EN, RO, EL, ES, FR

## Runtime scope audit

The curated review payload covered the clinical narrative, metadata and decision content. During integration, three additional visible structural values were localized: the AP1b summary and two required-group labels. Technical IDs, filter enums and internal keys remain unchanged.

## Interaction and language tests

Passed in Chromium:

- event-loop response after a 50-ms timer: 0.254 seconds
- event-loop response after a post-switch click: 2.271 seconds
- real click before language switching
- real click after switching through all target languages
- language sequence DE → EN → RO → EL → ES → FR → DE
- localized base-case and deep-dive titles in all five languages
- localized VUS curation group and evidence result in all five languages
- localized HER2-context and therapy-overcalling follow-up triggers
- localized review flag, difficulty and AP1b summary
- German restoration after switching back
- Deep Dives 01–04 remain registered and translated
- method-catalog patch remains registered
- version label remains stable at `v2.2.4i ERBB2 VUS Deep Dive 05 Translation`
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
