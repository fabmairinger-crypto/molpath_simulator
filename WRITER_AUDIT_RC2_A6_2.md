# MolPath rc2-clean — A6.2 Persistent Writer Audit

This audit is the safety boundary for the next cleanup step.

| Layer | Current role | A6.2 action | Why |
|---|---|---|---|
| v240z12 metadata calibration | stale semantic metadata writer | **table removed; writer disabled** | Canonical A4b now owns difficulty/time; four real collisions were already identified |
| COURSES_V16 inline literal | static course data authority | **removed** | Exact parity with canonical 5-course registry proven |
| v250b Methods Focus REGISTRY | static 44-case registry duplicated in UI layer | **removed** | Exact parity with canonical Methods Focus registry proven |
| v240z13 CRC002 | case logic + localized/presentation behavior | retained | `applyCaseLogic()` runs on render/i18n; split before removal |
| v240z14 CRC001 | case logic + localized/presentation behavior | retained | same reason |
| v240z15 NSCLC002 | case logic + localized/presentation behavior | retained | same reason |
| v240z16 MET_NGS_003 | case logic + localized/presentation behavior | retained | same reason |
| v240z18 OVAR002 | case logic + report/content wrappers + curation-safe replacement | retained | documented 12-case curation depends on this patched wrapper |
| v240z20 IO001 | story/result/deep-dive localization/presentation writer | retained | must separate localization from semantic authority first |
| legacy_v223_v224 runtime language wrappers | method catalog + per-case/meta/deep-dive localization | retained | language overlays, not yet flattened into final dictionaries |
| rc1 asset upgrade layers | assets + case/deep-dive/i18n setup | retained | source-split after asset/i18n authority extraction |

## Rule for A6.3
No hybrid writer is deleted merely because its final German data already exists in A4b. First separate:
**canonical semantic data** → **localized copy** → **renderer/assets**.

Only the semantic-write part may then be retired. This prevents reintroducing an old case state or silently losing translated/presentation behavior.
