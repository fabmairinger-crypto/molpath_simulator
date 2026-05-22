# Changelog – case_audit_v1_5 AP1b correction
## Zweck
Übernahme der besprochenen Korrektur: sechs bisher als `Standard` klassifizierte Fälle wurden als `Complex` reklassifiziert, damit die Fallbibliothek die vorgesehene Längenklasse vollständig abbildet.
## Geänderte Felder
- `length_class_proposed`: `Standard` → `Complex`
- `estimated_min`: auf `20` gesetzt
- `estimated_max`: auf `30` gesetzt
- `clinical_reasoning_gate_count`: auf `4` gesetzt
- `tags`: ergänzt um `complex_case`, `AP1b_length_reclass`

## Geänderte Fälle
| base_id | case_id | Schwierigkeit | neue Länge | Begründung |
|---|---|---|---|---|
| LAB_POST_001 | LAB_POST_001_v1_0 | Advanced | Complex | Pipeline-Version geändert; Change-Control, Revalidierung, Audit-Trail und Befundimpact müssen integriert werden. |
| MTB_NSCLC_002 | MTB_NSCLC_002_v1_3 | Advanced | Complex | Progress unter EGFR-TKI mit negativer Liquid Biopsy, Rebiopsie-/Resistenzlogik und Nachforderungsentscheidung. |
| MTB_OVAR_002 | MTB_OVAR_002_v1_3 | Advanced | Complex | BRCA2-VUS mit PARP-Kontext, Keimbahn-/VUS-Kommunikation und Overcalling-Risiko. |
| MET_NGS_004 | MET_NGS_004_v1_3 | Advanced | Complex | Tumor-only NGS mit Keimbahnverdacht BRCA/TP53, Humangenetik und Rückmelde-/Kommunikationslogik. |
| LAB_AUDIT_001 | LAB_AUDIT_001_v1_3 | Expert | Complex | Auditfall mit SOP-Version, Schulungsnachweisen, Kompetenzmatrix und dokumentierter Nachvollziehbarkeit. |
| RES_ETH_002 | RES_ETH_002_v1_3 | Advanced | Complex | WES-Projekt mit potenzieller Keimbahnvariante, Rückmeldepolicy, Humangenetik und Ethik-Governance. |

## Neue Verteilung Länge
| Länge | Anzahl |
|---|---:|
| Mini | 34 |
| Standard | 45 |
| Complex | 6 |
| Planspiel | 6 |

## Verteilung Schwierigkeit unverändert
| Schwierigkeit | Anzahl |
|---|---:|
| Beginner | 31 |
| Intermediate | 35 |
| Advanced | 15 |
| Expert | 10 |
