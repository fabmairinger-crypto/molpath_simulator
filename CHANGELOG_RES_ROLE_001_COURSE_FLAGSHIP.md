# RES_ROLE_001 Course Flagship — v2.5.0b delta

## Scope
Upgrades `RES_ROLE_001_v1_3` to Course-Flagship / Signature-quality content without promoting the case to the runtime Signature-Case set. This completes the Course-Flagship program: **23/23 course cases** are now at Flagship level.

## Curated teaching story
1. Submission crisis: ~48 h before deadline, the manuscript is nearly final but authorship is unresolved; recruitment-based co-first demand and proposed honorary authorship create pressure.
2. Contributions are reconstructed from project records before any authorship decision is made.
3. CRediT maps who did what, explicitly without converting role counts into authorship or rank.
4. ICMJE criteria are applied person-specifically: Postdoc, Clinician, Pathologist and PI are eligible; Bioinformatician is conditional because accountability is still open; Prof. X is not eligible without documented substantive contribution.
5. A **proposed** contribution-based order is documented: Postdoc first, Clinician second, Pathology third, Bioinformatics conditional fourth, PI last/senior; no co-first and no honorary authorship.
6. Joint interpretation and critical revision close the Bioinformatician's accountability gap; Criterion 4 becomes fulfilled and position 4 is confirmed.
7. Final author agreements, CRediT/COI, corresponding author, approval timestamps and locked order are archived; the package is **READY FOR SUBMISSION**, while actual journal submission remains outside the case.

## Runtime integration
- Research renderer phases: `project_idea -> hypothesis -> methods -> analysis -> feedback`.
- Assets 3+4 share the methods phase; Asset 6 is the accountability-resolution feedback layer; Asset 7 is post-completion gated.
- Existing research choice IDs/scoring/correctness semantics are retained; wording and Deep-Dive content are harmonized to the approved authorship story.
- `signature_case` is not set or changed; Deep-Dive retains `is_signature_case=false`.
- Asset viewer uses the existing robust Escaper v2 modal (visible close button, Esc key, backdrop close).

## Course status
**23/23 course cases at Flagship / Signature-quality level. 0 remaining.**
