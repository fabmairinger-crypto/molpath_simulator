# MolPath Simulator v2.4.0z — LAB/QM Translation Completion

Base: **v2.4.0y1**

## Changes

- Completed multilingual translation coverage for the **24 LAB Deep Dives added in v2.4.0u–v2.4.0y**.
- Added complete exact-string translations for **English, Romanian, Greek, Spanish and French**.
- Existing translations are preserved: the merge only adds dictionary entries that were not already present.
- The three pre-existing LAB Signature Deep Dives remain unchanged and keep their existing translations.
- German master content, case logic, scoring, twists, result packages, Signature classification and the v2.4.0y1 C4/C5 schema hotfix are unchanged.

## Coverage

- LAB Deep Dive: **27/27**
- LAB multilingual Deep Dive: **27/27** in DE/EN/RO/EL/ES/FR
- Newly translated LAB Deep Dives: **24**
- New translation source strings: **2,222 per target language**
- Signature Cases: expected **15**, unchanged

## Translation merge policy

The v2.4.0z layer adds missing exact translations only. If a German source string already had a translation in the established MolPath dictionary, that existing translation is retained. This prevents regressions in previously translated MTB/MET/Signature content.
