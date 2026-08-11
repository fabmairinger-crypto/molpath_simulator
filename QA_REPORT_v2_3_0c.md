# QA Report — MolPath Simulator v2.3.0c

## Scope
Patch-only localization of the four v2.3.0b Signature→Deep-Dive payloads to **EN / RO / EL / ES / FR** while preserving the approved German source content.

## Result
**PASS** for static/runtime integration QA.

| Check | Result |
|---|---|
| Executable JS syntax | **32/32 PASS** |
| Case inventory in integration harness | **91/91** |
| Deep-Dive inventory | **15/15** |
| Newly localized Deep Dives | **4** |
| Languages tested | **DE + EN/RO/EL/ES/FR** |
| Case × language payload checks | **24/24 PASS** |
| DE round-trip after language switching | **4/4 PASS** |
| Technical gate/result identifiers unchanged | **PASS** |
| Patch isolation vs. v2.3.0b | **PASS** |
| Empty translation lines | **0** |
| Assets added | **0** |

## Translation coverage

| Case | Curated DE strings | Localized strings (5 target languages) |
|---|---:|---:|
| `MTB_CNS_001_v1_0` | 109 | 545 |
| `LAB_DOC_001_v1_0` | 135 | 675 |
| `RES_OMICS_001_v1_0` | 133 | 665 |
| `RES_ETH_001_v1_0` | 137 | 685 |
| **Total** | **514** | **2,570** |

The localization is scoped to user-facing strings in the new Deep-Dive payloads. Technical identifiers (`case_id`, gate/option/result IDs, `correct`, `type`, result classes, etc.) are deliberately unchanged.

## Runtime integration tests
For each of the six languages, the harness verified all four cases for:

- localized Deep-Dive title,
- localized opening scene,
- synchronized `case.deep_dive_title`,
- unchanged reasoning-gate IDs/types/answer keys,
- unchanged result-package IDs/classes.

After cycling through all locales and returning to German, all four Deep-Dive payloads matched the original approved German payloads exactly in the harness.

## Regression / isolation
The generated `index.html` differs from v2.3.0b only by:

1. `APP_VERSION`: `v2.3.0` → `v2.3.0c`, so the UI-polish observer cannot reset the displayed version to the older value.
2. One appended final runtime layer: `v230cSignatureDeepDiveTranslations`.

Rolling back those two deliberate changes produces the v2.3.0b input file byte-for-byte. Therefore the patch does **not** alter the existing 91-case base content, previous 11 Deep Dives, Method Rules, Score Caps, Courses, report engine or scoring logic.

## Browser smoke-test note
A real Chromium page-navigation smoke test was attempted via local HTTP. The environment blocks Chromium navigation to the local server with `ERR_BLOCKED_BY_ADMINISTRATOR`. This is an environment restriction, not an application exception. Static syntax validation and the dedicated JS integration/language-switch harness passed.

## Recommended manual smoke test
After replacing `index.html`, open one of the four cases and switch through **EN → RO → EL → ES → FR → DE**. Confirm title/opening/Deep-Dive cards update and then return to German. No further functional regression is expected from this isolated patch.
