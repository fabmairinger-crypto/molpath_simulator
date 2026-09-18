# Signature render-loop hotfix — v2.6.0-rc1

## Symptom
The case-library view continuously accumulated/rendered Signature badges after startup/i18n application.

## Root cause
`i18n/core.js` observes child-list DOM mutations and schedules another i18n pass. The final Signature taxonomy cleanup ran after every i18n pass but unconditionally removed and reinserted Signature badges and rewrote the Signature KPI. Those DOM mutations scheduled the next i18n pass, creating a feedback loop.

## Fix
- Signature badge reconciliation is now idempotent.
- Existing correct library and hero badges are retained.
- Duplicate badges are removed once; missing badges are created once.
- The Signature KPI text is changed only when its value actually differs.
- Signature taxonomy, final 30-case authority, course logic and filters are unchanged.

## Scope
Only `v1/v250b_signature_taxonomy_freeze.js` runtime behavior is changed. No case content/assets/i18n dictionaries are modified.
