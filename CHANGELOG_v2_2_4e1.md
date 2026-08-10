# Changelog v2.2.4e1 NSCLC Interaction Hotfix

- Integrates Deep Dive 01 `MTB_NSCLC_001_v0_6` in EN, RO, EL, ES and FR.
- Localizes case metadata, base case, reasoning gates, deep-dive narrative, result routes, follow-up logic and instructor/report additions.
- Preserves IDs, allowed tests, budgets, scoring, TAT, save data and clinical decision logic.
- Adds exact-string fallback translations for all 148 reviewed messages.
- Closes two source-scope gaps in `followup_logic.trigger` and localizes two visible metadata review strings.
- Inserts the runtime patch immediately before the final real `</body>` to avoid the v2.2.4d template-escape defect.
