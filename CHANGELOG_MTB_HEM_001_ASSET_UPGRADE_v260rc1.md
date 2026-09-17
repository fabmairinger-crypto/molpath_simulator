# MTB_HEM_001 Asset / Content Upgrade — v2.6.0-rc1

Patch ID: `v2.6.0-rc1+MTB_HEM_001_ASSET01`

## Scope
Case-local upgrade of `MTB_HEM_001_v1_3` only. The final Signature taxonomy is not changed.

## Clinical / didactic story
The former generic/CCUS-oriented version is replaced by a concrete integrated hematopathology case:
- 72-year-old man with persistent macrocytic anemia, neutropenia and thrombocytopenia.
- Peripheral blood: subtle dysgranulopoiesis, no blast excess.
- Bone-marrow aspirate: significant dysplasia in multiple lineages; blasts ~2–3%.
- Trephine: age-adjusted hypercellularity and dysplastic megakaryopoiesis; low CD34-positive blast fraction.
- Flow: ~2.8% myeloid blasts with mild maturation asynchrony.
- Conventional cytogenetics: 46,XY[20].
- Myeloid DNA-NGS: DNMT3A p.Arg882His (31.2%), TET2 p.Arg1216Ter (27.8%), ASXL1 p.Gly646Trpfs*12 (18.6%).
- Integrated classification: WHO-HAEM5 MDS with low blasts (MDS-LB); ICC MDS, NOS with multilineage dysplasia.

## Core teaching message
`Klonalität ≠ MDS-Diagnose.` DTA mutations establish clonal hematopoiesis but are not, by themselves, specific for MDS. In this case the diagnosis is supported by persistent cytopenias plus significant multilineage dysplasia and low blasts.

## Runtime
- Adds seven case-specific synthetic training assets.
- Adds a case-local runtime layer that aligns the existing deep-dive with the upgraded story.
- Final integrated report is displayed after finalization when `epigenetic_heme_panel` has been selected.
- No global score weights, course membership, language registry, FOM integration or Signature taxonomy are changed.

## Known accepted visual-polish notes
Two previously accepted image-level wording details remain embedded in static training assets:
- Trephine slide contains a simplified blast/AML wording; the canonical/runtime interpretation is more precise and should govern teaching.
- Flow/cytogenetics slide contains minor didactic wording that is superseded by the canonical/runtime case text.
These do not alter the intended diagnostic pathway or scoring logic.
