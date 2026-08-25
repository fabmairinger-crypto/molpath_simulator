# RES_ETH_002 Course Flagship — v2.5.0b delta

## Scope
Upgrades `RES_ETH_002_v1_3` to Course-Flagship / Signature-quality content without promoting the case to the runtime Signature-Case set.

## Curated teaching story
1. Research-WES identifies `BRCA2 c.5946delT p.(Ser1982Argfs*22)` at ~51% tumor VAF with strong pathogenicity evidence — but the result is Research Use Only.
2. Study protocol and consent show a predefined Return-of-Results policy, documented opt-in, right not to know and controlled re-identification.
3. Evidence review separates variant pathogenicity, germline origin and clinical reportability; ~50% tumor VAF is a clue, not proof of germline status.
4. Governance Board authorizes only the clarification pathway (`CONDITIONAL PROCEED`), not disclosure of a confirmed germline result.
5. Independent EDTA blood testing with a validated diagnostic assay plus Sanger confirms the same BRCA2 variant at ~49% VAF as a heterozygous germline pathogenic variant.
6. Post-test genetic counseling returns the confirmed result in a patient-centered, consent-based and confidential process.
7. Final governance dashboard links research, consent, board decision, diagnostic accession/report and counseling note; the Return-of-Results process closes policy-compliant.

## Runtime integration
- Research renderer phases: `project_idea -> hypothesis -> methods -> analysis -> feedback`.
- Assets 3+4 share the methods/governance phase; Asset 7 is post-completion gated.
- Existing research choice IDs/scoring/correctness semantics are retained; wording and Deep-Dive content are harmonized to the approved BRCA2 story.
- Previous TP53/CHIP Deep-Dive storyline is replaced by the approved BRCA2 germline-confirmation storyline.
- `signature_case` is not set or changed; Deep-Dive retains `is_signature_case=false`.
- Asset viewer uses the existing robust Escaper v2 modal (visible close button, Esc key, backdrop close).
