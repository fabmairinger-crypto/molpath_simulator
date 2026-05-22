# MolPath Simulator v1.5 – AP1b Decision Log (final)

Status: **finalisiert**  
Erstellt: 2026-05-19 08:27

## Zweck

AP1b friert die Kurationsentscheidungen aus den Blöcken 1–4 ein. Diese Dateien sind die reproduzierbare Grundlage für den späteren v1.5-App-Patch.

## Block 1 – Taxonomie

Finale Hauptdomänen:

- `MTB` = Patientenversorgung / Pathologieassistenz / Tumorboard
- `LAB` = Laborleitung / LIMS / QM / CAPA / Audit
- `RES` = Forschung / Translation / Projektplanung
- `MET` bleibt Zusatztyp / Badge und wird nicht als vierte Hauptwelt geführt.

Finale Längenklassen:

| Länge | Zielzeit | Bedeutung |
|---|---:|---|
| Mini | 3–5 min | eine Kernentscheidung |
| Standard | 8–15 min | vollständiger kleiner Workflow |
| Complex | 20–30 min | Twist / Nachforderung / mehrere Entscheidungsebenen |
| Planspiel | 30–60 min | Seminar-, Team-, Audit- oder Projektfall |

Finale Schwierigkeit:

- Beginner
- Intermediate
- Advanced
- Expert

Wichtig: **Länge und Schwierigkeit bleiben getrennte Achsen.**

## Block 1b – Complex-Korrektur

Folgende Fälle wurden von Standard auf Complex umgestellt:

| Fall | Titel | Schwierigkeit | Minuten |
|---|---|---|---|
| `LAB_POST_001` | Pipeline-Version geändert, kein Change-Log → Bioinformatik-QM und Impact-Analyse | Advanced | 20–30 |
| `MTB_NSCLC_002` | NSCLC mit EGFR-Mutation und Progress unter TKI → Liquid Biopsy negativ: reicht das oder Rebiopsie? | Advanced | 20–30 |
| `MTB_OVAR_002` | BRCA2-Variante unklarer Signifikanz im Ovarialkarzinom → VUS nicht als therapeutisch gesichert verkaufen | Advanced | 20–30 |
| `MET_NGS_004` | Tumor-only NGS: Keimbahnverdacht BRCA/TP53 → Humangenetische Abklärung empfehlen? | Advanced | 20–30 |
| `LAB_AUDIT_001` | Auditor fragt nach SOP-Version und Schulungsnachweis → Dokumente/Kompetenzmatrix zeigen | Expert | 20–30 |
| `RES_ETH_002` | WES-Projekt findet potenzielle Keimbahnvariante → Rückmeldepolicy und Humangenetik | Advanced | 20–30 |

## Block 2 – Clinical-Reasoning-Gates

Clinical Reasoning wird nicht mehr für das bloße Lesen der Fallakte vergeben.

Finale Regel:

| Falllänge | Gate-Struktur |
|---|---|
| Mini | 1 Frage |
| Standard | 2–3 Fragen |
| Complex | 4 Fragen |
| Planspiel | phasenweise mehrere Gates |

Zulässige Fragetypen für v1.5:

- Single Choice
- Multi Select

Freitext bleibt für spätere Versionen optional.

## Block 3 – Score-Caps

Finale Kombinationslogik:

1. Normale Fehler erzeugen Punktabzüge.
2. Kritische Fehler setzen Score-Caps.
3. Bei mehreren kritischen Fehlern gewinnt der strengste Cap.
4. Weitere kritische Fehler erzeugen zusätzliche Abzüge innerhalb dieses Caps.
5. Ein Cap kann den Score nie verbessern.
6. Fatal-Fehler können `critical_fail` setzen.

## Block 4 – Method Rules / Review-Flags

Finale Method-Rule-Klassen:

- `recommended`
- `optional`
- `reflex`
- `incomplete`
- `low_value`
- `misleading`
- `invalid`

Die freie Methodenauswahl bleibt erhalten. Die Bewertung erfolgt fallbezogen.

## Finale Verteilung

| Kategorie | Verteilung |
|---|---|
| Fälle gesamt | 91 |
| Domänen | {'MTB': 42, 'LAB': 27, 'RES': 22} |
| Länge | {'Standard': 45, 'Complex': 6, 'Mini': 34, 'Planspiel': 6} |
| Schwierigkeit | {'Intermediate': 35, 'Advanced': 15, 'Expert': 10, 'Beginner': 31} |
| Status | {'curated-core': 12, 'beta-standardized': 52, 'beta-review': 27} |

## Nächster Schritt

Diese AP1b-finalen Artefakte können jetzt in den **v1.5-App-Patch** überführt werden.
