# QA REPORT — v2.4.0s

## Ergebnis
PASS

- Basis: v2.4.0r
- Core-Fälle: 91
- Patientenversorgung-Fälle: 42
- MET-Fälle im Patientenversorgungsbereich: 10
- Neue MET-Deep-Dives: 10/10
- Erwarteter Gesamtstand Deep Dive: 49/91
- Signature Cases: 15 (keine neuen Signature-Fälle)
- Neue Deep-Dives mit `is_signature_case=false`: 10/10
- Vollständiger Deep-Dive-Contract: 10/10
- Methodenreferenzen: alle verwendeten IDs existieren bereits im Fall-/Methodenbestand
- Ausführbare Inline-JS-Blöcke: 46
- JS-Syntaxfehler: 0
- Isolierter Runtime-Harness: [MolPath v2.4.0s] 10 MET Deep Dives added; patient care now 42/42; Signature set unchanged.
RUNTIME_PASS 10/10
- Version-Stamp: v2.4.0s

## Gezielte Logik-Fixes
- Coverage: globaler Run-PASS erlaubt keine lokale Negativaussage bei untervalidierter Zielregion.
- FFPE: Low-VAF-C>T nicht pauschal verwerfen oder overcallen; unabhängige Reproduzierbarkeit eingebaut.
- VUS: technische Echtheit, Pathogenität und Actionability getrennt.
- Tumor-only: VAF nicht als Keimbahnbeweis.
- Fusion: DNA-Negativität bei unvollständiger Breakpointabdeckung nicht als Ausschluss.
- Liquid Biopsy: niedrige Tumorfraktion macht negativen Plasma-Befund nichtinformativ.
- MRD: diagnostisches Breitenpanel nicht als Ersatz für validierte hochsensitive Zielmethode.
- Methylierung: Intended Use/Validierung statt „mehr Omik ist besser“.
- FISH: Rearrangementnachweis nicht automatisch Partner-/Entitätsnachweis.
- Multiomics: validierte Biomarker, relevante Negative und explorative Signaturen getrennt.

Browser-E2E wurde nicht als PASS behauptet; statische Syntax-, Schema-, Referenz- und isolierte Runtime-QA sind erfolgreich.
