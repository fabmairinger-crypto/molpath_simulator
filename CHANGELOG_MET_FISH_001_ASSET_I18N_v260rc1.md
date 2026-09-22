# MET_FISH_001 Signature Asset + i18n Delta — v2.6.0-rc1

- Adds 8 curated training assets to `MET_FISH_001_v1_3`.
- Phase-gated display: referral → clinical/MRI context → H&E/IHC → EWSR1 break-apart FISH + report → RNA EWSR1::ATF1 → integrated diagnosis.
- Adds translations for every newly introduced visible asset caption/block/provenance string in EN, RO, EL, ES, FR, RU, TR, AR, FA and UK.
- Reuses the existing V240S MET_FISH_001 Deep-Dive logic unchanged, including required FISH and RNA partner-resolution groups.
- Does not modify case JSON, global i18n core/registry, render-loop fix, signature taxonomy, scoring, or any other case.
- Preserves the previously delivered CNS/HEM i18n consolidation layer in the cumulative `index.html`.
