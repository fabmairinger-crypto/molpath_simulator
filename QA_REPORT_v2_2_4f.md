# QA Report – v2.2.4f NSCLC Deep Dive 02 Translation

## Integrated case

- Case ID: `MTB_NSCLC_002_v1_3`
- Reviewed messages: 145
- Active source locations: 148
- Runtime structural-field corrections: 19
- Languages: EN, RO, EL, ES, FR

## Integration audit

The reviewed payload covered the curated narrative and decision content. During runtime integration, 19 additional user-visible strings were found in structural fields that the review extractor had intentionally excluded, including:

- required-group labels
- result-section labels and result summaries
- MTB checklist statements
- complete/partial interpretation summaries
- follow-up triggers
- two visible metadata review fields

These were translated for all five target languages and recorded in the runtime dictionary.

## Interaction and runtime tests

Passed in Chromium:

- event-loop response after a 50-ms timer: 0.174 seconds
- click before language switching
- click after language switching
- switch German → English → German
- English Deep Dive 02 title
- English structural-field labels and result summary
- English follow-up trigger
- Deep Dive 01 remains translated
- version label remains stable at `v2.2.4f NSCLC Deep Dive 02 Translation`
- JavaScript console errors: 0
- page errors: 0

No document-wide MutationObserver was added. The v2.2.4e1 interaction fix is preserved.

## Unchanged

- case and method IDs
- allowed tests
- points, section budget and TAT
- scoring and score caps
- save data
- clinical decision logic
