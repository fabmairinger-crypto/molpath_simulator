# QA Report – v2.2.4g CRC Deep Dive 03 Translation

## Integrated case

- Case ID: `MTB_CRC_002_v1_3`
- Reviewed messages: 158
- Active source locations: 171
- Runtime scope corrections: 5
- Languages: EN, RO, EL, ES, FR

## Runtime scope audit

The curated review payload covered the case narrative and clinical decision content. During integration, five additional user-visible strings were identified in metadata or follow-up trigger fields:

- difficulty label
- MVP review flag
- AP1b summary line
- missing MLH1-methylation/BRAF reflex-testing trigger
- premature confirmed-Lynch trigger

They are translated for all five target languages and recorded in the runtime dictionary.

## Interaction and language tests

Passed in Chromium:

- event-loop response after a 50-ms timer: 0.156 seconds
- click before language switching
- click after switching through all target languages
- language sequence DE → EN → RO → EL → ES → FR → DE
- localized base-case title in all five languages
- localized deep-dive title in all five languages
- localized MLH1/BRAF required-group label in all five languages
- localized follow-up trigger and review flag in all five languages
- German restoration after switching back
- Deep Dives 01 and 02 remain registered and translated
- method-catalog patch remains registered
- version label remains stable at `v2.2.4g CRC Deep Dive 03 Translation`
- JavaScript console errors: 0
- page errors: 0

No MutationObserver and no additional language-change listener were added. The existing interaction fix remains intact.

## Unchanged

- case and method IDs
- allowed tests
- points, section budget and TAT
- scoring and score caps
- save data
- clinical decision logic
