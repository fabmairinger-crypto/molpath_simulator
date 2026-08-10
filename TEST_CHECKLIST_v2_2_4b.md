# Manual test checklist – v2.2.4b Translation Integration Test – Blocks 01–03

Use a fresh browser profile or clear `localStorage.molpath_lang` before the first run.

## Per language: EN, RO, EL, ES, FR

1. Change the language in the sidebar.
2. Verify the main navigation, mode labels, filters and buttons.
3. Open a case and navigate to the digital requisition.
4. Verify cart labels, empty-cart message, points, sections and TAT.
5. Select methods and verify parameterized values such as `3 points`, `1 section`, `5 d`.
6. Start the analytical run and verify material/TAT/budget cards.
7. Open the report and verify report/result/limitation terminology.
8. Open the MTB screen and complete a case to reveal score and feedback.
9. Check long Romanian, Greek, Spanish and French strings for clipping or overlap.
10. Switch back to German and confirm the original German source texts return.

## High-priority contextual checks

- `Material` must remain a generic material/specimen term in case history, but become **specimen use** or its equivalent in cart/resource cards.
- `Laborlauf` may be generic in navigation, but should use analytical-run terminology in the laboratory-run screen.
- Lowercase `empfohlen` and `optional` method badges must use the grammatically appropriate method-status form.
- Dynamic placeholders must retain the live numbers and item names.

## Failure capture

Record:

- language
- screen and case
- exact German source or visible incorrect target text
- screenshot
- whether the issue is translation, layout, or runtime behavior
